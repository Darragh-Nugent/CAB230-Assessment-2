import React from "react";
import { Link } from "react-router-dom";

import Hero from "../components/Hero.jsx"
import Features from "../components/Features";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
    </main>
  );
}

