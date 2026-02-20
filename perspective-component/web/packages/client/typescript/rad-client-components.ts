import {
    ComponentMeta,
    ComponentRegistry,
} from "@inductiveautomation/perspective-client";

import "./css/main.css";

export * from "./components";

import {
    MessengerComponentMeta,
    ToastifyComponentMeta,
    ToastSileoComponentMeta,
} from "./components";

const components: Array<ComponentMeta> = [
    new MessengerComponentMeta,
    new ToastifyComponentMeta,
    new ToastSileoComponentMeta,
];

components.forEach((component: ComponentMeta) => ComponentRegistry.register(component));
