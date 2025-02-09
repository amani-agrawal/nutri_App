"use client";
import { useEffect, useState } from "react";
import restaurants from './restrauntsData';

declare global {
  interface Window {
    initMap: () => void;
    geocoder: google.maps.Geocoder;
  }
}

export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = ["Low Calorie", "Low Fat", "High Protein", "Vegan", "Vegetarian", "Low Carb"];

  const [userLocation, setUserLocation] = useState<google.maps.LatLng | null>(null);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const [restaurantLocations, setRestaurantLocations] = useState<
    { [key: string]: google.maps.LatLng }
  >({});

  // Filter restaurants based on selected categories
  const filteredRestaurants = restaurants.filter((restaurant) => {
    return selectedCategories.every((category) => {
      // Check if the restaurant matches the selected categories
      switch (category) {
        case "Low Calorie":
          return restaurant.low_cal;
        case "Low Fat":
          return restaurant.low_fat;
        case "High Protein":
          return restaurant.high_protein;
        case "Vegan":
          return restaurant.vegan;
        case "Vegetarian":
          return restaurant.vegetarian;
        case "Low Carb":
          return restaurant.low_carb;
        default:
          return true;
      }
    });
  });

  useEffect(() => {
    // Load Google Maps API script with Places and Geometry libraries
    const mapsScript = document.createElement("script");
    mapsScript.src = `NOT BE SEEN`;
    mapsScript.async = true;
    document.head.appendChild(mapsScript);

    // Initialize the map when the script is loaded
    window.initMap = () => {
      setIsGoogleMapsLoaded(true);
    };

    // Initialize Geocoder
    window.initGeocoder = () => {
      window.geocoder = new google.maps.Geocoder();
    };
  }, []);

  useEffect(() => {
    if (isGoogleMapsLoaded) {
      const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 40.730610, lng: -73.935242 },
        zoom: 12,
      });

      // Use Places API to search for restaurants based on their name
      const service = new google.maps.places.PlacesService(map);

      restaurants.forEach((restaurant) => {
        const request = {
          query: restaurant.name,
          fields: ["name", "geometry"],
        };

        service.findPlaceFromQuery(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            results.forEach((result) => {
              const position = result.geometry.location;
              setRestaurantLocations((prev) => ({
                ...prev,
                [restaurant.name]: position,
              }));

              const marker = new google.maps.Marker({
                position: position,
                map: map,
                title: restaurant.name,
                icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
              });

              const infoWindow = new google.maps.InfoWindow({
                content: `<h1 style="color: black;">${restaurant.name}</h1>`,
              });

              marker.addListener("click", () => {
                infoWindow.open(map, marker);
              });
            });
          }
        });
      });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLoc = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setUserLocation(new google.maps.LatLng(userLoc.lat, userLoc.lng));

            map.setCenter(userLoc);
            map.setZoom(14);

            const userMarker = new google.maps.Marker({
              position: userLoc,
              map: map,
              title: "You are here!",
              icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            });

            const userInfoWindow = new google.maps.InfoWindow({
              content: "<h3>You are here!</h3>",
            });

            userMarker.addListener("click", () => {
              userInfoWindow.open(map, userMarker);
            });
          },
          () => {
            alert("Unable to retrieve your location.");
          }
        );
      }
    }
  }, [isGoogleMapsLoaded, restaurants]);

  const getDistance = (restaurantPosition: google.maps.LatLng) => {
    if (userLocation) {
      return google.maps.geometry.spherical.computeDistanceBetween(userLocation, restaurantPosition);
    }
    return 0;
  };

  const openGoogleMapsDirections = (restaurantPosition: google.maps.LatLng) => {
    if (userLocation) {
      const directionsURL = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat()},${userLocation.lng()}&destination=${restaurantPosition.lat()},${restaurantPosition.lng()}`;
      window.open(directionsURL, "_blank");
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter((item) => item !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
  };

  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "start", backgroundColor: "#000000" }}>
      <div id="map" style={{ width: "100%", height: "900px", marginBottom: "20px" }}></div>
      <div style={{ width: "80%", maxWidth: "1100px", backgroundColor: "black", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", fontFamily: "Arial, sans-serif", fontWeight: "600", color: "white" }}>Restaurant List</h2>
        
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
          {categories.map((category, index) => (
            <label key={index} style={{ color: "white", fontSize: "14px" }}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                style={{ marginRight: "5px" }}
              />
              {category}
            </label>
          ))}
        </div>

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "center" }}>
          {filteredRestaurants.map((restaurant, index) => {
            const restaurantPosition = restaurantLocations[restaurant.name];
            const distance = restaurantPosition ? getDistance(restaurantPosition) : 0;
            return (
              <div key={index} style={{ 
                backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", 
                width: "100%", maxWidth: "280px", padding: "15px", transition: "transform 0.3s ease" 
              }}>
                <button style={{
                  border: "none", backgroundColor: "#ffffff", color: "black", 
                  borderRadius: "5px", cursor: "pointer", fontSize: "14px", 
                  transition: "background-color 0.3s ease", alignContent: "start"
                }} onClick={() => openGoogleMapsDirections(restaurantPosition)}>
                  Dish: {restaurant.item}<br></br> Restaurant: {restaurant.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
