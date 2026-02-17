(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("PerspectiveClient"), require("React"), require("mobxReact"));
	else if(typeof define === 'function' && define.amd)
		define("BijcZoomPan", ["PerspectiveClient", "React", "mobxReact"], factory);
	else if(typeof exports === 'object')
		exports["BijcZoomPan"] = factory(require("PerspectiveClient"), require("React"), require("mobxReact"));
	else
		root["BijcZoomPan"] = factory(root["PerspectiveClient"], root["React"], root["mobxReact"]);
})(self, (__WEBPACK_EXTERNAL_MODULE__inductiveautomation_perspective_client__, __WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_mobx_react__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/bind-decorator/index.js":
/*!**************************************************!*\
  !*** ../../node_modules/bind-decorator/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var constants;
(function (constants) {
    constants.typeOfFunction = 'function';
    constants.boolTrue = true;
})(constants || (constants = {}));
function bind(target, propertyKey, descriptor) {
    if (!descriptor || (typeof descriptor.value !== constants.typeOfFunction)) {
        throw new TypeError("Only methods can be decorated with @bind. <" + propertyKey + "> is not a method!");
    }
    return {
        configurable: constants.boolTrue,
        get: function () {
            var bound = descriptor.value.bind(this);
            // Credits to https://github.com/andreypopp/autobind-decorator for memoizing the result of bind against a symbol on the instance.
            Object.defineProperty(this, propertyKey, {
                value: bound,
                configurable: constants.boolTrue,
                writable: constants.boolTrue
            });
            return bound;
        }
    };
}
exports.bind = bind;
exports["default"] = bind;


/***/ }),

