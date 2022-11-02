import "./underlink.css";

export default function Underlink({ address, children }) {
    return (
        <span className="underlink">
            <a href={address} target="_blank">
                {children}
            </a>
            <span></span>
        </span>
    );
}
