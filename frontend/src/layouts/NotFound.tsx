import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search, AlertTriangle } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-800 animate-pulse">
            404
          </div>
          <div className="absolute inset-0 text-9xl font-black text-blue-200 opacity-50 transform translate-x-2 translate-y-2 -z-10">
            404
          </div>
        </div>

        {/* Warning Icon with Animation */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <AlertTriangle className="w-16 h-16 text-amber-500 animate-bounce" />
            <div className="absolute inset-0 w-16 h-16 text-amber-200 animate-ping">
              <AlertTriangle className="w-16 h-16" />
            </div>
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Página no encontrada
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
          Lo sentimos, la página que buscas no existe o ha sido movida.
          <br />
          <span className="text-base text-gray-500 mt-2 block">
            Verifica la URL o regresa al inicio para continuar navegando.
          </span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            to="/"
            className="group flex items-center gap-3 bg-gradient-to-r from-blue-400 to-blue-800 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Home className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Ir al Inicio
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-3 bg-white text-gray-700 px-8 py-4 rounded-full font-semibold text-lg border-2 border-gray-300 hover:border-gray-400 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Volver Atrás
          </button>
        </div>

        {/* Search Suggestion */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Search className="w-6 h-6 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              ¿Qué estabas buscando?
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            Aquí tienes algunas páginas que podrían interesarte:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              to="/"
              className="px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors duration-200"
            >
              Inicio
            </Link>
            <Link
              to="/#features"
              className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium hover:bg-green-200 transition-colors duration-200"
            >
              Caracteristicas
            </Link>
            <Link
              to="/#faq"
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-200"
            >
              Preguntas Frecuentes
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-60 animate-float"></div>
        <div className="absolute top-1/3 right-10 w-12 h-12 bg-purple-200 rounded-full opacity-60 animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-indigo-200 rounded-full opacity-60 animate-float"></div>
      </div>
    </div>
  );
};

export default NotFound;
