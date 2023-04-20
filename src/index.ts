type Coordinate = {
  latitude: number;
  longitude: number;
};

/**
 * Calculate distance between two coordinates in kilometers using the Haversine formula.
 * @param coord1 First coordinate
 * @param coord2 Second coordinate
 * @returns Distance in kilometers
 */
function haversineDistance(coord1: Coordinate, coord2: Coordinate): number {
  const R = 6371; // Radius of Earth in kilometers
  const latDiff = deg2rad(coord2.latitude - coord1.latitude);
  const lonDiff = deg2rad(coord2.longitude - coord1.longitude);
  const a =
    Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
    Math.cos(deg2rad(coord1.latitude)) *
      Math.cos(deg2rad(coord2.latitude)) *
      Math.sin(lonDiff / 2) *
      Math.sin(lonDiff / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Convert degrees to radians
 * @param degrees Degrees to be converted
 * @returns Radians
 */
function deg2rad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Calculate nearby locations within a specified distance.
 * @param centralLocation Central location to calculate nearby locations
 * @param locations Array of locations to evaluate
 * @param maxDistance Maximum distance from the central location in kilometers
 * @returns Array of nearby locations within the specified distance
 */
export function nearbyLocations(
  centralLocation: Coordinate,
  locations: Coordinate[],
  maxDistance: number
): Coordinate[] {
  return locations.filter(
    (location) => haversineDistance(centralLocation, location) <= maxDistance
  );
}
