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
    public static JsonSchema SCHEMA = JsonSchema
            .parse(RadComponents.class.getResourceAsStream("/I4cortexliquidChart.props.json"));
    public static ComponentDescriptor DESCRIPTOR;

    public LiquidChart() {
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
                                        RadComponents.class.getResourceAsStream("/Platte/Circle.json")))
                                .getAsJsonObject())
                .addPaletteEntry("Fluid-Pin", "Pin", "A Pin Fluid chart component.", (BufferedImage) null,
                        (new JsonParser())
                                .parse(new InputStreamReader(
                                        RadComponents.class.getResourceAsStream("/Platte/Pin.json")))
                                .getAsJsonObject())
                .addPaletteEntry("Fluid-Diamond", "Diamond", "A Diamond Fluid chart component.", (BufferedImage) null,
                        (new JsonParser())
                                .parse(new InputStreamReader(
                                        RadComponents.class.getResourceAsStream("/Platte/Diamond.json")))
                                .getAsJsonObject())
                .addPaletteEntry("Fluid-Rectangle", "Rectangle", "A Rectangle Fluid chart component.",
                        (BufferedImage) null,
                        (new JsonParser())
                                .parse(new InputStreamReader(
                                        RadComponents.class.getResourceAsStream("/Platte/Rectangle.json")))
                                .getAsJsonObject())
                .addPaletteEntry("Fluid-Triangle", "Triangle", "A Triangle Fluid chart component.",
                        (BufferedImage) null,
                        (new JsonParser())
                                .parse(new InputStreamReader(
                                        RadComponents.class.getResourceAsStream("/Platte/Triangle.json")))
                                .getAsJsonObject())
                .setDefaultMetaName("FluidChart").setResources(RadComponents.BROWSER_RESOURCES).build();
    }
}
