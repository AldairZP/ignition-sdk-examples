# Ignition Perspective JSON Schemas (URN)

Este documento lista los schemas de `urn:ignition-schema:schemas/*` detectados para este proyecto.

## Versión analizada

- Ignition SDK en el proyecto: `8.1.16` (ver `gradle/libs.versions.toml`)
- Artifact escaneado: `com.inductiveautomation.perspective:perspective-common:2.1.16`

## Schemas disponibles

- `urn:ignition-schema:schemas/binding-expr.json`
- `urn:ignition-schema:schemas/binding-expr-struct.json`
- `urn:ignition-schema:schemas/binding-http.json`
- `urn:ignition-schema:schemas/binding-property.json`
- `urn:ignition-schema:schemas/binding-query.json`
- `urn:ignition-schema:schemas/binding-tag.json`
- `urn:ignition-schema:schemas/binding-tag-history.json`
- `urn:ignition-schema:schemas/css-length.schema.json`
- `urn:ignition-schema:schemas/css-props.schema.json`
- `urn:ignition-schema:schemas/css-rotation.schema.json`
- `urn:ignition-schema:schemas/css-time.schema.json`
- `urn:ignition-schema:schemas/icon-schema.json`
- `urn:ignition-schema:schemas/meta-schema.json`
- `urn:ignition-schema:schemas/optional-icon-schema.json`
- `urn:ignition-schema:schemas/project-mounts.json`
- `urn:ignition-schema:schemas/session-props.json`
- `urn:ignition-schema:schemas/style-class-schema.json`
- `urn:ignition-schema:schemas/style-properties.schema.json`
- `urn:ignition-schema:schemas/svg-fill.json`
- `urn:ignition-schema:schemas/svg-stroke.json`
- `urn:ignition-schema:schemas/transform-expr.json`
- `urn:ignition-schema:schemas/transform-format.json`
- `urn:ignition-schema:schemas/transform-map.json`
- `urn:ignition-schema:schemas/trend-style.schema.json`
- `urn:ignition-schema:schemas/view-props-schema.json`

## Para qué sirve cada uno

| Schema | Uso principal |
|---|---|
| `binding-expr.json` | Define la configuración de bindings de tipo **Expression** (expresión simple). |
| `binding-expr-struct.json` | Variante estructurada de binding de expresión (objeto más detallado para expresiones complejas/estructuradas). |
| `binding-http.json` | Configura bindings que consultan datos vía **HTTP** (URL, método, opciones y mapeo). |
| `binding-property.json` | Configura bindings entre propiedades de componentes/vistas (property-to-property). |
| `binding-query.json` | Configura bindings basados en consultas (normalmente Named Query/consultas de datos). |
| `binding-tag.json` | Configura bindings a **Tags** de Ignition (lectura/escritura y parámetros del binding). |
| `binding-tag-history.json` | Configura bindings de **histórico de tags** (series temporales/trending). |
| `css-length.schema.json` | Tipo reutilizable para longitudes CSS (`px`, `%`, `auto`, etc.). |
| `css-props.schema.json` | Define estructura para un conjunto de propiedades CSS en objetos de estilo. |
| `css-rotation.schema.json` | Define formato de rotación CSS (ángulo y ancla/origen de rotación). |
| `css-time.schema.json` | Tipo para valores de tiempo CSS (`ms`, `s`) usado en transiciones/animaciones. |
| `icon-schema.json` | Define estructura completa de un icono (librería, nombre, color/estilo). |
| `meta-schema.json` | Define propiedades meta comunes de componentes (por ejemplo nombre/visibilidad y metadatos base). |
| `optional-icon-schema.json` | Igual que `icon-schema`, pero permitiendo valor opcional o nulo. |
| `project-mounts.json` | Estructura de montajes/rutas de proyecto usados por Perspective (page/view mounts). |
| `session-props.json` | Define estructura de propiedades de sesión de Perspective. |
| `style-class-schema.json` | Define referencia/forma de uso de **style classes**. |
| `style-properties.schema.json` | Define el objeto estándar de estilo usado en `props.style` de componentes. |
| `svg-fill.json` | Define opciones de estilo para relleno (**fill**) en elementos SVG. |
| `svg-stroke.json` | Define opciones de estilo para trazo (**stroke**) en elementos SVG. |
| `transform-expr.json` | Configura transformaciones de datos tipo **expression transform** en bindings. |
| `transform-format.json` | Configura transformaciones de formato (**format transform**) para dar forma a salidas. |
| `transform-map.json` | Configura transformaciones de mapeo (**map transform**) de valores entrada→salida. |
| `trend-style.schema.json` | Define estilos específicos para componentes de tendencia/trending. |
| `view-props-schema.json` | Define estructura base de propiedades de vista (view-level props). |

