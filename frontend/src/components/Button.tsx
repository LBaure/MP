import clsx from "clsx";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  textColor?: string;
  bgColor?: string;
  border?: string;
  hover?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
  textColor = "text-gray-500",
  bgColor = "bg-white",
  border = "",
  hover = "hover:bg-gray-100",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "focus-visible:outline-none font-medium rounded-lg text-sm px-5 h-10 text-center inline-flex items-center gap-2 transition-all duration-200 ease-in-out",
        "dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700",
        textColor,
        bgColor,
        border,
        hover,
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
