//=============================================================================
// VisuStella MZ - Visual State Effects
// VisuMZ_3_VisualStateEffect.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_VisualStateEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualStateEffects = VisuMZ.VisualStateEffects || {};
VisuMZ.VisualStateEffects.version = 1.23;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.23] [VisualStateEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_State_Effects_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * States, buffs, and debuffs are amongst one of the most important aspects of
 * the battle system. Therefore, relaying proper information to the player is
 * extremely important. RPG Maker MZ does relay information to the player about
 * the various states and effects, but it is far from perfect. This plugin
 * allows you to add more detail and visual effects regarding states to relay
 * proper data.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Choose to display State Overlays and State Icons over actors and enemies.
 * * Create text popups for Buffs, Debuffs, and States along with full control
 *   over their color, flash, and flash duration.
 * * Play animations upon receiving or removing Buffs, Debuffs, and States.
 * * States can have repeating animations.
 * * States can change the tone of a sprite.
 * * States can freeze a sprite in place.
 * * States can adjust the opacity of a battler to make them semi-transparent.
 * * Hovering effects that can be visibly applied to trait objects.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * - VisuMZ_0_CoreEngine
 * - VisuMZ_1_BattleCore
 * - VisuMZ_1_SkillsStatesCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
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
 * State Motion Index and State Overlay Index
 * 
 * - The original RPG Maker MZ functions have been overwritten because they
 * only display the motions and overlays of the highest priority state even if
 * it does not have any motions while lower priority states with motions and
 * overlays will be hidden.
 * 
 * - The changed code will now take the highest priority state motion index (or
 * a custom one defined by a notetag) and the highest priority state overlay
 * index to show those instead.
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
 * === State-Related Notetags ===
 * 
 * The following notetags are made for states.
 * 
 * ---
 * 
 * <Hide State Popup>
 *
 * - Used for: State Notetags
 * - Don't display any of the popups for this state.
 * 
 * ---
 * 
 * <State Popup>
 *  text color: c
 *  flash color: r, g, b, a
 *  flash duration: d
 * </State Popup>
 *
 * - Used for: State Notetags
 * - Changes the settings of the state popup from the defaults declared by the
 *   Plugin Parameters. Each of the settings are optional. If the lines do not
 *   appear in the notetag, then the default values from the Plugin Parameters
 *   will be used instead.
 * - Replace 'c' #rrggbb for custom colors or insert a regular number for text
 *   colors from the Window Skin.
 * - Replace 'r', 'g', 'b', 'a' with number values ranging from 0 to 255 for
 *   'red', 'green', 'blue', and 'alpha' to determine the flash color.
 * - Replace 'd' with a number representing the amount of frames you want the
 *   flash duration to last for.
 * 
 * Examples:
 * 
 * <State Popup>
 *  text color: 3
 * </State Popup>
 * 
 * <State Popup>
 *  text color: #abcdef
 *  flash color: 255, 255, 0, 160
 * </State Popup>
 * 
 * <State Popup>
 *  flash color: 0, 255, 255, 160
 *  flash duration: 90
 * </State Popup>
 * 
 * <State Popup>
 *  flash duration: 777
 * </State Popup>
 * 
 * ---
 * 
 * <Add Animation: x>
 *
 * - Used for: State Notetags
 * - Determines the battle animation to play when the state is applied.
 * - Replace 'x' with a number representing the ID of the animation you wish
 *   to play when the state is added.
 * - This does not work for states without icons nor the death state.
 * 
 * ---
 * 
 * <Erase Animation: x>
 *
 * - Used for: State Notetags
 * - Determines the battle animation to play when the state is removed.
 * - Replace 'x' with a number representing the ID of the animation you wish
 *   to play when the state is removed.
 * - This does not work for states without icons nor the death state.
 * 
 * ---
 * 
 * <Repeat Animation: x>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Determines the battle animation to play in intervals when the battler is
 *   affected by it.
 * - Replace 'x' with a number representing the ID of the animation you wish
 *   to play on repeat while the battler is affected by the state.
 * - The battler will cycle through the various repeating state animations
 *   available through states.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * - WARNING: Abusing Repeat Animations can jeopardize game performance.
 * 
 * ---
 * 
 * <Repeat Animation Cycle: x>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Determines the cycle/duration of this specific state's repeating animation
 *   if you do not wish to use the plugin parameter's default setting.
 * - Replace 'x' with the number of frames you wish to play this animation for
 *   before moving onto the next animation.
 * - WARNING: Lower numbers can jeopardize game performance.
 * 
 * ---
 * 
 * <Custom Overlay: filename>
 * 
 * - Used for: State Notetags
 * - For those who don't want to use the img/system/ folder's "States" image
 *   file and want something custom, this notetag will do exactly that.
 * - Custom state overlays will follow similar dimensions to the original
 *   States image:
 *   - Pixel Width: 768
 *   - Pixel Height: 96
 *   - Total Frames: 8
 *   - If you want to use different sizes, we recommend you look into Effekseer
 *     custom animations with the <Repeat Animation: x> notetag instead.
 * - Replace 'filename' with the filename of the image you want to use as
 *   a state overlay found in the game project's img/system/ folder.
 *   - Do not include the file extension.
 * 
 * ---
 * 
 * <State Motion: Walk>
 * <State Motion: Wait>
 * <State Motion: Chant>
 * <State Motion: Guard>
 * <State Motion: Damage>
 * <State Motion: Evade>
 * <State Motion: Thrust>
 * <State Motion: Swing>
 * <State Motion: Missile>
 * <State Motion: Skill>
 * <State Motion: Spell>
 * <State Motion: Item>
 * <State Motion: Escape>
 * <State Motion: Victory>
 * <State Motion: Dying>
 * <State Motion: Abnormal>
 * <State Motion: Sleep>
 * <State Motion: Dead>
 *
 * - Used for: State Notetags
 * - Lets you determine what kind of state motion to play when the battler is
 *   affected by the state.
 * - The battler will only play the highest priority state motion.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * ---
 * 
 * <State Motion Lock>
 * 
 * - Used for: State Notetags
 * - If an actor or animated sideview enemy is affected by a state that has
 *   this notetag, their animation will be locked in place while this state
 *   is in effect.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * ---
 * 
 * <State Tone: red, green, blue, gray>
 *
 * - Used for: State Notetags
 * - Tints the battler with a tone determined by the state.
 * - Replace 'red', 'green', 'blue' with a value between -255 and 255.
 * - Replace 'gray' with a value between 0 and 255.
 * - If a battler has multiple states with tones, then the state with the
 *   highest priority value is applied to the battler.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * ---
 * 
 * <Visual Opacity: x>
 * <Visual Opacity: x%>
 * 
 * - Used for: State Notetags
 * - When a battler is affected by this state, change the opacity of their main
 *   battler sprite to 'x' or 'x%'.
 * - Replace 'x' with a number from 0 to 255 representing the opacity level.
 * - Replace 'x%' with a percentage from 0% to 100% representing the opacity.
 * - This does NOT affect UI elements like the HP Gauges, State Icons, or their
 *   positioning markers such as the battler's shadow as this is only to used
 *   to represent a change in their opacity through a state.
 * - To change the whole battler's opacity including everything from the UI
 *   elements, State Icons, etc., use the Action Sequence Plugin Command to
 *   visually alter the whole opacity level instead.
 * - The Visual Opacity level will compound with the opacity level adjusted by
 *   the Action Sequence Plugin Command. Keep this in mind when using both of
 *   them together.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * ---
 * 
 * <Visual Rainbow: +x>
 * <Visual Rainbow: -x>
 * 
 * - Used for: State Notetags
 * - When a battler is affected by this state, the battler has a colorful
 *   rainbow shifting effect.
 * - Replace 'x' with a number representing how fast the colors shift for the
 *   battler. Higher numbers are faster. Lower numbers are slower.
 * - This does NOT affect UI elements like the HP Gauges, State Icons, or their
 *   positioning markers such as the battler's shadow as this is only to used
 *   to represent a change in their opacity through a state.
 * - The Visual Rainbow shift will be stacked on top of any battlers/enemies
 *   that already have a hue change.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * ---
 *
 * === Hover-Related Notetags ===
 * 
 * ---
 * 
 * <Visual Hover Effect>
 *  Base: x
 *  Speed: y
 *  Rate: z
 *  Death: case
 * </Visual Hover Effect>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Creates a hover effect when tied to a trait object.
 * - The 'base' value determines the minimum height above the ground for the
 *   hover effect. Replace 'x' with a number representing the pixel height.
 * - The 'speed' value determines the flat adjustment towards the wobbling
 *   change. Replace 'y' with a number representing the speed. Lower values
 *   move faster while higher values move slower.
 * - The 'rate' determines the fluctuation rate when the hover effect bobbles
 *   up and down. Replace 'z' with a number representing the fluctuation rate.
 * - The 'death' scenario lets you decide if you want the hovering battler to
 *   remain hovering if they're dead or fall down to the floor. Replace 'case'
 *   with 'Hover' or 'Floor'.
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * Example:
 * 
 * <Visual Hover Effect>
 *  Base: 100
 *  Speed: 20
 *  Rate: 5.0
 *  Death: floor
 * </Visual Hover Effect>
 * 
 * ---
 *
 * === Breathing-Related Notetags ===
 * 
 * The following notetags are purely EXPERIMENTAL. There is a high likelihood
 * of unintended graphical glitches when using them. Use them at your own risk.
 * 
 * ---
 * 
 * <Visual Breathing Effect>
 *  Speed: x
 *  Speed X: x
 *  Speed Y: x
 *  
 *  Rate: x.y
 *  Rate X: x.y
 *  Rate Y: x.y
 * 
 *  HP Link: On
 *  HP Link: Off
 * </Visual Breathing Effect>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Creates a hover effect when tied to a trait object.
 * - The 'speed' value determines how long each cycle is.
 *   - When using 'Speed', this will apply to both 'Speed X' and 'Speed Y'
 *   - 'Speed X' refers to the horizontal breathing cycle
 *   - 'Speed Y' refers to the vertical breathing cycle
 *   - If not declared, both will default to a value of '10'
 * - The 'rate' value determines how exaggerated the breathing distortion looks
 *   for the affected target.
 *   - When using 'Rate', this will apply to both 'Rate X' and 'Rate Y
 *   - 'Rate X' refers to horizontal breathing distortion effect
 *   - 'Rate Y' refers to vertical breathing distortion effect
 *   - If not declared, 'Rate X' will default to 0.000 and 'Rate Y' to 0.020.
 * - HP Link refers to the breathing speed relative to the target's HP rate
 *   where the lower the rate, the slower the speed becomes.
 *   - 'On' means it's enabled.
 *   - 'Off' means it's disabled.
 *   - If not declared, this will default to 'OFF'
 * - NOTE: Using this with Passive State Conditions will make this effect
 *   update at the next battler refresh cycle. This is due to the effect
 *   being cached in order to prevent lag and overloading the engine.
 * 
 * Examples:
 * 
 * <Visual Breathing Effect>
 *  Speed: 10
 *  Rate Y: 0.050
 *  HP Link: On
 * </Visual Breathing Effect>
 * 
 * <Visual Breathing Effect>
 *  Speed X: 15
 *  Speed Y: 10
 *  Rate X: 0.01
 *  Rate Y: 0.050
 * </Visual Breathing Effect>
 * 
 * ---
 * 
 * <No Breathing>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Removes any breathing effects for the affected target.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for Visual State Effects.
 *
 * ---
 *
 * Actors
 * 
 *   Show State Overlay?:
 *   - Show state overlays over an actor's head?
 * 
 *   Show State Icons?:
 *   - Show state icons over an actor's head?
 *
 * ---
 *
 * Enemies
 * 
 *   Show State Overlay?:
 *   - Show state overlays over an enemy's head?
 * 
 *   Show State Icons?:
 *   - Show state icons over an enemy's head?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Buff/Debuff Settings Settings
 * ============================================================================
 *
 * Buff/Debuff settings for Visual State Effects.
 *
 * ---
 *
 * Popups
 * 
 *   Show Popups?:
 *   - Show Buff/Debuff Popups when applied?
 * 
 *     Buff Format:
 *     - How do you want the buff text to appear?
 *     - %1 - Parameter Name
 * 
 *       Text Color:
 *       - Use #rrggbb for custom colors or regular numbers for text colors
 *         from the Window Skin.
 * 
 *       Flash Color:
 *       - Adjust the popup's flash color.
 *       - Format: [red, green, blue, alpha]
 * 
 *       Flash Duration:
 *       - What is the frame duration of the flash effect?
 * 
 *     Debuff Format:
 *     - How do you want the debuff text to appear?
 *     - %1 - Parameter Name
 * 
 *       Text Color:
 *       - Use #rrggbb for custom colors or regular numbers for text colors
 *         from the Window Skin.
 * 
 *       Flash Color:
 *       - Adjust the popup's flash color.
 *       - Format: [red, green, blue, alpha]
 * 
 *       Flash Duration:
 *       - What is the frame duration of the flash effect?
 * 
 * ---
 * 
 * Animations
 * 
 *   Show Animations?:
 *   - Show Buff/Debuff Animations when applied?
 * 
 *     Mirror Animations?:
 *     - Mirror animations for buffs/debuffs?
 * 
 *     Mute Animations?:
 *     - Mute animations for buffs/debuffs?
 * 
 * ---
 * 
 * Buff Animations
 * 
 *   MaxHP Buff:
 *   MaxMP Buff:
 *   ATK Buff:
 *   DEF Buff:
 *   MAT Buff:
 *   MDF Buff:
 *   AGI Buff:
 *   LUK Buff:
 *   - Animation played when applying specific Buffs.
 * 
 * Debuff Animations
 * 
 *   MaxHP Debuff:
 *   MaxMP Debuff:
 *   ATK Debuff:
 *   DEF Debuff:
 *   MAT Debuff:
 *   MDF Debuff:
 *   AGI Debuff:
 *   LUK Debuff:
 *   - Animation played when applying specific Debuff.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: State Settings
 * ============================================================================
 *
 * Default State settings for Visual State Effects.
 *
 * ---
 *
 * Popups
 * 
 *   Show Popups?:
 *   - Show States Popups when applied and removed?
 * 
 *     Allow Duplicates?:
 *     - Allow duplicate state popups to appear with the same graphical frame?
 * 
 *     Battle End Popups?:
 *     - Show State Popup removal on battle end for battle state removal?
 * 
 *     Add State Format:
 *     - How do you want added states to appear?
 *     - %1 - State Name
 * 
 *     Erase State Format:
 *     - How do you want erased states to appear?
 *     - %1 - State Name
 * 
 *     Default Text Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *       Match Turn Count?:
 *       - Match turn count color by default?
 * 
 *     Flash Color:
 *     - Adjust the popup's default flash color.
 *     - Format: [red, green, blue, alpha]
 * 
 *       Flash Duration:
 *       - What is the frame duration of the default flash effect?
 *
 * ---
 *
 * State Animations
 * 
 *   Add/Erase Animations
 * 
 *     Mirror Animations?:
 *     - Mirror animations for states?
 * 
 *     Mute Animations?:
 *     - Mute animations for states?
 * 
 *   Repeating Animations
 * 
 *     Cycle Time:
 *     - The amount of frames to wait before each animation cycle.
 *     - WARNING: Lower numbers can jeopardize game performance.
 * 
 *     Mirror Animations?:
 *     - Mirror repeating animations for states by default?
 * 
 *     Mute Animations?:
 *     - Mute repeating animations for states by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Response Popup Settings
 * ============================================================================
 *
 * Popup settings for response-type state effects. These include counterattack,
 * magic reflection, and substitute.
 *
 * ---
 *
 * Counter Popup
 * 
 * Reflect Popup
 * 
 * Substitute Popup
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 * 
 *   Icon Index:
 *   - What icon is used for this popup?
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
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
 * Version 1.23: December 19, 2024
 * * Documentation Update!
 * ** Updated targets <Repeat Animation: x> and <Repeat Animation Cycle: x>.
 * * Feature Update!
 * ** Expanded database targets for notetags: <Repeat Animation: x> and
 *    <Repeat Animation Cycle: x>.
 * *** From State Notetags only to Actor, Class, Skill, Weapon, Armor, Enemy,
 *     State Notetags
 * 
 * Version 1.22: October 17, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Response Popup Settings
 * **** Popup settings for response-type state effects (ie Counter, Reflect,
 *      Substitute).
 * **** See help file for more information.
 * 
 * Version 1.21: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > State Settings > Battle End Popups?
 * **** Show State Popup removal on battle end for battle state removal?
 * 
 * Version 1.20: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > State Settings > State Popups > Allow Duplicates?
 * **** Allow duplicate state popups to appear with the same graphical frame?
 * 
 * Version 1.19: March 16, 2023
 * * Compatibility Update!
 * ** Plugin is now updated for the recent changes made with the
 *    VisuMZ_2_DragonbonesUnion plugin.
 * 
 * Version 1.18: October 13, 2022
 * * Compatibility Update!
 * ** Plugin should be more compatible with VisuMZ_2_DragonbonesUnion.
 * 
 * Version 1.17: September 29, 2022
 * * Bug Fixes!
 * ** Filename has been shortened from VisuMZ_3_VisualStateEffects.js to
 *    VisuMZ_3_VisualStateEffect.js due to deployment reasons. For some mobile
 *    devices, keeping the name as long as VisuMZ_3_VisualStateEffects.js
 *    causes problems, but VisuMZ_3_VisualStateEffect.js is fine. Take note of
 *    this while you are updating.
 * 
 * Version 1.16: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New state notetag added by Irina: <Custom Overlay: filename>
 * *** For those who don't want to use the img/system/ folder's "States" image
 *     file and want something custom, this notetag will do exactly that.
 * *** Custom state overlays will follow similar dimensions to the original
 *     States image: Pixel Width of 768, Pixel Height of 96, Total Frames of 8.
 * *** If you want to use different sizes, we recommend you look into Effekseer
 *     custom animations with the <Repeat Animation: x> notetag instead.
 * 
 * Version 1.15: February 17, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: July 2, 2021
 * * Feature Updates!
 * ** When a battler's sprite opacity is zero, repeating animations are hidden
 *    along with them. Update made by Arisu.
 * 
 * Version 1.13: June 18, 2021
 * * Bug Fixes!
 * ** Repeating animations no longer play on invisible enemies or dead enemies
 *    through passive state effects. Fix made by Arisu.
 * 
 * Version 1.12: June 11, 2021
 * * Documentation Update!
 * ** Added warnings for the following notetags by Irina:
 * *** <Repeat Animation: x>
 * *** <State Motion: x>
 * *** <State Motion Lock>
 * *** <Visual Opacity: x>
 * *** <Visual Rainbow: +/-x>
 * *** <Visual Hover Effect>
 * *** <Visual Breathing Effect>
 * **** NOTE: Using this with Passive State Conditions will make this effect
 *      update at the next battler refresh cycle. This is due to the effect
 *      being cached in order to prevent lag and overloading the engine.
 * 
 * Version 1.11: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina:
 * *** <Visual Breathing Effect>
 * *** <No Breathing>
 * **** Enables/disables breathing effects for your actors and/or enemies.
 *      Refer to the documentation for more details on how to set it up.
 * **** These are EXPERIMENTAL notetags. This means that these effects have the
 *      possibility of creating graphical glitches when used. Use at your own
 *      risk as these are not perfected features.
 * 
 * Version 1.10: January 1, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Yanfly.
 * *** <Visual Rainbow: +x> and <Visual Rainbow: -x>
 * 
 * Version 1.09: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Yanfly.
 * *** <Visual Opacity: x> and <Visual Opacity: x%>
 * 
 * Version 1.08: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Requires updated Core Engine. Fix made by Yanfly.
 * 
 * Version 1.07: November 22, 2020
 * * Bug Fixes!
 * ** <State Motion: x> now works for sideview enemies. Keep in mind the state
 *    motion does not apply to the active battler during the Input phase. Fix
 *    made by Yanfly.
 * 
 * Version 1.06: November 8, 2020
 * * Bug Fixes!
 * ** <Add Animation: x> and <Erase Animation: x> notetags now work properly.
 *    Fix by Arisu.
 * 
 * Version 1.05: November 1, 2020
 * * Feature Update!
 * ** Upon dying, state removal popups are no longer shown to prevent massive
 *    clutter of the screen. Update by Irina.
 * 
 * Version 1.04: October 25, 2020
 * * Bug Fixes!
 * ** Zooming in should no longer display faint outlines around state sprites.
 *    Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility with the Battle Core's new <Battler Sprite Grounded>
 *    notetag. Added by Irina.
 * 
 * Version 1.03: October 11, 2020
 * * Bug Fixes!
 * ** Motion Locked Battlers at the start of battle no longer show their entire
 *    sprite sheet. Fix made by Arisu.
 * 
 * Version 1.02: September 13, 2020
 * * Compatibility Update
 * ** Added compatibility with Battle Core's newest update for the new
 *    distortion effects.
 * 
 * Version 1.01: September 6, 2020
 * * Compatibility Update
 * ** Added compatibility with Battle Core's newest update for the
 *    <Battle UI Offset: +x, +y> notetags. Update made by Yanfly.
 *
 * Version 1.00: September 2, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param VisualStateEffects
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings for Visual State Effects.
 * @default {"Actors":"","ActorOverlay:eval":"true","ActorStateIcon:eval":"true","Enemies":"","EnemyOverlay:eval":"true","EnemyStateIcon:eval":"true"}
 *
 * @param BuffDebuff:struct
 * @text Buff/Debuff Settings
 * @type struct<BuffDebuff>
 * @desc Buff/Debuff settings for Visual State Effects.
 * @default {"ShowPopups:eval":"true","BuffPopupFmt:str":"%1▲","BuffTextColor:str":"24","BuffFlashColor:eval":"[0, 255, 0, 160]","BuffFlashDuration:num":"60","DebuffPopupFmt:str":"%1▼","DebuffTextColor:str":"27","DebuffFlashColor:eval":"[255, 0, 0, 160]","DebuffFlashDuration:num":"60","ShowAnimations:eval":"true","AnimationMirror:eval":"false","AnimationMute:eval":"false","BuffAnimations":"","Buff0Animation:num":"52","Buff1Animation:num":"53","Buff2Animation:num":"52","Buff3Animation:num":"52","Buff4Animation:num":"53","Buff5Animation:num":"53","Buff6Animation:num":"51","Buff7Animation:num":"51","DebuffAnimations":"","Debuff0Animation:num":"55","Debuff1Animation:num":"56","Debuff2Animation:num":"55","Debuff3Animation:num":"55","Debuff4Animation:num":"56","Debuff5Animation:num":"56","Debuff6Animation:num":"54","Debuff7Animation:num":"54"}
 *
 * @param State:struct
 * @text State Defaults
 * @type struct<State>
 * @desc Default State settings for Visual State Effects.
 * @default {"ShowPopups:eval":"true","AddPopupFmt:str":"+%1","ErasePopupFmt:str":"-%1","TextColor:str":"0","MatchTurnCountColor:eval":"true","FlashColor:eval":"[0, 0, 0, 0]","FlashDuration:num":"60","StateAnimations":"","AddEraseAnimations":"","AnimationMirror:eval":"false","AnimationMute:eval":"false","RepeatingAnimations":"","CycleTime:num":"300","RepeatMirror:eval":"false","RepeatMute:eval":"true"}
 *
 * @param CounterPopup:struct
 * @text Response Popup Settings
 * @parent State:struct
 * @type struct<CounterPopup>
 * @desc Popup settings for response-type state effects.
 * @default {"Counter":"","CounterPopupText:str":"COUNTER!","CounterIcon:num":"0","CounterTextColor:str":"0","CounterTextColorID:num":"0","CounterFlashColor:eval":"[255, 255, 255, 160]","CounterFlashDuration:num":"60","Reflect":"","ReflectPopupText:str":"REFLECT!","ReflectIcon:num":"0","ReflectTextColor:str":"0","ReflectTextColorID:num":"0","ReflectFlashColor:eval":"[255, 255, 255, 160]","ReflectFlashDuration:num":"60","Sub":"","SubPopupText:str":"COVER!","SubIcon:num":"0","SubTextColor:str":"0","SubTextColorID:num":"0","SubFlashColor:eval":"[255, 255, 255, 160]","SubFlashDuration:num":"60"}
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
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param Actors
 *
 * @param ActorOverlay:eval
 * @text Show State Overlay?
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show state overlays over an actor's head?
 * @default true
 *
 * @param ActorStateIcon:eval
 * @text Show State Icons?
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show state icons over an actor's head?
 * @default true
 *
 * @param Enemies
 *
 * @param EnemyOverlay:eval
 * @text Show State Overlay?
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show state overlays over an enemy's head?
 * @default true
 *
 * @param EnemyStateIcon:eval
 * @text Show State Icons?
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show state icons over an enemy's head?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BuffDebuff:
 *
 * @param ShowPopups:eval
 * @text Show Popups?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Buff/Debuff Popups when applied?
 * @default true
 *
 * @param BuffPopupFmt:str
 * @text Buff Format
 * @parent ShowPopups:eval
 * @desc How do you want the buff text to appear?
 * %1 - Parameter Name
 * @default %1▲
 *
 * @param BuffTextColor:str
 * @text Text Color
 * @parent BuffPopupFmt:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param BuffFlashColor:eval
 * @text Flash Color
 * @parent BuffPopupFmt:str
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 255, 0, 160]
 * 
 * @param BuffFlashDuration:num
 * @text Flash Duration
 * @parent BuffPopupFmt:str
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param DebuffPopupFmt:str
 * @text Debuff Format
 * @parent ShowPopups:eval
 * @desc How do you want the debuff text to appear?
 * %1 - Parameter Name
 * @default %1▼
 *
 * @param DebuffTextColor:str
 * @text Text Color
 * @parent DebuffPopupFmt:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param DebuffFlashColor:eval
 * @text Flash Color
 * @parent DebuffPopupFmt:str
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param DebuffFlashDuration:num
 * @text Flash Duration
 * @parent DebuffPopupFmt:str
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param ShowAnimations:eval
 * @text Show Animations?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Buff/Debuff Animations when applied?
 * @default true
 *
 * @param AnimationMirror:eval
 * @text Mirror Animations?
 * @parent ShowAnimations:eval
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror animations for buffs/debuffs?
 * @default false
 *
 * @param AnimationMute:eval
 * @text Mute Animations?
 * @parent ShowAnimations:eval
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute animations for buffs/debuffs?
 * @default false
 * 
 * @param BuffAnimations
 * @text Buff Animations
 * @parent ShowAnimations:eval
 *
 * @param Buff0Animation:num
 * @text MaxHP Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying MaxHP Buffs.
 * @default 52
 *
 * @param Buff1Animation:num
 * @text MaxMP Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying MaxMP Buffs.
 * @default 53
 *
 * @param Buff2Animation:num
 * @text ATK Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying ATK Buffs.
 * @default 52
 *
 * @param Buff3Animation:num
 * @text DEF Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying DEF Buffs.
 * @default 52
 *
 * @param Buff4Animation:num
 * @text MAT Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying MAT Buffs.
 * @default 53
 *
 * @param Buff5Animation:num
 * @text MDF Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying MDF Buffs.
 * @default 53
 *
 * @param Buff6Animation:num
 * @text AGI Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying AGI Buffs.
 * @default 51
 *
 * @param Buff7Animation:num
 * @text LUK Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying LUK Buffs.
 * @default 51
 * 
 * @param DebuffAnimations
 * @text Debuff Animations
 * @parent ShowAnimations:eval
 *
 * @param Debuff0Animation:num
 * @text MaxHP Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying MaxHP Debuffs.
 * @default 55
 *
 * @param Debuff1Animation:num
 * @text MaxMP Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying MaxMP Debuffs.
 * @default 56
 *
 * @param Debuff2Animation:num
 * @text ATK Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying ATK Debuffs.
 * @default 55
 *
 * @param Debuff3Animation:num
 * @text DEF Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying DEF Debuffs.
 * @default 55
 *
 * @param Debuff4Animation:num
 * @text MAT Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying MAT Debuffs.
 * @default 56
 *
 * @param Debuff5Animation:num
 * @text MDF Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying MDF Debuffs.
 * @default 56
 *
 * @param Debuff6Animation:num
 * @text AGI Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying AGI Debuffs.
 * @default 54
 *
 * @param Debuff7Animation:num
 * @text LUK Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying LUK Debuffs.
 * @default 54
 *
 */
