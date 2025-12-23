/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/animatedbattlebacks/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Add animations to your battle backgrounds
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: Alpha R6
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.9.0
 * ----------------------------------------------------------------------------
 * Description: Add animations to your battle backgrounds to make them more
 * engaging. You can cause the background to scroll similar to a parallax,
 * or add animated sections of your background using a frame-based animation.
 * ----------------------------------------------------------------------------
 * Documentation:
 * ------------------------------Alpha Notes-----------------------------------
 * The following features are planned for this plugin in the future:
 * 1) Animations that can move and change scale
 * 2) Animations that cycle through multiple sprite sheets
 *
 * Want additional features not already present? Make suggestions on the
 * Patreon Post or in my discord under the #suggestions channel!
 * https://discord.gg/Gbx7JXP
 * ----------------------------Error Reporting---------------------------------
 * This plugin reports common errors with parameter setup. If it doesn't seem
 * to be working, please open the dev tools by pressing F8 during a playtest,
 * and then selecting the CONSOLE tab at the top of the window that opens.
 * Look for any warning logs which come from CGMZ_AnimatedBattleBacks
 * -------------------------------Note Tags------------------------------------
 * You can use a note tag on the map properties to begin a map using a CGMZ
 * animated battle back. To do so, use the note tag:
 * <cgmzabb:id>
 * For example, if your animated battle back had an id of "battleback1" you
 * could do:
 * <cgmzabb:battleback1>
 * ----------------------------Plugin Commands---------------------------------
 * • Set Battle Back
 * Sets an animated battle back. Used on the map
 * 
 * • Show Animation
 * Shows/Hides an individual animation by id (if exists). Used inside battle.
 * -------------------------------Vehicles-------------------------------------
 * This plugin does not affect vehicle battle backgrounds, as it is common for
 * other plugins to manage those. If you want to use animated battle backs in
 * vehicle combat, you can use [CGMZ] Vehicle Encounters for that which has an
 * integration with this plugin.
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games. This means you can:
 *
 * ✓ Add this plugin to a saved game and it will work as expected
 * ✓ Change any plugin params and changes will be reflected in saved games
 * ✓ Remove the plugin with no issue to save data
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_AnimatedBattleBacks.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * --------------------------Latest Version------------------------------------
 * Hi all, this latest version is a quick compatibility update for other [CGMZ]
 * plugins that have vehicle encounters, such as [CGMZ] Custom Vehicles. This
 * plugin will no longer use the map animated battle back when the player is
 * in a vehicle, as the battle back will be handled instead by other plugins.
 * The option to add an animated battle back has been added to those other
 * plugins. Previously, both plugins would fight for control over the battle
 * back.
 *
 * Version Alpha R6
 * - Compatibility with other [CGMZ] plugins that have vehicle encounters
 *
 * @command Set Battle Back
 * @desc Sets the battle back to an animated one
 *
 * @arg Id
 * @desc The ID of the animated battle back. Leave empty to clear battle back.
 *
 * @command Show Animation
 * @desc Shows an animation during the battle
 *
 * @arg Id
 * @desc The ID of the animated battle back animation to show
 *
 * @arg Show
 * @type boolean
 * @default true
 * @desc If true, will show the animation. If false, will hide the animation.
 *
 * @param Backgrounds
 * @type struct<Background>[]
 * @default []
 * @desc Set up custom backgrounds here
