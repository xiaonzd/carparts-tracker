import {useState} from "react";
import { supabase } from "../supabaseClient";

export default function PartForm({ onClose }) {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [minStock, setMinStock] = useState(0);
    const [ref, setRef] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent refreshing the page on submit

        const { error } = await supabase
        .from("parts")
        .insert([
            { name, brand, price, stock, min_stock: minStock, ref }
        ]);
        //.select();

        if (error) {
            console.log("Error creating part:", error);
            return;
        }

        // clear the form after submission
        setName("");
        setBrand("");
        setPrice(0);
        setStock(0);
        setMinStock(0);
        setRef("");
    };

    return (
        <div className="overlay">
            <div className="modal">
                <h2 className="title">Create Part</h2>

                <button className="close-button" onClick={onClose}>
                ✕
                </button>

                <form onSubmit={handleSubmit}>
                    <div style={{marginBottom: "15px"}}>
                        <label className="form-label" htmlFor="name">Name</label>
                        <input className="form-input" type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="container-inline">
                        <div style={{marginBottom: "15px"}}>
                            <label className="form-label" htmlFor="ref">Ref</label>
                            <input className="form-input" type="text" id="ref" name="ref" value={ref} onChange={(e) => setRef(e.target.value)} required />
                        </div>
                        <div style={{marginBottom: "15px"}}>
                            <label className="form-label" htmlFor="brand">Brand</label>
                            <input className="form-input" type="text" id="brand" name="brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />
                        </div>
                    </div>
                    <div style={{marginBottom: "15px"}}>
                        <label className="form-label" htmlFor="price">Price</label>
                        <input className="form-input" type="number" id="price" name="price" value={price} onChange={(e) => setPrice(Number(e.target.value))} step={0.01} min={0} required />
                    </div>
                    <div className="container-inline">
                        <div style={{marginBottom: "15px"}}>
                            <label className="form-label" htmlFor="stock">Stock</label>
                            <input className="form-input" type="number" id="stock" name="stock" value={stock} onChange={(e) => setStock(Number(e.target.value))} step={1} min={0} required />
                        </div>
                        <div style={{marginBottom: "15px"}}>
                            <label className="form-label" htmlFor="minStock">Min Stock</label>
                            <input className="form-input" type="number" id="minStock" name="minStock" value={minStock} onChange={(e) => setMinStock(Number(e.target.value))} step={1} min={0} required />
                        </div>
                    </div>
                    <button className="button orange" type="submit">Create</button>
                </form>

            </div>
            
        </div>
    )
}