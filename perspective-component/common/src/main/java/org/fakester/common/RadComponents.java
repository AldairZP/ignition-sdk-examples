package org.fakester.common;

import java.util.Set;

import com.inductiveautomation.perspective.common.api.BrowserResource;

public class RadComponents {

    public static final String MODULE_ID = "org.fakester.radcomponents";
    public static final String URL_ALIAS = "radcomponents";
    public static final String COMPONENT_CATEGORY = "Rad Things";
    public static final Set<BrowserResource> BROWSER_RESOURCES = Set.of(
            new BrowserResource(
                    "rad-components-js",
                    String.format("/res/%s/RadComponents.js", URL_ALIAS),
                    BrowserResource.ResourceType.JS),
            new BrowserResource("rad-components-css",
                    String.format("/res/%s/RadComponents.css", URL_ALIAS),
                    BrowserResource.ResourceType.CSS),

            new BrowserResource("I4cortex-components-js",
                    String.format("/res/%s/I4cortexComponents.js", URL_ALIAS),
                    BrowserResource.ResourceType.JS),
            new BrowserResource("I4cortex-components-css",
                    String.format("/res/%s/I4cortexComponents.css", URL_ALIAS),
                    BrowserResource.ResourceType.CSS),
            new BrowserResource("bijc-cal-components-js",
                    String.format("/res/%s/BijcCalComponents.js", URL_ALIAS),
                    BrowserResource.ResourceType.JS),
            new BrowserResource("bijc-cal-components-css",
                    String.format("/res/%s/BijcCalComponents.css", URL_ALIAS),
                    BrowserResource.ResourceType.CSS),
            new BrowserResource("bijc-zoompan-components-js",
                    String.format("/res/%s/BijcZoomPan.js", URL_ALIAS),
                    BrowserResource.ResourceType.JS),
            new BrowserResource("bijc-zoompan-components-css",
                    String.format("/res/%s/BijcZoomPan.css", URL_ALIAS),
                    BrowserResource.ResourceType.CSS)
        );
}