/***/ "./scss/main.scss":
/*!************************!*\
  !*** ./scss/main.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./typescript/components/BijcZoomPan.tsx":
/*!***********************************************!*\
  !*** ./typescript/components/BijcZoomPan.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var BijcZoomPan_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BijcZoomPanGatewayDelegate = exports.BijcZoomPanMeta = exports.BijcZoomPan = exports.COMPONENT_TYPE = void 0;
const React = __webpack_require__(/*! react */ "react");
const perspective_client_1 = __webpack_require__(/*! @inductiveautomation/perspective-client */ "@inductiveautomation/perspective-client");
const mobx_react_1 = __webpack_require__(/*! mobx-react */ "mobx-react");
const bind_decorator_1 = __webpack_require__(/*! bind-decorator */ "../../node_modules/bind-decorator/index.js");
const Queue_1 = __webpack_require__(/*! ./Queue */ "./typescript/components/Queue.tsx");
const uuid_1 = __webpack_require__(/*! uuid */ "../../node_modules/uuid/index.js");
const ToolboxZP_1 = __webpack_require__(/*! ./ToolboxZP */ "./typescript/components/ToolboxZP.tsx");
// the 'key' or 'id' for this component type.  Component must be registered with this EXACT key in the Java side as well
// as on the client side.  In the client, this is done in the index file where we import and register through the
// ComponentRegistry provided by the perspective-client API.
exports.COMPONENT_TYPE = "bijc.container.zoompan";
const logger = perspective_client_1.makeLogger(exports.COMPONENT_TYPE);
var MessageEvents;
(function (MessageEvents) {
    MessageEvents["MESSAGE_RESPONSE_EVENT"] = "bijc-zoompan-response-event";
    MessageEvents["MESSAGE_REQUEST_EVENT"] = "bijc-zoompan-request-event";
    MessageEvents["MESSAGE_LICENSE_RESPONSE_EVENT"] = "bijc-zoompan-license-response-event";
    MessageEvents["MESSAGE_LICENSE_REQUEST_EVENT"] = "bijc-zoompan-license-request-event";
})(MessageEvents || (MessageEvents = {}));
let BijcZoomPan = BijcZoomPan_1 = class BijcZoomPan extends perspective_client_1.Component {
    constructor(props) {
        super(props);
        this.innerRef = React.createRef();
        this.debugRef = React.createRef();
        this.preventDefault = (e) => e.preventDefault();
        this.handleWindowResize = () => {
            this.props.componentEvents.fireComponentEvent("onWindowResize", { width: window.innerWidth, height: window.innerHeight });
        };
        this.handleMouseStart = (e) => {
            // e.preventDefault();
            if (!this.props.props.config.allowPan) {
                return;
            }
            this.lastCursor = { x: e.pageX, y: e.pageY };
            if (this.props.props.config.inDebugMode) {
                console.log("mouse down on component");
                this.state.debugQueue.enqueue("mouse down");
            }
        };
        this.handleMouseMove = (e) => {
            if (!this.props.props.config.allowPan || !this.lastCursor) {
                return;
            }
            const [posX, posY] = [e.pageX, e.pageY];
            const shiftX = posX - this.lastCursor.x;
            const shiftY = posY - this.lastCursor.y;
            this.move(shiftX, shiftY);
            this.lastCursor = { x: posX, y: posY };
            this.lastShift = { x: shiftX, y: shiftY };
            if (this.props.props.config.inDebugMode) {
                this.state.debugQueue.enqueue("mouse move");
            }
        };
        this.handleMouseStop = (e) => {
            this.lastCursor = null;
            this.setState({ cursor: 'auto' });
            if (this.props.props.config.inDebugMode) {
                console.log("mouse up on component");
                this.state.debugQueue.enqueue("mouse up");
            }
        };
        this.handleMouseWheel = (e) => {
            // e.preventDefault();
            if (!this.props.props.config.allowZoom) {
                return;
            }
            const { minScale, maxScale, scrollVelocity } = this.props.props;
            let { scale, posX, posY } = this.state;
            // Use the scroll event delta to determine the zoom velocity
            const velocity = (-e.deltaY * scrollVelocity) / 100;
            // Set the new zoom level
            scale = Math.max(Math.min(scale + velocity, maxScale), minScale);
            if (scale !== this.state.scale) {
                [posX, posY] = this.getNewPosition(e.pageX, e.pageY, scale);
                this.props.componentEvents.fireComponentEvent("onPositionChanged", { newX: posX, newY: posY });
                this.props.props.writeCurrentPosition(posX, posY);
                this.props.componentEvents.fireComponentEvent("onScaleChanged", { newScale: scale });
                this.props.props.writeCurrentScale(scale);
            }
            this.setState({ scale: scale, posX: posX, posY: posY, transitionDuration: "0.05s", timingFunction: "ease-out" });
            if (this.props.props.config.inDebugMode) {
                this.state.debugQueue.enqueue("mouse wheel");
            }
        };
        this.getNewPosition = (x, y, scale) => {
            const [prevScale, prevPosX, prevPosY] = [this.state.scale, this.state.posX, this.state.posY];
            if (!this.innerRef.current) {
                return [prevPosX, prevPosY];
            }
            const rect = this.innerRef.current.getBoundingClientRect();
            // Retrieve rectangle dimensions and mouse position
            const [centerX, centerY] = [rect.width / 2, rect.height / 2];
            const [relativeX, relativeY] = [x - rect.left - window.pageXOffset, y - rect.top - window.pageYOffset];
            // If we are zooming down, we must try to center to mouse position
            const [absX, absY] = [(centerX - relativeX) / prevScale, (centerY - relativeY) / prevScale];
            const ratio = scale - prevScale;
            return [prevPosX + absX * ratio, prevPosY + absY * ratio];
        };
        this.handleTouchStart = (e) => {
            const { allowTouchEvents, allowPan } = this.props.props.config;
            // const minZoom = this.props.props.minZoom;
            const isDoubleTapping = this.isDoubleTapping();
            const isMultiTouch = e.touches.length > 1;
            if (!allowTouchEvents) {
                e.preventDefault();
            }
            const [posX, posY] = [e.touches[0].pageX, e.touches[0].pageY];
            if (isMultiTouch) {
                this.lastTouch = { x: posX, y: posY };
                return;
            }
            if (isDoubleTapping) {
                // if (allowZoom) {
                //     if (this.state.zoom == minZoom) {
                //         this.fullZoomInOnPosition({ x: posX, y: posY });
                //     } else {
                //         this.reset();
                //     }
                //     return;
                // }
                this.props.componentEvents.fireComponentEvent("onDoubleTap", { x: posX, y: posY });
                return;
            }
            if (allowPan) {
                this.lastTouch = { x: posX, y: posY };
                if (this.props.props.config.inDebugMode) {
                    console.log("touch start on component");
                    this.state.debugQueue.enqueue("touch start");
                    this.setState({});
                }
            }
        };
        this.handleTouchMove = (e) => {
            if (this.props.props.config.inDebugMode) {
                console.log("touch move on component");
                this.state.debugQueue.enqueue("touch move");
                this.setState({});
            }
            if (!this.props.props.config.allowTouchEvents) {
                e.preventDefault();
            }
            if (!this.lastTouch)
                return;
            const { maxScale, minScale } = this.props.props;
            let { scale } = this.state;
            if (e.touches.length === 1) {
                const [posX, posY] = [e.touches[0].pageX, e.touches[0].pageY];
                const shiftX = posX - this.lastTouch.x;
                const shiftY = posY - this.lastTouch.y;
                if (this.props.props.config.inDebugMode) {
                    console.log({ shiftX: shiftX, shiftY: shiftY });
                }
                this.move(shiftX, shiftY);
                this.lastShift = { x: shiftX, y: shiftY };
                this.lastTouch = { x: posX, y: posY };
                this.lastTouchDistance = null;
            }
            else if (e.touches.length > 1) {
                const [pos1X, pos1Y] = [e.touches[0].pageX, e.touches[0].pageY];
                const [pos2X, pos2Y] = [e.touches[1].pageX, e.touches[1].pageY];
                const distance = Math.sqrt(Math.pow(pos2X - pos1X, 2) + Math.pow(pos2Y - pos1Y, 2));
                if (this.lastTouchDistance && distance && distance !== this.lastTouchDistance) {
                    if (this.props.props.config.allowZoom) {
                        if (this.props.props.useVelocityForTouchZoom) {
                            const { scrollVelocity: touchZoomVelocity } = this.props.props;
                            if (distance < this.lastTouchDistance) {
                                scale -= touchZoomVelocity;
                            }
                            else {
                                scale += touchZoomVelocity;
                            }
                        }
                        else {
                            scale += (distance - this.lastTouchDistance) / 100;
                        }
                        if (scale > maxScale) {
                            scale = maxScale;
                        }
                        else if (scale < minScale) {
                            scale = minScale;
                        }
                    }
                    // Change position using the center point between the two fingers
                    const [centerX, centerY] = [(pos1X + pos2X) / 2, (pos1Y + pos2Y) / 2];
                    const [posX, posY] = this.getNewPosition(centerX, centerY, scale);
                    this.props.componentEvents.fireComponentEvent("onPositionChanged", { newX: posX, newY: posY });
                    this.props.props.writeCurrentPosition(posX, posY);
                    this.props.componentEvents.fireComponentEvent("onScaleChanged", { newScale: scale });
                    this.props.props.writeCurrentScale(scale);
                    this.setState({ scale: scale, posX: posX, posY: posY, transitionDuration: "0s" });
                }
                // Save data for the next move
                this.lastTouch = { x: pos1X, y: pos1Y };
                this.lastTouchDistance = distance;
            }
        };
        this.handleTouchStop = (e) => {
            if (this.props.props.config.inDebugMode) {
                console.log("touch stop on component");
                this.state.debugQueue.enqueue("touch stop");
                this.setState({});
            }
            this.lastShift = null;
            this.lastTouch = null;
            this.lastTouchDistance = null;
        };
        this.handleToolboxHomePressed = (e) => {
            const { props } = this.props;
            this.setState({
                transitionDuration: props.config.defaultTransitionDuration,
                timingFunction: props.config.defaultTimingFunction
            });
            this.setPosition(props.dimensions.initialPosition.x, props.dimensions.initialPosition.y);
            this.setScale(props.dimensions.initialScale);
        };
        // Last cursor position
        this.lastCursor = null;
        this.lastShift = null;
        // Last touch position
        this.lastTouch = null;
        // Last touch time in milliseconds
        this.lastTouchTime = 0;
        // Last double tap time (used to limit multiple double tap) in milliseconds
        this.lastDoubleTapTime = 0;
        // Last calculated distance between two fingers in pixels
        this.lastTouchDistance = null;
        this.hasMouseDevice = window.matchMedia('(pointer: fine)').matches;
        this.state = BijcZoomPan_1.defaultState;
        this.state.debugQueue.setMaxSize(5);
    }
    updateLicense(isActivated, isTrialExpired) {
        this.setState({
            isActivated: true,
            isTrialExpired: true
        });
    }
    componentDidMount() {
        this.pollLicense();
        if (this.props.props.config.inDebugMode) {
            console.log(navigator.userAgent);
        }
        const { props, domEvents } = this.props;
        const { minScale, maxScale } = props;
        // Ensure the initial zoom isn't outside the bounds specified in the props
        const scale = Math.max(Math.min(this.props.props.dimensions.initialScale, maxScale), minScale);
        this.removeMouseStart = domEvents.addListener("onMouseDown", this.handleMouseStart);
        this.removeMouseMove = domEvents.addListener("onMouseMove", this.handleMouseMove);
        this.removeMouseUp = domEvents.addListener("onMouseUp", this.handleMouseStop);
        this.removeMouseLeave = domEvents.addListener("onMouseLeave", this.handleMouseStop);
        this.removeOnWheel = domEvents.addListener("onWheel", this.handleMouseWheel);
        this.removeTouchStart = domEvents.addListener("onTouchStart", this.handleTouchStart);
        this.removeTouchMove = domEvents.addListener("onTouchMove", this.handleTouchMove);
        this.removeTouchEnd = domEvents.addListener("onTouchEnd", this.handleTouchStop);
        this.removeTouchCancel = domEvents.addListener("onTouchCancel", this.handleTouchStop);
        window.addEventListener("resize", this.handleWindowResize);
        this.rootElementRef = this.props.store.element;
        if (this.rootElementRef) {
            this.rootElementRef.addEventListener('wheel', this.preventDefault);
        }
        this.setState({
            posX: props.dimensions.initialPosition.x,
            posY: props.dimensions.initialPosition.y,
            scale: scale,
            timingFunction: props.config.defaultTimingFunction,
            transitionDuration: props.config.defaultTransitionDuration
        });
        if (this.props.store.delegate) {
            this.props.store.delegate.init(this);
        }
        if (props.config.debug.debugQueueSize) {
            this.state.debugQueue.setMaxSize(props.config.debug.debugQueueSize);
        }
        if (props.config.fitOnMount) {
            if (props.config.fitOnMountInstantly) {
                this.fit("0s", "ease-out");
            }
            else {
                this.fit(props.config.defaultTransitionDuration, props.config.defaultTimingFunction);
            }
        }
    }
    pollLicense() {
        // return __awaiter(this, void 0, void 0, function* () {
        //     this.props.store.delegate.fireGatewayMessage(MessageEvents.MESSAGE_LICENSE_REQUEST_EVENT);
        // });
    }
    componentDidUpdate() {
        if (this.props.props.config.debug.debugQueueSize) {
            this.state.debugQueue.setMaxSize(this.props.props.config.debug.debugQueueSize);
        }
    }
    componentWillUnmount() {
        this.removeMouseStart();
        this.removeMouseUp();
        this.removeMouseMove();
        this.removeMouseLeave();
        this.removeOnWheel();
        this.removeTouchStart();
        this.removeTouchEnd();
        this.removeTouchMove();
        this.removeTouchCancel();
        if (this.rootElementRef) {
            this.rootElementRef.removeEventListener('wheel', this.preventDefault);
        }
        window.removeEventListener("resize", this.handleWindowResize);
    }
    getLimitedShift(shift, minLimit, maxLimit, minElement, maxElement) {
        if (shift > 0) {
            if (minElement > minLimit) {
                // Forbid move if we are moving to left or top while we are already out minimum boudaries
                return 0;
            }
            else if (minElement + shift > minLimit) {
                // Lower the shift if we are going out boundaries
                return minLimit - minElement;
            }
        }
        else if (shift < 0) {
            if (maxElement < maxLimit) {
                // Forbid move if we are moving to right or bottom while we are already out maximum boudaries
                return 0;
            }
            else if (maxElement + shift < maxLimit) {
                // Lower the shift if we are going out boundaries
                return maxLimit - maxElement;
            }
        }
        return shift;
    }
    move(shiftX, shiftY) {
        if (!this.props.store.element)
            return;
        let { posX, posY } = this.state;
        // const rect = this.props.store.element.getBoundingClientRect();
        posX += shiftX;
        posY += shiftY;
        this.setState({ posX: posX, posY: posY, cursor: 'move', transitionDuration: "0s", timingFunction: "ease-out" });
        this.props.componentEvents.fireComponentEvent("onPositionChanged", { newX: posX, newY: posY });
        this.props.props.writeCurrentPosition(posX, posY);
    }
    isDoubleTapping() {
        const touchTime = new Date().getTime();
        const isDoubleTap = touchTime - this.lastTouchTime < this.props.props.config.doubleTouchMaxDelay &&
            touchTime - this.lastDoubleTapTime > this.props.props.config.doubleTouchMaxDelay;
        if (isDoubleTap) {
            this.lastDoubleTapTime = touchTime;
            return true;
        }
        this.lastTouchTime = touchTime;
        return false;
    }
    fullZoomInOnPosition(pos) { }
    reset() { }
    buildLayout(compStore) {
        return () => {
            const { position } = compStore;
            let defSize;
            compStore.componentMeta.getDefaultSize && (defSize = compStore.componentMeta.getDefaultSize());
            let width, height, x = "0", y = "0";
            return position ? (x = position.read("x"),
                y = position.read("y"),
                width = position.read("width"),
                height = position.read("height")) :
                console.warn("No position definition for component: " + compStore),
                width || height || !defSize || (width = defSize.width.toString(), height = defSize.height.toString()),
                {
                    position: "absolute",
                    left: x,
                    top: y,
                    width: width,
                    height: height
                };
        };
    }
    testBoundingBox(a, b) {
        const xLeft = Math.max(a.left, b.left);
        const yTop = Math.max(a.top, b.top);
        const xRight = Math.min(a.right, b.right);
        const yBottom = Math.min(a.bottom, b.bottom);
        if (xRight < xLeft || yBottom < yTop) {
            return { percVisible: 0, percCoverage: 0 };
        }
        const intersection = (xRight - xLeft + 1) * (yBottom - yTop + 1);
        const aArea = a.width * a.height;
        const bArea = b.width * b.height;
        // const iou = intersection / (aArea + bArea - intersection);
        return {
            percVisible: Math.round(intersection / aArea * 100),
            percCoverage: Math.round(intersection / bArea * 100)
        };
    }
    checkPosValue(val, parentVal, defaultVal) {
        if (typeof val === "number") {
            return val;
        }
        if (val == null) {
            try {
                if (typeof defaultVal === "number") {
                    return defaultVal;
                }
                else {
                    // Extract first number in 0.# format in the string
                    const defNums = defaultVal.match("\d+\.?\d*");
                    if (defNums != null && defNums.length > 0) {
                        return +defNums[0];
                    }
                    else {
                        return 100;
                    }
                }
            }
            catch (e) {
                console.log(e);
                return 0;
            }
        }
        const isPerc = val.includes('%');
        if (isPerc) {
            const num = +val.replace('%', '') / 100;
            return parentVal * num;
        }
        else {
            return +val;
        }
    }
    setScale(newScale) {
        this.setState({ scale: newScale });
    }
    setPosition(x, y) {
        this.setState({ posX: x, posY: y });
    }
    fit(transitionDuration, timingFunction) {
        const { props } = this.props;
        if (props.config.inDebugMode)
            console.log("Fitting inner container to outer container");
        this.fitRect(0, 0, props.dimensions.innerWidth, props.dimensions.innerHeight, transitionDuration, timingFunction);
    }
    fitComponent(componentName, margin, transitionDuration, timingFunction) {
        if (this.props.props.config.inDebugMode)
            console.log(`Fitting component named ${componentName} to outer container`);
        if (margin == undefined) {
            margin = 0;
        }
        const children = this.props.store.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const name = child.meta.readString("name", "");
            if (componentName == name) {
                const { innerWidth, innerHeight } = this.props.props.dimensions;
                const compSize = child.componentMeta.getDefaultSize();
                const x = this.validateDimension(child.position.read("x"), innerWidth) - margin;
                const y = this.validateDimension(child.position.read("y"), innerHeight) - margin;
                const width = (child.position.read("width") ? this.validateDimension(child.position.read("width"), innerWidth) : this.validateDimension(compSize.width, innerWidth)) + margin * 2;
                const height = (child.position.read("height") ? this.validateDimension(child.position.read("height"), innerHeight) : this.validateDimension(compSize.height, innerHeight)) + margin * 2;
                this.fitRect(x, y, width, height, transitionDuration, timingFunction);
                break;
            }
        }
    }
    validateDimension(input, whValue) {
        let output = 0;
        if (typeof input == "number") {
            output = input;
        }
        else if (typeof input == "string") {
            if (input.endsWith("%")) {
                output = +input.split("%")[0];
                output = whValue * (output / 100);
            }
        }
        return output;
    }
    fitRect(x, y, width, height, transitionDuration, timingFunction) {
        const inDebugMode = this.props.props.config.inDebugMode;
        if (inDebugMode)
            console.log(`Fitting rectangle (${x}, ${y}, ${width}, ${height}) to outer container`);
        if (transitionDuration == undefined) {
            transitionDuration = this.props.props.config.defaultTransitionDuration;
        }
        if (timingFunction == undefined) {
            timingFunction = this.props.props.config.defaultTimingFunction;
        }
        const outerRect = this.props.store.element ? this.props.store.element.getBoundingClientRect() : undefined;
        const { innerWidth, innerHeight } = this.props.props.dimensions;
        // const midX = width / 2;
        // const midY = width / 2;
        if (outerRect) {
            const outerDomRect = DOMRect.fromRect({
                x: 0,
                y: 0,
                width: outerRect.width,
                height: outerRect.height
            });
            const newScale = Math.min(outerDomRect.width / width, outerDomRect.height / height);
            const basePosDiffX = outerDomRect.width - innerWidth;
            const basePosDiffY = outerDomRect.height - innerHeight;
            let posX = 0;
            let posY = 0;
            if (width == innerWidth && height == innerHeight) {
                // Just fit the inner rectanglt to the outer rectangle
                posX = (basePosDiffX) / 2;
                posY = (basePosDiffY) / 2;
            }
            else {
                const rectMidX = x + width / 2;
                const rectMidY = y + height / 2;
                posX = (innerWidth / 2 - rectMidX) * newScale + basePosDiffX / 2;
                posY = (innerHeight / 2 - rectMidY) * newScale + basePosDiffY / 2;
            }
            this.props.componentEvents.fireComponentEvent("onPositionChanged", { newX: posX, newY: posY });
            this.props.props.writeCurrentPosition(posX, posY);
            this.props.componentEvents.fireComponentEvent("onScaleChanged", { newScale: newScale });
            this.props.props.writeCurrentScale(newScale);
            if (inDebugMode) {
                console.log(`New scale: ${newScale}`);
                console.log(`New position: (${posX},${posY})`);
            }
            this.setState({
                posX: posX,
                posY: posY,
                scale: newScale,
                transitionDuration: transitionDuration,
                timingFunction: timingFunction
            });
        }
    }
    renderChild(compStore, i, parentRect) {
        const n = compStore.componentMeta.getComponentType();
        if (n == "")
            console.log("");
        const comp = compStore.getComponent();
        const layout = this.buildLayout(compStore);
        const layoutCallback = perspective_client_1.layoutCallbackCreator.forStyle(layout);
        const defaultSize = compStore.componentMeta.getDefaultSize();
        let isVisible = true;
        let percVisible = 0;
        let percCoverage = 0;
        const { scale, posX, posY } = this.state;
        const { innerWidth, innerHeight } = this.props.props.dimensions;
        const scaleWidthDiff = (innerWidth - (innerWidth * scale)) / 2;
        const scaleHeightDiff = (innerHeight - (innerHeight * scale)) / 2;
        if (parentRect) {
            const pos = layout();
            const childRect = {
                x: this.checkPosValue(pos.left, innerWidth, 0) * scale + posX + scaleWidthDiff,
                y: this.checkPosValue(pos.top, innerHeight, 0) * scale + posY + scaleHeightDiff,
                width: this.checkPosValue(pos.width, innerWidth, defaultSize.width) * scale,
                height: this.checkPosValue(pos.height, innerHeight, defaultSize.height) * scale
            };
            const childDomRect = DOMRect.fromRect(childRect);
            const parentDomRect = DOMRect.fromRect({
                x: 0,
                y: 0,
                width: parentRect.width,
                height: parentRect.height
            });
            const overlap = this.testBoundingBox(childDomRect, parentDomRect);
            percVisible = overlap.percVisible;
            percCoverage = overlap.percCoverage;
            if (percVisible <= 0)
                isVisible = false;
        }
        compStore.custom.write('isVisible', isVisible);
        compStore.custom.write('percVisible', percVisible);
        compStore.custom.write('percCoverage', percCoverage);
        const child = React.createElement(comp, { key: i, layout: layoutCallback });
        // Force draw the children even if they aren't visible if this toggle is on
        if (this.props.props.config.alwaysDrawAllChildren) {
            return child;
        }
        else {
            if (isVisible)
                return child;
            else
                return null;
        }
    }
    render() {
        const { emit, store, props } = this.props;
        if (this.state == null) {
            return (React.createElement("div", null));
        }
        const { scale, posX, posY, cursor, transitionDuration, timingFunction } = this.state;
        // Build Array of children elements
        let children = [];
        const outerRect = store.element ? store.element.getBoundingClientRect() : undefined;
        children = store.children.map((element, i) => {
            return this.renderChild(element, i, outerRect);
        });
        // Create the class array for the container
        const inDebugMode = props.config.inDebugMode;
        var showDebugQueue = false;
        if (props.config.debug.showDebugQueue) {
            showDebugQueue = props.config.debug.showDebugQueue && inDebugMode;
        }
        var showDebugBorder = false;
        if (props.config.debug.showDebugBorders) {
            showDebugBorder = props.config.debug.showDebugBorders && inDebugMode;
        }
        let containerClasses = perspective_client_1.Theming.Container.PRIMARY.toString();
        containerClasses += " bijc-zp-outer";
        if (inDebugMode) {
            containerClasses += " bijc-zp-debug-border";
        }
        // Tack conatiner classes onto the end of classes in the props
        let e = emit();
        e.className = `${e.className} overflow-hidden ${containerClasses}`;
        const innerClasses = props.innerStyle.classes;
        const innerClassSplit = innerClasses.split(" ");
        let innerClassString = "";
        innerClassSplit.forEach(cls => {
            innerClassString += " psc-" + cls;
        });
        const attr = {
            className: 'bijc-zp-inner' + innerClassString,
            style: {
                transform: `translate3d(${posX}px, ${posY}px, 0) scale(${scale})`,
                transition: `transform ${transitionDuration} ${timingFunction} `,
                cursor: cursor,
                width: props.dimensions.innerWidth,
                height: props.dimensions.innerHeight,
                boxShadow: showDebugBorder ? "inset 0px 0px 0px 2px #0652DD" : ""
            }
        };
        const debugRenderList = this.state.debugQueue.getItems().map((debugMsg) => {
            const msg_uuid = uuid_1.v4();
            return (React.createElement("div", { key: debugMsg + '_' + msg_uuid, className: 'bijc-zp-debug-event bijc-zp-debug-grey' },
                React.createElement("p", null, debugMsg)));
        });
        const debugBoxStyle = {
            height: this.state.debugQueue.getMaxSize() * 35 + 'px'
        };
        const debugBox = (React.createElement("div", { className: 'bijc-zp-debug-box', style: debugBoxStyle }, debugRenderList));
        const toolboxButtons = {
            home: { buttonType: 'home', buttonColorType: 'info', buttonToggleColorType: 'info', isVisible: true, order: 0, buttonPressed: this.handleToolboxHomePressed },
            reset: { buttonType: 'reset', buttonColorType: 'info', buttonToggleColorType: 'info', isVisible: false, order: 1 },
            fit: { buttonType: 'fit', buttonColorType: 'info', buttonToggleColorType: 'info', isVisible: false, order: 2 },
            drag: { buttonType: 'drag', buttonColorType: 'info', buttonToggleColorType: 'info', isVisible: false, order: 3 },
            scale: { buttonType: 'scale', buttonColorType: 'info', buttonToggleColorType: 'info', isVisible: false, order: 4 }
        };
        const toolbox = (React.createElement(ToolboxZP_1.ToolboxZP, { vertPosition: 'top', horiPosition: 'right', buttonWidth: '40px', toolboxPadding: '4px', buttonGap: '4px', backgroundColor: '#34495e', handleColor: '#95a5a6', handleIconColor: '#fff', successColor: '#2ecc71', successIconColor: '#fff', dangerColor: '#e74c3c', dangerIconColor: '#fff', infoColor: '#3498db', infoIconColor: '#fff', buttons: toolboxButtons }));
        const isLicensed = this.state.isActivated || !this.state.isTrialExpired;
        const unlicensedBox = (React.createElement("div", { className: 'bijc-zp-unlicensed-box' },
            React.createElement("p", { className: 'bijc-zp-unlicensed-label' }, "unlicensed")));
        const innerDiv = (React.createElement("div", Object.assign({}, attr, { ref: this.innerRef }), children));
        return (React.createElement("div", Object.assign({}, e),
            props.showToolbox ? toolbox : null,
            isLicensed ? innerDiv : unlicensedBox,
            showDebugQueue ? debugBox : null));
    }
};
BijcZoomPan.defaultState = {
    minGhostDimensions: { width: 0, height: 0 },
    scale: 1,
    posX: 0,
    posY: 0,
    cursor: 'auto',
    transitionDuration: "0.25s",
    timingFunction: "ease-out",
    debugQueue: new Queue_1.Queue(),
    isActivated: true,
    isTrialExpired: false
};
BijcZoomPan.defaultProps = {
    config: {
        allowZoom: true,
        allowPan: true,
        allowTouchEvents: true,
        doubleTouchMaxDelay: 300,
        fitOnMount: false,
        fitOnMountInstantly: false,
        defaultTransitionDuration: "0.25s",
        defaultTimingFunction: "ease-out",
        inDebugMode: false,
        debug: {
            showDebugQueue: false,
            debugQueueSize: 5,
            showDebugBorders: false
        }
    },
    dimensions: {
        innerWidth: 1000,
        innerHeight: 1000,
        initialPosition: { x: 0, y: 0 },
        initialScale: 1
    },
    minScale: 1,
    maxScale: 5,
    scrollVelocity: 0.2,
    showToolbox: false
};
BijcZoomPan = BijcZoomPan_1 = __decorate([
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], BijcZoomPan);
exports.BijcZoomPan = BijcZoomPan;
// this is the actual thing that gets registered with the component registry
class BijcZoomPanMeta {
    constructor() {
        this.isContainer = true;
    }
    getComponentType() {
        return exports.COMPONENT_TYPE;
    }
    getViewComponent() {
        return BijcZoomPan;
    }
    getDefaultSize() {
        return ({
            width: 200,
            height: 200
        });
    }
    createDelegate(component) {
        return new BijcZoomPanGatewayDelegate(component);
    }
    getPropsReducer(tree) {
        return {
            config: {
                allowZoom: tree.readBoolean("config.allowZoom", true),
                allowPan: tree.readBoolean("config.allowPan", true),
                allowTouchEvents: tree.readBoolean("config.allowTouchEvents", true),
                doubleTouchMaxDelay: tree.readNumber("config.doubleTouchMaxDelay", 300),
                fitOnMount: tree.readBoolean("config.fitOnMount", false),
                fitOnMountInstantly: tree.readBoolean("config.fitOnMountInstantly", false),
                defaultTransitionDuration: tree.readString("config.defaultTransitionDuration", "0.25s"),
                defaultTimingFunction: tree.readString("config.defaultTimingFunction", "ease-out"),
                inDebugMode: tree.readBoolean("config.inDebugMode", false),
                alwaysDrawAllChildren: tree.readBoolean("config.alwaysDrawAllChildren", false),
                debug: tree.readObject("config.debug", {
                    showDebugQueue: false,
                    debugQueueSize: 5,
                    showDebugBorders: false
                })
            },
            dimensions: {
                innerWidth: tree.readNumber("dimensions.innerWidth", 1000),
                innerHeight: tree.readNumber("dimensions.innerHeight", 1000),
                initialPosition: tree.readObject("dimensions.initialPosition", { x: 0, y: 0 }),
                initialScale: tree.readNumber("dimensions.initialScale", 1)
            },
            currentState: tree.readObject("currentState", {
                scale: 1,
                posX: 0,
                posY: 0
            }),
            minScale: tree.readNumber("minScale", 1),
            maxScale: tree.readNumber("maxScale", 5),
            scrollVelocity: tree.readNumber("scrollVelocity", 0.2),
            useVelocityForTouchZoom: tree.read("useVelocityForTouchZoom", true),
            touchZoomVelocity: tree.readNumber("touchZoomVelocity", 0.2),
            showToolbox: tree.readBoolean("showToolbox", false),
            innerStyle: tree.read("innerStyle"),
            writeCurrentScale: (d) => tree.write("currentState.scale", d),
            writeCurrentPosition: (x, y) => { tree.write("currentState.posX", x); tree.write("currentState.posY", y); },
            writeCurrentPosX: (d) => tree.write("currentState.posX", d),
            writeCurrentPosY: (d) => tree.write("currentState.posY", d)
        };
    }
}
exports.BijcZoomPanMeta = BijcZoomPanMeta;
class BijcZoomPanGatewayDelegate extends perspective_client_1.ComponentStoreDelegate {
    constructor(componentStore) {
        super(componentStore);
        this.zoomPan = null;
        // console.log(componentStore);
    }
    fireDelegateEvent(eventName, eventObject) {
        this.fireEvent(eventName, eventObject);
    }
    fireGatewayMessage(messageEvent) {
        this.fireDelegateEvent(messageEvent, {});
    }
    updateLicense(licenseObject) {
        if (this.zoomPan) {
            this.zoomPan.updateLicense(licenseObject.isActivated, licenseObject.isTrialExpired);
        }
    }
    init(zoomPan) {
        if (zoomPan) {
            this.zoomPan = zoomPan;
        }
    }
    handleEvent(eventName, eventObject) {
        logger.debug(() => `Received '${eventName}' event!`);
        if (this.zoomPan) {
            console.log(eventObject);
            const { MESSAGE_RESPONSE_EVENT, MESSAGE_REQUEST_EVENT, MESSAGE_LICENSE_RESPONSE_EVENT, MESSAGE_LICENSE_REQUEST_EVENT } = MessageEvents;
            const { functionToCall } = eventObject;
            let newScale = undefined;
            if (eventObject.newScale != undefined) {
                newScale = eventObject.newScale;
            }
            let componentName = undefined;
            if (eventObject.componentName != undefined) {
                componentName = eventObject.componentName;
            }
            let x = undefined;
            let y = undefined;
            let width = undefined;
            let height = undefined;
            let transitionDuration = undefined;
            let timingFunction = undefined;
            let componentMargin = undefined;
            if (eventObject.x != undefined) {
                x = eventObject.x;
            }
            if (eventObject.y != undefined) {
                y = eventObject.y;
            }
            if (eventObject.width != undefined) {
                width = eventObject.width;
            }
            if (eventObject.height != undefined) {
                height = eventObject.height;
            }
            if (eventObject.transitionDuration != undefined) {
                transitionDuration = eventObject.transitionDuration;
            }
            if (eventObject.timingFunction != undefined) {
                timingFunction = eventObject.timingFunction;
            }
            if (eventObject.componentMargin != undefined) {
                componentMargin = eventObject.componentMargin;
            }
            switch (eventName) {
                case MESSAGE_RESPONSE_EVENT:
                    if (functionToCall == "setScale") {
                        this.zoomPan.setScale(newScale);
                    }
                    else if (functionToCall == "setPosition") {
                        this.zoomPan.setPosition(x, y);
                    }
                    else if (functionToCall == "fit") {
                        this.zoomPan.fit(transitionDuration, timingFunction);
                    }
                    else if (functionToCall == "fitComponent") {
                        this.zoomPan.fitComponent(componentName, componentMargin, transitionDuration, timingFunction);
                    }
                    else if (functionToCall == "fitRect") {
                        this.zoomPan.fitRect(x, y, width, height, transitionDuration, timingFunction);
                    }
                    break;
                case MESSAGE_REQUEST_EVENT:
                    break;
                case MESSAGE_LICENSE_RESPONSE_EVENT:
                    this.updateLicense(eventObject);
                    break;
                case MESSAGE_LICENSE_REQUEST_EVENT:
                    break;
                default:
                    logger.warn(() => `No delegate event handler found for event: ${eventName} in BijcZoomPanGatewayDelegate`);
            }
        }
    }
}
__decorate([
    bind_decorator_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BijcZoomPan]),
    __metadata("design:returntype", void 0)
], BijcZoomPanGatewayDelegate.prototype, "init", null);
__decorate([
    bind_decorator_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BijcZoomPanGatewayDelegate.prototype, "handleEvent", null);
exports.BijcZoomPanGatewayDelegate = BijcZoomPanGatewayDelegate;


/***/ }),

