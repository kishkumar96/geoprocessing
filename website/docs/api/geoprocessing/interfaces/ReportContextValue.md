# ReportContextValue

Provides necessary context to ReportClient components, particularly for
use by useFunction() and useSketchProperties() hooks

## Properties

### changeLanguage()?

```ts
optional changeLanguage: (language) => void;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `language` | `string` |

#### Returns

`void`

***

### exampleOutputs?

```ts
optional exampleOutputs: TestExampleOutput[];
```

***

### geometryUri

```ts
geometryUri: string;
```

uri where the sketch can be fetched

***

### language

```ts
language: string;
```

***

### projectUrl

```ts
projectUrl: string;
```

Geoprocessing project metadata with details on functions, clients, uris

***

### simulateError?

```ts
optional simulateError: string;
```

***

### simulateLoading?

```ts
optional simulateLoading: boolean;
```

***

### sketchProperties

```ts
sketchProperties: SketchProperties;
```

***

### toggleLayerVisibility()?

```ts
optional toggleLayerVisibility: (layerId) => void;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `layerId` | `string` |

#### Returns

`void`

***

### visibleLayers

```ts
visibleLayers: string[];
```
