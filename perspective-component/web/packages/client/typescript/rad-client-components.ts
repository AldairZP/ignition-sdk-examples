import {ComponentMeta, ComponentRegistry} from '@inductiveautomation/perspective-client';
import { MessengerComponent, MessengerComponentMeta } from './components/Messenger';

// export so the components are referencable, e.g. `RadComponents['Image']
export { MessengerComponent};

// as new components are implemented, import them, and add their meta to this array
const components: Array<ComponentMeta> = [
    new MessengerComponentMeta(),
];

// iterate through our components, registering each one with the registry.  Don't forget to register on the Java side too!
components.forEach((c: ComponentMeta) => ComponentRegistry.register(c) );
