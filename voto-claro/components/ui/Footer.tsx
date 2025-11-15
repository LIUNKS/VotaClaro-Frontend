"use client";

export function Footer() {
  return (
    <footer className="hidden lg:block bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-semibold text-gray-800 text-lg">VotaClaro</span>
            </div>
            <p className="text-gray-600 max-w-md">
              Plataforma digital para mantenerte informado sobre las elecciones 2026. 
              Información transparente y actualizada para todos los ciudadanos.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Enlaces Útiles</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Candidatos</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Mi Local de Votación</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Calendario Electoral</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Proceso Electoral</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Soporte</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Contactanos</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Términos de Uso</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Privacidad</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500">
          <p>&copy; 2026 VotaClaro. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}