package org.fakester.common.component.display;

import org.fakester.common.RadComponents;

import com.inductiveautomation.ignition.common.jsonschema.JsonSchema;
import com.inductiveautomation.perspective.common.api.ComponentDescriptor;
import com.inductiveautomation.perspective.common.api.ComponentDescriptorImpl;

/**
 * Common meta information about the Toastify component. See {@link Image} for
 * docs on each field.
 */
public class Toastify {
    public static final String COMPONENT_ID = "rad.display.toastify";
        public static final String META_NAME = "toastify";

        public static JsonSchema getSchema(String resourcePath) {
                return JsonSchema.parse(RadComponents.class.getResourceAsStream("/" + META_NAME + "/" + resourcePath));
        }

        public static final JsonSchema SCHEMA = getSchema("toastify.props.json");

    public static ComponentDescriptor DESCRIPTOR = ComponentDescriptorImpl.ComponentBuilder.newBuilder()
            .setPaletteCategory(RadComponents.COMPONENT_CATEGORY)
            .setId(COMPONENT_ID)
            .setModuleId(RadComponents.MODULE_ID)
            .setSchema(SCHEMA) // this could alternatively be created purely in Java if desired
            .setName("04 Toastify")
            .setDefaultMetaName(META_NAME)
            .addPaletteEntry("", "Toastify", "A component that uses component messaging and data fetching delegates.",
                    null, null)
            .setResources(RadComponents.BROWSER_RESOURCES)
            .build();

}
