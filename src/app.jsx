import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AllClients from "./pages/AllClients";
import Client from "./pages/Client";
import AllOrders from "./pages/AllOrders";
import Order from "./pages/Order";
import AllParts from "./pages/AllParts";
import Part from "./pages/Part";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clients" element={<AllClients />} />
        <Route path="/clients/:id" element={<Client />} />
        <Route path="/orders" element={<AllOrders />} />
        <Route path ="/orders/:id" element={<Order />} />
        <Route path="/parts" element={<AllParts />} />
        <Route path="/parts/:id" element={<Part />} />
      </Routes>
    </BrowserRouter>
  );
}