import { useState } from "react";
import ClientForm from "../ClientForm";
import PartForm from "../PartForm";
import OrderForm from "../OrderForm";
import Card from "../Card";
import { BsCart2, BsPeople, BsBoxSeam, BsCheck2 } from "react-icons/bs";
import SuccessPopUp from "../SuccessPopUp";

export default function QuickActions() {
    const [activeForm, setActiveForm] = useState(null); 
    const [successForm, setSuccessForm] = useState(null);

    return (
        <>
            <Card title="Quick Actions">
                <button className="button orange" onClick={() => setActiveForm("order")}>
                    <BsCart2 className="button-icon" />New Order
                </button>

                <button className="button" onClick={() => setActiveForm("client")}>
                    <BsPeople className="button-icon" />New Client
                </button>

                <button className="button" onClick={() => setActiveForm("part")}>
                    <BsBoxSeam className="button-icon" />New Part
                </button>

                {activeForm === "client" && (
                    <ClientForm
                        onClose={() => setActiveForm(null)}
                        onSuccess={() => {
                            setActiveForm(null);    // close form
                            setSuccessForm("client"); // show success
                        }}
                    />
                )}

                {activeForm === "order" && (
                    <OrderForm
                        onClose={() => setActiveForm(null)}
                        onSuccess={() => setSuccessForm("order")}
                    />
                )}

                {activeForm === "part" && (
                    <PartForm
                        onClose={() => setActiveForm(null)}
                        onSuccess={() => setSuccessForm("part")}
                    />
                )}

                {successForm && (
                    <SuccessPopUp
                        icon={<BsCheck2 />}
                        title="Success!"
                        message={
                            successForm === "client" ? "Client added successfully." :
                            successForm === "order" ? "Order added successfully." :
                            "Part added successfully."
                        }
                        onClose={() => setSuccessForm(null)}
                    />
                )}
            </Card>

        </>
    );
}