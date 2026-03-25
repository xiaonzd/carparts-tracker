import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function PartForm({ onClose, onSuccess }) {
    const [clientId, setClientId] = useState("");
    const [items, setItems] = useState([
        { partId: "", quantity: 1 }
    ]);
    const [status, setStatus] = useState("Processing");
    const [clients, setClients] = useState([]);
    const [parts, setParts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    useEffect(() => {
        const fetchData = async () => {
            const [clientsResponse, partsResponse] = await Promise.all([
                supabase.from("clients").select("id, name"),
                supabase.from("parts").select("id, name, brand, price, stock")
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

    useEffect(() => {
        let sum = 0;
        items.forEach(item => {
            const part = parts.find(p => p.id === item.partId);
            if (part) sum += (part.price || 0) * item.quantity;
        });
        setTotalPrice(sum);
    }, [items, parts]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent refreshing the page on submit

        const { data: orderData, error: orderError } = await supabase
            .from("orders")
            .insert([{ client_id: clientId, status, total_price: totalPrice }])
            .select()
            .single();

        if (orderError) {
            console.log("Error creating order:", orderError);
            return;
        }

        const orderParts = items.map(item => {
            const part = parts.find(p => p.id === item.partId);
            return {
                order_id: orderData.id,
                part_id: item.partId,
                quantity: item.quantity,
                price_at_purchase: part?.price || 0,
            };
        });  

        const { error: partsError } = await supabase
            .from("order_parts")
            .insert(orderParts);

        if (partsError) {
            console.log("Error adding items:", partsError);
            return;
        }

        // update stock for each part
        for (const item of items) {
            if (!item.partId) continue;
            
            const part = parts.find(p => p.id === item.partId);
            if (!part) continue;
            
            const newStock = (part.stock || 0) - item.quantity;
            
            const { error: stockError } = await supabase
                .from("parts")
                .update({ stock: newStock })
                .eq("id", item.partId);
            
            if (stockError) {
                console.log("Error updating stock:", stockError);
            }
        }

        onClose();
        onSuccess(true);

        // clear the form after submission
        setClientId("");
        setItems([{ partId: "", quantity: 1 }]);
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
                    <div style={{ display: "flex" }}>
                        <div style={{ flex: 1 }}><p className="form-label">Part</p></div>
                        <div style={{ width: "100px" }}><p className="form-label">Quantity</p></div>
                    </div>
                    {items.map((item, index) => (
                        <div key={index} style={{ marginBottom: "15px", display: "flex", gap: "10px", alignItems: "flex-end" }}>
                            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                                <select
                                    className="form-input"
                                    value={item.partId}
                                    onChange={(e) => handleItemChange(index, "partId", e.target.value)}
                                    required
                                >
                                    <option value="">Select a part</option>
                                    {parts.map((part) => (
                                        <option key={part.id} value={part.id}>
                                            {part.brand} - {part.name} (Stock: {part.stock}, Price: {part.price || 0}€)
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", width: "100px" }}>  
                                <input
                                    className="form-input"
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(index, "quantity", Number(e.target.value))}
                                    step={1}
                                    min={1}
                                    required
                                />
                            </div>

                            {items.length > 1 && (
                                <button
                                    type="button"
                                    className="button red"
                                    onClick={() => {
                                        const newItems = items.filter((_, i) => i !== index);
                                        setItems(newItems);
                                    }}
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                    <div style={{ marginBottom: "15px" }}>
                        <button type="button" className="button" onClick={() => setItems([...items, { partId: "", quantity: 1 }])}>
                            + Add Part
                        </button>
                    </div>
                    <div style={{ marginBottom: "15px", marginTop: "15px" }}>
                        <p className="form-label">Total Price: {totalPrice}€</p>
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