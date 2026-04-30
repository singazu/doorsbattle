/*:
 * @target MZ
 * @plugindesc [v2.0.0] Flexible footsteps with region/terrain surfaces, profile rules, equipment checks, and plugin commands.
 * @author Overhill Games (based on ToshA_Footsteps)
 * @help
 * ToshaOGfootsteps1_1.js
 * ============================================
 * Purpose
 * - Play footsteps by Region ID, Terrain Tag, or both.
 * - Let Region override Terrain, Terrain override Region, or use either.
 * - Change footstep sounds by profile such as default, armor, barefoot,
 *   Melody, ghost, etc.
 * - Resolve profiles from actor/class/state/weapon/armor/switch/variable/script.
 * - Force a profile by plugin command when needed.
 *
 * Recommended setup
 * 1. Create Surfaces like Stone / Wood / Dirt.
 * 2. Map Region IDs and/or Terrain Tags to each surface.
 * 3. Create Profile Rules like armor or Melody.
 * 4. Create Sound Sets using Profile + Surface.
 *
 * Resolution order
 * 1. Forced profile from plugin command, if any.
 * 2. Highest-priority matching profile rule.
 * 3. Default profile.
 * 4. Match sound set for profile + surface.
 * 5. Fallback to Default Profile + same surface.
 *
 * Notes
 * - Sound files go in audio/se.
 * - For player footsteps, the party leader is used for actor/class/equip/state checks.
 * - Events can make footsteps too. Use <NoFootsteps> in the event note to silence an event.
 * - This plugin aims to be simple in use, not fancy in UI.
 *
 * Plugin Commands
 * - SetForcedProfile: Force a profile until cleared.
 * - ClearForcedProfile: Clear forced profile.
 * - SetMuted: Mute/unmute footsteps.
 *
 * @command SetForcedProfile
 * @text Set Forced Profile
 * @desc Force a profile name for player footsteps until cleared.
 *
 * @arg ProfileName
 * @text Profile Name
 * @type string
 * @default armor
 *
 * @command ClearForcedProfile
 * @text Clear Forced Profile
 * @desc Remove any forced profile.
 *
 * @command SetMuted
 * @text Set Footsteps Muted
 * @desc Mute or unmute player and event footsteps.
 *
 * @arg Muted
 * @text Muted
 * @type boolean
 * @on Muted
 * @off Unmuted
 * @default true
 *
 * @param SurfacePriority
 * @text Surface Priority
 * @type select
 * @option Region then Terrain
 * @value regionFirst
 * @option Terrain then Region
 * @value terrainFirst
 * @option Either One
 * @value either
 * @default regionFirst
 *
 * @param DefaultProfile
 * @text Default Profile
 * @type string
 * @default default
 *
 * @param EventFootstepsEnabled
 * @text Event Footsteps Enabled
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @default true
 *
 * @param DashVolumeOffset
 * @text Dash Volume Offset
 * @type number
 * @min -100
 * @max 100
 * @default 0
 *
 * @param DashPitchOffset
 * @text Dash Pitch Offset
 * @type number
 * @min -50
 * @max 50
 * @default 0
 *
 * @param VolumeVariance
 * @text Volume Variance
 * @desc Random plus/minus variance added to volume.
 * @type number
 * @min 0
 * @max 30
 * @default 0
 *
 * @param StepInterval
 * @text Step Interval
 * @desc Minimum number of played step triggers between sounds. 1 = every valid step.
 * @type number
 * @min 1
 * @default 1
 *
 * @param Surfaces
 * @text Surfaces
 * @type struct<OGSurface>[]
 * @default []
 *
 * @param ProfileRules
 * @text Profile Rules
 * @type struct<OGProfileRule>[]
 * @default []
 *
 * @param SoundSets
 * @text Sound Sets
 * @type struct<OGSoundSet>[]
 * @default []
 */

/*~struct~OGSurface:
 * @param SurfaceName
 * @text Surface Name
 * @type string
 * @default stone
 *
 * @param RegionIds
 * @text Region IDs
 * @type number[]
 * @default []
 *
 * @param TerrainTags
 * @text Terrain Tags
 * @type number[]
 * @default []
 */

