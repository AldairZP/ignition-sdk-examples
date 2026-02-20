## Atributos por schema (formato tabla)

> Resumen de primer nivel. En schemas con oneOf/anyOf/allOf, los campos pueden variar según la rama aplicada.

### schemas/binding-expr.json

| Campo | Valor |
|---|---|
| Required | expression |
| Opcionales | (no aplica o definidos por combinadores) |
| Defaults | expression = (sin default explícito) |

### schemas/binding-expr-struct.json

| Campo | Valor |
|---|---|
| Required | struct |
| Opcionales | waitOnAll |
| Defaults | struct = (sin default explícito)<br>waitOnAll = (sin default explícito) |

### schemas/binding-http.json

| Campo | Valor |
|---|---|
| Required | request |
| Opcionales | enableCookies, connectTimeout, socketTimeout, polling |
| Defaults | request = {"url":"","method":"GET","header":[],"auth":{"type":"none","value":""}}<br>enableCookies = true<br>connectTimeout = 30000<br>socketTimeout = 30000<br>polling = {"enabled":false,"rate":5} |

### schemas/binding-property.json

| Campo | Valor |
|---|---|
| Required | path |
| Opcionales | bidirectional |
| Defaults | path = ""<br>bidirectional = false |

### schemas/binding-query.json

| Campo | Valor |
|---|---|
| Required | queryPath |
| Opcionales | returnFormat, parameters, polling, designerUseLimit, bypassCache |
| Defaults | queryPath = (sin default explícito)<br>returnFormat = "auto"<br>parameters = <br>polling = (sin default explícito)<br>designerUseLimit = true<br>bypassCache = false |

### schemas/binding-tag.json

| Campo | Valor |
|---|---|
| Required | tagPath |
| Opcionales | mode, bidirectional, references |
| Defaults | tagPath = ""<br>mode = "direct"<br>bidirectional = false<br>references =  |

### schemas/binding-tag-history.json

| Campo | Valor |
|---|---|
| Required | dateRange, tags |
| Opcionales | returnFormat, returnSize, polling, aggregate, valueFormat, ignoreBadQuality, preventInterpolation, avoidScanClassValidation, calculations |
| Defaults | dateRange = (sin default explícito)<br>tags = (sin default explícito)<br>returnFormat = "wide"<br>returnSize = {"type":"raw"}<br>polling = {"enabled":false,"rate":5}<br>aggregate = (sin default explícito)<br>valueFormat = "dataset"<br>ignoreBadQuality = false<br>preventInterpolation = false<br>avoidScanClassValidation = false<br>calculations = (sin default explícito) |

### schemas/css-length.schema.json

| Campo | Valor |
|---|---|
| Required | (ninguno declarado a nivel raíz) |
| Opcionales | (no aplica o definidos por combinadores) |
| Defaults | schema = (sin default explícito) |

### schemas/css-props.schema.json

