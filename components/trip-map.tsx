"use client";

import { useEffect, useRef, useState } from "react";

const stops = [
  { id: 1, name: "Paris", lat: 48.8566, lng: 2.3522 },
  { id: 2, name: "Cap Ferrat", lat: 43.6881, lng: 7.332 },
  { id: 3, name: "Ibiza", lat: 38.9067, lng: 1.4206 },
  { id: 4, name: "Taormina", lat: 37.8516, lng: 15.2853 },
  { id: 5, name: "Rome", lat: 41.9028, lng: 12.4964 }
] as const;

const hotelsByStop: Record<(typeof stops)[number]["name"], string> = {
  Paris: "San Regis",
  "Cap Ferrat": "Royal Riviera",
  Ibiza: "Destino",
  Taormina: "Grand Hotel Timeo",
  Rome: "Hasler"
};

declare global {
  interface Window {
    google?: any;
  }
}

function loadGoogleMaps(apiKey: string) {
  return new Promise<void>((resolve, reject) => {
    if (window.google?.maps) {
      resolve();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-google-maps="true"]'
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Failed to load Google Maps")), {
        once: true
      });
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.dataset.googleMaps = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(script);
  });
}

export function TripMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      setError("Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to render the live trip map.");
      return;
    }

    let cancelled = false;

    async function initialiseMap() {
      try {
        await loadGoogleMaps(apiKey);

        if (cancelled || !mapRef.current || !window.google?.maps) {
          return;
        }

        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 44.5, lng: 8.5 },
          zoom: 5,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: false,
          clickableIcons: false,
          styles: [
            {
              featureType: "all",
              elementType: "labels.text.fill",
              stylers: [{ color: "#4d5562" }]
            },
            {
              featureType: "administrative",
              elementType: "geometry.stroke",
              stylers: [{ color: "#d6c7b2" }]
            },
            {
              featureType: "landscape",
              elementType: "geometry.fill",
              stylers: [{ color: "#f4efe5" }]
            },
            {
              featureType: "poi",
              elementType: "geometry.fill",
              stylers: [{ color: "#efe7d9" }]
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#ffffff" }]
            },
            {
              featureType: "water",
              elementType: "geometry.fill",
              stylers: [{ color: "#d5e5e9" }]
            }
          ]
        });

        const bounds = new window.google.maps.LatLngBounds();
        const routePath = stops.map((stop) => {
          const point = { lat: stop.lat, lng: stop.lng };
          bounds.extend(point);
          return point;
        });

        stops.forEach((stop) => {
          const marker = new window.google.maps.Marker({
            position: { lat: stop.lat, lng: stop.lng },
            map,
            title: `${stop.id}. ${stop.name} — ${hotelsByStop[stop.name]}`,
            label: {
              text: String(stop.id),
              color: "#ffffff",
              fontSize: "13px",
              fontWeight: "700"
            },
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: "#bf9b63",
              fillOpacity: 1,
              strokeColor: "#fffaf4",
              strokeWeight: 4,
              scale: 11
            }
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 8px 10px; font-family: Arial, sans-serif; color: #1f2430;">
                <div style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #5f6b57;">Stop ${stop.id} • ${stop.name}</div>
                <div style="margin-top: 6px; font-size: 15px; font-weight: 600;">${hotelsByStop[stop.name]}</div>
              </div>
            `
          });

          marker.addListener("click", () => {
            infoWindow.open({ anchor: marker, map });
          });
        });

        new window.google.maps.Polyline({
          path: routePath,
          geodesic: true,
          strokeColor: "#bf9b63",
          strokeOpacity: 0.85,
          strokeWeight: 3,
          map
        });

        for (let index = 0; index < stops.length - 1; index += 1) {
          const current = stops[index];
          const next = stops[index + 1];
          const midpoint = {
            lat: (current.lat + next.lat) / 2,
            lng: (current.lng + next.lng) / 2
          };

          bounds.extend(midpoint);

          new window.google.maps.Marker({
            position: midpoint,
            map,
            title: `${current.name} to ${next.name}`,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: "#1f2430",
              fillOpacity: 0.92,
              strokeColor: "#fffaf4",
              strokeWeight: 3,
              scale: 8
            },
            label: {
              text: "✈",
              color: "#ffffff",
              fontSize: "11px",
              fontWeight: "700"
            }
          });
        }

        map.fitBounds(bounds, 80);
      } catch {
        if (!cancelled) {
          setError("Google Maps failed to load.");
        }
      }
    }

    void initialiseMap();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-[34px] border border-white/60 bg-white/76 shadow-panel backdrop-blur">
      <div className="relative">
        <div ref={mapRef} className="h-[68vh] min-h-[560px] w-full" />
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[rgba(255,251,245,0.82)] p-6">
            <div className="max-w-md rounded-[28px] border border-white/70 bg-[rgba(255,251,245,0.95)] p-6 text-center shadow-panel">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-olive">Map Unavailable</p>
              <p className="mt-3 text-sm leading-7 text-ink/70">{error}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
