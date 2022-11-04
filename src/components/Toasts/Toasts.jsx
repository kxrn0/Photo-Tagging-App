import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./toasts.css";

export default function Toasts({ toasts, remove_toast }) {
    return (
        <div className="toasts">
            {toasts.map((toast, index) => (
                <div
                    key={toast.id}
                    className={`toast ${toast.error ? "error" : "success"}`}
                    style={{ top: `${index * 4 + 10}rem` }}
                >
                    <p className="toast-message">{toast.message}</p>
                    <button
                        className="close-toast"
                        onClick={() => remove_toast(toast.id)}
                    >
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
            ))}
        </div>
    );
}
