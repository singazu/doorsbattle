/*:
 * @target MZ
 * @plugindesc v2.4 Name Input riddle text from variable + spacing (VisuStella-friendly).
 * @author Overhill Games
 *
 * @param HelpText
 * @text Fallback Riddle Text
 * @type string
 * @default
 * @desc Optional. If blank, no riddle is shown unless the variable contains text.
 *
 * @param RiddleVariableId
 * @text Riddle Text Variable ID
 * @type variable
 * @default 91
 * @desc Game variable that stores the current riddle text.
 *
 * @param ExtraCharSpacing
 * @text Extra character spacing (pixels)
 * @type number
 * @decimals 0
 * @min 0
 * @default 4
 *
 * @param ClearVarOnOk
 * @text Clear riddle var on OK
 * @type boolean
 * @on Yes
 * @off No
 * @default true
 * @desc Clears the riddle variable when the player confirms the name.
 *
 * @help
 * OG_CustomNameInputHelp.js
 *
 * What this does:
 *  1) ONLY while Scene_Name is active:
 *       - When any window draws text that contains
 *         "Type in this character's name", that text is replaced by
 *         your riddle text from a variable (can be multiple lines).
 *       - It calculates how many extra lines the riddle uses compared
 *         to the original single line and stores an offset on that window.
 *       - All subsequent drawTextEx calls on that window during the scene
 *         have their Y shifted down by that offset, so "Press ENTER...",
 *         "-or-", "Press arrow keys/TAB...", etc. move below the riddle
 *         instead of overlapping it.
 *  2) Supports line breaks in the riddle:
 *       - In Script commands you can use either "\n" (real newline)
 *         OR "\\n" (RPG-style escape) and it will render as a new line.
 *  3) Increases character width a bit and recenters the name input text.
 *  4) Optionally clears the riddle variable after a successful name entry.
 *
 * Usage:
 *  - Put this plugin UNDER VisuMZ Core / MessageCore / keyboard plugins.
 *  - Before "Name Input Processing", run a Script like:
 *
 *      $gameVariables.setValue(91,
 *        "Handed down from father to son,\\n" +
 *        "Shared between brothers.\\n" +
 *        "Means much to you,\\n" +
 *        "But used more by others."
 *      );
 *
 *  - After "Name Input Processing", you can clear it manually:
 *      $gameVariables.setValue(91, "");
 *    Or enable "Clear riddle var on OK" to do it automatically.
 *
 * Notes:
 *  - If the variable is 0 (default), empty, null, or undefined, it is treated as blank.
 *  - If both the variable and fallback are blank, the default prompt text will remain.
 */

(() => {
  const pluginName = "OG_CustomNameInputHelp";
  const params     = PluginManager.parameters(pluginName);

  const fallbackRiddleRaw = String(params["HelpText"] || "");
  const riddleVarId       = Number(params["RiddleVariableId"] || 0);
  const extraSpace        = Number(params["ExtraCharSpacing"] || 0);
  const clearVarOnOk      = String(params["ClearVarOnOk"] || "true") === "true";

  function normalizeNewlines(text) {
    // Turn \\n or \\N (typed in a Script as "\\n") into real newline chars.
    // If text already contains real newlines (\n), they remain as-is.
    return String(text).replace(/\\[nN]/g, "\n");
  }

  function currentRiddleText() {
    let txt = "";
    if (riddleVarId > 0 && $gameVariables) {
      const v = $gameVariables.value(riddleVarId);
      // Treat default 0 as "no riddle"
      if (v !== 0 && v !== "" && v !== null && v !== undefined) {
        txt = String(v);
      }
    }

    txt = normalizeNewlines(txt).trimEnd();

    // Optional fallback only if user set one.
    if (!txt && fallbackRiddleRaw) {
      txt = normalizeNewlines(fallbackRiddleRaw).trimEnd();
    }

    return txt;
  }

  // 1) Replace the "Type in this character's name" string
  //    and push later help lines down for that same window
  const _Window_Base_drawTextEx = Window_Base.prototype.drawTextEx;
  Window_Base.prototype.drawTextEx = function(text, x, y, width) {
    if (SceneManager._scene instanceof Scene_Name && typeof text === "string") {

      // Per-window offset; persists for the lifetime of the scene
      if (this._ogNameHelpOffset === undefined) {
        this._ogNameHelpOffset = 0;
      }

      if (text.includes("Type in this character's name")) {
        const riddle = currentRiddleText();

        // If no riddle (and no fallback), do NOT replace the default prompt.
        if (!riddle) {
          this._ogNameHelpOffset = 0;
          return _Window_Base_drawTextEx.call(this, text, x, y, width);
        }

        // Replace this single-line prompt with our multi-line riddle
        const lineCount = riddle.split("\n").length;

        // Extra vertical space beyond the one original line
        const extraLines = Math.max(0, lineCount - 1);
        this._ogNameHelpOffset = extraLines * this.lineHeight();

        text = riddle;
      } else if (this._ogNameHelpOffset > 0) {
        // Any subsequent help text drawn by this same window (Press ENTER,
        // -or-, arrow keys, ESC/TAB, etc.) gets pushed down by the offset.
        y += this._ogNameHelpOffset;
      }
    }

    return _Window_Base_drawTextEx.call(this, text, x, y, width);
  };

  // 1b) Optionally clear the riddle variable once the name is confirmed
  if (clearVarOnOk) {
    const _Scene_Name_onInputOk = Scene_Name.prototype.onInputOk;
    Scene_Name.prototype.onInputOk = function() {
      if (riddleVarId > 0 && $gameVariables) {
        $gameVariables.setValue(riddleVarId, "");
      }
      _Scene_Name_onInputOk.call(this);
    };
  }

  // 2) Tweak character width / spacing in the Name Edit box
  const _NameEdit_charWidth = Window_NameEdit.prototype.charWidth;
  Window_NameEdit.prototype.charWidth = function() {
    let w = this.textWidth("M"); // wide base character
    if (!w || w <= 0) {
      w = _NameEdit_charWidth.call(this);
    }
    return w + extraSpace;
  };

  // 3) Recenter the characters inside the Name Edit window
  //    in a way that works with VisuStella overrides
  const _NameEdit_left = Window_NameEdit.prototype.left;
  Window_NameEdit.prototype.left = function() {
    let maxLen;

    if (typeof this.maxLength === "function") {
      maxLen = this.maxLength();
    } else if (typeof this.maxLength === "number") {
      maxLen = this.maxLength;
    } else if (typeof this._maxLength === "number") {
      maxLen = this._maxLength;
    } else if (this._name) {
      maxLen = this._name.length;
    } else {
      return _NameEdit_left.call(this);
    }

    if (!maxLen || maxLen <= 0) {
      return _NameEdit_left.call(this);
    }

    const totalWidth    = maxLen * this.charWidth();
    const contentsWidth = this.contentsWidth();
    const left          = Math.floor((contentsWidth - totalWidth) / 2);

    return Math.max(0, left);
  };
})();
