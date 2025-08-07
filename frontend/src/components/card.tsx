import clsx from "clsx";

interface CardProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, onClick, className }) => {
  return (
    <section
      onClick={onClick}
      className={clsx(
        "relative flex flex-col justify-center w-full h-full text-slate-700 bg-white dark:bg-dark-primary shadow-table rounded-xl bg-clip-border",
        className
      )}
    >
      <div className="relative mx-4 my-4 mt-4 overflow-hidden text-slate-700 rounded-none bg-clip-border">
        {children}
      </div>
    </section>
  );
};
export default Card;
