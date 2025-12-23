/*:
 * @target MZ
 * @plugindesc Preload main/number fonts so other plugins (Synrec) can use them by family name.
 */
(() => {
  const _start = Scene_Boot.prototype.start;
  Scene_Boot.prototype.start = function() {
    const adv = $dataSystem.advanced;
    // Preload exactly the names MZ will use as families.
    if (adv?.fontFilename)  FontManager.load(adv.fontFilename);       // e.g., "cormo.woff"
    if (adv?.numberFontFilename) FontManager.load(adv.numberFontFilename);
    _start.call(this);
  };
})();