## Dónde encontrarlos

En caché local de Gradle (Windows):

`C:\Users\<usuario>\.gradle\caches\modules-2\files-2.1\com.inductiveautomation.perspective\perspective-common\2.1.16\<hash>\perspective-common-2.1.16.jar`

Dentro del `.jar`, están en la carpeta interna `schemas/`.

## Cómo regenerar la lista

PowerShell:

```powershell
Add-Type -AssemblyName System.IO.Compression.FileSystem
$jar = Get-ChildItem -Recurse -File "$env:USERPROFILE\.gradle\caches\modules-2\files-2.1\com.inductiveautomation.perspective\perspective-common\2.1.16" |
  Where-Object { $_.Name -eq 'perspective-common-2.1.16.jar' } |
  Select-Object -First 1 -ExpandProperty FullName

$zip = [System.IO.Compression.ZipFile]::OpenRead($jar)
$zip.Entries |
  Where-Object { $_.FullName -match '(^|/)schemas/[^/]+\.json$' } |
  ForEach-Object { "urn:ignition-schema:schemas/$($_.FullName -replace '^.*/schemas/','')" } |
  Sort-Object -Unique
$zip.Dispose()
```

## Nota

La disponibilidad exacta puede variar por versión de Ignition/Perspective. Si actualizas versión, vuelve a ejecutar el script y actualiza este documento.

## Versión en tabla

También está disponible la misma información (required, opcionales y defaults por schema) en formato tabla en:

- [schema-attributes-tables.md](schema-attributes-tables.md)

## Atributos por schema (required, opcionales y defaults)

> Nota: este resumen muestra atributos de **primer nivel** del schema. Algunos schemas usan combinadores (`oneOf`, `anyOf`, `allOf`) y los atributos pueden variar según el caso.

### schemas/binding-expr.json

- Required: expression
- Opcionales: (no aplica o definidos por combinadores)
- Defaults por atributo:
  - expression: (sin default explícito)

### schemas/binding-expr-struct.json

- Required: struct
- Opcionales: waitOnAll
- Defaults por atributo:
  - struct: (sin default explícito)
  - waitOnAll: (sin default explícito)

### schemas/binding-http.json

- Required: request
- Opcionales: enableCookies, connectTimeout, socketTimeout, polling
- Defaults por atributo:
  - request: {"url":"","method":"GET","header":[],"auth":{"type":"none","value":""}}
  - enableCookies: true
  - connectTimeout: 30000
  - socketTimeout: 30000
  - polling: {"enabled":false,"rate":5}

### schemas/binding-property.json

- Required: path
- Opcionales: bidirectional
- Defaults por atributo:
  - path: ""
  - bidirectional: false

### schemas/binding-query.json

- Required: queryPath
- Opcionales: returnFormat, parameters, polling, designerUseLimit, bypassCache
- Defaults por atributo:
  - queryPath: (sin default explícito)
  - returnFormat: "auto"
  - parameters: 
  - polling: (sin default explícito)
  - designerUseLimit: true
  - bypassCache: false

### schemas/binding-tag.json

- Required: tagPath
- Opcionales: mode, bidirectional, references
- Defaults por atributo:
  - tagPath: ""
  - mode: "direct"
  - bidirectional: false
  - references: 

### schemas/binding-tag-history.json

