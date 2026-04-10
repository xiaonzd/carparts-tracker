import Card from "../Card";
import { BsArrowRepeat  } from "react-icons/bs";

export default function OrderStatus({ order }) {
    const formattedTotalPrice = (price) => {
        return new Intl.NumberFormat("pt-PT", {
            style: "currency",
            currency: "EUR",
        }).format(price);
    }

    const formattedDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString();
        return `${day}/${month}/${year}`;
    };

    return (
        <Card title="Order Details">
            <div className="container-inline">
                <p className="card-text">Status</p>
                <p className="card-text gray">{order?.status}</p>
            </div>

            <div className="container-inline">
                <p className="card-text">Total Price</p>
                <p className="card-text gray">{formattedTotalPrice(order?.total_price)}</p>
            </div>

            <div className="container-inline">
                <p className="card-text">Order Date</p>
                <p className="card-text gray">{formattedDate(order?.created_at)}</p>
            </div>
            
            <button className="button">
                <BsArrowRepeat className="button-icon" />Update Status
            </button>
        </Card> 
    )
}