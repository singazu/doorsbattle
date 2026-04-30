/*:
 * @target MZ
 * @plugindesc Map-only zoom (world-scale) without zooming Pictures or Windows.
 * @author Overhill Games
 *
 * @command SetMapZoom
 * @text Set Map Zoom
 * @arg scale
 * @type number
 * @decimals 2
 * @min 0.10
 * @default 1.50
 *
 * @command ClearMapZoom
 * @text Clear Map Zoom
 */

(() => {
  const pluginName = "OG_MapOnlyZoom";
  let _mapOnlyZoomScale = 1.0;

  PluginManager.registerCommand(pluginName, "SetMapZoom", args => {
    _mapOnlyZoomScale = Number(args.scale || 1.0);
    if (SceneManager._scene && SceneManager._scene._spriteset) {
      SceneManager._scene._spriteset._applyMapOnlyZoom?.();
    }
  });

  PluginManager.registerCommand(pluginName, "ClearMapZoom", () => {
    _mapOnlyZoomScale = 1.0;
    if (SceneManager._scene && SceneManager._scene._spriteset) {
      SceneManager._scene._spriteset._applyMapOnlyZoom?.();
    }
  });

  const _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function() {
    _Spriteset_Map_createLowerLayer.call(this);
    this._applyMapOnlyZoom();
  };

  Spriteset_Map.prototype._applyMapOnlyZoom = function() {
    // Zoom ONLY the world: _baseSprite contains tilemap/parallax/characters.
    const s = _mapOnlyZoomScale || 1.0;
    if (this._baseSprite) {
      this._baseSprite.scale.x = s;
      this._baseSprite.scale.y = s;

      // Keep the camera centered on screen.
      const w = Graphics.width;
      const h = Graphics.height;
      this._baseSprite.x = Math.round((w - w * s) / 2);
      this._baseSprite.y = Math.round((h - h * s) / 2);
    }

    // Explicitly ensure Pictures are NOT scaled (HUD stays 1:1).
    if (this._pictureContainer) {
      this._pictureContainer.scale.x = 1;
      this._pictureContainer.scale.y = 1;
      this._pictureContainer.x = 0;
      this._pictureContainer.y = 0;
    }
  };

  // Safety: whenever a new map scene boots, reset scale to 1 unless you reapply.
  const _Scene_Map_start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function() {
    _Scene_Map_start.call(this);
    if (this._spriteset) this._spriteset._applyMapOnlyZoom();
  };
})();
