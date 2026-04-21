import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';

import Hero from "../components/Hero.jsx"
import Features from "../components/Features.jsx";

export default function Home() {
  return (
    <main>n
      <Hero />
      <Features />
    </main>
  );
}

