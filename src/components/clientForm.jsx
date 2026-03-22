import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function ClientForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); //prevent refreshing the page on submit

        const { data, error } = await supabase
        .from("clients")
        .insert([
            { name, email, phone }
        ]);

        if (error) {
            console.log("Error creating client:", error);
            return;
        }

        //clear the form after submission
        setName("");
        setEmail("");
        setPhone("");
    };

    return (
        <div style={overlay}>
            <div style={modal}>
                <h2 style={title}>Create Client</h2>

                <button style={closeButton}>
                ✕
                </button>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "15px" }}>
                        <label style={formLabel} htmlFor="name">Name</label>
                        <input style={formInput} type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                        <label style={formLabel} htmlFor="email">Email</label>
                        <input style={formInput} type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                        <label style={formLabel} htmlFor="phone">Phone</label>
                        <input style={formInput} type="text" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <button style={button} type="submit">Create</button>
                </form>
            </div>
        </div>
    )
}

const overlay = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
};

const modal = {
    background: "white",
    padding: "20px",
    margin: "100px auto",
    width: "300px",
    borderRadius: "8px",
    position: "relative",
};

const title = {
    margin: "0 0 20px 0",
};

const closeButton = {
  position: "absolute",
  top: "20px",
  right: "20px",
  background: "transparent",
  border: "none",
  fontSize: "18px",
  cursor: "pointer",
};

const formLabel = {
    display: "block",
    marginBottom: "5px",
};

const formInput = {
    width: "stretch", //must research about this feature because its usually 100% but i believe this is a new thing but unsure if its only for chrome
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #ccc",
};

const button = {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    background: "blue",
    color: "white",
};