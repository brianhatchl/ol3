goog.provide('ol.renderer.cesium.Layer');

goog.require('goog.asserts');
goog.require('ol.layer.Layer');
goog.require('ol.renderer.Layer');
goog.require('ol.renderer.cesium.ImageryProvider');
goog.require('ol.source.ImageTileSource');



/**
 * @constructor
 * @extends {ol.renderer.Layer}
 * @param {ol.renderer.cesium.Map} mapRenderer Map renderer.
 * @param {ol.layer.Layer} layer Layer.
 */
ol.renderer.cesium.Layer = function(mapRenderer, layer) {
  goog.base(this, mapRenderer, layer);

  /**
   * @private
   * @type {Cesium.ImageryLayer}
   */
  this.imageryLayer_ = null;

  var source = layer.getSource();
  if (source instanceof ol.source.ImageTileSource) {
    var imageryProvider = new ol.renderer.cesium.ImageryProvider(source);
    this.imageryLayer_ = new Cesium.ImageryLayer(imageryProvider);
  } else {
    goog.asserts.assert(false);
  }
};
goog.inherits(ol.renderer.cesium.Layer, ol.renderer.Layer);


/**
 * @return {Cesium.ImageryLayer} ImageryLayer.
 */
ol.renderer.cesium.Layer.prototype.getImageryLayer = function() {
  return this.imageryLayer_;
};


/**
 * @inheritDoc
 */
ol.renderer.cesium.Layer.prototype.handleLayerBrightnessChange = function() {
  this.imageryLayer_.brightness = this.getLayer().getBrightness();
  this.renderIfReadyAndVisible();
};


/**
 * @inheritDoc
 */
ol.renderer.cesium.Layer.prototype.handleLayerContrastChange = function() {
  this.imageryLayer_.contrast = this.getLayer().getContrast();
  this.renderIfReadyAndVisible();
};


/**
 * @inheritDoc
 */
ol.renderer.cesium.Layer.prototype.handleLayerHueChange = function() {
  this.imageryLayer_.hue = this.getLayer().getHue();
  this.renderIfReadyAndVisible();
};


/**
 * @inheritDoc
 */
ol.renderer.cesium.Layer.prototype.handleLayerOpacityChange = function() {
  this.imageryLayer_.alpha = this.getLayer().getOpacity();
  this.renderIfReadyAndVisible();
};


/**
 * @inheritDoc
 */
ol.renderer.cesium.Layer.prototype.handleLayerSaturationChange = function() {
  this.imageryLayer_.saturation = this.getLayer().getSaturation();
  this.renderIfReadyAndVisible();
};


/**
 * @inheritDoc
 */
ol.renderer.cesium.Layer.prototype.handleLayerVisibleChange = function() {
  var layer = this.getLayer();
  this.imageryLayer_.show = layer.getVisible();
  if (layer.isReady()) {
    this.getMap().render();
  }
};


/**
 * @inheritDoc
 */
ol.renderer.cesium.Layer.prototype.renderFrame = goog.nullFunction;