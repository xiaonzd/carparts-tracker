import MonthlyRevenue from "../components/cards/MontlyRevenue";
import QuickActions from "../components/cards/QuickActions"
import LowStockAlerts from "../components/cards/LowStockAlerts";
import OrdersGraph from "../components/cards/OrdersGraph";
import OrdersThisMonth from "../components/cards/OrdersThisMonth";
import Clients from "../components/cards/Clients";
import PartsInStock from "../components/cards/PartsInStock";
import RecentOrders from "../components/cards/RecentOrders";
import Header from "../components/Header";

export default function Dashboard() {
    return (

        <div className="page-grid">
            <Header title="CarParts Tracker" />
            <div className="container-inline">
                <MonthlyRevenue />
                <OrdersThisMonth /> 
                <Clients />
                <PartsInStock />
            </div>

            <div className="container-inline">
                <OrdersGraph />
                
                <div style={{ flex: 0.5, display: "flex", flexDirection: "column", gap: "20px" }}>
                    <QuickActions />
                    <LowStockAlerts />
                </div>
            </div>

            <RecentOrders />
        </div>
    )
}