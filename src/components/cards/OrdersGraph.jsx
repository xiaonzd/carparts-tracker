import { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Card from "../Card"
import { supabase } from '../../supabaseClient';

export default function OrdersGraph() {
    const [chartData, setChartData] = useState([]);
    const now = new Date();
    const monthYear = now.toLocaleString('default', {
                month: 'long',
                year: 'numeric',
            });

    useEffect(() => {
        const fetchOrders = async () => {
            const { data, error } = await supabase
                .from('orders')
                .select('created_at');

            if (error) {
                console.log('Error fetching orders:', error);
                return;
            }

            const currentMonth = now.getMonth();
            
            const ordersPerDay = {};

            data.forEach(order => {
                const date = new Date(order.created_at);

                if (date.getMonth() === currentMonth) {
                    const day = date.getDate();
                    ordersPerDay[day] = (ordersPerDay[day] || 0) + 1;
                }
            });

            const daysInMonth = new Date(
                now.getFullYear(),
                currentMonth + 1,
                0
            ).getDate();

            const formatted = Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                return {
                    day,
                    orders: ordersPerDay[day] || 0
                };
            });

            setChartData(formatted);
        };

        fetchOrders();

    }, []);

    return (
        <Card title="Orders This Month" detail={monthYear}>
            <div style={{ flex: 1 }}>
                {chartData.length === 0 ? (
                    <p className="card-detail">No data yet</p>
                ) : (
                    <BarChart
                        dataset={chartData}
                        xAxis={[{
                            scaleType: 'band',
                            dataKey: 'day'
                        }]}
                        series={[{
                            dataKey: 'orders',
                            color: 'rgb(249, 156, 16)',
                        }]}
                        borderRadius={4}
                        sx={{
                            height: '100%',
                            '& .MuiChartsAxis-tickLabel': {
                            fill: 'rgb(115, 123, 140) !important',
                            fontSize: '12 !important',
                            fontFamily: 'Poppins !important',
                            },
                            '& .MuiChartsAxis-line': {
                            stroke: 'rgba(115, 123, 140, 0.2) !important',
                            },
                            '& .MuiChartsGrid-line': {
                            stroke: 'rgba(115, 123, 140, 0.2) !important',
                            },
                        }}
                    />
                )}
            </div>
        </Card>
    )
}