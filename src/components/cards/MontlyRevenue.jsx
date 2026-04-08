import { useEffect, useState } from "react";
import Card from "../Card";
import { BsCurrencyEuro } from "react-icons/bs";
import { supabase } from "../../supabaseClient";

export default function MonthlyrevenueThisMonth() {
    const [revenueThisMonth, setRevenueThisMonth] = useState(0);
    const [growth, setGrowth] = useState(0);

    useEffect(() => {
        const fetchrevenueThisMonth = async () => {
            const { data, error } = await supabase
                .from("orders")
                .select("total_price, created_at");

            if (error) {
                console.log("Error fetching orders:", error);
                return;
            }

            const now = new Date();
            const currentMonth = now.getMonth();
            const currentYear = now.getFullYear();

            const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
            const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

            const thisMonthOrders = data.filter(order => {
                const created = new Date(order.created_at);
                return created.getMonth() === currentMonth && created.getFullYear() === currentYear;
            });

            const lastMonthOrders = data.filter(order => {
                const created = new Date(order.created_at);
                return created.getMonth() === lastMonth && created.getFullYear() === lastMonthYear;
            });

            const revenueThisMonthTotal = thisMonthOrders.reduce((sum, order) => sum + Number(order.total_price), 0);
            const revenueLastMonthTotal = lastMonthOrders.reduce((sum, order) => sum + Number(order.total_price), 0);

            setRevenueThisMonth(revenueThisMonthTotal);

            let growPercent = 0;
            if (revenueLastMonthTotal === 0) {
                growPercent = revenueThisMonthTotal > 0 ? 100 : 0;
            } else {
                growPercent = ((revenueThisMonthTotal - revenueLastMonthTotal) / revenueLastMonthTotal) * 100;
            }

            setGrowth(growPercent);
        };
        
        fetchrevenueThisMonth();

    })

    return (
        <Card title="Monthly Revenue" icon={<BsCurrencyEuro />}>
            <div className="container-inline-close">
                <h2 className="title">{revenueThisMonth.toFixed(2)}€</h2>
                <p className={`card-detail ${growth >= 0 ? "green" : "red"}`}>
                    {growth >= 0 ? "+" : ""}
                    {Number.isInteger(growth) ? growth : growth.toFixed(1)}%</p>
            </div>
        </Card>
    );
}