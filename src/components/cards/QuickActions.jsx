import { useState } from "react";
import ClientForm from "../ClientForm";
import PartForm from "../PartForm";
import OrderForm from "../OrderForm";
import Card from "../Card";

export default function QuickActions() {
    const [showClientForm, setShowClientForm] = useState(false);
    const [showPartForm, setShowPartForm] = useState(false);
    const [showOrderForm, setShowOrderForm] = useState(false);

    return (
        <>
            <Card title="Quick Actions">
                <button className="button orange" onClick={() => setShowOrderForm(true)}>
                    Create Order
                </button>

                <button className="button" onClick={() => setShowClientForm(true)}>
                    Create Client
                </button>

                <button className="button" onClick={() => setShowPartForm(true)}>
                    Create Part
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