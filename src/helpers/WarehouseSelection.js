import { SERVICE_AREAS } from "../components/googleMap/utils/ServiceArea";
const warehouses = [
  { city: "Yangon", center: { lat: 16.8661, lng: 96.1951 } },
  // { city: "Mandalay", center: { lat: 21.9162, lng: 96.0836 } },
  // { city: "Naypyidaw", center: { lat: 19.7633, lng: 96.0785 } },
];

function calculateDistance(coord1, coord2) {
  const toRadians = (deg) => (deg * Math.PI) / 180;
  const R = 6371;

  const dLat = toRadians(coord2.lat - coord1.lat);
  const dLng = toRadians(coord2.lng - coord1.lng);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(coord1.lat)) *
      Math.cos(toRadians(coord2.lat)) *
      Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function findNearestWarehouse(cityName) {
  const deliveryCity = SERVICE_AREAS.find((s) => s.city === cityName);
  if (deliveryCity) {
    let nearestWarehouse = null;
    let shortestDistance = Infinity;
    warehouses.forEach((warehouse) => {
      const distance = calculateDistance(warehouse.center, deliveryCity.center);

      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestWarehouse = warehouse;
      }
    });

    return { nearestWarehouse, distance: shortestDistance };
  } else {
    console.log("City not found.");
  }
}
