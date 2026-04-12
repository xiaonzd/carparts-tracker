import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Header from "../components/Header";
import PartDetails from "../components/cards/PartDetails";
import PartStock from "../components/cards/PartStock";
import PartOrders from "../components/cards/PartOrders";

export default function Part() {
    const [part, setPart] = useState(null);
    const { id: partId } = useParams();

    useEffect(() => {
        const fetchPart = async () => {
            const { data, error } = await supabase
                .from("parts")
                .select(`id, name, brand, price, stock, min_stock, ref, order_parts ( orders ( id, created_at, status, total_price, clients ( name )))`)
                .eq("id", partId)
                .single();

            if (error) {
                console.error("Error fetching part:", error);
            } else {
                setPart(data);
            }
        };

        fetchPart();
    }, [partId]);

    return (
        <div className="page-grid">
            <Header title="Part"/>
            <div className="container-inline">
                <PartOrders orders={part?.order_parts?.map(op => op.orders)} />
                <div style={{ flex: 0.5, display: "flex", flexDirection: "column", gap: "20px" }}>
                    <PartDetails part={part} />
                    <PartStock part={part} />
                </div>
            </div>
        </div>
    );
}