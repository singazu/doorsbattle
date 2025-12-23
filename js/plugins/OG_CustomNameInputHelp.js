/*:
 * @target MZ
 * @plugindesc v2.3 Name Input riddle text from variable + spacing (VisuStella-friendly).
 * @author Overhill Games
 *
 * @param HelpText
 * @text Fallback Riddle Text
 * @type string
 * @default Type the answer.
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
 *  2) Supports line breaks in the riddle: in Script commands use "\\n"
 *     (lowercase n). This plugin converts \n or \N into real newlines.
 *  3) Increases character width a bit and recenters the name input text.
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
 *  - If the variable is empty, Fallback Riddle Text is used instead.
 */

(() => {
  const pluginName = "OG_CustomNameInputHelp";
  const params     = PluginManager.parameters(pluginName);

  const fallbackRiddleRaw = String(params["HelpText"] || "");
  const riddleVarId       = Number(params["RiddleVariableId"] || 0);
  const extraSpace        = Number(params["ExtraCharSpacing"] || 0);

  function normalizeNewlines(text) {
    // Turn \n or \N (escaped in Script as \\n / \\N) into real newline chars
    return String(text).replace(/\\[nN]/g, "\n");
  }

  function currentRiddleText() {
    let txt = "";
    if (riddleVarId > 0 && $gameVariables) {
      const v = $gameVariables.value(riddleVarId);
      if (v !== null && v !== undefined) txt = String(v);
    }
    if (!txt) txt = fallbackRiddleRaw;
    return normalizeNewlines(txt);
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
        // Replace this single-line prompt with our multi-line riddle
        const riddle = currentRiddleText();
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
