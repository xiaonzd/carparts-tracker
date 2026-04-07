export const reactSelectStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "rgb(30, 34, 41)",
        paddingInline: "8px",
        borderColor: "rgb(39, 44, 52)",
        borderRadius: "8px",
        borderStyle: "solid",
        borderWidth: "1px",
        fontSize: "14px",
        fontFamily: "Poppins",
    }),
    placeholder: (provided) => ({
        ...provided,
        color: "rgb(209, 206, 199)",
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        "&:hover": {
            color: "rgb(237, 235, 233)",
        },
        color: "rgb(237, 235, 233)",
    }),
    menu: (provided, state) => ({
        ...provided,
        backgroundColor: "rgb(30, 34, 41)",
        color: "rgb(209, 206, 199)",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? "rgb(39, 44, 52)" : "rgb(30, 34, 41)",
        color: state.isFocused ? "rgb(237, 235, 233)" : "rgb(209, 206, 199)",
        fontSize: "14px",
        fontFamily: "Poppins",
    }),
    input: (provided) => ({
        ...provided,
        color: "rgb(209, 206, 199)",
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "rgb(209, 206, 199)",
    }),
};