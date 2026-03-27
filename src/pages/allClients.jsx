import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Card from "../components/Card";
import { supabase } from "../supabaseClient";
import Header from "../components/Header";

export default function AllClients() {
    const [clients, setClients] = useState([]);

    useEffect (() => {
        const fetchClients = async () => {
            const { data, error } = await supabase
                .from("clients")
                .select("id, name, email, phone, created_at");

            if (error) {
                console.log("Error fetching clients:", error);
                return;
            }

            const formattedDate = (dateString) => {
                const date = new Date(dateString);
                const day = date.getDate().toString().padStart(2, "0");
                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                const year = date.getFullYear().toString();
                return `${day}/${month}/${year}`;
            }

            const formattedRows = data.map((client) => ({
                id: client.id,
                name: client.name,
                email: client.email,
                phone: client.phone,
                created_at: formattedDate(client.created_at),
            }))

            setClients(formattedRows);
        }

        fetchClients();
    }, []);

    return (
        <div className="page-grid">
            <Header title="All Clients" />
            <Card title="All Clients">
                <DataGrid
                    rows={clients}
                    columns={[
                        { field: "name", headerName: "Name", width: 300 },
                        { field: "email", headerName: "Email", flex: 1 },
                        { field: "phone", headerName: "Phone", width: 150 },
                        { field: "created_at", headerName: "Created At", width: 150 },
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