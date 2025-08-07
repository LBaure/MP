import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  empty?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  empty = false,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "w-md",
    md: "w-lg",
    lg: "w-2xl",
    xl: "w-6xl",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Fondo */}
      <div
        className="fixed inset-0   bg-black/30 bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full  items-center justify-center p-4">
        <div
          className={`
            relative  ${sizeClasses[size]} transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 dark:bg-dark-primary
          `}
        >
          {/* Header */}
          {!empty && (
            <div className="flex items-center justify-between py-4 px-6 relative">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-100">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="absolute top-2 right-2 rounded-full p-2 text-gray-400 hover:text-gray-600  transition-colors duration-200 dark:text-slate-400 dark:hover:text-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          {/* Content */}
          <div className={`${empty == true ? "p-0" : "px-6"}`}>{children}</div>
        </div>
      </div>
    </div>
  );
};
