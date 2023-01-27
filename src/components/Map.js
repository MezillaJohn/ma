import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibXBqb2huIiwiYSI6ImNsZGVob3NzbTBkb2IzcHMwN3p2eWM5bGgifQ.Uv6TeT7jVUREpVNudM-xlQ";

export default function App({ cityData }) {
  // console.log(cityData);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [state, setState] = useState({ lng: -9.133333, lat: 38.716671 });

  useEffect(() => {
    setState({ lng: cityData.lng, lat: cityData.lat });
  }, [cityData]);

  useEffect(() => {
    // if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [state.lng, state.lat],
      zoom: 12,
    });
  });

  useEffect(() => {
    const addMarker = () => {
      const marker = new mapboxgl.Marker()
        .setLngLat([state.lng, state.lat])
        .addTo(map.current);

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `
        <div>
        <h3> Today's Forcast </h3>
        <p>
        <div>Weather = ${cityData.descToday}, Humidity = ${cityData.humidityToday}g/m3, Temperature = ${cityData.tempToday}k</div>
        </p>
         <h3> Tommorow's Forcast </h3>
        <p>
        <div>Weather = ${cityData.descToday}, Humidity = ${cityData.humidityToday}g/m3, Temperature = ${cityData.tempToday}k</div>
        </p>
      </div>
        `
      );
      marker.setPopup(popup);

      marker.on("click", function () {
        this.togglePopup();
      });
    };

    addMarker();
  });

  return (
    <div style={{ position: "relative" }}>
      <div className="sidebar">
        Longitude: {state.lng} | Latitude: {state.lat} | Zoom: {12}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
