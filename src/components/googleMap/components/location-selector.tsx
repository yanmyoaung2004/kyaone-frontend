"use client";

import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Location, ServiceArea } from "../type";
import { calculateDistance } from "../utils/distance";
import { SERVICE_AREAS } from "../utils/ServiceArea";

declare global {
  interface Window {
    google: any;
  }
}

const defaultCenterYangon = {
  lat: 16.8661, // Yangon Latitude
  lng: 96.1951, // Yangon Longitude
};

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

type Props = {
  getAddressFromMap: (address: string | null, withinService: boolean) => void;
  getCity: (city: string) => void;
};
export default function LocationSelector({
  getAddressFromMap,
  getCity,
}: Props) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [defaultCenter, setDefaultCenter] = useState(defaultCenterYangon);
  const [isInServiceArea, setIsInServiceArea] = useState<boolean>(false);
  const [nearestCity, setNearestCity] = useState<string>("");
  const [clickedAddress, setClickedAddress] = useState<string | null>(null);
  const [mapError, setMapError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (selectedLocation) {
      checkServiceArea(selectedLocation);
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === "OK" && results?.length) {
              const cityComponent = results[0].address_components.find(
                (component) => component.types.includes("locality")
              );

              if (cityComponent) {
                const userLocation = SERVICE_AREAS.find(
                  (a) => a.city === cityComponent.long_name
                );
                setDefaultCenter(userLocation?.center);
              }
            }
          });
        },
        (error) => console.log(error)
      );
    }
  }, []);

  const checkServiceArea = (location: Location) => {
    let minDistance = Number.POSITIVE_INFINITY;
    let closestCity = "";
    let withinService = false;

    SERVICE_AREAS.forEach((area) => {
      const distance = calculateDistance(location, area.center);
      if (distance < minDistance) {
        minDistance = distance;
        closestCity = area.city;
      }
      if (distance <= area.radiusKm) {
        withinService = true;
      }
    });
    setIsInServiceArea(withinService);
    setNearestCity(closestCity);
    getAddressFromMap(clickedAddress, withinService);
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newLocation = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      setSelectedLocation(newLocation);
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: newLocation }, (results, status) => {
        if (status === "OK" && results?.[0]) {
          setClickedAddress(results[0].formatted_address);
        } else {
          setClickedAddress("Address not found");
        }
      });
    }
  };

  const handleCircleClick = (area: ServiceArea) => {
    getCity(area.city);
  };

  return (
    <div>
      {isLoading && (
        <div className="w-full h-[500px] bg-muted flex items-center justify-center">
          <p className="text-lg font-semibold">Loading Map...</p>
        </div>
      )}
      <LoadScript
        googleMapsApiKey="AIzaSyC107QPQ1Zcn1QE00_sJO7fjTIGZMZtViI"
        onError={() => setMapError(true)}
        onLoad={() => setIsLoading(false)}
      >
        {mapError ? (
          <div className="w-full h-[500px] bg-muted flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-semibold text-destructive">
                Failed to load Google Maps
              </p>
              <p className="text-sm text-muted-foreground">
                Please check your API key configuration
              </p>
            </div>
          </div>
        ) : (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={defaultCenter}
            zoom={12}
            onClick={handleMapClick}
          >
            {selectedLocation && <Marker position={selectedLocation} />}
            {SERVICE_AREAS.map((area, index) => (
              <Circle
                key={index}
                center={area.center}
                radius={area.radiusKm * 1000}
                onClick={(e) => {
                  handleMapClick(e);
                  handleCircleClick(area);
                }}
                options={{
                  fillColor: "rgba(66, 133, 244, 0.2)",
                  fillOpacity: 0.3,
                  strokeColor: "#4285F4",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  clickable: true,
                }}
              />
            ))}
          </GoogleMap>
        )}
      </LoadScript>

      {clickedAddress && (
        <Alert
          className="mt-2"
          variant={isInServiceArea ? "default" : "destructive"}
        >
          {isInServiceArea ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertTitle>
            {isInServiceArea ? "Location Available" : "Location Unavailable"}
          </AlertTitle>
          <AlertDescription>
            {isInServiceArea
              ? `We deliver to your selected location in ${nearestCity}!`
              : `Sorry, we don't currently deliver to this location. Nearest service area is ${nearestCity}.`}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
