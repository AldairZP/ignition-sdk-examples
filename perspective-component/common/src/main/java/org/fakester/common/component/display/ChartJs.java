package org.fakester.common.component.display;

import java.awt.image.BufferedImage;
import java.io.InputStreamReader;

import org.fakester.common.RadComponents;

import com.inductiveautomation.ignition.common.gson.JsonObject;
import com.inductiveautomation.ignition.common.gson.JsonParser;
import com.inductiveautomation.ignition.common.jsonschema.JsonSchema;
import com.inductiveautomation.perspective.common.api.ComponentDescriptor;
import com.inductiveautomation.perspective.common.api.ComponentDescriptorImpl;

public class ChartJs {

    public static final String COMPONENT_ID = "embr.chart.chart-js";
    public static final String META_NAME = "ChartJs";
    public static final String BASE_PATH = "/schemas/components/" + COMPONENT_ID + "/";

    public static final JsonSchema SCHEMA = JsonSchema.parse(
            RadComponents.class.getResourceAsStream(BASE_PATH + "props.json"));

    private static JsonObject variant(String name) {
        return new JsonParser()
                .parse(new InputStreamReader(
                        RadComponents.class.getResourceAsStream(BASE_PATH + "variants/" + name + ".props.json")))
                .getAsJsonObject();
    }

    public static final ComponentDescriptor DESCRIPTOR = ComponentDescriptorImpl.ComponentBuilder.newBuilder()
            .setPaletteCategory("chart")
            .setId(COMPONENT_ID)
            .setModuleId(RadComponents.MODULE_ID)
            .setSchema(SCHEMA)
            .setName("Chart.js Chart")
            .addPaletteEntry("base", "Chart.js", "A simple yet flexible JavaScript charting library for the modern web.",
                    (BufferedImage) null, variant("base"))
            .addPaletteEntry("bar", "Bar",
                    "Presents categorical data with rectangular bars with heights or lengths proportional to represented values.",
                    (BufferedImage) null, variant("bar"))
            .addPaletteEntry("bubble", "Bubble",
                    "Shows relationships between three numeric variables using position and bubble size.",
                    (BufferedImage) null, variant("bubble"))
            .addPaletteEntry("boxplot", "Box Plot",
                    "Visualizes numerical data distribution through quartiles.",
                    (BufferedImage) null, variant("boxplot"))
            .addPaletteEntry("doughnut", "Doughnut",
                    "Displays proportional values as slices in a ring chart.",
                    (BufferedImage) null, variant("doughnut"))
            .addPaletteEntry("line", "Line",
                    "Displays a series of data points connected by straight line segments.",
                    (BufferedImage) null, variant("line"))
            .addPaletteEntry("pie", "Pie", "Displays proportional values as slices of a circle.",
                    (BufferedImage) null, variant("pie"))
            .addPaletteEntry("polararea", "Polar Area",
                    "Like a pie chart, but segments have equal angles and varying radii.",
                    (BufferedImage) null, variant("polararea"))
            .addPaletteEntry("radar", "Radar",
                    "Displays multivariate data on axes starting from a central point.",
                    (BufferedImage) null, variant("radar"))
            .addPaletteEntry("violin", "Violin",
                    "Shows numeric distributions using density curves.",
                    (BufferedImage) null, variant("violin"))
            .setDefaultMetaName(META_NAME)
            .setResources(RadComponents.BROWSER_RESOURCES)
            .build();
}
