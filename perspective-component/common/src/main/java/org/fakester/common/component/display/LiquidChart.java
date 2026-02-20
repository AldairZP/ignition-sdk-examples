package org.fakester.common.component.display;

import com.inductiveautomation.ignition.common.gson.JsonObject;
import com.inductiveautomation.ignition.common.gson.JsonParser;
import com.inductiveautomation.ignition.common.jsonschema.JsonSchema;
import com.inductiveautomation.perspective.common.api.ComponentDescriptor;
import com.inductiveautomation.perspective.common.api.ComponentDescriptorImpl.ComponentBuilder;
import java.awt.image.BufferedImage;
import java.io.InputStreamReader;
import javax.swing.ImageIcon;
import org.fakester.common.RadComponents;

public class LiquidChart {
    public static String COMPONENT_ID = "I4cortex.FluidChart";
        public static final String META_NAME = "FluidChart";
        public static JsonSchema SCHEMA = getSchema("I4cortexliquidChart.props.json");
    public static ComponentDescriptor DESCRIPTOR;

    public LiquidChart() {
    }

        public static JsonSchema getSchema(String resourcePath) {
                return JsonSchema.parse(
                                RadComponents.class.getResourceAsStream("/" + META_NAME.toLowerCase() + "/" + resourcePath));
        }

    static {
        DESCRIPTOR = ComponentBuilder.newBuilder().setPaletteCategory(RadComponents.COMPONENT_CATEGORY)
                .setId(COMPONENT_ID)
                .setModuleId(RadComponents.MODULE_ID).setSchema(SCHEMA).setName("02 Fluid chart")
                .setIcon(new ImageIcon(RadComponents.class.getResource("/i4cortex.png")))
                .addPaletteEntry("", "Fluid chart", "A Fluid chart component.", (BufferedImage) null, (JsonObject) null)
                .addPaletteEntry("Fluid-Circle", "Circle", "A Circle Fluid chart component.", (BufferedImage) null,
                        (new JsonParser())
                                .parse(new InputStreamReader(
                                        RadComponents.class.getResourceAsStream("/" + META_NAME.toLowerCase()
                                                + "/Platte/Circle.json")))
                                .getAsJsonObject())
                .addPaletteEntry("Fluid-Pin", "Pin", "A Pin Fluid chart component.", (BufferedImage) null,
                        (new JsonParser())
                                .parse(new InputStreamReader(
                                        RadComponents.class.getResourceAsStream("/" + META_NAME.toLowerCase()
                                                + "/Platte/Pin.json")))
                                .getAsJsonObject())
                .addPaletteEntry("Fluid-Diamond", "Diamond", "A Diamond Fluid chart component.", (BufferedImage) null,
                        (new JsonParser())
                                .parse(new InputStreamReader(
                                        RadComponents.class.getResourceAsStream("/" + META_NAME.toLowerCase()
                                                + "/Platte/Diamond.json")))
                                .getAsJsonObject())
                .addPaletteEntry("Fluid-Rectangle", "Rectangle", "A Rectangle Fluid chart component.",
                        (BufferedImage) null,
                        (new JsonParser())
                                .parse(new InputStreamReader(
                                        RadComponents.class.getResourceAsStream("/" + META_NAME.toLowerCase()
                                                + "/Platte/Rectangle.json")))
                                .getAsJsonObject())
                .addPaletteEntry("Fluid-Triangle", "Triangle", "A Triangle Fluid chart component.",
                        (BufferedImage) null,
                        (new JsonParser())
                                .parse(new InputStreamReader(
                                        RadComponents.class.getResourceAsStream("/" + META_NAME.toLowerCase()
                                                + "/Platte/Triangle.json")))
                                .getAsJsonObject())
                .setDefaultMetaName(META_NAME).setResources(RadComponents.BROWSER_RESOURCES).build();
    }
}
