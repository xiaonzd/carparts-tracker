import { useState, useEffect, use } from "react";
import { supabase } from "../supabaseClient";

export default function PartForm({ onClose }) {
    const [clientId, setClientId] = useState("");
    const [partId, setPartId] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [status, setStatus] = useState("Processing");
    const [clients, setClients] = useState([]);
    const [parts, setParts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const [clientsResponse, partsResponse] = await Promise.all([
                supabase.from("clients").select("id, name"),
                supabase.from("parts").select("id, name, brand, stock")
            ]);

            if (clientsResponse.error) {
                console.log("Error fetching clients:", clientsResponse.error);
                return;
            }

            if (partsResponse.error) {
                console.log("Error fetching parts:", partsResponse.error);
                return;
            }

            setClients(clientsResponse.data);
            setParts(partsResponse.data);
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent refreshing the page on submit

        const { error } = await supabase
        .from("orders")
        .insert([
            { client_id: clientId, part_id: partId, quantity, status }
        ])
        .select();

        if (error) {
            console.log("Error creating order:", error);
            return;
        }

        // clear the form after submission
        setClientId("");
        setPartId("");
        setQuantity(0);
        setStatus("Processing");
    }

    return (
        <div className="overlay">
            <div className="modal">
                <h2 className="title">New Order</h2>

                <button className="close-button" onClick={onClose}>
                ✕
                </button>

                <form onSubmit={handleSubmit}>
                    <div style={{marginBottom: "15px"}}>
                        <label className="form-label" htmlFor="clientId">Client</label>
                        <select className="form-input" name="clientId" value={clientId} onChange={(e) => setClientId(e.target.value)} required>
                            <option value="">Select a client</option>
                            {clients.map((client) => (
                                <option key={client.id} value={client.id}>
                                    {client.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div style={{marginBottom: "15px"}}>
                        <label className="form-label" htmlFor="partId">Part</label>
                        <select className="form-input" name="partId" value={partId} onChange={(e) => setPartId(e.target.value)} required>
                            <option value="">Select a part</option>
                            {parts.map((part) => (
                                <option key={part.id} value={part.id}>
                                    {part.brand} - {part.name} (Stock: {part.stock})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div style={{marginBottom: "15px"}}>
                        <label className="form-label" htmlFor="quantity">Quantity</label>
                        <input className="form-input" type="number" id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} step={1} min={1} required />
                    </div>
                    <div style={{marginBottom: "15px"}}>
                        <label className="form-label" htmlFor="status">Status</label>
                        <select className="form-input" htmlFor="status" name="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                        </select>
                    </div>
                    <button className="button orange" type="submit">Create</button>
                </form>
            </div>
        </div>
    )
}