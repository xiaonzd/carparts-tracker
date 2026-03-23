import Card from "../Card";
import { BsCart2 } from "react-icons/bs";

export default function OrdersThisMonth() {
    return (
        <Card title="Orders This Month" icon={<BsCart2 />}>
            <div className="container-inline-close">
                <h2 className="title">125</h2>
                <p className="card-detail green">+8.2%</p>
            </div>
        </Card>
    );
}