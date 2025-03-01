# MultiLineString

MultiLineString geometry object.
https://tools.ietf.org/html/rfc7946#section-3.1.5

## Extends

- `GeoJsonObject`

## Properties

### bbox?

```ts
optional bbox: BBox;
```

Bounding box of the coordinate range of the object's Geometries, Features, or Feature Collections.
The value of the bbox member is an array of length 2*n where n is the number of dimensions
represented in the contained geometries, with all axes of the most southwesterly point
followed by all axes of the more northeasterly point.
The axes order of a bbox follows the axes order of geometries.
https://tools.ietf.org/html/rfc7946#section-5

#### Inherited from

`GeoJsonObject.bbox`

***

### coordinates

```ts
coordinates: Position[][];
```

***

### type

```ts
type: "MultiLineString";
```

Specifies the type of GeoJSON object.

#### Overrides

`GeoJsonObject.type`
