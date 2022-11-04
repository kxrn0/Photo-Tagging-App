import "./slide_screen.css";
import { mdiCloseCircle } from "@mdi/js";
import Icon from "@mdi/react";

export default function SlideScreen({
    children,
    close,
    shown,
    closeButton,
    closeWhenClickingOutside,
}) {
    function handle_click(event) {
        if (closeWhenClickingOutside)
            if (event.target.closest(".screen-content") === null) close();
    }

    return (
        <div
            className={`slide-screen ${shown ? "shown" : "hidden"}`}
            onClick={handle_click}
        >
            {closeButton && (
                <button className="close-screen" onClick={close}>
                    <Icon path={mdiCloseCircle} />
                </button>
            )}
            <div className="screen-content">{children}</div>
        </div>
    );
}
