import { useState } from "react";
import Card from "../Card";
import PartForm from "./../PartForm";
import SuccessPopUp from "../SuccessPopUp";
import { BsPencil } from "react-icons/bs";

export default function PartDetails({ part }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const formattedPrice = (price) => {
        return new Intl.NumberFormat("pt-PT", {
            style: "currency",
            currency: "EUR",
        }).format(price);
    }
  
    return (
        <Card title={part?.name}>
            <div className="container-inline">
                <p className="card-text">Ref</p>
                <p className="card-text gray">{part?.ref}</p>
            </div>
            <div className="container-inline">
                <p className="card-text">Brand</p>
                <p className="card-text gray">{part?.brand}</p>
            </div>            
            <div className="container-inline">
                <p className="card-text">Price</p>
                <p className="card-text gray">{formattedPrice(part?.price)}</p>
            </div>
            <button className="button" onClick={() => setIsOpen(true)}>
                <BsPencil className="button-icon" />Edit Part
            </button>
            {isOpen && (
                <PartForm
                    part={part}
                    onClose={() => setIsOpen(false)}
                    onSuccess={() => {setIsOpen(false); setShowSuccess(true); }}
                />
            )}
            {showSuccess && (
                <SuccessPopUp
                    message="Part updated successfully!"
                    onClose={() => setShowSuccess(false)}
                />
            )}
        </Card>
    );
}