/* ----------------------------------------------------------------------------
 * State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~State:
 *
 * @param ShowPopups:eval
 * @text Show Popups?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show States Popups when applied and removed?
 * @default true
 *
 * @param AllowDupes:eval
 * @text Allow Duplicates?
 * @parent ShowPopups:eval
 * @type boolean
 * @on Allow
 * @off Disallow
 * @desc Allow duplicate state popups to appear with the same graphical frame?
 * @default false
 *
 * @param BattleEndPopup:eval
 * @text Battle End Popups?
 * @parent ShowPopups:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show State Popup removal on battle end for battle state removal?
 * @default true
 *
 * @param AddPopupFmt:str
 * @text Add State Format
 * @parent ShowPopups:eval
 * @desc How do you want added states to appear?
 * %1 - State Name
 * @default +%1
 *
 * @param ErasePopupFmt:str
 * @text Erase State Format
 * @parent ShowPopups:eval
 * @desc How do you want erased states to appear?
 * %1 - State Name
 * @default -%1
 *
 * @param TextColor:str
 * @text Default Text Color
 * @parent ShowPopups:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param MatchTurnCountColor:eval
 * @text Match Turn Count?
 * @parent TextColor:str
 * @type boolean
 * @on Match
 * @off Don't
 * @desc Match turn count color by default?
 * @default true
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent ShowPopups:eval
 * @desc Adjust the popup's default flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 0, 0, 0]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type number
 * @desc What is the frame duration of the default flash effect?
 * @default 60
 * 
 * @param StateAnimations
 * @text State Animations
 * 
 * @param AddEraseAnimations
 * @text Add/Erase Animations
 * @parent StateAnimations
 *
 * @param AnimationMirror:eval
 * @text Mirror Animations?
 * @parent AddEraseAnimations
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror animations for states?
 * @default false
 *
 * @param AnimationMute:eval
 * @text Mute Animations?
 * @parent AddEraseAnimations
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute animations for states?
 * @default false
 * 
 * @param RepeatingAnimations
 * @text Repeating Animations
 * @parent StateAnimations
 *
 * @param CycleTime:num
 * @text Cycle Time
 * @parent RepeatingAnimations
 * @type number
 * @min 1
 * @desc The amount of frames to wait before each animation cycle.
 * WARNING: Lower numbers can jeopardize game performance.
 * @default 300
 *
 * @param RepeatMirror:eval
 * @text Mirror Animations?
 * @parent RepeatingAnimations
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror repeating animations for states by default?
 * @default false
 *
 * @param RepeatMute:eval
 * @text Mute Animations?
 * @parent RepeatingAnimations
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute repeating animations for states by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Counter Popups Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CounterPopup:
 *
 * @param Counter
 * @text Counter Popup
 *
 * @param CounterPopupText:str
 * @text Text
 * @parent Counter
 * @desc Text displayed upon the effect activating.
 * @default COUNTER!
 *
 * @param CounterIcon:num
 * @text Icon Index
 * @parent Counter
 * @desc What icon is used for this popup?
 * @default 0
 *
 * @param CounterTextColor:str
 * @text Text Color
 * @parent Counter
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param CounterFlashColor:eval
 * @text Flash Color
 * @parent Counter
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 160]
 * 
 * @param CounterFlashDuration:num
 * @text Flash Duration
 * @parent Counter
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Reflect
 * @text Reflect Popup
 *
 * @param ReflectPopupText:str
 * @text Text
 * @parent Reflect
 * @desc Text displayed upon the effect activating.
 * @default REFLECT!
 *
 * @param ReflectIcon:num
 * @text Icon Index
 * @parent Reflect
 * @desc What icon is used for this popup?
 * @default 0
 *
 * @param ReflectTextColor:str
 * @text Text Color
 * @parent Reflect
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ReflectFlashColor:eval
 * @text Flash Color
 * @parent Reflect
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 160]
 * 
 * @param ReflectFlashDuration:num
 * @text Flash Duration
 * @parent Reflect
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Sub
 * @text Substitute Popup
 *
 * @param SubPopupText:str
 * @text Text
 * @parent Sub
 * @desc Text displayed upon the effect activating.
 * @default COVER!
 *
 * @param SubIcon:num
 * @text Icon Index
 * @parent Sub
 * @desc What icon is used for this popup?
 * @default 0
 *
 * @param SubTextColor:str
 * @text Text Color
 * @parent Sub
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param SubFlashColor:eval
 * @text Flash Color
 * @parent Sub
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 160]
 * 
 * @param SubFlashDuration:num
 * @text Flash Duration
 * @parent Sub
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
//=============================================================================

const _0x3acf3d=_0x3ff2;function _0x3ff2(_0x12a066,_0x5d0dd0){const _0x4afe43=_0x4afe();return _0x3ff2=function(_0x3ff2eb,_0x1d6565){_0x3ff2eb=_0x3ff2eb-0x155;let _0x1b3395=_0x4afe43[_0x3ff2eb];return _0x1b3395;},_0x3ff2(_0x12a066,_0x5d0dd0);}function _0x4afe(){const _0x3a544c=['customizeStatePopup','isStateAffected','Sprite_Actor_setBattler','ActorStateIcon','visualStateRainbow','includes','createStateSprite','mainSpriteScaleY','addChild','4108752YeRNXo','rateY','VisualStateEffects','Window_BattleLog_displaySubstitute','stateMotionIndex','checkCacheKey','return\x200','applyBreathingCalculations','flashColor','traitObjects','battler','%1%2Animation','hoverData','Game_BattlerBase_increaseBuff','breathing','Counter','createVisualBreathingData','EnemyStateIcon','updateFrame','random','Sprite_StateOverlay_updateFrame','BuffDebuff','push','CycleTime','isActor','loadSystem','startMotion','AnimationMirror','136BGNzun','AnimationMute','_hoverMinimum','createStateIconSprite','rateX','hasDragonbonesBattler','_visualStateAnimationRepeatDuration','min','States','Sprite_Actor_updateFrame','parse','VisuMZ_2_DragonbonesUnion','getVisualRepeatingStateAnimation','isSpriteVisible','height','battleUIOffsetY','RepeatMirror','map','1975680qWoaqz','smooth','addLoadListener','672735UNkkMk','updateCustomOverlayFrame','rate','setupBuffDebuffPopup','isInputting','State','_customStateMotion','stateMotionLock','setupIconTextPopup','updateVisualStateEffectsIcons','%1PopupText','setupVisualStateEffect','2094mbzetv','mainSpriteScaleX','updateVisualStateEffects','textColor','setFrame','hoverHeight','state-%1-%2-%3','21260NDrwzj','ConvertParams','deathHover','Erase','bitmap','_stateSprite','onRemoveState','note','_die_bypass_visualStateEffects','toLowerCase','_visualStateAnimationIndex','createVisualBattlerOpacity','exit','929244EkDdKc','isAppeared','max','_overlayIndex','prototype','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','flashDuration','_stateMotionLocked','visualBattlerOpacity','visualStateToneTargetSprite','floor','deathStateId','Debuff','noBreathing','Game_Battler_onRemoveState','hasSvBattler','Game_BattlerBase_refresh','getStateMotionLock','breathingData','setBattler','SetupResponsePopup','removeBattleStates','isEnemy','setHue','format','306nouvlf','clamp','initVisualStateEffects','setupVisualBuffDebuffEffect','updateRepeatingVisualStateAnimation','Reflect','getVisualStateTone','trim','_stateIconSprite','_frame','createVisualStateTone','createVisualRepeatingStateAnimationCycle','_bitmapName','Game_BattlerBase_die','_battler','decreaseBuff','createVisualStateRainbow','onLoadDefaultOverlayBitmap','_mainSprite','ICON_BUFF_START','frameCount','onLoadCustomOverlayBitmap','getVisualRepeatingStateAnimationCycle','Sprite_Battler_updateDragonbonesTimeScale','visualRepeatingStateAniCycle','Sprite_Actor_update','round','General','updateDragonbonesTimeScale','FUNC','match','ARRAYNUM','isBattlerGrounded','Sprite_Battler_mainSpriteScaleX','status','Sprite_StateOverlay_loadBitmap','_svBattlerSprite','displayReflection','concat','applyBreathingScaleY','die','length','2yJIptB','toUpperCase','Sprite_SvEnemy','updateDistortionOpacity','overlay','battleUIOffsetX','_actor','%1TextColor','call','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','timeScale','CounterPopup','hpRate','MatchTurnCountColor','constructor','_hue','Sprite_Actor_createStateSprite','opacity','Game_BattlerBase_decreaseBuff','updateOpacity','_distortionSprite','Add','createVisualRepeatingStateAnimation','Game_BattlerBase_initMembers','_pattern','setupStateAnimation','_dragonbones','setupTextPopup','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','visualRepeatingStateAnimation','version','Sprite_Battler_updateOpacity','VisuMZ_0_CoreEngine','setColorTone','Window_BattleLog_displayCounter','3722763ljYFgy','Buff','base','Sprite_Enemy_setBattler','%1PopupFmt','%1CounterIcon','Game_Battler_removeBattleStates','isRepeatingVisualStateAnimationShown','Sprite_Battler_playDragonbonesMotion','param','%1FlashDuration','requestFauxAnimation','increaseBuff','updateVisualStateEffectsOverlay','ShowPopups','extraPositionY','_noDoublePopups','isActing','Sprite_Battler_extraPositionY','Game_Battler_onAddState','initVisualHoverEffect','passiveStateObjects','speed','split','hpLinked','description','applyBreathingScaleX','ARRAYEVAL','_dragonbonesSpriteContainer','updateVisualStateRainbow','initMembers','scale','loadBitmap','VisuMZ_1_BattleCore','filter','_hoverRand','updateVisualStateTone','speedX','_breathingRand','name','Sprite_Actor_refreshMotion','stateOverlayIndex','Settings','hover','_loadingCustomOverlay','idle','speedY','IconSet','refresh','isAlive','update','ARRAYSTRUCT','getStateOverlayIndex','refreshMotion','states','setupVisualStateEffectsPopup','visible','%1FlashColor','cos','FlashDuration','339650oQsFsj','VisuMZ_1_SkillsStatesCore','onAddState','Sprite_Enemy_createStateIconSprite','displayCounter','bind','_show_battleRemovalStates','isSceneBattle','getStateMotionIndex','playDragonbonesMotion','Window_BattleLog_displayReflection','displaySubstitute','_cache'];_0x4afe=function(){return _0x3a544c;};return _0x4afe();}(function(_0x1b4658,_0x23d0e7){const _0x2e5302=_0x3ff2,_0x3e9f55=_0x1b4658();while(!![]){try{const _0x5793c5=-parseInt(_0x2e5302(0x20f))/0x1*(-parseInt(_0x2e5302(0x252))/0x2)+parseInt(_0x2e5302(0x1ec))/0x3+parseInt(_0x2e5302(0x1be))/0x4+parseInt(_0x2e5302(0x202))/0x5*(-parseInt(_0x2e5302(0x1fb))/0x6)+-parseInt(_0x2e5302(0x1ef))/0x7*(parseInt(_0x2e5302(0x1da))/0x8)+-parseInt(_0x2e5302(0x228))/0x9*(-parseInt(_0x2e5302(0x1a8))/0xa)+parseInt(_0x2e5302(0x16c))/0xb;if(_0x5793c5===_0x23d0e7)break;else _0x3e9f55['push'](_0x3e9f55['shift']());}catch(_0x3cc6c3){_0x3e9f55['push'](_0x3e9f55['shift']());}}}(_0x4afe,0xf1d26));var label=_0x3acf3d(0x1c0),tier=tier||0x0,dependencies=[_0x3acf3d(0x169),_0x3acf3d(0x18d),_0x3acf3d(0x1a9)],pluginData=$plugins[_0x3acf3d(0x18e)](function(_0x3f34a4){const _0x56e830=_0x3acf3d;return _0x3f34a4[_0x56e830(0x24a)]&&_0x3f34a4[_0x56e830(0x185)][_0x56e830(0x1ba)]('['+label+']');})[0x0];VisuMZ[label][_0x3acf3d(0x196)]=VisuMZ[label][_0x3acf3d(0x196)]||{},VisuMZ[_0x3acf3d(0x203)]=function(_0x3d779d,_0x1bd98c){const _0x30aae1=_0x3acf3d;for(const _0xe4a820 in _0x1bd98c){if(_0xe4a820['match'](/(.*):(.*)/i)){const _0x32ed0a=String(RegExp['$1']),_0x4db72b=String(RegExp['$2'])[_0x30aae1(0x253)]()['trim']();let _0xfa3a08,_0x1be73a,_0x2f8452;switch(_0x4db72b){case'NUM':_0xfa3a08=_0x1bd98c[_0xe4a820]!==''?Number(_0x1bd98c[_0xe4a820]):0x0;break;case _0x30aae1(0x247):_0x1be73a=_0x1bd98c[_0xe4a820]!==''?JSON[_0x30aae1(0x1e4)](_0x1bd98c[_0xe4a820]):[],_0xfa3a08=_0x1be73a[_0x30aae1(0x1eb)](_0x7200e2=>Number(_0x7200e2));break;case'EVAL':_0xfa3a08=_0x1bd98c[_0xe4a820]!==''?eval(_0x1bd98c[_0xe4a820]):null;break;case _0x30aae1(0x187):_0x1be73a=_0x1bd98c[_0xe4a820]!==''?JSON[_0x30aae1(0x1e4)](_0x1bd98c[_0xe4a820]):[],_0xfa3a08=_0x1be73a[_0x30aae1(0x1eb)](_0xc4a39e=>eval(_0xc4a39e));break;case'JSON':_0xfa3a08=_0x1bd98c[_0xe4a820]!==''?JSON['parse'](_0x1bd98c[_0xe4a820]):'';break;case'ARRAYJSON':_0x1be73a=_0x1bd98c[_0xe4a820]!==''?JSON['parse'](_0x1bd98c[_0xe4a820]):[],_0xfa3a08=_0x1be73a['map'](_0x2e9a66=>JSON[_0x30aae1(0x1e4)](_0x2e9a66));break;case _0x30aae1(0x245):_0xfa3a08=_0x1bd98c[_0xe4a820]!==''?new Function(JSON[_0x30aae1(0x1e4)](_0x1bd98c[_0xe4a820])):new Function(_0x30aae1(0x1c4));break;case'ARRAYFUNC':_0x1be73a=_0x1bd98c[_0xe4a820]!==''?JSON[_0x30aae1(0x1e4)](_0x1bd98c[_0xe4a820]):[],_0xfa3a08=_0x1be73a[_0x30aae1(0x1eb)](_0x104158=>new Function(JSON['parse'](_0x104158)));break;case'STR':_0xfa3a08=_0x1bd98c[_0xe4a820]!==''?String(_0x1bd98c[_0xe4a820]):'';break;case'ARRAYSTR':_0x1be73a=_0x1bd98c[_0xe4a820]!==''?JSON[_0x30aae1(0x1e4)](_0x1bd98c[_0xe4a820]):[],_0xfa3a08=_0x1be73a[_0x30aae1(0x1eb)](_0x4d5605=>String(_0x4d5605));break;case'STRUCT':_0x2f8452=_0x1bd98c[_0xe4a820]!==''?JSON['parse'](_0x1bd98c[_0xe4a820]):{},_0xfa3a08=VisuMZ['ConvertParams']({},_0x2f8452);break;case _0x30aae1(0x19f):_0x1be73a=_0x1bd98c[_0xe4a820]!==''?JSON[_0x30aae1(0x1e4)](_0x1bd98c[_0xe4a820]):[],_0xfa3a08=_0x1be73a[_0x30aae1(0x1eb)](_0x404b59=>VisuMZ[_0x30aae1(0x203)]({},JSON[_0x30aae1(0x1e4)](_0x404b59)));break;default:continue;}_0x3d779d[_0x32ed0a]=_0xfa3a08;}}return _0x3d779d;},(_0x2566c4=>{const _0x16eb82=_0x3acf3d,_0x4bd759=_0x2566c4[_0x16eb82(0x193)];for(const _0xf16c67 of dependencies){if(!Imported[_0xf16c67]){alert(_0x16eb82(0x165)[_0x16eb82(0x227)](_0x4bd759,_0xf16c67)),SceneManager['exit']();break;}}const _0x471cec=_0x2566c4[_0x16eb82(0x185)];if(_0x471cec[_0x16eb82(0x246)](/\[Version[ ](.*?)\]/i)){const _0x565219=Number(RegExp['$1']);_0x565219!==VisuMZ[label][_0x16eb82(0x167)]&&(alert(_0x16eb82(0x214)[_0x16eb82(0x227)](_0x4bd759,_0x565219)),SceneManager[_0x16eb82(0x20e)]());}if(_0x471cec['match'](/\[Tier[ ](\d+)\]/i)){const _0x400307=Number(RegExp['$1']);_0x400307<tier?(alert(_0x16eb82(0x25b)[_0x16eb82(0x227)](_0x4bd759,_0x400307,tier)),SceneManager[_0x16eb82(0x20e)]()):tier=Math[_0x16eb82(0x211)](_0x400307,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x2566c4['parameters']);})(pluginData),VisuMZ[_0x3acf3d(0x1c0)][_0x3acf3d(0x160)]=Game_BattlerBase[_0x3acf3d(0x213)][_0x3acf3d(0x18a)],Game_BattlerBase[_0x3acf3d(0x213)][_0x3acf3d(0x18a)]=function(){const _0x3c5be1=_0x3acf3d;this['_cache']={},VisuMZ[_0x3c5be1(0x1c0)][_0x3c5be1(0x160)][_0x3c5be1(0x25a)](this);},VisuMZ[_0x3acf3d(0x1c0)][_0x3acf3d(0x21f)]=Game_BattlerBase[_0x3acf3d(0x213)][_0x3acf3d(0x19c)],Game_BattlerBase['prototype'][_0x3acf3d(0x19c)]=function(){const _0x2a46ad=_0x3acf3d;this[_0x2a46ad(0x1b4)]={},VisuMZ[_0x2a46ad(0x1c0)]['Game_BattlerBase_refresh']['call'](this);},Game_BattlerBase[_0x3acf3d(0x213)]['checkCacheKey']=function(_0x2660f8){const _0x54ed2e=_0x3acf3d;return this[_0x54ed2e(0x1b4)]=this[_0x54ed2e(0x1b4)]||{},this[_0x54ed2e(0x1b4)][_0x2660f8]!==undefined;},VisuMZ['VisualStateEffects'][_0x3acf3d(0x1cb)]=Game_BattlerBase[_0x3acf3d(0x213)][_0x3acf3d(0x178)],Game_BattlerBase['prototype']['increaseBuff']=function(_0x518788){const _0x10caed=_0x3acf3d;VisuMZ[_0x10caed(0x1c0)][_0x10caed(0x1cb)][_0x10caed(0x25a)](this,_0x518788),this[_0x10caed(0x22b)](_0x518788,!![]);},VisuMZ[_0x3acf3d(0x1c0)][_0x3acf3d(0x15b)]=Game_BattlerBase[_0x3acf3d(0x213)][_0x3acf3d(0x237)],Game_BattlerBase[_0x3acf3d(0x213)][_0x3acf3d(0x237)]=function(_0xec8ef8){const _0x42d83e=_0x3acf3d;VisuMZ['VisualStateEffects'][_0x42d83e(0x15b)]['call'](this,_0xec8ef8),this[_0x42d83e(0x22b)](_0xec8ef8,![]);},Game_BattlerBase[_0x3acf3d(0x213)][_0x3acf3d(0x22b)]=function(_0x104263,_0x5eb1ec){const _0x7b63e7=_0x3acf3d;if(!SceneManager[_0x7b63e7(0x1af)]())return;if(!this[_0x7b63e7(0x1c8)]())return;const _0x3c95fd=VisuMZ[_0x7b63e7(0x1c0)][_0x7b63e7(0x196)][_0x7b63e7(0x1d3)],_0x110043=_0x5eb1ec?_0x7b63e7(0x16d):_0x7b63e7(0x21b);_0x3c95fd['ShowPopups']&&this[_0x7b63e7(0x1c8)]()[_0x7b63e7(0x1f2)](_0x104263,_0x5eb1ec);if(_0x3c95fd['ShowAnimations']){const _0x4911ac=[this],_0x1a8ce5=_0x3c95fd[_0x7b63e7(0x1c9)['format'](_0x110043,_0x104263)]||0x0,_0x1c3a46=_0x3c95fd[_0x7b63e7(0x1d9)],_0xc099fc=_0x3c95fd[_0x7b63e7(0x1db)];$gameTemp[_0x7b63e7(0x177)](_0x4911ac,_0x1a8ce5,_0x1c3a46,_0xc099fc);}},Game_BattlerBase[_0x3acf3d(0x213)]['setupVisualStateEffect']=function(_0x2a0e1e,_0x483cc7){const _0x5bf6df=_0x3acf3d;if(!SceneManager[_0x5bf6df(0x1af)]())return;if(_0x2a0e1e===this[_0x5bf6df(0x21a)]())return;if(_0x483cc7&&!this['isStateAffected'](_0x2a0e1e))return;if(!_0x483cc7&&this[_0x5bf6df(0x1b6)](_0x2a0e1e))return;if(!this[_0x5bf6df(0x1c8)]())return;const _0x29c581=VisuMZ['VisualStateEffects'][_0x5bf6df(0x196)][_0x5bf6df(0x1f4)],_0x5cbb48=$dataStates[_0x2a0e1e];if(!_0x5cbb48)return;_0x29c581[_0x5bf6df(0x17a)]&&!_0x5cbb48[_0x5bf6df(0x209)][_0x5bf6df(0x246)](/<HIDE STATE POPUP>/i)&&this[_0x5bf6df(0x1c8)]()[_0x5bf6df(0x1a3)](_0x2a0e1e,_0x483cc7),VisuMZ['VisualStateEffects'][_0x5bf6df(0x162)](this,_0x5cbb48,_0x483cc7);},VisuMZ[_0x3acf3d(0x1c0)]['setupStateAnimation']=function(_0x51acbe,_0x386c3e,_0x5d8217){const _0x392120=_0x3acf3d,_0x15066c=VisuMZ[_0x392120(0x1c0)][_0x392120(0x196)][_0x392120(0x1f4)],_0x49ffc9=_0x15066c[_0x392120(0x1d9)],_0x543c0b=_0x15066c[_0x392120(0x1db)],_0xad535b=_0x386c3e[_0x392120(0x209)];if(_0x5d8217&&_0xad535b['match'](/(?:ADD|APPLY) ANIMATION:[ ](\d+)/i)){const _0x1116ee=Number(RegExp['$1']);$gameTemp['requestFauxAnimation']([_0x51acbe],_0x1116ee,_0x49ffc9,_0x543c0b);}if(!_0x5d8217&&_0xad535b[_0x392120(0x246)](/(?:ERASE|REMOVE) ANIMATION:[ ](\d+)/i)){const _0x45cefd=Number(RegExp['$1']);$gameTemp[_0x392120(0x177)]([_0x51acbe],_0x45cefd,_0x49ffc9,_0x543c0b);}},Game_BattlerBase[_0x3acf3d(0x213)]['getVisualRepeatingStateAnimation']=function(){const _0x13ea7d=_0x3acf3d,_0x2a572c=_0x13ea7d(0x166);if(this['checkCacheKey'](_0x2a572c))return this['_cache'][_0x2a572c];return this[_0x13ea7d(0x1b4)][_0x2a572c]=this[_0x13ea7d(0x15f)](),this['_cache'][_0x2a572c];},Game_BattlerBase[_0x3acf3d(0x213)][_0x3acf3d(0x15f)]=function(){const _0x2b3d5b=_0x3acf3d;let _0xac47b6=[];const _0x2d563d=this[_0x2b3d5b(0x181)]?this['passiveStateObjects']()['concat'](this['states']()):this[_0x2b3d5b(0x1c7)]();for(const _0x3f7873 of _0x2d563d){if(!_0x3f7873)continue;_0x3f7873['note'][_0x2b3d5b(0x246)](/<(?:REPEAT|REPEATING|CYCLE|STATE) ANIMATION:[ ](\d+)>/i)&&_0xac47b6[_0x2b3d5b(0x1d4)](Number(RegExp['$1'])||0x0);}return _0xac47b6;},Game_BattlerBase[_0x3acf3d(0x213)]['getVisualRepeatingStateAnimationCycle']=function(){const _0x3ef64a=_0x3acf3d,_0x5437f7=_0x3ef64a(0x240);if(this[_0x3ef64a(0x1c3)](_0x5437f7))return this[_0x3ef64a(0x1b4)][_0x5437f7];return this['_cache'][_0x5437f7]=this['createVisualRepeatingStateAnimationCycle'](),this['_cache'][_0x5437f7];},Game_BattlerBase['prototype'][_0x3acf3d(0x233)]=function(){const _0x4f4290=_0x3acf3d;let _0x13e735=[];const _0x28c42e=this[_0x4f4290(0x181)]?this['passiveStateObjects']()[_0x4f4290(0x24e)](this[_0x4f4290(0x1a2)]()):this[_0x4f4290(0x1c7)]();for(const _0x273f06 of _0x28c42e){if(!_0x273f06)continue;_0x273f06[_0x4f4290(0x209)][_0x4f4290(0x246)](/<(?:REPEAT|REPEATING|CYCLE|STATE) ANIMATION:[ ](\d+)>/i)&&(_0x273f06[_0x4f4290(0x209)][_0x4f4290(0x246)](/<(?:REPEAT|REPEATING|CYCLE|STATE) ANIMATION CYCLE:[ ](\d+)>/i)?_0x13e735[_0x4f4290(0x1d4)](Number(RegExp['$1'])||0x0):_0x13e735['push'](VisuMZ[_0x4f4290(0x1c0)]['Settings'][_0x4f4290(0x1f4)][_0x4f4290(0x1d5)]));}return _0x13e735;},Game_BattlerBase[_0x3acf3d(0x213)][_0x3acf3d(0x1c2)]=function(){const _0x34b050=_0x3acf3d,_0x2187d3=_0x34b050(0x1c2);if(this['checkCacheKey'](_0x2187d3))return this[_0x34b050(0x1b4)][_0x2187d3];return this[_0x34b050(0x1b4)][_0x2187d3]=this[_0x34b050(0x1b0)](),this[_0x34b050(0x1b4)][_0x2187d3];},Game_BattlerBase[_0x3acf3d(0x213)][_0x3acf3d(0x1b0)]=function(){const _0xbf56e4=_0x3acf3d,_0x242211=this[_0xbf56e4(0x1a2)]();for(const _0x1f1f45 of _0x242211){if(!_0x1f1f45)continue;if(_0x1f1f45[_0xbf56e4(0x209)][_0xbf56e4(0x246)](/<STATE MOTION:[ ](.*)>/i))return this[_0xbf56e4(0x1f5)]=String(RegExp['$1'])[_0xbf56e4(0x20b)]()['trim'](),0x4;else{if(_0x1f1f45['motion']!==0x0)return _0x1f1f45['motion'];}}return 0x0;},Game_BattlerBase[_0x3acf3d(0x213)][_0x3acf3d(0x1f6)]=function(){const _0x20ee37=_0x3acf3d,_0x4496fa=_0x20ee37(0x1f6);if(this['checkCacheKey'](_0x4496fa))return this[_0x20ee37(0x1b4)][_0x4496fa];return this[_0x20ee37(0x1b4)][_0x4496fa]=this[_0x20ee37(0x220)](),this[_0x20ee37(0x1b4)][_0x4496fa];},Game_BattlerBase[_0x3acf3d(0x213)][_0x3acf3d(0x220)]=function(){const _0x1d6fe0=_0x3acf3d,_0x19b8e1=this[_0x1d6fe0(0x1a2)]();for(const _0x59b70f of _0x19b8e1){if(!_0x59b70f)continue;if(_0x59b70f['note'][_0x1d6fe0(0x246)](/<STATE MOTION (?:LOCK|LOCKED)>/i))return!![];}return![];},Game_BattlerBase[_0x3acf3d(0x213)]['stateOverlayIndex']=function(){const _0x2d0c1e=_0x3acf3d,_0x3e84d9=_0x2d0c1e(0x195);if(this[_0x2d0c1e(0x1c3)](_0x3e84d9))return this['_cache'][_0x3e84d9];return this['_cache'][_0x3e84d9]=this[_0x2d0c1e(0x1a0)](),this['_cache'][_0x3e84d9];},Game_BattlerBase['prototype'][_0x3acf3d(0x1a0)]=function(){const _0x252327=_0x3acf3d,_0x1c13e0=this[_0x252327(0x1a2)]();for(const _0x44d768 of _0x1c13e0){if(!_0x44d768)continue;if(_0x44d768[_0x252327(0x209)][_0x252327(0x246)](/<CUSTOM OVERLAY:[ ](.*)>/i))return String(RegExp['$1']);if(_0x44d768['overlay']!==0x0)return _0x44d768[_0x252327(0x256)];}return 0x0;},Game_BattlerBase[_0x3acf3d(0x213)][_0x3acf3d(0x22e)]=function(){const _0x3733fb=_0x3acf3d,_0xcdcb67='visualStateTone';if(this[_0x3733fb(0x1c3)](_0xcdcb67))return this[_0x3733fb(0x1b4)][_0xcdcb67];return this['_cache'][_0xcdcb67]=this[_0x3733fb(0x232)](),this[_0x3733fb(0x1b4)][_0xcdcb67];},Game_BattlerBase['prototype'][_0x3acf3d(0x232)]=function(){const _0x1b030d=_0x3acf3d;for(const _0x5d659c of this[_0x1b030d(0x1a2)]()){if(!_0x5d659c)continue;if(_0x5d659c[_0x1b030d(0x209)][_0x1b030d(0x246)](/<STATE TONE:[ ](.*)>/i)){let _0x9fae86=String(RegExp['$1'])[_0x1b030d(0x22f)]()[_0x1b030d(0x183)](',')['map'](_0x12f990=>Number(_0x12f990)||0x0);while(_0x9fae86['length']<0x4)_0x9fae86['push'](0x0);return _0x9fae86[0x0]=_0x9fae86[0x0][_0x1b030d(0x229)](-0xff,0xff),_0x9fae86[0x1]=_0x9fae86[0x1]['clamp'](-0xff,0xff),_0x9fae86[0x2]=_0x9fae86[0x2][_0x1b030d(0x229)](-0xff,0xff),_0x9fae86[0x3]=_0x9fae86[0x3]['clamp'](0x0,0xff),_0x9fae86;}}return[0x0,0x0,0x0,0x0];},Game_BattlerBase[_0x3acf3d(0x213)][_0x3acf3d(0x1ca)]=function(){const _0x57e869=_0x3acf3d,_0x555058=_0x57e869(0x1ca);if(this['checkCacheKey'](_0x555058))return this[_0x57e869(0x1b4)][_0x555058];return this['_cache'][_0x555058]=this['createVisualHoveringData'](),this[_0x57e869(0x1b4)][_0x555058];},Game_BattlerBase[_0x3acf3d(0x213)]['createVisualHoveringData']=function(){const _0x611e64=_0x3acf3d,_0x46181c=/<VISUAL (?:HOVER|FLOAT) EFFECT>\s*([\s\S]*)\s*<\/VISUAL (?:HOVER|FLOAT) EFFECT>/i,_0x3288f0={'hover':![],'base':0x64,'speed':0x14,'rate':0x5,'deathHover':![]};for(const _0x9c535a of this[_0x611e64(0x1c7)]()){if(!_0x9c535a)continue;if(_0x9c535a[_0x611e64(0x209)][_0x611e64(0x246)](_0x46181c)){_0x3288f0[_0x611e64(0x197)]=!![];const _0x47a52=String(RegExp['$1']);_0x47a52['match'](/BASE:[ ](.*)/i)&&(_0x3288f0[_0x611e64(0x16e)]=Number(RegExp['$1'])||0x0);_0x47a52[_0x611e64(0x246)](/SPEED:[ ](.*)/i)&&(_0x3288f0[_0x611e64(0x182)]=Number(RegExp['$1'])||0x0);_0x47a52['match'](/RATE:[ ](.*)/i)&&(_0x3288f0[_0x611e64(0x1f1)]=Number(RegExp['$1'])||0x0);if(_0x47a52['match'](/DEATH: HOVER/i))_0x3288f0['deathHover']=!![];else _0x47a52[_0x611e64(0x246)](/DEATH: FLOOR/i)&&(_0x3288f0[_0x611e64(0x204)]=![]);break;}}return _0x3288f0;},Game_BattlerBase['prototype'][_0x3acf3d(0x21c)]=function(){const _0x53a50d=_0x3acf3d,_0x5e249a=_0x53a50d(0x21c);if(this[_0x53a50d(0x1c3)](_0x5e249a))return this[_0x53a50d(0x1b4)][_0x5e249a];const _0x3a7952=this['traitObjects']();return this[_0x53a50d(0x1b4)][_0x5e249a]=_0x3a7952['some'](_0xff85fe=>_0xff85fe&&_0xff85fe['note']['match'](/<NO (?:BREATH|BREATHING)>/i)),this['_cache'][_0x5e249a];},Game_BattlerBase['prototype'][_0x3acf3d(0x221)]=function(){const _0x330c74=_0x3acf3d,_0x27178c=_0x330c74(0x221);if(this[_0x330c74(0x1c3)](_0x27178c))return this['_cache'][_0x27178c];return this[_0x330c74(0x1b4)][_0x27178c]=this[_0x330c74(0x1ce)](),this[_0x330c74(0x1b4)][_0x27178c];},Game_BattlerBase['prototype'][_0x3acf3d(0x1ce)]=function(){const _0x288f50=_0x3acf3d,_0x4e3ebb=/<VISUAL (?:BREATH|BREATHING) EFFECT>\s*([\s\S]*)\s*<\/VISUAL (?:BREATH|BREATHING) EFFECT>/i,_0x3785b1={'breathing':![],'speedX':0xa,'speedY':0xa,'rateX':0x0,'rateY':0.02,'hpLinked':![]};for(const _0x5c161c of this[_0x288f50(0x1c7)]()){if(!_0x5c161c)continue;if(_0x5c161c[_0x288f50(0x209)]['match'](_0x4e3ebb)){_0x3785b1[_0x288f50(0x1cc)]=!![];const _0x332312=String(RegExp['$1']);_0x332312['match'](/SPEED:[ ](.*)/i)&&(_0x3785b1[_0x288f50(0x191)]=Number(RegExp['$1'])||0x0,_0x3785b1['speedY']=Number(RegExp['$1'])||0x0);_0x332312[_0x288f50(0x246)](/(?:SPEEDX|SPEED X):[ ](.*)/i)&&(_0x3785b1['speedX']=Number(RegExp['$1'])||0x0);_0x332312['match'](/(?:SPEEDY|SPEED Y):[ ](.*)/i)&&(_0x3785b1[_0x288f50(0x19a)]=Number(RegExp['$1'])||0x0);_0x332312[_0x288f50(0x246)](/RATE:[ ](.*)/i)&&(_0x3785b1[_0x288f50(0x1de)]=Number(RegExp['$1'])||0x0,_0x3785b1['rateY']=Number(RegExp['$1'])||0x0);_0x332312[_0x288f50(0x246)](/(?:RATEX|RATE X):[ ](.*)/i)&&(_0x3785b1[_0x288f50(0x1de)]=Number(RegExp['$1'])||0x0);_0x332312[_0x288f50(0x246)](/(?:RATEY|RATE Y):[ ](.*)/i)&&(_0x3785b1[_0x288f50(0x1bf)]=Number(RegExp['$1'])||0x0);if(_0x332312[_0x288f50(0x246)](/(?:HPLINK|HP LINK|HPLINKED|HP LINKED): ON/i))_0x3785b1[_0x288f50(0x184)]=!![];else _0x332312[_0x288f50(0x246)](/(?:HPLINK|HP LINK|HPLINKED|HP LINKED): OFF/i)&&(_0x3785b1[_0x288f50(0x184)]=![]);break;}}return _0x3785b1;},VisuMZ[_0x3acf3d(0x1c0)][_0x3acf3d(0x17f)]=Game_Battler[_0x3acf3d(0x213)][_0x3acf3d(0x1aa)],Game_Battler[_0x3acf3d(0x213)][_0x3acf3d(0x1aa)]=function(_0x4b6919){const _0x2720e1=_0x3acf3d;VisuMZ[_0x2720e1(0x1c0)][_0x2720e1(0x17f)][_0x2720e1(0x25a)](this,_0x4b6919),this['setupVisualStateEffect'](_0x4b6919,!![]);},VisuMZ[_0x3acf3d(0x1c0)][_0x3acf3d(0x235)]=Game_BattlerBase[_0x3acf3d(0x213)][_0x3acf3d(0x250)],Game_BattlerBase[_0x3acf3d(0x213)]['die']=function(){const _0x526508=_0x3acf3d;this[_0x526508(0x20a)]=!![],VisuMZ[_0x526508(0x1c0)][_0x526508(0x235)]['call'](this),this[_0x526508(0x20a)]=undefined;},VisuMZ['VisualStateEffects']['Game_Battler_onRemoveState']=Game_Battler[_0x3acf3d(0x213)][_0x3acf3d(0x208)],Game_Battler[_0x3acf3d(0x213)]['onRemoveState']=function(_0x2441de){const _0x56fc56=_0x3acf3d;!this[_0x56fc56(0x20a)]&&this['_show_battleRemovalStates']!==![]&&this[_0x56fc56(0x1fa)](_0x2441de,![]),VisuMZ[_0x56fc56(0x1c0)][_0x56fc56(0x21d)][_0x56fc56(0x25a)](this,_0x2441de);},VisuMZ[_0x3acf3d(0x1c0)]['Game_Battler_removeBattleStates']=Game_Battler[_0x3acf3d(0x213)][_0x3acf3d(0x224)],Game_Battler[_0x3acf3d(0x213)][_0x3acf3d(0x224)]=function(){const _0x2c9304=_0x3acf3d;this[_0x2c9304(0x1ae)]=VisuMZ[_0x2c9304(0x1c0)][_0x2c9304(0x196)][_0x2c9304(0x1f4)]['BattleEndPopup']??!![],VisuMZ[_0x2c9304(0x1c0)][_0x2c9304(0x172)][_0x2c9304(0x25a)](this),this['_show_battleRemovalStates']=undefined;},VisuMZ[_0x3acf3d(0x1c0)]['Sprite_Battler_initMembers']=Sprite_Battler[_0x3acf3d(0x213)][_0x3acf3d(0x18a)],Sprite_Battler['prototype']['initMembers']=function(){const _0xb3ab6e=_0x3acf3d;VisuMZ['VisualStateEffects']['Sprite_Battler_initMembers']['call'](this),this[_0xb3ab6e(0x22a)](),this[_0xb3ab6e(0x180)]();},Sprite_Battler[_0x3acf3d(0x213)][_0x3acf3d(0x22a)]=function(){const _0x497653=_0x3acf3d;this['_visualStateAnimationRepeatDuration']=0x0,this[_0x497653(0x20c)]=0x0;},Sprite_Battler['prototype'][_0x3acf3d(0x1f2)]=function(_0x105754,_0x518708){const _0x431dbb=_0x3acf3d,_0x91f9d2=VisuMZ[_0x431dbb(0x1c0)][_0x431dbb(0x196)][_0x431dbb(0x1d3)],_0x445b8b=_0x518708?'Buff':_0x431dbb(0x21b),_0x121100=_0x518708?Game_BattlerBase[_0x431dbb(0x23b)]:Game_BattlerBase['ICON_DEBUFF_START'],_0x1d8ae6=_0x121100+_0x105754,_0x41c179=TextManager[_0x431dbb(0x175)](_0x105754),_0x286694=_0x91f9d2[_0x431dbb(0x170)[_0x431dbb(0x227)](_0x445b8b)];if(_0x286694[_0x431dbb(0x251)]<=0x0)return;let _0x4f0b4c=_0x286694[_0x431dbb(0x227)](_0x41c179);const _0x1819f1={'textColor':_0x91f9d2[_0x431dbb(0x259)['format'](_0x445b8b)]||0x0,'flashColor':_0x91f9d2['%1FlashColor'['format'](_0x445b8b)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x91f9d2[_0x431dbb(0x176)[_0x431dbb(0x227)](_0x445b8b)]||0x0},_0x33333c=ImageManager[_0x431dbb(0x1d7)](_0x431dbb(0x19b));_0x33333c[_0x431dbb(0x1ee)](this[_0x431dbb(0x1f7)]['bind'](this,_0x1d8ae6,_0x4f0b4c,_0x1819f1));},Sprite_Battler['prototype'][_0x3acf3d(0x1a3)]=function(_0x52e858,_0x4c1d78){const _0x658697=_0x3acf3d,_0xc7c496=VisuMZ[_0x658697(0x1c0)][_0x658697(0x196)][_0x658697(0x1f4)],_0x239d08=$dataStates[_0x52e858];if(!_0x239d08)return;const _0x276da9=_0x4c1d78?_0x658697(0x15e):_0x658697(0x205);this[_0x658697(0x17c)]=this[_0x658697(0x17c)]||{};if(!VisuMZ[_0x658697(0x1c0)][_0x658697(0x196)][_0x658697(0x1f4)]['AllowDupes']){const _0x58220d=_0x658697(0x201)['format'](_0x52e858,_0x276da9,Graphics[_0x658697(0x23c)]);if(this[_0x658697(0x17c)][_0x58220d])return;this[_0x658697(0x17c)][_0x58220d]=!![];}const _0x42bec8=_0x239d08['iconIndex'];if(_0x42bec8<=0x0)return;const _0x35716d=_0xc7c496['%1PopupFmt'['format'](_0x276da9)];if(_0x35716d[_0x658697(0x251)]<=0x0)return;let _0x2c9044=_0x35716d[_0x658697(0x227)](_0x239d08['name']);const _0x18b91d={'textColor':_0xc7c496['TextColor']||0x0,'flashColor':_0xc7c496['FlashColor']||[0x0,0x0,0x0,0x0],'flashDuration':_0xc7c496[_0x658697(0x1a7)]||0x0};_0xc7c496[_0x658697(0x156)]&&(_0x18b91d['textColor']=ColorManager['stateColor'](_0x239d08));VisuMZ[_0x658697(0x1c0)][_0x658697(0x1b5)](_0x239d08,_0x18b91d);const _0x113aea=ImageManager['loadSystem'](_0x658697(0x19b));_0x113aea[_0x658697(0x1ee)](this[_0x658697(0x1f7)][_0x658697(0x1ad)](this,_0x42bec8,_0x2c9044,_0x18b91d));},VisuMZ[_0x3acf3d(0x1c0)][_0x3acf3d(0x1b5)]=function(_0x46d093,_0x2aee31){const _0x47526b=_0x3acf3d,_0x1f04c6=_0x46d093[_0x47526b(0x209)];if(_0x1f04c6[_0x47526b(0x246)](/<STATE POPUP>\s*([\s\S]*)\s*<\/STATE POPUP>/i)){const _0x531c06=String(RegExp['$1'])[_0x47526b(0x22f)]()['split'](/[\r\n]+/);for(const _0x3ad3cf of _0x531c06){_0x3ad3cf[_0x47526b(0x246)](/(?:TEXT COLOR|TEXTCOLOR):[ ](.*)/i)&&(_0x2aee31[_0x47526b(0x1fe)]=String(RegExp['$1'])['trim']());if(_0x3ad3cf[_0x47526b(0x246)](/(?:FLASH COLOR|FLASHCOLOR):[ ](.*)/i)){_0x2aee31[_0x47526b(0x1c6)]=String(RegExp['$1'])[_0x47526b(0x22f)]()['split'](',')[_0x47526b(0x1eb)](_0x11af9a=>Number(_0x11af9a));while(_0x2aee31['flashColor'][_0x47526b(0x251)]<=0x4){_0x2aee31[_0x47526b(0x1c6)][_0x47526b(0x1d4)](0x0);};_0x2aee31['flashDuration']=_0x2aee31[_0x47526b(0x215)]||0x1;}_0x3ad3cf[_0x47526b(0x246)](/(?:FLASH DURATION|FLASHDURATION):[ ](\d+)/i)&&(_0x2aee31[_0x47526b(0x215)]=Number(RegExp['$1']));}}},Sprite_Battler[_0x3acf3d(0x213)]['updateRepeatingVisualStateAnimation']=function(){const _0x19043c=_0x3acf3d;if(!this[_0x19043c(0x173)]())return;if(this[_0x19043c(0x1e0)]>0x0){this[_0x19043c(0x1e0)]--;return;}const _0x586d8e=this[_0x19043c(0x236)][_0x19043c(0x1e6)](),_0x487bf1=this[_0x19043c(0x236)][_0x19043c(0x23e)]();if(_0x586d8e['length']<=0x0)return;this[_0x19043c(0x20c)]>=_0x586d8e[_0x19043c(0x251)]&&(this[_0x19043c(0x20c)]=0x0);const _0x19ae9a=_0x586d8e[this[_0x19043c(0x20c)]],_0x21e1d6=VisuMZ['VisualStateEffects'][_0x19043c(0x196)][_0x19043c(0x1f4)],_0x204cd7=[this[_0x19043c(0x236)]],_0x13739b=_0x21e1d6[_0x19043c(0x1ea)],_0x23a960=_0x21e1d6['RepeatMute'];$gameTemp[_0x19043c(0x177)](_0x204cd7,_0x19ae9a,_0x13739b,_0x23a960);const _0x26e273=_0x487bf1[this[_0x19043c(0x20c)]]||_0x21e1d6[_0x19043c(0x1d5)];this[_0x19043c(0x1e0)]=_0x26e273,this['_visualStateAnimationIndex']++;},Sprite_Battler[_0x3acf3d(0x213)][_0x3acf3d(0x173)]=function(){const _0x2c5020=_0x3acf3d;if(!this['_battler'])return![];if(!this['_battler'][_0x2c5020(0x1e7)]())return![];if(!this['_battler'][_0x2c5020(0x210)]())return![];if(!this[_0x2c5020(0x236)][_0x2c5020(0x19d)]())return![];if(this[_0x2c5020(0x157)][_0x2c5020(0x193)]===_0x2c5020(0x254))return![];if(this[_0x2c5020(0x15a)]<=0x0)return![];return!![];},Sprite_Battler[_0x3acf3d(0x213)][_0x3acf3d(0x1fd)]=function(){const _0x2c6618=_0x3acf3d;this['_stateIconSprite']&&this[_0x2c6618(0x1f8)](),this['_stateSprite']&&this[_0x2c6618(0x179)](),this[_0x2c6618(0x22c)](),this[_0x2c6618(0x190)](),this[_0x2c6618(0x189)]();},Sprite_Battler['prototype'][_0x3acf3d(0x1f8)]=function(){const _0x3419cd=_0x3acf3d;if(!this[_0x3419cd(0x236)])return;const _0x55ac25=VisuMZ[_0x3419cd(0x1c0)]['Settings'][_0x3419cd(0x243)],_0xa5b253=this[_0x3419cd(0x230)];_0xa5b253[_0x3419cd(0x1a4)]=this[_0x3419cd(0x236)][_0x3419cd(0x1d6)]()?_0x55ac25[_0x3419cd(0x1b8)]:_0x55ac25[_0x3419cd(0x1cf)],this[_0x3419cd(0x236)][_0x3419cd(0x1d6)]()&&(_0xa5b253['x']=0x0,this[_0x3419cd(0x236)][_0x3419cd(0x257)]&&(_0xa5b253['x']+=this[_0x3419cd(0x236)]['battleUIOffsetX']()),_0xa5b253['y']=-Math[_0x3419cd(0x242)]((this[_0x3419cd(0x1e8)]+0x28)*0.9),_0xa5b253['y']<0x14-this['y']&&(_0xa5b253['y']=0x14-this['y']),this['_battler'][_0x3419cd(0x1e9)]&&(_0xa5b253['y']+=this[_0x3419cd(0x236)]['battleUIOffsetY']()-0x4));},Sprite_Battler['prototype'][_0x3acf3d(0x179)]=function(){const _0x35ff0f=_0x3acf3d;if(!this[_0x35ff0f(0x236)])return;const _0x100dc1=VisuMZ['VisualStateEffects'][_0x35ff0f(0x196)]['General'],_0x441300=this[_0x35ff0f(0x207)];_0x441300[_0x35ff0f(0x1a4)]=this['_battler'][_0x35ff0f(0x1d6)]()?_0x100dc1['ActorOverlay']:_0x100dc1['EnemyOverlay'];this[_0x35ff0f(0x24c)]&&(this['_svBattlerSprite'][_0x35ff0f(0x207)][_0x35ff0f(0x1a4)]=![]);this['_battler'][_0x35ff0f(0x225)]()&&!this['_battler'][_0x35ff0f(0x21e)]()&&(this['_stateIconSprite']?_0x441300['y']=this[_0x35ff0f(0x230)]['y']+_0x441300[_0x35ff0f(0x1e8)]:_0x441300['y']=-this[_0x35ff0f(0x1e8)]+_0x441300[_0x35ff0f(0x1e8)]);;},Sprite_Battler[_0x3acf3d(0x213)][_0x3acf3d(0x190)]=function(){const _0x551b73=_0x3acf3d;if(!this[_0x551b73(0x236)])return;const _0x33e371=this[_0x551b73(0x218)](),_0x3d4115=this[_0x551b73(0x236)][_0x551b73(0x22e)]();_0x33e371&&_0x33e371[_0x551b73(0x16a)](_0x3d4115),this[_0x551b73(0x188)]&&this[_0x551b73(0x188)][_0x551b73(0x16a)](_0x3d4115);},Sprite_Battler['prototype']['visualStateToneTargetSprite']=function(){const _0x20f9cc=_0x3acf3d;return this[_0x20f9cc(0x23a)]||this;},VisuMZ[_0x3acf3d(0x1c0)][_0x3acf3d(0x23f)]=Sprite_Battler[_0x3acf3d(0x213)][_0x3acf3d(0x244)],Sprite_Battler['prototype'][_0x3acf3d(0x244)]=function(){const _0x418558=_0x3acf3d;if(!this[_0x418558(0x163)])return;this[_0x418558(0x236)][_0x418558(0x1f6)]()?this[_0x418558(0x163)]['animation'][_0x418558(0x25c)]=0x0:VisuMZ[_0x418558(0x1c0)][_0x418558(0x23f)][_0x418558(0x25a)](this);},Sprite_Battler[_0x3acf3d(0x213)]['initVisualHoverEffect']=function(){this['_hoverMinimum']=-0x1;},VisuMZ[_0x3acf3d(0x1c0)][_0x3acf3d(0x17e)]=Sprite_Battler[_0x3acf3d(0x213)][_0x3acf3d(0x17b)],Sprite_Battler[_0x3acf3d(0x213)]['extraPositionY']=function(){const _0x47fcd6=_0x3acf3d;let _0x667bbb=VisuMZ[_0x47fcd6(0x1c0)][_0x47fcd6(0x17e)][_0x47fcd6(0x25a)](this);return _0x667bbb-=Math[_0x47fcd6(0x219)](this[_0x47fcd6(0x200)]()),_0x667bbb;},Sprite_Battler[_0x3acf3d(0x213)][_0x3acf3d(0x200)]=function(){const _0x2d19e0=_0x3acf3d;if(this['constructor']===Sprite_SvEnemy)return 0x0;if(!this[_0x2d19e0(0x236)])return 0x0;if(this[_0x2d19e0(0x236)][_0x2d19e0(0x248)]&&this['_battler']['isBattlerGrounded']())return 0x0;const _0x45eb83=this[_0x2d19e0(0x236)][_0x2d19e0(0x1ca)]();let _0xdb1814=0x0;this[_0x2d19e0(0x18f)]=this[_0x2d19e0(0x18f)]||Math[_0x2d19e0(0x219)](Math[_0x2d19e0(0x1d1)]()*0x2710);const _0x2a3e7e=Graphics[_0x2d19e0(0x23c)]+this['_hoverRand'],_0x2446e4=_0x45eb83[_0x2d19e0(0x182)],_0x309c1d=_0x45eb83[_0x2d19e0(0x1f1)];let _0x189362=_0x45eb83['hover'];if(_0x189362&&this[_0x2d19e0(0x236)]['isDead']())_0x189362=_0x45eb83[_0x2d19e0(0x204)];if(_0x189362){_0xdb1814+=Math[_0x2d19e0(0x1a6)](_0x2a3e7e/(_0x2446e4||0x1))*_0x309c1d,_0xdb1814+=_0x45eb83[_0x2d19e0(0x16e)];if(this[_0x2d19e0(0x1dc)]<0x0)this[_0x2d19e0(0x1dc)]=_0xdb1814;const _0x44d72f=this[_0x2d19e0(0x1dc)]+_0x2446e4/Math[_0x2d19e0(0x211)](0x1,_0x309c1d**1.5);this['_hoverMinimum']=Math[_0x2d19e0(0x1e1)](_0x44d72f,_0xdb1814);}else{const _0x4d3c29=this[_0x2d19e0(0x1dc)]-_0x2446e4/Math[_0x2d19e0(0x211)](0x1,_0x309c1d/0x2);this[_0x2d19e0(0x1dc)]=Math[_0x2d19e0(0x211)](_0x4d3c29,0x0);}return Math[_0x2d19e0(0x211)](0x0,this[_0x2d19e0(0x1dc)]);},VisuMZ[_0x3acf3d(0x1c0)][_0x3acf3d(0x168)]=Sprite_Battler[_0x3acf3d(0x213)][_0x3acf3d(0x15c)],Sprite_Battler[_0x3acf3d(0x213)][_0x3acf3d(0x15c)]=function(){const _0x27939d=_0x3acf3d;VisuMZ[_0x27939d(0x1c0)][_0x27939d(0x168)][_0x27939d(0x25a)](this),this['updateDistortionOpacity']();},Sprite_Battler[_0x3acf3d(0x213)][_0x3acf3d(0x255)]=function(){const _0x5cd128=_0x3acf3d;if(!this[_0x5cd128(0x15d)])return;if(!this['_battler'])return;if(this[_0x5cd128(0x157)]===Sprite_SvEnemy)return;const _0x464f73=this[_0x5cd128(0x236)][_0x5cd128(0x217)]();if(this['_distortionSprite'][_0x5cd128(0x15a)]!==_0x464f73){const _0x3805ca=0x8;this[_0x5cd128(0x15d)][_0x5cd128(0x15a)]>_0x464f73?this[_0x5cd128(0x15d)][_0x5cd128(0x15a)]=Math['max'](this[_0x5cd128(0x15d)][_0x5cd128(0x15a)]-_0x3805ca,_0x464f73):this[_0x5cd128(0x15d)]['opacity']=Math['min'](this['_distortionSprite'][_0x5cd128(0x15a)]+_0x3805ca,_0x464f73);}},Game_BattlerBase['prototype'][_0x3acf3d(0x217)]=function(){const _0x5b520f=_0x3acf3d,_0x1619cd=_0x5b520f(0x217);if(this[_0x5b520f(0x1c3)](_0x1619cd))return this[_0x5b520f(0x1b4)][_0x1619cd];return this[_0x5b520f(0x1b4)][_0x1619cd]=this['createVisualBattlerOpacity'](),this[_0x5b520f(0x1b4)][_0x1619cd];},Game_BattlerBase[_0x3acf3d(0x213)][_0x3acf3d(0x20d)]=function(){const _0x2b15fd=_0x3acf3d;for(const _0x1a5cc7 of this[_0x2b15fd(0x1a2)]()){if(!_0x1a5cc7)continue;if(_0x1a5cc7[_0x2b15fd(0x209)]['match'](/<VISUAL OPACITY:[ ](\d+)([%％])>/i)){const _0x57798f=Number(RegExp['$1'])*0.01;return Math[_0x2b15fd(0x242)](_0x57798f*0xff)[_0x2b15fd(0x229)](0x0,0xff);}if(_0x1a5cc7[_0x2b15fd(0x209)][_0x2b15fd(0x246)](/<VISUAL OPACITY:[ ](\d+)>/i))return Number(RegExp['$1'])[_0x2b15fd(0x229)](0x0,0xff);}return 0xff;},Sprite_Battler[_0x3acf3d(0x213)][_0x3acf3d(0x189)]=function(){const _0x14b19b=_0x3acf3d;if(!this[_0x14b19b(0x236)])return;const _0x2cfd01=this['_battler']['visualStateRainbow']();if(_0x2cfd01===0x0&&this[_0x14b19b(0x15d)][_0x14b19b(0x158)]!==0x0)this[_0x14b19b(0x15d)][_0x14b19b(0x226)](0x0);else{let _0x181e92=this[_0x14b19b(0x15d)]['_hue']+_0x2cfd01;_0x181e92%=0x168,this[_0x14b19b(0x15d)][_0x14b19b(0x226)](_0x181e92);}},Game_BattlerBase[_0x3acf3d(0x213)][_0x3acf3d(0x1b9)]=function(){const _0x59043e=_0x3acf3d,_0x38978e=_0x59043e(0x1b9);if(this[_0x59043e(0x1c3)](_0x38978e))return this[_0x59043e(0x1b4)][_0x38978e];return this['_cache'][_0x38978e]=this[_0x59043e(0x238)](),this[_0x59043e(0x1b4)][_0x38978e];},Game_BattlerBase[_0x3acf3d(0x213)]['createVisualStateRainbow']=function(){const _0x2d1acf=_0x3acf3d;for(const _0x1cd7d2 of this['states']()){if(!_0x1cd7d2)continue;if(_0x1cd7d2[_0x2d1acf(0x209)][_0x2d1acf(0x246)](/<VISUAL RAINBOW:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);}return 0x0;},VisuMZ[_0x3acf3d(0x1c0)][_0x3acf3d(0x249)]=Sprite_Battler[_0x3acf3d(0x213)][_0x3acf3d(0x1fc)],Sprite_Battler[_0x3acf3d(0x213)][_0x3acf3d(0x1fc)]=function(){const _0x2d94ed=_0x3acf3d;let _0x2453d9=VisuMZ[_0x2d94ed(0x1c0)]['Sprite_Battler_mainSpriteScaleX'][_0x2d94ed(0x25a)](this);return _0x2453d9+=this[_0x2d94ed(0x186)](),_0x2453d9;},VisuMZ[_0x3acf3d(0x1c0)]['Sprite_Battler_mainSpriteScaleY']=Sprite_Battler[_0x3acf3d(0x213)][_0x3acf3d(0x1bc)],Sprite_Battler[_0x3acf3d(0x213)][_0x3acf3d(0x1bc)]=function(){const _0x9f1418=_0x3acf3d;let _0x49a12e=VisuMZ['VisualStateEffects']['Sprite_Battler_mainSpriteScaleY']['call'](this);return _0x49a12e+=this[_0x9f1418(0x24f)](),_0x49a12e;},Sprite_Battler[_0x3acf3d(0x213)]['applyBreathingScaleX']=function(){const _0x55bc35=_0x3acf3d;if(!this[_0x55bc35(0x236)])return 0x0;if(this[_0x55bc35(0x236)][_0x55bc35(0x21c)]())return 0x0;const _0x2edcd3=this[_0x55bc35(0x236)][_0x55bc35(0x221)]();if(!_0x2edcd3)return 0x0;if(!_0x2edcd3[_0x55bc35(0x1cc)])return 0x0;let _0x3ade0a=this[_0x55bc35(0x1c5)](_0x2edcd3,_0x2edcd3['speedX'],_0x2edcd3[_0x55bc35(0x1de)]);const _0x15f0a4=this[_0x55bc35(0x15d)][_0x55bc35(0x18b)]['x']>0x0?0x1:-0x1;return _0x3ade0a*_0x15f0a4;},Sprite_Battler['prototype'][_0x3acf3d(0x24f)]=function(){const _0x1faba3=_0x3acf3d;if(!this[_0x1faba3(0x236)])return 0x0;if(this['_battler']['noBreathing']())return 0x0;const _0x1e5c4a=this[_0x1faba3(0x236)]['breathingData']();if(!_0x1e5c4a)return 0x0;if(!_0x1e5c4a[_0x1faba3(0x1cc)])return 0x0;let _0x460457=this[_0x1faba3(0x1c5)](_0x1e5c4a,_0x1e5c4a['speedY'],_0x1e5c4a[_0x1faba3(0x1bf)]);return _0x460457;},Sprite_Battler[_0x3acf3d(0x213)][_0x3acf3d(0x1c5)]=function(_0x7e7fd5,_0xedb3cb,_0x212738){const _0x149e0c=_0x3acf3d;this[_0x149e0c(0x192)]=this[_0x149e0c(0x192)]??Math['randomInt'](0x2710);let _0x338920=Graphics[_0x149e0c(0x23c)]+this[_0x149e0c(0x192)];return _0x7e7fd5[_0x149e0c(0x184)]&&(_0xedb3cb/=this[_0x149e0c(0x236)][_0x149e0c(0x155)]()),Math[_0x149e0c(0x1a6)](_0x338920/_0xedb3cb)*_0x212738;},VisuMZ[_0x3acf3d(0x1c0)][_0x3acf3d(0x159)]=Sprite_Actor[_0x3acf3d(0x213)]['createStateSprite'],Sprite_Actor[_0x3acf3d(0x213)][_0x3acf3d(0x1bb)]=function(){const _0x45c3eb=_0x3acf3d;VisuMZ['VisualStateEffects'][_0x45c3eb(0x159)][_0x45c3eb(0x25a)](this),this[_0x45c3eb(0x1dd)]();},Sprite_Actor[_0x3acf3d(0x213)][_0x3acf3d(0x1dd)]=function(){const _0x5251ee=_0x3acf3d;if(this[_0x5251ee(0x157)]!==Sprite_Actor)return;this[_0x5251ee(0x230)]=new Sprite_StateIcon(),this[_0x5251ee(0x1bd)](this[_0x5251ee(0x230)]),this['_stateIconSprite'][_0x5251ee(0x206)][_0x5251ee(0x1ed)]=![];},VisuMZ[_0x3acf3d(0x1c0)][_0x3acf3d(0x194)]=Sprite_Actor['prototype'][_0x3acf3d(0x1a1)],Sprite_Actor[_0x3acf3d(0x213)]['refreshMotion']=function(){const _0x484a2d=_0x3acf3d,_0x1906db=this[_0x484a2d(0x258)];if(!_0x1906db)return;const _0x27845c=_0x1906db[_0x484a2d(0x1c2)]();if(_0x27845c>=0x4){if(!_0x1906db['isInputting']()&&!_0x1906db[_0x484a2d(0x17d)]())return this['startMotion'](_0x1906db[_0x484a2d(0x1f5)]);}VisuMZ[_0x484a2d(0x1c0)][_0x484a2d(0x194)][_0x484a2d(0x25a)](this);},VisuMZ[_0x3acf3d(0x1c0)]['Sprite_SvEnemy_refreshMotion']=Sprite_SvEnemy['prototype'][_0x3acf3d(0x1a1)],Sprite_SvEnemy[_0x3acf3d(0x213)][_0x3acf3d(0x1a1)]=function(){const _0x842213=_0x3acf3d,_0x1fee01=this[_0x842213(0x258)];if(!_0x1fee01)return;if(Imported[_0x842213(0x1e5)]&&_0x1fee01[_0x842213(0x1df)]())return;const _0x31ac76=_0x1fee01[_0x842213(0x1c2)]();if(_0x31ac76>=0x4){if(!_0x1fee01[_0x842213(0x1f3)]()&&!_0x1fee01[_0x842213(0x17d)]())return this[_0x842213(0x1d8)](_0x1fee01['_customStateMotion']);}VisuMZ[_0x842213(0x1c0)]['Sprite_SvEnemy_refreshMotion'][_0x842213(0x25a)](this);},VisuMZ[_0x3acf3d(0x1c0)]['Sprite_Battler_playDragonbonesMotion']=Sprite_Battler[_0x3acf3d(0x213)]['playDragonbonesMotion'],Sprite_Battler[_0x3acf3d(0x213)][_0x3acf3d(0x1b1)]=function(_0x15f35d){const _0xde5f38=_0x3acf3d;if(this[_0xde5f38(0x163)]&&_0x15f35d===_0xde5f38(0x199)){const _0x303ef6=this['_battler']['stateMotionIndex']();_0x303ef6>=0x4&&(_0x15f35d=this[_0xde5f38(0x236)][_0xde5f38(0x1f5)]||_0x15f35d);}VisuMZ['VisualStateEffects'][_0xde5f38(0x174)]['call'](this,_0x15f35d);},VisuMZ[_0x3acf3d(0x1c0)][_0x3acf3d(0x1b7)]=Sprite_Actor['prototype'][_0x3acf3d(0x222)],Sprite_Actor['prototype'][_0x3acf3d(0x222)]=function(_0x3d9461){const _0xaeba03=_0x3acf3d;VisuMZ[_0xaeba03(0x1c0)][_0xaeba03(0x1b7)]['call'](this,_0x3d9461);if(this[_0xaeba03(0x230)])this[_0xaeba03(0x230)]['setup'](_0x3d9461);},VisuMZ[_0x3acf3d(0x1c0)][_0x3acf3d(0x241)]=Sprite_Actor[_0x3acf3d(0x213)][_0x3acf3d(0x19e)],Sprite_Actor[_0x3acf3d(0x213)][_0x3acf3d(0x19e)]=function(){const _0x1f2dc4=_0x3acf3d;VisuMZ[_0x1f2dc4(0x1c0)][_0x1f2dc4(0x241)][_0x1f2dc4(0x25a)](this),this[_0x1f2dc4(0x1fd)]();},VisuMZ[_0x3acf3d(0x1c0)]['Sprite_Actor_updateFrame']=Sprite_Actor[_0x3acf3d(0x213)][_0x3acf3d(0x1d0)],Sprite_Actor[_0x3acf3d(0x213)][_0x3acf3d(0x1d0)]=function(){const _0x162c38=_0x3acf3d;if(this[_0x162c38(0x236)][_0x162c38(0x1f6)]()&&this['_mainSprite']&&this[_0x162c38(0x23a)]['bitmap']){if(this[_0x162c38(0x216)])return;this['_stateMotionLocked']=this[_0x162c38(0x23a)][_0x162c38(0x231)]['width']>0x0;}else this[_0x162c38(0x216)]=![];VisuMZ[_0x162c38(0x1c0)][_0x162c38(0x1e3)][_0x162c38(0x25a)](this);},VisuMZ['VisualStateEffects'][_0x3acf3d(0x1ab)]=Sprite_Enemy[_0x3acf3d(0x213)][_0x3acf3d(0x1dd)],Sprite_Enemy[_0x3acf3d(0x213)][_0x3acf3d(0x1dd)]=function(){const _0x1598a3=_0x3acf3d;this[_0x1598a3(0x1bb)](),VisuMZ[_0x1598a3(0x1c0)]['Sprite_Enemy_createStateIconSprite'][_0x1598a3(0x25a)](this);},Sprite_Enemy[_0x3acf3d(0x213)][_0x3acf3d(0x1bb)]=function(){const _0x5e7275=_0x3acf3d;this[_0x5e7275(0x207)]=new Sprite_StateOverlay(),this['addChild'](this[_0x5e7275(0x207)]);},VisuMZ['VisualStateEffects'][_0x3acf3d(0x16f)]=Sprite_Enemy[_0x3acf3d(0x213)][_0x3acf3d(0x222)],Sprite_Enemy[_0x3acf3d(0x213)]['setBattler']=function(_0x4571b1){const _0x556933=_0x3acf3d;VisuMZ[_0x556933(0x1c0)]['Sprite_Enemy_setBattler']['call'](this,_0x4571b1);if(this[_0x556933(0x207)])this['_stateSprite']['setup'](_0x4571b1);},VisuMZ[_0x3acf3d(0x1c0)]['Sprite_Enemy_update']=Sprite_Enemy[_0x3acf3d(0x213)]['update'],Sprite_Enemy[_0x3acf3d(0x213)][_0x3acf3d(0x19e)]=function(){const _0x27e8fb=_0x3acf3d;VisuMZ[_0x27e8fb(0x1c0)]['Sprite_Enemy_update']['call'](this),this[_0x27e8fb(0x1fd)]();},VisuMZ['VisualStateEffects'][_0x3acf3d(0x24b)]=Sprite_StateOverlay[_0x3acf3d(0x213)][_0x3acf3d(0x18c)],Sprite_StateOverlay[_0x3acf3d(0x213)]['loadBitmap']=function(){const _0x2b15bb=_0x3acf3d;VisuMZ[_0x2b15bb(0x1c0)][_0x2b15bb(0x24b)][_0x2b15bb(0x25a)](this),this['_bitmapName']='States';},VisuMZ[_0x3acf3d(0x1c0)][_0x3acf3d(0x1d2)]=Sprite_StateOverlay[_0x3acf3d(0x213)][_0x3acf3d(0x1d0)],Sprite_StateOverlay['prototype'][_0x3acf3d(0x1d0)]=function(){const _0x4403d2=_0x3acf3d;if(typeof this['_overlayIndex']==='string')return this[_0x4403d2(0x1f0)]();else{if(this['_bitmapName']!==_0x4403d2(0x1e2)){this[_0x4403d2(0x198)]=!![];const _0x2159a7=ImageManager[_0x4403d2(0x1d7)]('States');_0x2159a7[_0x4403d2(0x1ee)](this[_0x4403d2(0x239)][_0x4403d2(0x1ad)](this,_0x2159a7));}else this[_0x4403d2(0x234)]===_0x4403d2(0x1e2)&&VisuMZ[_0x4403d2(0x1c0)][_0x4403d2(0x1d2)]['call'](this);}},Sprite_StateOverlay[_0x3acf3d(0x213)]['onLoadDefaultOverlayBitmap']=function(_0x4b3efc){const _0x14cc16=_0x3acf3d;this[_0x14cc16(0x206)]=_0x4b3efc,this[_0x14cc16(0x198)]=![],this[_0x14cc16(0x234)]=_0x14cc16(0x1e2),VisuMZ[_0x14cc16(0x1c0)][_0x14cc16(0x1d2)][_0x14cc16(0x25a)](this);},Sprite_StateOverlay['prototype'][_0x3acf3d(0x1f0)]=function(){const _0x396c95=_0x3acf3d;if(!this[_0x396c95(0x198)]&&this[_0x396c95(0x234)]!==this['_overlayIndex']){this[_0x396c95(0x198)]=!![];const _0x52fee0=ImageManager['loadSystem'](this[_0x396c95(0x212)]);_0x52fee0[_0x396c95(0x1ee)](this[_0x396c95(0x23d)][_0x396c95(0x1ad)](this,_0x52fee0));}if(this[_0x396c95(0x234)]===this[_0x396c95(0x212)]){const _0x11b8c3=0x60,_0x2bf014=0x60,_0x5cd1fd=this[_0x396c95(0x161)]*_0x11b8c3,_0x47e9f6=0x0;this[_0x396c95(0x1ff)](_0x5cd1fd,_0x47e9f6,_0x11b8c3,_0x2bf014);}},Sprite_StateOverlay[_0x3acf3d(0x213)][_0x3acf3d(0x23d)]=function(_0x4181f5){const _0x186190=_0x3acf3d;this[_0x186190(0x206)]=_0x4181f5,this['_loadingCustomOverlay']=![],this[_0x186190(0x234)]=this[_0x186190(0x212)],this[_0x186190(0x1f0)]();},VisuMZ[_0x3acf3d(0x1c0)][_0x3acf3d(0x16b)]=Window_BattleLog[_0x3acf3d(0x213)][_0x3acf3d(0x1ac)],Window_BattleLog[_0x3acf3d(0x213)][_0x3acf3d(0x1ac)]=function(_0x4305e0){const _0x5dcb60=_0x3acf3d;VisuMZ[_0x5dcb60(0x1c0)][_0x5dcb60(0x16b)][_0x5dcb60(0x25a)](this,_0x4305e0);if(_0x4305e0&&_0x4305e0[_0x5dcb60(0x1c8)]())_0x4305e0[_0x5dcb60(0x1c8)]()['SetupResponsePopup'](_0x4305e0,_0x5dcb60(0x1cd));},VisuMZ[_0x3acf3d(0x1c0)][_0x3acf3d(0x1b2)]=Window_BattleLog['prototype']['displayReflection'],Window_BattleLog[_0x3acf3d(0x213)][_0x3acf3d(0x24d)]=function(_0x434a05){const _0x3737ef=_0x3acf3d;VisuMZ['VisualStateEffects'][_0x3737ef(0x1b2)]['call'](this,_0x434a05);if(_0x434a05&&_0x434a05[_0x3737ef(0x1c8)]())_0x434a05[_0x3737ef(0x1c8)]()[_0x3737ef(0x223)](_0x434a05,_0x3737ef(0x22d));},VisuMZ[_0x3acf3d(0x1c0)]['Window_BattleLog_displaySubstitute']=Window_BattleLog[_0x3acf3d(0x213)][_0x3acf3d(0x1b3)],Window_BattleLog[_0x3acf3d(0x213)][_0x3acf3d(0x1b3)]=function(_0x5743fa,_0xeba8b0){const _0x25ba56=_0x3acf3d;VisuMZ[_0x25ba56(0x1c0)][_0x25ba56(0x1c1)][_0x25ba56(0x25a)](this,_0x5743fa,_0xeba8b0);if(_0xeba8b0&&_0xeba8b0[_0x25ba56(0x1c8)]())_0xeba8b0['battler']()[_0x25ba56(0x223)](_0xeba8b0,'Sub');},Sprite_Battler[_0x3acf3d(0x213)][_0x3acf3d(0x223)]=function(_0xdc53c5,_0x4f276a){const _0x43f235=_0x3acf3d;if(!_0xdc53c5)return;const _0x3662fe=VisuMZ[_0x43f235(0x1c0)][_0x43f235(0x196)][_0x43f235(0x25d)]||{},_0x5891a5=_0x43f235(0x1f9)[_0x43f235(0x227)](_0x4f276a),_0x526b39=_0x43f235(0x171)[_0x43f235(0x227)](_0x4f276a),_0x44ed37={'textColor':_0x3662fe[_0x43f235(0x259)[_0x43f235(0x227)](_0x4f276a)]||0x0,'flashColor':_0x3662fe[_0x43f235(0x1a5)['format'](_0x4f276a)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x3662fe[_0x43f235(0x176)['format'](_0x4f276a)]||0x0},_0x1fc53d=_0x3662fe[_0x5891a5]||'';if(_0x1fc53d[_0x43f235(0x251)]<=0x0)return;const _0x5c16e4=_0x3662fe[_0x526b39]||0x0,_0x24ea41=ImageManager['loadSystem']('IconSet');_0x5c16e4>0x0?_0x24ea41[_0x43f235(0x1ee)](this['setupIconTextPopup'][_0x43f235(0x1ad)](this,_0x5c16e4,_0x1fc53d,_0x44ed37)):_0x24ea41['addLoadListener'](this[_0x43f235(0x164)]['bind'](this,_0x1fc53d,_0x44ed37));};