/***/ "./typescript/components/Queue.tsx":
/*!*****************************************!*\
  !*** ./typescript/components/Queue.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Queue = void 0;
class Queue {
    constructor(...params) {
        this.items = [...params];
        this.maxSize = 0;
    }
    setMaxSize(maxSize) {
        this.maxSize = maxSize;
    }
    getMaxSize() {
        return this.maxSize;
    }
    enqueue(item) {
        if (this.maxSize != 0) {
            if (this.items.length >= this.maxSize) {
                this.items.shift();
            }
        }
        this.items.push(item);
    }
    dequeue() {
        return this.items.shift();
    }
    getItems() {
        return this.items;
    }
}
exports.Queue = Queue;


/***/ }),

/***/ "./typescript/components/ToolboxZP.tsx":
/*!*********************************************!*\
  !*** ./typescript/components/ToolboxZP.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ToolboxZP = void 0;
const React = __webpack_require__(/*! react */ "react");
class ToolboxZPButton extends React.Component {
    constructor(props) {
        super(props);
        this.fireToolboxButtonClick = (e) => {
            console.log("THE BUTTON WAS FUCKING CLICKED!");
            if (this.props.toolboxButtonPressed)
                this.props.toolboxButtonPressed(e);
        };
        this.state = { isToggled: false };
    }
    render() {
        const buttonAttr = {
            style: {
                borderColor: this.state.isToggled ? this.props.buttonToggleColor : this.props.buttonColor,
                borderWidth: '1px',
                borderStyle: 'solid',
                backgroundColor: this.state.isToggled ? this.props.buttonToggleColor : this.props.buttonColor,
                flexBasis: this.props.buttonWidth,
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center'
            }
        };
        return (React.createElement("div", Object.assign({}, buttonAttr, { className: 'bijc-zp-toolbox-button', onClick: this.fireToolboxButtonClick }), this.props.buttonIcon));
    }
}
class ToolboxZP extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = () => {
            this.setState({ isVisible: !this.state.isVisible });
        };
        this.getButtonSvg = (buttonType, iconColor, iconSize) => {
            if (buttonType == 'home') {
                return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", role: "img", width: iconSize, height: iconSize, preserveAspectRatio: "xMidYMid meet", viewBox: "0 0 24 24" },
                    React.createElement("path", { fill: iconColor, d: "M10.55 2.532a2.25 2.25 0 0 1 2.9 0l6.75 5.692c.507.428.8 1.057.8 1.72v9.803a1.75 1.75 0 0 1-1.75 1.75h-3.5a1.75 1.75 0 0 1-1.75-1.75v-5.5a.25.25 0 0 0-.25-.25h-3.5a.25.25 0 0 0-.25.25v5.5a1.75 1.75 0 0 1-1.75 1.75h-3.5A1.75 1.75 0 0 1 3 19.747V9.944c0-.663.293-1.292.8-1.72l6.75-5.692Zm1.933 1.147a.75.75 0 0 0-.966 0L4.767 9.37a.75.75 0 0 0-.267.573v9.803c0 .138.112.25.25.25h3.5a.25.25 0 0 0 .25-.25v-5.5c0-.967.784-1.75 1.75-1.75h3.5c.966 0 1.75.783 1.75 1.75v5.5c0 .138.112.25.25.25h3.5a.25.25 0 0 0 .25-.25V9.944a.75.75 0 0 0-.267-.573l-6.75-5.692Z" })));
            }
            else if (buttonType == 'drag') {
                return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", role: "img", width: iconSize, height: iconSize, preserveAspectRatio: "xMidYMid meet", viewBox: "0 0 24 24" },
                    React.createElement("path", { fill: iconColor, d: "M12 16.5a.75.75 0 0 1 .744.648l.007.102v2.188l.72-.718a.75.75 0 0 1 .976-.073l.084.073a.75.75 0 0 1 .072.976l-.072.084l-2 2l-.038.036l-.072.055l-.095.055l-.087.035l-.102.026l-.085.011h-.103l-.12-.018l-.068-.02l-.059-.022l-.07-.035l-.052-.032l-.031-.022a.754.754 0 0 1-.079-.069l-2-2a.75.75 0 0 1 .977-1.133l.084.073l.72.719v-2.19a.75.75 0 0 1 .648-.742L12 16.5ZM12 9a3 3 0 1 1 0 6a3 3 0 0 1 0-6Zm6.72.47a.75.75 0 0 1 .977-.073l.084.072l2 2l.036.039l.055.072l.055.095l.035.086l.026.103l.01.084v.103l-.017.12l-.02.068l-.022.059l-.035.07l-.032.052l-.028.038l-.063.072l-2 2a.75.75 0 0 1-1.133-.976l.072-.085l.719-.72H17.25a.75.75 0 0 1-.744-.647L16.501 12a.75.75 0 0 1 .648-.743l.102-.007h2.189l-.72-.72a.75.75 0 0 1-.072-.976l.072-.085Zm-14.5 0a.75.75 0 0 1 1.134.976l-.073.084l-.72.72h2.19a.75.75 0 0 1 .743.648L7.5 12a.75.75 0 0 1-.649.743l-.101.007H4.56l.72.72a.75.75 0 0 1 .073.976l-.073.084a.75.75 0 0 1-.977.073l-.084-.073l-2-2l-.09-.11l-.055-.095l-.036-.086l-.026-.103l-.011-.09v-.093l.018-.125l.02-.067l.022-.06l.035-.07l.032-.052l.023-.03a.754.754 0 0 1 .068-.08l2-2ZM12 10.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3Zm-.136-8.488l.067-.009l.087-.003l.06.004l.094.016l.068.019l.059.022l.07.036l.052.032l.038.027l.072.063l2 2a.75.75 0 0 1-.977 1.134l-.084-.073l-.72-.72v2.19a.75.75 0 0 1-.648.743l-.101.007a.75.75 0 0 1-.744-.648l-.006-.102V4.56l-.72.72a.75.75 0 0 1-.977.073L9.47 5.28a.75.75 0 0 1-.072-.976l.072-.085l2-2l.11-.09l.095-.055l.087-.035l.102-.027Z" })));
            }
            else if (buttonType == 'scale') {
                return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", role: "img", width: iconSize, height: iconSize, preserveAspectRatio: "xMidYMid meet", viewBox: "0 0 24 24" },
                    React.createElement("path", { fill: iconColor, d: "m 10,2.75 c 6.10349,-7.597e-4 9.476461,7.0800842 5.63,11.819 l 4.9,4.9 c 0.660466,0.656136 -0.22882,1.689383 -0.976,1.134 L 19.47,20.53 14.569,15.63 C 10.681105,18.784435 4.8421374,17.142325 3.16832,12.423838 1.4945025,7.7053503 4.9933858,2.7507679 10,2.75 Z m 0,1.5 c -3.1756395,0 -5.7499975,2.5743628 -5.7499975,5.75 0,3.175637 2.574358,5.75 5.7499975,5.75 3.175639,0 5.749998,-2.574363 5.749998,-5.75 0,-3.1756372 -2.574359,-5.75 -5.749998,-5.75 z", id: "path843" })));
            }
            else if (buttonType == 'fit') {
                return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", role: "img", width: iconSize, height: iconSize, preserveAspectRatio: "xMidYMid meet", viewBox: "0 0 16 16" },
                    React.createElement("path", { fill: iconColor, d: "M5.656 2.638a.5.5 0 1 0 .69.723L7.66 2.107a.5.5 0 0 1 .692.001L9.655 3.36a.5.5 0 1 0 .693-.721L9.043 1.387a1.5 1.5 0 0 0-2.075-.003L5.656 2.638ZM3.363 6.345a.5.5 0 1 0-.723-.69L1.389 6.963a1.5 1.5 0 0 0 0 2.072l1.252 1.31a.5.5 0 1 0 .723-.691l-1.252-1.31a.5.5 0 0 1 0-.69l1.251-1.31Zm2.984 6.293a.5.5 0 0 0-.691.723l1.314 1.256a1.5 1.5 0 0 0 2.078-.004l1.3-1.253a.5.5 0 1 0-.694-.72l-1.3 1.253a.5.5 0 0 1-.693.001l-1.314-1.256Zm7.015-6.985a.5.5 0 0 0-.721.693l1.257 1.31a.5.5 0 0 1 0 .693L12.64 9.653a.5.5 0 1 0 .72.694l1.257-1.304a1.5 1.5 0 0 0 .002-2.08l-1.258-1.31ZM6.5 5A1.5 1.5 0 0 0 5 6.5v3A1.5 1.5 0 0 0 6.5 11h3A1.5 1.5 0 0 0 11 9.5v-3A1.5 1.5 0 0 0 9.5 5h-3ZM6 6.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3Z" })));
            }
            else if (buttonType == 'reset') {
                return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", role: "img", width: iconSize, height: iconSize, preserveAspectRatio: "xMidYMid meet", viewBox: "0 0 24 24" },
                    React.createElement("path", { fill: iconColor, d: "M6.78 2.72a.75.75 0 0 1 0 1.06L4.56 6h8.69a7.75 7.75 0 1 1-7.75 7.75a.75.75 0 0 1 1.5 0a6.25 6.25 0 1 0 6.25-6.25H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 0Z" })));
            }
        };
        this.getButtonColor = (colorType) => {
            if (colorType == 'success') {
                return this.props.successColor;
            }
            else if (colorType == 'danger') {
                return this.props.dangerColor;
            }
            else if (colorType == 'info') {
                return this.props.infoColor;
            }
            else {
                return this.props.infoColor;
            }
        };
        this.getIconColor = (colorType) => {
            if (colorType == 'success') {
                return this.props.successIconColor;
            }
            else if (colorType == 'danger') {
                return this.props.dangerIconColor;
            }
            else if (colorType == 'info') {
                return this.props.infoIconColor;
            }
            else {
                return this.props.infoIconColor;
            }
        };
        this.state = { isVisible: false };
    }
    validateDimension(input, whValue) {
        let output = 0;
        if (typeof input == "number") {
            output = input;
        }
        else if (typeof input == "string") {
            if (input.endsWith("%") && whValue) {
                output = +input.split("%")[0];
                output = whValue * (output / 100);
            }
            if (input.endsWith("px")) {
                output = +input.split("px")[0];
            }
        }
        return output;
    }
    getVisibleButtonNum() {
        let visibleButtons = 0;
        const { buttons } = this.props;
        if (buttons.home.isVisible)
            visibleButtons++;
        if (buttons.reset.isVisible)
            visibleButtons++;
        if (buttons.fit.isVisible)
            visibleButtons++;
        if (buttons.drag.isVisible)
            visibleButtons++;
        if (buttons.scale.isVisible)
            visibleButtons++;
        return visibleButtons;
    }
    render() {
        const { buttons, horiPosition, vertPosition, buttonGap, toolboxPadding } = this.props;
        const buttonWidth = this.validateDimension(this.props.buttonWidth);
        const boxPadding = this.validateDimension(this.props.toolboxPadding);
        const boxGap = this.validateDimension(buttonGap);
        let visibleButtons = this.getVisibleButtonNum();
        const boxWidth = visibleButtons * (buttonWidth) + (visibleButtons - 1) * boxGap + boxPadding * 2;
        const boxHeight = 40;
        const homeButton = (React.createElement(ToolboxZPButton, { buttonColor: this.getButtonColor(buttons.home.buttonColorType), buttonToggleColor: this.getButtonColor(buttons.home.buttonToggleColorType), buttonIcon: this.getButtonSvg(buttons.home.buttonType, this.getIconColor(buttons.home.buttonColorType), "24px"), buttonType: buttons.home.buttonType, buttonWidth: this.props.buttonWidth, canBeToggled: false, toolboxButtonPressed: buttons.home.buttonPressed }));
        let boxTranslateX = 0;
        let boxTranslateY = 0;
        if (this.state.isVisible) {
            if (horiPosition == 'left') {
                boxTranslateX = boxWidth;
            }
            else if (horiPosition == 'center') {
                if (vertPosition == 'top') {
                    boxTranslateX = boxHeight;
                }
                else if (vertPosition == 'bottom') {
                    boxTranslateX = boxHeight * -1;
                }
            }
            else if (horiPosition == 'right') {
                boxTranslateX = boxWidth * -1;
            }
        }
        let handlePos = 'left';
        let leftPos = '0%';
        if (horiPosition == 'left') {
            leftPos = '0%';
        }
        else if (horiPosition == 'center') {
            leftPos = `calc(50% - ${boxWidth / 2}px)`;
            if (vertPosition == 'top') {
                handlePos = 'bottom';
            }
            else {
                handlePos = 'top';
            }
        }
        else if (horiPosition == 'right') {
            leftPos = '100%';
            handlePos = 'right';
        }
        if (handlePos == 'right') {
            console.log(handlePos);
        }
        let topPos = '0%';
        if (vertPosition == 'top') {
            topPos = '0%';
        }
        else if (vertPosition == 'center') {
            topPos = `calc(50% - ${boxHeight / 2}px)`;
        }
        else if (vertPosition == 'bottom') {
            topPos = '100%';
        }
        let handleWidth = '40px';
        const attr = {
            style: {
                transform: `translate3d(${boxTranslateX}px, ${boxTranslateY}px, 0)`,
                transition: `transform 0.25s ease-out `,
                position: 'absolute',
                top: topPos,
                left: `calc(${leftPos} - ${handleWidth}`,
                width: `calc(${boxWidth}px + ${handleWidth})`,
                height: boxHeight + 'px',
                backgroundColor: this.props.backgroundColor,
                boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
                display: 'flex',
                flexDirection: 'row',
                columnGap: buttonGap,
                justifyContent: 'flex-start',
                alignContent: 'stretch',
                alignItems: 'stretch',
                overflow: 'hidden'
            }
        };
        const buttonDivAttr = {
            style: {
                display: 'flex',
                flexDirection: 'row',
                columnGap: buttonGap,
                justifyContent: 'flex-start',
                alignContent: 'stretch',
                alignItems: 'stretch',
                padding: toolboxPadding
            }
        };
        const handleAttr = {
            style: {
                flexBasis: handleWidth,
                backgroundColor: this.props.handleColor,
                pointer: 'cursor',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center'
            }
        };
        const chevronRight = (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", role: "img", width: '24px', height: '24px', preserveAspectRatio: "xMidYMid meet", viewBox: "0 0 24 24" },
            React.createElement("path", { fill: this.props.handleIconColor, d: "M8.47 4.22a.75.75 0 0 0 0 1.06L15.19 12l-6.72 6.72a.75.75 0 1 0 1.06 1.06l7.25-7.25a.75.75 0 0 0 0-1.06L9.53 4.22a.75.75 0 0 0-1.06 0Z" })));
        const chevronLeft = (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", role: "img", width: "24px", height: "24px", preserveAspectRatio: "xMidYMid meet", viewBox: "0 0 24 24" },
            React.createElement("path", { fill: this.props.handleIconColor, d: "M15.53 4.22a.75.75 0 0 1 0 1.06L8.81 12l6.72 6.72a.75.75 0 1 1-1.06 1.06l-7.25-7.25a.75.75 0 0 1 0-1.06l7.25-7.25a.75.75 0 0 1 1.06 0Z" })));
        return (React.createElement("div", Object.assign({}, attr),
            React.createElement("div", Object.assign({}, handleAttr, { onClick: this.handleClick }), this.state.isVisible ? chevronRight : chevronLeft),
            React.createElement("div", Object.assign({}, buttonDivAttr), buttons.home.isVisible ? homeButton : null)));
    }
}
exports.ToolboxZP = ToolboxZP;


