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
  ComponentStore,
  JsObject,
  PageStore,
  // PComponent,
  PropertyTree,
  SizeObject,
  StyleObject,
} from "@inductiveautomation/perspective-client";
import { Plane } from "./Plane";
import { type PointData } from "./Plane/types";
import { DelegateEmbeddedView } from "./EmbeddedView/DelegateEmbeddedView";
import { FlexPositionProps } from "./EmbeddedView/types";
import resolve from "../util/resolve";
import mergeStyles from "../util/mergeStyles";

// The 'key' or 'id' for this component type. Component must be registered with this EXACT key in the Java side as well
// as on the client side.
export const COMPONENT_TYPE = "rad.display.messenger";

/**
 * Name of the message config prop defined in the json schema defined in common/src/main/resources/messenger.props.json
 */
export const MESSAGE_CONFIG_PROP = "messageConfig";

type EmbeddedViewProps = {
  key: string
  viewPath: string
  viewParams: JsObject
  viewStyle: StyleObject
  viewPosition: FlexPositionProps
  useDefaultHeight: boolean
  useDefaultMinHeight: boolean
  useDefaultMinWidth: boolean
  useDefaultWidth: boolean
}
interface MessengerProps {
  points: PointData[];
  urlImage: string;
  widthImage: number;
  heightImage: number;
  background: string;
  colorLine: string;
  colorPoints: string;
  colorEditPoints: string;
  colorDeletePoints: string;
  subdivisions: number;
  buttons: boolean;
  zoomValue: number;
  panning: boolean;
  zooming: boolean;
  selectedPoint: PointData;
  createPoint: boolean;
  instances: EmbeddedViewProps[]
  instanceCommon: EmbeddedViewProps
}
type FlexRepeaterSettings = {
  direction: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  wrap: 'nowrap' | 'wrap' | 'wrap-reverse'
  justify:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  alignItems: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  alignContent:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'stretch'
}
type FlexRepeaterProps = {
  instances: EmbeddedViewProps[]
  instanceCommon: EmbeddedViewProps
  settings?: FlexRepeaterSettings
  style?: StyleObject
}
function getChildMountPath(store: ComponentStore, key: string) {
  return `${store.viewMountPath}$${store.addressPathString}.${key}`
}
function resolveViewProps(
  props: FlexRepeaterProps,
  index: number
): EmbeddedViewProps {
  const view = props.instances[index]

  return {
    key: view.key && view.key !== '' ? view.key : index.toString(),
    viewPath: resolve([view.viewPath, props.instanceCommon.viewPath]),
    viewParams: {},
    viewStyle: mergeStyles([props.instanceCommon.viewStyle, view.viewStyle]),
    viewPosition: {
      ...props.instanceCommon.viewPosition,
      ...view.viewPosition,
    },
    useDefaultHeight: resolve([
      view.useDefaultHeight,
      props.instanceCommon.useDefaultHeight,
    ]),
    useDefaultMinHeight: resolve([
      view.useDefaultMinHeight,
      props.instanceCommon.useDefaultMinHeight,
    ]),
    useDefaultMinWidth: resolve([
      view.useDefaultMinWidth,
      props.instanceCommon.useDefaultMinWidth,
    ]),
    useDefaultWidth: resolve([
      view.useDefaultWidth,
      props.instanceCommon.useDefaultWidth,
    ]),
  }
}


// Default configuration in component props. Added here just as a useful reference.
// export const DEFAULT_MESSAGE_CONFIG: PointData[] = [{ id: "0", x: 1, y: 2 }];
export const DEFAULT_MESSAGE_CONFIG: PointData[] = [];
const POINT_CREATED_EVENT = "onPointCreated";
const POINT_RELEASED_EVENT = "onPointReleased";
const POINT_DELETED_EVENT = "onPointDeleted";
/**
 * Our Perspective component, written as a React functional component.
 */
const onPointsChange = (
  props: ComponentProps<MessengerProps>,
  newPoints: PointData[],
) => {
  const defaultColorProp = "";
  props.store.props.write(
    "points",
    newPoints.map((item) => {
      if (item.color === undefined) {
        item.color = defaultColorProp;
      }
      return item;
    }),
  );
};

