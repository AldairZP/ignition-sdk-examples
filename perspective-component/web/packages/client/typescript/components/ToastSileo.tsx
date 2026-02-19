import {
  ComponentMeta,
  ComponentProps,
  PComponent,
  PropertyTree,
  SizeObject,
} from "@inductiveautomation/perspective-client";
import { ToastSileoView } from "./ToastSileo/ToastSileoView";

export const COMPONENT_TYPE = "rad.display.toastsileo";

type ToastSileoType = "info" | "error" | "success" | "warning";
// type ToastSileoPosition =
//   | "bottom-center"
//   | "bottom-left"
//   | "bottom-right"
//   | "top-center"
//   | "top-left"
//   | "top-right";
// type ToastSileoTheme = "light" | "dark" | "colored";

interface ToastSileoProps {
  trigger: boolean;
  type: ToastSileoType;
  // text: string;
  // position: ToastSileoPosition;
  // theme: ToastSileoTheme;
  // closeButton: boolean;
  // hideProgressBar: boolean;
  // isLoading: boolean;
  // autoClose: number;
  // pauseOnFocusLoss: boolean;
  // pauseOnHover: boolean;
}

export const ToastSileoComponent = (props: ComponentProps<ToastSileoProps>) => {
  return (
    <ToastSileoView type={props.props.type} trigger={props.props.trigger} />
    // <ToastifyView
    // className={{ ...props.emit({ classes: ["toastsileo-component"] }) }["className"]}
    // style={{ ...props.emit({ classes: ["toastsileo-component"] }) }["style"]}
    // trigger={props.props.trigger}
    // type={props.props.type}
    // text={props.props.text}
    // position={props.props.position}
    // theme={props.props.theme}
    // closeButton={props.props.closeButton}
    // hideProgressBar={props.props.hideProgressBar}
    // isLoading={props.props.isLoading}
    // autoClose={props.props.autoClose}
    // pauseOnFocusLoss={props.props.pauseOnFocusLoss}
    // pauseOnHover={props.props.pauseOnHover}
    // />
  );
};

export class ToastSileoComponentMeta implements ComponentMeta {
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
    return ToastSileoComponent as PComponent;
  }

  getPropsReducer(tree: PropertyTree): ToastSileoProps {
    return {
      trigger: tree.read("trigger", false),
      type: tree.read("type", "default"),
      // text: tree.read("text", ""),
      // position: tree.read("position", "bottom-right"),
      // theme: tree.read("theme", "light"),
      // closeButton: tree.read("closeButton", true),
      // hideProgressBar: tree.read("hideProgressBar", false),
      // isLoading: tree.read("isLoading", false),
      // autoClose: tree.read("autoClose", 5000),
      // pauseOnFocusLoss: tree.read("pauseOnFocusLoss", true),
      // pauseOnHover: tree.read("pauseOnHover", true),
    };
  }
}
