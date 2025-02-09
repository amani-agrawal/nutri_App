"use client";

import Image from "next/image";
import Fitmage from './images/cover-image.png';
import { useRouter } from "next/navigation";
import "./home.css"; // Import CSS

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Fuel Your Fitness</h1>
      </div>

      {/* Fitness Image */}
      <div className="fitness-image">
        <Image
          src={Fitmage}
          alt="Fitness Lifestyle"
          width={300}
          height={250}
          className="fitness-image"
        />
      </div>

      {/* Buttons */}
      <div className="button-container">
        <button className="button eat-in" onClick={() => {router.push("/eatin")}}>
          Eat In
        </button>

        <button className="button profile" onClick={() => router.push("/profile")}>
          Profile
        </button>
        
        <button className="button eat-out" onClick={() => router.push("/maps")}>
          Eat Out
        </button>
      </div>
    </div>
  );
}