- Required: dateRange, tags
- Opcionales: returnFormat, returnSize, polling, aggregate, valueFormat, ignoreBadQuality, preventInterpolation, avoidScanClassValidation, calculations
- Defaults por atributo:
  - dateRange: (sin default explícito)
  - tags: (sin default explícito)
  - returnFormat: "wide"
  - returnSize: {"type":"raw"}
  - polling: {"enabled":false,"rate":5}
  - aggregate: (sin default explícito)
  - valueFormat: "dataset"
  - ignoreBadQuality: false
  - preventInterpolation: false
  - avoidScanClassValidation: false
  - calculations: (sin default explícito)

### schemas/css-length.schema.json

- Required: (ninguno declarado a nivel raíz)
- Opcionales: (no aplica o definidos por combinadores)
- Default del schema: (sin default explícito)

### schemas/css-props.schema.json

- Required: (ninguno declarado a nivel raíz)
- Opcionales: alignContent, alignItems, alignSelf, all, animationDelay, animationDirection, animationDuration, animationFillMode, animationPlayMode, backfaceVisibility, backgroundAttachment, backgroundClip, backgroundColor, backgroundOrigin, backgroundRepeat, borderCollapse, borderStyle, borderStyleTop, borderImageRepeat, boxDecorationBreak, boxSizing, breakAfter, breakBefore, breakInside, captionSide, clear, clearAfter, color, columnFill, columnRuleStyle, columnSpan, display, emptyCells, flexDirection, flexWrap, float, fontFamily, fontKerning, fontSize, fontStretch, fontStyle, fontSynthesis, fontVariant, fontVariantCaps, fontWeight, hangingPunctuation, hyphens, imageResolution, justifyContent, lineBreak, listStylePosition, listStyleType, marginBottom, marginLeft, marginRight, marginTop, objectFit, outlineStyle, overflow, overflowWrap, overflowX, overflowY, paddingBottom, paddingLeft, paddingRight, paddingTop, pageBreakAfter, pageBreakBefore, pageBreakInside, pointerEvents, position, resize, tableLayout, textAlignLast, textDecorationLine, textDecorationPosition, textDecorationSkip, textDecorationStyle, textEmphasisPosition, textJustify, textOrientation, textTransform, transformStyle, unicodeBidi, visibility, whiteSpace, wordBreak, wordWrap, writingMode
- Defaults por atributo:
  - alignContent: (sin default explícito)
  - alignItems: (sin default explícito)
  - alignSelf: (sin default explícito)
  - all: (sin default explícito)
  - animationDelay: (sin default explícito)
  - animationDirection: (sin default explícito)
  - animationDuration: (sin default explícito)
  - animationFillMode: (sin default explícito)
  - animationPlayMode: (sin default explícito)
  - backfaceVisibility: (sin default explícito)
  - backgroundAttachment: (sin default explícito)
  - backgroundClip: (sin default explícito)
  - backgroundColor: "#ffa500"
  - backgroundOrigin: (sin default explícito)
  - backgroundRepeat: (sin default explícito)
  - borderCollapse: (sin default explícito)
  - borderStyle: (sin default explícito)
  - borderStyleTop: (sin default explícito)
  - borderImageRepeat: (sin default explícito)
  - boxDecorationBreak: (sin default explícito)
  - boxSizing: (sin default explícito)
  - breakAfter: (sin default explícito)
  - breakBefore: (sin default explícito)
  - breakInside: (sin default explícito)
  - captionSide: (sin default explícito)
  - clear: (sin default explícito)
  - clearAfter: (sin default explícito)
  - color: "#ffa500"
  - columnFill: (sin default explícito)
  - columnRuleStyle: (sin default explícito)
  - columnSpan: (sin default explícito)
  - display: (sin default explícito)
  - emptyCells: (sin default explícito)
  - flexDirection: (sin default explícito)
  - flexWrap: (sin default explícito)
  - float: (sin default explícito)
  - fontFamily: (sin default explícito)
  - fontKerning: (sin default explícito)
  - fontSize: (sin default explícito)
  - fontStretch: (sin default explícito)
  - fontStyle: (sin default explícito)
  - fontSynthesis: (sin default explícito)
  - fontVariant: (sin default explícito)
  - fontVariantCaps: (sin default explícito)
  - fontWeight: (sin default explícito)
  - hangingPunctuation: (sin default explícito)
  - hyphens: (sin default explícito)
  - imageResolution: (sin default explícito)
  - justifyContent: (sin default explícito)
  - lineBreak: (sin default explícito)
  - listStylePosition: (sin default explícito)
  - listStyleType: (sin default explícito)
  - marginBottom: (sin default explícito)
  - marginLeft: (sin default explícito)
  - marginRight: (sin default explícito)
  - marginTop: (sin default explícito)
  - objectFit: (sin default explícito)
  - outlineStyle: (sin default explícito)
  - overflow: (sin default explícito)
  - overflowWrap: (sin default explícito)
  - overflowX: (sin default explícito)
  - overflowY: (sin default explícito)
  - paddingBottom: (sin default explícito)
  - paddingLeft: (sin default explícito)
  - paddingRight: (sin default explícito)
  - paddingTop: (sin default explícito)
  - pageBreakAfter: (sin default explícito)
  - pageBreakBefore: (sin default explícito)
  - pageBreakInside: (sin default explícito)
  - pointerEvents: (sin default explícito)
  - position: (sin default explícito)
  - resize: (sin default explícito)
  - tableLayout: (sin default explícito)
  - textAlignLast: (sin default explícito)
  - textDecorationLine: (sin default explícito)
  - textDecorationPosition: (sin default explícito)
  - textDecorationSkip: (sin default explícito)
  - textDecorationStyle: (sin default explícito)
  - textEmphasisPosition: (sin default explícito)
  - textJustify: (sin default explícito)
  - textOrientation: (sin default explícito)
  - textTransform: (sin default explícito)
  - transformStyle: (sin default explícito)
  - unicodeBidi: (sin default explícito)
  - visibility: (sin default explícito)
  - whiteSpace: (sin default explícito)
  - wordBreak: (sin default explícito)
  - wordWrap: (sin default explícito)
  - writingMode: (sin default explícito)

