//=============================================================================
// VisuStella MZ - Visual Parallaxes
// VisuMZ_4_VisualParallaxes.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_VisualParallaxes = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualParallaxes = VisuMZ.VisualParallaxes || {};
VisuMZ.VisualParallaxes.version = 1.13;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.13] [VisualParallaxes]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_Parallaxes_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * By default, RPG Maker MZ only allows each map to have one parallax. Such a
 * limit makes it difficult to create different layers of objects to portray
 * distance and the like. This plugin will remedy that by allowing you to add
 * an unlimited amount of parallaxes per map alongside many controls to make
 * the parallaxes more vivid.
 * 
 * A restricted parallax area system is also added to this plugin to make
 * parallaxes appear only within certain regions and/or terrain tags. This way,
 * you can utilize parallaxes as masked layers for water surfaces and the like.
 * 
 * To make the most out of this, with the tilesets are formatted properly,
 * reflective water and reflective solid surfaces are also new effects added
 * through this plugin. Water effects will show ripples while reflective solid
 * surfaces are static.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Add, change, and/or remove parallaxes through map notetags.
 * * Lots of customization options for each of the parallaxes.
 * * Limit where parallaxes can be displayed on the map through regions and/or
 *   terrain tags.
 * * Create reflective surfaces for water and solid ground as long as the
 *   tilesets have been formatted properly.
 * * Use Plugin Commands midway through the game to add, change, fade, and/or
 *   remove parallaxes as needed.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Recommended Plugin List ------
 *
 * * Pixi JS Filters*
 *
 * This plugin recommends the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You can use this plugin without
 * it, but there will be features missing.
 * 
 * *Note* You can download the Pixi JS Filters plugin library from the below
 * URL or from the Action Sequence Impact product page. Install it as a
 * Tier 0 plugin.
 * 
 * *Note2* Pixi JS Filters perform differently on different machines/devices.
 * Please understand that this is outside of VisuStella's control.
 * 
 * URL: https://filters.pixijs.download/v3.1.0/pixi-filters.js
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
 * Parallaxes
 * 
 * The map editor's inherent parallax will remain untouched and unable to
 * utilize the extra features provided by this plugin. However, you can just
 * simply create a new parallax layer over it and hide it from view if needed.
 * 
 * Each of the parallaxes added through this plugin's notetags and/or commands
 * are assigned an ID. Referring back to the ID later will allow you to update
 * and/or remove that parallax when needed.
 * 
 * The new parallaxes are created on a separate layer from the map editor's
 * parallax and isn't included with the new parallaxes. Layers with higher ID's
 * will appear above layers with lower ID's.
 * 
 * However, other than that, all of the new parallaxes follow the same rules as
 * the map editor's parallax. This means that they will not appear above the
 * tile map and require transparent tiles to be seen. They will also scroll the
 * same way the original parallax does to provide consistency.
 *
 * ---
 * 
 * Regions and Terrain Tags
 * 
 * If you don't want a parallax to appear for the whole entire background and
 * want to confine them to certain areas of the map, you can assign regions or
 * terrain tags for them to appear in.
 * 
 * Only the parts of the map marked by the designated regions and/or terrain
 * tags will reveal the parallax. Those parts will be little squares each,
 * equal to the size of a tile. They have hard borders and do not have any
 * smoothing options in order to display the parallax tiles accurately.
 * 
 * Each parallax layer can have their own custom regions and/or terrain tags to
 * appear in. These can be adjusted through the notetag settings or through the
 * Plugin Commands provided by this plugin. Parallax layers can be limited to
 * multiple regions and/or terrain tags at the same time.
 * 
 * WARNING: This will cause longer load times on larger maps and affect their
 * performance. We highly recommend that you don't use this feature on maps
 * larger than 120 tiles wide or tall. However, this value can vary from device
 * to device.
 * 
 * ---
 * 
 * Reflections
 * 
 * In order to use reflections, you need to use tiles that are semi-transparent
 * or fully transparent. For example, water reflections need to come from tiles
 * that have been modified to be semi-transparent or fully transparent. If the
 * tile is completely opaque, the reflection will not show through. This rule
 * also applies to ground surfaces.
 * 
 * By default, water-based reflections are assigned the Terrain Tag 1 and solid
 * ground reflections are assigned the Terrain Tag 2. In order to make water
 * tiles show water reflections, you need to mark their tiles in the database's
 * tilesets with 1's. To mark reflective ground surfaces, mark them with 2's.
 * If the tiles are not tagged properly, the reflections will not be shown.
 * 
 * In the Plugin Parameters and notetags, you can decide if the reflections
 * will appear above the parallaxes or below them. By default, they will appear
 * above them. However, if you change them to appear below the parallaxes, then
 * pay attention to the opacity level of the parallaxes. If the parallaxes are
 * too opaque, you will barely see the reflection.
 * 
 * Once again, both water and ground tiles need to be semi-transparent or fully
 * transparent in order for reflections to be seen.
 * 
 * WARNING: This will cause longer load times on larger maps and affect their
 * performance. We highly recommend that you don't use this feature on maps
 * larger than 120 tiles wide or tall. However, this value can vary from device
 * to device.
 * 
 * ---
 * 
 * Not For Battle
 * 
 * For clarification, the VisuStella MZ Visual Parallaxes plugin is NOT made
 * for battle. There's a separate plugin for that called Visual Battle
 * Environment. The reason why parallaxes aren't made for battle is because the
 * way parallaxes are handled in map vary from how they would be handled in
 * battle. Using the Visual Parallax Plugin Commands will only alter the
 * parallax appearances when the player finishes battle.
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
 * Pixi JS Filters
 *
 * If the game project has Pixi JS Filters installed, then water reflections
 * will have a ripple effect. This is based off the Pixi JS ReflectionFilter
 * and will follow their rules. There are a couple of settings that can be
 * adjusted to customize the reflective properties.
 * 
 * Boundary: Vertical position of the reflection point, default is 50% (middle)
 * smaller numbers produce a larger reflection, larger numbers produce a
 * smaller reflection. This also means that reflections closer to the edges
 * will also have a different visual ripple effect than those towards the
 * middle of the reflection.
 * 
 * Amplitude: Starting and ending amplitude of waves allows you to control the
 * intensity of the reflection ripples. Use larger numbers for more intensity.
 * You have control over the values for the start and end values.
 * 
 * Wavelength: Starting and ending wavelength values determine the size of the
 * ripples for the reflection filter. Use larger numbers for larger wave sizes.
 * You have control over the values for the start and end values.
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
 * === Parallax-Related Notetags ===
 * 
 * ---
 *
 * <Parallax id Settings>
 *  Name: filename
 *  optional property
 *  optional property
 *  optional property
 * </Parallax id Settings>
 *
 * - Used for: Map Notetags
 * - Creates a regular parallax layer for this map by default.
 * - Replace 'id' with a number value to assign to the parallax.
 *   - Plugin Commands will refer to this ID for changes and removal.
 * - The 'Name' setting is required. Without it, no parallax will be made.
 *   - Replace 'filename' with the filename of the image you want to use as
 *     a parallax found in the game project's img/parallaxes/ folder.
 *   - Do not include the file extension.
 * - Insert as many of the optional properties as you want. You can find a list
 *   of them in the section below.
 *
 * ---
 *
 * <Water Parallax id Settings>
 *  Name: filename
 *  optional property
 *  optional property
 *  optional property
 * </Water Parallax id Settings>
 *
 * - Used for: Map Notetags
 * - Creates a water-based parallax layer for this map by default.
 *   - This will utilize the water reflection properties and will only appear
 *     on water-marked regions and terrain tags.
 * - Replace 'id' with a number value to assign to the parallax.
 *   - Plugin Commands will refer to this ID for changes and removal.
 * - The 'Name' setting is required. Without it, no parallax will be made.
 *   - Replace 'filename' with the filename of the image you want to use as
 *     a parallax found in the game project's img/parallaxes/ folder.
 *   - Do not include the file extension.
 * - Insert as many of the optional properties as you want. You can find a list
 *   of them in the section below.
 * - WARNING: This WILL cause longer load times on larger maps.
 *
 * ---
 *
 * <Solid Parallax id Settings>
 *  Name: filename
 *  optional property
 *  optional property
 *  optional property
 * </Solid Parallax id Settings>
 *
 * - Used for: Map Notetags
 * - Creates a solid-based parallax layer for this map by default.
 *   - This will utilize the solid reflection properties and will only appear
 *     on solid-marked regions and terrain tags.
 * - Replace 'id' with a number value to assign to the parallax.
 *   - Plugin Commands will refer to this ID for changes and removal.
 * - The 'Name' setting is required. Without it, no parallax will be made.
 *   - Replace 'filename' with the filename of the image you want to use as
 *     a parallax found in the game project's img/parallaxes/ folder.
 *   - Do not include the file extension.
 * - Insert as many of the optional properties as you want. You can find a list
 *   of them in the section below.
 * - WARNING: This WILL cause longer load times on larger maps.
 *
 * ---
 * 
 * -=-=- Optional Properties -=-=-
 * 
 * Replace the 'optional property' segment of the notetags above with any of
 * the text below to acquire their effects. You can add/remove as many of the
 * optional properties as you need.
 * 
 * ---
 * 
 * Horz Scroll: x
 * Vert Scroll: y
 * 
 * - This enables horizontal or vertical scrolling for the parallax.
 * - Replace 'x' or 'y' with a Number value to determine how fast they will
 *   scroll across the screen.
 * - Use a negative value to make them scroll the other way.
 * - These effects are mutually exclusive from the "Map Locked" property.
 * 
 * ---
 * 
 * Map Locked
 * 
 * - This will cause the parallax to only scroll when the map scrolls.
 * - This has the same effect as naming a parallax with "!" in front of
 *   its filename.
 * - If the filename used for this parallax has "!" in front of it, the
 *   Map Locked effect will be automatically turned on.
 * - These effect is mutually exclusive from the "Horz Scroll" and
 *   "Vert Scroll" properties.
 * 
 * ---
 * 
 * Opacity: x
 * Opacity: x%
 * 
 * - Changes the opacity level of the parallax.
 * - Replace 'x' with a number from 0 to 255 representing the opacity level.
 * - Replace 'x%' with a percentage from 0% to 100% representing the opacity.
 * 
 * ---
 * 
 * Blend Mode: Normal
 * Blend Mode: Additive
 * Blend Mode: Multiply
 * Blend Mode: Screen
 * 
 * - Sets the blend mode for the icon on the parallax.
 * - Use only one of the above.
 * 
 * ---
 * 
 * Hue: x
 * Hue Shift: x
 * 
 * - Changes the hue of the parallax to 'x' so that you don't need to create
 *   multiple copies of the files with different colors.
 * - Replace 'x' with a number value between 0 and 360.
 * - If the "Hue Shift" property is also used, then adjust the hue of the
 *   parallax each frame by 'x' amount.
 *   - 'x' can be positive or negative.
 * 
 * ---
 * 
 * Color Tone: red, green, blue, gray
 * 
 * - Changes the color tone or tint of the parallax.
 * - Replace 'red', 'green', 'blue' with a value between -255 and 255.
 * - Replace 'gray' with a value between 0 and 255.
 * 
 * ---
 * 
 * Region: id
 * Regions: id, id, id
 * 
 * - Forces the parallax to only become visible on tiles marked regions with a
 *   matching ID (alongside valid terrain tags).
 * - If this isn't used, then the parallax will be as large as the screen.
 * - Replace 'id' with a region ID between 1 and 255.
 *   - Region 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the parallax can appear on.
 * - WARNING: This WILL cause longer load times on larger maps.
 * 
 * ---
 * 
 * Terrain Tag: id
 * Terrain Tags: id, id, id
 * 
 * - Forces the parallax to only become visible on tiles marked terrain tags
 *   with a matching ID (alongside valid regions).
 * - If this isn't used, then the parallax will be as large as the screen.
 * - Replace 'id' with a terrain tag ID between 1 and 7.
 *   - Terrain tag 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the parallax can appear on.
 * - WARNING: This WILL cause longer load times on larger maps.
 * 
 * ---
 * 
 * === Event Reflection-Related Notetags ===
 * 
 * ---
 *
 * <No Reflection>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - This will cause the event to not show any reflection on reflective tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * === Reflection-Related Notetags ===
 * 
 * In order to use reflections, you need to use tiles that are semi-transparent
 * or fully transparent. For example, water reflections need to come from tiles
 * that have been modified to be semi-transparent or fully transparent. If the
 * tile is completely opaque, the reflection will not show through. This rule
 * also applies to ground surfaces.
 * 
 * ---
 *
 * <Water Reflection Region: id>
 * <Water Reflection Regions: id, id, id>
 *
 * <Solid Reflection Region: id>
 * <Solid Reflection Regions: id, id, id>
 *
 * - Used for: Map Notetags
 * - Sets the tiles marked by the region ID's to become reflective.
 * - This will override the Plugin Parameter settings for this map.
 *   - This does not add upon them.
 * - Replace 'id' with a region ID between 1 and 255.
 *   - Region 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the parallax can appear on.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 * - WARNING: This WILL cause longer load times on larger maps.
 *
 * ---
 *
 * <Water Reflection Terrain Tag: id>
 * <Water Reflection Terrain Tags: id, id, id>
 *
 * <Solid Reflection Terrain Tag: id>
 * <Solid Reflection Terrain Tags: id, id, id>
 *
 * - Used for: Map Notetags
 * - Sets the tiles marked by the terrain tag ID's to become reflective.
 * - This will override the Plugin Parameter settings for this map.
 *   - This does not add upon them.
 * - Replace 'id' with a terrain tag ID between 1 and 7.
 *   - Terrain Tag 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the parallax can appear on.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 * - WARNING: This WILL cause longer load times on larger maps.
 *
 * ---
 * 
 * <No Reflections>
 * 
 * - Used for: Map Notetags
 * - Disable water and map reflections on the current map.
 * 
 * ---
 *
 * <Water Reflection Top>
 * <Water Reflection Bottom>
 *
 * <Solid Reflection Top>
 * <Solid Reflection Bottom>
 *
 * - Used for: Map Notetags
 * - This will put the reflection layer either above all of the newly added
 *   parallaxes or below them.
 *   - If placed below, the reflection layer will not appear below the map
 *     editor's parallax layer.
 *   - If you change them to appear below the parallaxes, then pay attention to
 *     the opacity level of the parallaxes. If the parallaxes are too opaque,
 *     you will barely see the reflection.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 *
 * ---
 *
 * <Water Reflection Blur: x>
 * 
 * <Solid Reflection Blur: x>
 *
 * - Used for: Map Notetags
 * - Changes how much the water/solid tiles will blur the reflection for
 *   this map.
 * - Replace 'x' with a decimal Number value. Use a number between 0 and 1 for
 *   the best results.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 *
 * ---
 *
 * <Water Reflection Opacity: x>
 * <Water Reflection Opacity: x%>
 * 
 * <Solid Reflection Opacity: x>
 * <Solid Reflection Opacity: x%>
 *
 * - Used for: Map Notetags
 * - Changes the opacity level of the tile's reflection.
 * - Replace 'x' with a number from 0 to 255 representing the opacity level.
 * - Replace 'x%' with a percentage from 0% to 100% representing the opacity.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 *
 * ---
 * 
 * <Water Reflection Boundary: x>
 *
 * <Water Reflection Amplitude: start, end>
 * 
 * <Water Reflection Wavelength: start, end>
 *
 * - Used for: Map Notetags
 * - Requires Pixi JS Filters installed for the game project.
 * - These settings adjust the water reflection's ripple intensity.
 * - Replace Boundary's 'x' with a number value between 0 and 1.
 *   - Vertical position of the reflection point, default is 50% (middle)
 *     smaller numbers produce a larger reflection, larger numbers produce a
 *     smaller reflection. This also means that reflections closer to the edges
 *     will also have a different visual ripple effect than those towards the
 *     middle of the reflection.
 * - Replace Amplitude's 'start' and 'end' with number values representing how
 *   much to alter the intensity by.
 *   - Starting and ending amplitude of waves allows you to control the
 *     intensity of the reflection ripples.
 *   - Use larger numbers for more intensity.
 * - Replace Wavelength's 'start' and 'end' with number values representing the
 *   wave size.
 *   - Starting and ending wavelength values determine the size of the ripples
 *     for the reflection filter.
 *   - Use larger numbers for larger wave sizes.
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
 * === Parallax Plugin Commands ===
 * 
 * ---
 *
 * Parallax: Add/Change Settings
 * - Add/Change settings for target parallax.
 * - Does not alter the map editor's parallax.
 *
 *   Required:
 *
 *     ID:
 *     - What is the ID of this parallax to be added/changed?
 *
 *     Filename:
 *     - What is the filename of the parallax?
 *
 *     Type:
 *     - What kind of parallax is this going to be?
 *     - Normal
 *     - Water
 *     - Solid
 * 
 *   Optional Settings:
 * 
 *     Scrolling:
 *
 *       Map Lock?:
 *       - Lock the parallax to the map's scrolling?
 *       - Automatically enable if the filename starts with "!"
 *
 *       Loop Horizontally?:
 *       - Loop the parallax horizontally?
 *       - Does not work with Map Lock enabled.
 *
 *         Scroll:
 *         - What is the horizontal scroll speed?
 *         - Use a negative value to invert the direction.
 *
 *       Loop Vertically?:
 *       - Loop the parallax vertically?
 *       - Does not work with Map Lock enabled.
 *
 *         Scroll:
 *         - What is the vertical scroll speed?
 *         - Use a negative value to invert the direction.
 * 
 *     Appearance:
 *
 *       Opacity:
 *       - What is the opacity level for this parallax?
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the parallax?
 *       - You may use JavaScript code.
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Hue:
 *       - Do you wish to adjust this parallax's hue?
 *       - You may use JavaScript code.
 *
 *       Hue Shift:
 *       - How much do you want the hue to shift each frame?
 *       - You may use JavaScript code.
 *
 *       Color Tone:
 *       - What tone do you want for the parallax?
 *       - Format: [Red, Green, Blue, Gray]
 * 
 *     Location:
 *
 *       Regions:
 *       - Which regions will show this parallax?
 *       - Does not work with 0. Leave empty to ignore.
 *
 *       Terrain Tags:
 *       - Which terrain tags will show this parallax?
 *       - Does not work with 0. Leave empty to ignore.
 *
 * ---
 * 
 * Parallax: Fade Opacity
 * - Fades the target parallax(es) opacity to a different value.
 * 
 *   ID(s):
 *   - Target which parallax(es)?
 *   - Cannot target the map editor's parallax.
 * 
 *   Target Opacity:
 *   - What opacity level to this value (0-255).
 *   - You may use JavaScript code to determine the value.
 * 
 *   Duration:
 *   - How many frames should this change take?
 *   - You may use JavaScript code to determine the value.
 * 
 * ---
 *
 * Parallax: Remove
 * - Removes target parallax(es).
 *
 *   ID(s):
 *   - Remove which parallax(es)?
 *   - Cannot remove the map editor's parallax.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Water Reflection Settings
 * ============================================================================
 *
 * These are the default settings for water-based reflections.
 *
 * ---
 *
 * Markers
 * 
 *   Regions:
 *   - By default, which regions by default apply this reflection?
 *   - 0 is ignored.
 * 
 *   Terrain Tags:
 *   - By default, which terrain tags by default apply this reflection?
 *   - 0 is ignored.
 *
 * ---
 *
 * Positioning
 * 
 *   Above Parallaxes?:
 *   - Place water reflections above visual parallaxes?
 *
 * ---
 *
 * Appearance
 * 
 *   Blur Rate:
 *   - How much do you wish to blur this reflection?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Opacity:
 *   - What is the default opacity for this reflection?
 *   - Use a value between 0 and 255.
 * 
 *   Water Boundary:
 *   - At which point is the water boundary?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Amplitude Start:
 *   - What should be the starting amplitude value?
 * 
 *   Amplitude End:
 *   - What should be the ending amplitude value?
 * 
 *   Wavelength Start:
 *   - What should be the starting wavelength value?
 * 
 *   Wavelength End:
 *   - What should be the ending wavelength value?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Solid Reflection Settings
 * ============================================================================
 *
 * These are the default settings for solid ground reflections.
 *
 * ---
 *
 * Markers
 * 
 *   Regions:
 *   - By default, which regions by default apply this reflection?
 *   - 0 is ignored.
 * 
 *   Terrain Tags:
 *   - By default, which terrain tags by default apply this reflection?
 *   - 0 is ignored.
 *
 * ---
 *
 * Positioning
 * 
 *   Above Parallaxes?:
 *   - Place water reflections above visual parallaxes?
 *
 * ---
 *
 * Appearance
 * 
 *   Blur Rate:
 *   - How much do you wish to blur this reflection?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Opacity:
 *   - What is the default opacity for this reflection?
 *   - Use a value between 0 and 255.
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
 * Version 1.13: November 14, 2024
 * * Compatibility Update!
 * ** Added reflection compatibility with spawned events.
 * 
 * Version 1.12: July 18, 2024
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * ** Uses a better algorithm to determine terrain tags.
 * 
 * Version 1.11: April 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where having a '!' at the start of a parallax file's name
 *    did not automatically incur map lock when done from plugin commands.
 *    Fix made by Arisu.
 * 
 * Version 1.10: November 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.09: August 17, 2023
 * * Bug Fixes!
 * ** Fixed an error that would cause a crash upon using the "Return to Title
 *    Screen" event command with the "Event Title Screen" plugin installed. Fix
 *    made by Irina.
 * 
 * Version 1.08: May 18, 2023
 * * Bug Fixes!
 * ** Reflections should now work properly with VisuMZ_1_EventsMoveCore's
 *    latest version. Fix made by Arisu.
 * 
 * Version 1.07: August 4, 2022
 * * Compatibility Update!
 * ** Map Locked parallaxes now work better with smooth scroll.
 * 
 * Version 1.06: July 7, 2022
 * * Feature Update!
 * ** Blend modes are now revamped for the parallaxes to behave more like they
 *    do for pictures for better accuracy. Update made by Irina.
 * 
 * Version 1.05: January 27, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: January 6, 2022
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: December 9, 2021
 * * Documentation Update!
 * ** Added section to "Major Changes" for clarification purposes:
 * *** Not For Battle
 * *** For clarification, the VisuStella MZ Visual Parallxes plugin is NOT made
 *     for battle. There's a separate plugin for that called Visual Battle
 *     Environment. The reason why parallaxes aren't made for battle is because
 *     the way parallaxes are handled in map vary from how they would be
 *     handled in battle. Using the Visual Parallaxes Plugin Commands will only
 *     alter the parallax appearances when the player finishes battle.
 * * Feature Update!
 * ** Added fail safes to prevent Plugin Command usage during battle to cause
 *    problems while inside battle test. Update made by Irina.
 * 
 * Version 1.02: June 25, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for Event Title Scene.
 * 
 * Version 1.01: May 28, 2021
 * * Feature Update!
 * ** Fail safe added for those without Pixi JS Filters added.
 * ** Removed the VisuStella MZ Core Engine requirement.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.00 Official Release Date: March 12, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ParallaxAddChangeSettings
 * @text Parallax: Add/Change Settings
 * @desc Add/Change settings for target parallax.
 * Does not alter the map editor's parallax.
 * 
 * @arg Required
 *
 * @arg id:num
 * @text ID
 * @parent Required
 * @type number
 * @min 1
 * @desc What is the ID of this parallax to be added/changed?
 * @default 1
 *
 * @arg filename:str
 * @text Filename
 * @parent Required
 * @type file
 * @dir img/parallaxes/
 * @desc What is the filename of the parallax?
 * @default >>>ATTENTION<<<
 *
 * @arg type:str
 * @text Type
 * @parent Required
 * @type select
 * @option Normal
 * @value normal
 * @option Water
 * @value water
 * @option Solid
 * @value solid
 * @desc What kind of parallax is this going to be?
 * @default normal
 *
 * @arg Optional:struct
 * @text Optional Settings
 * @type struct<Optional>
 * @desc Optional settings regarding Visual Parallaxes.
 * @default {"Scrolling":"","_parallaxZero:eval":"false","_parallaxLoopX:eval":"false","_parallaxSx:eval":"+0","_parallaxLoopY:eval":"false","_parallaxSy:eval":"+0","Appearance":"","opacity:eval":"255","blendMode:eval":"0","hue:eval":"0","hueShift:eval":"+0","colorTone:eval":"[0, 0, 0, 0]","Location":"","maskRegions:arraynum":"[]","maskTerrainTags:arraynum":"[]"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ParallaxFadeOpacity
 * @text Parallax: Fade Opacity
 * @desc Fades the target parallax(es) opacity to a different value.
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Target which parallax(es)?
 * Cannot target the map editor's parallax.
 * @default ["1"]
 *
 * @arg targetOpacity:eval
 * @text Target Opacity
 * @desc What opacity level to this value (0-255).
 * You may use JavaScript code to determine the value.
 * @default 255
 *
 * @arg opacityDuration:eval
 * @text Duration
 * @desc How many frames should this change take?
 * You may use JavaScript code to determine the value.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ParallaxRemove
 * @text Parallax: Remove
 * @desc Removes target parallax(es).
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Remove which parallax(es)?
 * Cannot remove the map editor's parallax.
 * @default ["1"]
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
 * @param VisualParallaxes
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param WaterReflect:struct
 * @text Water Reflection Settings
 * @type struct<WaterReflect>
 * @desc These are the default settings for water-based reflections.
 * @default {"Markers":"","Regions:arraynum":"[]","TerrainTags:arraynum":"[\"1\"]","Positioning":"","Top:eval":"true","Appearance":"","Blur:num":"0.8","Opacity:num":"128","Boundary:num":"0.1","AmpStart:num":"2","AmpEnd:num":"4","WaveStart:num":"4","WaveEnd:num":"16"}
 *
 * @param SolidReflect:struct
 * @text Solid Reflection Settings
 * @type struct<SolidReflect>
 * @desc These are the default settings for solid ground reflections.
 * @default {"Markers":"","Regions:arraynum":"[]","TerrainTags:arraynum":"[\"2\"]","Positioning":"","Top:eval":"true","Appearance":"","Blur:num":"0.8","Opacity:num":"128"}
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
 * Water Reflection Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WaterReflect:
 *
 * @param Markers
 *
 * @param Regions:arraynum
 * @text Regions
 * @parent Markers
 * @type number[]
 * @min 1
 * @max 255
 * @desc By default, which regions by default apply this reflection? 0 is ignored.
 * @default []
 *
 * @param TerrainTags:arraynum
 * @text Terrain Tags
 * @parent Markers
 * @type number[]
 * @min 1
 * @max 7
 * @desc By default, which terrain tags by default apply this reflection? 0 is ignored.
 * @default ["1"]
 * 
 * @param Positioning
 * 
 * @param Top:eval
 * @text Above Parallaxes?
 * @parent Positioning
 * @type boolean
 * @on Above Parallaxes
 * @off Below Parallaxes
 * @desc Place water reflections above visual parallaxes?
 * @default true
 * 
 * @param Appearance
 *
 * @param Blur:num
 * @text Blur Rate
 * @parent Appearance
 * @desc How much do you wish to blur this reflection?
 * Use a decimal number between 0 and 1.
 * @default 0.8
 *
 * @param Opacity:num
 * @text Opacity
 * @parent Appearance
 * @type number
 * @min 0
 * @max 255
 * @desc What is the default opacity for this reflection?
 * Use a value between 0 and 255.
 * @default 128
 *
 * @param Boundary:num
 * @text Water Boundary
 * @parent Appearance
 * @desc At which point is the water boundary?
 * Use a decimal number between 0 and 1.
 * @default 0.1
 *
 * @param AmpStart:num
 * @text Amplitude Start
 * @parent Appearance
 * @type number
 * @desc What should be the starting amplitude value?
 * @default 2
 *
 * @param AmpEnd:num
 * @text Amplitude End
 * @parent Appearance
 * @type number
 * @desc What should be the ending amplitude value?
 * @default 4
 *
 * @param WaveStart:num
 * @text Wavelength Start
 * @parent Appearance
 * @type number
 * @desc What should be the starting wavelength value?
 * @default 4
 *
 * @param WaveEnd:num
 * @text Wavelength End
 * @parent Appearance
 * @type number
 * @desc What should be the ending wavelength value?
 * @default 16
 *
 */
/* ----------------------------------------------------------------------------
 * Solid Reflection Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SolidReflect:
 *
 * @param Markers
 *
 * @param Regions:arraynum
 * @text Regions
 * @parent Markers
 * @type number[]
 * @min 1
 * @max 255
 * @desc By default, which regions by default apply this reflection? 0 is ignored.
 * @default []
 *
 * @param TerrainTags:arraynum
 * @text Terrain Tags
 * @parent Markers
 * @type number[]
 * @min 1
 * @max 7
 * @desc By default, which terrain tags by default apply this reflection? 0 is ignored.
 * @default ["2"]
 * 
 * @param Positioning
 * 
 * @param Top:eval
 * @text Above Parallaxes?
 * @parent Positioning
 * @type boolean
 * @on Above Parallaxes
 * @off Below Parallaxes
 * @desc Place solid reflections above visual parallaxes?
 * @default true
 * 
 * @param Appearance
 *
 * @param Blur:num
 * @text Blur Rate
 * @parent Appearance
 * @desc How much do you wish to blur this reflection?
 * Use a decimal number between 0 and 1.
 * @default 0.8
 *
 * @param Opacity:num
 * @text Opacity
 * @parent Appearance
 * @type number
 * @min 0
 * @max 255
 * @desc What is the default opacity for this reflection?
 * Use a value between 0 and 255.
 * @default 128
 *
 */
/* ----------------------------------------------------------------------------
 * Optional Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Optional:
 * 
 * @param Scrolling
 * 
 * @param _parallaxZero:eval
 * @text Map Lock?
 * @parent Scrolling
 * @type boolean
 * @on Map Lock
 * @off No Map Lock
 * @desc Lock the parallax to the map's scrolling?
 * Automatically enable if the filename starts with "!"
 * @default false
 * 
 * @param _parallaxLoopX:eval
 * @text Loop Horizontally?
 * @parent Scrolling
 * @type boolean
 * @on Loop
 * @off No Loop
 * @desc Loop the parallax horizontally?
 * Does not work with Map Lock enabled.
 * @default false
 *
 * @param _parallaxSx:eval
 * @text Scroll:
 * @parent _parallaxLoopX:eval
 * @desc What is the horizontal scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 * 
 * @param _parallaxLoopY:eval
 * @text Loop Vertically?
 * @parent Scrolling
 * @type boolean
 * @on Loop
 * @off No Loop
 * @desc Loop the parallax horizontally?
 * Does not work with Map Lock enabled.
 * @default false
 *
 * @param _parallaxSy:eval
 * @text Scroll:
 * @parent _parallaxLoopY:eval
 * @desc What is the vertical scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 * 
 * @param Appearance
 *
 * @param opacity:eval
 * @text Opacity
 * @parent Appearance
 * @desc What is the opacity level for this parallax?
 * You may use JavaScript code.
 * @default 255
 *
 * @param blendMode:eval
 * @text Blend Mode
 * @parent Appearance
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the parallax?
 * You may use JavaScript code.
 * @default 0
 *
 * @param hue:eval
 * @text Hue
 * @parent Appearance
 * @desc Do you wish to adjust this parallax's hue?
 * You may use JavaScript code.
 * @default 0
 *
 * @param hueShift:eval
 * @text Hue Shift
 * @parent hue:eval
 * @desc How much do you want the hue to shift each frame?
 * You may use JavaScript code.
 * @default +0
 *
 * @param colorTone:eval
 * @text Color Tone
 * @parent Appearance
 * @desc What tone do you want for the parallax?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 * 
 * @param Location
 *
 * @param maskRegions:arraynum
 * @text Regions
 * @parent Location
 * @type number[]
 * @min 1
 * @max 255
 * @desc Which regions will show this parallax?
 * Does not work with 0. Leave empty to ignore.
 * @default []
 *
 * @param maskTerrainTags:arraynum
 * @text Terrain Tags
 * @parent Location
 * @type number[]
 * @min 1
 * @max 7
 * @desc Which terrain tags will show this parallax?
 * Does not work with 0. Leave empty to ignore.
 * @default []
 *
 */
//=============================================================================

const _0x29f2e4=_0x396b;(function(_0x13fb20,_0x2be2fa){const _0x1a7d0a=_0x396b,_0x4a9256=_0x13fb20();while(!![]){try{const _0x4b93b4=parseInt(_0x1a7d0a(0x2a6))/0x1+parseInt(_0x1a7d0a(0x209))/0x2+-parseInt(_0x1a7d0a(0x19f))/0x3*(parseInt(_0x1a7d0a(0x19a))/0x4)+-parseInt(_0x1a7d0a(0x284))/0x5+-parseInt(_0x1a7d0a(0x195))/0x6+-parseInt(_0x1a7d0a(0x21b))/0x7*(parseInt(_0x1a7d0a(0x20c))/0x8)+-parseInt(_0x1a7d0a(0x1c7))/0x9*(-parseInt(_0x1a7d0a(0x1d8))/0xa);if(_0x4b93b4===_0x2be2fa)break;else _0x4a9256['push'](_0x4a9256['shift']());}catch(_0xbe2711){_0x4a9256['push'](_0x4a9256['shift']());}}}(_0x1810,0x98f79));function _0x1810(){const _0x41d59f=['bind','createMaskSprite','version','createWaterReflectionLayer','_scaleX','ParallaxAddChangeSettings','screenTileY','createSpawnedEvent','createParallaxContainer','WaterBottom','Game_Map_scrollUp','SolidBottom','scrollLeft','getWaterReflectionTop','match','_maskSprite','terrainTag','MaskRegions','floor','call','Top','DEFAULT_SOLID_REFLECTION_REGIONS','updateScaleBase','hasSolidReflections','DEFAULT_SOLID_REFLECTION_FILTER_TOP','height','addLoadListener','OpacityRate','noReflections','createWaterReflectionMask','_parallaxLoopX','STR','_parallaxLoopY','registerReflectionSettings','format','updateHue','_displayY','WaterAmplitude','_reflectFilter','_waterReflectContainer','settings','isLoopVertical','_mask','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','WaterOpacityRate','getWaterReflectionWavelength','getVisualParallaxes','775240DgJNXb','JSON','STRUCT','8DbWlDI','EVAL','createCharacters','updateOrigin','ARRAYFUNC','charAt','water','updateMask','Game_Map_updateParallax','Game_Map_scrollRight','move','getWaterReflectionRegions','hueShift','note','blendMode','1427279skGaJv','WaveEnd','setupVisualParallaxes','origin','MaskTerrainTags','isLoopHorizontal','tilesetFlags','SolidReflect','removeChild','updateVisualParallaxSettings','VertLoop','Game_Map_scrollLeft','initialize','_spriteset','Argument\x20must\x20be\x20an\x20array','createParallax','_id','create','Game_Map_setup','wasolidter','getWaterReflectionOpacity','update','constructor','addChild','_solidReflectAdded','ReflectionFilter','Boundary','toUpperCase','SolidBlur','setupVisualParallaxesNotetags','getVisualParallaxSettings','Optional','prototype','scrollRight','DEFAULT_WATER_REFLECTION_FILTER_BOUNDARY','_blurFilter','AmpStart','filter','regionId','push','SolidRegions','FUNC','createParallaxLayers','setupPageSettings','_noReflection','VisualParallaxes','_solidReflectLayer','tileWidth','status','getSolidReflectionOpacity','exit','Game_Map_setDisplayPos','_parallaxZero','Blur','_createColorFilter','setHue','sort','maskRegions','removeVisualParallaxLayer','WaterTerrainTags','round','description','vehicles','_colorFilter','createCharacterReflections','_waterReflectAdded','return\x200','NORMAL','ARRAYSTRUCT','hue','scrollUp','updateOpacity','getWaterReflectionTerrainTags','checkVisualParallaxesStringTags','_parallaxSx','getSolidReflectionBlur','WaterReflect','_scene','createNewParallaxLayer','Settings','isEventTest','list','updateTone','hasWaterReflections','VisuMZ_2_TileGrafterSystem','Spriteset_Map_createSpawnedEvent','makeDeepCopy','_hasSolidReflections','Spriteset_Map_update','TerrainTags','setup','Game_Map_scrollDown','_hue','WaterBoundary','equals','setDisplayPos','indexOf','_displayX','max','NUM','DEFAULT_SOLID_REFLECTION_FILTER_BLUR','_parallaxName','clearPageSettings','updateWaterReflections','DEFAULT_SOLID_REFLECTION_TERRAINTAGS','4883420wzNJTI','find','Start','sortVisualParallaxes','updateParallax','_updateColorFilter','#ffffff','_colorTone','type','setupVisualParallaxesEffects','createReflectionMask','_character','displayX','createSolidReflectionMask','opacityDuration','Game_Event_clearPageSettings','_waterReflectLayer','setColorTone','_visualParallaxSettings','Regions','RegExp','_parallaxContainer','remove','WaterRegions','_parallaxY','updateVisualParallaxLayer','DEFAULT_WATER_REFLECTION_TERRAINTAGS','fillRect','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','WaterBlur','_baseSprite','SCREEN','Hue','updateSolidReflections','91869mAhfVw','ARRAYJSON','createSolidReflectionLayer','WaveStart','DEFAULT_WATER_REFLECTION_FILTER_AMPLITUDE','length','SolidTop','>>>ATTENTION<<<','BlurFilter','loadParallax','initVisualParallaxesEffects','scale','AmpEnd','5657094ryRlzb','loadBitmap','maskTerrainTags','scrollDown','colorTone','697028KCoINT','parameters','MULTIPLY','split','bitmap','18EtYFiu','_parallaxX','opacity','Opacity','trim','addChangeVisualParallax','destroy','registerCommand','TemplateSettings','_hasWaterReflections','CreateLayerData','Spriteset_Map_createParallax','ARRAYNUM','map','SpriteMaskFilter','setupVisualParallaxesCommentTags','screenTileX','DEFAULT_WATER_REFLECTION_FILTER_TOP','_solidReflectContainer','findTargetVisualParallax','width','DEFAULT_SOLID_REFLECTION_FILTER_OPACITY','includes','targetOpacity','isInstanceOfSceneMap','tileHeight','SolidOpacityFlat','parse','getVisualParallaxOy','reverseData','children','DEFAULT_WATER_REFLECTION_FILTER_WAVELENGTH','filename','getWaterReflectionBoundary','setupRadialLight','_reflection','createMaskBitmap','BlendMode','filters','displayY','14922162TsMFDo','clamp','Tone','getWaterReflectionAmplitude','NoReflection','WaterTop','WaterOpacityFlat','DEFAULT_WATER_REFLECTION_REGIONS','_grafterRefreshRegions','name','code','getSolidReflectionRegions','getSolidReflectionTerrainTags','isSceneMap','Spriteset_Map_createCharacters','removeVisualParallax','ConvertParams','20WQhVZZ','_maskFilter'];_0x1810=function(){return _0x41d59f;};return _0x1810();}var label=_0x29f2e4(0x248),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x29f2e4(0x240)](function(_0x341d81){const _0x409939=_0x29f2e4;return _0x341d81[_0x409939(0x24b)]&&_0x341d81[_0x409939(0x258)][_0x409939(0x1b5)]('['+label+']');})[0x0];VisuMZ[label][_0x29f2e4(0x26a)]=VisuMZ[label][_0x29f2e4(0x26a)]||{},VisuMZ[_0x29f2e4(0x1d7)]=function(_0x3a9825,_0xe63d45){const _0x3dad8f=_0x29f2e4;for(const _0x28d785 in _0xe63d45){if(_0x28d785['match'](/(.*):(.*)/i)){const _0x567ad2=String(RegExp['$1']),_0x366b66=String(RegExp['$2'])['toUpperCase']()[_0x3dad8f(0x1a3)]();let _0x446e57,_0x3ecef,_0x20ddc;switch(_0x366b66){case _0x3dad8f(0x27e):_0x446e57=_0xe63d45[_0x28d785]!==''?Number(_0xe63d45[_0x28d785]):0x0;break;case _0x3dad8f(0x1ab):_0x3ecef=_0xe63d45[_0x28d785]!==''?JSON[_0x3dad8f(0x1ba)](_0xe63d45[_0x28d785]):[],_0x446e57=_0x3ecef[_0x3dad8f(0x1ac)](_0x4f09ae=>Number(_0x4f09ae));break;case _0x3dad8f(0x20d):_0x446e57=_0xe63d45[_0x28d785]!==''?eval(_0xe63d45[_0x28d785]):null;break;case'ARRAYEVAL':_0x3ecef=_0xe63d45[_0x28d785]!==''?JSON[_0x3dad8f(0x1ba)](_0xe63d45[_0x28d785]):[],_0x446e57=_0x3ecef[_0x3dad8f(0x1ac)](_0x2214e6=>eval(_0x2214e6));break;case _0x3dad8f(0x20a):_0x446e57=_0xe63d45[_0x28d785]!==''?JSON[_0x3dad8f(0x1ba)](_0xe63d45[_0x28d785]):'';break;case _0x3dad8f(0x2a7):_0x3ecef=_0xe63d45[_0x28d785]!==''?JSON[_0x3dad8f(0x1ba)](_0xe63d45[_0x28d785]):[],_0x446e57=_0x3ecef['map'](_0x18a5f9=>JSON[_0x3dad8f(0x1ba)](_0x18a5f9));break;case _0x3dad8f(0x244):_0x446e57=_0xe63d45[_0x28d785]!==''?new Function(JSON[_0x3dad8f(0x1ba)](_0xe63d45[_0x28d785])):new Function(_0x3dad8f(0x25d));break;case _0x3dad8f(0x210):_0x3ecef=_0xe63d45[_0x28d785]!==''?JSON[_0x3dad8f(0x1ba)](_0xe63d45[_0x28d785]):[],_0x446e57=_0x3ecef[_0x3dad8f(0x1ac)](_0x2fac7a=>new Function(JSON[_0x3dad8f(0x1ba)](_0x2fac7a)));break;case _0x3dad8f(0x1f9):_0x446e57=_0xe63d45[_0x28d785]!==''?String(_0xe63d45[_0x28d785]):'';break;case'ARRAYSTR':_0x3ecef=_0xe63d45[_0x28d785]!==''?JSON[_0x3dad8f(0x1ba)](_0xe63d45[_0x28d785]):[],_0x446e57=_0x3ecef[_0x3dad8f(0x1ac)](_0x2aa0e5=>String(_0x2aa0e5));break;case _0x3dad8f(0x20b):_0x20ddc=_0xe63d45[_0x28d785]!==''?JSON[_0x3dad8f(0x1ba)](_0xe63d45[_0x28d785]):{},_0x446e57=VisuMZ[_0x3dad8f(0x1d7)]({},_0x20ddc);break;case _0x3dad8f(0x25f):_0x3ecef=_0xe63d45[_0x28d785]!==''?JSON[_0x3dad8f(0x1ba)](_0xe63d45[_0x28d785]):[],_0x446e57=_0x3ecef[_0x3dad8f(0x1ac)](_0x4e82aa=>VisuMZ[_0x3dad8f(0x1d7)]({},JSON[_0x3dad8f(0x1ba)](_0x4e82aa)));break;default:continue;}_0x3a9825[_0x567ad2]=_0x446e57;}}return _0x3a9825;},(_0x4a6817=>{const _0x6bd7e6=_0x29f2e4,_0x4d0e97=_0x4a6817[_0x6bd7e6(0x1d0)];for(const _0x57c54a of dependencies){if(!Imported[_0x57c54a]){alert(_0x6bd7e6(0x2a0)[_0x6bd7e6(0x1fc)](_0x4d0e97,_0x57c54a)),SceneManager[_0x6bd7e6(0x24d)]();break;}}const _0x5e5be4=_0x4a6817[_0x6bd7e6(0x258)];if(_0x5e5be4[_0x6bd7e6(0x1e8)](/\[Version[ ](.*?)\]/i)){const _0x1b7994=Number(RegExp['$1']);_0x1b7994!==VisuMZ[label][_0x6bd7e6(0x1dc)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x4d0e97,_0x1b7994)),SceneManager[_0x6bd7e6(0x24d)]());}if(_0x5e5be4['match'](/\[Tier[ ](\d+)\]/i)){const _0x45116b=Number(RegExp['$1']);_0x45116b<tier?(alert(_0x6bd7e6(0x205)[_0x6bd7e6(0x1fc)](_0x4d0e97,_0x45116b,tier)),SceneManager[_0x6bd7e6(0x24d)]()):tier=Math[_0x6bd7e6(0x27d)](_0x45116b,tier);}VisuMZ[_0x6bd7e6(0x1d7)](VisuMZ[label][_0x6bd7e6(0x26a)],_0x4a6817[_0x6bd7e6(0x19b)]);})(pluginData),VisuMZ['VisualParallaxes'][_0x29f2e4(0x1a7)]=function(){return{'id':0x0,'filename':'','_parallaxZero':![],'_parallaxLoopX':![],'_parallaxLoopY':![],'_parallaxSx':0x0,'_parallaxSy':0x0,'_parallaxX':0x0,'_parallaxY':0x0,'opacity':0xff,'targetOpacity':0xff,'opacityDuration':0x0,'blendMode':0x0,'hue':0x0,'hueShift':0x0,'colorTone':[0x0,0x0,0x0,0x0],'maskRegions':[],'maskTerrainTags':[]};},PluginManager[_0x29f2e4(0x1a6)](pluginData[_0x29f2e4(0x1d0)],_0x29f2e4(0x1df),_0x3f4598=>{const _0x549ef3=_0x29f2e4;VisuMZ[_0x549ef3(0x1d7)](_0x3f4598,_0x3f4598);if(_0x3f4598['id']<=0x0)return;if(_0x3f4598['filename']===''||_0x3f4598[_0x549ef3(0x1bf)]===_0x549ef3(0x18f))return;let _0x3765e8=JsonEx[_0x549ef3(0x271)](_0x3f4598[_0x549ef3(0x23a)]);if(!_0x3765e8['hasOwnProperty'](_0x549ef3(0x254)))_0x3765e8=VisuMZ['VisualParallaxes'][_0x549ef3(0x1a7)]();_0x3765e8[_0x549ef3(0x1bf)]=_0x3f4598['filename'],_0x3765e8['id']=_0x3f4598['id'];_0x3f4598[_0x549ef3(0x28c)]===_0x549ef3(0x212)&&(_0x3765e8[_0x549ef3(0x254)][_0x549ef3(0x18d)]<=0x0&&(_0x3765e8[_0x549ef3(0x254)]=JsonEx[_0x549ef3(0x271)]($gameMap['getWaterReflectionRegions']())),_0x3765e8[_0x549ef3(0x197)][_0x549ef3(0x18d)]<=0x0&&(_0x3765e8[_0x549ef3(0x197)]=JsonEx['makeDeepCopy']($gameMap['getWaterReflectionTerrainTags']())));_0x3f4598[_0x549ef3(0x28c)]===_0x549ef3(0x22e)&&(_0x3765e8['maskRegions'][_0x549ef3(0x18d)]<=0x0&&(_0x3765e8[_0x549ef3(0x254)]=JsonEx['makeDeepCopy']($gameMap[_0x549ef3(0x1d2)]())),_0x3765e8[_0x549ef3(0x197)]['length']<=0x0&&(_0x3765e8[_0x549ef3(0x197)]=JsonEx[_0x549ef3(0x271)]($gameMap[_0x549ef3(0x1d3)]())));while(_0x3765e8[_0x549ef3(0x199)][_0x549ef3(0x18d)]<0x4){_0x3765e8[_0x549ef3(0x199)][_0x549ef3(0x242)](0x0);}_0x3765e8[_0x549ef3(0x1a0)]=0x0,_0x3765e8[_0x549ef3(0x29c)]=0x0,_0x3765e8['targetOpacity']=_0x3f4598[_0x549ef3(0x1a1)],_0x3765e8[_0x549ef3(0x292)]=0x0,$gameMap[_0x549ef3(0x1a4)](_0x3765e8);}),PluginManager['registerCommand'](pluginData[_0x29f2e4(0x1d0)],'ParallaxFadeOpacity',_0x1b9f56=>{const _0x52ee46=_0x29f2e4;if(!SceneManager['isInstanceOfSceneMap']())return;VisuMZ['ConvertParams'](_0x1b9f56,_0x1b9f56);const _0x18759b=_0x1b9f56['list'];for(const _0x590425 of _0x18759b){const _0x1b5a1e=$gameMap[_0x52ee46(0x239)](_0x590425);if(!_0x1b5a1e)continue;_0x1b5a1e[_0x52ee46(0x1b6)]=_0x1b9f56['targetOpacity']||0x0,_0x1b5a1e['opacityDuration']=_0x1b9f56[_0x52ee46(0x292)]||0x0,_0x1b5a1e['opacityDuration']<=0x0&&(_0x1b5a1e[_0x52ee46(0x1a1)]=_0x1b5a1e[_0x52ee46(0x1b6)]);}}),PluginManager[_0x29f2e4(0x1a6)](pluginData[_0x29f2e4(0x1d0)],'ParallaxRemove',_0x58ac38=>{const _0x3097a5=_0x29f2e4;if(!SceneManager[_0x3097a5(0x1b7)]())return;VisuMZ['ConvertParams'](_0x58ac38,_0x58ac38);const _0xa8aabb=_0x58ac38[_0x3097a5(0x26c)];for(const _0x506e6d of _0xa8aabb){$gameMap[_0x3097a5(0x1d6)](_0x506e6d);}}),VisuMZ['VisualParallaxes'][_0x29f2e4(0x298)]={'Start':/<(?:PARALLAX|WATER PARALLAX|SOLID PARALLAX)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'End':/<\/(?:PARALLAX|WATER PARALLAX|SOLID PARALLAX)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'Filename':/(?:FILENAME|NAME):[ ](.*)/i,'HorzLoop':/(?:HORZ|HORIZONTAL) (?:LOOP|SCROLL):[ ](.*)/i,'VertLoop':/(?:VERT|VERTICAL) (?:LOOP|SCROLL):[ ](.*)/i,'ScrollLock':/<(?:MAP|SCROLL)[ ](?:LOCK|LOCKED)>/i,'OpacityRate':/(?:OPACITY):[ ](\d+)([%％])/i,'OpacityFlat':/(?:OPACITY):[ ](\d+)/i,'BlendMode':/BLEND MODE:[ ](.*)/i,'Hue':/HUE:[ ](\d+)/i,'HueShift':/HUE (?:SHIFT|SPEED):[ ](.*)/i,'Tone':/(?:COLOR TONE|TONE|TINT):[ ](.*)/i,'MaskRegions':/(?:REGION|REGIONS):[ ](.*)/i,'MaskTerrainTags':/TERRAIN (?:TAG|TAGS):[ ](.*)/i,'WaterRegions':/<(?:WATER|WATER REFLECT|WATER REFLECTION) (?:REGION|REGIONS):[ ](.*)>/i,'WaterTerrainTags':/<(?:WATER|WATER REFLECT|WATER REFLECTION) TERRAIN (?:TAG|TAGS):[ ](.*)>/i,'WaterTop':/<(?:WATER|WATER REFLECT|WATER REFLECTION) TOP>/i,'WaterBottom':/<(?:WATER|WATER REFLECT|WATER REFLECTION) BOTTOM>/i,'WaterBlur':/<(?:WATER|WATER REFLECT|WATER REFLECTION) BLUR:[ ](.*)>/i,'WaterOpacityRate':/<(?:WATER|WATER REFLECT|WATER REFLECTION) OPACITY:[ ](\d+)([%％])>/i,'WaterOpacityFlat':/<(?:WATER|WATER REFLECT|WATER REFLECTION) OPACITY:[ ](\d+)>/i,'WaterBoundary':/<(?:WATER|WATER REFLECT|WATER REFLECTION) BOUNDARY:[ ](.*)>/i,'WaterAmplitude':/<(?:WATER|WATER REFLECT|WATER REFLECTION) (?:AMP|AMPLITUDE):[ ](.*)>/i,'WaterWavelength':/<(?:WATER|WATER REFLECT|WATER REFLECTION) (?:WAVE|WAVELENGTH):[ ](.*)>/i,'SolidRegions':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) (?:REGION|REGIONS):[ ](.*)>/i,'SolidTerrainTags':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) TERRAIN (?:TAG|TAGS):[ ](.*)>/i,'SolidTop':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) TOP>/i,'SolidBottom':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) BOTTOM>/i,'SolidBlur':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) BLUR:[ ](.*)>/i,'SolidOpacityRate':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) OPACITY:[ ](\d+)([%％])>/i,'SolidOpacityFlat':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) OPACITY:[ ](\d+)>/i,'NoReflection':/<NO (?:REFLECT|REFLECTION|REFLECTIONS)>/i},SceneManager[_0x29f2e4(0x1d4)]=function(){const _0x40c7ce=_0x29f2e4;return this['_scene']&&this[_0x40c7ce(0x268)][_0x40c7ce(0x231)]===Scene_Map;},SceneManager['isInstanceOfSceneMap']=function(){const _0x1fb4e3=_0x29f2e4;return this['_scene']&&this[_0x1fb4e3(0x268)]instanceof Scene_Map;},VisuMZ['VisualParallaxes'][_0x29f2e4(0x22d)]=Game_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x275)],Game_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x275)]=function(_0x13044c){const _0x8c0181=_0x29f2e4;VisuMZ[_0x8c0181(0x248)][_0x8c0181(0x22d)][_0x8c0181(0x1ed)](this,_0x13044c),this[_0x8c0181(0x21d)](),this['registerReflectionSettings']();},Game_Map[_0x29f2e4(0x1ce)]=VisuMZ[_0x29f2e4(0x248)][_0x29f2e4(0x26a)][_0x29f2e4(0x267)][_0x29f2e4(0x297)],Game_Map[_0x29f2e4(0x29e)]=VisuMZ[_0x29f2e4(0x248)][_0x29f2e4(0x26a)][_0x29f2e4(0x267)][_0x29f2e4(0x274)],Game_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x1f6)]=function(){const _0xeed885=_0x29f2e4;if(DataManager[_0xeed885(0x26b)]())return!![];if(this['isLoopHorizontal']()||this[_0xeed885(0x203)]())return!![];const _0x2db704=VisuMZ[_0xeed885(0x248)]['RegExp'],_0x194af5=$dataMap['note']||'';return _0x194af5['match'](_0x2db704['NoReflection'])?!![]:![];},Game_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x217)]=function(){const _0x3474b6=_0x29f2e4,_0x2c3730=VisuMZ[_0x3474b6(0x248)][_0x3474b6(0x298)],_0x43dd5=$dataMap[_0x3474b6(0x219)]||'';if(_0x43dd5[_0x3474b6(0x1e8)](_0x2c3730[_0x3474b6(0x29b)]))return String(RegExp['$1'])[_0x3474b6(0x19d)](',')[_0x3474b6(0x1ac)](_0x59b23a=>Number(_0x59b23a)||0x1)[_0x3474b6(0x29a)](0x0);return JsonEx['makeDeepCopy'](Game_Map['DEFAULT_WATER_REFLECTION_REGIONS'])[_0x3474b6(0x29a)](0x0);},Game_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x263)]=function(){const _0x2787e6=_0x29f2e4,_0x5f6b40=VisuMZ[_0x2787e6(0x248)][_0x2787e6(0x298)],_0xe5a6f0=$dataMap[_0x2787e6(0x219)]||'';if(_0xe5a6f0['match'](_0x5f6b40[_0x2787e6(0x256)]))return String(RegExp['$1'])[_0x2787e6(0x19d)](',')['map'](_0x8b4853=>Number(_0x8b4853)||0x1)['remove'](0x0);return JsonEx[_0x2787e6(0x271)](Game_Map['DEFAULT_WATER_REFLECTION_TERRAINTAGS'])[_0x2787e6(0x29a)](0x0);},Game_Map[_0x29f2e4(0x1b0)]=VisuMZ[_0x29f2e4(0x248)]['Settings'][_0x29f2e4(0x267)]['Top'],Game_Map['DEFAULT_WATER_REFLECTION_FILTER_BLUR']=VisuMZ['VisualParallaxes'][_0x29f2e4(0x26a)][_0x29f2e4(0x267)][_0x29f2e4(0x250)],Game_Map['DEFAULT_WATER_REFLECTION_FILTER_OPACITY']=VisuMZ[_0x29f2e4(0x248)][_0x29f2e4(0x26a)]['WaterReflect']['Opacity'],Game_Map[_0x29f2e4(0x23d)]=VisuMZ[_0x29f2e4(0x248)][_0x29f2e4(0x26a)][_0x29f2e4(0x267)][_0x29f2e4(0x235)],Game_Map['DEFAULT_WATER_REFLECTION_FILTER_AMPLITUDE']=[VisuMZ[_0x29f2e4(0x248)][_0x29f2e4(0x26a)]['WaterReflect'][_0x29f2e4(0x23f)],VisuMZ[_0x29f2e4(0x248)][_0x29f2e4(0x26a)][_0x29f2e4(0x267)][_0x29f2e4(0x194)]],Game_Map[_0x29f2e4(0x1be)]=[VisuMZ[_0x29f2e4(0x248)][_0x29f2e4(0x26a)][_0x29f2e4(0x267)][_0x29f2e4(0x18b)],VisuMZ['VisualParallaxes']['Settings'][_0x29f2e4(0x267)][_0x29f2e4(0x21c)]],Game_Map[_0x29f2e4(0x23b)]['getWaterReflectionTop']=function(){const _0xc51fe6=_0x29f2e4,_0x1c74b0=VisuMZ[_0xc51fe6(0x248)][_0xc51fe6(0x298)],_0x587e0b=$dataMap['note']||'';if(_0x587e0b[_0xc51fe6(0x1e8)](_0x1c74b0[_0xc51fe6(0x1cc)]))return!![];else{if(_0x587e0b['match'](_0x1c74b0[_0xc51fe6(0x1e3)]))return![];}return Game_Map[_0xc51fe6(0x1b0)];},Game_Map[_0x29f2e4(0x23b)]['getWaterReflectionBlur']=function(){const _0x58eea8=_0x29f2e4,_0x390e3d=VisuMZ[_0x58eea8(0x248)][_0x58eea8(0x298)],_0x256d9d=$dataMap[_0x58eea8(0x219)]||'';if(_0x256d9d[_0x58eea8(0x1e8)](_0x390e3d[_0x58eea8(0x2a1)]))return Math[_0x58eea8(0x27d)](0x0,Number(RegExp['$1'])||0x0);return Game_Map['DEFAULT_WATER_REFLECTION_FILTER_BLUR'];},Game_Map['prototype'][_0x29f2e4(0x22f)]=function(){const _0x124e65=_0x29f2e4,_0x675785=VisuMZ['VisualParallaxes'][_0x124e65(0x298)],_0x1a8a2=$dataMap[_0x124e65(0x219)]||'';if(_0x1a8a2['match'](_0x675785[_0x124e65(0x206)]))return Math[_0x124e65(0x257)]((Number(RegExp['$1'])||0x0)*0.01*0xff)['clamp'](0x0,0xff);else{if(_0x1a8a2['match'](_0x675785[_0x124e65(0x1cd)]))return(Number(RegExp['$1'])||0x0)[_0x124e65(0x1c8)](0x0,0xff);}return Game_Map[_0x124e65(0x1b4)];},Game_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x1c0)]=function(){const _0x5d9766=_0x29f2e4,_0x3f414a=VisuMZ[_0x5d9766(0x248)][_0x5d9766(0x298)],_0x27d70b=$dataMap[_0x5d9766(0x219)]||'';if(_0x27d70b['match'](_0x3f414a[_0x5d9766(0x278)]))return(Number(RegExp['$1'])||0x0)[_0x5d9766(0x1c8)](0x0,0x1);return Game_Map[_0x5d9766(0x23d)];},Game_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x1ca)]=function(){const _0x4b1917=_0x29f2e4,_0x26da7b=VisuMZ[_0x4b1917(0x248)][_0x4b1917(0x298)],_0x1e9097=$dataMap[_0x4b1917(0x219)]||'';if(_0x1e9097[_0x4b1917(0x1e8)](_0x26da7b[_0x4b1917(0x1ff)])){const _0x3e9bc2=String(RegExp['$1'])[_0x4b1917(0x19d)](',')[_0x4b1917(0x1ac)](_0x516711=>Number(_0x516711)||0x0);if(_0x3e9bc2['length']<=0x1)_0x3e9bc2[0x1]=_0x3e9bc2[0x0];}return JsonEx[_0x4b1917(0x271)](Game_Map[_0x4b1917(0x18c)])[_0x4b1917(0x29a)](0x0);},Game_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x207)]=function(){const _0x51595f=_0x29f2e4,_0x51f241=VisuMZ[_0x51595f(0x248)][_0x51595f(0x298)],_0x4a6916=$dataMap[_0x51595f(0x219)]||'';if(_0x4a6916[_0x51595f(0x1e8)](_0x51f241[_0x51595f(0x1ff)])){const _0x7a97f9=String(RegExp['$1'])[_0x51595f(0x19d)](',')[_0x51595f(0x1ac)](_0x197707=>Number(_0x197707)||0x0);if(_0x7a97f9[_0x51595f(0x18d)]<=0x1)_0x7a97f9[0x1]=_0x7a97f9[0x0];}return JsonEx[_0x51595f(0x271)](Game_Map[_0x51595f(0x1be)])[_0x51595f(0x29a)](0x0);},Game_Map[_0x29f2e4(0x1ef)]=VisuMZ[_0x29f2e4(0x248)]['Settings'][_0x29f2e4(0x222)][_0x29f2e4(0x297)],Game_Map[_0x29f2e4(0x283)]=VisuMZ[_0x29f2e4(0x248)][_0x29f2e4(0x26a)]['SolidReflect'][_0x29f2e4(0x274)],Game_Map['prototype'][_0x29f2e4(0x1d2)]=function(){const _0x3de42b=_0x29f2e4,_0x30f365=VisuMZ[_0x3de42b(0x248)][_0x3de42b(0x298)],_0x2cef2a=$dataMap[_0x3de42b(0x219)]||'';if(_0x2cef2a[_0x3de42b(0x1e8)](_0x30f365[_0x3de42b(0x243)]))return String(RegExp['$1'])[_0x3de42b(0x19d)](',')[_0x3de42b(0x1ac)](_0x3f4e10=>Number(_0x3f4e10)||0x1)[_0x3de42b(0x29a)](0x0);return JsonEx[_0x3de42b(0x271)](Game_Map[_0x3de42b(0x1ef)])[_0x3de42b(0x29a)](0x0);},Game_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x1d3)]=function(){const _0xc74744=_0x29f2e4,_0x16f757=VisuMZ['VisualParallaxes'][_0xc74744(0x298)],_0x1063fa=$dataMap[_0xc74744(0x219)]||'';if(_0x1063fa[_0xc74744(0x1e8)](_0x16f757['SolidTerrainTags']))return String(RegExp['$1'])[_0xc74744(0x19d)](',')[_0xc74744(0x1ac)](_0x4f3cdf=>Number(_0x4f3cdf)||0x1)[_0xc74744(0x29a)](0x0);return JsonEx[_0xc74744(0x271)](Game_Map[_0xc74744(0x283)])[_0xc74744(0x29a)](0x0);},Game_Map[_0x29f2e4(0x1f2)]=VisuMZ[_0x29f2e4(0x248)][_0x29f2e4(0x26a)][_0x29f2e4(0x222)][_0x29f2e4(0x1ee)],Game_Map[_0x29f2e4(0x27f)]=VisuMZ[_0x29f2e4(0x248)][_0x29f2e4(0x26a)]['SolidReflect'][_0x29f2e4(0x250)],Game_Map[_0x29f2e4(0x1b4)]=VisuMZ['VisualParallaxes'][_0x29f2e4(0x26a)][_0x29f2e4(0x222)][_0x29f2e4(0x1a2)],Game_Map[_0x29f2e4(0x23b)]['getSolidReflectionTop']=function(){const _0x16db2c=_0x29f2e4,_0x114df2=VisuMZ[_0x16db2c(0x248)][_0x16db2c(0x298)],_0x1d3777=$dataMap[_0x16db2c(0x219)]||'';if(_0x1d3777[_0x16db2c(0x1e8)](_0x114df2[_0x16db2c(0x18e)]))return!![];else{if(_0x1d3777['match'](_0x114df2[_0x16db2c(0x1e5)]))return![];}return Game_Map['DEFAULT_SOLID_REFLECTION_FILTER_TOP'];},Game_Map['prototype'][_0x29f2e4(0x266)]=function(){const _0x4e4022=_0x29f2e4,_0x5783e7=VisuMZ[_0x4e4022(0x248)][_0x4e4022(0x298)],_0x1b7cb9=$dataMap['note']||'';if(_0x1b7cb9[_0x4e4022(0x1e8)](_0x5783e7[_0x4e4022(0x237)]))return Math[_0x4e4022(0x27d)](0x0,Number(RegExp['$1'])||0x0);return Game_Map[_0x4e4022(0x27f)];},Game_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x24c)]=function(){const _0x184593=_0x29f2e4,_0x1da764=VisuMZ[_0x184593(0x248)][_0x184593(0x298)],_0x874c12=$dataMap['note']||'';if(_0x874c12[_0x184593(0x1e8)](_0x1da764['SolidOpacityRate']))return Math['round']((Number(RegExp['$1'])||0x0)*0.01*0xff)[_0x184593(0x1c8)](0x0,0xff);else{if(_0x874c12[_0x184593(0x1e8)](_0x1da764[_0x184593(0x1b9)]))return(Number(RegExp['$1'])||0x0)['clamp'](0x0,0xff);}return Game_Map[_0x184593(0x1b4)];},Game_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x1fb)]=function(){const _0x1f788f=_0x29f2e4,_0x28eb3b=this[_0x1f788f(0x217)](),_0x1330ac=this[_0x1f788f(0x263)](),_0x2efe08=this[_0x1f788f(0x1d2)](),_0xd64705=this['getSolidReflectionTerrainTags'](),_0x2c6eb4=this[_0x1f788f(0x1b3)](),_0x1634cc=this['height']();this[_0x1f788f(0x1a8)]=![],this[_0x1f788f(0x272)]=![];const _0x404bf8=this[_0x1f788f(0x221)]();for(let _0x3da8cb=0x0;_0x3da8cb<_0x2c6eb4;_0x3da8cb++){for(let _0x182081=0x0;_0x182081<_0x1634cc;_0x182081++){const _0x5eb4e8=this[_0x1f788f(0x241)](_0x3da8cb,_0x182081);_0x28eb3b['includes'](_0x5eb4e8)&&(this[_0x1f788f(0x1a8)]=!![]);_0x2efe08[_0x1f788f(0x1b5)](_0x5eb4e8)&&(this['_hasSolidReflections']=!![]);const _0x289f7e=this['layeredTiles'](_0x3da8cb,_0x182081);for(const _0x2c5080 of _0x289f7e){if(_0x2c5080<0x400)continue;const _0x14fe66=_0x404bf8[_0x2c5080]>>0xc;_0x1330ac[_0x1f788f(0x1b5)](_0x14fe66)&&(this[_0x1f788f(0x1a8)]=!![]),_0xd64705[_0x1f788f(0x1b5)](_0x14fe66)&&(this['_hasSolidReflections']=!![]);}if(this['_hasWaterReflections']&&this[_0x1f788f(0x272)])break;}}},Game_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x26e)]=function(){const _0x4c0823=_0x29f2e4;if(this[_0x4c0823(0x1a8)]===undefined)this[_0x4c0823(0x1fb)]();return this[_0x4c0823(0x1a8)];},Game_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x1f1)]=function(){const _0xbcae9b=_0x29f2e4;if(this['_hasSolidReflections']===undefined)this[_0xbcae9b(0x1fb)]();return this[_0xbcae9b(0x272)];},Game_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x21d)]=function(){const _0x36e728=_0x29f2e4;this[_0x36e728(0x296)]=[null];if(!$dataMap)return;const _0xb86d20=VisuMZ[_0x36e728(0x248)][_0x36e728(0x1a9)]();for(const _0xdd2a34 of _0xb86d20){if(!_0xdd2a34)continue;this['_visualParallaxSettings'][_0xdd2a34['id']]=_0xdd2a34;}},VisuMZ[_0x29f2e4(0x248)][_0x29f2e4(0x1a9)]=function(){const _0xaa3388=_0x29f2e4;if(!$dataMap)return[];const _0x18f230=[],_0x3172a9=VisuMZ[_0xaa3388(0x248)]['TemplateSettings']();if(!$dataMap['note'])return[];const _0x4f3be6=VisuMZ[_0xaa3388(0x248)][_0xaa3388(0x298)],_0xd3e20=$dataMap[_0xaa3388(0x219)][_0xaa3388(0x19d)](/[\r\n]+/);let _0x21388f=JsonEx['makeDeepCopy'](_0x3172a9);for(const _0x14ee46 of _0xd3e20){if(_0x14ee46[_0xaa3388(0x1e8)](_0x4f3be6[_0xaa3388(0x286)])){_0x21388f['id']=Number(RegExp['$1']);if(_0x14ee46[_0xaa3388(0x1e8)](/WATER/i))_0x21388f[_0xaa3388(0x254)]=JsonEx[_0xaa3388(0x271)]($gameMap['getWaterReflectionRegions']()),_0x21388f[_0xaa3388(0x197)]=JsonEx['makeDeepCopy']($gameMap[_0xaa3388(0x263)]());else _0x14ee46[_0xaa3388(0x1e8)](/SOLID/i)&&(_0x21388f[_0xaa3388(0x254)]=JsonEx['makeDeepCopy']($gameMap[_0xaa3388(0x1d2)]()),_0x21388f[_0xaa3388(0x197)]=JsonEx[_0xaa3388(0x271)]($gameMap['getSolidReflectionTerrainTags']()));}else{if(_0x14ee46[_0xaa3388(0x1e8)](_0x4f3be6['End'])){const _0x5b8d70=Number(RegExp['$1']);if(_0x5b8d70>0x0&&_0x5b8d70===_0x21388f['id']&&_0x21388f[_0xaa3388(0x1bf)]!=='')_0x18f230[_0xaa3388(0x242)](_0x21388f);_0x21388f=JsonEx[_0xaa3388(0x271)](_0x3172a9);}else{if(_0x21388f['id']<=0x0)continue;}}if(_0x14ee46[_0xaa3388(0x1e8)](_0x4f3be6['Filename']))_0x21388f[_0xaa3388(0x1bf)]=String(RegExp['$1'])[_0xaa3388(0x1a3)](),_0x21388f['filename'][_0xaa3388(0x211)](0x0)==='!'&&(_0x21388f[_0xaa3388(0x24f)]=!![]);else{if(_0x14ee46['match'](_0x4f3be6['HorzLoop']))_0x21388f['_parallaxLoopX']=!![],_0x21388f[_0xaa3388(0x265)]=Number(RegExp['$1'])||0x0;else{if(_0x14ee46[_0xaa3388(0x1e8)](_0x4f3be6[_0xaa3388(0x225)]))_0x21388f[_0xaa3388(0x1fa)]=!![],_0x21388f['_parallaxSy']=Number(RegExp['$1'])||0x0;else{if(_0x14ee46[_0xaa3388(0x1e8)](_0x4f3be6['ScrollLock']))_0x21388f[_0xaa3388(0x24f)]=!![];else{if(_0x14ee46[_0xaa3388(0x1e8)](_0x4f3be6[_0xaa3388(0x1f5)])){const _0x5e6048=Number(RegExp['$1'])*0.01;_0x21388f['opacity']=Math['round'](_0x5e6048*0xff)[_0xaa3388(0x1c8)](0x0,0xff);}else{if(_0x14ee46[_0xaa3388(0x1e8)](_0x4f3be6['OpacityFlat']))_0x21388f[_0xaa3388(0x1a1)]=Number(RegExp['$1'])[_0xaa3388(0x1c8)](0x0,0xff);else{if(_0x14ee46[_0xaa3388(0x1e8)](_0x4f3be6[_0xaa3388(0x1c4)])){const _0x352334=String(RegExp['$1'])[_0xaa3388(0x236)]()[_0xaa3388(0x1a3)](),_0x511b14=[_0xaa3388(0x25e),'ADDITIVE',_0xaa3388(0x19c),_0xaa3388(0x2a3)];_0x21388f[_0xaa3388(0x21a)]=_0x511b14[_0xaa3388(0x27b)](_0x352334)[_0xaa3388(0x1c8)](0x0,0x3);}else{if(_0x14ee46[_0xaa3388(0x1e8)](_0x4f3be6[_0xaa3388(0x2a4)]))_0x21388f[_0xaa3388(0x260)]=Number(RegExp['$1'])[_0xaa3388(0x1c8)](0x0,0x168);else{if(_0x14ee46[_0xaa3388(0x1e8)](_0x4f3be6['HueShift']))_0x21388f[_0xaa3388(0x218)]=Number(RegExp['$1'])||0x0;else{if(_0x14ee46[_0xaa3388(0x1e8)](_0x4f3be6[_0xaa3388(0x1c9)])){const _0x12ec8d=String(RegExp['$1'])['split'](',')[_0xaa3388(0x1ac)](_0x4abc0a=>Number(_0x4abc0a)||0x0);while(_0x12ec8d['length']<0x4)_0x12ec8d[_0xaa3388(0x242)](0x0);_0x21388f[_0xaa3388(0x199)]=_0x12ec8d;}else{if(_0x14ee46[_0xaa3388(0x1e8)](_0x4f3be6[_0xaa3388(0x1eb)])){const _0x22f0c0=String(RegExp['$1'])[_0xaa3388(0x19d)](',')[_0xaa3388(0x1ac)](_0xcded17=>Number(_0xcded17)||0x1);_0x21388f[_0xaa3388(0x254)]=_0x22f0c0;}else{if(_0x14ee46[_0xaa3388(0x1e8)](_0x4f3be6[_0xaa3388(0x21f)])){const _0x2e2616=String(RegExp['$1'])[_0xaa3388(0x19d)](',')[_0xaa3388(0x1ac)](_0xaf9502=>Number(_0xaf9502)||0x1);_0x21388f[_0xaa3388(0x197)]=_0x2e2616;}}}}}}}}}}}}}return _0x18f230;},Game_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x208)]=function(){const _0x5d7d49=_0x29f2e4;return this[_0x5d7d49(0x296)]===undefined&&this[_0x5d7d49(0x21d)](),this[_0x5d7d49(0x296)][_0x5d7d49(0x240)](_0x3775e3=>!!_0x3775e3);},Game_Map['prototype'][_0x29f2e4(0x239)]=function(_0x5f254a){const _0x4f96d8=_0x29f2e4;return this['_visualParallaxSettings']=this[_0x4f96d8(0x296)]||[],this[_0x4f96d8(0x296)][_0x5f254a]||null;},Game_Map[_0x29f2e4(0x23b)]['getVisualParallaxOx']=function(_0x496124){const _0x1f8aae=_0x29f2e4,_0x1a7967=this[_0x1f8aae(0x239)](_0x496124);if(_0x1a7967[_0x1f8aae(0x24f)])return Math[_0x1f8aae(0x1ec)](_0x1a7967[_0x1f8aae(0x1a0)]*this[_0x1f8aae(0x24a)]());else return _0x1a7967[_0x1f8aae(0x1f8)]?_0x1a7967[_0x1f8aae(0x1a0)]*this[_0x1f8aae(0x24a)]()/0x2:0x0;},Game_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x1bb)]=function(_0x1afc45){const _0x4e1d68=_0x29f2e4,_0x21b17b=this['getVisualParallaxSettings'](_0x1afc45);if(_0x21b17b['_parallaxZero'])return Math['floor'](_0x21b17b[_0x4e1d68(0x29c)]*this['tileHeight']());else return _0x21b17b[_0x4e1d68(0x1fa)]?_0x21b17b['_parallaxY']*this['tileHeight']()/0x2:0x0;},Game_Map['prototype']['removeVisualParallax']=function(_0x2f6fb1){const _0x441272=_0x29f2e4;this['_visualParallaxSettings']=this[_0x441272(0x296)]||[];if(!this['_visualParallaxSettings'][_0x2f6fb1])return;this[_0x441272(0x296)][_0x2f6fb1]=null;const _0x3f093d=SceneManager[_0x441272(0x268)][_0x441272(0x228)];_0x3f093d&&_0x3f093d['removeVisualParallaxLayer'](_0x2f6fb1);},Game_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x1a4)]=function(_0x3dd65b){const _0x158a28=_0x29f2e4,_0x2465e8=_0x3dd65b['id'];_0x3dd65b[_0x158a28(0x1bf)][_0x158a28(0x211)](0x0)==='!'&&(_0x3dd65b[_0x158a28(0x24f)]=!![]);let _0x3d97af=![];this['_visualParallaxSettings']=this[_0x158a28(0x296)]||[];if(this[_0x158a28(0x296)][_0x2465e8]){const _0x44c1cf=this[_0x158a28(0x296)][_0x2465e8];if(!_0x44c1cf['maskRegions']['equals'](_0x3dd65b['maskRegions']))_0x3d97af=!![];else!_0x44c1cf[_0x158a28(0x197)][_0x158a28(0x279)](_0x3dd65b['maskTerrainTags'])&&(_0x3d97af=!![]);}this[_0x158a28(0x296)][_0x2465e8]=_0x3dd65b;if(!SceneManager[_0x158a28(0x1d4)]())return;const _0x28200c=SceneManager[_0x158a28(0x268)]['_spriteset'];_0x28200c&&_0x28200c[_0x158a28(0x29d)](_0x2465e8,_0x3d97af);},VisuMZ[_0x29f2e4(0x248)][_0x29f2e4(0x24e)]=Game_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x27a)],Game_Map[_0x29f2e4(0x23b)]['setDisplayPos']=function(_0x51b93b,_0x3f5b26){const _0x4de771=_0x29f2e4;VisuMZ[_0x4de771(0x248)][_0x4de771(0x24e)][_0x4de771(0x1ed)](this,_0x51b93b,_0x3f5b26);for(const _0x1e081f of this[_0x4de771(0x208)]()){if(!_0x1e081f)continue;this[_0x4de771(0x220)]()?_0x1e081f[_0x4de771(0x1a0)]=_0x51b93b:_0x1e081f[_0x4de771(0x1a0)]=this[_0x4de771(0x27c)],this[_0x4de771(0x203)]()?_0x1e081f['_parallaxY']=_0x3f5b26:_0x1e081f[_0x4de771(0x29c)]=this[_0x4de771(0x1fe)];}},VisuMZ[_0x29f2e4(0x248)][_0x29f2e4(0x226)]=Game_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x1e6)],Game_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x1e6)]=function(_0x19dbf6){const _0x4c0f24=_0x29f2e4,_0x4372f0=this['_displayX'];VisuMZ['VisualParallaxes'][_0x4c0f24(0x226)][_0x4c0f24(0x1ed)](this,_0x19dbf6);for(const _0x513e1c of this[_0x4c0f24(0x208)]()){if(!_0x513e1c)continue;if(this[_0x4c0f24(0x220)]())_0x513e1c[_0x4c0f24(0x1f8)]&&(_0x513e1c[_0x4c0f24(0x1a0)]-=_0x19dbf6);else this[_0x4c0f24(0x1b3)]()>=this[_0x4c0f24(0x1af)]()&&(_0x513e1c[_0x4c0f24(0x1a0)]+=this[_0x4c0f24(0x27c)]-_0x4372f0);}},VisuMZ['VisualParallaxes'][_0x29f2e4(0x215)]=Game_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x23c)],Game_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x23c)]=function(_0x1e06cc){const _0x166a0e=_0x29f2e4,_0x56855a=this['_displayX'];VisuMZ['VisualParallaxes']['Game_Map_scrollRight'][_0x166a0e(0x1ed)](this,_0x1e06cc);for(const _0x139b9a of this[_0x166a0e(0x208)]()){if(!_0x139b9a)continue;if(this[_0x166a0e(0x220)]())_0x139b9a[_0x166a0e(0x1f8)]&&(_0x139b9a['_parallaxX']+=_0x1e06cc);else this[_0x166a0e(0x1b3)]()>=this[_0x166a0e(0x1af)]()&&(_0x139b9a['_parallaxX']+=this[_0x166a0e(0x27c)]-_0x56855a);}},VisuMZ[_0x29f2e4(0x248)][_0x29f2e4(0x276)]=Game_Map['prototype'][_0x29f2e4(0x198)],Game_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x198)]=function(_0x4c6b65){const _0x4678bd=_0x29f2e4,_0x2f081a=this[_0x4678bd(0x1fe)];VisuMZ[_0x4678bd(0x248)]['Game_Map_scrollDown'][_0x4678bd(0x1ed)](this,_0x4c6b65);for(const _0xba74e9 of this[_0x4678bd(0x208)]()){if(!_0xba74e9)continue;if(this[_0x4678bd(0x203)]())_0xba74e9[_0x4678bd(0x1fa)]&&(_0xba74e9['_parallaxY']+=_0x4c6b65);else this[_0x4678bd(0x1f3)]()>=this['screenTileY']()&&(_0xba74e9['_parallaxY']+=this[_0x4678bd(0x1fe)]-_0x2f081a);}},VisuMZ['VisualParallaxes'][_0x29f2e4(0x1e4)]=Game_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x261)],Game_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x261)]=function(_0x266361){const _0x2c7457=_0x29f2e4,_0x4b31f4=this['_displayY'];VisuMZ[_0x2c7457(0x248)][_0x2c7457(0x1e4)][_0x2c7457(0x1ed)](this,_0x266361);for(const _0x151a24 of this[_0x2c7457(0x208)]()){if(!_0x151a24)continue;if(this[_0x2c7457(0x203)]())_0x151a24[_0x2c7457(0x1fa)]&&(_0x151a24[_0x2c7457(0x29c)]-=_0x266361);else this[_0x2c7457(0x1f3)]()>=this[_0x2c7457(0x1e0)]()&&(_0x151a24['_parallaxY']+=this[_0x2c7457(0x1fe)]-_0x4b31f4);}},VisuMZ[_0x29f2e4(0x248)][_0x29f2e4(0x214)]=Game_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x288)],Game_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x288)]=function(){const _0x3b928b=_0x29f2e4;VisuMZ[_0x3b928b(0x248)][_0x3b928b(0x214)]['call'](this);for(const _0x462657 of this[_0x3b928b(0x208)]()){if(!_0x462657)continue;this[_0x3b928b(0x224)](_0x462657);}},Game_Map[_0x29f2e4(0x23b)]['updateVisualParallaxSettings']=function(_0x29c109){const _0x1776f1=_0x29f2e4;_0x29c109[_0x1776f1(0x1f8)]&&(_0x29c109['_parallaxX']+=_0x29c109[_0x1776f1(0x265)]/this[_0x1776f1(0x24a)]()/0x2);_0x29c109[_0x1776f1(0x1fa)]&&(_0x29c109['_parallaxY']+=_0x29c109['_parallaxSy']/this[_0x1776f1(0x1b8)]()/0x2);_0x29c109['hue']+=_0x29c109['hueShift'];if(_0x29c109[_0x1776f1(0x292)]>0x0){const _0x4fa0bb=_0x29c109[_0x1776f1(0x292)];_0x29c109[_0x1776f1(0x1a1)]=(_0x29c109['opacity']*(_0x4fa0bb-0x1)+_0x29c109[_0x1776f1(0x1b6)])/_0x4fa0bb,_0x29c109[_0x1776f1(0x292)]--;}},VisuMZ[_0x29f2e4(0x248)]['Game_Event_clearPageSettings']=Game_Event[_0x29f2e4(0x23b)][_0x29f2e4(0x281)],Game_Event['prototype'][_0x29f2e4(0x281)]=function(){const _0x3eee63=_0x29f2e4;VisuMZ[_0x3eee63(0x248)][_0x3eee63(0x293)][_0x3eee63(0x1ed)](this),this[_0x3eee63(0x192)]();},VisuMZ[_0x29f2e4(0x248)]['Game_Event_setupPageSettings']=Game_Event[_0x29f2e4(0x23b)]['setupPageSettings'],Game_Event['prototype'][_0x29f2e4(0x246)]=function(){const _0x848ccb=_0x29f2e4;VisuMZ['VisualParallaxes']['Game_Event_setupPageSettings'][_0x848ccb(0x1ed)](this),this[_0x848ccb(0x28d)]();},Game_Event[_0x29f2e4(0x23b)][_0x29f2e4(0x28d)]=function(){const _0x2d9c45=_0x29f2e4;if(!this['event']())return;this[_0x2d9c45(0x192)](),this['setupVisualParallaxesNotetags'](),this['setupVisualParallaxesCommentTags']();},Game_Event[_0x29f2e4(0x23b)][_0x29f2e4(0x238)]=function(){const _0x22c803=_0x29f2e4,_0x51fc02=this['event']()[_0x22c803(0x219)];if(_0x51fc02==='')return;this[_0x22c803(0x264)](_0x51fc02);},Game_Event[_0x29f2e4(0x23b)][_0x29f2e4(0x1ae)]=function(){const _0x2fa8c4=_0x29f2e4;if(!this['page']())return;const _0x2da432=this[_0x2fa8c4(0x26c)]();let _0x7c3e6d='';for(const _0x3f8ef6 of _0x2da432){if([0x6c,0x198]['includes'](_0x3f8ef6[_0x2fa8c4(0x1d1)])){if(_0x7c3e6d!=='')_0x7c3e6d+='\x0a';_0x7c3e6d+=_0x3f8ef6['parameters'][0x0];}}this[_0x2fa8c4(0x264)](_0x7c3e6d);},Game_Event['prototype'][_0x29f2e4(0x192)]=function(){this['_noReflection']=![];},Game_Event[_0x29f2e4(0x23b)][_0x29f2e4(0x264)]=function(_0x1b3c77){const _0x1d4bf2=_0x29f2e4,_0x2df9ff=VisuMZ['VisualParallaxes'][_0x1d4bf2(0x298)];_0x1b3c77[_0x1d4bf2(0x1e8)](_0x2df9ff[_0x1d4bf2(0x1cb)])&&(this[_0x1d4bf2(0x247)]=!![]);};function Sprite_VisualParallax(){const _0x32fc73=_0x29f2e4;this[_0x32fc73(0x227)](...arguments);}Sprite_VisualParallax[_0x29f2e4(0x23b)]=Object[_0x29f2e4(0x22c)](TilingSprite[_0x29f2e4(0x23b)]),Sprite_VisualParallax['prototype']['constructor']=Sprite_VisualParallax,Sprite_VisualParallax[_0x29f2e4(0x23b)][_0x29f2e4(0x227)]=function(_0x57a401){const _0x3cafe1=_0x29f2e4;this[_0x3cafe1(0x22b)]=_0x57a401,TilingSprite['prototype'][_0x3cafe1(0x227)][_0x3cafe1(0x1ed)](this),this[_0x3cafe1(0x251)](),this[_0x3cafe1(0x196)](),this[_0x3cafe1(0x19e)][_0x3cafe1(0x1f4)](this['createMaskSprite'][_0x3cafe1(0x1da)](this));},Sprite_VisualParallax[_0x29f2e4(0x23b)][_0x29f2e4(0x202)]=function(){const _0x3bde8c=_0x29f2e4;return $gameMap[_0x3bde8c(0x239)](this[_0x3bde8c(0x22b)]);},Sprite_VisualParallax[_0x29f2e4(0x23b)][_0x29f2e4(0x251)]=function(){const _0x50a340=_0x29f2e4;this[_0x50a340(0x277)]=0x0,this[_0x50a340(0x28b)]=[0x0,0x0,0x0,0x0],this['_colorFilter']=new ColorFilter(),!this['filters']&&(this[_0x50a340(0x1c5)]=[]),this[_0x50a340(0x1c5)]['push'](this[_0x50a340(0x25a)]);},Sprite_VisualParallax[_0x29f2e4(0x23b)][_0x29f2e4(0x289)]=function(){const _0x2047c2=_0x29f2e4;!this[_0x2047c2(0x25a)]&&this['_createColorFilter'](),this[_0x2047c2(0x25a)]['setHue'](this[_0x2047c2(0x277)]),this[_0x2047c2(0x25a)][_0x2047c2(0x295)](this['_colorTone']);},Sprite_VisualParallax[_0x29f2e4(0x23b)][_0x29f2e4(0x196)]=function(){const _0x5556b7=_0x29f2e4;this[_0x5556b7(0x280)]=this[_0x5556b7(0x202)]()[_0x5556b7(0x1bf)],this[_0x5556b7(0x19e)]=ImageManager[_0x5556b7(0x191)](this[_0x5556b7(0x280)]);},Sprite_VisualParallax[_0x29f2e4(0x23b)][_0x29f2e4(0x1db)]=function(){const _0x505a86=_0x29f2e4;this[_0x505a86(0x1e9)]=new Sprite(),this[_0x505a86(0x1c3)]();},Sprite_VisualParallax[_0x29f2e4(0x23b)][_0x29f2e4(0x1c3)]=function(){const _0x583b9b=_0x29f2e4;this[_0x583b9b(0x1e9)][_0x583b9b(0x19e)]&&(this[_0x583b9b(0x1e9)][_0x583b9b(0x19e)][_0x583b9b(0x1a5)](),this[_0x583b9b(0x223)](this[_0x583b9b(0x1e9)]));const _0x3b1bb9=new Bitmap(Graphics['width'],Graphics[_0x583b9b(0x1f3)]);_0x3b1bb9[_0x583b9b(0x29f)](0x0,0x0,_0x3b1bb9[_0x583b9b(0x1b3)],_0x3b1bb9['height'],_0x583b9b(0x28a)),this[_0x583b9b(0x1e9)][_0x583b9b(0x19e)]=_0x3b1bb9,this[_0x583b9b(0x232)](this[_0x583b9b(0x1e9)]),this['_maskFilter']=new PIXI[(_0x583b9b(0x1ad))](this[_0x583b9b(0x1e9)]),this[_0x583b9b(0x1c5)][_0x583b9b(0x242)](this[_0x583b9b(0x1d9)]);const _0x5a35d9=this[_0x583b9b(0x202)]()[_0x583b9b(0x254)],_0x4ddf46=this[_0x583b9b(0x202)]()[_0x583b9b(0x197)];if(_0x5a35d9[_0x583b9b(0x18d)]<=0x0&&_0x4ddf46[_0x583b9b(0x18d)]<=0x0)return;if($gameMap[_0x583b9b(0x220)]()||$gameMap[_0x583b9b(0x203)]())return;const _0xe99ae9=$gameMap[_0x583b9b(0x1b3)](),_0x3edf19=$gameMap[_0x583b9b(0x1f3)](),_0x5946e4=$gameMap[_0x583b9b(0x24a)](),_0x4e3646=$gameMap[_0x583b9b(0x1b8)]();this[_0x583b9b(0x1e9)][_0x583b9b(0x19e)]=new Bitmap(_0xe99ae9*_0x5946e4,_0x3edf19*_0x4e3646);for(let _0x115e43=0x0;_0x115e43<_0xe99ae9;_0x115e43++){for(let _0x42e2d6=0x0;_0x42e2d6<_0x3edf19;_0x42e2d6++){const _0x398790=$gameMap[_0x583b9b(0x241)](_0x115e43,_0x42e2d6);(_0x5a35d9['includes'](_0x398790)||_0x4ddf46[_0x583b9b(0x1b5)]($gameMap[_0x583b9b(0x1ea)](_0x115e43,_0x42e2d6)))&&(this['_maskSprite']['bitmap'][_0x583b9b(0x29f)](_0x115e43*_0x5946e4,_0x42e2d6*_0x4e3646,_0x5946e4,_0x4e3646,_0x583b9b(0x28a)),Imported[_0x583b9b(0x26f)]&&SceneManager['_scene'][_0x583b9b(0x1cf)][_0x583b9b(0x242)](_0x398790));}}},Sprite_VisualParallax[_0x29f2e4(0x23b)][_0x29f2e4(0x230)]=function(){const _0x47d528=_0x29f2e4;TilingSprite[_0x47d528(0x23b)][_0x47d528(0x230)][_0x47d528(0x1ed)](this);if(!this[_0x47d528(0x19e)])return;if(!this[_0x47d528(0x202)]())return;this['updateOpacity'](),this['updateOrigin'](),this['updateBlendMode'](),this[_0x47d528(0x1fd)](),this[_0x47d528(0x26d)](),this[_0x47d528(0x213)]();},Sprite_VisualParallax['prototype'][_0x29f2e4(0x262)]=function(){const _0x5a11c4=_0x29f2e4;this[_0x5a11c4(0x1a1)]=this[_0x5a11c4(0x202)]()['opacity'];},Sprite_VisualParallax[_0x29f2e4(0x23b)][_0x29f2e4(0x20f)]=function(){const _0x1d51fd=_0x29f2e4;this[_0x1d51fd(0x21e)]['x']=$gameMap['getVisualParallaxOx'](this[_0x1d51fd(0x22b)]),this[_0x1d51fd(0x21e)]['y']=$gameMap['getVisualParallaxOy'](this[_0x1d51fd(0x22b)]);},Sprite_VisualParallax['prototype']['updateBlendMode']=function(){const _0x28a7c2=_0x29f2e4;this[_0x28a7c2(0x1d9)]&&(this[_0x28a7c2(0x1d9)][_0x28a7c2(0x21a)]=this[_0x28a7c2(0x202)]()[_0x28a7c2(0x21a)]);},Sprite_VisualParallax[_0x29f2e4(0x23b)][_0x29f2e4(0x1fd)]=function(){const _0x111a18=_0x29f2e4;this[_0x111a18(0x252)](this[_0x111a18(0x202)]()[_0x111a18(0x260)]);},Sprite_VisualParallax[_0x29f2e4(0x23b)]['setHue']=function(_0x3ce56a){const _0x364b7a=_0x29f2e4;this['_hue']!==Number(_0x3ce56a)&&(this['_hue']=Number(_0x3ce56a),this[_0x364b7a(0x289)]());},Sprite_VisualParallax[_0x29f2e4(0x23b)][_0x29f2e4(0x26d)]=function(){const _0x551ad5=_0x29f2e4;this[_0x551ad5(0x295)](this['settings']()[_0x551ad5(0x199)]);},Sprite_VisualParallax['prototype'][_0x29f2e4(0x295)]=function(_0x5a66fc){const _0x35318d=_0x29f2e4;if(!(_0x5a66fc instanceof Array))throw new Error(_0x35318d(0x229));!this[_0x35318d(0x28b)]['equals'](_0x5a66fc)&&(this[_0x35318d(0x28b)]=_0x5a66fc['clone'](),this[_0x35318d(0x289)]());},Sprite_VisualParallax[_0x29f2e4(0x23b)][_0x29f2e4(0x213)]=function(){const _0x4b583a=_0x29f2e4;if(!this[_0x4b583a(0x1e9)])return;const _0x5a9f18=this[_0x4b583a(0x202)]()[_0x4b583a(0x254)],_0x1f008d=this[_0x4b583a(0x202)]()[_0x4b583a(0x197)];if(_0x5a9f18[_0x4b583a(0x18d)]<=0x0&&_0x1f008d[_0x4b583a(0x18d)]<=0x0)return;if($gameMap['isLoopHorizontal']()||$gameMap[_0x4b583a(0x203)]())return;this[_0x4b583a(0x1e9)]['x']=Math[_0x4b583a(0x1ec)](-$gameMap[_0x4b583a(0x290)]()*$gameMap[_0x4b583a(0x24a)]()),this[_0x4b583a(0x1e9)]['y']=Math[_0x4b583a(0x1ec)](-$gameMap[_0x4b583a(0x1c6)]()*$gameMap[_0x4b583a(0x1b8)]());};function _0x396b(_0x2a97e0,_0x44b245){const _0x181096=_0x1810();return _0x396b=function(_0x396b7a,_0x1dde16){_0x396b7a=_0x396b7a-0x18b;let _0x453f90=_0x181096[_0x396b7a];return _0x453f90;},_0x396b(_0x2a97e0,_0x44b245);}function Sprite_ReflectionCharacter(){this['initialize'](...arguments);}Sprite_ReflectionCharacter[_0x29f2e4(0x23b)]=Object[_0x29f2e4(0x22c)](Sprite_Character[_0x29f2e4(0x23b)]),Sprite_ReflectionCharacter['prototype'][_0x29f2e4(0x231)]=Sprite_ReflectionCharacter,Sprite_ReflectionCharacter[_0x29f2e4(0x23b)][_0x29f2e4(0x1c1)]=function(_0x48bc6c){},Sprite_ReflectionCharacter[_0x29f2e4(0x23b)]['update']=function(){const _0x96ba03=_0x29f2e4;Sprite_Character[_0x96ba03(0x23b)][_0x96ba03(0x230)][_0x96ba03(0x1ed)](this);},Sprite_ReflectionCharacter[_0x29f2e4(0x23b)][_0x29f2e4(0x1f0)]=function(){const _0x3e12a6=_0x29f2e4;this[_0x3e12a6(0x193)]['x']=this[_0x3e12a6(0x28f)][_0x3e12a6(0x1de)],this[_0x3e12a6(0x193)]['y']=-this[_0x3e12a6(0x28f)]['_scaleY'];},VisuMZ['VisualParallaxes'][_0x29f2e4(0x1aa)]=Spriteset_Map[_0x29f2e4(0x23b)]['createParallax'],Spriteset_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x22a)]=function(){const _0x453236=_0x29f2e4;VisuMZ[_0x453236(0x248)][_0x453236(0x1aa)][_0x453236(0x1ed)](this);if(!$gameMap[_0x453236(0x1e7)]())this[_0x453236(0x1dd)]();if(!$gameMap[_0x453236(0x1d2)]())this['createSolidReflectionLayer']();this[_0x453236(0x1e2)](),this['createParallaxLayers'](),this[_0x453236(0x287)]();if($gameMap[_0x453236(0x1e7)]())this[_0x453236(0x1dd)]();if($gameMap['getSolidReflectionRegions']())this[_0x453236(0x2a8)]();},Spriteset_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x1dd)]=function(){const _0x51bed9=_0x29f2e4;if(!PIXI[_0x51bed9(0x1c5)])return;if($gameMap[_0x51bed9(0x220)]()||$gameMap['isLoopVertical']())return;if($gameMap['noReflections']())return;this[_0x51bed9(0x294)]=new Sprite(),this[_0x51bed9(0x201)]=new Sprite(),this[_0x51bed9(0x25c)]=![],this[_0x51bed9(0x2a2)]['addChild'](this[_0x51bed9(0x294)]),this[_0x51bed9(0x294)][_0x51bed9(0x1c5)]=[],this['_waterReflectLayer'][_0x51bed9(0x1a1)]=$gameMap['getWaterReflectionOpacity'](),!!PIXI[_0x51bed9(0x1c5)][_0x51bed9(0x234)]&&(this[_0x51bed9(0x294)][_0x51bed9(0x200)]=new PIXI[(_0x51bed9(0x1c5))][(_0x51bed9(0x234))]({'boundary':$gameMap[_0x51bed9(0x1c0)](),'amplitude':$gameMap['getWaterReflectionAmplitude'](),'waveLength':$gameMap[_0x51bed9(0x207)](),'mirror':![]})),!!PIXI['filters'][_0x51bed9(0x190)]&&(this['_waterReflectLayer']['_blurFilter']=new PIXI[(_0x51bed9(0x1c5))]['BlurFilter']($gameMap['getWaterReflectionBlur']()),this[_0x51bed9(0x294)][_0x51bed9(0x1c5)]['push'](this[_0x51bed9(0x294)][_0x51bed9(0x23e)])),this[_0x51bed9(0x1f7)]();},Spriteset_Map['prototype'][_0x29f2e4(0x1f7)]=function(){const _0x3327b8=_0x29f2e4,_0x265b4e=$gameMap['getWaterReflectionRegions'](),_0x12631a=$gameMap[_0x3327b8(0x263)](),_0xe82e16=this[_0x3327b8(0x28e)](_0x265b4e,_0x12631a);_0xe82e16&&(this[_0x3327b8(0x232)](_0xe82e16),this[_0x3327b8(0x294)]['mask']=_0xe82e16);},Spriteset_Map[_0x29f2e4(0x23b)]['createSolidReflectionLayer']=function(){const _0x5612f7=_0x29f2e4;if(!PIXI['filters'])return;if($gameMap[_0x5612f7(0x220)]()||$gameMap[_0x5612f7(0x203)]())return;if($gameMap[_0x5612f7(0x1f6)]())return;this[_0x5612f7(0x249)]=new Sprite(),this[_0x5612f7(0x1b1)]=new Sprite(),this[_0x5612f7(0x233)]=![],this[_0x5612f7(0x2a2)][_0x5612f7(0x232)](this['_solidReflectLayer']),this[_0x5612f7(0x249)][_0x5612f7(0x1c5)]=[],this[_0x5612f7(0x249)]['opacity']=$gameMap['getSolidReflectionOpacity'](),!!PIXI[_0x5612f7(0x1c5)][_0x5612f7(0x190)]&&(this[_0x5612f7(0x249)][_0x5612f7(0x23e)]=new PIXI[(_0x5612f7(0x1c5))]['BlurFilter']($gameMap['getSolidReflectionBlur']()),this[_0x5612f7(0x249)][_0x5612f7(0x1c5)][_0x5612f7(0x242)](this['_solidReflectLayer'][_0x5612f7(0x23e)])),this['createSolidReflectionMask']();},Spriteset_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x291)]=function(){const _0x5cea78=_0x29f2e4,_0x3b3f53=$gameMap[_0x5cea78(0x1d2)](),_0x388664=$gameMap['getSolidReflectionTerrainTags'](),_0x251de4=this[_0x5cea78(0x28e)](_0x3b3f53,_0x388664);_0x251de4&&(this[_0x5cea78(0x232)](_0x251de4),this['_solidReflectLayer']['mask']=_0x251de4);},Spriteset_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x28e)]=function(_0x514276,_0x215389){const _0x9c076c=_0x29f2e4;if(_0x514276[_0x9c076c(0x18d)]<=0x0&&_0x215389[_0x9c076c(0x18d)]<=0x0)return null;const _0x3abb6e=$gameMap[_0x9c076c(0x1b3)](),_0xf41530=$gameMap[_0x9c076c(0x1f3)](),_0x5d18f5=$gameMap[_0x9c076c(0x24a)](),_0x1626ce=$gameMap[_0x9c076c(0x1b8)](),_0x21005a=0x0,_0x27408d=_0x21005a*0x2,_0xda8b2e=new Sprite();_0xda8b2e[_0x9c076c(0x19e)]=new Bitmap(_0x3abb6e*_0x5d18f5,_0xf41530*_0x1626ce);for(let _0x19b51c=0x0;_0x19b51c<_0x3abb6e;_0x19b51c++){for(let _0x1afe97=0x0;_0x1afe97<_0xf41530;_0x1afe97++){const _0x173fe4=$gameMap[_0x9c076c(0x241)](_0x19b51c,_0x1afe97);(_0x514276[_0x9c076c(0x1b5)](_0x173fe4)||_0x215389[_0x9c076c(0x1b5)]($gameMap['terrainTag'](_0x19b51c,_0x1afe97)))&&(_0xda8b2e['bitmap'][_0x9c076c(0x29f)](_0x19b51c*_0x5d18f5+_0x21005a,_0x1afe97*_0x1626ce+_0x21005a,_0x5d18f5-_0x27408d,_0x1626ce-_0x27408d,'#ffffff'),Imported[_0x9c076c(0x26f)]&&SceneManager['_scene'][_0x9c076c(0x1cf)][_0x9c076c(0x242)](_0x173fe4));}}return _0xda8b2e;},VisuMZ[_0x29f2e4(0x248)][_0x29f2e4(0x1d5)]=Spriteset_Map['prototype'][_0x29f2e4(0x20e)],Spriteset_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x20e)]=function(){const _0x1f3e60=_0x29f2e4;VisuMZ[_0x1f3e60(0x248)]['Spriteset_Map_createCharacters'][_0x1f3e60(0x1ed)](this),this[_0x1f3e60(0x25b)]();},Spriteset_Map['prototype']['createCharacterReflections']=function(){const _0x45a4c0=_0x29f2e4;if($gameMap[_0x45a4c0(0x1f6)]())return;const _0x5b4d23=[],_0x240f82=[];for(const _0x562855 of $gameMap['events']()){if(_0x562855['_noReflection'])continue;_0x5b4d23[_0x45a4c0(0x242)](new Sprite_ReflectionCharacter(_0x562855)),_0x240f82[_0x45a4c0(0x242)](new Sprite_ReflectionCharacter(_0x562855));}for(const _0x3d7e4e of $gameMap[_0x45a4c0(0x259)]()){_0x5b4d23[_0x45a4c0(0x242)](new Sprite_ReflectionCharacter(_0x3d7e4e)),_0x240f82[_0x45a4c0(0x242)](new Sprite_ReflectionCharacter(_0x3d7e4e));}for(const _0x515875 of $gamePlayer['followers']()[_0x45a4c0(0x1bc)]()){_0x5b4d23[_0x45a4c0(0x242)](new Sprite_ReflectionCharacter(_0x515875)),_0x240f82[_0x45a4c0(0x242)](new Sprite_ReflectionCharacter(_0x515875));}_0x5b4d23[_0x45a4c0(0x242)](new Sprite_ReflectionCharacter($gamePlayer)),_0x240f82['push'](new Sprite_ReflectionCharacter($gamePlayer));if(this[_0x45a4c0(0x294)])for(const _0x736dc0 of _0x5b4d23){_0x736dc0['_reflection']=!![],this[_0x45a4c0(0x201)][_0x45a4c0(0x232)](_0x736dc0),_0x736dc0[_0x45a4c0(0x193)]['y']=-0.85,_0x736dc0['filters']=_0x736dc0[_0x45a4c0(0x1c5)]||[],this[_0x45a4c0(0x294)][_0x45a4c0(0x200)]&&_0x736dc0[_0x45a4c0(0x1c5)]['push'](this[_0x45a4c0(0x294)][_0x45a4c0(0x200)]);}if(this[_0x45a4c0(0x249)])for(const _0x4d3f35 of _0x240f82){_0x4d3f35[_0x45a4c0(0x1c2)]=!![],this[_0x45a4c0(0x1b1)][_0x45a4c0(0x232)](_0x4d3f35),_0x4d3f35[_0x45a4c0(0x193)]['y']=-0.85;}},VisuMZ[_0x29f2e4(0x248)]['Spriteset_Map_createSpawnedEvent']=Spriteset_Map['prototype']['createSpawnedEvent'],Spriteset_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x1e1)]=function(_0x3e620d){const _0x11dc4f=_0x29f2e4;VisuMZ[_0x11dc4f(0x248)][_0x11dc4f(0x270)]['call'](this,_0x3e620d);if(_0x3e620d[_0x11dc4f(0x247)])return;{const _0x31ed57=new Sprite_ReflectionCharacter(_0x3e620d);_0x31ed57['_reflection']=!![],this[_0x11dc4f(0x294)]['addChild'](_0x31ed57),_0x31ed57[_0x11dc4f(0x193)]['y']=-0.85,_0x31ed57[_0x11dc4f(0x1c5)]=_0x31ed57[_0x11dc4f(0x1c5)]||[],this[_0x11dc4f(0x294)][_0x11dc4f(0x200)]&&_0x31ed57[_0x11dc4f(0x1c5)][_0x11dc4f(0x242)](this[_0x11dc4f(0x294)][_0x11dc4f(0x200)]);}{const _0x4bd174=new Sprite_ReflectionCharacter(_0x3e620d);_0x4bd174[_0x11dc4f(0x1c2)]=!![],this[_0x11dc4f(0x249)][_0x11dc4f(0x232)](_0x4bd174),_0x4bd174['scale']['y']=-0.85;}},VisuMZ[_0x29f2e4(0x248)][_0x29f2e4(0x273)]=Spriteset_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x230)],Spriteset_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x230)]=function(){const _0x5858da=_0x29f2e4;VisuMZ[_0x5858da(0x248)][_0x5858da(0x273)][_0x5858da(0x1ed)](this),this[_0x5858da(0x282)](),this[_0x5858da(0x2a5)]();},Spriteset_Map[_0x29f2e4(0x23b)]['updateWaterReflections']=function(){const _0xf64b9a=_0x29f2e4;if(!this[_0xf64b9a(0x294)])return;if($gameMap){if(!this[_0xf64b9a(0x25c)]&&$gameMap[_0xf64b9a(0x26e)]())this[_0xf64b9a(0x294)][_0xf64b9a(0x232)](this[_0xf64b9a(0x201)]),this[_0xf64b9a(0x25c)]=!![];else this['_waterReflectAdded']&&!$gameMap[_0xf64b9a(0x26e)]()&&(this[_0xf64b9a(0x294)][_0xf64b9a(0x223)](this[_0xf64b9a(0x201)]),this[_0xf64b9a(0x25c)]=![]);}this['_waterReflectLayer'][_0xf64b9a(0x200)]&&(this['_waterReflectLayer'][_0xf64b9a(0x200)]['time']+=0.05);const _0x51440b=this['_waterReflectLayer'][_0xf64b9a(0x204)];_0x51440b&&(_0x51440b['x']=Math[_0xf64b9a(0x1ec)](-$gameMap[_0xf64b9a(0x290)]()*$gameMap[_0xf64b9a(0x24a)]()),_0x51440b['y']=Math[_0xf64b9a(0x1ec)](-$gameMap[_0xf64b9a(0x1c6)]()*$gameMap['tileHeight']()));},Spriteset_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x2a5)]=function(){const _0x554cd6=_0x29f2e4;if(!this[_0x554cd6(0x249)])return;if($gameMap){if(!this[_0x554cd6(0x233)]&&$gameMap[_0x554cd6(0x1f1)]())this[_0x554cd6(0x249)][_0x554cd6(0x232)](this[_0x554cd6(0x1b1)]),this[_0x554cd6(0x233)]=!![];else this[_0x554cd6(0x233)]&&!$gameMap[_0x554cd6(0x1f1)]()&&(this[_0x554cd6(0x249)][_0x554cd6(0x223)](this[_0x554cd6(0x1b1)]),this[_0x554cd6(0x233)]=![]);}const _0xc7b5b4=this['_solidReflectLayer'][_0x554cd6(0x204)];_0xc7b5b4&&(_0xc7b5b4['x']=Math[_0x554cd6(0x1ec)](-$gameMap[_0x554cd6(0x290)]()*$gameMap[_0x554cd6(0x24a)]()),_0xc7b5b4['y']=Math[_0x554cd6(0x1ec)](-$gameMap[_0x554cd6(0x1c6)]()*$gameMap[_0x554cd6(0x1b8)]()));},Spriteset_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x1e2)]=function(){const _0x548624=_0x29f2e4;this[_0x548624(0x299)]=new Sprite(),this['_baseSprite']['addChild'](this[_0x548624(0x299)]),this['_parallaxDataRef']=[null];},Spriteset_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x245)]=function(){const _0x27e839=_0x29f2e4,_0x4de131=$gameMap[_0x27e839(0x208)]();for(const _0x31fd7c of _0x4de131){if(!_0x31fd7c)continue;this[_0x27e839(0x269)](_0x31fd7c);}},Spriteset_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x269)]=function(_0x40679f){const _0x2cd363=_0x29f2e4;if(!_0x40679f)return;const _0x30c33f=new Sprite_VisualParallax(_0x40679f['id']);_0x30c33f[_0x2cd363(0x216)](0x0,0x0,Graphics[_0x2cd363(0x1b3)],Graphics[_0x2cd363(0x1f3)]),this[_0x2cd363(0x299)][_0x2cd363(0x232)](_0x30c33f);},Spriteset_Map['prototype']['sortVisualParallaxes']=function(){const _0x59f3db=_0x29f2e4;this['_parallaxContainer'][_0x59f3db(0x1bd)][_0x59f3db(0x253)]((_0x126117,_0x4f0419)=>_0x126117[_0x59f3db(0x22b)]-_0x4f0419[_0x59f3db(0x22b)]);},Spriteset_Map['prototype'][_0x29f2e4(0x1b2)]=function(_0x46a2bd){const _0x48e8be=_0x29f2e4;return this[_0x48e8be(0x299)][_0x48e8be(0x1bd)][_0x48e8be(0x285)](_0x3d162d=>_0x3d162d[_0x48e8be(0x22b)]===_0x46a2bd);},Spriteset_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x255)]=function(_0x3e0522){const _0x6bc4c3=_0x29f2e4,_0x41d202=this['findTargetVisualParallax'](_0x3e0522);_0x41d202&&this[_0x6bc4c3(0x299)][_0x6bc4c3(0x223)](_0x41d202);},Spriteset_Map[_0x29f2e4(0x23b)][_0x29f2e4(0x29d)]=function(_0x354282,_0x5611af){const _0x45a707=_0x29f2e4,_0xd148cd=this[_0x45a707(0x1b2)](_0x354282);!_0xd148cd?(this['createNewParallaxLayer']($gameMap['getVisualParallaxSettings'](_0x354282)),this[_0x45a707(0x287)]()):(_0xd148cd[_0x45a707(0x196)](),_0x5611af&&_0xd148cd[_0x45a707(0x19e)][_0x45a707(0x1f4)](_0xd148cd[_0x45a707(0x1c3)][_0x45a707(0x1da)](_0xd148cd)));};