/*:
 * @target MZ
 * @plugindesc v1.2 - Fixed static poses that are not meant to loop.
 * @author YeXin
 * @url https://www.patreon.com/c/YeXinn
 * @help
============================================================================
Introduction
============================================================================
*
MZ Extended Frames enhances RPG Maker MZ's sideview battler system by 
providing greater control over animation frames. This plugin allows 
customization of frame counts, and supports ping-pong looping animations 
resulting in smoother and more dynamic character animations.

 * This plugin modifies the sideview battler system to support:
 * • Custom frame count instead of the default 3.
 * • Ping-pong effect for idle animations.
 * • Customizable frame speed per motion.
 * • Notetag to use default frames for specific actors and enemies.
 * • Individual settings for specific actors and enemies.
 * • Configurable static poses for motions that should not loop (eg. guard).
 
============================================================================
FEATURES
============================================================================
• Custom Frame Count – Increase the number of animation frames beyond the 
default 3, allowing for smoother motion sequences.
• Ping-Pong Animation – Enable a 1-2-3-4-3-2-1 animation cycle for more 
natural looping movements.
• Configurable Static Poses - A parameter lets you define motions that 
play once and hold on the last frame, fixing issues with 'guard' and 'dead'.
• Enhanced Motion Handling – Implements better pattern validation, frame 
boundaries, and looping logic.
• Improved Performance – Optimized frame calculations and motion updates 
for efficient rendering.
• Actor/Enemy Notetag Support - Use <DefaultFrames> in actor or enemy notes 
to make that character use the default 3 frames and 12 frame speed.
• Per-Battler Settings - Configure specific frame counts and speeds for 
individual actors and enemies from the plugin parameters.

============================================================================
Changelog
============================================================================
v1.2 - 2024-05-21
- Implemented a robust fix for the static pose looping bug. The plugin now
  directly modifies the core 'Sprite_Actor.MOTIONS' object to set 'loop' to
  'false' for motions defined in the 'Static Pose Motions' parameter. This
  solves the root cause of the issue and is more compatible.

v1.1 - 2024-05-21
- Fixed a bug where motions like 'guard' and 'dead' would loop instead of
  playing once and holding their pose.
- Added new plugin parameter 'Static Pose Motions' to allow users to
  define which motions should play once and then hold on the last frame.
============================================================================
 TERMS OF USE
============================================================================
 • You may use this resource for commercial or non commercial projects.
 • You can edit but do not redistribute.
 • Please credit me as YeXin
============================================================================
 *
 * @param FrameCount
 * @text Default Frame Count
 * @desc The default number of frames per animation cycle (default is 3, but can be set higher).
 * @type number
 * @min 3
 * @default 4
 *
 * @param EnablePingPong
 * @text Enable Ping-Pong Animation
 * @desc Enable 1-2-3-4-3-2-1 animation for looping motions.
 * @type boolean
 * @default true
 *
 * @param FrameSpeed
 * @text Default Frame Speed
 * @desc Number of game frames per animation frame (default is 12).
 * @type number
 * @min 1
 * @default 12
 *
 * @param StaticPoseMotions
 * @text Static Pose Motions
 * @desc List of motions that should play once and then hold on the last frame (e.g., guard, dead).
 * @type string[]
 * @default ["guard", "dying", "dead"]
 *
 * @param ActorSettings
 * @text Actor Settings
 * @desc Configure specific settings for individual actors
 * @type struct<ActorConfig>[]
 * @default []
 *
 * @param EnemySettings
 * @text Enemy Settings
 * @desc Configure specific settings for individual enemies
 * @type struct<EnemyConfig>[]
 * @default []
 *
 */

/*~struct~ActorConfig:
 * @param ActorID
 * @text Actor ID
 * @desc The ID of the actor to customize
 * @type actor
 * @default 1
 *
 * @param FrameCount
 * @text Frame Count
 * @desc The number of frames for this actor's animations
 * @type number
 * @min 3
 * @default 4
 *
 * @param FrameSpeed
 * @text Frame Speed
 * @desc Animation speed for this actor
 * @type number
 * @min 1
 * @default 12
 *
 * @param UsePingPong
 * @text Use Ping-Pong
 * @desc Enable ping-pong animation for this actor
 * @type boolean
 * @default true
 */

