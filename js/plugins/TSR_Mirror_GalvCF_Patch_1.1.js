/*:
 * @target MZ
 * @plugindesc TSR_Mirror × Galv_CharacterFrames compatibility: mirrors use correct frame count and inverted facing. v1.1
 * @author OverhillGames
 * @help
 * Load order (Plugin Manager):
 *   1) GALV_CharacterFramesMZ
 *   2) TSR_Mirror
 *   3) TSR_Mirror_GalvCF_Patch (this file)
 *
 * Fixes:
 * - Uses Galv's frame count (e.g., 4) so reflections don't "bounce".
 * - Inverts facing so mirror shows left↔right and up↔down correctly (incl. 8-dir).
 *
 * Terms: Free for all
 */
(() => {
  "use strict";

  const whenReady = function(fn) {
    if (typeof Sprite !== "undefined") fn();
    else {
      const _Scene_Boot_start = Scene_Boot.prototype.start;
      Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.call(this);
        fn();
      };
    }
  };

  whenReady(() => {
    const exist = (cls) => typeof cls !== "undefined";

    const framesOf = (spr) => {
      const ch = spr && spr._character;
      if (!ch) return 3;
      try {
        if (typeof ch.cframes === "function") return ch.cframes();
        if (typeof ch._cframes === "number") return ch._cframes;
      } catch (_) {}
      return 3;
    };

    function applyGalvFrameRect(self, flipDir = false) {
      if (!self || !self.bitmap || !self.bitmap.isReady() || !self._character) return;

      const f = Math.max(1, framesOf(self));
      const patternH = self._patternH || 4;       // TSR uses 4 (or 8/10) rows
      const cols = self._big ? f : f * 4;

      const pw = self.bitmap.width / cols;
      const ph = self.bitmap.height / patternH;

      const n = self._characterIndex || 0;
      const baseX = self._big ? 0 : (n % 4) * f;
      const rowChunk = (patternH === 10) ? 8 : 4; // index rows per sheet block
      const baseY = self._big ? 0 : Math.floor(n / 4) * rowChunk;

      let dir = (typeof self._character.direction === "function") ? self._character.direction() : 2;
      if (self._8dir && typeof self._character.diagonalDir === "function") {
        dir = self._character.diagonalDir() || dir;
      }

      if (flipDir) {
        switch (dir) {
          case 2: dir = 8; break;
          case 8: dir = 2; break;
          case 4: dir = 6; break;
          case 6: dir = 4; break;
          case 1: dir = 3; break; // down-left → down-right
          case 3: dir = 1; break; // down-right → down-left
          case 7: dir = 9; break; // up-left → up-right
          case 9: dir = 7; break; // up-right → up-left
        }
      }

      const row = !self._8dir ? (dir - 2) / 2 : (dir > 4 ? dir - 2 : dir - 1);
      const pat = (typeof self._character.pattern === "function") ? self._character.pattern() : 0;

      const sx = (baseX + pat) * pw;
      const sy = (baseY + row) * ph;
      self.setFrame(sx, sy, pw, ph);
    }

    // ---- Sprite_Reflect (floor mirrors) ----
    if (exist(window.Sprite_Reflect)) {
      const _SR_updateCharacterFrame = Sprite_Reflect.prototype.updateCharacterFrame;
      Sprite_Reflect.prototype.updateCharacterFrame = function() {
        _SR_updateCharacterFrame.call(this);
        applyGalvFrameRect(this, true); // invert facing
      };

      if (typeof Sprite_Reflect.prototype.setupReflect === "function") {
        const _SR_setupReflect = Sprite_Reflect.prototype.setupReflect;
        Sprite_Reflect.prototype.setupReflect = function(parent, character) {
          _SR_setupReflect.call(this, parent, character);
          const f = Math.max(1, framesOf(this));
          this._patternW = this._big ? f : f * 4;
        };
      }
    }

    // ---- Sprite_Mirror (wall/column mirrors) ----
    if (exist(window.Sprite_Mirror)) {
      const _SM_updateCharacterFrame = Sprite_Mirror.prototype.updateCharacterFrame;
      Sprite_Mirror.prototype.updateCharacterFrame = function() {
        _SM_updateCharacterFrame.call(this);
        applyGalvFrameRect(this, true); // invert facing
      };

      if (typeof Sprite_Mirror.prototype.setupMirror === "function") {
        const _SM_setupMirror = Sprite_Mirror.prototype.setupMirror;
        Sprite_Mirror.prototype.setupMirror = function(parent, character) {
          _SM_setupMirror.call(this, parent, character);
          const f = Math.max(1, framesOf(this));
          this._patternW = this._big ? f : f * 4;
        };
      }
    }
  });
})();
