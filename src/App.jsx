import { useEffect, useRef, useState } from "react";
import touhou from "./assets/yoki.jpg";
import Navbar from "./components/Navbar/Navbar";
import SlideScreen from "./components/SlideScreen/SlideScreen";
import CharacterProfile from "./components/CharacterProfile/CharacterProfile";
import Pointer from "./components/Pointer/Pointer";
import Toasts from "./components/Toasts/Toasts";
import Loading from "./components/Loading/Loading";
import Underlink from "./components/Underelink/Underlink";
import { nanoid } from "nanoid";
import { initializeApp } from "firebase/app";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    orderBy,
    query,
    limit,
} from "firebase/firestore";
import config from "./firebase.config";

import "./style.css";

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

function App() {
    const [startScreenIsShown, setStartScreenIsShown] = useState(true);
    const [chars, setChars] = useState(() => select_characters());
    const [pointerOn, setPointerOn] = useState(false);
    const imageRef = useRef(null);
    const menuRef = useRef(null);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: -1000 });
    const [mouser, setMouser] = useState({ x: 0, y: 0 });
    const [toasts, setToasts] = useState([]);
    const [isShowingCredits, setIsShowingCredits] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [userIn, setUserIn] = useState(false);
    const [leaderBoard, setLeaderboard] = useState([]);
    const [time, setTime] = useState({ start: 0, end: 0 });
    const formRef = useRef(null);

    function start_game() {
        setStartScreenIsShown(false);
        setIsGameOver(false);
        setTime({ start: new Date(), end: 0 });
        if (window.innerWidth >= 550) setPointerOn(true);
    }

    async function get_data(charName) {
        const charRef = doc(
            getFirestore(),
            `location/${charName.split(" ").join("_")}`
        );
        const charSnap = await getDoc(charRef);

        return charSnap.data().position;
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
            setChars((prevChars) => {
                const updated = prevChars.map((other) =>
                    other.name === charName ? { ...other, found: true } : other
                );

                if (updated.every((char) => char.found)) {
                    setTime((prevTime) => ({
                        ...prevTime,
                        end: new Date(),
                    }));
                    setIsGameOver(true);
                }
                return updated;
            });
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

    function open_info() {
        setIsShowingCredits(true);
    }

    async function handle_submission(event) {
        event.preventDefault();

        const userName = formRef.current["player-name"].value;
        const id = nanoid();
        const topUsers = [];

        await addDoc(collection(getFirestore(), "users"), {
            name: userName,
            time: time.end.valueOf() - time.start.valueOf(),
            id,
        });

        const usersQuery = query(
            collection(getFirestore(), "users"),
            orderBy("time", "asc"),
            limit(10)
        );
        const querySnapshot = await getDocs(usersQuery);

        querySnapshot.forEach((user) => topUsers.push(user.data()));

        setLeaderboard(topUsers);

        setUserIn(true);
    }

    async function load_characters_data(chars) {
        let updatedCharacters = [];

        for (let char of chars) {
            const charRef = doc(
                getFirestore(),
                `image_data/${char.split(" ").join("_")}`
            );
            const charSnap = await getDoc(charRef);

            updatedCharacters.push({
                ...charSnap.data(),
                address: `https://en.touhouwiki.net/wiki/${char
                    .split(" ")
                    .join("_")}`,
                found: false,
            });
        }

        setChars(updatedCharacters);
    }

    function select_characters() {
        const characters = [];

        do {
            const char = names[~~(Math.random() * names.length)];

            if (!characters.includes(char)) characters.push(char);
        } while (characters.length < 5);
        return characters;
    }

    function play_again() {
        const newChars = select_characters();

        setChars(newChars);
        load_characters_data(newChars);

        setUserIn(false);
        setStartScreenIsShown(true);
        setIsGameOver(false);
    }

    useState(() => {
        initializeApp(config);
        load_characters_data(chars);
    }, []);

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
                className="characters-menu"
                ref={menuRef}
                style={
                    pointerOn
                        ? {
                              top: "-100rem",
                              left: "-100rem",
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
            <SlideScreen
                shown={isShowingCredits}
                close={() => setIsShowingCredits(false)}
                closeButton={true}
                closeWhenClickingOutside={true}
            >
                {chars.every((char) => char.image) ? (
                    <div className="credits">
                        <p>
                            Background Image:
                            <Underlink
                                address={
                                    "https://www.pixiv.net/en/artworks/32372526"
                                }
                            >
                                フウザサ
                            </Underlink>
                        </p>
                        <div className="charedits">
                            {chars.map((char) => (
                                <div key={char.name} className="char">
                                    <img src={char.image} alt={char.name} />
                                    <Underlink address={char.sauce}>
                                        Source
                                    </Underlink>
                                </div>
                            ))}
                        </div>
                        <Underlink address={"https://github.com/kxrn0"}>
                            @kxrn0
                        </Underlink>
                    </div>
                ) : (
                    <Loading />
                )}
            </SlideScreen>
            <SlideScreen
                shown={startScreenIsShown}
                close={start_game}
                closeButton={false}
                closeWhenClickingOutside={false}
            >
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
            <SlideScreen
                shown={isGameOver}
                close={() => console.log("open")}
                closeButton={false}
                closeWhenClickingOutside={false}
            >
                {userIn ? (
                    <div className="leaderboard">
                        {leaderBoard.map((player) => (
                            <div key={player.id} className="player">
                                <p>{player.name}</p>
                                <p>{player.time}</p>
                            </div>
                        ))}
                        <button onClick={play_again}>Play Again</button>
                    </div>
                ) : (
                    <form
                        className="name-form"
                        ref={formRef}
                        onSubmit={handle_submission}
                    >
                        <label htmlFor="player-name">
                            <span>Name: </span>
                            <input
                                type="text"
                                id="player-name"
                                name="player-name"
                                maxlenght="16"
                            />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                )}
            </SlideScreen>
            <Navbar
                characters={chars}
                open_info={open_info}
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
