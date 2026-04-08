import { useState, useEffect } from "react";
import Select from "react-select";
import { reactSelectStyles } from "../components/reactSelectStyles";
import { supabase } from "../supabaseClient";
import { data } from "react-router-dom";

export default function PartForm({ onClose, onSuccess }) {
    const [clientId, setClientId] = useState("");
    const [items, setItems] = useState([{ partId: "", quantity: 1 }]);
    const [status, setStatus] = useState("Processing");
    const [clients, setClients] = useState([]);
    const [parts, setParts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const optionsStatus = [
        { value: "Processing", label: "Processing" },
        { value: "Shipped", label: "Shipped" },
        { value: "Delivered", label: "Delivered" },
    ];
    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    useEffect(() => {
        const fetchData = async () => {
            const [
                {data: clientsData, error: clientsError },
                { data: partsData, error: partsError }
            ] = await Promise.all([
                supabase.from("clients").select("id, name"),
                supabase.from("parts").select("id, name, brand, price, stock")
            ]);

            if (clientsError) {
                console.log("Error fetching clients:", clientsError);
                return;
            }

            if (partsError) {
                console.log("Error fetching parts:", partsError);
                return;
            }

            const optionsClients = clientsData.map(client => ({
                value: client.id,
                label: client.name
            }));

            const optionsParts = partsData.map(part => ({
                value: part.id,
                label: `${part.name} (${part.brand})`,
                price: part.price,
                stock: part.stock
            }));

            setClients(optionsClients);
            setParts(optionsParts);
        };

        fetchData();
    }, []);

    useEffect(() => {
        let sum = 0;
        items.forEach(item => {
            const part = parts.find(part => part.value === item.partId);
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
            const part = parts.find(part => part.value === item.partId);
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
            
            const part = parts.find(part => part.value === item.partId);
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
                        <p className="form-label">Client</p>
                        <Select
                            name="client"
                            options={clients}
                            value={clients.find(client => client.value === clientId)}
                            onChange={(selected) => setClientId(selected.value)}
                            placeholder="Select a client"
                            isSearchable={true}
                            components={{
                                IndicatorSeparator: () => null
                            }}
                            styles={reactSelectStyles}
                        />
                
                    </div>
                    <div style={{ display: "flex" }}>
                        <div style={{ flex: "1" }}><p className="form-label">Part</p></div>
                        <div style={{ width: "100px" }}><p className="form-label">Quantity</p></div>
                    </div>
                    {items.map((item, index) => (
                        <div key={index} style={{ marginBottom: "15px", display: "flex", gap: "10px", alignItems: "flex-end" }}>
                            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                                <Select
                                    name="part"
                                    options={parts}
                                    value={parts.find(part => part.value === item.partId)}
                                    onChange={(selected) => handleItemChange(index, "partId", selected.value)}
                                    placeholder="Select a part"
                                    isSearchable={true}
                                    components={{
                                        IndicatorSeparator: () => null
                                    }}
                                    styles={reactSelectStyles}
                                />
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
                        <p className="form-label">Total Price: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(totalPrice)}€</p>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <p className="form-label">Status</p>
                        <Select
                            name="status"
                            options={optionsStatus}
                            value={optionsStatus.find(option => option.value === status)}
                            onChange={(selected) => setStatus(selected.value)}
                            components={{
                                IndicatorSeparator: () => null
                            }}
                            styles={reactSelectStyles}
                        />
                    </div>

                    <button className="button orange" type="submit">Create</button>
                </form>
            </div>
        </div>
    )
}