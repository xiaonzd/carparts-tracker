export const dataGridStyles = {
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
    },
    "--DataGrid-t-color-border-base": "rgb(39, 44, 52) !important",
};