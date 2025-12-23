/*:
 * @target MZ
 * @plugindesc Force parallax off on map load unless <KeepParallax> in map notes.
 */
(() => {
  const hasTag = map => (map && map.note || "").includes("<KeepParallax>");
  const _Game_Map_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function(mapId) {
    _Game_Map_setup.call(this, mapId);
    const data = $dataMap;
    if (!hasTag(data)) {
      // Kill any parallax this map tried to load
      this._parallaxName = "";
      this._parallaxZero = false;
      this._parallaxLoopX = false;
      this._parallaxLoopY = false;
      this._parallaxSx = 0;
      this._parallaxSy = 0;
      this._parallaxX = 0;
      this._parallaxY = 0;
      this._needsParallaxReload = true;
    }
  };
})();
