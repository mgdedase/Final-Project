"use client";

import Map, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

type Props = {
  lat: number;
  lng: number;
};

export default function UserMap({ lat, lng }: Props) {
  return (
    <div className="mt-6" style={{ height: "400px", width: "100%" }}>
      <Map
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: 12,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={`https://api.maptiler.com/maps/basic-v2/style.json?key=99LFAt8SvZRZqeUIvK8D`}
      >
        <Marker longitude={lng} latitude={lat} />
      </Map>
    </div>
  );
}
