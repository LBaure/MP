import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const appVersion = "v1.0.0";

  return (
    <footer className="w-full  py-6 px-4 dark:bg-dark-primary-body border-t border-gray-200 dark:border-gray-800 bg-sf-dark-secondary shadow-sm">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-sm dark:text-slate-200 font-medium">
              Luis Bautista
            </p>
            <p className="text-xs text-muted-foreground dark:text-slate-300">
              © {currentYear} Todos los derechos reservados
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="#"
              className="text-muted-foreground dark:text-slate-400 hover:text-foreground transition-colors"
            >
              <Facebook size={18} />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              to="#"
              className="text-muted-foreground  dark:text-slate-400 hover:text-foreground transition-colors"
            >
              <Twitter size={18} />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground dark:text-slate-400 transition-colors"
            >
              <Instagram size={18} />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground dark:text-slate-400 transition-colors"
            >
              <Linkedin size={18} />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground dark:text-slate-400 transition-colors"
            >
              <Github size={18} />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>

          <div className="text-xs text-muted-foreground  dark:text-slate-300">
            <span>DICRI {appVersion}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
