import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
  Marker,
  Polyline,
} from "react-leaflet";
import { VehicleStatus } from "../types.js";
import { CENTER_LAT, CENTER_LNG } from "../constants.js";
import L from "leaflet";

// Custom icon for user location
const userIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" fill="#3B82F6" stroke="white" stroke-width="2"/>
      <circle cx="12" cy="12" r="3" fill="white"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

// Helper to center map when selection changes
const MapUpdater = ({ center }) => {
  const map = useMap();
  map.flyTo(center, 14);
  return null;
};

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const MapComponent = ({
  vehicles,
  selectedVehicleId,
  onSelectVehicle,
  userLocation,
  showRoute,
  nearestVehicle,
}) => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [loadingRoute, setLoadingRoute] = useState(false);

  useEffect(() => {
    // Fetch actual route from OSRM API
    const fetchRoute = async () => {
      if (showRoute && userLocation && nearestVehicle) {
        setLoadingRoute(true);
        try {
          const response = await fetch(
            `https://router.project-osrm.org/route/v1/driving/${userLocation.lng},${userLocation.lat};${nearestVehicle.location.lng},${nearestVehicle.location.lat}?overview=full&geometries=geojson`
          );
          const data = await response.json();

          if (data.code === "Ok" && data.routes && data.routes.length > 0) {
            // Convert GeoJSON coordinates to Leaflet format [lat, lng]
            const coords = data.routes[0].geometry.coordinates.map((coord) => [
              coord[1],
              coord[0],
            ]);
            setRouteCoordinates(coords);
          } else {
            // Fallback to straight line if routing fails
            const route = [
              [userLocation.lat, userLocation.lng],
              [nearestVehicle.location.lat, nearestVehicle.location.lng],
            ];
            setRouteCoordinates(route);
          }
        } catch (error) {
          console.error("Error fetching route:", error);
          // Fallback to straight line
          const route = [
            [userLocation.lat, userLocation.lng],
            [nearestVehicle.location.lat, nearestVehicle.location.lng],
          ];
          setRouteCoordinates(route);
        } finally {
          setLoadingRoute(false);
        }
      } else {
        setRouteCoordinates([]);
      }
    };

    fetchRoute();
  }, [showRoute, userLocation, nearestVehicle]);

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId);
  const centerPosition = selectedVehicle
    ? [selectedVehicle.location.lat, selectedVehicle.location.lng]
    : userLocation
    ? [userLocation.lat, userLocation.lng]
    : [CENTER_LAT, CENTER_LNG];

  return (
    <MapContainer
      center={[CENTER_LAT, CENTER_LNG]}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-full rounded-xl overflow-hidden shadow-inner"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {selectedVehicle && <MapUpdater center={centerPosition} />}

      {/* User Location Marker */}
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>
            <div className="p-1">
              <h3 className="font-bold">Vị trí của bạn</h3>
              <p className="text-sm text-gray-600">📍 Bạn đang ở đây</p>
            </div>
          </Popup>
        </Marker>
      )}

      {/* Route Line */}
      {routeCoordinates.length > 0 && (
        <Polyline
          positions={routeCoordinates}
          color="#10B981"
          weight={5}
          opacity={0.8}
          dashArray={loadingRoute ? "10, 10" : undefined}
        />
      )}

      {/* Vehicle Markers */}
      {vehicles.map((vehicle) => (
        <CircleMarker
          key={vehicle.id}
          center={[vehicle.location.lat, vehicle.location.lng]}
          pathOptions={{
            color: "white",
            fillColor:
              vehicle.status === VehicleStatus.AVAILABLE
                ? nearestVehicle?.id === vehicle.id
                  ? "#10B981"
                  : "#3b82f6"
                : "#d1d5db",
            fillOpacity: 0.7,
            weight: 2,
          }}
          radius={
            nearestVehicle?.id === vehicle.id
              ? 12
              : selectedVehicleId === vehicle.id
              ? 10
              : 8
          }
          eventHandlers={{
            click: () => onSelectVehicle(vehicle.id),
          }}
        >
          <Popup>
            <div className="p-1">
              <h3 className="font-bold">
                {vehicle.name}
                {nearestVehicle?.id === vehicle.id && (
                  <span className="ml-1 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                    Gần nhất
                  </span>
                )}
              </h3>
              <p className="text-sm text-gray-600">{vehicle.address}</p>
              <p className="text-blue-600 font-bold mt-1">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(vehicle.pricePerDay)}
              </p>
              {userLocation && (
                <p className="text-xs text-gray-500 mt-1">
                  📏 Khoảng cách: ~
                  {calculateDistance(
                    userLocation.lat,
                    userLocation.lng,
                    vehicle.location.lat,
                    vehicle.location.lng
                  ).toFixed(1)}{" "}
                  km
                </p>
              )}
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};
