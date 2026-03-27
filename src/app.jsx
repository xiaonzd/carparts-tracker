import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import AllClients from "./pages/allClients";
import AllOrders from "./pages/allOrders";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clients" element={<AllClients />} />
        <Route path="/orders" element={<AllOrders />} />
      </Routes>
    </BrowserRouter>
  );
}