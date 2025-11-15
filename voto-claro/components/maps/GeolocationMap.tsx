'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapState {
  loading: boolean;
  error: string | null;
  mounted: boolean;
}

interface GeolocationMapProps {
  mapboxToken?: string;
  width?: string;
  height?: string;
  latitude: number;
  longitude: number;
  markerTitle?: string;
}

const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
);

const GeolocationMap: React.FC<GeolocationMapProps> = ({ 
  mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  width = '100%',
  height = '400px',
  latitude,
  longitude,
  markerTitle = 'Ubicación'
}) => {
  const [state, setState] = useState<MapState>({
    loading: true,
    error: null,
    mounted: false
  });

  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  const mapContainer = useCallback((node: HTMLDivElement | null) => {
    if (node && !map.current && state.mounted) {
      initializeMap(node);
    }
  }, [state.mounted, latitude, longitude, mapboxToken, markerTitle]);

  const initializeMap = (container: HTMLDivElement) => {
    if (!mapboxToken) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Token de Mapbox no configurado. Asegúrate de configurar NEXT_PUBLIC_MAPBOX_TOKEN en tu archivo .env.local'
      }));
      return;
    }

    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Coordenadas inválidas. Verifica que latitude y longitude sean números válidos.'
      }));
      return;
    }

    mapboxgl.accessToken = mapboxToken;

    try {
      map.current = new mapboxgl.Map({
        container: container,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [longitude, latitude],
        zoom: 15
      });

      map.current.on('load', () => {
        if (map.current) {
          marker.current = new mapboxgl.Marker({
            color: '#2563eb'
          })
            .setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup().setHTML(`<h3>${markerTitle}</h3>`))
            .addTo(map.current);

          map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
          setState(prev => ({ ...prev, loading: false, error: null }));
        }
      });

      map.current.on('error', () => {
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Error al cargar el mapa. Verifica tu token de Mapbox.'
        }));
      });

    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Error al inicializar el mapa. Verifica tu token de Mapbox.'
      }));
    }
  };

  useEffect(() => {
    setState(prev => ({ ...prev, mounted: true }));
  }, []);

  useEffect(() => {
    return () => {
      if (marker.current) {
        marker.current.remove();
        marker.current = null;
      }
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  if (!state.mounted) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-gray-300"
        style={{ width, height }}
      >
        <div className="text-center">
          <LoadingSpinner />
          <p className="text-gray-600">Preparando mapa...</p>
        </div>
      </div>
    );
  }

  if (state.loading) {
    return (
      <div className="relative" style={{ width, height }}>
        <div 
          ref={mapContainer}
          style={{ width: '100%', height: '100%' }}
          className="rounded-lg overflow-hidden shadow-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 rounded-lg">
          <div className="text-center">
            <LoadingSpinner />
            <p className="text-gray-600">Cargando mapa...</p>
          </div>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div 
        className="flex items-center justify-center bg-red-50 border-2 border-red-200 rounded-lg"
        style={{ width, height }}
      >
        <div className="text-center p-6">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-red-800 font-semibold mb-2">Error al cargar el mapa</h3>
          <p className="text-red-600 mb-4">{state.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" style={{ width, height }}>
      <div 
        ref={mapContainer} 
        style={{ width: '100%', height: '100%' }}
        className="rounded-lg overflow-hidden shadow-lg"
      />
    </div>
  );
};

export default GeolocationMap;