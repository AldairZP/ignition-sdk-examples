// Source code is decompiled from a .class file using FernFlower decompiler (from Intellij IDEA).
package org.fakester.common.component.display;

import com.inductiveautomation.ignition.common.gson.JsonObject;
import com.inductiveautomation.ignition.common.jsonschema.JsonSchema;
import com.inductiveautomation.perspective.common.api.ComponentDescriptor;
import com.inductiveautomation.perspective.common.api.ComponentDescriptorImpl.ComponentBuilder;
import java.awt.image.BufferedImage;
import javax.swing.ImageIcon;
import org.fakester.common.RadComponents;

public class IconBadge {
    public static String COMPONENT_ID = "I4cortex.IconBadge";
    public static JsonSchema SCHEMA = JsonSchema
            .parse(RadComponents.class.getResourceAsStream("/I4cortexIconBadge.props.json"));
    public static ComponentDescriptor DESCRIPTOR;

    public IconBadge() {
    }

    // .setModuleId(RadComponents.MODULE_ID)
    static {
        DESCRIPTOR = ComponentBuilder.newBuilder().setPaletteCategory(RadComponents.COMPONENT_CATEGORY).setId(COMPONENT_ID)
                .setModuleId(RadComponents.MODULE_ID).setSchema(SCHEMA).setName("01 Icon Badge")
                .setIcon(new ImageIcon(RadComponents.class.getResource("/i4cortex.png")))
                .addPaletteEntry("", "Icon Badge", "Icon Badge component.", (BufferedImage) null, (JsonObject) null)
                .setDefaultMetaName("IconBadge").setResources(RadComponents.BROWSER_RESOURCES).build();
    }
}
