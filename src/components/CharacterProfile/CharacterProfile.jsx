import Underlink from "../Underelink/Underlink";

import "./character_profile.css";

export default function CharacterProfile({ character }) {
    return (
        <div className={`character-profile ${character.found ? "found" : ""}`}>
            <img src={character.image} alt={character.name} />
            <Underlink address={character.address}>{character.name}</Underlink>
        </div>
    );
}
