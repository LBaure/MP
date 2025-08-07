import { ArrowLeft, X } from "lucide-react";
import React, {useEffect, type FC, type ReactNode } from "react";
import Button from "./Button";

interface OffCanvasProps {
  isOpen: boolean;
  closeOffcanvas: () => void;
  children: React.ReactNode;
  width?: string;
  backdropOpacity?: number; // Ej: "bg-opacity-50"
  position?: "right" | "left";
}

const OffCanvas: React.FC<OffCanvasProps> & {
  Title: FC<{ children: ReactNode; className?: string }>;
  SubTitle: FC<{ children: ReactNode; className?: string }>;
} = ({
  isOpen,
  closeOffcanvas,
  children,
  width = "w-full md:w-xl",
  backdropOpacity = 20,
  position = "right",
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOffcanvas();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    } else {
      window.removeEventListener("keydown", handleEscape);
    }

    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeOffcanvas]);

  return (
    <>
      {/* Fondo oscuro */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 bg-opacity-100  ${
          isOpen
            ? `opacity-${backdropOpacity}`
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeOffcanvas}
      ></div>

      {/* Panel */}
      <div
        className={`fixed top-0 ${position}-0 ${width} z-50 h-full bg-white dark:bg-dark-primary shadow-lg transform transition-transform duration-300 overflow-auto ${
          isOpen
            ? "translate-x-0"
            : position === "right"
            ? "translate-x-full"
            : "-translate-x-full"
        }`}
      >
        <div className="relative flex flex-col h-full">
          <button
            className="text-gray-600 hover:bg-slate-100 hover:cursor-pointer rounded-full text-sm p-2.5 text-center items-center absolute top-2 right-2 dark:hover:bg-slate-800 dark:text-slate-300 hidden md:inline-flex"
            onClick={closeOffcanvas}
          >
            <X size={12} />
          </button>

          <Button
            textColor="text-slate-900"
            bgColor="bg-transparent"
            hover="hover:bg-transparent"
            className="absolute top-4 right-0 md:hidden"
            onClick={closeOffcanvas}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="p-6 flex flex-col h-full">{children}</div>
        </div>
      </div>
    </>
  );
};

// Subcomponentes
OffCanvas.Title = ({ children, className = "" }) => (
  <h3
    className={`text-lg font-semibold text-slate-800 dark:text-slate-100 ${className}`}
  >
    {children}
  </h3>
);

OffCanvas.SubTitle = ({ children, className = "" }) => (
  <p className={`text-sm hidden md:inline-flex text-slate-500 ${className}`}>
    {children}
  </p>
);

export default OffCanvas;
