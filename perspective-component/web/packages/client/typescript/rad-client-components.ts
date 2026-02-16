import {
    ComponentMeta,
    ComponentRegistry,
} from "@inductiveautomation/perspective-client";

import "./css/main.css";

export * from "./components";

import { MessengerComponentMeta, ToastifyComponentMeta } from "./components";

const components: Array<ComponentMeta> = [new MessengerComponentMeta(), new ToastifyComponentMeta];

components.forEach((component: ComponentMeta) => ComponentRegistry.register(component));
