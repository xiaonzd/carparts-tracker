import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import AllClients from "./pages/allClients";
import AllOrders from "./pages/allOrders";
import AllParts from "./pages/allParts";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clients" element={<AllClients />} />
        <Route path="/orders" element={<AllOrders />} />
        <Route path="/parts" element={<AllParts />} />
      </Routes>
    </BrowserRouter>
  );
}