/*~struct~EnemyConfig:
 * @param EnemyID
 * @text Enemy ID
 * @desc The ID of the enemy to customize
 * @type enemy
 * @default 1
 *
 * @param FrameCount
 * @text Frame Count
 * @desc The number of frames for this enemy's animations
 * @type number
 * @min 3
 * @default 4
 *
 * @param FrameSpeed
 * @text Frame Speed
 * @desc Animation speed for this enemy
 * @type number
 * @min 1
 * @default 12
 *
 * @param UsePingPong
 * @text Use Ping-Pong
 * @desc Enable ping-pong animation for this actor
 * @type boolean
 * @default true
 */

(function(_0xebb7a7,_0x138def){const _0x53ab9c=_0xb693,_0x3d7ea2=_0xebb7a7();while(!![]){try{const _0x1a7310=parseInt(_0x53ab9c(0x14c))/0x1+parseInt(_0x53ab9c(0x14e))/0x2+parseInt(_0x53ab9c(0x138))/0x3+parseInt(_0x53ab9c(0x135))/0x4*(-parseInt(_0x53ab9c(0x131))/0x5)+-parseInt(_0x53ab9c(0x128))/0x6+-parseInt(_0x53ab9c(0x133))/0x7*(-parseInt(_0x53ab9c(0x144))/0x8)+parseInt(_0x53ab9c(0x14a))/0x9*(-parseInt(_0x53ab9c(0x12b))/0xa);if(_0x1a7310===_0x138def)break;else _0x3d7ea2['push'](_0x3d7ea2['shift']());}catch(_0x3a379b){_0x3d7ea2['push'](_0x3d7ea2['shift']());}}}(_0x1873,0xf17c2),((()=>{const _0x1b135a=_0xb693,_0x33ffea=_0x1b135a(0x142),_0x5f05f8=PluginManager[_0x1b135a(0x11a)](_0x33ffea),_0x239c02=Number(_0x5f05f8[_0x1b135a(0x11f)]||0x4),_0x5a4781=_0x5f05f8['EnablePingPong']===_0x1b135a(0x11d),_0x31f41e=Number(_0x5f05f8[_0x1b135a(0x136)]||0xc),_0x3cad66=JSON[_0x1b135a(0x13b)](_0x5f05f8['StaticPoseMotions']||'[\x22guard\x22,\x20\x22dying\x22,\x20\x22dead\x22]');for(const _0x96d957 of _0x3cad66){Sprite_Actor[_0x1b135a(0x137)][_0x96d957]&&(Sprite_Actor[_0x1b135a(0x137)][_0x96d957][_0x1b135a(0x13e)]=![]);}let _0x15cdc9={};const _0x40d58e={};try{const _0x4d4f55=JSON[_0x1b135a(0x13b)](_0x5f05f8[_0x1b135a(0x145)]||'[]');_0x4d4f55[_0x1b135a(0x143)](_0x57384a=>{const _0x31677d=_0x1b135a,_0x1a0837=JSON['parse'](_0x57384a);_0x40d58e[Number(_0x1a0837[_0x31677d(0x140)])]={'frameCount':Number(_0x1a0837[_0x31677d(0x11f)]||_0x239c02),'frameSpeed':Number(_0x1a0837[_0x31677d(0x136)]||_0x31f41e),'usePingPong':_0x1a0837[_0x31677d(0x11e)]===_0x31677d(0x11d)};});}catch(_0x15e16f){console['error'](_0x1b135a(0x11b),_0x15e16f);}const _0x1e264a={};try{const _0x3118dc=JSON['parse'](_0x5f05f8[_0x1b135a(0x13c)]||'[]');_0x3118dc[_0x1b135a(0x143)](_0x56cb40=>{const _0x2379b5=_0x1b135a,_0x1de782=JSON['parse'](_0x56cb40);_0x1e264a[Number(_0x1de782[_0x2379b5(0x118)])]={'frameCount':Number(_0x1de782['FrameCount']||_0x239c02),'frameSpeed':Number(_0x1de782[_0x2379b5(0x136)]||_0x31f41e),'usePingPong':_0x1de782[_0x2379b5(0x11e)]==='true'};});}catch(_0x29d635){console['error'](_0x1b135a(0x147),_0x29d635);}function _0x556410(_0x5dbca8){const _0x741891=_0x1b135a;if(!_0x5dbca8)return![];const _0x5be7a4=_0x5dbca8[_0x741891(0x12e)]()?_0x5dbca8[_0x741891(0x12d)]():_0x5dbca8[_0x741891(0x116)]();return _0x5be7a4&&_0x5be7a4[_0x741891(0x129)][_0x741891(0x146)](_0x741891(0x127));}function _0x1fcc26(_0x5828a9){const _0x64dbfb=_0x1b135a;if(!_0x5828a9)return{'frameCount':_0x239c02,'frameSpeed':_0x31f41e,'usePingPong':_0x5a4781};if(_0x556410(_0x5828a9))return{'frameCount':0x3,'frameSpeed':0xc,'usePingPong':![]};if(_0x5828a9['isActor']()&&_0x40d58e[_0x5828a9[_0x64dbfb(0x121)]()])return _0x40d58e[_0x5828a9[_0x64dbfb(0x121)]()];else{if(_0x5828a9[_0x64dbfb(0x13d)]()&&_0x1e264a[_0x5828a9[_0x64dbfb(0x12f)]()])return _0x1e264a[_0x5828a9['enemyId']()];}return{'frameCount':_0x239c02,'frameSpeed':_0x31f41e,'usePingPong':_0x5a4781};}const _0x566cb8=Sprite_Actor['prototype'][_0x1b135a(0x141)];Sprite_Actor['prototype'][_0x1b135a(0x141)]=function(){const _0x19e130=_0x1b135a;_0x566cb8['call'](this);const _0x11db4=this[_0x19e130(0x12c)][_0x19e130(0x124)];if(_0x11db4){const _0xaee9d8=this[_0x19e130(0x11c)]?this['_motion']['index']:0x0,_0x563105=_0x1fcc26(this['_battler']);let _0x3b1f94=this[_0x19e130(0x132)];if(_0x3b1f94<0x0)_0x3b1f94=0x0;if(_0x3b1f94>=_0x563105[_0x19e130(0x14b)])_0x3b1f94=_0x563105['frameCount']-0x1;const _0x208d49=_0x11db4[_0x19e130(0x13f)]/(_0x563105['frameCount']*0x3),_0x2b315a=_0x11db4[_0x19e130(0x130)]/0x6,_0x3b2440=Math['floor'](_0xaee9d8/0x6)*_0x563105['frameCount']+_0x3b1f94,_0x1da98c=_0xaee9d8%0x6;this[_0x19e130(0x12c)][_0x19e130(0x119)](_0x3b2440*_0x208d49,_0x1da98c*_0x2b315a,_0x208d49,_0x2b315a),this[_0x19e130(0x119)](0x0,0x0,_0x208d49,_0x2b315a);}};const _0x32c40e=Sprite_Actor[_0x1b135a(0x149)][_0x1b135a(0x14d)];Sprite_Actor[_0x1b135a(0x149)][_0x1b135a(0x14d)]=function(_0x2c57b9){const _0xdf6ce9=_0x1b135a;_0x2c57b9&&(this['_currentMotionName']=_0x2c57b9[_0xdf6ce9(0x117)]);_0x32c40e[_0xdf6ce9(0x123)](this,_0x2c57b9);const _0x20e60a=_0x1fcc26(this['_battler']);_0x20e60a[_0xdf6ce9(0x13a)]&&this['_motion']&&this['_motion'][_0xdf6ce9(0x13e)]&&(this[_0xdf6ce9(0x120)]=0x1);},Sprite_Actor[_0x1b135a(0x149)][_0x1b135a(0x122)]=function(){const _0x21d6fb=_0x1b135a;if(!this[_0x21d6fb(0x11c)])return;const _0x833260=_0x1fcc26(this[_0x21d6fb(0x12a)]),_0x567030=this[_0x21d6fb(0x126)]&&_0x15cdc9[this[_0x21d6fb(0x126)]]?Number(_0x15cdc9[this[_0x21d6fb(0x126)]]):_0x833260[_0x21d6fb(0x125)];if(++this['_motionCount']>=_0x567030){if(this[_0x21d6fb(0x11c)]['loop']){if(_0x833260[_0x21d6fb(0x13a)]){if(this[_0x21d6fb(0x120)]===undefined)this[_0x21d6fb(0x120)]=0x1;if(this['_pattern']<0x0)this[_0x21d6fb(0x132)]=0x0;if(this[_0x21d6fb(0x132)]>=_0x833260[_0x21d6fb(0x14b)])this['_pattern']=_0x833260[_0x21d6fb(0x14b)]-0x1;this[_0x21d6fb(0x132)]+=this['_pingPongDirection'];if(this['_pattern']>=_0x833260[_0x21d6fb(0x14b)]-0x1)this[_0x21d6fb(0x132)]=_0x833260[_0x21d6fb(0x14b)]-0x1,this['_pingPongDirection']=-0x1;else this['_pattern']<=0x0&&(this[_0x21d6fb(0x132)]=0x0,this[_0x21d6fb(0x120)]=0x1);}else this[_0x21d6fb(0x132)]=(this['_pattern']+0x1)%_0x833260[_0x21d6fb(0x14b)];}else this['_pattern']<_0x833260[_0x21d6fb(0x14b)]-0x1?this[_0x21d6fb(0x132)]++:this[_0x21d6fb(0x148)]();this['_motionCount']=0x0;}};const _0x473f10=Sprite_Enemy[_0x1b135a(0x149)][_0x1b135a(0x141)];Sprite_Enemy[_0x1b135a(0x149)][_0x1b135a(0x141)]=function(){const _0x88ed56=_0x1b135a;_0x473f10[_0x88ed56(0x123)](this),this[_0x88ed56(0x134)]&&this['_battler']&&this['bitmap']&&(this[_0x88ed56(0x139)]=_0x1fcc26(this[_0x88ed56(0x12a)]));};})()));function _0xb693(_0x29a39e,_0x2b7a04){const _0x18734b=_0x1873();return _0xb693=function(_0xb69395,_0x1c0c29){_0xb69395=_0xb69395-0x116;let _0x5d536b=_0x18734b[_0xb69395];return _0x5d536b;},_0xb693(_0x29a39e,_0x2b7a04);}function _0x1873(){const _0x2b89a1=['1028941YBYNBC','startMotion','2039092HiDsaq','enemy','name','EnemyID','setFrame','parameters','Error\x20parsing\x20ActorSettings:','_motion','true','UsePingPong','FrameCount','_pingPongDirection','actorId','updateMotionCount','call','bitmap','frameSpeed','_currentMotionName','<DefaultFrames>','862146uZdxKk','note','_battler','2180OrSVxZ','_mainSprite','actor','isActor','enemyId','height','105sJZitt','_pattern','49ynwvDI','_enemy','88236VXlOeM','FrameSpeed','MOTIONS','1348062bboNms','_frameSettings','usePingPong','parse','EnemySettings','isEnemy','loop','width','ActorID','updateFrame','FrameX_ExtendedFrames_Yexin','forEach','223320ZOXNIq','ActorSettings','includes','Error\x20parsing\x20EnemySettings:','refreshMotion','prototype','45297zrxoKM','frameCount'];_0x1873=function(){return _0x2b89a1;};return _0x1873();}