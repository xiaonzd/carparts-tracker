import { useState, useEffect } from "react";
import Card from "../Card";
import { BsArrowRepeat  } from "react-icons/bs";
import { statusMapping } from "./../statusMapping";
import { supabase } from "../../supabaseClient";

export default function OrderDetails({ order, refetchOrder }) {
    const [isEditingStatus, setIsEditingStatus] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(order?.status);

    useEffect(() => {
        if (order?.status) {
            setSelectedStatus(order.status);
        }
    }, [order]);

    const formattedTotalPrice = (price) => {
        return new Intl.NumberFormat("pt-PT", {
            style: "currency",
            currency: "EUR",
        }).format(price);
    }

    const formattedDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString();
        return `${day}/${month}/${year}`;
    };

    const optionsStatus = [
        { value: "Processing", label: "Processing" },
        { value: "Shipped", label: "Shipped" },
        { value: "Delivered", label: "Delivered" },
    ];

    const handleStatusButton = async () => {
        if (isEditingStatus) {
            await handleUpdateStatus(); // save
        } else {
            setIsEditingStatus(true); // enter edit mode
        }
    };

    const handleUpdateStatus = async () => {

        const { error } = await supabase
            .from("orders")
            .update({ status: selectedStatus })
            .eq("id", order.id);

        if (error) {
            console.log("Error updating status:", error);
            return;
        }
        await refetchOrder();
        setIsEditingStatus(false);
    };

    return (
        <Card title="Order Details">
            <div className="container-inline" style={{ alignItems: "flex-end" }}>
                <p className="card-text">Status</p>
                {isEditingStatus ? (
                    <div className="container-inline">
                        {optionsStatus.map((option) => (
                            <a className={`card-text status pointer ${selectedStatus === option.value ? `${statusMapping[option.value]} active` : "default"}`} key={option.value} onClick={() => setSelectedStatus(option.value)}>
                                {option.label}
                            </a>
                        ))}
                    </div>
                ) : (
                    <p className={`card-text ${statusMapping[order?.status] || "default"}`}>
                        {order?.status}
                    </p>
                )}
            </div>

            <div className="container-inline">
                <p className="card-text">Total Price</p>
                <p className="card-text gray">{formattedTotalPrice(order?.total_price)}</p>
            </div>

            <div className="container-inline">
                <p className="card-text">Order Date</p>
                <p className="card-text gray">{formattedDate(order?.created_at)}</p>
            </div>
            
            <button className={`button ${isEditingStatus ? "orange" : ""}`} onClick={handleStatusButton}>
                <BsArrowRepeat className="button-icon" />{isEditingStatus ? "Save" : "Update Status"}
            </button>     
        </Card> 
    )
}