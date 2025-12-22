import React from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import { VehicleStatus } from "../types.js";
import { CENTER_LAT, CENTER_LNG } from "../constants.js";

// Helper to center map when selection changes
const MapUpdater = ({ center }) => {
  const map = useMap();
  map.flyTo(center, 14);
  return null;
};

export const MapComponent = ({
  vehicles,
  selectedVehicleId,
  onSelectVehicle,
}) => {
  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId);
  const centerPosition = selectedVehicle
    ? [selectedVehicle.location.lat, selectedVehicle.location.lng]
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

      {vehicles.map((vehicle) => (
        <CircleMarker
          key={vehicle.id}
          center={[vehicle.location.lat, vehicle.location.lng]}
          pathOptions={{
            color:
              vehicle.status === VehicleStatus.AVAILABLE
                ? "#2563eb"
                : "#9ca3af",
            fillColor:
              vehicle.status === VehicleStatus.AVAILABLE
                ? "#3b82f6"
                : "#d1d5db",
            fillOpacity: 0.7,
            weight: 2,
          }}
          radius={selectedVehicleId === vehicle.id ? 12 : 8}
          eventHandlers={{
            click: () => onSelectVehicle(vehicle.id),
          }}
        >
          <Popup>
            <div className="p-1">
              <h3 className="font-bold">{vehicle.name}</h3>
              <p className="text-sm text-gray-600">{vehicle.address}</p>
              <p className="text-blue-600 font-bold mt-1">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(vehicle.pricePerDay)}
              </p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};
