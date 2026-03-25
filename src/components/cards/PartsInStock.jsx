import { useEffect, useState } from "react";
import Card from "../Card";
import { BsBoxSeam } from "react-icons/bs";
import { supabase } from "../../supabaseClient";

export default function PartsInStock() {
    const [partsInStock, setPartsInStock] = useState(0);
    const [monthlyOrdersQuantity, setMonthlyOrdersQuantity] = useState(0);

    useEffect(() => {
        const fetchTotalStock = async () => {
            const { data: partsData, error: partsError } = await supabase
                .from("parts")
                .select("stock");

            if (partsError) {
                console.log("Error fetching parts:", partsError);
                return;
            }

            const totalStock = partsData.reduce((sum, part) => sum + (part.stock || 0), 0);
            setPartsInStock(totalStock);

            const currentDate = new Date();
            const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString();
            const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59).toISOString();

            const { data: orderPartsData, error: orderPartsError } = await supabase
                .from("order_parts")
                .select(`quantity, orders!inner(created_at)`)
                .gte("orders.created_at", startOfMonth)
                .lte("orders.created_at", endOfMonth);

            if (orderPartsError) {
                console.log("Error fetching orders:", orderPartsError);
                return;
            }

            const totalQuantity = orderPartsData.reduce((sum, item) => sum + (item.quantity || 0), 0);
            setMonthlyOrdersQuantity(totalQuantity);
        };

        fetchTotalStock();
    }, []);

    return (
        <Card title="Parts In Stock" icon={<BsBoxSeam />}>
            <div className="container-inline-close">
                <h2 className="title">{partsInStock.toLocaleString()}</h2>
                <p className={`card-detail ${monthlyOrdersQuantity === 0 ? "green" : "red"}`}>-{monthlyOrdersQuantity.toLocaleString()}</p>
            </div>
        </Card>
    );
}