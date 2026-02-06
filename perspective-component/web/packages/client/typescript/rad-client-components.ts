import {
    ComponentMeta,
    ComponentRegistry,
} from "@inductiveautomation/perspective-client";

import "./css/main.css";

// Re-export all view components + metas so other TS/TSX files can do:
//   import { MessengerComponent } from "./components";
export * from "./components";

import { MessengerComponentMeta } from "./components";

const components: Array<ComponentMeta> = [new MessengerComponentMeta()];

components.forEach((component: ComponentMeta) => ComponentRegistry.register(component));
