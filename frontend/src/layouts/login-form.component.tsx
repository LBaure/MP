import helpdeskSvg from "../assets/logo_login.svg";
import LoginForm from '../components/form-login';

const LoginFormComponent = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full sm:w-1/2 bg-slate-50 items-center justify-center h-full">
        <LoginForm />
      </div>
      {/* Segundo div: Lorem ipsum, con fondo blanco */}
      <div className="w-full sm:w-1/2 sm:block hidden bg-white h-full">
        <div className="flex flex-col min-h-screen items-center justify-center">
          <div className="w-full lg:pl-8 xl:px-16 my-auto">
            <article>
              <header className="pb-8">
                <h1 className="max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl mb-8">
                  Expedientes
                  <span className="relative whitespace-nowrap text-blue-600">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 418 42"
                      className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70"
                      preserveAspectRatio="none"
                    >
                      <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
                    </svg>
                    <span className="relative ml-2">DICRI,</span>
                  </span>
                </h1>
                <p className="mt-3 text-2xl tracking-tight text-slate-400">
                  Resuelva la gestión de las evidencias de manera rápida y
                  eficiente con nuestra plataforma de expedientes electrónicos.
                </p>
              </header>
              <div className="not-prose my-12 grid grid-cols-1 gap-6">
                <div className="w-full justify-self-center max-w-md">
                  <img
                    src={helpdeskSvg}
                    alt="Mi SVG feliz"
                    width={340}
                  />
                </div>
              </div>
            </article>
          </div>
          <footer className="w-full bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
                <div className="flex gap-x-6">
                  <a className="group" aria-label="TaxPal on X" href="#">
                    <svg
                      className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.3174 10.7749L19.1457 4H17.7646L12.7039 9.88256L8.66193 4H4L10.1122 12.8955L4 20H5.38119L10.7254 13.7878L14.994 20H19.656L13.3171 10.7749H13.3174ZM11.4257 12.9738L10.8064 12.0881L5.87886 5.03974H8.00029L11.9769 10.728L12.5962 11.6137L17.7652 19.0075H15.6438L11.4257 12.9742V12.9738Z"></path>
                    </svg>
                  </a>
                  <a className="group" aria-label="TaxPal on GitHub" href="#">
                    <svg
                      className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"></path>
                    </svg>
                  </a>
                </div>
                <p className="mt-6 text-sm text-slate-500 sm:mt-0">
                  Copyright ©2025 Softech S.A. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default LoginFormComponent
