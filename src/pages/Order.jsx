import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Header from "../components/Header";
import OrderProfileDetails from "./../components/cards/OrderProfileDetails";
import OrderDetails from "../components/cards/OrderItems";
import OrderStatus from "../components/cards/OrderDetails";

export default function Order() {
    const [order, setOrder] = useState(null);
    const { id: orderId } = useParams();

    useEffect(() => {
        const fetchOrder = async () => {
            const { data, error } = await supabase
                .from("orders")
                .select("id, created_at, status, total_price, order_parts (quantity, parts (name, brand, price)), clients (id, name, email, phone)")
                .eq("id", orderId)
                .single();

            if (error) {
                console.error("Error fetching order:", error);
            } else {
                setOrder(data);
            }
        };
        fetchOrder();
    }, [orderId]);

    return (
        <div className="page-grid">
            <Header title="CarParts Tracker" />
            <div className="container-inline">
                <OrderDetails order={order} />
                <div style={{ flex: 0.5, display: "flex", flexDirection: "column", gap: "20px" }}>
                    <OrderProfileDetails order={order} />
                    <OrderStatus order={order} />
                </div>
            </div>
        </div>
    )
}