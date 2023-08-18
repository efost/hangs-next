import { Wrapper } from "@googlemaps/react-wrapper";
import { useEffect, useRef } from "react";
import styles from "./EventMap.module.scss";

function Map({
  center,
  zoom,
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
  });

  return <div className={styles.mapContainer} ref={ref} id="map" />;
}

const EventMap = () => {
  const center = { lat: 37.79691, lng: -122.43712 };
  const zoom = 18;

  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      <Map center={center} zoom={zoom} />
    </Wrapper>
  );
};

export default EventMap;
EventMap.displayName = "EventMap";