/*~struct~OGProfileRule:
 * @param ProfileName
 * @text Profile Name
 * @type string
 * @default armor
 *
 * @param Priority
 * @text Priority
 * @desc Higher number wins.
 * @type number
 * @min 0
 * @default 100
 *
 * @param ActorIds
 * @text Actor IDs
 * @type actor[]
 * @default []
 *
 * @param ClassIds
 * @text Class IDs
 * @type class[]
 * @default []
 *
 * @param StateIds
 * @text State IDs
 * @type state[]
 * @default []
 *
 * @param WeaponIds
 * @text Weapon IDs
 * @type weapon[]
 * @default []
 *
 * @param ArmorIds
 * @text Armor IDs
 * @type armor[]
 * @default []
 *
 * @param SwitchId
 * @text Switch ID
 * @type switch
 * @default 0
 *
 * @param VariableId
 * @text Variable ID
 * @type variable
 * @default 0
 *
 * @param VariableOp
 * @text Variable Check
 * @type select
 * @option Ignore
 * @value ignore
 * @option ==
 * @value eq
 * @option >=
 * @value gte
 * @option <=
 * @value lte
 * @option >
 * @value gt
 * @option <
 * @value lt
 * @default ignore
 *
 * @param VariableValue
 * @text Variable Value
 * @type number
 * @default 0
 *
 * @param ScriptCondition
 * @text Script Condition
 * @desc Optional JS. actor is available. Return true to match.
 * @type multiline_string
 * @default
 */

/*~struct~OGSoundSet:
 * @param ProfileName
 * @text Profile Name
 * @type string
 * @default default
 *
 * @param SurfaceName
 * @text Surface Name
 * @type string
 * @default stone
 *
 * @param SoundNames
 * @text Sound Names
 * @type file[]
 * @dir audio/se
 * @default []
 *
 * @param PlayMode
 * @text Playback Mode
 * @type select
 * @option Sequential
 * @value sequential
 * @option Random
 * @value random
 * @default random
 *
 * @param Volume
 * @text Volume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 *
 * @param PitchMin
 * @text Min Pitch
 * @type number
 * @min 50
 * @max 150
 * @default 95
 *
 * @param PitchMax
 * @text Max Pitch
 * @type number
 * @min 50
 * @max 150
 * @default 105
 *
 * @param Pan
 * @text Pan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 *
 * @param MaxDistance
 * @text Max Event Distance
 * @type number
 * @min 1
 * @default 5
 *
 * @param AnimationFrames
 * @text Animation Frames
 * @desc Pattern frames on which sound may play. Default [0,2].
 * @type number[]
 * @default ["0","2"]
 */

