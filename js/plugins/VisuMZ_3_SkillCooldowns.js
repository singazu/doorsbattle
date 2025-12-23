//=============================================================================
// VisuStella MZ - Skill Cooldowns
// VisuMZ_3_SkillCooldowns.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_SkillCooldowns = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillCooldowns = VisuMZ.SkillCooldowns || {};
VisuMZ.SkillCooldowns.version = 1.07;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.07] [SkillCooldowns]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skill_Cooldowns_VisuStella_MZ
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Skill Cooldowns are a mechanic added by the game to prevent repeated skill
 * usage (or as some gamers call it, skill spamming). Upon usage in battle, a
 * skill with a cooldown will become unselectable for a duration of time set by
 * either notetags and/or Plugin Commands. This duration would have to pass in
 * order for the skill to become usable once again.
 *
 * Skill Warmups are another addition by this plugin. Skills with warmups will
 * start the battle unusable until a certain duration has passed. This can help
 * prevent strong skills from being used from the very start of battle.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Add cooldowns and warmups to skills.
 * * Control the way they're displayed in game through the Plugin Parameters.
 * * Create trait object effects that alter the finalized values of cooldowns
 *   and warmups applied to skills.
 * * Create action effects that alter the existing durations of cooldowns and
 *   warmups applied to skills.
 * * Create cooldowns for skills that are linked to other skills, skill types,
 *   and/or affect all skills globally.
 * * Plugin Commands that let you alter cooldowns and warmups as you like.
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
 * New Mechanics: Cooldowns and Warmups
 * ============================================================================
 *
 * This section will explain the key points behind cooldowns and warmups.
 *
 * ---
 *
 * Cooldowns:
 *
 * - At the start and end of battle, any and all cooldowns are cleared.
 * - Cooldowns are applied upon usage only during battle.
 * - Upon usage, skills can affect the cooldowns of an entire skill type or all
 *   of a unit's skills at once.
 *
 * ---
 *
 * Warmups:
 *
 * - Upon the start of battle, Warmups will be applied to affected skills.
 * - Upon the end of battle, any and all warmups are cleared.
 * - If the unit in battle has an advantageous start (ie. preemptive strike),
 *   then the warmup duration can be reduced. This value can be changed in the
 *   plugin parameters.
 *
 * ---
 * 
 * Both Cooldowns and Warmups:
 *
 * - While a skill is on CD/WU, it cannot be used.
 * - CD/WU are updated once per turn for each unit.
 * - CD/WU cannot be applied to Attack and Guard skills.
 * - CD/WU cannot be applied to skills with the <Bypass CD/WU> notetag.
 * - CD/WU can be affected by notetag traits found in various database objects.
 * - CD/WU can be altered by skills and items with notetag effects.
 * - CD/WU have a maximum duration that can be set in the Plugin Parameters.
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
 * === Skill-Only Notetags ===
 *
 * The following notetags are used for skills and are related to setting the
 * primary uses of Cooldowns and Warmups.
 *
 * ---
 *
 * <Bypass Cooldowns>
 * <Bypass Warmups>
 *
 * - Used for: Skill Notetags
 * - Lets the skill bypass cooldowns and/or warmups.
 *
 * ---
 *
 * <Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will gain a cooldown upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 *
 * ---
 *
 * <Skill id Cooldown: x>
 * <Skill name Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will cause listed skills to gain a cooldown upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Stype id Cooldown: x>
 * <Stype name Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will cause all skills with the skill type to gain a cooldown
 *   upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Global Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will cause all skills to gain a cooldown upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 *
 * ---
 *
 * <Warmup: x>
 *
 * - Used for: Skill Notetags
 * - The skill will gain a warmup upon the start of battle.
 * - Replace 'x' with the number of turns to set the warmup to.
 *
 * ---
 * 
 * <Once Per Turn>
 * 
 * - Used for: Skill Notetags
 * - Makes the skill only usable once per turn.
 *   - Cannot be used in TPB, ATB, or CTB.
 *   - Does not apply outside of battle.
 * - The skill cannot be used while the character's turn count is the same
 *   number as the skill's last used turn count.
 * - Best used with actors/enemies that perform multiple actions per turn.
 * 
 * ---
 *
 * === JavaScript Notetags: Skill-Only ===
 *
 * The following are notetags made for users with JavaScript knowledge to give
 * skills dynamic cooldown or warmup durations.
 *
 * ---
 *
 * <JS Cooldown>
 *  code
 *  code
 *  turns = code
 * </JS Cooldown>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code used to determine the base cooldown
 *   for this skill.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized cooldown value.
 *
 * ---
 * 
 * <JS On Cooldown Update>
 *  code
 *  code
 *  code
 * </JS On Cooldown Update>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's cooldown updates.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized cooldown value.
 * 
 * ---
 * 
 * <JS On Cooldown Ready>
 *  code
 *  code
 *  code
 * </JS On Cooldown Ready>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's cooldown hits 0 and becomes ready.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * 
 * ---
 *
 * <JS Warmup>
 *  code
 *  code
 *  turns = code
 * </JS Warmup>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code used to determine the base warmup
 *   for this skill.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized warmup value.
 *
 * ---
 * 
 * <JS On Warmup Update>
 *  code
 *  code
 *  code
 * </JS On Warmup Update>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's warmup updates.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized warmup value.
 * 
 * ---
 * 
 * <JS On Warmup Ready>
 *  code
 *  code
 *  code
 * </JS On Warmup Ready>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's warmup hits 0 and becomes ready.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * 
 * ---
 *
 * === Cooldown/Warmup Notetag Traits ===
 *
 * These Notetag Traits help modify the finalized value of a cooldown/warmup.
 * The final cooldown/warmup duration is calculated by the following formula:
 * 
 * (base + plus) * rate + flat
 *
 * The base value is the amount calculated through the <Cooldown: x> and
 * <Warmup: x> notetags found in the section above.
 *
 * ---
 *
 * <Skill id Cooldown Plus: +x>
 * <Skill id Cooldown Plus: -x>
 *
 * <Skill name Cooldown Plus: +x>
 * <Skill name Cooldown Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Cooldown Rate: x%>
 * <Skill id Cooldown Rate: x.x>
 *
 * <Skill name Cooldown Rate: x%>
 * <Skill name Cooldown Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards this specific skill.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Cooldown Flat: +x>
 * <Skill id Cooldown Flat: -x>
 *
 * <Skill name Cooldown Flat: +x>
 * <Skill name Cooldown Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Stype id Cooldown Plus: +x>
 * <Stype id Cooldown Plus: -x>
 *
 * <Stype name Cooldown Plus: +x>
 * <Stype name Cooldown Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Cooldown Rate: x%>
 * <Stype id Cooldown Rate: x.x>
 *
 * <Stype name Cooldown Rate: x%>
 * <Stype name Cooldown Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards skills with this skill type.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Cooldown Flat: +x>
 * <Stype id Cooldown Flat: -x>
 *
 * <Stype name Cooldown Flat: +x>
 * <Stype name Cooldown Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Global Cooldown Plus: +x>
 * <Global Cooldown Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * <Global Cooldown Rate: x%>
 * <Global Cooldown Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards all skills.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 *
 * ---
 *
 * <Global Cooldown Flat: +x>
 * <Global Cooldown Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * <Skill id Warmup Plus: +x>
 * <Skill id Warmup Plus: -x>
 *
 * <Skill name Warmup Plus: +x>
 * <Skill name Warmup Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Warmup Rate: x%>
 * <Skill id Warmup Rate: x.x>
 *
 * <Skill name Warmup Rate: x%>
 * <Skill name Warmup Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards this specific skill.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Warmup Flat: +x>
 * <Skill id Warmup Flat: -x>
 *
 * <Skill name Warmup Flat: +x>
 * <Skill name Warmup Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Stype id Warmup Plus: +x>
 * <Stype id Warmup Plus: -x>
 *
 * <Stype name Warmup Plus: +x>
 * <Stype name Warmup Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Warmup Rate: x%>
 * <Stype id Warmup Rate: x.x>
 *
 * <Stype name Warmup Rate: x%>
 * <Stype name Warmup Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards skills with this skill type.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Warmup Flat: +x>
 * <Stype id Warmup Flat: -x>
 *
 * <Stype name Warmup Flat: +x>
 * <Stype name Warmup Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Global Warmup Plus: +x>
 * <Global Warmup Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * <Global Warmup Rate: x%>
 * <Global Warmup Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards all skills.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 *
 * ---
 *
 * <Global Warmup Flat: +x>
 * <Global Warmup Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * === Cooldown/Warmup Notetag Actions ===
 *
 * The following notetags are actively altering effects that target cooldowns
 * and/or warmups. Cooldown effects may be applied at any moment through these
 * while warmup effects will only affect skills on warmup currently.
 *
 * ---
 *
 * <Clear User Cooldowns>
 * <Clear Target Cooldowns>
 *
 * - Used for: Skill, Item Notetags
 * - Clears all cooldowns for the user/target.
 *
 * ---
 *
 * <Clear User Warmups>
 * <Clear Target Warmups>
 *
 * - Used for: Skill, Item Notetags
 * - Clears all warmups for the user/target.
 *
 * ---
 *
 * <User Skill id Cooldown: +x>
 * <User Skill id Cooldown: -x>
 *
 * <User Skill name Cooldown: +x>
 * <User Skill name Cooldown: -x>
 *
 * <Target Skill id Cooldown: +x>
 * <Target Skill id Cooldown: -x>
 *
 * <Target Skill name Cooldown: +x>
 * <Target Skill name Cooldown: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's cooldown duration for this specific skill.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <User Stype id Cooldown: +x>
 * <User Stype id Cooldown: -x>
 *
 * <User Stype name Cooldown: +x>
 * <User Stype name Cooldown: -x>
 *
 * <Target Stype id Cooldown: +x>
 * <Target Stype id Cooldown: -x>
 *
 * <Target Stype name Cooldown: +x>
 * <Target Stype name Cooldown: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's cooldown duration for all skills with this type.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <User Global Cooldown: +x>
 * <User Global Cooldown: -x>
 *
 * <Target Global Cooldown: +x>
 * <Target Global Cooldown: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's cooldown duration for all skills.
 * - Replace 'x' with the amount to change the duration by.
 *
 * ---
 *
 * <User Skill id Warmup: +x>
 * <User Skill id Warmup: -x>
 *
 * <User Skill name Warmup: +x>
 * <User Skill name Warmup: -x>
 *
 * <Target Skill id Warmup: +x>
 * <Target Skill id Warmup: -x>
 *
 * <Target Skill name Warmup: +x>
 * <Target Skill name Warmup: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's warmup duration for this specific skill.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 * - NOTE: Warmup changes only apply to skills that are still in warmup.
 *
 * ---
 *
 * <User Stype id Warmup: +x>
 * <User Stype id Warmup: -x>
 *
 * <User Stype name Warmup: +x>
 * <User Stype name Warmup: -x>
 *
 * <Target Stype id Warmup: +x>
 * <Target Stype id Warmup: -x>
 *
 * <Target Stype name Warmup: +x>
 * <Target Stype name Warmup: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's warmup duration for all skills with this type.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 * - NOTE: Warmup changes only apply to skills that are still in warmup.
 *
 * ---
 *
 * <User Global Warmup: +x>
 * <User Global Warmup: -x>
 *
 * <Target Global Warmup: +x>
 * <Target Global Warmup: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's warmup duration for all skills.
 * - Replace 'x' with the amount to change the duration by.
 * - NOTE: Warmup changes only apply to skills that are still in warmup.
 *
 * ---
 *
 * ============================================================================
 * Script Calls
 * ============================================================================
 *
 * The following are Script Calls that can be used with this plugin. These are
 * made for JavaScript proficient users. We are not responsible if you use them
 * incorrectly or for unintended usage.
 *
 * ---
 * 
 * === Actor-Related Script Calls ===
 * 
 * ---
 *
 * $actorGetSkillCooldown(actorID, skillID)
 * 
 * - Gets the target actor's cooldown turns for a specific skill.
 * - Replace 'actorID' with a number representing the ID of the target actor.
 * - Replace 'skillID' with a number representing the ID of the target skill.
 * - This will return a number value.
 * 
 *   Example: 
 * 
 *   $actorGetSkillCooldown(1, 172)
 *   $actorGetSkillCooldown(7, 52)
 *
 * ---
 *
 * $actorSetSkillCooldown(actorID, skillID, turns)
 * 
 * - Sets the target actor's cooldown turns for a specific skill to a value.
 * - Replace 'actorID' with a number representing the ID of the target actor.
 * - Replace 'skillID' with a number representing the ID of the target skill.
 * - Replace 'turns' with a number representing the number of turns to set the
 *   target skill's cooldown to.
 * 
 *   Example:
 * 
 *   $actorSetSkillCooldown(1, 172, 5)
 *   $actorSetSkillCooldown(7, 52, 10)
 *
 * ---
 *
 * $actorGetSkillWarmup(actorID, skillID)
 * 
 * - Gets the target actor's warmup turns for a specific skill.
 * - Replace 'actorID' with a number representing the ID of the target actor.
 * - Replace 'skillID' with a number representing the ID of the target skill.
 * - This will return a number value.
 * 
 *   Example: 
 * 
 *   $actorGetSkillWarmup(1, 172)
 *   $actorGetSkillWarmup(7, 52)
 *
 * ---
 *
 * $actorSetSkillWarmup(actorID, skillID, turns)
 * 
 * - Sets the target actor's warmup turns for a specific skill to a value.
 * - Replace 'actorID' with a number representing the ID of the target actor.
 * - Replace 'skillID' with a number representing the ID of the target skill.
 * - Replace 'turns' warmup a number representing the number of turns to set
 *   the target skill's warmup to.
 * 
 *   Example:
 * 
 *   $actorSetSkillWarmup(1, 172, 5)
 *   $actorSetSkillWarmup(7, 52, 10)
 *
 * ---
 * 
 * === Enemy-Related Script Calls ===
 * 
 * ---
 *
 * $enemyGetSkillCooldown(enemyIndex, skillID)
 * 
 * - Gets the target enemy's cooldown turns for a specific skill.
 * - Replace 'enemyIndex' with a number representing the index position of the
 *   target enemy within its troop. Index values start at 0 and go up to 7.
 * - Replace 'skillID' with a number representing the ID of the target skill.
 * - This will return a number value.
 * 
 *   Example: 
 * 
 *   $enemyGetSkillCooldown(0, 172)
 *   $enemyGetSkillCooldown(7, 52)
 *
 * ---
 *
 * $enemySetSkillCooldown(enemyIndex, skillID, turns)
 * 
 * - Sets the target enemy's cooldown turns for a specific skill to a value.
 * - Replace 'enemyIndex' with a number representing the index position of the
 *   target enemy within its troop. Index values start at 0 and go up to 7.
 * - Replace 'skillID' with a number representing the ID of the target skill.
 * - Replace 'turns' with a number representing the number of turns to set the
 *   target skill's cooldown to.
 * 
 *   Example:
 * 
 *   $enemySetSkillCooldown(0, 172, 5)
 *   $enemySetSkillCooldown(7, 52, 10)
 *
 * ---
 *
 * $enemyGetSkillWarmup(enemyIndex, skillID)
 * 
 * - Gets the target enemy's warmup turns for a specific skill.
 * - Replace 'enemyIndex' with a number representing the index position of the
 *   target enemy within its troop. Index values start at 0 and go up to 7.
 * - Replace 'skillID' with a number representing the ID of the target skill.
 * - This will return a number value.
 * 
 *   Example: 
 * 
 *   $enemyGetSkillWarmup(0, 172)
 *   $enemyGetSkillWarmup(7, 52)
 *
 * ---
 *
 * $enemySetSkillWarmup(enemyIndex, skillID, turns)
 * 
 * - Sets the target enemy's warmup turns for a specific skill to a value.
 * - Replace 'enemyIndex' with a number representing the index position of the
 *   target enemy within its troop. Index values start at 0 and go up to 7.
 * - Replace 'skillID' with a number representing the ID of the target skill.
 * - Replace 'turns' warmup a number representing the number of turns to set
 *   the target skill's warmup to.
 * 
 *   Example:
 * 
 *   $enemySetSkillWarmup(0, 172, 5)
 *   $enemySetSkillWarmup(7, 52, 10)
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
 * Actor: Skill Cooldown
 * - Change cooldowns for a specific skill(s).
 *
 *   Step 1: Actor ID(s):
 *   - Select which Actor Target ID(s) to affect.
 *
 *   Step 2: Skill ID(s):
 *   - Select which Skill ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Actor: SType Cooldown
 * - Change cooldowns for all skills of a skill type(s).
 *
 *   Step 1: Actor ID(s):
 *   - Select which Actor Target ID(s) to affect.
 *
 *   Step 2: Skill Type ID(s):
 *   - Select which Skill Type ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Actor: Global Cooldown
 * - Change cooldowns for all skills for target(s).
 *
 *   Step 1: Actor ID(s):
 *   - Select which Actor Target ID(s) to affect.
 *
 *   Step 2: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 3: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Skill Cooldown
 * - Change cooldowns for a specific skill(s).
 *
 *   Step 1: Enemy Index(es):
 *   - Select which Enemy Index(es) to affect.
 *
 *   Step 2: Skill ID(s):
 *   - Select which Skill ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Enemy: SType Cooldown
 * - Change cooldowns for all skills of a skill type(s).
 *
 *   Step 1: Enemy Index(es):
 *   - Select which Enemy Index(es) to affect.
 *
 *   Step 2: Skill Type ID(s):
 *   - Select which Skill Type ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Enemy: Global Cooldown
 * - Change cooldowns for all skills for target(s).
 *
 *   Step 1: Enemy Index(es):
 *   - Select which Enemy Index(es) to affect.
 *
 *   Step 2: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 3: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Cooldown Settings
 * ============================================================================
 *
 * These are the general settings pertaining to cooldowns in-game.
 *
 * ---
 *
 * Settings
 * 
 *   Icon:
 *   - Icon used for Skill Cooldowns.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display Skill Cooldowns.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display Skill Cooldowns.
 *
 * ---
 *
 * Window Display
 * 
 *   Show Cooldowns?:
 *   - Display Skill Cooldowns?
 * 
 *   Text Format:
 *   - Text format for displaying Skill Cooldowns.
 *   - %1 - Turns, %2 - Icon
 *
 * ---
 *
 * Mechanics
 * 
 *   Max Cooldown:
 *   - Maximum turns that cooldowns can be.
 * 
 *   JS: On Cooldown Update:
 *   - Code ran when a skill's cooldown updates.
 * 
 *   JS: On Cooldown Ready:
 *   - Code ran when a skill's cooldown reaches 0.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Warmup Settings
 * ============================================================================
 *
 * These are the general settings pertaining to warmups in-game.
 *
 * ---
 *
 * Settings
 * 
 *   Icon:
 *   - Icon used for Skill Warmups.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display Skill Warmups.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display Skill Warmups.
 *
 * ---
 *
 * Window Display
 * 
 *   Show Warmups?:
 *   - Display Skill Warmups?
 * 
 *   Text Format:
 *   - Text format for displaying Skill Warmups.
 *   - %1 - Turns, %2 - Icon
 *
 * ---
 *
 * Mechanics
 * 
 *   Preemptive Bonus:
 *   - How many turns should be dropped off Warmups on a Preemptive attack?
 * 
 *   Max Warmup:
 *   - Maximum turns that warmups can be.
 * 
 *   JS: On Warmup Update:
 *   - Code ran when a skill's warmup updates.
 * 
 *   JS: On Warmup Ready:
 *   - Code ran when a skill's warmup reaches 0.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.07: November 14, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Irina:
 * *** <Once Per Turn>
 * **** Makes the skill only usable once per turn. Cannot be used in TPB, ATB,
 *      or CTB. Does not apply outside of battle.
 * **** Best used with actors/enemies that perform multiple actions per turn.
 * 
 * Version 1.06: February 15, 2024
 * * Bug Fixes!
 * ** Fixed a bug where Battle System - OTB causes consistency issues with
 *    warmup turns. Fixed by Olivia.
 * 
 * Version 1.05: December 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug where the warmup turns do not properly reflect for certain
 *    types of battle systems. Fixed by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New script calls added by Arisu:
 * *** $actorGetSkillCooldown
 * *** $actorSetSkillCooldown
 * *** $actorGetSkillWarmup
 * *** $actorSetSkillWarmup
 * *** $enemyGetSkillCooldown
 * *** $enemySetSkillCooldown
 * *** $enemyGetSkillWarmup
 * *** $enemySetSkillWarmup
 * **** Please refer to the help file on how to use these script calls.
 * 
 * Version 1.04: February 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * ** Added compatibility for Chain Battles. Cooldowns will be carried across
 *    chained battles.
 * 
 * Version 1.03: June 4, 2021
 * * Bug Fixes!
 * ** <JS Cooldowns> should now be working properly.
 * 
 * Version 1.02: November 8, 2020
 * * Feature Update!
 * ** Cooldown updating has been changed from the start of an action to the
 *    start of a new turn processing for battlers to ensure accuracy.
 *    Update by Arisu.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Global and SType Cooldown modifiers should not cause crashes with
 *    specific numbers. Fix made by Yanfly.
 *
 * Version 1.00: September 9, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorSkillCooldown
 * @text Actor: Skill Cooldown
 * @desc Change cooldowns for a specific skill(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill ID(s)
 * @type skill[]
 * @desc Select which Skill ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorStypeCooldown
 * @text Actor: SType Cooldown
 * @desc Change cooldowns for all skills of a skill type(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill Type ID(s)
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which Skill Type ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorGlobalCooldown
 * @text Actor: Global Cooldown
 * @desc Change cooldowns for all skills for target(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Step 2: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step3:eval
 * @text Step 3: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemySkillCooldown
 * @text Enemy: Skill Cooldown
 * @desc Change cooldowns for a specific skill(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Enemy Index(es)
 * @type actor[]
 * @desc Select which Enemy Index(es) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill ID(s)
 * @type skill[]
 * @desc Select which Skill ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyStypeCooldown
 * @text Enemy: SType Cooldown
 * @desc Change cooldowns for all skills of a skill type(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Enemy Index(es)
 * @type actor[]
 * @desc Select which Enemy Index(es) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill Type ID(s)
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which Skill Type ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyGlobalCooldown
 * @text Enemy: Global Cooldown
 * @desc Change cooldowns for all skills for target(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Enemy Index(es)
 * @type actor[]
 * @desc Select which Enemy Index(es) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Step 2: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step3:eval
 * @text Step 3: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
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
 * @param SkillCooldowns
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Cooldown:struct
 * @text Skill Cooldowns
 * @type struct<Cooldown>
 * @desc Adjust cooldown settings here.
 * @default {"Settings":"","Icon:num":"0","FontColor:str":"5","FontSize:num":"22","Windows":"","Show:eval":"true","TextFmt:str":"Ready in %1T%2","Mechanics":"","MaxTurns:num":"50","OnUpdateJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\"","OnReadyJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Warmup:struct
 * @text Skill Warmups
 * @type struct<Warmup>
 * @desc Adjust warmup settings here.
 * @default {"Settings":"","Icon:num":"0","FontColor:str":"5","FontSize:num":"22","Windows":"","Show:eval":"true","TextFmt:str":"Prepared in %1T%2","Mechanics":"","Preemptive:num":"10","MaxTurns:num":"50","OnUpdateJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\"","OnReadyJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\""}
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
 * Cooldown Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cooldown:
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for Skill Cooldowns.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display Skill Cooldowns.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 5
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display Skill Cooldowns.
 * @default 22
 *
 * @param Windows
 * @text Window Display
 *
 * @param Show:eval
 * @text Show Cooldowns?
 * @parent Windows
 * @type boolean
 * @on YES
 * @off NO
 * @desc Display Skill Cooldowns?
 * @default true
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent  Windows
 * @desc Text format for displaying Skill Cooldowns.
 * %1 - Turns, %2 - Icon
 * @default Ready in %1T%2
 *
 * @param Mechanics
 *
 * @param MaxTurns:num
 * @text Max Cooldown
 * @parent Mechanics
 * @type number
 * @min 1
 * @desc Maximum turns that cooldowns can be.
 * @default 50
 *
 * @param OnUpdateJS:func
 * @text JS: On Cooldown Update
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's cooldown updates.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 * @param OnReadyJS:func
 * @text JS: On Cooldown Ready
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's cooldown reaches 0.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Warmup Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Warmup:
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for Skill Warmups.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display Skill Warmups.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 5
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display Skill Warmups.
 * @default 22
 *
 * @param Windows
 * @text Window Display
 *
 * @param Show:eval
 * @text Show Warmups?
 * @parent Windows
 * @type boolean
 * @on YES
 * @off NO
 * @desc Display Skill Warmups?
 * @default true
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent  Windows
 * @desc Text format for displaying Skill Warmups.
 * %1 - Turns, %2 - Icon
 * @default Prepared in %1T%2
 *
 * @param Mechanics
 *
 * @param Preemptive:num
 * @text Preemptive Bonus
 * @parent Mechanics
 * @type number
 * @min 0
 * @desc How many turns should be dropped off Warmups on a Preemptive attack?
 * @default 10
 *
 * @param MaxTurns:num
 * @text Max Warmup
 * @parent Mechanics
 * @type number
 * @min 1
 * @desc Maximum turns that warmups can be.
 * @default 50
 *
 * @param OnUpdateJS:func
 * @text JS: On Warmup Update
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's warmup updates.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 * @param OnReadyJS:func
 * @text JS: On Warmup Ready
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's warmup reaches 0.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 */
//=============================================================================

const _0x35bc63=_0x544a;function _0x4846(){const _0x37e31b=['skillTypes','EnemySkillCooldown','ARRAYNUM','getChainBattleSettings','notetag2','isBypassCooldowns','traitObjects','note','_skillOncePerTurns','WAIT','VisuMZ_3_ChainBattles','applyItemUserEffect','remove','Game_Battler_onBattleStart','initSkillCooldowns','description','isOTB','name','version','ARRAYSTRUCT','notetag3','return\x200','exit','alterPaySkillCooldownModifier','isBypassWarmups','ActorStypeCooldown','8735dYMtEq','prototype','EnemyGlobalCooldown','width','prepareSkillWarmups','_skillCooldowns','TextFmt','filter','onCooldownReady','drawSkillCooldown','Window_Base_drawSkillCost','Game_Battler_onTurnEnd','isTpb','COOLDOWN','3182694iqqIQv','<STYPE\x20%1\x20%2\x20%3:[\x20]([\x5c+\x5c-]\x5cd+)>','\x5cC[%1]','ActorGlobalCooldown','onCooldownUpdateJS','FontSize','<GLOBAL\x20%1\x20%2:[\x20]([\x5c+\x5c-]\x5cd+)>','onCooldownUpdate','includes','Step1','Warmup','applyChangeStypeWarmupEffects','JSON','NUM','addWarmup','VisuMZ_2_BattleSystemOTB','13748544hnuGfo','Icon','applyCooldown','4BGTBlU','cooldown','removeOncePerTurnAction','Game_Battler_onBattleEnd','meetsSkillConditions','FontColor','skillId','Skill_%1_%2_%3','applyChangeCooldownEffects','cooldownJS','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.rawWarmup(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20this.applyWarmup(skill.id,\x20turns);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','ARRAYEVAL','parameters','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.cooldown(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20this.applyCooldown(skill.id,\x20turns);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','Step4','onWarmupUpdate','members','drawSkillWarmup','VisuMZ_1_MessageCore','format','_subject','applyCDWUmodifiers','isOncePerTurnSkill','ARRAYJSON','Cooldown','RegExp','ActorSkillCooldown','actor','status','_updatedSkillCooldowns','reduce','areSkillCooldownsReady','<SKILL\x20%1\x20%2\x20%3:[\x20]([\x5c+\x5c-]\x5cd+)>','ceil','BattleManager_processTurn','Step2','Stype_%1_%2_%3','Game_Action_applyItemUserEffect','8UxsGbc','_previousBattleChain','onBattleEnd','Game_BattlerBase_paySkillCost','FLAT','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','prepareUpdateSkillCooldowns','isOncePerTurnRestricted','Settings','warmupJS','OperateValues','trim','MaxTurns','13oUEbAs','parse','Game_BattlerBase_meetsSkillConditions','skills','10669806yYufUw','onWarmupReadyJS','applyChangeWarmupEffects','\x5cHexColor<%1>','applyChangeStypeCooldownEffects','rawWarmup','updateCooldowns','STRUCT','OnUpdateJS','SkillsStatesCore','applyMasteryEffectCooldownTurns','paySkillCost','match','applySkillCooldownEffects','_skillWarmups','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20id\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20$dataSkills[id];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.rawWarmup(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','updateWarmups','1758ZYDbAa','Step3','682960AvfZEb','processTurn','onBattleStart','replace','areSkillWarmupsReady','onWarmupUpdateJS','applyGlobalCooldowns','notetag1','applyWarmup','initMembers','ARRAYSTR','applyChangeGlobalCooldownEffects','turnCount','<SKILL\x20%1\x20%2\x20%3:[\x20]%4>','attackSkillId','onCooldownReadyJS','getSkillIdWithName','map','OnReadyJS','33LxwiIm','selectAction','getSkillTypes','guardSkillId','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','(\x5cd+)([%％])','resetFontSettings','drawSkillCost','451521kjKjdB','subject','clamp','<STYPE\x20%1\x20%2\x20%3:[\x20]%4>','RATE','onTurnEnd','applyStypeCooldowns','1GFJsOY','EnemyStypeCooldown','Global_%1_%2','setWarmup','\x5cI[%1]','registerCommand','addCooldown','ARRAYFUNC','VisuMZ_SkillsStatesCore_Parse_Notetags_Skill_JS','applyChangeGlobalWarmupEffects','registerOncePerTurn','clearCooldowns','Game_BattlerBase_initMembers','inBattle','_cache_isOncePerTurnSkill','applyCDWUnotetagsFlat','setCooldown','ConvertParams','applyCDWUnotetagsRate','warmup','textSizeEx','toUpperCase','clearWarmups','notetag4','item','SkillCooldowns','max','Show','Game_Enemy_selectAction','drawTextEx','228902BrdjHp','clearOncePerTurns','applyClearCooldownEffects','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20id\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20$dataSkills[id];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.cooldown(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','Parse_Notetags_Skill_JS','call','onWarmupReady'];_0x4846=function(){return _0x37e31b;};return _0x4846();}(function(_0x69e7,_0x1ceab3){const _0x15eb4d=_0x544a,_0x1133d7=_0x69e7();while(!![]){try{const _0x3648ed=parseInt(_0x15eb4d(0x150))/0x1*(parseInt(_0x15eb4d(0xa2))/0x2)+parseInt(_0x15eb4d(0xd1))/0x3*(-parseInt(_0x15eb4d(0xe4))/0x4)+parseInt(_0x15eb4d(0xc3))/0x5*(-parseInt(_0x15eb4d(0x12c))/0x6)+-parseInt(_0x15eb4d(0x149))/0x7*(parseInt(_0x15eb4d(0x10a))/0x8)+parseInt(_0x15eb4d(0x11b))/0x9+parseInt(_0x15eb4d(0x12e))/0xa*(-parseInt(_0x15eb4d(0x141))/0xb)+parseInt(_0x15eb4d(0xe1))/0xc*(parseInt(_0x15eb4d(0x117))/0xd);if(_0x3648ed===_0x1ceab3)break;else _0x1133d7['push'](_0x1133d7['shift']());}catch(_0x3197ab){_0x1133d7['push'](_0x1133d7['shift']());}}}(_0x4846,0x93591));var label='SkillCooldowns',tier=tier||0x0,dependencies=['VisuMZ_1_SkillsStatesCore'],pluginData=$plugins['filter'](function(_0xb036a7){const _0x2c625f=_0x544a;return _0xb036a7[_0x2c625f(0x100)]&&_0xb036a7[_0x2c625f(0xb8)][_0x2c625f(0xd9)]('['+label+']');})[0x0];function _0x544a(_0x1c9602,_0x420860){const _0x484601=_0x4846();return _0x544a=function(_0x544a80,_0x556d13){_0x544a80=_0x544a80-0x8c;let _0x530d59=_0x484601[_0x544a80];return _0x530d59;},_0x544a(_0x1c9602,_0x420860);}VisuMZ[label]['Settings']=VisuMZ[label][_0x35bc63(0x112)]||{},VisuMZ[_0x35bc63(0x95)]=function(_0x54efcd,_0x545a24){const _0x15c12b=_0x35bc63;for(const _0x3894b8 in _0x545a24){if(_0x3894b8[_0x15c12b(0x127)](/(.*):(.*)/i)){const _0x13374f=String(RegExp['$1']),_0x276f7d=String(RegExp['$2'])['toUpperCase']()[_0x15c12b(0x115)]();let _0x3ad33e,_0x49a951,_0x534246;switch(_0x276f7d){case _0x15c12b(0xde):_0x3ad33e=_0x545a24[_0x3894b8]!==''?Number(_0x545a24[_0x3894b8]):0x0;break;case _0x15c12b(0xab):_0x49a951=_0x545a24[_0x3894b8]!==''?JSON[_0x15c12b(0x118)](_0x545a24[_0x3894b8]):[],_0x3ad33e=_0x49a951[_0x15c12b(0x13f)](_0x282db2=>Number(_0x282db2));break;case'EVAL':_0x3ad33e=_0x545a24[_0x3894b8]!==''?eval(_0x545a24[_0x3894b8]):null;break;case _0x15c12b(0xef):_0x49a951=_0x545a24[_0x3894b8]!==''?JSON[_0x15c12b(0x118)](_0x545a24[_0x3894b8]):[],_0x3ad33e=_0x49a951[_0x15c12b(0x13f)](_0x34b751=>eval(_0x34b751));break;case _0x15c12b(0xdd):_0x3ad33e=_0x545a24[_0x3894b8]!==''?JSON[_0x15c12b(0x118)](_0x545a24[_0x3894b8]):'';break;case _0x15c12b(0xfb):_0x49a951=_0x545a24[_0x3894b8]!==''?JSON[_0x15c12b(0x118)](_0x545a24[_0x3894b8]):[],_0x3ad33e=_0x49a951['map'](_0x37248a=>JSON['parse'](_0x37248a));break;case'FUNC':_0x3ad33e=_0x545a24[_0x3894b8]!==''?new Function(JSON['parse'](_0x545a24[_0x3894b8])):new Function(_0x15c12b(0xbe));break;case _0x15c12b(0x157):_0x49a951=_0x545a24[_0x3894b8]!==''?JSON[_0x15c12b(0x118)](_0x545a24[_0x3894b8]):[],_0x3ad33e=_0x49a951[_0x15c12b(0x13f)](_0xcbccbb=>new Function(JSON[_0x15c12b(0x118)](_0xcbccbb)));break;case'STR':_0x3ad33e=_0x545a24[_0x3894b8]!==''?String(_0x545a24[_0x3894b8]):'';break;case _0x15c12b(0x138):_0x49a951=_0x545a24[_0x3894b8]!==''?JSON[_0x15c12b(0x118)](_0x545a24[_0x3894b8]):[],_0x3ad33e=_0x49a951[_0x15c12b(0x13f)](_0x14906b=>String(_0x14906b));break;case _0x15c12b(0x122):_0x534246=_0x545a24[_0x3894b8]!==''?JSON[_0x15c12b(0x118)](_0x545a24[_0x3894b8]):{},_0x3ad33e=VisuMZ[_0x15c12b(0x95)]({},_0x534246);break;case _0x15c12b(0xbc):_0x49a951=_0x545a24[_0x3894b8]!==''?JSON[_0x15c12b(0x118)](_0x545a24[_0x3894b8]):[],_0x3ad33e=_0x49a951[_0x15c12b(0x13f)](_0x16f026=>VisuMZ[_0x15c12b(0x95)]({},JSON[_0x15c12b(0x118)](_0x16f026)));break;default:continue;}_0x54efcd[_0x13374f]=_0x3ad33e;}}return _0x54efcd;},(_0xfe4a08=>{const _0x148c4=_0x35bc63,_0x530d6c=_0xfe4a08[_0x148c4(0xba)];for(const _0x3d481e of dependencies){if(!Imported[_0x3d481e]){alert(_0x148c4(0x145)[_0x148c4(0xf7)](_0x530d6c,_0x3d481e)),SceneManager[_0x148c4(0xbf)]();break;}}const _0x3cd071=_0xfe4a08['description'];if(_0x3cd071[_0x148c4(0x127)](/\[Version[ ](.*?)\]/i)){const _0xe583c0=Number(RegExp['$1']);_0xe583c0!==VisuMZ[label][_0x148c4(0xbb)]&&(alert(_0x148c4(0x10f)[_0x148c4(0xf7)](_0x530d6c,_0xe583c0)),SceneManager[_0x148c4(0xbf)]());}if(_0x3cd071[_0x148c4(0x127)](/\[Tier[ ](\d+)\]/i)){const _0x243e34=Number(RegExp['$1']);_0x243e34<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x148c4(0xf7)](_0x530d6c,_0x243e34,tier)),SceneManager[_0x148c4(0xbf)]()):tier=Math['max'](_0x243e34,tier);}VisuMZ[_0x148c4(0x95)](VisuMZ[label]['Settings'],_0xfe4a08[_0x148c4(0xf0)]);})(pluginData),VisuMZ[_0x35bc63(0x114)]=function(_0x1e7a72,_0x341b36,_0x5b0290){switch(_0x5b0290){case'=':return _0x341b36;break;case'+':return _0x1e7a72+_0x341b36;break;case'-':return _0x1e7a72-_0x341b36;break;case'*':return _0x1e7a72*_0x341b36;break;case'/':return _0x1e7a72/_0x341b36;break;case'%':return _0x1e7a72%_0x341b36;break;}return _0x1e7a72;},PluginManager[_0x35bc63(0x155)](pluginData['name'],_0x35bc63(0xfe),_0x5be552=>{const _0x53f579=_0x35bc63;if(!$gameParty[_0x53f579(0x91)]())return;VisuMZ[_0x53f579(0x95)](_0x5be552,_0x5be552);const _0x2edb23=_0x5be552[_0x53f579(0xda)],_0x4d4277=_0x5be552[_0x53f579(0x107)],_0x153084=_0x5be552[_0x53f579(0x12d)],_0x220b9f=_0x5be552['Step4'];for(const _0x150fd3 of _0x2edb23){const _0x155eef=$gameActors[_0x53f579(0xff)](_0x150fd3);if(!_0x155eef)continue;for(const _0x3c3fd1 of _0x4d4277){let _0x3d321c=_0x155eef[_0x53f579(0xe5)](_0x3c3fd1);_0x3d321c=VisuMZ['OperateValues'](_0x3d321c,_0x220b9f,_0x153084),_0x155eef[_0x53f579(0x94)](_0x3c3fd1,_0x3d321c);}}}),PluginManager[_0x35bc63(0x155)](pluginData[_0x35bc63(0xba)],_0x35bc63(0xc2),_0x55f396=>{const _0x86798f=_0x35bc63;if(!$gameParty[_0x86798f(0x91)]())return;VisuMZ[_0x86798f(0x95)](_0x55f396,_0x55f396);const _0x28918d=_0x55f396[_0x86798f(0xda)],_0x3b4724=_0x55f396[_0x86798f(0x107)],_0xbfd450=_0x55f396['Step3'],_0x3c7653=_0x55f396[_0x86798f(0xf2)];for(const _0x19a835 of _0x28918d){const _0x305bf8=$gameActors[_0x86798f(0xff)](_0x19a835);if(!_0x305bf8)continue;for(const _0x59c27e of _0x3b4724){for(const _0xe15bf2 of _0x305bf8[_0x86798f(0x11a)]()){if(!_0xe15bf2)continue;if(!DataManager[_0x86798f(0x143)](_0xe15bf2)['includes'](_0x59c27e))continue;const _0x171ed5=_0xe15bf2['id'];let _0x277cf2=_0x305bf8[_0x86798f(0xe5)](_0x171ed5);_0x277cf2=VisuMZ['OperateValues'](_0x277cf2,_0x3c7653,_0xbfd450),_0x305bf8[_0x86798f(0x94)](_0x171ed5,_0x277cf2);}}}}),PluginManager[_0x35bc63(0x155)](pluginData[_0x35bc63(0xba)],_0x35bc63(0xd4),_0x7fb790=>{const _0x430adf=_0x35bc63;if(!$gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x7fb790,_0x7fb790);const _0x216905=_0x7fb790['Step1'],_0x5b83a4=_0x7fb790['Step2'],_0x259581=_0x7fb790[_0x430adf(0x12d)];for(const _0x2ec5e5 of _0x216905){const _0xeb1df7=$gameActors['actor'](_0x2ec5e5);if(!_0xeb1df7)continue;for(const _0x3f63ac of _0xeb1df7[_0x430adf(0x11a)]()){if(!_0x3f63ac)continue;const _0x17db30=_0x3f63ac['id'];let _0x182c1e=_0xeb1df7['cooldown'](_0x17db30);_0x182c1e=VisuMZ[_0x430adf(0x114)](_0x182c1e,_0x259581,_0x5b83a4),_0xeb1df7[_0x430adf(0x94)](_0x17db30,_0x182c1e);}}}),PluginManager[_0x35bc63(0x155)](pluginData[_0x35bc63(0xba)],_0x35bc63(0xaa),_0x191307=>{const _0x342689=_0x35bc63;if(!$gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x191307,_0x191307);const _0x204c15=_0x191307[_0x342689(0xda)],_0x2aa032=_0x191307[_0x342689(0x107)],_0x19bb65=_0x191307[_0x342689(0x12d)],_0x4afb5a=_0x191307[_0x342689(0xf2)];for(const _0x100aef of _0x204c15){const _0x277012=$gameTroop[_0x342689(0xf4)]()[_0x100aef];if(!_0x277012)continue;for(const _0x2aa166 of _0x2aa032){let _0x2503b7=_0x277012['cooldown'](_0x2aa166);_0x2503b7=VisuMZ[_0x342689(0x114)](_0x2503b7,_0x4afb5a,_0x19bb65),_0x277012[_0x342689(0x94)](_0x2aa166,_0x2503b7);}}}),PluginManager[_0x35bc63(0x155)](pluginData[_0x35bc63(0xba)],_0x35bc63(0x151),_0x21a397=>{const _0xe6f362=_0x35bc63;if(!$gameParty[_0xe6f362(0x91)]())return;VisuMZ[_0xe6f362(0x95)](_0x21a397,_0x21a397);const _0x3298bb=_0x21a397[_0xe6f362(0xda)],_0x5b09dc=_0x21a397[_0xe6f362(0x107)],_0x44d538=_0x21a397['Step3'],_0x577164=_0x21a397[_0xe6f362(0xf2)];for(const _0x18a4af of _0x3298bb){const _0x4539b8=$gameTroop['members']()[_0x18a4af];if(!_0x4539b8)continue;for(const _0x4ed42b of _0x5b09dc){for(const _0x332bb9 of _0x4539b8['skills']()){if(!_0x332bb9)continue;if(!DataManager[_0xe6f362(0x143)](_0x332bb9)[_0xe6f362(0xd9)](_0x4ed42b))continue;const _0x529f2f=_0x332bb9['id'];let _0x4adb68=_0x4539b8[_0xe6f362(0xe5)](_0x529f2f);_0x4adb68=VisuMZ['OperateValues'](_0x4adb68,_0x577164,_0x44d538),_0x4539b8[_0xe6f362(0x94)](_0x529f2f,_0x4adb68);}}}}),PluginManager[_0x35bc63(0x155)](pluginData[_0x35bc63(0xba)],_0x35bc63(0xc5),_0xd81fc=>{const _0x3aa907=_0x35bc63;if(!$gameParty[_0x3aa907(0x91)]())return;VisuMZ[_0x3aa907(0x95)](_0xd81fc,_0xd81fc);const _0x92d209=_0xd81fc[_0x3aa907(0xda)],_0xc705d4=_0xd81fc['Step2'],_0x5ef5b4=_0xd81fc['Step3'];for(const _0x42e0a2 of _0x92d209){const _0x44bae8=$gameTroop[_0x3aa907(0xf4)]()[_0x42e0a2];if(!_0x44bae8)continue;for(const _0x497327 of _0x44bae8[_0x3aa907(0x11a)]()){if(!_0x497327)continue;const _0x49e56f=_0x497327['id'];let _0x2ba28c=_0x44bae8[_0x3aa907(0xe5)](_0x49e56f);_0x2ba28c=VisuMZ[_0x3aa907(0x114)](_0x2ba28c,_0x5ef5b4,_0xc705d4),_0x44bae8['setCooldown'](_0x49e56f,_0x2ba28c);}}}),VisuMZ[_0x35bc63(0x9d)][_0x35bc63(0xed)]={},VisuMZ['SkillCooldowns'][_0x35bc63(0x113)]={},VisuMZ[_0x35bc63(0x9d)][_0x35bc63(0xd5)]={},VisuMZ[_0x35bc63(0x9d)]['onWarmupUpdateJS']={},VisuMZ[_0x35bc63(0x9d)]['onCooldownReadyJS']={},VisuMZ[_0x35bc63(0x9d)][_0x35bc63(0x11c)]={},VisuMZ[_0x35bc63(0x9d)][_0x35bc63(0x8c)]=VisuMZ['SkillsStatesCore'][_0x35bc63(0xa6)],VisuMZ[_0x35bc63(0x124)][_0x35bc63(0xa6)]=function(_0x2e73ea){const _0x8dfe0c=_0x35bc63;VisuMZ[_0x8dfe0c(0x9d)][_0x8dfe0c(0x8c)]['call'](this,_0x2e73ea);const _0x26a701=_0x2e73ea[_0x8dfe0c(0xb0)],_0x2790c1=_0x8dfe0c(0xa5),_0x534aea=_0x8dfe0c(0x12a);if(_0x26a701['match'](/<JS (?:COOLDOWN|COOLDOWNS)>\s*([\s\S]*)\s*<\/JS (?:COOLDOWN|COOLDOWNS)>/i)){const _0x23b0f1=String(RegExp['$1']),_0x4d2edd=_0x8dfe0c(0xf1)[_0x8dfe0c(0xf7)](_0x23b0f1);VisuMZ['SkillCooldowns']['cooldownJS'][_0x2e73ea['id']]=new Function(_0x4d2edd);}if(_0x26a701[_0x8dfe0c(0x127)](/<JS (?:WARMUP|WARMUPS)>\s*([\s\S]*)\s*<\/JS (?:WARMUP|WARMUPS)>/i)){const _0x147a3b=String(RegExp['$1']),_0x122176=_0x8dfe0c(0xee)['format'](_0x147a3b);VisuMZ[_0x8dfe0c(0x9d)]['warmupJS'][_0x2e73ea['id']]=new Function(_0x122176);}if(_0x26a701[_0x8dfe0c(0x127)](/<JS ON COOLDOWN UPDATE>\s*([\s\S]*)\s*<\/JS ON COOLDOWN UPDATE>/i)){const _0x1bf803=String(RegExp['$1']),_0x1356a3=_0x2790c1['format'](_0x1bf803);VisuMZ[_0x8dfe0c(0x9d)][_0x8dfe0c(0xd5)][_0x2e73ea['id']]=new Function(_0x1356a3);}if(_0x26a701[_0x8dfe0c(0x127)](/<JS ON WARMUP UPDATE>\s*([\s\S]*)\s*<\/JS ON WARMUP UPDATE>/i)){const _0x316d50=String(RegExp['$1']),_0x2c6916=_0x534aea['format'](_0x316d50);VisuMZ[_0x8dfe0c(0x9d)]['onWarmupUpdateJS'][_0x2e73ea['id']]=new Function(_0x2c6916);}if(_0x26a701['match'](/<JS ON COOLDOWN READY>\s*([\s\S]*)\s*<\/JS ON COOLDOWN READY>/i)){const _0x2d6bee=String(RegExp['$1']),_0x4e1e91=_0x2790c1[_0x8dfe0c(0xf7)](_0x2d6bee);VisuMZ[_0x8dfe0c(0x9d)][_0x8dfe0c(0x13d)][_0x2e73ea['id']]=new Function(_0x4e1e91);}if(_0x26a701[_0x8dfe0c(0x127)](/<JS ON WARMUP READY>\s*([\s\S]*)\s*<\/JS ON WARMUP READY>/i)){const _0x43d44a=String(RegExp['$1']),_0x5eb458=_0x534aea[_0x8dfe0c(0xf7)](_0x43d44a);VisuMZ['SkillCooldowns']['onWarmupReadyJS'][_0x2e73ea['id']]=new Function(_0x5eb458);}},VisuMZ['SkillCooldowns'][_0x35bc63(0x106)]=BattleManager[_0x35bc63(0x12f)],BattleManager[_0x35bc63(0x12f)]=function(){const _0x251161=_0x35bc63;if(this[_0x251161(0xf8)])this[_0x251161(0xf8)][_0x251161(0x110)]();VisuMZ[_0x251161(0x9d)][_0x251161(0x106)][_0x251161(0xa7)](this);},VisuMZ[_0x35bc63(0x9d)]['Game_Action_applyItemUserEffect']=Game_Action['prototype']['applyItemUserEffect'],Game_Action[_0x35bc63(0xc4)][_0x35bc63(0xb4)]=function(_0x2c149a){const _0x39df93=_0x35bc63;VisuMZ['SkillCooldowns'][_0x39df93(0x109)][_0x39df93(0xa7)](this,_0x2c149a),this[_0x39df93(0x128)](_0x2c149a);},Game_Action[_0x35bc63(0xc4)][_0x35bc63(0x128)]=function(_0x595839){const _0x87a4c2=_0x35bc63;this[_0x87a4c2(0xa4)](_0x595839),this['applyChangeCooldownEffects'](_0x595839),this[_0x87a4c2(0x11f)](_0x595839),this[_0x87a4c2(0x139)](_0x595839),this[_0x87a4c2(0x11d)](_0x595839),this[_0x87a4c2(0xdc)](_0x595839),this[_0x87a4c2(0x8d)](_0x595839);},Game_Action[_0x35bc63(0xc4)][_0x35bc63(0xa4)]=function(_0x1b3507){const _0x1dfd7a=_0x35bc63,_0x4f67b9=this[_0x1dfd7a(0x9c)]()[_0x1dfd7a(0xb0)];_0x4f67b9[_0x1dfd7a(0x127)](/<CLEAR USER COOLDOWNS>/i)&&this[_0x1dfd7a(0x14a)]()[_0x1dfd7a(0x8f)](),_0x4f67b9[_0x1dfd7a(0x127)](/<CLEAR TARGET COOLDOWNS>/i)&&_0x1b3507['clearCooldowns'](),_0x4f67b9[_0x1dfd7a(0x127)](/<CLEAR USER WARMUPS>/i)&&this[_0x1dfd7a(0x14a)]()[_0x1dfd7a(0x9a)](),_0x4f67b9[_0x1dfd7a(0x127)](/<CLEAR TARGET WARMUPS>/i)&&_0x1b3507[_0x1dfd7a(0x9a)]();},Game_Action[_0x35bc63(0xc4)][_0x35bc63(0xec)]=function(_0x52f75f){const _0x2c7d4c=_0x35bc63,_0x34dbf3=this[_0x2c7d4c(0x9c)]()[_0x2c7d4c(0xb0)],_0x1e069d=_0x34dbf3[_0x2c7d4c(0x127)](/<USER SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x1e069d)for(const _0x286bd4 of _0x1e069d){let _0xdfa3a7=0x0,_0x5a8274=0x0;if(_0x286bd4[_0x2c7d4c(0x127)](/<USER SKILL[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0xdfa3a7=Number(RegExp['$1']),_0x5a8274=Number(RegExp['$2']);else _0x286bd4['match'](/<USER SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0xdfa3a7=DataManager[_0x2c7d4c(0x13e)](RegExp['$1']),_0x5a8274=Number(RegExp['$2']));this[_0x2c7d4c(0x14a)]()[_0x2c7d4c(0x156)](_0xdfa3a7,_0x5a8274);}const _0x27d5f9=_0x34dbf3[_0x2c7d4c(0x127)](/<TARGET SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x27d5f9)for(const _0xa31f47 of _0x27d5f9){let _0x4e805d=0x0,_0x3862af=0x0;if(_0xa31f47[_0x2c7d4c(0x127)](/<TARGET SKILL[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0x4e805d=Number(RegExp['$1']),_0x3862af=Number(RegExp['$2']);else _0xa31f47[_0x2c7d4c(0x127)](/<TARGET SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0x4e805d=DataManager['getSkillIdWithName'](RegExp['$1']),_0x3862af=Number(RegExp['$2']));_0x52f75f[_0x2c7d4c(0x156)](_0x4e805d,_0x3862af);}},Game_Action['prototype'][_0x35bc63(0x11f)]=function(_0x50b50c){const _0x2f3b73=_0x35bc63,_0x2c5c86=this['item']()[_0x2f3b73(0xb0)],_0x4ee6fb=_0x2c5c86[_0x2f3b73(0x127)](/<USER STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x4ee6fb)for(const _0x29bf6f of _0x4ee6fb){let _0x2b7f13=0x0,_0x4c62a2=0x0;if(_0x29bf6f[_0x2f3b73(0x127)](/<USER STYPE[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0x2b7f13=Number(RegExp['$1']),_0x4c62a2=Number(RegExp['$2']);else _0x29bf6f[_0x2f3b73(0x127)](/<USER STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0x2b7f13=DataManager['getSkillIdWithName'](RegExp['$1']),_0x4c62a2=Number(RegExp['$2']));for(const _0x1840a1 of this[_0x2f3b73(0x14a)]()[_0x2f3b73(0x11a)]()){if(_0x1840a1){const _0x3db197=DataManager[_0x2f3b73(0x143)](_0x1840a1);_0x3db197['includes'](_0x2b7f13)&&this[_0x2f3b73(0x14a)]()[_0x2f3b73(0x156)](_0x1840a1['id'],_0x4c62a2);}}}const _0x4b4c79=_0x2c5c86[_0x2f3b73(0x127)](/<TARGET STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x4b4c79)for(const _0x58fcac of _0x4b4c79){let _0x17a854=0x0,_0x43c342=0x0;if(_0x58fcac['match'](/<TARGET STYPE[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0x17a854=Number(RegExp['$1']),_0x43c342=Number(RegExp['$2']);else _0x58fcac[_0x2f3b73(0x127)](/<TARGET STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0x17a854=DataManager[_0x2f3b73(0x13e)](RegExp['$1']),_0x43c342=Number(RegExp['$2']));for(const _0x412fc0 of _0x50b50c[_0x2f3b73(0x11a)]()){if(_0x412fc0){const _0x2dc99d=DataManager['getSkillTypes'](_0x412fc0);_0x2dc99d[_0x2f3b73(0xd9)](_0x17a854)&&_0x50b50c[_0x2f3b73(0x156)](_0x412fc0['id'],_0x43c342);}}}},Game_Action[_0x35bc63(0xc4)][_0x35bc63(0x139)]=function(_0x353630){const _0x4e7631=_0x35bc63,_0x10c602=this[_0x4e7631(0x9c)]()[_0x4e7631(0xb0)];if(_0x10c602['match'](/<USER GLOBAL COOLDOWN:[ ]([\+\-]\d+)>/i)){const _0x38dc26=Number(RegExp['$1']);for(const _0x49aa07 of this[_0x4e7631(0x14a)]()[_0x4e7631(0x11a)]()){_0x49aa07&&this[_0x4e7631(0x14a)]()[_0x4e7631(0x156)](_0x49aa07['id'],_0x38dc26);}}if(_0x10c602[_0x4e7631(0x127)](/<TARGET GLOBAL COOLDOWN:[ ]([\+\-]\d+)>/i)){const _0x41700e=Number(RegExp['$1']);for(const _0x2bf107 of _0x353630[_0x4e7631(0x11a)]()){_0x2bf107&&_0x353630[_0x4e7631(0x156)](_0x2bf107['id'],_0x41700e);}}},Game_Action[_0x35bc63(0xc4)][_0x35bc63(0x11d)]=function(_0xe564a0){const _0x250ed8=_0x35bc63,_0x65e5e1=this['item']()[_0x250ed8(0xb0)],_0x426576=_0x65e5e1[_0x250ed8(0x127)](/<USER SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x426576)for(const _0x5b63b1 of _0x426576){let _0x5785a8=0x0,_0x508899=0x0;if(_0x5b63b1[_0x250ed8(0x127)](/<USER SKILL[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0x5785a8=Number(RegExp['$1']),_0x508899=Number(RegExp['$2']);else _0x5b63b1[_0x250ed8(0x127)](/<USER SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0x5785a8=DataManager[_0x250ed8(0x13e)](RegExp['$1']),_0x508899=Number(RegExp['$2']));this[_0x250ed8(0x14a)]()[_0x250ed8(0xdf)](_0x5785a8,_0x508899);}const _0x8a35ad=_0x65e5e1[_0x250ed8(0x127)](/<TARGET SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x8a35ad)for(const _0x563277 of _0x8a35ad){let _0x352494=0x0,_0x27f7bb=0x0;if(_0x563277[_0x250ed8(0x127)](/<TARGET SKILL[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0x352494=Number(RegExp['$1']),_0x27f7bb=Number(RegExp['$2']);else _0x563277['match'](/<TARGET SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0x352494=DataManager[_0x250ed8(0x13e)](RegExp['$1']),_0x27f7bb=Number(RegExp['$2']));_0xe564a0[_0x250ed8(0xdf)](_0x352494,_0x27f7bb);}},Game_Action[_0x35bc63(0xc4)][_0x35bc63(0xdc)]=function(_0x5ce4b0){const _0x1ccd8a=_0x35bc63,_0x9686de=this[_0x1ccd8a(0x9c)]()[_0x1ccd8a(0xb0)],_0x318d4d=_0x9686de[_0x1ccd8a(0x127)](/<USER STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x318d4d)for(const _0x5d83f6 of _0x318d4d){let _0x41e213=0x0,_0x311978=0x0;if(_0x5d83f6[_0x1ccd8a(0x127)](/<USER STYPE[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0x41e213=Number(RegExp['$1']),_0x311978=Number(RegExp['$2']);else _0x5d83f6['match'](/<USER STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0x41e213=DataManager['getSkillIdWithName'](RegExp['$1']),_0x311978=Number(RegExp['$2']));for(const _0x2d6bc6 of this[_0x1ccd8a(0x14a)]()['skills']()){if(_0x2d6bc6){const _0x1ee923=DataManager['getSkillTypes'](_0x2d6bc6);_0x1ee923[_0x1ccd8a(0xd9)](_0x41e213)&&this[_0x1ccd8a(0x14a)]()['addWarmup'](_0x2d6bc6['id'],_0x311978);}}}const _0xacb865=_0x9686de[_0x1ccd8a(0x127)](/<TARGET STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0xacb865)for(const _0x1147d3 of _0xacb865){let _0x2f380c=0x0,_0x28d17c=0x0;if(_0x1147d3[_0x1ccd8a(0x127)](/<TARGET STYPE[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0x2f380c=Number(RegExp['$1']),_0x28d17c=Number(RegExp['$2']);else _0x1147d3[_0x1ccd8a(0x127)](/<TARGET STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0x2f380c=DataManager[_0x1ccd8a(0x13e)](RegExp['$1']),_0x28d17c=Number(RegExp['$2']));for(const _0x81fae7 of _0x5ce4b0['skills']()){if(_0x81fae7){const _0x227458=DataManager['getSkillTypes'](_0x81fae7);_0x227458[_0x1ccd8a(0xd9)](_0x2f380c)&&_0x5ce4b0['addWarmup'](_0x81fae7['id'],_0x28d17c);}}}},Game_Action[_0x35bc63(0xc4)][_0x35bc63(0x8d)]=function(_0x34528d){const _0x290026=_0x35bc63,_0x5afaee=this[_0x290026(0x9c)]()[_0x290026(0xb0)];if(_0x5afaee[_0x290026(0x127)](/<USER GLOBAL WARMUP:[ ]([\+\-]\d+)>/i)){const _0x185efe=Number(RegExp['$1']);for(const _0x5aabf4 of this['subject']()[_0x290026(0x11a)]()){_0x5aabf4&&this[_0x290026(0x14a)]()['addWarmup'](_0x5aabf4['id'],_0x185efe);}}if(_0x5afaee[_0x290026(0x127)](/<TARGET GLOBAL WARMUP:[ ]([\+\-]\d+)>/i)){const _0x4f0c22=Number(RegExp['$1']);for(const _0x44fbfb of _0x34528d[_0x290026(0x11a)]()){_0x44fbfb&&_0x34528d['addWarmup'](_0x44fbfb['id'],_0x4f0c22);}}},VisuMZ['SkillCooldowns'][_0x35bc63(0x90)]=Game_BattlerBase[_0x35bc63(0xc4)]['initMembers'],Game_BattlerBase[_0x35bc63(0xc4)][_0x35bc63(0x137)]=function(){const _0xc43b8=_0x35bc63;VisuMZ[_0xc43b8(0x9d)][_0xc43b8(0x90)][_0xc43b8(0xa7)](this),this[_0xc43b8(0xb7)]();},Game_BattlerBase[_0x35bc63(0xc4)][_0x35bc63(0xb7)]=function(){const _0x42cab1=_0x35bc63;this[_0x42cab1(0x8f)](),this[_0x42cab1(0x9a)](),this[_0x42cab1(0xa3)]();},Game_BattlerBase[_0x35bc63(0xc4)][_0x35bc63(0x8f)]=function(){const _0x3e9741=_0x35bc63;this[_0x3e9741(0xc8)]={};},Game_BattlerBase[_0x35bc63(0xc4)][_0x35bc63(0xe5)]=function(_0x40b00d){const _0x15bb2e=_0x35bc63;if(this[_0x15bb2e(0xc8)]===undefined)this[_0x15bb2e(0xb7)]();if(this[_0x15bb2e(0xae)]())return 0x0;return this[_0x15bb2e(0xc8)][_0x40b00d]||0x0;},Game_BattlerBase[_0x35bc63(0xc4)][_0x35bc63(0xae)]=function(_0x5beeed){const _0x58b5fc=_0x35bc63;if(!$gameParty[_0x58b5fc(0x91)]())return!![];if(this[_0x58b5fc(0x13c)]()===_0x5beeed)return!![];if(this['guardSkillId']()===_0x5beeed)return!![];const _0x147a98=$dataSkills[_0x5beeed];if(_0x147a98&&_0x147a98[_0x58b5fc(0xb0)][_0x58b5fc(0x127)](/<BYPASS COOLDOWNS>/i))return!![];if(_0x147a98&&_0x147a98['name'][_0x58b5fc(0x99)]()===_0x58b5fc(0xb2))return!![];return![];},Game_BattlerBase['prototype'][_0x35bc63(0xd8)]=function(_0x1785e5){const _0x4c5efd=_0x35bc63;if(!$gameParty[_0x4c5efd(0x91)]())return;const _0x2370a1=VisuMZ[_0x4c5efd(0x9d)][_0x4c5efd(0x112)][_0x4c5efd(0xfc)];if(_0x2370a1['OnUpdateJS'])_0x2370a1['OnUpdateJS'][_0x4c5efd(0xa7)](this,_0x1785e5);VisuMZ[_0x4c5efd(0x9d)][_0x4c5efd(0xd5)][_0x1785e5]&&VisuMZ[_0x4c5efd(0x9d)][_0x4c5efd(0xd5)][_0x1785e5][_0x4c5efd(0xa7)](this,_0x1785e5);},Game_BattlerBase[_0x35bc63(0xc4)][_0x35bc63(0xcb)]=function(_0x59f345){const _0xfdc64e=_0x35bc63;if(!$gameParty[_0xfdc64e(0x91)]())return;const _0x831e72=VisuMZ[_0xfdc64e(0x9d)][_0xfdc64e(0x112)][_0xfdc64e(0xfc)];if(_0x831e72[_0xfdc64e(0x140)])_0x831e72['OnReadyJS'][_0xfdc64e(0xa7)](this,_0x59f345);VisuMZ[_0xfdc64e(0x9d)][_0xfdc64e(0x13d)][_0x59f345]&&VisuMZ['SkillCooldowns'][_0xfdc64e(0x13d)][_0x59f345][_0xfdc64e(0xa7)](this,_0x59f345);},Game_BattlerBase[_0x35bc63(0xc4)][_0x35bc63(0x94)]=function(_0x541ba2,_0x47e6e1){const _0x2d623d=_0x35bc63;if(this[_0x2d623d(0xc8)]===undefined)this['initSkillCooldowns']();if(this[_0x2d623d(0xae)](_0x541ba2))return;_0x47e6e1=Math[_0x2d623d(0x105)](_0x47e6e1),_0x47e6e1=_0x47e6e1[_0x2d623d(0x14b)](0x0,VisuMZ['SkillCooldowns'][_0x2d623d(0x112)]['Cooldown'][_0x2d623d(0x116)]);const _0x582dc0=this[_0x2d623d(0xe5)](_0x541ba2);;this[_0x2d623d(0xc8)][_0x541ba2]=_0x47e6e1;if(this['_skillCooldowns'][_0x541ba2]<=0x0){if(_0x582dc0>0x0)this[_0x2d623d(0xcb)](_0x541ba2);delete this[_0x2d623d(0xc8)][_0x541ba2];}},Game_BattlerBase[_0x35bc63(0xc4)][_0x35bc63(0x156)]=function(_0x3071fe,_0x5670a2){const _0x299349=_0x35bc63;if(this[_0x299349(0xc8)]===undefined)this[_0x299349(0xb7)]();this[_0x299349(0xc8)][_0x3071fe]=this['_skillCooldowns'][_0x3071fe]||0x0,this['setCooldown'](_0x3071fe,this[_0x299349(0xc8)][_0x3071fe]+_0x5670a2);},Game_BattlerBase['prototype']['applyCooldown']=function(_0x50139e,_0x1bad4c){const _0x1df6b1=_0x35bc63;_0x1bad4c=this[_0x1df6b1(0xf9)](_0x50139e,_0x1bad4c,_0x1df6b1(0xd0)),this[_0x1df6b1(0x94)](_0x50139e,Math[_0x1df6b1(0x9e)](_0x1bad4c,this[_0x1df6b1(0xe5)](_0x50139e)));},Game_BattlerBase['prototype'][_0x35bc63(0x14f)]=function(_0x3f2112,_0x57aa1c){const _0x4485d2=_0x35bc63;for(const _0x31ce5f of this['skills']()){if(_0x31ce5f){const _0x28263a=DataManager['getSkillTypes'](_0x31ce5f);_0x28263a[_0x4485d2(0xd9)](_0x3f2112)&&this[_0x4485d2(0xe3)](_0x31ce5f['id'],_0x57aa1c);}}},Game_BattlerBase[_0x35bc63(0xc4)][_0x35bc63(0x134)]=function(_0x32ee43){const _0x393a81=_0x35bc63;for(const _0x1b72f4 of this[_0x393a81(0x11a)]()){_0x1b72f4&&this[_0x393a81(0xe3)](_0x1b72f4['id'],_0x32ee43);}},Game_BattlerBase[_0x35bc63(0xc4)]['updateCooldowns']=function(_0x4c5f19){const _0x37b001=_0x35bc63;_0x4c5f19=_0x4c5f19||0x1;for(const _0x3ca783 in this[_0x37b001(0xc8)]){const _0x53499d=this['_skillCooldowns'][_0x3ca783]||0x0;this[_0x37b001(0xc8)][_0x3ca783]-=_0x4c5f19,this[_0x37b001(0xd8)](_0x3ca783);if(this[_0x37b001(0xc8)][_0x3ca783]<=0x0){if(_0x53499d>0x0)this[_0x37b001(0xcb)](_0x3ca783);delete this['_skillCooldowns'][_0x3ca783];}}},Game_BattlerBase[_0x35bc63(0xc4)][_0x35bc63(0x9a)]=function(){this['_skillWarmups']={};},Game_BattlerBase['prototype'][_0x35bc63(0x97)]=function(_0x19b3a2){const _0x148a3f=_0x35bc63;return this['rawWarmup'](_0x19b3a2)+this[_0x148a3f(0xe5)](_0x19b3a2);},Game_BattlerBase[_0x35bc63(0xc4)][_0x35bc63(0x120)]=function(_0x27e680){const _0x2a7475=_0x35bc63;if(this['_skillWarmups']===undefined)this[_0x2a7475(0xb7)]();if(this['isBypassWarmups']())return 0x0;return this[_0x2a7475(0x129)][_0x27e680]||0x0;},Game_BattlerBase[_0x35bc63(0xc4)]['isBypassWarmups']=function(_0x39ff06){const _0x1407b0=_0x35bc63;if(this['attackSkillId']()===_0x39ff06)return!![];if(this[_0x1407b0(0x144)]()===_0x39ff06)return!![];const _0x317055=$dataSkills[_0x39ff06];if(_0x317055&&_0x317055[_0x1407b0(0xb0)][_0x1407b0(0x127)](/<BYPASS WARMUPS>/i))return!![];if(_0x317055&&_0x317055['name']['toUpperCase']()===_0x1407b0(0xb2))return!![];return![];},Game_BattlerBase['prototype'][_0x35bc63(0xf3)]=function(_0x554983){const _0x5a047c=_0x35bc63;if(!$gameParty[_0x5a047c(0x91)]())return;const _0x30e450=VisuMZ[_0x5a047c(0x9d)][_0x5a047c(0x112)][_0x5a047c(0xdb)];if(_0x30e450[_0x5a047c(0x123)])_0x30e450['OnUpdateJS'][_0x5a047c(0xa7)](this,_0x554983);VisuMZ['SkillCooldowns'][_0x5a047c(0x133)][_0x554983]&&VisuMZ[_0x5a047c(0x9d)]['onWarmupUpdateJS'][_0x554983][_0x5a047c(0xa7)](this,_0x554983);},Game_BattlerBase[_0x35bc63(0xc4)][_0x35bc63(0xa8)]=function(_0x26635d){const _0x5b2246=_0x35bc63;if(!$gameParty[_0x5b2246(0x91)]())return;const _0x2c614a=VisuMZ['SkillCooldowns'][_0x5b2246(0x112)][_0x5b2246(0xdb)];if(_0x2c614a[_0x5b2246(0x140)])_0x2c614a['OnReadyJS']['call'](this,_0x26635d);},Game_BattlerBase[_0x35bc63(0xc4)][_0x35bc63(0x153)]=function(_0x2bad7e,_0x2f37e9){const _0x49e379=_0x35bc63;if(this[_0x49e379(0x129)]===undefined)this[_0x49e379(0xb7)]();if(this[_0x49e379(0xc1)](_0x2bad7e))return;_0x2f37e9=Math[_0x49e379(0x105)](_0x2f37e9),_0x2f37e9=_0x2f37e9[_0x49e379(0x14b)](0x0,VisuMZ[_0x49e379(0x9d)]['Settings'][_0x49e379(0xdb)]['MaxTurns']);const _0x2a675c=this[_0x49e379(0x120)](_0x2bad7e);;this[_0x49e379(0x129)][_0x2bad7e]=_0x2f37e9;if(this[_0x49e379(0x129)][_0x2bad7e]<=0x0){if(_0x2a675c>0x0)this[_0x49e379(0xa8)](_0x2bad7e);delete this[_0x49e379(0x129)][_0x2bad7e];}},Game_BattlerBase[_0x35bc63(0xc4)]['addWarmup']=function(_0x37af1c,_0x5240d4){const _0x57f5d3=_0x35bc63;if(this['_skillWarmups']===undefined)this[_0x57f5d3(0xb7)]();this[_0x57f5d3(0x129)][_0x37af1c]=this[_0x57f5d3(0x129)][_0x37af1c]||0x0;if(this[_0x57f5d3(0x97)](_0x37af1c)<=0x0)return;this[_0x57f5d3(0x153)](_0x37af1c,this[_0x57f5d3(0x129)][_0x37af1c]+_0x5240d4);},Game_BattlerBase[_0x35bc63(0xc4)][_0x35bc63(0x136)]=function(_0xdd783c,_0x53539c){const _0x5bdcbd=_0x35bc63;_0x53539c=this[_0x5bdcbd(0xf9)](_0xdd783c,_0x53539c,'WARMUP'),this[_0x5bdcbd(0x153)](_0xdd783c,Math[_0x5bdcbd(0x9e)](_0x53539c,this[_0x5bdcbd(0x97)](_0xdd783c)));},Game_BattlerBase[_0x35bc63(0xc4)]['updateWarmups']=function(_0x4a3256){const _0x195fb9=_0x35bc63;if(this[_0x195fb9(0x13a)]()<=0x1)return;_0x4a3256=_0x4a3256||0x1;for(const _0x3a4510 in this[_0x195fb9(0x129)]){const _0x253d95=this[_0x195fb9(0x129)][_0x3a4510]||0x0;this[_0x195fb9(0x129)][_0x3a4510]-=_0x4a3256;if(this[_0x195fb9(0x129)][_0x3a4510]<=0x0){if(_0x253d95>0x0)this[_0x195fb9(0xa8)](_0x3a4510);delete this[_0x195fb9(0x129)][_0x3a4510];}}},Game_BattlerBase[_0x35bc63(0xc4)][_0x35bc63(0xa3)]=function(){const _0x1ec943=_0x35bc63;this[_0x1ec943(0xb1)]={};},DataManager[_0x35bc63(0xfa)]=function(_0x1df6cf){const _0x1d8eb0=_0x35bc63;if(!_0x1df6cf)return![];this[_0x1d8eb0(0x92)]=this[_0x1d8eb0(0x92)]||{};if(this[_0x1d8eb0(0x92)][_0x1df6cf['id']]!==undefined)return this['_cache_isOncePerTurnSkill'][_0x1df6cf['id']];const _0x302486=_0x1df6cf[_0x1d8eb0(0xb0)]||'';let _0x3ab944=![];return _0x302486[_0x1d8eb0(0x127)](/<ONCE PER TURN>/i)&&(_0x3ab944=!![]),this[_0x1d8eb0(0x92)][_0x1df6cf['id']]=_0x3ab944,this[_0x1d8eb0(0x92)][_0x1df6cf['id']];},Game_BattlerBase[_0x35bc63(0xc4)][_0x35bc63(0x8e)]=function(_0x453b66){const _0x9e5d66=_0x35bc63;if(!$gameParty[_0x9e5d66(0x91)]())return;if(BattleManager[_0x9e5d66(0xcf)]())return;if(!_0x453b66)return;if(DataManager[_0x9e5d66(0xfa)](_0x453b66)){if(this[_0x9e5d66(0xb1)]===undefined)this[_0x9e5d66(0xa3)]();this[_0x9e5d66(0xb1)][_0x453b66['id']]=this[_0x9e5d66(0x13a)]();}},Game_BattlerBase[_0x35bc63(0xc4)][_0x35bc63(0x111)]=function(_0x33b03a){const _0x366688=_0x35bc63;if(!$gameParty[_0x366688(0x91)]())return![];if(BattleManager[_0x366688(0xcf)]())return![];if(!_0x33b03a)return![];if(this[_0x366688(0xb1)]===undefined)this[_0x366688(0xa3)]();return this['_skillOncePerTurns'][_0x33b03a['id']]===this['turnCount']();},VisuMZ[_0x35bc63(0x9d)]['Game_Enemy_selectAction']=Game_Enemy['prototype'][_0x35bc63(0x142)],Game_Enemy[_0x35bc63(0xc4)][_0x35bc63(0x142)]=function(_0x30d367,_0xe0fcff){const _0x5ec8e3=_0x35bc63,_0x1b7c8a=VisuMZ[_0x5ec8e3(0x9d)][_0x5ec8e3(0xa0)][_0x5ec8e3(0xa7)](this,_0x30d367,_0xe0fcff);return this[_0x5ec8e3(0xe6)](_0x1b7c8a,_0x30d367),_0x1b7c8a;},Game_Battler[_0x35bc63(0xc4)]['removeOncePerTurnAction']=function(_0x5b7f3c,_0x295f21){const _0xc8f3ec=_0x35bc63;if(!_0x5b7f3c)return;const _0x34c6ba=$dataSkills[_0x5b7f3c['skillId']];if(!_0x34c6ba)return;if(!DataManager[_0xc8f3ec(0xfa)](_0x34c6ba))return;const _0x254d9d=_0x295f21[_0xc8f3ec(0xca)](_0x47da09=>_0x47da09['skillId']===_0x5b7f3c[_0xc8f3ec(0xea)]);for(const _0xc9ee12 of _0x254d9d){_0x295f21[_0xc8f3ec(0xb5)](_0xc9ee12);}},VisuMZ[_0x35bc63(0x9d)][_0x35bc63(0x119)]=Game_BattlerBase[_0x35bc63(0xc4)][_0x35bc63(0xe8)],Game_BattlerBase[_0x35bc63(0xc4)][_0x35bc63(0xe8)]=function(_0x2102a1){const _0x4ecb71=_0x35bc63;if(!VisuMZ['SkillCooldowns']['Game_BattlerBase_meetsSkillConditions'][_0x4ecb71(0xa7)](this,_0x2102a1))return![];if(!this[_0x4ecb71(0x132)](_0x2102a1))return![];if(!this[_0x4ecb71(0x103)](_0x2102a1))return![];if(this[_0x4ecb71(0x111)](_0x2102a1))return![];return!![];},Game_BattlerBase['prototype'][_0x35bc63(0x132)]=function(_0x15d7ae){return this['rawWarmup'](_0x15d7ae['id'])<=0x0;},Game_BattlerBase['prototype'][_0x35bc63(0x103)]=function(_0x125ef6){const _0x176bf5=_0x35bc63;return this[_0x176bf5(0xe5)](_0x125ef6['id'])<=0x0;},VisuMZ[_0x35bc63(0x9d)][_0x35bc63(0x10d)]=Game_BattlerBase[_0x35bc63(0xc4)][_0x35bc63(0x126)],Game_BattlerBase[_0x35bc63(0xc4)][_0x35bc63(0x126)]=function(_0x49572d){const _0x1786a7=_0x35bc63;VisuMZ[_0x1786a7(0x9d)][_0x1786a7(0x10d)][_0x1786a7(0xa7)](this,_0x49572d),this['paySkillCooldown'](_0x49572d),this[_0x1786a7(0x8e)](_0x49572d);},Game_BattlerBase[_0x35bc63(0xc4)]['alterPaySkillCooldownModifier']=function(_0x48302c,_0x588811){const _0x4690a4=_0x35bc63;return Imported['VisuMZ_3_SkillMastery']&&(_0x588811=this[_0x4690a4(0x125)](_0x48302c,_0x588811)),_0x588811;},Game_BattlerBase[_0x35bc63(0xc4)]['paySkillCooldown']=function(_0xe48d07){const _0x1b42c6=_0x35bc63;if(!$gameParty[_0x1b42c6(0x91)]())return;const _0xbf0efd=_0xe48d07['note'];if(_0xbf0efd['match'](/<COOLDOWN:[ ](\d+)>/i)){let _0x28128a=Number(RegExp['$1']);_0x28128a=this['alterPaySkillCooldownModifier'](_0xe48d07,_0x28128a),this[_0x1b42c6(0xe3)](_0xe48d07['id'],_0x28128a);}VisuMZ['SkillCooldowns'][_0x1b42c6(0xed)][_0xe48d07['id']]&&VisuMZ[_0x1b42c6(0x9d)][_0x1b42c6(0xed)][_0xe48d07['id']][_0x1b42c6(0xa7)](this,_0xe48d07);const _0x141096=_0xbf0efd[_0x1b42c6(0x127)](/<SKILL[ ](.*)[ ]COOLDOWN:[ ](\d+)>/gi);if(_0x141096)for(const _0x4f6197 of _0x141096){let _0x269c0c=0x0,_0x29d782=0x0;if(_0x4f6197['match'](/<SKILL[ ](\d+)[ ]COOLDOWN:[ ](\d+)>/gi))_0x269c0c=Number(RegExp['$1']),_0x29d782=Number(RegExp['$2']);else _0x4f6197['match'](/<SKILL[ ](.*)[ ]COOLDOWN:[ ](\d+)>/gi)&&(_0x269c0c=DataManager['getSkillIdWithName'](RegExp['$1']),_0x29d782=Number(RegExp['$2']));const _0x3c9328=$dataSkills[_0x269c0c];_0x3c9328&&(_0x29d782=this[_0x1b42c6(0xc0)](_0xe48d07,_0x29d782),this[_0x1b42c6(0xe3)](_0x3c9328['id'],_0x29d782));}const _0x310eea=_0xbf0efd[_0x1b42c6(0x127)](/<STYPE[ ](.*)[ ]COOLDOWN:[ ](\d+)>/gi);if(_0x310eea)for(const _0x1ef05b of _0x310eea){let _0x31efe7=0x0,_0x4f28c5=0x0;if(_0x1ef05b[_0x1b42c6(0x127)](/<STYPE[ ](\d+)[ ]COOLDOWN:[ ](\d+)>/i))_0x31efe7=Number(RegExp['$1']),_0x4f28c5=Number(RegExp['$2']);else _0x1ef05b[_0x1b42c6(0x127)](/<STYPE[ ](.*)[ ]COOLDOWN:[ ](\d+)>/i)&&(_0x31efe7=DataManager['getStypeIdWithName'](RegExp['$1']),_0x4f28c5=Number(RegExp['$2']));_0x4f28c5=this[_0x1b42c6(0xc0)](_0xe48d07,_0x4f28c5),this[_0x1b42c6(0x14f)](_0x31efe7,_0x4f28c5);}if(_0xbf0efd[_0x1b42c6(0x127)](/<GLOBAL COOLDOWN:[ ](\d+)>/i)){let _0x5a51f7=Number(RegExp['$1']);_0x5a51f7=this[_0x1b42c6(0xc0)](_0xe48d07,_0x5a51f7),this[_0x1b42c6(0x134)](_0x5a51f7);}},Game_BattlerBase[_0x35bc63(0xc4)][_0x35bc63(0xf9)]=function(_0x5cd3aa,_0x300277,_0x43e64c){const _0x5ac125=_0x35bc63,_0x34ecda=$dataSkills[_0x5cd3aa];if(!_0x34ecda)return _0x300277;const _0x46e373=this[_0x5ac125(0x93)](_0x34ecda,_0x43e64c,'PLUS'),_0x1b9f26=this['applyCDWUnotetagsRate'](_0x34ecda,_0x43e64c,_0x5ac125(0x14d)),_0x2cc3d6=this[_0x5ac125(0x93)](_0x34ecda,_0x43e64c,_0x5ac125(0x10e));return Math[_0x5ac125(0x105)]((_0x300277+_0x46e373)*_0x1b9f26+_0x2cc3d6);},VisuMZ['SkillCooldowns'][_0x35bc63(0xfd)]={},Game_BattlerBase['prototype'][_0x35bc63(0x93)]=function(_0x2544d5,_0x10ac12,_0x44b37f){const _0x1f972c=_0x35bc63,_0x83ba1a=_0x2544d5['id'],_0x28ec6a=_0x2544d5[_0x1f972c(0xba)][_0x1f972c(0x115)](),_0x49f4b4=VisuMZ[_0x1f972c(0x9d)][_0x1f972c(0xfd)],_0x32a375=_0x1f972c(0xeb)[_0x1f972c(0xf7)](_0x83ba1a,_0x10ac12,_0x44b37f);_0x49f4b4[_0x32a375]=_0x49f4b4[_0x32a375]||{};const _0x383523=_0x1f972c(0x104);_0x49f4b4[_0x32a375][_0x1f972c(0x135)]=_0x49f4b4[_0x32a375][_0x1f972c(0x135)]||new RegExp(_0x383523['format'](_0x83ba1a,_0x10ac12,_0x44b37f),'i'),_0x49f4b4[_0x32a375][_0x1f972c(0xad)]=_0x49f4b4[_0x32a375]['notetag2']||new RegExp(_0x383523[_0x1f972c(0xf7)](_0x28ec6a,_0x10ac12,_0x44b37f),'i');const _0xb08649=DataManager['getSkillTypes'](_0x2544d5);for(const _0x4b1641 of _0xb08649){const _0x2bde57=_0x1f972c(0x108)[_0x1f972c(0xf7)](_0x4b1641,_0x10ac12,_0x44b37f);let _0x8ee848=$dataSystem[_0x1f972c(0xa9)][Number(_0x4b1641)][_0x1f972c(0x99)]()[_0x1f972c(0x115)]();_0x8ee848=_0x8ee848[_0x1f972c(0x131)](/\x1I\[(\d+)\]/gi,''),_0x8ee848=_0x8ee848[_0x1f972c(0x131)](/\\I\[(\d+)\]/gi,''),_0x49f4b4[_0x2bde57]=_0x49f4b4[_0x2bde57]||{};const _0x45603=_0x1f972c(0xd2);_0x49f4b4[_0x2bde57][_0x1f972c(0x135)]=_0x49f4b4[_0x2bde57][_0x1f972c(0x135)]||new RegExp(_0x45603[_0x1f972c(0xf7)](_0x4b1641,_0x10ac12,_0x44b37f),'i'),_0x49f4b4[_0x2bde57][_0x1f972c(0xad)]=_0x49f4b4[_0x2bde57][_0x1f972c(0xad)]||new RegExp(_0x45603[_0x1f972c(0xf7)](_0x8ee848,_0x10ac12,_0x44b37f),'i');}const _0x223306=_0x1f972c(0xd7),_0x592570=_0x1f972c(0x152)[_0x1f972c(0xf7)](_0x10ac12,_0x44b37f);_0x49f4b4[_0x592570]=_0x49f4b4[_0x592570]||new RegExp(_0x223306[_0x1f972c(0xf7)](_0x10ac12,_0x44b37f),'i');const _0x31f414=(_0x2c56c7,_0x16197d)=>{const _0xe8fdcd=_0x1f972c;if(!_0x16197d)return _0x2c56c7;const _0x57c5f1=_0x16197d[_0xe8fdcd(0xb0)];if(_0x57c5f1[_0xe8fdcd(0x127)](_0x49f4b4[_0x32a375][_0xe8fdcd(0x135)])){var _0x294be5=Number(RegExp['$1']);_0x2c56c7+=_0x294be5;}if(_0x57c5f1[_0xe8fdcd(0x127)](_0x49f4b4[_0x32a375]['notetag2'])){var _0x294be5=Number(RegExp['$1']);_0x2c56c7+=_0x294be5;}for(const _0x37feeb of _0xb08649){const _0x5c969c='Stype_%1_%2_%3'[_0xe8fdcd(0xf7)](_0x37feeb,_0x10ac12,_0x44b37f);if(_0x57c5f1[_0xe8fdcd(0x127)](_0x49f4b4[_0x5c969c][_0xe8fdcd(0x135)])){var _0x294be5=Number(RegExp['$1']);_0x2c56c7+=_0x294be5;}if(_0x57c5f1[_0xe8fdcd(0x127)](_0x49f4b4[_0x5c969c]['notetag2'])){var _0x294be5=Number(RegExp['$1']);_0x2c56c7+=_0x294be5;}}if(_0x57c5f1[_0xe8fdcd(0x127)](_0x49f4b4[_0x592570])){var _0x294be5=Number(RegExp['$1']);_0x2c56c7+=_0x294be5;}return _0x2c56c7;};return this[_0x1f972c(0xaf)]()['reduce'](_0x31f414,0x0);},Game_BattlerBase[_0x35bc63(0xc4)][_0x35bc63(0x96)]=function(_0x4c32cc,_0x3433c4,_0x3d32ee){const _0x3ea034=_0x35bc63,_0x34a25e=_0x4c32cc['id'],_0xfeaf7a=_0x4c32cc['name'][_0x3ea034(0x115)](),_0x37499b=VisuMZ[_0x3ea034(0x9d)][_0x3ea034(0xfd)],_0x4ac6e7=_0x3ea034(0x146),_0x5ca701='(\x5cd+\x5c.?\x5cd+)',_0x5753c9=_0x3ea034(0xeb)[_0x3ea034(0xf7)](_0x34a25e,_0x3433c4,_0x3d32ee);_0x37499b[_0x5753c9]=_0x37499b[_0x5753c9]||{};const _0x4bd6e9=_0x3ea034(0x13b);_0x37499b[_0x5753c9][_0x3ea034(0x135)]=_0x37499b[_0x5753c9][_0x3ea034(0x135)]||new RegExp(_0x4bd6e9[_0x3ea034(0xf7)](_0x34a25e,_0x3433c4,_0x3d32ee,_0x4ac6e7),'i'),_0x37499b[_0x5753c9][_0x3ea034(0xad)]=_0x37499b[_0x5753c9][_0x3ea034(0xad)]||new RegExp(_0x4bd6e9[_0x3ea034(0xf7)](_0xfeaf7a,_0x3433c4,_0x3d32ee,_0x4ac6e7),'i'),_0x37499b[_0x5753c9]['notetag3']=_0x37499b[_0x5753c9][_0x3ea034(0xbd)]||new RegExp(_0x4bd6e9[_0x3ea034(0xf7)](_0x34a25e,_0x3433c4,_0x3d32ee,_0x5ca701),'i'),_0x37499b[_0x5753c9]['notetag4']=_0x37499b[_0x5753c9][_0x3ea034(0x9b)]||new RegExp(_0x4bd6e9[_0x3ea034(0xf7)](_0xfeaf7a,_0x3433c4,_0x3d32ee,_0x5ca701),'i');const _0x1a2f43=DataManager[_0x3ea034(0x143)](_0x4c32cc);for(const _0x5c5447 of _0x1a2f43){const _0x5ceb0d=_0x3ea034(0x108)[_0x3ea034(0xf7)](_0x5c5447,_0x3433c4,_0x3d32ee);let _0x31d43a=$dataSystem['skillTypes'][Number(_0x5c5447)][_0x3ea034(0x99)]()[_0x3ea034(0x115)]();_0x31d43a=_0x31d43a['replace'](/\x1I\[(\d+)\]/gi,''),_0x31d43a=_0x31d43a[_0x3ea034(0x131)](/\\I\[(\d+)\]/gi,''),_0x37499b[_0x5ceb0d]=_0x37499b[_0x5ceb0d]||{};const _0x3655ea=_0x3ea034(0x14c);_0x37499b[_0x5ceb0d][_0x3ea034(0x135)]=_0x37499b[_0x5ceb0d][_0x3ea034(0x135)]||new RegExp(_0x3655ea[_0x3ea034(0xf7)](_0x5c5447,_0x3433c4,_0x3d32ee,_0x4ac6e7),'i'),_0x37499b[_0x5ceb0d][_0x3ea034(0xad)]=_0x37499b[_0x5ceb0d][_0x3ea034(0xad)]||new RegExp(_0x3655ea[_0x3ea034(0xf7)](_0x31d43a,_0x3433c4,_0x3d32ee,_0x4ac6e7),'i'),_0x37499b[_0x5ceb0d][_0x3ea034(0xbd)]=_0x37499b[_0x5ceb0d][_0x3ea034(0xbd)]||new RegExp(_0x3655ea['format'](_0x5c5447,_0x3433c4,_0x3d32ee,_0x5ca701),'i'),_0x37499b[_0x5ceb0d][_0x3ea034(0x9b)]=_0x37499b[_0x5ceb0d][_0x3ea034(0x9b)]||new RegExp(_0x3655ea[_0x3ea034(0xf7)](_0x31d43a,_0x3433c4,_0x3d32ee,_0x5ca701),'i');}const _0x5e13ef='<GLOBAL\x20%1\x20%2:[\x20]%3>',_0x54f21f=_0x3ea034(0x152)['format'](_0x3433c4,_0x3d32ee);_0x37499b[_0x54f21f]=_0x37499b[_0x54f21f]||{},_0x37499b[_0x54f21f]['notetag1']=_0x37499b[_0x54f21f]['notetag1']||new RegExp(_0x5e13ef[_0x3ea034(0xf7)](_0x3433c4,_0x3d32ee,_0x4ac6e7),'i'),_0x37499b[_0x54f21f]['notetag2']=_0x37499b[_0x54f21f][_0x3ea034(0xad)]||new RegExp(_0x5e13ef['format'](_0x3433c4,_0x3d32ee,_0x5ca701),'i');const _0x478538=(_0x3471ce,_0x463916)=>{const _0x9e6aed=_0x3ea034;if(!_0x463916)return _0x3471ce;const _0x1b8a29=_0x463916[_0x9e6aed(0xb0)];if(_0x1b8a29[_0x9e6aed(0x127)](_0x37499b[_0x5753c9][_0x9e6aed(0x135)])){var _0xec6bd2=Number(RegExp['$1'])/0x64;_0x3471ce*=_0xec6bd2;}if(_0x1b8a29[_0x9e6aed(0x127)](_0x37499b[_0x5753c9][_0x9e6aed(0xad)])){var _0xec6bd2=Number(RegExp['$1'])/0x64;_0x3471ce*=_0xec6bd2;}if(_0x1b8a29[_0x9e6aed(0x127)](_0x37499b[_0x5753c9]['notetag3'])){var _0xec6bd2=Number(RegExp['$1']);_0x3471ce*=_0xec6bd2;}if(_0x1b8a29['match'](_0x37499b[_0x5753c9][_0x9e6aed(0x9b)])){var _0xec6bd2=Number(RegExp['$1']);_0x3471ce*=_0xec6bd2;}for(const _0xc1f798 of _0x1a2f43){const _0x26517a='Stype_%1_%2_%3'[_0x9e6aed(0xf7)](_0xc1f798,_0x3433c4,_0x3d32ee);if(_0x1b8a29['match'](_0x37499b[_0x26517a][_0x9e6aed(0x135)])){var _0xec6bd2=Number(RegExp['$1'])/0x64;_0x3471ce*=_0xec6bd2;}if(_0x1b8a29['match'](_0x37499b[_0x26517a][_0x9e6aed(0xad)])){var _0xec6bd2=Number(RegExp['$1'])/0x64;_0x3471ce*=_0xec6bd2;}if(_0x1b8a29[_0x9e6aed(0x127)](_0x37499b[_0x26517a][_0x9e6aed(0xbd)])){var _0xec6bd2=Number(RegExp['$1']);_0x3471ce*=_0xec6bd2;}if(_0x1b8a29[_0x9e6aed(0x127)](_0x37499b[_0x26517a][_0x9e6aed(0x9b)])){var _0xec6bd2=Number(RegExp['$1']);_0x3471ce*=_0xec6bd2;}}if(_0x1b8a29[_0x9e6aed(0x127)](_0x37499b[_0x54f21f][_0x9e6aed(0x135)])){var _0xec6bd2=Number(RegExp['$1'])/0x64;_0x3471ce*=_0xec6bd2;}if(_0x1b8a29[_0x9e6aed(0x127)](_0x37499b[_0x54f21f][_0x9e6aed(0xad)])){var _0xec6bd2=Number(RegExp['$1']);_0x3471ce*=_0xec6bd2;}return _0x3471ce;};return this[_0x3ea034(0xaf)]()[_0x3ea034(0x102)](_0x478538,0x1);},VisuMZ[_0x35bc63(0x9d)][_0x35bc63(0xb6)]=Game_Battler[_0x35bc63(0xc4)][_0x35bc63(0x130)],Game_Battler['prototype'][_0x35bc63(0x130)]=function(_0xf1e5e8){const _0x48c23b=_0x35bc63;VisuMZ[_0x48c23b(0x9d)][_0x48c23b(0xb6)][_0x48c23b(0xa7)](this,_0xf1e5e8);if(this[_0x48c23b(0x10b)]){this['_previousBattleChain']=undefined;return;}this[_0x48c23b(0x8f)](),this[_0x48c23b(0x9a)](),this[_0x48c23b(0xa3)](),this[_0x48c23b(0xc7)](_0xf1e5e8);},Game_Battler[_0x35bc63(0xc4)][_0x35bc63(0xc7)]=function(_0x5ad113){const _0x527e9d=_0x35bc63;for(const _0x51099c of this[_0x527e9d(0x11a)]()){if(!_0x51099c)continue;const _0x2013f3=_0x51099c['id'],_0x46abb5=_0x51099c[_0x527e9d(0xb0)];_0x46abb5[_0x527e9d(0x127)](/<WARMUP:[ ](\d+)>/i)&&this['applyWarmup'](_0x2013f3,Number(RegExp['$1'])),VisuMZ['SkillCooldowns'][_0x527e9d(0x113)][_0x51099c['id']]&&VisuMZ['SkillCooldowns'][_0x527e9d(0x113)][_0x51099c['id']][_0x527e9d(0xa7)](this,_0x51099c);}if(_0x5ad113){const _0x1fb05c=VisuMZ[_0x527e9d(0x9d)][_0x527e9d(0x112)][_0x527e9d(0xdb)]['Preemptive']||0x0;this['updateWarmups'](_0x1fb05c);}},Game_Battler['prototype'][_0x35bc63(0x110)]=function(){const _0x23c43f=_0x35bc63;if(this[_0x23c43f(0x101)])return;if(this['_instantCast'])return;this[_0x23c43f(0x101)]=!![],this[_0x23c43f(0x121)]();if(Imported[_0x23c43f(0xe0)]&&BattleManager[_0x23c43f(0xb9)]())return;this[_0x23c43f(0x12b)]();},VisuMZ[_0x35bc63(0x9d)]['Game_Battler_onTurnEnd']=Game_Battler[_0x35bc63(0xc4)][_0x35bc63(0x14e)],Game_Battler[_0x35bc63(0xc4)][_0x35bc63(0x14e)]=function(){const _0x150b8d=_0x35bc63;this['_updatedSkillCooldowns']=![],VisuMZ[_0x150b8d(0x9d)][_0x150b8d(0xce)][_0x150b8d(0xa7)](this),Imported[_0x150b8d(0xe0)]&&BattleManager['isOTB']()&&this[_0x150b8d(0x12b)](),this['clearOncePerTurns']();},VisuMZ['SkillCooldowns'][_0x35bc63(0xe7)]=Game_Battler['prototype'][_0x35bc63(0x10c)],Game_Battler[_0x35bc63(0xc4)][_0x35bc63(0x10c)]=function(){const _0x2a41b2=_0x35bc63;VisuMZ['SkillCooldowns']['Game_Battler_onBattleEnd']['call'](this);if(Imported[_0x2a41b2(0xb3)]&&$gameTemp[_0x2a41b2(0xac)]()){this[_0x2a41b2(0x10b)]=!![];return;}this['clearCooldowns'](),this[_0x2a41b2(0x9a)](),this[_0x2a41b2(0xa3)]();};var $actorGetSkillCooldown=function(_0x1c5c64,_0x7671c3){const _0x59209f=_0x35bc63,_0x4b06cc=$gameActors[_0x59209f(0xff)](_0x1c5c64);if(!_0x4b06cc)return 0x0;return _0x4b06cc[_0x59209f(0xe5)](_0x7671c3)||0x0;},$actorSetSkillCooldown=function(_0x34b5f3,_0x219bbd,_0xd9bd5a){const _0x3cc6c8=_0x35bc63,_0x420d0f=$gameActors[_0x3cc6c8(0xff)](_0x34b5f3);if(!_0x420d0f)return;_0x420d0f[_0x3cc6c8(0x94)](_0x219bbd,_0xd9bd5a);},$actorGetSkillWarmup=function(_0x220cec,_0x919fc9){const _0x1df372=_0x35bc63,_0x3cce0f=$gameActors[_0x1df372(0xff)](_0x220cec);if(!_0x3cce0f)return 0x0;return _0x3cce0f[_0x1df372(0x97)](_0x919fc9)||0x0;},$actorSetSkillWarmup=function(_0x2068c0,_0x36319f,_0x4c1c85){const _0x2697f9=_0x35bc63,_0x597ff6=$gameActors['actor'](_0x2068c0);if(!_0x597ff6)return;_0x597ff6[_0x2697f9(0x153)](_0x36319f,_0x4c1c85);},$enemyGetSkillCooldown=function(_0x1e8958,_0x12cb24){const _0x488c5d=_0x35bc63,_0x3952cd=$gameTroop['members']()[_0x1e8958];if(!_0x3952cd)return 0x0;return _0x3952cd[_0x488c5d(0xe5)](_0x12cb24)||0x0;},$enemySetSkillCooldown=function(_0x1df5cf,_0x3aa6cd,_0x4df23d){const _0x1600b0=_0x35bc63,_0x40d930=$gameTroop[_0x1600b0(0xf4)]()[_0x1df5cf];if(!_0x40d930)return;_0x40d930['setCooldown'](_0x3aa6cd,_0x4df23d);},$enemyGetSkillWarmup=function(_0x2e0841,_0x33f39d){const _0x437543=_0x35bc63,_0x302544=$gameTroop[_0x437543(0xf4)]()[_0x2e0841];if(!_0x302544)return 0x0;return _0x302544['warmup'](_0x33f39d)||0x0;},$enemySetSkillWarmup=function(_0x4fac7b,_0x59ffe7,_0x5a9616){const _0x57de44=_0x35bc63,_0x11dab9=$gameTroop[_0x57de44(0xf4)]()[_0x4fac7b];if(!_0x11dab9)return;_0x11dab9[_0x57de44(0x153)](_0x59ffe7,_0x5a9616);};VisuMZ[_0x35bc63(0x9d)][_0x35bc63(0xcd)]=Window_Base[_0x35bc63(0xc4)][_0x35bc63(0x148)],Window_Base[_0x35bc63(0xc4)]['drawSkillCost']=function(_0x1574ca,_0x4604b0,_0x2fc98f,_0x19ebd2,_0x478741){const _0x375920=_0x35bc63,_0xb21a08=VisuMZ['SkillCooldowns'][_0x375920(0x112)];if(_0xb21a08[_0x375920(0xdb)][_0x375920(0x9f)]&&_0x1574ca[_0x375920(0x120)](_0x4604b0['id'])>0x0)this[_0x375920(0xf5)](_0x1574ca,_0x4604b0,_0x2fc98f,_0x19ebd2,_0x478741);else{if(_0xb21a08[_0x375920(0xfc)][_0x375920(0x9f)]&&_0x1574ca[_0x375920(0xe5)](_0x4604b0['id'])>0x0)this['drawSkillCooldown'](_0x1574ca,_0x4604b0,_0x2fc98f,_0x19ebd2,_0x478741);else _0xb21a08[_0x375920(0xfc)][_0x375920(0x9f)]&&_0x1574ca[_0x375920(0x111)](_0x4604b0)?this[_0x375920(0xcc)](_0x1574ca,_0x4604b0,_0x2fc98f,_0x19ebd2,_0x478741):VisuMZ[_0x375920(0x9d)][_0x375920(0xcd)][_0x375920(0xa7)](this,_0x1574ca,_0x4604b0,_0x2fc98f,_0x19ebd2,_0x478741);}},Window_Base[_0x35bc63(0xc4)][_0x35bc63(0xf5)]=function(_0x4260cf,_0x3d5e48,_0x3a02d0,_0x188a1d,_0x425252){const _0x8bd840=_0x35bc63,_0x10eb83=VisuMZ['SkillCooldowns']['Settings'][_0x8bd840(0xdb)];let _0x3ce248='';_0x3ce248+='\x5cFS[%1]'[_0x8bd840(0xf7)](_0x10eb83[_0x8bd840(0xd6)]);const _0x333f4a=_0x10eb83[_0x8bd840(0xe9)];_0x333f4a['match'](/#(.*)/i)&&Imported['VisuMZ_1_MessageCore']?_0x3ce248+='\x5cHexColor<%1>'[_0x8bd840(0xf7)](String(RegExp['$1'])):_0x3ce248+=_0x8bd840(0xd3)['format'](_0x333f4a);const _0x556e17=_0x4260cf['warmup'](_0x3d5e48['id']),_0x2863b6=_0x10eb83[_0x8bd840(0xe2)]>0x0?_0x8bd840(0x154)[_0x8bd840(0xf7)](_0x10eb83[_0x8bd840(0xe2)]):'';_0x3ce248+=_0x10eb83[_0x8bd840(0xc9)]['format'](_0x556e17,_0x2863b6);const _0x2585fa=this['textSizeEx'](_0x3ce248,_0x3a02d0,_0x188a1d,_0x425252),_0x17071d=_0x3a02d0+_0x425252-_0x2585fa[_0x8bd840(0xc6)];this['drawTextEx'](_0x3ce248,_0x17071d,_0x188a1d,_0x425252),this['resetFontSettings']();},Window_Base[_0x35bc63(0xc4)][_0x35bc63(0xcc)]=function(_0x5aeb99,_0x29f7c1,_0x185084,_0x343f3b,_0x32815e){const _0x9f3dcc=_0x35bc63,_0x2b98c8=VisuMZ[_0x9f3dcc(0x9d)][_0x9f3dcc(0x112)][_0x9f3dcc(0xfc)];let _0x2932e6='';_0x2932e6+='\x5cFS[%1]'[_0x9f3dcc(0xf7)](_0x2b98c8[_0x9f3dcc(0xd6)]);const _0x4fc1f4=_0x2b98c8[_0x9f3dcc(0xe9)];_0x4fc1f4[_0x9f3dcc(0x127)](/#(.*)/i)&&Imported[_0x9f3dcc(0xf6)]?_0x2932e6+=_0x9f3dcc(0x11e)['format'](String(RegExp['$1'])):_0x2932e6+='\x5cC[%1]'[_0x9f3dcc(0xf7)](_0x4fc1f4);const _0x599493=_0x5aeb99[_0x9f3dcc(0x111)](_0x29f7c1)?0x1:_0x5aeb99['cooldown'](_0x29f7c1['id']),_0x4a7d70=_0x2b98c8[_0x9f3dcc(0xe2)]>0x0?'\x5cI[%1]'[_0x9f3dcc(0xf7)](_0x2b98c8[_0x9f3dcc(0xe2)]):'';_0x2932e6+=_0x2b98c8[_0x9f3dcc(0xc9)][_0x9f3dcc(0xf7)](_0x599493,_0x4a7d70);const _0x2a674d=this[_0x9f3dcc(0x98)](_0x2932e6,_0x185084,_0x343f3b,_0x32815e),_0x3142e3=_0x185084+_0x32815e-_0x2a674d[_0x9f3dcc(0xc6)];this[_0x9f3dcc(0xa1)](_0x2932e6,_0x3142e3,_0x343f3b,_0x32815e),this[_0x9f3dcc(0x147)]();};