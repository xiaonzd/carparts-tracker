import { useEffect, useState } from "react";
import Card from "../Card";
import { BsCurrencyEuro } from "react-icons/bs";
import { supabase } from "../../supabaseClient";

export default function MonthlyRevenue() {
    const [revenue, setRevenue] = useState(0);

    useEffect(() => {
        const fetchRevenue = async () => {
            const { data, error } = await supabase
                .from("orders")
        }
    }, []);

    return (
        <Card title="Monthly Revenue" icon={<BsCurrencyEuro />}>
            <div className="container-inline-close">
                <h2 className="title">0€</h2>
                <p className="card-detail green">+12.5%</p>
            </div>
        </Card>
    );
}