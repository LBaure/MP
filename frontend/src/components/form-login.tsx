import { LifeBuoy } from "lucide-react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FieldInput from "./field-input";
import { useAuth } from "../context/useAuth";
// import LoadingOverlay from "../share/Loading/LoadingOverlay";

type LoginFormsInputs = {
  userName: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  userName: Yup.string().required("El usuario es requerido").trim(),
  password: Yup.string().required("La contraseña es requerida"),
});

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const { isLoggedIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validationSchema) });

  const handleLogin = async (form: LoginFormsInputs) => {
    // loginUser(form.userName, form.password);
    navigate("/app/expedientes/dashboard");
  };


useEffect(() => {
  if (isLoggedIn()) {
    navigate("/app");
  } else {
    setIsLoading(false);
  }
}, [isLoggedIn, navigate]);


  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-800 p-8 lg:p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-black/10 p-3">
              <LifeBuoy className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Gestión de Evidencias
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-300 mt-2 ">
            Inicia sesión para acceder al sistema
          </p>
        </div>
        {/* w-full bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 */}
        <div >
          <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
            <div>
              <FieldInput
                id="userName"
                name="userName"
                type="text"
                label="Usuario"
                placeholder="Usuario"
                autoComplete="off"
                errorYup={errors.userName?.message}
                register={register}
              />
            </div>
            <div>
              <FieldInput
                id="password"
                name="password"
                type="password"
                label="Contraseña"
                placeholder="••••••••"
                showPasswordToggle={true}
                errorYup={errors.password?.message}
                register={register}
                autoComplete="current-password"
              />
            </div>
            <div className="flex items-start">
              <a
                href="#"
                className="font-medium text-sm dark:text-gray-500 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:bg-[#050708]/30 dark:focus:ring-gray-500"
              disabled={isLoading}
            >
              Iniciar sesión
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              ¿No estas registrado?{" "}
              <a
                href="#"
                className="font-medium text-sm text-gray-800 hover:underline"
              >
                Crear cuenta
              </a>
            </div>

            <div></div>
          </form>
        </div>
      </div>
      {/* <LoadingOverlay isLoading={isLoading}></LoadingOverlay> */}
    </div>
  );
};

export default LoginForm;
