import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Header from "../components/Header";
import ClientDetails from "../components/cards/ClientDetails";
import ClientOrders from "../components/cards/ClientOrders";


export default function Client() {
    const [client, setClient] = useState(null);
    const { id: clientId } = useParams();

    useEffect(() => {
        const fetchClient = async () => {
            const { data, error } = await supabase
                .from("clients")
                .select(`id, name, email, phone, orders ( id, created_at, status, total_price, order_parts ( parts (name, brand, price)))`)
                .eq("id", clientId)
                .single();

            if (error) {
                console.error("Error fetching client:", error);
            } else {
                setClient(data);
            }
        };

        fetchClient();
    }, [clientId]);

    return (
        <div className="page-grid">
            <Header title="Client"/>
            <div className="container-inline">
                <ClientOrders orders={client?.orders} />
                <div style={{ flex: 0.5, display: "flex", flexDirection: "column", gap: "20px" }}>
                    <ClientDetails client={client} />
                </div>
            </div>
        </div>
    )
}