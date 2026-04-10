import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { dataGridStyles } from "../components/dataGridStyles";
import Card from "../components/Card";
import { supabase } from "../supabaseClient";
import Header from "../components/Header";

export default function AllOrders() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect (() => {
        const fetchOrders = async () => {
            const { data, error } = await supabase
                .from("orders")
                .select("id, created_at, status, total_price, order_parts (parts (name, brand)), clients (name)");

            if (error) {
                console.log("Error fetching orders:", error);
                return;
            }

            const formattedDate = (dateString) => {
                const date = new Date(dateString);
                const day = date.getDate().toString().padStart(2, "0");
                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                const year = date.getFullYear().toString();
                return `${day}/${month}/${year}`;
            }

            const formattedPrice = (price) => {
                return new Intl.NumberFormat("pt-PT", {
                    style: "currency",
                    currency: "EUR",
                }).format(price);
            }

            const formattedRows = data.map((order) => ({
                id: order.id,
                client: order.clients.name,
                created_at: formattedDate(order.created_at),
                status: order.status,
                total_price: formattedPrice(order.total_price),
                parts: order.order_parts.map((op) => op.parts.name).join(", "),
            }));

            setOrders(formattedRows);
        }

        fetchOrders();
    }, []);

    return (
        <div className="page-grid">
            <Header title="All Orders" />
            <Card title="All Orders">
                <DataGrid
                    rows={orders}
                    columns={[
                        { field: "client", headerName: "Client", width: 300 },
                        { field: "parts", headerName: "Parts", flex: 1 },
                        { field: "created_at", headerName: "Date", width: 150 },
                        { field: "total_price", headerName: "Total Price", width: 150 },
                        { field: "status", headerName: "Status", width: 150 },
                    ]}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pageSizeOptions={[10, 25, 50, 100, { value: -1, label: 'All' }]}
                    disableCheckboxSelection
                    disableColumnResize
                    disableRowSelectionOnClick
                    disableColumnSelector
                    disableColumnFilter
                    disableColumnMenu
                    onRowClick={(params) => navigate(`/orders/${params.row.id}`)}
                    sx={dataGridStyles}
                />
            </Card>
        </div>
    )
}