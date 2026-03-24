import { useEffect, useState } from "react";
import Card from "../Card";
import { BsCart2 } from "react-icons/bs";
import { supabase } from "../../supabaseClient";

export default function OrdersThisMonth() {
    const [ordersThisMonth, setOrdersThisMonth] = useState(0);
    const [growth, setGrowth] = useState(0);

    useEffect(() => {
        const fetchOrders = async () => {
            const { data, error } = await supabase
                .from("orders")
                .select("id, created_at")

            if (error) {
                console.log("Error fetching orders:", error);
                return;
            }

            const now = new Date();
            const currentMonth = now.getMonth();
            const currentYear = now.getFullYear();

            const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
            const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

            const ordersThisMonth = data.filter(order => {
                const created = new Date(order.created_at);

                return (
                    created.getMonth() === currentMonth &&
                    created.getFullYear() === currentYear
                );
            });

            const ordersLastMonth = data.filter(order => {
                const created = new Date(order.created_at);

                return (
                    created.getMonth() === lastMonth &&
                    created.getFullYear() === lastMonthYear
                )
            });

            let growthPercent = 0;

            if (ordersLastMonth.length === 0) {
                if (ordersThisMonth.length > 0) {
                    growthPercent = 100;
                } else {
                    growthPercent = 0;
                }
            } else {
                growthPercent = ((ordersThisMonth.length - ordersLastMonth.length) / ordersLastMonth.length) * 100;
            }

            setOrdersThisMonth(ordersThisMonth.length);
            setGrowth(growthPercent);
        };

        fetchOrders();
    }, []);

    return (
        <Card title="Orders This Month" icon={<BsCart2 />}>
            <div className="container-inline-close">
                <h2 className="title">{ordersThisMonth}</h2>
                <p className={`card-detail ${growth >= 0 ? "green" : "red"}`}>
                    {growth >= 0 ? "+" : ""}
                    {Number.isInteger(growth) ? growth : growth.toFixed(1)}%
                </p>
            </div>
        </Card>
    );
}