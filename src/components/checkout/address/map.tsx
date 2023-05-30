import { GoogleMap, MarkerF, LoadScriptNext } from '@react-google-maps/api';
import LocationCross from 'icons/LocationCross';
import { useEffect, useState } from 'react';
import Button from 'ui/Button';
import Tooltip from 'ui/Tooltip';

const Map = ({ latLong, setLatLong }: any) => {
  const [locationErrorMsg, setLocationErrorMsg] = useState('');
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const [map, setMap] = useState<any>(null);
  const [center, setCenter] = useState({
    lat: 47.904332991570065,
    lng: 106.92754438157759,
  });

  useEffect(() => {
    setCenter(latLong);
  }, []);

  const getUserLocation = (event: any) => {
    const { lat, lng } = event.latLng;
    setLatLong({ lat: lat(), lng: lng() });
  };

  const error = () => {
    setIsFindingLocation(false);
    setLocationErrorMsg('Unable to retrieve your location');
  };

  const success = (position: any) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    setLatLong({ lng, lat });
    centerMap({ lng, lat });
    setLocationErrorMsg('');
    setIsFindingLocation(false);
  };

  const handleTrackLocation = () => {
    setIsFindingLocation(true);

    if (!navigator.geolocation) {
      setLocationErrorMsg('Geolocation is not supported by your browser');
      setIsFindingLocation(false);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  const centerMap = (position) => {
    if (map) {
      map.panTo(position);
    }
  };

  return (
    <div className="px-2 col-12 gmap">
      <LoadScriptNext
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || ''}
      >
        <GoogleMap
          onClick={getUserLocation}
          clickableIcons={false}
          mapContainerClassName="google-map ratio ratio3x1 ratio-md-1x1"
          center={center}
          zoom={14}
          onLoad={(map) => setMap(map)}
        >
          {latLong && (
            <MarkerF position={latLong} draggable onDragEnd={getUserLocation} />
          )}
        </GoogleMap>
      </LoadScriptNext>
      <Tooltip text="Таны одоогийн байршил">
        <Button
          className="gmap-btn"
          onClick={handleTrackLocation}
          loading={isFindingLocation}
          type="button"
        >
          {!isFindingLocation && <LocationCross />}
        </Button>
      </Tooltip>
      {locationErrorMsg && <div className="error">{locationErrorMsg}</div>}
    </div>
  );
};

export default Map;
