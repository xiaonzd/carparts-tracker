import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { dataGridStyles } from "./../components/dataGridStyles";
import Card from "../components/Card";
import { supabase } from "../supabaseClient";
import Header from "../components/Header";

export default function AllParts() {
    const [parts, setParts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchParts = async () => {
            const { data, error } = await supabase
                .from("parts")
                .select("id, name, brand, stock, min_stock, ref, price")

            if (error) {
                console.log("Error fetching parts:", error);
                return;
            }

            const formattedPrice = (price) => {
                return new Intl.NumberFormat("pt-PT", {
                    style: "currency",
                    currency: "EUR",
                }).format(price);
            }

            const formattedRows = data.map((parts) => ({
                id: parts.id,
                name: parts.name,
                brand: parts.brand,
                stock: parts.stock,
                min_stock: parts.min_stock,
                ref: parts.ref,
                price: formattedPrice(parts.price),
            }));

            setParts(formattedRows);
        
        };

        fetchParts();

    }, []);

    return (
        <div className="page-grid">
            <Header title="All Parts" />
            <Card title="All Parts">
                <DataGrid
                    rows={parts}
                    columns={[
                        { field: "ref", headerName: "Ref", width: 150 },
                        { field: "name", headerName: "Name", flex: 1 },
                        { field: "brand", headerName: "Brand", width: 300 },
                        { field: "stock", headerName: "Stock", width: 150 },
                        { field: "min_stock", headerName: "Min Stock", width: 150 },
                        { field: "price", headerName: "Price", width: 150 },
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
                    onRowClick={(params) => navigate(`/parts/${params.row.id}`)}
                    sx={dataGridStyles}
                />
            </Card>
        </div>
    )
}