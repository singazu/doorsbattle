/*:
 * @target MZ
 * @plugindesc Guard TSR_Mirror calls while Events Move Core is spawning events
 * @help No parameters.
 */
(() => {
  // Guard TSR_Mirror’s tag check until event data exists
  const _chk = Game_Event.prototype.checkMirrorEventTags;
  if (_chk) {
    Game_Event.prototype.checkMirrorEventTags = function() {
      const ev = this.event && this.event();
      if (!ev || !ev.pages) return;   // skip until ready
      _chk.call(this);
    };
  }

  // Extra safety: make page() tolerant if hit too early
  const _page = Game_Event.prototype.page;
  Game_Event.prototype.page = function() {
    const ev = this.event && this.event();
    if (!ev || !ev.pages) return null;
    return _page.call(this);
  };
})();
