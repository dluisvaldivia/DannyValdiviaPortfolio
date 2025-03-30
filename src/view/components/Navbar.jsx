import React from "react";
import "../../styles/_navbar.scss";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav>
      <button className="item">Home</button>
      <button className="item">About</button>
      <button className="item">Skills</button>
      <button className="item">Contact</button>
      <ThemeToggle />
    </nav>
  );
}
