import { useState } from "react";
import CharacterProfile from "../CharacterProfile/CharacterProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleQuestion,
    faXmarkCircle,
    faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";

export default function Navbar({ characters, open_info }) {
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
            <div className="sidebar-control-wrapper">
                <FontAwesomeIcon icon={shown ? faXmarkCircle : faEllipsis} />
                <input
                    type="checkbox"
                    className="sidebar-control"
                    checked={shown}
                    onChange={(event) => setShown(event.target.checked)}
                />
            </div>
            <div className="characters">
                <div className="characters-container">
                    {fill_chars((b) => b)}
                </div>
                <span className="divider"></span>
                <div className="characters-container">
                    {fill_chars((b) => !b)}
                </div>
            </div>
            <button className="nav-button" onClick={open_info}>
                <FontAwesomeIcon icon={faCircleQuestion} />
            </button>
        </nav>
    );
}
