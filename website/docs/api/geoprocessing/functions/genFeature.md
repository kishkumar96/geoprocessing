# genFeature()

```ts
function genFeature<G>(options): Feature<G, GeoJsonProperties>
```

Returns a Feature with given features geometry and properties. Reasonable defaults are given for properties not provided
Default geometry is a square from 0,0 to 1,1

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `G` *extends* [`Geometry`](../type-aliases/Geometry.md) | [`SketchGeometryTypes`](../type-aliases/SketchGeometryTypes.md) |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | `object` |
| `options.feature`? | [`Feature`](../interfaces/Feature.md)\<`G`, [`GeoJsonProperties`](../type-aliases/GeoJsonProperties.md)\> |
| `options.id`? | `string` |
| `options.name`? | `string` |

## Returns

[`Feature`](../interfaces/Feature.md)\<`G`, [`GeoJsonProperties`](../type-aliases/GeoJsonProperties.md)\>
