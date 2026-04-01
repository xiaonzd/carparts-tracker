import { useEffect, useState } from "react"
import Card from "../Card"
import { supabase } from "../../supabaseClient";

export default function LowStockAlerts() {
    const [LowStockParts, setLowStockParts] = useState([]);

    useEffect(() => {
        const fetchLowStockParts = async () => {
            const { data, error } = await supabase
                .from("parts")
                .select("id, name, brand, stock, min_stock, ref")
                .order("stock", { ascending: true }); // lower stock first

            if (error) {
                console.log("Error fetching low stock parts:", error);
                return;
            }

            const lowStockParts = data.filter(part => part.stock < part.min_stock);
            setLowStockParts(lowStockParts);
        };

        fetchLowStockParts();
    }, []);

    return (
        <Card title="Low Stock Alerts">
            <div style={LowStockList}>
                {LowStockParts.length === 0 ? (
                    <p className="card-detail">All parts are sufficiently stocked.</p>
                ) : (
                    LowStockParts.map(part => (
                        <div className="container-inline" key={part.id}>
                            <div style={partDetails}>
                                <p className="card-text">{part.brand} - {part.name}</p>
                                <p className="card-detail">{part.ref}</p>
                            </div>

                            <div style={partStock}>
                                <p className="card-text red">{part.stock} left</p>
                                <p className="card-detail">Min: {part.min_stock}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Card>
    );
}

const partDetails = {
    display: "flex",
    flexDirection: "column",
    width: "90%",
}

const partStock = {
    display: "flex",
    flexDirection: "column",
    width: "10%",
}

const LowStockList = {
    maxHeight: "calc(4 * (20px + 16px) + 3 * 8px)",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
}