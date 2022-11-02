import "./toasts.css";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";

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
            <Icon path={mdiClose} />
          </button>
        </div>
      ))}
    </div>
  );
}

