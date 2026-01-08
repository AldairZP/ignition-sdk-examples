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
}

// Default configuration in component props. Added here just as a useful reference.
// export const DEFAULT_MESSAGE_CONFIG: PointData[] = [{ id: "0", x: 1, y: 2 }];
export const DEFAULT_MESSAGE_CONFIG: PointData[] = [];
/**
 * Our Perspective component, written as a React functional component.
 */
const onPointsChange = (
  props: ComponentProps<MessengerProps>,
  newPoints: PointData[]
) => {
  props.store.props.write("points", newPoints);
};

export const MessengerComponent = (props: ComponentProps<MessengerProps>) => {
  // console.log(props.props.points);
  // const messageProps = JSON.parse(props.props.points);
  console.log(props.props);
  //  {...this.props.emit({ classes: ["messenger-component"] })}
  return (
    <div {...props.emit({ classes: ["messenger-component"] })}>
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
      />
    </div>
  );
};

// This is the actual thing that gets registered with the component registry.
export class MessengerComponentMeta implements ComponentMeta {
  isContainer = true;
  isDeepSelectable = true;
  focusRootOnly = true;

  getComponentType(): string {
    return COMPONENT_TYPE;
  }

  getDefaultSize(): SizeObject {
    return {
      width: 120,
      height: 90,
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
    };
  }
}
