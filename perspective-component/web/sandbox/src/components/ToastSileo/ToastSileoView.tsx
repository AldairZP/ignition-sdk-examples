import "./ToastSileoView.module.css"
import { useState } from "react";
import { sileo, Toaster } from "sileo";
import type { SileoOptions } from "sileo";
import {toastSileoView_description_dark, toastSileoView_description_light} from "./ToastSileoView.module.css"

type typeToast = "success" | "info" | "warning" | "error";
type position =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";
type theme = "dark" | "light";

interface Props {
  trigger: boolean;
  type: typeToast;
  title: string;
  description: string;
  position: position;
  duration: number;
  fill: string;
  theme: theme;
}

export const ToastSileoView = ({
  type,
  trigger,
  title,
  description,
  position,
  duration,
  theme
}: Props) => {
  const [prevTrigger, setPrevTrigger] = useState(trigger);
  const handleToast = () => {
    const options: SileoOptions = {
      title,
      description,
      position,
      duration,
      fill: theme === "dark" ? "#171717": "#e7e7e7",
      styles:{
        description: theme === "dark" ? toastSileoView_description_dark : toastSileoView_description_light
      }
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
