// import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";
import {
  useRef,
  useState,
  useMemo,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import clsx from "clsx";

interface InputProps {
  id?: string;
  type?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode | React.ReactNode;
  classIconRight?: string;
  showPasswordToggle?: boolean;
  maxLength?: number;
  minLength?: number;
  min?: number;
  max?: number;
  step?: number;
  name?: string;
  autoComplete?: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onInput?: (e: ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
  errorYup?: string;
}

const FieldInput: React.FC<InputProps> = ({
  id = "custom-input",
  type = "text",
  label = "",
  placeholder = "",
  onChange = () => {},
  className = "",
  error = "",
  disabled = false,
  required = false,
  icon = null,
  iconRight = null,
  classIconRight = "",
  showPasswordToggle = false,
  maxLength,
  minLength,
  min,
  max,
  step,
  name,
  autoComplete,
  onBlur,
  onFocus,
  onKeyPress,
  onInput,
  helperText = "",
  register,
  errorYup,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentType = useMemo(
    () => (type === "password" && showPassword ? "text" : type),
    [type, showPassword]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    onBlur?.(e);
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    // Si hay un onInput proporcionado, lo ejecutamos
    if (onInput) {
      onInput(e); // Esto ejecutará la función que se pase desde el componente padre
    }
  };

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        const length = inputRef.current.value.length;
        inputRef.current.setSelectionRange(length, length);
      }
    }, 10);
  };

  const baseInputClasses = useMemo(() => {
    return `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 block w-full focus-visible:outline-none focus:ring-slate-500 focus:border-slate-500 dark:bg-gray-700 dark:text-slate-200  ${
      error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""
    } ${disabled ? "opacity-70 cursor-not-allowed" : ""} ${className}`;
  }, [error, disabled, className]);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className={`block mb-2 text-sm font-medium text-gray-800 dark:text-slate-300 ${
            required ? "required" : ""
          }`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
          </div>
        )}

        <input
          ref={inputRef}
          id={id}
          type={currentType}
          className={`${baseInputClasses} ${icon ? "pl-10" : ""} ${
            type === "password" && showPasswordToggle ? "pr-10" : ""
          }`}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
          maxLength={maxLength}
          minLength={minLength}
          min={min}
          max={max}
          step={step}
          autoComplete={autoComplete}
          onBlur={handleBlur}
          onBlurCapture={handleBlur}
          onFocus={onFocus}
          onInput={handleInput}
          onKeyPress={onKeyPress}
          aria-required={required}
          aria-invalid={!!errorYup}
          {...(register && name ? register(name) : {})}
        />

        {type === "password" && showPasswordToggle && (
          <button
            type="button"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={togglePasswordVisibility}
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-slate-400" />
            ) : (
              <Eye className="h-4 w-4 text-slate-400" />
            )}
            <span className="sr-only">
              {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            </span>
          </button>
        )}
        {iconRight && (
          <button
            type="button"
            className={clsx(
              "absolute right-0 top-0 h-full outline-none focus:ring-0 focus:border-1 focus:border-slate-300 ",
              classIconRight
            )}
          >
            {iconRight}
          </button>
        )}
      </div>
      {errorYup && <small className="text-red-600">{errorYup}</small>}

      {helperText && (
        <p
          className={`text-xs mt-1 ${error ? "text-red-500" : "text-gray-500"}`}
        >
          {helperText}
        </p>
      )}

      {error && !helperText && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default FieldInput;