### schemas/css-rotation.schema.json

- Required: (ninguno declarado a nivel raíz)
- Opcionales: anchor, angle
- Defaults por atributo:
  - anchor: (sin default explícito)
  - angle: (sin default explícito)

### schemas/css-time.schema.json

- Required: (ninguno declarado a nivel raíz)
- Opcionales: (no aplica o definidos por combinadores)
- Default del schema: (sin default explícito)

### schemas/icon-schema.json

- Required: (ninguno declarado a nivel raíz)
- Opcionales: path, library, name, color, style
- Defaults por atributo:
  - path: ""
  - library: (sin default explícito)
  - name: (sin default explícito)
  - color: ""
  - style: 

### schemas/meta-schema.json

- Required: (ninguno declarado a nivel raíz)
- Opcionales: name, visible, tooltip, domId
- Defaults por atributo:
  - name: (sin default explícito)
  - visible: true
  - tooltip: (sin default explícito)
  - domId: (sin default explícito)

### schemas/optional-icon-schema.json

- Required: (ninguno declarado a nivel raíz)
- Opcionales: path, color
- Defaults por atributo:
  - path: "material/link"
  - color: "#6C6C6C"

### schemas/project-mounts.json

- Required: (ninguno declarado a nivel raíz)
- Opcionales: (no aplica o definidos por combinadores)
- Default del schema: (sin default explícito)

### schemas/session-props.json

- Required: (ninguno declarado a nivel raíz)
- Opcionales: id, host, theme, locale, timeZoneId, lastActivity, auth, gateway, device, bluetooth, geolocation, appBar, pipes, symbols
- Defaults por atributo:
  - id: (sin default explícito)
  - host: (sin default explícito)
  - theme: "light"
  - locale: ""
  - timeZoneId: ""
  - lastActivity: null
  - auth: (sin default explícito)
  - gateway: (sin default explícito)
  - device: {"type":"","identifier":"","userAgent":"","settings":{"pullToRefresh":true,"preventSleep":false},"accelerometer":{"timestamp":0,"x":0,"y":0,"z":0}}
  - bluetooth: (sin default explícito)
  - geolocation: (sin default explícito)
  - appBar: (sin default explícito)
  - pipes: (sin default explícito)
  - symbols: (sin default explícito)

