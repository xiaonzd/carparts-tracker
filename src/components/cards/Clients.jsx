import { useEffect, useState } from "react";
import Card from "../Card";
import { BsPeople } from "react-icons/bs";
import { supabase } from "../../supabaseClient";

export default function Clients() {
    const [clients, setClients] = useState(0);
    const [newClients, setNewClients] = useState(0);

    useEffect(() => {
        const fetchClients = async () => {
            const { data, error } = await supabase
                .from("clients")
                .select("id, created_at")

            if (error) {
                console.log("Error fetching clients:", error);
                return;
            }

            const now = new Date();
            const currentMonth = now.getMonth();
            const currentYear = now.getFullYear();

            const newClients = data.filter(client => {
                const created = new Date(client.created_at);

                return (
                    created.getMonth() === currentMonth &&
                    created.getFullYear() === currentYear
                );
            });

            setClients(data.length);
            setNewClients(newClients.length);
        };

        fetchClients();
    }, []);

    return (
        <Card title="Clients" icon={<BsPeople />}>
            <div className="container-inline-close">
                <h2 className="title">{clients}</h2>
                <p className={`card-detail ${newClients === 0 ? "red" : "green"}`}>+{newClients} new</p>
            </div>
        </Card>
    );
}