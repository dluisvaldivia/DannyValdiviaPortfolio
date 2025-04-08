import React from "react";
import "../../styles/_navbar.scss";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav>
      <button className="item" onClick={() => scrollToSection("projects")}>Projects</button>
      <button className="item" onClick={() => scrollToSection("contact")}>Contact</button>
      <ThemeToggle />
    </nav>
  );
}
