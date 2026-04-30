/*:
 * @target MZ
 * @plugindesc Doors - Default keybinds (E = OK, PageUp/PageDown on their keys)
 * @author Overhill Games
 * @help
 * Put this BELOW VisuStella Core Engine + Options Core if using.
 * Defines shipped defaults. Players can still rebind if enabled.
 * Sets E as default "ok" to coincide with WASD enabled in Core Engine
 * Sets PageUp and PageDown to default in Options Core for PageUp and PageDown
 */

(() => {
  const KEY = {
    E: 69,
    PAGEUP: 33,
    PAGEDOWN: 34
  };

  const _Scene_Boot_start = Scene_Boot.prototype.start;
  Scene_Boot.prototype.start = function() {
    _Scene_Boot_start.call(this);

    // Set shipped defaults:
    Input.keyMapper[KEY.E] = "ok";

    // If you still want pageup/pagedown to exist, map them to the actual keys:
    Input.keyMapper[KEY.PAGEUP] = "pageup";
    Input.keyMapper[KEY.PAGEDOWN] = "pagedown";
  };
})();
