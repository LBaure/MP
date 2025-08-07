import type { ReactNode } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import clsx from "clsx";

interface SidebarItemProps {
  icon?: React.ReactNode | string;
  title: string;
  id: string;
  isOpen?: boolean;
  onToggle?: () => void;
  collapsed?: boolean;
  level: number;
  path?: string;
  children?: ReactNode;
  onCloseNav?: () => void;
}

export function SidebarItem({
  icon,
  title,
  id,
  isOpen,
  onToggle,
  collapsed = false,
  level,
  children,
  path,
  onCloseNav,
}: SidebarItemProps & { path?: string }) {
  const hasChildren = !!children;
  const isExpandable = hasChildren && onToggle;

  // Calcular el padding basado en el nivel
  const getPadding = () => {
    if (collapsed) return "px-4 justify-center";
    if (level === 1) return "px-4";
    if (level === 2) return "px-4 ml-8 text-slate-300";
    if (level === 3) return "px-4 ml-14 text-slate-400";
    return "px-4";
  };

  const getLucideIcon = (iconName: ReactNode | string): ReactNode => {
    if (typeof iconName !== "string") return iconName;

    const LucideIcon = Icons[iconName as keyof typeof Icons] as
      | LucideIcon
      | undefined;
    return LucideIcon ? <LucideIcon size={20} /> : null;
  };

  const content = (
    <>
      {icon && <span className="mr-2">{getLucideIcon(icon)}</span>}
      {!collapsed && (
        <>
          <span
            className={clsx(
              "flex-grow",
              level === 3 ? "text-slate-350" : "font-medium"
            )}
          >
            {title}
          </span>
          {isExpandable && (
            <span>
              {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
          )}
        </>
      )}
    </>
  );

  return (
    <div>
      {path && !hasChildren ? (
        <Link
          to={path}
          onClick={onCloseNav ?? onCloseNav}
          className={clsx(
            "flex items-center w-full py-3 text-left text-sm hover:bg-slate-600 transition-colors rounded",
            getPadding(),
            collapsed && "justify-center px-0"
          )}
        >
          {content}
        </Link>
      ) : (
        <button
          id={id}
          onClick={onToggle}
          className={clsx(
            "flex items-center w-full py-3 text-left text-sm hover:bg-slate-600 transition-colors rounded",
            getPadding(),
            collapsed && "justify-center px-0"
          )}
        >
          {content}
        </button>
      )}
      {hasChildren && isOpen && !collapsed && (
        <div className="transition-all duration-200 ease-in-out overflow-hidden">
          {children}
        </div>
      )}
    </div>
  );
}
