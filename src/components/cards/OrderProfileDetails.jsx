import Card from "../Card";

export default function OrderProfileDetails({ order }) {
    return (
        <Card title={order?.clients.name}>
            <div className="container-inline">
                <p className="card-text">Email</p>
                <p className="card-detail">{order?.clients.email.length > 0 ? order?.clients.email : "No email saved."}</p>
            </div>
            <div className="container-inline">
                <p className="card-text">Phone</p>
                <p className="card-detail">{order?.clients.phone.length > 0 ? order?.clients.phone : "No phone number saved."}</p>
            </div>
        </Card>
    )
}