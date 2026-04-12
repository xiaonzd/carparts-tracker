import Card from "../Card";
import { DataGrid } from "@mui/x-data-grid";
import { dataGridStyles } from "../dataGridStyles";
import { statusMapping } from "../statusMapping";

export default function ClientOrders({ orders }) {

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

    const rows = (orders ?? []).map((order) => ({
        id: order.id,
        created_at: formattedDate(order.created_at),
        status: order.status,
        total_price: formattedPrice(order.total_price),
        parts: order.order_parts.map((op) => op.parts.name).join(", "),
    }));

    const columns = [
        { field: "parts", headerName: "Parts", flex: 1 },
        { field: "created_at", headerName: "Date", width: 150 },
        { field: "total_price", headerName: "Total Price", width: 150 },
        { field: "status", headerName: "Status", width: 150,
            renderCell: (params) => {
                const className =
                    statusMapping[params.value] || "default";

                return (
                    <span className={`card-text gray ${className}`}>
                        {params.value}
                    </span>
                );
            }
        },
    ];

    return (
        <Card title="Client's Orders">
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
                localeText={{
                    noRowsLabel: "No recorded orders for this client",
                }}
                sx={dataGridStyles}
                />
        </Card>
    );
}
