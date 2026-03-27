import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Card from "../components/Card";
import { supabase } from "../supabaseClient";
import Header from "../components/Header";

export default function AllOrders() {
    const [orders, setOrders] = useState([]);

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
                    sx={{
                        backgroundColor: "rgb(21, 24, 30)",
                        color: "rgb(202, 202, 202)",
                        borderColor: "rgb(39, 44, 52)",
                        borderRadius: "8px",
                        borderWidth: "1px",
                        fontFamily: "Poppins",
                        fontWeight: "400",
                        fontSize: "14px",
                        "& .MuiDataGrid-columnHeader": {
                            backgroundColor: "rgb(21, 24, 30)",
                            color: "rgb(237, 235, 233)",
                            borderColor: "rgb(39, 44, 52) !important",
                            borderWidth: "1px",
                            fontFamily: "Poppins",
                            fontWeight: "500",
                            fontSize: "14px",
                        },
                        "& .MuiDataGrid-row": {
                            borderBottom: "1px solid rgb(39, 44, 52)",
                        },
                        "& .MuiDataGrid-cell": {
                            borderRight: "1px solid rgb(39, 44, 52)",
                        },
                        "& .MuiDataGrid-row:hover": {
                            backgroundColor: "rgb(39, 44, 52)",
                            color: "rgb(237, 235, 233)",
                        },
                        "& .MuiDataGrid-footerContainer": {
                            backgroundColor: "rgb(21, 24, 30)",
                            color: "rgb(237, 235, 233)",
                            borderColor: "rgb(39, 44, 52)",
                            borderWidth: "1px",
                            fontFamily: "Poppins",
                            fontWeight: "400",
                        },
                        "& .MuiTablePagination-root": {
                            color: "rgb(237, 235, 233)",
                        },
                        "& .MuiDataGrid-footerContainer .MuiButtonBase-root": {
                            color: "rgb(237, 235, 233)",
                        },
                        "& .MuiDataGrid-footerContainer .Mui-selected": {
                            color: "rgb(237, 235, 233)",
                        },
                        "& .MuiDataGrid-columnSeparator": {
                            display: "none",
                        }
                    }}
                />
            </Card>
        </div>
    )
}