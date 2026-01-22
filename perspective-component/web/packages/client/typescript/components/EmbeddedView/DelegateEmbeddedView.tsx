import {
  ComponentStore,
  Emitter,
  ViewStateDisplay,
} from "@inductiveautomation/perspective-client";
import { memo } from "react";
import { JoinableView } from "./JoinableView";
import { DelegateEmbeddedViewProps, FlexPositionProps } from "./types";

function MissingComponentDelegate({ emit }: { emit: Emitter }) {
  return (
    <div {...emit({ classes: ["view-parent"] })}>
      <ViewStateDisplay
        primaryMessage="View Failed to Load"
        secondaryMessage={`No component delegate was found`}
        icon={
          <svg className="view-state-icon">
            <use xlinkHref="/res/perspective/icons/material-icons.svg#warning" />
          </svg>
        }
      />
    </div>
  );
}
function emitFlexPosition(props: FlexPositionProps): React.CSSProperties {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  ComponentStore;
  return {
    alignSelf: props.align,
    flexBasis: props.basis,
    flexGrow: props.grow,
    flexShrink: props.shrink,
  };
}
export const DelegateEmbeddedView = memo(function DelegateEmbeddedView({
  view,
  mountPath,
  key,
  store,
}: DelegateEmbeddedViewProps) {
  if (store.delegate == null) {
    return <MissingComponentDelegate key={key} emit={store.emitterFactory()} />;
  }

  return (
    <JoinableView
      key={key}
      store={store.view.page.parent}
      mountPath={mountPath}
      resourcePath={view.viewPath}
      parent={store}
      useDefaultHeight={view.useDefaultHeight}
      useDefaultMinHeight={view.useDefaultMinHeight}
      useDefaultMinWidth={view.useDefaultMinWidth}
      useDefaultWidth={view.useDefaultWidth}
      rootStyle={{
        ...emitFlexPosition(view.viewPosition),
        ...view.viewStyle,
        // classes: formatStyleNames(view.viewStyle.classes),
      }}
      delegate={store.delegate}
    />
  );
});
