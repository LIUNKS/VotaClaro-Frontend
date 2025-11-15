'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from 'next-themes';
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
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
);

const GeolocationMap: React.FC<GeolocationMapProps> = ({ 
  mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  width = '100%',
  height = '400px',
  latitude,
  longitude,
  markerTitle = 'Ubicación'
}) => {
  const { theme, resolvedTheme } = useTheme();
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
  }, [state.mounted, latitude, longitude, mapboxToken, markerTitle, resolvedTheme]);

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
        className="flex items-center justify-center bg-muted rounded-lg border-2 border-dashed border-border"
        style={{ width, height }}
      >
        <div className="text-center">
          <LoadingSpinner />
          <p className="text-muted-foreground">Preparando mapa...</p>
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
        <div className="absolute inset-0 flex items-center justify-center bg-background/75 rounded-lg backdrop-blur-sm">
          <div className="text-center">
            <LoadingSpinner />
            <p className="text-muted-foreground">Cargando mapa...</p>
          </div>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div 
        className="flex items-center justify-center bg-destructive/10 border-2 border-destructive/20 rounded-lg"
        style={{ width, height }}
      >
        <div className="text-center p-6">
          <h3 className="text-destructive font-semibold mb-2">Error al cargar el mapa</h3>
          <p className="text-destructive/80 mb-4">{state.error}</p>
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