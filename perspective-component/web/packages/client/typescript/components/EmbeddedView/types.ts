import { ComponentStore, JsObject, StyleObject } from "@inductiveautomation/perspective-client";

export type FlexPositionProps = {
  align: string;
  basis: string | number;
  grow: number;
  shrink: number;
};

export type EmbeddedViewProps = {
  key:string;
  viewPath: string;
  viewParams: JsObject;
  viewStyle: StyleObject;
  viewPosition: FlexPositionProps;
  useDefaultHeight: boolean;
  useDefaultMinHeight: boolean;
  useDefaultMinWidth: boolean;
  useDefaultWidth: boolean;
};
export type DelegateEmbeddedViewProps = {
  view: EmbeddedViewProps;
  mountPath: string;
  key: string;
  store: ComponentStore;
};
