import { useEffect, useRef, useState } from "react";

import touhou from "./assets/yoki.jpg";
import data from "./data";
import Navbar from "./components/Navbar/Navbar";
import SlideScreen from "./components/SlideScreen/SlideScreen";
import CharacterProfile from "./components/CharacterProfile/CharacterProfile";
import Pointer from "./components/Pointer/Pointer";
import Toasts from "./components/Toasts/Toasts";

import "./style.css";
import { nanoid } from "nanoid";

let stuff = [
    {
        name: "Cirno",
        position: { x: 0.1, y: 0.2, r: 0.1 },
    },
    {
        name: "Flandre Scarlet",
        position: { x: 0.5, y: 0.6, r: 0.15 },
    },
    {
        name: "Mima",
        position: { x: 0.607, y: 0.027, r: 0.0425 },
    },
];

function App() {
    const [startScreenIsShown, setStartScreenIsShown] = useState(true);
    const [chars, setChars] = useState(
        JSON.parse(JSON.stringify(data)).map((char) => ({
            ...char,
            found: false,
        }))
    );
    const [pointerOn, setPointerOn] = useState(false);
    const imageRef = useRef(null);
    const menuRef = useRef(null);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: -1000 });
    const [toasts, setToasts] = useState([]);

    function start_game() {
        console.log("hi");
        setStartScreenIsShown(false);
        if (window.innerWidth >= 550) setPointerOn(true);
    }

    function get_data(charName) {
        return new Promise((resolve) =>
            setTimeout(
                () =>
                    resolve(
                        stuff.find((char) => char.name === charName).position
                    ),
                50
            )
        );
    }

    function rem_to_pixels(rem) {
        const fontSize = getComputedStyle(document.documentElement).fontSize;
        const size = parseFloat(fontSize);

        return rem * size;
    }
    function is_point_in_circle(point, circle) {
        const distance = Math.sqrt(
            (point.x - circle.center.x) * (point.x - circle.center.x) +
                (point.y - circle.center.y) * (point.y - circle.center.y)
        );

        return distance <= circle.radius;
    }

    async function check_coordinates(charName) {
        const location = await get_data(charName);
        const center = {
            x: imageRef.current.width * location.x,
            y: imageRef.current.height * location.y,
        };
        const radius = imageRef.current.width * location.r;
        const yOffset = rem_to_pixels(window.innerWidth > 600 ? 7 : 0);
        const mouseCoords = { x: menuPosition.x, y: menuPosition.y - yOffset };
        const id = nanoid();

        if (is_point_in_circle(mouseCoords, { center, radius })) {
            setChars((prevChars) =>
                prevChars.map((other) =>
                    other.name === charName ? { ...other, found: true } : other
                )
            );
            console.log("correct");
            setToasts((prevToasts) => [
                ...prevToasts,
                { error: false, message: "Correct!", id },
            ]);
        } else {
            console.log("wrong");
            setToasts((prevToasts) => [
                ...prevToasts,
                { error: true, message: "Incorrect, please try again!", id },
            ]);
        }

        setPointerOn(true);
        setTimeout(() => remove_toast(id), 3333);
    }

    function remove_toast(id) {
        setToasts((prevToasts) =>
            prevToasts.filter((toast) => toast.id !== id)
        );
    }

    useEffect(() => {
        function fun(event) {
            setPointerOn((prevValue) => !prevValue);

            if (pointerOn) {
                const position = { x: event.pageX, y: event.pageY };

                const styles = window.getComputedStyle(menuRef.current);
                const menuWidth = parseFloat(styles.width);
                const menuHeight = parseFloat(styles.height);

                if (window.innerWidth - event.pageX <= menuWidth)
                    position.x = event.pageX - menuWidth;
                if (document.body.scrollHeight - event.pageY <= menuHeight)
                    position.y = event.pageY - menuHeight;

                setMenuPosition(position);
            } else {
                setMenuPosition({ x: -9999, y: -9999 });
            }
        }

        imageRef.current.addEventListener("click", fun);

        return () => imageRef.current.removeEventListener("click", fun);
    }, [pointerOn]);

    return (
        <div className={`App ${pointerOn ? "pointer-on" : ""}`}>
            <Pointer shown={pointerOn} />
            <Toasts toasts={toasts} remove_toast={remove_toast} />
            <div
                className={`characters-menu ${pointerOn ? "hidden" : ""}`}
                ref={menuRef}
                style={{ top: menuPosition.y, left: menuPosition.x }}
            >
                {chars
                    .filter((char) => !char.found)
                    .map((char) => (
                        <button
                            key={char.name}
                            onClick={() => check_coordinates(char.name)}
                        >
                            {char.name}
                        </button>
                    ))}
            </div>
            <SlideScreen shown={startScreenIsShown} close={start_game}>
                <div className="initial-screen-characters">
                    <p className="instructions">Find these characters</p>
                    <div className="characters-to-find">
                        {chars.map((char) => (
                            <CharacterProfile
                                key={char.name}
                                character={char}
                            />
                        ))}
                    </div>
                    <button onClick={start_game} className="start-button">
                        START
                    </button>
                </div>
            </SlideScreen>
            <Navbar
                characters={chars}
                user={{ name: "By Me", loggedIn: false }}
            />
            <main>
                <img
                    src={touhou}
                    alt={"main image"}
                    className="main-image"
                    ref={imageRef}
                />
            </main>
        </div>
    );
}

export default App;
