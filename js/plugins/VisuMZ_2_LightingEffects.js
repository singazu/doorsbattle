//=============================================================================
// VisuStella MZ - Lighting Effects
// VisuMZ_2_LightingEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_LightingEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.LightingEffects = VisuMZ.LightingEffects || {};
VisuMZ.LightingEffects.version = 1.10;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.10] [LightingEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Lighting_Effects_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_EventsMoveCore
 * @orderAfter VisuMZ_1_EventsMoveCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MZ lacks the ability to provide lighting by default. During scenes
 * where it is night, the usage of tones is not adequate either since there is
 * no way to illuminate the darkness. This plugin remedies that problem by
 * providing lighting effects that pierce the darkness. From radial lights to
 * conical lights and applying various lighting behaviors, this plugin covers
 * the general lighting needs that RPG Maker MZ does not.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Auto-Tints allow for maps to automatically load up a specific screen tint
 *   upon player entry. Screen tints can be custom or based off presets.
 * * Apply darkness overlays to maps using custom colors or presets. Change
 *   them midway through the game using Plugin Commands.
 * * Radial lights can be added to pierce the darkness overlays. They will
 *   light up nearby surroundings in a circular area.
 * * Conical lights can be used to portray light in a cone-like direction and
 *   simulate the light coming from flashlights.
 * * Adjust the offset settings for conical lights, such at the source of the
 *   light will come from an actor or event's hand positions rather than their
 *   chest or face.
 * * Adjusted conical light offsets can vary for different actors and/or events
 *   in case they have different body structures. Change these settings through
 *   notetags, Plugin Commands, or Plugin Parameters.
 * * Apply radial and conical lights to vehicles. They can have different
 *   settings applied when they're inactive or being driven. These settings can
 *   be adjusted separately via Plugin Parameters or Plugin Commands!
 * * Assign lights via a variety of ways such as easy to use notetags, page-
 *   specific comment tags, and Plugin Commands!
 * * Use either images or have the plugin generate them ingame using various
 *   notetags, Plugin Parameters, or Plugin Commands!
 * * Apply optional light behaviors to lights such as blinking, flickering,
 *   flashing, flares, and more!
 * * Use patterns for light fluctuation behaviors instead of randoms.
 * * Spawn lights unattached to the player character, followers, or events.
 *   These spawned lights can have unique trajectories akin to what would be
 *   seen at a light show.
 * * The darkness overlay also appears in battle. Actors and enemies will have
 *   their own individual radial light settings that they can use specifically
 *   for the battle-scene only. There will be no conical lights for battle.
 * * Options added in the Options menu to allow players to turn on/off any
 *   unwanted light behaviors that may bother them. Examples include blinking
 *   lights, flickering lights, flashing, flares, etc.
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
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_EventsMoveCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Instructions - Quick Start
 * ============================================================================
 * 
 * Here are some instructions to get yourself started quickly on using the
 * Lighting Effects plugin.
 * 
 * ---
 * 
 * Step 1: Create a map with a darkness overlay.
 * 
 * 1. Create a new map (or use an old one if you know what you're doing).
 * 2. Right click the map's name in the editor and go to the Map's Properties.
 * 3. Add the <Overlay: Night> notetag into the map's notebox.
 * 4. For more information on the types of settings you can pick, look in the
 *    help file.
 * 
 * *NOTE* Keep in mind that whenever you enter this map, the darkness overlay
 * will shift to "Night". If you don't want this to happen and want to shift it
 * dynamically, use the Plugin Command "OVERLAY: Change to Preset Color" or
 * "OVERLAY: Change to Custom Color" to change them instead.
 * 
 * ---
 * 
 * Step 2: Create an event with a radial light.
 * 
 * 1. Create a new event on the map.
 * 2. Add a "Comment" event to the event (you can use the notebox, too, but
 *    it's tiny, and the comment box is more visible).
 * 3. Inside the comment (or notebox), add in the following tags:
 * 
 *    <Radial Light Color: Light Yellow>
 *    <Radial Light Radius: 100>
 *    <Radial Light Intensity: 25%>
 *    <Radial Light Opacity: 50%>
 * 
 * 4. You can leave any of them out, but these four are selected as the main
 *    notetags to use to adjust how radial lights behave.
 * 5. For more information on the types of settings you can apply to radial
 *    lights, look in the help file.
 * 6. Let's see how this looks in-game!
 * 7. Save the game project.
 * 8. Let's test it out!
 * 
 * ---
 * 
 * Step 3: Play Test! Checking out the Radial Light!
 * 
 * 1. You should notice that the screen is darker than normal with the "Night"
 *    color as the darkness overlay.
 * 2. Find the event you've made. It should be emitting a light.
 * 3. The player, by default, assuming that no other Plugin Parameters have
 *    been changed, should also be emitting a faint light and has a conical
 *    light on, too.
 * 4. Everything working? Awesome, let's create an event with a conical light
 *    this time.
 * 
 * ---
 * 
 * Step 4: Create an event with a conical light.
 * 
 * 1. Create another new event on the map.
 * 2. Add a "Comment" event to the event (once again, you can use the notebox,
 *    too if you want but we prefer the larger comment box).
 * 3. Inside the comment (or notebox), add in the following tags:
 * 
 *    <Conical Light Color: Light Yellow>
 *    <Conical Light Radius: 300>
 *    <Conical Light Source Radius: 40>
 *    <Conical Light Intensity: 25%>
 *    <Conical Light Opacity: 80%>
 * 
 * 4. You can leave any of the above out, but these are the usual suspects when
 *    applying a conical light to an event.
 * 5. The "Source Radius" notetag refers to the light source point from which
 *    the conical light extends out of.
 * 6. For more information on the types of settings you can apply to radial
 *    lights, look in the help file.
 * 7. Let's see how this looks in-game!
 * 8. Save the game project.
 * 9. Let's test it out!
 * 
 * ---
 * 
 * Step 5: Play Test! Checking out the Conical Light!
 * 
 * 1. Look for the new event you've made. It should be holding a conical light,
 *    similar to your player.
 * 2. Conical lights will face whatever direction its user is facing.
 * 3. By default, the source point should be coming from the user's hand.
 * 4. This can be changed via notetags, Plugin Parameters, or Plugin Commands.
 * 5. Look in the help file for more information.
 * 6. The lights look kinda boring the way they are though. Let's give them
 *    some typical light behaviors.
 * 
 * ---
 * 
 * Step 6: Applying Behaviors
 * 
 * 1. Open your first event with the radial light and add these tags:
 * 
 *    <Radial Light Blink Rate: 3%>
 *    <Radial Light Pulse Rate: 20%>
 * 
 * 2. This will cause the radial light tied to this event to change slightly
 *    while waiting. This imitates how certain light bulbs work although there
 *    are other patterns you can use.
 * 3. Look in the help file for more behavior notetags you can use.
 * 4. Let's modify the conical light event and add these tags:
 * 
 *    <Conical Light Flicker Rate: 2%>
 *    <Conical Light Glow Rate: 10%>
 * 
 * 5. This will cause the conical light tied to this event to also change ever
 *    so slightly while waiting. Like with the other, this also imitates how
 *    flash bulbs work although there are other pattners you can use.
 * 6. Check the help file out for more behavior types to use with these lights.
 * 7. Let's see how this looks in-game!
 * 8. Save the game project.
 * 9. Let's test it out!
 * 
 * ---
 * 
 * Step 7: Play Test! Checking out Light Behaviors!
 * 
 * 1. Find the two events you've altered.
 * 2. You'll notice that the lights don't stay static the way they are. One
 *    will pulse back and forth while the other will have its opacity oscillate
 *    down and back up.
 * 3. Lighting behaviors make the atmosphere less boring even if nothing is
 *    happening on screen.
 * 4. These behaviors extend to blinking, flickering, flashing, flares, glows,
 *    pulses, and even custom patterns.
 * 5. For more information, check out the help file.
 * 
 * ---
 * 
 * And with that, you should have a better grasp on a few of the things the
 * Lighting Effects plugin is capable of.
 * 
 * ---
 *
 * ============================================================================
 * Keeping FPS Stable
 * ============================================================================
 * 
 * As this is a plugin that adds special effects to your game, you do have to
 * be mindful about how you use the various Lighting Effects features or else
 * your game will face FPS drops.
 *
 * ---
 * 
 * Here are a few things to keep in mind:
 * 
 * 1. Lighting Effects work best on small to medium sized maps. Anything below
 *    72x72 tiles in size is ideal. This also puts less stress on RPG Maker MZ
 *    even if you aren't using Lighting Effects for that map as there are less
 *    tiles to process in regards to the tilemap shader.
 * 
 * 2. Don't go overboard with Lighting Effect events. The more events there are
 *    for lighting effects, the more the player's GPU will act up. Keep the
 *    event count low and there will be less FPS drops. Anything below 80
 *    events is ideal. However, performances may vary on different computers.
 *    This is also a good practice to keep in mind for maps that aren't using
 *    Lighting Effects either.
 * 
 * 3. Keep spawned lights to a minimum. Generally speaking, anything under 128
 *    spawned lights on a map at a time is a good metric to keep in mind.
 *    However, performances may vary on different computers.
 * 
 * ---
 * 
 * We are NOT responsible for irresponsible usage of this plugin that pushes
 * graphical processing to their absolute limitations.
 * 
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 * 
 * VisuMZ_1_BattleCore
 * 
 * Without the VisuStella MZ Battle Core installed in the same project, there
 * will be no darkness overlay in battle and as such, no lighting effects. The
 * Battle Core provides the needed architecture for lighting effects to go
 * through properly.
 * 
 * ---
 * 
 * VisuMZ_2_WeatherEffects
 * 
 * Weather patterns placed on the lower layer will be affected by the darkness
 * overlay that the VisuStella MZ Lighting Effects plugin utilizes. This means
 * that even the supposively "brighter" weather patterns will be dimmed out
 * (such as the Flame Wall or Aurora to name a few). To deal with this, use the
 * Lighting Effects plugin's "Auto-Light Regions" and mark the parallax visible
 * tiles with those said regions.
 * 
 * Weather patterns placed on the upper layer will not be affected by the
 * darkness overlay in order to allow the weather have better contrast in
 * addition to following RPG Maker MZ's decision to not have weather affected
 * by tints either. If you want to tint the upper layer weather, you can add
 * the tint manually through the weather pattern's custom Image Settings and
 * apply a hue.
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
 * === Auto-Tint-Related Notetags ===
 * 
 * ---
 *
 * <Auto-Tint: Normal>
 * <Auto-Tint: Dark>
 * <Auto-Tint: Sepia>
 * <Auto-Tint: Sunset>
 * <Auto-Tint: Night>
 *
 * - Used for: Map Notetags
 * - Automatically tints the screen upon map entry with a preset tone.
 * - Screen tint preset values are based on RPG Maker MZ's default presets.
 * - Keep in minds that lights do not pierce through tones.
 *
 * ---
 *
 * <Auto-Tint: r, g, b, k>
 *
 * - Used for: Map Notetags
 * - Automatically tints the screen upon map entry with a custom tone.
 * - Replace 'r' with a number representing the red tone value (-255 to 255).
 * - Replace 'g' with a number representing the green tone value (-255 to 255).
 * - Replace 'b' with a number representing the blue tone value (-255 to 255).
 * - Replace 'k' with a number representing the grey tone value (0 to 255).
 * - Values that exceed -255 or 255 will be automatically timmed down.
 * - Grey values that are negative will have their absolute value taken of.
 * - Keep in minds that lights do not pierce through tones.
 *
 * ---
 * 
 * === Darkness Overlay-Related Notetags ===
 * 
 * ---
 * 
 * <Overlay: name>
 * 
 * - Used for: Map Notetags
 * - Applies a darkness overlay to the map that lights can penetrate through.
 * - Replace 'name' with any of the following preset names:
 *   - Normal, Dawn, Day, Dusk, Night
 *   - White, Black, Red, Orange, Yellow, Green, Cyan, Blue, Purple, Magenta,
 *     Pink, Brown
 *   - Light Red, Light Orange, Light Yellow, Light Green, Light Cyan,
 *     Light Blue, Light Purple, Light Magenta, Light Pink, Light Brown
 *   - Dark Red, Dark Orange, Dark Yellow, Dark Green, Dark Cyan,
 *     Dark Blue, Dark Purple, Dark Magenta, Dark Pink, Dark Brown
 * - Some of the above presets automatically adjust opacity levels to certain
 *   values. Otherwise, they will be at 255.
 * 
 * ---
 * 
 * <Overlay Color: #rrggbb>
 * 
 * - Used for: Map Notetags
 * - Applies a darkness overlay using a custom color.
 * - Replace 'rr' with a hexadecimal value for red.
 * - Replace 'gg' with a hexadecimal value for green.
 * - Replace 'bb' with a hexadecimal value for blue.
 * - Leave the '#' in place.
 * - If you are unsure of what hexadecimal value your color is, please use an
 *   online site like: https://htmlcolorcodes.com/
 * - These settings do not adjust opacity levels.
 * 
 * ---
 * 
 * <Overlay Opacity: x>
 * 
 * - Used for: Map Notetags
 * - Adjusts the darkness overlay's opacity level.
 * - Replace 'x' with a number value from 0 to 255, where 0 is transparent
 *   and 255 is opaque.
 * 
 * ---
 * 
 * <Overlay Opacity: x%>
 * 
 * - Used for: Map Notetags
 * - Adjusts the darkness overlay's opacity level by rate.
 * - Replace 'x' with a number value from 0 to 100, where 0% is transparent
 *   and 100% is opaque.
 * 
 * ---
 * 
 * <No Overlay>
 * 
 * - Used for: Map Notetags
 * - For the maps where you don't want there to be any overlay, but you don't
 *   want this to affect the other maps using them.
 * 
 * ---
 * 
 * === Anti-Light-Related Notetags ===
 * 
 * ---
 * 
 * <Hard Anti-Light Region: x>
 * <Hard Anti-Light Regions: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Tiles marked by these regions won't have any light shown on them.
 *   - This will use hard edges.
 *   - This will override the settings found in the Plugin Parameters.
 *   - If this notetag is not used, use the settings in the Plugin Parameters
 *     instead for the map.
 *   - This does NOT work with looping maps.
 * - This does NOT block light from going to the other side. If the light
 *   radius is large enough, it will pierce through to the other side. It just
 *   won't be visible on the region marked tiles.
 * - Replace 'x' with a number representing the region ID to function as an
 *   anti-light tile marker.
 *   - You cannot use region 0. Use a number from 1 to 255 instead.
 * 
 * ---
 * 
 * <Hard Anti-Light Terrain Tag: x>
 * <Hard Anti-Light Terrain Tags: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Tiles marked by these terrain tags won't have any light shown on them.
 *   - This will use hard edges.
 *   - This will override the settings found in the Plugin Parameters.
 *   - If this notetag is not used, use the settings in the Plugin Parameters
 *     instead for the map.
 *   - This does NOT work with looping maps.
 * - This does NOT block light from going to the other side. If the light
 *   radius is large enough, it will pierce through to the other side. It just
 *   won't be visible on the terrain tag marked tiles.
 * - Replace 'x' with a number representing the terrain tag to function as an
 *   anti-light tile marker.
 *   - You cannot use terrain tag 0. Use a number from 1 to 7 instead.
 * 
 * ---
 * 
 * <Soft Anti-Light Region: x>
 * <Soft Anti-Light Regions: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Tiles marked by these regions won't have any light shown on them.
 *   - This will use soft edges.
 *   - This will override the settings found in the Plugin Parameters.
 *   - If this notetag is not used, use the settings in the Plugin Parameters
 *     instead for the map.
 *   - This does NOT work with looping maps.
 * - This does NOT block light from going to the other side. If the light
 *   radius is large enough, it will pierce through to the other side. It just
 *   won't be visible on the region marked tiles.
 * - Replace 'x' with a number representing the region ID to function as an
 *   anti-light tile marker.
 *   - You cannot use region 0. Use a number from 1 to 255 instead.
 * 
 * ---
 * 
 * <Soft Anti-Light Terrain Tag: x>
 * <Soft Anti-Light Terrain Tags: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Tiles marked by these terrain tags won't have any light shown on them.
 *   - This will use soft edges.
 *   - This will override the settings found in the Plugin Parameters.
 *   - If this notetag is not used, use the settings in the Plugin Parameters
 *     instead for the map.
 *   - This does NOT work with looping maps.
 * - This does NOT block light from going to the other side. If the light
 *   radius is large enough, it will pierce through to the other side. It just
 *   won't be visible on the terrain tag marked tiles.
 * - Replace 'x' with a number representing the terrain tag to function as an
 *   anti-light tile marker.
 *   - You cannot use terrain tag 0. Use a number from 1 to 7 instead.
 * 
 * ---
 * 
 * === Radial Light General-Related Notetags ===
 * 
 * Using this notetag will override the default settings found in the Plugin
 * Parameters provided that they are adjusting already present settings.
 * 
 * ---
 * 
 * <Radial Light>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Quick and simple setup to add radial lights to this event.
 * - Using this notetag will enable radial lights for this event.
 * - This will use the default settings found in the Plugin Parameters for
 *   Event Radial Lights.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <No Radial Light>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Disables radial lights for this event.
 * - Primarily used if the default settings for Event Radial Lights would have
 *   the radial light enabled.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Filename: filename>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Uses an image instead of generated radial lights.
 *   - Using this notetag will lock out the usage of generated radial light
 *     notetags found below.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 * - Image will be centered on the target where the center of the image is the
 *   anchor point and will be rotated.
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Color: name>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Creates a generated radial light using a preset color.
 *   - This notetag cannot be used with <Radial Light Filename: filename>.
 * - Replace 'name' with any of the following:
 *   - Normal, Dawn, Day, Dusk, Night
 *   - White, Black, Red, Orange, Yellow, Green, Cyan, Blue, Purple, Magenta,
 *     Pink, Brown
 *   - Light Red, Light Orange, Light Yellow, Light Green, Light Cyan,
 *     Light Blue, Light Purple, Light Magenta, Light Pink, Light Brown
 *   - Dark Red, Dark Orange, Dark Yellow, Dark Green, Dark Cyan,
 *     Dark Blue, Dark Purple, Dark Magenta, Dark Pink, Dark Brown
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Color: #rrggbb>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Creates a generated radial light using a custom color.
 *   - This notetag cannot be used with <Radial Light Filename: filename>.
 * - Replace 'rr' with a hexadecimal value for red.
 * - Replace 'gg' with a hexadecimal value for green.
 * - Replace 'bb' with a hexadecimal value for blue.
 * - Leave the '#' in place.
 * - If you are unsure of what hexadecimal value your color is, please use an
 *   online site like: https://htmlcolorcodes.com/
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Radius: r>
 * <Radial Light Diameter: d>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Determines the radius/diameter of the generated radial light.
 *   - This notetag cannot be used with <Radial Light Filename: filename>.
 * - Replace 'r' with a number representing the pixel radius of the generated
 *   radial light.
 * - Replace 'd' with a number representing the pixel diameter of the generated
 *   radial light.
 * - Use one or the other.
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 *   - If this notetag is used, this will disable the "Auto-Calc Radius" Plugin
 *     Parameter for this specific actor/enemy.
 * 
 * ---
 * 
 * <Radial Light Intensity: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Determines the light intensity of the generated radial light.
 *   - This notetag cannot be used with <Radial Light Filename: filename>.
 *   - Intensity determines how much of the light's luminosity extends outwards
 *     at full strength between fading away.
 * - Replace 'x' with a number between 0 and 100 representing the intensity
 *   percentage for the generated radial light.
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Angle: x>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Determines the initial angle of the generated radial light.
 *   - Can be used with both image and generated radial lights.
 *   - Best used with the <Radial Light Filename: filename> notetag in order to
 *     see any changes.
 * - Replace 'x' with a number between 0 and 360 representing the angle.
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Rotate Speed: +x>
 * <Radial Light Rotate Speed: -x>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Determines the speed at which the radial light rotates.
 *   - Can be used with both image and generated radial lights.
 *   - Best used with the <Radial Light Filename: filename> notetag in order to
 *     see any changes.
 * - Replace 'x' with a number representing how slow (smaller numbers) or fast
 *   (larger numbers) the light rotates.
 *   - Use negative numbers for a reverser rotation going counter-clockwise.
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Blend Mode: Normal>
 * <Radial Light Blend Mode: Additive>
 * <Radial Light Blend Mode: Multiply>
 * <Radial Light Blend Mode: Screen>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Changes the blend mode of the radial light.
 *   - Can be used with both image and generated radial lights.
 *   - We recommend that you use 'screen'.
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Opacity: x>
 * <Radial Light Opacity: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Changes the opacity level of the radial light.
 *   - Can be used with both image and generated radial lights.
 *   - The opacity of a light determines how bright (larger numbers) or dim
 *     (smaller numbers) it is.
 * - Replace 'x' with a number between 0 and 255 to determine how dim (smaller
 *   numbers) or bright (larger numbers) the light is.
 * - Replace 'x%' with a percentage between 0% and 100% to determine how
 *   dim (smaller numbers) or bright (larger numbers) the light is.
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Offset: +x, +y>
 * <Radial Light Offset: -x, -y>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Offsets the position of the radial light, which is normally centered on
 *   the sprite it is coming from.
 *   - Can be used with both image and generated radial lights.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the radial light's x and y coordinates by.
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * === Radial Light Behavior-Related Notetags ===
 * 
 * Using this notetag will override the default settings found in the Plugin
 * Parameters provided that they are adjusting already present settings.
 * 
 * ---
 * 
 * <Radial Light Blink Rate: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts the frequency at which the radial light will blink.
 * - Replace 'x' with a percentage representing the frequency.
 *   - Lower numbers mean less frequent.
 *   - Higher numbers mean more frequent.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Blink Modifier: +x%>
 * <Radial Light Blink Modifier: -x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts a static multiplicative opacity modifier at which lights will
 *   become brighter (+) or dimmer (-) when flashing.
 * - Replace 'x' with a percentage representing the static multiplier increase.
 *   - Positive numbers mean brighter.
 *   - Negative numbers mean dimmer.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Flicker Rate: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts the frequency at which the radial light will flicker.
 * - Replace 'x' with a percentage representing the frequency.
 *   - Lower numbers mean less frequent.
 *   - Higher numbers mean more frequent.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Flicker Modifier: +x%>
 * <Radial Light Flicker Modifier: -x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts a randomized multiplicative opacity modifier at which lights will
 *   become brighter (+) or dimmer (-) when flashing.
 * - Replace 'x' with a percentage representing the randomized multiplier
 *   increase.
 *   - Randomized multiplier will range anywhere from 0 to the number itself.
 *   - Positive numbers mean brighter.
 *   - Negative numbers mean dimmer.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Flash Rate: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts the frequency at which the radial light will flash.
 * - Replace 'x' with a percentage representing the frequency.
 *   - Lower numbers mean less frequent.
 *   - Higher numbers mean more frequent.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * - Must be used with a lower opacity setting.
 *   - Use with <Radial Light Opacity: x%> notetag.
 *   - If <Radial Light Opacity: x%> is not used, default to 50%.
 * 
 * ---
 * 
 * <Radial Light Flash Modifier: +x%>
 * <Radial Light Flash Modifier: -x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts a static additive opacity modifier at which lights will become
 *   brighter (+) or dimmer (-) when flashing.
 * - Replace 'x' with a percentage representing the static additional change.
 *   - Positive numbers mean brighter.
 *   - Negative numbers mean dimmer.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Flare Rate: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts the frequency at which the radial light will flare.
 * - Replace 'x' with a percentage representing the frequency.
 *   - Lower numbers mean less frequent.
 *   - Higher numbers mean more frequent.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * - Must be used with a lower opacity setting.
 *   - Use with <Radial Light Opacity: x%> notetag.
 *   - If <Radial Light Opacity: x%> is not used, default to 50%.
 * 
 * ---
 * 
 * <Radial Light Flare Modifier: +x%>
 * <Radial Light Flare Modifier: -x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts a randomized additive opacity modifier at which lights will become
 *   brighter (+) or dimmer (-) when flaring up.
 * - Replace 'x' with a percentage representing the randomized multiplier
 *   increase.
 *   - Randomized multiplier will range anywhere from 0 to the number itself.
 *   - Positive numbers mean brighter.
 *   - Negative numbers mean dimmer.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Glow Rate: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts how much the radial light will oscillate its brightness back and
 *   forth in a glow-like fashion.
 * - Replace 'x' with a percentage representing the change in brightness.
 *   - Lower numbers mean less fluctuation.
 *   - Higher numbers mean more fluctuation.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Glow Speed: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts the speed at which the glow oscillates back and forth.
 * - Replace 'x' with a percentage representing the speed.
 *   - Lower numbers mean slower.
 *   - Higher numbers mean faster.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Glow Random>
 * <Radial Light Glow No Random>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adds a random seed (or not) to the glow oscillation. This can be used to
 *   put multiple lights glowing at different starting points.
 * - This is used to offset the default RNG settings found in the default
 *   Plugin Parameters.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Pulse Rate: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts how much the radial light will oscillate its radius back and
 *   forth in a pulse-like fashion.
 * - Replace 'x' with a percentage representing the change in size.
 *   - Lower numbers mean less shrinking.
 *   - Higher numbers mean more shrinking.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Pulse Speed: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts the speed at which the pulse oscillates back and forth.
 * - Replace 'x' with a percentage representing the speed.
 *   - Lower numbers mean slower.
 *   - Higher numbers mean faster.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Pulse Random>
 * <Radial Light Pulse No Random>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adds a random seed (or not) to the pulse oscillation. This can be used to
 *   put multiple lights pulsing at different starting points.
 * - This is used to offset the default RNG settings found in the default
 *   Plugin Parameters.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Pattern Type: name>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Uses a premade pattern by this plugin. The pattern will change the
 *   brightness of the light in a sequenced pattern.
 * - Replace 'name' with any of the following text:
 *   - none, normal
 *   - fluorescent, halogen, incandescent
 *   - candle, torch, campfire
 *   - fast strobe, slow strobe
 *   - strong pulse, medium pulse, slow pulse
 *   - underwater
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Custom Pattern: x>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Uses a custom pattern determined by you, the game dev, on how the light's
 *   brightness will change over time.
 * - Replace 'x' with letters of the alphabet from 'a' to 'z'.
 *   - 'a' is completely transparent.
 *   - 'm' is midway in brightness.
 *   - 'z' is the brightest the light can be.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * - Examples:
 *   - <Radial Light Custom Pattern: mmmmmaaaaammmmmaaaaaabcdefgabcdefg>
 *   - <Radial Light Custom Pattern: nmonqnmomnmomomno>
 *   - <Radial Light Custom Pattern: abcdefghijklmnopqrrqponmlkjihgfedcba>
 * 
 * ---
 * 
 * <Radial Light Pattern Delay: x>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Determines how many frames to wait before going to the next part of the
 *   preset pattern and/or custom pattern.
 * - Replace 'x' with a number representing the frames the radial light needs
 *   to wait before moving forward in the pattern.
 *   - Lower numbers mean faster (minimum: 1).
 *   - Higher numbers mean slower.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * === Conical Light General-Related Notetags ===
 * 
 * Using this notetag will override the default settings found in the Plugin
 * Parameters provided that they are adjusting already present settings.
 * 
 * ---
 * 
 * <Conical Light>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Quick and simple setup to add conical lights to this event.
 * - Using this notetag will enable conical lights for this event.
 * - This will use the default settings found in the Plugin Parameters for
 *   Event Conical Lights.
 * 
 * ---
 * 
 * <No Conical Light>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Disables conical lights for this event.
 * - Primarily used if the default settings for Event Conical Lights would have
 *   the conical light enabled.
 * 
 * ---
 * 
 * <Conical Light Filename: filename>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Uses an image instead of generated conical lights.
 *   - Using this notetag will lock out the usage of generated conical light
 *     notetags found below.
 *   - By default, you should have your conical light image face the right at
 *     "0 degrees".
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light File Angle Offset: +x>
 * <Conical Light File Angle Offset: -x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Determines how much to offset the angle of the conical light image by.
 * - Replace 'x' with a number from 0 to 360 representing the angle offset.
 *   - Negatives are allowed in order to quickly go the other way.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light File Anchor: x, y>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Determine the anchor points for the conical light image.
 * - Replace 'x' and 'y' with numbers between 0 and 1.
 *   - For x: 0.0 is left-aligned, 0.5 is center-aligned, 1.0 is right-aligned.
 *   - For y: 0.0 is top-aligned, 0.5 is middle-aligned, 1.0 is bottom-aligned.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Color: name>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Creates a generated conical light using a preset color.
 *   - This notetag cannot be used with <Conical Light Filename: filename>.
 * - Replace 'name' with any of the following:
 *   - Normal, Dawn, Day, Dusk, Night
 *   - White, Black, Red, Orange, Yellow, Green, Cyan, Blue, Purple, Magenta,
 *     Pink, Brown
 *   - Light Red, Light Orange, Light Yellow, Light Green, Light Cyan,
 *     Light Blue, Light Purple, Light Magenta, Light Pink, Light Brown
 *   - Dark Red, Dark Orange, Dark Yellow, Dark Green, Dark Cyan,
 *     Dark Blue, Dark Purple, Dark Magenta, Dark Pink, Dark Brown
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Color: #rrggbb>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Creates a generated conical light using a custom color.
 *   - This notetag cannot be used with <Conical Light Filename: filename>.
 * - Replace 'rr' with a hexadecimal value for red.
 * - Replace 'gg' with a hexadecimal value for green.
 * - Replace 'bb' with a hexadecimal value for blue.
 * - Leave the '#' in place.
 * - If you are unsure of what hexadecimal value your color is, please use an
 *   online site like: https://htmlcolorcodes.com/
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Radius: r>
 * <Conical Light Diameter: d>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Determines the radius/diameter of the generated conical light.
 *   - This notetag cannot be used with <Conical Light Filename: filename>.
 * - Replace 'r' with a number representing the pixel radius of the generated
 *   conical light.
 * - Replace 'd' with a number representing the pixel diameter of the generated
 *   conical light.
 * - Use one or the other.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Source Radius: r>
 * <Conical Light Source Diameter: d>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Determines the radius/diameter of the generated conical light's light
 *   source, creating a little circle from where the cone starts.
 *   - This notetag cannot be used with <Conical Light Filename: filename>.
 * - Replace 'r' with a number representing the pixel radius of the generated
 *   conical light.
 * - Replace 'd' with a number representing the pixel diameter of the generated
 *   conical light.
 * - Use one or the other.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Intensity: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Determines the light intensity of the generated conical light.
 *   - This notetag cannot be used with <Conical Light Filename: filename>.
 *   - Intensity determines how much of the light's luminosity extends outwards
 *     at full strength between fading away.
 * - Replace 'x' with a number between 0 and 100 representing the intensity
 *   percentage for the generated conical light.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Blend Mode: Normal>
 * <Conical Light Blend Mode: Additive>
 * <Conical Light Blend Mode: Multiply>
 * <Conical Light Blend Mode: Screen>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the blend mode of the conical light.
 *   - Can be used with both image and generated conical lights.
 *   - We recommend that you use 'screen'.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Opacity: x>
 * <Conical Light Opacity: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the opacity level of the conical light.
 *   - Can be used with both image and generated conical lights.
 *   - The opacity of a light determines how bright (larger numbers) or dim
 *     (smaller numbers) it is.
 * - Replace 'x' with a number between 0 and 255 to determine how dim (smaller
 *   numbers) or bright (larger numbers) the light is.
 * - Replace 'x%' with a percentage between 0% and 100% to determine how
 *   dim (smaller numbers) or bright (larger numbers) the light is.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Angle: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Determines the arc angle of the generated conical light.
 *   - The larger the angle, the wider the arc.
 * - Replace 'x' with a number between 0 and 360 representing the angle.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Angle Sway: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Determines how many degrees the light will sway back and forth.
 *   - The larger the angle, the wider the sway.
 * - Replace 'x' with a number between 0 and 360 representing the degrees the
 *   light will sway.
 *   - Use 0 for no sway.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Sway Speed: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Determines how fast the light will sway back and forth.
 * - Replace 'x' with a percentage from 1% to 100%.
 *   - Lower numbers mean slower.
 *   - Higher numbers mean faster.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Sway Random>
 * <Conical Light Sway No Random>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adds a random seed (or not) to the sway oscillation. This can be used to
 *   put multiple lights swaying at different starting points.
 * - This is used to offset the default RNG settings found in the default
 *   Plugin Parameters.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Force Direction: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Forces the conical light to face a certain direction.
 *   - This is primarily used for tile events or direction fixed events that
 *     would otherwise lock a conical light to face a certain direction.
 * - Replace 'x' with any of the following:
 *   - none
 *   - down, left, right, up
 *   - lower left, lower right, upper left, upper right
 * - Use 'none' to remove any forced directions.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Follow Cursor>
 * <Conical Light Not Follow Cursor>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Causes the conical light to face towards the direction of the mouse
 *   cursor if it's within the game client window.
 * - This is used to offset the default settings found in the default
 *   Plugin Parameters.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Hand Offset>
 * <Conical Light Center Offset>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Causes the conical light to follow either the hand-focused offsets or
 *   base the offset at the center of the character.
 * - This is used to offset the default settings found in the default
 *   Plugin Parameters.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Offset: +x, +y>
 * <Conical Light Offset: -x, -y>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Offsets the position of the conical light, which is normally centered on
 *   the sprite it is coming from.
 *   - Can be used with both image and generated conical lights.
 *   - Used with the <Conical Light Center Offset> notetag if the Plugin
 *     Parameters dictate using hand offsets.
 *   - This is NOT used with the <Conical Light Hand Offset> notetag.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the conical light's x and y coordinates by.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light d Pattern p: +x, +y>
 * <Conical Light d Pattern p: -x, -y>
 * <Conical Light d Pattern p: +x, -y>
 * <Conical Light d Pattern p: -x, +y>
 * 
 * - Used for: Actor Notetags, Event Notetags, and Event Page Comment Tags
 * - When using hand-based offsets for the conical light, this will cause the
 *   light source to come from the target's hand instead of their chest/face.
 *   - Used with the <Conical Light Hand Offset> notetag if the Plugin
 *     Parameters dictate using non-hand offsets.
 *   - This is NOT used with the <Conical Light Hand Offset> notetag.
 * - For actors, the light source origin will vary depending on who is in the
 *   lead, in case certain actors may be left or right handed, or if happen to
 *   be a robot that has the light shining from their eyes.
 * - Replace 'd' with text representing the direction the offset is for. Use
 *   any of the directions below:
 *   - down, left, right, up
 *   - lower left, lower right, upper left, upper right
 * - Replace 'p' with a number representing the pattern index. Patterns are
 *   the individual frames used in the sprite when walking.
 *   - By default, RPG Maker MZ sprites have the following patterns:
 *   - Left frame is pattern 0.
 *   - Center frame is pattern 1.
 *   - Right frame is pattern 2.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the conical light's x and y coordinates by.
 * - Examples:
 *   - <Conical Light Down Pattern 0: +12, +14>
 *   - <Conical Light Left Pattern 1: +4, +16>
 *   - <Conical Light Right Pattern 2: -6, +16>
 * 
 * ---
 * 
 * === Conical Light Behavior-Related Notetags ===
 * 
 * Using this notetag will override the default settings found in the Plugin
 * Parameters provided that they are adjusting already present settings.
 * 
 * ---
 * 
 * <Conical Light Blink Rate: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts the frequency at which the conical light will blink.
 * - Replace 'x' with a percentage representing the frequency.
 *   - Lower numbers mean less frequent.
 *   - Higher numbers mean more frequent.
 * 
 * ---
 * 
 * <Conical Light Blink Modifier: +x%>
 * <Conical Light Blink Modifier: -x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts a static multiplicative opacity modifier at which lights will
 *   become brighter (+) or dimmer (-) when flashing.
 * - Replace 'x' with a percentage representing the static multiplier increase.
 *   - Positive numbers mean brighter.
 *   - Negative numbers mean dimmer.
 * 
 * ---
 * 
 * <Conical Light Flicker Rate: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts the frequency at which the conical light will flicker.
 * - Replace 'x' with a percentage representing the frequency.
 *   - Lower numbers mean less frequent.
 *   - Higher numbers mean more frequent.
 * 
 * ---
 * 
 * <Conical Light Flicker Modifier: +x%>
 * <Conical Light Flicker Modifier: -x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts a randomized multiplicative opacity modifier at which lights will
 *   become brighter (+) or dimmer (-) when flashing.
 * - Replace 'x' with a percentage representing the randomized multiplier
 *   increase.
 *   - Randomized multiplier will range anywhere from 0 to the number itself.
 *   - Positive numbers mean brighter.
 *   - Negative numbers mean dimmer.
 * 
 * ---
 * 
 * <Conical Light Flash Rate: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts the frequency at which the conical light will flash.
 * - Replace 'x' with a percentage representing the frequency.
 *   - Lower numbers mean less frequent.
 *   - Higher numbers mean more frequent.
 * - Must be used with a lower opacity setting.
 *   - Use with <Conical Light Opacity: x%> notetag.
 *   - If <Conical Light Opacity: x%> is not used, default to 50%.
 * 
 * ---
 * 
 * <Conical Light Flash Modifier: +x%>
 * <Conical Light Flash Modifier: -x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts a static additive opacity modifier at which lights will become
 *   brighter (+) or dimmer (-) when flashing.
 * - Replace 'x' with a percentage representing the static additional change.
 *   - Positive numbers mean brighter.
 *   - Negative numbers mean dimmer.
 * 
 * ---
 * 
 * <Conical Light Flare Rate: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts the frequency at which the conical light will flare.
 * - Replace 'x' with a percentage representing the frequency.
 *   - Lower numbers mean less frequent.
 *   - Higher numbers mean more frequent.
 * - Must be used with a lower opacity setting.
 *   - Use with <Conical Light Opacity: x%> notetag.
 *   - If <Conical Light Opacity: x%> is not used, default to 50%.
 * 
 * ---
 * 
 * <Conical Light Flare Modifier: +x%>
 * <Conical Light Flare Modifier: -x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts a randomized additive opacity modifier at which lights will become
 *   brighter (+) or dimmer (-) when flaring up.
 * - Replace 'x' with a percentage representing the randomized multiplier
 *   increase.
 *   - Randomized multiplier will range anywhere from 0 to the number itself.
 *   - Positive numbers mean brighter.
 *   - Negative numbers mean dimmer.
 * 
 * ---
 * 
 * <Conical Light Glow Rate: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts how much the conical light will oscillate its brightness back and
 *   forth in a glow-like fashion.
 * - Replace 'x' with a percentage representing the change in brightness.
 *   - Lower numbers mean less fluctuation.
 *   - Higher numbers mean more fluctuation.
 * 
 * ---
 * 
 * <Conical Light Glow Speed: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts the speed at which the glow oscillates back and forth.
 * - Replace 'x' with a percentage representing the speed.
 *   - Lower numbers mean slower.
 *   - Higher numbers mean faster.
 * 
 * ---
 * 
 * <Conical Light Glow Random>
 * <Conical Light Glow No Random>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adds a random seed (or not) to the glow oscillation. This can be used to
 *   put multiple lights glowing at different starting points.
 * - This is used to offset the default RNG settings found in the default
 *   Plugin Parameters.
 * 
 * ---
 * 
 * <Conical Light Pulse Rate: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts how much the conical light will oscillate its radius back and
 *   forth in a pulse-like fashion.
 * - Replace 'x' with a percentage representing the change in size.
 *   - Lower numbers mean less shrinking.
 *   - Higher numbers mean more shrinking.
 * 
 * ---
 * 
 * <Conical Light Pulse Speed: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts the speed at which the pulse oscillates back and forth.
 * - Replace 'x' with a percentage representing the speed.
 *   - Lower numbers mean slower.
 *   - Higher numbers mean faster.
 * 
 * ---
 * 
 * <Conical Light Pulse Random>
 * <Conical Light Pulse No Random>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adds a random seed (or not) to the pulse oscillation. This can be used to
 *   put multiple lights pulsing at different starting points.
 * - This is used to offset the default RNG settings found in the default
 *   Plugin Parameters.
 * 
 * ---
 * 
 * <Conical Light Pattern Type: name>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Uses a premade pattern by this plugin. The pattern will change the
 *   brightness of the light in a sequenced pattern.
 * - Replace 'name' with any of the following text:
 *   - none, normal
 *   - fluorescent, halogen, incandescent
 *   - candle, torch, campfire
 *   - fast strobe, slow strobe
 *   - strong pulse, medium pulse, slow pulse
 *   - underwater
 * 
 * ---
 * 
 * <Conical Light Custom Pattern: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Uses a custom pattern determined by you, the game dev, on how the light's
 *   brightness will change over time.
 * - Replace 'x' with letters of the alphabet from 'a' to 'z'.
 *   - 'a' is completely transparent.
 *   - 'm' is midway in brightness.
 *   - 'z' is the brightest the light can be.
 * - Examples:
 *   - <Conical Light Custom Pattern: mmmmmaaaaammmmmaaaaaabcdefgabcdefg>
 *   - <Conical Light Custom Pattern: nmonqnmomnmomomno>
 *   - <Conical Light Custom Pattern: abcdefghijklmnopqrrqponmlkjihgfedcba>
 * 
 * ---
 * 
 * <Conical Light Pattern Delay: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Determines how many frames to wait before going to the next part of the
 *   preset pattern and/or custom pattern.
 * - Replace 'x' with a number representing the frames the conical light needs
 *   to wait before moving forward in the pattern.
 *   - Lower numbers mean faster (minimum: 1).
 *   - Higher numbers mean slower.
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
 * === Overlay Plugin Commands ===
 * 
 * ---
 * 
 * OVERLAY: Change to Preset Color
 * - Change current darkness overlay to a preset color and opacity level.
 * 
 *   Color: 
 *   - Pick a preset color.
 *   - This will also come with predetermined opacity values.
 * 
 *   Duration:
 *   - What is the duration of the color change?
 * 
 * ---
 * 
 * OVERLAY: Change to Custom Color
 * - Change current darkness overlay to a custom color.
 * 
 *   Color:
 *   - Custom color.
 *   - This uses #rrggbb format.
 *   - Check your color here: https://htmlcolorcodes.com/
 * 
 *   Opacity:
 *   - Opacity level of the color.
 *   - Value between 0-255.
 *   - Transparent: 0. Opaque: 255.
 * 
 *   Duration:
 *   - What is the duration of the color change?
 * 
 * ---
 * 
 * === Battle Light Plugin Commands ===
 * 
 * ---
 * 
 * BATTLE LIGHT: Change Actor(s) Settings
 * - Change the battle-radial light settings for target(s).
 * 
 *   Actor ID(s):
 *   - Target actor(s) you want to change light settings for.
 *   - You may use JavaScript code.
 * 
 *   Settings:
 *   - Change the radial light settings for the target(s).
 * 
 *   Behavior:
 *   - Change the behaviors for this radial light.
 * 
 *   Auto-Calc Radius:
 *   - Automatically calculates the radius size based on sprite's width/height.
 * 
 * ---
 * 
 * BATTLE LIGHT: Change Enemy(s) Settings
 * - Change the battle-radial light settings for target(s).
 * 
 *   Enemy Index(es):
 *   - Select enemy troop index(es) to change light settings for.
 *   - You may use JavaScript code.
 * 
 *   Settings:
 *   - Change the radial light settings for the target(s).
 * 
 *   Behavior:
 *   - Change the behaviors for this radial light.
 * 
 *   Auto-Calc Radius:
 *   - Automatically calculates the radius size based on sprite's width/height.
 * 
 * ---
 * 
 * === Radial Light Plugin Commands ===
 * 
 * ---
 *
 * RADIAL LIGHT: Change Player Settings
 * - Change the radial light settings for the player.
 *
 *   Settings:
 *   - Change the radial light settings for the player.
 *   - See "Radial Light Settings" section below.
 * 
 *   Behavior:
 *   - Change the behaviors for this radial light.
 *   - See "Behavior" section below.
 *
 * ---
 *
 * RADIAL LIGHT: Change Follower Settings
 * - Change the radial light settings for followers.
 *
 *   Settings:
 *   - Change the radial light settings for all followers.
 *   - See "Radial Light Settings" section below.
 * 
 *   Behavior:
 *   - Change the behaviors for this radial light.
 *   - See "Behavior" section below.
 *
 * ---
 *
 * RADIAL LIGHT: Change Event(s) Settings
 * - Change the radial light settings for target event(s).
 *
 *   Event ID(s):
 *   - Target event(s) to have their light settings changed.
 *   - Use 0 for "this event".
 *   - You may use JavaScript code.
 *
 *   Settings:
 *   - Change the radial light settings for target event(s).
 *   - See "Radial Light Settings" section below.
 * 
 *   Behavior:
 *   - Change the behaviors for this radial light.
 *   - See "Behavior" section below.
 *
 * ---
 *
 * RADIAL LIGHT: Change Boat Settings
 * - Change the radial light settings for the boat vehicle.
 * 
 *   Boarded:
 * 
 *     Radial Light:
 *     - Changed radial light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these radial lights?
 * 
 *   Unboarded:
 * 
 *     Radial Light:
 *     - Changed radial light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these radial lights?
 *
 * ---
 *
 * RADIAL LIGHT: Change Ship Settings
 * - Change the radial light settings for the ship vehicle.
 * 
 *   Boarded:
 * 
 *     Radial Light:
 *     - Changed radial light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these radial lights?
 * 
 *   Unboarded:
 * 
 *     Radial Light:
 *     - Changed radial light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these radial lights?
 *
 * ---
 *
 * RADIAL LIGHT: Change Airship Settings
 * - Change the radial light settings for the airship vehicle.
 * 
 *   Boarded:
 * 
 *     Radial Light:
 *     - Changed radial light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these radial lights?
 * 
 *   Unboarded:
 * 
 *     Radial Light:
 *     - Changed radial light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these radial lights?
 *
 * ---
 * 
 * === Conical Light Plugin Commands ===
 * 
 * ---
 *
 * CONICAL LIGHT: Change Player Settings
 * - Change the conical light settings for the player.
 *
 *   Settings:
 *   - Change the conical light settings for the player.
 *   - See "Conical Light Settings" section below.
 * 
 *   Behavior:
 *   - Change the behaviors for this conical light.
 *   - See "Behavior" section below.
 *
 * ---
 *
 * CONICAL LIGHT: Change Follower Settings
 * - Change the conical light settings for followers.
 *
 *   Settings:
 *   - Change the conical light settings for all followers.
 *   - See "Conical Light Settings" section below.
 * 
 *   Behavior:
 *   - Change the behaviors for this conical light.
 *   - See "Behavior" section below.
 *
 * ---
 *
 * CONICAL LIGHT: Change Event(s) Settings
 * - Change the conical light settings for target event(s).
 *
 *   Event ID(s):
 *   - Target event(s) to have their light settings changed.
 *   - Use 0 for "this event".
 *   - You may use JavaScript code.
 *
 *   Settings:
 *   - Change the conical light settings for target event(s).
 *   - See "Conical Light Settings" section below.
 * 
 *   Behavior:
 *   - Change the behaviors for this conical light.
 *   - See "Behavior" section below.
 *
 * ---
 *
 * CONICAL LIGHT: Change Boat Settings
 * - Change the conical light settings for the boat vehicle.
 * 
 *   Boarded:
 * 
 *     Conical Light:
 *     - Changed conical light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these conical lights?
 * 
 *   Unboarded:
 * 
 *     Conical Light:
 *     - Changed conical light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these conical lights?
 *
 * ---
 *
 * CONICAL LIGHT: Change Ship Settings
 * - Change the conical light settings for the ship vehicle.
 * 
 *   Boarded:
 * 
 *     Conical Light:
 *     - Changed conical light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these conical lights?
 * 
 *   Unboarded:
 * 
 *     Conical Light:
 *     - Changed conical light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these conical lights?
 *
 * ---
 *
 * CONICAL LIGHT: Change Airship Settings
 * - Change the conical light settings for the airship vehicle.
 * 
 *   Boarded:
 * 
 *     Conical Light:
 *     - Changed conical light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these conical lights?
 * 
 *   Unboarded:
 * 
 *     Conical Light:
 *     - Changed conical light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these radial lights?
 *
 * ---
 * 
 * === Conical Offset Plugin Commands ===
 * 
 * ---
 * 
 * CONICAL OFFSET: Change Actor(s) Settings
 * - Change the conical light hand offset for target actor(s).
 * 
 *   Actor ID(s):
 *   - Target actor(s) you want to change offset settings for.
 *   - You may use JavaScript code.
 * 
 *   Enable:
 *   - Change the offset settings for the target(s).
 * 
 *   Hand Position Offsets:
 *   - Change target(s)'s offsets used for hand positions.
 * 
 *   VS8 Dash Offsets:
 *   - Change target(s)'s offsets used for hand positions for VS8 sprites
 *     while dashing.
 * 
 *   VS8 Jump Offsets:
 *   - Change target(s)'s offsets used for hand positions for VS8 sprites
 *     while jumping.
 * 
 * ---
 * 
 * CONICAL OFFSET: Change Event(s) Settings
 * - Change the conical light hand offset for target event(s).
 * 
 *   Event ID(s):
 *   - Target event(s) you want to change offset settings for.
 *   - Use 0 for "this event".
 *   - You may use JavaScript code.
 * 
 *   Enable:
 *   - Change the offset settings for the target(s).
 * 
 *   Hand Position Offsets:
 *   - Change target(s)'s offsets used for hand positions.
 * 
 *   VS8 Dash Offsets:
 *   - Change target(s)'s offsets used for hand positions for VS8 sprites
 *     while dashing.
 * 
 *   VS8 Jump Offsets:
 *   - Change target(s)'s offsets used for hand positions for VS8 sprites
 *     while jumping.
 * 
 * ---
 *
 * CONICAL LIGHT: Change Ship Settings
 * - Change the conical light hand offset for the Ship vehicle.
 * 
 *   Boarded:
 * 
 *     Changed Offsets:
 *     - Changed offsets used for the "hand" positions of this vehicle.
 * 
 *   Unboarded:
 * 
 *     Changed Offsets:
 *     - Changed offsets used for the "hand" positions of this vehicle.
 *
 * ---
 *
 * CONICAL LIGHT: Change Airship Settings
 * - Change the conical light hand offset for the airship vehicle.
 * 
 *   Boarded:
 * 
 *     Changed Offsets:
 *     - Changed offsets used for the "hand" positions of this vehicle.
 * 
 *   Unboarded:
 * 
 *     Changed Offsets:
 *     - Changed offsets used for the "hand" positions of this vehicle.
 *
 * ---
 *
 * CONICAL LIGHT: Change Boat Settings
 * - Change the conical light hand offset for the boat vehicle.
 * 
 *   Boarded:
 * 
 *     Changed Offsets:
 *     - Changed offsets used for the "hand" positions of this vehicle.
 * 
 *   Unboarded:
 * 
 *     Changed Offsets:
 *     - Changed offsets used for the "hand" positions of this vehicle.
 *
 * ---
 * 
 * === Spawn Light Plugin Commands ===
 * 
 * ---
 * 
 * SPAWN LIGHT: Create Light(s) at Map X/Y
 * - Map only!
 * - Create new light spawn(s) locked to the map.
 * - Use tile coordinates for X and Y.
 * 
 *   Light Settings:
 * 
 *     Settings:
 *     - Change the radial light settings for the light spawn(s).
 * 
 *     Bheavior:
 *     - Change the behaviors for the light spawn(s).
 * 
 *   Coordinates X/Y:
 * 
 *     Origin X:
 *     Origin Y:
 *     - What is the origin X/Y position?
 *     - You may use JavaScript code.
 * 
 *   Spawn Settings:
 * 
 *     JS: Trajectory:
 *     - Code used to determine the trajectory of these lights.
 *     - These will revolve around the origin X/Y position.
 * 
 *     Initial Time:
 *     - What is the initial time value for this light spawn(s)?
 *     - You may use JavaScript code.
 * 
 *       Total Spawns:
 *       - How many light spawns should there be?
 *       - Minimum value: 1.
 *       - You may use JavaScript code.
 * 
 *       Time Increment:
 *       - What is the time increment between spawns?
 * 
 *     Expiration Timer:
 *     - After how many frames will light spawn(s) expire?
 *     - Use 0 for no expiration.
 *     - You may use JavaScript code.
 * 
 * ---
 * 
 * SPAWN LIGHT: Create Light(s) at Screen X/Y
 * - Map only!
 * - Create new light spawn(s) locked to the screen.
 * - The light spawn(s) is unaffected by map scrolling.
 * 
 *   Light Settings:
 * 
 *     Settings:
 *     - Change the radial light settings for the light spawn(s).
 * 
 *     Bheavior:
 *     - Change the behaviors for the light spawn(s).
 * 
 *   Coordinates X/Y:
 * 
 *     Origin X:
 *     Origin Y:
 *     - What is the origin X/Y position?
 *     - You may use JavaScript code.
 * 
 *   Spawn Settings:
 * 
 *     JS: Trajectory:
 *     - Code used to determine the trajectory of these lights.
 *     - These will revolve around the origin X/Y position.
 * 
 *     Initial Time:
 *     - What is the initial time value for this light spawn(s)?
 *     - You may use JavaScript code.
 * 
 *       Total Spawns:
 *       - How many light spawns should there be?
 *       - Minimum value: 1.
 *       - You may use JavaScript code.
 * 
 *       Time Increment:
 *       - What is the time increment between spawns?
 * 
 *     Expiration Timer:
 *     - After how many frames will light spawn(s) expire?
 *     - Use 0 for no expiration.
 *     - You may use JavaScript code.
 * 
 * ---
 * 
 * SPAWN LIGHT: Create Light(s) on Player
 * - Map only!
 * - Create new light spawn(s) following the player.
 * - The light spawn(s) is unaffected by map scrolling.
 * 
 *   Light Settings:
 * 
 *     Settings:
 *     - Change the radial light settings for the light spawn(s).
 * 
 *     Bheavior:
 *     - Change the behaviors for the light spawn(s).
 * 
 *   Spawn Settings:
 * 
 *     JS: Trajectory:
 *     - Code used to determine the trajectory of these lights.
 *     - These will revolve around the origin X/Y position.
 * 
 *     Initial Time:
 *     - What is the initial time value for this light spawn(s)?
 *     - You may use JavaScript code.
 * 
 *       Total Spawns:
 *       - How many light spawns should there be?
 *       - Minimum value: 1.
 *       - You may use JavaScript code.
 * 
 *       Time Increment:
 *       - What is the time increment between spawns?
 * 
 *     Expiration Timer:
 *     - After how many frames will light spawn(s) expire?
 *     - Use 0 for no expiration.
 *     - You may use JavaScript code.
 * 
 * ---
 * 
 * SPAWN LIGHT: Create Light(s) on Follower
 * - Map only!
 * - Create new light spawn(s) following the player.
 * - The light spawn(s) is unaffected by map scrolling.
 * 
 *   Light Settings:
 * 
 *     Settings:
 *     - Change the radial light settings for the light spawn(s).
 * 
 *     Bheavior:
 *     - Change the behaviors for the light spawn(s).
 * 
 *   Target:
 * 
 *     Follower Index:
 *     - Which follower index should the light(s) follow?
 *     - Index starts at 0.
 *     - You may use JavaScript code.
 * 
 *   Spawn Settings:
 * 
 *     JS: Trajectory:
 *     - Code used to determine the trajectory of these lights.
 *     - These will revolve around the origin X/Y position.
 * 
 *     Initial Time:
 *     - What is the initial time value for this light spawn(s)?
 *     - You may use JavaScript code.
 * 
 *       Total Spawns:
 *       - How many light spawns should there be?
 *       - Minimum value: 1.
 *       - You may use JavaScript code.
 * 
 *       Time Increment:
 *       - What is the time increment between spawns?
 * 
 *     Expiration Timer:
 *     - After how many frames will light spawn(s) expire?
 *     - Use 0 for no expiration.
 *     - You may use JavaScript code.
 * 
 * ---
 * 
 * SPAWN LIGHT: Create Light(s) on Event
 * - Map only!
 * - Create new light spawn(s) following the player.
 * - The light spawn(s) is unaffected by map scrolling.
 * 
 *   Light Settings:
 * 
 *     Settings:
 *     - Change the radial light settings for the light spawn(s).
 * 
 *     Bheavior:
 *     - Change the behaviors for the light spawn(s).
 * 
 *   Target:
 * 
 *     Event ID:
 *     - Which map event should the light(s) follow?
 *     - Use 0 for "this event".
 *     - You may use JavaScript code.
 * 
 *   Spawn Settings:
 * 
 *     JS: Trajectory:
 *     - Code used to determine the trajectory of these lights.
 *     - These will revolve around the origin X/Y position.
 * 
 *     Initial Time:
 *     - What is the initial time value for this light spawn(s)?
 *     - You may use JavaScript code.
 * 
 *       Total Spawns:
 *       - How many light spawns should there be?
 *       - Minimum value: 1.
 *       - You may use JavaScript code.
 * 
 *       Time Increment:
 *       - What is the time increment between spawns?
 * 
 *     Expiration Timer:
 *     - After how many frames will light spawn(s) expire?
 *     - Use 0 for no expiration.
 *     - You may use JavaScript code.
 * 
 * ---
 * 
 * === Light-Related Sub Settings ===
 * 
 * ---
 * 
 * Radial Light Settings
 * 
 *   General:
 * 
 *     Enabled?:
 *     - Is this radial light enabled?
 * 
 *   Properties:
 * 
 *     Filename:
 *     - Filename used for the light effect image.
 *     - If used, ignore Color, Radius, and Intensity.
 *     - Image will be centered on the target where the center of the image is
 *       the anchor point and will be rotated.
 * 
 *     Color:
 *     - Color of the radial light in #rrggbb format.
 *     - For generated lights only.
 *     - Ignore if using image.
 * 
 *     Radius:
 *     - What is the radius of this radial light?
 *     - For generated lights only.
 *     - Ignore if using image.
 * 
 *     Intensity:
 *     - Radial light intensity. Use value between 0 & 1.
 *     - For generated lights only.
 *     - Ignore if using image.
 * 
 *   Optional:
 * 
 *     Angle:
 *     - What is the angle of this radial light?
 *     - Only noticeable with using images.
 * 
 *       Rotate Speed:
 *       - The rotation speed of this light?
 *       - Lower: slower. Higher: faster. Negative: reverse.
 * 
 *     Blend Mode:
 *     - What kind of blend mode do you wish to apply to the radial light?
 * 
 *     Opacity:
 *     - What is the opacity (0 to 255)?
 *     - Lower: dimmer. Higher: Brighter.
 * 
 *   Offsets:
 * 
 *     Offset X:
 *     - Offset the X position of this light.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - Offset the Y position of this light.
 *     - Negative: up. Positive: down.
 * 
 * ---
 * 
 * Conical Light Settings
 * 
 *   General:
 *   
 *     Enabled?:
 *     - Is this conical light enabled?
 * 
 *   Properties:
 * 
 *     Filename:
 *     - Filename used for the light effect image.
 *     - If used, ignore Radius, Color, and Intensity.
 * 
 *       Angle Offset:
 *       - Offset the image angle by this many degrees.
 *       - Only applies to images.
 * 
 *       File Anchor X:
 *       File Anchor Y:
 *       - Anchor X/Y used for images.
 *       - For X - Left: 0.0; Center: 0.5; Right: 1.0
 *       - For Y - Top: 0.0; Middle: 0.5; Bottom: 1.0
 * 
 *     Color:
 *     - What is the radius of this conical light?
 *     - For generated lights only.
 *     - Ignore if using image.
 * 
 *     Radius:
 *     - What is the radius of this conical light?
 *     - For generated lights only.
 *     - Ignore if using image.
 * 
 *       Source Radius:
 *       - What is the radius of this light source?
 *       - For generated lights only.
 *       - Ignore if using image.
 * 
 *     Intensity:
 *     - Conical light intensity. Use value between 0 & 1.
 *     - For generated lights only.
 *     - Ignore if using image.
 * 
 *   Optional:
 * 
 *     Blend Mode:
 *     - What kind of blend mode do you wish to apply to the conical light?
 * 
 *     Opacity:
 *     - What is the opacity (0 to 255)?
 *     - Lower: dimmer. Higher: Brighter.
 * 
 *   Angle:
 * 
 *     Arc Angle:
 *     - What is the angle of this conical light's arc?
 * 
 *     Angle Sway:
 *     - How many degrees should this light sway?
 *     - Use 0 for no sway.
 * 
 *     Sway Speed:
 *     - How fast should this light sway?
 *     - Lower: Slower; Higher: Faster
 * 
 *     Randomize Sway?:
 *     - Change the sway to offset at different starting points?
 * 
 *   Direction:
 * 
 *     Forced Direction?:
 *     - Force the conical light to face a certain direction?
 * 
 *     Follow Cursor?
 *     - Follow the mouse cursor?
 * 
 *   Offsets:
 * 
 *     Use Hand Offset?:
 *     - Put the light source on the target's "hand" position?
 *     - Disables the two settings below if on.
 * 
 *     Offset X (Non-Hand):
 *     - Offset the X position of this light.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y (Non-Hand):
 *     - Offset the Y position of this light.
 *     - Negative: up. Positive: down.
 * 
 * ---
 * 
 * Behavior
 * 
 *   Blink:
 * 
 *     Blink Rate:
 *     - What is the rate of occurance for this effect?
 *     - Use a decimal number between 0 and 1.
 * 
 *     Blink Modifier:
 *     - Static multiplicative opacity modifier. Before additive.
 *     - Use a decimal number between -1 and 1. Negatives allowed.
 * 
 *   Flicker:
 * 
 *     Flicker Rate:
 *     - What is the rate of occurance for this effect?
 *     - Use a decimal number between 0 and 1.
 * 
 *     Flicker Modifier:
 *     - Random multiplicative opacity modifier. Before additive.
 *     - Use a decimal number between -1 and 1. Negatives allowed.
 * 
 *   Flash:
 * 
 *     Flash Rate:
 *     - What is the rate of occurance for this effect?
 *     - Use a decimal number between 0 and 1.
 * 
 *     Flash Modifier:
 *     - Static additive opacity modifier. Before multiplicative.
 *     - Use a decimal number between -1 and 1. Negatives allowed.
 * 
 *   Flare:
 * 
 *     Flare Rate:
 *     - What is the rate of occurance for this effect?
 *     - Use a decimal number between 0 and 1.
 * 
 *     Flare Modifier:
 *     - Random additive opacity modifier. Before multiplicative.
 *     - Use a decimal number between -1 and 1. Negatives allowed.
 * 
 *   Glow:
 * 
 *     Glow Rate:
 *     - What is the glow change for this light?
 *     - Use a decimal number between 0 and 1.
 * 
 *     Glow Speed:
 *     - What is the speed at which glow oscillates at?
 *     - Use a decimal number between 0 and 1.
 * 
 *     Randomize Glow?:
 *     - Offset the glow to oscillate at different starting points?
 * 
 *   Pulse:
 * 
 *     Pulse Rate:
 *     - What is the pulse change for this light?
 *     - Use a decimal number between 0 and 1.
 * 
 *     Pulse Speed:
 *     - What is the speed at which pulse oscillates at?
 *     - Use a decimal number between 0 and 1.
 * 
 *     Randomize Pulse?:
 *     - Offset the pulse to oscillate at different starting points?
 * 
 *   Pattern:
 * 
 *     Pattern Name:
 *     - Select the pattern name for this light.
 *     - Ignore if using any Custom Pattern.
 * 
 *     Custom Pattern:
 *     - Create a custom pattern with letters from a to z.
 *     - Where 'a' is transparent and 'z' is opaque.
 * 
 *     Frame Delay:
 *     - What is the frame delay between pattern updates?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Map Lighting Settings
 * ============================================================================
 *
 * Lighting settings for the map scene. These settings allow you to adjust the
 * default settings used for the majority of lighting types and behaviors
 * across the player character, followers, events, and the various vehicles.
 *
 * ---
 *
 * General
 * 
 *   Enable For Map?:
 *   - Enable Lighting Effects for map?
 * 
 *   Shake Buffer:
 *   - Screen shakes reveal more of the screen than normal.
 *   - How many pixels of buffer should you provide?
 *
 * ---
 *
 * Player Defaults
 * 
 *   Radial Light:
 *   - Default radial light settings for this target.
 * 
 *     Default Behavior:
 *     - What are the default behavioral settings for this light?
 * 
 *   Conical Light:
 *   - Default radial light settings for this target.
 * 
 *     Default Behavior:
 *     - What are the default behavioral settings for this light?
 * 
 * ---
 * 
 * Follower Defaults
 * 
 *   Radial Light:
 *   - Default radial light settings for this target.
 * 
 *     Default Behavior:
 *     - What are the default behavioral settings for this light?
 * 
 *   Conical Light:
 *   - Default radial light settings for this target.
 * 
 *     Default Behavior:
 *     - What are the default behavioral settings for this light?
 * 
 * ---
 * 
 * Event Defaults
 * 
 *   Radial Light:
 *   - Default radial light settings for this target.
 * 
 *     Default Behavior:
 *     - What are the default behavioral settings for this light?
 * 
 *   Conical Light:
 *   - Default radial light settings for this target.
 * 
 *     Default Behavior:
 *     - What are the default behavioral settings for this light?
 * 
 * ---
 * 
 * Vehicles
 * 
 *   Boat:
 *   Ship:
 *   Airship:
 * 
 *     Boarded:
 * 
 *       Radial Light:
 *       - Default radial light settings for this target.
 * 
 *         Default Behavior:
 *         - What are the default behavioral settings for this light?
 * 
 *       Conical Light:
 *       - Default radial light settings for this target.
 * 
 *         Default Behavior:
 *         - What are the default behavioral settings for this light?
 * 
 *         "Hand" Offsets:
 *         - Default offsets used for the "hand" positions of this vehicle.
 * 
 *     Unboarded:
 * 
 *       Radial Light:
 *       - Default radial light settings for this target.
 * 
 *         Default Behavior:
 *         - What are the default behavioral settings for this light?
 * 
 *       Conical Light:
 *       - Default radial light settings for this target.
 * 
 *         Default Behavior:
 *         - What are the default behavioral settings for this light?
 * 
 *         "Hand" Offsets:
 *         - Default offsets used for the "hand" positions of this vehicle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Hand Position, VS8 Dash, VS8 Jump Offsets
 * ============================================================================
 *
 * Default offsets used for hand positions. These are for conical lights and
 * help determine where the light source should come from to avoid making the
 * conical light look weird by having lights come from the user's face or chest
 * as seen with other lighting plugins.
 * 
 * There are also separate settings for those using VS8 sprites for dashing and
 * jumping positions. Be sure to adjust them accordingly.
 *
 * ---
 *
 * Standard Directions
 * 
 *   Down:
 *   Up:
 *   Left:
 *   Right:
 *   - Offsets to determine conical light source position when facing
 *     this direction.
 * 
 * ---
 * 
 * Diagonal Directions
 * 
 *   Lower Left:
 *   Lower Right:
 *   Upper Left:
 *   Upper Right:
 *   - Offsets to determine conical light source position when facing
 *     this direction.
 *
 * ---
 *
 * Pattern Offsets:
 * 
 *   Pattern 0-10:
 * 
 *     Offset X:
 *     - What is the offset X for this pattern?
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - What is the offset Y for this pattern?
 *     - Negative: up. Positive: down.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Anti-Light Settings
 * ============================================================================
 *
 * Anti-Light regions and terrain tags can be used to mark certain tiles from
 * being affected by light at all. These tiles can be used as ceiling tiles or
 * areas outside of the map boundaries where light doesn't normally reach.
 * 
 * Keep in mind that this does NOT block light from passing through it. If a
 * light source is big enough to engulf the tiles past the anti-light marked
 * tiles, those tiles will still be lit up by any light sources. Therefore, you
 * need to mark those tiles on the map to be anti-light as well in addition to
 * planning out your maps for potential light piercing through the tiles.
 * 
 * There are two kinds of anti-light types. Hard edges and soft edges. Hard
 * Edges are extremely rough and box like. Soft Edges will smooth out towards
 * regularly lit tiles.
 *
 * ---
 *
 * Hard Edges
 * 
 *   Regions:
 *   - Which regions by default apply anti-light?
 *   - 0 is ignored. Use a number from 1 to 255.
 * 
 *   Terrain Tags:
 *   - Which terrain tags by default apply anti-light?
 *   - 0 is ignored. Use a number from 1 to 7.
 *
 * ---
 *
 * Soft Edges
 * 
 *   Regions:
 *   - Which regions by default apply anti-light?
 *   - 0 is ignored. Use a number from 1 to 255.
 * 
 *   Terrain Tags:
 *   - Which terrain tags by default apply anti-light?
 *   - 0 is ignored. Use a number from 1 to 7.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Lighting Settings
 * ============================================================================
 *
 * Lighting settings for the battle scene. The VisuStella MZ Battle Core is
 * required in order for lighting effects to work in-battle.
 *
 * ---
 *
 * General
 * 
 *   Enable For Battle?:
 *   - Enable Lighting Effects for battles?
 *   - Requires VisuStella MZ Battle Core!
 * 
 * ---
 * 
 * Actor Defaults
 * 
 *   Battle Light:
 *   - Default battle-radial light settings for actors.
 * 
 *     Default Behavior:
 *     - What are the default behavioral settings for actor radial lights?
 * 
 *     Auto-Calc Radius:
 *     - Automatically calculates the radius size based on sprite's
 *       width/height.
 *     - Ignore if use <Radial Light Radius: x>.
 *
 * ---
 * 
 * Enemy Defaults
 * 
 *   Battle Light:
 *   - Default battle-radial light settings for enemies.
 * 
 *     Default Behavior:
 *     - What are the default behavioral settings for enemy radial lights?
 * 
 *     Auto-Calc Radius:
 *     - Automatically calculates the radius size based on sprite's
 *       width/height.
 *     - Ignore if use <Radial Light Radius: x>.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Light Regions Settings
 * ============================================================================
 *
 * Tiles marked with these regions will automatically have white light spawned
 * on top of them. However, depending on the group the region belongs to, the
 * light spawned will have varying degrees of opacity. This means some places
 * can be less lit while others can be darker.
 * 
 * This can be used to light up certain parts of the map automatically while
 * requiring others to be lit with standard lighting.
 * 
 * This is also helpful for those who wish to keep their parallax fully lit
 * (since it will be affected by the darkness overlay) without having to put in
 * a lot of light sources.
 *
 * ---
 *
 * Auto-Light Regions
 * 
 *   Opacity - 100%:
 *   to
 *   Opacity - 5%:
 *   - Mark the regions with this opacity level.
 *   - Light color will be white. Use Region ID's (1 to 255).
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Preset Color Settings
 * ============================================================================
 *
 * If you happen to not like the preset colors used by this plugin, you can
 * redefine them using different hexidecimal values for you own touch. If you
 * are unsure of what the hexidecimal values are, please use an online site
 * like: https://htmlcolorcodes.com/
 *
 * ---
 *
 * Daytime Colors
 * Greyscale Colors
 * Red Colors
 * Orange Colors
 * Yellow Colors
 * Green Colors
 * Cyan Colors
 * Blue Colors
 * Purple Colors
 * Magenta Colors
 * Pink Colors
 * Brown Colors
 * Misc Colors
 * 
 *   Preset Color Name:
 *   - Preset's hex color in #rrggbb format.
 *   - Check your color here: https://htmlcolorcodes.com/
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Menu Settings
 * ============================================================================
 *
 * Lighting settings for the options scene. These are for the players who
 * aren't fond of blinking or oscillating lights in case they bother them.
 *
 * ---
 *
 * Options
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *   - Ignore if using the VisuStella MZ Options Core.
 * 
 * ---
 * 
 * Blinking Lights
 * 
 *   Add Option?:
 *   - Add the 'Blinking Lights' option to the Options menu?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 * ---
 * 
 * Pulsing Lights
 * 
 *   Add Option?:
 *   - Add the 'Pulsing Lights' option to the Options menu?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Radial Light Settings
 * ============================================================================
 *
 * These are sub-settings found in the other settings lists. These settings
 * adjust the default/primary properties of radial lights for the specific
 * user type.
 *
 * --- 
 * 
 * General:
 * 
 *   Enabled?:
 *   - Is this radial light enabled?
 * 
 * ---
 * 
 * Properties:
 * 
 *   Filename:
 *   - Filename used for the light effect image.
 *   - If used, ignore Color, Radius, and Intensity.
 *   - Image will be centered on the target where the center of the image is
 *     the anchor point and will be rotated.
 * 
 *   Color:
 *   - Color of the radial light in #rrggbb format.
 *   - For generated lights only.
 *   - Ignore if using image.
 * 
 *   Radius:
 *   - What is the radius of this radial light?
 *   - For generated lights only.
 *   - Ignore if using image.
 * 
 *   Intensity:
 *   - Radial light intensity. Use value between 0 & 1.
 *   - For generated lights only.
 *   - Ignore if using image.
 * 
 * ---
 * 
 * Optional:
 * 
 *   Angle:
 *   - What is the angle of this radial light?
 *   - Only noticeable with using images.
 * 
 *     Rotate Speed:
 *     - The rotation speed of this light?
 *     - Lower: slower. Higher: faster. Negative: reverse.
 * 
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the radial light?
 * 
 *   Opacity:
 *   - What is the opacity (0 to 255)?
 *   - Lower: dimmer. Higher: Brighter.
 * 
 * ---
 * 
 * Offsets:
 * 
 *   Offset X:
 *   - Offset the X position of this light.
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - Offset the Y position of this light.
 *   - Negative: up. Positive: down.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Conical Light Settings
 * ============================================================================
 *
 * These are sub-settings found in the other settings lists. These settings
 * adjust the default/primary properties of conical lights for the specific
 * user type.
 *
 * --- 
 * 
 * General:
 * 
 *   Enabled?:
 *   - Is this conical light enabled?
 * 
 * ---
 * 
 * Properties:
 * 
 *   Filename:
 *   - Filename used for the light effect image.
 *   - If used, ignore Radius, Color, and Intensity.
 * 
 *     Angle Offset:
 *     - Offset the image angle by this many degrees.
 *     - Only applies to images.
 * 
 *     File Anchor X:
 *     File Anchor Y:
 *     - Anchor X/Y used for images.
 *     - For X - Left: 0.0; Center: 0.5; Right: 1.0
 *     - For Y - Top: 0.0; Middle: 0.5; Bottom: 1.0
 * 
 *   Color:
 *   - What is the radius of this conical light?
 *   - For generated lights only.
 *   - Ignore if using image.
 * 
 *   Radius:
 *   - What is the radius of this conical light?
 *   - For generated lights only.
 *   - Ignore if using image.
 * 
 *     Source Radius:
 *     - What is the radius of this light source?
 *     - For generated lights only.
 *     - Ignore if using image.
 * 
 *   Intensity:
 *   - Conical light intensity. Use value between 0 & 1.
 *   - For generated lights only.
 *   - Ignore if using image.
 * 
 * ---
 * 
 * Optional:
 * 
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the radial light?
 * 
 *   Opacity:
 *   - What is the opacity (0 to 255)?
 *   - Lower: dimmer. Higher: Brighter.
 * 
 * ---
 * 
 * Angle:
 * 
 *   Arc Angle:
 *   - What is the angle of this conical light's arc?
 * 
 *   Angle Sway:
 *   - How many degrees should this light sway?
 *   - Use 0 for no sway.
 * 
 *   Sway Speed:
 *   - How fast should this light sway?
 *   - Lower: Slower; Higher: Faster
 * 
 *   Randomize Sway?:
 *   - Change the sway to offset at different starting points?
 * 
 * ---
 * 
 * Direction:
 * 
 *   Forced Direction?:
 *   - Force the conical light to face a certain direction?
 * 
 *   Follow Cursor?
 *   - Follow the mouse cursor?
 * 
 * ---
 * 
 * Offsets:
 * 
 *   Offset X:
 *   - Offset the X position of this light.
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - Offset the Y position of this light.
 *   - Negative: up. Positive: down.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Light Behavior Settings
 * ============================================================================
 *
 * These are sub-settings found in the other settings lists. These settings
 * adjust the default/primary patterns of how lights behave for the specific
 * user type.
 *
 * --- 
 * 
 * Blink:
 * 
 *   Blink Rate:
 *   - What is the rate of occurance for this effect?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Blink Modifier:
 *   - Static multiplicative opacity modifier. Before additive.
 *   - Use a decimal number between -1 and 1. Negatives allowed.
 * 
 * ---
 * 
 * Flicker:
 * 
 *   Flicker Rate:
 *   - What is the rate of occurance for this effect?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Flicker Modifier:
 *   - Random multiplicative opacity modifier. Before additive.
 *   - Use a decimal number between -1 and 1. Negatives allowed.
 * 
 * ---
 * 
 * Flash:
 * 
 *   Flash Rate:
 *   - What is the rate of occurance for this effect?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Flash Modifier:
 *   - Static additive opacity modifier. Before multiplicative.
 *   - Use a decimal number between -1 and 1. Negatives allowed.
 * 
 * ---
 * 
 * Flare:
 * 
 *   Flare Rate:
 *   - What is the rate of occurance for this effect?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Flare Modifier:
 *   - Random additive opacity modifier. Before multiplicative.
 *   - Use a decimal number between -1 and 1. Negatives allowed.
 * 
 * ---
 * 
 * Glow:
 * 
 *   Glow Rate:
 *   - What is the glow change for this light?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Glow Speed:
 *   - What is the speed at which glow oscillates at?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Randomize Glow?:
 *   - Offset the glow to oscillate at different starting points?
 * 
 * ---
 * 
 * Pulse:
 * 
 *   Pulse Rate:
 *   - What is the pulse change for this light?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Pulse Speed:
 *   - What is the speed at which pulse oscillates at?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Randomize Pulse?:
 *   - Offset the pulse to oscillate at different starting points?
 * 
 * ---
 * 
 * Pattern:
 * 
 *   Pattern Name:
 *   - Select the pattern name for this light.
 *   - Ignore if using any Custom Pattern.
 * 
 *   Custom Pattern:
 *   - Create a custom pattern with letters from a to z.
 *   - Where 'a' is transparent and 'z' is opaque.
 * 
 *   Frame Delay:
 *   - What is the frame delay between pattern updates?
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
 * * Irina
 * * Arisu
 * * Olivia
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.10: January 16, 2025
 * * Documentation Update!
 * ** Updated documentation for following notetags:
 * *** <Conical Light Offset: +x, +y>
 * **** Used with the <Conical Light Center Offset> notetag if the Plugin
 *      Parameters dictate using hand offsets.
 * *** <Conical Light d Pattern p: +x, +y>
 * **** Used with the <Conical Light Hand Offset> notetag if the Plugin
 *      Parameters dictate using non-hand offsets.
 * * Feature Update!
 * ** Using <Conical Light Offset: +x, +y> on an event will automaticaly use
 *    the <Conical Light Center Offset> notetag as of this update.
 * ** Using <Conical Light d Pattern p: +x, +y> on an event will automatically
 *    use the <Conical Light Hand Offset> notetag as of this update.
 * 
 * Version 1.09: November 14, 2024
 * * Documentation Update!
 * ** Updated documentation for following notetags:
 * *** <Radial Light Flash Rate: x%>
 * *** <Radial Light Flare Rate: x%>
 * **** To include the following:
 * ***** Must be used with a lower opacity setting.
 * ****** Use with <Radial Light Opacity: x%> notetag.
 * ****** If <Radial Light Opacity: x%> is not used, default to 50%.
 * *** <Conical Light Flash Rate: x%>
 * *** <Conical Light Flare Rate: x%>
 * **** To include the following:
 * ***** Must be used with a lower opacity setting.
 * ****** Use with <Conical Light Opacity: x%> notetag.
 * ****** If <Conical Light Opacity: x%> is not used, default to 50%.
 * * Feature Updates!
 * ** Notetags for flash/flare rates will now automatically default the opacity
 *    level of a light to 50% if the opacity notetag is not present. Update
 *    made by Arisu.
 * 
 * Version 1.08: June 13, 2024
 * * Bug Fixes!
 * ** <Conical Light Custom Pattern: x> was not working before and should now
 *    work properly. Fix made by Arisu.
 * 
 * Version 1.07: February 15, 2024
 * * Bug Fixes!
 * ** Fixed a bug where enemy notetags for lighting effects did not work
 *    properly. Fix made by Arisu.
 * 
 * Version 1.06: November 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: September 14, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.04: February 16, 2023
 * * Feature Update!
 * ** During events, touch-directed flashlight movement will not occur to
 *    prevent the player character from facing different directions than
 *    intended. Update made by Irina.
 * 
 * Version 1.03: May 5, 2022
 * * Bug Fixes!
 * ** Vehicles no longer auto put out light in the upper left corner of the map
 *    when they have no graphic. Fix made by Irina.
 * 
 * Version 1.02: March 31, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina:
 * *** <Hard Anti-Light Regions: x, x, x>
 * *** <Hard Anti-Light Terrain Tags: x, x, x>
 * *** <Soft Anti-Light Regions: x, x, x>
 * *** <Soft Anti-Light Terrain Tags: x, x, x>
 * **** Tiles marked by these regions/terrain tags won't have any light shown
 *      on them.
 * **** This does NOT block light from going to the other side. If the light
 *      radius is large enough, it will pierce through to the other side. It
 *      just won't be visible on the region marked tiles.
 * ** New Plugin Parameters added by Irina:
 * *** Anti-Light Settings
 * **** Anti-Light regions and terrain tags can be used to mark certain tiles
 *      from being affected by light at all. These tiles can be used as ceiling
 *      tiles or areas outside of the map boundaries where light doesn't
 *      normally reach.
 * **** Keep in mind that this does NOT block light from passing through it. If
 *      a light source is big enough to engulf the tiles past the anti-light
 *      marked tiles, those tiles will still be lit up by any light sources.
 *      Therefore, you need to mark those tiles on the map to be anti-light as
 *      well in addition to planning out your maps for potential light piercing
 *      through the tiles.
 * **** There are two kinds of anti-light types. Hard edges and soft edges.
 *      Hard Edges are extremely rough and box like. Soft Edges will smooth out
 *      towards regularly lit tiles.
 * 
 * Version 1.01: March 24, 2022
 * * Bug Fixes!
 * ** Updated battle radial light positions for games where the UI resolution
 *    is not the same as the Screen resolution. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update
 * ** Changed the position of "Use Hand Offset?" in the Plugin Parameters for
 *    more clarity in regards to Conical Lights.
 * ** Added "(Non-Hand)" to the respective Offset X and Offset Y plugin
 *    parameter names for those who missed the description of the previous
 *    Plugin Parameter.
 * * New Features!
 * ** New Plugin Parameters added by Irina.
 * *** Plugin Parameters > Preset Colors Settings
 * **** You can now define what hex codes are used for each preset color.
 * 
 * Version 1.00 Official Release Date: April 8, 2022
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Overlay
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_Overlay
 * @text Category - Overlay
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OverlayChangeToPreset
 * @text OVERLAY: Change to Preset Color
 * @desc Change current darkness overlay to a preset color and opacity level.
 *
 * @arg Color:str
 * @text Color
 * @type select
 * @option Normal
 * @option -
 * @option Dawn
 * @option Day
 * @option Dusk
 * @option Night
 * @option -
 * @option White
 * @option Light Grey
 * @option Grey
 * @option Dark Grey
 * @option Black
 * @option -
 * @option Light Red
 * @option Red
 * @option Dark Red
 * @option -
 * @option Light Orange
 * @option Orange
 * @option Dark Orange
 * @option -
 * @option Light Yellow
 * @option Yellow
 * @option Dark Yellow
 * @option -
 * @option Light Green
 * @option Green
 * @option Dark Green
 * @option -
 * @option Light Cyan
 * @option Cyan
 * @option Dark Cyan
 * @option -
 * @option Light Blue
 * @option Blue
 * @option Dark Blue
 * @option -
 * @option Light Purple
 * @option Purple
 * @option Dark Purple
 * @option -
 * @option Light Magenta
 * @option Magenta
 * @option Dark Magenta
 * @option -
 * @option Light Pink
 * @option Pink
 * @option Dark Pink
 * @option -
 * @option Light Brown
 * @option Brown
 * @option Dark Brown
 * @option -
 * @desc Pick a preset color. This will also come with predetermined opacity values.
 * @default Night
 *
 * @arg Duration:num
 * @text Duration
 * @desc What is the duration of the color change?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OverlayChangeToCustomColor
 * @text OVERLAY: Change to Custom Color
 * @desc Change current darkness overlay to a custom color.
 *
 * @arg Color:str
 * @text Color
 * @desc Custom color. This uses #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #000000
 *
 * @arg Opacity:num
 * @text Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Opacity level of the color. Value between 0-255.
 * Transparent: 0. Opaque: 255.
 * @default 255
 *
 * @arg Duration:num
 * @text Duration
 * @desc What is the duration of the color change?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_BattleLight
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_BattleLight
 * @text Category - Battle Light
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleLightChangeActorSettings
 * @text BATTLE LIGHT: Change Actor(s) Settings
 * @desc Change the battle-radial light settings for target(s).
 * 
 * @arg ActorID:arrayeval
 * @text Actor ID(s)
 * @type actor[]
 * @desc Target actor(s) you want to change light settings for.
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Settings:struct
 * @text Settings
 * @type struct<Radial>
 * @desc Change the radial light settings for the target(s).
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"64","intensity:num":"0.15","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"128","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @type struct<Behavior>
 * @desc Change the behaviors for this radial light.
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @arg AutoRadius:eval
 * @text Auto-Calc Radius
 * @type boolean
 * @on Calculate Radius
 * @off Use Default Radius
 * @desc Automatically calculates the radius size based on sprite's
 * width/height.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleLightChangeEnemySettings
 * @text BATTLE LIGHT: Change Enemy(s) Settings
 * @desc Change the battle-radial light settings for target(s).
 *
 * @arg EnemyIndex:arrayeval
 * @text Enemy Index(es)
 * @type string[]
 * @desc Select enemy troop index(es) to change light settings for.
 * You may use JavaScript code.
 * @default ["0"]
 *
 * @arg Settings:struct
 * @text Settings
 * @type struct<Radial>
 * @desc Change the radial light settings for the target(s).
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"64","intensity:num":"0.15","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"128","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @type struct<Behavior>
 * @desc Change the behaviors for this radial light.
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @arg AutoRadius:eval
 * @text Auto-Calc Radius
 * @type boolean
 * @on Calculate Radius
 * @off Use Default Radius
 * @desc Automatically calculates the radius size based on sprite's
 * width/height.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_RadialLight
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_RadialLight
 * @text Category - Radial Light
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RadialLightChangePlayerSettings
 * @text RADIAL LIGHT: Change Player Settings
 * @desc Change the radial light settings for the player.
 *
 * @arg Settings:struct
 * @text Settings
 * @type struct<Radial>
 * @desc Change the radial light settings for the player.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","radius:num":"216","color:str":"#ffffff","intensity:num":"0.15","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @type struct<Behavior>
 * @desc Change the behaviors for this radial light.
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RadialLightChangeFollowerSettings
 * @text RADIAL LIGHT: Change Follower Settings
 * @desc Change the radial light settings for followers.
 *
 * @arg Settings:struct
 * @text Settings
 * @type struct<Radial>
 * @desc Change the radial light settings for all followers.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","radius:num":"216","color:str":"#ffffff","intensity:num":"0.15","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @type struct<Behavior>
 * @desc Change the behaviors for this radial light.
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RadialLightChangeEventSettings
 * @text RADIAL LIGHT: Change Event(s) Settings
 * @desc Change the radial light settings for target event(s).
 * 
 * @arg EventID:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc Target event(s) to have their light settings changed.
 * Use 0 for "this event". You may use JavaScript code.
 * @default ["0"]
 *
 * @arg Settings:struct
 * @text Settings
 * @type struct<Radial>
 * @desc Change the radial light settings for target event(s).
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","radius:num":"72","color:str":"#ffffff","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"255","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @type struct<Behavior>
 * @desc Change the behaviors for this radial light.
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RadialLightChangeBoatSettings
 * @text RADIAL LIGHT: Change Boat Settings
 * @desc Change the radial light settings for the boat vehicle.
 *
 * @arg Boarded
 * 
 * @arg BoardedSettings:struct
 * @text Radial Light
 * @parent Boarded
 * @type struct<Radial>
 * @desc Changed radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"240","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"128","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg BoardedBehavior:struct
 * @text Changed Behavior
 * @parent BoardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @arg Unboarded
 * @parent Boat
 * 
 * @arg UnboardedSettings:struct
 * @text Radial Light
 * @parent Unboarded
 * @type struct<Radial>
 * @desc Changed radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"72","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg UnboardedBehavior:struct
 * @text Changed Behavior
 * @parent UnboardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RadialLightChangeShipSettings
 * @text RADIAL LIGHT: Change Ship Settings
 * @desc Change the radial light settings for the ship vehicle.
 *
 * @arg Boarded
 * 
 * @arg BoardedSettings:struct
 * @text Radial Light
 * @parent Boarded
 * @type struct<Radial>
 * @desc Changed radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"300","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"160","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg BoardedBehavior:struct
 * @text Changed Behavior
 * @parent BoardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @arg Unboarded
 * 
 * @arg UnboardedSettings:struct
 * @text Radial Light
 * @parent Unboarded
 * @type struct<Radial>
 * @desc Changed radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"72","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg UnboardedBehavior:struct
 * @text Changed Behavior
 * @parent UnboardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RadialLightChangeAirshipSettings
 * @text RADIAL LIGHT: Change Airship Settings
 * @desc Change the radial light settings for the airship vehicle.
 *
 * @arg Boarded
 * 
 * @arg BoardedSettings:struct
 * @text Radial Light
 * @parent Boarded
 * @type struct<Radial>
 * @desc Changed radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"360","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"192","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg BoardedBehavior:struct
 * @text Changed Behavior
 * @parent BoardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @arg Unboarded
 * 
 * @arg UnboardedSettings:struct
 * @text Radial Light
 * @parent Unboarded
 * @type struct<Radial>
 * @desc Changed radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"72","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg UnboardedBehavior:struct
 * @text Changed Behavior
 * @parent UnboardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ConicalLight
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_ConicalLight
 * @text Category - Conical Light
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalLightChangePlayerSettings
 * @text CONICAL LIGHT: Change Player Settings
 * @desc Change the conical light settings for the player.
 *
 * @arg Settings:struct
 * @text Settings
 * @type struct<Conical>
 * @desc Change the conical light settings for the player.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"240","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"6","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","followMouse:eval":"true","useHandOffset:eval":"true","forceDirection:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @type struct<Behavior>
 * @desc Change the behaviors for this conical light.
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalLightChangeFollowerSettings
 * @text CONICAL LIGHT: Change Follower Settings
 * @desc Change the conical light settings for followers.
 *
 * @arg Settings:struct
 * @text Settings
 * @type struct<Conical>
 * @desc Change the conical light settings for all followers.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"240","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"6","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","followMouse:eval":"false","useHandOffset:eval":"true","forceDirection:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @type struct<Behavior>
 * @desc Change the behaviors for this conical light.
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalLightChangeEventSettings
 * @text CONICAL LIGHT: Change Event(s) Settings
 * @desc Change the conical light settings for target event(s).
 * 
 * @arg EventID:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc Target event(s) to have their light settings changed.
 * Use 0 for "this event". You may use JavaScript code.
 * @default ["0"]
 *
 * @arg Settings:struct
 * @text Settings
 * @type struct<Conical>
 * @desc Change the conical light settings for target event(s).
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"240","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"6","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","followMouse:eval":"false","useHandOffset:eval":"true","forceDirection:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @type struct<Behavior>
 * @desc Change the behaviors for this conical light.
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalLightChangeBoatSettings
 * @text CONICAL LIGHT: Change Boat Settings
 * @desc Change the conical light settings for the boat vehicle.
 *
 * @arg Boarded
 * 
 * @arg BoardedSettings:struct
 * @text Conical Light
 * @parent Boarded
 * @type struct<Conical>
 * @desc Changed conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"360","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg BoardedBehavior:struct
 * @text Changed Behavior
 * @parent BoardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @arg Unboarded
 * 
 * @arg UnboardedSettings:struct
 * @text Conical Light
 * @parent Unboarded
 * @type struct<Conical>
 * @desc Changed conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"360","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg UnboardedBehavior:struct
 * @text Changed Behavior
 * @parent UnboardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalLightChangeShipSettings
 * @text CONICAL LIGHT: Change Ship Settings
 * @desc Change the conical light settings for the ship vehicle.
 *
 * @arg Boarded
 * 
 * @arg BoardedSettings:struct
 * @text Conical Light
 * @parent Boarded
 * @type struct<Conical>
 * @desc Changed conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"480","miniRadius:num":"16","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"75","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg BoardedBehavior:struct
 * @text Changed Behavior
 * @parent BoardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @arg Unboarded
 * 
 * @arg UnboardedSettings:struct
 * @text Conical Light
 * @parent Unboarded
 * @type struct<Conical>
 * @desc Changed conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"360","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg UnboardedBehavior:struct
 * @text Changed Behavior
 * @parent UnboardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalLightChangeAirshipSettings
 * @text CONICAL LIGHT: Change Airship Settings
 * @desc Change the conical light settings for the airship vehicle.
 *
 * @arg Boarded
 * 
 * @arg BoardedSettings:struct
 * @text Conical Light
 * @parent Boarded
 * @type struct<Conical>
 * @desc Changed conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"600","miniRadius:num":"32","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"90","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg BoardedBehavior:struct
 * @text Changed Behavior
 * @parent BoardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @arg Unboarded
 * 
 * @arg UnboardedSettings:struct
 * @text Conical Light
 * @parent Unboarded
 * @type struct<Conical>
 * @desc Changed conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"360","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg UnboardedBehavior:struct
 * @text Changed Behavior
 * @parent UnboardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ConicalOffset
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_ConicalOffset
 * @text Category - Conical Offset
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalOffsetChangeActor
 * @text CONICAL OFFSET: Change Actor(s) Settings
 * @desc Change the conical light hand offset for target actor(s).
 * 
 * @arg ActorID:arrayeval
 * @text Actor ID(s)
 * @type actor[]
 * @desc Target actor(s) you want to change offset settings for.
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Hand Offset
 * @off Center Offset
 * @desc Change the offset settings for the target(s).
 * @default true
 * 
 * @arg HandOffset:struct
 * @text Hand Position Offsets
 * @type struct<HandOffset>
 * @desc Change target(s)'s offsets used for hand positions.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-12\",\"pattern0Y:num\":\"+14\",\"Pattern1\":\"\",\"pattern1X:num\":\"-12\",\"pattern1Y:num\":\"+16\",\"Pattern2\":\"\",\"pattern2X:num\":\"-12\",\"pattern2Y:num\":\"+18\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+2\",\"pattern0Y:num\":\"+16\",\"Pattern1\":\"\",\"pattern1X:num\":\"+4\",\"pattern1Y:num\":\"+16\",\"Pattern2\":\"\",\"pattern2X:num\":\"+6\",\"pattern2Y:num\":\"+16\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-2\",\"pattern0Y:num\":\"+16\",\"Pattern1\":\"\",\"pattern1X:num\":\"-4\",\"pattern1Y:num\":\"+16\",\"Pattern2\":\"\",\"pattern2X:num\":\"-6\",\"pattern2Y:num\":\"+16\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+12\",\"pattern0Y:num\":\"-18\",\"Pattern1\":\"\",\"pattern1X:num\":\"+12\",\"pattern1Y:num\":\"-16\",\"Pattern2\":\"\",\"pattern2X:num\":\"+12\",\"pattern2Y:num\":\"-14\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 * 
 * @arg VsDashOffset:struct
 * @text VS8 Dash Offsets
 * @type struct<HandOffset>
 * @desc Change target(s)'s offsets used for hand positions for VS8 sprites while dashing.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 * 
 * @arg VsJumpOffset:struct
 * @text VS8 Jump Offsets
 * @type struct<HandOffset>
 * @desc Change target(s)'s offsets used for hand positions for VS8 sprites while jumping.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalOffsetChangeEvent
 * @text CONICAL OFFSET: Change Event(s) Settings
 * @desc Change the conical light hand offset for target event(s).
 * 
 * @arg EventID:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc Target event(s) you want to change offset settings for.
 * Use 0 for "this event". You may use JavaScript code.
 * @default ["0"]
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Hand Offset
 * @off Center Offset
 * @desc Change the offset settings for the target(s).
 * @default true
 * 
 * @arg HandOffset:struct
 * @text Hand Position Offsets
 * @type struct<HandOffset>
 * @desc Change target(s)'s offsets used for hand positions.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-12\",\"pattern0Y:num\":\"+14\",\"Pattern1\":\"\",\"pattern1X:num\":\"-12\",\"pattern1Y:num\":\"+16\",\"Pattern2\":\"\",\"pattern2X:num\":\"-12\",\"pattern2Y:num\":\"+18\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+2\",\"pattern0Y:num\":\"+16\",\"Pattern1\":\"\",\"pattern1X:num\":\"+4\",\"pattern1Y:num\":\"+16\",\"Pattern2\":\"\",\"pattern2X:num\":\"+6\",\"pattern2Y:num\":\"+16\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-2\",\"pattern0Y:num\":\"+16\",\"Pattern1\":\"\",\"pattern1X:num\":\"-4\",\"pattern1Y:num\":\"+16\",\"Pattern2\":\"\",\"pattern2X:num\":\"-6\",\"pattern2Y:num\":\"+16\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+12\",\"pattern0Y:num\":\"-18\",\"Pattern1\":\"\",\"pattern1X:num\":\"+12\",\"pattern1Y:num\":\"-16\",\"Pattern2\":\"\",\"pattern2X:num\":\"+12\",\"pattern2Y:num\":\"-14\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 * 
 * @arg VsDashOffset:struct
 * @text VS8 Dash Offsets
 * @type struct<HandOffset>
 * @desc Change target(s)'s offsets used for hand positions for VS8 sprites while dashing.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 * 
 * @arg VsJumpOffset:struct
 * @text VS8 Jump Offsets
 * @type struct<HandOffset>
 * @desc Change target(s)'s offsets used for hand positions for VS8 sprites while jumping.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalOffsetChangeBoat
 * @text CONICAL OFFSET: Change Boat Settings
 * @desc Change the conical light hand offset for the boat vehicle.
 *
 * @arg Boarded
 * 
 * @arg BoardedOffset:struct
 * @text Changed Offsets
 * @parent Boarded
 * @type struct<HandOffset>
 * @desc Changed offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+8\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-23\",\"pattern0Y:num\":\"-8\",\"Pattern1\":\"\",\"pattern1X:num\":\"-24\",\"pattern1Y:num\":\"-8\",\"Pattern2\":\"\",\"pattern2X:num\":\"-23\",\"pattern2Y:num\":\"-8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+23\",\"pattern0Y:num\":\"-8\",\"Pattern1\":\"\",\"pattern1X:num\":\"+24\",\"pattern1Y:num\":\"-8\",\"Pattern2\":\"\",\"pattern2X:num\":\"+23\",\"pattern2Y:num\":\"-8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"-23\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"-24\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"-23\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @arg Unboarded
 * 
 * @arg UnboardedOffset:struct
 * @text Changed Offsets
 * @parent Unboarded
 * @type struct<HandOffset>
 * @desc Changed offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+8\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-23\",\"pattern0Y:num\":\"-8\",\"Pattern1\":\"\",\"pattern1X:num\":\"-24\",\"pattern1Y:num\":\"-8\",\"Pattern2\":\"\",\"pattern2X:num\":\"-23\",\"pattern2Y:num\":\"-8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+23\",\"pattern0Y:num\":\"-8\",\"Pattern1\":\"\",\"pattern1X:num\":\"+24\",\"pattern1Y:num\":\"-8\",\"Pattern2\":\"\",\"pattern2X:num\":\"+23\",\"pattern2Y:num\":\"-8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"-23\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"-24\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"-23\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalOffsetChangeShip
 * @text CONICAL OFFSET: Change Ship Settings
 * @desc Change the conical light hand offset for the ship vehicle.
 *
 * @arg Boarded
 * 
 * @arg BoardedOffset:struct
 * @text Changed Offsets
 * @parent Boarded
 * @type struct<HandOffset>
 * @desc Changed offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+23\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+24\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+23\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-24\",\"pattern0Y:num\":\"+6\",\"Pattern1\":\"\",\"pattern1X:num\":\"-24\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"-24\",\"pattern2Y:num\":\"+6\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+24\",\"pattern0Y:num\":\"+6\",\"Pattern1\":\"\",\"pattern1X:num\":\"+24\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"+24\",\"pattern2Y:num\":\"+6\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"-24\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"-23\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"-24\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @arg Unboarded
 * 
 * @arg UnboardedOffset:struct
 * @text Changed Offsets
 * @parent Unboarded
 * @type struct<HandOffset>
 * @desc Changed offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+23\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+24\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+23\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-24\",\"pattern0Y:num\":\"+6\",\"Pattern1\":\"\",\"pattern1X:num\":\"-24\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"-24\",\"pattern2Y:num\":\"+6\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+24\",\"pattern0Y:num\":\"+6\",\"Pattern1\":\"\",\"pattern1X:num\":\"+24\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"+24\",\"pattern2Y:num\":\"+6\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"-24\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"-23\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"-24\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalOffsetChangeAirship
 * @text CONICAL OFFSET: Change Airship Settings
 * @desc Change the conical light hand offset for the airship vehicle.
 *
 * @arg Boarded
 * 
 * @arg BoardedOffset:struct
 * @text Changed Offsets
 * @parent Boarded
 * @type struct<HandOffset>
 * @desc Changed offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @arg Unboarded
 * 
 * @arg UnboardedOffset:struct
 * @text Changed Offsets
 * @parent Unboarded
 * @type struct<HandOffset>
 * @desc Changed offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_LightSpawns
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_LightSpawns
 * @text Category - Spawn Light(s)
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LightSpawnNewMapLockedLight
 * @text SPAWN LIGHT: Create Light(s) at Map X/Y
 * @desc Map only! Create new light spawn(s) locked to the map.
 * Use tile coordinates for X and Y.
 * 
 * @arg LightSettings
 * @text Light Settings
 * 
 * @arg Settings:struct
 * @text Settings
 * @parent LightSettings
 * @type struct<Radial>
 * @desc Change the radial light settings for the light spawn(s).
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"32","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"255","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @parent LightSettings
 * @type struct<Behavior>
 * @desc Change the behaviors for the light spawn(s).
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @arg Coordinates
 * @text Coordinates X/Y
 *
 * @arg CoordinatesX:eval
 * @text Origin X
 * @parent Coordinates
 * @desc What is the origin X position?
 * You may use JavaScript code.
 * @default $gamePlayer.x
 *
 * @arg CoordinatesY:eval
 * @text Origin Y
 * @parent Coordinates
 * @desc What is the origin Y position?
 * You may use JavaScript code.
 * @default $gamePlayer.y
 * 
 * @arg SpawnSettings
 * @text Spawn Settings
 *
 * @arg UpdateFunc:json
 * @text JS: Trajectory
 * @parent SpawnSettings
 * @type note
 * @desc Code used to determine the trajectory of these lights.
 * These will revolve around the origin X/Y position.
 * @default "// Declare Constants\nconst data = arguments[0];\nconst time = arguments[1];\n\n// Calculate Results\nconst angle = time * 1.0;\nconst radians = angle * Math.PI / 180.0;\nconst distance = 0;  // Distance from Center\nconst offsetX = 0;\nconst offsetY = 0;\nconst x = Math.cos(radians) * distance + offsetX;\nconst y = Math.sin(radians) * distance + offsetY;\n\n// Return Results\nreturn {\n    x: x,\n    y: y,\n};"
 *
 * @arg InitialTime:eval
 * @text Initial Time
 * @parent SpawnSettings
 * @desc What is the initial time value for this light spawn(s)?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg TotalSpawns:eval
 * @text Total Spawns
 * @parent InitialTime:eval
 * @desc How many light spawns should there be?
 * Minimum value: 1. You may use JavaScript code.
 * @default 1
 *
 * @arg TimeIncrement:eval
 * @text Time Increment
 * @parent InitialTime:eval
 * @desc What is the time increment between spawns?
 * @default +1
 *
 * @arg ExpirationTimer:eval
 * @text Expiration Timer
 * @parent SpawnSettings
 * @desc After how many frames will light spawn(s) expire?
 * Use 0 for no expiration. You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LightSpawnNewScreenLockedLight
 * @text SPAWN LIGHT: Create Light(s) at Screen X/Y
 * @desc Map only! Create new light spawn(s) locked to the screen.
 * The light spawn(s) is unaffected by map scrolling.
 * 
 * @arg LightSettings
 * @text Light Settings
 * 
 * @arg Settings:struct
 * @text Settings
 * @parent LightSettings
 * @type struct<Radial>
 * @desc Change the radial light settings for the light spawn(s).
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"32","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"255","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @parent LightSettings
 * @type struct<Behavior>
 * @desc Change the behaviors for the light spawn(s).
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @arg Coordinates
 * @text Coordinates X/Y
 *
 * @arg CoordinatesX:eval
 * @text Origin X
 * @parent Coordinates
 * @desc What is the origin X position?
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg CoordinatesY:eval
 * @text Origin Y
 * @parent Coordinates
 * @desc What is the origin Y position?
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @arg SpawnSettings
 * @text Spawn Settings
 *
 * @arg UpdateFunc:json
 * @text JS: Trajectory
 * @parent SpawnSettings
 * @type note
 * @desc Code used to determine the trajectory of these lights.
 * These will revolve around the origin X/Y position.
 * @default "// Declare Constants\nconst data = arguments[0];\nconst time = arguments[1];\n\n// Calculate Results\nconst angle = time * 1.0;\nconst radians = angle * Math.PI / 180.0;\nconst distance = 0;  // Distance from Center\nconst offsetX = 0;\nconst offsetY = 0;\nconst x = Math.cos(radians) * distance + offsetX;\nconst y = Math.sin(radians) * distance + offsetY;\n\n// Return Results\nreturn {\n    x: x,\n    y: y,\n};"
 *
 * @arg InitialTime:eval
 * @text Initial Time
 * @parent SpawnSettings
 * @desc What is the initial time value for this light spawn(s)?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg TotalSpawns:eval
 * @text Total Spawns
 * @parent InitialTime:eval
 * @desc How many light spawns should there be?
 * Minimum value: 1. You may use JavaScript code.
 * @default 1
 *
 * @arg TimeIncrement:eval
 * @text Time Increment
 * @parent InitialTime:eval
 * @desc What is the time increment between spawns?
 * @default +1
 *
 * @arg ExpirationTimer:eval
 * @text Expiration Timer
 * @parent SpawnSettings
 * @desc After how many frames will light spawn(s) expire?
 * Use 0 for no expiration. You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LightSpawnNewPlayerLockedLight
 * @text SPAWN LIGHT: Create Light(s) on Player
 * @desc Map only! Create new light spawn(s) following the player.
 * Use tile coordinates for X and Y.
 * 
 * @arg LightSettings
 * @text Light Settings
 * 
 * @arg Settings:struct
 * @text Settings
 * @parent LightSettings
 * @type struct<Radial>
 * @desc Change the radial light settings for the light spawn(s).
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"32","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"255","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @parent LightSettings
 * @type struct<Behavior>
 * @desc Change the behaviors for the light spawn(s).
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @arg SpawnSettings
 * @text Spawn Settings
 *
 * @arg UpdateFunc:json
 * @text JS: Trajectory
 * @parent SpawnSettings
 * @type note
 * @desc Code used to determine the trajectory of these lights.
 * These will revolve around the origin X/Y position.
 * @default "// Declare Constants\nconst data = arguments[0];\nconst time = arguments[1];\n\n// Calculate Results\nconst angle = time * 1.0;\nconst radians = angle * Math.PI / 180.0;\nconst distance = 0;  // Distance from Center\nconst offsetX = 0;\nconst offsetY = 0;\nconst x = Math.cos(radians) * distance + offsetX;\nconst y = Math.sin(radians) * distance + offsetY;\n\n// Return Results\nreturn {\n    x: x,\n    y: y,\n};"
 *
 * @arg InitialTime:eval
 * @text Initial Time
 * @parent SpawnSettings
 * @desc What is the initial time value for this light spawn(s)?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg TotalSpawns:eval
 * @text Total Spawns
 * @parent InitialTime:eval
 * @desc How many light spawns should there be?
 * Minimum value: 1. You may use JavaScript code.
 * @default 1
 *
 * @arg TimeIncrement:eval
 * @text Time Increment
 * @parent InitialTime:eval
 * @desc What is the time increment between spawns?
 * @default +1
 *
 * @arg ExpirationTimer:eval
 * @text Expiration Timer
 * @parent SpawnSettings
 * @desc After how many frames will light spawn(s) expire?
 * Use 0 for no expiration. You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LightSpawnNewFollowerLockedLight
 * @text SPAWN LIGHT: Create Light(s) on Follower
 * @desc Map only! Create new light spawn(s) following a follower.
 * Use tile coordinates for X and Y.
 * 
 * @arg LightSettings
 * @text Light Settings
 * 
 * @arg Settings:struct
 * @text Settings
 * @parent LightSettings
 * @type struct<Radial>
 * @desc Change the radial light settings for the light spawn(s).
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"32","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"255","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @parent LightSettings
 * @type struct<Behavior>
 * @desc Change the behaviors for the light spawn(s).
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @arg Target
 * @text Target
 *
 * @arg FollowerIndex:eval
 * @text Follower Index
 * @parent Target
 * @desc Which follower index should the light(s) follow?
 * Index starts at 0. You may use JavaScript code.
 * @default 0
 * 
 * @arg SpawnSettings
 * @text Spawn Settings
 *
 * @arg UpdateFunc:json
 * @text JS: Trajectory
 * @parent SpawnSettings
 * @type note
 * @desc Code used to determine the trajectory of these lights.
 * These will revolve around the origin X/Y position.
 * @default "// Declare Constants\nconst data = arguments[0];\nconst time = arguments[1];\n\n// Calculate Results\nconst angle = time * 1.0;\nconst radians = angle * Math.PI / 180.0;\nconst distance = 0;  // Distance from Center\nconst offsetX = 0;\nconst offsetY = 0;\nconst x = Math.cos(radians) * distance + offsetX;\nconst y = Math.sin(radians) * distance + offsetY;\n\n// Return Results\nreturn {\n    x: x,\n    y: y,\n};"
 *
 * @arg InitialTime:eval
 * @text Initial Time
 * @parent SpawnSettings
 * @desc What is the initial time value for this light spawn(s)?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg TotalSpawns:eval
 * @text Total Spawns
 * @parent InitialTime:eval
 * @desc How many light spawns should there be?
 * Minimum value: 1. You may use JavaScript code.
 * @default 1
 *
 * @arg TimeIncrement:eval
 * @text Time Increment
 * @parent InitialTime:eval
 * @desc What is the time increment between spawns?
 * @default +1
 *
 * @arg ExpirationTimer:eval
 * @text Expiration Timer
 * @parent SpawnSettings
 * @desc After how many frames will light spawn(s) expire?
 * Use 0 for no expiration. You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LightSpawnNewEventLockedLight
 * @text SPAWN LIGHT: Create Light(s) on Event
 * @desc Map only! Create new light spawn(s) following an event.
 * Use tile coordinates for X and Y.
 * 
 * @arg LightSettings
 * @text Light Settings
 * 
 * @arg Settings:struct
 * @text Settings
 * @parent LightSettings
 * @type struct<Radial>
 * @desc Change the radial light settings for the light spawn(s).
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"32","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"255","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @parent LightSettings
 * @type struct<Behavior>
 * @desc Change the behaviors for the light spawn(s).
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @arg Target
 * @text Target
 *
 * @arg EventID:eval
 * @text Event ID
 * @parent Target
 * @desc Which map event should the light(s) follow?
 * Use 0 for "this event". You may use JavaScript code.
 * @default 0
 * 
 * @arg SpawnSettings
 * @text Spawn Settings
 *
 * @arg UpdateFunc:json
 * @text JS: Trajectory
 * @parent SpawnSettings
 * @type note
 * @desc Code used to determine the trajectory of these lights.
 * These will revolve around the origin X/Y position.
 * @default "// Declare Constants\nconst data = arguments[0];\nconst time = arguments[1];\n\n// Calculate Results\nconst angle = time * 1.0;\nconst radians = angle * Math.PI / 180.0;\nconst distance = 0;  // Distance from Center\nconst offsetX = 0;\nconst offsetY = 0;\nconst x = Math.cos(radians) * distance + offsetX;\nconst y = Math.sin(radians) * distance + offsetY;\n\n// Return Results\nreturn {\n    x: x,\n    y: y,\n};"
 *
 * @arg InitialTime:eval
 * @text Initial Time
 * @parent SpawnSettings
 * @desc What is the initial time value for this light spawn(s)?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg TotalSpawns:eval
 * @text Total Spawns
 * @parent InitialTime:eval
 * @desc How many light spawns should there be?
 * Minimum value: 1. You may use JavaScript code.
 * @default 1
 *
 * @arg TimeIncrement:eval
 * @text Time Increment
 * @parent InitialTime:eval
 * @desc What is the time increment between spawns?
 * @default +1
 *
 * @arg ExpirationTimer:eval
 * @text Expiration Timer
 * @parent SpawnSettings
 * @desc After how many frames will light spawn(s) expire?
 * Use 0 for no expiration. You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LightSpawnExpireSpawnedLights
 * @text SPAWN LIGHT: Expire All Spawned Light(s)
 * @desc Map only! Expires all spawned lights.
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
 * @param LightingEffects
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Map:struct
 * @text Map Lighting Settings
 * @type struct<Map>
 * @desc Lighting settings for the map scene.
 * @default {"General":"","Enable:eval":"true","ShakeBuffer:num":"80","PlayerDefaults":"","PlayerRadial:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"radius:num\":\"216\",\"color:str\":\"#ffffff\",\"intensity:num\":\"0.15\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"64\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","PlayerRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","PlayerConical:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"fileAngleOffset:num\":\"0\",\"fileAnchorX:num\":\"0.1\",\"fileAnchorY:num\":\"0.5\",\"color:str\":\"#ffffff\",\"radius:num\":\"240\",\"miniRadius:num\":\"8\",\"intensity:num\":\"0.25\",\"Optional\":\"\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"AngleSettings\":\"\",\"angle:num\":\"60\",\"angleSway:num\":\"6\",\"swaySpeed:num\":\"0.03\",\"swayRng:eval\":\"true\",\"Direction\":\"\",\"forceDirection:num\":\"0\",\"followMouse:eval\":\"true\",\"useHandOffset:eval\":\"true\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","PlayerConicalBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","FollowerDefaults":"","FollowerRadial:struct":"{\"General\":\"\",\"enabled:eval\":\"false\",\"Properties\":\"\",\"filename:str\":\"\",\"radius:num\":\"216\",\"color:str\":\"#ffffff\",\"intensity:num\":\"0.15\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"64\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","FollowerRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","FollowerConical:struct":"{\"General\":\"\",\"enabled:eval\":\"false\",\"Properties\":\"\",\"filename:str\":\"\",\"fileAnchorX:num\":\"0.5\",\"fileAnchorY:num\":\"0.5\",\"color:str\":\"#ffffff\",\"radius:num\":\"240\",\"miniRadius:num\":\"8\",\"intensity:num\":\"0.25\",\"Optional\":\"\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"AngleSettings\":\"\",\"angle:num\":\"60\",\"angleSway:num\":\"6\",\"swaySpeed:num\":\"0.03\",\"swayRng:eval\":\"true\",\"Direction\":\"\",\"followMouse:eval\":\"false\",\"useHandOffset:eval\":\"true\",\"forceDirection:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","FollowerConicalBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","EventDefaults":"","EventRadial:struct":"{\"General\":\"\",\"enabled:eval\":\"false\",\"Properties\":\"\",\"filename:str\":\"\",\"radius:num\":\"72\",\"color:str\":\"#ffffff\",\"intensity:num\":\"0.50\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","EventRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","EventConical:struct":"{\"General\":\"\",\"enabled:eval\":\"false\",\"Properties\":\"\",\"filename:str\":\"\",\"fileAnchorX:num\":\"0.5\",\"fileAnchorY:num\":\"0.5\",\"color:str\":\"#ffffff\",\"radius:num\":\"240\",\"miniRadius:num\":\"8\",\"intensity:num\":\"0.25\",\"Optional\":\"\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"AngleSettings\":\"\",\"angle:num\":\"60\",\"angleSway:num\":\"6\",\"swaySpeed:num\":\"0.03\",\"swayRng:eval\":\"true\",\"Direction\":\"\",\"followMouse:eval\":\"false\",\"useHandOffset:eval\":\"true\",\"forceDirection:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","EventConicalBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","Vehicles":"","Boat":"","BoatBoarded":"","BoatBoardedRadialSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"color:str\":\"#ffffff\",\"radius:num\":\"240\",\"intensity:num\":\"0.50\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"128\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","BoatBoardedRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","BoatBoardedConicalSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"fileAngleOffset:num\":\"0\",\"fileAnchorX:num\":\"0.5\",\"fileAnchorY:num\":\"0.5\",\"color:str\":\"#ffffff\",\"radius:num\":\"360\",\"miniRadius:num\":\"8\",\"intensity:num\":\"0.25\",\"Optional\":\"\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"AngleSettings\":\"\",\"angle:num\":\"60\",\"angleSway:num\":\"0\",\"swaySpeed:num\":\"0.03\",\"swayRng:eval\":\"true\",\"Direction\":\"\",\"forceDirection:num\":\"0\",\"followMouse:eval\":\"true\",\"useHandOffset:eval\":\"true\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","BoatBoardedConicalBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","BoatBoardedConicalOffset:struct":"{\"StandardDirections\":\"\",\"dir2:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+8\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+7\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+8\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir4:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"-23\\\",\\\"pattern0Y:num\\\":\\\"-8\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"-24\\\",\\\"pattern1Y:num\\\":\\\"-8\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"-23\\\",\\\"pattern2Y:num\\\":\\\"-8\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir6:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+23\\\",\\\"pattern0Y:num\\\":\\\"-8\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+24\\\",\\\"pattern1Y:num\\\":\\\"-8\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+23\\\",\\\"pattern2Y:num\\\":\\\"-8\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir8:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"-23\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"-24\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"-23\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"DiagonalDirections\":\"\",\"dir1:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir3:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir7:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir9:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\"}","BoatUnboarded":"","BoatUnboardedRadialSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"color:str\":\"#ffffff\",\"radius:num\":\"72\",\"intensity:num\":\"0.50\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"64\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","BoatUnboardedRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","BoatUnboardedConicalSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"false\",\"Properties\":\"\",\"filename:str\":\"\",\"fileAngleOffset:num\":\"0\",\"fileAnchorX:num\":\"0.5\",\"fileAnchorY:num\":\"0.5\",\"color:str\":\"#ffffff\",\"radius:num\":\"360\",\"miniRadius:num\":\"8\",\"intensity:num\":\"0.25\",\"Optional\":\"\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"AngleSettings\":\"\",\"angle:num\":\"60\",\"angleSway:num\":\"0\",\"swaySpeed:num\":\"0.03\",\"swayRng:eval\":\"true\",\"Direction\":\"\",\"forceDirection:num\":\"0\",\"followMouse:eval\":\"true\",\"useHandOffset:eval\":\"true\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","BoatUnboardedConicalBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","BoatUnboardedConicalOffset:struct":"{\"StandardDirections\":\"\",\"dir2:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+8\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+7\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+8\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir4:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"-23\\\",\\\"pattern0Y:num\\\":\\\"-8\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"-24\\\",\\\"pattern1Y:num\\\":\\\"-8\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"-23\\\",\\\"pattern2Y:num\\\":\\\"-8\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir6:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+23\\\",\\\"pattern0Y:num\\\":\\\"-8\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+24\\\",\\\"pattern1Y:num\\\":\\\"-8\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+23\\\",\\\"pattern2Y:num\\\":\\\"-8\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir8:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"-23\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"-24\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"-23\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"DiagonalDirections\":\"\",\"dir1:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir3:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir7:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir9:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\"}","Ship":"","ShipBoarded":"","ShipBoardedRadialSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"color:str\":\"#ffffff\",\"radius:num\":\"300\",\"intensity:num\":\"0.50\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"160\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","ShipBoardedRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","ShipBoardedConicalSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"fileAngleOffset:num\":\"0\",\"fileAnchorX:num\":\"0.5\",\"fileAnchorY:num\":\"0.5\",\"color:str\":\"#ffffff\",\"radius:num\":\"480\",\"miniRadius:num\":\"16\",\"intensity:num\":\"0.25\",\"Optional\":\"\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"AngleSettings\":\"\",\"angle:num\":\"75\",\"angleSway:num\":\"0\",\"swaySpeed:num\":\"0.03\",\"swayRng:eval\":\"true\",\"Direction\":\"\",\"forceDirection:num\":\"0\",\"followMouse:eval\":\"true\",\"useHandOffset:eval\":\"true\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","ShipBoardedConicalBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","ShipBoardedConicalOffset:struct":"{\"StandardDirections\":\"\",\"dir2:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+23\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+24\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+23\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir4:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"-24\\\",\\\"pattern0Y:num\\\":\\\"+6\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"-24\\\",\\\"pattern1Y:num\\\":\\\"+7\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"-24\\\",\\\"pattern2Y:num\\\":\\\"+6\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir6:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+24\\\",\\\"pattern0Y:num\\\":\\\"+6\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+24\\\",\\\"pattern1Y:num\\\":\\\"+7\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+24\\\",\\\"pattern2Y:num\\\":\\\"+6\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir8:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"-24\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"-23\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"-24\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"DiagonalDirections\":\"\",\"dir1:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir3:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir7:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir9:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\"}","ShipUnboarded":"","ShipUnboardedRadialSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"color:str\":\"#ffffff\",\"radius:num\":\"72\",\"intensity:num\":\"0.50\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"64\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","ShipUnboardedRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","ShipUnboardedConicalSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"false\",\"Properties\":\"\",\"filename:str\":\"\",\"fileAngleOffset:num\":\"0\",\"fileAnchorX:num\":\"0.5\",\"fileAnchorY:num\":\"0.5\",\"color:str\":\"#ffffff\",\"radius:num\":\"480\",\"miniRadius:num\":\"16\",\"intensity:num\":\"0.25\",\"Optional\":\"\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"AngleSettings\":\"\",\"angle:num\":\"75\",\"angleSway:num\":\"0\",\"swaySpeed:num\":\"0.03\",\"swayRng:eval\":\"true\",\"Direction\":\"\",\"forceDirection:num\":\"0\",\"followMouse:eval\":\"true\",\"useHandOffset:eval\":\"true\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","ShipUnboardedConicalBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","ShipUnboardedConicalOffset:struct":"{\"StandardDirections\":\"\",\"dir2:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+23\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+24\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+23\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir4:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"-24\\\",\\\"pattern0Y:num\\\":\\\"+6\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"-24\\\",\\\"pattern1Y:num\\\":\\\"+7\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"-24\\\",\\\"pattern2Y:num\\\":\\\"+6\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir6:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+24\\\",\\\"pattern0Y:num\\\":\\\"+6\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+24\\\",\\\"pattern1Y:num\\\":\\\"+7\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+24\\\",\\\"pattern2Y:num\\\":\\\"+6\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir8:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"-24\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"-23\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"-24\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"DiagonalDirections\":\"\",\"dir1:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir3:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir7:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir9:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\"}","Airship":"","AirshipBoarded":"","AirshipBoardedRadialSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"color:str\":\"#ffffff\",\"radius:num\":\"360\",\"intensity:num\":\"0.50\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"192\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","AirshipBoardedRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","AirshipBoardedConicalSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"fileAngleOffset:num\":\"0\",\"fileAnchorX:num\":\"0.5\",\"fileAnchorY:num\":\"0.5\",\"color:str\":\"#ffffff\",\"radius:num\":\"600\",\"miniRadius:num\":\"32\",\"intensity:num\":\"0.25\",\"Optional\":\"\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"AngleSettings\":\"\",\"angle:num\":\"90\",\"angleSway:num\":\"0\",\"swaySpeed:num\":\"0.03\",\"swayRng:eval\":\"true\",\"Direction\":\"\",\"forceDirection:num\":\"0\",\"followMouse:eval\":\"true\",\"useHandOffset:eval\":\"true\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","AirshipBoardedConicalBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","AirshipBoardedConicalOffset:struct":"{\"StandardDirections\":\"\",\"dir2:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+1\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+1\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir4:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+1\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+1\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir6:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+1\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+1\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir8:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+1\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+1\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"DiagonalDirections\":\"\",\"dir1:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir3:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir7:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir9:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\"}","AirshipUnboarded":"","AirshipUnboardedRadialSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"color:str\":\"#ffffff\",\"radius:num\":\"72\",\"intensity:num\":\"0.50\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"64\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","AirshipUnboardedRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","AirshipUnboardedConicalSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"false\",\"Properties\":\"\",\"filename:str\":\"\",\"fileAngleOffset:num\":\"0\",\"fileAnchorX:num\":\"0.5\",\"fileAnchorY:num\":\"0.5\",\"color:str\":\"#ffffff\",\"radius:num\":\"600\",\"miniRadius:num\":\"32\",\"intensity:num\":\"0.25\",\"Optional\":\"\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"AngleSettings\":\"\",\"angle:num\":\"90\",\"angleSway:num\":\"0\",\"swaySpeed:num\":\"0.03\",\"swayRng:eval\":\"true\",\"Direction\":\"\",\"forceDirection:num\":\"0\",\"followMouse:eval\":\"true\",\"useHandOffset:eval\":\"true\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","AirshipUnboardedConicalBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","AirshipUnboardedConicalOffset:struct":"{\"StandardDirections\":\"\",\"dir2:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+1\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+1\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir4:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+1\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+1\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir6:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+1\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+1\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir8:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+1\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+1\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"DiagonalDirections\":\"\",\"dir1:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir3:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir7:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir9:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\"}"}
 * 
 * @param HandOffset:struct
 * @text Hand Position Offsets
 * @parent Map:struct
 * @type struct<HandOffset>
 * @desc Default offsets used for hand positions.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-12\",\"pattern0Y:num\":\"+14\",\"Pattern1\":\"\",\"pattern1X:num\":\"-12\",\"pattern1Y:num\":\"+16\",\"Pattern2\":\"\",\"pattern2X:num\":\"-12\",\"pattern2Y:num\":\"+18\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+2\",\"pattern0Y:num\":\"+16\",\"Pattern1\":\"\",\"pattern1X:num\":\"+4\",\"pattern1Y:num\":\"+16\",\"Pattern2\":\"\",\"pattern2X:num\":\"+6\",\"pattern2Y:num\":\"+16\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-2\",\"pattern0Y:num\":\"+16\",\"Pattern1\":\"\",\"pattern1X:num\":\"-4\",\"pattern1Y:num\":\"+16\",\"Pattern2\":\"\",\"pattern2X:num\":\"-6\",\"pattern2Y:num\":\"+16\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+12\",\"pattern0Y:num\":\"-18\",\"Pattern1\":\"\",\"pattern1X:num\":\"+12\",\"pattern1Y:num\":\"-16\",\"Pattern2\":\"\",\"pattern2X:num\":\"+12\",\"pattern2Y:num\":\"-14\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 * 
 * @param VsDashOffset:struct
 * @text VS8 Dash Offsets
 * @parent Map:struct
 * @type struct<HandOffset>
 * @desc Default offsets used for hand positions for VS8 sprites while dashing.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 * 
 * @param VsJumpOffset:struct
 * @text VS8 Jump Offsets
 * @parent Map:struct
 * @type struct<HandOffset>
 * @desc Default offsets used for hand positions for VS8 sprites while jumping.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @param Battle:struct
 * @text Battle Lighting Settings
 * @type struct<Battle>
 * @desc Lighting settings for the battle scene.
 * Requires VisuMZ_1_BattleCore!
 * @default {"General":"","Enable:eval":"true","ActorDefaults":"","ActorRadial:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"color:str\":\"#ffffff\",\"radius:num\":\"64\",\"intensity:num\":\"0.15\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"128\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","ActorRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","ActorAutoRadius:eval":"true","EnemyDefaults":"","EnemyRadial:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"color:str\":\"#ffffff\",\"radius:num\":\"64\",\"intensity:num\":\"0.15\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"128\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","EnemyRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","EnemyAutoRadius:eval":"true"}
 *
 * @param AntiLight:struct
 * @text Anti-Light Settings
 * @type struct<AntiLight>
 * @desc Settings to determine default anti-light tile markers.
 * @default {"Hard":"","HardRegions:arraynum":"[]","HardTerrainTags:arraynum":"[]","Soft":"","SoftRegions:arraynum":"[]","SoftTerrainTags:arraynum":"[]"}
 *
 * @param AutoLight:struct
 * @text Auto-Light Regions
 * @type struct<AutoLight>
 * @desc Light up specific parts of the map with regions.
 * @default {"opacity100:arraynum":"[]","opacity95:arraynum":"[]","opacity90:arraynum":"[]","opacity85:arraynum":"[]","opacity80:arraynum":"[]","opacity75:arraynum":"[]","opacity70:arraynum":"[]","opacity65:arraynum":"[]","opacity60:arraynum":"[]","opacity55:arraynum":"[]","opacity50:arraynum":"[]","opacity45:arraynum":"[]","opacity40:arraynum":"[]","opacity35:arraynum":"[]","opacity30:arraynum":"[]","opacity25:arraynum":"[]","opacity20:arraynum":"[]","opacity15:arraynum":"[]","opacity10:arraynum":"[]","opacity5:arraynum":"[]"}
 *
 * @param PresetColors:struct
 * @text Preset Colors Settings
 * @type struct<PresetColors>
 * @desc Preset Color settings for this plugin.
 * @default {"Daytime":"","dawn:str":"#5674b9","day:str":"#ffffff","dusk:str":"#f7941d","night:str":"#2e3192","Greyscale":"","white:str":"#ffffff","light grey:str":"#aaaaaa","grey:str":"#888888","dark grey:str":"#444444","black:str":"#000000","Reds":"","light red:str":"#f69679","red:str":"#ff0000","dark red:str":"#790000","Oranges":"","light orange:str":"#fdc689","orange:str":"#f7941d","dark orange:str":"#7d4900","Yellows":"","light yellow:str":"#fff799","yellow:str":"#ffff00","dark yellow:str":"#827b00","Greens":"","light green:str":"#a3d39c","green:str":"#00ff00","dark green:str":"#005e20","Cyans":"","light cyan:str":"#7accc8","cyan:str":"#00ffff","dark cyan:str":"#005952","Blues":"","light blue:str":"#ace4fa","blue:str":"#0000ff","dark blue:str":"#003663","Purples":"","light purple:str":"#a186be","purple:str":"#92278f","dark purple:str":"#32004b","Magentas":"","light magenta:str":"#bd8cbf","magenta:str":"#ff00ff","dark magenta:str":"#7b0046","Pinks":"","light pink:str":"#f49ac1","pink:str":"#f06eaa","dark pink:str":"#9e0039","Browns":"","light brown:str":"#c69c6d","brown:str":"#8c6239","dark brown:str":"#603913","Misc":"","normal:str":"#ffffff","none:str":"#ffffff","dark:str":"#000000","null:str":"#000000"}
 *
 * @param Options:struct
 * @text Options Menu Settings
 * @type struct<Options>
 * @desc Lighting settings for the options scene.
 * @default {"Options":"","AdjustRect:eval":"true","BlinkingLights":"","AddBlinkingLights:eval":"true","BlinkingLightsName:str":"Blinking Lights","PulsingLights":"","AddPulsingLights:eval":"true","PulsingLightsName:str":"Pulsing Lights"}
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
 * Map Lighting Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Map:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable For Map?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable Lighting Effects for map?
 * @default true
 *
 * @param ShakeBuffer:num
 * @text Shake Buffer
 * @parent General
 * @type number
 * @desc Screen shakes reveal more of the screen than normal.
 * How many pixels of buffer should you provide?
 * @default 80
 *
 * @param PlayerDefaults
 * @text Player Defaults
 * 
 * @param PlayerRadial:struct
 * @text Radial Light
 * @parent PlayerDefaults
 * @type struct<Radial>
 * @desc Default radial light settings for the player.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","radius:num":"216","color:str":"#ffffff","intensity:num":"0.15","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param PlayerRadialBehavior:struct
 * @text Default Behavior
 * @parent PlayerRadial:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for the player radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param PlayerConical:struct
 * @text Conical Light
 * @parent PlayerDefaults
 * @type struct<Conical>
 * @desc Default conical light settings for the player.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"240","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"6","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","followMouse:eval":"true","useHandOffset:eval":"true","forceDirection:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param PlayerConicalBehavior:struct
 * @text Default Behavior
 * @parent PlayerConical:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for the player conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @param FollowerDefaults
 * @text Follower Defaults
 * 
 * @param FollowerRadial:struct
 * @text Radial Light
 * @parent FollowerDefaults
 * @type struct<Radial>
 * @desc Default radial light settings for followers.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","radius:num":"216","color:str":"#ffffff","intensity:num":"0.15","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param FollowerRadialBehavior:struct
 * @text Default Behavior
 * @parent FollowerRadial:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for follower radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param FollowerConical:struct
 * @text Conical Light
 * @parent FollowerDefaults
 * @type struct<Conical>
 * @desc Default conical light settings for followers.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"240","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"6","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","followMouse:eval":"false","useHandOffset:eval":"true","forceDirection:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param FollowerConicalBehavior:struct
 * @text Default Behavior
 * @parent FollowerConical:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for follower conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @param EventDefaults
 * @text Event Defaults
 * 
 * @param EventRadial:struct
 * @text Radial Light
 * @parent EventDefaults
 * @type struct<Radial>
 * @desc Default radial light settings for events.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","radius:num":"72","color:str":"#ffffff","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"255","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param EventRadialBehavior:struct
 * @text Default Behavior
 * @parent EventRadial:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for event radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param EventConical:struct
 * @text Conical Light
 * @parent EventDefaults
 * @type struct<Conical>
 * @desc Default conical light settings for events.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"240","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"6","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","followMouse:eval":"false","useHandOffset:eval":"true","forceDirection:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param EventConicalBehavior:struct
 * @text Default Behavior
 * @parent EventConical:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for event conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param Vehicles
 * 
 * @param Boat
 * @parent Vehicles
 *
 * @param BoatBoarded
 * @text Boarded
 * @parent Boat
 * 
 * @param BoatBoardedRadialSettings:struct
 * @text Radial Light
 * @parent BoatBoarded
 * @type struct<Radial>
 * @desc Default radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"240","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"128","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param BoatBoardedRadialBehavior:struct
 * @text Default Behavior
 * @parent BoatBoardedRadialSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param BoatBoardedConicalSettings:struct
 * @text Conical Light
 * @parent BoatBoarded
 * @type struct<Conical>
 * @desc Default conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"360","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param BoatBoardedConicalBehavior:struct
 * @text Default Behavior
 * @parent BoatBoardedConicalSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param BoatBoardedConicalOffset:struct
 * @text "Hand" Offsets
 * @parent BoatBoardedConicalSettings:struct
 * @type struct<HandOffset>
 * @desc Default offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+8\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-23\",\"pattern0Y:num\":\"-8\",\"Pattern1\":\"\",\"pattern1X:num\":\"-24\",\"pattern1Y:num\":\"-8\",\"Pattern2\":\"\",\"pattern2X:num\":\"-23\",\"pattern2Y:num\":\"-8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+23\",\"pattern0Y:num\":\"-8\",\"Pattern1\":\"\",\"pattern1X:num\":\"+24\",\"pattern1Y:num\":\"-8\",\"Pattern2\":\"\",\"pattern2X:num\":\"+23\",\"pattern2Y:num\":\"-8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"-23\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"-24\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"-23\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @param BoatUnboarded
 * @text Unboarded
 * @parent Boat
 * 
 * @param BoatUnboardedRadialSettings:struct
 * @text Radial Light
 * @parent BoatUnboarded
 * @type struct<Radial>
 * @desc Default radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"72","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param BoatUnboardedRadialBehavior:struct
 * @text Default Behavior
 * @parent BoatUnboardedRadialSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param BoatUnboardedConicalSettings:struct
 * @text Conical Light
 * @parent BoatUnboarded
 * @type struct<Conical>
 * @desc Default conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"360","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param BoatUnboardedConicalBehavior:struct
 * @text Default Behavior
 * @parent BoatUnboardedConicalSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param BoatUnboardedConicalOffset:struct
 * @text "Hand" Offsets
 * @parent BoatUnboardedConicalSettings:struct
 * @type struct<HandOffset>
 * @desc Default offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+8\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-23\",\"pattern0Y:num\":\"-8\",\"Pattern1\":\"\",\"pattern1X:num\":\"-24\",\"pattern1Y:num\":\"-8\",\"Pattern2\":\"\",\"pattern2X:num\":\"-23\",\"pattern2Y:num\":\"-8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+23\",\"pattern0Y:num\":\"-8\",\"Pattern1\":\"\",\"pattern1X:num\":\"+24\",\"pattern1Y:num\":\"-8\",\"Pattern2\":\"\",\"pattern2X:num\":\"+23\",\"pattern2Y:num\":\"-8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"-23\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"-24\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"-23\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 * 
 * @param Ship
 * @parent Vehicles
 *
 * @param ShipBoarded
 * @text Boarded
 * @parent Ship
 * 
 * @param ShipBoardedRadialSettings:struct
 * @text Radial Light
 * @parent ShipBoarded
 * @type struct<Radial>
 * @desc Default radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"300","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"160","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param ShipBoardedRadialBehavior:struct
 * @text Default Behavior
 * @parent ShipBoardedRadialSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param ShipBoardedConicalSettings:struct
 * @text Conical Light
 * @parent ShipBoarded
 * @type struct<Conical>
 * @desc Default conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"480","miniRadius:num":"16","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"75","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param ShipBoardedConicalBehavior:struct
 * @text Default Behavior
 * @parent ShipBoardedConicalSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param ShipBoardedConicalOffset:struct
 * @text "Hand" Offsets
 * @parent ShipBoardedConicalSettings:struct
 * @type struct<HandOffset>
 * @desc Default offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+23\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+24\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+23\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-24\",\"pattern0Y:num\":\"+6\",\"Pattern1\":\"\",\"pattern1X:num\":\"-24\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"-24\",\"pattern2Y:num\":\"+6\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+24\",\"pattern0Y:num\":\"+6\",\"Pattern1\":\"\",\"pattern1X:num\":\"+24\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"+24\",\"pattern2Y:num\":\"+6\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"-24\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"-23\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"-24\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @param ShipUnboarded
 * @text Unboarded
 * @parent Ship
 * 
 * @param ShipUnboardedRadialSettings:struct
 * @text Radial Light
 * @parent ShipUnboarded
 * @type struct<Radial>
 * @desc Default radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"72","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param ShipUnboardedRadialBehavior:struct
 * @text Default Behavior
 * @parent ShipUnboardedRadialSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param ShipUnboardedConicalSettings:struct
 * @text Conical Light
 * @parent ShipUnboarded
 * @type struct<Conical>
 * @desc Default conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"480","miniRadius:num":"16","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"75","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param ShipUnboardedConicalBehavior:struct
 * @text Default Behavior
 * @parent ShipUnboardedConicalSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param ShipUnboardedConicalOffset:struct
 * @text "Hand" Offsets
 * @parent ShipUnboardedConicalSettings:struct
 * @type struct<HandOffset>
 * @desc Default offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+23\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+24\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+23\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-24\",\"pattern0Y:num\":\"+6\",\"Pattern1\":\"\",\"pattern1X:num\":\"-24\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"-24\",\"pattern2Y:num\":\"+6\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+24\",\"pattern0Y:num\":\"+6\",\"Pattern1\":\"\",\"pattern1X:num\":\"+24\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"+24\",\"pattern2Y:num\":\"+6\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"-24\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"-23\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"-24\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 * 
 * @param Airship
 * @parent Vehicles
 *
 * @param AirshipBoarded
 * @text Boarded
 * @parent Airship
 * 
 * @param AirshipBoardedRadialSettings:struct
 * @text Radial Light
 * @parent AirshipBoarded
 * @type struct<Radial>
 * @desc Default radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"360","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"192","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param AirshipBoardedRadialBehavior:struct
 * @text Default Behavior
 * @parent AirshipBoardedRadialSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param AirshipBoardedConicalSettings:struct
 * @text Conical Light
 * @parent AirshipBoarded
 * @type struct<Conical>
 * @desc Default conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"600","miniRadius:num":"32","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"90","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param AirshipBoardedConicalBehavior:struct
 * @text Default Behavior
 * @parent AirshipBoardedConicalSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param AirshipBoardedConicalOffset:struct
 * @text "Hand" Offsets
 * @parent AirshipBoardedConicalSettings:struct
 * @type struct<HandOffset>
 * @desc Default offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @param AirshipUnboarded
 * @text Unboarded
 * @parent Airship
 * 
 * @param AirshipUnboardedRadialSettings:struct
 * @text Radial Light
 * @parent AirshipUnboarded
 * @type struct<Radial>
 * @desc Default radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"72","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param AirshipUnboardedRadialBehavior:struct
 * @text Default Behavior
 * @parent AirshipUnboardedRadialSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param AirshipUnboardedConicalSettings:struct
 * @text Conical Light
 * @parent AirshipUnboarded
 * @type struct<Conical>
 * @desc Default conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"600","miniRadius:num":"32","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"90","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param AirshipUnboardedConicalBehavior:struct
 * @text Default Behavior
 * @parent AirshipUnboardedConicalSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param AirshipUnboardedConicalOffset:struct
 * @text "Hand" Offsets
 * @parent AirshipUnboardedConicalSettings:struct
 * @type struct<HandOffset>
 * @desc Default offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Lighting Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Battle:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable For Battle?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable Lighting Effects for battles?
 * Requires VisuMZ_1_BattleCore!
 * @default true
 * 
 * @param ActorDefaults
 * @text Actor Defaults
 * 
 * @param ActorRadial:struct
 * @text Battle Light
 * @parent ActorDefaults
 * @type struct<Radial>
 * @desc Default battle-radial light settings for actors.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"64","intensity:num":"0.15","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"128","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param ActorRadialBehavior:struct
 * @text Default Behavior
 * @parent ActorRadial:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for actor radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @param ActorAutoRadius:eval
 * @text Auto-Calc Radius
 * @parent ActorRadial:struct
 * @type boolean
 * @on Calculate Radius
 * @off Use Default Radius
 * @desc Automatically calculates the radius size based on sprite's
 * width/height. Ignore if use <Radial Light Radius: x>.
 * @default true
 * 
 * @param EnemyDefaults
 * @text Enemy Defaults
 * 
 * @param EnemyRadial:struct
 * @text Battle Light
 * @parent EnemyDefaults
 * @type struct<Radial>
 * @desc Default battle-radial light settings for enemies.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"64","intensity:num":"0.15","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"128","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param EnemyRadialBehavior:struct
 * @text Default Behavior
 * @parent EnemyRadial:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for enemy radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @param EnemyAutoRadius:eval
 * @text Auto-Calc Radius
 * @parent EnemyRadial:struct
 * @type boolean
 * @on Calculate Radius
 * @off Use Default Radius
 * @desc Automatically calculates the radius size based on sprite's
 * width/height. Ignore if use <Radial Light Radius: x>.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Anti-Light Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AntiLight:
 *
 * @param Hard
 * @text Hard Edges
 *
 * @param HardRegions:arraynum
 * @text Regions
 * @parent Hard
 * @type number[]
 * @min 1
 * @max 255
 * @desc Which regions by default apply anti-light?
 * 0 is ignored. Use a number from 1 to 255.
 * @default []
 *
 * @param HardTerrainTags:arraynum
 * @text Terrain Tags
 * @parent Hard
 * @type number[]
 * @min 1
 * @max 7
 * @desc Which terrain tags by default apply anti-light?
 * 0 is ignored. Use a number from 1 to 7.
 * @default []
 *
 * @param Soft
 * @text Soft Edges
 *
 * @param SoftRegions:arraynum
 * @text Regions
 * @parent Soft
 * @type number[]
 * @min 1
 * @max 255
 * @desc Which regions by default apply anti-light?
 * 0 is ignored. Use a number from 1 to 255.
 * @default []
 *
 * @param SoftTerrainTags:arraynum
 * @text Terrain Tags
 * @parent Soft
 * @type number[]
 * @min 1
 * @max 7
 * @desc Which terrain tags by default apply anti-light?
 * 0 is ignored. Use a number from 1 to 7.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Auto-Light Regions Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoLight:
 *
 * @param opacity100:arraynum
 * @text Opacity - 100%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity95:arraynum
 * @text Opacity - 95%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity90:arraynum
 * @text Opacity - 90%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity85:arraynum
 * @text Opacity - 85%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity80:arraynum
 * @text Opacity - 80%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity75:arraynum
 * @text Opacity - 75%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity70:arraynum
 * @text Opacity - 70%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity65:arraynum
 * @text Opacity - 65%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity60:arraynum
 * @text Opacity - 60%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity55:arraynum
 * @text Opacity - 55%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity50:arraynum
 * @text Opacity - 50%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity45:arraynum
 * @text Opacity - 45%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity40:arraynum
 * @text Opacity - 40%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity35:arraynum
 * @text Opacity - 35%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity30:arraynum
 * @text Opacity - 30%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity25:arraynum
 * @text Opacity - 25%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity20:arraynum
 * @text Opacity - 20%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity15:arraynum
 * @text Opacity - 15%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity10:arraynum
 * @text Opacity - 10%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity5:arraynum
 * @text Opacity - 5%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Preset Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PresetColors:
 *
 * @param Daytime
 * @text Daytime Colors
 *
 * @param dawn:str
 * @text Dawn
 * @parent Daytime
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #5674b9
 *
 * @param day:str
 * @text Day
 * @parent Daytime
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #ffffff
 *
 * @param dusk:str
 * @text Dusk
 * @parent Daytime
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #f7941d
 *
 * @param night:str
 * @text Night
 * @parent Daytime
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #2e3192
 *
 * @param Greyscale
 * @text Greyscale Colors
 *
 * @param white:str
 * @text White
 * @parent Greyscale
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #ffffff
 *
 * @param light grey:str
 * @text Light Grey
 * @parent Greyscale
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #aaaaaa
 *
 * @param grey:str
 * @text Grey
 * @parent Greyscale
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #888888
 *
 * @param dark grey:str
 * @text Dark Grey
 * @parent Greyscale
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #444444
 *
 * @param black:str
 * @text Black
 * @parent Greyscale
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #000000
 *
 * @param Reds
 * @text Red Colors
 *
 * @param light red:str
 * @text Light Red
 * @parent Reds
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #f69679
 *
 * @param red:str
 * @text Red
 * @parent Reds
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #ff0000
 *
 * @param dark red:str
 * @text Dark Red
 * @parent Reds
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #790000
 *
 * @param Oranges
 * @text Orange Colors
 *
 * @param light orange:str
 * @text Light Orange
 * @parent Oranges
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #fdc689
 *
 * @param orange:str
 * @text Orange
 * @parent Oranges
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #f7941d
 *
 * @param dark orange:str
 * @text Dark Orange
 * @parent Oranges
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #7d4900
 *
 * @param Yellows
 * @text Yellow Colors
 *
 * @param light yellow:str
 * @text Light Yellow
 * @parent Yellows
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #fff799
 *
 * @param yellow:str
 * @text Yellow
 * @parent Yellows
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #ffff00
 *
 * @param dark yellow:str
 * @text Dark Yellow
 * @parent Yellows
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #827b00
 *
 * @param Greens
 * @text Green Colors
 *
 * @param light green:str
 * @text Light Green
 * @parent Greens
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #a3d39c
 *
 * @param green:str
 * @text Green
 * @parent Greens
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #00ff00
 *
 * @param dark green:str
 * @text Dark Green
 * @parent Greens
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #005e20
 *
 * @param Cyans
 * @text Cyan Colors
 *
 * @param light cyan:str
 * @text Light Cyan
 * @parent Cyans
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #7accc8
 *
 * @param cyan:str
 * @text Cyan
 * @parent Cyans
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #00ffff
 *
 * @param dark cyan:str
 * @text Dark Cyan
 * @parent Cyans
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #005952
 *
 * @param Blues
 * @text Blue Colors
 *
 * @param light blue:str
 * @text Light Blue
 * @parent Blues
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #ace4fa
 *
 * @param blue:str
 * @text Blue
 * @parent Blues
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #0000ff
 *
 * @param dark blue:str
 * @text Dark Blue
 * @parent Blues
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #003663
 *
 * @param Purples
 * @text Purple Colors
 *
 * @param light purple:str
 * @text Light Purple
 * @parent Purples
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #a186be
 *
 * @param purple:str
 * @text Purple
 * @parent Purples
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #92278f
 *
 * @param dark purple:str
 * @text Dark Purple
 * @parent Purples
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #32004b
 *
 * @param Magentas
 * @text Magenta Colors
 *
 * @param light magenta:str
 * @text Light Magenta
 * @parent Magentas
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #bd8cbf
 *
 * @param magenta:str
 * @text Magenta
 * @parent Magentas
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #ff00ff
 *
 * @param dark magenta:str
 * @text Dark Magenta
 * @parent Magentas
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #7b0046
 *
 * @param Pinks
 * @text Pink Colors
 *
 * @param light pink:str
 * @text Light Pink
 * @parent Pinks
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #f49ac1
 *
 * @param pink:str
 * @text Pink
 * @parent Pinks
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #f06eaa
 *
 * @param dark pink:str
 * @text Dark Pink
 * @parent Pinks
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #9e0039
 *
 * @param Browns
 * @text Brown Colors
 *
 * @param light brown:str
 * @text Light Brown
 * @parent Browns
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #c69c6d
 *
 * @param brown:str
 * @text Brown
 * @parent Browns
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #8c6239
 *
 * @param dark brown:str
 * @text Dark Brown
 * @parent Browns
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #603913
 *
 * @param Misc
 * @text Misc Colors
 *
 * @param normal:str
 * @text Normal
 * @parent Misc
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #ffffff
 *
 * @param none:str
 * @text None
 * @parent Misc
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #ffffff
 *
 * @param dark:str
 * @text Dark
 * @parent Misc
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #000000
 *
 * @param null:str
 * @text Null
 * @parent Misc
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #000000
 *
 */
/* ----------------------------------------------------------------------------
 * Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 *
 * @param Options
 * @text Options
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param BlinkingLights
 * @text Blinking Lights
 *
 * @param AddBlinkingLights:eval
 * @text Add Option?
 * @parent BlinkingLights
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Blinking Lights' option to the Options menu?
 * @default true
 *
 * @param BlinkingLightsName:str
 * @text Option Name
 * @parent BlinkingLights
 * @desc Command name of the option.
 * @default Blinking Lights
 *
 * @param PulsingLights
 * @text Pulsing Lights
 *
 * @param AddPulsingLights:eval
 * @text Add Option?
 * @parent PulsingLights
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Pulsing Lights' option to the Options menu?
 * @default true
 *
 * @param PulsingLightsName:str
 * @text Option Name
 * @parent PulsingLights
 * @desc Command name of the option.
 * @default Pulsing Lights
 *
 */
/* ----------------------------------------------------------------------------
 * Radial Light Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Radial:
 *
 * @param General
 *
 * @param enabled:eval
 * @text Enabled?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Is this radial light enabled?
 * @default true
 *
 * @param Properties
 *
 * @param filename:str
 * @text Filename
 * @parent Properties
 * @type file
 * @dir img/pictures/
 * @require 1
 * @desc Filename used for the light effect image.
 * If used, ignore Color, Radius, and Intensity.
 * @default 
 *
 * @param color:str
 * @text Color
 * @parent Properties
 * @desc Color of the radial light in #rrggbb format.
 * For generated lights only. Ignore if using image.
 * @default #ffffff
 *
 * @param radius:num
 * @text Radius
 * @parent Properties
 * @type number
 * @min 1
 * @desc What is the radius of this radial light?
 * For generated lights only. Ignore if using image.
 * @default 72
 *
 * @param intensity:num
 * @text Intensity
 * @parent Properties
 * @desc Radial light intensity. Use value between 0 & 1.
 * For generated lights only. Ignore if using image.
 * @default 0.50
 *
 * @param Optional
 * 
 * @param angle:num
 * @text Angle
 * @parent Optional
 * @type number
 * @min 0
 * @max 360
 * @desc What is the angle of this radial light?
 * Only noticeable with using images.
 * @default 0
 * 
 * @param rotateSpeed:num
 * @text Rotate Speed
 * @parent angle:num
 * @type number
 * @desc The rotation speed of this light?
 * Lower: slower. Higher: faster. Negative: reverse.
 * @default +0
 *
 * @param blendMode:num
 * @text Blend Mode
 * @parent Optional
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the radial light?
 * @default 3
 *
 * @param opacity:num
 * @text Opacity
 * @parent Optional
 * @type number
 * @min 0
 * @max 255
 * @desc What is the opacity (0 to 255)?
 * Lower: dimmer. Higher: Brighter.
 * @default 255
 *
 * @param Offsets
 *
 * @param offsetX:num
 * @text Offset X
 * @parent Offsets
 * @desc Offset the X position of this light.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param offsetY:num
 * @text Offset Y
 * @parent Offsets
 * @desc Offset the Y position of this light.
 * Negative: up. Positive: down.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Conical Light Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Conical:
 *
 * @param General
 *
 * @param enabled:eval
 * @text Enabled?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Is this conical light enabled?
 * @default true
 *
 * @param Properties
 *
 * @param filename:str
 * @text Filename
 * @parent Properties
 * @type file
 * @dir img/pictures/
 * @require 1
 * @desc Filename used for the light effect image.
 * If used, ignore Color, Radius, and Intensity.
 * @default 
 * 
 * @param fileAngleOffset:num
 * @text Angle Offset
 * @parent filename:str
 * @type number
 * @min 0
 * @max 360
 * @desc Offset the image angle by this many degrees.
 * Only applies to images.
 * @default 0
 *
 * @param fileAnchorX:num
 * @text File Anchor X
 * @parent filename:str
 * @desc Anchor X used for images.
 * Left: 0.0; Center: 0.5; Right: 1.0
 * @default 0.5
 *
 * @param fileAnchorY:num
 * @text File Anchor Y
 * @parent filename:str
 * @desc Anchor Y used for images.
 * Top: 0.0; Middle: 0.5; Bottom: 1.0
 * @default 0.5
 *
 * @param color:str
 * @text Color
 * @parent Properties
 * @desc Color of the conical light in #rrggbb format.
 * For generated lights only. Ignore if using image.
 * @default #ffffff
 *
 * @param radius:num
 * @text Radius
 * @parent Properties
 * @type number
 * @min 1
 * @desc What is the radius of this conical light?
 * For generated lights only. Ignore if using image.
 * @default 240
 *
 * @param miniRadius:num
 * @text Source Radius
 * @parent radius:num
 * @type number
 * @min 1
 * @desc What is the radius of this light source?
 * For generated lights only. Ignore if using image.
 * @default 8
 *
 * @param intensity:num
 * @text Intensity
 * @parent Properties
 * @desc Conical light intensity. Use value between 0 & 1.
 * For generated lights only. Ignore if using image.
 * @default 0.25
 *
 * @param Optional
 *
 * @param blendMode:num
 * @text Blend Mode
 * @parent Optional
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the conical light?
 * @default 3
 *
 * @param opacity:num
 * @text Opacity
 * @parent Optional
 * @type number
 * @min 0
 * @max 255
 * @desc What is the opacity (0 to 255)?
 * Lower: dimmer. Higher: Brighter.
 * @default 255
 *
 * @param AngleSettings
 * @text Angle
 * 
 * @param angle:num
 * @text Arc Angle
 * @parent AngleSettings
 * @type number
 * @min 0
 * @max 360
 * @desc What is the angle of this conical light's arc?
 * @default 60
 * 
 * @param angleSway:num
 * @text Angle Sway
 * @parent AngleSettings
 * @type number
 * @desc How many degrees should this light sway?
 * Use 0 for no sway.
 * @default 6
 * 
 * @param swaySpeed:num
 * @text Sway Speed
 * @parent AngleSettings
 * @type number
 * @desc How fast should this light sway?
 * Lower: Slower; Higher: Faster
 * @default 0.1
 *
 * @param swayRng:eval
 * @text Randomize Sway?
 * @parent AngleSettings
 * @type boolean
 * @on Randomize
 * @off Structured
 * @desc Change the sway to offset at different starting points?
 * @default true
 *
 * @param Direction
 *
 * @param forceDirection:num
 * @text Forced Direction?
 * @parent Direction
 * @type select
 * @option none
 * @value 0
 * @option lower left
 * @value 1
 * @option down
 * @value 2
 * @option lower right
 * @value 3
 * @option left
 * @value 4
 * @option right
 * @value 6
 * @option upper left
 * @value 7
 * @option up
 * @value 8
 * @option upper right
 * @value 9
 * @desc Force the conical light to face a certain direction?
 * @default 0
 *
 * @param followMouse:eval
 * @text Follow Cursor?
 * @parent Direction
 * @type boolean
 * @on Follow Mouse
 * @off Don't Follow
 * @desc Follow the mouse cursor?
 * @default false
 *
 * @param Offsets
 *
 * @param useHandOffset:eval
 * @text Use Hand Offset?
 * @parent Offsets
 * @type boolean
 * @on Hand Offset
 * @off Center Offset
 * @desc Put the light source on the target's "hand" position? Disables the two settings below if on.
 * @default true
 *
 * @param offsetX:num
 * @text Offset X (Non-Hand)
 * @parent Offsets
 * @desc Offset the X position of this light.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param offsetY:num
 * @text Offset Y (Non-Hand)
 * @parent Offsets
 * @desc Offset the Y position of this light.
 * Negative: up. Positive: down.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Light Behavior Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Behavior:
 *
 * @param Blink
 *
 * @param blinkRate:num
 * @text Blink Rate
 * @parent Blink
 * @desc What is the rate of occurance for this effect?
 * Use a decimal number between 0 and 1.
 * @default 0.00
 *
 * @param blinkModifier:num
 * @text Blink Modifier
 * @parent Blink
 * @desc Static multiplicative opacity modifier. Before additive.
 * Use a decimal number between -1 and 1. Negatives allowed.
 * @default -0.50
 *
 * @param Flicker
 *
 * @param flickerRate:num
 * @text Flicker Rate
 * @parent Flicker
 * @desc What is the rate of occurance for this effect?
 * Use a decimal number between 0 and 1.
 * @default 0.00
 *
 * @param flickerModifier:num
 * @text Flicker Modifier
 * @parent Flicker
 * @desc Random multiplicative opacity modifier. Before additive.
 * Use a decimal number between -1 and 1. Negatives allowed.
 * @default -0.50
 *
 * @param Flash
 *
 * @param flashRate:num
 * @text Flash Rate
 * @parent Flash
 * @desc What is the rate of occurance for this effect?
 * Use a decimal number between 0 and 1.
 * @default 0.00
 *
 * @param flashModifier:num
 * @text Flash Modifier
 * @parent Flash
 * @desc Static additive opacity modifier. Before multiplicative.
 * Use a decimal number between -1 and 1. Negatives allowed.
 * @default +0.50
 *
 * @param Flare
 *
 * @param flareRate:num
 * @text Flare Rate
 * @parent Flare
 * @desc What is the rate of occurance for this effect?
 * Use a decimal number between 0 and 1.
 * @default 0.00
 *
 * @param flareModifier:num
 * @text Flare Modifier
 * @parent Flare
 * @desc Random additive opacity modifier. Before multiplicative.
 * Use a decimal number between -1 and 1. Negatives allowed.
 * @default +0.50
 * 
 * @param Glow
 *
 * @param glowRate:num
 * @text Glow Rate
 * @parent Glow
 * @desc What is the glow change for this light?
 * Use a decimal number between 0 and 1.
 * @default 0.00
 *
 * @param glowSpeed:num
 * @text Glow Speed
 * @parent Glow
 * @desc What is the speed at which glow oscillates at?
 * Use a decimal number between 0 and 1.
 * @default 0.10
 *
 * @param glowRng:eval
 * @text Randomize Glow?
 * @parent Glow
 * @type boolean
 * @on Randomize
 * @off Structured
 * @desc Offset the glow to oscillate at different starting points?
 * @default true
 * 
 * @param Pulse
 *
 * @param pulseRate:num
 * @text Pulse Rate
 * @parent Pulse
 * @desc What is the pulse change for this light?
 * Use a decimal number between 0 and 1.
 * @default 0.00
 *
 * @param pulseSpeed:num
 * @text Pulse Speed
 * @parent Pulse
 * @desc What is the speed at which pulse oscillates at?
 * Use a decimal number between 0 and 1.
 * @default 0.10
 *
 * @param pulseRng:eval
 * @text Randomize Pulse?
 * @parent Pulse
 * @type boolean
 * @on Randomize
 * @off Structured
 * @desc Offset the pulse to oscillate at different starting points?
 * @default true
 * 
 * @param Pattern
 *
 * @param patternName:str
 * @text Pattern Name
 * @parent Pattern
 * @type select
 * @option none
 * @option normal
 * @option fluorescent
 * @option halogen
 * @option incandescent
 * @option candle
 * @option torch
 * @option campfire
 * @option fast strobe
 * @option slow strobe
 * @option strong pulse
 * @option medium pulse
 * @option slow pulse
 * @option underwater
 * @desc Select the pattern name for this light.
 * Ignore if using any Custom Pattern.
 * @default none
 *
 * @param pattern:str
 * @text Custom Pattern
 * @parent Pattern
 * @desc Create a custom pattern with letters from a to z.
 * Where 'a' is transparent and 'z' is opaque.
 * @default 
 *
 * @param patternDelay:num
 * @text Frame Delay
 * @parent Pattern
 * @type number
 * @min 1
 * @desc What is the frame delay between pattern updates?
 * @default 6
 *
 */
/* ----------------------------------------------------------------------------
 * Hand Offsets Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~HandOffset:
 * 
 * @param StandardDirections
 * @text Standard Directions
 * 
 * @param dir2:struct
 * @text Down
 * @parent StandardDirections
 * @type struct<PatternOffset>
 * @desc Offsets to determine conical light source position when facing this direction.
 * @default {"Pattern0":"","pattern0X:num":"-12","pattern0Y:num":"+14","Pattern1":"","pattern1X:num":"-12","pattern1Y:num":"+16","Pattern2":"","pattern2X:num":"-12","pattern2Y:num":"+18","Pattern3":"(Unused by Default)","pattern3X:num":"+0","pattern3Y:num":"+0","Pattern4":"(Unused by Default)","pattern4X:num":"+0","pattern4Y:num":"+0","Pattern5":"(Unused by Default)","pattern5X:num":"+0","pattern5Y:num":"+0","Pattern6":"(Unused by Default)","pattern6X:num":"+0","pattern6Y:num":"+0","Pattern7":"(Unused by Default)","pattern7X:num":"+0","pattern7Y:num":"+0","Pattern8":"(Unused by Default)","pattern8X:num":"+0","pattern8Y:num":"+0","Pattern9":"(Unused by Default)","pattern9X:num":"+0","pattern9Y:num":"+0","Pattern10":"(Unused by Default)","pattern10X:num":"+0","pattern10Y:num":"+0"}
 * 
 * @param dir4:struct
 * @text Left
 * @parent StandardDirections
 * @type struct<PatternOffset>
 * @desc Offsets to determine conical light source position when facing this direction.
 * @default {"Pattern0":"","pattern0X:num":"+2","pattern0Y:num":"+16","Pattern1":"","pattern1X:num":"+4","pattern1Y:num":"+16","Pattern2":"","pattern2X:num":"+6","pattern2Y:num":"+16","Pattern3":"(Unused by Default)","pattern3X:num":"+0","pattern3Y:num":"+0","Pattern4":"(Unused by Default)","pattern4X:num":"+0","pattern4Y:num":"+0","Pattern5":"(Unused by Default)","pattern5X:num":"+0","pattern5Y:num":"+0","Pattern6":"(Unused by Default)","pattern6X:num":"+0","pattern6Y:num":"+0","Pattern7":"(Unused by Default)","pattern7X:num":"+0","pattern7Y:num":"+0","Pattern8":"(Unused by Default)","pattern8X:num":"+0","pattern8Y:num":"+0","Pattern9":"(Unused by Default)","pattern9X:num":"+0","pattern9Y:num":"+0","Pattern10":"(Unused by Default)","pattern10X:num":"+0","pattern10Y:num":"+0"}
 * 
 * @param dir6:struct
 * @text Right
 * @parent StandardDirections
 * @type struct<PatternOffset>
 * @desc Offsets to determine conical light source position when facing this direction.
 * @default {"Pattern0":"","pattern0X:num":"-2","pattern0Y:num":"+16","Pattern1":"","pattern1X:num":"-4","pattern1Y:num":"+16","Pattern2":"","pattern2X:num":"-6","pattern2Y:num":"+16","Pattern3":"(Unused by Default)","pattern3X:num":"+0","pattern3Y:num":"+0","Pattern4":"(Unused by Default)","pattern4X:num":"+0","pattern4Y:num":"+0","Pattern5":"(Unused by Default)","pattern5X:num":"+0","pattern5Y:num":"+0","Pattern6":"(Unused by Default)","pattern6X:num":"+0","pattern6Y:num":"+0","Pattern7":"(Unused by Default)","pattern7X:num":"+0","pattern7Y:num":"+0","Pattern8":"(Unused by Default)","pattern8X:num":"+0","pattern8Y:num":"+0","Pattern9":"(Unused by Default)","pattern9X:num":"+0","pattern9Y:num":"+0","Pattern10":"(Unused by Default)","pattern10X:num":"+0","pattern10Y:num":"+0"}
 * 
 * @param dir8:struct
 * @text Up
 * @parent StandardDirections
 * @type struct<PatternOffset>
 * @desc Offsets to determine conical light source position when facing this direction.
 * @default {"Pattern0":"","pattern0X:num":"+12","pattern0Y:num":"-18","Pattern1":"","pattern1X:num":"+12","pattern1Y:num":"-16","Pattern2":"","pattern2X:num":"+12","pattern2Y:num":"-14","Pattern3":"(Unused by Default)","pattern3X:num":"+0","pattern3Y:num":"+0","Pattern4":"(Unused by Default)","pattern4X:num":"+0","pattern4Y:num":"+0","Pattern5":"(Unused by Default)","pattern5X:num":"+0","pattern5Y:num":"+0","Pattern6":"(Unused by Default)","pattern6X:num":"+0","pattern6Y:num":"+0","Pattern7":"(Unused by Default)","pattern7X:num":"+0","pattern7Y:num":"+0","Pattern8":"(Unused by Default)","pattern8X:num":"+0","pattern8Y:num":"+0","Pattern9":"(Unused by Default)","pattern9X:num":"+0","pattern9Y:num":"+0","Pattern10":"(Unused by Default)","pattern10X:num":"+0","pattern10Y:num":"+0"}
 * 
 * @param DiagonalDirections
 * @text Diagonal Directions
 * 
 * @param dir1:struct
 * @text Lower Left
 * @parent DiagonalDirections
 * @type struct<PatternOffset>
 * @desc Offsets to determine conical light source position when facing this direction.
 * @default {"Pattern0":"","pattern0X:num":"+0","pattern0Y:num":"+0","Pattern1":"","pattern1X:num":"+0","pattern1Y:num":"+0","Pattern2":"","pattern2X:num":"+0","pattern2Y:num":"+0","Pattern3":"(Unused by Default)","pattern3X:num":"+0","pattern3Y:num":"+0","Pattern4":"(Unused by Default)","pattern4X:num":"+0","pattern4Y:num":"+0","Pattern5":"(Unused by Default)","pattern5X:num":"+0","pattern5Y:num":"+0","Pattern6":"(Unused by Default)","pattern6X:num":"+0","pattern6Y:num":"+0","Pattern7":"(Unused by Default)","pattern7X:num":"+0","pattern7Y:num":"+0","Pattern8":"(Unused by Default)","pattern8X:num":"+0","pattern8Y:num":"+0","Pattern9":"(Unused by Default)","pattern9X:num":"+0","pattern9Y:num":"+0","Pattern10":"(Unused by Default)","pattern10X:num":"+0","pattern10Y:num":"+0"}
 * 
 * @param dir3:struct
 * @text Lower Right
 * @parent DiagonalDirections
 * @type struct<PatternOffset>
 * @desc Offsets to determine conical light source position when facing this direction.
 * @default {"Pattern0":"","pattern0X:num":"+0","pattern0Y:num":"+0","Pattern1":"","pattern1X:num":"+0","pattern1Y:num":"+0","Pattern2":"","pattern2X:num":"+0","pattern2Y:num":"+0","Pattern3":"(Unused by Default)","pattern3X:num":"+0","pattern3Y:num":"+0","Pattern4":"(Unused by Default)","pattern4X:num":"+0","pattern4Y:num":"+0","Pattern5":"(Unused by Default)","pattern5X:num":"+0","pattern5Y:num":"+0","Pattern6":"(Unused by Default)","pattern6X:num":"+0","pattern6Y:num":"+0","Pattern7":"(Unused by Default)","pattern7X:num":"+0","pattern7Y:num":"+0","Pattern8":"(Unused by Default)","pattern8X:num":"+0","pattern8Y:num":"+0","Pattern9":"(Unused by Default)","pattern9X:num":"+0","pattern9Y:num":"+0","Pattern10":"(Unused by Default)","pattern10X:num":"+0","pattern10Y:num":"+0"}
 * 
 * @param dir7:struct
 * @text Upper Left
 * @parent DiagonalDirections
 * @type struct<PatternOffset>
 * @desc Offsets to determine conical light source position when facing this direction.
 * @default {"Pattern0":"","pattern0X:num":"+0","pattern0Y:num":"+0","Pattern1":"","pattern1X:num":"+0","pattern1Y:num":"+0","Pattern2":"","pattern2X:num":"+0","pattern2Y:num":"+0","Pattern3":"(Unused by Default)","pattern3X:num":"+0","pattern3Y:num":"+0","Pattern4":"(Unused by Default)","pattern4X:num":"+0","pattern4Y:num":"+0","Pattern5":"(Unused by Default)","pattern5X:num":"+0","pattern5Y:num":"+0","Pattern6":"(Unused by Default)","pattern6X:num":"+0","pattern6Y:num":"+0","Pattern7":"(Unused by Default)","pattern7X:num":"+0","pattern7Y:num":"+0","Pattern8":"(Unused by Default)","pattern8X:num":"+0","pattern8Y:num":"+0","Pattern9":"(Unused by Default)","pattern9X:num":"+0","pattern9Y:num":"+0","Pattern10":"(Unused by Default)","pattern10X:num":"+0","pattern10Y:num":"+0"}
 * 
 * @param dir9:struct
 * @text Upper Right
 * @parent DiagonalDirections
 * @type struct<PatternOffset>
 * @desc Offsets to determine conical light source position when facing this direction.
 * @default {"Pattern0":"","pattern0X:num":"+0","pattern0Y:num":"+0","Pattern1":"","pattern1X:num":"+0","pattern1Y:num":"+0","Pattern2":"","pattern2X:num":"+0","pattern2Y:num":"+0","Pattern3":"(Unused by Default)","pattern3X:num":"+0","pattern3Y:num":"+0","Pattern4":"(Unused by Default)","pattern4X:num":"+0","pattern4Y:num":"+0","Pattern5":"(Unused by Default)","pattern5X:num":"+0","pattern5Y:num":"+0","Pattern6":"(Unused by Default)","pattern6X:num":"+0","pattern6Y:num":"+0","Pattern7":"(Unused by Default)","pattern7X:num":"+0","pattern7Y:num":"+0","Pattern8":"(Unused by Default)","pattern8X:num":"+0","pattern8Y:num":"+0","Pattern9":"(Unused by Default)","pattern9X:num":"+0","pattern9Y:num":"+0","Pattern10":"(Unused by Default)","pattern10X:num":"+0","pattern10Y:num":"+0"}
 *
 */
/* ----------------------------------------------------------------------------
 * Pattern Offsets Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PatternOffset:
 *
 * @param Pattern0
 * @text Pattern 0
 *
 * @param pattern0X:num
 * @text Offset X
 * @parent Pattern0
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern0Y:num
 * @text Offset Y
 * @parent Pattern0
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern1
 * @text Pattern 1
 *
 * @param pattern1X:num
 * @text Offset X
 * @parent Pattern1
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern1Y:num
 * @text Offset Y
 * @parent Pattern1
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern2
 * @text Pattern 2
 *
 * @param pattern2X:num
 * @text Offset X
 * @parent Pattern2
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern2Y:num
 * @text Offset Y
 * @parent Pattern2
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern3
 * @text Pattern 3
 * @default (Unused by Default)
 *
 * @param pattern3X:num
 * @text Offset X
 * @parent Pattern3
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern3Y:num
 * @text Offset Y
 * @parent Pattern3
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern4
 * @text Pattern 4
 * @default (Unused by Default)
 *
 * @param pattern4X:num
 * @text Offset X
 * @parent Pattern4
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern4Y:num
 * @text Offset Y
 * @parent Pattern4
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern5
 * @text Pattern 5
 * @default (Unused by Default)
 *
 * @param pattern5X:num
 * @text Offset X
 * @parent Pattern5
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern5Y:num
 * @text Offset Y
 * @parent Pattern5
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern6
 * @text Pattern 6
 * @default (Unused by Default)
 *
 * @param pattern6X:num
 * @text Offset X
 * @parent Pattern6
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern6Y:num
 * @text Offset Y
 * @parent Pattern6
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern7
 * @text Pattern 7
 * @default (Unused by Default)
 *
 * @param pattern7X:num
 * @text Offset X
 * @parent Pattern7
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern7Y:num
 * @text Offset Y
 * @parent Pattern7
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern8
 * @text Pattern 8
 * @default (Unused by Default)
 *
 * @param pattern8X:num
 * @text Offset X
 * @parent Pattern8
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern8Y:num
 * @text Offset Y
 * @parent Pattern8
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern9
 * @text Pattern 9
 * @default (Unused by Default)
 *
 * @param pattern9X:num
 * @text Offset X
 * @parent Pattern9
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern9Y:num
 * @text Offset Y
 * @parent Pattern9
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern10
 * @text Pattern 10
 * @default (Unused by Default)
 *
 * @param pattern10X:num
 * @text Offset X
 * @parent Pattern10
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern10Y:num
 * @text Offset Y
 * @parent Pattern10
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 */
//=============================================================================

const _0x1ecdb4=_0x30f7;(function(_0x5a0f92,_0x164994){const _0x87525b=_0x30f7,_0x521960=_0x5a0f92();while(!![]){try{const _0x5cc7fc=parseInt(_0x87525b(0x414))/0x1+-parseInt(_0x87525b(0x2c1))/0x2*(-parseInt(_0x87525b(0x323))/0x3)+-parseInt(_0x87525b(0x37c))/0x4*(parseInt(_0x87525b(0x429))/0x5)+parseInt(_0x87525b(0x2a9))/0x6+-parseInt(_0x87525b(0x438))/0x7+-parseInt(_0x87525b(0x20d))/0x8*(-parseInt(_0x87525b(0x453))/0x9)+parseInt(_0x87525b(0x251))/0xa*(-parseInt(_0x87525b(0x1e0))/0xb);if(_0x5cc7fc===_0x164994)break;else _0x521960['push'](_0x521960['shift']());}catch(_0x139c19){_0x521960['push'](_0x521960['shift']());}}}(_0x2a00,0xceb52));var label='LightingEffects',tier=tier||0x0,dependencies=[_0x1ecdb4(0x442),_0x1ecdb4(0x460)],pluginData=$plugins[_0x1ecdb4(0x420)](function(_0x5bb7b0){const _0x4434b0=_0x1ecdb4;return _0x5bb7b0[_0x4434b0(0x30d)]&&_0x5bb7b0[_0x4434b0(0x441)][_0x4434b0(0x2a0)]('['+label+']');})[0x0];function _0x2a00(){const _0x55b906=['setVehicleLightingData','#fdc689','isUsingMapCoordinates','Game_Event_setupPageSettings','Duration','applyInverse','_lastFilename','isDestinationValid','_radialLight','isDead','_conicalLight','ShakeBuffer','mmmaaammmaaammmabcdefaaaammmmabcdefmmmaaaa','characterName','conicalLightWalkOffsets','updateCharacterAngle','light\x20green','initVehicleLightingEffectsSettings','isLightingEnabled','isSpriteVS8dir','type','conicalLightDashOffsets','lightingOverlayOpacityValue','boxWidth','updateLastInputType','some','#c69c6d','sunset','dir%1','miniRadius','adjustPosition','_driving','getSourceDirection','ConicalBehaviorPulseRng','conicalLightBehavior','_followerRadialLightBehavior','light\x20yellow','LightingEffects','isDashingAndMoving','_hardAntiLightMask','ConicalBehaviorFlashRate','ActorID','#a3d39c','yellow','flickerRate','MULTIPLY','checkConicalLightBehaviorStringTags','processLightingEffectsAutoTint','Offset','getTimeOverlay','ConicalLightOffset','flashRate','PlayerConical','time','_colorSprite','RadialBehaviorFlareRate','lightingOverlayColor','ADD','#8c6239','ConicalLightChangePlayerSettings','color','_source','width','ConicalBehaviorPatternUpdateDelay','createLightContainer','targetColor','fileAngleOffset','pulseSpeed','_softAntiLightMask','follower','AutoTint','ConicalBehaviorPulseSpeed','ActorRadial','Enable','opacityDuration','makeDeepCopy','#603913','save','pop','softAntiLightTerrainTags','RadialLightDiameter','grey','call','EnemyAutoRadius','ConfigManager_makeData','createBitmap','_lastTouchInputX','scale','SHAKE_BUFFER','RadialLightAngle','PlayerRadial','#%1','#0000ff','createLensFlareSprite','abcdefghijklmnopqrstuvwxyzyxwvutsrqponmlkjihgfedcba','pulse2','patternName','SMOOTH_MASKING','UnboardedBehavior','max','568502GdWUds','parse','AddBlinkingLights','checkProperties','slow\x20strobe','#fff799','antiLightMaskSoftTerrainTags','#f06eaa','maxCommands','tileset','radialLight','createLightingEffectsLightSpawns','filter','floor','_spriteset','_followerConicalLightBehavior','softAntiLightRegionIDs','left','enemy','ConicalLightColor','_direction','5XrYdun','readFlag','lightingOverlayOpacityRate','beginPath','pulseRng','fileAnchorX','#000000','#aaaaaa','checkConicalLightBasicStringTags','active','NORMAL','addChild','exit','down','glowRng','2918174lsTFmn','Settings','cos','getFollowerConicalLightBehavior','setConicalLightSettings','updatePosition','light\x20red','BoardedOffset','setRadialLightBehavior','description','VisuMZ_0_CoreEngine','hardAntiLightRegionIDs','blendMode','normal','fluorescent','RadialLightRotateSpeed','isLightVisible','RadialBehaviorPatternSequence','HandOffset','createOverlayTexture','dark\x20gray','AddPulsingLights','setFollowerRadialLightBehavior','setupLightingEffectsNotetags','PlayerRadialBehavior','upper\x20left','shiftLightingOverlayOpacity','5369958KendBY','light\x20magenta','ConicalLightFollowMouse','displayY','applyData','pattern','Color','flickerModifier','isUsingTimeOverlay','FUNC','RadialBehaviorPulseNoRng','_conicalLightJumpOffsets','Unboarded','VisuMZ_1_EventsMoveCore','isHidden','glowSpeed','checkRadialLightBehaviorStringTags','colorDuration','updateAntiLightMask','UnboardedSettings','updateOpacity','_proxySprite','getRadius','originX','createDestination','initLightingEffectsSettings','RadialBehaviorPulseRate','ConicalLightGeneric','createLowerLayer','isJumping','forceDirection','_testDummies','Boarded','isEnabled','Sprite_Battler_setBattler','SCREEN','rgba(','updateLightingEffectsLightSpawns','dark','UpdateFunc','ConicalLightBlendMode','abcdefghijklmnopqrrqponmlkjihgfedcba','ConvertParams','allowCharacterAngleUpdate','black','initLightingEffects','flicker','Spriteset_Base_createLowerLayer','medium\x20pulse','_followerConicalLight','flareModifier','setupLightingEffectsSpawns','#005e20','Scene_Options_maxCommands','ARRAYNUM','parameters','Game_Screen_initialize','pow','updateFlare','TotalSpawns','updatePulse','ConicalBehaviorFlickerMod','isPosing','Options','pulseRate','light\x20pink','light\x20orange','glowRate','match','#bd8cbf','softTerrainTagIDs','EventRadial','ConicalLightIntensity','VisuMZ_2_TileGrafterSystem','radius','SpriteMaskFilter','BlinkingLights','applyDefaultLightingEffectsVehicleData','Sprite_SvEnemy','updatePattern','setupRadialLight','AutoRadius','ConicalBehaviorGlowRng','EventID','fillStyle','toLowerCase','_lastEnabled','_lastInputTouch','RadialLightChangeBoatSettings','createDefaultLightingEffectsVehicleData','BoardedSettings','rotateSpeed','dawn','createLightSpawnFunction','dark\x20brown','noLightingOverlay','randomInt','setup','regionAutoLightOpacity','Game_BattlerBase_initMembers','strobe1','updateAutoLightAreas','isFollowingFollower','1177gHeKuq','updateAngle','BoardedBehavior','PulsingLights','createAntiLightMaskBitmap','isFollowingEvent','additive','ConicalBehaviorFlareRate','EnemyRadial','ConfigManager_applyData','pulsingLights','light\x20brown','trim','drawRadialLight','RegExp','_lightSpawns','visible','setupConicalLight','#32004b','followMouse','_lastAngle','#003663','updateGlow','CoordinatesY','createAutoLightRegions','RadialLightChangeShipSettings','Game_Player_initMembers','clearPageSettings','createLightingEffects','_patternIndex','_battleField','isUseTimeOverlay','checkLightingEffectsStringTags','clone','night','#00ffff','worldTransform','VisuMZ_1_BattleCore','dark\x20orange','_erased','ConicalLightRadius','pulse1','ConicalBehaviorPatternPreset','isPressed','right','16rlXjgo','name','jklmnopqrstuvwxyzyxwvutsrqponmlkj','pulse','radialLightBehavior','JSON','hardRegionIDs','incandescent','VisuMZ_2_WeatherEffects','magenta','strobe2','_lastTouchInputY','pattern%1X','dark\x20pink','updateOverlayColor','ConicalLightChangeShipSettings','addLightingEffectsBlinkingLightsCommand','RadialBehaviorFlashRate','blinkingLights','intensity','originY','RadialLightIntensity','isVisible','prototype','ConicalLightAngleSway','FollowerIndex','BattleLightChangeEnemySettings','light\x20blue','hexToRgba','addLightingEffects','isBoat','hasAntiLightTiles','tileWidth','terrainTag','mmmaaaabcdefgmmmmaaaammmaamm','hexToArray','drawTestDummy','ConicalLightFileAnchor','candle2','_vehicleLightingSettings','opacity%1','LightSpawnNewEventLockedLight','createTestDummies','ConicalLightNoFollowMouse','updateFlicker','ConicalLightOpacityRate','needsRecreation','setConicalLightDashOffsets','Boat','updateVisibility','_grafterRefreshRegions','BLEND_MODES','updateBlendMode','#2e3192','_noDarknessOverlay','gray','offsetY','red','CalcSmartOpacity','setupLightingEffectsSettings','RadialBehaviorPulseSpeed','createBattleField','CoordinatesX','day','campfire','mamamamamama','Behavior','ConicalOffsetChangeBoat','231510jbRApJ','loadPicture','ConicalLightOpacityFlat','Spriteset_Battle_createBattleField','lightingEffects','ConicalBehaviorBlinkRate','ConicalBehaviorGlowNoRng','mmmmmaaaaammmmmaaaaaabcdefgabcdefg','setConicalLightWalkOffsets','event','split','swaySpeed','setRadialLightSettings','anchor','createRadialGradient','blt','conicalLightOffsets','_lastInputDir','lightingOverlayOpacity','parseDirectionText','#f49ac1','pattern%1Y','updateTestDummies','_lastIntensity','offsetX','ConicalBehaviorFlareMod','#ffff00','update','flashModifier','blinkRate','blendModeParser','%1%2%3%4','opacity','Ship','version','destroy','orange','#444444','white','LightingEffectsOptions','renderer','ConicalLightSrcRadius','blue','updateFlash','Window_Options_addGeneralOptions','createColorSprite','Battle','addChildToLightContainer','destroyLightContainer','round','VsDashOffset','tileHeight','conicalLight','regionId','angleSway','airship','pink','updateLightSpawn','LIGHTING_EFFECTS_SMART_AUTO_OPACITY','startTint','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','ConicalLightUseHandOffset','arc','generateLight','EventConical','#f69679','RadialBehaviorPatternUpdateDelay','_lensFlareSprite','#ff00ff','BattleLightChangeActorSettings','initialize','dark\x20red','add','removeChild','setFollowerRadialLightSettings','patternDelay','updateLensFlareSprite','adjustPositionByMap','RadialLightTurnOff','includes','setLightingOverlayOpacity','SoftTerrainTags','flicker1','_lastMiniRadius','isSceneBattle','lineTo','eventId','ConicalBehaviorPulseNoRng','9344376SmUMlz','addLightingEffectsPulsingLightsCommand','autoRadius','screen','note','_lightContainer','isLoopHorizontal','adjustPositionByTarget','candle1','getFollowerConicalLightSettings','addCommand','ConicalBehaviorPulseRate','dark\x20cyan','createAutoLightBitmap','isSceneMap','ExpirationTimer','_glowRng','moveTo','updateBlink','RadialLightOpacityRate','Spriteset_Map_hideCharacters','ConicalLightChangeAirshipSettings','antiLightMaskSoftRegions','frameCount','22684lCaIGL','cacheNewData','push','getLastPluginCommandInterpreter','ConicalBehaviorGlowRate','purple','dark\x20grey','followers','Map','expire','drawConicalLight','Game_Screen_update','test','setConicalLightJumpOffsets','aaaaaaaazzzzzzzz','RadialLightChangeFollowerSettings','format','_scene','updateLightingEffectsOpacity','blinkModifier','softRegionIDs','isAntiLightingOverlay','bitmap','RadialBehaviorBlinkMod','vehicle','STR','Game_Event_clearPageSettings','ConicalLightAngle','initMembers','join','updateOverlayRender','_antiLightMasks','upper\x20right','MAX_SAFE_INTEGER','#00ff00','#a186be','_autoLightSprite','_swayRng','_testDummyB','ceil','RadialLightRadius','filename','RadialBehaviorFlashMod','AdjustRect','FollowerConicalBehavior','useHandOffset','dark\x20magenta','RadialBehaviorBlinkRate','cacheOpacity','#790000','underwater','NUM','map','VsJumpOffset','ConicalLightSwaySpeed','random','_lastRadius','shiftLightingOverlayColor','lightContainer','ConicalOffsetChangeShip','ConicalLightCentralOffset','checkLightingEffectsAutoTintPresets','reduce','RadialLightBlendMode','_radialLightBehavior','Radial','ActorAutoRadius','setFollowerConicalLightBehavior','isDirectionFixed','#ff0000','Conical','lightData','swayRng','hardTerrainTagIDs','RadialBehaviorFlickerRate','player','status','setLightingOverlayColor','setBattler','RadialLightColor','settings','_testDummyR','isEventRunning','opacityPatternParser','boat','cyan','ActorRadialBehavior','ConicalBehaviorBlinkMod','setFollowerConicalLightSettings','ALLOW_ANTI_LIGHT_MASK','behavior','Game_Map_setup','setConicalLightBehavior','dark\x20purple','ship','ARRAYSTRUCT','leader','Sprite_Character_initialize','363dlcplx','actor','_conicalLightBehavior','isUsingScreenCoordinates','_overlayColor','_pulseRng','dark\x20green','setVehicleLightingConicalOffset','RadialLightChangeAirshipSettings','_realX','addColorStop','RadialBehaviorGlowSpeed','arrayToHex','ConicalLightDiameter','EventRadialBehavior','setupBattleLightingEffectsSettings','InitialTime','lower\x20right','substring','registerCommand','createNewLightSpawn','AutoLight','Opacity','dark\x20blue','#f7941d','_lightingEffects','RadialBehaviorGlowRng','getFollowerRadialLightSettings','light\x20cyan','updateLightingEffectsColor','boxHeight','#827b00','mmnmmommommnonmmonqnmmo','RadialLightGeneric','height','flareRate','_conicalLightWalkOffsets','_conicalLightDashOffsets','strobe','RadialBehaviorGlowNoRng','checkRadialLightBasicStringTags','candle3','padZero','addLightingEffectsOptionCommands','ConicalLightForceDir','_hardAlphaMask','sepia','lightSpawns','LightSpawnNewFollowerLockedLight','conicalLightJumpOffsets','angle','behaviorData','strong\x20pulse','FollowerConical','OverlayChangeToCustomColor','atan2','UnboardedOffset','canvasToMapX','halogen','fillRect','texture','render','displayX','context','ARRAYSTR','list','setSource','#888888','ConicalLightSwayNoRng','isBusy','makeData','toString','ConicalLightHandOffset','length','dark\x20yellow','_followerRadialLight','handOffsetData','isLoopVertical','create','createAntiLightMask','toUpperCase','RadialBehaviorFlareMod','#ffffff','filters','Game_Map_update','RadialLightFilename','Spriteset_Map_createDestination','_baseTexture','_app','3803564WALiwW','_lightSpawnsFunc','processLightingOverlayColor','ConicalOffsetChangeAirship','getVehicleLightingData','AntiLight','followerIndex','EnemyRadialBehavior','setupLightingEffectsCommentTags','#ace4fa','clamp','Spriteset_Base_createUpperLayer','_originSprite','_testDummyG','rgba(0,0,0,0)','RenderTexture','addGeneralOptions','light\x20gray','page','members','SoftRegions','TimeIncrement','SpawnLights','#7b0046','constructor','fileAnchorY','RetrieveOpacityPattern','findTargetSprite','Game_Actor_setup','updateMain','updateBehavior','_softAlphaMask','hardAntiLightTerrainTags','restore','presetColorParser','isFollowingPlayer','#9e0039','updateCursorAngle','LightSpawnNewMapLockedLight','checkConicalLightHandOffsetStringTags','antiLightMaskHardTerrainTags','ConicalLightChangeEventSettings','PulsingLightsName','enabled','createUpperLayer','setupPageSettings','_lastColor','HardTerrainTags','_lastInputTimer','code','PlayerConicalBehavior','flicker2'];_0x2a00=function(){return _0x55b906;};return _0x2a00();}VisuMZ[label]['Settings']=VisuMZ[label][_0x1ecdb4(0x439)]||{},VisuMZ['ConvertParams']=function(_0x37fce2,_0x365c15){const _0x4a3c92=_0x1ecdb4;for(const _0x3a6bc8 in _0x365c15){if(_0x3a6bc8['match'](/(.*):(.*)/i)){const _0x2d8e60=String(RegExp['$1']),_0x111a83=String(RegExp['$2'])[_0x4a3c92(0x373)]()[_0x4a3c92(0x1ec)]();let _0x3d929e,_0x3ae62d,_0x24980a;switch(_0x111a83){case _0x4a3c92(0x2f4):_0x3d929e=_0x365c15[_0x3a6bc8]!==''?Number(_0x365c15[_0x3a6bc8]):0x0;break;case _0x4a3c92(0x1af):_0x3ae62d=_0x365c15[_0x3a6bc8]!==''?JSON[_0x4a3c92(0x415)](_0x365c15[_0x3a6bc8]):[],_0x3d929e=_0x3ae62d[_0x4a3c92(0x2f5)](_0x4e99f7=>Number(_0x4e99f7));break;case'EVAL':_0x3d929e=_0x365c15[_0x3a6bc8]!==''?eval(_0x365c15[_0x3a6bc8]):null;break;case'ARRAYEVAL':_0x3ae62d=_0x365c15[_0x3a6bc8]!==''?JSON[_0x4a3c92(0x415)](_0x365c15[_0x3a6bc8]):[],_0x3d929e=_0x3ae62d[_0x4a3c92(0x2f5)](_0x193a4e=>eval(_0x193a4e));break;case _0x4a3c92(0x212):_0x3d929e=_0x365c15[_0x3a6bc8]!==''?JSON['parse'](_0x365c15[_0x3a6bc8]):'';break;case'ARRAYJSON':_0x3ae62d=_0x365c15[_0x3a6bc8]!==''?JSON[_0x4a3c92(0x415)](_0x365c15[_0x3a6bc8]):[],_0x3d929e=_0x3ae62d[_0x4a3c92(0x2f5)](_0x125dd3=>JSON[_0x4a3c92(0x415)](_0x125dd3));break;case _0x4a3c92(0x45c):_0x3d929e=_0x365c15[_0x3a6bc8]!==''?new Function(JSON[_0x4a3c92(0x415)](_0x365c15[_0x3a6bc8])):new Function('return\x200');break;case'ARRAYFUNC':_0x3ae62d=_0x365c15[_0x3a6bc8]!==''?JSON[_0x4a3c92(0x415)](_0x365c15[_0x3a6bc8]):[],_0x3d929e=_0x3ae62d[_0x4a3c92(0x2f5)](_0x6d3186=>new Function(JSON[_0x4a3c92(0x415)](_0x6d3186)));break;case _0x4a3c92(0x2da):_0x3d929e=_0x365c15[_0x3a6bc8]!==''?String(_0x365c15[_0x3a6bc8]):'';break;case _0x4a3c92(0x363):_0x3ae62d=_0x365c15[_0x3a6bc8]!==''?JSON['parse'](_0x365c15[_0x3a6bc8]):[],_0x3d929e=_0x3ae62d['map'](_0x2bcabf=>String(_0x2bcabf));break;case'STRUCT':_0x24980a=_0x365c15[_0x3a6bc8]!==''?JSON[_0x4a3c92(0x415)](_0x365c15[_0x3a6bc8]):{},_0x3d929e=VisuMZ[_0x4a3c92(0x1a3)]({},_0x24980a);break;case _0x4a3c92(0x320):_0x3ae62d=_0x365c15[_0x3a6bc8]!==''?JSON[_0x4a3c92(0x415)](_0x365c15[_0x3a6bc8]):[],_0x3d929e=_0x3ae62d[_0x4a3c92(0x2f5)](_0x15c2e4=>VisuMZ[_0x4a3c92(0x1a3)]({},JSON[_0x4a3c92(0x415)](_0x15c2e4)));break;default:continue;}_0x37fce2[_0x2d8e60]=_0x3d929e;}}return _0x37fce2;},(_0xdcb454=>{const _0x3f55fb=_0x1ecdb4,_0x5def0a=_0xdcb454[_0x3f55fb(0x20e)];for(const _0x3cf32d of dependencies){if(!Imported[_0x3cf32d]){alert(_0x3f55fb(0x28d)[_0x3f55fb(0x2d1)](_0x5def0a,_0x3cf32d)),SceneManager['exit']();break;}}const _0x3c5594=_0xdcb454['description'];if(_0x3c5594['match'](/\[Version[ ](.*?)\]/i)){const _0xc9dbc4=Number(RegExp['$1']);_0xc9dbc4!==VisuMZ[label][_0x3f55fb(0x273)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x3f55fb(0x2d1)](_0x5def0a,_0xc9dbc4)),SceneManager[_0x3f55fb(0x435)]());}if(_0x3c5594['match'](/\[Tier[ ](\d+)\]/i)){const _0x58e24b=Number(RegExp['$1']);_0x58e24b<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x3f55fb(0x2d1)](_0x5def0a,_0x58e24b,tier)),SceneManager[_0x3f55fb(0x435)]()):tier=Math[_0x3f55fb(0x413)](_0x58e24b,tier);}VisuMZ[_0x3f55fb(0x1a3)](VisuMZ[label][_0x3f55fb(0x439)],_0xdcb454['parameters']);})(pluginData),PluginManager[_0x1ecdb4(0x336)](pluginData[_0x1ecdb4(0x20e)],_0x1ecdb4(0x359),_0x43bbb4=>{const _0x5985c2=_0x1ecdb4;VisuMZ[_0x5985c2(0x1a3)](_0x43bbb4,_0x43bbb4);const _0x419221=_0x43bbb4[_0x5985c2(0x459)],_0x89df4b=_0x43bbb4[_0x5985c2(0x339)],_0x126fac=_0x43bbb4['Duration'];$gameScreen[_0x5985c2(0x2fa)](_0x419221,_0x126fac),$gameScreen[_0x5985c2(0x452)](_0x89df4b,_0x126fac);}),PluginManager[_0x1ecdb4(0x336)](pluginData['name'],'OverlayChangeToPreset',_0x5e26ce=>{const _0x33a983=_0x1ecdb4;VisuMZ['ConvertParams'](_0x5e26ce,_0x5e26ce);const _0x195915=_0x5e26ce['Color'],_0x5d6595=_0x5e26ce[_0x33a983(0x3b4)];$gameScreen[_0x33a983(0x37e)](_0x195915,_0x5d6595);}),PluginManager['registerCommand'](pluginData[_0x1ecdb4(0x20e)],_0x1ecdb4(0x296),_0x36e935=>{const _0x334e32=_0x1ecdb4;VisuMZ['ConvertParams'](_0x36e935,_0x36e935);const _0xfd00f9=_0x36e935[_0x334e32(0x3d9)],_0x470d40=_0x36e935[_0x334e32(0x439)],_0x335cbd=_0x36e935['Behavior'],_0x39bf75=_0x36e935[_0x334e32(0x1ca)];for(const _0x1afeb7 of _0xfd00f9){const _0x902c59=$gameActors[_0x334e32(0x324)](_0x1afeb7);if(!_0x902c59)continue;_0x902c59[_0x334e32(0x25d)](_0x470d40),_0x902c59[_0x334e32(0x440)](_0x335cbd),_0x902c59[_0x334e32(0x41e)]()['autoRadius']=_0x39bf75;}}),PluginManager['registerCommand'](pluginData[_0x1ecdb4(0x20e)],_0x1ecdb4(0x227),_0x382cb3=>{const _0x27cfa0=_0x1ecdb4;VisuMZ[_0x27cfa0(0x1a3)](_0x382cb3,_0x382cb3);const _0x34aeee=_0x382cb3['EnemyIndex'],_0x491592=_0x382cb3[_0x27cfa0(0x439)],_0x383979=_0x382cb3[_0x27cfa0(0x24f)],_0x1e9277=_0x382cb3[_0x27cfa0(0x1ca)];for(const _0x20a466 of _0x34aeee){const _0x2f0e7a=$gameTroop[_0x27cfa0(0x38f)]()[_0x20a466];if(!_0x2f0e7a)continue;_0x2f0e7a['setRadialLightSettings'](_0x491592),_0x2f0e7a[_0x27cfa0(0x440)](_0x383979),_0x2f0e7a[_0x27cfa0(0x41e)]()[_0x27cfa0(0x2ab)]=_0x1e9277;}}),PluginManager[_0x1ecdb4(0x336)](pluginData['name'],'RadialLightChangePlayerSettings',_0x542194=>{const _0x552f92=_0x1ecdb4;VisuMZ[_0x552f92(0x1a3)](_0x542194,_0x542194);const _0x1d3da7=_0x542194[_0x552f92(0x439)],_0x1508aa=_0x542194['Behavior'];$gamePlayer[_0x552f92(0x25d)](_0x1d3da7),$gamePlayer[_0x552f92(0x440)](_0x1508aa);}),PluginManager[_0x1ecdb4(0x336)](pluginData[_0x1ecdb4(0x20e)],_0x1ecdb4(0x2d0),_0x6c8044=>{const _0x444c76=_0x1ecdb4;VisuMZ[_0x444c76(0x1a3)](_0x6c8044,_0x6c8044);const _0x19412d=_0x6c8044['Settings'],_0x5da9ae=_0x6c8044[_0x444c76(0x24f)];$gamePlayer[_0x444c76(0x29b)](_0x19412d),$gamePlayer[_0x444c76(0x44e)](_0x5da9ae);}),PluginManager[_0x1ecdb4(0x336)](pluginData[_0x1ecdb4(0x20e)],'RadialLightChangeEventSettings',_0x4a5e96=>{const _0xab14ef=_0x1ecdb4;VisuMZ[_0xab14ef(0x1a3)](_0x4a5e96,_0x4a5e96);const _0x5a47c1=_0x4a5e96[_0xab14ef(0x1cc)],_0x5c55ef=_0x4a5e96['Settings'],_0x5085a9=_0x4a5e96[_0xab14ef(0x24f)],_0x218353=$gameTemp[_0xab14ef(0x2c4)]();for(let _0x4bb8dd of _0x5a47c1){if(_0x4bb8dd===0x0)_0x4bb8dd=_0x218353['eventId']();const _0x3f80d1=$gameMap[_0xab14ef(0x25a)](_0x4bb8dd);_0x3f80d1&&(_0x3f80d1[_0xab14ef(0x25d)](_0x5c55ef),_0x3f80d1['setRadialLightBehavior'](_0x5085a9));}}),PluginManager[_0x1ecdb4(0x336)](pluginData[_0x1ecdb4(0x20e)],_0x1ecdb4(0x1d1),_0x3aade5=>{const _0x5e6be1=_0x1ecdb4;VisuMZ[_0x5e6be1(0x1a3)](_0x3aade5,_0x3aade5);const _0x488721=$gameMap[_0x5e6be1(0x315)](),_0x3ab5d4=_0x3aade5[_0x5e6be1(0x1d3)],_0x3c131f=_0x3aade5[_0x5e6be1(0x1e2)],_0x1dd188=_0x3aade5['UnboardedSettings'],_0x47c4ef=_0x3aade5[_0x5e6be1(0x412)];if(_0x488721){const _0x332e85=!![];_0x488721['setVehicleLightingData'](_0x3ab5d4,!![],_0x332e85,![]),_0x488721[_0x5e6be1(0x3b0)](_0x3c131f,!![],_0x332e85,!![]),_0x488721[_0x5e6be1(0x3b0)](_0x1dd188,![],_0x332e85,![]),_0x488721['setVehicleLightingData'](_0x47c4ef,![],_0x332e85,!![]);}}),PluginManager[_0x1ecdb4(0x336)](pluginData[_0x1ecdb4(0x20e)],_0x1ecdb4(0x1f9),_0x1244d2=>{const _0x55e533=_0x1ecdb4;VisuMZ[_0x55e533(0x1a3)](_0x1244d2,_0x1244d2);const _0x24c78a=$gameMap[_0x55e533(0x31f)](),_0x2f1fad=_0x1244d2[_0x55e533(0x1d3)],_0x1da152=_0x1244d2[_0x55e533(0x1e2)],_0x1e1669=_0x1244d2[_0x55e533(0x18c)],_0x1a35c6=_0x1244d2[_0x55e533(0x412)];if(_0x24c78a){const _0x27de8a=!![];_0x24c78a[_0x55e533(0x3b0)](_0x2f1fad,!![],_0x27de8a,![]),_0x24c78a[_0x55e533(0x3b0)](_0x1da152,!![],_0x27de8a,!![]),_0x24c78a[_0x55e533(0x3b0)](_0x1e1669,![],_0x27de8a,![]),_0x24c78a[_0x55e533(0x3b0)](_0x1a35c6,![],_0x27de8a,!![]);}}),PluginManager[_0x1ecdb4(0x336)](pluginData['name'],_0x1ecdb4(0x32b),_0x8c1c9a=>{const _0x35094c=_0x1ecdb4;VisuMZ[_0x35094c(0x1a3)](_0x8c1c9a,_0x8c1c9a);const _0x3966fa=$gameMap[_0x35094c(0x288)](),_0x7361db=_0x8c1c9a['BoardedSettings'],_0xfc5e27=_0x8c1c9a[_0x35094c(0x1e2)],_0x36b5a7=_0x8c1c9a['UnboardedSettings'],_0x16a59b=_0x8c1c9a[_0x35094c(0x412)];if(_0x3966fa){const _0xf7b085=!![];_0x3966fa[_0x35094c(0x3b0)](_0x7361db,!![],_0xf7b085,![]),_0x3966fa[_0x35094c(0x3b0)](_0xfc5e27,!![],_0xf7b085,!![]),_0x3966fa[_0x35094c(0x3b0)](_0x36b5a7,![],_0xf7b085,![]),_0x3966fa['setVehicleLightingData'](_0x16a59b,![],_0xf7b085,!![]);}}),PluginManager[_0x1ecdb4(0x336)](pluginData[_0x1ecdb4(0x20e)],_0x1ecdb4(0x3eb),_0x2390e3=>{const _0x12dd08=_0x1ecdb4;VisuMZ[_0x12dd08(0x1a3)](_0x2390e3,_0x2390e3);const _0x11f984=_0x2390e3['Settings'],_0x28650a=_0x2390e3['Behavior'];$gamePlayer['setConicalLightSettings'](_0x11f984),$gamePlayer[_0x12dd08(0x31d)](_0x28650a);}),PluginManager['registerCommand'](pluginData['name'],'ConicalLightChangeFollowerSettings',_0x2db332=>{const _0x5e6ab2=_0x1ecdb4;VisuMZ[_0x5e6ab2(0x1a3)](_0x2db332,_0x2db332);const _0x5340bf=_0x2db332[_0x5e6ab2(0x439)],_0x14d57f=_0x2db332[_0x5e6ab2(0x24f)];$gamePlayer[_0x5e6ab2(0x319)](_0x5340bf),$gamePlayer[_0x5e6ab2(0x304)](_0x14d57f);}),PluginManager[_0x1ecdb4(0x336)](pluginData[_0x1ecdb4(0x20e)],_0x1ecdb4(0x3a5),_0x4e4c27=>{const _0x236531=_0x1ecdb4;VisuMZ[_0x236531(0x1a3)](_0x4e4c27,_0x4e4c27);const _0x30e252=_0x4e4c27[_0x236531(0x1cc)],_0x2d0dc7=_0x4e4c27['Settings'],_0x3170ea=_0x4e4c27[_0x236531(0x24f)],_0x5e2b5a=$gameTemp[_0x236531(0x2c4)]();for(let _0x27d2f1 of _0x30e252){if(_0x27d2f1===0x0)_0x27d2f1=_0x5e2b5a[_0x236531(0x2a7)]();const _0x443598=$gameMap[_0x236531(0x25a)](_0x27d2f1);_0x443598&&(_0x443598[_0x236531(0x43c)](_0x2d0dc7),_0x443598[_0x236531(0x31d)](_0x3170ea));}}),PluginManager[_0x1ecdb4(0x336)](pluginData[_0x1ecdb4(0x20e)],'ConicalLightChangeBoatSettings',_0x29a654=>{const _0x2bbb8c=_0x1ecdb4;VisuMZ[_0x2bbb8c(0x1a3)](_0x29a654,_0x29a654);const _0x1cf7b2=$gameMap[_0x2bbb8c(0x315)](),_0x1acdb2=_0x29a654['BoardedSettings'],_0x27d1a7=_0x29a654[_0x2bbb8c(0x1e2)],_0x2077db=_0x29a654[_0x2bbb8c(0x18c)],_0x853098=_0x29a654[_0x2bbb8c(0x412)];if(_0x1cf7b2){const _0x222e3d=![];_0x1cf7b2[_0x2bbb8c(0x3b0)](_0x1acdb2,!![],_0x222e3d,![]),_0x1cf7b2['setVehicleLightingData'](_0x27d1a7,!![],_0x222e3d,!![]),_0x1cf7b2[_0x2bbb8c(0x3b0)](_0x2077db,![],_0x222e3d,![]),_0x1cf7b2[_0x2bbb8c(0x3b0)](_0x853098,![],_0x222e3d,!![]);}}),PluginManager[_0x1ecdb4(0x336)](pluginData[_0x1ecdb4(0x20e)],_0x1ecdb4(0x21c),_0x34265f=>{const _0x1b5f51=_0x1ecdb4;VisuMZ[_0x1b5f51(0x1a3)](_0x34265f,_0x34265f);const _0x4e162e=$gameMap['ship'](),_0x52910f=_0x34265f['BoardedSettings'],_0x5a2448=_0x34265f[_0x1b5f51(0x1e2)],_0x44752b=_0x34265f['UnboardedSettings'],_0x2eae32=_0x34265f[_0x1b5f51(0x412)];if(_0x4e162e){const _0x2f91a5=![];_0x4e162e[_0x1b5f51(0x3b0)](_0x52910f,!![],_0x2f91a5,![]),_0x4e162e[_0x1b5f51(0x3b0)](_0x5a2448,!![],_0x2f91a5,!![]),_0x4e162e['setVehicleLightingData'](_0x44752b,![],_0x2f91a5,![]),_0x4e162e['setVehicleLightingData'](_0x2eae32,![],_0x2f91a5,!![]);}}),PluginManager[_0x1ecdb4(0x336)](pluginData['name'],_0x1ecdb4(0x2be),_0x11b407=>{const _0x1a23fd=_0x1ecdb4;VisuMZ[_0x1a23fd(0x1a3)](_0x11b407,_0x11b407);const _0x1ed998=$gameMap[_0x1a23fd(0x288)](),_0x655e62=_0x11b407[_0x1a23fd(0x1d3)],_0x4d31ab=_0x11b407[_0x1a23fd(0x1e2)],_0x2638a9=_0x11b407['UnboardedSettings'],_0x150a04=_0x11b407[_0x1a23fd(0x412)];if(_0x1ed998){const _0x28e571=![];_0x1ed998[_0x1a23fd(0x3b0)](_0x655e62,!![],_0x28e571,![]),_0x1ed998[_0x1a23fd(0x3b0)](_0x4d31ab,!![],_0x28e571,!![]),_0x1ed998[_0x1a23fd(0x3b0)](_0x2638a9,![],_0x28e571,![]),_0x1ed998[_0x1a23fd(0x3b0)](_0x150a04,![],_0x28e571,!![]);}}),PluginManager[_0x1ecdb4(0x336)](pluginData[_0x1ecdb4(0x20e)],'ConicalOffsetChangeActor',_0x3643f7=>{const _0x58112b=_0x1ecdb4;VisuMZ[_0x58112b(0x1a3)](_0x3643f7,_0x3643f7);const _0x12d8e9=_0x3643f7[_0x58112b(0x3d9)],_0x24d2df=_0x3643f7['Enable'],_0x540149=_0x3643f7[_0x58112b(0x44a)],_0x5916e4=_0x3643f7[_0x58112b(0x283)],_0x3a280c=_0x3643f7['VsJumpOffset'];for(const _0x3d8d2b of _0x12d8e9){const _0x389e68=$gameActors['actor'](_0x3d8d2b);if(!_0x389e68)continue;_0x389e68['setConicalLightWalkOffsets'](_0x540149),_0x389e68['setConicalLightDashOffsets'](_0x5916e4),_0x389e68[_0x58112b(0x2ce)](_0x3a280c),_0x389e68===$gameParty[_0x58112b(0x321)]()?$gamePlayer[_0x58112b(0x285)]()[_0x58112b(0x2ee)]=_0x24d2df:$gamePlayer[_0x58112b(0x2b2)]()[_0x58112b(0x2ee)]=_0x24d2df;}}),PluginManager[_0x1ecdb4(0x336)](pluginData[_0x1ecdb4(0x20e)],'ConicalOffsetChangeEvent',_0x1fd67b=>{const _0x553377=_0x1ecdb4;VisuMZ[_0x553377(0x1a3)](_0x1fd67b,_0x1fd67b);const _0xbc9b89=_0x1fd67b[_0x553377(0x1cc)],_0x5a0ecc=_0x1fd67b[_0x553377(0x3f9)],_0x3e4d87=_0x1fd67b[_0x553377(0x44a)],_0x13e1b5=_0x1fd67b[_0x553377(0x283)],_0x2c39ca=_0x1fd67b[_0x553377(0x2f6)],_0x396dc9=$gameTemp['getLastPluginCommandInterpreter']();for(let _0x45780f of _0xbc9b89){if(_0x45780f===0x0)_0x45780f=_0x396dc9[_0x553377(0x2a7)]();const _0x5bb305=$gameMap[_0x553377(0x25a)](_0x45780f);_0x5bb305&&(_0x5bb305['setConicalLightWalkOffsets'](_0x3e4d87),_0x5bb305[_0x553377(0x23c)](_0x13e1b5),_0x5bb305[_0x553377(0x2ce)](_0x2c39ca),_0x5bb305[_0x553377(0x285)]()[_0x553377(0x2ee)]=_0x5a0ecc);}}),PluginManager[_0x1ecdb4(0x336)](pluginData[_0x1ecdb4(0x20e)],_0x1ecdb4(0x250),_0x4bc955=>{const _0x43eba4=_0x1ecdb4;VisuMZ[_0x43eba4(0x1a3)](_0x4bc955,_0x4bc955);const _0x3ee51f=$gameMap['boat'](),_0x15f8ff=_0x4bc955[_0x43eba4(0x43f)],_0x81c10f=_0x4bc955['UnboardedOffset'];_0x3ee51f&&(_0x3ee51f['setVehicleLightingConicalOffset'](_0x15f8ff,!![]),_0x3ee51f[_0x43eba4(0x32a)](_0x81c10f,![]));}),PluginManager[_0x1ecdb4(0x336)](pluginData[_0x1ecdb4(0x20e)],_0x1ecdb4(0x2fc),_0x4839f9=>{const _0x23907d=_0x1ecdb4;VisuMZ[_0x23907d(0x1a3)](_0x4839f9,_0x4839f9);const _0x395178=$gameMap['ship'](),_0x172dc4=_0x4839f9[_0x23907d(0x43f)],_0x433efd=_0x4839f9[_0x23907d(0x35b)];_0x395178&&(_0x395178['setVehicleLightingConicalOffset'](_0x172dc4,!![]),_0x395178[_0x23907d(0x32a)](_0x433efd,![]));}),PluginManager[_0x1ecdb4(0x336)](pluginData['name'],_0x1ecdb4(0x37f),_0x161d2a=>{const _0x8a7314=_0x1ecdb4;VisuMZ['ConvertParams'](_0x161d2a,_0x161d2a);const _0x2ec5bd=$gameMap[_0x8a7314(0x288)](),_0x5a1220=_0x161d2a[_0x8a7314(0x43f)],_0x48b1d0=_0x161d2a['UnboardedOffset'];_0x2ec5bd&&(_0x2ec5bd['setVehicleLightingConicalOffset'](_0x5a1220,!![]),_0x2ec5bd[_0x8a7314(0x32a)](_0x48b1d0,![]));}),VisuMZ['LightingEffects'][_0x1ecdb4(0x392)]=function(_0x28c825,_0x475476){const _0x25c6fa=_0x1ecdb4;VisuMZ[_0x25c6fa(0x1a3)](_0x28c825,_0x28c825);const _0x1b2b29=_0x28c825[_0x25c6fa(0x439)],_0x3efd3e=_0x28c825[_0x25c6fa(0x24f)],_0xb9df12=_0x28c825[_0x25c6fa(0x1a0)],_0x137045=_0x28c825[_0x25c6fa(0x333)]||0x0,_0x1af78d=_0x28c825[_0x25c6fa(0x1b4)],_0x2b7959=_0x28c825[_0x25c6fa(0x391)],_0xbfbb53=_0x28c825[_0x25c6fa(0x2b8)]||0x0,_0x3f0aaa={'active':!![],'settings':JsonEx['makeDeepCopy'](_0x1b2b29),'behavior':JsonEx[_0x25c6fa(0x3fb)](_0x3efd3e),'type':_0x475476,'originX':_0x28c825[_0x25c6fa(0x24b)]||0x0,'originY':_0x28c825[_0x25c6fa(0x1f7)]||0x0,'update':_0xb9df12,'initialTime':_0x137045,'time':_0x137045,'expire':_0xbfbb53===0x0?Number['MAX_SAFE_INTEGER']:_0xbfbb53,'x':0x0,'y':0x0};_0x475476===_0x25c6fa(0x3f5)&&(_0x3f0aaa['followerIndex']=_0x28c825[_0x25c6fa(0x226)]||0x0);if(_0x475476==='event'){_0x3f0aaa[_0x25c6fa(0x2a7)]=_0x28c825['EventID']||0x0;if(_0x3f0aaa[_0x25c6fa(0x2a7)]===0x0){const _0x509e5a=$gameTemp['getLastPluginCommandInterpreter']();_0x3f0aaa[_0x25c6fa(0x2a7)]=_0x509e5a[_0x25c6fa(0x2a7)]();}}for(let _0x39ec25=0x0;_0x39ec25<_0x1af78d;_0x39ec25++){const _0x36dd11=JsonEx[_0x25c6fa(0x3fb)](_0x3f0aaa),_0x5f52b4=_0x137045+_0x39ec25*_0x2b7959;_0x36dd11[_0x25c6fa(0x3e5)]=_0x5f52b4,$gameMap['createNewLightSpawn'](_0x36dd11);}},PluginManager[_0x1ecdb4(0x336)](pluginData['name'],_0x1ecdb4(0x3a2),_0x55c5f2=>{const _0x2d8222=_0x1ecdb4;if(SceneManager[_0x2d8222(0x2a5)]())return;VisuMZ[_0x2d8222(0x3d5)][_0x2d8222(0x392)](_0x55c5f2,_0x2d8222(0x2f5));}),PluginManager['registerCommand'](pluginData[_0x1ecdb4(0x20e)],'LightSpawnNewScreenLockedLight',_0x418b30=>{const _0x96fa69=_0x1ecdb4;if(SceneManager[_0x96fa69(0x2a5)]())return;VisuMZ['LightingEffects']['SpawnLights'](_0x418b30,_0x96fa69(0x2ac));}),PluginManager[_0x1ecdb4(0x336)](pluginData[_0x1ecdb4(0x20e)],'LightSpawnNewPlayerLockedLight',_0x4d5940=>{const _0x1bee14=_0x1ecdb4;if(SceneManager[_0x1bee14(0x2a5)]())return;VisuMZ['LightingEffects'][_0x1bee14(0x392)](_0x4d5940,_0x1bee14(0x30c));}),PluginManager[_0x1ecdb4(0x336)](pluginData[_0x1ecdb4(0x20e)],_0x1ecdb4(0x353),_0x2665b0=>{const _0x20e9d2=_0x1ecdb4;if(SceneManager[_0x20e9d2(0x2a5)]())return;VisuMZ[_0x20e9d2(0x3d5)][_0x20e9d2(0x392)](_0x2665b0,_0x20e9d2(0x3f5));}),PluginManager[_0x1ecdb4(0x336)](pluginData['name'],_0x1ecdb4(0x236),_0xf84474=>{const _0xa4de9=_0x1ecdb4;if(SceneManager[_0xa4de9(0x2a5)]())return;VisuMZ[_0xa4de9(0x3d5)][_0xa4de9(0x392)](_0xf84474,_0xa4de9(0x25a));}),PluginManager['registerCommand'](pluginData['name'],'LightSpawnExpireSpawnedLights',_0x7c9ca6=>{const _0x48b501=_0x1ecdb4;if(SceneManager[_0x48b501(0x2a5)]())return;for(const _0x21f9d0 of $gameMap[_0x48b501(0x352)]()){if(!_0x21f9d0)continue;if(!_0x21f9d0['active'])continue;if(_0x21f9d0[_0x48b501(0x2ca)]<0xa)continue;_0x21f9d0['expire']=0xa;}}),VisuMZ['LightingEffects'][_0x1ecdb4(0x1ee)]={'AutoTint':/<(?:AUTOTINT|AUTO-TINT|AUTOTONE|AUTO-TONE):[ ](.*)>/i,'lightingOverlayColor':/<(?:OVERLAY|OVERLAY COLOR):[ ](.*)>/i,'lightingOverlayOpacityValue':/<(?:OVERLAY) OPACITY:[ ](\d+)>/i,'lightingOverlayOpacityRate':/<(?:OVERLAY) OPACITY:[ ](\d+)([%％])>/i,'noLightingOverlay':/<NO (?:OVERLAY|DARKNESS OVERLAY)>/i,'antiLightMaskHardRegions':/<HARD (?:ANTILIGHT|ANTI-LIGHT) (?:REGION|REGIONS):[ ](.*)>/i,'antiLightMaskHardTerrainTags':/<HARD (?:ANTILIGHT|ANTI-LIGHT) TERRAIN (?:TAG|TAGS):[ ](.*)>/i,'antiLightMaskSoftRegions':/<SOFT (?:ANTILIGHT|ANTI-LIGHT) (?:REGION|REGIONS):[ ](.*)>/i,'antiLightMaskSoftTerrainTags':/<SOFT (?:ANTILIGHT|ANTI-LIGHT) TERRAIN (?:TAG|TAGS):[ ](.*)>/i,'RadialLightGeneric':/<(?:LIGHT|RADIAL LIGHT)>/i,'RadialLightCatchAll':/<(?:LIGHT|RADIAL LIGHT)[ ](.*?)>/i,'RadialLightTurnOff':/<NO (?:LIGHT|RADIAL LIGHT)>/i,'RadialLightFilename':/<(?:LIGHT|RADIAL LIGHT) FILENAME:[ ](.*?)>/i,'RadialLightColor':/<(?:LIGHT|RADIAL LIGHT) COLOR:[ ](.*?)>/i,'RadialLightRadius':/<(?:LIGHT|RADIAL LIGHT) RADIUS:[ ](\d+)>/i,'RadialLightDiameter':/<(?:LIGHT|RADIAL LIGHT) DIAMETER:[ ](\d+)>/i,'RadialLightIntensity':/<(?:LIGHT|RADIAL LIGHT) INTENSITY:[ ](\d+)([%％])>/i,'RadialLightAngle':/<(?:LIGHT|RADIAL LIGHT) ANGLE:[ ](\d+)>/i,'RadialLightRotateSpeed':/<(?:LIGHT|RADIAL LIGHT) ROTATE SPEED:[ ]([\+\-]\d+)>/i,'RadialLightBlendMode':/<(?:LIGHT|RADIAL LIGHT) BLEND MODE:[ ](.*?)>/i,'RadialLightOpacityFlat':/<(?:LIGHT|RADIAL LIGHT) OPACITY:[ ](\d+)>/i,'RadialLightOpacityRate':/<(?:LIGHT|RADIAL LIGHT) OPACITY:[ ](\d+)([%％])>/i,'RadialLightOffset':/<(?:LIGHT|RADIAL LIGHT) OFFSET:[ ](.*?)>/i,'RadialBehaviorBlinkRate':/<(?:LIGHT|RADIAL LIGHT) BLINK RATE:[ ](\d+)([%％])>/i,'RadialBehaviorBlinkMod':/<(?:LIGHT|RADIAL LIGHT) BLINK MODIFIER:[ ]([\+\-]\d+)([%％])>/i,'RadialBehaviorFlickerRate':/<(?:LIGHT|RADIAL LIGHT) FLICKER RATE:[ ](\d+)([%％])>/i,'RadialBehaviorFlickerMod':/<(?:LIGHT|RADIAL LIGHT) FLICKER MODIFIER:[ ]([\+\-]\d+)([%％])>/i,'RadialBehaviorFlashRate':/<(?:LIGHT|RADIAL LIGHT) FLASH RATE:[ ](\d+)([%％])>/i,'RadialBehaviorFlashMod':/<(?:LIGHT|RADIAL LIGHT) FLASH MODIFIER:[ ]([\+\-]\d+)([%％])>/i,'RadialBehaviorFlareRate':/<(?:LIGHT|RADIAL LIGHT) FLARE RATE:[ ](\d+)([%％])>/i,'RadialBehaviorFlareMod':/<(?:LIGHT|RADIAL LIGHT) FLARE MODIFIER:[ ]([\+\-]\d+)([%％])>/i,'RadialBehaviorGlowRate':/<(?:LIGHT|RADIAL LIGHT) GLOW RATE:[ ](\d+)([%％])>/i,'RadialBehaviorGlowSpeed':/<(?:LIGHT|RADIAL LIGHT) GLOW SPEED:[ ](\d+)([%％])>/i,'RadialBehaviorGlowRng':/<(?:LIGHT|RADIAL LIGHT) GLOW RANDOM>/i,'RadialBehaviorGlowNoRng':/<(?:LIGHT|RADIAL LIGHT) GLOW NO RANDOM>/i,'RadialBehaviorPulseRate':/<(?:LIGHT|RADIAL LIGHT) PULSE RATE:[ ](\d+)([%％])>/i,'RadialBehaviorPulseSpeed':/<(?:LIGHT|RADIAL LIGHT) PULSE SPEED:[ ](\d+)([%％])>/i,'RadialBehaviorPulseRng':/<(?:LIGHT|RADIAL LIGHT) PULSE RANDOM>/i,'RadialBehaviorPulseNoRng':/<(?:LIGHT|RADIAL LIGHT) PULSE NO RANDOM>/i,'RadialBehaviorPatternPreset':/<(?:LIGHT|RADIAL LIGHT) PATTERN TYPE:[ ](.*?)>/i,'RadialBehaviorPatternSequence':/<(?:LIGHT|RADIAL LIGHT) (?:PATTERN|PATTERN TABLE|CUSTOM PATTERN):[ ](.*?)>/i,'RadialBehaviorPatternUpdateDelay':/<(?:LIGHT|RADIAL LIGHT) PATTERN (?:DELAY|UPDATE DELAY):[ ](\d+)>/i,'ConicalLightGeneric':/<(?:CONICAL LIGHT|TORCH)>/i,'ConicalLightCatchAll':/<(?:CONICAL LIGHT|TORCH)[ ](.*?)>/i,'ConicalLightTurnOff':/<NO (?:CONICAL LIGHT|TORCH)>/i,'ConicalLightFilename':/<(?:CONICAL LIGHT|TORCH) FILENAME:[ ](.*?)>/i,'ConicalLightFileAngleOffset':/<(?:CONICAL LIGHT|TORCH) FILE ANGLE OFFSET:[ ]([\+\-]\d+)>/i,'ConicalLightFileAnchor':/<(?:CONICAL LIGHT|TORCH) FILE ANCHOR:[ ](.*?)>/i,'ConicalLightColor':/<(?:CONICAL LIGHT|TORCH) COLOR:[ ](.*?)>/i,'ConicalLightRadius':/<(?:CONICAL LIGHT|TORCH) RADIUS:[ ](\d+)>/i,'ConicalLightDiameter':/<(?:CONICAL LIGHT|TORCH) DIAMETER:[ ](\d+)>/i,'ConicalLightSrcRadius':/<(?:CONICAL LIGHT|TORCH) (?:SOURCE|MINI) RADIUS:[ ](\d+)>/i,'ConicalLightSrcDiameter':/<(?:CONICAL LIGHT|TORCH) (?:SOURCE|MINI) DIAMETER:[ ](\d+)>/i,'ConicalLightIntensity':/<(?:CONICAL LIGHT|TORCH) INTENSITY:[ ](\d+)([%％])>/i,'ConicalLightBlendMode':/<(?:CONICAL LIGHT|TORCH) BLEND MODE:[ ](.*?)>/i,'ConicalLightOpacityFlat':/<(?:CONICAL LIGHT|TORCH) OPACITY:[ ](\d+)>/i,'ConicalLightOpacityRate':/<(?:CONICAL LIGHT|TORCH) OPACITY:[ ](\d+)([%％])>/i,'ConicalLightAngle':/<(?:CONICAL LIGHT|TORCH) ANGLE:[ ](\d+)>/i,'ConicalLightAngleSway':/<(?:CONICAL LIGHT|TORCH) ANGLE SWAY:[ ](\d+)>/i,'ConicalLightSwaySpeed':/<(?:CONICAL LIGHT|TORCH) SWAY SPEED:[ ](\d+)([%％])>/i,'ConicalLightSwayRng':/<(?:CONICAL LIGHT|TORCH) SWAY RANDOM>/i,'ConicalLightSwayNoRng':/<(?:CONICAL LIGHT|TORCH) SWAY NO RANDOM>/i,'ConicalLightForceDir':/<(?:CONICAL LIGHT|TORCH) FORCE DIRECTION:[ ](.*?)>/i,'ConicalLightFollowMouse':/<(?:CONICAL LIGHT|TORCH) FOLLOW (?:CURSOR|MOUSE)>/i,'ConicalLightNoFollowMouse':/<(?:CONICAL LIGHT|TORCH) (?:NO|NOT) FOLLOW (?:CURSOR|MOUSE)>/i,'ConicalLightUseHandOffset':/<(?:CONICAL LIGHT|TORCH) HAND OFFSET>/i,'ConicalLightCentralOffset':/<(?:CONICAL LIGHT|TORCH) (?:CENTER|CENTRAL) OFFSET>/i,'ConicalLightOffset':/<(?:CONICAL LIGHT|TORCH) OFFSET:[ ](.*?)>/i,'ConicalBehaviorBlinkRate':/<(?:CONICAL LIGHT|TORCH) BLINK RATE:[ ](\d+)([%％])>/i,'ConicalBehaviorBlinkMod':/<(?:CONICAL LIGHT|TORCH) BLINK MODIFIER:[ ]([\+\-]\d+)([%％])>/i,'ConicalBehaviorFlickerRate':/<(?:CONICAL LIGHT|TORCH) FLICKER RATE:[ ](\d+)([%％])>/i,'ConicalBehaviorFlickerMod':/<(?:CONICAL LIGHT|TORCH) FLICKER MODIFIER:[ ]([\+\-]\d+)([%％])>/i,'ConicalBehaviorFlashRate':/<(?:CONICAL LIGHT|TORCH) FLASH RATE:[ ](\d+)([%％])>/i,'ConicalBehaviorFlashMod':/<(?:CONICAL LIGHT|TORCH) FLASH MODIFIER:[ ]([\+\-]\d+)([%％])>/i,'ConicalBehaviorFlareRate':/<(?:CONICAL LIGHT|TORCH) FLARE RATE:[ ](\d+)([%％])>/i,'ConicalBehaviorFlareMod':/<(?:CONICAL LIGHT|TORCH) FLARE MODIFIER:[ ]([\+\-]\d+)([%％])>/i,'ConicalBehaviorGlowRate':/<(?:CONICAL LIGHT|TORCH) GLOW RATE:[ ](\d+)([%％])>/i,'ConicalBehaviorGlowSpeed':/<(?:CONICAL LIGHT|TORCH) GLOW SPEED:[ ](\d+)([%％])>/i,'ConicalBehaviorGlowRng':/<(?:CONICAL LIGHT|TORCH) GLOW RANDOM>/i,'ConicalBehaviorGlowNoRng':/<(?:CONICAL LIGHT|TORCH) GLOW NO RANDOM>/i,'ConicalBehaviorPulseRate':/<(?:CONICAL LIGHT|TORCH) PULSE RATE:[ ](\d+)([%％])>/i,'ConicalBehaviorPulseSpeed':/<(?:CONICAL LIGHT|TORCH) PULSE SPEED:[ ](\d+)([%％])>/i,'ConicalBehaviorPulseRng':/<(?:CONICAL LIGHT|TORCH) PULSE RANDOM>/i,'ConicalBehaviorPulseNoRng':/<(?:CONICAL LIGHT|TORCH) PULSE NO RANDOM>/i,'ConicalBehaviorPatternPreset':/<(?:CONICAL LIGHT|TORCH) PATTERN TYPE:[ ](.*?)>/i,'ConicalBehaviorPatternSequence':/<(?:CONICAL LIGHT|TORCH) (?:PATTERN|PATTERN TABLE|CUSTOM PATTERN):[ ](.*?)>/i,'ConicalBehaviorPatternUpdateDelay':/<(?:CONICAL LIGHT|TORCH) PATTERN (?:DELAY|UPDATE DELAY):[ ](\d+)>/i,'ConicalLightHandOffset':/<(?:CONICAL LIGHT|TORCH) (.*?) PATTERN (\d+) OFFSET:[ ](.*?)>/gi},Bitmap[_0x1ecdb4(0x224)][_0x1ecdb4(0x231)]=function(_0x1bf2a2,_0x3e9799){const _0x25051d=_0x1ecdb4;this[_0x25051d(0x1ed)](_0x1bf2a2,_0x3e9799,0.5);},Bitmap[_0x1ecdb4(0x224)][_0x1ecdb4(0x1ed)]=function(_0x115747,_0x4fffa4,_0x1f7753){const _0x43b125=_0x1ecdb4,_0x1a9cdd=0x168,_0x2f74f1=0x1,_0x31035e=0x0;this[_0x43b125(0x2cb)](_0x115747,_0x1a9cdd,_0x4fffa4,_0x1f7753,_0x2f74f1,_0x31035e);},Bitmap[_0x1ecdb4(0x224)][_0x1ecdb4(0x2cb)]=function(_0x48563e,_0x2ebd1b,_0x5c42c7,_0x5292de,_0x23de65,_0x166558){const _0x5a6a7=_0x1ecdb4;_0x5292de=_0x5292de[_0x5a6a7(0x386)](0.000001,0.999999);const _0x164d03=this[_0x5a6a7(0x362)],_0x38e1a0=_0x2ebd1b*(Math['PI']/0xb4),_0x23dd4e=_0x48563e*0x2,_0x35b121=_0x164d03[_0x5a6a7(0x25f)](_0x48563e,_0x48563e,_0x166558,_0x48563e,_0x48563e,_0x48563e),_0x5d5cdc=ColorManager[_0x5a6a7(0x229)](_0x5c42c7,_0x23de65),_0x5d8fba=ColorManager[_0x5a6a7(0x229)](_0x5c42c7,0x1),_0x2554ea=ColorManager['hexToRgba'](_0x5c42c7,0x0);_0x35b121[_0x5a6a7(0x32d)](0x0,_0x5d5cdc),_0x35b121['addColorStop'](_0x5292de/0x2,_0x5d8fba),_0x35b121[_0x5a6a7(0x32d)](_0x5292de,_0x5d8fba),_0x35b121[_0x5a6a7(0x32d)](0x1,_0x2554ea),_0x164d03[_0x5a6a7(0x3fd)](),_0x164d03[_0x5a6a7(0x1cd)]=_0x35b121,_0x164d03[_0x5a6a7(0x42c)](),_0x164d03[_0x5a6a7(0x2ba)](_0x48563e,_0x48563e),_0x164d03[_0x5a6a7(0x2a6)](_0x23dd4e,_0x48563e),_0x164d03[_0x5a6a7(0x28f)](_0x48563e,_0x48563e,_0x48563e,0x0,_0x38e1a0),_0x164d03[_0x5a6a7(0x2a6)](_0x48563e,_0x48563e),_0x164d03['fill'](),_0x164d03[_0x5a6a7(0x39d)](),this[_0x5a6a7(0x37a)]['update']();},ConfigManager[_0x1ecdb4(0x21f)]=!![],ConfigManager[_0x1ecdb4(0x1ea)]=!![],VisuMZ[_0x1ecdb4(0x3d5)][_0x1ecdb4(0x404)]=ConfigManager[_0x1ecdb4(0x369)],ConfigManager[_0x1ecdb4(0x369)]=function(){const _0x158af6=_0x1ecdb4,_0x2a3f65=VisuMZ[_0x158af6(0x3d5)][_0x158af6(0x404)][_0x158af6(0x402)](this);return _0x2a3f65[_0x158af6(0x21f)]=this[_0x158af6(0x21f)],_0x2a3f65['pulsingLights']=this[_0x158af6(0x1ea)],_0x2a3f65;},VisuMZ[_0x1ecdb4(0x3d5)][_0x1ecdb4(0x1e9)]=ConfigManager[_0x1ecdb4(0x457)],ConfigManager['applyData']=function(_0x1d052b){const _0x27904c=_0x1ecdb4;VisuMZ[_0x27904c(0x3d5)][_0x27904c(0x1e9)][_0x27904c(0x402)](this,_0x1d052b),this['readFlag'](_0x1d052b,_0x27904c(0x21f),!![]),this[_0x27904c(0x42a)](_0x1d052b,_0x27904c(0x1ea),!![]);},TextManager[_0x1ecdb4(0x278)]={'BlinkingLights':VisuMZ[_0x1ecdb4(0x3d5)][_0x1ecdb4(0x439)][_0x1ecdb4(0x1b8)]['BlinkingLightsName'],'PulsingLights':VisuMZ['LightingEffects']['Settings'][_0x1ecdb4(0x1b8)][_0x1ecdb4(0x3a6)]},TextManager[_0x1ecdb4(0x264)]=function(_0x564277){const _0x2dae98=_0x1ecdb4;_0x564277=_0x564277['toLowerCase']()[_0x2dae98(0x1ec)]();switch(_0x564277){case _0x2dae98(0x436):return 0x2;case _0x2dae98(0x425):return 0x4;case'right':return 0x6;case'up':return 0x8;case'lower\x20left':return 0x1;case _0x2dae98(0x334):return 0x3;case _0x2dae98(0x451):return 0x7;case _0x2dae98(0x2e1):return 0x9;}return Number(_0x564277)||0x0;},ColorManager[_0x1ecdb4(0x39e)]=function(_0x443581){const _0x357aaf=_0x1ecdb4;if(_0x443581['match'](/\#(.*)/i))return'#%1'[_0x357aaf(0x2d1)](String(RegExp['$1']));else{_0x443581=_0x443581[_0x357aaf(0x1ce)]()['trim']();const _0x1b1962=VisuMZ[_0x357aaf(0x3d5)][_0x357aaf(0x439)]['PresetColors'];if(_0x1b1962&&_0x1b1962[_0x443581])return _0x1b1962[_0x443581];switch(_0x443581){case'-':case'white':case'normal':case _0x357aaf(0x24c):case'none':return _0x357aaf(0x375);case'black':case'dark':return _0x357aaf(0x42f);case _0x357aaf(0x246):return _0x357aaf(0x306);case'green':return _0x357aaf(0x2e3);case _0x357aaf(0x27b):return _0x357aaf(0x40c);case _0x357aaf(0x3db):return _0x357aaf(0x26b);case _0x357aaf(0x216):return _0x357aaf(0x295);case _0x357aaf(0x316):return _0x357aaf(0x203);case _0x357aaf(0x275):return _0x357aaf(0x33b);case _0x357aaf(0x2c6):return'#92278f';case _0x357aaf(0x289):return _0x357aaf(0x41b);case'brown':return _0x357aaf(0x3ea);case _0x357aaf(0x401):case _0x357aaf(0x244):return _0x357aaf(0x366);case _0x357aaf(0x43e):return _0x357aaf(0x292);case _0x357aaf(0x1bb):return _0x357aaf(0x3b1);case _0x357aaf(0x3d4):return _0x357aaf(0x419);case _0x357aaf(0x3c0):return _0x357aaf(0x3da);case _0x357aaf(0x33f):return'#7accc8';case _0x357aaf(0x228):return _0x357aaf(0x385);case'light\x20purple':return _0x357aaf(0x2e4);case _0x357aaf(0x454):return _0x357aaf(0x1be);case _0x357aaf(0x1ba):return _0x357aaf(0x265);case _0x357aaf(0x1eb):return _0x357aaf(0x3ca);case'light\x20grey':case _0x357aaf(0x38d):return _0x357aaf(0x430);case _0x357aaf(0x298):return _0x357aaf(0x2f2);case _0x357aaf(0x206):return'#7d4900';case _0x357aaf(0x36d):return _0x357aaf(0x342);case _0x357aaf(0x329):return _0x357aaf(0x1ad);case _0x357aaf(0x2b5):return'#005952';case _0x357aaf(0x33a):return _0x357aaf(0x1f5);case _0x357aaf(0x31e):return _0x357aaf(0x1f2);case _0x357aaf(0x2ef):return _0x357aaf(0x393);case _0x357aaf(0x21a):return _0x357aaf(0x3a0);case _0x357aaf(0x1d7):return _0x357aaf(0x3fc);case _0x357aaf(0x2c7):case _0x357aaf(0x44c):return _0x357aaf(0x276);case _0x357aaf(0x1d5):return'#5674b9';case'dusk':return _0x357aaf(0x33b);case'night':return _0x357aaf(0x242);}}},ColorManager['blendModeParser']=function(_0x3b13ff){const _0x5d36d3=_0x1ecdb4;_0x3b13ff=_0x3b13ff[_0x5d36d3(0x1ce)]();switch(_0x3b13ff){case _0x5d36d3(0x445):return PIXI[_0x5d36d3(0x240)][_0x5d36d3(0x433)];case _0x5d36d3(0x299):case _0x5d36d3(0x1e6):return PIXI[_0x5d36d3(0x240)][_0x5d36d3(0x3e9)];case'multiply':return PIXI['BLEND_MODES'][_0x5d36d3(0x3dd)];case _0x5d36d3(0x2ac):return PIXI[_0x5d36d3(0x240)]['SCREEN'];}},ColorManager[_0x1ecdb4(0x229)]=function(_0x2d886b,_0x3987dc){const _0x3cb1b1=_0x1ecdb4;let _0x5c2b20='';if(/^#([A-Fa-f0-9]{3}){1,2}$/[_0x3cb1b1(0x2cd)](_0x2d886b)){_0x5c2b20=_0x2d886b[_0x3cb1b1(0x335)](0x1)[_0x3cb1b1(0x25b)]('');_0x5c2b20[_0x3cb1b1(0x36c)]===0x3&&(_0x5c2b20=[_0x5c2b20[0x0],_0x5c2b20[0x0],_0x5c2b20[0x1],_0x5c2b20[0x1],_0x5c2b20[0x2],_0x5c2b20[0x2]]);while(_0x5c2b20[_0x3cb1b1(0x36c)]>0x6)_0x5c2b20[_0x3cb1b1(0x3fe)]();return _0x5c2b20='0x'+_0x5c2b20['join'](''),_0x3cb1b1(0x19d)+[(_0x5c2b20>>0x10&0xff)[_0x3cb1b1(0x386)](0x0,0xff),(_0x5c2b20>>0x8&0xff)['clamp'](0x0,0xff),(_0x5c2b20&0xff)['clamp'](0x0,0xff)][_0x3cb1b1(0x2de)](',')+','+_0x3987dc[_0x3cb1b1(0x386)](0x0,0x1)+')';}else return _0x3cb1b1(0x38a);},ColorManager[_0x1ecdb4(0x230)]=function(_0x422a36){const _0x32cad1=_0x1ecdb4;let _0x587e72='';if(/^#([A-Fa-f0-9]{3}){1,2}$/[_0x32cad1(0x2cd)](_0x422a36)){_0x587e72=_0x422a36[_0x32cad1(0x335)](0x1)[_0x32cad1(0x25b)]('');_0x587e72['length']===0x3&&(_0x587e72=[_0x587e72[0x0],_0x587e72[0x0],_0x587e72[0x1],_0x587e72[0x1],_0x587e72[0x2],_0x587e72[0x2]]);while(_0x587e72[_0x32cad1(0x36c)]>0x6)_0x587e72[_0x32cad1(0x3fe)]();return _0x587e72='0x'+_0x587e72['join'](''),[(_0x587e72>>0x10&0xff)['clamp'](0x0,0xff),(_0x587e72>>0x8&0xff)[_0x32cad1(0x386)](0x0,0xff),(_0x587e72&0xff)[_0x32cad1(0x386)](0x0,0xff)];}else return[0x0,0x0,0x0];},ColorManager[_0x1ecdb4(0x32f)]=function(_0x5b5fac){const _0x50c09a=_0x1ecdb4;while(_0x5b5fac[_0x50c09a(0x36c)]<0x3)_0x5b5fac[_0x50c09a(0x2c3)](0x0);while(_0x5b5fac[_0x50c09a(0x36c)]>0x3)_0x5b5fac[_0x50c09a(0x3fe)]();return'#'+_0x5b5fac[_0x50c09a(0x2f5)](_0x1b5316=>_0x1b5316[_0x50c09a(0x386)](0x0,0xff)[_0x50c09a(0x36a)](0x10)[_0x50c09a(0x34d)](0x2))['join']('');},ColorManager[_0x1ecdb4(0x396)]=function(_0x39c2c1){const _0x28e8bf=_0x1ecdb4;_0x39c2c1[_0x28e8bf(0x458)]===''&&(_0x39c2c1[_0x28e8bf(0x458)]=ColorManager[_0x28e8bf(0x314)](_0x39c2c1[_0x28e8bf(0x410)]));},ColorManager[_0x1ecdb4(0x314)]=function(_0x1aa153){const _0x25db6e=_0x1ecdb4;_0x1aa153=_0x1aa153[_0x25db6e(0x1ce)]()[_0x25db6e(0x1ec)]();switch(_0x1aa153){case _0x25db6e(0x445):case'-':return'z';case _0x25db6e(0x1a7):case _0x25db6e(0x2a3):case _0x25db6e(0x35d):return _0x25db6e(0x343);case _0x25db6e(0x210):case _0x25db6e(0x209):case _0x25db6e(0x357):return _0x25db6e(0x40e);case'candle':case _0x25db6e(0x2b1):return _0x25db6e(0x258);case'fast\x20strobe':case _0x25db6e(0x349):case _0x25db6e(0x1dd):return _0x25db6e(0x24e);case'pulse2':case _0x25db6e(0x1a9):return _0x25db6e(0x20f);case _0x25db6e(0x3af):case _0x25db6e(0x214):return'nmonqnmomnmomomno';case _0x25db6e(0x233):case'torch':return _0x25db6e(0x22f);case _0x25db6e(0x34c):case _0x25db6e(0x24d):return _0x25db6e(0x3bc);case _0x25db6e(0x418):case _0x25db6e(0x217):return _0x25db6e(0x2cf);case _0x25db6e(0x446):case'flicker3':return'mmamammmmammamamaaamammma';case _0x25db6e(0x40f):case'slow\x20pulse':return _0x25db6e(0x1a2);case _0x25db6e(0x2f3):return'mmnnmmnnnmmnn';}return'';},SceneManager['isSceneBattle']=function(){const _0x2cfeb0=_0x1ecdb4;return this[_0x2cfeb0(0x2d2)]&&this[_0x2cfeb0(0x2d2)][_0x2cfeb0(0x394)]===Scene_Battle;},SceneManager[_0x1ecdb4(0x2b7)]=function(){const _0x46d2ae=_0x1ecdb4;return this[_0x46d2ae(0x2d2)]&&this['_scene'][_0x46d2ae(0x394)]===Scene_Map;},SceneManager['addChildToLightContainer']=function(_0x23c312){const _0x319743=_0x1ecdb4;this[_0x319743(0x2d2)]&&this['_scene'][_0x319743(0x2ae)]&&this[_0x319743(0x2d2)][_0x319743(0x2ae)][_0x319743(0x434)](_0x23c312);},SceneManager['removeChildFromLightContainer']=function(_0x580030){const _0x4dab1d=_0x1ecdb4;this[_0x4dab1d(0x2d2)]&&this['_scene'][_0x4dab1d(0x2ae)]&&this['_scene'][_0x4dab1d(0x2ae)][_0x4dab1d(0x29a)](_0x580030);},Game_Temp[_0x1ecdb4(0x224)][_0x1ecdb4(0x1d6)]=function(_0x1a2e8a){const _0x92634e=_0x1ecdb4,_0x23876b=_0x1a2e8a[_0x92634e(0x26c)];this[_0x92634e(0x37d)]=this[_0x92634e(0x37d)]||[];const _0x56f8e8=this['_lightSpawnsFunc'][_0x92634e(0x36c)];this[_0x92634e(0x37d)][_0x56f8e8]=new Function(_0x23876b),this[_0x92634e(0x28a)](_0x56f8e8,_0x1a2e8a);},Game_Temp['prototype']['updateLightSpawn']=function(_0x343001,_0x43f33f){const _0x43b843=_0x1ecdb4;if(!_0x43f33f)return;this[_0x43b843(0x37d)]=this[_0x43b843(0x37d)]||[];const _0xdf5d41=this[_0x43b843(0x37d)][_0x343001];if(!_0xdf5d41)return;const _0x10348b=_0xdf5d41[_0x43b843(0x402)](_0x43f33f,_0x43f33f,_0x43f33f[_0x43b843(0x3e5)]);if(!_0x10348b)return;_0x43f33f['x']=Math[_0x43b843(0x282)](_0x10348b['x']||0x0),_0x43f33f['y']=Math[_0x43b843(0x282)](_0x10348b['y']||0x0),_0x43f33f['settings'][_0x43b843(0x3ec)]=_0x10348b['color']??_0x43f33f['settings'][_0x43b843(0x3ec)],_0x43f33f[_0x43b843(0x311)][_0x43b843(0x1c3)]=_0x10348b[_0x43b843(0x1c3)]??_0x43f33f['settings'][_0x43b843(0x1c3)],_0x43f33f[_0x43b843(0x311)]['intensity']=_0x10348b[_0x43b843(0x220)]??_0x43f33f[_0x43b843(0x311)][_0x43b843(0x220)],_0x43f33f[_0x43b843(0x311)][_0x43b843(0x355)]=_0x10348b[_0x43b843(0x355)]??_0x43f33f[_0x43b843(0x311)][_0x43b843(0x355)],_0x43f33f[_0x43b843(0x311)][_0x43b843(0x271)]=_0x10348b['opacity']??_0x43f33f[_0x43b843(0x311)][_0x43b843(0x271)];if(_0x43f33f['expire']<0xa){const _0x344492=_0x43f33f[_0x43b843(0x2ca)]*0.1;_0x43f33f['settings'][_0x43b843(0x271)]=Math['round'](_0x43f33f['settings'][_0x43b843(0x271)]*_0x344492)['clamp'](0x0,0xff);}},VisuMZ[_0x1ecdb4(0x3d5)][_0x1ecdb4(0x1b1)]=Game_Screen[_0x1ecdb4(0x224)][_0x1ecdb4(0x297)],Game_Screen[_0x1ecdb4(0x224)]['initialize']=function(){const _0x32ac26=_0x1ecdb4;VisuMZ[_0x32ac26(0x3d5)][_0x32ac26(0x1b1)][_0x32ac26(0x402)](this),this[_0x32ac26(0x1a6)]();},VisuMZ[_0x1ecdb4(0x3d5)][_0x1ecdb4(0x2cc)]=Game_Screen[_0x1ecdb4(0x224)][_0x1ecdb4(0x26c)],Game_Screen[_0x1ecdb4(0x224)]['update']=function(){const _0xe1b7d3=_0x1ecdb4;VisuMZ[_0xe1b7d3(0x3d5)][_0xe1b7d3(0x2cc)][_0xe1b7d3(0x402)](this),this[_0xe1b7d3(0x340)](),this[_0xe1b7d3(0x2d3)]();},Game_Screen[_0x1ecdb4(0x224)][_0x1ecdb4(0x3df)]=function(_0x26ee71){const _0x4951d0=_0x1ecdb4;_0x26ee71=_0x26ee71[_0x4951d0(0x1ce)]()[_0x4951d0(0x1ec)]();if(this[_0x4951d0(0x2fe)](_0x26ee71))return;else{const _0x4c0b41=_0x26ee71[_0x4951d0(0x25b)](',')[_0x4951d0(0x2f5)](_0x3a84f7=>(Number(_0x3a84f7)||0x0)[_0x4951d0(0x386)](-0xff,0xff));while(_0x4c0b41[_0x4951d0(0x36c)]<0x3)_0x4c0b41['push'](0x0);_0x4c0b41[0x3]=Math['abs'](_0x4c0b41[0x3]),this[_0x4951d0(0x28c)](_0x4c0b41,0x0);}},Game_Screen[_0x1ecdb4(0x224)][_0x1ecdb4(0x2fe)]=function(_0x5553e0){const _0x534ada=_0x1ecdb4;_0x5553e0=_0x5553e0[_0x534ada(0x1ce)]()[_0x534ada(0x1ec)]();switch(_0x5553e0){case'normal':this[_0x534ada(0x28c)]([0x0,0x0,0x0,0x0],0x0);return!![];case _0x534ada(0x19f):this[_0x534ada(0x28c)]([-0x44,-0x44,-0x44,0x0],0x0);return!![];case _0x534ada(0x351):this[_0x534ada(0x28c)]([0x22,-0x22,-0x44,0xaa],0x0);return!![];case _0x534ada(0x3cb):this[_0x534ada(0x28c)]([0x44,-0x22,-0x22,0x0],0x0);return!![];case _0x534ada(0x202):this[_0x534ada(0x28c)]([-0x44,-0x44,0x0,0x44],0x0);return!![];default:return![];}},Game_Screen[_0x1ecdb4(0x224)][_0x1ecdb4(0x1a6)]=function(){const _0x26143f=_0x1ecdb4;this[_0x26143f(0x33c)]={'color':_0x26143f(0x375),'targetColor':_0x26143f(0x375),'colorDuration':0x0,'opacity':0xff,'targetOpacity':0xff,'opacityDuration':0x0,'cacheOpacity':undefined};},Game_Screen[_0x1ecdb4(0x224)][_0x1ecdb4(0x255)]=function(){const _0x5668df=_0x1ecdb4;if(this[_0x5668df(0x33c)]===undefined)this['initLightingEffects']();return this[_0x5668df(0x33c)];},Game_Screen[_0x1ecdb4(0x224)][_0x1ecdb4(0x3e8)]=function(){const _0x5bc4ab=_0x1ecdb4;if(this[_0x5bc4ab(0x45b)]())return this[_0x5bc4ab(0x3e1)]();return this[_0x5bc4ab(0x255)]()[_0x5bc4ab(0x3ec)]??_0x5bc4ab(0x375);},Game_Screen[_0x1ecdb4(0x224)][_0x1ecdb4(0x45b)]=function(){const _0x38cc53=_0x1ecdb4;if(!Imported['VisuMZ_2_DateTimeSystem'])return![];if(!$gameMap)return![];return $gameMap[_0x38cc53(0x1ff)]();},Game_Screen['prototype'][_0x1ecdb4(0x37e)]=function(_0x18fa71,_0x135435){const _0x46d02a=_0x1ecdb4;let _0x3cdb0c=_0x46d02a(0x375),_0x6830da=0xff;_0x135435=_0x135435||0x0;if(_0x18fa71['match'](/\#(.*)/i))_0x3cdb0c=_0x46d02a(0x40b)[_0x46d02a(0x2d1)](String(RegExp['$1']));else{_0x18fa71=_0x18fa71[_0x46d02a(0x1ce)](),_0x3cdb0c=ColorManager[_0x46d02a(0x39e)](_0x18fa71);switch(_0x18fa71){case _0x46d02a(0x445):case _0x46d02a(0x277):case'day':_0x6830da=0x0;break;case _0x46d02a(0x1a5):case _0x46d02a(0x19f):case _0x46d02a(0x202):_0x6830da=0xf0;break;case _0x46d02a(0x1d5):case'dusk':_0x6830da=0x80;break;default:if(_0x18fa71['match'](/light/i))_0x6830da=0xc0;else _0x18fa71['match'](/dark/i)?_0x6830da=0xff:_0x6830da=0xf0;break;}}this['shiftLightingOverlayColor'](_0x3cdb0c,_0x135435),this[_0x46d02a(0x452)](_0x6830da,_0x135435);},Game_Screen['prototype'][_0x1ecdb4(0x30e)]=function(_0x11626b){const _0x254485=_0x1ecdb4;this[_0x254485(0x255)]()[_0x254485(0x3ec)]=_0x11626b,this[_0x254485(0x255)]()['cacheOpacity']=undefined;},Game_Screen[_0x1ecdb4(0x28b)]=![],Game_Screen['prototype'][_0x1ecdb4(0x263)]=function(){const _0x3c9eb8=_0x1ecdb4;if($gameMap&&$gameMap[_0x3c9eb8(0x2d6)]())return 0x0;if(Game_Screen[_0x3c9eb8(0x28b)]&&Sprite_LightingEffects[_0x3c9eb8(0x31a)])return this[_0x3c9eb8(0x255)]()['cacheOpacity']===undefined&&(this[_0x3c9eb8(0x255)]()['cacheOpacity']=VisuMZ[_0x3c9eb8(0x3d5)][_0x3c9eb8(0x247)]()),this[_0x3c9eb8(0x255)]()['cacheOpacity'];return this[_0x3c9eb8(0x255)]()[_0x3c9eb8(0x271)]??0xff;},Game_Screen['prototype']['setLightingOverlayOpacity']=function(_0x3db257){const _0x9c8cf5=_0x1ecdb4;return this[_0x9c8cf5(0x255)]()['cacheOpacity']=undefined,this[_0x9c8cf5(0x255)]()['opacity']=Math['round'](_0x3db257)[_0x9c8cf5(0x386)](0x0,0xff);},VisuMZ[_0x1ecdb4(0x3d5)]['CalcSmartOpacity']=function(){const _0x4f676a=_0x1ecdb4,_0x17ef3e=$gameScreen['lightingEffects']()[_0x4f676a(0x271)],_0x32ff02=$gameScreen[_0x4f676a(0x3e8)](),_0x51b610=ColorManager[_0x4f676a(0x230)](_0x32ff02),_0x49f447=Math['round'](_0x51b610[_0x4f676a(0x2ff)]((_0x228050,_0x463342)=>_0x228050+_0x463342,0x0)/_0x51b610['length']),_0x85ec50=0xc0;if(_0x49f447<_0x85ec50)return _0x17ef3e;const _0x276a44=(0xff-_0x49f447)/(0xff-_0x85ec50);return Math['floor'](_0x276a44*_0x17ef3e)[_0x4f676a(0x386)](0x0,0xff);},Game_Screen['prototype'][_0x1ecdb4(0x2fa)]=function(_0x1d4b76,_0x7f52d5){const _0xdbcfc0=_0x1ecdb4;this[_0xdbcfc0(0x255)]()[_0xdbcfc0(0x3f1)]=_0x1d4b76,this[_0xdbcfc0(0x255)]()[_0xdbcfc0(0x18a)]=_0x7f52d5,_0x7f52d5<=0x0&&(this[_0xdbcfc0(0x255)]()[_0xdbcfc0(0x3ec)]=_0x1d4b76,this[_0xdbcfc0(0x255)]()['cacheOpacity']=undefined);},Game_Screen['prototype'][_0x1ecdb4(0x340)]=function(){const _0x3f7eca=_0x1ecdb4;if(this['lightingEffects']()[_0x3f7eca(0x18a)]<=0x0)return;const _0x113947=this['lightingEffects']()[_0x3f7eca(0x18a)],_0x174768=ColorManager[_0x3f7eca(0x230)](this[_0x3f7eca(0x255)]()['color']),_0x5bc062=ColorManager[_0x3f7eca(0x230)](this[_0x3f7eca(0x255)]()[_0x3f7eca(0x3f1)]);for(let _0x167297=0x0;_0x167297<0x3;_0x167297++){_0x174768[_0x167297]=Math[_0x3f7eca(0x282)]((_0x174768[_0x167297]*(_0x113947-0x1)+_0x5bc062[_0x167297])/_0x113947);}this[_0x3f7eca(0x255)]()['color']=ColorManager[_0x3f7eca(0x32f)](_0x174768),this[_0x3f7eca(0x255)]()[_0x3f7eca(0x2f1)]=undefined,this[_0x3f7eca(0x255)]()[_0x3f7eca(0x18a)]--,this[_0x3f7eca(0x255)]()[_0x3f7eca(0x18a)]<=0x0&&(this[_0x3f7eca(0x255)]()[_0x3f7eca(0x3ec)]=this[_0x3f7eca(0x255)]()['targetColor']);},Game_Screen['prototype'][_0x1ecdb4(0x452)]=function(_0x584b75,_0x1a9627){const _0x5e4733=_0x1ecdb4;this[_0x5e4733(0x255)]()['targetOpacity']=_0x584b75,this[_0x5e4733(0x255)]()[_0x5e4733(0x3fa)]=_0x1a9627,_0x1a9627<=0x0&&(this[_0x5e4733(0x255)]()[_0x5e4733(0x271)]=_0x584b75,this[_0x5e4733(0x255)]()['cacheOpacity']=undefined);},Game_Screen['prototype'][_0x1ecdb4(0x2d3)]=function(){const _0x5f59f3=_0x1ecdb4;if(this[_0x5f59f3(0x255)]()[_0x5f59f3(0x3fa)]<=0x0)return;const _0x2dc691=this[_0x5f59f3(0x255)]()[_0x5f59f3(0x3fa)],_0x504a06=this[_0x5f59f3(0x255)]()[_0x5f59f3(0x271)],_0x315c20=this['lightingEffects']()['targetOpacity'];this[_0x5f59f3(0x255)]()[_0x5f59f3(0x271)]=(_0x504a06*(_0x2dc691-0x1)+_0x315c20)/_0x2dc691,this[_0x5f59f3(0x255)]()[_0x5f59f3(0x2f1)]=undefined,this[_0x5f59f3(0x255)]()[_0x5f59f3(0x3fa)]--,this[_0x5f59f3(0x255)]()[_0x5f59f3(0x3fa)]<=0x0&&(this[_0x5f59f3(0x255)]()[_0x5f59f3(0x271)]=_0x315c20);},VisuMZ[_0x1ecdb4(0x3d5)][_0x1ecdb4(0x1dc)]=Game_BattlerBase[_0x1ecdb4(0x224)][_0x1ecdb4(0x2dd)],Game_BattlerBase['prototype'][_0x1ecdb4(0x2dd)]=function(){const _0x4f29e1=_0x1ecdb4;VisuMZ[_0x4f29e1(0x3d5)]['Game_BattlerBase_initMembers']['call'](this),this[_0x4f29e1(0x192)]();},Game_BattlerBase[_0x1ecdb4(0x224)][_0x1ecdb4(0x192)]=function(){const _0x192993=_0x1ecdb4;this[_0x192993(0x3b8)]={},this['_radialLightBehavior']={};},Game_BattlerBase[_0x1ecdb4(0x224)][_0x1ecdb4(0x41e)]=function(){const _0x3d5497=_0x1ecdb4;if(this['_radialLight']===undefined)this[_0x3d5497(0x192)]();return this[_0x3d5497(0x3b8)];},Game_BattlerBase[_0x1ecdb4(0x224)][_0x1ecdb4(0x25d)]=function(_0x42a436){const _0x1f1623=_0x1ecdb4;if(this[_0x1f1623(0x3b8)]===undefined)this[_0x1f1623(0x192)]();this[_0x1f1623(0x3b8)]=JsonEx[_0x1f1623(0x3fb)](_0x42a436);},Game_BattlerBase['prototype'][_0x1ecdb4(0x211)]=function(){const _0x4ec5aa=_0x1ecdb4;if(this[_0x4ec5aa(0x301)]===undefined)this['initLightingEffectsSettings']();return this[_0x4ec5aa(0x301)];},Game_BattlerBase[_0x1ecdb4(0x224)][_0x1ecdb4(0x440)]=function(_0x16bda6){const _0x3f77cc=_0x1ecdb4;if(this[_0x3f77cc(0x301)]===undefined)this['initLightingEffectsSettings']();this[_0x3f77cc(0x301)]=JsonEx[_0x3f77cc(0x3fb)](_0x16bda6),ColorManager[_0x3f77cc(0x396)](this[_0x3f77cc(0x301)]);},Game_Battler['prototype'][_0x1ecdb4(0x332)]=function(_0x3ed5d0){const _0x2c2adc=_0x1ecdb4;_0x3ed5d0=_0x3ed5d0||'',Game_Event['prototype']['checkRadialLightBasicStringTags'][_0x2c2adc(0x402)](this,_0x3ed5d0),Game_Event[_0x2c2adc(0x224)][_0x2c2adc(0x189)][_0x2c2adc(0x402)](this,_0x3ed5d0);},VisuMZ[_0x1ecdb4(0x3d5)][_0x1ecdb4(0x398)]=Game_Actor[_0x1ecdb4(0x224)]['setup'],Game_Actor[_0x1ecdb4(0x224)][_0x1ecdb4(0x1da)]=function(_0x5739bb){const _0x7d45b3=_0x1ecdb4;VisuMZ[_0x7d45b3(0x3d5)][_0x7d45b3(0x398)][_0x7d45b3(0x402)](this,_0x5739bb),this['initLightingEffects'](),this[_0x7d45b3(0x332)]();},Game_Actor[_0x1ecdb4(0x224)]['initLightingEffects']=function(){const _0x17859a=_0x1ecdb4,_0x284fae=VisuMZ[_0x17859a(0x3d5)]['Settings'];this[_0x17859a(0x347)]=JsonEx[_0x17859a(0x3fb)](_0x284fae[_0x17859a(0x44a)]),this[_0x17859a(0x348)]=JsonEx[_0x17859a(0x3fb)](_0x284fae[_0x17859a(0x283)]),this[_0x17859a(0x45e)]=JsonEx['makeDeepCopy'](_0x284fae[_0x17859a(0x2f6)]);const _0xeda86e=this[_0x17859a(0x324)]()['note']||'';Game_Event[_0x17859a(0x224)][_0x17859a(0x3a3)][_0x17859a(0x402)](this,_0xeda86e);},Game_Actor[_0x1ecdb4(0x224)][_0x1ecdb4(0x3be)]=function(){const _0x4a5de4=_0x1ecdb4;if(this['_conicalLightWalkOffsets']===undefined)this[_0x4a5de4(0x1a6)]();return this[_0x4a5de4(0x347)];},Game_Actor['prototype']['setConicalLightWalkOffsets']=function(_0x1ed245){const _0x5e0280=_0x1ecdb4;if(this[_0x5e0280(0x347)]===undefined)this[_0x5e0280(0x1a6)]();this[_0x5e0280(0x347)]=JsonEx[_0x5e0280(0x3fb)](_0x1ed245);},Game_Actor[_0x1ecdb4(0x224)][_0x1ecdb4(0x3c5)]=function(){const _0x28aa6d=_0x1ecdb4;if(this[_0x28aa6d(0x348)]===undefined)this['initLightingEffects']();return this[_0x28aa6d(0x348)];},Game_Actor[_0x1ecdb4(0x224)]['setConicalLightDashOffsets']=function(_0x130bed){const _0x1a4525=_0x1ecdb4;if(this[_0x1a4525(0x348)]===undefined)this[_0x1a4525(0x1a6)]();this['_conicalLightDashOffsets']=JsonEx[_0x1a4525(0x3fb)](_0x130bed);},Game_Actor[_0x1ecdb4(0x224)]['conicalLightJumpOffsets']=function(){const _0x53b9ce=_0x1ecdb4;if(this[_0x53b9ce(0x45e)]===undefined)this['initLightingEffects']();return this['_conicalLightJumpOffsets'];},Game_Actor[_0x1ecdb4(0x224)][_0x1ecdb4(0x2ce)]=function(_0x543323){const _0x43c1a7=_0x1ecdb4;if(this[_0x43c1a7(0x45e)]===undefined)this[_0x43c1a7(0x1a6)]();this[_0x43c1a7(0x45e)]=JsonEx[_0x43c1a7(0x3fb)](_0x543323);},Game_Actor[_0x1ecdb4(0x224)][_0x1ecdb4(0x192)]=function(){const _0x4f95d1=_0x1ecdb4;Game_Battler[_0x4f95d1(0x224)][_0x4f95d1(0x192)][_0x4f95d1(0x402)](this);const _0x174c86=VisuMZ[_0x4f95d1(0x3d5)]['Settings'][_0x4f95d1(0x27f)];this['setRadialLightSettings'](_0x174c86[_0x4f95d1(0x3f8)]),this[_0x4f95d1(0x440)](_0x174c86[_0x4f95d1(0x317)]),this['radialLight']()[_0x4f95d1(0x2ab)]=_0x174c86[_0x4f95d1(0x303)];},Game_Actor[_0x1ecdb4(0x224)][_0x1ecdb4(0x332)]=function(){const _0x4592e8=_0x1ecdb4,_0x540cf7=this['actor']()[_0x4592e8(0x2ad)];Game_Battler['prototype']['setupBattleLightingEffectsSettings'][_0x4592e8(0x402)](this,_0x540cf7);},Game_Enemy['prototype'][_0x1ecdb4(0x192)]=function(){const _0x2f58d0=_0x1ecdb4;Game_Battler[_0x2f58d0(0x224)][_0x2f58d0(0x192)]['call'](this);const _0x7627c5=VisuMZ[_0x2f58d0(0x3d5)][_0x2f58d0(0x439)][_0x2f58d0(0x27f)];this[_0x2f58d0(0x25d)](_0x7627c5[_0x2f58d0(0x1e8)]),this[_0x2f58d0(0x440)](_0x7627c5[_0x2f58d0(0x383)]),this[_0x2f58d0(0x41e)]()[_0x2f58d0(0x2ab)]=_0x7627c5[_0x2f58d0(0x403)];},VisuMZ[_0x1ecdb4(0x3d5)]['Game_Enemy_setup']=Game_Enemy[_0x1ecdb4(0x224)][_0x1ecdb4(0x1da)],Game_Enemy[_0x1ecdb4(0x224)][_0x1ecdb4(0x1da)]=function(_0x46649d,_0x4b1554,_0x58cff1){const _0x33001c=_0x1ecdb4;VisuMZ[_0x33001c(0x3d5)]['Game_Enemy_setup']['call'](this,_0x46649d,_0x4b1554,_0x58cff1),this[_0x33001c(0x332)]();},Game_Enemy[_0x1ecdb4(0x224)][_0x1ecdb4(0x332)]=function(){const _0x37d126=_0x1ecdb4,_0x255211=this[_0x37d126(0x426)]()[_0x37d126(0x2ad)];Game_Battler[_0x37d126(0x224)][_0x37d126(0x332)][_0x37d126(0x402)](this,_0x255211);},VisuMZ[_0x1ecdb4(0x3d5)]['Game_Map_setup']=Game_Map['prototype']['setup'],Game_Map[_0x1ecdb4(0x224)][_0x1ecdb4(0x1da)]=function(_0x3e0e20){const _0x344761=_0x1ecdb4;VisuMZ[_0x344761(0x3d5)][_0x344761(0x31c)]['call'](this,_0x3e0e20),this[_0x344761(0x44f)](),this[_0x344761(0x1ac)]();},Game_Map[_0x1ecdb4(0x224)][_0x1ecdb4(0x44f)]=function(){const _0x24389a=_0x1ecdb4;if(!$dataMap)return;const _0x2d27a6=VisuMZ[_0x24389a(0x3d5)][_0x24389a(0x1ee)],_0x4f9769=$dataMap['note']||'',_0x2d9cb1=(this['tileset']()?this[_0x24389a(0x41d)]()[_0x24389a(0x2ad)]:'')||'',_0x535095=VisuMZ['LightingEffects'][_0x24389a(0x439)][_0x24389a(0x381)];this[_0x24389a(0x2e0)]={'hardRegionIDs':_0x535095['HardRegions'][_0x24389a(0x201)](),'hardTerrainTagIDs':_0x535095[_0x24389a(0x3ab)][_0x24389a(0x201)](),'softRegionIDs':_0x535095[_0x24389a(0x390)][_0x24389a(0x201)](),'softTerrainTagIDs':_0x535095[_0x24389a(0x2a2)]['clone']()};_0x4f9769['match'](_0x2d27a6[_0x24389a(0x3f6)])&&$gameScreen[_0x24389a(0x3df)](RegExp['$1']);this[_0x24389a(0x243)]=![];_0x4f9769[_0x24389a(0x1bd)](_0x2d27a6[_0x24389a(0x3e8)])&&$gameScreen[_0x24389a(0x37e)](RegExp['$1']);if(_0x4f9769[_0x24389a(0x1bd)](_0x2d27a6[_0x24389a(0x3c6)]))$gameScreen['setLightingOverlayOpacity'](Number(RegExp['$1']));else{if(_0x4f9769[_0x24389a(0x1bd)](_0x2d27a6[_0x24389a(0x42b)])){const _0x3c261c=Number(RegExp['$1'])*0.01,_0x380321=Math['round'](_0x3c261c*0xff);$gameScreen[_0x24389a(0x2a1)](_0x380321);}}_0x4f9769[_0x24389a(0x1bd)](_0x2d27a6[_0x24389a(0x1d8)])&&(this[_0x24389a(0x243)]=!![]),_0x4f9769['match'](_0x2d27a6['antiLightMaskHardRegions'])&&(this[_0x24389a(0x2e0)][_0x24389a(0x213)]=String(RegExp['$1'])['split'](',')[_0x24389a(0x2f5)](_0x20265d=>(Number(_0x20265d)||0x1)[_0x24389a(0x386)](0x1,0xff))),_0x2d9cb1['match'](_0x2d27a6[_0x24389a(0x3a4)])&&(this[_0x24389a(0x2e0)][_0x24389a(0x30a)]=String(RegExp['$1'])[_0x24389a(0x25b)](',')[_0x24389a(0x2f5)](_0x3773ef=>(Number(_0x3773ef)||0x1)['clamp'](0x1,0x7))),_0x4f9769[_0x24389a(0x1bd)](_0x2d27a6[_0x24389a(0x2bf)])&&(this[_0x24389a(0x2e0)]['softRegionIDs']=String(RegExp['$1'])[_0x24389a(0x25b)](',')[_0x24389a(0x2f5)](_0x400087=>(Number(_0x400087)||0x1)['clamp'](0x1,0xff))),_0x2d9cb1[_0x24389a(0x1bd)](_0x2d27a6[_0x24389a(0x41a)])&&(this['_antiLightMasks'][_0x24389a(0x1bf)]=String(RegExp['$1'])[_0x24389a(0x25b)](',')[_0x24389a(0x2f5)](_0x2cbda3=>(Number(_0x2cbda3)||0x1)['clamp'](0x1,0x7)));},Game_Map[_0x1ecdb4(0x224)][_0x1ecdb4(0x22c)]=function(){const _0x203ac5=_0x1ecdb4;if(this[_0x203ac5(0x443)]()[_0x203ac5(0x36c)]>0x0)return!![];if(this[_0x203ac5(0x39c)]()[_0x203ac5(0x36c)]>0x0)return!![];return![];},Game_Map[_0x1ecdb4(0x224)][_0x1ecdb4(0x443)]=function(){const _0x45c124=_0x1ecdb4;if(this[_0x45c124(0x2e0)]===undefined)this['setupLightingEffectsNotetags']();return this['_antiLightMasks']?.[_0x45c124(0x213)]??[];},Game_Map['prototype']['hardAntiLightTerrainTags']=function(){const _0x4c123e=_0x1ecdb4;if(this['_antiLightMasks']===undefined)this[_0x4c123e(0x44f)]();return this[_0x4c123e(0x2e0)]?.[_0x4c123e(0x30a)]??[];},Game_Map[_0x1ecdb4(0x224)]['softAntiLightRegionIDs']=function(){const _0x31914c=_0x1ecdb4;if(this[_0x31914c(0x2e0)]===undefined)this[_0x31914c(0x44f)]();return this[_0x31914c(0x2e0)]?.[_0x31914c(0x2d5)]??[];},Game_Map[_0x1ecdb4(0x224)]['softAntiLightTerrainTags']=function(){const _0x5c6a13=_0x1ecdb4;if(this[_0x5c6a13(0x2e0)]===undefined)this[_0x5c6a13(0x44f)]();return this[_0x5c6a13(0x2e0)]?.[_0x5c6a13(0x1bf)]??[];},Game_Map[_0x1ecdb4(0x224)][_0x1ecdb4(0x1ac)]=function(){const _0x3fab5c=_0x1ecdb4;this[_0x3fab5c(0x1ef)]=[],$gameTemp[_0x3fab5c(0x37d)]=[];},Game_Map['prototype'][_0x1ecdb4(0x352)]=function(){const _0x4e73c3=_0x1ecdb4;if(this[_0x4e73c3(0x1ef)]===undefined)this[_0x4e73c3(0x1ac)]();return this['_lightSpawns'];},VisuMZ[_0x1ecdb4(0x3d5)]['Game_Map_update']=Game_Map[_0x1ecdb4(0x224)][_0x1ecdb4(0x26c)],Game_Map[_0x1ecdb4(0x224)][_0x1ecdb4(0x26c)]=function(_0x11bba7){const _0x34707b=_0x1ecdb4;VisuMZ[_0x34707b(0x3d5)][_0x34707b(0x377)][_0x34707b(0x402)](this,_0x11bba7),this[_0x34707b(0x19e)]();},Game_Map['prototype'][_0x1ecdb4(0x19e)]=function(){const _0x1b86d8=_0x1ecdb4,_0x17d612=this[_0x1b86d8(0x352)]()[_0x1b86d8(0x36c)];for(let _0x100a6f=0x0;_0x100a6f<_0x17d612;_0x100a6f++){const _0x59595d=this[_0x1b86d8(0x352)]()[_0x100a6f];if(!_0x59595d)continue;if(!_0x59595d[_0x1b86d8(0x432)])continue;$gameTemp[_0x1b86d8(0x28a)](_0x100a6f,_0x59595d),_0x59595d['time']++;if(_0x59595d[_0x1b86d8(0x2ca)]<Number[_0x1b86d8(0x2e2)])_0x59595d['expire']--;if(_0x59595d['expire']<=0x0)_0x59595d['active']=![];}},Game_Map[_0x1ecdb4(0x224)][_0x1ecdb4(0x337)]=function(_0x5c796d){const _0x2ad3bc=_0x1ecdb4;$gameTemp['createLightSpawnFunction'](_0x5c796d),this[_0x2ad3bc(0x352)]()[_0x2ad3bc(0x2c3)](_0x5c796d);const _0xfebb63=new Sprite_LightSpawn(_0x5c796d);SceneManager[_0x2ad3bc(0x280)](_0xfebb63);},Game_Map[_0x1ecdb4(0x224)]['isAntiLightingOverlay']=function(){const _0x3e7bb5=_0x1ecdb4;return this[_0x3e7bb5(0x243)];},Game_CharacterBase['prototype']['initLightingEffectsSettings']=function(){const _0x1282ae=_0x1ecdb4;this['_radialLight']={},this[_0x1282ae(0x301)]={},this[_0x1282ae(0x3ba)]={},this[_0x1282ae(0x325)]={};const _0x37d464=VisuMZ[_0x1282ae(0x3d5)][_0x1282ae(0x439)];this['_conicalLightWalkOffsets']=JsonEx[_0x1282ae(0x3fb)](_0x37d464['HandOffset']),this['_conicalLightDashOffsets']=JsonEx['makeDeepCopy'](_0x37d464[_0x1282ae(0x283)]),this[_0x1282ae(0x45e)]=JsonEx[_0x1282ae(0x3fb)](_0x37d464[_0x1282ae(0x2f6)]);},Game_CharacterBase[_0x1ecdb4(0x224)][_0x1ecdb4(0x41e)]=function(){const _0x263b9e=_0x1ecdb4;if(this[_0x263b9e(0x3b8)]===undefined)this[_0x263b9e(0x192)]();return this['_radialLight'];},Game_CharacterBase[_0x1ecdb4(0x224)][_0x1ecdb4(0x25d)]=function(_0x2348ba){const _0x8064cc=_0x1ecdb4;if(this['_radialLight']===undefined)this[_0x8064cc(0x192)]();this['_radialLight']=JsonEx[_0x8064cc(0x3fb)](_0x2348ba);},Game_CharacterBase['prototype'][_0x1ecdb4(0x211)]=function(){const _0x45d2c3=_0x1ecdb4;if(this[_0x45d2c3(0x301)]===undefined)this[_0x45d2c3(0x192)]();return this[_0x45d2c3(0x301)];},Game_CharacterBase['prototype'][_0x1ecdb4(0x440)]=function(_0x10a25c){const _0x1c1618=_0x1ecdb4;if(this[_0x1c1618(0x301)]===undefined)this[_0x1c1618(0x192)]();this['_radialLightBehavior']=JsonEx['makeDeepCopy'](_0x10a25c),ColorManager['RetrieveOpacityPattern'](this[_0x1c1618(0x301)]);},Game_CharacterBase[_0x1ecdb4(0x224)]['conicalLight']=function(){const _0x4921d1=_0x1ecdb4;if(this['_conicalLight']===undefined)this[_0x4921d1(0x192)]();return this['_conicalLight'];},Game_CharacterBase[_0x1ecdb4(0x224)]['setConicalLightSettings']=function(_0x499a61){const _0x1bdee7=_0x1ecdb4;if(this[_0x1bdee7(0x3ba)]===undefined)this[_0x1bdee7(0x192)]();this[_0x1bdee7(0x3ba)]=JsonEx['makeDeepCopy'](_0x499a61);},Game_CharacterBase[_0x1ecdb4(0x224)][_0x1ecdb4(0x3d2)]=function(){const _0x4758d0=_0x1ecdb4;if(this[_0x4758d0(0x325)]===undefined)this[_0x4758d0(0x192)]();return this[_0x4758d0(0x325)];},Game_CharacterBase[_0x1ecdb4(0x224)]['setConicalLightBehavior']=function(_0x2dd4c9){const _0x3e8da7=_0x1ecdb4;if(this['_conicalLightBehavior']===undefined)this[_0x3e8da7(0x192)]();this[_0x3e8da7(0x325)]=JsonEx[_0x3e8da7(0x3fb)](_0x2dd4c9),ColorManager[_0x3e8da7(0x396)](this[_0x3e8da7(0x325)]);},Game_CharacterBase[_0x1ecdb4(0x224)][_0x1ecdb4(0x261)]=function(){const _0x2049ae=_0x1ecdb4;if(this[_0x2049ae(0x3c3)]()){if(this[_0x2049ae(0x3d6)]())return this['conicalLightDashOffsets']();else{if(this[_0x2049ae(0x196)]())return this[_0x2049ae(0x354)]();}}return this[_0x2049ae(0x3be)]();},Game_CharacterBase['prototype'][_0x1ecdb4(0x3be)]=function(){const _0x4a5e8c=_0x1ecdb4;if(this[_0x4a5e8c(0x347)]===undefined)this[_0x4a5e8c(0x1a6)]();return this[_0x4a5e8c(0x347)];},Game_CharacterBase[_0x1ecdb4(0x224)]['setConicalLightWalkOffsets']=function(_0x1e168c){const _0xb62e40=_0x1ecdb4;if(this[_0xb62e40(0x347)]===undefined)this['initLightingEffects']();this['_conicalLightWalkOffsets']=JsonEx[_0xb62e40(0x3fb)](_0x1e168c);},Game_CharacterBase['prototype']['conicalLightDashOffsets']=function(){const _0x557220=_0x1ecdb4;if(this['_conicalLightDashOffsets']===undefined)this['initLightingEffects']();return this[_0x557220(0x348)];},Game_CharacterBase[_0x1ecdb4(0x224)][_0x1ecdb4(0x23c)]=function(_0x4e7258){const _0x5d6c51=_0x1ecdb4;if(this[_0x5d6c51(0x348)]===undefined)this[_0x5d6c51(0x1a6)]();this[_0x5d6c51(0x348)]=JsonEx['makeDeepCopy'](_0x4e7258);},Game_CharacterBase[_0x1ecdb4(0x224)]['conicalLightJumpOffsets']=function(){const _0x24ffeb=_0x1ecdb4;if(this['_conicalLightWalkOffsets']===undefined)this[_0x24ffeb(0x1a6)]();return this[_0x24ffeb(0x347)];},Game_CharacterBase[_0x1ecdb4(0x224)][_0x1ecdb4(0x2ce)]=function(_0x11d037){const _0x201674=_0x1ecdb4;if(this[_0x201674(0x45e)]===undefined)this[_0x201674(0x1a6)]();this[_0x201674(0x45e)]=JsonEx[_0x201674(0x3fb)](_0x11d037);},VisuMZ[_0x1ecdb4(0x3d5)][_0x1ecdb4(0x1fa)]=Game_Player[_0x1ecdb4(0x224)][_0x1ecdb4(0x2dd)],Game_Player[_0x1ecdb4(0x224)][_0x1ecdb4(0x2dd)]=function(){const _0x4f2706=_0x1ecdb4;VisuMZ['LightingEffects']['Game_Player_initMembers']['call'](this),this[_0x4f2706(0x1a6)]();},Game_Player[_0x1ecdb4(0x224)][_0x1ecdb4(0x1a6)]=function(){const _0x1418a0=_0x1ecdb4,_0x20dee9=VisuMZ[_0x1418a0(0x3d5)][_0x1418a0(0x439)]['Map'];this[_0x1418a0(0x29b)](_0x20dee9['FollowerRadial']),this[_0x1418a0(0x44e)](_0x20dee9['FollowerRadialBehavior']),this[_0x1418a0(0x319)](_0x20dee9[_0x1418a0(0x358)]),this[_0x1418a0(0x304)](_0x20dee9[_0x1418a0(0x2ed)]);},Game_Player[_0x1ecdb4(0x224)][_0x1ecdb4(0x192)]=function(){const _0x7989cc=_0x1ecdb4;Game_Character[_0x7989cc(0x224)]['initLightingEffectsSettings'][_0x7989cc(0x402)](this);const _0x56a9af=VisuMZ[_0x7989cc(0x3d5)]['Settings'][_0x7989cc(0x2c9)];this[_0x7989cc(0x25d)](_0x56a9af[_0x7989cc(0x40a)]),this[_0x7989cc(0x440)](_0x56a9af[_0x7989cc(0x450)]),this[_0x7989cc(0x43c)](_0x56a9af[_0x7989cc(0x3e4)]),this['setConicalLightBehavior'](_0x56a9af[_0x7989cc(0x3ae)]);},Game_Player['prototype'][_0x1ecdb4(0x33e)]=function(){const _0x53f175=_0x1ecdb4;if(this['_followerRadialLight']===undefined)this[_0x53f175(0x1a6)]();return this[_0x53f175(0x36e)];},Game_Player[_0x1ecdb4(0x224)][_0x1ecdb4(0x29b)]=function(_0xd7f4d5){const _0xf3a55d=_0x1ecdb4;this[_0xf3a55d(0x36e)]=JsonEx[_0xf3a55d(0x3fb)](_0xd7f4d5);},Game_Player[_0x1ecdb4(0x224)]['getFollowerRadialLightBehavior']=function(){const _0x1eb491=_0x1ecdb4;if(this['_followerRadialLightBehavior']===undefined)this[_0x1eb491(0x192)]();return this[_0x1eb491(0x3d3)];},Game_Player[_0x1ecdb4(0x224)][_0x1ecdb4(0x44e)]=function(_0x204651){const _0x354537=_0x1ecdb4;if(this['_followerRadialLightBehavior']===undefined)this[_0x354537(0x192)]();this[_0x354537(0x3d3)]=JsonEx[_0x354537(0x3fb)](_0x204651),ColorManager[_0x354537(0x396)](this['_followerRadialLightBehavior']);},Game_Player['prototype'][_0x1ecdb4(0x2b2)]=function(){const _0x138c79=_0x1ecdb4;if(this[_0x138c79(0x1aa)]===undefined)this['initLightingEffects']();return this[_0x138c79(0x1aa)];},Game_Player[_0x1ecdb4(0x224)][_0x1ecdb4(0x319)]=function(_0x3cf4e1){const _0x1e28b4=_0x1ecdb4;this[_0x1e28b4(0x1aa)]=JsonEx[_0x1e28b4(0x3fb)](_0x3cf4e1);},Game_Player[_0x1ecdb4(0x224)][_0x1ecdb4(0x43b)]=function(){const _0x9d12d5=_0x1ecdb4;if(this['_followerConicalLightBehavior']===undefined)this['initLightingEffectsSettings']();return this[_0x9d12d5(0x423)];},Game_Player['prototype']['setFollowerConicalLightBehavior']=function(_0x5c5624){const _0x3ea6af=_0x1ecdb4;if(this[_0x3ea6af(0x423)]===undefined)this[_0x3ea6af(0x192)]();this[_0x3ea6af(0x423)]=JsonEx[_0x3ea6af(0x3fb)](_0x5c5624),ColorManager[_0x3ea6af(0x396)](this[_0x3ea6af(0x423)]);},Game_Player['prototype']['conicalLightWalkOffsets']=function(){const _0x12ddd5=_0x1ecdb4;return $gameParty[_0x12ddd5(0x321)]()?$gameParty[_0x12ddd5(0x321)]()[_0x12ddd5(0x3be)]():Game_Character['prototype'][_0x12ddd5(0x3be)]['call'](this);},Game_Player[_0x1ecdb4(0x224)][_0x1ecdb4(0x259)]=function(_0x19c30e){const _0x545a99=_0x1ecdb4;$gameParty['leader']()?$gameParty[_0x545a99(0x321)]()[_0x545a99(0x259)](_0x19c30e):Game_Character[_0x545a99(0x224)][_0x545a99(0x259)][_0x545a99(0x402)](this,_0x19c30e);},Game_Player[_0x1ecdb4(0x224)]['conicalLightDashOffsets']=function(){const _0x302f29=_0x1ecdb4;return $gameParty[_0x302f29(0x321)]()?$gameParty[_0x302f29(0x321)]()[_0x302f29(0x3c5)]():Game_Character[_0x302f29(0x224)][_0x302f29(0x3c5)][_0x302f29(0x402)](this);},Game_Player[_0x1ecdb4(0x224)][_0x1ecdb4(0x23c)]=function(_0x49425d){const _0x106ef6=_0x1ecdb4;$gameParty[_0x106ef6(0x321)]()?$gameParty[_0x106ef6(0x321)]()['setConicalLightDashOffsets'](_0x49425d):Game_Character[_0x106ef6(0x224)][_0x106ef6(0x23c)][_0x106ef6(0x402)](this,_0x49425d);},Game_Player[_0x1ecdb4(0x224)][_0x1ecdb4(0x354)]=function(){const _0x211534=_0x1ecdb4;return $gameParty[_0x211534(0x321)]()?$gameParty[_0x211534(0x321)]()[_0x211534(0x354)]():Game_Character['prototype'][_0x211534(0x354)][_0x211534(0x402)](this);},Game_Player[_0x1ecdb4(0x224)]['setConicalLightJumpOffsets']=function(_0x34be32){const _0x1f5141=_0x1ecdb4;$gameParty['leader']()?$gameParty[_0x1f5141(0x321)]()[_0x1f5141(0x2ce)](_0x34be32):Game_Character['prototype'][_0x1f5141(0x2ce)][_0x1f5141(0x402)](this,_0x34be32);},Game_Follower[_0x1ecdb4(0x224)][_0x1ecdb4(0x41e)]=function(){return $gamePlayer['getFollowerRadialLightSettings']();},Game_Follower['prototype'][_0x1ecdb4(0x211)]=function(){return $gamePlayer['getFollowerRadialLightBehavior']();},Game_Follower['prototype']['conicalLight']=function(){const _0x2dd6a5=_0x1ecdb4;return $gamePlayer[_0x2dd6a5(0x2b2)]();},Game_Follower[_0x1ecdb4(0x224)][_0x1ecdb4(0x3d2)]=function(){const _0x78882c=_0x1ecdb4;return $gamePlayer[_0x78882c(0x43b)]();},Game_Follower[_0x1ecdb4(0x224)][_0x1ecdb4(0x3be)]=function(){const _0x4112bc=_0x1ecdb4;return this['actor']()?this['actor']()[_0x4112bc(0x3be)]():Game_Character[_0x4112bc(0x224)][_0x4112bc(0x3be)][_0x4112bc(0x402)](this);},Game_Follower['prototype'][_0x1ecdb4(0x259)]=function(_0x445f36){const _0x5d0b5a=_0x1ecdb4;this[_0x5d0b5a(0x324)]()?this['actor']()['setConicalLightWalkOffsets'](_0x445f36):Game_Character[_0x5d0b5a(0x224)][_0x5d0b5a(0x259)][_0x5d0b5a(0x402)](this,_0x445f36);},Game_Follower[_0x1ecdb4(0x224)]['conicalLightDashOffsets']=function(){const _0x4bfdc7=_0x1ecdb4;return this[_0x4bfdc7(0x324)]()?this[_0x4bfdc7(0x324)]()[_0x4bfdc7(0x3c5)]():Game_Character[_0x4bfdc7(0x224)][_0x4bfdc7(0x3c5)][_0x4bfdc7(0x402)](this);},Game_Follower[_0x1ecdb4(0x224)]['setConicalLightDashOffsets']=function(_0x3e2e8a){const _0x4f41ef=_0x1ecdb4;this['actor']()?this[_0x4f41ef(0x324)]()[_0x4f41ef(0x23c)](_0x3e2e8a):Game_Character['prototype'][_0x4f41ef(0x23c)][_0x4f41ef(0x402)](this,_0x3e2e8a);},Game_Follower['prototype'][_0x1ecdb4(0x354)]=function(){const _0x350c5b=_0x1ecdb4;return this['actor']()?this[_0x350c5b(0x324)]()['conicalLightJumpOffsets']():Game_Character[_0x350c5b(0x224)][_0x350c5b(0x354)][_0x350c5b(0x402)](this);},Game_Follower[_0x1ecdb4(0x224)][_0x1ecdb4(0x2ce)]=function(_0x2048b7){const _0x3f1834=_0x1ecdb4;this[_0x3f1834(0x324)]()?this[_0x3f1834(0x324)]()[_0x3f1834(0x2ce)](_0x2048b7):Game_Character[_0x3f1834(0x224)][_0x3f1834(0x2ce)][_0x3f1834(0x402)](this,_0x2048b7);},Game_Vehicle[_0x1ecdb4(0x224)]['initLightingEffectsSettings']=function(){const _0x222975=_0x1ecdb4;Game_Character[_0x222975(0x224)][_0x222975(0x192)][_0x222975(0x402)](this),this[_0x222975(0x3c1)]();},Game_Vehicle[_0x1ecdb4(0x224)][_0x1ecdb4(0x3c1)]=function(){const _0x11b735=_0x1ecdb4;let _0x2d425f=this[_0x11b735(0x1d2)]();_0x2d425f=this[_0x11b735(0x1c6)](_0x2d425f),this[_0x11b735(0x234)]=_0x2d425f;},Game_Vehicle[_0x1ecdb4(0x224)][_0x1ecdb4(0x1d2)]=function(){return{'Boarded':{'Radial':{'Settings':{},'Behavior':{}},'Conical':{'Settings':{},'Behavior':{},'Offset':{}}},'Unboarded':{'Radial':{'Settings':{},'Behavior':{}},'Conical':{'Settings':{},'Behavior':{},'Offset':{}}}};},Game_Vehicle['prototype'][_0x1ecdb4(0x1c6)]=function(_0x32a2bc){const _0x4a9243=_0x1ecdb4,_0x32bdb5=VisuMZ[_0x4a9243(0x3d5)][_0x4a9243(0x439)][_0x4a9243(0x2c9)];let _0x422c24='';if(this[_0x4a9243(0x22b)]())_0x422c24=_0x4a9243(0x23d);if(this['isShip']())_0x422c24=_0x4a9243(0x272);if(this['isAirship']())_0x422c24='Airship';const _0x2132fb=[_0x4a9243(0x199),_0x4a9243(0x45f)],_0x524c75=['Radial',_0x4a9243(0x307)],_0x57b5bf=[_0x4a9243(0x439),'Behavior',_0x4a9243(0x3e0)];for(let _0x13c595=0x0;_0x13c595<_0x2132fb[_0x4a9243(0x36c)];_0x13c595++){let _0x383793=_0x2132fb[_0x13c595];for(let _0x405c45=0x0;_0x405c45<_0x524c75['length'];_0x405c45++){let _0x21b576=_0x524c75[_0x405c45];for(let _0x220804=0x0;_0x220804<_0x57b5bf[_0x4a9243(0x36c)];_0x220804++){let _0x10cf37=_0x57b5bf[_0x220804];const _0x215610=_0x4a9243(0x270)[_0x4a9243(0x2d1)](_0x422c24,_0x383793,_0x21b576,_0x10cf37);_0x32bdb5[_0x215610]&&(_0x32a2bc[_0x383793][_0x21b576][_0x10cf37]=JsonEx[_0x4a9243(0x3fb)](_0x32bdb5[_0x215610]));}}}return _0x32a2bc;},Game_Vehicle[_0x1ecdb4(0x224)][_0x1ecdb4(0x380)]=function(_0xdbf2e2,_0x3a9879,_0x9aac53){const _0x514abe=_0x1ecdb4;this[_0x514abe(0x234)]===undefined&&this[_0x514abe(0x3c1)]();const _0x7ace57=_0xdbf2e2?_0x514abe(0x199):_0x514abe(0x45f),_0x395988=_0x3a9879?_0x514abe(0x302):_0x514abe(0x307),_0x398325=_0x9aac53?_0x514abe(0x24f):_0x514abe(0x439);return this[_0x514abe(0x234)][_0x7ace57][_0x395988][_0x398325];},Game_Vehicle['prototype'][_0x1ecdb4(0x3b0)]=function(_0x3f351c,_0x43e77c,_0x7f6b5,_0x330a31){const _0x16966f=_0x1ecdb4;this[_0x16966f(0x234)]===undefined&&this['initVehicleLightingEffectsSettings']();const _0x234051=_0x43e77c?'Boarded':'Unboarded',_0x98eea6=_0x7f6b5?_0x16966f(0x302):_0x16966f(0x307),_0x2b74e2=_0x330a31?_0x16966f(0x24f):'Settings';this['_vehicleLightingSettings'][_0x234051][_0x98eea6][_0x2b74e2]=JsonEx[_0x16966f(0x3fb)](_0x3f351c);},Game_Vehicle[_0x1ecdb4(0x224)][_0x1ecdb4(0x32a)]=function(_0x387ce2,_0x5c36c0){const _0x1329c4=_0x1ecdb4;this[_0x1329c4(0x234)]===undefined&&this['initVehicleLightingEffectsSettings']();const _0x58178b=_0x5c36c0?_0x1329c4(0x199):_0x1329c4(0x45f),_0x23e09a='Conical',_0x585575='Offset';this[_0x1329c4(0x234)][_0x58178b][_0x23e09a][_0x585575]=JsonEx['makeDeepCopy'](_0x387ce2);},Game_Vehicle['prototype']['radialLight']=function(){const _0x596f1f=_0x1ecdb4;return this[_0x596f1f(0x380)](this[_0x596f1f(0x3cf)],!![],![]);},Game_Vehicle[_0x1ecdb4(0x224)][_0x1ecdb4(0x211)]=function(){const _0x15bac3=_0x1ecdb4;return this[_0x15bac3(0x380)](this[_0x15bac3(0x3cf)],!![],!![]);},Game_Vehicle['prototype'][_0x1ecdb4(0x285)]=function(){const _0x11d760=_0x1ecdb4,_0x540956=this[_0x11d760(0x3cf)]?_0x11d760(0x199):_0x11d760(0x45f),_0x29270d=![]?_0x11d760(0x302):_0x11d760(0x307),_0x230c4e=![]?_0x11d760(0x24f):_0x11d760(0x439);return this[_0x11d760(0x380)](this[_0x11d760(0x3cf)],![],![]);},Game_Vehicle[_0x1ecdb4(0x224)][_0x1ecdb4(0x3d2)]=function(){const _0x49186a=_0x1ecdb4;return this[_0x49186a(0x380)](this[_0x49186a(0x3cf)],![],!![]);},Game_Vehicle[_0x1ecdb4(0x224)][_0x1ecdb4(0x261)]=function(){const _0x5d592b=_0x1ecdb4;return this[_0x5d592b(0x234)]===undefined&&this['initVehicleLightingEffectsSettings'](),this[_0x5d592b(0x3cf)]?this['_vehicleLightingSettings'][_0x5d592b(0x199)][_0x5d592b(0x307)][_0x5d592b(0x3e0)]:this[_0x5d592b(0x234)]['Unboarded']['Conical'][_0x5d592b(0x3e0)];},VisuMZ['LightingEffects'][_0x1ecdb4(0x2db)]=Game_Event[_0x1ecdb4(0x224)][_0x1ecdb4(0x1fb)],Game_Event[_0x1ecdb4(0x224)]['clearPageSettings']=function(){const _0x581a2c=_0x1ecdb4;VisuMZ[_0x581a2c(0x3d5)][_0x581a2c(0x2db)][_0x581a2c(0x402)](this),this[_0x581a2c(0x192)]();},VisuMZ[_0x1ecdb4(0x3d5)][_0x1ecdb4(0x3b3)]=Game_Event[_0x1ecdb4(0x224)][_0x1ecdb4(0x3a9)],Game_Event['prototype'][_0x1ecdb4(0x3a9)]=function(){const _0x41ab61=_0x1ecdb4;VisuMZ[_0x41ab61(0x3d5)]['Game_Event_setupPageSettings'][_0x41ab61(0x402)](this),this[_0x41ab61(0x248)]();},Game_Event[_0x1ecdb4(0x224)][_0x1ecdb4(0x248)]=function(){const _0x568870=_0x1ecdb4;if(!this[_0x568870(0x25a)]())return;this[_0x568870(0x192)](),this[_0x568870(0x44f)](),this['setupLightingEffectsCommentTags']();},Game_Event[_0x1ecdb4(0x224)]['setupLightingEffectsNotetags']=function(){const _0x559f79=_0x1ecdb4,_0x163728=this[_0x559f79(0x25a)]()[_0x559f79(0x2ad)];if(_0x163728==='')return;this[_0x559f79(0x200)](_0x163728);},Game_Event[_0x1ecdb4(0x224)][_0x1ecdb4(0x384)]=function(){const _0xe47607=_0x1ecdb4;if(!this[_0xe47607(0x38e)]())return;const _0x2b7fb0=this[_0xe47607(0x364)]();let _0x19b336='';for(const _0x285e32 of _0x2b7fb0){if([0x6c,0x198][_0xe47607(0x2a0)](_0x285e32[_0xe47607(0x3ad)])){if(_0x19b336!=='')_0x19b336+='\x0a';_0x19b336+=_0x285e32[_0xe47607(0x1b0)][0x0];}}this['checkLightingEffectsStringTags'](_0x19b336);},Game_Event[_0x1ecdb4(0x224)]['initLightingEffectsSettings']=function(){const _0x58aa93=_0x1ecdb4;Game_Character[_0x58aa93(0x224)][_0x58aa93(0x192)]['call'](this);const _0x7eea05=VisuMZ[_0x58aa93(0x3d5)][_0x58aa93(0x439)][_0x58aa93(0x2c9)];this['setRadialLightSettings'](_0x7eea05[_0x58aa93(0x1c0)]),this['setRadialLightBehavior'](_0x7eea05[_0x58aa93(0x331)]),this[_0x58aa93(0x43c)](_0x7eea05[_0x58aa93(0x291)]),this[_0x58aa93(0x31d)](_0x7eea05['EventConicalBehavior']);},Game_Event['prototype'][_0x1ecdb4(0x200)]=function(_0x367136){const _0x460df4=_0x1ecdb4;this[_0x460df4(0x34b)](_0x367136),this[_0x460df4(0x189)](_0x367136),this[_0x460df4(0x431)](_0x367136),this[_0x460df4(0x3de)](_0x367136),this['checkConicalLightHandOffsetStringTags'](_0x367136);},Game_Event[_0x1ecdb4(0x224)]['checkRadialLightBasicStringTags']=function(_0x42a624){const _0x4145f0=_0x1ecdb4,_0x42aad6=VisuMZ[_0x4145f0(0x3d5)][_0x4145f0(0x1ee)];if(_0x42a624[_0x4145f0(0x1bd)](_0x42aad6[_0x4145f0(0x344)]))this[_0x4145f0(0x41e)]()[_0x4145f0(0x3a7)]=!![];else{if(_0x42a624['match'](_0x42aad6['RadialLightCatchAll']))this[_0x4145f0(0x41e)]()[_0x4145f0(0x3a7)]=!![];else _0x42a624[_0x4145f0(0x1bd)](_0x42aad6[_0x4145f0(0x29f)])&&(this[_0x4145f0(0x41e)]()[_0x4145f0(0x3a7)]=![]);}_0x42a624[_0x4145f0(0x1bd)](_0x42aad6[_0x4145f0(0x378)])&&(this[_0x4145f0(0x41e)]()[_0x4145f0(0x2ea)]=String(RegExp['$1'])[_0x4145f0(0x1ec)]());_0x42a624[_0x4145f0(0x1bd)](_0x42aad6[_0x4145f0(0x310)])&&(this[_0x4145f0(0x41e)]()['color']=ColorManager[_0x4145f0(0x39e)](RegExp['$1']));if(_0x42a624['match'](_0x42aad6[_0x4145f0(0x2e9)]))this[_0x4145f0(0x41e)]()[_0x4145f0(0x1c3)]=Number(RegExp['$1']),this[_0x4145f0(0x41e)]()['autoRadius']=![];else _0x42a624['match'](_0x42aad6[_0x4145f0(0x400)])&&(this['radialLight']()['radius']=Math[_0x4145f0(0x282)](Number(RegExp['$1'])/0x2),this[_0x4145f0(0x41e)]()['autoRadius']=![]);_0x42a624[_0x4145f0(0x1bd)](_0x42aad6[_0x4145f0(0x222)])&&(this[_0x4145f0(0x41e)]()['intensity']=(Number(RegExp['$1'])*0.01)[_0x4145f0(0x386)](0x0,0x1));_0x42a624[_0x4145f0(0x1bd)](_0x42aad6[_0x4145f0(0x300)])&&(this[_0x4145f0(0x41e)]()[_0x4145f0(0x444)]=ColorManager[_0x4145f0(0x26f)](RegExp['$1']));if(_0x42a624[_0x4145f0(0x1bd)](_0x42aad6['RadialLightOpacityFlat']))this['radialLight']()[_0x4145f0(0x271)]=Number(RegExp['$1'])[_0x4145f0(0x386)](0x0,0xff);else{if(_0x42a624[_0x4145f0(0x1bd)](_0x42aad6[_0x4145f0(0x2bc)])){const _0x30e807=Number(RegExp['$1'])*0.01;this[_0x4145f0(0x41e)]()['opacity']=Math[_0x4145f0(0x282)](_0x30e807*0xff)['clamp'](0x0,0xff);}}_0x42a624[_0x4145f0(0x1bd)](_0x42aad6[_0x4145f0(0x409)])&&(this['radialLight']()[_0x4145f0(0x355)]=Number(RegExp['$1'])['clamp'](0x0,0x168));_0x42a624[_0x4145f0(0x1bd)](_0x42aad6[_0x4145f0(0x447)])&&(this['radialLight']()['rotateSpeed']=Number(RegExp['$1']));if(_0x42a624[_0x4145f0(0x1bd)](_0x42aad6['RadialLightOffset'])){const _0x42b8f3=String(RegExp['$1'])[_0x4145f0(0x25b)](',')['map'](_0x1b1292=>Number(_0x1b1292)||0x0);this['radialLight']()['offsetX']=_0x42b8f3[0x0]||0x0,this[_0x4145f0(0x41e)]()[_0x4145f0(0x245)]=_0x42b8f3[0x1]||0x0;}},Game_Event[_0x1ecdb4(0x224)]['checkRadialLightBehaviorStringTags']=function(_0xfae1ef){const _0xfceab3=_0x1ecdb4,_0x447317=VisuMZ[_0xfceab3(0x3d5)][_0xfceab3(0x1ee)];_0xfae1ef['match'](_0x447317[_0xfceab3(0x2f0)])&&(this[_0xfceab3(0x211)]()['blinkRate']=Number(RegExp['$1'])*0.01);_0xfae1ef[_0xfceab3(0x1bd)](_0x447317[_0xfceab3(0x2d8)])&&(this[_0xfceab3(0x211)]()[_0xfceab3(0x2d4)]=Number(RegExp['$1'])*0.01);_0xfae1ef[_0xfceab3(0x1bd)](_0x447317[_0xfceab3(0x30b)])&&(this[_0xfceab3(0x211)]()['flickerRate']=Number(RegExp['$1'])*0.01);_0xfae1ef['match'](_0x447317['RadialBehaviorFlickerMod'])&&(this[_0xfceab3(0x211)]()[_0xfceab3(0x45a)]=Number(RegExp['$1'])*0.01);if(_0xfae1ef[_0xfceab3(0x1bd)](_0x447317[_0xfceab3(0x21e)])){this[_0xfceab3(0x211)]()[_0xfceab3(0x3e3)]=Number(RegExp['$1'])*0.01;if(this[_0xfceab3(0x41e)]()[_0xfceab3(0x271)]>=0xff)this[_0xfceab3(0x41e)]()[_0xfceab3(0x271)]=0x80;}_0xfae1ef['match'](_0x447317[_0xfceab3(0x2eb)])&&(this['radialLightBehavior']()[_0xfceab3(0x26d)]=Number(RegExp['$1'])*0.01);if(_0xfae1ef[_0xfceab3(0x1bd)](_0x447317[_0xfceab3(0x3e7)])){this[_0xfceab3(0x211)]()[_0xfceab3(0x346)]=Number(RegExp['$1'])*0.01;if(this['radialLight']()[_0xfceab3(0x271)]>=0xff)this[_0xfceab3(0x41e)]()[_0xfceab3(0x271)]=0x80;}_0xfae1ef[_0xfceab3(0x1bd)](_0x447317[_0xfceab3(0x374)])&&(this['radialLightBehavior']()[_0xfceab3(0x1ab)]=Number(RegExp['$1'])*0.01);_0xfae1ef[_0xfceab3(0x1bd)](_0x447317['RadialBehaviorGlowRate'])&&(this[_0xfceab3(0x211)]()[_0xfceab3(0x1bc)]=Number(RegExp['$1'])*0.01);_0xfae1ef[_0xfceab3(0x1bd)](_0x447317[_0xfceab3(0x32e)])&&(this['radialLightBehavior']()[_0xfceab3(0x188)]=Number(RegExp['$1'])*0.01);if(_0xfae1ef[_0xfceab3(0x1bd)](_0x447317[_0xfceab3(0x33d)]))this[_0xfceab3(0x211)]()['glowRng']=!![];else _0xfae1ef[_0xfceab3(0x1bd)](_0x447317[_0xfceab3(0x34a)])&&(this['radialLightBehavior']()[_0xfceab3(0x437)]=![]);_0xfae1ef[_0xfceab3(0x1bd)](_0x447317[_0xfceab3(0x193)])&&(this[_0xfceab3(0x211)]()[_0xfceab3(0x1b9)]=Number(RegExp['$1'])*0.01);_0xfae1ef[_0xfceab3(0x1bd)](_0x447317[_0xfceab3(0x249)])&&(this[_0xfceab3(0x211)]()[_0xfceab3(0x3f3)]=Number(RegExp['$1'])*0.01);if(_0xfae1ef['match'](_0x447317['RadialBehaviorPulseRng']))this[_0xfceab3(0x211)]()['pulseRng']=!![];else _0xfae1ef[_0xfceab3(0x1bd)](_0x447317[_0xfceab3(0x45d)])&&(this[_0xfceab3(0x211)]()[_0xfceab3(0x42d)]=![]);if(_0xfae1ef[_0xfceab3(0x1bd)](_0x447317['RadialBehaviorPatternPreset']))this['radialLightBehavior']()[_0xfceab3(0x458)]=ColorManager[_0xfceab3(0x314)](RegExp['$1']);else _0xfae1ef[_0xfceab3(0x1bd)](_0x447317[_0xfceab3(0x449)])&&(this[_0xfceab3(0x211)]()[_0xfceab3(0x458)]=String(RegExp['$1'])[_0xfceab3(0x1ce)]()[_0xfceab3(0x1ec)]());_0xfae1ef[_0xfceab3(0x1bd)](_0x447317[_0xfceab3(0x293)])&&(this['radialLightBehavior']()[_0xfceab3(0x29c)]=Number(RegExp['$1'])||0x1);},Game_Event[_0x1ecdb4(0x224)][_0x1ecdb4(0x431)]=function(_0x7ad055){const _0xb186a9=_0x1ecdb4,_0x1331f6=VisuMZ[_0xb186a9(0x3d5)]['RegExp'];if(_0x7ad055[_0xb186a9(0x1bd)](_0x1331f6[_0xb186a9(0x194)]))this[_0xb186a9(0x285)]()[_0xb186a9(0x3a7)]=!![];else{if(_0x7ad055[_0xb186a9(0x1bd)](_0x1331f6['ConicalLightCatchAll']))this['conicalLight']()['enabled']=!![];else _0x7ad055[_0xb186a9(0x1bd)](_0x1331f6['ConicalLightTurnOff'])&&(this['conicalLight']()[_0xb186a9(0x3a7)]=![]);}_0x7ad055[_0xb186a9(0x1bd)](_0x1331f6['ConicalLightFilename'])&&(this[_0xb186a9(0x285)]()[_0xb186a9(0x2ea)]=String(RegExp['$1'])[_0xb186a9(0x1ec)]());_0x7ad055[_0xb186a9(0x1bd)](_0x1331f6['ConicalLightFileAngleOffset'])&&(this['conicalLight']()['fileAngleOffset']=Number(RegExp['$1'])[_0xb186a9(0x386)](0x0,0x168));if(_0x7ad055['match'](_0x1331f6[_0xb186a9(0x232)])){const _0x36e36e=String(RegExp['$1'])['split'](',')[_0xb186a9(0x2f5)](_0x589eec=>Number(_0x589eec)||0x0);this[_0xb186a9(0x285)]()[_0xb186a9(0x42e)]=_0x36e36e[0x0],this[_0xb186a9(0x285)]()[_0xb186a9(0x395)]=_0x36e36e[0x1];}_0x7ad055['match'](_0x1331f6[_0xb186a9(0x427)])&&(this['conicalLight']()['color']=ColorManager[_0xb186a9(0x39e)](RegExp['$1']));if(_0x7ad055[_0xb186a9(0x1bd)](_0x1331f6[_0xb186a9(0x208)]))this[_0xb186a9(0x285)]()[_0xb186a9(0x1c3)]=Number(RegExp['$1']);else _0x7ad055[_0xb186a9(0x1bd)](_0x1331f6[_0xb186a9(0x330)])&&(this[_0xb186a9(0x285)]()[_0xb186a9(0x1c3)]=Math[_0xb186a9(0x282)](Number(RegExp['$1'])/0x2));if(_0x7ad055[_0xb186a9(0x1bd)](_0x1331f6[_0xb186a9(0x27a)]))this[_0xb186a9(0x285)]()[_0xb186a9(0x3cd)]=Number(RegExp['$1']);else _0x7ad055['match'](_0x1331f6['ConicalLightSrcDiameter'])&&(this[_0xb186a9(0x285)]()['miniRadius']=Math[_0xb186a9(0x282)](Number(RegExp['$1'])/0x2));_0x7ad055[_0xb186a9(0x1bd)](_0x1331f6[_0xb186a9(0x1c1)])&&(this['conicalLight']()[_0xb186a9(0x220)]=(Number(RegExp['$1'])*0.01)[_0xb186a9(0x386)](0x0,0x1));_0x7ad055['match'](_0x1331f6[_0xb186a9(0x1a1)])&&(this['conicalLight']()[_0xb186a9(0x444)]=ColorManager[_0xb186a9(0x26f)](RegExp['$1']));if(_0x7ad055[_0xb186a9(0x1bd)](_0x1331f6[_0xb186a9(0x253)]))this[_0xb186a9(0x285)]()[_0xb186a9(0x271)]=Number(RegExp['$1'])['clamp'](0x0,0xff);else{if(_0x7ad055[_0xb186a9(0x1bd)](_0x1331f6[_0xb186a9(0x23a)])){const _0x9faa48=Number(RegExp['$1'])*0.01;this[_0xb186a9(0x285)]()['opacity']=Math['round'](_0x9faa48*0xff)[_0xb186a9(0x386)](0x0,0xff);}}_0x7ad055['match'](_0x1331f6[_0xb186a9(0x2dc)])&&(this[_0xb186a9(0x285)]()[_0xb186a9(0x355)]=Number(RegExp['$1'])['clamp'](0x0,0x168));_0x7ad055[_0xb186a9(0x1bd)](_0x1331f6[_0xb186a9(0x225)])&&(this[_0xb186a9(0x285)]()[_0xb186a9(0x287)]=Number(RegExp['$1'])[_0xb186a9(0x386)](0x0,0x168));_0x7ad055[_0xb186a9(0x1bd)](_0x1331f6[_0xb186a9(0x2f7)])&&(this[_0xb186a9(0x285)]()[_0xb186a9(0x25c)]=Number(RegExp['$1'])*0.01);if(_0x7ad055[_0xb186a9(0x1bd)](_0x1331f6['ConicalLightSwayRng']))this[_0xb186a9(0x285)]()[_0xb186a9(0x309)]=!![];else _0x7ad055['match'](_0x1331f6[_0xb186a9(0x367)])&&(this[_0xb186a9(0x285)]()[_0xb186a9(0x309)]=![]);_0x7ad055['match'](_0x1331f6[_0xb186a9(0x34f)])&&(this[_0xb186a9(0x285)]()[_0xb186a9(0x197)]=TextManager['parseDirectionText'](RegExp['$1']));if(_0x7ad055[_0xb186a9(0x1bd)](_0x1331f6[_0xb186a9(0x455)]))this[_0xb186a9(0x285)]()[_0xb186a9(0x1f3)]=!![];else _0x7ad055['match'](_0x1331f6[_0xb186a9(0x238)])&&(this[_0xb186a9(0x285)]()['followMouse']=![]);if(_0x7ad055[_0xb186a9(0x1bd)](_0x1331f6[_0xb186a9(0x28e)]))this[_0xb186a9(0x285)]()['useHandOffset']=!![];else _0x7ad055[_0xb186a9(0x1bd)](_0x1331f6[_0xb186a9(0x2fd)])&&(this['conicalLight']()['useHandOffset']=![]);if(_0x7ad055['match'](_0x1331f6[_0xb186a9(0x3e2)])){const _0x121dd5=String(RegExp['$1'])[_0xb186a9(0x25b)](',')[_0xb186a9(0x2f5)](_0x593b32=>Number(_0x593b32)||0x0);this[_0xb186a9(0x285)]()[_0xb186a9(0x269)]=_0x121dd5[0x0]||0x0,this[_0xb186a9(0x285)]()[_0xb186a9(0x245)]=_0x121dd5[0x1]||0x0,this[_0xb186a9(0x285)]()['useHandOffset']=![];}},Game_Event['prototype'][_0x1ecdb4(0x3de)]=function(_0x31eff8){const _0x56f346=_0x1ecdb4,_0x3ca5eb=VisuMZ[_0x56f346(0x3d5)][_0x56f346(0x1ee)];_0x31eff8['match'](_0x3ca5eb[_0x56f346(0x256)])&&(this[_0x56f346(0x3d2)]()[_0x56f346(0x26e)]=Number(RegExp['$1'])*0.01);_0x31eff8[_0x56f346(0x1bd)](_0x3ca5eb[_0x56f346(0x318)])&&(this['conicalLightBehavior']()['blinkModifier']=Number(RegExp['$1'])*0.01);_0x31eff8[_0x56f346(0x1bd)](_0x3ca5eb['ConicalBehaviorFlickerRate'])&&(this[_0x56f346(0x3d2)]()['flickerRate']=Number(RegExp['$1'])*0.01);_0x31eff8[_0x56f346(0x1bd)](_0x3ca5eb[_0x56f346(0x1b6)])&&(this['conicalLightBehavior']()[_0x56f346(0x45a)]=Number(RegExp['$1'])*0.01);if(_0x31eff8[_0x56f346(0x1bd)](_0x3ca5eb[_0x56f346(0x3d8)])){this[_0x56f346(0x3d2)]()['flashRate']=Number(RegExp['$1'])*0.01;if(this['conicalLight']()[_0x56f346(0x271)]>=0xff)this[_0x56f346(0x285)]()[_0x56f346(0x271)]=0x80;}_0x31eff8[_0x56f346(0x1bd)](_0x3ca5eb['ConicalBehaviorFlashMod'])&&(this[_0x56f346(0x3d2)]()[_0x56f346(0x26d)]=Number(RegExp['$1'])*0.01);if(_0x31eff8[_0x56f346(0x1bd)](_0x3ca5eb[_0x56f346(0x1e7)])){this[_0x56f346(0x3d2)]()[_0x56f346(0x346)]=Number(RegExp['$1'])*0.01;if(this[_0x56f346(0x285)]()['opacity']>=0xff)this[_0x56f346(0x285)]()[_0x56f346(0x271)]=0x80;}_0x31eff8[_0x56f346(0x1bd)](_0x3ca5eb[_0x56f346(0x26a)])&&(this[_0x56f346(0x3d2)]()[_0x56f346(0x1ab)]=Number(RegExp['$1'])*0.01);_0x31eff8[_0x56f346(0x1bd)](_0x3ca5eb[_0x56f346(0x2c5)])&&(this[_0x56f346(0x3d2)]()[_0x56f346(0x1bc)]=Number(RegExp['$1'])*0.01);_0x31eff8[_0x56f346(0x1bd)](_0x3ca5eb['ConicalBehaviorGlowSpeed'])&&(this[_0x56f346(0x3d2)]()[_0x56f346(0x188)]=Number(RegExp['$1'])*0.01);if(_0x31eff8['match'](_0x3ca5eb[_0x56f346(0x1cb)]))this[_0x56f346(0x3d2)]()[_0x56f346(0x437)]=!![];else _0x31eff8[_0x56f346(0x1bd)](_0x3ca5eb[_0x56f346(0x257)])&&(this[_0x56f346(0x3d2)]()['glowRng']=![]);_0x31eff8[_0x56f346(0x1bd)](_0x3ca5eb[_0x56f346(0x2b4)])&&(this[_0x56f346(0x3d2)]()[_0x56f346(0x1b9)]=Number(RegExp['$1'])*0.01);_0x31eff8[_0x56f346(0x1bd)](_0x3ca5eb[_0x56f346(0x3f7)])&&(this[_0x56f346(0x3d2)]()[_0x56f346(0x3f3)]=Number(RegExp['$1'])*0.01);if(_0x31eff8[_0x56f346(0x1bd)](_0x3ca5eb[_0x56f346(0x3d1)]))this[_0x56f346(0x3d2)]()[_0x56f346(0x42d)]=!![];else _0x31eff8['match'](_0x3ca5eb[_0x56f346(0x2a8)])&&(this[_0x56f346(0x3d2)]()['pulseRng']=![]);if(_0x31eff8['match'](_0x3ca5eb[_0x56f346(0x20a)]))this['conicalLightBehavior']()[_0x56f346(0x458)]=ColorManager[_0x56f346(0x314)](RegExp['$1']);else _0x31eff8[_0x56f346(0x1bd)](_0x3ca5eb['ConicalBehaviorPatternSequence'])&&(this['conicalLightBehavior']()['pattern']=String(RegExp['$1'])[_0x56f346(0x1ce)]()['trim']());_0x31eff8[_0x56f346(0x1bd)](_0x3ca5eb[_0x56f346(0x3ef)])&&(this[_0x56f346(0x3d2)]()[_0x56f346(0x29c)]=Number(RegExp['$1'])||0x1);},Game_Event[_0x1ecdb4(0x224)][_0x1ecdb4(0x3a3)]=function(_0x4669b6){const _0x425ae3=_0x1ecdb4,_0xbfa3e1=VisuMZ[_0x425ae3(0x3d5)]['RegExp'],_0x33d29c=_0x4669b6['match'](_0xbfa3e1[_0x425ae3(0x36b)]);if(_0x33d29c){this[_0x425ae3(0x285)]()[_0x425ae3(0x2ee)]=!![];for(const _0x2875b2 of _0x33d29c){_0x2875b2[_0x425ae3(0x1bd)](_0xbfa3e1[_0x425ae3(0x36b)]);const _0x3f5b0d=TextManager['parseDirectionText'](RegExp['$1']);if([0x0,0x5][_0x425ae3(0x2a0)](_0x3f5b0d))continue;const _0x296189=Number(RegExp['$2'])||0x0,_0xfbd8f8=String(RegExp['$3'])[_0x425ae3(0x25b)](',')[_0x425ae3(0x2f5)](_0x377e9e=>Number(_0x377e9e)||0x0),_0x1d6f88=Number(_0xfbd8f8[0x0])||0x0,_0x368b33=Number(_0xfbd8f8[0x1])||0x0,_0xd3aa25='dir%1'['format'](_0x3f5b0d),_0x2fe429='pattern%1X'['format'](_0x296189),_0x784529=_0x425ae3(0x266)[_0x425ae3(0x2d1)](_0x296189);this['conicalLightOffsets']()[_0xd3aa25][_0x2fe429]=_0x1d6f88,this[_0x425ae3(0x261)]()[_0xd3aa25][_0x784529]=_0x368b33;}}},VisuMZ[_0x1ecdb4(0x3d5)][_0x1ecdb4(0x1ae)]=Scene_Options['prototype'][_0x1ecdb4(0x41c)],Scene_Options[_0x1ecdb4(0x224)]['maxCommands']=function(){const _0x17aad3=_0x1ecdb4;let _0x119b68=VisuMZ[_0x17aad3(0x3d5)]['Scene_Options_maxCommands'][_0x17aad3(0x402)](this);const _0xce64ea=VisuMZ[_0x17aad3(0x3d5)][_0x17aad3(0x439)][_0x17aad3(0x1b8)];if(_0xce64ea[_0x17aad3(0x2ec)]&&_0xce64ea[_0x17aad3(0x416)])_0x119b68++;if(_0xce64ea['AdjustRect']&&_0xce64ea['AddPulsingLights'])_0x119b68++;return _0x119b68;},VisuMZ[_0x1ecdb4(0x3d5)][_0x1ecdb4(0x322)]=Sprite_Character['prototype']['initialize'],Sprite_Character['prototype'][_0x1ecdb4(0x297)]=function(_0x14150c){const _0x1f7c7b=_0x1ecdb4;VisuMZ[_0x1f7c7b(0x3d5)][_0x1f7c7b(0x322)][_0x1f7c7b(0x402)](this,_0x14150c),this[_0x1f7c7b(0x1c9)](_0x14150c),this[_0x1f7c7b(0x1f1)](_0x14150c);},Sprite_Character[_0x1ecdb4(0x224)][_0x1ecdb4(0x1c9)]=function(_0xb1faec){const _0x57e740=_0x1ecdb4;if(this[_0x57e740(0x394)]!==Sprite_Character)return;this[_0x57e740(0x3b8)]=new Sprite_RadialLight(_0xb1faec,this),SceneManager[_0x57e740(0x280)](this[_0x57e740(0x3b8)]);},Sprite_Character['prototype'][_0x1ecdb4(0x1f1)]=function(_0xd638c5){const _0x1d141c=_0x1ecdb4;if(this[_0x1d141c(0x394)]!==Sprite_Character)return;this[_0x1d141c(0x3ba)]=new Sprite_ConicalLight(_0xd638c5,this),SceneManager[_0x1d141c(0x280)](this[_0x1d141c(0x3ba)]);},VisuMZ[_0x1ecdb4(0x3d5)][_0x1ecdb4(0x19b)]=Sprite_Battler[_0x1ecdb4(0x224)]['setBattler'],Sprite_Battler[_0x1ecdb4(0x224)][_0x1ecdb4(0x30f)]=function(_0x1f4985){const _0x302387=_0x1ecdb4;VisuMZ[_0x302387(0x3d5)][_0x302387(0x19b)][_0x302387(0x402)](this,_0x1f4985),this[_0x302387(0x1c9)](_0x1f4985);},Sprite_Battler[_0x1ecdb4(0x224)][_0x1ecdb4(0x1c9)]=function(_0xd9196f){const _0xeffe80=_0x1ecdb4;if(this[_0xeffe80(0x3b8)]){this['_radialLight'][_0xeffe80(0x365)](_0xd9196f);return;}if(this[_0xeffe80(0x394)][_0xeffe80(0x20e)]===_0xeffe80(0x1c7))return;this[_0xeffe80(0x3b8)]=new Sprite_RadialLight(_0xd9196f,this),SceneManager[_0xeffe80(0x280)](this[_0xeffe80(0x3b8)]);};function Sprite_LightingEffects(){this['initialize'](...arguments);}Sprite_LightingEffects[_0x1ecdb4(0x224)]=Object[_0x1ecdb4(0x371)](Sprite['prototype']),Sprite_LightingEffects[_0x1ecdb4(0x224)][_0x1ecdb4(0x394)]=Sprite_LightingEffects,Sprite_LightingEffects[_0x1ecdb4(0x408)]=VisuMZ[_0x1ecdb4(0x3d5)][_0x1ecdb4(0x439)][_0x1ecdb4(0x2c9)][_0x1ecdb4(0x3bb)],Sprite_LightingEffects[_0x1ecdb4(0x224)][_0x1ecdb4(0x297)]=function(_0x466f89){const _0x2aec20=_0x1ecdb4;this[_0x2aec20(0x422)]=_0x466f89,Sprite[_0x2aec20(0x224)][_0x2aec20(0x297)][_0x2aec20(0x402)](this),this[_0x2aec20(0x444)]=PIXI[_0x2aec20(0x240)]['MULTIPLY'],this['x']=Math['round'](Graphics['width']/0x2),this['y']=Math[_0x2aec20(0x282)](Graphics[_0x2aec20(0x345)]/0x2),this['anchor']['x']=this[_0x2aec20(0x25e)]['y']=0.5,this[_0x2aec20(0x44b)](),this['createProxySprite'](),this[_0x2aec20(0x27e)](),this[_0x2aec20(0x3f0)](),this['createAntiLightMask'](),this[_0x2aec20(0x1f8)](),![]&&this[_0x2aec20(0x237)]();},Sprite_LightingEffects[_0x1ecdb4(0x224)][_0x1ecdb4(0x274)]=function(){const _0x4cf19d=_0x1ecdb4;Sprite[_0x4cf19d(0x224)]['destroy']['call'](this),this[_0x4cf19d(0x281)]();},Sprite_LightingEffects[_0x1ecdb4(0x224)]['destroyLightContainer']=function(){const _0x26a323=_0x1ecdb4;this['_hardAntiLightMask']&&this[_0x26a323(0x3d7)]['destroy'](),this['_softAntiLightMask']&&this['_softAntiLightMask'][_0x26a323(0x274)](),this[_0x26a323(0x2ae)]&&this[_0x26a323(0x2ae)][_0x26a323(0x274)]();},Sprite_LightingEffects['prototype'][_0x1ecdb4(0x44b)]=function(){const _0x2cab2d=_0x1ecdb4,_0xa0268c=Sprite_LightingEffects[_0x2cab2d(0x408)]*0x2,_0x4d4c52=Graphics['width']+_0xa0268c,_0x1bffe0=Graphics[_0x2cab2d(0x345)]+_0xa0268c;this[_0x2cab2d(0x35f)]=PIXI[_0x2cab2d(0x38b)][_0x2cab2d(0x371)](_0x4d4c52,_0x1bffe0);},Sprite_LightingEffects['prototype']['createProxySprite']=function(){const _0x3bae63=_0x1ecdb4;this[_0x3bae63(0x18e)]=new Sprite();},Sprite_LightingEffects[_0x1ecdb4(0x224)]['createColorSprite']=function(){const _0x2558a2=_0x1ecdb4;this['_colorSprite']=new Sprite(),this['_colorSprite'][_0x2558a2(0x2d7)]=new Bitmap(0x1,0x1),this[_0x2558a2(0x18e)][_0x2558a2(0x434)](this[_0x2558a2(0x3e6)]);const _0x3c13ee=Sprite_LightingEffects['SHAKE_BUFFER']*0x2;this[_0x2558a2(0x3e6)]['scale']['x']=Graphics['width']+_0x3c13ee,this[_0x2558a2(0x3e6)][_0x2558a2(0x407)]['y']=Graphics[_0x2558a2(0x345)]+_0x3c13ee,this[_0x2558a2(0x21b)]();},Sprite_LightingEffects[_0x1ecdb4(0x224)][_0x1ecdb4(0x3f0)]=function(){const _0x3f7551=_0x1ecdb4;this[_0x3f7551(0x2ae)]=new Sprite(),this[_0x3f7551(0x18e)][_0x3f7551(0x434)](this[_0x3f7551(0x2ae)]);const _0x220635=Sprite_LightingEffects['SHAKE_BUFFER'];this[_0x3f7551(0x2ae)]['x']=_0x220635,this[_0x3f7551(0x2ae)]['y']=_0x220635;},Sprite_LightingEffects[_0x1ecdb4(0x224)][_0x1ecdb4(0x2fb)]=function(){const _0x2f22d5=_0x1ecdb4;if(this[_0x2f22d5(0x2ae)]===undefined)this[_0x2f22d5(0x3f0)]();return this[_0x2f22d5(0x2ae)];},Sprite_LightingEffects[_0x1ecdb4(0x31a)]=!![],Sprite_LightingEffects[_0x1ecdb4(0x411)]=![],Sprite_LightingEffects[_0x1ecdb4(0x224)][_0x1ecdb4(0x372)]=function(){const _0x32b994=_0x1ecdb4;if(!Sprite_LightingEffects['ALLOW_ANTI_LIGHT_MASK'])return;if(SceneManager[_0x32b994(0x2a5)]())return;if($gameMap[_0x32b994(0x2af)]()||$gameMap[_0x32b994(0x370)]())return;if(!$gameMap[_0x32b994(0x22c)]())return;{const _0xe5a63d=new Sprite();_0xe5a63d[_0x32b994(0x2d7)]=this[_0x32b994(0x1e4)](![],$gameMap[_0x32b994(0x443)](),$gameMap['hardAntiLightTerrainTags']()),_0xe5a63d[_0x32b994(0x407)]['x']=$gameMap[_0x32b994(0x22d)](),_0xe5a63d[_0x32b994(0x407)]['y']=$gameMap[_0x32b994(0x284)](),this['_hardAntiLightMask']=_0xe5a63d,this['_lightContainer'][_0x32b994(0x434)](this[_0x32b994(0x3d7)]),this['_hardAlphaMask']=new PIXI[(_0x32b994(0x1c4))](this[_0x32b994(0x3d7)]),this[_0x32b994(0x350)]['blendMode']=PIXI[_0x32b994(0x240)][_0x32b994(0x3e9)];}{const _0x5a712b=new Sprite();_0x5a712b[_0x32b994(0x2d7)]=this[_0x32b994(0x1e4)](!![],$gameMap[_0x32b994(0x424)](),$gameMap[_0x32b994(0x3ff)]()),_0x5a712b[_0x32b994(0x407)]['x']=$gameMap[_0x32b994(0x22d)](),_0x5a712b[_0x32b994(0x407)]['y']=$gameMap[_0x32b994(0x284)](),this[_0x32b994(0x3f4)]=_0x5a712b,this[_0x32b994(0x2ae)][_0x32b994(0x434)](this[_0x32b994(0x3f4)]),this[_0x32b994(0x39b)]=new PIXI['SpriteMaskFilter'](this['_softAntiLightMask']),this[_0x32b994(0x39b)][_0x32b994(0x444)]=PIXI['BLEND_MODES']['ADD'];}this[_0x32b994(0x2ae)]['filters']=this[_0x32b994(0x2ae)][_0x32b994(0x376)]||[],this[_0x32b994(0x2ae)]['filters'][_0x32b994(0x2c3)](this[_0x32b994(0x350)]),this[_0x32b994(0x2ae)]['filters'][_0x32b994(0x2c3)](this[_0x32b994(0x39b)]);},Sprite_LightingEffects['prototype'][_0x1ecdb4(0x1e4)]=function(_0x53e3ba,_0x2a579b,_0x1efc93){const _0x3759e2=_0x1ecdb4,_0x4234bb=$gameMap['width'](),_0x346ae3=$gameMap[_0x3759e2(0x345)](),_0x559139=new Bitmap(_0x4234bb,_0x346ae3);_0x559139['smooth']=_0x53e3ba;for(let _0x5e4685=0x0;_0x5e4685<_0x4234bb;_0x5e4685++){for(let _0x1a876e=0x0;_0x1a876e<_0x346ae3;_0x1a876e++){const _0x420ac8=$gameMap[_0x3759e2(0x286)](_0x5e4685,_0x1a876e);if(_0x2a579b['includes'](_0x420ac8)){Imported[_0x3759e2(0x1c2)]&&SceneManager[_0x3759e2(0x2d2)]['_grafterRefreshRegions'][_0x3759e2(0x2c3)](_0x420ac8);continue;}const _0x3c0c39=$gameMap[_0x3759e2(0x22e)](_0x5e4685,_0x1a876e);if(_0x1efc93[_0x3759e2(0x2a0)](_0x3c0c39))continue;_0x559139[_0x3759e2(0x35e)](_0x5e4685,_0x1a876e,0x1,0x1,_0x3759e2(0x375));}}return _0x559139;},Sprite_LightingEffects[_0x1ecdb4(0x224)][_0x1ecdb4(0x1f8)]=function(){const _0x3bbff9=_0x1ecdb4;if(!$gameMap)return;if(!$dataMap)return;if($gameMap[_0x3bbff9(0x2af)]()||$gameMap['isLoopVertical']())return;if(!this['_lightContainer'])return;if(SceneManager[_0x3bbff9(0x2a5)]())return;const _0x358410=new Sprite();_0x358410[_0x3bbff9(0x2d7)]=this[_0x3bbff9(0x2b6)](),_0x358410['scale']['x']=$gameMap[_0x3bbff9(0x22d)](),_0x358410[_0x3bbff9(0x407)]['y']=$gameMap['tileHeight'](),this[_0x3bbff9(0x2e5)]=_0x358410,this['_autoLightSprite']['blendMode']=PIXI[_0x3bbff9(0x240)][_0x3bbff9(0x19c)],this[_0x3bbff9(0x2fb)]()[_0x3bbff9(0x434)](_0x358410);},Sprite_LightingEffects[_0x1ecdb4(0x224)][_0x1ecdb4(0x2b6)]=function(){const _0x5cff3b=_0x1ecdb4,_0x1d8695=$gameMap[_0x5cff3b(0x3ee)](),_0x1f7749=$gameMap[_0x5cff3b(0x345)](),_0x334814=new Bitmap(_0x1d8695,_0x1f7749);_0x334814['smooth']=!![];for(let _0x1e1798=0x0;_0x1e1798<_0x1d8695;_0x1e1798++){for(let _0x5cd1cf=0x0;_0x5cd1cf<_0x1f7749;_0x5cd1cf++){const _0x496ae0=$gameMap[_0x5cff3b(0x286)](_0x1e1798,_0x5cd1cf),_0x366d70=this[_0x5cff3b(0x1db)](_0x496ae0);if(_0x366d70>0x0){const _0x27695d=Math[_0x5cff3b(0x2e8)](0xff*_0x366d70/0x64);let _0x4ccfc0=ColorManager[_0x5cff3b(0x32f)]([_0x27695d,_0x27695d,_0x27695d]);_0x334814[_0x5cff3b(0x35e)](_0x1e1798,_0x5cd1cf,0x1,0x1,_0x4ccfc0),Imported[_0x5cff3b(0x1c2)]&&SceneManager['_scene'][_0x5cff3b(0x23f)][_0x5cff3b(0x2c3)](_0x496ae0);}}}return _0x334814;},Sprite_LightingEffects[_0x1ecdb4(0x224)][_0x1ecdb4(0x1db)]=function(_0x50b847){const _0x515f32=_0x1ecdb4,_0x1dcef8=VisuMZ[_0x515f32(0x3d5)][_0x515f32(0x439)][_0x515f32(0x338)];let _0x56c9a9=0x64;while(_0x56c9a9>0x0){const _0x569200=_0x1dcef8[_0x515f32(0x235)['format'](_0x56c9a9)]||[];if(_0x569200['includes'](_0x50b847))return _0x56c9a9;_0x56c9a9-=0x5;}return 0x0;},Sprite_LightingEffects[_0x1ecdb4(0x224)][_0x1ecdb4(0x237)]=function(){const _0x46cef3=_0x1ecdb4;{const _0x4f7f46=new Sprite();_0x4f7f46['bitmap']=new Bitmap(0x1f4,0x1f4),_0x4f7f46['bitmap'][_0x46cef3(0x231)](0xfa,'#ff0000'),this[_0x46cef3(0x2fb)]()[_0x46cef3(0x434)](_0x4f7f46),_0x4f7f46['anchor']['x']=_0x4f7f46[_0x46cef3(0x25e)]['y']=0.5,_0x4f7f46['x']=Graphics[_0x46cef3(0x3ee)]*0x1/0x2,_0x4f7f46['y']=Graphics[_0x46cef3(0x345)]*0x1/0x3,_0x4f7f46[_0x46cef3(0x444)]=PIXI[_0x46cef3(0x240)][_0x46cef3(0x3e9)],this[_0x46cef3(0x312)]=_0x4f7f46;}{const _0x41e81c=new Sprite();_0x41e81c['bitmap']=new Bitmap(0x1f4,0x1f4),_0x41e81c[_0x46cef3(0x2d7)][_0x46cef3(0x231)](0xfa,'#00ff00'),this[_0x46cef3(0x2fb)]()[_0x46cef3(0x434)](_0x41e81c),_0x41e81c[_0x46cef3(0x25e)]['x']=_0x41e81c[_0x46cef3(0x25e)]['y']=0.5,_0x41e81c['x']=Graphics[_0x46cef3(0x3ee)]*0x2/0x5,_0x41e81c['y']=Graphics[_0x46cef3(0x345)]*0x2/0x3,_0x41e81c[_0x46cef3(0x444)]=PIXI[_0x46cef3(0x240)][_0x46cef3(0x3e9)],this[_0x46cef3(0x389)]=_0x41e81c;}{const _0x41c8c=new Sprite();_0x41c8c[_0x46cef3(0x2d7)]=new Bitmap(0x1f4,0x1f4),_0x41c8c[_0x46cef3(0x2d7)][_0x46cef3(0x231)](0xfa,_0x46cef3(0x40c)),this[_0x46cef3(0x2fb)]()[_0x46cef3(0x434)](_0x41c8c),_0x41c8c[_0x46cef3(0x25e)]['x']=_0x41c8c['anchor']['y']=0.5,_0x41c8c['x']=Graphics['width']*0x3/0x5,_0x41c8c['y']=Graphics[_0x46cef3(0x345)]*0x2/0x3,_0x41c8c[_0x46cef3(0x444)]=PIXI[_0x46cef3(0x240)][_0x46cef3(0x3e9)],this[_0x46cef3(0x2e7)]=_0x41c8c;}this[_0x46cef3(0x198)]=!![];},Sprite_LightingEffects[_0x1ecdb4(0x224)][_0x1ecdb4(0x26c)]=function(){const _0x1c237a=_0x1ecdb4;Sprite[_0x1c237a(0x224)]['update'][_0x1c237a(0x402)](this),this[_0x1c237a(0x18d)](),this[_0x1c237a(0x2ae)]&&this[_0x1c237a(0x2ae)][_0x1c237a(0x26c)](),this[_0x1c237a(0x18b)](),this['_autoLightSprite']&&this[_0x1c237a(0x1de)](),this[_0x1c237a(0x198)]&&this[_0x1c237a(0x267)](),this[_0x1c237a(0x18e)]&&(this[_0x1c237a(0x21b)](),this['updateOverlayRender']());},Sprite_LightingEffects[_0x1ecdb4(0x224)][_0x1ecdb4(0x18d)]=function(){const _0x3b9e5a=_0x1ecdb4;this[_0x3b9e5a(0x271)]=$gameScreen[_0x3b9e5a(0x263)]();},Sprite_LightingEffects['prototype'][_0x1ecdb4(0x18b)]=function(){const _0x5ad0cb=_0x1ecdb4;if(this[_0x5ad0cb(0x3d7)]){const _0x2a669d=this[_0x5ad0cb(0x3d7)];_0x2a669d['x']=Math[_0x5ad0cb(0x421)](-$gameMap[_0x5ad0cb(0x361)]()*$gameMap[_0x5ad0cb(0x22d)]()),_0x2a669d['y']=Math[_0x5ad0cb(0x421)](-$gameMap[_0x5ad0cb(0x456)]()*$gameMap[_0x5ad0cb(0x284)]());}if(this['_softAntiLightMask']){const _0x583d50=this[_0x5ad0cb(0x3f4)];_0x583d50['x']=Math[_0x5ad0cb(0x421)](-$gameMap[_0x5ad0cb(0x361)]()*$gameMap[_0x5ad0cb(0x22d)]()),_0x583d50['y']=Math[_0x5ad0cb(0x421)](-$gameMap[_0x5ad0cb(0x456)]()*$gameMap[_0x5ad0cb(0x284)]());}},Sprite_LightingEffects[_0x1ecdb4(0x224)]['updateAutoLightAreas']=function(){const _0x2a94b8=_0x1ecdb4;this[_0x2a94b8(0x2e5)]['x']=Math[_0x2a94b8(0x421)](-$gameMap[_0x2a94b8(0x361)]()*$gameMap[_0x2a94b8(0x22d)]()),this['_autoLightSprite']['y']=Math['floor'](-$gameMap[_0x2a94b8(0x456)]()*$gameMap[_0x2a94b8(0x284)]());},Sprite_LightingEffects[_0x1ecdb4(0x224)][_0x1ecdb4(0x267)]=function(){const _0x386092=_0x1ecdb4;this[_0x386092(0x312)][_0x386092(0x407)]['x']=this[_0x386092(0x312)][_0x386092(0x407)]['y']=0.9+Math[_0x386092(0x43a)](Graphics[_0x386092(0x2c0)]*0.11)*0.1,this[_0x386092(0x389)]['scale']['x']=this['_testDummyG'][_0x386092(0x407)]['y']=0.9+Math[_0x386092(0x43a)](Graphics[_0x386092(0x2c0)]*0.12)*0.1,this['_testDummyB'][_0x386092(0x407)]['x']=this[_0x386092(0x2e7)][_0x386092(0x407)]['y']=0.9+Math[_0x386092(0x43a)](Graphics[_0x386092(0x2c0)]*0.13)*0.1;},Sprite_LightingEffects[_0x1ecdb4(0x224)][_0x1ecdb4(0x21b)]=function(){const _0x4ff8ab=_0x1ecdb4;if(this['_overlayColor']===$gameScreen['lightingOverlayColor']())return;this[_0x4ff8ab(0x327)]=$gameScreen[_0x4ff8ab(0x3e8)]();const _0x255ab9=this[_0x4ff8ab(0x3e6)][_0x4ff8ab(0x2d7)];_0x255ab9[_0x4ff8ab(0x35e)](0x0,0x0,0x1,0x1,this[_0x4ff8ab(0x327)]);},Sprite_LightingEffects[_0x1ecdb4(0x224)][_0x1ecdb4(0x2df)]=function(){const _0x49ba70=_0x1ecdb4,_0xc720b=Graphics[_0x49ba70(0x37b)][_0x49ba70(0x279)];_0xc720b&&_0xc720b[_0x49ba70(0x360)](this[_0x49ba70(0x18e)],this[_0x49ba70(0x35f)],![]);};function Sprite_LightBase(){const _0x307bb5=_0x1ecdb4;this[_0x307bb5(0x297)](...arguments);}Sprite_LightBase['prototype']=Object[_0x1ecdb4(0x371)](Sprite[_0x1ecdb4(0x224)]),Sprite_LightBase[_0x1ecdb4(0x224)]['constructor']=Sprite_LightBase,Sprite_LightBase[_0x1ecdb4(0x224)][_0x1ecdb4(0x297)]=function(_0x4d9656,_0x5447d4){const _0x1700d7=_0x1ecdb4;this[_0x1700d7(0x3ed)]=_0x4d9656,this[_0x1700d7(0x388)]=_0x5447d4,Sprite[_0x1700d7(0x224)][_0x1700d7(0x297)][_0x1700d7(0x402)](this),this[_0x1700d7(0x2dd)]();},Sprite_LightBase[_0x1ecdb4(0x224)][_0x1ecdb4(0x2dd)]=function(){const _0x70c5c6=_0x1ecdb4;this['anchor']['x']=0.5,this[_0x70c5c6(0x25e)]['y']=0.5,this[_0x70c5c6(0x407)]['x']=0x1,this[_0x70c5c6(0x407)]['y']=0x1,this[_0x70c5c6(0x2b9)]=Math[_0x70c5c6(0x1d9)](0xf4240),this[_0x70c5c6(0x328)]=Math['randomInt'](0xf4240),this[_0x70c5c6(0x1fd)]=0x0;},Sprite_LightBase[_0x1ecdb4(0x224)]['setSource']=function(_0x5e35e9){const _0x4fcc7c=_0x1ecdb4;if(this[_0x4fcc7c(0x3ed)]===_0x5e35e9)return;this[_0x4fcc7c(0x3ed)]=_0x5e35e9,this['update']();},Sprite_LightBase[_0x1ecdb4(0x224)]['lightData']=function(){const _0x1ef92d=_0x1ecdb4;return this[_0x1ef92d(0x3ed)]?this[_0x1ef92d(0x3ed)][_0x1ef92d(0x41e)]():{};},Sprite_LightBase[_0x1ecdb4(0x224)][_0x1ecdb4(0x356)]=function(){const _0x50dd33=_0x1ecdb4;return this[_0x50dd33(0x3ed)]?this['_source'][_0x50dd33(0x211)]():{};},Sprite_LightBase[_0x1ecdb4(0x224)][_0x1ecdb4(0x19a)]=function(){const _0x484cc0=_0x1ecdb4;if(this[_0x484cc0(0x3ed)]&&this[_0x484cc0(0x3ed)][_0x484cc0(0x394)]===Game_Vehicle){if(this[_0x484cc0(0x3ed)][_0x484cc0(0x3bd)]()==='')return![];}return this[_0x484cc0(0x308)]()[_0x484cc0(0x3a7)];},Sprite_LightBase[_0x1ecdb4(0x224)]['update']=function(){const _0x2cf1ed=_0x1ecdb4;Sprite[_0x2cf1ed(0x224)][_0x2cf1ed(0x26c)][_0x2cf1ed(0x402)](this),this[_0x2cf1ed(0x417)](),this['isEnabled']()&&this['_source']&&(this[_0x2cf1ed(0x399)](),this[_0x2cf1ed(0x39a)]()),this['updateVisibility']();},Sprite_LightBase[_0x1ecdb4(0x224)][_0x1ecdb4(0x399)]=function(){const _0x21bbd1=_0x1ecdb4;this[_0x21bbd1(0x1e1)](),this[_0x21bbd1(0x241)](),this[_0x21bbd1(0x18d)](),this[_0x21bbd1(0x43d)]();},Sprite_LightBase[_0x1ecdb4(0x224)][_0x1ecdb4(0x417)]=function(){const _0x301309=_0x1ecdb4;if(!this[_0x301309(0x23b)]())return;this[_0x301309(0x2c2)](),this[_0x301309(0x405)]();},Sprite_LightBase[_0x1ecdb4(0x224)][_0x1ecdb4(0x23b)]=function(){return![];},Sprite_LightBase[_0x1ecdb4(0x224)][_0x1ecdb4(0x2c2)]=function(){},Sprite_LightBase[_0x1ecdb4(0x224)]['createBitmap']=function(){const _0x387c5f=_0x1ecdb4,_0x4282eb=this[_0x387c5f(0x308)]();this['scale']['x']=0x1,this[_0x387c5f(0x407)]['y']=0x1,this[_0x387c5f(0x2b9)]=Math[_0x387c5f(0x1d9)](0xf4240),this[_0x387c5f(0x328)]=Math[_0x387c5f(0x1d9)](0xf4240),this[_0x387c5f(0x1fd)]=0x0;if(_0x4282eb[_0x387c5f(0x2ea)]!=='')this[_0x387c5f(0x2d7)]=ImageManager[_0x387c5f(0x252)](_0x4282eb['filename']);else this[_0x387c5f(0x19a)]()?this[_0x387c5f(0x2d7)]=this['generateLight'](_0x4282eb):this[_0x387c5f(0x2d7)]=new Bitmap(0x1,0x1);},Sprite_LightBase[_0x1ecdb4(0x224)][_0x1ecdb4(0x290)]=function(_0x27da55){return new Bitmap(0x1,0x1);},Sprite_LightBase['prototype']['updateAngle']=function(){const _0x35ba21=_0x1ecdb4;this[_0x35ba21(0x355)]=0x0;},Sprite_LightBase['prototype'][_0x1ecdb4(0x241)]=function(){const _0xa5eb93=_0x1ecdb4;this[_0xa5eb93(0x444)]=this[_0xa5eb93(0x308)]()[_0xa5eb93(0x444)]||0x0;},Sprite_LightBase[_0x1ecdb4(0x224)][_0x1ecdb4(0x18d)]=function(){const _0x504a66=_0x1ecdb4;this[_0x504a66(0x271)]=this[_0x504a66(0x308)]()['opacity']||0x0;},Sprite_LightBase[_0x1ecdb4(0x224)][_0x1ecdb4(0x43d)]=function(){const _0xf9f238=_0x1ecdb4,_0x14524e=this[_0xf9f238(0x388)],_0x348c6a=this[_0xf9f238(0x308)]();this['x']=_0x14524e['x'],this['x']+=_0x348c6a[_0xf9f238(0x269)],this['y']=_0x14524e['y']-Math[_0xf9f238(0x282)](_0x14524e['height']/0x2),this['y']+=_0x348c6a[_0xf9f238(0x245)],SceneManager[_0xf9f238(0x2a5)]()&&(this['x']+=(Graphics['width']-Graphics[_0xf9f238(0x3c7)])/0x2,this['y']+=(Graphics['height']-Graphics[_0xf9f238(0x341)])/0x2);},Sprite_LightBase[_0x1ecdb4(0x224)][_0x1ecdb4(0x39a)]=function(){const _0x4c31b0=_0x1ecdb4;this[_0x4c31b0(0x2bb)](),this[_0x4c31b0(0x239)](),this['updateFlash'](),this['updateFlare'](),this[_0x4c31b0(0x1f6)](),this[_0x4c31b0(0x1c8)](),this[_0x4c31b0(0x1b5)]();},Sprite_LightBase[_0x1ecdb4(0x224)]['updateBlink']=function(){const _0x509c6f=_0x1ecdb4;if(!ConfigManager[_0x509c6f(0x21f)])return;const _0x4fce09=this['behaviorData']();if(Math[_0x509c6f(0x2f8)]()<(_0x4fce09[_0x509c6f(0x26e)]||0x0)){const _0x213ad4=this['opacity']*(_0x4fce09['blinkModifier']||0x0);this[_0x509c6f(0x271)]=Math[_0x509c6f(0x282)](this[_0x509c6f(0x271)]+_0x213ad4)[_0x509c6f(0x386)](0x0,0xff);}},Sprite_LightBase['prototype']['updateFlicker']=function(){const _0x443495=_0x1ecdb4;if(!ConfigManager['blinkingLights'])return;const _0xe38c3f=this['behaviorData']();if(Math[_0x443495(0x2f8)]()<(_0xe38c3f[_0x443495(0x3dc)]||0x0)){const _0x1c72e4=this[_0x443495(0x271)]*(Math[_0x443495(0x2f8)]()*(_0xe38c3f[_0x443495(0x45a)]||0x0));this['opacity']=Math['round'](this[_0x443495(0x271)]+_0x1c72e4)[_0x443495(0x386)](0x0,0xff);}},Sprite_LightBase['prototype'][_0x1ecdb4(0x27c)]=function(){const _0x388924=_0x1ecdb4;if(!ConfigManager[_0x388924(0x21f)])return;const _0x49c25e=this[_0x388924(0x356)]();if(Math[_0x388924(0x2f8)]()<(_0x49c25e[_0x388924(0x3e3)]||0x0)){const _0x489e84=0xff*(_0x49c25e[_0x388924(0x26d)]||0x0);this[_0x388924(0x271)]=Math[_0x388924(0x282)](this[_0x388924(0x271)]+_0x489e84)[_0x388924(0x386)](0x0,0xff);}},Sprite_LightBase[_0x1ecdb4(0x224)][_0x1ecdb4(0x1b3)]=function(){const _0x5c8a69=_0x1ecdb4;if(!ConfigManager[_0x5c8a69(0x21f)])return;const _0xec669e=this[_0x5c8a69(0x356)]();if(Math[_0x5c8a69(0x2f8)]()<(_0xec669e[_0x5c8a69(0x346)]||0x0)){const _0x41be1f=0xff*(Math[_0x5c8a69(0x2f8)]()*(_0xec669e['flareModifier']||0x0));this[_0x5c8a69(0x271)]=Math['round'](this['opacity']+_0x41be1f)[_0x5c8a69(0x386)](0x0,0xff);}},Sprite_LightBase[_0x1ecdb4(0x224)][_0x1ecdb4(0x1f6)]=function(){const _0x246bbe=_0x1ecdb4;if(!ConfigManager[_0x246bbe(0x1ea)])return;const _0x8c1249=this['behaviorData']();if(_0x8c1249[_0x246bbe(0x1bc)]>0x0){const _0x3d26d1=_0x8c1249[_0x246bbe(0x1bc)]/0x2,_0x5ba3ee=0x1-_0x3d26d1,_0x139baa=_0x8c1249[_0x246bbe(0x188)],_0x4b8d18=_0x8c1249[_0x246bbe(0x437)]?this['_glowRng']:0x0,_0x23a1aa=Graphics['frameCount']+_0x4b8d18;this[_0x246bbe(0x271)]*=_0x5ba3ee+Math[_0x246bbe(0x43a)](_0x23a1aa*_0x139baa)*_0x3d26d1;}},Sprite_LightBase[_0x1ecdb4(0x224)]['updatePattern']=function(){const _0x4d0829=_0x1ecdb4;if(!ConfigManager['blinkingLights'])return;const _0x3aa9b2=this['behaviorData']();if(_0x3aa9b2['pattern']==='')return;if(_0x3aa9b2[_0x4d0829(0x458)]===undefined)return;const _0x19e02c=(_0x3aa9b2[_0x4d0829(0x458)]['charCodeAt'](this[_0x4d0829(0x1fd)])-0x61)[_0x4d0829(0x386)](0x0,0x19),_0x141963=_0x19e02c/0x19;this[_0x4d0829(0x271)]=Math[_0x4d0829(0x282)](0xff*_0x141963)[_0x4d0829(0x386)](0x0,0xff);if(Graphics[_0x4d0829(0x2c0)]%(_0x3aa9b2[_0x4d0829(0x29c)]||0x1)===0x0){this[_0x4d0829(0x1fd)]++;if(this[_0x4d0829(0x1fd)]>=_0x3aa9b2[_0x4d0829(0x458)]['length'])this[_0x4d0829(0x1fd)]=0x0;}},Sprite_LightBase['prototype'][_0x1ecdb4(0x1b5)]=function(){const _0x227f47=_0x1ecdb4;if(!ConfigManager[_0x227f47(0x1ea)])return;const _0x5419dc=this['behaviorData']();if(_0x5419dc['pulseRate']>0x0){const _0x5480b5=_0x5419dc['pulseRate']/0x2,_0x10d6f9=0x1-_0x5480b5,_0x9b7d39=_0x5419dc[_0x227f47(0x3f3)],_0x52e04d=_0x5419dc[_0x227f47(0x42d)]?this['_pulseRng']:0x0,_0x4f7d75=Graphics[_0x227f47(0x2c0)]+_0x52e04d,_0x4b741b=_0x10d6f9+Math[_0x227f47(0x43a)](_0x4f7d75*_0x9b7d39)*_0x5480b5;this['scale']['x']=this['scale']['y']=_0x4b741b;}else this[_0x227f47(0x407)]['x']=this[_0x227f47(0x407)]['y']=0x1;},Sprite_LightBase['prototype'][_0x1ecdb4(0x23e)]=function(){const _0x28c4cd=_0x1ecdb4;this['visible']=this[_0x28c4cd(0x448)]();},Sprite_LightBase[_0x1ecdb4(0x224)]['isLightVisible']=function(){const _0x10f507=_0x1ecdb4;if(!this['_source'])return![];if(this[_0x10f507(0x3ed)]['characterName']&&this['_source'][_0x10f507(0x3bd)]()!==''){if(this[_0x10f507(0x388)]&&!this[_0x10f507(0x388)][_0x10f507(0x1f0)])return![];}if(this[_0x10f507(0x3ed)][_0x10f507(0x394)]===Game_Follower){if(!this[_0x10f507(0x3ed)]['actor']())return![];if(!this['_source'][_0x10f507(0x223)]())return![];}if(this[_0x10f507(0x3ed)][_0x10f507(0x207)])return![];if(this[_0x10f507(0x3ed)]===$gamePlayer){if($gamePlayer['isInVehicle']())return![];}if(this[_0x10f507(0x3ed)][_0x10f507(0x461)]){if(this[_0x10f507(0x3ed)]['isHidden']())return![];if(this[_0x10f507(0x3ed)][_0x10f507(0x3b9)]())return![];}if(!this[_0x10f507(0x308)]())return![];return this[_0x10f507(0x19a)]();};function Sprite_RadialLight(){const _0x3ff9c1=_0x1ecdb4;this[_0x3ff9c1(0x297)](...arguments);}function _0x30f7(_0x1bd4ef,_0x32c41a){const _0x2a003f=_0x2a00();return _0x30f7=function(_0x30f7a3,_0x53e8e8){_0x30f7a3=_0x30f7a3-0x188;let _0xbdaab7=_0x2a003f[_0x30f7a3];return _0xbdaab7;},_0x30f7(_0x1bd4ef,_0x32c41a);}Sprite_RadialLight[_0x1ecdb4(0x224)]=Object[_0x1ecdb4(0x371)](Sprite_LightBase[_0x1ecdb4(0x224)]),Sprite_RadialLight['prototype'][_0x1ecdb4(0x394)]=Sprite_RadialLight,Sprite_RadialLight[_0x1ecdb4(0x224)]['initialize']=function(_0x323283,_0x4b71d9){const _0x21c6de=_0x1ecdb4;Sprite_LightBase[_0x21c6de(0x224)][_0x21c6de(0x297)][_0x21c6de(0x402)](this,_0x323283,_0x4b71d9);},Sprite_RadialLight['prototype'][_0x1ecdb4(0x308)]=function(){const _0x1f6a11=_0x1ecdb4;return this[_0x1f6a11(0x3ed)]?this[_0x1f6a11(0x3ed)][_0x1f6a11(0x41e)]():{};},Sprite_RadialLight['prototype'][_0x1ecdb4(0x356)]=function(){const _0x2ef05a=_0x1ecdb4;return this[_0x2ef05a(0x3ed)]?this[_0x2ef05a(0x3ed)][_0x2ef05a(0x211)]():{};},Sprite_RadialLight[_0x1ecdb4(0x224)][_0x1ecdb4(0x18f)]=function(_0x4a7a35){const _0x364ed7=_0x1ecdb4;let _0x352fb8=_0x4a7a35['radius'];if(_0x4a7a35[_0x364ed7(0x2ab)]){let _0xb2266b=this['_originSprite'];if(this[_0x364ed7(0x388)]['_mainSprite'])_0xb2266b=_0xb2266b;let _0x2f4693=Math[_0x364ed7(0x1b2)](_0xb2266b['width'],0x2)+Math[_0x364ed7(0x1b2)](_0xb2266b[_0x364ed7(0x345)],0x2);_0x2f4693=Math[_0x364ed7(0x1b2)](_0x2f4693,0.5),_0x2f4693/=0x2,_0x352fb8=Math['max'](_0x2f4693,_0x352fb8);}return _0x352fb8;},Sprite_RadialLight[_0x1ecdb4(0x224)][_0x1ecdb4(0x23b)]=function(){const _0x4e0860=_0x1ecdb4,_0x4cd336=this[_0x4e0860(0x308)]();if(this['_lastEnabled']!==_0x4cd336[_0x4e0860(0x3a7)])return!![];if(this['_lastFilename']!==_0x4cd336[_0x4e0860(0x2ea)])return!![];if(this[_0x4e0860(0x2f9)]!==this[_0x4e0860(0x18f)](_0x4cd336))return!![];if(this[_0x4e0860(0x3aa)]!==_0x4cd336[_0x4e0860(0x3ec)])return!![];if(this[_0x4e0860(0x268)]!==_0x4cd336[_0x4e0860(0x220)])return!![];return Sprite_LightBase[_0x4e0860(0x224)][_0x4e0860(0x23b)]['call'](this);},Sprite_RadialLight[_0x1ecdb4(0x224)]['cacheNewData']=function(){const _0x5bff33=_0x1ecdb4,_0x286515=this[_0x5bff33(0x308)]();this['_lastEnabled']=_0x286515[_0x5bff33(0x3a7)],this['_lastFilename']=_0x286515['filename'],this[_0x5bff33(0x2f9)]=this[_0x5bff33(0x18f)](_0x286515),this[_0x5bff33(0x3aa)]=_0x286515[_0x5bff33(0x3ec)],this[_0x5bff33(0x268)]=_0x286515[_0x5bff33(0x220)];},Sprite_RadialLight[_0x1ecdb4(0x224)][_0x1ecdb4(0x290)]=function(_0x5310e0){const _0x2fcdf6=_0x1ecdb4,_0x421cc7=this['getRadius'](_0x5310e0),_0x1a0fe7=ColorManager['presetColorParser'](_0x5310e0[_0x2fcdf6(0x3ec)]),_0x37e519=_0x5310e0[_0x2fcdf6(0x220)],_0x474539=Math[_0x2fcdf6(0x2e8)](_0x421cc7)*0x2,_0x4002ed=new Bitmap(_0x474539,_0x474539);return _0x4002ed[_0x2fcdf6(0x1ed)](_0x421cc7,_0x1a0fe7,_0x37e519),_0x4002ed;},Sprite_RadialLight[_0x1ecdb4(0x224)][_0x1ecdb4(0x1e1)]=function(){const _0x56d272=_0x1ecdb4;this[_0x56d272(0x355)]=-this[_0x56d272(0x308)]()[_0x56d272(0x355)]||0x0,this['lightData']()[_0x56d272(0x355)]-=this[_0x56d272(0x308)]()[_0x56d272(0x1d4)]||0x0;};function Sprite_ConicalLight(){const _0x2d12f3=_0x1ecdb4;this[_0x2d12f3(0x297)](...arguments);}Sprite_ConicalLight[_0x1ecdb4(0x224)]=Object[_0x1ecdb4(0x371)](Sprite_LightBase[_0x1ecdb4(0x224)]),Sprite_ConicalLight['prototype'][_0x1ecdb4(0x394)]=Sprite_ConicalLight,Sprite_ConicalLight[_0x1ecdb4(0x224)][_0x1ecdb4(0x297)]=function(_0x5150bf,_0x5eff52){const _0x311fdd=_0x1ecdb4;Sprite_LightBase[_0x311fdd(0x224)][_0x311fdd(0x297)][_0x311fdd(0x402)](this,_0x5150bf,_0x5eff52),this[_0x311fdd(0x40d)](),this[_0x311fdd(0x3ac)]=0x4;},Sprite_ConicalLight[_0x1ecdb4(0x224)][_0x1ecdb4(0x40d)]=function(){const _0x46c723=_0x1ecdb4;if(!Imported[_0x46c723(0x215)])return;return;this[_0x46c723(0x294)]=new Sprite(),this[_0x46c723(0x294)]['bitmap']=ImageManager['weatherEffectsLensFlare'](),this[_0x46c723(0x294)][_0x46c723(0x444)]=0x1,this[_0x46c723(0x294)][_0x46c723(0x407)]['x']=0.6,this[_0x46c723(0x294)][_0x46c723(0x407)]['y']=0.6,this[_0x46c723(0x294)][_0x46c723(0x25e)]['x']=0.5,this['_lensFlareSprite']['anchor']['y']=0.5,this['_lensFlareSprite']['visible']=![],this[_0x46c723(0x434)](this[_0x46c723(0x294)]);},Sprite_ConicalLight['prototype'][_0x1ecdb4(0x308)]=function(){const _0x2750a5=_0x1ecdb4;return this[_0x2750a5(0x3ed)]?this['_source'][_0x2750a5(0x285)]():{};},Sprite_ConicalLight[_0x1ecdb4(0x224)][_0x1ecdb4(0x356)]=function(){const _0x632902=_0x1ecdb4;return this[_0x632902(0x3ed)]?this[_0x632902(0x3ed)][_0x632902(0x3d2)]():{};},Sprite_ConicalLight['prototype'][_0x1ecdb4(0x36f)]=function(){const _0x64c431=_0x1ecdb4;return this[_0x64c431(0x3ed)]?this[_0x64c431(0x3ed)][_0x64c431(0x261)]():{};},Sprite_ConicalLight[_0x1ecdb4(0x224)][_0x1ecdb4(0x23b)]=function(){const _0x1dcae4=_0x1ecdb4,_0x8cf165=this['lightData']();if(this[_0x1dcae4(0x1cf)]!==_0x8cf165[_0x1dcae4(0x3a7)])return!![];if(this[_0x1dcae4(0x3b6)]!==_0x8cf165[_0x1dcae4(0x2ea)])return!![];if(this[_0x1dcae4(0x2f9)]!==_0x8cf165['radius'])return!![];if(this['_lastColor']!==_0x8cf165[_0x1dcae4(0x3ec)])return!![];if(this['_lastIntensity']!==_0x8cf165[_0x1dcae4(0x220)])return!![];if(this[_0x1dcae4(0x1f4)]!==_0x8cf165[_0x1dcae4(0x355)])return!![];if(this[_0x1dcae4(0x2a4)]!==_0x8cf165[_0x1dcae4(0x3cd)])return!![];return Sprite_LightBase[_0x1dcae4(0x224)][_0x1dcae4(0x23b)][_0x1dcae4(0x402)](this);},Sprite_ConicalLight[_0x1ecdb4(0x224)][_0x1ecdb4(0x2c2)]=function(){const _0x5db07b=_0x1ecdb4,_0x3fe328=this[_0x5db07b(0x308)]();this['_lastEnabled']=_0x3fe328['enabled'],this[_0x5db07b(0x3b6)]=_0x3fe328[_0x5db07b(0x2ea)],this[_0x5db07b(0x2f9)]=_0x3fe328[_0x5db07b(0x1c3)],this[_0x5db07b(0x3aa)]=_0x3fe328[_0x5db07b(0x3ec)],this[_0x5db07b(0x268)]=_0x3fe328[_0x5db07b(0x220)],this[_0x5db07b(0x1f4)]=_0x3fe328[_0x5db07b(0x355)],this[_0x5db07b(0x2a4)]=_0x3fe328[_0x5db07b(0x3cd)];},Sprite_ConicalLight[_0x1ecdb4(0x224)][_0x1ecdb4(0x405)]=function(){const _0x45017d=_0x1ecdb4;Sprite_LightBase[_0x45017d(0x224)][_0x45017d(0x405)][_0x45017d(0x402)](this),this['_lastTouchInputX']=TouchInput['x'],this[_0x45017d(0x218)]=TouchInput['y'],this[_0x45017d(0x1d0)]=![],this[_0x45017d(0x262)]=!![],this[_0x45017d(0x3ac)]=0x4,this[_0x45017d(0x2e6)]=Math[_0x45017d(0x1d9)](0xf4240);const _0x15930f=this[_0x45017d(0x308)]();_0x15930f[_0x45017d(0x2ea)]!==''?(this[_0x45017d(0x25e)]['x']=_0x15930f[_0x45017d(0x42e)],this[_0x45017d(0x25e)]['y']=_0x15930f[_0x45017d(0x395)]):(this[_0x45017d(0x25e)]['x']=0.5,this[_0x45017d(0x25e)]['y']=0.5);},Sprite_ConicalLight[_0x1ecdb4(0x224)][_0x1ecdb4(0x290)]=function(_0x108d74){const _0x392613=_0x1ecdb4,_0xd9f210=_0x108d74[_0x392613(0x1c3)],_0x2daead=ColorManager[_0x392613(0x39e)](_0x108d74[_0x392613(0x3ec)]),_0x319aab=_0x108d74[_0x392613(0x220)],_0x25a939=_0x108d74[_0x392613(0x355)],_0x3d4234=_0xd9f210*0x2,_0x52ea01=0x1,_0x1f5013=0x0,_0x4e336f=new Bitmap(_0x3d4234,_0x3d4234);_0x4e336f[_0x392613(0x2cb)](_0xd9f210,_0x25a939,_0x2daead,_0x319aab,_0x52ea01,_0x1f5013);const _0x420bdd=_0x108d74[_0x392613(0x3cd)],_0x52e0b4=_0x420bdd*0x2,_0x30042a=new Bitmap(_0x52e0b4,_0x52e0b4);_0x30042a[_0x392613(0x1ed)](_0x420bdd,_0x2daead,_0x319aab);const _0x44191e=Math[_0x392613(0x421)](_0x3d4234/0x2)-_0x420bdd;return _0x4e336f[_0x392613(0x260)](_0x30042a,0x0,0x0,_0x52e0b4,_0x52e0b4,_0x44191e,_0x44191e,_0x52e0b4,_0x52e0b4),_0x4e336f;},Sprite_ConicalLight['prototype'][_0x1ecdb4(0x3d0)]=function(){const _0x2ed733=_0x1ecdb4;if(this[_0x2ed733(0x3ed)][_0x2ed733(0x1b7)]&&this[_0x2ed733(0x3ed)]['isPosing']())return 0x2;const _0x58997d=this[_0x2ed733(0x308)]();return _0x58997d['forceDirection']?_0x58997d[_0x2ed733(0x197)]:this['_source'][_0x2ed733(0x428)];},Sprite_ConicalLight['prototype'][_0x1ecdb4(0x1e1)]=function(){const _0x59c314=_0x1ecdb4;this[_0x59c314(0x3c8)]();if(this[_0x59c314(0x262)])this[_0x59c314(0x3bf)]();else this['_lastInputTouch']?this[_0x59c314(0x3a1)]():this[_0x59c314(0x355)]=0x0;this[_0x59c314(0x29d)]();},Sprite_ConicalLight[_0x1ecdb4(0x224)][_0x1ecdb4(0x3c8)]=function(){const _0x5550bb=_0x1ecdb4;if(this[_0x5550bb(0x1a4)]()){if($gameTemp[_0x5550bb(0x3b7)]()||['up',_0x5550bb(0x436),'left',_0x5550bb(0x20c)][_0x5550bb(0x3c9)](_0x42e7a2=>Input[_0x5550bb(0x20b)](_0x42e7a2)))this[_0x5550bb(0x1d0)]=![],this[_0x5550bb(0x262)]=!![],this[_0x5550bb(0x3ac)]=0x4;else{if(this[_0x5550bb(0x308)]()[_0x5550bb(0x1f3)]&&(this[_0x5550bb(0x406)]!==TouchInput['x']||this[_0x5550bb(0x218)]!==TouchInput['y'])){if(this['_lastInputTimer']--)return;this[_0x5550bb(0x1d0)]=!![],this[_0x5550bb(0x262)]=![];}}}else this[_0x5550bb(0x3ed)]!==$gamePlayer&&this[_0x5550bb(0x3ed)]!==$gamePlayer[_0x5550bb(0x2d9)]()&&(this[_0x5550bb(0x1d0)]=this[_0x5550bb(0x308)]()[_0x5550bb(0x1f3)],this[_0x5550bb(0x262)]=!this[_0x5550bb(0x308)]()[_0x5550bb(0x1f3)]);},Sprite_ConicalLight[_0x1ecdb4(0x224)][_0x1ecdb4(0x1a4)]=function(){const _0x17761f=_0x1ecdb4;if($gameScreen[_0x17761f(0x3e8)]()==='#ffffff')return![];if($gameScreen['lightingOverlayOpacity']()<=0x0)return![];return this[_0x17761f(0x3ed)]===$gamePlayer||this['_source']===$gamePlayer[_0x17761f(0x2d9)]();},Sprite_ConicalLight[_0x1ecdb4(0x224)][_0x1ecdb4(0x3a1)]=function(){const _0x147d26=_0x1ecdb4;if(this[_0x147d26(0x3ed)]===$gamePlayer||this['_source']===$gamePlayer[_0x147d26(0x2d9)]()){if($gameMap[_0x147d26(0x313)]()||$gameMessage[_0x147d26(0x368)]())return;}this[_0x147d26(0x406)]=TouchInput['x'],this[_0x147d26(0x218)]=TouchInput['y'];const _0x43df64=new Point(TouchInput['x'],TouchInput['y']),_0x27cd2d=this['_originSprite'][_0x147d26(0x204)][_0x147d26(0x3b5)](_0x43df64),_0x8ce993=this[_0x147d26(0x308)]();let _0x151d22=Math[_0x147d26(0x35a)](_0x27cd2d['y'],_0x27cd2d['x'])*0xb4/Math['PI'];_0x8ce993['filename']===''?_0x151d22-=_0x8ce993['angle']/0x2:_0x151d22-=_0x8ce993[_0x147d26(0x3f2)];this[_0x147d26(0x355)]=_0x151d22;if(!this[_0x147d26(0x3ed)][_0x147d26(0x305)]()){if(this['_source']===$gamePlayer&&$gamePlayer['isInVehicle']())return;if($gameScreen['lightingOverlayColor']()===_0x147d26(0x375))return;if($gameScreen[_0x147d26(0x263)]()<=0x0)return;let _0x235208=this[_0x147d26(0x3ed)];if(this[_0x147d26(0x3ed)]===$gamePlayer[_0x147d26(0x2d9)]())_0x235208=$gamePlayer;const _0xaa598c=$gameMap[_0x147d26(0x35c)](TouchInput['x']),_0x4715e4=$gameMap['canvasToMapY'](TouchInput['y']);_0x235208['turnTowardPoint'](_0xaa598c,_0x4715e4);}},Sprite_ConicalLight[_0x1ecdb4(0x224)]['updateCharacterAngle']=function(){const _0x25b342=_0x1ecdb4,_0x181aa1=this[_0x25b342(0x308)]();let _0x442620=0x0;_0x181aa1[_0x25b342(0x2ea)]===''?_0x442620-=_0x181aa1['angle']/0x2:_0x442620-=_0x181aa1[_0x25b342(0x3f2)]||0x0;const _0x188a11=this[_0x25b342(0x3d0)]();_0x442620+=[0x0,0x87,0x5a,0x2d,0xb4,0x0,0x0,0xe1,0x10e,0x13b][_0x188a11];if(_0x181aa1[_0x25b342(0x287)]){const _0x196d29=_0x181aa1[_0x25b342(0x309)]?this[_0x25b342(0x2e6)]:0x0,_0x5c4967=Graphics[_0x25b342(0x2c0)]+_0x196d29,_0xf91a39=_0x181aa1[_0x25b342(0x25c)];_0x442620+=Math[_0x25b342(0x43a)](_0x5c4967*_0xf91a39)*_0x181aa1[_0x25b342(0x287)];}this[_0x25b342(0x355)]=_0x442620;},Sprite_ConicalLight[_0x1ecdb4(0x224)]['updateLensFlareSprite']=function(){const _0x264db0=_0x1ecdb4;if(!this[_0x264db0(0x294)])return;const _0x319424=this[_0x264db0(0x3d0)]();this['_lensFlareSprite'][_0x264db0(0x1f0)]=_0x319424===0x2,this[_0x264db0(0x294)][_0x264db0(0x355)]=this[_0x264db0(0x355)]/0x2;},Sprite_ConicalLight['prototype']['updatePosition']=function(){const _0x46b3ac=_0x1ecdb4,_0x51bdf3=this[_0x46b3ac(0x308)]();_0x51bdf3[_0x46b3ac(0x2ee)]?this['updateHandPosition']():Sprite_LightBase[_0x46b3ac(0x224)]['updatePosition'][_0x46b3ac(0x402)](this);},Sprite_ConicalLight[_0x1ecdb4(0x224)]['updateHandPosition']=function(){const _0x5c0c43=_0x1ecdb4,_0x19db43=this[_0x5c0c43(0x36f)](),_0x4af0a4=this['_originSprite'];let _0x58ca4f=(Number(this[_0x5c0c43(0x3d0)]())||0x2)[_0x5c0c43(0x386)](0x0,0x9);if(_0x58ca4f===0x0||_0x58ca4f===0x5)_0x58ca4f=0x2;const _0x5daf3e=_0x5c0c43(0x3cc)[_0x5c0c43(0x2d1)](_0x58ca4f),_0x514bfc=_0x5c0c43(0x219)['format'](this['_source'][_0x5c0c43(0x458)]()||0x0),_0x2d6bff=_0x5c0c43(0x266)[_0x5c0c43(0x2d1)](this[_0x5c0c43(0x3ed)][_0x5c0c43(0x458)]()||0x0),_0x19f9d3=(_0x19db43[_0x5daf3e]||{})[_0x514bfc]||0x0,_0x29cd65=(_0x19db43[_0x5daf3e]||{})[_0x2d6bff]||0x0;this['x']=_0x4af0a4['x'],this['x']+=_0x19f9d3,this['y']=_0x4af0a4['y']-Math[_0x5c0c43(0x282)](_0x4af0a4[_0x5c0c43(0x345)]/0x2),this['y']+=_0x29cd65;},Sprite_ConicalLight[_0x1ecdb4(0x224)][_0x1ecdb4(0x448)]=function(){const _0x59ff52=_0x1ecdb4;if(!Sprite_LightBase[_0x59ff52(0x224)][_0x59ff52(0x448)]['call'](this))return![];if(!this['lightData']())return![];return this[_0x59ff52(0x19a)]();};function Sprite_LightSpawn(){this['initialize'](...arguments);}Sprite_LightSpawn[_0x1ecdb4(0x224)]=Object[_0x1ecdb4(0x371)](Sprite_RadialLight['prototype']),Sprite_LightSpawn[_0x1ecdb4(0x224)][_0x1ecdb4(0x394)]=Sprite_LightSpawn,Sprite_LightSpawn[_0x1ecdb4(0x224)][_0x1ecdb4(0x297)]=function(_0xb32621){const _0x4a6a93=_0x1ecdb4;Sprite_RadialLight[_0x4a6a93(0x224)]['initialize'][_0x4a6a93(0x402)](this,_0xb32621,null);},Sprite_LightSpawn[_0x1ecdb4(0x224)]['lightData']=function(){const _0x438031=_0x1ecdb4;return this[_0x438031(0x3ed)]?this[_0x438031(0x3ed)]['settings']:{};},Sprite_LightSpawn['prototype']['behaviorData']=function(){const _0x59db73=_0x1ecdb4;return this[_0x59db73(0x3ed)]?this[_0x59db73(0x3ed)][_0x59db73(0x31b)]:{};},Sprite_LightSpawn['prototype'][_0x1ecdb4(0x448)]=function(){const _0x522e8d=_0x1ecdb4;if(this[_0x522e8d(0x3ed)]&&!this[_0x522e8d(0x3ed)][_0x522e8d(0x432)])return![];return Sprite_LightBase[_0x522e8d(0x224)]['isLightVisible'][_0x522e8d(0x402)](this);},Sprite_LightSpawn[_0x1ecdb4(0x224)]['isUsingScreenCoordinates']=function(){const _0x1ee486=_0x1ecdb4;return this[_0x1ee486(0x3ed)]?this['_source'][_0x1ee486(0x3c4)]===_0x1ee486(0x2ac):![];},Sprite_LightSpawn[_0x1ecdb4(0x224)]['isUsingMapCoordinates']=function(){const _0x42ffbd=_0x1ecdb4;return this[_0x42ffbd(0x3ed)]?this['_source'][_0x42ffbd(0x3c4)]===_0x42ffbd(0x2f5):![];},Sprite_LightSpawn[_0x1ecdb4(0x224)][_0x1ecdb4(0x39f)]=function(){const _0x409042=_0x1ecdb4;return this[_0x409042(0x3ed)]?this['_source'][_0x409042(0x3c4)]==='player':![];},Sprite_LightSpawn['prototype'][_0x1ecdb4(0x1df)]=function(){const _0x927bc7=_0x1ecdb4;return this['_source']?this[_0x927bc7(0x3ed)][_0x927bc7(0x3c4)]===_0x927bc7(0x3f5):![];},Sprite_LightSpawn[_0x1ecdb4(0x224)][_0x1ecdb4(0x1e5)]=function(){const _0x2e3115=_0x1ecdb4;return this[_0x2e3115(0x3ed)]?this[_0x2e3115(0x3ed)]['type']===_0x2e3115(0x25a):![];},Sprite_LightSpawn[_0x1ecdb4(0x224)]['updatePosition']=function(){const _0x1b7df9=_0x1ecdb4,_0x20c5dd=this[_0x1b7df9(0x3ed)],_0xe52fc0=this['lightData']();this['x']=_0x20c5dd['x'],this['x']+=_0xe52fc0[_0x1b7df9(0x269)],this['y']=_0x20c5dd['y'],this['y']+=_0xe52fc0[_0x1b7df9(0x245)],this[_0x1b7df9(0x3ce)](),this['x']=Math['round'](this['x']),this['y']=Math['round'](this['y']);},Sprite_LightSpawn[_0x1ecdb4(0x224)][_0x1ecdb4(0x3ce)]=function(){const _0x3a726a=_0x1ecdb4,_0x15a4b7=this['_source'];if(this[_0x3a726a(0x326)]())this['x']+=_0x15a4b7[_0x3a726a(0x190)],this['y']+=_0x15a4b7[_0x3a726a(0x221)];else{if(this[_0x3a726a(0x3b2)]()){let _0xfd368b=_0x15a4b7[_0x3a726a(0x190)]+0.5,_0x5363f9=_0x15a4b7[_0x3a726a(0x221)]+0.5;this['adjustPositionByMap'](_0xfd368b,_0x5363f9);}else{if(this[_0x3a726a(0x39f)]()){const _0x183453=$gamePlayer;this[_0x3a726a(0x2b0)](_0x183453);}else{if(this[_0x3a726a(0x1df)]()){const _0x6cf627=$gamePlayer[_0x3a726a(0x2c8)]()[_0x3a726a(0x3f5)](_0x15a4b7[_0x3a726a(0x382)]||0x0);this[_0x3a726a(0x2b0)](_0x6cf627);}else{if(this[_0x3a726a(0x1e5)]()){const _0x5542dd=$gameMap[_0x3a726a(0x25a)](_0x15a4b7[_0x3a726a(0x2a7)]);this[_0x3a726a(0x2b0)](_0x5542dd);}}}}}},Sprite_LightSpawn['prototype'][_0x1ecdb4(0x29e)]=function(_0x502347,_0x190a19,_0x4542ff,_0x14c8a4){const _0x4818a8=_0x1ecdb4;this['x']+=Math[_0x4818a8(0x421)](-$gameMap[_0x4818a8(0x361)]()*$gameMap[_0x4818a8(0x22d)]()),this['y']+=Math[_0x4818a8(0x421)](-$gameMap[_0x4818a8(0x456)]()*$gameMap['tileHeight']()),this['x']+=Math[_0x4818a8(0x421)](_0x502347*$gameMap[_0x4818a8(0x22d)]()),this['y']+=Math[_0x4818a8(0x421)](_0x190a19*$gameMap[_0x4818a8(0x284)]()),this['x']+=_0x4542ff||0x0,this['y']+=_0x14c8a4||0x0;},Sprite_LightSpawn[_0x1ecdb4(0x224)][_0x1ecdb4(0x2b0)]=function(_0xf53bc4){const _0x8bcf05=_0x1ecdb4;if(!_0xf53bc4)return;let _0x17f310=_0xf53bc4[_0x8bcf05(0x32c)]+0.5,_0x245816=_0xf53bc4['_realY']+0x1,_0x343e45=0x0,_0x5d0b23=0x0;const _0x4b110a=SceneManager[_0x8bcf05(0x2d2)]['_spriteset'];if(_0x4b110a){const _0x25909a=_0x4b110a[_0x8bcf05(0x397)](_0xf53bc4);_0x25909a&&(_0x5d0b23=-(_0x25909a['height']/0x2));}this[_0x8bcf05(0x29e)](_0x17f310,_0x245816,_0x343e45,_0x5d0b23);},VisuMZ[_0x1ecdb4(0x3d5)]['Spriteset_Base_createLowerLayer']=Spriteset_Base['prototype'][_0x1ecdb4(0x195)],Spriteset_Base[_0x1ecdb4(0x224)][_0x1ecdb4(0x195)]=function(){const _0x19a6c9=_0x1ecdb4;this[_0x19a6c9(0x1fc)](),VisuMZ[_0x19a6c9(0x3d5)][_0x19a6c9(0x1a8)]['call'](this);},VisuMZ[_0x1ecdb4(0x3d5)][_0x1ecdb4(0x387)]=Spriteset_Base[_0x1ecdb4(0x224)]['createUpperLayer'],Spriteset_Base['prototype'][_0x1ecdb4(0x3a8)]=function(){const _0x2be8cb=_0x1ecdb4;this[_0x2be8cb(0x2fb)]()&&this[_0x2be8cb(0x41f)](),VisuMZ[_0x2be8cb(0x3d5)][_0x2be8cb(0x387)][_0x2be8cb(0x402)](this);},Spriteset_Base[_0x1ecdb4(0x224)][_0x1ecdb4(0x22a)]=function(){const _0x3b8a68=_0x1ecdb4;if(!this[_0x3b8a68(0x3c2)]())return;this[_0x3b8a68(0x33c)]&&this['_baseSprite']['addChild'](this[_0x3b8a68(0x33c)]);},Spriteset_Base[_0x1ecdb4(0x224)][_0x1ecdb4(0x1fc)]=function(){const _0x6570be=_0x1ecdb4;if(!this[_0x6570be(0x3c2)]())return;this[_0x6570be(0x33c)]=new Sprite_LightingEffects(this),this[_0x6570be(0x2ae)]=this[_0x6570be(0x33c)][_0x6570be(0x2fb)](),SceneManager['_scene'][_0x6570be(0x2ae)]=this['_lightingEffects'][_0x6570be(0x2fb)]();},Spriteset_Base[_0x1ecdb4(0x224)][_0x1ecdb4(0x2fb)]=function(){const _0x282ec7=_0x1ecdb4;return this[_0x282ec7(0x2ae)];},Spriteset_Base['prototype']['isLightingEnabled']=function(){return![];},Spriteset_Base[_0x1ecdb4(0x224)][_0x1ecdb4(0x41f)]=function(){},Spriteset_Map['prototype']['isLightingEnabled']=function(){const _0x3488a8=_0x1ecdb4;return VisuMZ[_0x3488a8(0x3d5)][_0x3488a8(0x439)][_0x3488a8(0x2c9)][_0x3488a8(0x3f9)];},VisuMZ[_0x1ecdb4(0x3d5)][_0x1ecdb4(0x379)]=Spriteset_Map[_0x1ecdb4(0x224)][_0x1ecdb4(0x191)],Spriteset_Map[_0x1ecdb4(0x224)][_0x1ecdb4(0x191)]=function(){const _0x1b0c34=_0x1ecdb4;VisuMZ[_0x1b0c34(0x3d5)]['Spriteset_Map_createDestination'][_0x1b0c34(0x402)](this),this['addLightingEffects']();},VisuMZ[_0x1ecdb4(0x3d5)][_0x1ecdb4(0x2bd)]=Spriteset_Map['prototype']['hideCharacters'],Spriteset_Map[_0x1ecdb4(0x224)]['hideCharacters']=function(){const _0x3211bd=_0x1ecdb4;VisuMZ[_0x3211bd(0x3d5)][_0x3211bd(0x2bd)][_0x3211bd(0x402)](this),this[_0x3211bd(0x33c)]&&this[_0x3211bd(0x33c)]['update']();},Spriteset_Map[_0x1ecdb4(0x224)][_0x1ecdb4(0x41f)]=function(){const _0x1cb65d=_0x1ecdb4,_0x21b073=$gameMap[_0x1cb65d(0x352)]();for(const _0x17711c of _0x21b073){const _0x4655a3=new Sprite_LightSpawn(_0x17711c);SceneManager[_0x1cb65d(0x280)](_0x4655a3);}},Spriteset_Battle[_0x1ecdb4(0x224)][_0x1ecdb4(0x3c2)]=function(){const _0x323687=_0x1ecdb4;if(!Imported[_0x323687(0x205)])return![];return VisuMZ[_0x323687(0x3d5)][_0x323687(0x439)][_0x323687(0x27f)][_0x323687(0x3f9)];},VisuMZ['LightingEffects']['Spriteset_Battle_createBattleField']=Spriteset_Battle[_0x1ecdb4(0x224)]['createBattleField'],Spriteset_Battle[_0x1ecdb4(0x224)][_0x1ecdb4(0x24a)]=function(){const _0x107cc5=_0x1ecdb4;VisuMZ[_0x107cc5(0x3d5)][_0x107cc5(0x254)][_0x107cc5(0x402)](this),this[_0x107cc5(0x22a)]();},Spriteset_Battle[_0x1ecdb4(0x224)][_0x1ecdb4(0x22a)]=function(){const _0x27ae76=_0x1ecdb4;if(!this[_0x27ae76(0x3c2)]())return;this[_0x27ae76(0x33c)]&&(this['_battleField'][_0x27ae76(0x434)](this['_lightingEffects']),this[_0x27ae76(0x33c)]['x']=this[_0x27ae76(0x1fe)][_0x27ae76(0x3ee)]/0x2,this[_0x27ae76(0x33c)]['y']=this[_0x27ae76(0x1fe)][_0x27ae76(0x345)]/0x2);},VisuMZ[_0x1ecdb4(0x3d5)][_0x1ecdb4(0x27d)]=Window_Options[_0x1ecdb4(0x224)][_0x1ecdb4(0x38c)],Window_Options[_0x1ecdb4(0x224)][_0x1ecdb4(0x38c)]=function(){const _0x17a04c=_0x1ecdb4;VisuMZ['LightingEffects']['Window_Options_addGeneralOptions'][_0x17a04c(0x402)](this),this[_0x17a04c(0x34e)]();},Window_Options['prototype'][_0x1ecdb4(0x34e)]=function(){const _0xbda2e6=_0x1ecdb4;VisuMZ[_0xbda2e6(0x3d5)][_0xbda2e6(0x439)][_0xbda2e6(0x1b8)][_0xbda2e6(0x416)]&&this[_0xbda2e6(0x21d)](),VisuMZ[_0xbda2e6(0x3d5)]['Settings'][_0xbda2e6(0x1b8)][_0xbda2e6(0x44d)]&&this[_0xbda2e6(0x2aa)]();},Window_Options[_0x1ecdb4(0x224)][_0x1ecdb4(0x21d)]=function(){const _0x1aed1a=_0x1ecdb4,_0x4700b6=TextManager[_0x1aed1a(0x278)][_0x1aed1a(0x1c5)],_0x1a5af8='blinkingLights';this[_0x1aed1a(0x2b3)](_0x4700b6,_0x1a5af8);},Window_Options[_0x1ecdb4(0x224)][_0x1ecdb4(0x2aa)]=function(){const _0x276409=_0x1ecdb4,_0x533d92=TextManager[_0x276409(0x278)][_0x276409(0x1e3)],_0x291c99='pulsingLights';this[_0x276409(0x2b3)](_0x533d92,_0x291c99);};