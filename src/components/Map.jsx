import { useNavigate } from 'react-router-dom';
import styles from './Map.module.css';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from 'react';
import { useCities } from "../contexts/CitiesContext";
import L from 'leaflet';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from "./Button";
import { useUrlPosition } from '../hooks/useUrlPosition';

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);

    return null;
}

function DetectClick() {
    const navigate = useNavigate();

    useMapEvents({
        click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    });
}

export default function Map() {

    const { cities } = useCities();
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();
    const [mapLat, mapLng] = useUrlPosition();

    //* Create Icon URL
    const iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';

    //* Create Marker on Icon
    const markerIcon = new L.Icon({
        iconUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });

    useEffect(function () {
        if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    }, [mapLat, mapLng]);

    useEffect(function () {
        if (geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }, [geolocationPosition]);

    return (
        <>
            <div className={styles.mapContainer}>
                {!geolocationPosition && <Button type="position" onClick={getPosition}>
                    {isLoadingPosition ? "Loading..." : "Use your position"}
                </Button>}
                <MapContainer className={styles.mapContainer} center={mapPosition} zoom={7} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                    />
                    {cities.map((city) => (
                        <Marker key={city.id} icon={markerIcon} position={[city.position.lat, city.position.lng]}>
                            <Popup>
                                <span>{city.emoji}</span>
                                <span>{city.cityName}</span>
                            </Popup>
                        </Marker>
                    ))}
                    <ChangeCenter position={mapPosition} />
                    <DetectClick />
                </MapContainer>
            </div>
        </>
    )
}
