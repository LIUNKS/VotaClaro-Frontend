import { GeolocationMap } from '../components/maps';

export default function HomePage() {
  // Estas coordenadas del API (ejemplo luego se remplazarán)
  const exampleLatitude = -11.881874;
  const exampleLongitude = -77.065698;

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <GeolocationMap
            latitude={exampleLatitude}
            longitude={exampleLongitude}
            markerTitle="Ubicación de Votación"
            width="100%"
            height="500px"
          />
        </div>
      </div>
    </main>
  );
}
