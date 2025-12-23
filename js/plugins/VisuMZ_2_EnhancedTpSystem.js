//=============================================================================
// VisuStella MZ - Enhanced TP System
// VisuMZ_2_EnhancedTpSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_EnhancedTpSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EnhancedTP = VisuMZ.EnhancedTP || {};
VisuMZ.EnhancedTP.version = 1.15;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.15] [EnhancedTP]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Enhanced_TP_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The TP system in RPG Maker MZ is rather limiting. A lot of the TP system is
 * hardcoded in giving RPG Maker MZ users very little control over how much TP
 * gain a battler can receive from particular actions and situations. This
 * plugin gives you the ability to adjust how much TP battlers will acquire
 * various actions, different TP modes, and letting players selecting and pick
 * what TP mode they want for each actor.
 *
 * Features include all (but not limited to) the following:
 * 
 * * TP Modes that allow actors and enemies to have different ways of
 *   generating TP through battle.
 * * 30 pre-made TP Modes for you to use and/or learn from.
 * * Functionality for skills and items to change a target's TP Mode.
 * * The ability to teach actors new TP modes upon learning new skills.
 * * Unlock new TP Modes from becoming the target of skills and/or items.
 * * Trait Objects (like states) that will enforce a specific TP Mode when
 *   applied.
 * * TP Gauge can flash a variety of colors once a certain percentile range
 *   has been met.
 * * Integrated TP Mode changer for players within Scene_Skill.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
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
 * MaxTP Overwrite
 *
 * - There was nothing altering MaxTP before and this plugin offers TP Modes
 * that change up the MaxTP total. The function has been overwritten for more
 * plugin functionality.
 *
 * ---
 *
 * Preserve TP
 *
 * - Preserve TP function has been overwritten so it is no longer determined by
 * the presence of the Preserve TP trait, but instead, determined by whether or
 * not the current TP Mode has TP Preservation as its property. This is to keep
 * the consistency in the TP Modes and to give the game dev more control over
 * this aspect.
 *
 * ---
 * 
 * Initial TP Gain in Battle Reworked
 *
 * - If 'Preserve TP' was off, battlers would normally have a random amount of
 * TP given to them at the start of battle by default. However, there was no
 * place to control this value in the RPG Maker MZ editor itself so this has
 * been overwritten to give you, the game dev, full control over this aspect,
 * and whether or not it requires the 'Preserve TP' flag or not.
 *
 * ---
 *
 * On Damage TP Gain
 *
 * - The on Damage function has been overwritten to remove the default TP gain
 * aspect in favor of custom TP gain aspect granted by the current equipped TP
 * Mode to keep functionality under control.
 *
 * ---
 * 
 * Sprite_Gauge Changes
 * 
 * - The sprite gauge has been changed slightly to allow for flashing gauges.
 * They're separated into different layers now when it comes strictly to a TP
 * gauge. There shouldn't be any noticeable compatibility problems with them
 * unless there are plugins that alter the TP gauge completely.
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
 * === General TP Mode Notetags ===
 *
 * These are TP Mode-related notatags that affect both actors and enemies.
 *
 * ---
 *
 * <TP Mode: name>
 *
 * - Used for: Actor Enemy, State Notetags
 * - Sets the starting TP Mode for this actor/enemy to be 'name'.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 *
 * ---
 *
 * <Starting TP Modes>
 *  name
 *  name
 *  name
 *  name
 * </Starting TP Modes>
 *
 * - Used for: Actor Notetags
 * - Adds TP Modes to the actor's available list of TP Modes from the start.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Insert more 'name' entries for more TP Modes.
 *
 * ---
 *
 * <Change Target TP Mode: name>
 *
 * <Change User TP Mode: name>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the target/user's TP Mode to the target TP Mode upon using this
 *   item/skill.
 * - For <Change Target TP Mode: name>, the action must successfully hit the
 *   target in order for the TP Mode to change.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 *
 * ---
 *
 * === Actor-Only TP Mode Notetags ===
 *
 * These are TP Mode-related notetags that only affect actors.
 *
 * ---
 *
 * <Learn TP Mode: name>
 *
 * - Used for: Skill Notetags
 * - Causes the target selected actor to learn the specific TP Mode when the
 *   skill is learned.
 * - Insert multiple copies of this notetag to have the skill learn more
 *   TP Modes for the target actor.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Keep in mind that learning the skill is required for the TP Mode to be
 *   learned. Adding the skill through a trait will not teach the TP Mode.
 *
 * ---
 *
 * <Learn TP Modes>
 *  name
 *  name
 *  name
 * </Learn TP Modes>
 *
 * - Used for: Skill Notetags
 * - Causes the target selected actor to learn the specific TP Mode when the
 *   skill is learned.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Insert more 'name' entries for more TP Modes.
 *
 * ---
 *
 * <Unlock TP Mode: name>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the target selected actor to unlock the specific TP Mode.
 * - Insert multiple copies of this notetag to have the item/skill unlock more
 *   TP Modes for the target actor.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 *
 * ---
 *
 * <Unlock TP Modes>
 *  name
 *  name
 *  name
 * </Unlock TP Modes>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the target selected actor to unlock the specific TP Mode.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Insert more 'name' entries for more TP Modes.
 *
 * ---
 *
 * <Force TP Mode: name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Forces the affected battler to use the specific named TP Mode in battle.
 * - Priority is given based the ordering of trait objects if multiple forced
 *   TP Mode effects are present.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change TP Mode
 * - Changes target actor(s) TP Mode.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to affect.
 *
 *   TP Mode Name:
 *   - Change to this TP Mode for selected actor(s).
 *
 * ---
 *
 * Actor: Unlock TP Mode
 * - Unlocks TP Modes for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which actor(s) to affect.
 *
 *   TP Modes:
 *   - Change to this TP Mode for selected actor(s).
 *
 * ---
 *
 * Actor: Unlock All TP Modes
 * - Unlocks all TP Modes for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which actor(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change TP Mode
 * - Changes target enemy(ies) TP Mode.
 *
 *   Enemy Index(es):
 *   - Select which enemy(ies) to affect.
 *
 *   TP Mode Name:
 *   - Change to this TP Mode for selected enemy(ies).
 *
 * ---
 *
 * === System Plugin Commands ===
 * 
 * ---
 * 
 * System: Show/Hide TP Mode
 * - Shows/Hides TP Mode from Scene_Skill.
 *
 *   Show TP Mode?:
 *   - Shows/Hides TP Mode in Scene_Skill.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the general settings for the Enhanced TP System plugin. These
 * control the default settings for TP Modes and TP Mode option appearing in
 * Scene_Skill for the player.
 *
 * ---
 *
 * Defaults
 * 
 *   Default TP Mode:
 *   - Which TP mode should actors and enemies have by default?
 * 
 *   Global TP Modes:
 *   - TP Modes available to the all actors to pick from.
 *
 * ---
 *
 * Scene_Skill
 * 
 *   Show TP Mode?:
 *   - Show TP Mode in Scene_Skill by default?
 * 
 *   TP Mode Command:
 *   - The command name format shown in Scene_Skill.
 *   - %1 - TP Text
 * 
 *   TP Mode Icon:
 *   - Icon used for TP Mode shown in Scene_Skill.
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: TP Modes
 * ============================================================================
 *
 * TP Modes are the TP settings that an actor or enemy has. TP Modes regulate
 * how TP is earned as well as the maximum TP value the actor/enemy can have.
 * Players can switch between TP Modes if granted the option, too.
 *
 * TP Modes can be added, removed, and editted by you the game dev. Each TP
 * Mode will have the following Plugin Parameters for you to adjust:
 *
 * ---
 *
 * General
 * 
 *   TP Mode Name:
 *   - The name for this TP Mode.
 *   - Used for notetag reference.
 * 
 *   Icon:
 *   - Icon used for this TP Mode.
 * 
 *   Help:
 *   - Help description used for this TP Mode.
 *   - %1 - In-game TP vocabulary.
 * 
 *   MaxTP Formula:
 *   - What's the MaxTP for this TP Mode?
 * 
 *   TCR Multiplier:
 *   - Multiplier on how much TP is earned.
 *   - Stacks multiplicatively with TCR.
 * 
 *   Preserve TP?:
 *   - If preserved, carry TP to the next battle.
 *   - If not, TP resets each battle.
 *
 * ---
 * 
 * Gauge
 * 
 *   Flash Gauge?:
 *   - Let this gauge flash once it reaches a certain percentage value.
 *   - Requires VisuMZ_1_SkillsStatesCore!
 * 
 *   Required Rate:
 *   - What rate does this gauge need to be over in order for it to flash?
 * 
 *   Flash Speed:
 *   - How fast should the gauge flash different colors?
 *   - Lower numbers are slower. Higher numbers are faster.
 * 
 *   Color Lightness:
 *   - How light should the flash color be?
 *   - Lower numbers are darker. Higher numbers are lighter.
 * 
 *   Custom Label:
 *   - Instead of displaying "TP", what label do you want to display here?
 *   - Leave empty to keep using "TP".
 *   - This applies to gauges only. This does NOT change the way TP costs are
 *     displayed in the skill windows.
 * 
 *   Custom Color 1:
 *   Custom Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *   - Empty for default colors.
 *   - This applies to gauges only. This does NOT change the way TP costs are
 *     displayed in the skill windows.
 * 
 * ---
 *
 * TP Formulas > Generic
 * 
 *   Initial TP:
 *   - How much TP is gained at the start of battle?
 * 
 *   Critical Hit:
 *   - How much TP is gained when landing a critical hit?
 * 
 *   Evasion:
 *   - How much TP is gained when evading an action?
 * 
 *   Use Item:
 *   - How much TP is gained when using an item in battle?
 * 
 *   Use Skill:
 *   - How much TP is gained when using a skill in battle that isn't
 *     Attack or Guard?
 *
 * ---
 *
 * TP Formulas > During Regen
 * 
 *   TP Regen:
 *   - How much TP is gained each turn during regeneration?
 * 
 *   Critical HP:
 *   - How much TP is gained when user is in critical HP (25%)
 *     during regeneration.
 * 
 *   Full HP:
 *   - How much TP is gained when user has full HP
 *     during regeneration.
 * 
 *   Critical MP:
 *   - How much TP is gained when user is in critical MP (25%)
 *     during regeneration.
 * 
 *   Full MP:
 *   - How much TP is gained when user has full MP
 *     during regeneration.
 * 
 *   Only Member:
 *   - How much TP is gained when user is the only alive party member
 *     during regeneration.
 *
 * ---
 *
 * TP Formulas > HP Damage
 * 
 *   Take HP Damage:
 *   - How much TP is gained when receiving HP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Deal HP Damage:
 *   - How much TP is gained when dealing HP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Ally HP Damage:
 *   - How much TP is gained when an ally receives HP damage?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > HP Heal
 * 
 *   Take HP Heal:
 *   - How much TP is gained when receiving HP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Deal HP Heal:
 *   - How much TP is gained when dealing HP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Ally HP Heal:
 *   - How much TP is gained when an ally receives HP heals?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > MP Damage
 * 
 *   Take MP Damage:
 *   - How much TP is gained when receiving MP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Deal MP Damage:
 *   - How much TP is gained when dealing MP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Ally MP Damage:
 *   - How much TP is gained when an ally receives MP damage?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > MP Heal
 * 
 *   Take MP Heal:
 *   - How much TP is gained when receiving MP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Deal MP Heal:
 *   - How much TP is gained when dealing MP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Ally MP Heal:
 *   - How much TP is gained when an ally receives MP heals?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > Buffs
 * 
 *   Deal Ally Buff:
 *   - How much TP is gained when user inflicts a buff on an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Deal Enemy Buff:
 *   - How much TP is gained when user inflicts a buff on an enemy through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Ally Buff:
 *   - How much TP is gained when user gains a buff from an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Enemy Buff:
 *   - How much TP is gained when user gains a buff from an enemy through an
 *     Item/Skill Effect (code does not count).
 *
 * ---
 *
 * TP Formulas > Debuffs
 * 
 *   Deal Ally Debuff:
 *   - How much TP is gained when user inflicts a debuff on an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Deal Enemy Debuff:
 *   - How much TP is gained when user inflicts a debuff on an enemy through
 *     an Item/Skill Effect (code does not count).
 * 
 *   Gain Ally Debuff:
 *   - How much TP is gained when user gains a debuff from an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Enemy Debuff:
 *   - How much TP is gained when user gains a debuff from an enemy through an
 *     Item/Skill Effect (code does not count).
 *
 * ---
 *
 * TP Formulas > States
 * 
 *   Deal Ally State:
 *   - How much TP is gained when user inflicts a state on an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Deal Enemy State:
 *   - How much TP is gained when user inflicts a state on an enemy through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Ally State:
 *   - How much TP is gained when user gains a state from an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Enemy State:
 *   - How much TP is gained when user gains a state from an enemy through an
 *     Item/Skill Effect (code does not count).
 *
 * ---
 *
 * TP Formulas > Death
 * 
 *   Ally Death:
 *   - How much TP is gained when an allied member dies.
 *   - Does not matter who the killer is.
 * 
 *   Enemy Death:
 *   - How much TP is gained when an enemy member dies.
 *   - Does not matter who the killer is.
 *
 * ---
 *
 * TP Formulas > Battle
 * 
 *   Win Battle:
 *   - How much TP is gained when the player wins a battle.
 * 
 *   Flee Battle:
 *   - How much TP is gained when the player escapes a battle.
 * 
 *   Lose Battle:
 *   - How much TP is gained when the player loses a battle.
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
 * Version 1.15: August 29, 2024
 * * Feature Update!
 * ** Added failsafes for Bad JavaScript TP Formulas to prevent them from
 *    becoming NaN values, undefined values, or null values. Bad values will
 *    default to 0 and an error message will appear telling which actor, mode,
 *    and key's formula has bad code. Update made by Arisu.
 * 
 * Version 1.14: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug where the icon of the TP Modes command in the Skill Scene
 *    would still appear even if command types are set to text only through the
 *    VisuStella MZ Skills & States Core plugin. Fixed by Olivia.
 * 
 * Version 1.13: September 29, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: August 18, 2022
 * * Feature Update!
 * ** Regenerate TP functions no longer occur outside of battle. Update made
 *    by Olivia.
 * 
 * Version 1.11: July 16, 2021
 * * Bug Fixes!
 * ** Fixed a problem that bypassed teaching TP modes through item usage.
 *    Fix made by Arisu.
 * 
 * Version 1.10: July 9, 2021
 * * Bug Fixes!
 * ** Fixed bugs regarding the TP Mode Unlock notetags not being detected
 *    properly. Fix made by Olivia.
 * 
 * Version 1.09: May 28, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.08: May 7, 2021
 * * Bug Fixes!
 * ** Normal Attack States will no longer trigger state gains if no states are
 *    applied. Fix made by Irina.
 * 
 * Version 1.07: April 23, 2021
 * * Bug Fixes!
 * ** Death effects for TP should now only trigger once. Fix made by Olivia.
 * 
 * Version 1.06: February 12, 2021
 * * Feature Update!
 * ** <Force TP Mode: name> notetag is now updated to be enforced outside of
 *    battle as well. Update made by Olivia.
 * 
 * Version 1.05: January 22, 2021
 * * Documentation Update!
 * ** Add notes to the "Custom Label" and "Custom Color" Plugin Parameters:
 * *** This applies to gauges only. This does NOT change the way TP costs are
 *     displayed in the skill windows.
 * 
 * Version 1.04: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > General Settings > Background Type
 * 
 * Version 1.03: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New plugin parameters added by Arisu:
 * *** Custom Label
 * **** Instead of displaying "TP", what label do you want to display here?
 *      Leave empty to keep using "TP".
 * *** Custom Color 1, Custom Color 2
 * **** Use #rrggbb for custom colors or regular numbers for text colors from
 *      the Window Skin. Empty for default colors.
 * *** These plugin parameters are added onto TP Modes.
 * 
 * Version 1.02: November 8, 2020
 * * Bug Fixes!
 * ** Turning off Preserve TP will no longer generate random amounts of TP at
 *    the start of battle. Fix made by Arisu.
 * 
 * Version 1.01: November 1, 2020
 * * Bug Fixes!
 * ** Skill & States Core is no longer a dependency for Enhanced TP System.
 *    Fix made by Olivia.
 *
 * Version 1.00: October 26, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeTPMode
 * @text Actor: Change TP Mode
 * @desc Changes target actor(s) TP Mode.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to affect.
 * @default ["1"]
 *
 * @arg TPModeName:str
 * @text TP Mode Name
 * @desc Change to this TP Mode for selected actor(s).
 * @default Stoic
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorUnlockTPMode
 * @text Actor: Unlock TP Mode
 * @desc Unlocks TP Modes for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to affect.
 * @default ["1"]
 *
 * @arg TPModes:arraystr
 * @text TP Modes
 * @type string[]
 * @desc Change to this TP Mode for selected actor(s).
 * @default ["Stoic","Comrade","Warrior","Healer"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorUnlockAllTPModes
 * @text Actor: Unlock All TP Modes
 * @desc Unlocks all TP Modes for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeTPMode
 * @text Enemy: Change TP Mode
 * @desc Changes target enemy(ies) TP Mode.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @min 0
 * @desc Select which enemy(ies) to affect.
 * @default ["0"]
 *
 * @arg TPModeName:str
 * @text TP Mode Name
 * @desc Change to this TP Mode for selected enemy(ies).
 * @default Stoic
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SceneSkillTpMode
 * @text System: Show/Hide TP Mode
 * @desc Shows/Hides TP Mode from Scene_Skill.
 *
 * @arg Show:eval
 * @text Show TP Mode?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/Hides TP Mode in Scene_Skill.
 * @default true
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
 * @param EnhancedTP
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
 * @desc General settings pertaining to TP.
 * @default {"Defaults":"","DefaultTpMode:str":"Stoic","GlobalTPModes:arraystr":"[\"Stoic\",\"Comrade\",\"Warrior\",\"Healer\"]","SceneSkill":"","ShowTpMode:eval":"true","TpModeCmdName:str":"%1 Mode","TpModeIcon:num":"164"}
 *
 * @param TpMode:arraystruct
 * @text TP Modes
 * @type struct<TpMode>[]
 * @desc TP Modes available in the game.
 * @default ["{\"Name:str\":\"Stoic\",\"Icon:num\":\"78\",\"Help:json\":\"\\\"Raise %1 when receiving damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"50 * (value / user.mhp) * user.tcr\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Comrade\",\"Icon:num\":\"76\",\"Help:json\":\"\\\"Raise %1 whenever allies take damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"20 * user.tcr\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Warrior\",\"Icon:num\":\"77\",\"Help:json\":\"\\\"Raise %1 by attacking and dealing HP damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Healer\",\"Icon:num\":\"72\",\"Help:json\":\"\\\"Raise %1 by healing HP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Breaker\",\"Icon:num\":\"171\",\"Help:json\":\"\\\"Raise %1 whenever user deals MP damage\\\\nor receives MP damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"50 * (value / Math.max(1, this.mmp)) * user.tcr\",\"DealMpDmg:str\":\"Math.min(16, value / 4) * user.tcr\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Battery\",\"Icon:num\":\"165\",\"Help:json\":\"\\\"Raise %1 whenever use helps an ally restore MP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"Math.min(16, value / 4) * user.tcr\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Slayer\",\"Icon:num\":\"1\",\"Help:json\":\"\\\"Raise %1 whenever an enemy is killed.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"25 * user.tcr\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Avenger\",\"Icon:num\":\"17\",\"Help:json\":\"\\\"Raise %1 whenever an ally is killed.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"50 * user.tcr\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Winner\",\"Icon:num\":\"87\",\"Help:json\":\"\\\"Raise %1 whenever your party wins a battle.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"20 * user.tcr\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Coward\",\"Icon:num\":\"89\",\"Help:json\":\"\\\"Raise %1 whenever your party escapes from battle\\\\nor loses a battle.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"20 * user.tcr\",\"LoseBattle:str\":\"20 * user.tcr\"}","{\"Name:str\":\"Cautious\",\"Icon:num\":\"32\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with full HP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"10 * user.tcr\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Thrifty\",\"Icon:num\":\"33\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with full MP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"10 * user.tcr\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Daredevil\",\"Icon:num\":\"48\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with low HP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"16 * user.tcr\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Splurger\",\"Icon:num\":\"49\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with low MP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"16 * user.tcr\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Caster\",\"Icon:num\":\"79\",\"Help:json\":\"\\\"Raise %1 whenever user performs a skill.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"16 * user.tcr\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Alchemist\",\"Icon:num\":\"176\",\"Help:json\":\"\\\"Raise %1 whenever user uses an item.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"16 * user.tcr\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Enchanter\",\"Icon:num\":\"73\",\"Help:json\":\"\\\"Gains %1 TP whenever user applies a buff\\\\nor status effect to an ally.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"16 * user.tcr\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"16 * user.tcr\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Tactician\",\"Icon:num\":\"74\",\"Help:json\":\"\\\"Gains %1 TP whenever user applies a debuff\\\\nor status effect to a foe.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"16 * user.tcr\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"16 * user.tcr\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Boosted\",\"Icon:num\":\"84\",\"Help:json\":\"\\\"Raise %1 whenever user receives a buff or\\\\nstatus effect from an ally.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"16 * user.tcr\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"16 * user.tcr\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Sufferer\",\"Icon:num\":\"2\",\"Help:json\":\"\\\"Raise %1 whenever user receives a debuff or\\\\nstatus effect from a foe.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"16 * user.tcr\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"16 * user.tcr\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Striker\",\"Icon:num\":\"78\",\"Help:json\":\"\\\"Raise %1 whenever user lands a critical hit.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"16 * user.tcr\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Dancer\",\"Icon:num\":\"82\",\"Help:json\":\"\\\"Raise %1 whenever user evades an attack.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"16 * user.tcr\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Loner\",\"Icon:num\":\"166\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn as the\\\\nlast remaining alive member.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"16 * user.tcr\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Initiator\",\"Icon:num\":\"164\",\"Help:json\":\"\\\"User gains %1 at the start of battle.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"20 * user.tcr\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Charger\",\"Icon:num\":\"311\",\"Help:json\":\"\\\"User loses all %1 at the start of battle but\\\\ngains more each passing turn.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"-1 * user.maxTp()\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"2 ** user.turnCount() * user.tcr\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Berserker\",\"Icon:num\":\"5\",\"Help:json\":\"\\\"User starts with full %1 at the start of battle,\\\\nbut loses 20 %1 each passing turn.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"user.maxTp()\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"-20\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Maximizer\",\"Icon:num\":\"239\",\"Help:json\":\"\\\"User's Max%1 is raised to 300 gains %1 from\\\\ndealing/receiving HP damage at a slower rate.\\\"\",\"MaxFormula:str\":\"300\",\"MultiplierTCR:num\":\"0.5\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"50 * (value / user.mhp) * user.tcr\",\"DealHpHeal:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Minimizer\",\"Icon:num\":\"236\",\"Help:json\":\"\\\"User's Max%1 is lowered to 50 gains %1 from\\\\ndealing/receiving HP damage at a faster rate.\\\"\",\"MaxFormula:str\":\"50\",\"MultiplierTCR:num\":\"2.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"50 * (value / user.mhp) * user.tcr\",\"DealHpHeal:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Recycler\",\"Icon:num\":\"75\",\"Help:json\":\"\\\"User's Max%1 becomes 20. User starts with 20 %1\\\\nand regenerates 20 %1 each turn.\\\"\",\"MaxFormula:str\":\"20\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"20\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"20\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Assassin\",\"Icon:num\":\"10\",\"Help:json\":\"\\\"User's Max%1 becomes 500. User starts with 500 %1,\\\\nbut receiving healing or damage halves user's %1.\\\"\",\"MaxFormula:str\":\"500\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"500\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"user.tp / -2\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"user.tp / -2\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}"]
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
 * @param Defaults
 *
 * @param DefaultTpMode:str
 * @text Default TP Mode
 * @parent Defaults
 * @desc Which TP mode should actors and enemies have by default?
 * @default Stoic
 *
 * @param GlobalTPModes:arraystr
 * @text Global TP Modes
 * @type string[]
 * @parent Defaults
 * @desc TP Modes available to the all actors to pick from.
 * @default ["Stoic","Comrade","Warrior","Healer"]
 *
 * @param SceneSkill
 * @text Scene_Skill
 *
 * @param ShowTpMode:eval
 * @text Show TP Mode?
 * @parent SceneSkill
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show TP Mode in Scene_Skill by default?
 * @default true
 *
 * @param TpModeCmdName:str 
 * @text TP Mode Command
 * @parent SceneSkill
 * @desc The command name format shown in Scene_Skill.
 * %1 - TP Text
 * @default %1 Mode
 *
 * @param TpModeIcon:num
 * @text TP Mode Icon
 * @parent SceneSkill
 * @desc Icon used for TP Mode shown in Scene_Skill.
 * @default 164
 *
 * @param TpWindowBgType:num
 * @text Background Type
 * @parent SceneSkill
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * TP Modes
 * ----------------------------------------------------------------------------
 */
/*~struct~TpMode:
 *
 * @param Name:str 
 * @text TP Mode Name
 * @desc The name for this TP Mode.
 * Used for notetag reference.
 * @default Untitled
 *
 * @param Icon:num
 * @text Icon
 * @parent Name:str
 * @desc Icon used for this TP Mode.
 * @default 160
 *
 * @param Help:json
 * @text Help
 * @parent Name:str
 * @type note
 * @desc Help description used for this TP Mode.
 * %1 - In-game TP vocabulary.
 * @default "Help Line 1\nHelp Line 2"
 *
 * @param MaxFormula:str
 * @text MaxTP Formula
 * @parent Name:str
 * @desc What's the MaxTP for this TP Mode?
 * @default 100
 *
 * @param MultiplierTCR:num
 * @text TCR Multiplier
 * @parent Name:str
 * @desc Multiplier on how much TP is earned.
 * Stacks multiplicatively with TCR.
 * @default 1.0
 *
 * @param Preserve:eval
 * @text Preserve TP?
 * @parent Name:str
 * @type boolean
 * @on Preserve
 * @off Don't
 * @desc If preserved, carry TP to the next battle.
 * If not, TP resets each battle.
 * @default true
 *
 * @param Gauge
 *
 * @param FlashGauge:eval
 * @text Flash Gauge?
 * @parent Gauge
 * @type boolean
 * @on Flash
 * @off Don't Flash
 * @desc Let this gauge flash once it reaches a certain percentage 
 * value. Requires VisuMZ_1_SkillsStatesCore!
 * @default true
 *
 * @param FlashRequirement:num
 * @text Required Rate
 * @parent Gauge
 * @desc What rate does this gauge need to be over in order for it to flash?
 * @default 1.0
 *
 * @param FlashSpeed:num
 * @text Flash Speed
 * @parent Gauge
 * @type number
 * @min 1
 * @max 255
 * @desc How fast should the gauge flash different colors?
 * Lower numbers are slower. Higher numbers are faster.
 * @default 16
 *
 * @param FlashLightness:num
 * @text Color Lightness
 * @parent Gauge
 * @type number
 * @min 0
 * @max 255
 * @desc How light should the flash color be?
 * Lower numbers are darker. Higher numbers are lighter.
 * @default 160
 *
 * @param CustomLabel:str
 * @text Custom Label
 * @parent Gauge
 * @desc Instead of displaying "TP", what label do you want
 * to display here? Leave empty to keep using "TP".
 * @default 
 *
 * @param CustomColor1:str
 * @text Custom Color 1
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin. Empty for default.
 * @default 
 *
 * @param CustomColor2:str
 * @text Custom Color 2
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin. Empty for default.
 * @default 
 *
 * @param Formulas
 * @text TP Formulas
 *
 * @param Generic
 * @parent Formulas
 *
 * @param Initial:str
 * @text Initial TP
 * @parent Generic
 * @desc How much TP is gained at the start of battle?
 * @default 0
 *
 * @param CriticalHit:str
 * @text Critical Hit
 * @parent Generic
 * @desc How much TP is gained when landing a critical hit?
 * @default 0
 *
 * @param Evasion:str
 * @text Evasion
 * @parent Generic
 * @desc How much TP is gained when evading an action?
 * @default 0
 *
 * @param UseItem:str
 * @text Use Item
 * @parent Generic
 * @desc How much TP is gained when using an item in battle?
 * @default 0
 *
 * @param UseSkill:str
 * @text Use Skill
 * @parent Generic
 * @desc How much TP is gained when using a skill in battle that isn't Attack or Guard?
 * @default 0
 *
 * @param Regen
 * @text During Regen
 * @parent Formulas
 *
 * @param TpRegen:str
 * @text TP Regen
 * @parent Regen
 * @desc How much TP is gained each turn during regeneration?
 * @default 0
 *
 * @param CriticalHp:str
 * @text Critical HP
 * @parent Regen
 * @desc How much TP is gained when user is in critical HP (25%)
 * during regeneration.
 * @default 0
 *
 * @param FullHp:str
 * @text Full HP
 * @parent Regen
 * @desc How much TP is gained when user has full HP
 * during regeneration.
 * @default 0
 *
 * @param CriticalMp:str
 * @text Critical MP
 * @parent Regen
 * @desc How much TP is gained when user is in critical MP (25%)
 * during regeneration.
 * @default 0
 *
 * @param FullMp:str
 * @text Full MP
 * @parent Regen
 * @desc How much TP is gained when user has full MP
 * during regeneration.
 * @default 0
 *
 * @param OnlyMember:str
 * @text Only Member
 * @parent Regen
 * @desc How much TP is gained when user is the only alive party member during regeneration.
 * @default 0
 *
 * @param HPDmg
 * @text HP Damage
 * @parent Formulas
 *
 * @param TakeHpDmg:str
 * @text Take HP Damage
 * @parent HPDmg
 * @desc How much TP is gained when receiving HP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param DealHpDmg:str
 * @text Deal HP Damage
 * @parent HPDmg
 * @desc How much TP is gained when dealing HP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyHpDmg:str
 * @text Ally HP Damage
 * @parent HPDmg
 * @desc How much TP is gained when an ally receives HP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param HPHeal
 * @text HP Heal
 * @parent Formulas
 *
 * @param TakeHpHeal:str
 * @text Take HP Heal
 * @parent HPHeal
 * @desc How much TP is gained when receiving HP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param DealHpHeal:str
 * @text Deal HP Heal
 * @parent HPHeal
 * @desc How much TP is gained when dealing HP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyHpHeal:str
 * @text Ally HP Heal
 * @parent HPHeal
 * @desc How much TP is gained when an ally receives HP heals?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param MPDmg
 * @text MP Damage
 * @parent Formulas
 *
 * @param TakeMpDmg:str
 * @text Take MP Damage
 * @parent MPDmg
 * @desc How much TP is gained when receiving MP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param DealMpDmg:str
 * @text Deal MP Damage
 * @parent MPDmg
 * @desc How much TP is gained when dealing MP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyMpDmg:str
 * @text Ally MP Damage
 * @parent MPDmg
 * @desc How much TP is gained when an ally receives MP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param MPHeal
 * @text MP Heal
 * @parent Formulas
 *
 * @param TakeMpHeal:str
 * @text Take MP Heal
 * @parent MPHeal
 * @desc How much TP is gained when receiving MP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param DealMpHeal:str
 * @text Deal MP Heal
 * @parent MPHeal
 * @desc How much TP is gained when dealing MP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyMpHeal:str
 * @text Ally MP Heal
 * @parent MPHeal
 * @desc How much TP is gained when an ally receives MP heals?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param Buffs
 * @parent Formulas
 *
 * @param DealAllyBuff:str
 * @text Deal Ally Buff
 * @parent Buffs
 * @desc How much TP is gained when user inflicts a buff on an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param DealEnemyBuff:str
 * @text Deal Enemy Buff
 * @parent Buffs
 * @desc How much TP is gained when user inflicts a buff on an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainAllyBuff:str
 * @text Gain Ally Buff
 * @parent Buffs
 * @desc How much TP is gained when user gains a buff from an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainEnemyBuff:str
 * @text Gain Enemy Buff
 * @parent Buffs
 * @desc How much TP is gained when user gains a buff from an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param Debuffs
 * @parent Formulas
 *
 * @param DealAllyDebuff:str
 * @text Deal Ally Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user inflicts a debuff on an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param DealEnemyDebuff:str
 * @text Deal Enemy Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user inflicts a debuff on an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainAllyDebuff:str
 * @text Gain Ally Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user gains a debuff from an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainEnemyDebuff:str
 * @text Gain Enemy Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user gains a debuff from an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param States
 * @parent Formulas
 *
 * @param DealAllyState:str
 * @text Deal Ally State
 * @parent States
 * @desc How much TP is gained when user inflicts a state on an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param DealEnemyState:str
 * @text Deal Enemy State
 * @parent States
 * @desc How much TP is gained when user inflicts a state on an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainAllyState:str
 * @text Gain Ally State
 * @parent States
 * @desc How much TP is gained when user gains a state from an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainEnemyState:str
 * @text Gain Enemy State
 * @parent States
 * @desc How much TP is gained when user gains a state from an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param Death
 * @parent Formulas
 *
 * @param KillAlly:str
 * @text Ally Death
 * @parent Death
 * @desc How much TP is gained when an allied member dies.
 * Does not matter who the killer is.
 * @default 0
 *
 * @param KillEnemy:str
 * @text Enemy Death
 * @parent Death
 * @desc How much TP is gained when an enemy member dies.
 * Does not matter who the killer is.
 * @default 0
 *
 * @param Battle
 * @parent Formulas
 *
 * @param WinBattle:str
 * @text Win Battle
 * @parent Battle
 * @desc How much TP is gained when the player wins a battle.
 * @default 0
 *
 * @param FleeBattle:str
 * @text Flee Battle
 * @parent Battle
 * @desc How much TP is gained when the player escapes a battle.
 * @default 0
 *
 * @param LoseBattle:str
 * @text Lose Battle
 * @parent Battle
 * @desc How much TP is gained when the player loses a battle.
 * @default 0
 *
 */
//=============================================================================

const _0x34ee67=_0x415c;(function(_0x33a4b3,_0x4eb3f8){const _0x588c70=_0x415c,_0x2e3bca=_0x33a4b3();while(!![]){try{const _0x1805bd=-parseInt(_0x588c70(0x16e))/0x1+-parseInt(_0x588c70(0x179))/0x2*(-parseInt(_0x588c70(0x1eb))/0x3)+-parseInt(_0x588c70(0x11e))/0x4*(parseInt(_0x588c70(0x147))/0x5)+-parseInt(_0x588c70(0x177))/0x6*(-parseInt(_0x588c70(0x14f))/0x7)+parseInt(_0x588c70(0x12f))/0x8+-parseInt(_0x588c70(0x1bd))/0x9+-parseInt(_0x588c70(0x163))/0xa;if(_0x1805bd===_0x4eb3f8)break;else _0x2e3bca['push'](_0x2e3bca['shift']());}catch(_0x3dc065){_0x2e3bca['push'](_0x2e3bca['shift']());}}}(_0x34e5,0xe3d6e));var label=_0x34ee67(0x112),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x34ee67(0x14a)](function(_0x375b61){const _0x3ebf56=_0x34ee67;return _0x375b61[_0x3ebf56(0x18f)]&&_0x375b61['description'][_0x3ebf56(0xf1)]('['+label+']');})[0x0];function _0x34e5(){const _0x927601=['sparam','AllyMpDmg','gradientFillRect','Game_Battler_addState','Game_Party_initialize','Window_SkillType_makeCommandList','fillRect','learnTpMode','success','log','changeTpMode','OnlyMember','onTpModeCancel','width','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','CustomLabel','drawFullGaugeEnhancedTp','createTpGaugeBitmaps','General','updateEnhancedTp','tpCostColor','Game_Battler_useItem','isActor','match','GainAllyDebuff','tpModesCommandIcon','MaxFormulaFunc','changeBattlerTpLabel','KillEnemy','TpRegen','Sprite_Gauge_update','CriticalMp','gainTpFromTpMode','BattleManager_onEscapeSuccess','TpModeCmdName','leader','applyItemEnhancedTPEffect','DealAllyBuff','makeItemList','createEnhancedTpChildSprites','user','note','GainAllyState','floor','Game_Action_executeMpDamage','ConvertParams','Sprite_Gauge_redraw','tpMode','DealEnemyBuff','_tpModeCache','addChild','_tpGaugeSprite','TPModeName','exit','tpModeValue','Game_Battler_gainSilentTp','Settings','Game_Action_executeHpDamage','Help','TpModes','forceSelect','registerCommand','call','drawIcon','availableTpModes','description','learnSkillEnhancedTP','refresh','TPModes','isPlaytest','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','iconHeight','constructor','trg','DefaultTpMode','show','clear','Icon','EnemyChangeTPMode','includes','deathStateId','getColor','JSON','_tpModeWindow','executeMpDamage','AllyMpHeal','testApply','setup','mainAreaHeight','sortTpModes','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','tpGaugeFlashSpeed','terms','VisuMZ_1_SkillsStatesCore','_actor','testApplyEnhancedTP','isAlive','Enemies','_mp','changeTpCustomColor','toUpperCase','Scene_Skill_createSkillTypeWindow','process_VisuMZ_EnhancedTP_Settings','colSpacing','_hp','attackSkillId','iconWidth','ARRAYJSON','ActorUnlockTPMode','DealMpHeal','ERROR\x20-\x20Bad\x20JavaScript\x20TP\x20Formula:\x20%1,\x20%2,\x20%3','itemEffectAddState','EnhancedTP','DealEnemyState','ShowTpMode','FlashGauge','opponentsUnit','Scene_Boot_onDatabaseLoaded','UseItem','guardSkillId','createTpModeWindow','tpModeWindowRect','name','_availableTpModes','12SCISEB','basic','Scene_Skill_refreshActor','cancel','addCommand','enemy','skillIsNotAttackGuard','maxTp','text','BattleManager_processVictory','addState','textColor','%1Func','selectLast','MaxFormula','MultiplierTCR','itemLineRect','14565584POjyCG','onDatabaseLoaded','setTpModeInSceneSkill','clamp','GainEnemyDebuff','setHelpWindow','Game_BattlerBase_isPreserveTp','critical','prototype','apply','_statusType','Window_SkillList_setStypeId','item','Game_Action_itemEffectAddBuff','gaugeColor2','Game_BattlerBase_maxTp','processVictory','isTpGaugeFlashing','scrollTo','onChangeTpMode','drawText','executeHpDamage','setHue','convertEnhancedTpFunctions','748520Srzehy','SceneSkillTpMode','_tp','filter','inBattle','STRUCT','Sprite_Gauge_drawFullGauge','ARRAYFUNC','7AjZhOT','Game_Battler_onBattleStart','target','learnAvailablePartyTpModes','Game_Action_itemEffectAddState','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20damage\x20=\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20heal\x20=\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20%1;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','addTpModeCommand','FlashSpeed','DealHpHeal','LoseBattle','isTpModeCommandVisible','processDefeat','_skillTypeWindow','initialize','_stypeId','result','index','ARRAYSTR','GainEnemyState','Game_Action_testApply','5945850vjzELt','create','traitObjects','FlashLightness','redraw','FUNC','drawTpMode','gaugeRate','Game_Battler_regenerateTp','drawGaugeRectEnhancedTp','Show','294620zYBzst','parameters','min','mhp','deselect','applyGlobalEnhancedTP','setBlendColor','setHelpWindowItem','itemEffectAddBuff','1108236BMrhbE','AllyHpDmg','55566caZrhc','isItem','gaugeBackColor','tpGaugeFlashLightness','drawItem','CustomColor%1','_statusWindow','TakeHpDmg','NUM','commandTpMode','bitmap','return\x200','setStypeId','TpModeOrder','initEnhancedTP','FullHp','BattleManager_processDefeat','maxItems','tpModes','gainSilentTp','Game_System_initialize','_tpTextSprite','status','friendsUnit','update','createSkillTypeWindow','Unnamed\x20Mode','format','actor','Evasion','itemEffectAddDebuff','mmp','push','Sprite_Gauge_drawGaugeRect','setActor','regenerateTp','showTpModeInSceneSkill','Game_Action_applyGlobal','itemAt','ARRAYSTRUCT','map','GlobalTPModes','GainEnemyBuff','onTpModeOk','drawGaugeRect','_battler','bind','activate','split','gaugeColor1','parse','DealEnemyDebuff','setHandler','TakeMpHeal','playOkSound','_tpMode_SceneSkill','isDead','redrawEnhancedTp','_tpModes','_regeneratingTp','abs','resetTextColor','ActorUnlockAllTPModes','DealHpDmg','Game_Actor_setup','Sprite_Gauge_setup','length','height','8856828aWCGUz','learnAvailableActorTpModes','_helpWindow','DealAllyState','Preserve','initTp','isPreserveTp','TpMode','\x5cI[%1]%2','ARRAYEVAL','FleeBattle','onEscapeSuccess','TakeHpHeal','Actors','tpModesCommandText','commandStyle','trim','STR','KillAlly','_data','EVAL','_cache','defaultTpMode','remove','subject','members','Game_Action_apply','TpWindowBgType','WinBattle','drawFullGauge','DealMpDmg','GainAllyBuff','CriticalHp','_tpMode','UseSkill','Name','refreshActor','AllyHpHeal','Game_Actor_learnSkill','hide','ARRAYNUM','_tpGaugeBack','applyItemUserEffect','learnSkill','applyGlobal','aliveMembers','135tmpeur','makeCommandList','DealAllyDebuff','Initial','initTpModes','useItem','FullMp','updateHelp'];_0x34e5=function(){return _0x927601;};return _0x34e5();}function _0x415c(_0x59c789,_0x132caf){const _0x34e516=_0x34e5();return _0x415c=function(_0x415cc0,_0xa1e98b){_0x415cc0=_0x415cc0-0xb6;let _0x316af1=_0x34e516[_0x415cc0];return _0x316af1;},_0x415c(_0x59c789,_0x132caf);}VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x36c976,_0x585701){const _0x5a9f8b=_0x34ee67;for(const _0x4b880d in _0x585701){if(_0x4b880d[_0x5a9f8b(0xb9)](/(.*):(.*)/i)){const _0xa30779=String(RegExp['$1']),_0x36e1c7=String(RegExp['$2'])['toUpperCase']()[_0x5a9f8b(0x1cd)]();let _0x5df7ac,_0x13f133,_0x263a51;switch(_0x36e1c7){case _0x5a9f8b(0x181):_0x5df7ac=_0x585701[_0x4b880d]!==''?Number(_0x585701[_0x4b880d]):0x0;break;case _0x5a9f8b(0x1e5):_0x13f133=_0x585701[_0x4b880d]!==''?JSON[_0x5a9f8b(0x1ab)](_0x585701[_0x4b880d]):[],_0x5df7ac=_0x13f133[_0x5a9f8b(0x1a1)](_0x1b7e0c=>Number(_0x1b7e0c));break;case _0x5a9f8b(0x1d1):_0x5df7ac=_0x585701[_0x4b880d]!==''?eval(_0x585701[_0x4b880d]):null;break;case _0x5a9f8b(0x1c6):_0x13f133=_0x585701[_0x4b880d]!==''?JSON['parse'](_0x585701[_0x4b880d]):[],_0x5df7ac=_0x13f133[_0x5a9f8b(0x1a1)](_0x1137de=>eval(_0x1137de));break;case _0x5a9f8b(0xf4):_0x5df7ac=_0x585701[_0x4b880d]!==''?JSON['parse'](_0x585701[_0x4b880d]):'';break;case _0x5a9f8b(0x10d):_0x13f133=_0x585701[_0x4b880d]!==''?JSON[_0x5a9f8b(0x1ab)](_0x585701[_0x4b880d]):[],_0x5df7ac=_0x13f133[_0x5a9f8b(0x1a1)](_0x12892a=>JSON[_0x5a9f8b(0x1ab)](_0x12892a));break;case _0x5a9f8b(0x168):_0x5df7ac=_0x585701[_0x4b880d]!==''?new Function(JSON[_0x5a9f8b(0x1ab)](_0x585701[_0x4b880d])):new Function(_0x5a9f8b(0x184));break;case _0x5a9f8b(0x14e):_0x13f133=_0x585701[_0x4b880d]!==''?JSON[_0x5a9f8b(0x1ab)](_0x585701[_0x4b880d]):[],_0x5df7ac=_0x13f133[_0x5a9f8b(0x1a1)](_0xcd55bd=>new Function(JSON[_0x5a9f8b(0x1ab)](_0xcd55bd)));break;case _0x5a9f8b(0x1ce):_0x5df7ac=_0x585701[_0x4b880d]!==''?String(_0x585701[_0x4b880d]):'';break;case _0x5a9f8b(0x160):_0x13f133=_0x585701[_0x4b880d]!==''?JSON['parse'](_0x585701[_0x4b880d]):[],_0x5df7ac=_0x13f133[_0x5a9f8b(0x1a1)](_0x17fd2b=>String(_0x17fd2b));break;case _0x5a9f8b(0x14c):_0x263a51=_0x585701[_0x4b880d]!==''?JSON['parse'](_0x585701[_0x4b880d]):{},_0x5df7ac=VisuMZ[_0x5a9f8b(0xcf)]({},_0x263a51);break;case _0x5a9f8b(0x1a0):_0x13f133=_0x585701[_0x4b880d]!==''?JSON[_0x5a9f8b(0x1ab)](_0x585701[_0x4b880d]):[],_0x5df7ac=_0x13f133[_0x5a9f8b(0x1a1)](_0x1e5d2a=>VisuMZ['ConvertParams']({},JSON[_0x5a9f8b(0x1ab)](_0x1e5d2a)));break;default:continue;}_0x36c976[_0xa30779]=_0x5df7ac;}}return _0x36c976;},(_0x1e910f=>{const _0x488577=_0x34ee67,_0x494740=_0x1e910f[_0x488577(0x11c)];for(const _0x326791 of dependencies){if(!Imported[_0x326791]){alert(_0x488577(0xe8)[_0x488577(0x194)](_0x494740,_0x326791)),SceneManager['exit']();break;}}const _0x323b58=_0x1e910f[_0x488577(0xe3)];if(_0x323b58['match'](/\[Version[ ](.*?)\]/i)){const _0x8a1bef=Number(RegExp['$1']);_0x8a1bef!==VisuMZ[label]['version']&&(alert(_0x488577(0xfc)[_0x488577(0x194)](_0x494740,_0x8a1bef)),SceneManager[_0x488577(0xd7)]());}if(_0x323b58[_0x488577(0xb9)](/\[Tier[ ](\d+)\]/i)){const _0x4171a3=Number(RegExp['$1']);_0x4171a3<tier?(alert(_0x488577(0x201)[_0x488577(0x194)](_0x494740,_0x4171a3,tier)),SceneManager[_0x488577(0xd7)]()):tier=Math['max'](_0x4171a3,tier);}VisuMZ[_0x488577(0xcf)](VisuMZ[label][_0x488577(0xda)],_0x1e910f[_0x488577(0x16f)]);})(pluginData),PluginManager[_0x34ee67(0xdf)](pluginData['name'],'ActorChangeTPMode',_0x4ef411=>{const _0x52aa0a=_0x34ee67;VisuMZ[_0x52aa0a(0xcf)](_0x4ef411,_0x4ef411);const _0x51c890=_0x4ef411[_0x52aa0a(0x1ca)][_0x52aa0a(0x1a1)](_0x6f1834=>$gameActors[_0x52aa0a(0x195)](_0x6f1834))[_0x52aa0a(0x1d4)](null),_0x505812=_0x4ef411[_0x52aa0a(0xd6)];for(const _0x41d8e4 of _0x51c890){if(!_0x41d8e4)continue;_0x41d8e4[_0x52aa0a(0x1fd)](_0x505812);}}),PluginManager[_0x34ee67(0xdf)](pluginData[_0x34ee67(0x11c)],_0x34ee67(0x10e),_0x41a2fb=>{const _0x4adcb=_0x34ee67;VisuMZ[_0x4adcb(0xcf)](_0x41a2fb,_0x41a2fb);const _0x53e910=_0x41a2fb[_0x4adcb(0x1ca)][_0x4adcb(0x1a1)](_0x487e52=>$gameActors[_0x4adcb(0x195)](_0x487e52))[_0x4adcb(0x1d4)](null),_0x1da083=_0x41a2fb[_0x4adcb(0xe6)];for(const _0x9e5de of _0x53e910){if(!_0x9e5de)continue;for(const _0x576aeb of _0x1da083){_0x9e5de[_0x4adcb(0x1fa)](_0x576aeb);}}}),PluginManager[_0x34ee67(0xdf)](pluginData['name'],_0x34ee67(0x1b7),_0xb16179=>{const _0x1e96d4=_0x34ee67;VisuMZ[_0x1e96d4(0xcf)](_0xb16179,_0xb16179);const _0x16ee64=_0xb16179[_0x1e96d4(0x1ca)]['map'](_0x1b2674=>$gameActors[_0x1e96d4(0x195)](_0x1b2674))[_0x1e96d4(0x1d4)](null),_0x2f8de7=VisuMZ[_0x1e96d4(0x112)][_0x1e96d4(0x186)];for(const _0x232780 of _0x16ee64){if(!_0x232780)continue;for(const _0x3ae612 of _0x2f8de7){_0x232780[_0x1e96d4(0x1fa)](_0x3ae612);}}}),PluginManager['registerCommand'](pluginData[_0x34ee67(0x11c)],_0x34ee67(0xf0),_0x281c80=>{const _0x6b2fd8=_0x34ee67;VisuMZ[_0x6b2fd8(0xcf)](_0x281c80,_0x281c80);const _0x46a790=_0x281c80[_0x6b2fd8(0x103)]['map'](_0x539299=>$gameTroop[_0x6b2fd8(0x1d6)]()[_0x539299])[_0x6b2fd8(0x1d4)](null),_0x243d72=_0x281c80[_0x6b2fd8(0xd6)];for(const _0x5ce63e of _0x46a790){if(!_0x5ce63e)continue;_0x5ce63e[_0x6b2fd8(0x1fd)](_0x243d72);}}),PluginManager[_0x34ee67(0xdf)](pluginData[_0x34ee67(0x11c)],_0x34ee67(0x148),_0x113324=>{const _0x243374=_0x34ee67;VisuMZ[_0x243374(0xcf)](_0x113324,_0x113324),$gameSystem['setTpModeInSceneSkill'](_0x113324[_0x243374(0x16d)]);}),VisuMZ[_0x34ee67(0x112)][_0x34ee67(0x117)]=Scene_Boot[_0x34ee67(0x137)][_0x34ee67(0x130)],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0xb6e4e9=_0x34ee67;VisuMZ[_0xb6e4e9(0x112)][_0xb6e4e9(0x117)]['call'](this),this['process_VisuMZ_EnhancedTP_Settings']();},Scene_Boot[_0x34ee67(0x137)][_0x34ee67(0x108)]=function(){const _0x242bdb=_0x34ee67;VisuMZ[_0x242bdb(0x112)][_0x242bdb(0xdd)]={},VisuMZ[_0x242bdb(0x112)]['TpModeOrder']=[];for(const _0xbe72d of VisuMZ['EnhancedTP']['Settings'][_0x242bdb(0x1c4)]){if(!_0xbe72d)continue;_0xbe72d[_0x242bdb(0xe3)]=_0xbe72d[_0x242bdb(0xdc)][_0x242bdb(0x194)](TextManager['tp']),this[_0x242bdb(0x146)](_0xbe72d);const _0x57ff90=_0xbe72d[_0x242bdb(0x1e0)][_0x242bdb(0x106)]()[_0x242bdb(0x1cd)]();VisuMZ[_0x242bdb(0x112)][_0x242bdb(0xdd)][_0x57ff90]=_0xbe72d,VisuMZ[_0x242bdb(0x112)][_0x242bdb(0x186)][_0x242bdb(0x199)](_0x57ff90);}},Scene_Boot[_0x34ee67(0x137)][_0x34ee67(0x146)]=function(_0x4b0542){const _0x3347cc=_0x34ee67,_0x4943dc=[_0x3347cc(0x12c),_0x3347cc(0x1ee),'CriticalHit',_0x3347cc(0x196),_0x3347cc(0x118),_0x3347cc(0x1df),'TpRegen',_0x3347cc(0x1dd),_0x3347cc(0x188),_0x3347cc(0xc1),_0x3347cc(0x1f1),_0x3347cc(0x1fe),_0x3347cc(0x180),_0x3347cc(0x1b8),_0x3347cc(0x178),'TakeHpHeal','DealHpHeal',_0x3347cc(0x1e2),'TakeMpDmg',_0x3347cc(0x1db),_0x3347cc(0x1f4),_0x3347cc(0x1ae),_0x3347cc(0x10f),_0x3347cc(0xf7),_0x3347cc(0xc7),_0x3347cc(0xd2),_0x3347cc(0x1dc),_0x3347cc(0x1a3),'DealAllyDebuff',_0x3347cc(0x1ac),_0x3347cc(0xba),_0x3347cc(0x133),'DealAllyState',_0x3347cc(0x113),_0x3347cc(0xcc),_0x3347cc(0x161),_0x3347cc(0x1cf),_0x3347cc(0xbe),_0x3347cc(0x1d9),'FleeBattle',_0x3347cc(0x158)];for(const _0x24482f of _0x4943dc){const _0x1cfa63=_0x3347cc(0x154)['format'](_0x4b0542[_0x24482f]);_0x4b0542[_0x3347cc(0x12a)['format'](_0x24482f)]=new Function(_0x3347cc(0xca),_0x3347cc(0x151),'value',_0x1cfa63);}},TextManager[_0x34ee67(0x1cb)]=VisuMZ[_0x34ee67(0x112)][_0x34ee67(0xda)]['General'][_0x34ee67(0xc4)],ColorManager['getColor']=function(_0xcf4b55){const _0x293d84=_0x34ee67;return _0xcf4b55=String(_0xcf4b55),_0xcf4b55['match'](/#(.*)/i)?'#%1'['format'](String(RegExp['$1'])):this[_0x293d84(0x129)](Number(_0xcf4b55));},ImageManager[_0x34ee67(0xbb)]=VisuMZ[_0x34ee67(0x112)][_0x34ee67(0xda)][_0x34ee67(0x205)]['TpModeIcon'],VisuMZ[_0x34ee67(0x112)][_0x34ee67(0x127)]=BattleManager[_0x34ee67(0x13f)],BattleManager[_0x34ee67(0x13f)]=function(){const _0x1a62ca=_0x34ee67;VisuMZ[_0x1a62ca(0x112)][_0x1a62ca(0x127)][_0x1a62ca(0xe0)](this),$gameParty[_0x1a62ca(0xc2)](_0x1a62ca(0x1d9),$gameParty[_0x1a62ca(0xc5)](),0x0);},VisuMZ[_0x34ee67(0x112)][_0x34ee67(0xc3)]=BattleManager[_0x34ee67(0x1c8)],BattleManager[_0x34ee67(0x1c8)]=function(){const _0x1a3ac9=_0x34ee67;VisuMZ[_0x1a3ac9(0x112)][_0x1a3ac9(0xc3)][_0x1a3ac9(0xe0)](this),$gameParty[_0x1a3ac9(0xc2)](_0x1a3ac9(0x1c7),$gameParty[_0x1a3ac9(0xc5)](),0x0);},VisuMZ[_0x34ee67(0x112)]['BattleManager_processDefeat']=BattleManager[_0x34ee67(0x15a)],BattleManager[_0x34ee67(0x15a)]=function(){const _0x5b0fc4=_0x34ee67;VisuMZ[_0x5b0fc4(0x112)][_0x5b0fc4(0x189)][_0x5b0fc4(0xe0)](this),$gameParty[_0x5b0fc4(0xc2)](_0x5b0fc4(0x158),$gameParty[_0x5b0fc4(0xc5)](),0x0);},VisuMZ[_0x34ee67(0x112)][_0x34ee67(0x18d)]=Game_System[_0x34ee67(0x137)][_0x34ee67(0x15c)],Game_System['prototype'][_0x34ee67(0x15c)]=function(){const _0x5eec9a=_0x34ee67;VisuMZ[_0x5eec9a(0x112)]['Game_System_initialize'][_0x5eec9a(0xe0)](this),this['initEnhancedTP']();},Game_System[_0x34ee67(0x137)][_0x34ee67(0x187)]=function(){const _0x44487c=_0x34ee67;this[_0x44487c(0x1b0)]=VisuMZ[_0x44487c(0x112)][_0x44487c(0xda)][_0x44487c(0x205)][_0x44487c(0x114)];},Game_System['prototype'][_0x34ee67(0x19d)]=function(){const _0x55c6cc=_0x34ee67;if(this[_0x55c6cc(0x1b0)]===undefined)this[_0x55c6cc(0x187)]();return this[_0x55c6cc(0x1b0)];},Game_System[_0x34ee67(0x137)][_0x34ee67(0x131)]=function(_0x48b5f2){const _0x39d939=_0x34ee67;if(this[_0x39d939(0x1b0)]===undefined)this[_0x39d939(0x187)]();this[_0x39d939(0x1b0)]=_0x48b5f2;},VisuMZ[_0x34ee67(0x112)][_0x34ee67(0x1d7)]=Game_Action[_0x34ee67(0x137)]['apply'],Game_Action['prototype'][_0x34ee67(0x138)]=function(_0x2f9789){const _0x77fdc=_0x34ee67;VisuMZ['EnhancedTP'][_0x77fdc(0x1d7)]['call'](this,_0x2f9789),this['applyEnhancedTP'](_0x2f9789);},Game_Action[_0x34ee67(0x137)]['applyEnhancedTP']=function(_0x589242){const _0x3d002f=_0x34ee67,_0x26565d=_0x589242[_0x3d002f(0x15e)]();_0x26565d[_0x3d002f(0x136)]&&this[_0x3d002f(0x1d5)]()[_0x3d002f(0xc2)]('CriticalHit',_0x589242,0x0),(_0x26565d['evaded']||_0x26565d['missed'])&&_0x589242[_0x3d002f(0xc2)](_0x3d002f(0x196),_0x589242,0x0);},VisuMZ[_0x34ee67(0x112)][_0x34ee67(0xdb)]=Game_Action[_0x34ee67(0x137)]['executeHpDamage'],Game_Action[_0x34ee67(0x137)][_0x34ee67(0x144)]=function(_0x1f3ee0,_0x172797){const _0x4203e4=_0x34ee67;VisuMZ['EnhancedTP'][_0x4203e4(0xdb)]['call'](this,_0x1f3ee0,_0x172797);const _0xed0bb1=this[_0x4203e4(0x1d5)]();_0x172797>0x0?(_0x1f3ee0[_0x4203e4(0xc2)](_0x4203e4(0x180),_0x1f3ee0,_0x172797),_0xed0bb1[_0x4203e4(0xc2)](_0x4203e4(0x1b8),_0x1f3ee0,_0x172797),_0x1f3ee0[_0x4203e4(0x190)]()[_0x4203e4(0xc2)]('AllyHpDmg',_0x1f3ee0,_0x172797)):(_0x172797=Math[_0x4203e4(0x1b5)](_0x172797),_0x1f3ee0['gainTpFromTpMode'](_0x4203e4(0x1c9),_0x1f3ee0,_0x172797),_0xed0bb1['gainTpFromTpMode'](_0x4203e4(0x157),_0x1f3ee0,_0x172797),_0x1f3ee0[_0x4203e4(0x190)]()['gainTpFromTpMode']('AllyHpHeal',_0x1f3ee0,_0x172797));},VisuMZ['EnhancedTP'][_0x34ee67(0xce)]=Game_Action['prototype'][_0x34ee67(0xf6)],Game_Action[_0x34ee67(0x137)][_0x34ee67(0xf6)]=function(_0x1db1ef,_0x495aca){const _0x4d7f9c=_0x34ee67;VisuMZ[_0x4d7f9c(0x112)][_0x4d7f9c(0xce)][_0x4d7f9c(0xe0)](this,_0x1db1ef,_0x495aca);const _0x1f99e4=this[_0x4d7f9c(0x1d5)]();_0x495aca>0x0?(_0x1db1ef['gainTpFromTpMode']('TakeMpDmg',_0x1db1ef,_0x495aca),_0x1f99e4[_0x4d7f9c(0xc2)](_0x4d7f9c(0x1db),_0x1db1ef,_0x495aca),_0x1db1ef[_0x4d7f9c(0x190)]()[_0x4d7f9c(0xc2)](_0x4d7f9c(0x1f4),_0x1db1ef,_0x495aca)):(_0x495aca=Math['abs'](_0x495aca),_0x1db1ef[_0x4d7f9c(0xc2)]('TakeMpHeal',_0x1db1ef,_0x495aca),_0x1f99e4[_0x4d7f9c(0xc2)]('DealMpHeal',_0x1db1ef,_0x495aca),_0x1db1ef[_0x4d7f9c(0x190)]()['gainTpFromTpMode']('AllyMpHeal',_0x1db1ef,_0x495aca));},VisuMZ[_0x34ee67(0x112)][_0x34ee67(0x13c)]=Game_Action[_0x34ee67(0x137)][_0x34ee67(0x176)],Game_Action[_0x34ee67(0x137)][_0x34ee67(0x176)]=function(_0x111ddb,_0x1c4aae){const _0x433bcc=_0x34ee67;VisuMZ['EnhancedTP']['Game_Action_itemEffectAddBuff'][_0x433bcc(0xe0)](this,_0x111ddb,_0x1c4aae);if(!_0x111ddb[_0x433bcc(0x15e)]()[_0x433bcc(0x1fb)])return;const _0xaee3fa=this[_0x433bcc(0x1d5)]();_0xaee3fa['isActor']()===_0x111ddb['isActor']()?(_0xaee3fa[_0x433bcc(0xc2)]('DealAllyBuff',_0x111ddb,0x0),_0x111ddb['gainTpFromTpMode'](_0x433bcc(0x1dc),_0x111ddb,0x0)):(_0xaee3fa[_0x433bcc(0xc2)](_0x433bcc(0xd2),_0x111ddb,0x0),_0x111ddb['gainTpFromTpMode'](_0x433bcc(0x1a3),_0x111ddb,0x0));},VisuMZ[_0x34ee67(0x112)]['Game_Action_itemEffectAddDebuff']=Game_Action['prototype']['itemEffectAddDebuff'],Game_Action[_0x34ee67(0x137)][_0x34ee67(0x197)]=function(_0x287a0a,_0x200e17){const _0x54f4b5=_0x34ee67;VisuMZ[_0x54f4b5(0x112)]['Game_Action_itemEffectAddDebuff'][_0x54f4b5(0xe0)](this,_0x287a0a,_0x200e17);if(!_0x287a0a[_0x54f4b5(0x15e)]()[_0x54f4b5(0x1fb)])return;const _0x2941d6=this[_0x54f4b5(0x1d5)]();_0x2941d6['isActor']()===_0x287a0a[_0x54f4b5(0xb8)]()?(_0x2941d6['gainTpFromTpMode'](_0x54f4b5(0x1ed),_0x287a0a,0x0),_0x287a0a[_0x54f4b5(0xc2)](_0x54f4b5(0xba),_0x287a0a,0x0)):(_0x2941d6[_0x54f4b5(0xc2)](_0x54f4b5(0x1ac),_0x287a0a,0x0),_0x287a0a['gainTpFromTpMode'](_0x54f4b5(0x133),_0x287a0a,0x0));},VisuMZ[_0x34ee67(0x112)]['Game_Action_itemEffectAddState']=Game_Action[_0x34ee67(0x137)][_0x34ee67(0x111)],Game_Action['prototype'][_0x34ee67(0x111)]=function(_0x492fdc,_0x4725a3){const _0x54fc62=_0x34ee67,_0x566b2a=_0x492fdc[_0x54fc62(0x15e)]()[_0x54fc62(0x1fb)];_0x492fdc[_0x54fc62(0x15e)]()[_0x54fc62(0x1fb)]=![],VisuMZ[_0x54fc62(0x112)][_0x54fc62(0x153)][_0x54fc62(0xe0)](this,_0x492fdc,_0x4725a3);if(!_0x492fdc[_0x54fc62(0x15e)]()[_0x54fc62(0x1fb)]){_0x492fdc['result']()[_0x54fc62(0x1fb)]=_0x566b2a;return;}const _0x13605a=this[_0x54fc62(0x1d5)]();_0x13605a[_0x54fc62(0xb8)]()===_0x492fdc[_0x54fc62(0xb8)]()?(_0x13605a['gainTpFromTpMode'](_0x54fc62(0x1c0),_0x492fdc,0x0),_0x492fdc[_0x54fc62(0xc2)](_0x54fc62(0xcc),_0x492fdc,0x0)):(_0x13605a[_0x54fc62(0xc2)](_0x54fc62(0x113),_0x492fdc,0x0),_0x492fdc['gainTpFromTpMode'](_0x54fc62(0x161),_0x492fdc,0x0));},VisuMZ[_0x34ee67(0x112)]['Game_Action_applyItemUserEffect']=Game_Action[_0x34ee67(0x137)][_0x34ee67(0x1e7)],Game_Action['prototype']['applyItemUserEffect']=function(_0x41b4b1){const _0x275291=_0x34ee67;VisuMZ['EnhancedTP']['Game_Action_applyItemUserEffect'][_0x275291(0xe0)](this,_0x41b4b1),this['applyItemEnhancedTPEffect'](_0x41b4b1);},Game_Action['prototype'][_0x34ee67(0xc6)]=function(_0x4050c3){const _0x58d44e=_0x34ee67;if(!_0x4050c3)return;const _0x400b8f=this[_0x58d44e(0x13b)]()[_0x58d44e(0xcb)],_0x3e18a7=this[_0x58d44e(0x1d5)]();_0x400b8f[_0x58d44e(0xb9)](/<CHANGE TARGET TP MODE: (.*)>/i)&&_0x4050c3['changeTpMode'](String(RegExp['$1']));if(!_0x4050c3[_0x58d44e(0xb8)]())return;const _0x5c6de7=_0x400b8f['match'](/<UNLOCK TP MODE: (.*)>/gi);if(_0x5c6de7)for(const _0x1064b2 of _0x5c6de7){_0x1064b2[_0x58d44e(0xb9)](/<UNLOCK TP MODE: (.*)>/i),_0x4050c3['learnTpMode'](String(RegExp['$1']));}if(_0x400b8f['match'](/<UNLOCK TP MODES>\s*([\s\S]*)\s*<\/UNLOCK TP MODES>/i)){const _0x972403=String(RegExp['$1'])[_0x58d44e(0x1a9)](/[\r\n]+/);for(const _0x52690f of _0x972403){_0x4050c3[_0x58d44e(0x1fa)](_0x52690f);}}},VisuMZ[_0x34ee67(0x112)]['Game_Action_applyGlobal']=Game_Action[_0x34ee67(0x137)][_0x34ee67(0x1e9)],Game_Action['prototype']['applyGlobal']=function(){const _0x596c85=_0x34ee67;VisuMZ[_0x596c85(0x112)][_0x596c85(0x19e)][_0x596c85(0xe0)](this),this[_0x596c85(0x173)]();},Game_Action[_0x34ee67(0x137)][_0x34ee67(0x173)]=function(){const _0x1f07c3=_0x34ee67,_0x32c561=this[_0x1f07c3(0x13b)]()['note'],_0x4bf67a=this[_0x1f07c3(0x1d5)]();_0x32c561[_0x1f07c3(0xb9)](/<CHANGE USER TP MODE: (.*)>/i)&&_0x4bf67a['changeTpMode'](String(RegExp['$1']));},VisuMZ[_0x34ee67(0x112)][_0x34ee67(0x162)]=Game_Action[_0x34ee67(0x137)][_0x34ee67(0xf8)],Game_Action[_0x34ee67(0x137)][_0x34ee67(0xf8)]=function(_0xd07cab){const _0x1355fc=_0x34ee67;if(this[_0x1355fc(0x101)](_0xd07cab))return!![];return VisuMZ[_0x1355fc(0x112)]['Game_Action_testApply'][_0x1355fc(0xe0)](this,_0xd07cab);},Game_Action['prototype'][_0x34ee67(0x101)]=function(_0x1171c1){const _0x6f2574=_0x34ee67;if(!this[_0x6f2574(0x13b)]())return![];const _0x1092d9=this[_0x6f2574(0x13b)]()[_0x6f2574(0xcb)],_0x308065=[/<CHANGE USER TP MODE: (.*)>/i,/<CHANGE TARGET TP MODE: (.*)>/i,/<UNLOCK TP MODE: (.*)>/gi,/<UNLOCK TP MODES>\s*([\s\S]*)\s*<\/UNLOCK TP MODES>/i];for(const _0x194258 of _0x308065){if(_0x1092d9[_0x6f2574(0xb9)](_0x194258))return!![];}return![];},Game_BattlerBase[_0x34ee67(0x137)][_0x34ee67(0x187)]=function(){const _0x1c2519=_0x34ee67;this[_0x1c2519(0x1fd)](this[_0x1c2519(0x1d3)]());},Game_BattlerBase[_0x34ee67(0x137)][_0x34ee67(0x1fd)]=function(_0x182810){const _0x5e9cb7=_0x34ee67;_0x182810=_0x182810[_0x5e9cb7(0x106)]()[_0x5e9cb7(0x1cd)]();if(!VisuMZ[_0x5e9cb7(0x112)]['TpModes'][_0x182810])return;this[_0x5e9cb7(0x1de)]=_0x182810,this[_0x5e9cb7(0x142)](_0x182810);},Game_BattlerBase[_0x34ee67(0x137)][_0x34ee67(0x1d3)]=function(){const _0x583745=_0x34ee67;return VisuMZ['EnhancedTP'][_0x583745(0xda)][_0x583745(0x205)][_0x583745(0xec)][_0x583745(0x106)]()[_0x583745(0x1cd)]();},Game_BattlerBase[_0x34ee67(0x137)][_0x34ee67(0xd1)]=function(){const _0x37ca7b=_0x34ee67;if(this[_0x37ca7b(0x1de)]===undefined)this['initEnhancedTP']();let _0x2566b5=this[_0x37ca7b(0x1de)];for(const _0x115417 of this[_0x37ca7b(0x165)]()){if(!_0x115417)continue;if(_0x115417[_0x37ca7b(0xcb)][_0x37ca7b(0xb9)](/<FORCE TP MODE: (.*)>/i)){const _0x2954fd=String(RegExp['$1'])[_0x37ca7b(0x106)]()[_0x37ca7b(0x1cd)]();if(!VisuMZ[_0x37ca7b(0x112)][_0x37ca7b(0xdd)][_0x2954fd])continue;_0x2566b5=_0x2954fd;break;}}return VisuMZ[_0x37ca7b(0x112)]['TpModes'][_0x2566b5[_0x37ca7b(0x106)]()[_0x37ca7b(0x1cd)]()];},Game_BattlerBase['prototype'][_0x34ee67(0xd8)]=function(_0x19d0ac,_0x2dcc59,_0x5c51b0){const _0x4473ba=_0x34ee67,_0x1ff5ce=this[_0x4473ba(0xd1)]();if(!_0x1ff5ce)return 0x0;_0x19d0ac=_0x4473ba(0x12a)[_0x4473ba(0x194)](_0x19d0ac);if(!_0x1ff5ce[_0x19d0ac])return 0x0;try{let _0x42a9b7=_0x1ff5ce[_0x19d0ac](this,_0x2dcc59,_0x5c51b0);if(isNaN(_0x42a9b7)||_0x42a9b7===undefined||_0x42a9b7===null){if($gameTemp['isPlaytest']()){const _0x16fdeb=_0x2dcc59[_0x4473ba(0x1de)]||_0x4473ba(0x193);console['log'](_0x4473ba(0x110)[_0x4473ba(0x194)](_0x2dcc59['name'](),_0x16fdeb,_0x19d0ac));}_0x42a9b7=0x0;}return _0x42a9b7;}catch(_0x1b2850){if($gameTemp[_0x4473ba(0xe7)]()){const _0x366144=_0x2dcc59['_tpMode']||_0x4473ba(0x193);console[_0x4473ba(0x1fc)](_0x4473ba(0x110)['format'](_0x2dcc59[_0x4473ba(0x11c)](),_0x366144,_0x19d0ac));}return 0x0;}},VisuMZ[_0x34ee67(0x112)][_0x34ee67(0xd9)]=Game_Battler['prototype'][_0x34ee67(0x18c)],Game_Battler['prototype'][_0x34ee67(0x18c)]=function(_0x438d0b){const _0x469d53=_0x34ee67;this[_0x469d53(0x1b4)]?this[_0x469d53(0x149)]=(this[_0x469d53(0x149)]+_0x438d0b)['clamp'](0x0,this[_0x469d53(0x125)]()):VisuMZ[_0x469d53(0x112)][_0x469d53(0xd9)][_0x469d53(0xe0)](this,_0x438d0b);},Game_BattlerBase[_0x34ee67(0x137)]['gainTpFromTpMode']=function(_0x1d08cd,_0x12064b,_0x456290){const _0x51e400=_0x34ee67,_0xe95be3=Math[_0x51e400(0xcd)](this[_0x51e400(0xd8)](_0x1d08cd,_0x12064b,_0x456290));this[_0x51e400(0x18c)](_0xe95be3);},VisuMZ[_0x34ee67(0x112)][_0x34ee67(0x13e)]=Game_BattlerBase['prototype'][_0x34ee67(0x125)],Game_BattlerBase[_0x34ee67(0x137)][_0x34ee67(0x125)]=function(){const _0x2ae588=_0x34ee67;if(this[_0x2ae588(0xd1)]())return Math['floor'](this['tpMode']()[_0x2ae588(0xbc)](this,this,0x0));return VisuMZ[_0x2ae588(0x112)][_0x2ae588(0x13e)][_0x2ae588(0xe0)](this);},VisuMZ[_0x34ee67(0x112)][_0x34ee67(0x135)]=Game_BattlerBase[_0x34ee67(0x137)][_0x34ee67(0x1c3)],Game_BattlerBase[_0x34ee67(0x137)][_0x34ee67(0x1c3)]=function(){const _0x8e11d9=_0x34ee67;if(this['tpMode']())return this[_0x8e11d9(0xd1)]()[_0x8e11d9(0x1c1)];return VisuMZ[_0x8e11d9(0x112)][_0x8e11d9(0x135)]['call'](this);},VisuMZ[_0x34ee67(0x112)]['Game_BattlerBase_sparam']=Game_BattlerBase['prototype']['sparam'],Game_BattlerBase[_0x34ee67(0x137)][_0x34ee67(0x1f3)]=function(_0x43bc3e){const _0x4fb6b0=_0x34ee67;let _0x4c3fe2=VisuMZ[_0x4fb6b0(0x112)]['Game_BattlerBase_sparam']['call'](this,_0x43bc3e);return _0x43bc3e===0x5&&this[_0x4fb6b0(0xd1)]()&&(_0x4c3fe2*=this[_0x4fb6b0(0xd1)]()[_0x4fb6b0(0x12d)]),_0x4c3fe2;},Game_BattlerBase[_0x34ee67(0x137)][_0x34ee67(0x140)]=function(){const _0x30f885=_0x34ee67;if(!Imported[_0x30f885(0xff)])return![];const _0x5e292e=this[_0x30f885(0xd1)]();if(!_0x5e292e)return![];if(!_0x5e292e[_0x30f885(0x115)])return![];const _0xe911a5=_0x5e292e['FlashRequirement']||0x0;return this['tpRate']()>=_0xe911a5;},Game_BattlerBase[_0x34ee67(0x137)]['tpGaugeFlashSpeed']=function(){const _0x446c63=_0x34ee67,_0x27b65b=this[_0x446c63(0xd1)]();if(!_0x27b65b)return![];return(_0x27b65b[_0x446c63(0x156)]||0x1)[_0x446c63(0x132)](0x1,0xff);},Game_BattlerBase[_0x34ee67(0x137)]['tpGaugeFlashLightness']=function(){const _0x4891d3=_0x34ee67,_0x274369=this['tpMode']();if(!_0x274369)return![];return(_0x274369[_0x4891d3(0x166)]||0x0)[_0x4891d3(0x132)](0x0,0xff);},Game_Battler[_0x34ee67(0x137)][_0x34ee67(0x1c2)]=function(){},VisuMZ['EnhancedTP'][_0x34ee67(0x150)]=Game_Battler[_0x34ee67(0x137)]['onBattleStart'],Game_Battler['prototype']['onBattleStart']=function(_0x5c124c){const _0x460d50=_0x34ee67;VisuMZ['EnhancedTP'][_0x460d50(0x150)][_0x460d50(0xe0)](this,_0x5c124c),this[_0x460d50(0xc2)](_0x460d50(0x1ee),this,0x0);},VisuMZ[_0x34ee67(0x112)]['Game_Battler_useItem']=Game_Battler[_0x34ee67(0x137)][_0x34ee67(0x1f0)],Game_Battler[_0x34ee67(0x137)][_0x34ee67(0x1f0)]=function(_0x190b7c){const _0x18652e=_0x34ee67;VisuMZ[_0x18652e(0x112)][_0x18652e(0xb7)]['call'](this,_0x190b7c),this[_0x18652e(0x124)](_0x190b7c)&&this[_0x18652e(0xc2)](_0x18652e(0x1df),this,0x0),DataManager[_0x18652e(0x17a)](_0x190b7c)&&this['gainTpFromTpMode'](_0x18652e(0x118),this,0x0);},Game_Battler[_0x34ee67(0x137)][_0x34ee67(0x124)]=function(_0x5bef21){const _0x1dcb50=_0x34ee67;if(!_0x5bef21)return![];if(!DataManager['isSkill'](_0x5bef21))return![];if(_0x5bef21['id']===this[_0x1dcb50(0x10b)]())return![];if(_0x5bef21['id']===this[_0x1dcb50(0x119)]())return![];return!![];},VisuMZ[_0x34ee67(0x112)][_0x34ee67(0x16b)]=Game_Battler[_0x34ee67(0x137)][_0x34ee67(0x19c)],Game_Battler[_0x34ee67(0x137)][_0x34ee67(0x19c)]=function(){const _0x2f9ebb=_0x34ee67;if(!$gameParty[_0x2f9ebb(0x14b)]())return![];;this['_regeneratingTp']=!![];const _0x3c37ce=Math[_0x2f9ebb(0xcd)](this[_0x2f9ebb(0x125)]()*this[_0x2f9ebb(0xeb)]);this[_0x2f9ebb(0x18c)](_0x3c37ce),this['gainTpFromTpMode'](_0x2f9ebb(0xbf),this,0x0),this[_0x2f9ebb(0x10a)]<this['mhp']/0x4&&this['gainTpFromTpMode'](_0x2f9ebb(0x1dd),this,0x0),this['_hp']>=this[_0x2f9ebb(0x171)]&&this[_0x2f9ebb(0xc2)](_0x2f9ebb(0x188),this,0x0),this['_mp']<this[_0x2f9ebb(0x198)]/0x4&&this[_0x2f9ebb(0xc2)](_0x2f9ebb(0xc1),this,0x0),this[_0x2f9ebb(0x104)]>=this['mmp']&&this['gainTpFromTpMode']('FullMp',this,0x0),this['friendsUnit']()[_0x2f9ebb(0x1ea)]()[_0x2f9ebb(0x1bb)]<=0x1&&this[_0x2f9ebb(0xc2)](_0x2f9ebb(0x1fe),this,0x0),this[_0x2f9ebb(0x1b4)]=undefined,this[_0x2f9ebb(0xe5)]();},Game_Battler['prototype']['chargeTpByDamage']=function(_0x4486ae){},VisuMZ[_0x34ee67(0x112)][_0x34ee67(0x1f6)]=Game_Battler[_0x34ee67(0x137)][_0x34ee67(0x128)],Game_Battler[_0x34ee67(0x137)][_0x34ee67(0x128)]=function(_0x3360a6){const _0x2d0bea=_0x34ee67,_0x2edb5c=this[_0x2d0bea(0x102)]();VisuMZ[_0x2d0bea(0x112)]['Game_Battler_addState'][_0x2d0bea(0xe0)](this,_0x3360a6),_0x3360a6===this[_0x2d0bea(0xf2)]()&&this[_0x2d0bea(0x1b1)]()&&_0x2edb5c&&(this[_0x2d0bea(0x190)]()[_0x2d0bea(0xc2)](_0x2d0bea(0x1cf),this,0x0),this[_0x2d0bea(0x116)]()[_0x2d0bea(0xc2)]('KillEnemy',this,0x0));},Game_Battler[_0x34ee67(0x137)][_0x34ee67(0x142)]=function(_0xd6546d){const _0x51e26d=_0x34ee67;this[_0x51e26d(0x1d2)]={},this[_0x51e26d(0x149)]=Math[_0x51e26d(0x170)](this[_0x51e26d(0x149)],this[_0x51e26d(0x125)]());},VisuMZ[_0x34ee67(0x112)][_0x34ee67(0x1b9)]=Game_Actor[_0x34ee67(0x137)][_0x34ee67(0xf9)],Game_Actor[_0x34ee67(0x137)]['setup']=function(_0x26366e){const _0x29c22b=_0x34ee67;VisuMZ['EnhancedTP'][_0x29c22b(0x1b9)][_0x29c22b(0xe0)](this,_0x26366e),this['initEnhancedTP']();},Game_Actor[_0x34ee67(0x137)][_0x34ee67(0x187)]=function(){const _0x435afd=_0x34ee67;this['_availableTpModes']=[],Game_Battler[_0x435afd(0x137)][_0x435afd(0x187)][_0x435afd(0xe0)](this),this[_0x435afd(0x152)](),this[_0x435afd(0x1be)]();},Game_Actor[_0x34ee67(0x137)][_0x34ee67(0x1d3)]=function(){const _0x3a4581=_0x34ee67;return this[_0x3a4581(0x195)]()&&this[_0x3a4581(0x195)]()[_0x3a4581(0xcb)]['match'](/<TP MODE: (.*)>/i)?String(RegExp['$1'])['toUpperCase']()[_0x3a4581(0x1cd)]():Game_Battler[_0x3a4581(0x137)]['defaultTpMode'][_0x3a4581(0xe0)](this);},Game_Actor[_0x34ee67(0x137)]['onChangeTpMode']=function(_0x26bd3d){const _0x3c3c62=_0x34ee67;_0x26bd3d=_0x26bd3d[_0x3c3c62(0x106)]()[_0x3c3c62(0x1cd)](),Game_Battler[_0x3c3c62(0x137)]['onChangeTpMode']['call'](this,_0x26bd3d),this[_0x3c3c62(0x1fa)](_0x26bd3d);},Game_Actor[_0x34ee67(0x137)][_0x34ee67(0x1fa)]=function(_0x5ca3d3){const _0x57db8e=_0x34ee67;_0x5ca3d3=_0x5ca3d3['toUpperCase']()['trim']();if(!VisuMZ['EnhancedTP'][_0x57db8e(0xdd)][_0x5ca3d3])return;this[_0x57db8e(0x11d)]=this['_availableTpModes']||[],!this['_availableTpModes'][_0x57db8e(0xf1)](_0x5ca3d3)&&(this[_0x57db8e(0x11d)][_0x57db8e(0x199)](_0x5ca3d3),this[_0x57db8e(0xfb)]());},VisuMZ[_0x34ee67(0x112)][_0x34ee67(0xfb)]=function(_0x25df42){const _0x5af4a8=_0x34ee67,_0x20118f=[];for(const _0xa84349 of VisuMZ[_0x5af4a8(0x112)][_0x5af4a8(0x186)]){if(_0x25df42['includes'](_0xa84349))_0x20118f[_0x5af4a8(0x199)](_0xa84349);}return _0x20118f;},Game_Actor['prototype']['sortTpModes']=function(){const _0x3b6e09=_0x34ee67;if(this['_availableTpModes']===undefined)this[_0x3b6e09(0x187)]();this['_availableTpModes']=VisuMZ[_0x3b6e09(0x112)]['sortTpModes'](this[_0x3b6e09(0x11d)]);},Game_Actor[_0x34ee67(0x137)]['availableTpModes']=function(){const _0xc300e7=_0x34ee67;if(this[_0xc300e7(0x11d)]===undefined)this[_0xc300e7(0x187)]();this[_0xc300e7(0x152)]();let _0x19867a=this['_availableTpModes']['map'](_0x4a187d=>VisuMZ[_0xc300e7(0x112)][_0xc300e7(0xdd)][_0x4a187d]);return _0x19867a[_0xc300e7(0x1d4)](null);},Game_Actor[_0x34ee67(0x137)][_0x34ee67(0x152)]=function(){const _0x5a6e02=_0x34ee67;for(const _0x2d050b of $gameParty['tpModes']()){this[_0x5a6e02(0x1fa)](_0x2d050b[_0x5a6e02(0x106)]()[_0x5a6e02(0x1cd)]());}},Game_Actor[_0x34ee67(0x137)][_0x34ee67(0x1be)]=function(){const _0xc7ccb9=_0x34ee67;if(this[_0xc7ccb9(0x195)]()&&this[_0xc7ccb9(0x195)]()[_0xc7ccb9(0xcb)][_0xc7ccb9(0xb9)](/<STARTING TP (?:MODE|MODES)>\s*([\s\S]*)\s*<\/STARTING TP (?:MODE|MODES)>/i)){const _0x1d3841=String(RegExp['$1'])[_0xc7ccb9(0x1a9)](/[\r\n]+/);for(const _0x515c40 of _0x1d3841){this['learnTpMode'](_0x515c40[_0xc7ccb9(0x106)]()[_0xc7ccb9(0x1cd)]());}}},VisuMZ[_0x34ee67(0x112)][_0x34ee67(0x1e3)]=Game_Actor[_0x34ee67(0x137)]['learnSkill'],Game_Actor[_0x34ee67(0x137)][_0x34ee67(0x1e8)]=function(_0x280790){const _0x6835fb=_0x34ee67;VisuMZ[_0x6835fb(0x112)]['Game_Actor_learnSkill']['call'](this,_0x280790),this[_0x6835fb(0xe4)](_0x280790);},Game_Actor[_0x34ee67(0x137)][_0x34ee67(0xe4)]=function(_0x2b3be5){const _0x388711=_0x34ee67;if(!$dataSkills[_0x2b3be5])return;const _0x3c7ef5=$dataSkills[_0x2b3be5]['note'],_0x1b50be=_0x3c7ef5['match'](/<LEARN TP MODE: (.*)>/gi);if(_0x1b50be)for(const _0x5014d4 of _0x1b50be){_0x5014d4[_0x388711(0xb9)](/<LEARN TP MODE: (.*)>/i),this[_0x388711(0x1fa)](String(RegExp['$1']));}if(_0x3c7ef5[_0x388711(0xb9)](/<LEARN TP MODES>\s*([\s\S]*)\s*<\/LEARN TP MODES>/i)){const _0x464374=String(RegExp['$1'])[_0x388711(0x1a9)](/[\r\n]+/);for(const _0x553b65 of _0x464374){this['learnTpMode'](_0x553b65);}}},Game_Enemy['prototype']['defaultTpMode']=function(){const _0x1aa78a=_0x34ee67;return this[_0x1aa78a(0x123)]()['note']['match'](/<TP MODE: (.*)>/i)?String(RegExp['$1'])[_0x1aa78a(0x106)]()['trim']():Game_Battler['prototype'][_0x1aa78a(0x1d3)][_0x1aa78a(0xe0)](this);},Game_Unit['prototype']['gainTpFromTpMode']=function(_0x212622,_0xb2a286,_0x3e03cf){const _0x18c17f=_0x34ee67;for(const _0x317604 of this[_0x18c17f(0x1ea)]()){if(!_0x317604)continue;_0x317604[_0x18c17f(0xc2)](_0x212622,_0xb2a286,_0x3e03cf);}},VisuMZ[_0x34ee67(0x112)]['Game_Party_initialize']=Game_Party[_0x34ee67(0x137)][_0x34ee67(0x15c)],Game_Party[_0x34ee67(0x137)][_0x34ee67(0x15c)]=function(){const _0x1aa0a5=_0x34ee67;VisuMZ[_0x1aa0a5(0x112)][_0x1aa0a5(0x1f7)][_0x1aa0a5(0xe0)](this),this[_0x1aa0a5(0x1ef)]();},Game_Party[_0x34ee67(0x137)]['initTpModes']=function(){const _0xaf85d4=_0x34ee67;this[_0xaf85d4(0x1b3)]=[];for(const _0x5dfd23 of VisuMZ[_0xaf85d4(0x112)]['Settings'][_0xaf85d4(0x205)][_0xaf85d4(0x1a2)]){this[_0xaf85d4(0x1b3)][_0xaf85d4(0x199)](_0x5dfd23['toUpperCase']()['trim']());}},Game_Party[_0x34ee67(0x137)][_0x34ee67(0x18b)]=function(){const _0x4b42df=_0x34ee67;if(this[_0x4b42df(0x1b3)]===undefined)this[_0x4b42df(0x1ef)]();return this[_0x4b42df(0x1b3)];},VisuMZ['EnhancedTP']['Scene_Skill_create']=Scene_Skill[_0x34ee67(0x137)][_0x34ee67(0x164)],Scene_Skill['prototype'][_0x34ee67(0x164)]=function(){const _0x128e35=_0x34ee67;VisuMZ[_0x128e35(0x112)]['Scene_Skill_create'][_0x128e35(0xe0)](this),this[_0x128e35(0x11a)]();},VisuMZ['EnhancedTP'][_0x34ee67(0x107)]=Scene_Skill[_0x34ee67(0x137)][_0x34ee67(0x192)],Scene_Skill[_0x34ee67(0x137)][_0x34ee67(0x192)]=function(){const _0x1c4832=_0x34ee67;VisuMZ[_0x1c4832(0x112)]['Scene_Skill_createSkillTypeWindow'][_0x1c4832(0xe0)](this),this[_0x1c4832(0x15b)][_0x1c4832(0x1ad)](_0x1c4832(0xd1),this[_0x1c4832(0x182)][_0x1c4832(0x1a7)](this));},Scene_Skill['prototype']['createTpModeWindow']=function(){const _0x293d26=_0x34ee67,_0x2720eb=this[_0x293d26(0x11b)]();this[_0x293d26(0xf5)]=new Window_TpModes(_0x2720eb),this[_0x293d26(0xf5)][_0x293d26(0x134)](this[_0x293d26(0x1bf)]),this[_0x293d26(0xf5)][_0x293d26(0x1ad)]('ok',this[_0x293d26(0x1a4)]['bind'](this)),this[_0x293d26(0xf5)]['setHandler'](_0x293d26(0x121),this[_0x293d26(0x1ff)][_0x293d26(0x1a7)](this)),this['addWindow'](this[_0x293d26(0xf5)]);const _0x304bc1=VisuMZ[_0x293d26(0x112)][_0x293d26(0xda)][_0x293d26(0x205)][_0x293d26(0x1d8)];this['_tpModeWindow']['setBackgroundType'](_0x304bc1||0x0);},Scene_Skill[_0x34ee67(0x137)][_0x34ee67(0x11b)]=function(){const _0x2c0750=_0x34ee67,_0x51af3e=0x0,_0x1f99be=this[_0x2c0750(0x17f)]['y']+this[_0x2c0750(0x17f)][_0x2c0750(0x1bc)],_0x1e015f=Graphics['boxWidth'],_0x50b3af=this[_0x2c0750(0xfa)]()-this[_0x2c0750(0x17f)][_0x2c0750(0x1bc)];return new Rectangle(_0x51af3e,_0x1f99be,_0x1e015f,_0x50b3af);},Scene_Skill['prototype'][_0x34ee67(0x182)]=function(){const _0x325898=_0x34ee67;this[_0x325898(0xf5)]['activate'](),this[_0x325898(0xf5)][_0x325898(0x12b)]();},Scene_Skill[_0x34ee67(0x137)][_0x34ee67(0x1a4)]=function(){const _0x5ae687=_0x34ee67;this[_0x5ae687(0xf5)][_0x5ae687(0x1a8)]();const _0xba4747=this[_0x5ae687(0xf5)]['item']();if(!_0xba4747)return;this[_0x5ae687(0x195)]()[_0x5ae687(0x1fd)](_0xba4747['Name']),this['_tpModeWindow'][_0x5ae687(0xe5)](),this['_statusWindow']['refresh']();},Scene_Skill[_0x34ee67(0x137)][_0x34ee67(0x1ff)]=function(){const _0xf631cd=_0x34ee67;this['_tpModeWindow'][_0xf631cd(0x172)](),this[_0xf631cd(0x15b)]['activate']();},VisuMZ[_0x34ee67(0x112)]['Scene_Skill_refreshActor']=Scene_Skill[_0x34ee67(0x137)][_0x34ee67(0x1e1)],Scene_Skill[_0x34ee67(0x137)][_0x34ee67(0x1e1)]=function(){const _0x2e9a9f=_0x34ee67;VisuMZ[_0x2e9a9f(0x112)][_0x2e9a9f(0x120)][_0x2e9a9f(0xe0)](this);if(this['_tpModeWindow'])this[_0x2e9a9f(0xf5)][_0x2e9a9f(0x19b)](this[_0x2e9a9f(0x195)]());},VisuMZ['EnhancedTP'][_0x34ee67(0x1ba)]=Sprite_Gauge[_0x34ee67(0x137)][_0x34ee67(0xf9)],Sprite_Gauge[_0x34ee67(0x137)][_0x34ee67(0xf9)]=function(_0x33aa12,_0x863739){const _0x3d6605=_0x34ee67;VisuMZ[_0x3d6605(0x112)][_0x3d6605(0x1ba)][_0x3d6605(0xe0)](this,_0x33aa12,_0x863739),this['_statusType']==='tp'&&(this[_0x3d6605(0xc9)](),this['update']());},Sprite_Gauge[_0x34ee67(0x137)][_0x34ee67(0xc9)]=function(){const _0x310ede=_0x34ee67;!this[_0x310ede(0x1e6)]&&(this[_0x310ede(0x1e6)]=new Sprite(),this[_0x310ede(0xd4)](this[_0x310ede(0x1e6)])),!this[_0x310ede(0xd5)]&&(this[_0x310ede(0xd5)]=new Sprite(),this[_0x310ede(0xd4)](this[_0x310ede(0xd5)])),!this['_tpTextSprite']&&(this[_0x310ede(0x18e)]=new Sprite(),this[_0x310ede(0xd4)](this['_tpTextSprite']));},VisuMZ[_0x34ee67(0x112)][_0x34ee67(0xd0)]=Sprite_Gauge[_0x34ee67(0x137)][_0x34ee67(0x167)],Sprite_Gauge[_0x34ee67(0x137)][_0x34ee67(0x167)]=function(){const _0x207c2d=_0x34ee67;let _0x4e35f2=$dataSystem[_0x207c2d(0xfe)]['basic'][0x7];this[_0x207c2d(0x139)]==='tp'&&this[_0x207c2d(0xbd)](),VisuMZ['EnhancedTP'][_0x207c2d(0xd0)][_0x207c2d(0xe0)](this),this['_statusType']==='tp'&&this[_0x207c2d(0x1b2)](),this['_statusType']==='tp'&&($dataSystem[_0x207c2d(0xfe)]['basic'][0x7]=_0x4e35f2);},Sprite_Gauge[_0x34ee67(0x137)][_0x34ee67(0x1b2)]=function(){const _0xe65380=_0x34ee67;this[_0xe65380(0x18e)]&&(this['_tpTextSprite']['bitmap']=this[_0xe65380(0x183)]),this['setFrame'](0x0,0x0,0x0,0x0);},VisuMZ[_0x34ee67(0x112)]['Sprite_Gauge_drawFullGauge']=Sprite_Gauge[_0x34ee67(0x137)][_0x34ee67(0x1da)],Sprite_Gauge[_0x34ee67(0x137)][_0x34ee67(0x1da)]=function(_0x57e7ae,_0x19ffc2,_0x4fdf9b,_0x20ef97,_0x63f7d4,_0x2926df){const _0x34cfe5=_0x34ee67;this[_0x34cfe5(0x139)]==='tp'&&this[_0x34cfe5(0xd5)]?this[_0x34cfe5(0x203)](_0x57e7ae,_0x19ffc2,_0x4fdf9b,_0x20ef97,_0x63f7d4,_0x2926df):VisuMZ[_0x34cfe5(0x112)][_0x34cfe5(0x14d)][_0x34cfe5(0xe0)](this,_0x57e7ae,_0x19ffc2,_0x4fdf9b,_0x20ef97,_0x63f7d4,_0x2926df);},Sprite_Gauge[_0x34ee67(0x137)][_0x34ee67(0x204)]=function(_0x235a36){const _0x35b9fa=_0x34ee67;!this[_0x35b9fa(0x1e6)]['bitmap']&&(this[_0x35b9fa(0x1e6)][_0x35b9fa(0x183)]=new Bitmap(this[_0x35b9fa(0x183)][_0x35b9fa(0x200)],this[_0x35b9fa(0x183)][_0x35b9fa(0x1bc)])),!this['_tpGaugeSprite']['bitmap']&&(this[_0x35b9fa(0xd5)][_0x35b9fa(0x183)]=new Bitmap(this[_0x35b9fa(0x183)]['width'],this[_0x35b9fa(0x183)]['height'])),_0x235a36&&(this[_0x35b9fa(0x1e6)][_0x35b9fa(0x183)][_0x35b9fa(0xee)](),this[_0x35b9fa(0xd5)][_0x35b9fa(0x183)][_0x35b9fa(0xee)]());},Sprite_Gauge[_0x34ee67(0x137)][_0x34ee67(0x203)]=function(_0x2e3eb5,_0x23fa7c,_0x24bf6e,_0x379078,_0x3b9d95,_0x3b87d4){const _0x3fe0dc=_0x34ee67;this['createTpGaugeBitmaps'](!![]);const _0x159015=this[_0x3fe0dc(0x16a)](),_0x1610f3=Math['floor']((_0x3b9d95-0x2)*_0x159015),_0x5143cf=_0x3b87d4-0x2,_0x4b3718=this['gaugeBackColor']();this['_tpGaugeBack']['bitmap']['fillRect'](_0x24bf6e,_0x379078,_0x3b9d95,_0x3b87d4,_0x4b3718),_0x2e3eb5=this[_0x3fe0dc(0x105)](_0x2e3eb5,0x1),_0x23fa7c=this[_0x3fe0dc(0x105)](_0x23fa7c,0x2),this['_tpGaugeSprite'][_0x3fe0dc(0x183)]['gradientFillRect'](_0x24bf6e+0x1,_0x379078+0x1,_0x1610f3,_0x5143cf,_0x2e3eb5,_0x23fa7c);},VisuMZ['EnhancedTP']['Sprite_Gauge_drawGaugeRect']=Sprite_Gauge[_0x34ee67(0x137)]['drawGaugeRect'],Sprite_Gauge[_0x34ee67(0x137)][_0x34ee67(0x1a5)]=function(_0x21f12f,_0x40fe85,_0x4445a2,_0x2ff1b8){const _0x17e176=_0x34ee67;this[_0x17e176(0x139)]==='tp'&&this[_0x17e176(0xd5)]?this[_0x17e176(0x16c)](_0x21f12f,_0x40fe85,_0x4445a2,_0x2ff1b8):VisuMZ[_0x17e176(0x112)][_0x17e176(0x19a)][_0x17e176(0xe0)](this,_0x21f12f,_0x40fe85,_0x4445a2,_0x2ff1b8);},Sprite_Gauge['prototype']['drawGaugeRectEnhancedTp']=function(_0x604125,_0x3bf1b3,_0x174fbb,_0x2e6f3d){const _0x521205=_0x34ee67;this[_0x521205(0x204)](!![]);const _0x3e10c0=this[_0x521205(0x16a)](),_0x3d4bcd=Math[_0x521205(0xcd)]((_0x174fbb-0x2)*_0x3e10c0),_0x3b6b7e=_0x2e6f3d-0x2,_0x50afac=this[_0x521205(0x17b)](),_0xa5e07b=this['changeTpCustomColor'](this[_0x521205(0x1aa)](),0x1),_0x216f67=this['changeTpCustomColor'](this[_0x521205(0x13d)](),0x2);this[_0x521205(0x1e6)]['bitmap'][_0x521205(0x1f9)](_0x604125,_0x3bf1b3,_0x174fbb,_0x2e6f3d,_0x50afac),this[_0x521205(0xd5)]['bitmap'][_0x521205(0x1f5)](_0x604125+0x1,_0x3bf1b3+0x1,_0x3d4bcd,_0x3b6b7e,_0xa5e07b,_0x216f67);},VisuMZ[_0x34ee67(0x112)]['Sprite_Gauge_update']=Sprite_Gauge['prototype']['update'],Sprite_Gauge[_0x34ee67(0x137)][_0x34ee67(0x191)]=function(){const _0x258144=_0x34ee67;VisuMZ['EnhancedTP'][_0x258144(0xc0)][_0x258144(0xe0)](this),this[_0x258144(0x206)]();},Sprite_Gauge[_0x34ee67(0x137)]['updateEnhancedTp']=function(){const _0x5620c1=_0x34ee67;if(this['_statusType']!=='tp')return;if(!this[_0x5620c1(0xd5)])return;if(!this[_0x5620c1(0x1a6)])return;const _0x3abcdb=this['_battler']['tpMode']();this[_0x5620c1(0xd3)]!==_0x3abcdb&&(this[_0x5620c1(0xd3)]=_0x3abcdb,this['redraw']());if(this['_battler'][_0x5620c1(0x140)]()){const _0x59bce=this[_0x5620c1(0x1a6)][_0x5620c1(0xfd)]();this[_0x5620c1(0xd5)]['setHue'](this[_0x5620c1(0xd5)]['_hue']+_0x59bce);const _0x5438e9=this[_0x5620c1(0x1a6)][_0x5620c1(0x17c)]();this[_0x5620c1(0xd5)][_0x5620c1(0x174)]([0xff,0xff,0xff,_0x5438e9]);}else this[_0x5620c1(0xd5)][_0x5620c1(0x174)]([0xff,0xff,0xff,0x0]),this[_0x5620c1(0xd5)][_0x5620c1(0x145)](0x0);},Sprite_Gauge[_0x34ee67(0x137)][_0x34ee67(0xbd)]=function(){const _0x288d16=_0x34ee67;if(!this[_0x288d16(0x1a6)])return;const _0x4ba851=this[_0x288d16(0x1a6)]['tpMode']();_0x4ba851[_0x288d16(0x202)]&&($dataSystem[_0x288d16(0xfe)][_0x288d16(0x11f)][0x7]=_0x4ba851['CustomLabel'][_0x288d16(0x1cd)]());},Sprite_Gauge[_0x34ee67(0x137)]['changeTpCustomColor']=function(_0x2cec40,_0x5dc9ac){const _0x5bdaff=_0x34ee67;if(!this['_battler'])return _0x2cec40;const _0x49530b=this[_0x5bdaff(0x1a6)][_0x5bdaff(0xd1)](),_0x11afed=_0x5bdaff(0x17e)[_0x5bdaff(0x194)](_0x5dc9ac);return _0x49530b[_0x11afed]?ColorManager[_0x5bdaff(0xf3)](_0x49530b[_0x11afed]):_0x2cec40;},Window_Base['prototype']['drawTpMode']=function(_0x4fb5ee,_0x26089a,_0x10295e,_0x3c452c,_0x178530){const _0x45cdc6=_0x34ee67;if(!_0x4fb5ee)return;const _0x3fd1cb=_0x10295e+(this['lineHeight']()-ImageManager[_0x45cdc6(0xe9)])/0x2,_0x264427=ImageManager[_0x45cdc6(0x10c)]+0x4,_0x466e06=Math['max'](0x0,_0x3c452c-_0x264427);this[_0x45cdc6(0x1b6)](),_0x178530&&_0x178530[_0x45cdc6(0xd1)]()===_0x4fb5ee&&this['changeTextColor'](ColorManager[_0x45cdc6(0xb6)]()),this[_0x45cdc6(0xe1)](_0x4fb5ee[_0x45cdc6(0xef)],_0x26089a,_0x3fd1cb),this[_0x45cdc6(0x143)](_0x4fb5ee['Name'],_0x26089a+_0x264427,_0x10295e,_0x466e06);},VisuMZ[_0x34ee67(0x112)][_0x34ee67(0x1f8)]=Window_SkillType[_0x34ee67(0x137)][_0x34ee67(0x1ec)],Window_SkillType[_0x34ee67(0x137)]['makeCommandList']=function(){const _0x67421e=_0x34ee67;VisuMZ['EnhancedTP'][_0x67421e(0x1f8)][_0x67421e(0xe0)](this),this[_0x67421e(0x155)]();},Window_SkillType[_0x34ee67(0x137)][_0x34ee67(0x155)]=function(){const _0x58c5ac=_0x34ee67;if(!this[_0x58c5ac(0x159)]())return;let _0x3f3dbe=TextManager[_0x58c5ac(0x1cb)]['format'](TextManager['tp']);Imported[_0x58c5ac(0xff)]&&(this[_0x58c5ac(0x1cc)]()!==_0x58c5ac(0x126)&&(_0x3f3dbe=_0x58c5ac(0x1c5)[_0x58c5ac(0x194)](ImageManager['tpModesCommandIcon'],_0x3f3dbe))),this[_0x58c5ac(0x122)](_0x3f3dbe,'tpMode',!![],_0x58c5ac(0xd1));},Window_SkillType[_0x34ee67(0x137)][_0x34ee67(0x159)]=function(){return $gameSystem['showTpModeInSceneSkill']();},VisuMZ[_0x34ee67(0x112)]['Window_SkillList_setStypeId']=Window_SkillList['prototype'][_0x34ee67(0x185)],Window_SkillList[_0x34ee67(0x137)]['setStypeId']=function(_0x126284){const _0x268f22=_0x34ee67,_0x3ab2ca=this[_0x268f22(0x15d)]!==_0x126284;if(!_0x3ab2ca)return;this[_0x268f22(0xed)]();const _0x4cb49a=SceneManager['_scene'][_0x268f22(0xf5)];if(_0x4cb49a)_0x4cb49a[_0x268f22(0x1e4)]();const _0x1e0a5d=this[_0x268f22(0x17f)];if(_0x1e0a5d)_0x1e0a5d[_0x268f22(0xed)]();VisuMZ[_0x268f22(0x112)][_0x268f22(0x13a)][_0x268f22(0xe0)](this,_0x126284);if(_0x3ab2ca&&_0x4cb49a&&_0x126284===_0x268f22(0xd1)){if(_0x1e0a5d)_0x1e0a5d[_0x268f22(0x1e4)]();this[_0x268f22(0x1e4)](),_0x4cb49a[_0x268f22(0xed)]();}};function Window_TpModes(){const _0x58b3b7=_0x34ee67;this[_0x58b3b7(0x15c)](...arguments);}Window_TpModes[_0x34ee67(0x137)]=Object[_0x34ee67(0x164)](Window_Selectable[_0x34ee67(0x137)]),Window_TpModes[_0x34ee67(0x137)][_0x34ee67(0xea)]=Window_TpModes,Window_TpModes[_0x34ee67(0x137)][_0x34ee67(0x15c)]=function(_0x386c69){const _0x76298=_0x34ee67;Window_Selectable['prototype'][_0x76298(0x15c)][_0x76298(0xe0)](this,_0x386c69),this[_0x76298(0x100)]=null,this[_0x76298(0x1d0)]=[],this[_0x76298(0x1e4)]();},Window_TpModes['prototype'][_0x34ee67(0x19b)]=function(_0x4a266a){const _0x33435f=_0x34ee67;this[_0x33435f(0x100)]!==_0x4a266a&&(this[_0x33435f(0x100)]=_0x4a266a,this[_0x33435f(0xe5)](),this[_0x33435f(0x141)](0x0,0x0));},Window_TpModes[_0x34ee67(0x137)]['maxCols']=function(){return 0x2;},Window_TpModes[_0x34ee67(0x137)][_0x34ee67(0x109)]=function(){return 0x10;},Window_TpModes[_0x34ee67(0x137)][_0x34ee67(0x18a)]=function(){const _0xc25d1=_0x34ee67;return this[_0xc25d1(0x1d0)]?this[_0xc25d1(0x1d0)][_0xc25d1(0x1bb)]:0x1;},Window_TpModes[_0x34ee67(0x137)][_0x34ee67(0x13b)]=function(){const _0x53d5b1=_0x34ee67;return this[_0x53d5b1(0x19f)](this[_0x53d5b1(0x15f)]());},Window_TpModes['prototype']['itemAt']=function(_0x55e640){return this['_data']&&_0x55e640>=0x0?this['_data'][_0x55e640]:null;},Window_TpModes[_0x34ee67(0x137)][_0x34ee67(0xc8)]=function(){const _0x27c61f=_0x34ee67;this[_0x27c61f(0x100)]?this[_0x27c61f(0x1d0)]=this[_0x27c61f(0x100)][_0x27c61f(0xe2)]():this[_0x27c61f(0x1d0)]=[];},Window_TpModes[_0x34ee67(0x137)][_0x34ee67(0x12b)]=function(){const _0x4d758a=_0x34ee67;this[_0x4d758a(0xde)](0x0);},Window_TpModes[_0x34ee67(0x137)][_0x34ee67(0x17d)]=function(_0x1b7d9c){const _0x25bb2f=_0x34ee67,_0x2200e5=this['itemAt'](_0x1b7d9c);if(!_0x2200e5)return;const _0x1258fe=this[_0x25bb2f(0x12e)](_0x1b7d9c);this[_0x25bb2f(0x169)](_0x2200e5,_0x1258fe['x'],_0x1258fe['y'],_0x1258fe['width'],this[_0x25bb2f(0x100)]);},Window_TpModes[_0x34ee67(0x137)][_0x34ee67(0x1f2)]=function(){const _0x33d9e0=_0x34ee67;this[_0x33d9e0(0x175)](this[_0x33d9e0(0x13b)]());},Window_TpModes['prototype'][_0x34ee67(0xe5)]=function(){const _0x5dcbc7=_0x34ee67;this['makeItemList'](),Window_Selectable[_0x5dcbc7(0x137)][_0x5dcbc7(0xe5)][_0x5dcbc7(0xe0)](this);},Window_TpModes['prototype'][_0x34ee67(0x1af)]=function(){SoundManager['playEquip']();};