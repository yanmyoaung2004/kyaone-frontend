export interface Location {
  lat: number;
  lng: number;
}

export interface ServiceArea {
  city: string;
  center: Location;
  radiusKm: number;
}
