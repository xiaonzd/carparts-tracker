import { useLocation, Link } from "react-router-dom";
import { BsCart2, BsPeople, BsSpeedometer2 } from "react-icons/bs";

export default function Header( {title} ) {
    const location = useLocation();

    return (
        <div className="container-inline" style={{ marginTop: "10px" }}>
            <h2 className="title">{title}</h2>
            <div style={{ display: "flex", gap: "20px" }}>
                {location.pathname !== "/" && (
                    <button className="button orange" onClick={() => window.location.href = "/"}>
                        <BsSpeedometer2 style={icon} />Dashboard
                    </button>
                )}
                {location.pathname !== "/orders" && (
                    <button className="button" onClick={() => window.location.href = "/orders"}>
                        <BsCart2 style={icon} />All Orders
                    </button>
                )}
                {location.pathname !== "/clients" && (
                    <button className="button" onClick={() => window.location.href = "/clients"}>
                        <BsPeople style={icon} />All Clients
                    </button>
                )}
            </div>
        </div>
    );
}

const icon = {
    marginRight: "8px"
}