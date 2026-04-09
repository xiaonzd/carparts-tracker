import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import OrderProfileDetails from "./OrderProfileDetails";
import OrderDetails from "./OrderDetails";

export default function Order() {
    const [order, setOrder] = useState(null);
    const { id: orderId } = useParams();

    useEffect(() => {
        const fetchOrder = async () => {
            const { data, error } = await supabase
                .from("orders")
                .select("id, created_at, status, total_price, order_parts (parts (name, brand)), clients (name)")
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
            <OrderProfileDetails order={order} />
            <OrderDetails order={order} />
        </div>
    )
}