export default function SuccessPopUp({ icon, title, message, onClose }) {
    return (
        <div className="overlay">
            <div className="modal">
                <h2 className="title"><span>{icon}</span>{title}</h2>
                <p className="card-text-regular">{message}</p>
                <button className="close-button" onClick={onClose}>
                ✕
                </button>
            </div>
        </div>
    )
}