| Campo | Valor |
|---|---|
| Required | (ninguno declarado a nivel raíz) |
| Opcionales | alignContent, alignItems, alignSelf, all, animationDelay, animationDirection, animationDuration, animationFillMode, animationPlayMode, backfaceVisibility, backgroundAttachment, backgroundClip, backgroundColor, backgroundOrigin, backgroundRepeat, borderCollapse, borderStyle, borderStyleTop, borderImageRepeat, boxDecorationBreak, boxSizing, breakAfter, breakBefore, breakInside, captionSide, clear, clearAfter, color, columnFill, columnRuleStyle, columnSpan, display, emptyCells, flexDirection, flexWrap, float, fontFamily, fontKerning, fontSize, fontStretch, fontStyle, fontSynthesis, fontVariant, fontVariantCaps, fontWeight, hangingPunctuation, hyphens, imageResolution, justifyContent, lineBreak, listStylePosition, listStyleType, marginBottom, marginLeft, marginRight, marginTop, objectFit, outlineStyle, overflow, overflowWrap, overflowX, overflowY, paddingBottom, paddingLeft, paddingRight, paddingTop, pageBreakAfter, pageBreakBefore, pageBreakInside, pointerEvents, position, resize, tableLayout, textAlignLast, textDecorationLine, textDecorationPosition, textDecorationSkip, textDecorationStyle, textEmphasisPosition, textJustify, textOrientation, textTransform, transformStyle, unicodeBidi, visibility, whiteSpace, wordBreak, wordWrap, writingMode |
| Defaults | alignContent = (sin default explícito)<br>alignItems = (sin default explícito)<br>alignSelf = (sin default explícito)<br>all = (sin default explícito)<br>animationDelay = (sin default explícito)<br>animationDirection = (sin default explícito)<br>animationDuration = (sin default explícito)<br>animationFillMode = (sin default explícito)<br>animationPlayMode = (sin default explícito)<br>backfaceVisibility = (sin default explícito)<br>backgroundAttachment = (sin default explícito)<br>backgroundClip = (sin default explícito)<br>backgroundColor = "#ffa500"<br>backgroundOrigin = (sin default explícito)<br>backgroundRepeat = (sin default explícito)<br>borderCollapse = (sin default explícito)<br>borderStyle = (sin default explícito)<br>borderStyleTop = (sin default explícito)<br>borderImageRepeat = (sin default explícito)<br>boxDecorationBreak = (sin default explícito)<br>boxSizing = (sin default explícito)<br>breakAfter = (sin default explícito)<br>breakBefore = (sin default explícito)<br>breakInside = (sin default explícito)<br>captionSide = (sin default explícito)<br>clear = (sin default explícito)<br>clearAfter = (sin default explícito)<br>color = "#ffa500"<br>columnFill = (sin default explícito)<br>columnRuleStyle = (sin default explícito)<br>columnSpan = (sin default explícito)<br>display = (sin default explícito)<br>emptyCells = (sin default explícito)<br>flexDirection = (sin default explícito)<br>flexWrap = (sin default explícito)<br>float = (sin default explícito)<br>fontFamily = (sin default explícito)<br>fontKerning = (sin default explícito)<br>fontSize = (sin default explícito)<br>fontStretch = (sin default explícito)<br>fontStyle = (sin default explícito)<br>fontSynthesis = (sin default explícito)<br>fontVariant = (sin default explícito)<br>fontVariantCaps = (sin default explícito)<br>fontWeight = (sin default explícito)<br>hangingPunctuation = (sin default explícito)<br>hyphens = (sin default explícito)<br>imageResolution = (sin default explícito)<br>justifyContent = (sin default explícito)<br>lineBreak = (sin default explícito)<br>listStylePosition = (sin default explícito)<br>listStyleType = (sin default explícito)<br>marginBottom = (sin default explícito)<br>marginLeft = (sin default explícito)<br>marginRight = (sin default explícito)<br>marginTop = (sin default explícito)<br>objectFit = (sin default explícito)<br>outlineStyle = (sin default explícito)<br>overflow = (sin default explícito)<br>overflowWrap = (sin default explícito)<br>overflowX = (sin default explícito)<br>overflowY = (sin default explícito)<br>paddingBottom = (sin default explícito)<br>paddingLeft = (sin default explícito)<br>paddingRight = (sin default explícito)<br>paddingTop = (sin default explícito)<br>pageBreakAfter = (sin default explícito)<br>pageBreakBefore = (sin default explícito)<br>pageBreakInside = (sin default explícito)<br>pointerEvents = (sin default explícito)<br>position = (sin default explícito)<br>resize = (sin default explícito)<br>tableLayout = (sin default explícito)<br>textAlignLast = (sin default explícito)<br>textDecorationLine = (sin default explícito)<br>textDecorationPosition = (sin default explícito)<br>textDecorationSkip = (sin default explícito)<br>textDecorationStyle = (sin default explícito)<br>textEmphasisPosition = (sin default explícito)<br>textJustify = (sin default explícito)<br>textOrientation = (sin default explícito)<br>textTransform = (sin default explícito)<br>transformStyle = (sin default explícito)<br>unicodeBidi = (sin default explícito)<br>visibility = (sin default explícito)<br>whiteSpace = (sin default explícito)<br>wordBreak = (sin default explícito)<br>wordWrap = (sin default explícito)<br>writingMode = (sin default explícito) |

### schemas/css-rotation.schema.json

| Campo | Valor |
|---|---|
| Required | (ninguno declarado a nivel raíz) |
| Opcionales | anchor, angle |
| Defaults | anchor = (sin default explícito)<br>angle = (sin default explícito) |

### schemas/css-time.schema.json

| Campo | Valor |
|---|---|
| Required | (ninguno declarado a nivel raíz) |
| Opcionales | (no aplica o definidos por combinadores) |
| Defaults | schema = (sin default explícito) |

### schemas/icon-schema.json

| Campo | Valor |
|---|---|
| Required | (ninguno declarado a nivel raíz) |
| Opcionales | path, library, name, color, style |
| Defaults | path = ""<br>library = (sin default explícito)<br>name = (sin default explícito)<br>color = ""<br>style =  |

### schemas/meta-schema.json

| Campo | Valor |
|---|---|
| Required | (ninguno declarado a nivel raíz) |
| Opcionales | name, visible, tooltip, domId |
| Defaults | name = (sin default explícito)<br>visible = true<br>tooltip = (sin default explícito)<br>domId = (sin default explícito) |

### schemas/optional-icon-schema.json

| Campo | Valor |
|---|---|
| Required | (ninguno declarado a nivel raíz) |
| Opcionales | path, color |
| Defaults | path = "material/link"<br>color = "#6C6C6C" |

