---
name: create-ignition-component
description: Create a new Ignition Perspective component in this module by adding schema files, Java descriptor, Java registrations, and client-side TSX meta/registration. Use for requests like "crear componente", "new perspective component", "register component", "add props schema", "component descriptor".
---

# create-ignition-component

Use this skill when the user asks to create or scaffold a new Perspective component for this repository.

## When to use

- User asks to add a new Perspective component from scratch.
- User asks to register a component in Gateway/Designer and web client.
- User asks to add new `*.props.json` and component events.

## Repository conventions (critical)

- Component id format: `rad.display.<componentNameLower>`.
- Java descriptor classes are in:
	- `common/src/main/java/org/fakester/common/component/display/`
- Property schemas are in:
	- `common/src/main/resources/`
- Java registration points:
	- `gateway/src/main/java/org/fakester/gateway/RadGatewayHook.java`
	- `designer/src/main/java/org/fakester/designer/RadDesignerHook.java`
- Browser component implementation:
	- `web/packages/client/typescript/components/<ComponentName>.tsx`
- Browser exports/registration:
	- `web/packages/client/typescript/components/index.ts`
	- `web/packages/client/typescript/rad-client-components.ts`

## Implementation workflow

1. **Define schema files** in `common/src/main/resources/`:
	 - `<name>.props.json`
	 - Optional event schema: `<name>.event.props.json`
2. **Create Java descriptor class** in `common/.../component/display/<Name>.java`:
	 - `COMPONENT_ID`
	 - `SCHEMA` parsed from `/<name>.props.json`
	 - `ComponentDescriptor` with module id, palette entry, resources
	 - Optional `.setEvents(...)` if event schema exists
3. **Register component in hooks**:
	 - Import new descriptor class in `RadGatewayHook` and `RadDesignerHook`
	 - Add `registerComponent(<Name>.DESCRIPTOR)` in startup/init
	 - Add `removeComponent(<Name>.COMPONENT_ID)` in shutdown/remove
4. **Create TSX view/meta** in `web/packages/client/typescript/components/<Name>.tsx`:
	 - `COMPONENT_TYPE` must exactly match Java `COMPONENT_ID`
	 - `getPropsReducer` keys must match JSON property names
	 - root element must use `props.emit(...)`
5. **Export and register on client**:
	 - Add export to `web/packages/client/typescript/components/index.ts`
	 - Add `<Name>ComponentMeta` to `rad-client-components.ts` imports and registry array

## Consistency checklist (must pass)

- Same component id in Java + TypeScript.
- Schema file names match Java `getResourceAsStream` paths.
- Every prop read in `getPropsReducer` exists in the JSON schema (same key names, including kebab-case like `selected-point`).
- Component is registered and removed in both Gateway and Designer hooks.
- Component meta is registered in `rad-client-components.ts`.

## Validation

- Run build from repo root:
	- Windows: `gradlew.bat build`
- If only web/client changes were made, at minimum ensure TypeScript compiles through existing build tasks.

## In-skill example (generic)

Example target component: `StatusBadge`

1. Create schema:
	- `common/src/main/resources/statusbadge.props.json`
2. Create Java descriptor:
	- `common/src/main/java/org/fakester/common/component/display/StatusBadge.java`
	- `COMPONENT_ID = "rad.display.statusbadge"`
3. Register in hooks:
	- Add import + register/remove calls in:
	  - `gateway/src/main/java/org/fakester/gateway/RadGatewayHook.java`
	  - `designer/src/main/java/org/fakester/designer/RadDesignerHook.java`
4. Create TS component meta/view:
	- `web/packages/client/typescript/components/StatusBadge.tsx`
	- `COMPONENT_TYPE = "rad.display.statusbadge"`
5. Export/register on client:
	- Add export in `web/packages/client/typescript/components/index.ts`
	- Add `StatusBadgeComponentMeta` in `web/packages/client/typescript/rad-client-components.ts`

### Complete example file (common) - `StatusBadge.java`

```java
package org.fakester.common.component.display;

import org.fakester.common.RadComponents;

import com.inductiveautomation.ignition.common.jsonschema.JsonSchema;
import com.inductiveautomation.perspective.common.api.ComponentDescriptor;
import com.inductiveautomation.perspective.common.api.ComponentDescriptorImpl;

/**
 * Generic descriptor template for a new Perspective component.
 */
public class StatusBadge {
		public static final String COMPONENT_ID = "rad.display.statusbadge";

		public static final JsonSchema SCHEMA =
				JsonSchema.parse(RadComponents.class.getResourceAsStream("/statusbadge.props.json"));

		public static final ComponentDescriptor DESCRIPTOR = ComponentDescriptorImpl.ComponentBuilder.newBuilder()
				.setPaletteCategory(RadComponents.COMPONENT_CATEGORY)
				.setId(COMPONENT_ID)
				.setModuleId(RadComponents.MODULE_ID)
				.setSchema(SCHEMA)
				.setName("Status Badge")
				.setDefaultMetaName("statusBadge")
				.addPaletteEntry("", "Status Badge", "Generic badge component template.", null, null)
				.setResources(RadComponents.BROWSER_RESOURCES)
				.build();
}
```

### Complete example file (web) - `StatusBadge.tsx`

```tsx
import {
	ComponentMeta,
	ComponentProps,
	PComponent,
	PropertyTree,
	SizeObject,
} from "@inductiveautomation/perspective-client";

export const COMPONENT_TYPE = "rad.display.statusbadge";

interface StatusBadgeProps {
	text: string;
	tone: string;
}

export const StatusBadgeComponent = (props: ComponentProps<StatusBadgeProps>) => {
	const emitted = props.emit({ classes: ["status-badge-component"] });

	return (
		<div {...emitted}>
			<span data-tone={props.props.tone}>{props.props.text}</span>
		</div>
	);
};

export class StatusBadgeComponentMeta implements ComponentMeta {
	getComponentType(): string {
		return COMPONENT_TYPE;
	}

	getDefaultSize(): SizeObject {
		return {
			width: 140,
			height: 36,
		};
	}

	getViewComponent(): PComponent {
		return StatusBadgeComponent as PComponent;
	}

	getPropsReducer(tree: PropertyTree): StatusBadgeProps {
		return {
			text: tree.read("text", "Status"),
			tone: tree.read("tone", "neutral"),
		};
	}
}
```

### Optional matching schema (for the TSX example)

```json
{
	"type": "object",
	"properties": {
		"text": {
			"type": "string",
			"default": "Status"
		},
		"tone": {
			"type": "string",
			"default": "neutral",
			"suggestions": {
				"neutral": "neutral",
				"success": "success",
				"warning": "warning",
				"error": "error"
			}
		},
		"style": {
			"$ref": "urn:ignition-schema:schemas/style-properties.schema.json",
			"default": {
				"classes": ""
			}
		}
	}
}
```

- `web/packages/designer/typescript/rad-designer-components.ts` is currently a placeholder; do not add work there unless specifically requested.