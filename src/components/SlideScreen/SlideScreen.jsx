import "./slide_screen.css";

export default function SlideScreen({ children, close, shown }) {
    function handle_click(event) {
        if (event.target.closest(".screen-content") === null) close();
    }

    return (
        <div
            className={`slide-screen ${shown ? "shown" : "hidden"}`}
            // onClick={handle_click}
        >
            {/* <button className="close-screen" onClick={close}></button> */}
            <div className="screen-content">{children}</div>
        </div>
    );
}
