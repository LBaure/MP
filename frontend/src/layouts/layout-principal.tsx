import { useEffect, useState } from "react";
import useDeviceDetection from "../hooks/useDeviceDetection";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/SideBar";
import { Footer } from "../components/Footer";

const LayoutPrincipal = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useDeviceDetection();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const closeSidebar = () => {
    console.log("Cerrando sidebar");
    setSidebarOpen(false);
  };

	useEffect(() => {
		if (isMobile) {
			setSidebarOpen(false);
		} else {
			setSidebarOpen(true);
		}
	}, [isMobile]);
  return (
    <div
      className={`min-h-screen flex flex-col dark:bg-dark-primary-body ${
        !isMobile && sidebarOpen ? "pl-85" : ""
      } transition-all duration-300`}
    >
      <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <div className="flex flex-1">
        <Sidebar
          isOpen={sidebarOpen}
          isMobile={isMobile}
          onClose={closeSidebar}
        />

        <main
          className={`flex-1 w-full overscroll-x-hidden transition-all duration-300 p-4`}
        >
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default LayoutPrincipal;
