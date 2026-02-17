package org.fakester.gateway;

import java.util.Optional;

import org.fakester.common.RadComponents;
import org.fakester.common.component.display.Messenger;
import org.fakester.common.component.display.Toastify;
import org.fakester.common.component.display.IconBadge;
import org.fakester.common.component.display.LiquidChart;
import org.fakester.common.component.display.BijcCalendar;
import org.fakester.common.component.display.BijcExternalEventBox;

import com.inductiveautomation.ignition.common.licensing.LicenseState;
import com.inductiveautomation.ignition.common.util.LoggerEx;
import com.inductiveautomation.ignition.gateway.model.AbstractGatewayModuleHook;
import com.inductiveautomation.ignition.gateway.model.GatewayContext;
import com.inductiveautomation.perspective.common.api.ComponentRegistry;
import com.inductiveautomation.perspective.gateway.api.PerspectiveContext;
import com.inductiveautomation.ignition.common.gson.JsonObject;
import com.inductiveautomation.ignition.gateway.dataroutes.RouteGroup;
import com.inductiveautomation.perspective.gateway.api.ComponentModelDelegateRegistry;

import org.fakester.gateway.delegate.BijcCalDelegate;;

public class RadGatewayHook extends AbstractGatewayModuleHook {

    private static final LoggerEx log = LoggerEx.newBuilder().build("rad.gateway.RadGatewayHook");

    private GatewayContext gatewayContext;
    private PerspectiveContext perspectiveContext;
    private ComponentRegistry componentRegistry;
    private ComponentModelDelegateRegistry modelDelegateRegistry;

    @Override
    public void setup(GatewayContext context) {
        this.gatewayContext = context;
        log.info("Setting up RadComponents module.");
    }

    @Override
    public void startup(LicenseState activationState) {
        log.info("Starting up RadGatewayHook!");

        this.perspectiveContext = PerspectiveContext.get(this.gatewayContext);
        this.componentRegistry = this.perspectiveContext.getComponentRegistry();
        this.modelDelegateRegistry = this.perspectiveContext.getComponentModelDelegateRegistry();
        if (this.componentRegistry != null) {
            log.info("Registering Rad components.");
            this.componentRegistry.registerComponent(Messenger.DESCRIPTOR);
            this.componentRegistry.registerComponent(Toastify.DESCRIPTOR);
            this.componentRegistry.registerComponent(LiquidChart.DESCRIPTOR);
            this.componentRegistry.registerComponent(IconBadge.DESCRIPTOR);
            this.componentRegistry.registerComponent(BijcCalendar.DESCRIPTOR);
            this.componentRegistry.registerComponent(BijcExternalEventBox.DESCRIPTOR);
        } else {
            log.error("Reference to component registry not found, Rad Components will fail to function!");
        }

        if (this.modelDelegateRegistry != null) {
            log.info("Registering model delegates.");
            this.modelDelegateRegistry.register(BijcCalendar.COMPONENT_ID, BijcCalDelegate::new);
        } else {
            log.error("ModelDelegateRegistry was not found!");
        }

    }

    @Override
    public void shutdown() {
        log.info("Shutting down RadComponent module and removing registered components.");
        if (this.componentRegistry != null) {
            this.componentRegistry.removeComponent(Messenger.COMPONENT_ID);
            this.componentRegistry.removeComponent(Toastify.COMPONENT_ID);
            this.componentRegistry.removeComponent(LiquidChart.COMPONENT_ID);
            this.componentRegistry.removeComponent(IconBadge.COMPONENT_ID);
            this.componentRegistry.removeComponent(BijcCalendar.COMPONENT_ID);
            this.componentRegistry.removeComponent(BijcExternalEventBox.COMPONENT_ID);
        } else {
            log.warn("Component registry was null, could not unregister Rad Components.");
        }
        if (this.modelDelegateRegistry != null) {
            this.modelDelegateRegistry.remove(BijcCalendar.COMPONENT_ID);
        }

    }

    @Override
    public Optional<String> getMountedResourceFolder() {
        return Optional.of("mounted");
    }

    // Lets us use the route http://<gateway>/res/radcomponents/*
    @Override
    public Optional<String> getMountPathAlias() {
        return Optional.of(RadComponents.URL_ALIAS);
    }

    @Override
    public boolean isFreeModule() {
        return true;
    }

    public static JsonObject fetchLicenseState() {
        boolean isActivated = true;
        boolean isTrialExpired = false;
        JsonObject json = new JsonObject();
        json.addProperty("isActivated", isActivated);
        json.addProperty("isTrialExpired", isTrialExpired);
        return json;
    }

    public void mountRouteHandlers(RouteGroup routes) {
        RadEndpoints.mountRoutes(routes);
    }

}
