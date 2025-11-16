"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="hidden lg:block bg-card border-t border-border mt-12">
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-semibold text-foreground text-lg">
                MiVoto
              </span>
            </div>
            <p className="text-muted-foreground max-w-md">
              Plataforma digital para mantenerte informado sobre las elecciones
              2026. Información transparente y actualizada para todos los
              ciudadanos.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              Enlaces Útiles
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/candidates" className="hover:text-primary transition-colors">
                  Candidatos
                </Link>
              </li>
              <li>
                <Link href="/voting-location" className="hover:text-primary transition-colors">
                  Mi Local de Votación
                </Link>
              </li>
              <li>
                <Link href="/calendario" className="hover:text-primary transition-colors">
                  Calendario Electoral
                </Link>
              </li>
              <li>
                <Link href="/miembro-mesa" className="hover:text-primary transition-colors">
                  Proceso Electoral
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Soporte</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Centro de Ayuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contactanos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Términos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacidad
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-6 text-center text-muted-foreground">
          <p>&copy; 2026 VotaClaro. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
