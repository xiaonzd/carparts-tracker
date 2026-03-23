import Card from "../Card";
import { BsCurrencyEuro } from "react-icons/bs";

export default function MonthlyRevenue() {
    return (
        <Card title="Monthly Revenue" icon={<BsCurrencyEuro />}>
            <div className="container-inline-close">
                <h2 className="title">0€</h2>
                <p className="card-detail green">+12.5%</p>
            </div>
        </Card>
    );
}