/***/ }),

/***/ "../../node_modules/uuid/index.js":
/*!****************************************!*\
  !*** ../../node_modules/uuid/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var v1 = __webpack_require__(/*! ./v1 */ "../../node_modules/uuid/v1.js");
var v4 = __webpack_require__(/*! ./v4 */ "../../node_modules/uuid/v4.js");

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),

/***/ "../../node_modules/uuid/lib/bytesToUuid.js":
/*!**************************************************!*\
  !*** ../../node_modules/uuid/lib/bytesToUuid.js ***!
  \**************************************************/
/***/ ((module) => {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]]
  ]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "../../node_modules/uuid/lib/rng-browser.js":
/*!**************************************************!*\
  !*** ../../node_modules/uuid/lib/rng-browser.js ***!
  \**************************************************/
/***/ ((module) => {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ "../../node_modules/uuid/v1.js":
/*!*************************************!*\
  !*** ../../node_modules/uuid/v1.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var rng = __webpack_require__(/*! ./lib/rng */ "../../node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "../../node_modules/uuid/lib/bytesToUuid.js");

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),

/***/ "../../node_modules/uuid/v4.js":
/*!*************************************!*\
  !*** ../../node_modules/uuid/v4.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var rng = __webpack_require__(/*! ./lib/rng */ "../../node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "../../node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "@inductiveautomation/perspective-client":
/*!************************************!*\
  !*** external "PerspectiveClient" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__inductiveautomation_perspective_client__;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ }),

/***/ "mobx-react":
/*!****************************!*\
  !*** external "mobxReact" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_mobx_react__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
/*!*******************************************!*\
  !*** ./typescript/bijc-zoompan-client.ts ***!
  \*******************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BijcZoomPanMeta = exports.BijcZoomPan = void 0;
const perspective_client_1 = __webpack_require__(/*! @inductiveautomation/perspective-client */ "@inductiveautomation/perspective-client");
const BijcZoomPan_1 = __webpack_require__(/*! ./components/BijcZoomPan */ "./typescript/components/BijcZoomPan.tsx");
// export so the components are referencable, e.g. `BijcComponents['Image']
var BijcZoomPan_2 = __webpack_require__(/*! ./components/BijcZoomPan */ "./typescript/components/BijcZoomPan.tsx");
Object.defineProperty(exports, "BijcZoomPan", ({ enumerable: true, get: function () { return BijcZoomPan_2.BijcZoomPan; } }));
Object.defineProperty(exports, "BijcZoomPanMeta", ({ enumerable: true, get: function () { return BijcZoomPan_2.BijcZoomPanMeta; } }));
__webpack_require__(/*! ../scss/main */ "./scss/main.scss");
// as new components are implemented, import them, and add their meta to this array
const components = [
    new BijcZoomPan_1.BijcZoomPanMeta()
];
// iterate through our components, registering each one with the registry.  Don't forget to register on the Java side too!
components.forEach((c) => perspective_client_1.ComponentRegistry.register(c));

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=BijcZoomPan.js.map