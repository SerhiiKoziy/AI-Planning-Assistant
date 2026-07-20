import { useEffect, useRef, useState } from 'react';

import { MAX_ROUTE_DELIVERIES } from '../constants';
import type { Route } from '../types';

interface Props {
  route?: Route;
}

declare global {
  interface Window {
    google?: typeof google;
  }
}

function NoKeyPlaceholder({ route }: { route?: Route }) {
  return (
    <div className="w-full min-h-[500px] flex flex-col items-center justify-center gap-2 bg-card text-center p-8">
      <span className="text-5xl mb-2">🗺️</span>
      <p className="font-semibold text-ink">Google Maps</p>
      <p className="text-sm text-ink-muted">
        Add <code className="bg-panel border border-edge rounded px-1 py-0.5 text-xs font-mono">VITE_GOOGLE_MAPS_API_KEY</code> to{' '}
        <code className="bg-panel border border-edge rounded px-1 py-0.5 text-xs font-mono">.env</code>{' '}
        to enable the interactive map
      </p>
      {route && (
        <p className="mt-3 text-sm text-primary">
          Route has {route.stops.length} stops — {route.total_distance_km.toFixed(1)} km total
        </p>
      )}
    </div>
  );
}

export function RouteMap({ route }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const polylineRef = useRef<google.maps.Polyline | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [mapReady, setMapReady] = useState(false);
  const [straightLineFallback, setStraightLineFallback] = useState(false);

  useEffect(() => {
    if (!apiKey || !mapRef.current) return;

    const loadMap = () => {
      if (!mapRef.current) return;
      mapInstance.current = new window.google!.maps.Map(mapRef.current, {
        zoom: 12,
        center: { lat: 50.45, lng: 30.52 },
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#112016' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#9fb8a8' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#0b1712' }] },
          { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1c3323' }] },
          { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#06150c' }] },
        ],
      });
      setMapReady(true);
    };

    if (window.google?.maps) { loadMap(); return; }

    const scriptId = 'google-maps-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.onload = loadMap;
      document.head.appendChild(script);
    }
  }, [apiKey]);

  useEffect(() => {
    if (!mapReady || !mapInstance.current || !route) return;
    const map = mapInstance.current;
    const google = window.google!;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
    polylineRef.current?.setMap(null);
    polylineRef.current = null;
    directionsRendererRef.current?.setMap(null);
    setStraightLineFallback(false);

    const stopsWithCoords = route.stops.filter(
      (s): s is typeof s & { latitude: number; longitude: number } =>
        s.latitude != null && s.longitude != null,
    );
    if (stopsWithCoords.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    stopsWithCoords.forEach((stop, i) => {
      const pos = { lat: stop.latitude, lng: stop.longitude };
      bounds.extend(pos);
      const marker = new google.maps.Marker({ position: pos, map, label: String(i + 1), title: `Stop ${stop.sequence}` });
      markersRef.current.push(marker);
    });
    map.fitBounds(bounds);

    if (stopsWithCoords.length < 2) return;

    const drawStraightLine = () => {
      polylineRef.current = new google.maps.Polyline({
        path: stopsWithCoords.map((s) => ({ lat: s.latitude, lng: s.longitude })),
        geodesic: true,
        strokeColor: '#2f9e5c',
        strokeOpacity: 0.9,
        strokeWeight: 3,
        map,
      });
    };

    if (stopsWithCoords.length > MAX_ROUTE_DELIVERIES) {
      setStraightLineFallback(true);
      drawStraightLine();
      return;
    }

    if (!directionsRendererRef.current) {
      directionsRendererRef.current = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        polylineOptions: { strokeColor: '#2f9e5c', strokeOpacity: 0.9, strokeWeight: 4 },
      });
    }
    directionsRendererRef.current.setMap(map);

    const [origin, ...middle] = stopsWithCoords;
    const destination = middle.pop()!;
    new google.maps.DirectionsService().route(
      {
        origin: { lat: origin.latitude, lng: origin.longitude },
        destination: { lat: destination.latitude, lng: destination.longitude },
        waypoints: middle.map((s) => ({
          location: { lat: s.latitude, lng: s.longitude },
          stopover: true,
        })),
        optimizeWaypoints: false,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          directionsRendererRef.current!.setDirections(result);
        } else {
          setStraightLineFallback(true);
          drawStraightLine();
        }
      },
    );
  }, [route, mapReady]);

  if (!apiKey) return <NoKeyPlaceholder route={route} />;

  return (
    <div className="w-full">
      {straightLineFallback && (
        <p className="text-xs text-danger bg-danger-muted border border-danger rounded-lg px-3 py-2 mb-2">
          Showing a straight-line path — turn-by-turn directions aren't available for this route
          (more than {MAX_ROUTE_DELIVERIES} stops, or the road route couldn't be calculated).
        </p>
      )}
      <div ref={mapRef} className="w-full min-h-[500px]" />
    </div>
  );
}
