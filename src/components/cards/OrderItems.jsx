import Card from "../Card";
import { DataGrid } from "@mui/x-data-grid";
import { dataGridStyles } from "../dataGridStyles";

export default function OrderItems({ order }) {
    const formattedPrice = (price) => {
        return new Intl.NumberFormat("pt-PT", {
            style: "currency",
            currency: "EUR",
        }).format(price);
    }

    const rows = order?.order_parts.map((op, index) => ({
        id: index,
        name: op.parts.name,
        brand: op.parts.brand,
        quantity: op.quantity,
        price: formattedPrice(op.parts.price)
    }));

    const columns = [
        { field: "name", headerName: "Part", flex: 1 },
        { field: "brand", headerName: "Brand", flex: 1 },
        { field: "quantity", headerName: "Quantity", width: 150 },
        { field: "price", headerName: "Price", width: 150 }
    ];
    return (
        <Card title="Order Items">
            <DataGrid
                rows={rows}
                columns={columns}
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
                sx={dataGridStyles}
            />
        </Card>
    )
}