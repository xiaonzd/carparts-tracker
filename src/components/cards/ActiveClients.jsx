import Card from "../Card";
import { BsPeople } from "react-icons/bs";

export default function ActiveClients() {
    return (
        <Card title="Active Clients" icon={<BsPeople />}>
            <div className="container-inline-close">
                <h2 className="title">265</h2>
                <p className="card-detail green">+3 new</p>
            </div>
        </Card>
    );
}