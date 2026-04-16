import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Header from "../components/Header";
import OrderProfileDetails from "./../components/cards/OrderProfileDetails";
import OrderItems from "../components/cards/OrderItems";
import OrderDetails from "../components/cards/OrderDetails";

export default function Order() {
    const [order, setOrder] = useState(null);
    const { id: orderId } = useParams();

    const fetchOrder = useCallback(async () => {
        const { data, error } = await supabase
            .from("orders")
            .select("id, created_at, status, total_price, order_parts (quantity, parts (id, name, brand, price)), clients (id, name, email, phone)")
            .eq("id", orderId)
            .single();

        if (error) {
                console.error("Error fetching order:", error);
            } else {
                setOrder(data);
            }
    }, [orderId]);

    useEffect(() => {
        fetchOrder();
    }, [fetchOrder]);

    return (
        <div className="page-grid">
            <Header title="Order"/>
            <div className="container-inline">
                <OrderItems order={order} />
                <div style={{ flex: 0.5, display: "flex", flexDirection: "column", gap: "20px" }}>
                    <OrderProfileDetails order={order} />
                    <OrderDetails order={order} refetchOrder={fetchOrder} />
                </div>
            </div>
        </div>
    )
}