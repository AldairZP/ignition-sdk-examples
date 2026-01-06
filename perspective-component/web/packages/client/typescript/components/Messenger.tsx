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


interface MessengerProps {
  points: PointData[];
}

// Default configuration in component props. Added here just as a useful reference.
export const DEFAULT_MESSAGE_CONFIG: PointData[] = [{ id: "0", x: 1, y: 2 }];
/**
 * Our Perspective component, written as a React functional component.
 */
export const MessengerComponent = (props: ComponentProps<MessengerProps>) => {
  console.log(props.props)
  return <Plane points={props.props.points}/>;
};

// This is the actual thing that gets registered with the component registry.
export class MessengerComponentMeta implements ComponentMeta {
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
      points: tree.read("points"),
    };
  }
}
