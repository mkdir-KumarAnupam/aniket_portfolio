"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import SleekHero from "@/components/SleekHero";

export default function HomePage() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={darkMode ? "dark overflow-hidden" : "overflow-hidden"}>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <SleekHero darkMode={darkMode} />
        </div>
    );
}