const setSelectedPoint = (
  props: ComponentProps<MessengerProps>,
  point: PointData,
) => {
  props.store.props.write("selected-point", point);
};

export const MessengerComponent = (props: ComponentProps<MessengerProps>) => {
  const height = props.emit({ classes: ["messenger-component"] })["style"][
    "height"
  ];
  console.log(props.store.parent)
  return (
    <div
      id="plane-container"
      {...props.emit({ classes: ["messenger-component"] })}
    >
      <Plane
        points={Array.isArray(props.props.points) ? props.props.points : []}
        onPointsChange={(newPoints) => {
          onPointsChange(props, newPoints);
        }}
        urlImage={props.props.urlImage}
        widthImage={props.props.widthImage}
        heightImage={props.props.heightImage}
        background={props.props.background}
        colorLine={props.props.colorLine}
        subdivisions={props.props.subdivisions}
        buttons={props.props.buttons}
        zoomValue={props.props.zoomValue}
        colorPoints={props.props.colorPoints}
        colorEditPoints={props.props.colorEditPoints}
        colorDeletePoints={props.props.colorDeletePoints}
        panning={props.props.panning}
        zooming={props.props.zooming}
        height={height}
        onPointCreated={(point, nextPoints) =>
          props.componentEvents.fireComponentEvent(POINT_CREATED_EVENT, {
            point,
            points: nextPoints,
          })
        }
        onPointReleased={(point, nextPoints) =>
          props.componentEvents.fireComponentEvent(POINT_RELEASED_EVENT, {
            point,
            points: nextPoints,
          })
        }
        onPointDeleted={(point, nextPoints) =>
          props.componentEvents.fireComponentEvent(POINT_DELETED_EVENT, {
            point,
            points: nextPoints,
          })
        }
        setSelectedPoint={(point: PointData) => {
          setSelectedPoint(props, point);
        }}
        createPoint={props.props.createPoint}
      />
      {props.props.instances.map((_, index) => {
        const view = resolveViewProps(props.props, index)
        const mountPath = getChildMountPath(props.store, view.key)
        const key = PageStore.instanceKeyFor(view.viewPath, mountPath)

        return (
          <DelegateEmbeddedView
            key={key}
            mountPath={mountPath}
            view={view}
            store={props.store}
          />
        )
      })}
    </div>
  );
};

// This is the actual thing that gets registered with the component registry.
export class MessengerComponentMeta implements ComponentMeta {
  getComponentType(): string {
    return COMPONENT_TYPE;
  }

  getDefaultSize(): SizeObject {
    return {
      width: 300,
      height: 300,
    };
  }

  // todo type of getViewComponent  PComponent
  getViewComponent(): any {
    return MessengerComponent;
  }

  getPropsReducer(tree: PropertyTree): MessengerProps {
    const colors = {
      background: "#000",
      colorLine: "#333",
      colorPoints: "#AAADDD",
      colorEditPoints: "#EE00AB",
      colorDeletePoints: "#FF0000",
    };
    const {
      background,
      colorLine,
      colorPoints,
      colorEditPoints,
      colorDeletePoints,
    } = tree.read("colors", colors);

    return {
      points: tree.read("points", DEFAULT_MESSAGE_CONFIG),
      urlImage: tree.read("urlImage", undefined),
      widthImage: tree.read("widthImage", 0),
      heightImage: tree.read("heightImage", 0),
      background,
      colorLine,
      colorPoints,
      colorEditPoints,
      colorDeletePoints,
      subdivisions: tree.read("subdivisions", 1),
      buttons: tree.read("buttons", false),
      zoomValue: tree.read("zoom", 3),
      panning: tree.read("panning", false),
      zooming: tree.read("zooming", false),
      selectedPoint: tree.read("selected-point", {}),
      createPoint: tree.read("createPoint", true),
      instances: tree.read("instances", []),
      instanceCommon: tree.read("instanceCommon", {}),
    };
  }
}
