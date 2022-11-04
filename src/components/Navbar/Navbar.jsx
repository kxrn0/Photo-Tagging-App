import { useState } from "react";
import CharacterProfile from "../CharacterProfile/CharacterProfile";
import Icon from "@mdi/react";
import {
    mdiInformation,
    mdiCloseCircle,
    mdiDotsHorizontalCircle,
} from "@mdi/js";
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
                <Icon path={shown ? mdiCloseCircle : mdiDotsHorizontalCircle} />
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
                <Icon path={mdiInformation} />
            </button>
        </nav>
    );
}
