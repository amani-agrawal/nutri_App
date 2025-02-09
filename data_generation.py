import os
import pandas as pd
import json
import time
import csv
from dotenv import load_dotenv
from openai import OpenAI

# -------------------------------
# Load Environment Variables
# -------------------------------
load_dotenv()  # Loads variables from the .env file if needed

# -------------------------------
# Local DeepSeek-R1 Configuration
# -------------------------------
DEEPSEEK_BASE_URL = os.getenv("DEEPSEEK_LOCAL_URL", "http://localhost:11434/v1")
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY", "ollama")
DEEPSEEK_MODEL = os.getenv("DEEPSEEK_LOCAL_MODEL", "deepseek-r1:8b")  # Change if needed


# -------------------------------
# Kaggle Dataset Functions
# -------------------------------

def load_kaggle_menu_dataset(restaurants_csv, menus_csv):
    """
    Load and merge restaurants and menus datasets.
    The menus CSV should have columns: 'restaurant_id', 'category', 'name', and 'description'
    (with 'name' renamed to 'menu_item'). The merged dataframe will also include
    zip_code, lat, and lng from the restaurants CSV.
    """
    try:
        # Load restaurants CSV and rename "name" to "restaurant"
        df_restaurants = pd.read_csv(restaurants_csv)
        df_restaurants.rename(columns={"name": "restaurant"}, inplace=True)
        # Load menus CSV and rename "name" to "menu_item"
        df_menus = pd.read_csv(menus_csv)
        df_menus.rename(columns={"name": "menu_item"}, inplace=True)

        # Ensure 'category' and 'description' exist in menus; if not, create empty strings
        if 'category' not in df_menus.columns:
            print("Warning: 'category' column not found in menus CSV. Creating empty column.")
            df_menus['category'] = ""
        if 'description' not in df_menus.columns:
            print("Warning: 'description' column not found in menus CSV. Creating empty column.")
            df_menus['description'] = ""

        # Merge on restaurant IDs; use suffixes so that menus' category becomes category_menu
        merged_df = pd.merge(
            df_restaurants,
            df_menus,
            left_on="id",
            right_on="restaurant_id",
            how="inner",
            suffixes=("_restaurant", "_menu")
        )

        # Select needed columns: id, restaurant, menu_item, category_menu, description, zip_code, lat, lng
        return merged_df[["id", "restaurant", "menu_item", "category_menu", "description", "zip_code", "lat", "lng"]]
    except Exception as e:
        print(f"Dataset loading error: {e}")
        return None


def fetch_menu_from_kaggle(restaurant_name, kaggle_df):
    """
    Fetch menu items for a given restaurant from the merged dataset.
    Returns a list of dictionaries with keys: id, restaurant, menu_item, category, description, lat, lng.
    """
    try:
        matches = kaggle_df[kaggle_df['restaurant'].str.contains(restaurant_name, case=False, na=False)]
        items = []
        for _, row in matches.iterrows():
            if pd.isnull(row['menu_item']):
                continue
            items.append({
                "id": row['id'],
                "restaurant": row['restaurant'],
                "menu_item": row['menu_item'].strip() if isinstance(row['menu_item'], str) else "",
                "category": row['category_menu'].strip() if isinstance(row['category_menu'], str) else "",
                "description": row['description'].strip() if isinstance(row['description'], str) else "",
                "lat": row['lat'],
                "lng": row['lng']
            })
        return items
    except Exception as e:
        print(f"Search error: {e}")
        return None


