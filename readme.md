# nearby-locations-ts

A simple Node.js package to find nearby locations within a specified distance using the Haversine formula. Written in TypeScript.

## Installation

```bash
npm install nearby-locations-ts
```

## Usage

### Haversine formula

Import the `nearbyLocations` function and the `Coordinate` type from the package:

```typescript
import { nearbyLocations, Coordinate } from "nearby-locations-ts";
```

Define a central location, an array of other locations, and a maximum distance in kilometers:

```typescript
const centralLocation: Coordinate = {
  latitude: 37.7749,
  longitude: -122.4194,
};

const locations: Coordinate[] = [
  { latitude: 37.8049, longitude: -122.4484 },
  { latitude: 37.7619, longitude: -122.3884 },
  { latitude: 37.7299, longitude: -122.3694 },
];

const maxDistance = 5; // 5 km radius
```

Call the `nearbyLocations` function with the central location, locations array, and maximum distance:

The `result` will be an array of nearby locations within the specified distance.

### Mongoose (MongoDB) and Sequelize (PostgreSQL)

Import the `getNearbyCondition` function and the `NearbyConditionOptions` type from the package:

```typescript
import {
  getNearbyCondition,
  DbType,
  NearbyConditionOptions,
} from "nearby-locations-ts";
```

Define the necessary parameters, and then call the `getNearbyCondition` function:

```typescript
const options: NearbyConditionOptions = {
  latitude: 37.7749,
  longitude: -122.4194,
  maxDistance: 5,
};

const condition = getNearbyCondition(options, "mongoose"); // or "sequelize"
```

Use the `condition` in a query with Mongoose or Sequelize:

Mongoose:

```typescript
const nearbyLocations = await Location.find({ location: condition });
```

Sequelize:

```typescript
const nearbyLocations = await Location.findAll({
  where: {
    [sequelize.Op.and]: [sequelize.literal(condition)],
  },
});
```

## API

### Type: Coordinate

```typescript
type Coordinate = {
  latitude: number;
  longitude: number;
};
```

### Function: nearbyLocations

```typescript
function nearbyLocations(
  centralLocation: Coordinate,
  locations: Coordinate[],
  maxDistance: number
): Coordinate[];
```

- `centralLocation`: The central location from which to find nearby locations (type: `Coordinate`).
- `locations`: An array of locations to evaluate (type: `Coordinate[]`).
- `maxDistance`: Maximum distance from the central location in kilometers (type: `number`).

Returns an array of nearby locations within the specified distance (type: `Coordinate[]`).

### Type: DbType

```typescript
type DbType = "mongoose" | "sequelize";
```

### Type: NearbyConditionOptions

```typescript
interface NearbyConditionOptions {
  latitude: number;
  longitude: number;
  maxDistance: number;
  latitudeColumnName?: string;
  longitudeColumnName?: string;
}
```

### Function: getNearbyCondition

```typescript
function getNearbyCondition(
  options: NearbyConditionOptions,
  dbType: DbType
): object | string;
```

- `options`: Nearby condition options (type: `NearbyConditionOptions`).
- `dbType`: Database type, either "mongoose" for MongoDB or "sequelize" for PostgreSQL (type: `DbType`).

Returns a condition object for MongoDB or a raw SQL condition string for PostgreSQL to be