(() => {
    "use strict";

    const pluginName = "ToshaOGfootsteps1_1";
    const legacyPluginName = "ToshaOG_footsteps";
    const params = PluginManager.parameters(pluginName);

    const parseArray = (value) => {
        try {
            const arr = JSON.parse(value || "[]");
            return Array.isArray(arr) ? arr : [];
        } catch (_) {
            return [];
        }
    };

    const parseNumberArray = (value) => parseArray(value).map(v => Number(v || 0)).filter(v => !Number.isNaN(v));
    const toLower = (s) => String(s || "").trim().toLowerCase();

    const settings = {
        surfacePriority: String(params["SurfacePriority"] || "regionFirst"),
        defaultProfile: String(params["DefaultProfile"] || "default"),
        eventFootstepsEnabled: params["EventFootstepsEnabled"] === "true",
        dashVolumeOffset: Number(params["DashVolumeOffset"] || 0),
        dashPitchOffset: Number(params["DashPitchOffset"] || 0),
        volumeVariance: Number(params["VolumeVariance"] || 0),
        stepInterval: Math.max(1, Number(params["StepInterval"] || 1)),
        surfaces: parseArray(params["Surfaces"]).map(raw => {
            const s = JSON.parse(raw || "{}");
            return {
                name: String(s.SurfaceName || "").trim(),
                key: toLower(s.SurfaceName || ""),
                regionIds: parseNumberArray(s.RegionIds),
                terrainTags: parseNumberArray(s.TerrainTags),
            };
        }).filter(s => s.key),
        profileRules: parseArray(params["ProfileRules"]).map(raw => {
            const r = JSON.parse(raw || "{}");
            return {
                profileName: String(r.ProfileName || "default").trim(),
                profileKey: toLower(r.ProfileName || "default"),
                priority: Number(r.Priority || 0),
                actorIds: parseNumberArray(r.ActorIds),
                classIds: parseNumberArray(r.ClassIds),
                stateIds: parseNumberArray(r.StateIds),
                weaponIds: parseNumberArray(r.WeaponIds),
                armorIds: parseNumberArray(r.ArmorIds),
                switchId: Number(r.SwitchId || 0),
                variableId: Number(r.VariableId || 0),
                variableOp: String(r.VariableOp || "ignore"),
                variableValue: Number(r.VariableValue || 0),
                scriptCondition: String(r.ScriptCondition || "").trim(),
            };
        }).sort((a, b) => b.priority - a.priority),
        soundSets: parseArray(params["SoundSets"]).map(raw => {
            const s = JSON.parse(raw || "{}");
            return {
                profileName: String(s.ProfileName || "default").trim(),
                profileKey: toLower(s.ProfileName || "default"),
                surfaceName: String(s.SurfaceName || "").trim(),
                surfaceKey: toLower(s.SurfaceName || ""),
                soundNames: parseArray(s.SoundNames).map(String).map(x => x.replace(/^.*\//, "")),
                playMode: String(s.PlayMode || "random"),
                volume: Number(s.Volume || 90),
                pitchMin: Number(s.PitchMin || 95),
                pitchMax: Number(s.PitchMax || 105),
                pan: Number(s.Pan || 0),
                maxDistance: Math.max(1, Number(s.MaxDistance || 5)),
                animationFrames: parseNumberArray(s.AnimationFrames),
            };
        }).filter(s => s.surfaceKey && s.profileKey && s.soundNames.length > 0),
    };

    function ensureConfig(system = $gameSystem) {
        if (!system) {
            return {
                forcedProfile: "",
                muted: false,
            };
        }
        if (!system._toshaOgFootsteps) {
            system._toshaOgFootsteps = {
                forcedProfile: "",
                muted: false,
            };
        }
        return system._toshaOgFootsteps;
    }

    const registerCommandCompat = (commandName, handler) => {
        PluginManager.registerCommand(pluginName, commandName, handler);
        if (legacyPluginName !== pluginName) {
            PluginManager.registerCommand(legacyPluginName, commandName, handler);
        }
    };

    registerCommandCompat("SetForcedProfile", args => {
        ensureConfig().forcedProfile = String(args.ProfileName || "").trim();
    });

    registerCommandCompat("ClearForcedProfile", () => {
        ensureConfig().forcedProfile = "";
    });

    registerCommandCompat("SetMuted", args => {
        ensureConfig().muted = args.Muted === "true";
    });

    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        ensureConfig(this);
    };

    function compareVariable(rule) {
        if (!rule.variableId || rule.variableOp === "ignore") return true;
        const actual = $gameVariables.value(rule.variableId);
        const expected = rule.variableValue;
        switch (rule.variableOp) {
            case "eq": return actual == expected;
            case "gte": return actual >= expected;
            case "lte": return actual <= expected;
            case "gt": return actual > expected;
            case "lt": return actual < expected;
            default: return true;
        }
    }

    function actorMatchesRule(actor, rule) {
        if (!actor) return false;

        let usedAnyCondition = false;

        const hasAny = (needles, haystack) => needles.length === 0 || needles.some(id => haystack.includes(id));
        const actorStateIds = actor.states().map(s => s.id);
        const weaponIds = actor.weapons().map(w => w.id);
        const armorIds = actor.armors().map(a => a.id);

        if (rule.actorIds.length > 0) {
            usedAnyCondition = true;
            if (!rule.actorIds.includes(actor.actorId())) return false;
        }
        if (rule.classIds.length > 0) {
            usedAnyCondition = true;
            if (!rule.classIds.includes(actor._classId)) return false;
        }
        if (rule.stateIds.length > 0) {
            usedAnyCondition = true;
            if (!hasAny(rule.stateIds, actorStateIds)) return false;
        }
        if (rule.weaponIds.length > 0) {
            usedAnyCondition = true;
            if (!hasAny(rule.weaponIds, weaponIds)) return false;
        }
        if (rule.armorIds.length > 0) {
            usedAnyCondition = true;
            if (!hasAny(rule.armorIds, armorIds)) return false;
        }
        if (rule.switchId > 0) {
            usedAnyCondition = true;
            if (!$gameSwitches.value(rule.switchId)) return false;
        }
        if (rule.variableId > 0 && rule.variableOp !== "ignore") {
            usedAnyCondition = true;
            if (!compareVariable(rule)) return false;
        }
        if (rule.scriptCondition) {
            usedAnyCondition = true;
            try {
                const fn = new Function("actor", "return !!(" + rule.scriptCondition + ");");
                if (!fn(actor)) return false;
            } catch (e) {
                console.error(pluginName + ": invalid ScriptCondition", rule.profileName, e);
                return false;
            }
        }

        return usedAnyCondition;
    }

    function getPlayerActor() {
        return $gameParty && $gameParty.leader ? $gameParty.leader() : null;
    }

    function resolveProfileForCharacter(character) {
        const cfg = ensureConfig();
        if ($gamePlayer && character === $gamePlayer && cfg.forcedProfile) {
            return cfg.forcedProfile;
        }

        const actor = character === $gamePlayer ? getPlayerActor() : null;
        if (actor) {
            for (const rule of settings.profileRules) {
                if (actorMatchesRule(actor, rule)) {
                    return rule.profileName;
                }
            }
        }
        return settings.defaultProfile;
    }

    function detectSurfaceName(character) {
        const regionId = character.regionId ? character.regionId() : 0;
        const terrainTag = character.terrainTag ? character.terrainTag() : 0;

        const byRegion = settings.surfaces.find(s => s.regionIds.includes(regionId));
        const byTerrain = settings.surfaces.find(s => s.terrainTags.includes(terrainTag));

        if (settings.surfacePriority === "terrainFirst") {
            return (byTerrain || byRegion || null)?.name || "";
        }
        if (settings.surfacePriority === "either") {
            return (byRegion || byTerrain || null)?.name || "";
        }
        return (byRegion || byTerrain || null)?.name || "";
    }

    function findSoundSet(profileName, surfaceName) {
        const profileKey = toLower(profileName);
        const surfaceKey = toLower(surfaceName);
        let match = settings.soundSets.find(s => s.profileKey === profileKey && s.surfaceKey === surfaceKey);
        if (match) return match;
        const defaultKey = toLower(settings.defaultProfile);
        return settings.soundSets.find(s => s.profileKey === defaultKey && s.surfaceKey === surfaceKey) || null;
    }

    function nextSequentialIndex(character, key, length) {
        character._ogFootstepSeq = character._ogFootstepSeq || {};
        const index = character._ogFootstepSeq[key] || 0;
        character._ogFootstepSeq[key] = (index + 1) % length;
        return index;
    }

    function chooseSoundName(character, soundSet) {
        if (soundSet.soundNames.length <= 1) return soundSet.soundNames[0];
        if (soundSet.playMode === "sequential") {
            const seqKey = soundSet.profileKey + "::" + soundSet.surfaceKey;
            const index = nextSequentialIndex(character, seqKey, soundSet.soundNames.length);
            return soundSet.soundNames[index];
        }
        const index = Math.randomInt(soundSet.soundNames.length);
        return soundSet.soundNames[index];
    }

    function getEventDistanceVolume(character, soundSet) {
        if (character === $gamePlayer) return soundSet.volume;
        const dx = $gamePlayer.x - character.x;
        const dy = $gamePlayer.y - character.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > soundSet.maxDistance) return 0;
        const factor = 1 - distance / soundSet.maxDistance;
        return Math.round(soundSet.volume * factor);
    }

    function playFootstepSound(character) {
        const cfg = ensureConfig();
        if (cfg.muted) return;

        const surfaceName = detectSurfaceName(character);
        if (!surfaceName) return;

        const profileName = resolveProfileForCharacter(character);
        const soundSet = findSoundSet(profileName, surfaceName);
        if (!soundSet) return;

        character._ogFootstepCounter = (character._ogFootstepCounter || 0) + 1;
        if (character._ogFootstepCounter < settings.stepInterval) return;
        character._ogFootstepCounter = 0;

        let volume = getEventDistanceVolume(character, soundSet);
        if (volume <= 0) return;
        if (character.isDashing && character.isDashing()) {
            volume += settings.dashVolumeOffset;
        }
        if (settings.volumeVariance > 0) {
            const variance = Math.randomInt(settings.volumeVariance * 2 + 1) - settings.volumeVariance;
            volume += variance;
        }
        volume = Math.max(0, Math.min(100, volume));

        let minPitch = soundSet.pitchMin;
        let maxPitch = soundSet.pitchMax;
        if (character.isDashing && character.isDashing()) {
            minPitch += settings.dashPitchOffset;
            maxPitch += settings.dashPitchOffset;
        }
        minPitch = Math.max(50, minPitch);
        maxPitch = Math.max(minPitch, maxPitch);
        const pitch = Math.floor(Math.random() * (maxPitch - minPitch + 1)) + minPitch;

        AudioManager.playSe({
            name: chooseSoundName(character, soundSet),
            volume: volume,
            pitch: pitch,
            pan: soundSet.pan,
        });
    }

    function shouldPlayForCharacter(character) {
        if (character === $gamePlayer) return true;
        if (character instanceof Game_Event) {
            return settings.eventFootstepsEnabled && !character.hasNoFootstepSounds();
        }
        return false;
    }

    const _Game_CharacterBase_updatePattern = Game_CharacterBase.prototype.updatePattern;
    Game_CharacterBase.prototype.updatePattern = function() {
        const prevPattern = this._pattern;
        _Game_CharacterBase_updatePattern.call(this);
        const newPattern = this._pattern;

        if (prevPattern === newPattern) return;
        if (!this.isMoving()) return;
        if (!shouldPlayForCharacter(this)) return;

        const surfaceName = detectSurfaceName(this);
        if (!surfaceName) return;
        const profileName = resolveProfileForCharacter(this);
        const soundSet = findSoundSet(profileName, surfaceName);
        if (!soundSet) return;
        const frames = soundSet.animationFrames && soundSet.animationFrames.length > 0 ? soundSet.animationFrames : [0, 2];
        if (!frames.includes(newPattern)) return;

        playFootstepSound(this);
    };

    Game_Event.prototype.hasNoFootstepSounds = function() {
        return /<NoFootsteps>/i.test(this.event().note || "");
    };
})();