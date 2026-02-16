package org.fakester.common.component.display;

import java.util.List;

import org.fakester.common.RadComponents;

import com.inductiveautomation.ignition.common.jsonschema.JsonSchema;
import com.inductiveautomation.perspective.common.api.ComponentDescriptor;
import com.inductiveautomation.perspective.common.api.ComponentDescriptorImpl;
import com.inductiveautomation.perspective.common.api.ComponentEventDescriptor;


/**
 * Common meta information about the Toastify component. See {@link Image} for docs on each field.
 */
public class Toastify {
    public static final String COMPONENT_ID = "rad.display.toastify";

    public static final JsonSchema SCHEMA =
        JsonSchema.parse(RadComponents.class.getResourceAsStream("/toastify.props.json"));

    public static final JsonSchema POINT_EVENT_SCHEMA =
        JsonSchema.parse(RadComponents.class.getResourceAsStream("/toastify.event.props.json"));
        
    public static ComponentDescriptor DESCRIPTOR = ComponentDescriptorImpl.ComponentBuilder.newBuilder()
        .setPaletteCategory(RadComponents.COMPONENT_CATEGORY)
        .setId(COMPONENT_ID)
        .setModuleId(RadComponents.MODULE_ID)
        .setSchema(SCHEMA) //  this could alternatively be created purely in Java if desired
        .setName("Toastify")
        .setDefaultMetaName("toastify")
        .addPaletteEntry("", "Toastify", "A component that uses component messaging and data fetching delegates.", null, null)
        .setEvents(List.of(
            new ComponentEventDescriptor(
                "onPointCreated",
                "Fires after a user adds a point to the plane.",
                POINT_EVENT_SCHEMA
            ),
            new ComponentEventDescriptor(
                "onPointReleased",
                "Fires after a user drags a point and releases it in edit mode.",
                POINT_EVENT_SCHEMA
            ),
            new ComponentEventDescriptor(
                "onPointDeleted",
                "Fires after a user delete a point.",
                POINT_EVENT_SCHEMA
            )
        ))
        .setResources(RadComponents.BROWSER_RESOURCES)
        .build();

}
