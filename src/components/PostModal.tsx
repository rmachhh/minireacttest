import { memo, useEffect } from "react";

interface PostModalProps {
  isOpen?: boolean;
  title: string;
  content: string;
  onClose?: () => void;
}

export const PostModal = memo(
  ({ isOpen, title, content, onClose }: PostModalProps) => {
    // Handle Escape key press
    useEffect(() => {
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === "Escape" && onClose) {
          onClose();
        }
      };

      if (isOpen) {
        window.addEventListener("keydown", handleEscapeKey);
      }

      // Cleanup
      return () => {
        window.removeEventListener("keydown", handleEscapeKey);
      };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
      <dialog className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{content}</p>
          <div className="modal-action">
            <form method="dialog">
              <button type="button" className="btn" onClick={onClose}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    );
  }
);
