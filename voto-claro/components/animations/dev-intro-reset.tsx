'use client';

/**
 * Componente de desarrollo para resetear la animación de bienvenida
 * Solo visible en modo desarrollo
 */
export default function DevIntroReset() {
	// Solo mostrar en desarrollo
	if (process.env.NODE_ENV !== 'development') return null;

	const resetIntro = () => {
		if (typeof window !== 'undefined') {
			localStorage.removeItem('mivoto_visited');
			window.location.reload();
		}
	};

	return (
		<button
			onClick={resetIntro}
			className="fixed bottom-20 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm font-medium transition-colors"
			title="Resetear animación de bienvenida"
		>
			🔄 Reset Intro
		</button>
	);
}
