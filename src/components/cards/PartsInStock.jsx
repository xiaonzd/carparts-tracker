import Card from "../Card";
import { BsBoxSeam } from "react-icons/bs";

export default function PartsInStock() {
    return (
        <Card title="Parts In Stock" icon={<BsBoxSeam />}>
            <div className="container-inline-close">
                <h2 className="title">1,846</h2>
                <p className="card-detail red">-24</p>
            </div>
        </Card>
    );
}