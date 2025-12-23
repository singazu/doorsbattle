//=============================================================================
// VisuStella MZ - Map Damage Effect
// VisuMZ_4_MapDamageEffect.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_MapDamageEffect = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MapDamageEffect = VisuMZ.MapDamageEffect || {};
VisuMZ.MapDamageEffect.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.02] [MapDamageEffect]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Map_Damage_Effect_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin changes the cheap-looking red flash when taking floor damage or
 * slip damage on the map to something more elegant looking or allows you to
 * utilize a custom image in place of it. The effect can vary depending on the
 * region the player is currently standing on to the slip state the effect is
 * originating from.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Pre-rendered damage gradient that is easier on the eyes for those not
 *   using any custom images for their map effects.
 * * Custom images can be used for a more personal touch.
 * * Map Damage Effects can vary depending on the regions the player is
 *   currently standing when taking floor damage.
 * * Map Damage Effects can vary depending on the states damaging the player
 *   when taking damage from them on the map.
 * * Use Plugin Commands to artificially prompt the Map Damage Effect for
 *   custom created damage events.
 * * Certain region-marked tiles can inflict states on the player's party by
 *   simply stepping on them.
 * * Utilize custom floor damage formulas for region-marked tiles to make some
 *   tiles more dangerous than others.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Basic Floor Damage Calculations
 * 
 * Any changes made to floor damage calculations are overwritten in favor of
 * this plugin's ability to allow custom floor damage based on regions by using
 * the notetags available through this plugin.
 *
 * ---
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine
 *
 * The "Once Parallel" feature of the Core Engine can be used and be triggered
 * upon taking Floor Damage or Slip Damage while on the map scene. Once
 * Parallel events will run in the background like a parallel process, except
 * that it does not repeat after finishing.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === Custom Tile Effect-Related Notetags ===
 * 
 * ---
 * 
 * <Floor State Region x: id>
 * <Floor State Region x: id, id, id>
 * <Floor State Region x: name>
 * <Floor State Region x: name, name, name>
 * 
 * - Used for: Map Notetags
 * - When stepping onto a tile marked by region 'x', afflict all party members
 *   with the associated state(s).
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
 * - Replace 'x' with a number (0 to 255) representing the Region ID used to
 *   mark the floor damage tiles with this Map Damage Effect.
 * - Replace 'id' with a number representing the ID of the state to afflict
 *   upon all party members.
 * - Replace 'name' with the name of the state(s) to afflict all party members.
 * 
 * ---
 * 
 * === JavaScript Notetags: Custom Floor Damage ===
 * 
 * ---
 * 
 * <Floor Damage Formula Region x>
 *  code
 *  code
 *  damage = code
 * </Floor Damage Formula Region x>
 * 
 * - Used for: Map Notetags
 * - Determines the amount of damage to deal to each actor when this Map Damage
 *   Effect triggers. Also changes any tile marked by region 'x' into a damage
 *   tile regardless of its setting in the database's tileset.
 * - Replace 'x' with a number (0 to 255) representing the Region ID used to
 *   mark the floor damage tiles with this Map Damage Effect.
 * - The 'damage' variable is returned to determine how much damage the actor
 *   will receive as floor damage (before being affected by the actor's FDR).
 * - Replace 'code' with JavaScript code used to calculate the 'damage'.
 * - The 'a' variable represents the actor receiving the damage.
 * - The 'user' variable represents the actor receiving the damage.
 * 
 * ---
 * 
 * === Floor Damage Effect-Related Notetags ===
 * 
 * ---
 *
 * <Map Damage Effect Region x Color: #rrggbb>
 * <Damage Region x Color: #rrggbb>
 *
 * - Used for: Map Notetags
 * - When taking damage from tiles marked by 'x' region, play a custom color.
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
 * - Replace 'x' with a number (0 to 255) representing the Region ID used to
 *   mark the floor damage tiles with this Map Damage Effect.
 * - Replace 'rr' with a hexadecimal value for red.
 * - Replace 'gg' with a hexadecimal value for green.
 * - Replace 'bb' with a hexadecimal value for blue.
 * - Leave the '#' in place.
 * - If you are unsure of what hexadecimal value your color is, please use an
 *   online site like: https://htmlcolorcodes.com/
 * - When using this notetag, custom images won't be used.
 *
 * ---
 *
 * <Map Damage Effect Region x Gradient Length: y>
 * <Damage Region x Gradient Length: y>
 *
 * - Used for: Map Notetags
 * - Changes the gradient length of the pre-render effect.
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
 * - Replace 'x' with a number (0 to 255) representing the Region ID used to
 *   mark the floor damage tiles with this Map Damage Effect.
 * - Replace 'y' with a number representing in pixels how long the gradient
 *   length is.
 *
 * ---
 *
 * <Map Damage Effect Region x Image: filename>
 * <Damage Region x Image: filename>
 *
 * - Used for: Map Notetags
 * - Uses a custom image found in the img/pictures/ folder of your game project
 *   to use when taking floor damage on these region-marked tiles.
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
 * - Replace 'x' with a number (0 to 255) representing the Region ID used to
 *   mark the floor damage tiles with this Map Damage Effect.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 * - If this notetag is used, ignore the hex color and gradient notetags.
 *
 * ---
 *
 * <Map Damage Effect Region x Opacity: y>
 * <Damage Region x Opacity: y>
 *
 * - Used for: Map Notetags
 * - Adjusts the starting opacity to 'y' for this region-marked-tile's
 *   Map Damage Effect.
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
 * - Replace 'x' with a number (0 to 255) representing the Region ID used to
 *   mark the floor damage tiles with this Map Damage Effect.
 * - Replace 'y' with a number (0 to 255) representing the starting opacity
 *   used by the region-marked-tile's Map Damage Effect.
 *
 * ---
 *
 * <Map Damage Effect Region x Opacity: y%>
 * <Damage Region x Opacity: y%>
 *
 * - Used for: Map Notetags
 * - Adjusts the starting opacity to 'y%' for this region-marked-tile's
 *   Map Damage Effect.
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
 * - Replace 'x' with a number (0 to 255) representing the Region ID used to
 *   mark the floor damage tiles with this Map Damage Effect.
 * - Replace 'y' with a percent (0% to 100%) representing the starting opacity
 *   used by the region-marked-tile's Map Damage Effect.
 *
 * ---
 *
 * <Map Damage Effect Region x Duration: y>
 * <Damage Region x Duration: y>
 *
 * - Used for: Map Notetags
 * - Alters the duration for this region-marked-tile's Map Damage Effect.
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
 * - Replace 'x' with a number (0 to 255) representing the Region ID used to
 *   mark the floor damage tiles with this Map Damage Effect.
 * - Replace 'y' with a number representing the duration of the Map Damage
 *   Effect in frames where 60 frames is equal to 1 second.
 *
 * ---
 *
 * <Map Damage Effect Region x Blend Mode: Normal>
 * <Map Damage Effect Region x Blend Mode: Additive>
 * <Map Damage Effect Region x Blend Mode: Multiply>
 * <Map Damage Effect Region x Blend Mode: Screen>
 * <Damage Region x Blend Mode: Normal>
 * <Damage Region x Blend Mode: Additive>
 * <Damage Region x Blend Mode: Multiply>
 * <Damage Region x Blend Mode: Screen>
 *
 * - Used for: Map Notetags
 * - Changes the blend mode used for the region-marked-tile's Map Damage Effect
 *   sprite to mesh with the map screen differently.
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
 * - Replace 'x' with a number (0 to 255) representing the Region ID used to
 *   mark the floor damage tiles with this Map Damage Effect.
 *
 * ---
 *
 * <Map Damage Effect Region x Once Parallel: y>
 * <Damage Region x Once Parallel: y>
 *
 * - Used for: Map Notetags
 * - Requires VisuMZ_0_CoreEngine!
 * - Causes a region-marked-tile's Map Damage Effect to also launch a Once
 *   Parallel from the VisuMZ Core Engine.
 *   - A Once Parallel is a Common Event that occurs as a one-time parallel
 *     process event that does not loop.
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
 * - Replace 'x' with a number (0 to 255) representing the Region ID used to
 *   mark the floor damage tiles with this Map Damage Effect.
 * - Replace 'y' with a number representing the ID of the Common Event to run
 *   as a Once Parallel.
 *
 * ---
 * 
 * === State Damage-Related Notetags ===
 * 
 * ---
 *
 * <Map Damage Effect Color: #rrggbb>
 * <Damage Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - When taking damage from states on the map, play a custom color.
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
 * - Replace 'rr' with a hexadecimal value for red.
 * - Replace 'gg' with a hexadecimal value for green.
 * - Replace 'bb' with a hexadecimal value for blue.
 * - Leave the '#' in place.
 * - If you are unsure of what hexadecimal value your color is, please use an
 *   online site like: https://htmlcolorcodes.com/
 * - When using this notetag, custom images won't be used.
 * - If an actor has multiple damage states, the damage state with a Map Damage
 *   Effect and the highest priority will take effect.
 *
 * ---
 *
 * <Map Damage Effect Gradient Length: y>
 * <Damage Gradient Length: y>
 *
 * - Used for: State Notetags
 * - Changes the gradient length of the pre-render effect.
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
 * - Replace 'y' with a number representing in pixels how long the gradient
 *   length is.
 * - If an actor has multiple damage states, the damage state with a Map Damage
 *   Effect and the highest priority will take effect.
 *
 * ---
 *
 * <Map Damage Effect Image: filename>
 * <Damage Image: filename>
 *
 * - Used for: State Notetags
 * - Uses a custom image found in the img/pictures/ folder of your game project
 *   to use when taking damage from states on the map.
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 * - If an actor has multiple damage states, the damage state with a Map Damage
 *   Effect and the highest priority will take effect.
 * - If this notetag is used, ignore the hex color and gradient notetags.
 *
 * ---
 *
 * <Map Damage Effect Opacity: y>
 * <Damage Opacity: y>
 *
 * - Used for: State Notetags
 * - Adjusts the starting opacity to 'y' for this damage state's
 *   Map Damage Effect.
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
 * - Replace 'y' with a number (0 to 255) representing the starting opacity
 *   used by the region-marked-tile's Map Damage Effect.
 * - If an actor has multiple damage states, the damage state with a Map Damage
 *   Effect and the highest priority will take effect.
 *
 * ---
 *
 * <Map Damage Effect Opacity: y%>
 * <Damage Opacity: y%>
 *
 * - Used for: State Notetags
 * - Adjusts the starting opacity to 'y%' for this damage state's
 *   Map Damage Effect.
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
 * - Replace 'y' with a percent (0% to 100%) representing the starting opacity
 *   used by the region-marked-tile's Map Damage Effect.
 * - If an actor has multiple damage states, the damage state with a Map Damage
 *   Effect and the highest priority will take effect.
 *
 * ---
 *
 * <Map Damage Effect Duration: y>
 * <Damage Duration: y>
 *
 * - Used for: State Notetags
 * - Alters the duration for this damage state's Map Damage Effect.
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
 * - Replace 'y' with a number representing the duration of the Map Damage
 *   Effect in frames where 60 frames is equal to 1 second.
 * - If an actor has multiple damage states, the damage state with a Map Damage
 *   Effect and the highest priority will take effect.
 *
 * ---
 *
 * <Map Damage Effect Blend Mode: Normal>
 * <Map Damage Effect Blend Mode: Additive>
 * <Map Damage Effect Blend Mode: Multiply>
 * <Map Damage Effect Blend Mode: Screen>
 * <Damage Blend Mode: Normal>
 * <Damage Blend Mode: Additive>
 * <Damage Blend Mode: Multiply>
 * <Damage Blend Mode: Screen>
 *
 * - Used for: State Notetags
 * - Changes the blend mode used for the damage state's Map Damage Effect
 *   sprite to mesh with the map screen differently.
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
 * - If an actor has multiple damage states, the damage state with a Map Damage
 *   Effect and the highest priority will take effect.
 *
 * ---
 *
 * <Map Damage Effect Once Parallel: y>
 * <Damage Once Parallel: y>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_0_CoreEngine!
 * - Causes the damage state's Map Damage Effect to also launch a Once
 *   Parallel from the VisuMZ Core Engine.
 *   - A Once Parallel is a Common Event that occurs as a one-time parallel
 *     process event that does not loop.
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
 * - Replace 'y' with a number representing the ID of the Common Event to run
 *   as a Once Parallel.
 * - If an actor has multiple damage states, the damage state with a Map Damage
 *   Effect and the highest priority will take effect.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Visual Plugin Commands ===
 * 
 * ---
 *
 * Visual: Map Damage Effect
 * - Produces the visual Map Damage Effect without any damage tied to it.
 * 
 *   Damage Appearance:
 *
 *     Hex Color:
 *     - Use #rrggbb for custom colors.
 *
 *       Gradient Length:
 *       - What is the length of the gradient effect?
 *
 *     Image Filename:
 *     - Filename of the map damage effect.
 *     - Using this will ignore "Hex Color" and "Gradient Length".
 * 
 *   Damage Animation
 *
 *     Opacity:
 *     - What is the starting opacity before fading?
 *
 *     Total Duration:
 *     - How many frames should the animation be played?
 *
 *     Blend Mode:
 *     - The blend mode used for map damage effect.
 *
 *     Once Parallel:
 *     - Plays this Common Event as a "Once Parallel" upon trigger.
 *     - Requires VisuMZ_0_CoreEngine!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These settings found in the Plugin Parameters will determine the default
 * settings used across Floor-based Map Damage Effect types and Slip
 * State-based Map Damage Effect types.
 *
 * ---
 *
 * Floor
 * 
 *   Damage Appearance:
 *
 *     Hex Color:
 *     - Use #rrggbb for custom colors.
 *
 *       Gradient Length:
 *       - What is the length of the gradient effect?
 *
 *     Image Filename:
 *     - Filename of the map damage effect.
 *     - Using this will ignore "Hex Color" and "Gradient Length".
 * 
 *   Damage Animation
 *
 *     Opacity:
 *     - What is the starting opacity before fading?
 *
 *     Total Duration:
 *     - How many frames should the animation be played?
 *
 *     Blend Mode:
 *     - The blend mode used for map damage effect.
 *
 *     Once Parallel:
 *     - Plays this Common Event as a "Once Parallel" upon trigger.
 *     - Requires VisuMZ_0_CoreEngine!
 *
 * ---
 *
 * Slip-State
 * 
 *   Damage Appearance:
 *
 *     Hex Color:
 *     - Use #rrggbb for custom colors.
 *
 *       Gradient Length:
 *       - What is the length of the gradient effect?
 *
 *     Image Filename:
 *     - Filename of the map damage effect.
 *     - Using this will ignore "Hex Color" and "Gradient Length".
 * 
 *   Damage Animation
 *
 *     Opacity:
 *     - What is the starting opacity before fading?
 *
 *     Total Duration:
 *     - How many frames should the animation be played?
 *
 *     Blend Mode:
 *     - The blend mode used for map damage effect.
 *
 *     Once Parallel:
 *     - Plays this Common Event as a "Once Parallel" upon trigger.
 *     - Requires VisuMZ_0_CoreEngine!
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.02: December 15, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.01: October 20, 2022
 * * Bug Fixes!
 * ** Fixed a bug where the <Floor Damage Formula Region x> notetag wasn't
 *    working properly. Fix made by Arisu.
 * ** Fixed a bug where the graphics didn't scale according to the screen scale
 *    properly. Fix made by Arisu.
 * 
 * Version 1.00 Official Release Date: November 4, 2022
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VisualMapDamageEffect
 * @text Visual: Map Damage Effect
 * @desc Produces the visual Map Damage Effect without any damage tied to it.
 * 
 * @arg Appearance
 * @text Damage Appearance
 *
 * @arg HexColor:str
 * @text Hex Color
 * @parent Appearance
 * @desc Use #rrggbb for custom colors.
 * @default #ed1c24
 * 
 * @arg GradientLength:num
 * @text Gradient Length
 * @parent HexColor:str
 * @type number
 * @min 1
 * @desc What is the length of the gradient effect?
 * @default 128
 *
 * @arg ImageFilename:str
 * @text Image Filename
 * @parent Appearance
 * @type file
 * @dir img/pictures/
 * @require 1
 * @desc Filename of the map damage effect.
 * Using this will ignore "Hex Color" and "Gradient Length".
 * @default 
 * 
 * @arg Animation
 * @text Damage Animation
 * 
 * @arg Opacity:num
 * @text Opacity
 * @parent Animation
 * @type number
 * @min 1
 * @max 255
 * @desc What is the starting opacity before fading?
 * @default 192
 * 
 * @arg Duration:num
 * @text Total Duration
 * @parent Animation
 * @type number
 * @min 1
 * @desc How many frames should the animation be played?
 * @default 64
 *
 * @arg BlendMode:num
 * @text Blend Mode
 * @parent Animation
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used for map damage effect.
 * @default 0
 * 
 * @arg OnceParallel:num
 * @text Once Parallel
 * @parent Animation
 * @type common_event
 * @desc Plays this Common Event as a "Once Parallel" upon trigger.
 * Requires VisuMZ_0_CoreEngine!
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MapDamageEffect
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param FloorAppearance
 * @text Floor Damage Appearance
 *
 * @param FloorHexColor:str
 * @text Hex Color
 * @parent FloorAppearance
 * @desc Use #rrggbb for custom colors.
 * @default #ed1c24
 * 
 * @param FloorGradientLength:num
 * @text Gradient Length
 * @parent FloorHexColor:str
 * @type number
 * @min 1
 * @desc What is the length of the gradient effect?
 * @default 128
 *
 * @param FloorImageFilename:str
 * @text Image Filename
 * @parent FloorAppearance
 * @type file
 * @dir img/pictures/
 * @require 1
 * @desc Filename of the map damage effect.
 * Using this will ignore "Hex Color" and "Gradient Length".
 * @default 
 * 
 * @param FloorAnimation
 * @text Floor Damage Animation
 * 
 * @param FloorOpacity:num
 * @text Start Opacity
 * @parent FloorAnimation
 * @type number
 * @min 1
 * @max 255
 * @desc What is the starting opacity before fading?
 * @default 192
 * 
 * @param FloorDuration:num
 * @text Total Duration
 * @parent FloorAnimation
 * @type number
 * @min 1
 * @desc How many frames should the animation be played?
 * @default 64
 *
 * @param FloorBlendMode:num
 * @text Blend Mode
 * @parent FloorAnimation
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used for map damage effect.
 * @default 0
 * 
 * @param FloorOnceParallel:num
 * @text Once Parallel
 * @parent FloorAnimation
 * @type common_event
 * @desc Plays this Common Event as a "Once Parallel" upon trigger.
 * Requires VisuMZ_0_CoreEngine!
 * @default 0
 * 
 * @param SlipAppearance
 * @text Slip Damage Appearance
 *
 * @param SlipHexColor:str
 * @text Hex Color
 * @parent SlipAppearance
 * @desc Use #rrggbb for custom colors.
 * @default #8560a8
 * 
 * @param SlipGradientLength:num
 * @text Gradient Length
 * @parent SlipHexColor:str
 * @type number
 * @min 1
 * @desc What is the length of the gradient effect?
 * @default 128
 *
 * @param SlipImageFilename:str
 * @text Image Filename
 * @parent SlipAppearance
 * @type file
 * @dir img/pictures/
 * @require 1
 * @desc Filename of the map damage effect.
 * Using this will ignore "Hex Color" and "Gradient Length".
 * @default 
 * 
 * @param SlipAnimation
 * @text Slip Damage Animation
 * 
 * @param SlipOpacity:num
 * @text Start Opacity
 * @parent SlipAnimation
 * @type number
 * @min 1
 * @max 255
 * @desc What is the starting opacity before fading?
 * @default 192
 * 
 * @param SlipDuration:num
 * @text Total Duration
 * @parent SlipAnimation
 * @type number
 * @min 1
 * @desc How many frames should the animation be played?
 * @default 64
 *
 * @param SlipBlendMode:num
 * @text Blend Mode
 * @parent SlipAnimation
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used for map damage effect.
 * @default 0
 * 
 * @param SlipOnceParallel:num
 * @text Once Parallel
 * @parent SlipAnimation
 * @type common_event
 * @desc Plays this Common Event as a "Once Parallel" upon trigger.
 * Requires VisuMZ_0_CoreEngine!
 * @default 0
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
//=============================================================================

const _0xbf25d4=_0x31ad;function _0x11fb(){const _0x4bd78e=['FWTNf','clearResult','SlipDuration','swTqL','BLEND_MODES','startCustomMapDamageEffect','refresh','XguHg','return\x200','constructor','registerCommand','Spriteset_Map_createLowerLayer','ofHAe','prepareMapDamageEffectsBlendMode','trim','clearMapDamageEffect','isPlaySlipMapDamageEffect','Game_Actor_executeFloorDamage','status','BlendMode','zoomScale','pop','Game_Screen_update','regionId','_floorStateRegions','SlipBlendMode','Dryqh','update','damage','HexColor','6DnJcGs','allMembers','includes','startSlipMapDamageEffect','description','2719977bBQVzW','43745ftfTdY','match','setupFloorStateEffects','format','log','RegExp','map','isPlayFloorMapDamageEffect','dTGuK','#ffffff','jAbSI','parse','SlipOpacity','addChild','ARRAYJSON','blendModeParser','ImageFilename','547192WuvLKh','_lastMapDamageRegion','ARRAYSTR','performCollapse','substring','Game_Actor_checkFloorEffect','FUNC','bitmap','updateMapDamageEffect','multiply','PxVJn','_mapDamageOpacity','createMapDamageEffect','NORMAL','dTBeR','duration','isOnStateFloor','note','#8560a8','7Fjwssz','split','SlipGradientLength','test','TLiBE','clear','gbaHR','MAP_DAMAGE_EFFECT_CONSTANT','name','updateMapDamageEffectImage','gradientFillRect','customDmgFormula','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','states','ceil','_mapDamageSprite','tSsOE','aAoAn','customState','add','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','MapDamageEffect','#ed1c24','SlipHexColor','4506795LrtwYt','VisualMapDamageEffect','updateMapDamageEffectOpacity','parseMapDamageNotetagValue','RyPwA','30472750zpKaOU','_executeFloorDamage','rgba(','NZhLK','setupMapDamageEffectImage','SlipOnceParallel','opacity','Game_Screen_onBattleStart','SLIP_DAMAGE_EFFECT','join','exit','Duration','slip','XaQVJ','Game_Screen_startFlashForDamage','NUM','needsUpdateMapDamageEffectImage','Game_Map_setup','isDead','getFirstSlipStateWithMapDamageEffect','parameters','cacheMapDamageEffects','oDnAz','Spriteset_Map_update','JSON','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','any','hexToRgba','ADD','isPlaytest','Azwne','filter','ARRAYEVAL','_mapDamageFormulaRegions','VisuMZ_0_CoreEngine','getStateIdWithName','floor','_scene','Game_Actor_turnEndOnMap','prototype','gradientLength','max','setupMapDamageEffects','XWWpq','onBattleStart','getMapDamageEffectSettings','gEzSG','FloorDuration','FloorOnceParallel','ToQqa','prepareMapDamageEffectsBitmap','7NDiiSI','FloorHexColor','setMapDamageEffectSetting','executeFloorStates','ConvertParams','setupCustomFloorDamageFormula','basicFloorDamage','MULTIPLY','isStateResist','_mapDamageEffectRegions','_lastMapDamageStateID','Settings','toUpperCase','startFlashForDamage','_mapDamageStateID','uAtjn','Game_Player_isOnDamageFloor','_mapDamageStallDuration','DfWhF','BArqM','_mapDamageDuration','length','getCustomFloorDamageAtRegion','HSTyC','OnceParallel','loadPicture','width','vKxMH','SCREEN','_stateIDs','turnEndOnMap','FloorOpacity','clamp','GradientLength','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20v\x20=\x20$gameVariables._data;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20target\x20=\x20this;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','_turnEndOnMap','executeFloorDamage','initMapDamageEffects','updateMapDamageEffectScale','_mapDamageRegionID','addState','startFloorMapDamageEffect','checkFloorEffect','1052328pcujot','normal','207076ngTZsU','stringify','_spriteset','height','QfVdL','setup','isSceneMap','Game_Actor_basicFloorDamage','getFloorStatesAtRegion','FloorBlendMode','imgFilename','scale','call','MAP_DAMAGE_EFFECT','ocRGR','onceParallel','blendMode','FloorImageFilename','XnLCG','aMnRR','KZdkO','Game_Screen_clear','hexColor','push'];_0x11fb=function(){return _0x4bd78e;};return _0x11fb();}function _0x31ad(_0x3bad8c,_0x279826){const _0x11fbeb=_0x11fb();return _0x31ad=function(_0x31ade6,_0x5a4001){_0x31ade6=_0x31ade6-0xac;let _0x4a7ebe=_0x11fbeb[_0x31ade6];return _0x4a7ebe;},_0x31ad(_0x3bad8c,_0x279826);}(function(_0x190386,_0x1c821f){const _0x3979d3=_0x31ad,_0xbd6ee9=_0x190386();while(!![]){try{const _0x493852=parseInt(_0x3979d3(0x13f))/0x1*(-parseInt(_0x3979d3(0xdf))/0x2)+-parseInt(_0x3979d3(0x11a))/0x3+-parseInt(_0x3979d3(0xdd))/0x4+-parseInt(_0x3979d3(0x11b))/0x5*(parseInt(_0x3979d3(0x115))/0x6)+-parseInt(_0x3979d3(0xb2))/0x7*(parseInt(_0x3979d3(0x12c))/0x8)+-parseInt(_0x3979d3(0x157))/0x9+parseInt(_0x3979d3(0x15c))/0xa;if(_0x493852===_0x1c821f)break;else _0xbd6ee9['push'](_0xbd6ee9['shift']());}catch(_0x4db205){_0xbd6ee9['push'](_0xbd6ee9['shift']());}}}(_0x11fb,0x8c591));var label=_0xbf25d4(0x154),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0xbf25d4(0x17b)](function(_0x3bead7){const _0x3afcc9=_0xbf25d4;return _0x3bead7[_0x3afcc9(0x109)]&&_0x3bead7[_0x3afcc9(0x119)][_0x3afcc9(0x117)]('['+label+']');})[0x0];VisuMZ[label][_0xbf25d4(0xbd)]=VisuMZ[label][_0xbf25d4(0xbd)]||{},VisuMZ['ConvertParams']=function(_0x1c5208,_0x3ea526){const _0x4f0a0b=_0xbf25d4;for(const _0x42e70d in _0x3ea526){if(_0x42e70d[_0x4f0a0b(0x11c)](/(.*):(.*)/i)){const _0x32b4a2=String(RegExp['$1']),_0x2d6ab6=String(RegExp['$2'])['toUpperCase']()[_0x4f0a0b(0x105)]();let _0x55cb67,_0x3c16e6,_0x2a7e4d;switch(_0x2d6ab6){case _0x4f0a0b(0x16b):_0x55cb67=_0x3ea526[_0x42e70d]!==''?Number(_0x3ea526[_0x42e70d]):0x0;break;case'ARRAYNUM':_0x3c16e6=_0x3ea526[_0x42e70d]!==''?JSON[_0x4f0a0b(0x126)](_0x3ea526[_0x42e70d]):[],_0x55cb67=_0x3c16e6[_0x4f0a0b(0x121)](_0x3c51f4=>Number(_0x3c51f4));break;case'EVAL':_0x55cb67=_0x3ea526[_0x42e70d]!==''?eval(_0x3ea526[_0x42e70d]):null;break;case _0x4f0a0b(0x17c):_0x3c16e6=_0x3ea526[_0x42e70d]!==''?JSON[_0x4f0a0b(0x126)](_0x3ea526[_0x42e70d]):[],_0x55cb67=_0x3c16e6[_0x4f0a0b(0x121)](_0xca29bf=>eval(_0xca29bf));break;case _0x4f0a0b(0x174):_0x55cb67=_0x3ea526[_0x42e70d]!==''?JSON[_0x4f0a0b(0x126)](_0x3ea526[_0x42e70d]):'';break;case _0x4f0a0b(0x129):_0x3c16e6=_0x3ea526[_0x42e70d]!==''?JSON[_0x4f0a0b(0x126)](_0x3ea526[_0x42e70d]):[],_0x55cb67=_0x3c16e6['map'](_0x155f61=>JSON[_0x4f0a0b(0x126)](_0x155f61));break;case _0x4f0a0b(0x132):_0x55cb67=_0x3ea526[_0x42e70d]!==''?new Function(JSON[_0x4f0a0b(0x126)](_0x3ea526[_0x42e70d])):new Function(_0x4f0a0b(0xff));break;case'ARRAYFUNC':_0x3c16e6=_0x3ea526[_0x42e70d]!==''?JSON[_0x4f0a0b(0x126)](_0x3ea526[_0x42e70d]):[],_0x55cb67=_0x3c16e6[_0x4f0a0b(0x121)](_0x456d3c=>new Function(JSON['parse'](_0x456d3c)));break;case'STR':_0x55cb67=_0x3ea526[_0x42e70d]!==''?String(_0x3ea526[_0x42e70d]):'';break;case _0x4f0a0b(0x12e):_0x3c16e6=_0x3ea526[_0x42e70d]!==''?JSON[_0x4f0a0b(0x126)](_0x3ea526[_0x42e70d]):[],_0x55cb67=_0x3c16e6['map'](_0x57fe6e=>String(_0x57fe6e));break;case'STRUCT':_0x2a7e4d=_0x3ea526[_0x42e70d]!==''?JSON[_0x4f0a0b(0x126)](_0x3ea526[_0x42e70d]):{},_0x55cb67=VisuMZ['ConvertParams']({},_0x2a7e4d);break;case'ARRAYSTRUCT':_0x3c16e6=_0x3ea526[_0x42e70d]!==''?JSON[_0x4f0a0b(0x126)](_0x3ea526[_0x42e70d]):[],_0x55cb67=_0x3c16e6[_0x4f0a0b(0x121)](_0x36d0d5=>VisuMZ[_0x4f0a0b(0xb6)]({},JSON[_0x4f0a0b(0x126)](_0x36d0d5)));break;default:continue;}_0x1c5208[_0x32b4a2]=_0x55cb67;}}return _0x1c5208;},(_0x260b2f=>{const _0x4a4d37=_0xbf25d4,_0xa08500=_0x260b2f['name'];for(const _0x5a860e of dependencies){if(_0x4a4d37(0xb0)!=='kVUfX'){if(!Imported[_0x5a860e]){alert(_0x4a4d37(0x14b)[_0x4a4d37(0x11e)](_0xa08500,_0x5a860e)),SceneManager[_0x4a4d37(0x166)]();break;}}else{if(this['_mapDamageSprite'])return;this[_0x4a4d37(0x14e)]=new _0x103ae0(),this['addChild'](this['_mapDamageSprite']),this[_0x4a4d37(0x12d)]=-0x1,this['_lastMapDamageStateID']=-0x1;if(_0x954281)_0xdce5a6[_0x4a4d37(0xd9)]=-0x1;if(_0x3c4570)_0x5d17b8[_0x4a4d37(0xc0)]=-0x1;}}const _0x366f97=_0x260b2f[_0x4a4d37(0x119)];if(_0x366f97['match'](/\[Version[ ](.*?)\]/i)){const _0x144088=Number(RegExp['$1']);if(_0x144088!==VisuMZ[label]['version']){if(_0x4a4d37(0x172)!==_0x4a4d37(0x172)){if(!this[_0x4a4d37(0x14e)])return;this[_0x4a4d37(0x148)](),this['updateMapDamageEffectOpacity'](),this[_0x4a4d37(0xd8)]();}else alert(_0x4a4d37(0x153)[_0x4a4d37(0x11e)](_0xa08500,_0x144088)),SceneManager[_0x4a4d37(0x166)]();}}if(_0x366f97[_0x4a4d37(0x11c)](/\[Tier[ ](\d+)\]/i)){const _0x1d9a09=Number(RegExp['$1']);_0x1d9a09<tier?(alert(_0x4a4d37(0x175)['format'](_0xa08500,_0x1d9a09,tier)),SceneManager[_0x4a4d37(0x166)]()):'tSsOE'===_0x4a4d37(0x14f)?tier=Math[_0x4a4d37(0x185)](_0x1d9a09,tier):_0x46de99=_0x179573[_0x4a4d37(0x185)](_0x49dc73,_0x428d94);}VisuMZ[_0x4a4d37(0xb6)](VisuMZ[label][_0x4a4d37(0xbd)],_0x260b2f[_0x4a4d37(0x170)]);})(pluginData),PluginManager[_0xbf25d4(0x101)](pluginData['name'],_0xbf25d4(0x158),_0x2da01d=>{const _0x527a2d=_0xbf25d4;if(!SceneManager[_0x527a2d(0xe5)]())return;VisuMZ[_0x527a2d(0xb6)](_0x2da01d,_0x2da01d);const _0x2be995={'hexColor':_0x2da01d[_0x527a2d(0x114)]||'#ed1c24','gradientLength':_0x2da01d[_0x527a2d(0xd3)]||0x1,'imgFilename':_0x2da01d[_0x527a2d(0x12b)]||'','opacity':_0x2da01d['Opacity']||0x1,'duration':_0x2da01d[_0x527a2d(0x167)]||0x1,'blendMode':_0x2da01d[_0x527a2d(0x10a)]||0x0,'onceParallel':_0x2da01d[_0x527a2d(0xca)]||0x0};$gameScreen[_0x527a2d(0xfc)](_0x2be995);const _0x27e7dd=SceneManager[_0x527a2d(0x181)][_0x527a2d(0xe1)];_0x27e7dd&&_0x27e7dd[_0x527a2d(0x160)](_0x2be995);}),VisuMZ[_0xbf25d4(0x154)][_0xbf25d4(0x120)]={'floor':{'hexColor':/<(?:MAP |)(?:DMG|DAMAGE) (?:EFFECT |)REGION (\d+) (?:COLOR|HEX COLOR):[ ]#(.*)>/gi,'gradientLength':/<(?:MAP |)(?:DMG|DAMAGE) (?:EFFECT |)REGION (\d+) (?:GRADIENT LENGTH|LENGTH):[ ](\d+)>/gi,'imgFilename':/<(?:MAP |)(?:DMG|DAMAGE) (?:EFFECT |)REGION (\d+) (?:IMAGE FILENAME|IMAGE|IMG|FILENAME):[ ](.*)>/gi,'opacity':/<(?:MAP |)(?:DMG|DAMAGE) (?:EFFECT |)REGION (\d+) (?:OPACITY|OP):[ ](\d+)>/gi,'opacityRate':/<(?:MAP |)(?:DMG|DAMAGE) (?:EFFECT |)REGION (\d+) (?:OPACITY|OPACITY RATE):[ ](\d+)([%％])>/gi,'duration':/<(?:MAP |)(?:DMG|DAMAGE) (?:EFFECT |)REGION (\d+) (?:DURATION|DUR):[ ](\d+)>/gi,'blendMode':/<(?:MAP |)(?:DMG|DAMAGE) (?:EFFECT |)REGION (\d+) (?:BLEND MODE|BLEND|BLENDMODE):[ ](.*)>/gi,'onceParallel':/<(?:MAP |)(?:DMG|DAMAGE) (?:EFFECT |)REGION (\d+) (?:ONCE|ONCE PARALLEL|COMMON EVENT):[ ](\d+)>/gi},'slip':{'any':/<(?:MAP |)(?:DMG|DAMAGE) (?:EFFECT |)(.*)>/gi,'hexColor':/<(?:MAP |)(?:DMG|DAMAGE) (?:EFFECT |)(?:COLOR|HEX COLOR):[ ]#(.*)>/gi,'gradientLength':/<(?:MAP |)(?:DMG|DAMAGE) (?:EFFECT |)(?:GRADIENT LENGTH|LENGTH):[ ](\d+)>/gi,'imgFilename':/<(?:MAP |)(?:DMG|DAMAGE) (?:EFFECT |)(?:IMAGE FILENAME|IMAGE|IMG|FILENAME):[ ](.*)>/gi,'opacity':/<(?:MAP |)(?:DMG|DAMAGE) (?:EFFECT |)(?:OPACITY|OP):[ ](\d+)>/gi,'opacityRate':/<(?:MAP |)(?:DMG|DAMAGE) (?:EFFECT |)(?:OPACITY|OPACITY RATE):[ ](\d+)([%％])>/gi,'duration':/<(?:MAP |)(?:DMG|DAMAGE) (?:EFFECT |)(?:DURATION|DUR):[ ](\d+)>/gi,'blendMode':/<(?:MAP |)(?:DMG|DAMAGE) (?:EFFECT |)(?:BLEND MODE|BLEND|BLENDMODE):[ ](.*)>/gi,'onceParallel':/<(?:MAP |)(?:DMG|DAMAGE) (?:EFFECT |)(?:ONCE|ONCE PARALLEL|COMMON EVENT):[ ](\d+)>/gi},'customState':/<FLOOR (?:STATE|STATES) REGION (\d+):[ ](.*)>/gi,'customDmgFormula':/<(?:FLOOR |)(?:DMG|DAMAGE) FORMULA REGION (\d+)>\s*([\s\S]*?)\s*<\/(?:FLOOR |)(?:DMG|DAMAGE) FORMULA REGION (\d+)>/gi},DataManager[_0xbf25d4(0x17f)]=function(_0xae1c7c){const _0x556126=_0xbf25d4;_0xae1c7c=_0xae1c7c[_0x556126(0xbe)]()[_0x556126(0x105)](),this[_0x556126(0xcf)]=this[_0x556126(0xcf)]||{};if(this[_0x556126(0xcf)][_0xae1c7c])return this[_0x556126(0xcf)][_0xae1c7c];for(const _0x31a8d8 of $dataStates){if('swTqL'!==_0x556126(0xfa))_0x1b0e48[_0x556126(0x154)][_0x556126(0x10d)][_0x556126(0xeb)](this),this[_0x556126(0x134)]();else{if(!_0x31a8d8)continue;this['_stateIDs'][_0x31a8d8[_0x556126(0x147)][_0x556126(0xbe)]()['trim']()]=_0x31a8d8['id'];}}return this[_0x556126(0xcf)][_0xae1c7c]||0x0;},DataManager[_0xbf25d4(0xac)]=function(_0x392b93){const _0x192b83=_0xbf25d4,_0x11fa9a=JSON['parse'](JSON[_0x192b83(0xe0)](Game_Actor['SLIP_DAMAGE_EFFECT'])),_0x379113=$dataStates[_0x392b93];if(_0x379113){const _0x254175=_0x379113[_0x192b83(0x13d)]||'',_0x48e3e7=VisuMZ[_0x192b83(0x154)][_0x192b83(0x120)][_0x192b83(0x168)],_0x8544b7=[_0x192b83(0xf5),_0x192b83(0x184),'imgFilename',_0x192b83(0x162),'opacityRate',_0x192b83(0x13b),'blendMode',_0x192b83(0xee)];for(const _0x23e8a8 of _0x8544b7){if(_0x254175[_0x192b83(0x11c)](_0x48e3e7[_0x23e8a8])){const _0x1705e7=DataManager['parseMapDamageNotetagValue'](_0x23e8a8,RegExp['$1']);_0x23e8a8===_0x192b83(0xf5)&&(_0x11fa9a[_0x192b83(0xe9)]=''),_0x11fa9a[_0x23e8a8]=_0x1705e7;}}}return _0x11fa9a;},DataManager['parseMapDamageNotetagValue']=function(_0x26783d,_0x222e8c){const _0x3d116a=_0xbf25d4;if(_0x26783d==='hexColor')_0x222e8c='#'+_0x222e8c;if(_0x26783d==='gradientLength')_0x222e8c=Math[_0x3d116a(0x185)](0x1,Number(_0x222e8c));_0x26783d==='opacityRate'&&(_0x222e8c=Math[_0x3d116a(0x14d)](Number(_0x222e8c)*0.01),_0x26783d=_0x3d116a(0x162));if(_0x26783d===_0x3d116a(0x162))_0x222e8c=Number(_0x222e8c)['clamp'](0x0,0xff);if(_0x26783d===_0x3d116a(0x13b))_0x222e8c=Math[_0x3d116a(0x185)](0x1,Number(_0x222e8c));return _0x26783d===_0x3d116a(0xef)&&(_0x222e8c=ColorManager[_0x3d116a(0x12a)](_0x222e8c)||0x0),_0x26783d===_0x3d116a(0xee)&&(_0x222e8c=Math['max'](0x0,Number(_0x222e8c))),_0x26783d===_0x3d116a(0xe9)&&ImageManager[_0x3d116a(0xcb)](_0x222e8c[_0x3d116a(0x105)]()),_0x222e8c;},ImageManager[_0xbf25d4(0x138)]=function(_0x532e0d,_0x5cf830){const _0x270e14=_0xbf25d4,_0x4a9cfb=ColorManager['hexToRgba'](_0x532e0d,0x1),_0x30564a=ColorManager[_0x270e14(0x177)](_0x532e0d,0x0),_0xb3da46=ColorManager[_0x270e14(0x177)](_0x532e0d,0.2),_0x1e2b19=new Bitmap(Graphics[_0x270e14(0xcc)],Graphics[_0x270e14(0xe2)]);return _0x1e2b19['gradientFillRect'](0x0,0x0,_0x5cf830,Graphics['height'],_0x4a9cfb,_0x30564a,![]),_0x1e2b19[_0x270e14(0x149)](Graphics[_0x270e14(0xcc)]-_0x5cf830,0x0,_0x5cf830,Graphics[_0x270e14(0xe2)],_0x30564a,_0x4a9cfb,![]),_0x1e2b19[_0x270e14(0x149)](0x0,0x0,Graphics[_0x270e14(0xcc)],_0x5cf830,_0x4a9cfb,_0x30564a,!![]),_0x1e2b19[_0x270e14(0x149)](0x0,Graphics[_0x270e14(0xe2)]-_0x5cf830,Graphics[_0x270e14(0xcc)],_0x5cf830,_0x30564a,_0x4a9cfb,!![]),_0x1e2b19['fillRect'](0x0,0x0,Graphics['width'],Graphics['height'],_0xb3da46),_0x1e2b19;},ColorManager[_0xbf25d4(0x12a)]=function(_0x1aa7ab){const _0x1f4ced=_0xbf25d4;_0x1aa7ab=_0x1aa7ab['toLowerCase']();switch(_0x1aa7ab){case _0x1f4ced(0xde):return PIXI[_0x1f4ced(0xfb)][_0x1f4ced(0x139)];case _0x1f4ced(0x152):case'additive':return PIXI[_0x1f4ced(0xfb)][_0x1f4ced(0x178)];case _0x1f4ced(0x135):return PIXI[_0x1f4ced(0xfb)][_0x1f4ced(0xb9)];case'screen':return PIXI['BLEND_MODES'][_0x1f4ced(0xce)];}},ColorManager['hexToRgba']=function(_0x271431,_0x4d0a3e){const _0x25d6c2=_0xbf25d4;let _0x96f4c9='';if(/^#([A-Fa-f0-9]{3}){1,2}$/[_0x25d6c2(0x142)](_0x271431)){if(_0x25d6c2(0x15b)!==_0x25d6c2(0xe3)){_0x96f4c9=_0x271431[_0x25d6c2(0x130)](0x1)[_0x25d6c2(0x140)]('');_0x96f4c9[_0x25d6c2(0xc7)]===0x3&&(_0x96f4c9=[_0x96f4c9[0x0],_0x96f4c9[0x0],_0x96f4c9[0x1],_0x96f4c9[0x1],_0x96f4c9[0x2],_0x96f4c9[0x2]]);while(_0x96f4c9[_0x25d6c2(0xc7)]>0x6)_0x96f4c9['pop']();return _0x96f4c9='0x'+_0x96f4c9[_0x25d6c2(0x165)](''),'rgba('+[(_0x96f4c9>>0x10&0xff)[_0x25d6c2(0xd2)](0x0,0xff),(_0x96f4c9>>0x8&0xff)['clamp'](0x0,0xff),(_0x96f4c9&0xff)[_0x25d6c2(0xd2)](0x0,0xff)]['join'](',')+','+_0x4d0a3e[_0x25d6c2(0xd2)](0x0,0x1)+')';}else{const _0x565c17=this[_0x25d6c2(0x12d)];return _0x132a83[_0x25d6c2(0xac)](_0x565c17);}}else return'rgba(0,0,0,0)';},SceneManager[_0xbf25d4(0xe5)]=function(){const _0x577455=_0xbf25d4;return this[_0x577455(0x181)]&&this['_scene'][_0x577455(0x100)]===Scene_Map;},Game_Screen[_0xbf25d4(0x146)]=0x14,VisuMZ[_0xbf25d4(0x154)]['Game_Screen_clear']=Game_Screen['prototype'][_0xbf25d4(0x144)],Game_Screen[_0xbf25d4(0x183)][_0xbf25d4(0x144)]=function(){const _0x1256e0=_0xbf25d4;VisuMZ[_0x1256e0(0x154)][_0x1256e0(0xf4)][_0x1256e0(0xeb)](this),this[_0x1256e0(0x106)]();},VisuMZ['MapDamageEffect'][_0xbf25d4(0x163)]=Game_Screen[_0xbf25d4(0x183)][_0xbf25d4(0x188)],Game_Screen[_0xbf25d4(0x183)][_0xbf25d4(0x188)]=function(){const _0x5a0237=_0xbf25d4;VisuMZ['MapDamageEffect'][_0x5a0237(0x163)][_0x5a0237(0xeb)](this),this['clearMapDamageEffect']();},VisuMZ[_0xbf25d4(0x154)][_0xbf25d4(0x10d)]=Game_Screen[_0xbf25d4(0x183)]['update'],Game_Screen['prototype']['update']=function(){const _0x2ddfdc=_0xbf25d4;VisuMZ[_0x2ddfdc(0x154)][_0x2ddfdc(0x10d)][_0x2ddfdc(0xeb)](this),this['updateMapDamageEffect']();},Game_Screen[_0xbf25d4(0x183)][_0xbf25d4(0x106)]=function(){const _0x37aff3=_0xbf25d4;this['_mapDamageRegionID']=-0x1,this[_0x37aff3(0xc0)]=-0x1,this[_0x37aff3(0x137)]=0x0,this['_mapDamageDuration']=0x0,this[_0x37aff3(0xc3)]=0x0;},VisuMZ[_0xbf25d4(0x154)][_0xbf25d4(0x16a)]=Game_Screen[_0xbf25d4(0x183)]['startFlashForDamage'],Game_Screen[_0xbf25d4(0x183)][_0xbf25d4(0xbf)]=function(){const _0x5e45dd=_0xbf25d4;if(this[_0x5e45dd(0x122)]())this[_0x5e45dd(0xdb)]();else this[_0x5e45dd(0x107)]()?'uAtjn'!==_0x5e45dd(0xc1)?_0x203b61['loadPicture'](_0x116da9[_0x5e45dd(0x105)]()):this[_0x5e45dd(0x118)]():VisuMZ[_0x5e45dd(0x154)][_0x5e45dd(0x16a)][_0x5e45dd(0xeb)](this);},Game_Screen['prototype'][_0xbf25d4(0x134)]=function(){const _0x2bdf02=_0xbf25d4;if(this[_0x2bdf02(0xc6)]>0x0){if('gnEQZ'==='uczon'){if(this[_0x2bdf02(0x16e)]())this[_0x2bdf02(0x12f)]();this[_0x2bdf02(0xf8)]();}else{const _0x539cb3=this[_0x2bdf02(0xc6)];this[_0x2bdf02(0xc3)]++>Game_Screen[_0x2bdf02(0x146)]&&(this[_0x2bdf02(0x137)]*=(_0x539cb3-0x1)/_0x539cb3,this[_0x2bdf02(0xc6)]--);if(this[_0x2bdf02(0xc6)]<=0x0){if('dTGuK'===_0x2bdf02(0x123))this[_0x2bdf02(0xd9)]=-0x1,this[_0x2bdf02(0xc0)]=-0x1,this[_0x2bdf02(0x137)]=0x0,this['_mapDamageStallDuration']=0x0;else{if(this[_0x2bdf02(0x17d)]===_0xec2036)this[_0x2bdf02(0xd7)]();return this[_0x2bdf02(0x17d)][_0x9f7b6e];}}}}},Game_Screen[_0xbf25d4(0x183)][_0xbf25d4(0x122)]=function(){const _0x5d5e00=_0xbf25d4;if(!SceneManager[_0x5d5e00(0xe5)]())return![];if(!$gameMap)return![];const _0x3be505=$gamePlayer[_0x5d5e00(0x10e)](),_0x405c4b=$gameMap[_0x5d5e00(0xac)](_0x3be505);if(_0x405c4b['hexColor']===''&&_0x405c4b[_0x5d5e00(0xe9)]==='')return![];return $gameTemp['_executeFloorDamage'];},Game_Screen['prototype'][_0xbf25d4(0xdb)]=function(){const _0x3ee647=_0xbf25d4,_0x5a8dc1=$gamePlayer[_0x3ee647(0x10e)](),_0x29f7e0=$gameMap['getMapDamageEffectSettings'](_0x5a8dc1);this[_0x3ee647(0xd9)]=_0x5a8dc1,this[_0x3ee647(0xc0)]=-0x1,this[_0x3ee647(0x137)]=_0x29f7e0[_0x3ee647(0x162)],this['_mapDamageDuration']=_0x29f7e0[_0x3ee647(0x13b)];if(this[_0x3ee647(0xc6)]>=Game_Screen['MAP_DAMAGE_EFFECT_CONSTANT'])this[_0x3ee647(0xc6)]-=Game_Screen[_0x3ee647(0x146)],this[_0x3ee647(0xc3)]=0x0;else{if(_0x3ee647(0xc4)!==_0x3ee647(0x136))this[_0x3ee647(0xc3)]=Game_Screen[_0x3ee647(0x146)];else{this[_0x3ee647(0x171)]();if(!_0x869865)_0x39e12e=this[_0x3ee647(0xac)]();this[_0x3ee647(0xb1)](_0x211b7c),this[_0x3ee647(0x104)](_0xaece7b);}}if(Imported[_0x3ee647(0x17e)]&&$onceParallel){if(_0x29f7e0[_0x3ee647(0xee)])$onceParallel(_0x29f7e0[_0x3ee647(0xee)]);}},Game_Screen['prototype'][_0xbf25d4(0x107)]=function(){const _0xeb03c8=_0xbf25d4;if(!SceneManager[_0xeb03c8(0xe5)]())return![];if(!$gameMap)return![];return $gameTemp[_0xeb03c8(0xd5)];},Game_Screen[_0xbf25d4(0x183)][_0xbf25d4(0x118)]=function(){const _0x565d04=_0xbf25d4,_0x19825b=$gameParty['getFirstSlipStateWithMapDamageEffect'](),_0x51a1bb=_0x19825b?_0x19825b['id']:0xa455,_0x69be85=DataManager['getMapDamageEffectSettings'](_0x51a1bb);this[_0x565d04(0xd9)]=-0x1,this[_0x565d04(0xc0)]=_0x51a1bb,this['_mapDamageOpacity']=_0x69be85[_0x565d04(0x162)],this[_0x565d04(0xc6)]=_0x69be85[_0x565d04(0x13b)];if(this[_0x565d04(0xc6)]>=Game_Screen[_0x565d04(0x146)])this[_0x565d04(0xc6)]-=Game_Screen['MAP_DAMAGE_EFFECT_CONSTANT'],this[_0x565d04(0xc3)]=0x0;else{if(_0x565d04(0x150)===_0x565d04(0xed)){const _0x1ada62=_0x289913?_0x2c2051[_0x565d04(0x13d)]||'':'';if(_0x1ada62[_0x565d04(0xc7)]<=0x0)return;const _0x46696d=_0x57d330['MapDamageEffect'][_0x565d04(0x120)],_0x38b5ba=_0x46696d[_0x565d04(0x14a)],_0x20c0c1=_0x1ada62[_0x565d04(0x11c)](_0x38b5ba);if(_0x20c0c1)for(const _0x318177 of _0x20c0c1){_0x318177[_0x565d04(0x11c)](_0x38b5ba);const _0x213054=_0x54f36a(_0x21c801['$1'])['clamp'](0x0,0xff),_0x1f1eb4=_0x39e453(_0x66e66a['$2']);this['_mapDamageFormulaRegions'][_0x213054]=_0x1f1eb4;}}else this[_0x565d04(0xc3)]=Game_Screen['MAP_DAMAGE_EFFECT_CONSTANT'];}if(Imported[_0x565d04(0x17e)]&&$onceParallel){if(_0x69be85[_0x565d04(0xee)])$onceParallel(_0x69be85[_0x565d04(0xee)]);}},Game_Screen['prototype'][_0xbf25d4(0xfc)]=function(_0x2cc75d){const _0x57d859=_0xbf25d4;this['_mapDamageRegionID']=-0x1,this['_mapDamageStateID']=-0x1,this[_0x57d859(0x137)]=_0x2cc75d[_0x57d859(0x162)],this['_mapDamageDuration']=_0x2cc75d[_0x57d859(0x13b)];this['_mapDamageDuration']>=Game_Screen['MAP_DAMAGE_EFFECT_CONSTANT']?(this[_0x57d859(0xc6)]-=Game_Screen[_0x57d859(0x146)],this[_0x57d859(0xc3)]=0x0):this[_0x57d859(0xc3)]=Game_Screen['MAP_DAMAGE_EFFECT_CONSTANT'];if(Imported[_0x57d859(0x17e)]&&$onceParallel){if(_0x57d859(0xc5)!==_0x57d859(0x187)){if(_0x2cc75d[_0x57d859(0xee)])$onceParallel(_0x2cc75d[_0x57d859(0xee)]);}else return _0x8401db;}},Game_Map[_0xbf25d4(0xec)]={'hexColor':VisuMZ[_0xbf25d4(0x154)]['Settings'][_0xbf25d4(0xb3)]||_0xbf25d4(0x155),'gradientLength':VisuMZ['MapDamageEffect'][_0xbf25d4(0xbd)]['FloorGradientLength']||0x1,'imgFilename':VisuMZ['MapDamageEffect'][_0xbf25d4(0xbd)][_0xbf25d4(0xf0)]||'','opacity':VisuMZ[_0xbf25d4(0x154)]['Settings'][_0xbf25d4(0xd1)]||0x1,'duration':VisuMZ[_0xbf25d4(0x154)][_0xbf25d4(0xbd)][_0xbf25d4(0xae)]||0x1,'blendMode':VisuMZ[_0xbf25d4(0x154)][_0xbf25d4(0xbd)][_0xbf25d4(0xe8)]||0x0,'onceParallel':VisuMZ[_0xbf25d4(0x154)][_0xbf25d4(0xbd)][_0xbf25d4(0xaf)]||0x0},VisuMZ[_0xbf25d4(0x154)][_0xbf25d4(0x16d)]=Game_Map[_0xbf25d4(0x183)][_0xbf25d4(0xe4)],Game_Map['prototype']['setup']=function(_0x5bf8c0){const _0x21a727=_0xbf25d4;VisuMZ[_0x21a727(0x154)][_0x21a727(0x16d)][_0x21a727(0xeb)](this,_0x5bf8c0),this[_0x21a727(0xd7)](),this['setupMapDamageEffects'](),this[_0x21a727(0x11d)](),this[_0x21a727(0xb7)]();},Game_Map[_0xbf25d4(0x183)]['initMapDamageEffects']=function(){const _0x25423e=_0xbf25d4;this[_0x25423e(0xbb)]={},this['_mapDamageEffectRegions'][0x0]=JSON[_0x25423e(0x126)](JSON[_0x25423e(0xe0)](Game_Map[_0x25423e(0xec)])),Game_Map[_0x25423e(0xec)][_0x25423e(0xe9)]!==''&&ImageManager['loadPicture'](Game_Map['MAP_DAMAGE_EFFECT']['imgFilename'][_0x25423e(0x105)]()),this['_floorStateRegions']={},this[_0x25423e(0x10f)][0x0]=[],this[_0x25423e(0x17d)]={};},Game_Map[_0xbf25d4(0x183)][_0xbf25d4(0x186)]=function(){const _0x59b59b=_0xbf25d4,_0x3262c1=$dataMap?$dataMap[_0x59b59b(0x13d)]||'':'';if(_0x3262c1['length']<=0x0)return;const _0x4ba718=VisuMZ['MapDamageEffect'][_0x59b59b(0x120)][_0x59b59b(0x180)],_0x1b98bf=['hexColor',_0x59b59b(0x184),_0x59b59b(0xe9),_0x59b59b(0x162),'opacityRate',_0x59b59b(0x13b),_0x59b59b(0xef),'onceParallel'];for(const _0x705b9b of _0x1b98bf){const _0x19d17c=_0x3262c1[_0x59b59b(0x11c)](_0x4ba718[_0x705b9b]);if(_0x19d17c)for(const _0x3fdd3a of _0x19d17c){_0x3fdd3a[_0x59b59b(0x11c)](_0x4ba718[_0x705b9b]);const _0x45161a=Number(RegExp['$1'])[_0x59b59b(0xd2)](0x0,0xff),_0x201c60=RegExp['$2'];this['setMapDamageEffectSetting'](_0x45161a,_0x705b9b,_0x201c60);}}},Game_Map['prototype'][_0xbf25d4(0xb4)]=function(_0x1b053c,_0x460e1e,_0x3976ba){const _0x1fe6b9=_0xbf25d4,_0x1fc3bb=this[_0x1fe6b9(0xac)](_0x1b053c);_0x3976ba=DataManager[_0x1fe6b9(0x15a)](_0x460e1e,_0x3976ba),_0x460e1e===_0x1fe6b9(0xf5)&&(_0x1fc3bb[_0x1fe6b9(0xe9)]=''),_0x1fc3bb[_0x460e1e]=_0x3976ba;},Game_Map[_0xbf25d4(0x183)][_0xbf25d4(0xac)]=function(_0x2f653d){const _0x30f83b=_0xbf25d4;if(this['_mapDamageEffectRegions']===undefined)this[_0x30f83b(0xd7)]();return this[_0x30f83b(0xbb)][_0x2f653d]===undefined&&(this[_0x30f83b(0xbb)][_0x2f653d]=JSON['parse'](JSON[_0x30f83b(0xe0)](Game_Map[_0x30f83b(0xec)]))),this[_0x30f83b(0xbb)][_0x2f653d];},Game_Map[_0xbf25d4(0x183)]['setupFloorStateEffects']=function(){const _0x33226e=_0xbf25d4,_0x4ae438=$dataMap?$dataMap[_0x33226e(0x13d)]||'':'';if(_0x4ae438[_0x33226e(0xc7)]<=0x0)return;const _0x55dc62=VisuMZ['MapDamageEffect'][_0x33226e(0x120)],_0x41dc27=_0x55dc62[_0x33226e(0x151)],_0x55f0ca=_0x4ae438[_0x33226e(0x11c)](_0x41dc27);if(_0x55f0ca){if('TLiBE'===_0x33226e(0x143))for(const _0x33d2cb of _0x55f0ca){if(_0x33226e(0x13a)===_0x33226e(0x13a)){_0x33d2cb[_0x33226e(0x11c)](_0x41dc27);const _0x569bca=Number(RegExp['$1'])['clamp'](0x0,0xff),_0x23d56b=String(RegExp['$2'])[_0x33226e(0x140)](',')['map'](_0x4d9e21=>_0x4d9e21[_0x33226e(0x105)]());for(const _0x19e9b6 of _0x23d56b){if(_0x33226e(0xad)===_0x33226e(0xad)){const _0x309d4c=/^\d+$/[_0x33226e(0x142)](_0x19e9b6);let _0xfb86fd=0x0;if(_0x309d4c)_0x33226e(0xf1)==='XnLCG'?_0xfb86fd=Number(_0x19e9b6):(this[_0x33226e(0x137)]*=(_0x59a453-0x1)/_0x3958a4,this[_0x33226e(0xc6)]--);else{if('FWTNf'!==_0x33226e(0xf7)){_0x48c116['match'](_0xb2fcb2[_0x94e497]);const _0x217a6f=_0x4dbbc0(_0x3e5bc9['$1'])[_0x33226e(0xd2)](0x0,0xff),_0x580049=_0x32ab1f['$2'];this['setMapDamageEffectSetting'](_0x217a6f,_0x148310,_0x580049);}else _0xfb86fd=DataManager[_0x33226e(0x17f)](_0x19e9b6);}_0xfb86fd&&(this[_0x33226e(0x10f)][_0x569bca]=this[_0x33226e(0x10f)][_0x569bca]||[],this[_0x33226e(0x10f)][_0x569bca][_0x33226e(0xf6)](_0xfb86fd));}else this[_0x33226e(0x10f)][_0x54d2e1]=this[_0x33226e(0x10f)][_0x3d91e7]||[],this[_0x33226e(0x10f)][_0x481e4e]['push'](_0x2507ff);}}else _0x318dee(_0x33226e(0x175)[_0x33226e(0x11e)](_0x89b58a,_0xe83d1f,_0x10010b)),_0x3f693f[_0x33226e(0x166)]();}else _0x48584e[_0x33226e(0x154)][_0x33226e(0x16d)]['call'](this,_0x4abf4a),this[_0x33226e(0xd7)](),this[_0x33226e(0x186)](),this['setupFloorStateEffects'](),this[_0x33226e(0xb7)]();}},Game_Map[_0xbf25d4(0x183)]['getFloorStatesAtRegion']=function(_0x470eaa){const _0x237688=_0xbf25d4;if(this[_0x237688(0x10f)]===undefined)this[_0x237688(0xd7)]();return this[_0x237688(0x10f)][_0x470eaa]=this[_0x237688(0x10f)][_0x470eaa]||[],this[_0x237688(0x10f)][_0x470eaa];},Game_Map[_0xbf25d4(0x183)][_0xbf25d4(0xb7)]=function(){const _0x40d364=_0xbf25d4,_0x509b09=$dataMap?$dataMap[_0x40d364(0x13d)]||'':'';if(_0x509b09['length']<=0x0)return;const _0x10c34b=VisuMZ[_0x40d364(0x154)][_0x40d364(0x120)],_0xa333f3=_0x10c34b[_0x40d364(0x14a)],_0x436afc=_0x509b09[_0x40d364(0x11c)](_0xa333f3);if(_0x436afc){if(_0x40d364(0xc9)!==_0x40d364(0xc9)){_0x110e87=_0x9ecc7[_0x40d364(0x130)](0x1)[_0x40d364(0x140)]('');_0x27c0e6[_0x40d364(0xc7)]===0x3&&(_0x51c045=[_0x310df3[0x0],_0x5aa42e[0x0],_0x1c0519[0x1],_0x240579[0x1],_0x516f0a[0x2],_0x46647f[0x2]]);while(_0x54ede6['length']>0x6)_0x574006[_0x40d364(0x10c)]();return _0x553d50='0x'+_0x77e9c2['join'](''),_0x40d364(0x15e)+[(_0x2f454b>>0x10&0xff)[_0x40d364(0xd2)](0x0,0xff),(_0x47f9de>>0x8&0xff)[_0x40d364(0xd2)](0x0,0xff),(_0x59f12a&0xff)['clamp'](0x0,0xff)][_0x40d364(0x165)](',')+','+_0x1af205[_0x40d364(0xd2)](0x0,0x1)+')';}else for(const _0x436cb6 of _0x436afc){if(_0x40d364(0xf3)!==_0x40d364(0xf3)){const _0x1a090f=_0x706cf['getFirstSlipStateWithMapDamageEffect'](),_0x2e7df1=_0x1a090f?_0x1a090f['id']:0xa455,_0x14247c=_0x4cf20a['getMapDamageEffectSettings'](_0x2e7df1);this[_0x40d364(0xd9)]=-0x1,this['_mapDamageStateID']=_0x2e7df1,this[_0x40d364(0x137)]=_0x14247c['opacity'],this[_0x40d364(0xc6)]=_0x14247c[_0x40d364(0x13b)];this[_0x40d364(0xc6)]>=_0x42c8fd[_0x40d364(0x146)]?(this[_0x40d364(0xc6)]-=_0x499cff[_0x40d364(0x146)],this[_0x40d364(0xc3)]=0x0):this[_0x40d364(0xc3)]=_0x191447[_0x40d364(0x146)];if(_0x1098e2[_0x40d364(0x17e)]&&_0x50d99f){if(_0x14247c['onceParallel'])_0x1ee574(_0x14247c[_0x40d364(0xee)]);}}else{_0x436cb6[_0x40d364(0x11c)](_0xa333f3);const _0x46414b=Number(RegExp['$1'])[_0x40d364(0xd2)](0x0,0xff),_0x18f9e1=String(RegExp['$2']);this['_mapDamageFormulaRegions'][_0x46414b]=_0x18f9e1;}}}},Game_Map['prototype'][_0xbf25d4(0xc8)]=function(_0x39d2b7){const _0x45c259=_0xbf25d4;if(this[_0x45c259(0x17d)]===undefined)this[_0x45c259(0xd7)]();return this[_0x45c259(0x17d)][_0x39d2b7];},Game_Actor[_0xbf25d4(0x164)]={'hexColor':VisuMZ[_0xbf25d4(0x154)][_0xbf25d4(0xbd)][_0xbf25d4(0x156)]||_0xbf25d4(0x13e),'gradientLength':VisuMZ[_0xbf25d4(0x154)][_0xbf25d4(0xbd)][_0xbf25d4(0x141)]||0x1,'imgFilename':VisuMZ[_0xbf25d4(0x154)]['Settings']['SlipImageFilename']||'','opacity':VisuMZ['MapDamageEffect']['Settings'][_0xbf25d4(0x127)]||0x1,'duration':VisuMZ[_0xbf25d4(0x154)]['Settings'][_0xbf25d4(0xf9)]||0x1,'blendMode':VisuMZ['MapDamageEffect']['Settings'][_0xbf25d4(0x110)]||0x0,'onceParallel':VisuMZ[_0xbf25d4(0x154)]['Settings'][_0xbf25d4(0x161)]||0x0},VisuMZ['MapDamageEffect'][_0xbf25d4(0x182)]=Game_Actor['prototype']['turnEndOnMap'],Game_Actor[_0xbf25d4(0x183)][_0xbf25d4(0xd0)]=function(){const _0x208d83=_0xbf25d4;$gameTemp['_turnEndOnMap']=!![],VisuMZ[_0x208d83(0x154)][_0x208d83(0x182)][_0x208d83(0xeb)](this),$gameTemp['_turnEndOnMap']=![];},VisuMZ[_0xbf25d4(0x154)][_0xbf25d4(0x108)]=Game_Actor[_0xbf25d4(0x183)][_0xbf25d4(0xd6)],Game_Actor[_0xbf25d4(0x183)][_0xbf25d4(0xd6)]=function(){const _0x1e42c3=_0xbf25d4;$gameTemp[_0x1e42c3(0x15d)]=!![],VisuMZ[_0x1e42c3(0x154)]['Game_Actor_executeFloorDamage'][_0x1e42c3(0xeb)](this),$gameTemp['_executeFloorDamage']=![];},VisuMZ[_0xbf25d4(0x154)][_0xbf25d4(0x131)]=Game_Actor['prototype'][_0xbf25d4(0xdc)],Game_Actor[_0xbf25d4(0x183)][_0xbf25d4(0xdc)]=function(){const _0x31343b=_0xbf25d4;VisuMZ[_0x31343b(0x154)][_0x31343b(0x131)][_0x31343b(0xeb)](this),$gamePlayer[_0x31343b(0x13c)]()&&(this[_0x31343b(0xb5)](),this[_0x31343b(0xfd)]());},Game_Player[_0xbf25d4(0x183)][_0xbf25d4(0x13c)]=function(){const _0x28dd38=_0xbf25d4,_0x167f63=this[_0x28dd38(0x10e)]();return $gameMap[_0x28dd38(0xe7)](_0x167f63)[_0x28dd38(0xc7)]>0x0;},Game_Actor[_0xbf25d4(0x183)][_0xbf25d4(0xb5)]=function(){const _0x3e05f1=_0xbf25d4;if(this[_0x3e05f1(0x16e)]())return;const _0x3840e8=$gamePlayer['regionId'](),_0x439050=$gameMap[_0x3e05f1(0xe7)](_0x3840e8);let _0x43fb81=![];for(const _0x517ec2 of _0x439050){if(!$dataStates[_0x517ec2])continue;if(this[_0x3e05f1(0xba)](_0x517ec2))continue;this[_0x3e05f1(0xda)](_0x517ec2),_0x43fb81=!![];}if(_0x43fb81){if(_0x3e05f1(0x125)===_0x3e05f1(0xcd))_0xf673f9[_0x3e05f1(0xcb)](_0x454001[_0x3e05f1(0xec)][_0x3e05f1(0xe9)][_0x3e05f1(0x105)]());else{if(this[_0x3e05f1(0x16e)]())this[_0x3e05f1(0x12f)]();this[_0x3e05f1(0xf8)]();}}},VisuMZ[_0xbf25d4(0x154)][_0xbf25d4(0xe6)]=Game_Actor['prototype'][_0xbf25d4(0xb8)],Game_Actor[_0xbf25d4(0x183)][_0xbf25d4(0xb8)]=function(){const _0x55d501=_0xbf25d4,_0x28cb1b=$gamePlayer[_0x55d501(0x10e)](),_0x1596a6=$gameMap[_0x55d501(0xc8)](_0x28cb1b)||'',_0x3b5467=VisuMZ[_0x55d501(0x154)][_0x55d501(0xe6)][_0x55d501(0xeb)](this);if(_0x1596a6[_0x55d501(0xc7)]>0x0){window[_0x55d501(0x113)]=_0x3b5467;const _0x1e930a=_0x55d501(0xd4)['format'](_0x3b5467,_0x1596a6);try{eval(_0x1e930a);const _0x5c51a7=window[_0x55d501(0x113)];return window[_0x55d501(0x113)]=undefined,_0x5c51a7;}catch(_0x33f47b){if(_0x55d501(0x145)===_0x55d501(0x103))this[_0x55d501(0xc6)]-=_0x1cd223['MAP_DAMAGE_EFFECT_CONSTANT'],this[_0x55d501(0xc3)]=0x0;else{if($gameTemp[_0x55d501(0x179)]())console[_0x55d501(0x11f)](_0x33f47b);return _0x3b5467;}}}else return _0x3b5467;},VisuMZ[_0xbf25d4(0x154)]['Game_Player_isOnDamageFloor']=Game_Player['prototype']['isOnDamageFloor'],Game_Player['prototype']['isOnDamageFloor']=function(){const _0x148d11=_0xbf25d4;if(VisuMZ[_0x148d11(0x154)][_0x148d11(0xc2)][_0x148d11(0xeb)](this))return!![];const _0x1630bb=this[_0x148d11(0x10e)](),_0xf166=$gameMap[_0x148d11(0xc8)](_0x1630bb)||'';return _0xf166['length']>0x0;},Game_Party[_0xbf25d4(0x183)][_0xbf25d4(0x16f)]=function(){const _0x5bbe96=_0xbf25d4,_0x30f8bb=VisuMZ[_0x5bbe96(0x154)]['RegExp'][_0x5bbe96(0x168)][_0x5bbe96(0x176)];for(const _0x1b50d4 of this[_0x5bbe96(0x116)]()){if(_0x5bbe96(0x17a)===_0x5bbe96(0xfe))this['setupMapDamageEffectImage']();else{if(!_0x1b50d4)continue;for(const _0x80087a of _0x1b50d4[_0x5bbe96(0x14c)]()){if(_0x5bbe96(0x111)!==_0x5bbe96(0x111))_0x20762b[_0x5bbe96(0x160)](_0x589eb2);else{if(!_0x80087a)continue;if(_0x80087a[_0x5bbe96(0x13d)]['match'](_0x30f8bb))return _0x80087a;}}}}return null;},VisuMZ[_0xbf25d4(0x154)][_0xbf25d4(0x102)]=Spriteset_Map['prototype']['createLowerLayer'],Spriteset_Map['prototype']['createLowerLayer']=function(){const _0x23c909=_0xbf25d4;VisuMZ[_0x23c909(0x154)]['Spriteset_Map_createLowerLayer'][_0x23c909(0xeb)](this),this[_0x23c909(0x138)]();},VisuMZ[_0xbf25d4(0x154)][_0xbf25d4(0x173)]=Spriteset_Map[_0xbf25d4(0x183)][_0xbf25d4(0x112)],Spriteset_Map[_0xbf25d4(0x183)]['update']=function(){const _0x37953b=_0xbf25d4;VisuMZ[_0x37953b(0x154)][_0x37953b(0x173)][_0x37953b(0xeb)](this),this[_0x37953b(0x134)]();},Spriteset_Map[_0xbf25d4(0x183)]['createMapDamageEffect']=function(){const _0x97b1aa=_0xbf25d4;if(this[_0x97b1aa(0x14e)])return;this[_0x97b1aa(0x14e)]=new Sprite(),this[_0x97b1aa(0x128)](this['_mapDamageSprite']),this[_0x97b1aa(0x12d)]=-0x1,this[_0x97b1aa(0xbc)]=-0x1;if($gameScreen)$gameScreen[_0x97b1aa(0xd9)]=-0x1;if($gameScreen)$gameScreen[_0x97b1aa(0xc0)]=-0x1;},Spriteset_Map['prototype'][_0xbf25d4(0x134)]=function(){const _0x55c925=_0xbf25d4;if(!this[_0x55c925(0x14e)])return;this[_0x55c925(0x148)](),this[_0x55c925(0x159)](),this[_0x55c925(0xd8)]();},Spriteset_Map[_0xbf25d4(0x183)][_0xbf25d4(0x148)]=function(){const _0x3bbb82=_0xbf25d4;this[_0x3bbb82(0x16c)]()&&this[_0x3bbb82(0x160)]();},Spriteset_Map[_0xbf25d4(0x183)][_0xbf25d4(0x16c)]=function(){const _0x2fe5fd=_0xbf25d4;if(this[_0x2fe5fd(0x12d)]!==$gameScreen[_0x2fe5fd(0xd9)])return!![];if(this['_lastMapDamageStateID']!==$gameScreen[_0x2fe5fd(0xc0)])return!![];return![];},Spriteset_Map[_0xbf25d4(0x183)]['setupMapDamageEffectImage']=function(_0xdc309e){const _0x30aa45=_0xbf25d4;this[_0x30aa45(0x171)]();if(!_0xdc309e)_0xdc309e=this[_0x30aa45(0xac)]();this[_0x30aa45(0xb1)](_0xdc309e),this[_0x30aa45(0x104)](_0xdc309e);},Spriteset_Map[_0xbf25d4(0x183)][_0xbf25d4(0x171)]=function(){const _0x5cd78b=_0xbf25d4;this[_0x5cd78b(0x12d)]=$gameScreen[_0x5cd78b(0xd9)],this[_0x5cd78b(0xbc)]=$gameScreen['_mapDamageStateID'];},Spriteset_Map[_0xbf25d4(0x183)]['getMapDamageEffectSettings']=function(){const _0x56838a=_0xbf25d4;if(this['_lastMapDamageRegion']>=0x0){if(_0x56838a(0xf2)===_0x56838a(0xf2)){const _0x19cfa7=this[_0x56838a(0x12d)];return $gameMap[_0x56838a(0xac)](_0x19cfa7);}else this[_0x56838a(0xb5)](),this[_0x56838a(0xfd)]();}else{if(this[_0x56838a(0xbc)]>=0x0){const _0x2bc6cd=this[_0x56838a(0xbc)];return DataManager[_0x56838a(0xac)](_0x2bc6cd);}}return{};},Spriteset_Map[_0xbf25d4(0x183)][_0xbf25d4(0xb1)]=function(_0x360d6b){const _0x271614=_0xbf25d4;if(_0x360d6b['imgFilename']&&_0x360d6b[_0x271614(0xe9)]!==''){if(_0x271614(0x169)===_0x271614(0x15f)){_0x338bca(_0x55b8cd);const _0x331c5b=_0x8b4d56[_0x271614(0x113)];return _0x135568[_0x271614(0x113)]=_0x4ff702,_0x331c5b;}else this['_mapDamageSprite'][_0x271614(0x133)]=ImageManager[_0x271614(0xcb)](_0x360d6b[_0x271614(0xe9)]);}else{const _0x4dc349=_0x360d6b[_0x271614(0xf5)]||_0x271614(0x124),_0x92d784=_0x360d6b[_0x271614(0x184)]||0x1;this[_0x271614(0x14e)][_0x271614(0x133)]=ImageManager[_0x271614(0x138)](_0x4dc349,_0x92d784);}},Spriteset_Map['prototype']['prepareMapDamageEffectsBlendMode']=function(_0x5a7091){const _0x9329fe=_0xbf25d4;this[_0x9329fe(0x14e)][_0x9329fe(0xef)]=_0x5a7091[_0x9329fe(0xef)]||0x0;},Spriteset_Map['prototype'][_0xbf25d4(0x159)]=function(){const _0x3f590c=_0xbf25d4;this[_0x3f590c(0x14e)][_0x3f590c(0x162)]=$gameScreen[_0x3f590c(0x137)]||0x0;},Spriteset_Map[_0xbf25d4(0x183)][_0xbf25d4(0xd8)]=function(){const _0x27d1c4=_0xbf25d4,_0xa1814d=0x1/$gameScreen[_0x27d1c4(0x10b)]();this['_mapDamageSprite'][_0x27d1c4(0xea)]['x']=_0xa1814d,this[_0x27d1c4(0x14e)][_0x27d1c4(0xea)]['y']=_0xa1814d;};