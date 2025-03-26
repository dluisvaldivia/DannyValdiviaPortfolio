import {useState, useEffect} from "react";
import {getInitialTheme, setTheme} from "../../controllers/themeController.js";

export default function ThemeToggle() {
    const [theme, setThemeState] = useState(getInitialTheme());

    useEffect(() => {
        setTheme(theme);
    }, [theme])

    return (
    <button onClick={() => setThemeState(theme === "light" ? "dark" : "light")}>Toggle Theme</button>
    )

}

