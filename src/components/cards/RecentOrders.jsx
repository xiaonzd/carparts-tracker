import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Card from "../Card";
import { supabase } from "../../supabaseClient";

export default function RecentOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchOrders() {
            const { data, error } = await supabase
                .from("orders")
                .select("client_id, part_id, quantity, status, created_at")
                .order("created_at", { ascending: false })
                .limit(5);
        }
    })
}
