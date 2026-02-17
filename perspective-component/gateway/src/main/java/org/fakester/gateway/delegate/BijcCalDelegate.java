package org.fakester.gateway.delegate;

import com.inductiveautomation.ignition.common.gson.JsonObject;
import com.inductiveautomation.ignition.common.util.LoggerEx;
import com.inductiveautomation.perspective.gateway.api.Component;
import com.inductiveautomation.perspective.gateway.api.ComponentModelDelegate;
import com.inductiveautomation.perspective.gateway.messages.EventFiredMsg;
import org.fakester.gateway.RadGatewayHook;

public class BijcCalDelegate extends ComponentModelDelegate {
   private static final LoggerEx log = LoggerEx.newBuilder().build("bijc.gateway.BijcCalDelegate");
   public static final String INCOMING_EVENT_NAME = "calendar-component-message-event";
   public static final String OUTBOUND_EVENT_NAME = "calendar-component-message-response-event";

   public BijcCalDelegate(Component component) {
      super(component);
   }

   protected void onStartup() {
      log.infof("Starting up delegate for '%s'!", new Object[]{this.component.getComponentAddressPath()});
   }

   protected void onShutdown() {
      log.infof("Shutting down delegate for '%s'!", new Object[]{this.component.getComponentAddressPath()});
   }

   public void handleEvent(EventFiredMsg message) {
      log.info("Handling event from component " + message.getEventName());
      if ("calendar-component-message-event".equals(message.getEventName())) {
         log.info("Recieved message from component");
         JsonObject responsePayload = RadGatewayHook.fetchLicenseState();
         this.fireEvent("calendar-component-message-response-event", responsePayload);
      }

   }

   public void fireEvent(String eventName, JsonObject event) {
      this.component.fireEvent("model", eventName, event);
   }
}