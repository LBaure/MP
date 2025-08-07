import { PanelLeftClose, PanelLeftOpen, Settings, User } from "lucide-react";

// import { useAuth } from "../../../Context/useAuth";
import { Link } from "react-router-dom";
import { useState } from "react";
import ButtonTheme from "./ButtonTheme";

type HeaderProps = {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
};

export default function Header({ toggleSidebar, sidebarOpen }: HeaderProps) {
  const [isVisible, setIsVisible] = useState(false);
//   const { logout } = useAuth();
  return (
    <header className="bg-white dark:bg-dark-primary-body">
      <nav className="border-gray-200 px-0 lg:px-6 py-1">
        <div className="flex flex-wrap justify-between items-center mx-auto">
          <div className="relative inline-block">
            <div
              onMouseEnter={() => setIsVisible(true)}
              onMouseLeave={() => setIsVisible(false)}
            >
              <button
                type="button"
                className="text-gray-600 hover:bg-slate-100 hover:cursor-pointer rounded-full text-sm p-2.5 text-center inline-flex items-center sf-btn-icon dark:text-slate-300 dark:hover:bg-slate-700"
                onClick={toggleSidebar}
              >
                {sidebarOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
              </button>
            </div>
            {isVisible && (
              <div className="hidden sm:inline-flex absolute left-full top-1/2 -translate-y-1/2 ml-2 p-2 bg-slate-400 text-white text-sm rounded-md shadow-lg whitespace-nowrap z-50">
                {sidebarOpen ? "Comprimir el menú" : "Abrir el menú"}
                {/* Flecha a la izquierda del tooltip */}
                {/* <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-gray-400"></div> */}
              </div>
            )}
          </div>

          <div className="flex items-center">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <ButtonTheme />

              <button
                type="button"
                className="text-gray-600 hover:bg-slate-100 hover:cursor-pointer rounded-full text-sm p-2.5 text-center inline-flex items-center sf-btn-icon dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <Settings />
              </button>
              <div className="relative inline-block text-left group">
                {/* Botón */}
                <button
                  type="button"
                  className="flex items-end gap-2 text-gray-800 dark:text-slate-300 hover:bg-gray-50 dark:dark:hover:bg-slate-700 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 sf-btn-icon"
                  id="menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <User />
                  Contact
                </button>

                {/* Dropdown menu, aparece con el hover */}
                <div
                  className="absolute right-0 z-50 mt-0 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden hidden group-hover:block dark:bg-dark-primary  text-gray-700 dark:text-slate-300"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex={-1}
                >
                  <div className="py-1" role="none">
                    {/* Menu items */}
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-0"
                    >
                      Configuración de cuenta
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-1"
                    >
                      Cambiar contraseña
                    </a>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
                      onClick={ () =>{}}
                    >
                      Cerrar Sesión
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