### schemas/project-mounts.json

| Campo | Valor |
|---|---|
| Required | (ninguno declarado a nivel raíz) |
| Opcionales | (no aplica o definidos por combinadores) |
| Defaults | schema = (sin default explícito) |

### schemas/session-props.json

| Campo | Valor |
|---|---|
| Required | (ninguno declarado a nivel raíz) |
| Opcionales | id, host, theme, locale, timeZoneId, lastActivity, auth, gateway, device, bluetooth, geolocation, appBar, pipes, symbols |
| Defaults | id = (sin default explícito)<br>host = (sin default explícito)<br>theme = "light"<br>locale = ""<br>timeZoneId = ""<br>lastActivity = null<br>auth = (sin default explícito)<br>gateway = (sin default explícito)<br>device = {"type":"","identifier":"","userAgent":"","settings":{"pullToRefresh":true,"preventSleep":false},"accelerometer":{"timestamp":0,"x":0,"y":0,"z":0}}<br>bluetooth = (sin default explícito)<br>geolocation = (sin default explícito)<br>appBar = (sin default explícito)<br>pipes = (sin default explícito)<br>symbols = (sin default explícito) |

### schemas/style-class-schema.json

| Campo | Valor |
|---|---|
| Required | (ninguno declarado a nivel raíz) |
| Opcionales | pseudo, animation, declarations, keyframes, dependencies |
| Defaults | pseudo = (sin default explícito)<br>animation = (sin default explícito)<br>declarations = (sin default explícito)<br>keyframes = (sin default explícito)<br>dependencies = (sin default explícito) |

### schemas/style-properties.schema.json

| Campo | Valor |
|---|---|
| Required | (ninguno declarado a nivel raíz) |
| Opcionales | classes, alignContent, alignItems, alignSelf, all, animationDelay, animationDirection, animationDuration, animationFillMode, animationPlayMode, backfaceVisibility, backgroundAttachment, backgroundClip, backgroundColor, backgroundOrigin, backgroundRepeat, borderCollapse, borderStyle, borderStyleTop, borderImageRepeat, boxDecorationBreak, boxSizing, breakAfter, breakBefore, breakInside, captionSide, clear, clearAfter, color, columnFill, columnRuleStyle, columnSpan, display, emptyCells, fill, flexDirection, flexWrap, float, fontFamily, fontKerning, fontSize, fontStretch, fontStyle, fontSynthesis, fontVariant, fontVariantCaps, fontWeight, hangingPunctuation, hyphens, imageResolution, justifyContent, lineBreak, listStylePosition, listStyleType, marginBottom, marginLeft, marginRight, marginTop, objectFit, outlineStyle, overflow, overflowWrap, overflowX, overflowY, paddingBottom, paddingLeft, paddingRight, paddingTop, pageBreakAfter, pageBreakBefore, pageBreakInside, pointerEvents, position, resize, tableLayout, textAlignLast, textDecorationLine, textDecorationPosition, textDecorationSkip, textDecorationStyle, textEmphasisPosition, textJustify, textOrientation, textTransform, transformStyle, unicodeBidi, visibility, whiteSpace, wordBreak, wordWrap, writingMode |
| Defaults | classes = ""<br>alignContent = (sin default explícito)<br>alignItems = (sin default explícito)<br>alignSelf = (sin default explícito)<br>all = (sin default explícito)<br>animationDelay = (sin default explícito)<br>animationDirection = (sin default explícito)<br>animationDuration = (sin default explícito)<br>animationFillMode = (sin default explícito)<br>animationPlayMode = (sin default explícito)<br>backfaceVisibility = (sin default explícito)<br>backgroundAttachment = (sin default explícito)<br>backgroundClip = (sin default explícito)<br>backgroundColor = "#ffa500"<br>backgroundOrigin = (sin default explícito)<br>backgroundRepeat = (sin default explícito)<br>borderCollapse = (sin default explícito)<br>borderStyle = (sin default explícito)<br>borderStyleTop = (sin default explícito)<br>borderImageRepeat = (sin default explícito)<br>boxDecorationBreak = (sin default explícito)<br>boxSizing = (sin default explícito)<br>breakAfter = (sin default explícito)<br>breakBefore = (sin default explícito)<br>breakInside = (sin default explícito)<br>captionSide = (sin default explícito)<br>clear = (sin default explícito)<br>clearAfter = (sin default explícito)<br>color = "#ffa500"<br>columnFill = (sin default explícito)<br>columnRuleStyle = (sin default explícito)<br>columnSpan = (sin default explícito)<br>display = (sin default explícito)<br>emptyCells = (sin default explícito)<br>fill = (sin default explícito)<br>flexDirection = (sin default explícito)<br>flexWrap = (sin default explícito)<br>float = (sin default explícito)<br>fontFamily = (sin default explícito)<br>fontKerning = (sin default explícito)<br>fontSize = (sin default explícito)<br>fontStretch = (sin default explícito)<br>fontStyle = (sin default explícito)<br>fontSynthesis = (sin default explícito)<br>fontVariant = (sin default explícito)<br>fontVariantCaps = (sin default explícito)<br>fontWeight = (sin default explícito)<br>hangingPunctuation = (sin default explícito)<br>hyphens = (sin default explícito)<br>imageResolution = (sin default explícito)<br>justifyContent = (sin default explícito)<br>lineBreak = (sin default explícito)<br>listStylePosition = (sin default explícito)<br>listStyleType = (sin default explícito)<br>marginBottom = (sin default explícito)<br>marginLeft = (sin default explícito)<br>marginRight = (sin default explícito)<br>marginTop = (sin default explícito)<br>objectFit = (sin default explícito)<br>outlineStyle = (sin default explícito)<br>overflow = (sin default explícito)<br>overflowWrap = (sin default explícito)<br>overflowX = (sin default explícito)<br>overflowY = (sin default explícito)<br>paddingBottom = (sin default explícito)<br>paddingLeft = (sin default explícito)<br>paddingRight = (sin default explícito)<br>paddingTop = (sin default explícito)<br>pageBreakAfter = (sin default explícito)<br>pageBreakBefore = (sin default explícito)<br>pageBreakInside = (sin default explícito)<br>pointerEvents = (sin default explícito)<br>position = (sin default explícito)<br>resize = (sin default explícito)<br>tableLayout = (sin default explícito)<br>textAlignLast = (sin default explícito)<br>textDecorationLine = (sin default explícito)<br>textDecorationPosition = (sin default explícito)<br>textDecorationSkip = (sin default explícito)<br>textDecorationStyle = (sin default explícito)<br>textEmphasisPosition = (sin default explícito)<br>textJustify = (sin default explícito)<br>textOrientation = (sin default explícito)<br>textTransform = (sin default explícito)<br>transformStyle = (sin default explícito)<br>unicodeBidi = (sin default explícito)<br>visibility = (sin default explícito)<br>whiteSpace = (sin default explícito)<br>wordBreak = (sin default explícito)<br>wordWrap = (sin default explícito)<br>writingMode = (sin default explícito) |

