import { Wrapper } from "@googlemaps/react-wrapper";
import { useEffect, useRef } from "react";

function Map({
  center,
  zoom,
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
}) {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
  });

  return (
    <div
      ref={ref}
      id="map"
      style={{ height: "400px", width: "-webkit-fill-available" }}
    />
  );
}

const EventMap = () => {
  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 4;

  return (
    <Wrapper apiKey="">
      <Map center={center} zoom={zoom} />
    </Wrapper>
  );
};

export default EventMap;
EventMap.displayName = "EventMap";
