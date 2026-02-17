package org.fakester.gateway.delegate;

import com.inductiveautomation.ignition.common.gson.JsonObject;
import com.inductiveautomation.ignition.common.script.builtin.KeywordArgs;
import com.inductiveautomation.ignition.common.script.builtin.PyArgumentMap;
import com.inductiveautomation.perspective.gateway.api.Component;
import com.inductiveautomation.perspective.gateway.api.ComponentModelDelegate;
import com.inductiveautomation.perspective.gateway.api.ScriptCallable;
import com.inductiveautomation.perspective.gateway.messages.EventFiredMsg;
import org.python.core.PyObject;

import org.fakester.gateway.RadGatewayHook;

public class BijcZoomPanDelegate extends ComponentModelDelegate {
   public static final String OUTBOUND_EVENT_NAME = "bijc-zoompan-response-event";
   public static final String INBOUND_EVENT_NAME = "bijc-zoompan-request-event";
   public static final String OUTBOUND_LICENSE_EVENT_NAME = "bijc-zoompan-license-response-event";
   public static final String INBOUND_LICENSE_EVENT_NAME = "bijc-zoompan-license-request-event";

   public BijcZoomPanDelegate(Component component) {
      super(component);
   }

   protected void onStartup() {
   }

   protected void onShutdown() {
   }

   @ScriptCallable
   @KeywordArgs(
      names = {"scale"},
      types = {Double.class}
   )
   public void setScale(PyObject[] pyArgs, String[] keywords) throws Exception {
      PyArgumentMap argumentMap = PyArgumentMap.interpretPyArgs(pyArgs, keywords, BijcZoomPanDelegate.class, "setScale");
      Double scale = argumentMap.getDoubleArg("scale", 1.0);
      JsonObject payload = new JsonObject();
      payload.addProperty("functionToCall", "setScale");
      payload.addProperty("newScale", scale);
      this.fireEvent("bijc-zoompan-response-event", payload);
   }

   @ScriptCallable
   @KeywordArgs(
      names = {"x", "y"},
      types = {Double.class, Double.class}
   )
   public void setPosition(PyObject[] pyArgs, String[] keywords) throws Exception {
      PyArgumentMap argumentMap = PyArgumentMap.interpretPyArgs(pyArgs, keywords, BijcZoomPanDelegate.class, "setPosition");
      Double x = argumentMap.getDoubleArg("x", 0.0);
      Double y = argumentMap.getDoubleArg("y", 0.0);
      JsonObject payload = new JsonObject();
      payload.addProperty("functionToCall", "setPosition");
      payload.addProperty("x", x);
      payload.addProperty("y", y);
      this.fireEvent("bijc-zoompan-response-event", payload);
   }

   @ScriptCallable
   @KeywordArgs(
      names = {"transitionDuration", "timingFunction"},
      types = {String.class, String.class}
   )
   public void fit(PyObject[] pyArgs, String[] keywords) {
      PyArgumentMap argumentMap = PyArgumentMap.interpretPyArgs(pyArgs, keywords, BijcZoomPanDelegate.class, "fit");
      String transitionDuration = argumentMap.getStringArg("transitionDuration", (String)null);
      String timingFunction = argumentMap.getStringArg("timingFunction", (String)null);
      JsonObject payload = new JsonObject();
      payload.addProperty("functionToCall", "fit");
      payload.addProperty("transitionDuration", transitionDuration);
      payload.addProperty("timingFunction", timingFunction);
      this.fireEvent("bijc-zoompan-response-event", payload);
   }

   @ScriptCallable
   @KeywordArgs(
      names = {"componentName", "margin", "transitionDuration", "timingFunction"},
      types = {String.class, Long.class, String.class, String.class}
   )
   public void fitComponent(PyObject[] pyArgs, String[] keywords) throws Exception {
      PyArgumentMap argumentMap = PyArgumentMap.interpretPyArgs(pyArgs, keywords, BijcZoomPanDelegate.class, "fitComponent");
      String componentName = argumentMap.getStringArg("componentName", "");
      Long componentMargin = argumentMap.getLongArg("margin", 0L);
      String transitionDuration = argumentMap.getStringArg("transitionDuration", (String)null);
      String timingFunction = argumentMap.getStringArg("timingFunction", (String)null);
      JsonObject payload = new JsonObject();
      payload.addProperty("functionToCall", "fitComponent");
      payload.addProperty("componentName", componentName);
      payload.addProperty("componentMargin", componentMargin);
      payload.addProperty("transitionDuration", transitionDuration);
      payload.addProperty("timingFunction", timingFunction);
      this.fireEvent("bijc-zoompan-response-event", payload);
   }

   @ScriptCallable
   @KeywordArgs(
      names = {"x", "y", "width", "height", "transitionDuration", "timingFunction"},
      types = {Integer.class, Integer.class, Integer.class, Integer.class, String.class, String.class}
   )
   public void fitRect(PyObject[] pyArgs, String[] keywords) throws Exception {
      PyArgumentMap argumentMap = PyArgumentMap.interpretPyArgs(pyArgs, keywords, BijcZoomPanDelegate.class, "fitRect");
      int x = argumentMap.getIntArg("x", 0);
      int y = argumentMap.getIntArg("y", 0);
      int width = argumentMap.getIntArg("width", 0);
      int height = argumentMap.getIntArg("height", 0);
      String transitionDuration = argumentMap.getStringArg("transitionDuration", (String)null);
      String timingFunction = argumentMap.getStringArg("timingFunction", (String)null);
      JsonObject payload = new JsonObject();
      payload.addProperty("functionToCall", "fitRect");
      payload.addProperty("x", x);
      payload.addProperty("y", y);
      payload.addProperty("width", width);
      payload.addProperty("height", height);
      payload.addProperty("transitionDuration", transitionDuration);
      payload.addProperty("timingFunction", timingFunction);
      this.fireEvent("bijc-zoompan-response-event", payload);
   }

   public void handleEvent(EventFiredMsg message) {
      JsonObject responsePayload;
      if (message.getEventName().equals("bijc-zoompan-request-event")) {
         responsePayload = message.getEvent();
         this.log.info(responsePayload.toString());
      } else if (message.getEventName().equals("bijc-zoompan-license-request-event")) {
         responsePayload = RadGatewayHook.fetchLicenseState();
         this.fireEvent("bijc-zoompan-license-response-event", responsePayload);
      }

   }
}