### schemas/style-class-schema.json

- Required: (ninguno declarado a nivel raíz)
- Opcionales: pseudo, animation, declarations, keyframes, dependencies
- Defaults por atributo:
  - pseudo: (sin default explícito)
  - animation: (sin default explícito)
  - declarations: (sin default explícito)
  - keyframes: (sin default explícito)
  - dependencies: (sin default explícito)

### schemas/style-properties.schema.json

- Required: (ninguno declarado a nivel raíz)
- Opcionales: classes, alignContent, alignItems, alignSelf, all, animationDelay, animationDirection, animationDuration, animationFillMode, animationPlayMode, backfaceVisibility, backgroundAttachment, backgroundClip, backgroundColor, backgroundOrigin, backgroundRepeat, borderCollapse, borderStyle, borderStyleTop, borderImageRepeat, boxDecorationBreak, boxSizing, breakAfter, breakBefore, breakInside, captionSide, clear, clearAfter, color, columnFill, columnRuleStyle, columnSpan, display, emptyCells, fill, flexDirection, flexWrap, float, fontFamily, fontKerning, fontSize, fontStretch, fontStyle, fontSynthesis, fontVariant, fontVariantCaps, fontWeight, hangingPunctuation, hyphens, imageResolution, justifyContent, lineBreak, listStylePosition, listStyleType, marginBottom, marginLeft, marginRight, marginTop, objectFit, outlineStyle, overflow, overflowWrap, overflowX, overflowY, paddingBottom, paddingLeft, paddingRight, paddingTop, pageBreakAfter, pageBreakBefore, pageBreakInside, pointerEvents, position, resize, tableLayout, textAlignLast, textDecorationLine, textDecorationPosition, textDecorationSkip, textDecorationStyle, textEmphasisPosition, textJustify, textOrientation, textTransform, transformStyle, unicodeBidi, visibility, whiteSpace, wordBreak, wordWrap, writingMode
- Defaults por atributo:
  - classes: ""
  - alignContent: (sin default explícito)
  - alignItems: (sin default explícito)
  - alignSelf: (sin default explícito)
  - all: (sin default explícito)
  - animationDelay: (sin default explícito)
  - animationDirection: (sin default explícito)
  - animationDuration: (sin default explícito)
  - animationFillMode: (sin default explícito)
  - animationPlayMode: (sin default explícito)
  - backfaceVisibility: (sin default explícito)
  - backgroundAttachment: (sin default explícito)
  - backgroundClip: (sin default explícito)
  - backgroundColor: "#ffa500"
  - backgroundOrigin: (sin default explícito)
  - backgroundRepeat: (sin default explícito)
  - borderCollapse: (sin default explícito)
  - borderStyle: (sin default explícito)
  - borderStyleTop: (sin default explícito)
  - borderImageRepeat: (sin default explícito)
  - boxDecorationBreak: (sin default explícito)
  - boxSizing: (sin default explícito)
  - breakAfter: (sin default explícito)
  - breakBefore: (sin default explícito)
  - breakInside: (sin default explícito)
  - captionSide: (sin default explícito)
  - clear: (sin default explícito)
  - clearAfter: (sin default explícito)
  - color: "#ffa500"
  - columnFill: (sin default explícito)
  - columnRuleStyle: (sin default explícito)
  - columnSpan: (sin default explícito)
  - display: (sin default explícito)
  - emptyCells: (sin default explícito)
  - fill: (sin default explícito)
  - flexDirection: (sin default explícito)
  - flexWrap: (sin default explícito)
  - float: (sin default explícito)
  - fontFamily: (sin default explícito)
  - fontKerning: (sin default explícito)
  - fontSize: (sin default explícito)
  - fontStretch: (sin default explícito)
  - fontStyle: (sin default explícito)
  - fontSynthesis: (sin default explícito)
  - fontVariant: (sin default explícito)
  - fontVariantCaps: (sin default explícito)
  - fontWeight: (sin default explícito)
  - hangingPunctuation: (sin default explícito)
  - hyphens: (sin default explícito)
  - imageResolution: (sin default explícito)
  - justifyContent: (sin default explícito)
  - lineBreak: (sin default explícito)
  - listStylePosition: (sin default explícito)
  - listStyleType: (sin default explícito)
  - marginBottom: (sin default explícito)
  - marginLeft: (sin default explícito)
  - marginRight: (sin default explícito)
  - marginTop: (sin default explícito)
  - objectFit: (sin default explícito)
  - outlineStyle: (sin default explícito)
  - overflow: (sin default explícito)
  - overflowWrap: (sin default explícito)
  - overflowX: (sin default explícito)
  - overflowY: (sin default explícito)
  - paddingBottom: (sin default explícito)
  - paddingLeft: (sin default explícito)
  - paddingRight: (sin default explícito)
  - paddingTop: (sin default explícito)
  - pageBreakAfter: (sin default explícito)
  - pageBreakBefore: (sin default explícito)
  - pageBreakInside: (sin default explícito)
  - pointerEvents: (sin default explícito)
  - position: (sin default explícito)
  - resize: (sin default explícito)
  - tableLayout: (sin default explícito)
  - textAlignLast: (sin default explícito)
  - textDecorationLine: (sin default explícito)
  - textDecorationPosition: (sin default explícito)
  - textDecorationSkip: (sin default explícito)
  - textDecorationStyle: (sin default explícito)
  - textEmphasisPosition: (sin default explícito)
  - textJustify: (sin default explícito)
  - textOrientation: (sin default explícito)
  - textTransform: (sin default explícito)
  - transformStyle: (sin default explícito)
  - unicodeBidi: (sin default explícito)
  - visibility: (sin default explícito)
  - whiteSpace: (sin default explícito)
  - wordBreak: (sin default explícito)
  - wordWrap: (sin default explícito)
  - writingMode: (sin default explícito)