### schemas/svg-fill.json

| Campo | Valor |
|---|---|
| Required | (ninguno declarado a nivel raíz) |
| Opcionales | paint, opacity, rule |
| Defaults | paint = (sin default explícito)<br>opacity = (sin default explícito)<br>rule = (sin default explícito) |

### schemas/svg-stroke.json

| Campo | Valor |
|---|---|
| Required | (ninguno declarado a nivel raíz) |
| Opcionales | paint, width, opacity, dashArray, dashoffset, linecap, linejoin, miterlimit |
| Defaults | paint = (sin default explícito)<br>width = (sin default explícito)<br>opacity = (sin default explícito)<br>dashArray = (sin default explícito)<br>dashoffset = (sin default explícito)<br>linecap = (sin default explícito)<br>linejoin = (sin default explícito)<br>miterlimit = (sin default explícito) |

### schemas/transform-expr.json

| Campo | Valor |
|---|---|
| Required | expression |
| Opcionales | (no aplica o definidos por combinadores) |
| Defaults | expression = (sin default explícito) |

### schemas/transform-format.json

| Campo | Valor |
|---|---|
| Required | formatType, formatValue |
| Opcionales | (no aplica o definidos por combinadores) |
| Defaults | schema = {"formatType":"datetime","formatValue":"yyyy-MM-dd h:mm:ss aa"} |

### schemas/transform-map.json

| Campo | Valor |
|---|---|
| Required | (ninguno declarado a nivel raíz) |
| Opcionales | (no aplica o definidos por combinadores) |
| Defaults | schema = {"mappings":[],"inputType":"primitive","outputType":"primitive"} |

### schemas/trend-style.schema.json

| Campo | Valor |
|---|---|
| Required | (ninguno declarado a nivel raíz) |
| Opcionales | colorScheme, colors, normal, highlighted, selected, muted |
| Defaults | colorScheme = (sin default explícito)<br>colors = (sin default explícito)<br>normal = (sin default explícito)<br>highlighted = (sin default explícito)<br>selected = (sin default explícito)<br>muted = (sin default explícito) |

### schemas/view-props-schema.json

| Campo | Valor |
|---|---|
| Required | (ninguno declarado a nivel raíz) |
| Opcionales | defaultSize, dropConfig, loading, inputBehavior |
| Defaults | defaultSize = (sin default explícito)<br>dropConfig = (sin default explícito)<br>loading = (sin default explícito)<br>inputBehavior = "replace" |

