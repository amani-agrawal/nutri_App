const restaurants = [
        {
          "item": "Extra Large Margherita",
          "name": "Juliana's Pizza",
          "low_cal": false,
          "low_carb": false,
          "high_protein": false,
          "vegan": false,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Extra Large Pepperoni",
          "name": "Juliana's Pizza",
          "low_cal": false,
          "low_carb": false,
          "high_protein": true,
          "vegan": false,
          "vegetarian": false,
          "low_fat": false
        },
        {
          "item": "White Pizza",
          "name": "Juliana's Pizza",
          "low_cal": false,
          "low_carb": false,
          "high_protein": false,
          "vegan": false,
          "vegetarian": false,
          "low_fat": false
        },
        {
          "item": "Diavola Pizza",
          "name": "Juliana's Pizza",
          "low_cal": false,
          "low_carb": false,
          "high_protein": true,
          "vegan": false,
          "vegetarian": false,
          "low_fat": false
        },
        {
          "item": "Coal Oven Pizza",
          "name": "Grimaldi's Pizzeria",
          "low_cal": false,
          "low_carb": false,
          "high_protein": false,
          "vegan": false,
          "vegetarian": false,
          "low_fat": false
        },
        {
          "item": "Sausage Pizza",
          "name": "Grimaldi's Pizzeria",
          "low_cal": false,
          "low_carb": false,
          "high_protein": true,
          "vegan": false,
          "vegetarian": false,
          "low_fat": false
        },
        {
          "item": "Meat Lover's Pizza",
          "name": "Grimaldi's Pizzeria",
          "low_cal": false,
          "low_carb": false,
          "high_protein": true,
          "vegan": false,
          "vegetarian": false,
          "low_fat": false
        },
        {
          "item": "Veggie Pizza",
          "name": "Grimaldi's Pizzeria",
          "low_cal": false,
          "low_carb": true,
          "high_protein": true,
          "vegan": true,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Lobster Bisque",
          "name": "The River Café",
          "low_cal": false,
          "low_carb": false,
          "high_protein": true,
          "vegan": false,
          "vegetarian": false,
          "low_fat": false
        },
        {
          "item": "Steak Frites",
          "name": "The River Café",
          "low_cal": false,
          "low_carb": false,
          "high_protein": true,
          "vegan": false,
          "vegetarian": false,
          "low_fat": false
        },
        {
          "item": "Grilled Salmon",
          "name": "The River Café",
          "low_cal": false,
          "low_carb": true,
          "high_protein": true,
          "vegan": false,
          "vegetarian": false,
          "low_fat": true
        },
        {
          "item": "Seasonal Vegetable Risotto",
          "name": "The River Café",
          "low_cal": false,
          "low_carb": true,
          "high_protein": true,
          "vegan": true,
          "vegetarian": true,
          "low_fat": true
        },
        {
          "item": "ShackBurger",
          "name": "Shake Shack",
          "low_cal": false,
          "low_carb": false,
          "high_protein": true,
          "vegan": false,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "SmokeShack",
          "name": "Shake Shack",
          "low_cal": false,
          "low_carb": false,
          "high_protein": true,
          "vegan": false,
          "vegetarian": false,
          "low_fat": false
        },
        {
          "item": "Shack-cago Dog",
          "name": "Shake Shack",
          "low_cal": false,
          "low_carb": true,
          "high_protein": true,
          "vegan": true,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Cheese Fries",
          "name": "Shake Shack",
          "low_cal": false,
          "low_carb": false,
          "high_protein": false,
          "vegan": false,
          "vegetarian": false,
          "low_fat": false
        },
        {
          "item": "Spaghetti Carbonara",
          "name": "Cecconi's Dumbo",
          "low_cal": false,
          "low_carb": false,
          "high_protein": true,
          "vegan": false,
          "vegetarian": false,
          "low_fat": false
        },
        {
          "item": "Risotto al Funghi",
          "name": "Cecconi's Dumbo",
          "low_cal": false,
          "low_carb": false,
          "high_protein": false,
          "vegan": false,
          "vegetarian": false,
          "low_fat": false
        },
        {
          "item": "Fennel Pappardelle",
          "name": "Cecconi's Dumbo",
          "low_cal": false,
          "low_carb": false,
          "high_protein": true,
          "vegan": false,
          "vegetarian": false,
          "low_fat": false
        },
        {
          "item": "Insalata Caprese",
          "name": "Cecconi's Dumbo",
          "low_cal": false,
          "low_carb": true,
          "high_protein": false,
          "vegan": false,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Burrito Bowl",
          "name": "Chipotle Mexican Grill",
          "low_cal": false,
          "low_carb": true,
          "high_protein": true,
          "vegan": true,
          "vegetarian": true,
          "low_fat": true
        },
        {
          "item": "Soft Tacos",
          "name": "Chipotle Mexican Grill",
          "low_cal": false,
          "low_carb": true,
          "high_protein": true,
          "vegan": true,
          "vegetarian": true,
          "low_fat": true
        },
        {
          "item": "Burrito",
          "name": "Chipotle Mexican Grill",
          "low_cal": false,
          "low_carb": false,
          "high_protein": true,
          "vegan": false,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Quesadilla",
          "name": "Chipotle Mexican Grill",
          "low_cal": false,
          "low_carb": false,
          "high_protein": true,
          "vegan": false,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Mezze Platter",
          "name": "Naya",
          "low_cal": false,
          "low_carb": true,
          "high_protein": true,
          "vegan": true,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Chicken Shawarma Bowl",
          "name": "Naya",
          "low_cal": false,
          "low_carb": true,
          "high_protein": true,
          "vegan": false,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Falafel Wrap",
          "name": "Naya",
          "low_cal": false,
          "low_carb": true,
          "high_protein": true,
          "vegan": true,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Hummus Plate",
          "name": "Naya",
          "low_cal": false,
          "low_carb": true,
          "high_protein": true,
          "vegan": true,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Harvest Bowl",
          "name": "Sweetgreen",
          "low_cal": false,
          "low_carb": true,
          "high_protein": false,
          "vegan": false,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Guacamole Greens",
          "name": "Sweetgreen",
          "low_cal": false,
          "low_carb": true,
          "high_protein": false,
          "vegan": true,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Kale Caesar Salad",
          "name": "Sweetgreen",
          "low_cal": false,
          "low_carb": true,
          "high_protein": true,
          "vegan": true,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Shroomami Bowl",
          "name": "Sweetgreen",
          "low_cal": false,
          "low_carb": true,
          "high_protein": false,
          "vegan": true,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Chopped Salad",
          "name": "Chopt Creative Salad Company",
          "low_cal": false,
          "low_carb": true,
          "high_protein": true,
          "vegan": true,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Warm Chicken Salad",
          "name": "Chopt Creative Salad Company",
          "low_cal": false,
          "low_carb": true,
          "high_protein": true,
          "vegan": false,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Garden Salad",
          "name": "Chopt Creative Salad Company",
          "low_cal": true,
          "low_carb": true,
          "high_protein": false,
          "vegan": true,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Protein Bowl",
          "name": "Chopt Creative Salad Company",
          "low_cal": false,
          "low_carb": true,
          "high_protein": true,
          "vegan": false,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Build-Your-Own Salad",
          "name": "Just Salad",
          "low_cal": false,
          "low_carb": true,
          "high_protein": true,
          "vegan": true,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Mediterranean Salad",
          "name": "Just Salad",
          "low_cal": false,
          "low_carb": true,
          "high_protein": true,
          "vegan": true,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Quinoa Salad",
          "name": "Just Salad",
          "low_cal": false,
          "low_carb": true,
          "high_protein": true,
          "vegan": true,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Mediterranean Wrap",
          "name": "Just Salad",
          "low_cal": false,
          "low_carb": true,
          "high_protein": true,
          "vegan": true,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Pita & Mezze",
          "name": "Cava",
          "low_cal": false,
          "low_carb": true,
          "high_protein": true,
          "vegan": true,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Greek Salad",
          "name": "Cava",
          "low_cal": false,
          "low_carb": true,
          "high_protein": true,
          "vegan": true,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Gyro Bowl",
          "name": "Cava",
          "low_cal": false,
          "low_carb": true,
          "high_protein": true,
          "vegan": false,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Lentil Soup",
          "name": "Cava",
          "low_cal": false,
          "low_carb": true,
          "high_protein": true,
          "vegan": true,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Market Bowl",
          "name": "Dig Inn",
          "low_cal": false,
          "low_carb": true,
          "high_protein": true,
          "vegan": true,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Roasted Chicken Plate",
          "name": "Dig Inn",
          "low_cal": false,
          "low_carb": false,
          "high_protein": true,
          "vegan": false,
          "vegetarian": false,
          "low_fat": false
        },
        {
          "item": "Roasted Veg Bowl",
          "name": "Dig Inn",
          "low_cal": false,
          "low_carb": true,
          "high_protein": false,
          "vegan": true,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Sweet Potato Fries",
          "name": "Dig Inn",
          "low_cal": false,
          "low_carb": true,
          "high_protein": true,
          "vegan": true,
          "vegetarian": true,
          "low_fat": false
        },
        {
          "item": "Spumoni Pizza Slice",
          "name": "L&B Spumoni Gardens",
          "low_cal": false,
          "low_carb": false,
          "high_protein": false,
          "vegan": false,
          "vegetarian": false,
          "low_fat": false
        },
        {
          "item": "Full Pie",
          "name": "L&B Spumoni Gardens",
          "low_cal": false,
          "low_carb": false,
          "high_protein": false,
          "vegan": false,
          "vegetarian": false,
          "low_fat": false
        },
        {
          "item": "Calabrese Pizza",
          "name": "L&B Spumoni Gardens",
          "low_cal": false,
          "low_carb": false,
          "high_protein": true,
          "vegan": false,
          "vegetarian": false,
          "low_fat": false
        }
];

export default restaurants;
