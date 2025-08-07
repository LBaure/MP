import { Routes, Route } from "react-router-dom";
import NotFound from "../../layouts/NotFound";
import Usuarios from "./pages/Usuarios";

const ExpedientesRoutes = () => {
  return (
    <Routes>
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default ExpedientesRoutes;
