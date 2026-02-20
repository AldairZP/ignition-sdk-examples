package org.fakester.common.component.display;

import com.inductiveautomation.ignition.common.gson.JsonObject;
import com.inductiveautomation.ignition.common.jsonschema.JsonSchema;
import com.inductiveautomation.perspective.common.api.ComponentDescriptor;
import com.inductiveautomation.perspective.common.api.ComponentEventDescriptor;
import com.inductiveautomation.perspective.common.api.ComponentDescriptorImpl.ComponentBuilder;
import java.awt.image.BufferedImage;
import java.util.List;
import javax.swing.ImageIcon;
import org.fakester.common.RadComponents;

public class BijcZoomPan {
    public static String COMPONENT_ID = "bijc.container.zoompan";
        public static final String META_NAME = "zoomPanContainer";
    public static final ZoomPanEventDescriptor ONSCALECHANGE_EVENT_DESCRIPTOR = new ZoomPanEventDescriptor(
            "onScaleChanged");
    public static final ZoomPanEventDescriptor ONPOSITIONCHANGE_EVENT_DESCRIPTOR = new ZoomPanEventDescriptor(
            "onPositionChanged");
    public static final ZoomPanEventDescriptor ONDOUBLETAP_EVENT_DESCRIPTOR = new ZoomPanEventDescriptor("onDoubleTap");
    public static final ZoomPanEventDescriptor ONWINDOWRESIZE_EVENT_DESCRIPTOR = new ZoomPanEventDescriptor(
            "onWindowResize");
    public static ComponentDescriptor DESCRIPTOR;

    public BijcZoomPan() {
    }

    public static JsonSchema getSchema(String resourcePath) {
        return JsonSchema.parse(
                RadComponents.class.getResourceAsStream("/" + META_NAME.toLowerCase() + "/" + resourcePath));
    }

    static {
        DESCRIPTOR = ComponentBuilder.newBuilder()
                .setPaletteCategory(RadComponents.COMPONENT_CATEGORY)
                .setId(COMPONENT_ID)
                .setSchema(getSchema("bijczoompan.props.json"))
                .setName("Zoom Pan Container")
                .setDefaultMetaName(META_NAME)
                .setResources(RadComponents.BROWSER_RESOURCES)
                .addPaletteEntry("", "Zoom Pan Container", "An XY container with zoom and pan capabilities",
                        (BufferedImage) null, (JsonObject) null)
                .setChildPositionSchema(getSchema("bijczoompan.child.props.json"))
                .setEvents(List.of(ONSCALECHANGE_EVENT_DESCRIPTOR, ONPOSITIONCHANGE_EVENT_DESCRIPTOR,
                        ONDOUBLETAP_EVENT_DESCRIPTOR, ONWINDOWRESIZE_EVENT_DESCRIPTOR))
                .setIcon(new ImageIcon(RadComponents.class.getResource("/zp-icon.png"))).build();
    }

    public static class ZoomPanEventDescriptor extends ComponentEventDescriptor {
        public ZoomPanEventDescriptor(String name) {
                        super(name, BijcZoomPan.getSchema("events/bijczoompan.event." + name + ".json"));
        }
    }
}