/**
 * Messenger component (no ComponentStoreDelegate).
 *
 * Demonstrates:
 * - Reading component props from the PropertyTree (via getPropsReducer)
 * - Writing a prop at runtime using `this.props.store.props.write(...)`
 * - Optionally caching a prop in React state while keeping it synced
 */

import {
  ComponentMeta,
  ComponentProps,
  PComponent,
  PropertyTree,
  SizeObject,
} from "@inductiveautomation/perspective-client";
import { ToastifyView } from "./Toastify/ToastifyView";

// The 'key' or 'id' for this component type. Component must be registered with this EXACT key in the Java side as well
// as on the client side.
export const COMPONENT_TYPE = "rad.display.toastify";

/**
 * Name of the message config prop defined in the json schema defined in common/src/main/resources/messenger.props.json
 */

type ToastifyType = "info" | "error" | "success" | "warning" | "default";
type ToastifyPosition =
  | "bottom-center"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "top-left"
  | "top-right";
type ToastifyTheme = "light" | "dark" | "colored";

interface ToastifyProps {
  trigger: boolean;
  type: ToastifyType;
  text: string;
  position: ToastifyPosition;
  theme: ToastifyTheme;
  closeButton: boolean;
  hideProgressBar: boolean;
  isLoading: boolean;
  autoClose: number;
  pauseOnFocusLoss: boolean;
  pauseOnHover: boolean;
}

export const ToastifyComponent = (props: ComponentProps<ToastifyProps>) => {
  return (
      <ToastifyView
        className={{...props.emit({ classes: ["toastify-component"]})}["className"]}
        style={{...props.emit({ classes: ["toastify-component"] })}["style"]}
        trigger={props.props.trigger}
        type={props.props.type}
        text={props.props.text}
        position={props.props.position}
        theme={props.props.theme}
        closeButton={props.props.closeButton}
        hideProgressBar={props.props.hideProgressBar}
        isLoading={props.props.isLoading}
        autoClose={props.props.autoClose}
        pauseOnFocusLoss={props.props.pauseOnFocusLoss}
        pauseOnHover={props.props.pauseOnHover}
      />
  );
};

// This is the actual thing that gets registered with the component registry.
export class ToastifyComponentMeta implements ComponentMeta {
  getComponentType(): string {
    return COMPONENT_TYPE;
  }

  getDefaultSize(): SizeObject {
    return {
      width: 300,
      height: 300,
    };
  }

  getViewComponent(): PComponent {
    return ToastifyComponent as PComponent;
  }
  getPropsReducer(tree: PropertyTree): ToastifyProps {
    return {
      trigger: tree.read("trigger", false),
      type: tree.read("type", "default"),
      text: tree.read("text", ""),
      position: tree.read("position", "bottom-right"),
      theme: tree.read("theme", "light"),
      closeButton: tree.read("closeButton", true),
      hideProgressBar: tree.read("hideProgressBar", false),
      isLoading: tree.read("isLoading", false),
      autoClose: tree.read("autoClose", 5000),
      pauseOnFocusLoss: tree.read("pauseOnFocusLoss", true),
      pauseOnHover: tree.read("pauseOnHover", true),
    };
  }
}
