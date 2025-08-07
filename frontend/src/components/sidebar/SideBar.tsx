import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { SidebarItem } from "./SideBarItem";
import type { IMenuItem } from "../../interfaces/IMenuItem";
import menuData from "../../data/menu.json"

type SidebarProps = {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
};
 const getMenu = (): IMenuItem[] => {
  return menuData.menu;
};

export default function Sidebar({ isOpen, isMobile, onClose }: SidebarProps) {
  // const [collapsed, setCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [menu, setMenu] = useState<IMenuItem[]>([]);
  // Variantes de animación para Framer Motion
  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };

  useEffect(() => {
    const loadMenu = async () => {
      // const data = await fetchMenu();
      const data: IMenuItem[] = getMenu();
      setMenu(data);
    };

    loadMenu();
  }, []);

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isOpenSide = (sectionId: string) => openSections.includes(sectionId);

  const renderMenu = (items: IMenuItem[], level: number = 1) => {
    return items.map((item) => (
      <SidebarItem
        key={item.id}
        icon={item.icon}
        title={item.title}
        id={item.id}
        isOpen={isOpenSide(item.id)}
        onToggle={() => toggleSection(item.id)}
        // collapsed={collapsed}
        level={level}
        path={item.path}
        onCloseNav={isMobile ? onClose : undefined}
      >
        {item.children &&
          item.children.length > 0 &&
          renderMenu(item.children, level + 1)}
      </SidebarItem>
    ));
  };

  if (!isMobile) {
    return (
      <aside
        className={`bg-dark-primary text-white w-85 fixed h-[calc(100vh-0rem)] top-0 z-40 transition-all duration-300 ${
          isOpen ? "left-0" : "-left-85"
        }`}
      >
        <div className="flex-1 overflow-y-auto py-2 px-4">
          {renderMenu(menu)}
        </div>
      </aside>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.aside
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ type: "tween" }}
            className="bg-slate-700 text-white w-[70%] fixed h-[calc(100vh-0rem)] top-0 z-40"
          >
            <nav className="relative">
              <button
                onClick={onClose}
                type="button"
                className="absolute top-2 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <br />
              {renderMenu(menu)}
            </nav>
          </motion.aside>

          {/* Overlay para móvil */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            onClick={onClose}
            className="fixed inset-0 bg-transparent bg-opacity-50 opacity-20 z-30"
          />
        </>
      )}
    </AnimatePresence>
  );
}
