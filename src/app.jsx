import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AllClients from "./pages/AllClients";
import AllOrders from "./pages/AllOrders";
import Order from "./pages/Order";
import AllParts from "./pages/AllParts";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clients" element={<AllClients />} />
        <Route path="/orders" element={<AllOrders />} />
        <Route path ="/orders/:id" element={<Order />} />
        <Route path="/parts" element={<AllParts />} />
      </Routes>
    </BrowserRouter>
  );
}