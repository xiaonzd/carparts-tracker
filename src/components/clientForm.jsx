import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function ClientForm({ onClose }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent refreshing the page on submit

        const { error } = await supabase
        .from("clients")
        .insert([
            { name, email, phone }
        ]);
        //.select();

        if (error) {
            console.log("Error creating client:", error);
            return;
        }

        // clear the form after submission
        setName("");
        setEmail("");
        setPhone("");
    };

    return (
        <div className="overlay">
            <div className="modal">
                <h2 className="title">Create Client</h2>

                <button className="close-button" onClick={onClose}>
                ✕
                </button>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "15px" }}>
                        <label className="form-label" htmlFor="name">Name</label>
                        <input className="form-input" type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                        <label className="form-label" htmlFor="email">Email</label>
                        <input className="form-input" type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                        <label className="form-label" htmlFor="phone">Phone</label>
                        <input className="form-input" type="text" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <button className="button orange" type="submit">Create</button>
                </form>
            </div>
        </div>
    )
}