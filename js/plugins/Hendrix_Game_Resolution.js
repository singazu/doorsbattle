/*:
 * @target MZ
 * @plugindesc v1.0.2 Allow game users to change game resolution in-game
 * @author Sang Hendrix
 * @url https://sanghendrix.itch.io
 * 
 * @help
 * Version 1.0.2
 * For support or bug report, please contact via Discord
 * Discord: https://discord.gg/YKPscqHV8b
 * Patreon: https://www.patreon.com/SangHendrix
 * ----------------------------------------------------------------------------
 * This RPG Maker MZ plugin allows your game players to change game resolution
 * directly from the options menu.
 * ----------------------------------------------------------------------------
 * HOW TO USE
 * ----------------------------------------------------------------------------
 * 1. Choose your Rescale Style in the plugin parameters
 * 2. Set up the the size, numberes, etc. you desire
 * ----------------------------------------------------------------------------
 * SCRIPT CALLS
 * ----------------------------------------------------------------------------
 * setResolution(index)
 * - Change to a specific resolution by index (0 = first, 1 = second, etc.)
 * - Example: setResolution(2);
 * 
 * nextResolution() or previousResolution()
 * - Cycle to the next/previous resolution in the list in parameter
 * 
 * setFullscreen(state) or just setFullscreen() to toggle
 * - State can be true/false
 * ----------------------------------------------------------------------------
 * RESCALE STYLES
 * ----------------------------------------------------------------------------
 * Aspect Ratio Scaling:
 *   x1, x2, x2.5, x3, etc.
 *   Scales the window while maintaining original game resolution
 *   (Very much recommended if you're making a pixel art game)
 * 
 * Resolution Size Scaling:
 *   "816,624", "1280,720", "1920,1080"
 *   Resize the whole game window to this resolution
 *   (recomended for most cases)
 * 
 * Game World Scaling:
 *   "816,624", "1280,720", "1920,1080"
 *   Do what Resolution Size Scaling does but also change
 *   the actual game viewport size, allowing user to see more in maps
 *   (good for playtesting)
 * ----------------------------------------------------------------------------
 * TERMS OF USE
 * ----------------------------------------------------------------------------
 * You can:
 *  - Use the plugins in any of your commercial or non-commercial game projects.
 *    There is no limit on the number of projects you can use it for.
 * You can not:
 *  - Resell or redistribute the plugins themselves (even modified versions).
 *  - Distribute the plugin to clients as part of a game development service.
 *    Each client must purchase their own license for the plugins.
 *----------------------------------------------------------------------------

 * @param RescaleStyle
 * @text Rescale Style
 * @desc Choose how the game should be scaled
 * @type select
 * @option Aspect Ratio Scaling
 * @option Resolution Size Scaling
 * @option Game World Scaling
 * @default Aspect Ratio Scaling
 * 
 * @param AspectRatioScaling
 * @text Aspect Ratio Scaling
 * @desc x1,x1.5,x2,x2.5,x3, etc. Only usable if Rescale Style is "Aspect Ratio Scaling"
 * @type text
 * @default x1,x1.5,x2,x2.5,x3
 * 
 * @param Resolutions
 * @text Available Resolutions
 * @desc List of resolutions. Used for "Resolution Size Scaling" and "Game World Scaling" modes
 * @type struct<ResolutionStruct>[]
 * @default ["{\"Size\":\"816,624\"}","{\"Size\":\"1280,720\"}","{\"Size\":\"1920,1080\"}"]
 *
 * @param PixelateGame
 * @text Pixelate Game
 * @desc Render the game with nearest-neighbor filtering for sharp pixel art (no blur/smoothing)
 * @type boolean
 * @default false
 */
/*~struct~ResolutionStruct:
 * @param Size
 * @text Resolution Size
 * @desc Resolution in format: width,height (like 1920,1080)
 * @type text
 * @default 1920,1080
 */

var Imported = Imported || {};
Imported.Hendrix_Game_Resolution = true;

