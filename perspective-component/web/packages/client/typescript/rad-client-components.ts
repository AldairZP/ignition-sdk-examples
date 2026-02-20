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
    // ApexChartsComponentMeta,
    // ChartJsComponentMeta,
} from "./components";

const components: Array<ComponentMeta> = [
    new MessengerComponentMeta,
    new ToastifyComponentMeta,
    new ToastSileoComponentMeta,
    // new ApexChartsComponentMeta,
    // new ChartJsComponentMeta,
];

components.forEach((component: ComponentMeta) => ComponentRegistry.register(component));
