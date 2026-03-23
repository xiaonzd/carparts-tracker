export default function SuccessPopUp({ message, onClose }) {
    return (
        <div className="overlay">
            <div className="modal">
                <h2 className="title">{message}</h2>
                <button className="button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    )
}