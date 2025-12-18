/**
 * Messenger component (no ComponentStoreDelegate).
 *
 * Demonstrates:
 * - Reading component props from the PropertyTree (via getPropsReducer)
 * - Writing a prop at runtime using `this.props.store.props.write(...)`
 * - Optionally caching a prop in React state while keeping it synced
 */

import * as React from "react";
import {
  ComponentMeta,
  ComponentProps,
  makeLogger,
  PComponent,
  PropertyTree,
  SizeObject,
} from "@inductiveautomation/perspective-client";

// The 'key' or 'id' for this component type. Component must be registered with this EXACT key in the Java side as well
// as on the client side.
export const COMPONENT_TYPE = "rad.display.messenger";

/**
 * Name of the message config prop defined in the json schema defined in common/src/main/resources/messenger.props.json
 */
export const MESSAGE_CONFIG_PROP = "messageConfig";

interface MessagePropConfig {
  [key: string]: string;
}

interface MessengerProps {
  messageConfig: MessagePropConfig;
  clicked: boolean;
  clicks: number;
}

// Default configuration in component props. Added here just as a useful reference.
export const DEFAULT_MESSAGE_CONFIG: MessagePropConfig = {
  "0": "None",
  "1": "Messages!",
  "5": "Lots of Messages!",
  "10": "Literally ten+ messages!",
  "25": "Carpal Tunnel Warning!",
};

const logger = makeLogger("radcomponents.Messenger");

/**
 * Our Perspective component, written as a React functional component.
 */
export const MessengerComponent = (props: ComponentProps<MessengerProps>) => {
  const clicked = props.props.clicked;
  const clicks = props.props.clicks;

  const toggleClicked = React.useCallback((): void => {
    const nextClicked = !clicked;
    props.store.props.write("clicked", nextClicked);
    logger.info(() => `Toggled 'clicked' -> ${nextClicked}`);

    props.store.props.write("clicks", props.props.clicks + 1);
  }, [clicked, props.store]);

  const messageText = React.useMemo((): string => {
    // Get the correct message based on our local count (0/1).
    let message = "";

    for (const [_, [key, value]] of Object.entries(
      props.props.messageConfig
    ).entries()) {
      if (parseInt(key) <= props.props.clicks) {
        message = value;
      }
    }
    return message as string;
  }, [props.props.messageConfig, clicked]);

  const buttonText: string = clicked ? "Set False" : "Set True";

  return (
    <div {...props.emit({ classes: ["messenger-component"] })}>
      <h3 className="counter">{clicks}</h3>
      <span className="message">{messageText}</span>
      <button className="messenger-button" onClick={toggleClicked}>
        {buttonText}
      </button>
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
      width: 120,
      height: 90,
    };
  }

  getViewComponent(): PComponent {
    return MessengerComponent;
  }

  getPropsReducer(tree: PropertyTree): MessengerProps {
    return {
      messageConfig: tree.read("messageConfig", DEFAULT_MESSAGE_CONFIG),
      clicked: tree.readBoolean("clicked", false),
      clicks: tree.readNumber("clicks", 0),
    };
  }
}
