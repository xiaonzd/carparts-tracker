import { useState } from "react";
import Card from "../Card";
import ClientForm from "./../ClientForm";
import SuccessPopUp from "../SuccessPopUp";
import { BsPencil } from "react-icons/bs";

export default function ClientDetails({ client }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    return (
        <Card title={`${client?.name}`}>
            <div className="container-inline">
                <p className="card-text">Email</p>
                <p className="card-text gray">{client?.email.length > 0 ? client?.email : "No email saved."}</p>
            </div>
            <div className="container-inline">
                <p className="card-text">Phone</p>
                <p className="card-text gray">{client?.phone.length > 0 ? client?.phone : "No phone number saved."}</p>
            </div>
            <button className="button" onClick={() => setIsOpen(true)}>
                <BsPencil className="button-icon" />
                Edit Client
            </button>

            {isOpen && (
                <ClientForm
                    client={client}
                    onClose={() => setIsOpen(false)}
                    onSuccess={() => {
                        setIsOpen(false);
                        setShowSuccess(true);
                    }}
                />
            )}

            {showSuccess && (
                <SuccessPopUp
                    icon={<BsCheck2 />}
                    message="Client details updated successfully."
                    onClose={() => setShowSuccess(false)}
                />
            )}
        </Card>
    )
}