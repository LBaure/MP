import { Routes, Route } from "react-router-dom";
import Expedientes from "./pages/Expedientes";
import NotFound from "../../layouts/NotFound";
import Indicios from "./pages/Indicios";
import Dashboard from "./pages/Dashboard";

const ExpedientesRoutes = () => {
  return (
    <Routes>
      <Route path="/registro" element={<Expedientes />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/registro/indicios/:id" element={<Indicios />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
export default ExpedientesRoutes;