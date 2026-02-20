package org.fakester.common.component.display;

import java.awt.image.BufferedImage;
import java.io.InputStreamReader;

import org.fakester.common.RadComponents;

import com.inductiveautomation.ignition.common.gson.JsonObject;
import com.inductiveautomation.ignition.common.gson.JsonParser;
import com.inductiveautomation.ignition.common.jsonschema.JsonSchema;
import com.inductiveautomation.perspective.common.api.ComponentDescriptor;
import com.inductiveautomation.perspective.common.api.ComponentDescriptorImpl;

public class ApexCharts {

    public static final String COMPONENT_ID = "embr.chart.apex-charts";
    public static final String META_NAME = "ApexCharts";
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
            .setName("ApexCharts Chart")
            .addPaletteEntry("base", "ApexCharts", "Modern & Interactive Open-source Charts", (BufferedImage) null,
                    variant("base"))
            .addPaletteEntry("area", "Area", "Displays data as filled areas under a line to show trends over time.",
                    (BufferedImage) null, variant("area"))
            .addPaletteEntry("bar", "Bar", "Compares values across categories using horizontal bars.",
                    (BufferedImage) null, variant("bar"))
            .addPaletteEntry("boxplot", "Box Plot", "Visualizes statistical distribution with quartiles and outliers.",
                    (BufferedImage) null, variant("boxplot"))
            .addPaletteEntry("bubble", "Bubble", "Shows data with three dimensions using bubble size and position.",
                    (BufferedImage) null, variant("bubble"))
            .addPaletteEntry("candlestick", "Candlestick",
                    "Used in finance to show open, high, low, and close values.", (BufferedImage) null,
                    variant("candlestick"))
            .addPaletteEntry("column", "Column", "Compares values across categories using vertical bars.",
                    (BufferedImage) null, variant("column"))
            .addPaletteEntry("funnel", "Funnel", "Displays stages in a process with decreasing proportions.",
                    (BufferedImage) null, variant("funnel"))
            .addPaletteEntry("heatmap", "Heat Map", "Represents data intensity using color gradients in a grid.",
                    (BufferedImage) null, variant("heatmap"))
            .addPaletteEntry("line", "Line", "Connects data points with straight lines to show trends over time.",
                    (BufferedImage) null, variant("line"))
            .addPaletteEntry("mixed", "Mixed", "Combines multiple chart types in a single view.",
                    (BufferedImage) null, variant("mixed"))
            .addPaletteEntry("pie", "Pie", "Shows parts of a whole as proportional slices of a circle.",
                    (BufferedImage) null, variant("pie"))
            .addPaletteEntry("polararea", "Polar Area", "Displays values as segments radiating from the center.",
                    (BufferedImage) null, variant("polararea"))
            .addPaletteEntry("radar", "Radar", "Shows multivariate data on axes starting from the same point.",
                    (BufferedImage) null, variant("radar"))
            .addPaletteEntry("radialbar", "Radial Bar", "Displays progress or values using circular bars.",
                    (BufferedImage) null, variant("radialbar"))
            .addPaletteEntry("rangearea", "Range Area", "Shows a range between two values over a time period.",
                    (BufferedImage) null, variant("rangearea"))
            .addPaletteEntry("scatter", "Scatter", "Plots individual points to reveal relationships or clusters.",
                    (BufferedImage) null, variant("scatter"))
            .addPaletteEntry("slope", "Slope", "Highlights changes between two time points with connecting lines.",
                    (BufferedImage) null, variant("slope"))
            .addPaletteEntry("treemap", "Tree Map", "Uses nested rectangles to show part-to-whole relationships.",
                    (BufferedImage) null, variant("treemap"))
            .setDefaultMetaName(META_NAME)
            .setResources(RadComponents.BROWSER_RESOURCES)
            .build();
}
