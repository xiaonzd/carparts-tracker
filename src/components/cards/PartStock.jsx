import { useState } from "react";
import Card from "../Card";
import { BsPencil } from "react-icons/bs";

export default function PartDetails({ part }) {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
        <Card title="Stock">
            <div className="container-inline"> 
                <p className="card-text">Stock</p>
                <p className="card-text gray">{part?.stock}</p>
            </div>
            <div className="container-inline"> 
                <p className="card-text">Min Stock</p>
                <p className="card-text gray">{part?.min_stock}</p>
            </div>
            <button className="button" onClick={() => setIsOpen(true)}>
                <BsPencil className="button-icon" />Edit Stock
            </button>
        </Card>
    );
}