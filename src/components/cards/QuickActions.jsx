import { useState } from "react";
import ClientForm from "../ClientForm";
import PartForm from "../PartForm";
import OrderForm from "../OrderForm";
import Card from "../Card";
import { BsCart2 } from "react-icons/bs";
import { BsPeople } from "react-icons/bs";
import { BsBoxSeam } from "react-icons/bs";

export default function QuickActions() {
    const [showClientForm, setShowClientForm] = useState(false);
    const [showPartForm, setShowPartForm] = useState(false);
    const [showOrderForm, setShowOrderForm] = useState(false);

    return (
        <>
            <Card title="Quick Actions">
                <button className="button orange" onClick={() => setShowOrderForm(true)}>
                    <BsCart2 style={icon} />New Order
                </button>

                <button className="button" onClick={() => setShowClientForm(true)}>
                    <BsPeople style={icon} />New Client
                </button>

                <button className="button" onClick={() => setShowPartForm(true)}>
                    <BsBoxSeam style={icon} />New Part
                </button>

                {showOrderForm && (
                <OrderForm onClose={() => setShowOrderForm(false)} />
                )}

                {showClientForm && (
                <ClientForm onClose={() => setShowClientForm(false)} />
                )}

                {showPartForm && (
                <PartForm onClose={() => setShowPartForm(false)} />
                )}
            </Card>

        </>
    );
}

const icon = {
    marginRight: "8px"
}