(() => {
    const pluginName = 'Hendrix_Game_Resolution';
    const parameters = PluginManager.parameters(pluginName);
    const rescaleStyle = parameters['RescaleStyle'] || 'Aspect Ratio Scaling';
    const aspectRatioScaling = parameters['AspectRatioScaling'] || '';
    const pixelateGame = parameters['PixelateGame'] === 'true';

    let resolutionsList = [];
    let scaleFactors = [];
    let resolutionChanged = false;

    const isAspectRatioMode = rescaleStyle === 'Aspect Ratio Scaling';
    const isResolutionSizeMode = rescaleStyle === 'Resolution Size Scaling';
    const isGameWorldMode = rescaleStyle === 'Game World Scaling';

    function getBaseResolution() {
        if (Graphics._canvas) {
            return {
                width: Graphics._canvas.width,
                height: Graphics._canvas.height
            };
        }
        if (Graphics.boxWidth) {
            return {
                width: Graphics.boxWidth,
                height: Graphics.boxHeight
            };
        }
        return { width: 816, height: 624 };
    }

    function initializeResolutionsList() {
        const baseRes = getBaseResolution();
        resolutionsList = scaleFactors.map(scale => ({
            width: Math.round(baseRes.width * scale),
            height: Math.round(baseRes.height * scale),
            scale: scale
        }));
    }

    function pixelPerfectish() {
        if (!pixelateGame) return;

        if (Graphics._canvas) {
            const canvas = Graphics._canvas;
            canvas.style.imageRendering = 'pixelated';
            canvas.style.imageRendering = '-moz-crisp-edges';

            const context = canvas.getContext('2d');
            if (context) context.imageSmoothingEnabled = false;
        }

        if (Graphics._app && Graphics._app.renderer && Graphics._app.renderer.gl) {
            const gl = Graphics._app.renderer.gl;
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        }

        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    }

    if (isAspectRatioMode) {
        scaleFactors = aspectRatioScaling.split(',').map(factor => {
            const trimmed = factor.trim().toLowerCase();
            const numStr = trimmed.replace('x', '');
            const num = parseFloat(numStr);
            return isNaN(num) || num <= 0 ? null : num;
        }).filter(n => n !== null);

        if (scaleFactors.length === 0) {
            scaleFactors = [1, 2, 3];
        }

        initializeResolutionsList();
    } else {
        try {
            const resolutionsParam = JSON.parse(parameters['Resolutions'] || '[]');
            resolutionsList = resolutionsParam.map(res => {
                const parsed = JSON.parse(res);
                const [width, height] = parsed.Size.split(',').map(num => parseInt(num.trim()));
                return { width, height, scale: null };
            }).filter(res => res.width > 0 && res.height > 0);

            if (resolutionsList.length === 0) {
                resolutionsList = [
                    { width: 816, height: 624, scale: null },
                    { width: 1280, height: 720, scale: null },
                    { width: 1920, height: 1080, scale: null }
                ];
            }
        } catch (error) {
            resolutionsList = [
                { width: 816, height: 624, scale: null },
                { width: 1280, height: 720, scale: null },
                { width: 1920, height: 1080, scale: null }
            ];
        }
    }

    //=============================================================================
    // ConfigManager
    //=============================================================================

    const _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = _ConfigManager_makeData.call(this);
        config.resolutionIndex = this.resolutionIndex;
        config.fullscreen = this.fullscreen;
        return config;
    };

    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.call(this, config);
        this.resolutionIndex = this.readResolutionIndex(config, 'resolutionIndex');
        this.fullscreen = this.readFlag(config, 'fullscreen');
    };

    ConfigManager.readResolutionIndex = function(config, name) {
        const value = config[name];
        if (value !== undefined) {
            return Number(value).clamp(0, resolutionsList.length - 1);
        } else {
            return 0;
        }
    };

    ConfigManager.resolutionIndex = 0;
    ConfigManager.fullscreen = false;

    Object.defineProperty(Graphics, 'defaultWidth', {
        get: function() {
            if (isAspectRatioMode) {
                return getBaseResolution().width;
            }
            return resolutionsList[ConfigManager.resolutionIndex].width;
        },
        configurable: true
    });

    Object.defineProperty(Graphics, 'defaultHeight', {
        get: function() {
            if (isAspectRatioMode) {
                return getBaseResolution().height;
            }
            return resolutionsList[ConfigManager.resolutionIndex].height;
        },
        configurable: true
    });

    //=============================================================================
    // Resolution & Fullscreen
    //=============================================================================

    function applyFullscreen(fullscreen) {
        const isNwjs = Utils.isNwjs();

        if (fullscreen) {
            isNwjs ? nw.Window.get().enterFullscreen() : Graphics._requestFullScreen();
        } else {
            isNwjs ? nw.Window.get().leaveFullscreen() : Graphics._cancelFullScreen();
            const resolution = resolutionsList[ConfigManager.resolutionIndex];
            if (resolution) {
                setTimeout(() => {
                    applyResolution(resolution.width, resolution.height);
                }, 100);
            }
        }
    }

    function applyResolution(width, height) {
        if (!width || !height) return;
        
        if (isAspectRatioMode) {
            if (Utils.isNwjs()) {
                const win = nw.Window.get();
                const screenWidth = window.screen.availWidth;
                const screenHeight = window.screen.availHeight;
                let finalWidth = Math.min(width, screenWidth);
                let finalHeight = Math.min(height, screenHeight);
                let canvasStyleWidth = width;
                let canvasStyleHeight = height;
                
                if (width > screenWidth || height > screenHeight) {
                    const scaleDownX = screenWidth / width;
                    const scaleDownY = screenHeight / height;
                    const scaleDown = Math.min(scaleDownX, scaleDownY);
                    canvasStyleWidth = Math.floor(width * scaleDown);
                    canvasStyleHeight = Math.floor(height * scaleDown);
                    finalWidth = canvasStyleWidth;
                    finalHeight = canvasStyleHeight;
                }
                
                Graphics._canvas.style.width = canvasStyleWidth + 'px';
                Graphics._canvas.style.height = canvasStyleHeight + 'px';
                Graphics._canvas.style.marginLeft = '0px';
                Graphics._canvas.style.marginTop = '0px';
                
                const oldX = win.x;
                const oldY = win.y;
                const oldWidth = win.width;
                const oldHeight = win.height;
                
                const centerX = oldX + (oldWidth / 2);
                const centerY = oldY + (oldHeight / 2);
                
                let newX = Math.floor(centerX - (finalWidth / 2));
                let newY = Math.floor(centerY - (finalHeight / 2));
                
                newX = Math.max(0, Math.min(newX, screenWidth - finalWidth));
                newY = Math.max(0, Math.min(newY, screenHeight - finalHeight));
                
                win.moveTo(newX, newY);
                win.resizeTo(finalWidth, finalHeight);
            } else {
                Graphics._canvas.style.width = width + 'px';
                Graphics._canvas.style.height = height + 'px';
                Graphics._canvas.style.marginLeft = '0px';
                Graphics._canvas.style.marginTop = '0px';
            }
        } else if (isResolutionSizeMode) {
            if (Utils.isNwjs()) {
                const win = nw.Window.get();
                const screenWidth = window.screen.availWidth;
                const screenHeight = window.screen.availHeight;
                
                let finalWidth = Math.min(width, screenWidth);
                let finalHeight = Math.min(height, screenHeight);
                
                const scaleX = finalWidth / Graphics.boxWidth;
                const scaleY = finalHeight / Graphics.boxHeight;
                const scale = Math.min(scaleX, scaleY);
                
                const scaledWidth = Math.floor(Graphics.boxWidth * scale);
                const scaledHeight = Math.floor(Graphics.boxHeight * scale);
                
                Graphics._canvas.style.width = scaledWidth + 'px';
                Graphics._canvas.style.height = scaledHeight + 'px';
                
                const offsetX = Math.floor((finalWidth - scaledWidth) / 2);
                const offsetY = Math.floor((finalHeight - scaledHeight) / 2);
                Graphics._canvas.style.marginLeft = offsetX + 'px';
                Graphics._canvas.style.marginTop = offsetY + 'px';
                
                const oldX = win.x;
                const oldY = win.y;
                const oldWidth = win.width;
                const oldHeight = win.height;
                
                const centerX = oldX + (oldWidth / 2);
                const centerY = oldY + (oldHeight / 2);
                
                let newX = Math.floor(centerX - (finalWidth / 2));
                let newY = Math.floor(centerY - (finalHeight / 2));
                
                newX = Math.max(0, Math.min(newX, screenWidth - finalWidth));
                newY = Math.max(0, Math.min(newY, screenHeight - finalHeight));
                
                win.moveTo(newX, newY);
                win.resizeTo(finalWidth, finalHeight);
            } else {
                const scaleX = width / Graphics.boxWidth;
                const scaleY = height / Graphics.boxHeight;
                const scale = Math.min(scaleX, scaleY);
                
                const scaledWidth = Math.floor(Graphics.boxWidth * scale);
                const scaledHeight = Math.floor(Graphics.boxHeight * scale);
                
                Graphics._canvas.style.width = scaledWidth + 'px';
                Graphics._canvas.style.height = scaledHeight + 'px';
                
                const offsetX = Math.floor((width - scaledWidth) / 2);
                const offsetY = Math.floor((height - scaledHeight) / 2);
                Graphics._canvas.style.marginLeft = offsetX + 'px';
                Graphics._canvas.style.marginTop = offsetY + 'px';
            }
        } else if (isGameWorldMode) {
            Graphics.boxWidth = width;
            Graphics.boxHeight = height;
            Graphics.width = width;
            Graphics.height = height;
            
            Graphics.resize(width, height);
            
            if (Utils.isNwjs()) {
                const win = nw.Window.get();
                
                const oldX = win.x;
                const oldY = win.y;
                const oldWidth = win.width;
                const oldHeight = win.height;
                
                const centerX = oldX + (oldWidth / 2);
                const centerY = oldY + (oldHeight / 2);
                
                let newX = Math.floor(centerX - (width / 2));
                let newY = Math.floor(centerY - (height / 2));
                
                const screenWidth = window.screen.availWidth;
                const screenHeight = window.screen.availHeight;
                
                newX = Math.max(0, Math.min(newX, screenWidth - width));
                newY = Math.max(0, Math.min(newY, screenHeight - height));
                
                win.moveTo(newX, newY);
                win.resizeTo(width, height);
            }
            
            if (SceneManager._scene) {
                SceneManager._scene.children.forEach(child => {
                    if (child instanceof Window_Base) {
                        child.move(child.x, child.y, child.width, child.height);
                        child.refresh();
                    }
                });
            }
            
            if ($gamePlayer && $gameMap && SceneManager._scene instanceof Scene_Map) {
                $gamePlayer.center($gamePlayer.x, $gamePlayer.y);
            }
        }
    }

    //=============================================================================
    // Window_Options
    //=============================================================================

    const _Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
    Window_Options.prototype.makeCommandList = function() {
        _Window_Options_makeCommandList.call(this);
        this.resolutionCommand();
        if (Utils.isNwjs()) {
            this.addFullscreenCommand();
        }
    };

    Window_Options.prototype.resolutionCommand = function() {
        if (isAspectRatioMode) {
            this.addCommand('Window Scale', 'resolution');
        } else {
            this.addCommand('Resolution', 'resolution');
        }
    };

    Window_Options.prototype.addFullscreenCommand = function() {
        this.addCommand('Fullscreen', 'fullscreen');
    };

    const _Window_Options_statusText = Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function(index) {
        const symbol = this.commandSymbol(index);
        if (symbol === 'resolution') {
            return this.resolutionStatusText();
        }
        return _Window_Options_statusText.call(this, index);
    };

    Window_Options.prototype.resolutionStatusText = function() {
        const resolution = resolutionsList[ConfigManager.resolutionIndex];
        if (resolution) {
            if (isAspectRatioMode && resolution.scale) {
                return `x${resolution.scale}`;
            }
            return `${resolution.width}x${resolution.height}`;
        }
        return '';
    };

    const _Window_Options_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk = function() {
        const symbol = this.commandSymbol(this.index());
        if (symbol === 'resolution') {
            this.changeResolution(true);
        } else if (symbol === 'fullscreen') {
            this.toggleFullscreen();
        } else {
            _Window_Options_processOk.call(this);
        }
    };

    const _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
    Window_Options.prototype.cursorRight = function() {
        const symbol = this.commandSymbol(this.index());
        if (symbol === 'resolution') {
            this.changeResolution(true);
        } else if (symbol === 'fullscreen') {
            this.toggleFullscreen();
        } else {
            _Window_Options_cursorRight.call(this);
        }
    };

    const _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
    Window_Options.prototype.cursorLeft = function() {
        const symbol = this.commandSymbol(this.index());
        if (symbol === 'resolution') {
            this.changeResolution(false);
        } else if (symbol === 'fullscreen') {
            this.toggleFullscreen();
        } else {
            _Window_Options_cursorLeft.call(this);
        }
    };

    Window_Options.prototype.changeResolution = function(forward) {
        if (forward) {
            ConfigManager.resolutionIndex = (ConfigManager.resolutionIndex + 1) % resolutionsList.length;
        } else {
            ConfigManager.resolutionIndex = (ConfigManager.resolutionIndex - 1 + resolutionsList.length) % resolutionsList.length;
        }

        const resolution = resolutionsList[ConfigManager.resolutionIndex];
        resolutionChanged = true;
        applyResolution(resolution.width, resolution.height);

        if (ConfigManager.fullscreen) {
            setTimeout(() => applyFullscreen(true), 10);
        }

        this.redrawItem(this.findSymbol('resolution'));
        SoundManager.playCursor();
    };

    Window_Options.prototype.toggleFullscreen = function() {
        ConfigManager.fullscreen = !ConfigManager.fullscreen;
        applyFullscreen(ConfigManager.fullscreen);
        this.redrawItem(this.findSymbol('fullscreen'));
        SoundManager.playCursor();
    };

    //=============================================================================
    // Scenes
    //=============================================================================

    const _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);
        
        if (resolutionChanged) {
            resolutionChanged = false;
            if ($gamePlayer && $gameMap) {
                $gameMap._displayX = $gamePlayer.centerX() - ($gamePlayer.x + 0.5);
                $gameMap._displayY = $gamePlayer.centerY() - ($gamePlayer.y + 0.5);
                $gamePlayer.center($gamePlayer.x, $gamePlayer.y);
                $gameMap.setDisplayPos($gameMap._displayX, $gameMap._displayY);
            }
        }
    };

    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.call(this);

        if (isAspectRatioMode) initializeResolutionsList();

        pixelPerfectish();

        const resolution = resolutionsList[ConfigManager.resolutionIndex];
        applyResolution(resolution.width, resolution.height);

        if (ConfigManager.fullscreen) applyFullscreen(true);
    };

    const _Graphics__onKeyDown = Graphics._onKeyDown;
    Graphics._onKeyDown = function(event) {
        if (!event.ctrlKey && !event.altKey) {
            if (event.keyCode === 115) {
                event.preventDefault();
                ConfigManager.fullscreen = !ConfigManager.fullscreen;
                applyFullscreen(ConfigManager.fullscreen);
                ConfigManager.save();
                return;
            }
        }
        _Graphics__onKeyDown.call(this, event);
    };

    //=============================================================================
    // Script Calls
    //=============================================================================

    window.setResolution = function (index) {
        if (index < 0 || index >= resolutionsList.length) {
            return false;
        }

        ConfigManager.resolutionIndex = index;
        const resolution = resolutionsList[index];

        if (resolution) {
            applyResolution(resolution.width, resolution.height);
            if (ConfigManager.fullscreen) {
                setTimeout(() => {
                    applyFullscreen(true);
                }, 10);
            }
            ConfigManager.save();
            return true;
        }
        return false;
    };

    window.nextResolution = function () {
        const nextIndex = (ConfigManager.resolutionIndex + 1) % resolutionsList.length;
        return window.setResolution(nextIndex);
    };

    window.previousResolution = function () {
        const prevIndex = (ConfigManager.resolutionIndex - 1 + resolutionsList.length) % resolutionsList.length;
        return window.setResolution(prevIndex);
    };

    window.setFullscreen = function(state) {
        ConfigManager.fullscreen = (state === undefined || state === null) ? !ConfigManager.fullscreen : !!state;
        applyFullscreen(ConfigManager.fullscreen);
        ConfigManager.save();
        return ConfigManager.fullscreen;
    };
})();