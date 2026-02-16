package org.fakester.common;

import com.inductiveautomation.perspective.common.api.BrowserResource;
import com.inductiveautomation.perspective.common.api.BrowserResource.ResourceType;
import java.util.Set;

public class I4cortexComponents {
    public static final String MODULE_ID = "com.I4cortex.I4cortexComponentss";
    public static final String URL_ALIAS = "components";
    public static final String COMPONENT_CATEGORY = "I4cortex Components";
    public static final Set<BrowserResource> BROWSER_RESOURCES;

    public I4cortexComponents() {
    }

    static {
        BROWSER_RESOURCES = Set.of(
                new BrowserResource("I4cortex-components-js",
                        String.format("/res/%s/I4cortexComponents.js", "components"), ResourceType.JS),
                new BrowserResource("I4cortex-components-css",
                        String.format("/res/%s/I4cortexComponents.css", "components"), ResourceType.CSS)
                );
    }
}