### schemas/svg-fill.json

- Required: (ninguno declarado a nivel raíz)
- Opcionales: paint, opacity, rule
- Defaults por atributo:
  - paint: (sin default explícito)
  - opacity: (sin default explícito)
  - rule: (sin default explícito)

### schemas/svg-stroke.json

- Required: (ninguno declarado a nivel raíz)
- Opcionales: paint, width, opacity, dashArray, dashoffset, linecap, linejoin, miterlimit
- Defaults por atributo:
  - paint: (sin default explícito)
  - width: (sin default explícito)
  - opacity: (sin default explícito)
  - dashArray: (sin default explícito)
  - dashoffset: (sin default explícito)
  - linecap: (sin default explícito)
  - linejoin: (sin default explícito)
  - miterlimit: (sin default explícito)

### schemas/transform-expr.json

- Required: expression
- Opcionales: (no aplica o definidos por combinadores)
- Defaults por atributo:
  - expression: (sin default explícito)

### schemas/transform-format.json

- Required: formatType, formatValue
- Opcionales: (no aplica o definidos por combinadores)
- Default del schema: {"formatType":"datetime","formatValue":"yyyy-MM-dd h:mm:ss aa"}

### schemas/transform-map.json

- Required: (ninguno declarado a nivel raíz)
- Opcionales: (no aplica o definidos por combinadores)
- Default del schema: {"mappings":[],"inputType":"primitive","outputType":"primitive"}

### schemas/trend-style.schema.json

- Required: (ninguno declarado a nivel raíz)
- Opcionales: colorScheme, colors, normal, highlighted, selected, muted
- Defaults por atributo:
  - colorScheme: (sin default explícito)
  - colors: (sin default explícito)
  - normal: (sin default explícito)
  - highlighted: (sin default explícito)
  - selected: (sin default explícito)
  - muted: (sin default explícito)

### schemas/view-props-schema.json

- Required: (ninguno declarado a nivel raíz)
- Opcionales: defaultSize, dropConfig, loading, inputBehavior
- Defaults por atributo:
  - defaultSize: (sin default explícito)
  - dropConfig: (sin default explícito)
  - loading: (sin default explícito)
  - inputBehavior: "replace"
