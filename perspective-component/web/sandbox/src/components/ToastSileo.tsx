import { ToastSileoView } from "./ToastSileo/ToastSileoView";

export const ToastSileo = () => {

  return (
      <ToastSileoView
        trigger={false}
        type={"info"}
        title={"title"}
        description={"description"}
        position={"bottom-right"}
        duration={4000}
        theme={"light"}
      />
  );
};