*/
/*~struct~Background:
 * @param Id
 * @desc The id of the battle background
 *
 * @param Battle Back 1
 * @type file
 * @dir img/battlebacks1/
 * @desc The base image to display as the battleback1
 *
 * @param Battle Back 2
 * @type file
 * @dir img/battlebacks2/
 * @desc The base image to display as the battleback2
 *
 * @param Scroll X
 * @type number
 * @default 0
 * @min -999
 * @desc If scroll params are not 0, the battleback1 should instead be a scrolling parallax.
 *
 * @param Scroll Y
 * @type number
 * @default 0
 * @min -999
 * @desc If scroll params are not 0, the battleback1 should instead be a scrolling parallax.
 *
 * @param Scroll Frames
 * @type number
 * @default 0
 * @desc If scrolling is set, number of frames to wait before scroll updates
 *
 * @param Animations
 * @type struct<Animation>[]
 * @default []
 * @desc Animations to show during battle
 *
 * @param Video
 * @type file
 * @dir movies
 * @desc The video to show as the battle background
 *
 * @param Hide Battlebacks
 * @type boolean
 * @default false
 * @desc If true, will hide the battleback sprites
*/
/*~struct~Animation:
 * @param Id
 * @desc The id of the default animation
 *
 * @param Image
 * @type file
 * @dir img/
 * @desc The animation image
 *
 * @param Frame Width
 * @type number
 * @min 0
 * @default 0
 * @desc The width of one frame of the animation. Leave 0 for the image width
 *
 * @param Frame Height
 * @type number
 * @min 0
 * @default 0
 * @desc The height of one frame of the animation. Leave 0 for the image height
 *
 * @param Frame Delay
 * @type number
 * @min 1
 * @default 1
 * @desc Frames to wait before switching animation frame
 *
 * @param Start Delay
 * @type number
 * @min 0
 * @default 0
 * @desc Frames to wait before starting to play the animation for the first time
 *
 * @param Replay Delay
 * @type number
 * @min -1
 * @default 0
 * @desc Frames to wait before replaying the animation. Set to -1 to never replay
 *
 * @param X
 * @type number
 * @min 0
 * @default 0
 * @desc X coordinate of the animation
 *
 * @param Y
 * @type number
 * @min 0
 * @default 0
 * @desc X coordinate of the animation
 *
 * @param Scale X
 * @type number
 * @min 0
 * @default 1.00
 * @decimals 2
 * @desc The X scale the animation sprite is drawn at
 *
 * @param Scale Y
 * @type number
 * @min 0
 * @default 1.00
 * @decimals 2
 * @desc The Y scale the animation sprite is drawn at
 *
 * @param Opacity
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @desc Opacity of the animation
 *
 * @param Opacity Flicker
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * @desc Random amount of opacity to add or subtract from base opacity
 *
 * @param Opacity Flicker Frames
 * @type number
 * @min 0
 * @default 3
 * @desc Amount of frames before updating the flicker
 *
 * @param Start Hidden
 * @type boolean
 * @default false
 * @desc If the animation will start the battle in the hidden state
 *
 * @param Anchor Top Left
 * @type boolean
 * @default false
 * @desc If true, the x/y coordinate will be the top left. Otherwise it is the middle
*/
Imported.CGMZ_AnimatedBattleBacks = true;
CGMZ.Versions["Animated Battle Backs"] = "Alpha R6";
CGMZ.AnimatedBattleBacks = {};
CGMZ.AnimatedBattleBacks.parameters = PluginManager.parameters('CGMZ_AnimatedBattleBacks');
CGMZ.AnimatedBattleBacks.Backgrounds = CGMZ_Utils.parseJSON(CGMZ.AnimatedBattleBacks.parameters["Backgrounds"], [], "[CGMZ] Animated Battle Backs", "Your Backgrounds parameter could not be parsed");
//=============================================================================
// CGMZ_AnimatedBattleBack
//-----------------------------------------------------------------------------
// Store temp battle back data
//=============================================================================
function CGMZ_AnimatedBattleBack() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize battle back settings
//-----------------------------------------------------------------------------
CGMZ_AnimatedBattleBack.prototype.initialize = function(bg) {
	this.battleBack1Name = bg["Battle Back 1"];
	this.battleBack2Name = bg["Battle Back 2"];
	this.scrollX = Number(bg["Scroll X"]);
	this.scrollY = Number(bg["Scroll Y"]);
	this.scrollFrames = Number(bg["Scroll Frames"]);
	this.video = bg.Video;
	this.hideBattlebacks = (bg["Hide Battlebacks"] === 'true');
	this.animations = [];
	const animations = CGMZ_Utils.parseJSON(bg.Animations, null, "[CGMZ] Animated Battle Backs", `Animations for id ${bg.Id} could not be loaded due to incorrect JSON.`);
	if(animations) this.setupAnimations(animations);
};
//-----------------------------------------------------------------------------
// Initialize animation settings
//-----------------------------------------------------------------------------
CGMZ_AnimatedBattleBack.prototype.setupAnimations = function(animations) {
	for(const animationJSON of animations) {
		const animation = CGMZ_Utils.parseJSON(animationJSON, null, "[CGMZ] Animated Battle Backs", "Animation could not be loaded due to incorrect JSON parameter, skipping");
		if(!animation) continue;
		const animationBuilder = {};
		animationBuilder.id = animation.Id;
		animationBuilder.image = CGMZ_Utils.getImageData(animation.Image, "img");
		animationBuilder.frameWidth = Number(animation["Frame Width"]);
		animationBuilder.frameHeight = Number(animation["Frame Height"]);
		animationBuilder.frameDelay = Number(animation["Frame Delay"]);
		animationBuilder.startDelay = Number(animation["Start Delay"]);
		animationBuilder.replayDelay = Number(animation["Replay Delay"]);
		animationBuilder.x = Number(animation.X);
		animationBuilder.y = Number(animation.Y);
		animationBuilder.opacity = Number(animation.Opacity);
		animationBuilder.opacityFlicker = Number(animation["Opacity Flicker"]);
		animationBuilder.opacityFlickerFrames = Number(animation["Opacity Flicker Frames"]);
		animationBuilder.scaleX = parseFloat(animation["Scale X"]);
		animationBuilder.scaleY = parseFloat(animation["Scale Y"]);
		animationBuilder.startHidden = (animation["Start Hidden"] === 'true');
		animationBuilder.anchorTopLeft = (animation["Anchor Top Left"] === 'true');
		this.animations.push(animationBuilder);
	}
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Setup animated battle back data
//=============================================================================
//-----------------------------------------------------------------------------
// Also set up animated battle back data
//-----------------------------------------------------------------------------
const alias_CGMZ_AnimatedBattleBacks_CGMZTemp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZ_AnimatedBattleBacks_CGMZTemp_createPluginData.call(this);
	this._animatedBattleBacks = {};
	this._animatedBattleBackRequests = [];
	for(const bgJSON of CGMZ.AnimatedBattleBacks.Backgrounds) {
		const bgObj = CGMZ_Utils.parseJSON(bgJSON, null, "[CGMZ] Animated Battle Backs", `One of your backgrounds has incorrect JSON and could not be loaded: ${bgJSON}`);
		if(!bgObj) continue;
		const bg = new CGMZ_AnimatedBattleBack(bgObj);
		this._animatedBattleBacks[bgObj.Id] = bg;
	}
};
//-----------------------------------------------------------------------------
// Get an animated battle back
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getAnimatedBattleBack = function(id) {
	return this._animatedBattleBacks[id];
};
//-----------------------------------------------------------------------------
// Clear battle back animation requests
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.clearAnimatedBattleBackRequests = function() {
	this._animatedBattleBackRequests = [];
};
//-----------------------------------------------------------------------------
// Check if any battle back animation requests
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.hasAnimatedBattleBackRequests = function() {
	return this._animatedBattleBackRequests.length > 0;
};
//-----------------------------------------------------------------------------
// Get battle back animation requests
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getAnimatedBattleBackRequest = function() {
	return this._animatedBattleBackRequests.shift();
};
//-----------------------------------------------------------------------------
// Clear battle back animation requests
// Request should be an object in the form:
// {type:"show/hide",id:"animationId",options:yourOptions}
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.requestAnimatedBattleBackChange = function(request) {
	this._animatedBattleBackRequests.push(request);
};
//-----------------------------------------------------------------------------
// Register Animated Battle Backs Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_AnimatedBattleBacks_CGMZ_Temp_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_AnimatedBattleBacks_CGMZ_Temp_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_AnimatedBattleBacks", "Set Battle Back", this.pluginCommandAnimatedBattleBacksSetBattleBack);
	PluginManager.registerCommand("CGMZ_AnimatedBattleBacks", "Show Animation", this.pluginCommandAnimatedBattleBacksShowAnimation);
};
//-----------------------------------------------------------------------------
// Plugin Command - Set Battle Back
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandAnimatedBattleBacksSetBattleBack = function(args) {
	if(args.Id) {
		const back = $cgmzTemp.getAnimatedBattleBack(args.Id);
		if(back) $gameMap.CGMZ_setAnimatedBattleBack(args.Id);
	} else {
		$gameMap.CGMZ_setAnimatedBattleBack(null);
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - Show Animation
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandAnimatedBattleBacksShowAnimation = function(args) {
	const type = (args.Show === 'true') ? 'show' : 'hide';
	const request = {type:type,id:args.Id,options:null};
	$cgmzTemp.requestAnimatedBattleBackChange(request);
};
//=============================================================================
// Game_Map
//-----------------------------------------------------------------------------
// Handle map animated battle back settings
//=============================================================================
//-----------------------------------------------------------------------------
// Also initialize the animated battle back id
//-----------------------------------------------------------------------------
const alias_CGMZ_AnimatedBattleBacks_GameMap_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
    alias_CGMZ_AnimatedBattleBacks_GameMap_initialize.apply(this, arguments);
	this._CGMZ_animatedBattleBackId = null;
};
//-----------------------------------------------------------------------------
// During setup, try to read animated battle back note tag, or set to null
//-----------------------------------------------------------------------------
const alias_CGMZ_AnimatedBattleBacks_GameMap_setupBattleback = Game_Map.prototype.setupBattleback;
Game_Map.prototype.setupBattleback = function() {
    alias_CGMZ_AnimatedBattleBacks_GameMap_setupBattleback.apply(this, arguments);
	const meta = CGMZ_Utils.readMeta($dataMap, "cgmzabb");
	this._CGMZ_animatedBattleBackId = (meta) ? meta : null;
};
//-----------------------------------------------------------------------------
// Get the animated battle back id
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_animatedBattleBackId = function() {
	return ($gamePlayer.isInVehicle()) ? null : this._CGMZ_animatedBattleBackId;
};
//-----------------------------------------------------------------------------
// Set the animated battle back id
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_setAnimatedBattleBack = function(animatedBattleBackId) {
	this._CGMZ_animatedBattleBackId = animatedBattleBackId;
};
//=============================================================================
// Sprite_Battleback
//-----------------------------------------------------------------------------
// Load animated battle back images if exist
//=============================================================================
//-----------------------------------------------------------------------------
// First check for animated battle back
//-----------------------------------------------------------------------------
const alias_CGMZ_AnimatedBattleBacks_Sprite_Battleback_battleback1Name = Sprite_Battleback.prototype.battleback1Name;
Sprite_Battleback.prototype.battleback1Name = function() {
	const animatedId = $gameMap.CGMZ_animatedBattleBackId();
	if(animatedId) {
		const battleback = $cgmzTemp.getAnimatedBattleBack(animatedId);
		if(battleback?.battleBack1Name) return battleback.battleBack1Name;
	}
    return alias_CGMZ_AnimatedBattleBacks_Sprite_Battleback_battleback1Name.apply(this, arguments);
};
//-----------------------------------------------------------------------------
// First check for animated battle back
//-----------------------------------------------------------------------------
const alias_CGMZ_AnimatedBattleBacks_Sprite_Battleback_battleback2Name = Sprite_Battleback.prototype.battleback2Name;
Sprite_Battleback.prototype.battleback2Name = function() {
	const animatedId = $gameMap.CGMZ_animatedBattleBackId();
	if(animatedId) {
		const battleback = $cgmzTemp.getAnimatedBattleBack(animatedId);
		if(battleback?.battleBack2Name) return battleback.battleBack2Name;
	}
    return alias_CGMZ_AnimatedBattleBacks_Sprite_Battleback_battleback2Name.apply(this, arguments);
};
//=============================================================================
// Spriteset_Battle
//-----------------------------------------------------------------------------
// Add CGMZ Animations to battle spriteset
//=============================================================================
//-----------------------------------------------------------------------------
// Also add any animations to the battle spriteset
//-----------------------------------------------------------------------------
const alias_CGMZ_AnimatedBattleBacks_Spriteset_Battle_createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function() {
	this._cgmz_needsUpdateVideo = false;
	alias_CGMZ_AnimatedBattleBacks_Spriteset_Battle_createBattleback.apply(this, arguments);
	const battleback = $cgmzTemp.getAnimatedBattleBack($gameMap.CGMZ_animatedBattleBackId());
	if(battleback && (battleback.scrollX || battleback.scrollY)) {
		this._cgmz_battleBackScrollInfo = {frames: 0, maxFrames: battleback.scrollFrames, x: battleback.scrollX, y: battleback.scrollY};
		this._back1Sprite.move(0, 0, Graphics.width, Graphics.height);
		if(!battleback.battleBack2Name) this._back2Sprite.opacity = 0;
	}
	this._CGMZ_animatedBattleBackAnimations = [];
	if(battleback) {
		for(const animation of battleback.animations) {
			const animSprite = new CGMZ_Sprite_BattlebackAnimation(animation);
			this._CGMZ_animatedBattleBackAnimations.push(animSprite);
			this._baseSprite.addChild(animSprite);
		}
		if(battleback.hideBattlebacks) {
			this._back1Sprite.opacity = 0;
			this._back2Sprite.opacity = 0;
		}
		if(battleback.video) {
			CGMZ_Video.play(battleback.video);
			this._cgmz_needsUpdateVideo = true;
			this._backgroundSprite.filters = [];
		}
	}
};
//-----------------------------------------------------------------------------
// Find a CGMZ Animated Battle Back Animation by id
//-----------------------------------------------------------------------------
Spriteset_Battle.prototype.CGMZ_findBattleBackAnimation = function(id) {
    for(const animation of this._CGMZ_animatedBattleBackAnimations) {
		if(animation.id === id) return animation;
	}
	return null;
};
//-----------------------------------------------------------------------------
// Also update CGMZ animated battle back requests
//-----------------------------------------------------------------------------
const alias_CGMZ_AnimatedBattleBacks_Spriteset_Battle_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
    alias_CGMZ_AnimatedBattleBacks_Spriteset_Battle_update.call(this);
    this.CGMZ_updateAnimatedBattleBackRequests();
	if(this._cgmz_needsUpdateVideo) this.CGMZ_updateBattlebackVideo();
};
//-----------------------------------------------------------------------------
// If scrolling background, update that instead
//-----------------------------------------------------------------------------
const alias_CGMZAnimatedBattleBacks_Spriteset_Battle_updateBattleback = Spriteset_Battle.prototype.updateBattleback;
Spriteset_Battle.prototype.updateBattleback = function() {
    if(this._cgmz_battleBackScrollInfo) {
		this._cgmz_battleBackScrollInfo.frames++;
		if(this._cgmz_battleBackScrollInfo.frames >= this._cgmz_battleBackScrollInfo.maxFrames) {
			this._cgmz_battleBackScrollInfo.frames = 0;
			this._back1Sprite.origin.x += this._cgmz_battleBackScrollInfo.x;
			this._back1Sprite.origin.y += this._cgmz_battleBackScrollInfo.y;
		}
		if(!this._battlebackLocated) {
			this._back2Sprite.adjustPosition();
			this._battlebackLocated = true;
		}
	} else {
		alias_CGMZAnimatedBattleBacks_Spriteset_Battle_updateBattleback.call(this);
	}
};
//-----------------------------------------------------------------------------
// Update animated battle back requests
//-----------------------------------------------------------------------------
Spriteset_Battle.prototype.CGMZ_updateAnimatedBattleBackRequests = function() {
    for(;;) {
        const request = $cgmzTemp.getAnimatedBattleBackRequest();
        if(request) {
			const sprite = this.CGMZ_findBattleBackAnimation(request.id);
			if(sprite) {
				sprite.handleRequest(request.type, request.options);
			}
        } else {
            break;
        }
    }
};
//-----------------------------------------------------------------------------
// Update animated battle back requests
//-----------------------------------------------------------------------------
Spriteset_Battle.prototype.CGMZ_updateBattlebackVideo = function() {
    const video = CGMZ_Video._element;
	this._backgroundSprite.bitmap.clear();
	this._backgroundSprite.bitmap.context.drawImage(video, 0, 0, Graphics.width, Graphics.height);
	this._backgroundSprite.bitmap._baseTexture.update();
};
//-----------------------------------------------------------------------------
// Also stop playing the CGMZ Video if needed
//-----------------------------------------------------------------------------
const alias_CGMZAnimatedBattleBacks_SpritesetBattle_destroy = Spriteset_Battle.prototype.destroy;
Spriteset_Battle.prototype.destroy = function(options) {
	if(this._cgmz_needsUpdateVideo) CGMZ_Video.pause();
	alias_CGMZAnimatedBattleBacks_SpritesetBattle_destroy.apply(this, arguments);
};
//=============================================================================
// CGMZ_Sprite_BattlebackAnimation
//-----------------------------------------------------------------------------
// Sprite class for battleback animations
//=============================================================================
function CGMZ_Sprite_BattlebackAnimation() {
    this.initialize(...arguments);
}
CGMZ_Sprite_BattlebackAnimation.prototype = Object.create(Sprite.prototype);
CGMZ_Sprite_BattlebackAnimation.prototype.constructor = CGMZ_Sprite_BattlebackAnimation;
//-----------------------------------------------------------------------------
// Initialize the sprite
//-----------------------------------------------------------------------------
CGMZ_Sprite_BattlebackAnimation.prototype.initialize = function(properties) {
    Sprite.prototype.initialize.call(this);
	this.id = properties.id;
	this._needsUpdate = false;
	this._firstPlay = false;
	this._waitCounter = 0;
	this._flickerCounter = 0;
	this._breatheXCounter = 0;
	this._breatheYCounter = 0;
	this._currentFrame = 0;
	this._maxFrames = 0;
	this._framesPerRow = 0;
	this._frameRows = 0;
	this._startDelay = properties.startDelay;
	this._replayDelay = 0;
	this._targetReplayDelay = properties.replayDelay;
	this._frameDelay = properties.frameDelay;
	this._frameWidth = properties.frameWidth;
	this._frameHeight = properties.frameHeight;
	this._home = new Point(properties.x, properties.y);
	this._homeScale = new Point(properties.scaleX, properties.scaleY);
	this._startHidden = properties.startHidden;
	this._opacityBase = properties.opacity;
	this._opacityFlicker = properties.opacityFlicker;
	this._opacityFlickerFrames = properties.opacityFlickerFrames;
	this.opacity = properties.opacity;
	this.anchor.x = (properties.anchorTopLeft) ? 0 : 0.5;
    this.anchor.y = (properties.anchorTopLeft) ? 0 : 0.5;
	this.hide();
	this.startBitmapLoad(properties.image);
};
//-----------------------------------------------------------------------------
// Start loading the bitmap
//-----------------------------------------------------------------------------
CGMZ_Sprite_BattlebackAnimation.prototype.startBitmapLoad = function(img) {
	this._bitmap = ImageManager.loadBitmap(img.folder, img.filename);
	this._bitmap.addLoadListener(this.onImageLoaded.bind(this));
};
//-----------------------------------------------------------------------------
// After bitmap is loaded
//-----------------------------------------------------------------------------
CGMZ_Sprite_BattlebackAnimation.prototype.onImageLoaded = function() {
	this.setFrameDimensions();
	this.calculateMaxFrames();
	const sw = this._frameWidth;
	const sh = this._frameHeight;
	const sx = 0;
	const sy = 0;
    this.setFrame(sx, sy, sw, sh);
	if(!this._startHidden) {
		if(this._startDelay <= 0) this.show();
		this._needsUpdate = true;
	}
};
//-----------------------------------------------------------------------------
// Set the frame dimensions
//-----------------------------------------------------------------------------
CGMZ_Sprite_BattlebackAnimation.prototype.setFrameDimensions = function() {
	if(this._frameWidth <= 0) this._frameWidth = this._bitmap.width;
	if(this._frameHeight <= 0) this._frameHeight = this._bitmap.height;
};
//-----------------------------------------------------------------------------
// Calculate max amount of frames
//-----------------------------------------------------------------------------
CGMZ_Sprite_BattlebackAnimation.prototype.calculateMaxFrames = function() {
	this._framesPerRow = Math.floor(this._bitmap.width / this._frameWidth);
	this._frameRows = Math.floor(this._bitmap.height / this._frameHeight);
	this._maxFrames = this._framesPerRow * this._frameRows - 1;
};
//-----------------------------------------------------------------------------
// Handle Request
//-----------------------------------------------------------------------------
CGMZ_Sprite_BattlebackAnimation.prototype.handleRequest = function(type, options) {
    switch(type) {
		case 'show': this.showAnimation(); break;
		case 'hide': this.hideAnimation(); break;
	}
};
//-----------------------------------------------------------------------------
// Show the animation
//-----------------------------------------------------------------------------
CGMZ_Sprite_BattlebackAnimation.prototype.showAnimation = function() {
    this.show();
	this._needsUpdate = true;
};
//-----------------------------------------------------------------------------
// Hide the animation
//-----------------------------------------------------------------------------
CGMZ_Sprite_BattlebackAnimation.prototype.hideAnimation = function() {
    this.hide();
	this._needsUpdate = false;
};
//-----------------------------------------------------------------------------
// Update sprite
//-----------------------------------------------------------------------------
CGMZ_Sprite_BattlebackAnimation.prototype.update = function() {
    Sprite.prototype.update.call(this);
	if(!this._needsUpdate) return;
	this.updateWaitCount();
	this.updateFrame();
	this.updatePosition();
	this.updateScale();
	this.updateFlicker();
};
//-----------------------------------------------------------------------------
// Update the wait count
//-----------------------------------------------------------------------------
CGMZ_Sprite_BattlebackAnimation.prototype.updateWaitCount = function() {
	if(this._startDelay > 0) {
		this._startDelay--;
		if(this._startDelay <= 0) this.show();
		return;
	}
	if(this._replayDelay > 0) {
		this._replayDelay--;
		if(this._replayDelay <= 0) this.show();
		return;
	}
	this._waitCounter++;
};
//-----------------------------------------------------------------------------
// Update frame of animation
//-----------------------------------------------------------------------------
CGMZ_Sprite_BattlebackAnimation.prototype.updateFrame = function() {
	if(this._waitCounter > this._frameDelay) {
		this._waitCounter = 0;
		this.changeFrame();
	}
};
//-----------------------------------------------------------------------------
// Change the animation frame
//-----------------------------------------------------------------------------
CGMZ_Sprite_BattlebackAnimation.prototype.changeFrame = function() {
	if(this._currentFrame + 1 > this._maxFrames) {
		this._currentFrame = -1;
		this._replayDelay = this._targetReplayDelay;
		if(this._replayDelay > 0) this.hide();
	}
	this._currentFrame++;
	const sw = this._frameWidth;
	const sh = this._frameHeight;
	const sx = this._currentFrame % this._framesPerRow * sw;
	const sy = Math.floor(this._currentFrame / this._framesPerRow) * sh;
    this.setFrame(sx, sy, sw, sh);
};
//-----------------------------------------------------------------------------
// Update position of sprite on screen
//-----------------------------------------------------------------------------
CGMZ_Sprite_BattlebackAnimation.prototype.updatePosition = function() {
	this.x = this._home.x;
    this.y = this._home.y;
};
//-----------------------------------------------------------------------------
// Update scale of sprite
//-----------------------------------------------------------------------------
CGMZ_Sprite_BattlebackAnimation.prototype.updateScale = function() {
	this.scale.x = this._homeScale.x;
	this.scale.y = this._homeScale.y;
};
//-----------------------------------------------------------------------------
// Update flicker of sprite
//-----------------------------------------------------------------------------
CGMZ_Sprite_BattlebackAnimation.prototype.updateFlicker = function() {
	if(!this._opacityFlicker) return;
	this._flickerCounter--;
	if(this._flickerCounter <= 0) {
		this._flickerCounter = this._opacityFlickerFrames;
		this.opacity = CGMZ_Utils.applyVariance(this._opacityBase, this._opacityFlicker + 1).clamp(0, 255);
	}
};