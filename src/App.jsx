import { useEffect, useRef, useState } from "react";

import touhou from "./assets/yoki.jpg";
import data from "./data";
// import names from "./names";
import Navbar from "./components/Navbar/Navbar";
import SlideScreen from "./components/SlideScreen/SlideScreen";
import CharacterProfile from "./components/CharacterProfile/CharacterProfile";
import Pointer from "./components/Pointer/Pointer";
import Toasts from "./components/Toasts/Toasts";

import "./style.css";
import { nanoid } from "nanoid";

let stuff = [
    {
        name: "Reimu Hakurei",
        position: {
            x: 0.079,
            y: 0.181,
            r: 0.0425,
        },
    },
    {
        name: "Marisa Kirisame",
        position: {
            x: 0.327,
            y: 0.046,
            r: 0.05,
        },
    },
    {
        name: "Cirno",
        position: {
            x: 0.145,
            y: 0.264,
            r: 0.04,
        },
    },
    {
        name: "Rumia",
        position: {
            x: 0.528,
            y: 0.26,
            r: 0.04,
        },
    },
    {
        name: "Alice Margatroid",
        position: {
            x: 0.531,
            y: 0.094,
            r: 0.0425,
        },
    },
    {
        name: "Chen",
        position: {
            x: 0.195,
            y: 0.145,
            r: 0.035,
        },
    },
    {
        name: "Yukari Yakumo",
        position: {
            x: 0.122,
            y: 0.14,
            r: 0.04,
        },
    },
    {
        name: "Kasen Ibaraki",
        position: {
            x: 0.469,
            y: 0.89,
            r: 0.045,
        },
    },
    {
        name: "Suika Ibuki",
        position: {
            x: 0.319,
            y: 0.953,
            r: 0.0475,
        },
    },
    {
        name: "Mamizou Futatsuiwa",
        position: {
            x: 0.472,
            y: 0.141,
            r: 0.045,
        },
    },
    {
        name: "Nitori Kawashiro",
        position: {
            x: 0.289,
            y: 0.618,
            r: 0.0375,
        },
    },
];

const names = [
    "Reimu Hakurei",
    "Marisa Kirisame",
    "Cirno",
    "Rumia",
    "Alice Margatroid",
    "Chen",
    "Kasen Ibaraki",
    "Suika Ibuki",
    "Mamizou Futatsuiwa",
    "Nitori Kawashiro",
    "Yukari Yakumo",
];

import { get_image_url } from "./image_data";
import Loading from "./components/Loading/Loading";

function App() {
    const [startScreenIsShown, setStartScreenIsShown] = useState(true);
    const [chars, setChars] = useState(() => {
        const characters = [];

        do {
            const char = names[~~(Math.random() * names.length)];

            if (!characters.includes(char)) characters.push(char);
        } while (characters.length < 5);
        return characters;
    });
    const [pointerOn, setPointerOn] = useState(false);
    const imageRef = useRef(null);
    const menuRef = useRef(null);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: -1000 });
    const [mouser, setMouser] = useState({ x: 0, y: 0 });
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        async function get_character_data() {
            let updatedChars = [];

            for (let char of chars) {
                const imageURL = await get_image_url(char);

                updatedChars.push({
                    name: char,
                    address: `https://en.touhouwiki.net/wiki/${char
                        .split(" ")
                        .join("_")}`,
                    image: imageURL,
                    found: false,
                });
            }

            setChars(updatedChars);
        }

        get_character_data();
    }, []);

    function start_game() {
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
        const mouseCoords = { x: mouser.x, y: mouser.y - yOffset };
        const id = nanoid();

        if (is_point_in_circle(mouseCoords, { center, radius })) {
            setChars((prevChars) =>
                prevChars.map((other) =>
                    other.name === charName ? { ...other, found: true } : other
                )
            );
            setToasts((prevToasts) => [
                ...prevToasts,
                { error: false, message: "Correct!", id },
            ]);
        } else {
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
                setMouser({ x: event.pageX, y: event.pageY });
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
                style={
                    pointerOn
                        ? {
                              top: "-10rem",
                              left: "-10rem",
                          }
                        : { top: menuPosition.y, left: menuPosition.x }
                }
            >
                {chars.every((char) => char.image)
                    ? chars
                          .filter((char) => !char.found)
                          .map((char) => (
                              <button
                                  key={char.name}
                                  onClick={() => check_coordinates(char.name)}
                              >
                                  {char.name}
                              </button>
                          ))
                    : null}
            </div>
            <SlideScreen shown={startScreenIsShown} close={start_game}>
                {chars.every((char) => char.image) ? (
                    <div className="initial-screen-characters">
                        <p className="instructions">Find these characters</p>
                        <p className="details">
                            Click on each character's head to select them
                        </p>
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
                ) : (
                    <Loading />
                )}
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
