// components/Tooltip.tsx
import React, { useState } from "react";

type Direction = "top" | "right" | "bottom" | "left";

interface TooltipProps {
  /** Texto a mostrar */
  tooltipText: string;
  /** Posición relativa al trigger */
  direction?: Direction;
  /** Clase Tailwind para el fondo (ej. "red-500") */
  bgColor?: string;
  /** Contenido que disparará el tooltip */
  children: React.ReactNode;
  /** Clases extra para el contenedor del tooltip */
  tooltipClassName?: string;
}

/**
 * Uso:
 * <Tooltip tooltipText="Inactivo" direction="right" bgColor="red-400">
 *   <FolderX className="h-6 w-6 text-red-400" />
 * </Tooltip>
 */
export const Tooltip: React.FC<TooltipProps> = ({
  tooltipText,
  direction = "top",
  bgColor = "white",
  children,
  tooltipClassName = "",
}) => {
  const [visible, setVisible] = useState(false);

  /* --- Posiciones dinámicas --- */
  const positions: Record<Direction, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowPos: Record<Direction, string> = {
    top: "left-1/2 -translate-x-1/2 rotate-45",
    bottom: "left-1/2 -translate-x-1/2 -rotate-45",
    left: "top-1/2 -translate-y-1/2 -rotate-45",
    right: "top-1/2 -translate-y-1/2 rotate-45",
  };
  const styleArroy: Record<Direction, object> = {
    top: { top: "88%" },
    bottom: { bottom: "88%" },
    left: { left: "95%" },
    right: { right: "94%" },
  };

  const bgClass = `bg-${bgColor}`;
  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {visible && (
        <span
          className={`absolute z-100 border border-slate-200 whitespace-nowrap rounded-md bg-${bgColor} px-3 py-2 text-sm text-slate-900 shadow-xl dark:bg-slate-700 dark:border-none dark:text-slate-200 ${positions[direction]} ${tooltipClassName}`}
        >
          {tooltipText}
          <span
            className={`absolute h-2 w-2 -z-50 ${bgClass} dark:bg-slate-700 ${arrowPos[direction]}`}
            style={styleArroy[direction]}
          />
        </span>
      )}
    </span>
  );
};
