package org.fakester.common.component.display;

import com.inductiveautomation.ignition.common.gson.JsonObject;
import com.inductiveautomation.ignition.common.jsonschema.JsonSchema;
import com.inductiveautomation.perspective.common.api.ComponentDescriptor;
import com.inductiveautomation.perspective.common.api.ComponentEventDescriptor;
import com.inductiveautomation.perspective.common.api.ComponentDescriptorImpl.ComponentBuilder;
import java.awt.image.BufferedImage;
import javax.swing.ImageIcon;
import org.fakester.common.RadComponents;

public class BijcExternalEventBox {
    public static String COMPONENT_ID = "bijc.display.caleventbox";
    public static final String META_NAME = "eventBox";
    public static ComponentDescriptor DESCRIPTOR;

    public BijcExternalEventBox() {
    }

    public static JsonSchema getSchema(String resourcePath) {
        return JsonSchema.parse(
                RadComponents.class.getResourceAsStream("/" + META_NAME.toLowerCase() + "/" + resourcePath));
    }

    static {
        DESCRIPTOR = ComponentBuilder.newBuilder().setPaletteCategory(RadComponents.COMPONENT_CATEGORY)
                .setId(COMPONENT_ID).setModuleId(RadComponents.MODULE_ID)
            .setSchema(getSchema("bijccaleventbox.props.json")).setName("Event Box")
            .setDefaultMetaName(META_NAME)
                .setResources(RadComponents.BROWSER_RESOURCES)
                .addPaletteEntry("", "External Event Box", "A component for events to be dropped on to the Calendar",
                        (BufferedImage) null, (JsonObject) null)
                .setIcon(new ImageIcon(RadComponents.class.getResource("/calendar-icon.png"))).build();
    }

    public static class CalendarEventDescriptor extends ComponentEventDescriptor {
        public CalendarEventDescriptor(String name) {
            super(name, BijcCalendar.getSchema("calendar/events/bijccalendar." + name + ".json"));
        }
    }
}