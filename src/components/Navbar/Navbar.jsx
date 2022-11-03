import { useState } from "react";
import CharacterProfile from "../CharacterProfile/CharacterProfile";
import "./navbar.css";

export default function Navbar({ characters, user }) {
    const [shown, setShown] = useState(false);

    function fill_chars(cond) {
        if (characters.some((char) => !char.image)) return null;

        return characters.map((chara) =>
            cond(chara.found) ? (
                <CharacterProfile key={chara.name} character={chara} />
            ) : null
        );
    }

    return (
        <nav className={`navbar ${shown ? "" : "hidden"}`}>
            <input
                type="checkbox"
                className="sidebar-control"
                checked={shown}
                onChange={(event) => setShown(event.target.checked)}
            />
            <div className="characters">
                <div className="characters-container">
                    {fill_chars((b) => b)}
                </div>
                <span className="divider"></span>
                <div className="characters-container">
                    {fill_chars((b) => !b)}
                </div>
            </div>
            <button
                className="log-out"
                onClick={() => console.log("log out")}
            ></button>
        </nav>
    );
}
