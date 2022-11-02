import { useEffect, useRef, useState } from "react";

import "./pointer.css";

export default function Pointer({ shown }) {
    const [lastY, setLastY] = useState(0);
    const poiRef = useRef(null);

    useEffect(() => {
        function reposition_after_move(event) {
            poiRef.current.style.left = `calc(${event.clientX}px - var(--diameter) / 2)`;
            poiRef.current.style.top = `calc(${
                event.clientY + window.scrollY
            }px - var(--diameter) / 2)`;
            setLastY(event.clientY);
        }

        function reposition_after_scroll() {
            poiRef.current.style.top = `calc(${
                lastY + window.scrollY
            }px - var(--diameter) / 2)`;
        }

        document.addEventListener("mousemove", reposition_after_move);

        document.addEventListener("scroll", reposition_after_scroll);

        return () => {
            document.removeEventListener("mousemove", reposition_after_move);

            document.removeEventListener("scroll", reposition_after_scroll);
        };
    }, [lastY]);

    return (
        <div className={`pointer ${shown ? "active" : ""}`} ref={poiRef}></div>
    );
}
