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
  // PComponent,
  PropertyTree,
  SizeObject,
} from "@inductiveautomation/perspective-client";
import { Plane } from "./Plane";
import { type PointData } from "./Plane/types";

// The 'key' or 'id' for this component type. Component must be registered with this EXACT key in the Java side as well
// as on the client side.
export const COMPONENT_TYPE = "rad.display.messenger";

/**
 * Name of the message config prop defined in the json schema defined in common/src/main/resources/messenger.props.json
 */
export const MESSAGE_CONFIG_PROP = "messageConfig";

// interface MessengerPropsString {
//   points: string;
// }
interface MessengerProps {
  points: PointData[];
  urlImage: string;
  widthImage: number;
  heightImage: number;
  background: string;
  colorLine: string;
  subdivisions: number;
  buttons: boolean;
  zoomValue: number;
  colorPoints: string;
  colorEditPoints: string;
  colorDeletePoints: string;
  panning: boolean;
  zooming: boolean;
  selectedPoint: PointData;
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
  newPoints: PointData[]
) => {
  const defaultColorProp = "";
  props.store.props.write(
    "points",
    newPoints.map((item) => {
      if (item.color === undefined) {
        item.color = defaultColorProp;
      }
      return item;
    })
  );
};

const setSelectedPoint = (props: ComponentProps<MessengerProps>, point: PointData) => {
  props.store.props.write("selected-point", point)
}



export const MessengerComponent = (props: ComponentProps<MessengerProps>) => {
  const height = props.emit({ classes: ["messenger-component"] })["style"][
    "height"
  ];
  return (
    <div
      id="plane-container"
      {...props.emit({ classes: ["messenger-component"] })}
    >
      <Plane
        points={props.props.points}
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
          setSelectedPoint(props, point)
        }
        }
      />
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
    return {
      points: tree.read("points", DEFAULT_MESSAGE_CONFIG),
      urlImage: tree.read("urlImage", undefined),
      widthImage: tree.read("widthImage", 0),
      heightImage: tree.read("heightImage", 0),
      background: tree.read("background", "#000"),
      colorLine: tree.read("colorLine", "#333"),
      subdivisions: tree.read("subdivisions", 1),
      buttons: tree.read("buttons", false),
      zoomValue: tree.read("zoom", 3),
      colorPoints: tree.read("colorPoints", "#fff"),
      colorEditPoints: tree.read("colorEditPoints", "#EE00AB"),
      colorDeletePoints: tree.read("colorDeletePoints", "#ff0000"),
      panning: tree.read("panning", false),
      zooming: tree.read("zooming", false),
      selectedPoint: tree.read("selected-point", {}),
    };
  }
}
