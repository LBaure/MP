import { Routes, Route } from 'react-router-dom';
import LoginFormComponent from '../layouts/login-form.component';
import { Suspense } from 'react';
import LayoutPrincipal from '../layouts/layout-principal';
import ExpedientesRoutes from '../moduls/expedientes/ExpedientesRoutes';
import SeguridadRouter from '../moduls/seguridad/SeguridadRouter';

export const AppRouter = () => {
  return (
    <Suspense fallback={<div className="p-10 text-center">Cargando...</div>}>
      <Routes>
        <Route path="/" element={<LoginFormComponent />} />
        <Route path="/app" element={<LayoutPrincipal />}>
          <Route path="seguridad/*" element={<SeguridadRouter />} />
          <Route path="expedientes/*" element={<ExpedientesRoutes />} />
        </Route>
      </Routes>
    </Suspense>
  );
}