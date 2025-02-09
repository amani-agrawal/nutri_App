"use client";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    initMap: () => void;
    geocoder: google.maps.Geocoder;
  }
}

export default function Home() {
  const [restaurants, setRestaurants] = useState([
    {
      name: "Joe's Pizza",
      address: "7 Carmine St, New York, NY 10014",
      dishes: ["Cheese Pizza", "Pepperoni Pizza", "Veggie Pizza"],
      info: "A classic slice of New York pizza!",
    },
    {
      name: "The Spotted Pig",
      address: "314 W 11th St, New York, NY 10014",
      dishes: ["Chargrilled Burger", "Polenta Fries", "Pork Belly"],
      info: "Gastropub with a legendary burger!",
    },
    {
      name: "Momofuku Noodle Bar",
      address: "171 1st Ave, New York, NY 10003",
      dishes: ["Ramen", "Pork Buns", "Kimchi Stew"],
      info: "Innovative Asian cuisine in the heart of the city!",
    },
  ]);
  const [userLocation, setUserLocation] = useState<google.maps.LatLng | null>(null);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const [restaurantLocations, setRestaurantLocations] = useState<
    { [key: string]: google.maps.LatLng }
  >({});

  useEffect(() => {
    // Load Google Maps API script with Places and Geometry libraries
    const mapsScript = document.createElement("script");
    mapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDohaBU6gmnMneAZsk3-gIgw0zZkFsatT4&libraries=places,geometry&callback=initMap`;
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
                content: `<h1>${restaurant.name}</h1><p>${restaurant.info}</p>`,
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

  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#000000" }}>
      <div id="map" style={{ width: "100%", height: "900px", marginBottom: "20px" }}></div>

      <div style={{ width: "80%", maxWidth: "900px", backgroundColor: "black", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", fontFamily: "Arial, sans-serif", fontWeight: "600" }}>Restaurant List</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "space-between" ,height:"700px"}}>
          {restaurants.map((restaurant, index) => {
            const restaurantPosition = restaurantLocations[restaurant.name];
            const distance = restaurantPosition ? getDistance(restaurantPosition) : 0;
            return (
              <div key={index} style={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", width: "100%", maxWidth: "280px", padding: "15px", transition: "transform 0.3s ease" }}>
                <h3 style={{ fontSize: "18px", color: "#333" }}>{restaurant.name}</h3>
                <p style={{ fontSize: "14px", color: "#777", marginBottom: "10px" }}>{restaurant.info}</p>
                <p className="text-black"><strong>Menu:</strong></p>
                <ul style={{ listStyleType: "none", paddingLeft: "0", marginBottom: "10px" }}>
                  {restaurant.dishes.map((dish, dishIndex) => (
                    <li key={dishIndex} style={{ fontSize: "14px", color: "#555" }}>{dish}</li>
                  ))}
                </ul>
                <div>
                  {userLocation && restaurantPosition && (
                    <p className="text-black">
                      Distance: {distance ? `${(distance / 1000).toFixed(2)} km` : "Calculating..."}
                    </p>
                  )}
                  <button style={{
                    padding: "8px 15px", border: "none", backgroundColor: "#007bff", color: "white", borderRadius: "5px", cursor: "pointer",
                    fontSize: "14px", width: "100%", transition: "background-color 0.3s ease"
                  }} onClick={() => openGoogleMapsDirections(restaurantPosition)}>
                    View on Google Maps
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}