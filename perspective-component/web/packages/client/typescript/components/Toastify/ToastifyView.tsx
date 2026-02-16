import { useState } from "react";
import { toast, ToastContainer, ToastOptions } from "react-toastify";

type toastifyType = "info" | "error" | "success" | "warning" | "default";

interface Props extends ToastOptions {
  trigger: boolean;
  type: toastifyType;
  text: string;
}

export const ToastifyView = ({
  trigger,
  type,
  text,
  position,
  theme,
  closeButton,
  hideProgressBar,
  isLoading,
  autoClose,
  pauseOnFocusLoss,
  pauseOnHover,
  style,
  className
}: Props) => {
  const [prevTrigger, setPrevTrigger] = useState(trigger);
  const customStyle = style
  if (customStyle){
    delete customStyle["position"]
    delete customStyle["top"]
    delete customStyle["left"]
  }
  const toastOptions = {
    position,
    theme,
    closeButton,
    hideProgressBar,
    isLoading,
    autoClose,
    pauseOnFocusLoss,
    pauseOnHover,
    style: customStyle,
    className
  };
  const notify = () => {
    switch (type) {
      case "info":
        toast.info(text, toastOptions);
        break;
      case "success":
        toast.success(text, toastOptions);
        break;
      case "warning":
        toast.warning(text, toastOptions);
        break;
      case "error":
        toast.error(text, toastOptions);
        break;
      default:
        toast(text, toastOptions);
        break;
    }
  };
  if (trigger != prevTrigger) {
    notify();
    setPrevTrigger(trigger);
  }
  return (
      <ToastContainer />
  );
};
