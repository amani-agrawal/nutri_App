import React, { useState } from 'react';

interface EatenFood {
    food_id: number;
    food_name: string;
    brand: string | null;
    serving_description: string;
    serving_size: number;
}

interface RequestBody {
    image_b64: string;
    region: string;
    language: string;
    include_food_data: boolean;
    eaten_foods: EatenFood[];
}

const FoodRecognition: React.FC = () => {
    const [foodName, setFoodName] = useState<string>('');
    const [servingSize, setServingSize] = useState<number>(1);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [result, setResult] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!imageFile) {
            alert('Please select an image file.');
            return;
        }

        const apiKey = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjEwOEFEREZGRjZBNDkxOUFBNDE4QkREQTYwMDcwQzE5NzNDRjMzMUUiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJFSXJkX19ha2tacWtHTDNhWUFjTUdYUFBNeDQifQ.eyJuYmYiOjE3MzkwODczNDUsImV4cCI6MTczOTE3Mzc0NSwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiIwOGYyYWYwOGI3ZGE0ZTU4OTliNjUxMzUyN2QzNjBiMyIsInNjb3BlIjpbImJhc2ljIl19.GR9T5255qqRO9AQsy6xV4_nytcWAkiUoQC5_eXRAAOjh1gmrvNaEPvHv5ed32zxp_qoloZrWgTja6iOgDykouSr9iCDeNwq3RLhGYEpRmrYzyy7WOljdHkNmdf-vf6W1xPqf9JRDAJ6UzuC-pP4V1wWCIcdFHvRHcQ5huSTopTEf7OMizzt8u2Px6ETzagSiDXWdIjqdqx1HdP0TBXml54lgPtfU4EfDejAv5mXld5I0SgQGb01kM5_VJWD4aI7aX-zS71huVxy4Cy3SPgllaCcUVP1co4vf2LEuoSsF21ei_yEYGU3OP40YQU5Pv1mxNfs5uxH4tg_kaVRAFYhNs6iIHtLFy86nJxfmFfNJzY0wcMqiiyFEIKLKByRzqMzIBZOheS7Yn9KtmrJAuTKmLNdgEKctpQPZEG4KU-g9xxu1g6ZQgQM1VxQvRNbdn9JpqsuNShQMymr4YUtBbTn5bE4QxYKgY3vsjQvvUUV3_xCHWIgbZgn6jSb9M5g0cuI4v29i1dEb13oS_HRwCBCvvToGJvfq9it__RrGQuy2rdAFH74sBvHB47L4UJiQUy56rLCKltYdP6dhbZpG52Vr7ogunPTXKRcXnIVZ1rDYnXZuVAp2rTLWnVI-bjTk-ut05kPCxFWvbK0IeugoSMyExAg2upLc8qxDD84s6urNzOE'; // Replace with your actual API key

        // Convert image file to Base64
        const reader = new FileReader();
        reader.onloadend = async function () {
            const imageB64 = (reader.result as string).split(',')[1]; // Extract Base64 part
            const foodid = 0, size = 0;           //FIX THIS
            const requestBody: RequestBody = {
                image_b64: imageB64,
                region: "US",
                language: "en",
                include_food_data: true,
                eaten_foods: [
                    {
                        food_name: foodName,
                        food_id: foodid,
                        brand: null,
                        serving_description: "",
                        serving_size: size
                    }
                ]
            };

            // Make the API request
            try {
                const response = await fetch('https://platform.fatsecret.com/rest/image-recognition/v1', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });

                const data = await response.json();
                setResult(JSON.stringify(data, null, 2));
            } catch (TypeError) {
                console.error('Error fetching data:', TypeError);
                setResult('An error occurred.');
            }
        };
        reader.readAsDataURL(imageFile); // Start reading the file
    };

    return (
        <div>
            <h1>Food Recognition API</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="food_name">Food Name:</label>
                <input
                    type="text"
                    id="food_name"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    style={{
                        backgroundColor: 'black',
                        color: 'white',
                        border: '1px solid white',
                        padding: '8px',
                        borderRadius: '4px',
                    }}
                    required
                />
                <br /><br />

                <label htmlFor="serving_size">Serving Size:</label>
                <input
                    type="number"
                    id="serving_size"
                    value={servingSize}
                    onChange={(e) => setServingSize(Number(e.target.value))}
                    required
                    min="1" // Ensures that serving size is at least 1
                    style={{
                        backgroundColor: 'black',
                        color: 'white',
                        border: '1px solid white',
                        padding: '8px',
                        borderRadius: '4px',
                    }}
                />

                <label htmlFor="image_file">Image File:</label>
                <input
                    type="file"
                    id="image_file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                />
                <br /><br />

                <button type="submit">Submit</button>
            </form>

            <h2>API Response:</h2>
            <pre>{result}</pre>
        </div>
    );
};

export default FoodRecognition;
