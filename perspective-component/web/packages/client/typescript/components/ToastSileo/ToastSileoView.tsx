import { useState } from "react";
import { sileo, SileoOptions, Toaster } from "sileo";

type typeToast = "success" | "info" | "warning" | "error";

interface Props {
  trigger: boolean;
  type: typeToast;
}

export const ToastSileoView = ({ type, trigger }: Props) => {
  const [prevTrigger, setPrevTrigger] = useState(trigger);
  const handleToast = () => {
    const options: SileoOptions = {
      title: "Something went wrong",
      description: "Please try again later.",
      position: "top-center",
      duration: 100000,
      fill: "#171717",
    };

    switch (type) {
      case "success":
        sileo.success(options);
        break;
      case "info":
        sileo.info(options);
        break;
      case "warning":
        sileo.warning(options);
        break;
      case "error":
        sileo.error(options);
        break;
      default:
        break;
    }
  };

  if (trigger != prevTrigger) {
    handleToast();
    setPrevTrigger(trigger);
  }
  return (
    <>
      <Toaster />
    </>
  );
};
