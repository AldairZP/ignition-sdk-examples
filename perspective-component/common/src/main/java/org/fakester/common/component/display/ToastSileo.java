package org.fakester.common.component.display;

import org.fakester.common.RadComponents;

import com.inductiveautomation.ignition.common.jsonschema.JsonSchema;
import com.inductiveautomation.perspective.common.api.ComponentDescriptor;
import com.inductiveautomation.perspective.common.api.ComponentDescriptorImpl;

public class ToastSileo {
    public static final String COMPONENT_ID = "rad.display.toastsileo";

    public static final JsonSchema SCHEMA = JsonSchema
            .parse(RadComponents.class.getResourceAsStream("/toastsileo.props.json"));

    public static ComponentDescriptor DESCRIPTOR = ComponentDescriptorImpl.ComponentBuilder.newBuilder()
            .setPaletteCategory(RadComponents.COMPONENT_CATEGORY)
            .setId(COMPONENT_ID)
            .setModuleId(RadComponents.MODULE_ID)
            .setSchema(SCHEMA)
            .setName("05 ToastSileo")
            .setDefaultMetaName("toastSileo")
            .addPaletteEntry("", "ToastSileo", "Template component scaffold for toast notifications.", null, null)
            .setResources(RadComponents.BROWSER_RESOURCES)
            .build();
}
