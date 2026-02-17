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

public class BijcCalendar {
    public static String COMPONENT_ID = "bijc.display.calendar";
    public static final ComponentEventDescriptor DATECLICK_EVENT_DESCRIPTOR = new CalendarEventDescriptor(
            "onDateClick");
    public static final ComponentEventDescriptor SELECTIONMADE_EVENT_DESCRIPTOR = new CalendarEventDescriptor(
            "onSelectionMade");
    public static final ComponentEventDescriptor EVENTRECEIVED_EVENT_DESCRIPTOR = new CalendarEventDescriptor(
            "onEventReceived");
    public static final ComponentEventDescriptor EVENTCLICK_EVENT_DESCRIPTOR = new CalendarEventDescriptor(
            "onEventClick");
    public static final ComponentEventDescriptor EVENTDROPPED_EVENT_DESCRIPTOR = new CalendarEventDescriptor(
            "onEventDropped");
    public static final ComponentEventDescriptor EVENTRESIZED_EVENT_DESCRIPTOR = new CalendarEventDescriptor(
            "onEventResized");
    public static final ComponentEventDescriptor EVENTCREATED_EVENT_DESCRIPTOR = new CalendarEventDescriptor(
            "onEventCreated");
    public static final ComponentEventDescriptor EVENTEDITED_EVENT_DESCRIPTOR = new CalendarEventDescriptor(
            "onEventEdited");
    public static final ComponentEventDescriptor EVENTDELETED_EVENT_DESCRIPTOR = new CalendarEventDescriptor(
            "onEventDeleted");
    public static ComponentDescriptor DESCRIPTOR;

    public BijcCalendar() {
    }

    public static JsonSchema getSchema(String resourcePath) {
        return JsonSchema.parse(RadComponents.class.getResourceAsStream("/" + resourcePath));
    }

    static {
        DESCRIPTOR = ComponentBuilder.newBuilder().setPaletteCategory(RadComponents.COMPONENT_CATEGORY)
                .setId(COMPONENT_ID).setModuleId(RadComponents.MODULE_ID)
                .setSchema(getSchema("bijccalendar.props.json")).setName("Calendar")
                .setDefaultMetaName("calendar")
                .setResources(RadComponents.BROWSER_RESOURCES)
                .addPaletteEntry("", "Calendar", "A calendar component", (BufferedImage) null,
                        (JsonObject) null)
                .setIcon(new ImageIcon(RadComponents.class.getResource("/calendar-icon.png")))
                .setEvents(List.of(DATECLICK_EVENT_DESCRIPTOR, EVENTCLICK_EVENT_DESCRIPTOR,
                        EVENTDROPPED_EVENT_DESCRIPTOR,
                        EVENTRESIZED_EVENT_DESCRIPTOR, SELECTIONMADE_EVENT_DESCRIPTOR,
                        EVENTCREATED_EVENT_DESCRIPTOR,
                        EVENTEDITED_EVENT_DESCRIPTOR, EVENTDELETED_EVENT_DESCRIPTOR,
                        EVENTRECEIVED_EVENT_DESCRIPTOR))
                .build();
    }

    public static class CalendarEventDescriptor extends ComponentEventDescriptor {
        public CalendarEventDescriptor(String name) {
            super(name, BijcCalendar.getSchema("bijccalendar." + name + ".json"));
        }
    }
}