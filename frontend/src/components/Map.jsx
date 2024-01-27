import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { toast } from "react-toastify";
import * as L from "leaflet";

export default function Map({ readonly, location, onChange }) {
  return (
    <MapContainer
      className="h-[400px]  w-[400px]"
      center={[0, 0]}
      zoom={1}
      dragging={!readonly}
      touchZoom={!readonly}
      doubleClickZoom={!readonly}
      scrollWheelZoom={!readonly}
      boxZoom={!readonly}
      keyboard={!readonly}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FindButtonAndMarker
        readonly={readonly}
        location={location}
        onChange={onChange}
      />
    </MapContainer>
  );
}

function FindButtonAndMarker({ readonly, location, onChange }) {
  const [position, setPosition] = useState(location);

  useEffect(() => {
    if (readonly) {
      map.setView(position, 13);
      return;
    }
    if (position) onChange(position);
  }, [position]);

  const map = useMapEvents({
    click(e) {
      !readonly && setPosition(e.latlng);
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 13);
    },
    locationerror(e) {
      toast.error(e.message);
    },
  });

  const markerIcon = new L.Icon({
    iconUrl: "/marker-icon-2x.png",
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
  });

  return (
    <>
      {!readonly && (
        <div className="flex  rounded-full border-2 w-full absolute z-[1000] text-amber-400 text-center font-semibold justify-center bg-white">
          <button type="button" onClick={() => map.locate()}>
            click here to find your Location
          </button>
        </div>
      )}

      {position && (
        <Marker
          eventHandlers={{
            dragend: (e) => {
              setPosition(e.target.getLatLng());
            },
          }}
          position={position}
          draggable={!readonly}
          icon={markerIcon}
        >
          <Popup>Shipping Location</Popup>
        </Marker>
      )}
    </>
  );
}
