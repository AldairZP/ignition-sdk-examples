package org.fakester.designer;

import org.fakester.common.component.display.Messenger;
import org.fakester.common.component.display.Toastify;
import org.fakester.common.component.display.IconBadge;
import org.fakester.common.component.display.LiquidChart;
import org.fakester.common.component.display.BijcCalendar;
import org.fakester.common.component.display.BijcExternalEventBox;
import org.fakester.common.component.display.BijcZoomPan;

import com.inductiveautomation.ignition.common.BundleUtil;
import com.inductiveautomation.ignition.common.licensing.LicenseState;
import com.inductiveautomation.ignition.common.util.LoggerEx;
import com.inductiveautomation.ignition.designer.model.AbstractDesignerModuleHook;
import com.inductiveautomation.ignition.designer.model.DesignerContext;
import com.inductiveautomation.perspective.designer.DesignerComponentRegistry;
import com.inductiveautomation.perspective.designer.api.ComponentDesignDelegateRegistry;
import com.inductiveautomation.perspective.designer.api.PerspectiveDesignerInterface;

/**
 * The 'hook' class for the designer scope of the module. Registered in the
 * ignitionModule configuration of the
 * root build.gradle file.
 */
public class RadDesignerHook extends AbstractDesignerModuleHook {
    private static final LoggerEx logger = LoggerEx.newBuilder().build("RadComponents");

    private DesignerContext context;
    private DesignerComponentRegistry registry;
    private ComponentDesignDelegateRegistry delegateRegistry;

    static {
        BundleUtil.get().addBundle("radcomponents", RadDesignerHook.class.getClassLoader(), "radcomponents");
    }

    public RadDesignerHook() {
        logger.info("Registering Rad Components in Designer!");
    }

    @Override
    public void startup(DesignerContext context, LicenseState activationState) {
        this.context = context;
        init();
    }

    private void init() {
        logger.debug("Initializing registry entrants...");

        PerspectiveDesignerInterface pdi = PerspectiveDesignerInterface.get(context);

        registry = pdi.getDesignerComponentRegistry();
        this.delegateRegistry = pdi.getComponentDesignDelegateRegistry();

        // register components to get them on the palette
        registry.registerComponent(Messenger.DESCRIPTOR);
        registry.registerComponent(Toastify.DESCRIPTOR);
        registry.registerComponent(LiquidChart.DESCRIPTOR);
        registry.registerComponent(IconBadge.DESCRIPTOR);
        registry.registerComponent(BijcCalendar.DESCRIPTOR);
        registry.registerComponent(BijcExternalEventBox.DESCRIPTOR);
        registry.registerComponent(BijcZoomPan.DESCRIPTOR);

        // this.delegateRegistry.register(BijcZoomPan.COMPONENT_ID, new BijcZoomPanDesignDelegate());
    }

    @Override
    public void shutdown() {
        removeComponents();
    }

    private void removeComponents() {
        registry.removeComponent(Messenger.COMPONENT_ID);
        registry.removeComponent(Toastify.COMPONENT_ID);
        registry.removeComponent(LiquidChart.COMPONENT_ID);
        registry.removeComponent(IconBadge.COMPONENT_ID);
        registry.removeComponent(BijcCalendar.COMPONENT_ID);
        registry.removeComponent(BijcExternalEventBox.COMPONENT_ID);
        registry.removeComponent(BijcZoomPan.COMPONENT_ID);
        // this.delegateRegistry.remove(BijcZoomPan.COMPONENT_ID);
    }
}