def annotate_with_deepseek(menu_item, category_info, description_info):
    """
    Annotate a menu item using DeepSeek-R1.
    Returns a dictionary with keys: low_carb, low_fat, high_protein, low_calorie, vegan, vegetarian.
    """
    client = OpenAI(api_key=DEEPSEEK_API_KEY, base_url=DEEPSEEK_BASE_URL)
    prompt = f"""Analyze the following menu item details and classify it into the following dietary categories.
Return ONLY a JSON object with these keys: low_carb, low_fat, high_protein, low_calorie, vegan, vegetarian. Use true/false values.

Menu Item: {menu_item[:200]}
Category: {category_info}
Description: {description_info}

Example response format:
{{
    "low_carb": true,
    "low_fat": false,
    "high_protein": true,
    "low_calorie": false,
    "vegan": true,
    "vegetarian": true
}}
"""
    try:
        completion = client.chat.completions.create(
            model=DEEPSEEK_MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.1,
            max_tokens=200,
            response_format={"type": "json_object"}
        )
        raw_response = completion.choices[0].message.content
        print("Raw API response:", raw_response)
        response = json.loads(raw_response)

        def parse_bool(value):
            if isinstance(value, bool):
                return value
            return str(value).strip().lower() == "true"

        return {k: parse_bool(v) for k, v in response.items()}
    except Exception as e:
        print(f"DeepSeek annotation error for '{menu_item[:30]}': {str(e)}")
        return {
            'low_carb': False,
            'low_fat': False,
            'high_protein': False,
            'low_calorie': False,
            'vegan': False,
            'vegetarian': False
        }


def process_with_categorization(kaggle_df, rate_limit_delay=1):
    """
    Process each restaurant's menu items, call DeepSeek-R1 for annotations,
    and collect output records with the required columns.
    Returns a list of dictionaries.
    """
    results = []
    if kaggle_df is None or kaggle_df.empty:
        print("No data available after filtering")
        return results

    unique_restaurants = kaggle_df['restaurant'].unique()
    for restaurant in unique_restaurants:
        print(f"\n{'=' * 40}\nProcessing: {restaurant}\n{'=' * 40}")
        items = fetch_menu_from_kaggle(restaurant, kaggle_df)
        if not items:
            print("No menu items found")
            continue
        for item in items:
            menu_item = item.get("menu_item", "")
            category_info = item.get("category", "")
            description_info = item.get("description", "")
            annotation = annotate_with_deepseek(menu_item, category_info, description_info)
            time.sleep(rate_limit_delay)
            record = {
                "id": item.get("id"),
                "restaurant_name": item.get("restaurant"),
                "item_name": menu_item,
                "low_calorie": annotation.get("low_calorie", False),
                "low_carb": annotation.get("low_carb", False),
                "high_protein": annotation.get("high_protein", False),
                "vegan": annotation.get("vegan", False),
                "vegetarian": annotation.get("vegetarian", False),
                "low_fat": annotation.get("low_fat", False),
                "lat": item.get("lat"),
                "lng": item.get("lng")
            }
            results.append(record)
            print(f"Processed: {menu_item} => {record}")
    return results


def main():
    # Update the CSV file paths as needed.
    kaggle_df = load_kaggle_menu_dataset("restaurants2.csv", "restaurant-menus2.csv")
    if kaggle_df is None:
        print("Failed to load dataset")
        return

    print("Total rows in merged dataset:", kaggle_df.shape[0])

    # Filter for restaurants near New York, zip code "11201"
    filtered_df = kaggle_df[kaggle_df['zip_code'].astype(str).str.strip() == "11201"]
    print("Rows after filtering by zip code 11201:", filtered_df.shape[0])

    # Limit to only the first 15 unique restaurants from the filtered dataset.
    unique_restaurants = filtered_df['restaurant'].unique()[:15]
    filtered_df = filtered_df[filtered_df['restaurant'].isin(unique_restaurants)]

    # Process the filtered restaurants.
    output_records = process_with_categorization(filtered_df, rate_limit_delay=1)
    if not output_records:
        print("No output records to write.")
        return

    # Write output CSV with specified columns.
    output_df = pd.DataFrame(output_records, columns=[
        "id", "restaurant_name", "item_name", "low_calorie", "low_carb",
        "high_protein", "vegan", "vegetarian", "low_fat", "lat", "lng"
    ])
    output_csv = "output.csv"
    output_df.to_csv(output_csv, index=False, quoting=csv.QUOTE_ALL)
    print(f"Output CSV written to {output_csv}")


if __name__ == "__main__":
    main()