var PixelLayer = (function() {
    
    var React = require("react");
    
    var CanvasStore = require("../Stores/CanvasStore.js");
    var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
    var constants = require("../Constants.js");
    
    var Pixel = require("./Pixel.jsx");
    
    // Gets the up to date state of the current PixelLayer component
    function getState() {
        return {
            canvasWidth: CanvasStore.getWidth(),
            canvasHeight: CanvasStore.getHeight()
        };
    }
    
    var PixelLayer = React.createClass({
        getInitialState() {
            return getState();
        },
        componentDidMount() {
            CanvasStore.onDimensionChange({
                callback: this.handleChange
            });
        },
        componentWillUnmount() {
            CanvasStore.offDimensionChange({
                callback: this.handleChange
            });
        },
        render() {
            let children = [];
            let w = this.state.canvasWidth, h = this.state.canvasHeight;
            
            // Add one Pixel component for every pixel on this layer to the
            // array of children to render
            let pxSize = this.props.pxSize / Math.min(w, h);
            for (let x = 0; x < w; x++) {
                for (let y = 0; y < h; y++) {
                    children.push(<Pixel canvasX={x} canvasY={y} pxSize={pxSize}
                        layerName={this.trueLayerName()} key={x + w * y}
                        ref={`pixel-${x}-${y}`}/>);
                }
            }
            
            return <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            }}>{children}</div>
        },
        handleChange() {
            this.setState(getState());
        },
        trueLayerName() {
            return CanvasStore.getTrueLayerName(this.props.layerName);            
        }
    });
    
    module.exports = PixelLayer;
    return PixelLayer;
    
})();
