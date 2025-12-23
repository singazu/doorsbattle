/*:
 * @author Synrec/Kylestclr
 * @plugindesc v1.1 A plugin which will allow for party management creation
 * @url https://synrec.itch.io/
 * @target MZ
 * 
 * @command Set Party
 * @desc Changes the player party to set type
 * 
 * @arg Identifier
 * @desc The identifier to swap to
 * @type text
 * @default party
 * 
 * @command Next Party
 * @desc Force next party
 * 
 * @command Previous Party
 * @desc Force previous party
 * 
 * @command Open Manager
 * @desc Opens the party manager
 * 
 * @command Open Manager Proximal
 * @desc Opens the manager for nearby parties
 * 
 * @arg Range
 * @desc The party proximal range to allow swap in manager
 * @type text
 * @default 1
 * 
 * @command Add Actor To Current
 * @desc Adds an actor to current party
 * 
 * @arg Actor
 * @desc Select the actor
 * @type actor
 * @default 0
 * 
 * @command Add Actor To ID
 * @desc Adds an actor to identified party
 * 
 * @arg Actor
 * @desc Select the actor
 * @type actor
 * @default 0
 * 
 * @arg Identifier
 * @desc Party Identifier
 * @type text
 * @default 1
 * 
 * 
 * @help
 * Setup the available parties in the plugin parameters
 * Use the plugin commands to force switch parties
 * 
 * You can use script call to change the player party
 * - $gameParty.setMultiParty(identifier)
 * 
 * @param Actor Configurations
 * @desc Setup interaction common event
 * @type struct<actorConfig>[]
 * @default []
 * 
 * @param Party Configurations
 * @desc Setup available parties here
 * @type struct<partyConfig>[]
 * @default []
 * 
 * @param Allow Separate Inventories
 * @desc Isolates party inventories
 * @type boolean
 * @default false
 * 
 * @param Event Touch Trigger
 * @desc If party on same map with player and
 * event touches the party, auto swap and trigger event
 * @type boolean
 * @default false
 * 
 * @param Allow Party Swap Switch
 * @desc The game switch to allow party swapping
 * @type switch
 * @default 0
 * 
 * @param Next Party Button
 * @parent Allow Party Swap
 * @desc The button used to swap to next party
 * Select the text tab and type custom button name
 * @type select
 * @option ok
 * @option cancel
 * @option shift
 * @option up
 * @option down
 * @option left
 * @option right
 * @option tab
 * @option control
 * @option pageup
 * @option pagedown
 * @option escape
 * @default pagedown
 * 
 * @param Previous Party Button
 * @parent Allow Party Swap
 * @desc The button used to swap to previous party
 * Select the text tab and type custom button name
 * @type select
 * @option ok
 * @option cancel
 * @option shift
 * @option up
 * @option down
 * @option left
 * @option right
 * @option tab
 * @option control
 * @option pageup
 * @option pagedown
 * @option escape
 * @default pageup
 * 
 * @param Party Setup UI
 * @desc Setup the party configuration UI
 * @type struct<partyUI>
 * 
 */
/*~struct~actorEvent:
 * 
 * @param Name
 * @desc No function
 * @type text
 * @default ACTOR
 * 
 * @param Target Actor
 * @desc If the player leader is this actor
 * @type actor
 * @default 1
 * 
 * @param Event
 * @desc The event to call
 * @type common_event
 * @default 1
 * 
 */
/*~struct~actorConfig:
 * 
 * @param Name
 * @desc No function
 * @type text
 * @default ACTOR
 * 
 * @param Actor
 * @desc Select the actor
 * @type actor
 * @default 1
 * 
 * @param Default Event
 * @desc The default interaction common event
 * @type common_event
 * @default 0
 * 
 * @param Specific Events
 * @desc The specific event based on interacting leaders
 * @type struct<actorEvent>[]
 * @default []
 * 
 * @param Add Switch
 * @desc If switch enabled, add actor to party
 * Actor is removed otherwise, if zero, ignored.
 * @type switch
 * @default 0
 * 
 */
/*~struct~partyConfig:
 *
 * @param Name
 * @desc No function
 * @type text
 * @default PARTY
 * 
 * @param Identifier
 * @desc Keep this unique
 * Used to identify the party
 * @type text
 * @default party
 * 
 * @param Unlock Switch
 * @desc Switch must be enabled or unset
 * Auto enable switch if first party
 * @type switch
 * @default 0
 * 
 * @param Lock Switch
 * @desc If this switch is enabled, lock party
 * Will automatically swap party
 * @type switch
 * @default 0
 * 
 * @param Lock Leader
 * @desc Prevents changing the party leader
 * Ignores the party lead switch if true
 * @type boolean
 * @default false
 * 
 * @param Allow Party Lead Change
 * @parent Lock Leader
 * @desc Allow the party leader to be changed
 * If game switch is not set or true, will allow
 * @type switch
 * @default 0
 * 
 * @param Prevent Empty
 * @desc Prevents party from being empty
 * @type boolean
 * @default false
 * 
 * @param Max Members
 * @desc Maximum number of party members
 * @type text
 * @default 4
 * 
 * @param Max Battle Members
 * @desc Maximum number of party members
 * @type text
 * @default 4
 * 
 * @param Default Members
 * @desc Set actors as default members
 * Ignores members party of starting party.
 * @type actor[]
 * @default []
 * 
 * @param Use Starting Members
 * @parent Default Members
 * @desc Overwrites default member list with starting members
 * @type boolean
 * @default false
 * 
 * @param Default Map
 * @desc Original map for the party
 * @type map
 * @default 1
 * 
 * @param Map X
 * @parent Default Map
 * @desc Sets party location on the map
 * @type text
 * @default 0
 * 
 * @param Map Y
 * @parent Default Map
 * @desc Sets party location on the map
 * @type text
 * @default 0
 * 
 * @param Map Direction
 * @parent Default Map
 * @desc Sets player facing direction
 * @type select
 * @option down
 * @value 2
 * @option left
 * @value 4
 * @option right
 * @value 6
 * @option up
 * @value 8
 * @default 2
 * 
 * @param Swap To Event
 * @desc Run this common event when swapped to
 * @type common_event
 * @default 0
 * 
 * @param Swap To Code
 * @desc Run this script when swapped to
 * @type note
 * @default ""
 * 
 */
/*~struct~animPic:
 * 
 * @param File
 * @desc Picture to be used
 * @type file
 * @dir img/pictures/
 * 
 * @param Frames
 * @desc Number of graphic frames
 * @type text
 * @default 1
 * 
 * @param Frame Rate
 * @desc Number of graphic frames
 * @type text
 * @default 1
 * 
 * @param X
 * @desc Offset Value
 * @type text
 * @default 0
 * 
 * @param Y
 * @desc Offset Value
 * @type text
 * @default 0
 * 
 */
/*~struct~staticPic:
 * 
 * @param File
 * @desc Image to use
 * @type file
 * @dir img/pictures
 * 
 * @param X
 * @desc Position setting
 * @type text
 * @default 0
 * 
 * @param Y
 * @desc Position setting
 * @type text
 * @default 0
 * 
 * @param Scrolling X
 * @desc Position setting
 * @type text
 * @default 0
 * 
 * @param Scrolling Y
 * @desc Position setting
 * @type text
 * @default 0
 * 
 * @param Anchor X
 * @desc Pivot point setting
 * @type text
 * @default 0
 * 
 * @param Anchor Y
 * @desc Pivot point setting
 * @type text
 * @default 0
 * 
 * @param Rotation
 * @desc Rotation applied per frame
 * @type text
 * @default 0
 * 
 * @param Constant Rotation
 * @desc Apply rotation value constantly
 * @type boolean
 * @default false
 * 
 */
/*~struct~locSize:
 * 
 * @param X
 * @desc Position setting.
 * @type number
 * @default 0
 * 
 * @param Y
 * @desc Position setting.
 * @type number
 * @default 0
 * 
 * @param Width
 * @desc Size setting.
 * @type number
 * @default 1
 * 
 * @param Height
 * @desc Size setting.
 * @type number
 * @default 1
 * 
 */
/*~struct~windowStyle:
 * 
 * @param Font Settings
 * @desc Setup child parameters
 * 
 * @param Font Size
 * @parent Font Settings
 * @desc Size of font.
 * @type number
 * @default 16
 * 
 * @param Font Face
 * @parent Font Settings
 * @desc Font face used for the window.
 * @type text
 * @default sans-serif
 * 
 * @param Base Font Color
 * @parent Font Settings
 * @desc Default font color for window
 * @type text
 * @default #ffffff
 * 
 * @param Font Outline Color
 * @parent Font Settings
 * @desc Default font color for window
 * @type text
 * @default rgba(0, 0, 0, 0.5)
 * 
 * @param Font Outline Thickness
 * @parent Font Settings
 * @desc The thickness of the text outline
 * @type number
 * @default 3
 * 
 * @param Window Skin
 * @desc Image file used for the window skin.
 * @type file
 * @dir img/system/
 * @default Window
 * 
 * @param Window Opacity
 * @desc 0 = Fully transparent, 255 = Fully opaque.
 * @type number
 * @default 255
 * 
 * @param Show Window Dimmer
 * @desc Hides window skin
 * @type boolean
 * @default false
 * 
 */
/*~struct~gaugeDraw:
 * 
 * @param Label
 * @desc Label text for gauge
 * @type text
 * @default gauge
 * 
 * @param Label X
 * @desc Position of the label text in window
 * @type text
 * @default 0
 * 
 * @param Label Y
 * @desc Position of the label text in window
 * @type text
 * @default 0
 * 
 * @param Gauge Current Value
 * @desc How to set gauge current value
 * Evaluated value.
 * @type text
 * @default
 * 
 * @param Gauge Max Value
 * @desc How to set gauge max value
 * Evaluated value.
 * @type text
 * @default
 * 
 * @param Gauge X
 * @desc Position of the gauge in window
 * @type text
 * @default 0
 * 
 * @param Gauge Y
 * @desc Position of the gauge in window
 * @type text
 * @default 0
 * 
 * @param Gauge Width
 * @desc Size of the gauge
 * @type text
 * @default 1
 * 
 * @param Gauge Height
 * @desc Size of the gauge
 * @type text
 * @default 1
 * @default 1
 * 
 * @param Gauge Border
 * @desc Border size indent of the gauge
 * @type text
 * @default 2
 * 
 * @param Gauge Border Color
 * @desc Color for gauge border
 * @type text
 * @default #000000
 * 
 * @param Gauge Background Color
 * @desc Color for gauge background
 * @type text
 * @default #666666
 * 
 * @param Gauge Color
 * @desc Color for gauge background
 * @type text
 * @default #aaffaa
 * 
 */
/*~struct~actorBaseParamWindow:
 * 
 * @param Name
 * @desc No function.
 * @type text
 * @default Window
 * 
 * @param Base Param
 * @desc The base param to draw
 * @type select
 * @option mhp
 * @value 0
 * @option mmp
 * @value 1
 * @option atk
 * @value 2
 * @option def
 * @value 3
 * @option mat
 * @value 4
 * @option mdf
 * @value 5
 * @option agi
 * @value 6
 * @option luk
 * @value 7
 * @default 0
 * 
 * @param Param Text
 * @desc How to draw param text
 * %1 = param value
 * @type text
 * @default %1
 * 
 * @param X
 * @desc Position in window
 * @type text
 * @default 0
 * 
 * @param Y
 * @desc Position in window
 * @type text
 * @default 0
 * 
 */
/*~struct~actorExParamWindow:
 * 
 * @param Name
 * @desc No function.
 * @type text
 * @default Window
 * 
 * @param Ex Param
 * @desc The ex param to draw. Converted to percentage.
 * @type select
 * @option Hit Rate
 * @value 0
 * @option Evasion Rate
 * @value 1
 * @option Critical Rate
 * @value 2
 * @option Critical Evasion Rate
 * @value 3
 * @option Magic Evasion Rate
 * @value 4
 * @option Magic Reflection Rate
 * @value 5
 * @option Counter Attack Rate
 * @value 6
 * @option HP Regeneration Rate
 * @value 7
 * @option MP Regeneration Rate
 * @value 8
 * @option TP Regeneration Rate
 * @value 9
 * @default 0
 * 
 * @param Param Text
 * @desc How to draw param text
 * %1 = param value
 * @type text
 * @default %1
 * 
 * @param X
 * @desc Position in window
 * @type text
 * @default 0
 * 
 * @param Y
 * @desc Position in window
 * @type text
 * @default 0
 * 
 */
/*~struct~actorSPParamWindow:
 * 
 * @param Name
 * @desc No function.
 * @type text
 * @default Window
 * 
 * @param Sp Param
 * @desc The sp param to draw. Converted to percentage.
 * @type select
 * @option Target Rate
 * @value 0
 * @option Guard Effect Rate
 * @value 1
 * @option Recovery Effect Rate
 * @value 2
 * @option Pharmacology
 * @value 3
 * @option MP Cost Rate
 * @value 4
 * @option TP Charge Rate
 * @value 5
 * @option Physical Damage Rate
 * @value 6
 * @option Magical Damage Rate
 * @value 7
 * @option Floor Damage Rate
 * @value 8
 * @option Experience Rate
 * @value 9
 * @default 0
 * 
 * @param Param Text
 * @desc How to draw param text
 * %1 = param value
 * @type text
 * @default %1
 * 
 * @param X
 * @desc Position in window
 * @type text
 * @default 0
 * 
 * @param Y
 * @desc Position in window
 * @type text
 * @default 0
 * 
 */
/*~struct~actorSelectWindow:
 * 
 * @param Name
 * @desc No function.
 * @type text
 * @default Window
 * 
 * @param Dimension Configuration
 * @desc Setup position and width of the window
 * @type struct<locSize>
 * @default {"X":"0","Y":"0","Width":"1","Height":"1"}
 * 
 * @param Window Font and Style Configuration
 * @desc Custom style the window
 * @type struct<windowStyle>
 * @default {"Font Settings":"","Font Size":"16","Font Face":"sans-serif","Base Font Color":"#ffffff","Font Outline Color":"rgba(0, 0, 0, 0.5)","Font Outline Thickness":"3","Window Skin":"Window","Window Opacity":"255","Show Window Dimmer":"false"}
 * 
 * @param Max Columns
 * @desc Max columns the window will use
 * @type number
 * @default 1
 * 
 * @param Item Width
 * @desc Max width of window items. 0 = Default
 * @type number
 * @default 0
 * 
 * @param Item Height
 * @desc Max Item height of window items. 0 = Default
 * @type number
 * @default 0
 * 
 * @param Gauges
 * @desc Setup gauges for the window
 * @type struct<gaugeDraw>[]
 * @default []
 * 
 * @param Display Switch
 * @desc Require this switch enabled to display window
 * If no switch, always show
 * @type switch
 * @default 0
 * 
 * @param Draw Actor Name
 * @desc Draw actor name
 * @type boolean
 * @default false
 * 
 * @param Name Text
 * @parent Draw Actor Name
 * @desc Text used for the name
 * %1 = Name, %2 = Nickname
 * @type text
 * @default %1
 * 
 * @param Name X
 * @parent Draw Actor Name
 * @desc Position of name in window
 * @type text
 * @default 0
 * 
 * @param Name Y
 * @parent Draw Actor Name
 * @desc Position of name in window
 * @type text
 * @default 0
 * 
 * @param Draw Actor Profile
 * @desc Draw actor profile
 * @type boolean
 * @default false
 * 
 * @param Profile X
 * @parent Draw Actor Profile
 * @desc Position of profile in window
 * @type text
 * @default 0
 * 
 * @param Profile Y
 * @parent Draw Actor Profile
 * @desc Position of profile in window
 * @type text
 * @default 0
 * 
 * @param Draw Class Level
 * @desc Draw actor class name and level
 * @type boolean
 * @default false
 * 
 * @param Class Level Text
 * @parent Draw Class Level
 * @desc Draw class name and level
 * %1 = class name, %2 = level
 * @type text
 * @default Class: %1 <%2>
 * 
 * @param Class Level X
 * @parent Draw Class Level
 * @desc Position of class level in window.
 * @type text
 * @default 0
 * 
 * @param Class Level Y
 * @parent Draw Class Level
 * @desc Position of class level in window.
 * @type text
 * @default 0
 * 
 * @param Draw HP Resource
 * @desc Draw actor current and max HP
 * @type boolean
 * @default false
 * 
 * @param HP Text
 * @parent Draw HP Resource
 * @desc Text for HP (Escape chars allowed)
 * %1 = Current, %2 = Max
 * @type text
 * @default \I[84]%1 / %2
 * 
 * @param HP X
 * @parent Draw HP Resource
 * @desc Position of text in window
 * @type text
 * @default 0
 * 
 * @param HP Y
 * @parent Draw HP Resource
 * @desc Position of text in window
 * @type text
 * @default 0
 * 
 * @param Draw MP Resource
 * @desc Draw actor current and max MP
 * @type boolean
 * @default false
 * 
 * @param MP Text
 * @parent Draw MP Resource
 * @desc Text for MP (Escape chars allowed)
 * %1 = Current, %2 = Max
 * @type text
 * @default \I[79]%1 / %2
 * 
 * @param MP X
 * @parent Draw MP Resource
 * @desc Position of text in window
 * @type text
 * @default 0
 * 
 * @param MP Y
 * @parent Draw MP Resource
 * @desc Position of text in window
 * @type text
 * @default 0
 * 
 * @param Draw TP Resource
 * @desc Draw actor current and max TP
 * @type boolean
 * @default false
 * 
 * @param TP Text
 * @parent Draw TP Resource
 * @desc Text for TP (Escape chars allowed)
 * %1 = Current, %2 = Max
 * @type text
 * @default \I[79]%1 / %2
 * 
 * @param TP X
 * @parent Draw TP Resource
 * @desc Position of text in window
 * @type text
 * @default 0
 * 
 * @param TP Y
 * @parent Draw TP Resource
 * @desc Position of text in window
 * @type text
 * @default 0
 * 
 * @param Draw Base Params
 * @desc Draw actor base params
 * @type struct<actorBaseParamWindow>[]
 * @default []
 * 
 * @param Draw Ex Params
 * @desc Draw actor extra params
 * @type struct<actorExParamWindow>[]
 * @default []
 * 
 * @param Draw Sp Params
 * @desc Draw actor special params
 * @type struct<actorSpParamWindow>[]
 * @default []
 * 
 * @param Display Map Character
 * @desc Display actor map character
 * @type boolean
 * @default false
 * 
 * @param Character Direction
 * @parent Display Map Character
 * @desc Facing direction of the character.
 * @type select
 * @option down
 * @value 2
 * @option left
 * @value 4
 * @option right
 * @value 6
 * @option up
 * @value 8
 * @default 2
 * 
 * @param Character X
 * @parent Display Map Character
 * @desc Position relative to window
 * @type text
 * @default 0
 * 
 * @param Character Y
 * @parent Display Map Character
 * @desc Position relative to window
 * @type text
 * @default 0
 * 
 * @param Character Scale X
 * @parent Display Map Character
 * @desc Size of the character
 * @type text
 * @default 1
 * 
 * @param Character Scale Y
 * @parent Display Map Character
 * @desc Size of the character
 * @type text
 * @default 1
 * 
 * @param Display Battler
 * @desc Display actor battler
 * @type boolean
 * @default false
 * 
 * @param Battler Motion
 * @parent Display Battler
 * @desc Battler motion to refresh to
 * @type select
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @default wait
 * 
 * @param Battler X
 * @parent Display Battler
 * @desc Position relative to window
 * @type text
 * @default 0
 * 
 * @param Battler Y
 * @parent Display Battler
 * @desc Position relative to window
 * @type text
 * @default 0
 * 
 * @param Battler Scale X
 * @parent Display Battler
 * @desc Size of the battler
 * @type text
 * @default 1
 * 
 * @param Battler Scale Y
 * @parent Display Battler
 * @desc Size of the battler
 * @type text
 * @default 1
 * 
 */
/*~struct~actorInfoWindow:
 * 
 * @param Name
 * @desc No function.
 * @type text
 * @default Window
 * 
 * @param Dimension Configuration
 * @desc Setup position and width of the window
 * @type struct<locSize>
 * @default {"X":"0","Y":"0","Width":"1","Height":"1"}
 * 
 * @param Window Font and Style Configuration
 * @desc Custom style the window
 * @type struct<windowStyle>
 * @default {"Font Settings":"","Font Size":"16","Font Face":"sans-serif","Base Font Color":"#ffffff","Font Outline Color":"rgba(0, 0, 0, 0.5)","Font Outline Thickness":"3","Window Skin":"Window","Window Opacity":"255","Show Window Dimmer":"false"}
 * 
 * @param Gauges
 * @desc Setup gauges for the window
 * @type struct<gaugeDraw>[]
 * @default []
 * 
 * @param Draw Actor Name
 * @desc Draw actor name
 * @type boolean
 * @default false
 * 
 * @param Name Text
 * @parent Draw Actor Name
 * @desc Text used for the name
 * %1 = Name, %2 = Nickname
 * @type text
 * @default %1
 * 
 * @param Name X
 * @parent Draw Actor Name
 * @desc Position of name in window
 * @type text
 * @default 0
 * 
 * @param Name Y
 * @parent Draw Actor Name
 * @desc Position of name in window
 * @type text
 * @default 0
 * 
 * @param Draw Actor Profile
 * @desc Draw actor profile
 * @type boolean
 * @default false
 * 
 * @param Profile X
 * @parent Draw Actor Profile
 * @desc Position of profile in window
 * @type text
 * @default 0
 * 
 * @param Profile Y
 * @parent Draw Actor Profile
 * @desc Position of profile in window
 * @type text
 * @default 0
 * 
 * @param Draw Class Level
 * @desc Draw actor class name and level
 * @type boolean
 * @default false
 * 
 * @param Class Level Text
 * @parent Draw Class Level
 * @desc Draw class name and level
 * %1 = class name, %2 = level
 * @type text
 * @default Class: %1 <%2>
 * 
 * @param Class Level X
 * @parent Draw Class Level
 * @desc Position of class level in window.
 * @type text
 * @default 0
 * 
 * @param Class Level Y
 * @parent Draw Class Level
 * @desc Position of class level in window.
 * @type text
 * @default 0
 * 
 * @param Draw HP Resource
 * @desc Draw actor current and max HP
 * @type boolean
 * @default false
 * 
 * @param HP Text
 * @parent Draw HP Resource
 * @desc Text for HP (Escape chars allowed)
 * %1 = Current, %2 = Max
 * @type text
 * @default \I[84]%1 / %2
 * 
 * @param HP X
 * @parent Draw HP Resource
 * @desc Position of text in window
 * @type text
 * @default 0
 * 
 * @param HP Y
 * @parent Draw HP Resource
 * @desc Position of text in window
 * @type text
 * @default 0
 * 
 * @param Draw MP Resource
 * @desc Draw actor current and max MP
 * @type boolean
 * @default false
 * 
 * @param MP Text
 * @parent Draw MP Resource
 * @desc Text for MP (Escape chars allowed)
 * %1 = Current, %2 = Max
 * @type text
 * @default \I[79]%1 / %2
 * 
 * @param MP X
 * @parent Draw MP Resource
 * @desc Position of text in window
 * @type text
 * @default 0
 * 
 * @param MP Y
 * @parent Draw MP Resource
 * @desc Position of text in window
 * @type text
 * @default 0
 * 
 * @param Draw TP Resource
 * @desc Draw actor current and max TP
 * @type boolean
 * @default false
 * 
 * @param TP Text
 * @parent Draw TP Resource
 * @desc Text for TP (Escape chars allowed)
 * %1 = Current, %2 = Max
 * @type text
 * @default \I[79]%1 / %2
 * 
 * @param TP X
 * @parent Draw TP Resource
 * @desc Position of text in window
 * @type text
 * @default 0
 * 
 * @param TP Y
 * @parent Draw TP Resource
 * @desc Position of text in window
 * @type text
 * @default 0
 * 
 * @param Draw Base Params
 * @desc Draw actor base params
 * @type struct<actorBaseParamWindow>[]
 * @default []
 * 
 * @param Draw Ex Params
 * @desc Draw actor extra params
 * @type struct<actorExParamWindow>[]
 * @default []
 * 
 * @param Draw Sp Params
 * @desc Draw actor special params
 * @type struct<actorSpParamWindow>[]
 * @default []
 * 
 * @param Display Map Character
 * @desc Display actor map character
 * @type boolean
 * @default false
 * 
 * @param Character Direction
 * @parent Display Map Character
 * @desc Facing direction of the character.
 * @type select
 * @option down
 * @value 2
 * @option left
 * @value 4
 * @option right
 * @value 6
 * @option up
 * @value 8
 * @default 2
 * 
 * @param Character X
 * @parent Display Map Character
 * @desc Position relative to window
 * @type text
 * @default 0
 * 
 * @param Character Y
 * @parent Display Map Character
 * @desc Position relative to window
 * @type text
 * @default 0
 * 
 * @param Character Scale X
 * @parent Display Map Character
 * @desc Size of the character
 * @type text
 * @default 1
 * 
 * @param Character Scale Y
 * @parent Display Map Character
 * @desc Size of the character
 * @type text
 * @default 1
 * 
 * @param Display Battler
 * @desc Display actor battler
 * @type boolean
 * @default false
 * 
 * @param Battler Motion
 * @parent Display Battler
 * @desc Battler motion to refresh to
 * @type select
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @default wait
 * 
 * @param Battler X
 * @parent Display Battler
 * @desc Position relative to window
 * @type text
 * @default 0
 * 
 * @param Battler Y
 * @parent Display Battler
 * @desc Position relative to window
 * @type text
 * @default 0
 * 
 * @param Battler Scale X
 * @parent Display Battler
 * @desc Size of the battler
 * @type text
 * @default 1
 * 
 * @param Battler Scale Y
 * @parent Display Battler
 * @desc Size of the battler
 * @type text
 * @default 1
 * 
 */
/*~struct~noticeWindow:
 * 
 * @param Name
 * @desc No function.
 * @type text
 * @default Window
 * 
 * @param Dimension Configuration
 * @desc Setup position and width of the window
 * @type struct<locSize>
 * @default {"X":"0","Y":"0","Width":"1","Height":"1"}
 * 
 * @param Window Font and Style Configuration
 * @desc Custom style the window
 * @type struct<windowStyle>
 * @default {"Font Settings":"","Font Size":"16","Font Face":"sans-serif","Base Font Color":"#ffffff","Font Outline Color":"rgba(0, 0, 0, 0.5)","Font Outline Thickness":"3","Window Skin":"Window","Window Opacity":"255","Show Window Dimmer":"false"}
 * 
 */
/*~struct~gameDataWindow:
 * 
 * @param Name
 * @desc No function.
 * @type text
 * @default Window
 * 
 * @param Dimension Configuration
 * @desc Setup position and width of the window
 * @type struct<locSize>
 * @default {"X":"0","Y":"0","Width":"1","Height":"1"}
 * 
 * @param Window Font and Style Configuration
 * @desc Custom style the window
 * @type struct<windowStyle>
 * @default {"Font Settings":"","Font Size":"16","Font Face":"sans-serif","Base Font Color":"#ffffff","Font Outline Color":"rgba(0, 0, 0, 0.5)","Font Outline Thickness":"3","Window Skin":"Window","Window Opacity":"255","Show Window Dimmer":"false"}
 * 
 * @param Display Switch
 * @desc Require this switch enabled to display window
 * If no switch, always show
 * @type switch
 * @default 0
 * 
 * @param Gauges
 * @desc Setup gauges for the window
 * @type struct<gaugeDraw>[]
 * @default []
 * 
 * @param Draw Texts
 * @desc Draw various text
 * @type struct<winText>[]
 * @default []
 * 
 * @param Text References
 * @parent Draw Texts
 * @desc Set code references for draw text
 * %1 = first, %2 = second, etc...
 * @type text[]
 * @default []
 * 
 * @param Draw Pictures
 * @desc Draw various pictures
 * @type struct<gfx>[]
 * @default []
 * 
 * @param Draw Play Time
 * @desc Draw play time
 * Also enables constant refresh.
 * @type boolean
 * @default false
 * 
 * @param Play Time Text
 * @parent Draw Play Time
 * @desc Text for play time.
 * %1 = value
 * @type text
 * @default Time: %1
 * 
 * @param Play Time X
 * @parent Draw Play Time
 * @desc Position of play time in window
 * @type text
 * @default 0
 * 
 * @param Play Time Y
 * @parent Draw Play Time
 * @desc Position of play time in window
 * @type text
 * @default 0
 * 
 * @param Draw Save Count
 * @desc Draw number of times game saved
 * @type boolean
 * @default false
 * 
 * @param Save Count Text
 * @parent Draw Save Count
 * @desc Text for save count.
 * %1 = value
 * @type text
 * @default Saves: %1
 * 
 * @param Save Count X
 * @parent Draw Save Count
 * @desc Position of save count in window
 * @type text
 * @default 0
 * 
 * @param Save Count Y
 * @parent Draw Save Count
 * @desc Position of save count in window
 * @type text
 * @default 0
 * 
 * @param Draw Gold
 * @desc Draw player currency
 * @type boolean
 * @default false
 * 
 * @param Gold Text
 * @parent Draw Gold
 * @desc Text for gold
 * %1 = gold amount
 * @type text
 * @default %1\G
 * 
 * @param Gold X
 * @parent Draw Gold
 * @desc Text position
 * @type text
 * @default 0
 * 
 * @param Gold Y
 * @parent Draw Gold
 * @desc Text position
 * @type text
 * @default 0
 * 
 */
/*~struct~sceneButton:
 * 
 * @param Screen X
 * @desc Position on screen
 * @type text
 * @default 0
 * 
 * @param Screen Y
 * @desc Position on screen
 * @type text
 * @default 0
 * 
 * @param Cold Graphic
 * @desc Graphic file for button
 * @type file
 * @dir img/pictures/
 * 
 * @param Hot Graphic
 * @desc Graphic file for button 
 * @type file
 * @dir img/pictures/
 * 
 */
/*~struct~partyUI:
 * 
 * @param Backgrounds
 * @desc Set the backgrounds for the scene
 * @type struct<staticPic>[]
 * @default []
 * 
 * @param Background Animations
 * @desc Set the backgrounds for the scene
 * @type struct<animPic>[]
 * @default []
 * 
 * @param Party Windows
 * @desc The party windows showing current members
 * @type struct<actorSelectWindow>[]
 * @default []
 * 
 * @param Party Member Windows
 * @parent Party Windows
 * @desc The windows to display party member information
 * @type struct<actorInfoWindow>[]
 * @default []
 * 
 * @param Available Actors Window
 * @desc The window showing all non-partied actors
 * @type struct<actorSelectWindow>
 * 
 * @param Actor Member Windows
 * @parent Available Actors Window
 * @desc The windows to display party member information
 * @type struct<actorInfoWindow>[]
 * @default []
 * 
 * @param Game Data Windows
 * @desc Add game data windows to scene
 * @type struct<gameDataWindow>[]
 * @default []
 * 
 * @param Confirm Button
 * @desc If set, must be clicked to exit scene
 * @type struct<sceneButton>
 * 
 */

function ACTOR_EVENT_PARSER_PRTYMNGMNT(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

function ACTOR_CONFIGURATION_PARSER_PRTYMNGMNT(obj){
    try{
        obj = JSON.parse(obj);
        try{
            obj['Specific Events'] = JSON.parse(obj['Specific Events']).map((config)=>{
                return ACTOR_EVENT_PARSER_PRTYMNGMNT(config);
            }).filter(Boolean)
        }catch(e){
            obj['Specific Events'] = [];
        }
        return obj;
    }catch(e){
        return;
    }
}

function PARTY_CONFIGURATION_PARSER_PRTYMNGMNT(obj){
    try{
        obj = JSON.parse(obj);
        try{
            obj['Default Members'] = JSON.parse(obj['Default Members']).map((id)=>{
                return eval(id);
            }).filter(Boolean);
        }catch(e){
            obj['Default Members'] = [];
        }
        try{
            obj['Swap To Code'] = JSON.parse(obj['Swap To Code']);
        }catch(e){
            obj['Swap To Code'] = "";
        }
        return obj;
    }catch(e){
        return;
    }
}

function ANIM_IMAGE_PARSER_PRTYMNGMNT(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

function TILING_IMAGE_PARSER_PRTYMNGMNT(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

function DIMENSION_CONFIGURATION_PARSER_PRTYMNGMNT(obj){
    try{
        obj = JSON.parse(obj);
        obj['X'] = eval(obj['X']);
        obj['Y'] = eval(obj['Y']);
        obj['Width'] = eval(obj['Width']);
        obj['Height'] = eval(obj['Height']);
    }catch(e){
        console.warn(`Failed to parse dimension configuration. ${e}`);
        const obj = {};
        obj['X'] = 0;
        obj['Y'] = 0;
        obj['Width'] = 1;
        obj['Height'] = 1;
    }
    return obj;
}

function WINDOW_STYLE_PARSER_PRTYMNGMNT(obj){
    try{
        obj = JSON.parse(obj)
        obj['Font Size'] = eval(obj['Font Size']);
        obj['Font Outline Thickness'] = eval(obj['Font Outline Thickness']);
        obj['Window Opacity'] = eval(obj['Window Opacity']);
        obj['Show Window Dimmer'] = eval(obj['Show Window Dimmer']);
    }catch(e){
        console.warn(`Failed to parse window style. ${e}`);
        const obj = {};
        obj['Font Size'] = 16;
        obj['Font Face'] = 'sans-serif';
        obj['Base Font Color'] = '#ffffff';
        obj['Font Outline Color'] = 'rgba(0, 0, 0, 0.5)';
        obj['Font Outline Thickness'] = 3;
        obj['Window Skin'] = 'Window';
        obj['Window Opacity'] = 255;
        obj['Show Window Dimmer'] = false;
    }
    return obj;
}

function GAUGE_DRAW_PARSER_PRTYMNGMNT(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

function ACTOR_BASE_PARAM_WINDOW_PARSER_PRTYMNGMNT(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

function ACTOR_EX_PARAM_WINDOW_PARSER_PRTYMNGMNT(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

function ACTOR_SP_PARAM_WINDOW_PARSER_PRTYMNGMNT(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

function ACTOR_DATA_WINDOW_PARSER_PRTYMNGMNT(obj){
    try{
        obj = JSON.parse(obj);
        obj['Dimension Configuration'] = DIMENSION_CONFIGURATION_PARSER_PRTYMNGMNT(obj['Dimension Configuration']);
        obj['Window Font and Style Configuration'] = WINDOW_STYLE_PARSER_PRTYMNGMNT(obj['Window Font and Style Configuration']);
        try{
            obj['Gauges'] = JSON.parse(obj['Gauges']).map((gauge_draw_config)=>{
                return GAUGE_DRAW_PARSER_PRTYMNGMNT(gauge_draw_config);
            }).filter(Boolean)
        }catch(e){
            obj['Gauges'] = [];
        }
        try{
            obj['Draw Base Params'] = JSON.parse(obj['Draw Base Params']).map((data)=>{
                return ACTOR_BASE_PARAM_WINDOW_PARSER_PRTYMNGMNT(data);
            }).filter(Boolean);
        }catch(e){
            obj['Draw Base Params'] = [];
        }
        try{
            obj['Draw Ex Params'] = JSON.parse(obj['Draw Ex Params']).map((data)=>{
                return ACTOR_EX_PARAM_WINDOW_PARSER_PRTYMNGMNT(data);
            }).filter(Boolean);
        }catch(e){
            obj['Draw Ex Params'] = [];
        }
        try{
            obj['Draw Sp Params'] = JSON.parse(obj['Draw Sp Params']).map((data)=>{
                return ACTOR_SP_PARAM_WINDOW_PARSER_PRTYMNGMNT(data);
            }).filter(Boolean);
        }catch(e){
            obj['Draw Sp Params'] = [];
        }
        return obj;
    }catch(e){
        return;
    }
}

function ACTOR_SELECT_WINDOW_PARSER_PRTYMNGMNT(obj){
    try{
        obj = JSON.parse(obj);
        obj['Dimension Configuration'] = DIMENSION_CONFIGURATION_PARSER_PRTYMNGMNT(obj['Dimension Configuration']);
        obj['Window Font and Style Configuration'] = WINDOW_STYLE_PARSER_PRTYMNGMNT(obj['Window Font and Style Configuration']);
        try{
            obj['Gauges'] = JSON.parse(obj['Gauges']).map((gauge_draw_config)=>{
                return GAUGE_DRAW_PARSER_PRTYMNGMNT(gauge_draw_config);
            }).filter(Boolean)
        }catch(e){
            obj['Gauges'] = [];
        }
        try{
            obj['Draw Base Params'] = JSON.parse(obj['Draw Base Params']).map((data)=>{
                return ACTOR_BASE_PARAM_WINDOW_PARSER_PRTYMNGMNT(data);
            }).filter(Boolean);
        }catch(e){
            obj['Draw Base Params'] = [];
        }
        try{
            obj['Draw Ex Params'] = JSON.parse(obj['Draw Ex Params']).map((data)=>{
                return ACTOR_EX_PARAM_WINDOW_PARSER_PRTYMNGMNT(data);
            }).filter(Boolean);
        }catch(e){
            obj['Draw Ex Params'] = [];
        }
        try{
            obj['Draw Sp Params'] = JSON.parse(obj['Draw Sp Params']).map((data)=>{
                return ACTOR_SP_PARAM_WINDOW_PARSER_PRTYMNGMNT(data);
            }).filter(Boolean);
        }catch(e){
            obj['Draw Sp Params'] = [];
        }
        return obj;
    }catch(e){
        return;
    }
}

function WINDOW_TEXT_PARSER_PRTYMNGMNT(obj){
    try{
        obj = JSON.parse(obj);
        try{
            obj['Text'] = JSON.parse(obj['Text']);
        }catch(e){
            obj['Text'] = "";
        }
        return obj
    }catch(e){
        return;
    }
}

function GRAPHIC_PARSER_PRTYMNGMNT(obj){
    try{
        obj = JSON.parse(obj);
        return obj
    }catch(e){
        return;
    }
}

function NOTICE_WINDOW_PARSER_PRTYMNGMNT(obj){
    try{
        obj = JSON.parse(obj);
        obj['Dimension Configuration'] = DIMENSION_CONFIGURATION_PARSER_PRTYMNGMNT(obj['Dimension Configuration']);
        obj['Window Font and Style Configuration'] = WINDOW_STYLE_PARSER_PRTYMNGMNT(obj['Window Font and Style Configuration']);
        return obj;
    }catch(e){
        return;
    }
}

function GAME_DATA_WINDOW_PARSER_PRTYMNGMNT(obj){
    try{
        obj = JSON.parse(obj);
        obj['Dimension Configuration'] = DIMENSION_CONFIGURATION_PARSER_PRTYMNGMNT(obj['Dimension Configuration']);
        obj['Window Font and Style Configuration'] = WINDOW_STYLE_PARSER_PRTYMNGMNT(obj['Window Font and Style Configuration']);
        try{
            obj['Gauges'] = JSON.parse(obj['Gauges']).map((gauge_draw_config)=>{
                return GAUGE_DRAW_PARSER_PRTYMNGMNT(gauge_draw_config);
            }).filter(Boolean)
        }catch(e){
            obj['Gauges'] = [];
        }
        try{
            const texts = JSON.parse(obj['Draw Texts']).map((text_config)=>{
                return WINDOW_TEXT_PARSER_PRTYMNGMNT(text_config);
            }).filter(Boolean);
            obj['Draw Texts'] = texts;
        }catch(e){
            obj['Draw Texts'] = [];
        }
        try{
            const codes = JSON.parse(obj['Text References'])
            obj['Text References'] = codes;
        }catch(e){
            obj['Text References'] = [];
        }
        try{
            const pictures = JSON.parse(obj['Draw Pictures']).map((pic_config)=>{
                return GRAPHIC_PARSER_PRTYMNGMNT(pic_config);
            }).filter(Boolean);
            obj['Draw Pictures'] = pictures;
        }catch(e){
            obj['Draw Pictures'] = [];
        }
        return obj;
    }catch(e){
        return;
    }
}

function BUTTON_PARSER_PRTYMNGMT(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

function PARTY_UI_PARSER_PRTYMNGMT(obj){
    try{
        obj = JSON.parse(obj);
        try{
            obj['Backgrounds'] = JSON.parse(obj['Backgrounds']).map((img)=>{
                return TILING_IMAGE_PARSER_PRTYMNGMNT(img);
            }).filter(Boolean)
        }catch(e){
            obj['Backgrounds'] = [];
        }
        try{
            obj['Background Animations'] = JSON.parse(obj['Background Animations']).map((img)=>{
                return ANIM_IMAGE_PARSER_PRTYMNGMNT(img);
            }).filter(Boolean)
        }catch(e){
            obj['Background Animations'] = [];
        }
        try{
            obj['Party Windows'] = JSON.parse(obj['Party Windows']).map((wndw)=>{
                return ACTOR_SELECT_WINDOW_PARSER_PRTYMNGMNT(wndw);
            }).filter(Boolean)
        }catch(e){
            obj['Party Windows'] = [];
        }
        try{
            obj['Party Member Windows'] = JSON.parse(obj['Party Member Windows']).map((wndw)=>{
                return ACTOR_DATA_WINDOW_PARSER_PRTYMNGMNT(wndw);
            }).filter(Boolean)
        }catch(e){
            obj['Party Member Windows'] = [];
        }
        obj['Available Actors Window'] = ACTOR_SELECT_WINDOW_PARSER_PRTYMNGMNT(obj['Available Actors Window']);
        try{
            obj['Actor Member Windows'] = JSON.parse(obj['Actor Member Windows']).map((wndw)=>{
                return ACTOR_DATA_WINDOW_PARSER_PRTYMNGMNT(wndw);
            }).filter(Boolean)
        }catch(e){
            obj['Actor Member Windows'] = [];
        }
        obj['Notification Window'] = NOTICE_WINDOW_PARSER_PRTYMNGMNT(obj['Notification Window']);
        try{
            obj['Game Data Windows'] = JSON.parse(obj['Game Data Windows']).map((wndw)=>{
                return GAME_DATA_WINDOW_PARSER_PRTYMNGMNT(wndw);
            }).filter(Boolean)
        }catch(e){
            obj['Game Data Windows'] = [];
        }
        obj['Confirm Button'] = BUTTON_PARSER_PRTYMNGMT(obj['Confirm Button']);
        return obj;
    }catch(e){
        return;
    }
}

const Syn_PrtyMngt = {};
Syn_PrtyMngt.Plugin = PluginManager.parameters(`Synrec_PartyManager`);

Syn_PrtyMngt.ISOLATED_INVENTORIES = eval(Syn_PrtyMngt.Plugin['Allow Separate Inventories']);
Syn_PrtyMngt.EVENT_TOUCH_TRIGGER = eval(Syn_PrtyMngt.Plugin['Event Touch Trigger']);
Syn_PrtyMngt.ALLOW_SWAP_SWITCH = Syn_PrtyMngt.Plugin['Allow Party Swap Switch'];
Syn_PrtyMngt.NEXT_PARTY_BUTTON = Syn_PrtyMngt.Plugin['Next Party Button'];
Syn_PrtyMngt.PREV_PARTY_BUTTON = Syn_PrtyMngt.Plugin['Previous Party Button'];

try{
    Syn_PrtyMngt.ACTOR_CONFIGURATIONS = JSON.parse(Syn_PrtyMngt.Plugin['Actor Configurations']).map((config)=>{
        return ACTOR_CONFIGURATION_PARSER_PRTYMNGMNT(config);
    }).filter(Boolean)
}catch(e){
    Syn_PrtyMngt.ACTOR_CONFIGURATIONS = [];
}

try{
    Syn_PrtyMngt.PARTY_CONFIGURATIONS = JSON.parse(Syn_PrtyMngt.Plugin['Party Configurations']).map((config)=>{
        return PARTY_CONFIGURATION_PARSER_PRTYMNGMNT(config);
    }).filter(Boolean)
}catch(e){
    Syn_PrtyMngt.PARTY_CONFIGURATIONS = [];
}

Syn_PrtyMngt.UI = PARTY_UI_PARSER_PRTYMNGMT(Syn_PrtyMngt.Plugin['Party Setup UI']);


if(Utils.RPGMAKER_NAME == 'MZ'){
    PluginManager.registerCommand(`Synrec_PartyManager`, `Set Party`, (obj)=>{
        const id = obj['Identifier'];
        $gameParty.setMultiParty(id);
    })

    PluginManager.registerCommand(`Synrec_PartyManager`, `Next Party`, ()=>{
        $gameParty.nextMultiParty();
    })

    PluginManager.registerCommand(`Synrec_PartyManager`, `Previous Party`, ()=>{
        $gameParty.prevMultiParty();
    })

    PluginManager.registerCommand(`Synrec_PartyManager`, `Open Manager`, ()=>{
        SceneManager.push(SceneSynrec_PartyEditor);
    })

    PluginManager.registerCommand(`Synrec_PartyManager`, `Open Manager Proximal`, (obj)=>{
        const range = eval(obj['Range']);
        $gameTemp.openManagerProximal(range);
    })

    PluginManager.registerCommand(`Synrec_PartyManager`, `Add Actor To Current`, (obj)=>{
        const actor = eval(obj['Actor']);
        $gameParty.addActorToCurrentParty(actor);
    })

    PluginManager.registerCommand(`Synrec_PartyManager`, `Add Actor To ID`, (obj)=>{
        const actor = eval(obj['Actor']);
        const id = obj['Identifier']
        $gameParty.addActorToIdentifiedParty(id, actor);
    })
}

Game_Temp.prototype.openManagerProximal = function(range){
    range = range || 1;
    const map_id = $gameMap._mapId;
    const px = $gamePlayer.x;
    const py = $gamePlayer.y;
    const current_party = $gameParty.currentMultiParty();
    const other_parties = $gameParty._multi_parties.filter((party)=>{
        if(party['Identifier'] == current_party['Identifier'])return false;
        if(party['Default Map'] != map_id)return false;
        const mx = eval(party['Map X']);
        const my = eval(party['Map Y']);
        const dist = $gameMap.distance(px,py,mx,my);
        return dist <= range;
    })
    this.setAllowedParties(other_parties.map(party=>party['Identifier']).concat(current_party['Identifier']));
    SceneManager.push(SceneSynrec_PartyEditor);
}

Game_Temp.prototype.setAllowedParties = function(list){
    this._permitted_management_parties = list;
}

Game_Temp.prototype.allowedParties = function(){
    return this._permitted_management_parties;
}

Game_Temp.prototype.clearAllowedParties = function(){
    this._permitted_management_parties = null;
}

Syn_PrtyMngt_GmSw_SetVal = Game_Switches.prototype.setValue;
Game_Switches.prototype.setValue = function(switchId, value) {
    Syn_PrtyMngt_GmSw_SetVal.call(this, ...arguments);
    $gameParty.doSwitchAction(switchId, value);
}

Syn_PrtyMngt_GmCharBse_IsCollChars = Game_CharacterBase.prototype.isCollidedWithCharacters;
Game_CharacterBase.prototype.isCollidedWithCharacters = function(x, y) {
    return Syn_PrtyMngt_GmCharBse_IsCollChars.call(this, ...arguments) || this.isCollidedWithParty(x, y);
}

Game_CharacterBase.prototype.isCollidedWithParty = function(x, y){
    const current_map = $gameMap._mapId;
    const all_parties = $gameParty._multi_parties || [];
    if(all_parties.length <= 0)return false;
    const current_party = $gameParty.currentMultiParty();
    const parties = $gameTemp._partyLeads.filter((party)=>{
        return (
            party.x == x &&
            party.y == y &&
            !party.isThrough()
        )
    })
    return parties.length > 0;
}

Syn_PrtyMngt_GmPlyr_SetpNwGm = Game_Player.prototype.setupForNewGame;
Game_Player.prototype.setupForNewGame = function() {
    const party = $gameParty.currentMultiParty();
    if(party){
        const map = eval(party['Default Map']);
        const x = eval(party['Map X']);
        const y = eval(party['Map Y']);
        const d = eval(party['Map Direction']);
        $gamePlayer.reserveTransfer(map, x, y, d, 0);
        return;
    }
    Syn_PrtyMngt_GmPlyr_SetpNwGm.call(this, ...arguments);
}

Syn_PrtyMngt_GmPlyr_TrigBtnActn = Game_Player.prototype.triggerButtonAction;
Game_Player.prototype.triggerButtonAction = function() {
    const trigger_valid = Syn_PrtyMngt_GmPlyr_TrigBtnActn.call(this, ...arguments);
    if(trigger_valid)return true;
    if (Input.isTriggered("ok")) {
        if(this.triggerPartyLead())return true;
    }
    return false;
}

Game_Player.prototype.triggerPartyLead = function(){
    const x = this.x;
    const y = this.y;
    const d = this.direction();
    const nx = $gameMap.roundXWithDirection(x,d);
    const ny = $gameMap.roundYWithDirection(y,d);
    const party_lead = $gameTemp._partyLeads.find((lead)=>{
        return (
            !lead.isThrough() &&
            lead.x == nx &&
            lead.y == ny
        )
    });
    if(party_lead){
        party_lead.interact();
        return true;
    }
    return false;
}

function GameCharacter_MenuCharacter(){
    this.initialize(...arguments);
}

GameCharacter_MenuCharacter.prototype = Object.create(Game_Character.prototype);
GameCharacter_MenuCharacter.prototype.constructor = GameCharacter_MenuCharacter;

GameCharacter_MenuCharacter.prototype.allowPixelMove = function(){
    //DO NOTHING!
}

GameCharacter_MenuCharacter.prototype.screenX = function() {
    return this._screenX || 0;
}

GameCharacter_MenuCharacter.prototype.screenY = function() {
    return this._screenY || 0;
}

GameCharacter_MenuCharacter.prototype.screenZ = function() {
    return 1;
}

GameCharacter_MenuCharacter.prototype.setActor = function(actor){
    if(actor instanceof (Game_Actor)){
        this._actor = actor;
        const char_name = actor.characterName();
        const char_index = actor.characterIndex();
        this.setImage(char_name, char_index);
        this.setStepAnime(true);
    }else{
        this.setImage("", 0);
    }
}

GameCharacter_MenuCharacter.prototype.setScreenX = function(num){
    isNaN(num) ? num = 0 : num;
    this._screenX = num;
}

GameCharacter_MenuCharacter.prototype.setScreenY = function(num){
    isNaN(num) ? num = 0 : num;
    this._screenY = num;
}

function GameCharacter_PartyLead(){
    this.initialize(...arguments);
}

GameCharacter_PartyLead.prototype = Object.create(Game_Character.prototype);
GameCharacter_PartyLead.prototype.constructor = GameCharacter_PartyLead;

GameCharacter_PartyLead.prototype.initialize = function(party_id){
    Game_Character.prototype.initialize.call(this);
    this._party_id = party_id;
    this.setThrough(true);
    this.setupParty(party_id);
}

GameCharacter_PartyLead.prototype.lockedParty = function(party_data){
    const unlock_sw = eval(party_data['Unlock Switch']);
    const lock_sw = eval(party_data['Lock Switch']);
    if(lock_sw && $gameSwitches.value(lock_sw))return true;
    if(unlock_sw && !$gameSwitches.value(unlock_sw))return true;
    return false;
}

GameCharacter_PartyLead.prototype.setupParty = function(party_id){
    const party_data = $gameParty.getMultiParty(party_id);
    if(!party_data || this.lockedParty(party_data)){
        this.setThrough(true);
        this.setImage("", 0);
        return;
    }
    this._data = party_data;
    const current_party = $gameParty.currentMultiParty();
    if(current_party['Identifier'] == party_data['Identifier']){
        this.setThrough(true);
        this.setImage("", 0);
        return;
    }
    const members = party_data['Members'];
    const leader_chk = members[0];
    if(!leader_chk)return;
    const leader = leader_chk instanceof Game_Actor ? leader_chk : $gameActors.actor(leader_chk);
    const char_file = leader.characterName();
    const char_indx = leader.characterIndex();
    this.setImage(char_file, char_indx);
    this.setThrough(false);
    const x = eval(party_data['Map X']);
    const y = eval(party_data['Map Y']);
    this.locate(x, y);
    const d = eval(party_data['Map Direction']);
    this.setDirection(d);
    this._allow_event_touch = true;
}

GameCharacter_PartyLead.prototype.interact = function(){
    const data = this._data;
    const members = data['Members'];
    const leader_chk = members[0];
    if(!leader_chk)return;
    const actor = leader_chk instanceof Game_Actor ? leader_chk : $gameActors.actor(leader_chk);
    const actor_id = actor._actorId;
    const actor_config = Syn_PrtyMngt.ACTOR_CONFIGURATIONS.find((config)=>{
        return eval(config['Actor']) == actor_id;
    })
    if(!actor_config)return;
    const specific_interact_events = actor_config['Specific Events'];
    const player = $gameParty.leader();
    const player_id = player._actorId;
    const specific_event_setup = specific_interact_events.find((config)=>{
        return eval(config['Target Actor']) == player_id;
    })
    if(specific_event_setup){
        const evnt = eval(specific_event_setup['Event']);
        $gameTemp.reserveCommonEvent(evnt);
        this.turnTowardPlayer();
    }else{
        const evnt = eval(actor_config['Default Event']);
        $gameTemp.reserveCommonEvent(evnt);
        this.turnTowardPlayer();
    }
}

Game_Event.prototype.getPartyLead = function(x, y){
    const cur_party = $gameParty.currentMultiParty();
    const parties = $gameParty._multi_parties.filter((party)=>{
        return party['Identifier'] != cur_party['Identifier'];
    })
    return parties.find((party)=>{
        const sw_id = eval(party['Unlock Switch']);
        if(sw_id && !$gameSwitches.value(sw_id))return false;
        const mx = eval(party['Map X']);
        const my = eval(party['Map Y']);
        return (
            mx == x &&
            my == y
        )
    })
}

Syn_PrtyMngt_GmEvnt_ChkEvntTrigTch = Game_Event.prototype.checkEventTriggerTouch;
Game_Event.prototype.checkEventTriggerTouch = function(x, y) {
    Syn_PrtyMngt_GmEvnt_ChkEvntTrigTch.call(this, ...arguments);
    if(!Syn_PrtyMngt.EVENT_TOUCH_TRIGGER)return;
    if (!$gameMap.isEventRunning()) {
        const party_lead = this.getPartyLead(x, y);
        if(!party_lead)return;
        const id = party_lead['Identifier'];
        if (this._trigger === 2 && party_lead) {
            if (
                !this.isJumping() && 
                this.isNormalPriority()
            ) {
                $gameParty.setFastMultiParty(id, this);
            }
        }
    }
}

Syn_PrtyMngt_GmPrty_Init = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
    Syn_PrtyMngt_GmPrty_Init.call(this, ...arguments);
    this.initMultiParty();
}

Game_Party.prototype.initMultiParty = function(){
    this._party_index = 0;
    this._multi_parties = JsonEx.makeDeepCopy(Syn_PrtyMngt.PARTY_CONFIGURATIONS);
    this._multi_parties.forEach((party)=>{
        party['Members'] = [];
        party['Inventory'] = {
            items:{},
            weapons:{},
            armors:{}
        };
        party['Gold'] = 0;
        party['Steps'] = 0;
    })
}

Game_Party.prototype.currentMultiParty = function(){
    const index = this._party_index;
    return this._multi_parties[index]
}

Game_Party.prototype.getMultiParty = function(id){
    return this._multi_parties.find((party)=>{
        return party['Identifier'] == id;
    })
}

Syn_PrtyMngt_GmPrty_Exsts = Game_Party.prototype.exists;
Game_Party.prototype.exists = function(){
    const party = this.currentMultiParty();
    if(isNaN(this._party_index) || !party){
        return Syn_PrtyMngt_GmPrty_Exsts.call(this, ...arguments);
    }
    const members = party['Members'];
    return members.length > 0;
}

Syn_PrtyMngt_GmPrty_Size = Game_Party.prototype.size;
Game_Party.prototype.size = function(){
    const party = this.currentMultiParty();
    if(isNaN(this._party_index) || !party){
        return Syn_PrtyMngt_GmPrty_Size.call(this, ...arguments);
    }
    const members = party['Members'];
    return members.length;
}

Game_Party.prototype.baseAllMembers = function(){
    const actors = this._actors.map((id)=>{
        if(isNaN(id)){
            if(id instanceof Game_Actor){
                return id;
            }
        }else{
            return $gameActors.actor(id);
        }
    }).filter(Boolean)
    return actors;
}

Syn_PrtyMngt_GmPrty_Allmems = Game_Party.prototype.allMembers;
Game_Party.prototype.allMembers = function() {
    const party = this.currentMultiParty();
    if(isNaN(this._party_index) || !party){
        return Syn_PrtyMngt_GmPrty_Allmems.call(this, ...arguments);
    }
    const members = party['Members'].map((id)=>{
        if(isNaN(id)){
            if(id instanceof Game_Actor){
                return id;
            }
        }else{
            return $gameActors.actor(id);
        }
    }).filter(Boolean)
    return members;
}

Syn_PrtyMngt_GmPrty_MaxBattMems = Game_Party.prototype.maxBattleMembers;
Game_Party.prototype.maxBattleMembers = function() {
    const party = this.currentMultiParty();
    if(isNaN(this._party_index) || !party){
        return Syn_PrtyMngt_GmPrty_MaxBattMems.call(this, ...arguments);
    }
    return eval(party['Max Battle Members']);
}

Syn_PrtyMngt_GmPrty_SetpBattTestMems = Game_Party.prototype.setupBattleTestMembers;
Game_Party.prototype.setupBattleTestMembers = function() {
    Syn_PrtyMngt_GmPrty_SetpBattTestMems.call(this, ...arguments);
    if(DataManager.isBattleTest()){
        this._member_object_mode = this._actors.some((actor)=>{
            return actor instanceof Game_Actor;
        })
        for (const battler of $dataSystem.testBattlers) {
            const multi_parties = this._multi_parties;
            const init_party = multi_parties[0];
            init_party['Members'] = [];
            const actor = $gameActors.actor(battler.actorId);
            if (actor) {
                actor.changeLevel(battler.level, false);
                actor.initEquips(battler.equips);
                actor.recoverAll();
                if(this._member_object_mode){
                    init_party['Members'].push(actor);
                }else{
                    init_party['Members'].push(battler.actorId);
                }
            }
        }
    }
}

Syn_PrtyMngt_GmPrty_Itms = Game_Party.prototype.items;
Game_Party.prototype.items = function() {
    const party = this.currentMultiParty();
    const isolated_inventory = eval(Syn_PrtyMngt.ISOLATED_INVENTORIES);
    const party_items = Syn_PrtyMngt_GmPrty_Itms.call(this, ...arguments);
    if(!isolated_inventory || !party){
        return party_items;
    }
    const party_inventory = party['Inventory'];
    const items = party_inventory.items;
    return Object.keys(items).map(id => $dataItems[id]);
}

Syn_PrtyMngt_GmPrty_AddActr = Game_Party.prototype.addActor;
Game_Party.prototype.addActor = function(actorId) {
    if(this.actorIdInAnyParty(actorId))return;
    Syn_PrtyMngt_GmPrty_AddActr.call(this, ...arguments);
}

Syn_PrtyMngt_GmPrty_Wpns = Game_Party.prototype.weapons;
Game_Party.prototype.weapons = function() {
    const party = this.currentMultiParty();
    const isolated_inventory = eval(Syn_PrtyMngt.ISOLATED_INVENTORIES);
    const party_weps = Syn_PrtyMngt_GmPrty_Wpns.call(this, ...arguments);
    if(!isolated_inventory || !party){
        return party_weps;
    }
    const party_inventory = party['Inventory'];
    const weapons = party_inventory.weapons;
    return Object.keys(weapons).map(id => $dataWeapons[id]);
}

Syn_PrtyMngt_GmPrty_Arms = Game_Party.prototype.armors;
Game_Party.prototype.armors = function() {
    const party = this.currentMultiParty();
    const isolated_inventory = eval(Syn_PrtyMngt.ISOLATED_INVENTORIES);
    const party_arms = Syn_PrtyMngt_GmPrty_Arms.call(this, ...arguments);
    if(!isolated_inventory || !party){
        return party_arms;
    }
    const party_inventory = party['Inventory'];
    const armors = party_inventory.armors;
    return Object.keys(armors).map(id => $dataArmors[id]);
}

Syn_PrtyMngt_GmPrty_ItmCntr = Game_Party.prototype.itemContainer;
Game_Party.prototype.itemContainer = function(item) {
    const party = this.currentMultiParty();
    const isolated_inventory = eval(Syn_PrtyMngt.ISOLATED_INVENTORIES);
    if(!isolated_inventory || !party){
        return Syn_PrtyMngt_GmPrty_ItmCntr.call(this, ...arguments);
    }
    const party_inventory = party['Inventory'];
    const items = party_inventory.items;
    const weapons = party_inventory.weapons;
    const armors = party_inventory.armors;
    if (!item) {
        return null;
    } else if (DataManager.isItem(item)) {
        return items;
    } else if (DataManager.isWeapon(item)) {
        return weapons;
    } else if (DataManager.isArmor(item)) {
        return armors;
    } else {
        return null;
    }
}

Syn_PrtyMngt_GmPrty_SetpStrtMems = Game_Party.prototype.setupStartingMembers;
Game_Party.prototype.setupStartingMembers = function() {
    Syn_PrtyMngt_GmPrty_SetpStrtMems.call(this, ...arguments);
    this._member_object_mode = this._actors.some((actor)=>{
        return actor instanceof Game_Actor;
    })
    this.setupMultiPartyDefaults();
}

Game_Party.prototype.actorIdInAnyParty = function(actor_id){
    const object_mode = this._member_object_mode;
    if(object_mode)return false;
    const free_members = this._actors;
    if(free_members.includes(actor_id))return true;
    const all_parties = this._multi_parties;
    return all_parties.some((party)=>{
        const members = party['Members'];
        return members.includes(actor_id);
    })
}

Game_Party.prototype.addActorToCurrentParty = function(actor_id){
    const current_party = this.currentMultiParty();
    const members = current_party['Members'];
    const max_members = eval(current_party['Max Members']);
    if(members.length >= max_members)return;
    const object_mode = this._member_object_mode;
    if(object_mode){
        const actor = new Game_Actor(actor_id);
        members.push(actor);
    }else{
        $gameActors.actor(actor_id);
        if(this.actorIdInAnyParty(actor_id))return;
        members.push(actor_id);
    }
    $gamePlayer.refresh();
}

Game_Party.prototype.addActorToIdentifiedParty = function(id, actor_id){
    const current_party = this.getMultiParty(id);
    if(!current_party)return;
    const members = current_party['Members'];
    const max_members = eval(current_party['Max Members']);
    if(members.length >= max_members)return;
    const object_mode = this._member_object_mode;
    if(object_mode){
        const actor = new Game_Actor(actor_id);
        members.push(actor);
    }else{
        $gameActors.actor(actor_id);
        if(this.actorIdInAnyParty(actor_id))return;
        members.push(actor_id);
    }
    $gamePlayer.refresh();
}

Game_Party.prototype.swapMultiParty = function(
    party_id_1, 
    party_index_1,
    party_id_2, 
    party_index_2,
){
    const party_1 = party_id_1 ? this.getMultiParty(party_id_1) : null;
    if(party_1){
        const allow_sw_id = eval(party_1['Allow Party Lead Change']);
        if(
            (
                eval(party_1['Lock Leader']) ||
                (
                    allow_sw_id &&
                    !$gameSwitches.value(allow_sw_id)
                )
            ) && 
            party_index_1 == 0
        ){
            return;
        }
    }
    let party_1_members = party_id_1 ? party_1['Members'] : this._actors;
    let member_1 = party_1_members[party_index_1];
    const party_2 = party_id_2 ? this.getMultiParty(party_id_2) : null;
    if(party_2){
        const allow_sw_id = eval(party_2['Allow Party Lead Change']);
        if(
            (
                eval(party_2['Lock Leader']) ||
                (
                    allow_sw_id &&
                    !$gameSwitches.value(allow_sw_id)
                )
            ) && 
            party_index_2 == 0
        ){
            return;
        }
    }
    let party_2_members = party_id_2 ? party_2['Members'] : this._actors;
    let member_2 = party_2_members[party_index_2];
    let index = 0;
    if(party_1){
        if(
            eval(party_1['Prevent Empty']) &&
            !member_2
        ){
            return;
        }
    }
    if(party_2){
        if(
            eval(party_2['Prevent Empty']) &&
            !member_1
        ){
            return;
        }
    }
    const members_1 = party_1_members.map((mem)=>{
        if(index == party_index_1){
            index++;
            return member_2;
        }else{
            index++;
            return mem;
        }
    }).filter(Boolean)
    if(!members_1.includes(member_2)){
        members_1.push(member_2)
    }
    if(party_id_1){
        party_1['Members'] = members_1.filter(Boolean);
    }else{
        this._actors = members_1.filter(Boolean);
    }
    if(party_id_1 == party_id_2){
        if(party_id_1){
            party_2_members = party_1['Members'];
        }else{
            party_2_members = this._actors;
        }
    }
    index = 0;
    const members_2 = party_2_members.map((mem)=>{
        if(index == party_index_2){
            index++;
            return member_1;
        }else{
            index++;
            return mem;
        }
    }).filter(Boolean)
    if(!members_2.includes(member_1)){
        members_2.push(member_1)
    }
    if(party_id_2){
        party_2['Members'] = members_2.filter(Boolean);
    }else{
        this._actors = members_2.filter(Boolean);
    }
    this.removeExcessMultiMembers();
    $gamePlayer.refresh();
}

Game_Party.prototype.removeExcessMultiMembers = function(){
    const actors = this._actors;
    const parties = $gameParty._multi_parties;
    parties.forEach((party)=>{
        const members = party['Members'];
        const max = party['Max Members'];
        for(let i = max; i < members.length; i++){
            const mem = members[i];
            if(mem){
                actors.push(mem);
                members.splice(i, 1);
                i--;
            }
        }
    })
}

Game_Party.prototype.doSwitchAction = function(sw, val){
    const current_party = this.currentMultiParty();
    const lock_sw = eval(current_party['Lock Switch']);
    if(lock_sw == sw && !!val && lock_sw){
        this.nextMultiParty();
    }
    const actor_configs = JsonEx.makeDeepCopy(Syn_PrtyMngt.ACTOR_CONFIGURATIONS);
    actor_configs.forEach((config)=>{
        const actor_id = eval(config['Actor']);
        const add_sw = eval(config['Add Switch']);
        if(!add_sw)return;
        if(add_sw == sw){
            const multi_parties = this._multi_parties;
            if(!val){
                if(this._member_object_mode){
                    while(
                        this._actors.some((mem)=>{
                            return mem._actorId == actor_id;
                        })
                    ){
                        for(let i = 0; i < this._actors.length; i++){
                            const actor = this._actors[i];
                            if(actor._actorId == actor_id){
                                this._actors.splice(i, 1);
                                i--;
                            }
                        }
                    }
                    multi_parties.forEach((party)=>{
                        const members = party['Members'];
                        for(let i = 0; i < members.length; i++){
                            const mem = members[i];
                            if(mem._actorId == actor_id){
                                members.splice(i, 1);
                                i--;
                            }
                        }
                    })
                }else{
                    for(let i = 0; i < this._actors.length; i++){
                        const id = this._actors[i];
                        if(id == actor_id){
                            this._actors.splice(i, 1);
                            i--;
                        }
                    }
                    multi_parties.forEach((party)=>{
                        const members = party['Members'];
                        for(let i = 0; i < members.length; i++){
                            const id = members[i];
                            if(id == actor_id){
                                members.splice(i, 1);
                                i--;
                            }
                        }
                    })
                }
            }else{
                if(this._member_object_mode){
                    const actor = new Game_Actor(actor_id);
                    this._actors.push(actor);
                }else{
                    if(
                        !this._actors.includes(actor_id) &&
                        !this.actorIdInAnyParty(actor_id)
                    ){
                        $gameActors.actor(actor_id);
                        this._actors.push(actor_id);
                    }
                }
            }
        }
    })
    $gamePlayer.refresh();
    this.emergencyUnlock();
    const cur_party = this.currentMultiParty();
    const cur_unlock_sw = eval(cur_party['Unlock Switch']);
    const cur_lock_sw = eval(cur_party['Lock Switch']);
    if($gameMap._mapId){
        cur_party['Default Map'] = $gameMap._mapId;
        cur_party['Map X'] = $gamePlayer.x;
        cur_party['Map Y'] = $gamePlayer.y;
        cur_party['Map Direction'] = $gamePlayer.direction();
    }
    if(
        (
            cur_unlock_sw && 
            !$gameSwitches.value(cur_unlock_sw)
        ) ||
        (
            cur_lock_sw &&
            $gameSwitches.value(cur_lock_sw)
        )
    ){
        this.nextMultiParty();
        const cur_party = this.currentMultiParty();
        const map = eval(cur_party['Default Map']);
        const x = eval(cur_party['Map X']);
        const y = eval(cur_party['Map Y']);
        const d = eval(cur_party['Map Direction']);
        $gamePlayer.reserveTransfer(map, x, y, d, 0);
    }
    ($gameTemp._partyLeads || []).forEach((lead_char)=>{
        const party_id = lead_char._party_id;
        lead_char.setupParty(party_id);
    })
}

Game_Party.prototype.emergencyUnlock = function(){
    if(this.allLocked()){
        const multi_parties = this._multi_parties;
        const first_party = multi_parties[0];
        const unlock_sw = eval(first_party['Unlock Switch']);
        const lock_sw = eval(first_party['Lock Switch']);
        if(unlock_sw){
            $gameSwitches.setValue(unlock_sw, true);
        }
        if(lock_sw){
            $gameSwitches.setValue(lock_sw, false);
        }
        this.nextMultiParty();
    }
}

Game_Party.prototype.setupMultiPartyDefaults = function(){
    let setup_starting = false;
    const object_mode = this._member_object_mode;
    const all_actors = this._actors;
    const parties = this._multi_parties;
    parties.forEach((party)=>{
        const max = eval(party['Max Members']);
        const use_starting = eval(party['Use Starting Members']);
        if(use_starting && !setup_starting){
            while(
                party['Members'].length < max &&
                all_actors.length > 0
            ){
                const actor = all_actors.shift();
                if(!actor)break
                party['Members'].push(actor);
            }
            setup_starting = all_actors.length <= 0;
        }else{
            const default_members = party['Default Members'];
            if(object_mode){
                party['Members'] = default_members.map((id)=>{
                    const aid = eval(id);
                    const actor = new Game_Actor(aid);
                    return actor;
                })
            }else{
                default_members.forEach((id)=>{
                    const aid = eval(id);
                    if(parties.some((party)=>{
                        const members = party['Members'];
                        return members.includes(aid);
                    })){
                        return;
                    }
                    party['Members'].push(id);
                })
            }
        }
    })
    const first_party = parties[0];
    if(first_party){
        const unlock_sw = eval(first_party['Unlock Switch']);
        const lock_sw = eval(first_party['Lock Switch']);
        $gameSwitches.setValue(unlock_sw, true);
        $gameSwitches.setValue(lock_sw, false);
    }
}

Game_Party.prototype.lockedParty = function(party_data){
    const unlock_sw = eval(party_data['Unlock Switch']);
    const lock_sw = eval(party_data['Lock Switch']);
    if(lock_sw && $gameSwitches.value(lock_sw))return true;
    if(unlock_sw && !$gameSwitches.value(unlock_sw))return true;
    return false;
}

Game_Party.prototype.allLocked = function(){
    const party_obj = this;
    const locks = this._multi_parties.map((party)=>{
        return party_obj.lockedParty(party);
    })
    if(locks.some(value => !value)){
        return false;
    }
    return true;
}

Game_Party.prototype.setMultiParty = function(id){
    const current_party = this.currentMultiParty();
    current_party['Default Map'] = $gameMap._mapId;
    current_party['Map X'] = $gamePlayer.x;
    current_party['Map Y'] = $gamePlayer.y;
    current_party['Map Direction'] = $gamePlayer.direction();
    const parties = this._multi_parties;
    for(let i = 0; i < parties.length; i++){
        const party = parties[i];
        if(
            party['Identifier'] == id &&
            party['Members'].length > 0 &&
            !this.lockedParty(party)
        ){
            this._party_index = i;
            const map = eval(party['Default Map']);
            const x = eval(party['Map X']);
            const y = eval(party['Map Y']);
            const d = eval(party['Map Direction']);
            $gamePlayer.reserveTransfer(map, x, y, d, 0);
            return true;
        }
    }
}

Game_Party.prototype.setFastMultiParty = function(id, event){
    const current_party = this.currentMultiParty();
    current_party['Default Map'] = $gameMap._mapId;
    current_party['Map X'] = $gamePlayer.x;
    current_party['Map Y'] = $gamePlayer.y;
    current_party['Map Direction'] = $gamePlayer.direction();
    const parties = this._multi_parties;
    for(let i = 0; i < parties.length; i++){
        const party = parties[i];
        if(
            party['Identifier'] == id &&
            party['Members'].length > 0 &&
            !this.lockedParty(party)
        ){
            this._party_index = i;
            const map = eval(party['Default Map']);
            const x = eval(party['Map X']);
            const y = eval(party['Map Y']);
            const d = eval(party['Map Direction']);
            $gameMap.setup(map);
            $gamePlayer.setDirection(d);
            $gamePlayer.locate(x,y);
            $gamePlayer.refresh();
            if(event){
                event.turnTowardPlayer();
                event.start();
            }
            const lead_objs = $gameTemp._partyLeads;
            for(let i = 0; i < lead_objs.length; i++){
                const lead_obj = lead_objs[i];
                const party = parties[i];
                lead_obj.setupParty(party['Identifier']);
            }
            return true;
        }
    }
}

Game_Party.prototype.nextMultiParty = function(){
    const current_party = this.currentMultiParty();
    const all_parties = this._multi_parties;
    let index = this._party_index;
    let inc_val = 1;
    let loops = 0
    const allow_sw = eval(Syn_PrtyMngt.ALLOW_SWAP_SWITCH);
    if(
        allow_sw &&
        !$gameSwitches.value(allow_sw)
    ){
        return false;
    }
    while(loops < 3){
        let new_index = index + inc_val;
        if(new_index >= all_parties.length){
            index = 0;
            inc_val = 0;
            new_index = 0;
            loops++;
        }
        const considered_party = all_parties[new_index];
        if(considered_party){
            const members = considered_party['Members'].filter(Boolean);
            if(members.length > 0){
                const disable_switch = eval(considered_party['Lock Switch']);
                if(!disable_switch || !$gameSwitches.value(disable_switch)){
                    const enable_switch = eval(considered_party['Unlock Switch']);
                    if(!enable_switch || $gameSwitches.value(enable_switch)){
                        this._party_index = new_index;
                        current_party['Default Map'] = $gameMap._mapId;
                        current_party['Map X'] = $gamePlayer.x;
                        current_party['Map Y'] = $gamePlayer.y;
                        current_party['Map Direction'] = $gamePlayer.direction();
                        return true;
                    }
                }
            }
        }
        inc_val++;
    }
    if(loops >= 3){
        throw new Error(`Unable to get next multi-party. Please check configurations`);
    }
}

Game_Party.prototype.prevMultiParty = function(){
    const current_party = this.currentMultiParty();
    const all_parties = this._multi_parties;
    let index = this._party_index;
    let inc_val = 1;
    let loops = 0
    const allow_sw = eval(Syn_PrtyMngt.ALLOW_SWAP_SWITCH);
    if(
        allow_sw &&
        !$gameSwitches.value(allow_sw)
    ){
        return false;
    }
    while(loops < 3){
        let new_index = index - inc_val;
        if(new_index < 0){
            index = all_parties.length - 1;
            inc_val = 0;
            new_index = index + inc_val;
            loops++;
        }
        const considered_party = all_parties[new_index];
        if(considered_party){
            const members = considered_party['Members'].filter(Boolean);
            if(members.length > 0){
                const disable_switch = eval(considered_party['Lock Switch']);
                if(!disable_switch || !$gameSwitches.value(disable_switch)){
                    const enable_switch = eval(considered_party['Unlock Switch']);
                    if(!enable_switch || $gameSwitches.value(enable_switch)){
                        this._party_index = new_index;
                        current_party['Default Map'] = $gameMap._mapId;
                        current_party['Map X'] = $gamePlayer.x;
                        current_party['Map Y'] = $gamePlayer.y;
                        current_party['Map Direction'] = $gamePlayer.direction();
                        return true;
                    }
                }
            }
        }
        inc_val++;
    }
    if(loops >= 3){
        throw new Error(`Unable to get next multi-party. Please check configurations`);
    }
}

function SpriteSynrec_MngtBattler(){
    this.initialize(...arguments);
}

SpriteSynrec_MngtBattler.prototype = Object.create(Sprite_Actor.prototype);
SpriteSynrec_MngtBattler.prototype.constructor = SpriteSynrec_MngtBattler;

SpriteSynrec_MngtBattler.prototype.updateMain = function() {
    this.updateBitmap();
    this.updateFrame();
    this.updateMove();
    this.updatePosition();
}

SpriteSynrec_MngtBattler.prototype.updateVisibility = function() {
    const isMV = Utils.RPGMAKER_NAME == 'MV';
    if(isMV){
        Sprite_Base.prototype.updateVisibility.call(this);
    }else{
        Sprite_Clickable.prototype.updateVisibility.call(this);
    }
    if (!this._battler) {
        this.visible = false;
    }
}

SpriteSynrec_MngtBattler.prototype.moveToStartPosition = function() {
    //No do move.
}

SpriteSynrec_MngtBattler.prototype.setActorHome = function(index) {
    //No do this.
}

SpriteSynrec_MngtBattler.prototype.setMotion = function(motion_name){
    this._setMotion = motion_name;
}

SpriteSynrec_MngtBattler.prototype.refreshMotion = function(){
    if(!this._setMotion)this._setMotion = 'walk';
    this.startMotion(this._setMotion);
}

function Sprite_SynMenuStaticGfx(){
    this.initialize(...arguments);
}

Sprite_SynMenuStaticGfx.prototype = Object.create(TilingSprite.prototype);
Sprite_SynMenuStaticGfx.prototype.constructor = Sprite_SynMenuStaticGfx;

Sprite_SynMenuStaticGfx.prototype.initialize = function(data){
    TilingSprite.prototype.initialize.call(this);
    this._gfx_data = data;
    this.setupGfx();
}

Sprite_SynMenuStaticGfx.prototype.setupGfx = function(gfx_data){
    const gfx_config = gfx_data || this._gfx_data;
    if(!gfx_config)return;
    const file_name = gfx_config['File'];
    if(!file_name)return;
    const bitmap = ImageManager.loadPicture(file_name);
    this._scroll_x = eval(gfx_config['Scrolling X']) || 0;
    this._scroll_y = eval(gfx_config['Scrolling Y']) || 0;
    this.anchor.x = eval(gfx_config['Anchor X']);
    this.anchor.y = eval(gfx_config['Anchor Y']);
    this._rotation = eval(gfx_config['Rotation']) || 0;
    this._constant_rot = !!eval(gfx_config['Constant Rotation']);
    this.bitmap = bitmap;
    const mx = eval(gfx_config['X']) || 0;
    const my = eval(gfx_config['Y']) || 0;
    const mw = bitmap.width;
    const mh = bitmap.height;
    if(!mw || !mh)this._reload = true;
    this.move(mx,my,mw,mh);
    this.rotation = this._rotation;
}

Sprite_SynMenuStaticGfx.prototype.update = function(){
    TilingSprite.prototype.update.call(this);
    if(this._reload){
        this._reload = false;
        this.setupGfx();
    }
    this.updateScrolling();
    this.updateRotation();
}

Sprite_SynMenuStaticGfx.prototype.updateScrolling = function(){
    this.origin.x += this._scroll_x || 0;
    this.origin.y += this._scroll_y || 0;
}

Sprite_SynMenuStaticGfx.prototype.updateRotation = function(){
    if(this._constant_rot){
        this.rotation += this._rotation || 0;
    }
}

function Sprite_SynMenuAnimGfx(){
    this.initialize(...arguments);
}

Sprite_SynMenuAnimGfx.prototype = Object.create(Sprite.prototype);
Sprite_SynMenuAnimGfx.prototype.constructor = Sprite_SynMenuAnimGfx;

Sprite_SynMenuAnimGfx.prototype.initialize = function(data){
    Sprite.prototype.initialize.call(this);
    this._gfx_data = data;
    this.setupGfx();
}

Sprite_SynMenuAnimGfx.prototype.setupGfx = function(gfx_data){
    const gfx_config = gfx_data || this._gfx_data;
    if(!gfx_config)return;
    const file_name = gfx_config['File'];
    if(!file_name)return;
    const bitmap = ImageManager.loadPicture(file_name);
    this._cur_frame = 0;
    this._max_frames = eval(gfx_config['Max Frames']);
    this._frame_rate = eval(gfx_config['Frame Rate']);
    this._frame_time = eval(gfx_config['Frame Rate']);
    this.bitmap = bitmap;
    const mx = eval(gfx_config['X']);
    const my = eval(gfx_config['Y']);
    this.move(mx,my);
    this.updateFrames();
}

Sprite_SynMenuAnimGfx.prototype.update = function(){
    Sprite.prototype.update.call(this);
    this.updateFrames();
}

Sprite_SynMenuAnimGfx.prototype.updateFrames = function(){
    const bitmap = this.bitmap;
    if(!bitmap)return;
    if(isNaN(this._frame_time) || this._frame_time >= this._frame_rate){
        this._frame_time = 0;
        const frames = this._max_frames;
        const w = bitmap.width / frames;
        const h = bitmap.height;
        const x = w * this._cur_frame;
        const y = 0;
        this.setFrame(x,y,w,h);
        this._cur_frame++;
        if(this._cur_frame >= frames){
            this._cur_frame = 0;
        }
    }else{
        this._frame_time++;
    }
}

function SpriteSynrec_MngtCharacter(){
    this.initialize(...arguments);
}

SpriteSynrec_MngtCharacter.prototype = Object.create(Sprite_Character.prototype);
SpriteSynrec_MngtCharacter.prototype.constructor = SpriteSynrec_MngtCharacter;

SpriteSynrec_MngtCharacter.prototype.update = function(){
    this.updateChara();
    Sprite_Character.prototype.update.call(this);
}

SpriteSynrec_MngtCharacter.prototype.updateChara = function(){
    if(this._character){
        if(this._character.update){
            this._character.update();
        }
    }
}

function SpriteSynrec_MngtBattler(){
    this.initialize(...arguments);
}

SpriteSynrec_MngtBattler.prototype = Object.create(Sprite_Actor.prototype);
SpriteSynrec_MngtBattler.prototype.constructor = SpriteSynrec_MngtBattler;

SpriteSynrec_MngtBattler.prototype.updateMain = function() {
    this.updateBitmap();
    this.updateFrame();
    this.updateMove();
    this.updatePosition();
}

SpriteSynrec_MngtBattler.prototype.updateVisibility = function() {
    const isMV = Utils.RPGMAKER_NAME == 'MV';
    if(isMV){
        Sprite_Base.prototype.updateVisibility.call(this);
    }else{
        Sprite_Clickable.prototype.updateVisibility.call(this);
    }
    if (!this._battler) {
        this.visible = false;
    }
}

SpriteSynrec_MngtBattler.prototype.moveToStartPosition = function() {
    //No do move.
}

SpriteSynrec_MngtBattler.prototype.setActorHome = function(index) {
    //No do this.
}

SpriteSynrec_MngtBattler.prototype.setMotion = function(motion_name){
    this._setMotion = motion_name;
}

SpriteSynrec_MngtBattler.prototype.refreshMotion = function(){
    if(!this._setMotion)this._setMotion = 'walk';
    this.startMotion(this._setMotion);
}

function SpriteSynrec_ConfirmButton(){
    this.initialize(...arguments);
}

SpriteSynrec_ConfirmButton.prototype = Object.create(Sprite.prototype);
SpriteSynrec_ConfirmButton.prototype.constructor = SpriteSynrec_ConfirmButton;

SpriteSynrec_ConfirmButton.prototype.initialize = function(){
    Sprite.prototype.initialize.call(this);
    this.createColdSprite();
    this.createHotSprite();
    const UI = Syn_PrtyMngt.UI;
    const button = UI['Confirm Button'];
    this.x = eval(button['Screen X']);
    this.y = eval(button['Screen Y']);
    console.log(this)
}

SpriteSynrec_ConfirmButton.prototype.createColdSprite = function(){
    const UI = Syn_PrtyMngt.UI;
    const button = UI['Confirm Button'];
    const gfx_name = button['Cold Graphic'];
    const sprite = new Sprite();
    sprite.bitmap = ImageManager.loadPicture(gfx_name);
    if(sprite.bitmap.width == 0 || sprite.bitmap.height == 0){
        this._reloadBitmaps = true;
    }
    this.addChild(sprite);
    this._cold_sprite = sprite;
}

SpriteSynrec_ConfirmButton.prototype.createHotSprite = function(){
    const UI = Syn_PrtyMngt.UI;
    const button = UI['Confirm Button'];
    const gfx_name = button['Hot Graphic'];
    const sprite = new Sprite();
    sprite.visible = false;
    sprite.bitmap = ImageManager.loadPicture(gfx_name);
    if(sprite.bitmap.width == 0 || sprite.bitmap.height == 0){
        this._reloadBitmaps = true;
    }
    this.addChild(sprite);
    this._hot_sprite = sprite;
}

SpriteSynrec_ConfirmButton.prototype.update = function(){
    Sprite.prototype.update.call(this, ...arguments);
    this.updateReloads();
    this.updateVisibles();
    this.updateClick();
}

SpriteSynrec_ConfirmButton.prototype.updateReloads = function(){
    if(!this._reloadBitmaps)return;
    let reload = false;
    const UI = Syn_PrtyMngt.UI;
    const button = UI['Confirm Button'];
    const cold_gfx_name = button['Cold Graphic'];
    const cold_bitmap = ImageManager.loadPicture(cold_gfx_name);
    if(cold_bitmap.width == 0 || cold_bitmap.height == 0){
        reload = true;
    }
    this._cold_sprite.bitmap = cold_bitmap;
    const hot_gfx_name = button['Hot Graphic'];
    const hot_bitmap = ImageManager.loadPicture(hot_gfx_name);
    if(hot_bitmap.width == 0 || hot_bitmap.height == 0){
        reload = true;
    }
    this._hot_sprite.bitmap = hot_bitmap;
    this._reloadBitmaps = reload;
}

SpriteSynrec_ConfirmButton.prototype.updateVisibles = function(){
    const tx = TouchInput.x;
    const ty = TouchInput.y;
    const sprite = this._cold_sprite;
    if(
        tx >= sprite.worldTransform.tx &&
        ty >= sprite.worldTransform.ty &&
        tx <= sprite.worldTransform.tx + sprite.width &&
        ty <= sprite.worldTransform.ty + sprite.height
    ){
        sprite.visible = false;
        this._hot_sprite.visible = true;
    }else{
        sprite.visible = true;
        this._hot_sprite.visible = false;
    }
}

SpriteSynrec_ConfirmButton.prototype.updateClick = function(){
    if(
        this._hot_sprite.visible &&
        TouchInput.isTriggered()
    ){
        SoundManager.playCancel();
        SceneManager._scene.popScene();
    }
}

Syn_PrtyMngt_SprtsetMap_CrtChars = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
    Syn_PrtyMngt_SprtsetMap_CrtChars.call(this, ...arguments);
    this.createPartyLeads();
}

Spriteset_Map.prototype.createPartyLeads = function(){
    const map_id = $gameMap._mapId;
    $gameTemp._partyLeads = [];
    const parties = $gameParty._multi_parties.map((party)=>{
        if(eval(party['Default Map']) != map_id)return;
        return party['Identifier'];
    }).filter(Boolean)
    const spriteset = this;
    parties.forEach((party_id)=>{
        const lead_obj = new GameCharacter_PartyLead(party_id);
        const sprite = new Sprite_Character(lead_obj);
        spriteset._characterSprites.push(sprite);
        spriteset._tilemap.addChild(sprite);
        $gameTemp._partyLeads.push(lead_obj);
    })
}

function WindowSynrec_Notification(){
    this.initialize(...arguments);
}

WindowSynrec_Notification.prototype = Object.create(Window_Base.prototype);
WindowSynrec_Notification.prototype.constructor = WindowSynrec_Notification;

WindowSynrec_Notification.prototype.initialize = function(data){
    const mz_mode = Utils.RPGMAKER_NAME == "MZ";
    const rect = this.createRect(data);
    this._window_data = data;
    this._style_data = data['Window Font and Style Configuration'];
    if(mz_mode){
        Window_Base.prototype.initialize.call(this, rect);
    }else{
        const x = rect.x;
        const y = rect.y;
        const w = rect.width;
        const h = rect.height;
        Window_Base.prototype.initialize.call(this,x,y,w,h);
    }
    this.setOpacityAndDimmer();
    this.openness = 0;
}

WindowSynrec_Notification.prototype.createRect = function(data){
    const dimension_config = data['Dimension Configuration'];
    const x = dimension_config['X'];
    const y = dimension_config['Y'];
    const w = dimension_config['Width'];
    const h = dimension_config['Height'];
    return new Rectangle(x,y,w,h);
}

WindowSynrec_Notification.prototype.standardPadding = function() {
    return 8;
}

WindowSynrec_Notification.prototype.loadWindowskin = function(){
    const base = Window_Base.prototype.loadWindowskin.call(this);
    const custom_config = this._style_data;
    if(!custom_config)return base;
    const skin_name = custom_config['Window Skin'];
    if(!skin_name)return base;
    this.windowskin = ImageManager.loadSystem(skin_name);
}

WindowSynrec_Notification.prototype.resetFontSettings = function() {
    const base = Window_Base.prototype.resetFontSettings;
    const custom_config = this._style_data;
    if(!custom_config)return base.call(this);
    const font_face = custom_config['Font Face'] || "sans-serif";
    const font_size = custom_config['Font Size'] || 16;
    const font_outline_size = custom_config['Font Outline Thickness'] || 3;
    this.contents.fontFace = font_face;
    this.contents.fontSize = font_size;
    this.contents.outlineWidth = font_outline_size;
    this.resetTextColor();
}

WindowSynrec_Notification.prototype.resetTextColor = function() {
    const base = Window_Base.prototype.resetTextColor;
    const custom_config = this._style_data;
    if(!custom_config)return base.call(this);
    const text_color = custom_config['Base Font Color'] || "#ffffff";
    const outline_color = custom_config['Font Outline Color'] || "rgba(0, 0, 0, 0.5)";
    this.changeTextColor(text_color);
    this.contents.outlineColor = outline_color;
}

WindowSynrec_Notification.prototype.setOpacityAndDimmer = function(){
    const custom_config = this._style_data;
    if(!custom_config)return;
    const show_dimmer = custom_config['Show Window Dimmer'] || false;
    const win_opacity = custom_config['Window Opacity'] || 0;
    this.opacity = win_opacity;
    show_dimmer ? this.showBackgroundDimmer() : this.hideBackgroundDimmer();
}

function WindowSynrec_GameData(){
    this.initialize(...arguments);
}

WindowSynrec_GameData.prototype = Object.create(Window_Base.prototype);
WindowSynrec_GameData.prototype.constructor = WindowSynrec_GameData;

WindowSynrec_GameData.prototype.initialize = function(data){
    const mz_mode = Utils.RPGMAKER_NAME == "MZ";
    const rect = this.createRect(data);
    this._window_data = data;
    this._style_data = data['Window Font and Style Configuration'];
    if(mz_mode){
        Window_Base.prototype.initialize.call(this, rect);
    }else{
        const x = rect.x;
        const y = rect.y;
        const w = rect.width;
        const h = rect.height;
        Window_Base.prototype.initialize.call(this,x,y,w,h);
    }
    this.setOpacityAndDimmer();
    this.drawData();
}

WindowSynrec_GameData.prototype.createRect = function(data){
    const dimension_config = data['Dimension Configuration'];
    const x = dimension_config['X'];
    const y = dimension_config['Y'];
    const w = dimension_config['Width'];
    const h = dimension_config['Height'];
    return new Rectangle(x,y,w,h);
}

WindowSynrec_GameData.prototype.standardPadding = function() {
    return 8;
}

WindowSynrec_GameData.prototype.loadWindowskin = function(){
    const base = Window_Base.prototype.loadWindowskin.call(this);
    const custom_config = this._style_data;
    if(!custom_config)return base;
    const skin_name = custom_config['Window Skin'];
    if(!skin_name)return base;
    this.windowskin = ImageManager.loadSystem(skin_name);
}

WindowSynrec_GameData.prototype.resetFontSettings = function() {
    const base = Window_Base.prototype.resetFontSettings;
    const custom_config = this._style_data;
    if(!custom_config)return base.call(this);
    const font_face = custom_config['Font Face'] || "sans-serif";
    const font_size = custom_config['Font Size'] || 16;
    const font_outline_size = custom_config['Font Outline Thickness'] || 3;
    this.contents.fontFace = font_face;
    this.contents.fontSize = font_size;
    this.contents.outlineWidth = font_outline_size;
    this.resetTextColor();
}

WindowSynrec_GameData.prototype.resetTextColor = function() {
    const base = Window_Base.prototype.resetTextColor;
    const custom_config = this._style_data;
    if(!custom_config)return base.call(this);
    const text_color = custom_config['Base Font Color'] || "#ffffff";
    const outline_color = custom_config['Font Outline Color'] || "rgba(0, 0, 0, 0.5)";
    this.changeTextColor(text_color);
    this.contents.outlineColor = outline_color;
}

WindowSynrec_GameData.prototype.setOpacityAndDimmer = function(){
    const custom_config = this._style_data;
    if(!custom_config)return;
    const show_dimmer = custom_config['Show Window Dimmer'] || false;
    const win_opacity = custom_config['Window Opacity'] || 0;
    this.opacity = win_opacity;
    show_dimmer ? this.showBackgroundDimmer() : this.hideBackgroundDimmer();
}

WindowSynrec_GameData.prototype.update = function(){
    Window_Base.prototype.update.call(this);
    this.updateDisplay();
    if(this._constant_update){
        this.contents.clear();
        this.drawData();
    }
}

WindowSynrec_GameData.prototype.updateDisplay = function(){
    const window_data = this._window_data;
    const sw_id = eval(window_data['Display Switch']);
    if(!sw_id){
        this.show();
        return;
    }
    const sw_on = $gameSwitches.value(sw_id);
    if(sw_on){
        this.show();
    }else{
        this.hide();
    }
}

WindowSynrec_GameData.prototype.drawData = function(){
    this.drawGauges();
    this.drawPlayTime();
    this.drawSaveCount();
    this.drawGold();
}

WindowSynrec_GameData.prototype.drawGauges = function(){
    const window = this;
    const player = $gamePlayer;
    const window_data = this._window_data;
    const gauges = window_data['Gauges'];
    gauges.forEach((config)=>{
        const label = config['Label'];
        const lx = eval(config['Label X']);
        const ly = eval(config['Label Y']);
        window.drawTextEx(label, lx, ly);
        const cur_val = eval(config['Gauge Current Value']) || 0;
        const max_val = eval(config['Gauge Max Value']) || 1;
        const ratio = Math.max(0, Math.min(1, cur_val / max_val));
        const gx = eval(config['Gauge X']);
        const gy = eval(config['Gauge Y']);
        const gw = eval(config['Gauge Width']);
        const gh = eval(config['Gauge Height']);
        const gb = eval(config['Gauge Border']);
        const border_color = config['Gauge Border Color'];
        const background_color = config['Gauge Background Color'];
        const fill_color = config['Gauge Color'];
        window.contents.fillRect(gx,gy,gw,gh,border_color);
        window.contents.fillRect(gx + gb, gy + gb, gw - (gb * 2), gh - (gb * 2), background_color);
        window.contents.fillRect(gx + gb, gy + gb, (gw - (gb * 2)) * ratio, gh - (gb * 2), fill_color);
    })
}

WindowSynrec_GameData.prototype.drawPlayTime = function(){
    const window_data = this._window_data;
    if(!eval(window_data['Draw Play Time']))return;
    this._constant_update = true;
    const time = $gameSystem.playtimeText();
    const text = (window_data['Play Time Text'] || "").format(time);
    const tx = eval(window_data['Play Time X']);
    const ty = eval(window_data['Play Time Y']);
    this.drawTextEx(text, tx, ty);
}

WindowSynrec_GameData.prototype.drawSaveCount = function(){
    const window_data = this._window_data;
    if(!eval(window_data['Draw Save Count']))return;
    const save_count = $gameSystem.saveCount();
    const text = (window_data['Save Count Text'] || "").format(save_count);
    const tx = eval(window_data['Save Count X']);
    const ty = eval(window_data['Save Count Y']);
    this.drawTextEx(text, tx, ty);
}

function WindowSynrec_ActorData(){
    this.initialize(...arguments);
}

WindowSynrec_ActorData.prototype = Object.create(Window_Base.prototype);
WindowSynrec_ActorData.prototype.constructor = WindowSynrec_ActorData;

WindowSynrec_ActorData.prototype.initialize = function(data){
    const mz_mode = Utils.RPGMAKER_NAME == "MZ";
    const rect = this.createRect(data);
    this._window_data = data;
    this._style_data = data['Window Font and Style Configuration'];
    if(mz_mode){
        Window_Base.prototype.initialize.call(this, rect);
    }else{
        const x = rect.x;
        const y = rect.y;
        const w = rect.width;
        const h = rect.height;
        Window_Base.prototype.initialize.call(this,x,y,w,h);
    }
    this.setOpacityAndDimmer();
    this.createCharacterSprite();
    this.createBattlerSprite();
}

WindowSynrec_ActorData.prototype.createCharacterSprite = function(){
    const chara = new GameCharacter_MenuCharacter();
    chara.setStepAnime(true);
    const sprite = new SpriteSynrec_MngtCharacter(chara);
    sprite.visible = false;
    this.addChild(sprite);
    this._chara = chara;
    this._character_sprite = sprite;
}

WindowSynrec_ActorData.prototype.createBattlerSprite = function(){
    const sprite = new SpriteSynrec_MngtBattler();
    sprite.visible = false;
    this.addChild(sprite);
    this._battler_sprite = sprite;
}

WindowSynrec_ActorData.prototype.createRect = function(data){
    const dimension_config = data['Dimension Configuration'];
    const x = dimension_config['X'];
    const y = dimension_config['Y'];
    const w = dimension_config['Width'];
    const h = dimension_config['Height'];
    return new Rectangle(x,y,w,h);
}

WindowSynrec_ActorData.prototype.standardPadding = function() {
    return 8;
}

WindowSynrec_ActorData.prototype.loadWindowskin = function(){
    const base = Window_Base.prototype.loadWindowskin.call(this);
    const custom_config = this._style_data;
    if(!custom_config)return base;
    const skin_name = custom_config['Window Skin'];
    if(!skin_name)return base;
    this.windowskin = ImageManager.loadSystem(skin_name);
}

WindowSynrec_ActorData.prototype.resetFontSettings = function() {
    const base = Window_Base.prototype.resetFontSettings;
    const custom_config = this._style_data;
    if(!custom_config)return base.call(this);
    const font_face = custom_config['Font Face'] || "sans-serif";
    const font_size = custom_config['Font Size'] || 16;
    const font_outline_size = custom_config['Font Outline Thickness'] || 3;
    this.contents.fontFace = font_face;
    this.contents.fontSize = font_size;
    this.contents.outlineWidth = font_outline_size;
    this.resetTextColor();
}

WindowSynrec_ActorData.prototype.resetTextColor = function() {
    const base = Window_Base.prototype.resetTextColor;
    const custom_config = this._style_data;
    if(!custom_config)return base.call(this);
    const text_color = custom_config['Base Font Color'] || "#ffffff";
    const outline_color = custom_config['Font Outline Color'] || "rgba(0, 0, 0, 0.5)";
    this.changeTextColor(text_color);
    this.contents.outlineColor = outline_color;
}

WindowSynrec_ActorData.prototype.setOpacityAndDimmer = function(){
    const custom_config = this._style_data;
    if(!custom_config)return;
    const show_dimmer = custom_config['Show Window Dimmer'] || false;
    const win_opacity = custom_config['Window Opacity'] || 0;
    this.opacity = win_opacity;
    show_dimmer ? this.showBackgroundDimmer() : this.hideBackgroundDimmer();
}

WindowSynrec_ActorData.prototype.update = function(){
    Window_Base.prototype.update.call(this);
    this.updateActor();
    this.updateVisible();
}

WindowSynrec_ActorData.prototype.updateActor = function(){
    if(this._actor){
        const batt_sprite = this._battler_sprite;
        if(batt_sprite._motionCD <= 0){
            batt_sprite.startMotion(batt_sprite._motionLoaded);
            batt_sprite._motionCD = batt_sprite.motionSpeed() * 4;
        }else{
            batt_sprite._motionCD--;
        }
    }
}

WindowSynrec_ActorData.prototype.updateVisible = function(){
    if(!this._selc_window){
        this.hide();
        return;
    }
    const window_data = this._window_data;
    try{
        const display_requirements = window_data['Display Requirements'];
        if(!display_requirements){
            this.visible = this._selc_window.openness >= 255;
            return;
        }
        const switch_id = eval(display_requirements['Game Switch']);
        if(switch_id){
            if(!$gameSwitches.value(switch_id)){
                this.visible = false;
                return;
            }
        }
        const var_id = eval(display_requirements['Game Variable']);
        if(var_id){
            const value = $gameVariables.value(var_id);
            const min_var = eval(display_requirements['Variable Minimum']);
            const max_var = eval(display_requirements['Variable Maximum']);
            if(
                value < min_var ||
                value > max_var
            ){
                this.visible = false;
                return;
            }
        }
        if(display_requirements['Code']){
            const bool_code = !!eval(display_requirements['Code']);
            if(!bool_code){
                this.visible = false;
                return;
            }
        }
        this.visible = this._selc_window.openness >= 255;
    }catch(e){
        console.error(`Failed to parse requirements: ${e}`);
        this.visible = false;
    }
}

WindowSynrec_ActorData.prototype.setActor = function(actor){
    this.contents.clear();
    this._actor = actor;
    if(actor){
        this.show();
        this.drawData();
    }else if(this._blank_hide){
        this.hide();
    }else{
        this._battler_sprite.setBattler();
        this._chara.setOpacity(0);
    }
}

WindowSynrec_ActorData.prototype.drawData = function(){
    this.drawGauges();
    this.drawName();
    this.drawProfile();
    this.drawClassLevel();
    this.drawResHP();
    this.drawResMP();
    this.drawResTP();
    this.drawBaseParams();
    this.drawExParams();
    this.drawSpParams();
    this.displayMapCharacter();
    this.displayBattler();
}

WindowSynrec_ActorData.prototype.drawGauges = function(){
    const window = this;
    const actor = this._actor;
    const window_data = this._window_data;
    const gauges = window_data['Gauges'];
    gauges.forEach((config)=>{
        try{
            const label = config['Label'];
            const lx = eval(config['Label X']);
            const ly = eval(config['Label Y']);
            window.drawTextEx(label, lx, ly);
            const cur_val = eval(config['Gauge Current Value']) || 0;
            const max_val = eval(config['Gauge Max Value']) || 1;
            const ratio = Math.max(0, Math.min(1, cur_val / max_val));
            const gx = eval(config['Gauge X']);
            const gy = eval(config['Gauge Y']);
            const gw = eval(config['Gauge Width']);
            const gh = eval(config['Gauge Height']);
            const gb = eval(config['Gauge Border']);
            const border_color = config['Gauge Border Color'];
            const background_color = config['Gauge Background Color'];
            const fill_color = config['Gauge Color'];
            window.contents.fillRect(gx,gy,gw,gh,border_color);
            window.contents.fillRect(gx + gb, gy + gb, gw - (gb * 2), gh - (gb * 2), background_color);
            window.contents.fillRect(gx + gb, gy + gb, (gw - (gb * 2)) * ratio, gh - (gb * 2), fill_color);
        }catch(e){
            console.error(`Failed to draw gauge: ${e}`);
        }
    })
}

WindowSynrec_ActorData.prototype.drawName = function(){
    const actor = this._actor;
    const window_data = this._window_data;
    if(!eval(window_data['Draw Actor Name']))return;
    const name = actor.name();
    const nickname = actor.nickname();
    const text = (window_data['Name Text'] || "").format(name, nickname);
    const tx = eval(window_data['Name X']) || 0;
    const ty = eval(window_data['Name Y']) || 0;
    this.drawTextEx(text, tx, ty);
}

WindowSynrec_ActorData.prototype.drawProfile = function(){
    const actor = this._actor;
    const window_data = this._window_data;
    if(!eval(window_data['Draw Actor Profile']))return;
    const text = actor.profile();
    const tx = eval(window_data['Profile X']) || 0;
    const ty = eval(window_data['Profile Y']) || 0;
    this.drawTextEx(text, tx, ty);
}

WindowSynrec_ActorData.prototype.drawClassLevel = function(){
    const actor = this._actor;
    const window_data = this._window_data;
    if(!eval(window_data['Draw Class Level']))return;
    const class_id = actor._classId;
    const class_data = $dataClasses[class_id] || {};
    const class_name = class_data ? class_data.name : "";
    const level = actor.level;
    const text = (window_data['Class Level Text'] || "").format(class_name, level);
    const tx = eval(window_data['Class Level X']) || 0;
    const ty = eval(window_data['Class Level Y']) || 0;
    this.drawTextEx(text, tx, ty);
}

WindowSynrec_ActorData.prototype.drawResHP = function(){
    const actor = this._actor;
    const window_data = this._window_data;
    if(!eval(window_data['Draw HP Resource']))return;
    const cur = actor.hp;
    const max = actor.mhp;
    const text = (window_data['HP Text'] || "").format(cur, max);
    const tx = eval(window_data['HP X']) || 0;
    const ty = eval(window_data['HP Y']) || 0;
    this.drawTextEx(text, tx, ty);
}

WindowSynrec_ActorData.prototype.drawResMP = function(){
    const actor = this._actor;
    const window_data = this._window_data;
    if(!eval(window_data['Draw MP Resource']))return;
    const cur = actor.mp;
    const max = actor.mmp;
    const text = (window_data['MP Text'] || "").format(cur, max);
    const tx = eval(window_data['MP X']) || 0;
    const ty = eval(window_data['MP Y']) || 0;
    this.drawTextEx(text, tx, ty);
}

WindowSynrec_ActorData.prototype.drawResTP = function(){
    const actor = this._actor;
    const window_data = this._window_data;
    if(!eval(window_data['Draw TP Resource']))return;
    const cur = actor.tp;
    const max = actor.maxTp();
    const text = (window_data['TP Text'] || "").format(cur, max);
    const tx = eval(window_data['TP X']) || 0;
    const ty = eval(window_data['TP Y']) || 0;
    this.drawTextEx(text, tx, ty);
}

WindowSynrec_ActorData.prototype.drawBaseParams = function(){
    const window = this;
    const actor = this._actor;
    const window_data = this._window_data;
    const draw_params = window_data['Draw Base Params'] || [];
    draw_params.forEach((param_draw)=>{
        try{
            const param_id = eval(param_draw['Base Param']);
            const param_value = actor.param(param_id) || 0;
            const text = (param_draw['Param Text'] || "").format(param_value);
            const tx = eval(param_draw['X']) || 0;
            const ty = eval(param_draw['Y']) || 0;
            window.drawTextEx(text, tx, ty);
        }catch(e){
            console.error(`Failed to draw base param: ${e}`);
        }
    })
}

WindowSynrec_ActorData.prototype.drawExParams = function(){
    const window = this;
    const actor = this._actor;
    const window_data = this._window_data;
    const draw_params = window_data['Draw Ex Params'] || [];
    draw_params.forEach((param_draw)=>{
        try{
            const param_id = eval(param_draw['Ex Param']);
            const param_value = (actor.xparam(param_id) || 0) * 100;
            const text = (param_draw['Param Text'] || "").format(param_value);
            const tx = eval(param_draw['X']) || 0;
            const ty = eval(param_draw['Y']) || 0;
            window.drawTextEx(text, tx, ty);
        }catch(e){
            console.error(`Failed to draw EX param: ${e}`);
        }
    })
}

WindowSynrec_ActorData.prototype.drawSpParams = function(){
    const window = this;
    const actor = this._actor;
    const window_data = this._window_data;
    const draw_params = window_data['Draw Sp Params'] || [];
    draw_params.forEach((param_draw)=>{
        try{
            const param_id = eval(param_draw['SP Param']);
            const param_value = (actor.sparam(param_id) || 0) * 100;
            const text = (param_draw['Param Text'] || "").format(param_value);
            const tx = eval(param_draw['X']) || 0;
            const ty = eval(param_draw['Y']) || 0;
            window.drawTextEx(text, tx, ty);
        }catch(e){
            console.error(`Failed to draw SP param: ${e}`);
        }
    })
}

WindowSynrec_ActorData.prototype.displayMapCharacter = function(){
    const actor = this._actor;
    const window_data = this._window_data;
    if(!eval(window_data['Display Map Character'])){
        this._chara.setOpacity(0);
        return;
    }else if(actor){
        this._chara.setOpacity(255);
        const char_name = actor.characterName();
        const char_indx = actor.characterIndex();
        this._chara.setImage(char_name, char_indx);
        this._chara.setDirection(eval(window_data['Character Direction']) || 2);
        this._chara._screenX = eval(window_data['Character X']) || 0;
        this._chara._screenY = eval(window_data['Character Y']) || 0;
        this._character_sprite.scale.x = eval(window_data['Character Scale X']) || 0;
        this._character_sprite.scale.y = eval(window_data['Character Scale Y']) || 0;
    }else{
        this._chara.setOpacity(0);
    }
}

WindowSynrec_ActorData.prototype.displayBattler = function(){
    const actor = this._actor;
    const window_data = this._window_data;
    if(!eval(window_data['Display Battler'])){
        this._battler_sprite.setBattler();
        return;
    }else if(actor){
        const hx = eval(window_data['Battler X']);
        const hy = eval(window_data['Battler Y']);
        this._battler_sprite._motionLoaded = window_data['Battler Motion'];
        this._battler_sprite.startMotion(this._battler_sprite._motionLoaded);
        this._battler_sprite.setHome(hx, hy);
        this._battler_sprite.setBattler(actor);
        this._battler_sprite.scale.x = eval(window_data['Battler Scale X']);
        this._battler_sprite.scale.y = eval(window_data['Battler Scale Y']);
        this._battler_sprite._motionCD = 0;
    }else{
        this._battler_sprite.setBattler();
    }
}

function WindowSynrec_ActorSelector(){
    this.initialize(...arguments);
}

WindowSynrec_ActorSelector.prototype = Object.create(Window_Selectable.prototype);
WindowSynrec_ActorSelector.prototype.constructor = WindowSynrec_ActorSelector;

WindowSynrec_ActorSelector.prototype.initialize = function(data){
    this.setBaseMax();
    const mz_mode = Utils.RPGMAKER_NAME == "MZ";
    const rect = this.createRect(data);
    this._window_data = data;
    this._style_data = data['Window Font and Style Configuration'];
    if(mz_mode){
        Window_Selectable.prototype.initialize.call(this, rect);
    }else{
        const x = rect.x;
        const y = rect.y;
        const w = rect.width;
        const h = rect.height;
        Window_Selectable.prototype.initialize.call(this,x,y,w,h);
    }
    this.setOpacityAndDimmer();
    this.createCharacterSprites();
    this.createBattlerSprites();
    this.setList();
    this.select(0);
}

WindowSynrec_ActorSelector.prototype.setBaseMax = function(){
    const parties = $gameParty._multi_parties.filter((party)=>{
        const sw_id = eval(party['Unlock Switch']);
        if(!sw_id || $gameSwitches.value(sw_id)){
            return true;
        }
    })
    let val = 0;
    parties.forEach((party)=>{
        const add = eval(party['Max Members']) || 1;
        val += add;
    })
    this._max_items = val;
}

WindowSynrec_ActorSelector.prototype.clearSprites = function(){
    this._character_sprites.forEach((sprite)=>{
        if(sprite.parent)sprite.parent.removeChild(sprite);
        if(sprite.destroy)sprite.destroy();
    })
    this._character_sprites = [];
    this._battler_sprites.forEach((sprite)=>{
        if(sprite.parent)sprite.parent.removeChild(sprite);
        if(sprite.destroy)sprite.destroy();
    })
    this._battler_sprites = [];
}

WindowSynrec_ActorSelector.prototype.createCharacterSprites = function(){
    this._character_sprites = [];
}

WindowSynrec_ActorSelector.prototype.createBattlerSprites = function(){
    this._battler_sprites = [];
}

WindowSynrec_ActorSelector.prototype.createCharacterSprite = function(i){
    const rect = this.itemRect(i);
    const chara = new GameCharacter_MenuCharacter();
    chara.setStepAnime(true);
    chara.setOpacity(0);
    const sprite = new SpriteSynrec_MngtCharacter(chara);
    sprite.visible = false;
    this.addChild(sprite);
    this._chara = chara;
    this._character_sprites[i] = sprite;
}

WindowSynrec_ActorSelector.prototype.createBattlerSprite = function(i){
    const rect = this.itemRect(i);
    const sprite = new SpriteSynrec_MngtBattler();
    sprite.visible = false;
    this.addChild(sprite);
    this._battler_sprites[i] = sprite;
}

WindowSynrec_ActorSelector.prototype.maxItems = function(){
    const window_data = this._window_data;
    return this._max_items || 1;
}

WindowSynrec_ActorSelector.prototype.maxCols = function(){
    const window_data = this._window_data;
    return eval(window_data['Max Columns']) || 1;
}

WindowSynrec_ActorSelector.prototype.itemWidth = function(){
    const base = Window_Selectable.prototype.itemWidth.call(this);
    const window_data = this._window_data;
    return eval(window_data['Item Width']) || base;
}

WindowSynrec_ActorSelector.prototype.itemHeight = function(){
    const base = Window_Selectable.prototype.itemHeight.call(this);
    const window_data = this._window_data;
    return eval(window_data['Item Height']) || base;
}

WindowSynrec_ActorSelector.prototype.createRect = function(data){
    const dimension_config = data['Dimension Configuration'];
    const x = dimension_config['X'];
    const y = dimension_config['Y'];
    const w = dimension_config['Width'];
    const h = dimension_config['Height'];
    return new Rectangle(x,y,w,h);
}

WindowSynrec_ActorSelector.prototype.standardPadding = function() {
    return 8;
}

WindowSynrec_ActorSelector.prototype.loadWindowskin = function(){
    const base = Window_Base.prototype.loadWindowskin.call(this);
    const custom_config = this._style_data;
    if(!custom_config)return base;
    const skin_name = custom_config['Window Skin'];
    if(!skin_name)return base;
    this.windowskin = ImageManager.loadSystem(skin_name);
}

WindowSynrec_ActorSelector.prototype.resetFontSettings = function() {
    const base = Window_Base.prototype.resetFontSettings;
    const custom_config = this._style_data;
    if(!custom_config)return base.call(this);
    const font_face = custom_config['Font Face'] || "sans-serif";
    const font_size = custom_config['Font Size'] || 16;
    const font_outline_size = custom_config['Font Outline Thickness'] || 3;
    this.contents.fontFace = font_face;
    this.contents.fontSize = font_size;
    this.contents.outlineWidth = font_outline_size;
    this.resetTextColor();
}

WindowSynrec_ActorSelector.prototype.resetTextColor = function() {
    const base = Window_Base.prototype.resetTextColor;
    const custom_config = this._style_data;
    if(!custom_config)return base.call(this);
    const text_color = custom_config['Base Font Color'] || "#ffffff";
    const outline_color = custom_config['Font Outline Color'] || "rgba(0, 0, 0, 0.5)";
    this.changeTextColor(text_color);
    this.contents.outlineColor = outline_color;
}

WindowSynrec_ActorSelector.prototype.setOpacityAndDimmer = function(){
    const custom_config = this._style_data;
    if(!custom_config)return;
    const show_dimmer = custom_config['Show Window Dimmer'] || false;
    const win_opacity = custom_config['Window Opacity'] || 0;
    this.opacity = win_opacity;
    show_dimmer ? this.showBackgroundDimmer() : this.hideBackgroundDimmer();
}

WindowSynrec_ActorSelector.prototype.setList = function(list){
    this._list = $gameParty.baseAllMembers();
    this.clearSprites();
    this.refresh();
}

WindowSynrec_ActorSelector.prototype.actor = function(i){
    const index = isNaN(i) ? this.index() : i;
    const actor = this._list[index];
    return actor;
}

WindowSynrec_ActorSelector.prototype.update = function(){
    Window_Selectable.prototype.update.call(this);
    this.updateSprites();
}

WindowSynrec_ActorSelector.prototype.updateSprites = function(){
    const chara_sprites = this._character_sprites;
    for(let i = 0; i < chara_sprites.length; i++){
        const rect = this.itemRect(i);
        const sprite = chara_sprites[i];
        if(sprite){
            if(sprite.visible){
                const chara = sprite._character;
                const rx = rect.x;
                const ry = rect.y;
                const sx = -this._scrollX || 0;
                const sy = -this._scrollY || 0;
                const ox = chara._off_screenX || 0;
                const oy = chara._off_screenY || 0;
                const x = rx + sx + ox;
                const y = ry + sy + oy;
                chara._screenX = x;
                chara._screenY = y;
                if(sprite._visibility){
                    chara.setOpacity(255);
                }else{
                    chara.setOpacity(0);
                }
            }
        }
    }
    const batt_sprites = this._battler_sprites;
    for(let i = 0; i < batt_sprites.length; i++){
        const rect = this.itemRect(i);
        const sprite = batt_sprites[i];
        if(sprite){
            const rx = rect.x;
            const ry = rect.y;
            const sx = -this._scrollX || 0;
            const sy = -this._scrollY || 0;
            const ox = sprite._offset_x || 0;
            const oy = sprite._offset_y || 0;
            const x = rx + sx + ox;
            const y = ry + sy + oy;
            sprite.setHome(x, y);
            if(sprite._visibility){
                const actor = this.actor(i);
                if(sprite._battler != actor){
                    sprite.setBattler(actor);
                }else{
                    if(sprite._motionCD <= 0){
                        sprite.startMotion(sprite._motionLoaded);
                        sprite._motionCD = sprite.motionSpeed() * 4;
                    }else{
                        sprite._motionCD--;
                    }
                }
            }else{
                sprite.setBattler(null);
            }
        }
    }
}

WindowSynrec_ActorSelector.prototype.drawItem = function(i){
    if(!this._list)return;
    const rect = this.itemRect(i);
    const actor = this._list[i];
    if(actor){
        this.drawGauges(rect, actor);
        this.drawName(rect, actor);
        this.drawProfile(rect, actor);
        this.drawClassLevel(rect, actor);
        this.drawResHP(rect, actor);
        this.drawResMP(rect, actor);
        this.drawResTP(rect, actor);
        this.drawBaseParams(rect, actor);
        this.drawExParams(rect, actor);
        this.drawSpParams(rect, actor);
        this.displayMapCharacter(rect, i, actor);
        this.displayBattler(rect, i, actor);
    }else{
        const text = '-';
        const x = rect.x;
        const y = rect.y + (rect.height * 0.5);
        this.drawText(text, x, y, rect.width, 'center');
    }
}

WindowSynrec_ActorSelector.prototype.drawGauges = function(rect, actor){
    const rx = rect.x;
    const ry = rect.y;
    const window = this;
    const window_data = this._window_data;
    const gauges = window_data['Gauges'] || [];
    gauges.forEach((config)=>{
        try{
            const label = config['Label'];
            const lx = rx + eval(config['Label X']);
            const ly = ry + eval(config['Label Y']);
            window.drawTextEx(label, lx, ly);
            const cur_val = eval(config['Gauge Current Value']) || 0;
            const max_val = eval(config['Gauge Max Value']) || 1;
            const ratio = Math.max(0, Math.min(1, cur_val / max_val));
            const gx = rx + eval(config['Gauge X']);
            const gy = ry + eval(config['Gauge Y']);
            const gw = eval(config['Gauge Width']);
            const gh = eval(config['Gauge Height']);
            const gb = eval(config['Gauge Border']);
            const border_color = config['Gauge Border Color'];
            const background_color = config['Gauge Background Color'];
            const fill_color = config['Gauge Color'];
            window.contents.fillRect(gx,gy,gw,gh,border_color);
            window.contents.fillRect(gx + gb, gy + gb, gw - (gb * 2), gh - (gb * 2), background_color);
            window.contents.fillRect(gx + gb, gy + gb, (gw - (gb * 2)) * ratio, gh - (gb * 2), fill_color);
        }catch(e){
            console.error(`Failed to draw gauge: ${e}`);
        }
    })
}

WindowSynrec_ActorSelector.prototype.drawName = function(rect, actor){
    const rx = rect.x;
    const ry = rect.y;
    const window_data = this._window_data;
    if(!eval(window_data['Draw Actor Name']))return;
    const name = actor.name();
    const nickname = actor.nickname();
    const text = (window_data['Name Text'] || "").format(name, nickname);
    const tx = rx + eval(window_data['Name X']) || 0;
    const ty = ry + eval(window_data['Name Y']) || 0;
    this.drawTextEx(text, tx, ty);
}

WindowSynrec_ActorSelector.prototype.drawProfile = function(rect, actor){
    const rx = rect.x;
    const ry = rect.y;
    const window_data = this._window_data;
    if(!eval(window_data['Draw Actor Profile']))return;
    const text = actor.profile();
    const tx = rx + eval(window_data['Profile X']) || 0;
    const ty = ry + eval(window_data['Profile Y']) || 0;
    this.drawTextEx(text, tx, ty);
}

WindowSynrec_ActorSelector.prototype.drawClassLevel = function(rect, actor){
    const rx = rect.x;
    const ry = rect.y;
    const window_data = this._window_data;
    if(!eval(window_data['Draw Class Level']))return;
    const class_id = actor._classId;
    const class_data = $dataClasses[class_id] || {};
    const class_name = class_data ? class_data.name : "";
    const level = actor.level;
    const text = (window_data['Class Level Text'] || "").format(class_name, level);
    const tx = rx + eval(window_data['Class Level X']) || 0;
    const ty = ry + eval(window_data['Class Level Y']) || 0;
    this.drawTextEx(text, tx, ty);
}

WindowSynrec_ActorSelector.prototype.drawResHP = function(rect, actor){
    const rx = rect.x;
    const ry = rect.y;
    const window_data = this._window_data;
    if(!eval(window_data['Draw HP Resource']))return;
    const cur = actor.hp;
    const max = actor.mhp;
    const text = (window_data['HP Text'] || "").format(cur, max);
    const tx = rx + eval(window_data['HP X']) || 0;
    const ty = ry + eval(window_data['HP Y']) || 0;
    this.drawTextEx(text, tx, ty);
}

WindowSynrec_ActorSelector.prototype.drawResMP = function(rect, actor){
    const rx = rect.x;
    const ry = rect.y;
    const window_data = this._window_data;
    if(!eval(window_data['Draw MP Resource']))return;
    const cur = actor.mp;
    const max = actor.mmp;
    const text = (window_data['MP Text'] || "").format(cur, max);
    const tx = rx + eval(window_data['MP X']) || 0;
    const ty = ry + eval(window_data['MP Y']) || 0;
    this.drawTextEx(text, tx, ty);
}

WindowSynrec_ActorSelector.prototype.drawResTP = function(rect, actor){
    const rx = rect.x;
    const ry = rect.y;
    const window_data = this._window_data;
    if(!eval(window_data['Draw TP Resource']))return;
    const cur = actor.tp;
    const max = actor.maxTp();
    const text = (window_data['TP Text'] || "").format(cur, max);
    const tx = rx + eval(window_data['TP X']) || 0;
    const ty = ry + eval(window_data['TP Y']) || 0;
    this.drawTextEx(text, tx, ty);
}

WindowSynrec_ActorSelector.prototype.drawBaseParams = function(rect, actor){
    const rx = rect.x;
    const ry = rect.y;
    const window = this;
    const window_data = this._window_data;
    const draw_params = window_data['Draw Base Params'] || [];
    draw_params.forEach((param_draw)=>{
        try{
            const param_id = eval(param_draw['Base Param']);
            const param_value = actor.param(param_id) || 0;
            const text = (param_draw['Param Text'] || "").format(param_value);
            const tx = rx + eval(param_draw['X']) || 0;
            const ty = ry + eval(param_draw['Y']) || 0;
            window.drawTextEx(text, tx, ty);
        }catch(e){
            console.error(`Failed to draw base param: ${e}`);
        }
    })
}

WindowSynrec_ActorSelector.prototype.drawExParams = function(rect, actor){
    const rx = rect.x;
    const ry = rect.y;
    const window = this;
    const window_data = this._window_data;
    const draw_params = window_data['Draw Ex Params'] || [];
    draw_params.forEach((param_draw)=>{
        try{
            const param_id = eval(param_draw['Ex Param']);
            const param_value = (actor.xparam(param_id) || 0) * 100;
            const text = (param_draw['Param Text'] || "").format(param_value);
            const tx = rx + eval(param_draw['X']) || 0;
            const ty = ry + eval(param_draw['Y']) || 0;
            window.drawTextEx(text, tx, ty);
        }catch(e){
            console.error(`Failed to draw EX param: ${e}`);
        }
    })
}

WindowSynrec_ActorSelector.prototype.drawSpParams = function(rect, actor){
    const rx = rect.x;
    const ry = rect.y;
    const window = this;
    const window_data = this._window_data;
    const draw_params = window_data['Draw Sp Params'] || [];
    draw_params.forEach((param_draw)=>{
        try{
            const param_id = eval(param_draw['Sp Param']);
            const param_value = (actor.sparam(param_id) || 0) * 100;
            const text = (param_draw['Param Text'] || "").format(param_value);
            const tx = rx + eval(param_draw['X']) || 0;
            const ty = ry + eval(param_draw['Y']) || 0;
            window.drawTextEx(text, tx, ty);
        }catch(e){
            console.error(`Failed to draw SP param: ${e}`);
        }
    })
}

WindowSynrec_ActorSelector.prototype.displayMapCharacter = function(rect, index, actor){
    const window_data = this._window_data;
    if(!this._character_sprites[index])this.createCharacterSprite(index);
    const character_sprite = this._character_sprites[index];
    if(!eval(window_data['Display Map Character'])){
        character_sprite._visibility = false;
        character_sprite._character.setOpacity(0);
        return;
    }else{
        this._chara.setActor(actor);
        this._chara.setDirection(eval(window_data['Character Direction']) || 2);
        this._chara._screenX = rect.x + (eval(window_data['Character X']) || 0);
        this._chara._screenY = rect.y + (eval(window_data['Character X']) || 0);
        this._chara._off_screenX = eval(window_data['Character X']) || 0;
        this._chara._off_screenY = eval(window_data['Character Y']) || 0;
        character_sprite.scale.x = eval(window_data['Character Scale X']) || 0;
        character_sprite.scale.y = eval(window_data['Character Scale Y']) || 0;
        character_sprite._visibility = true;
        character_sprite._character.setOpacity(255);
    }
}

WindowSynrec_ActorSelector.prototype.displayBattler = function(rect, index, actor){
    const window_data = this._window_data;
    if(!this._battler_sprites[index])this.createBattlerSprite(index);
    const battler_sprite = this._battler_sprites[index];
    if(!eval(window_data['Display Battler'])){
        battler_sprite._visibility = false;
        return;
    }else{
        const hx = eval(window_data['Battler X']) || 0;
        const hy = eval(window_data['Battler Y']) || 0;
        battler_sprite.setHome(rect.x + hx, rect.y + hy);
        battler_sprite._motionLoaded = window_data['Battler Motion'];
        battler_sprite.startMotion(battler_sprite._motionLoaded);
        battler_sprite._offset_x = hx;
        battler_sprite._offset_y = hy;
        battler_sprite.scale.x = eval(window_data['Battler Scale X']);
        battler_sprite.scale.y = eval(window_data['Battler Scale Y']);
        battler_sprite._visibility = true;
        battler_sprite._motionCD = 0;
    }
}

WindowSynrec_ActorSelector.prototype.refreshSprites = function(){
    this.clearSprites();
    this.createCharacterSprites();
    this.createBattlerSprites();
}

WindowSynrec_ActorSelector.prototype.refresh = function(){
    this.refreshSprites();
    Window_Selectable.prototype.refresh.call(this, ...arguments);
}

function WindowSynrec_PartySelection(){
    this.initialize(...arguments);
}

WindowSynrec_PartySelection.prototype = Object.create(WindowSynrec_ActorSelector.prototype);
WindowSynrec_PartySelection.prototype.constructor = WindowSynrec_PartySelection;

WindowSynrec_PartySelection.prototype.initialize = function(data, party_id, disabled){
    this._party_id = party_id;
    WindowSynrec_ActorSelector.prototype.initialize.call(this, data);
    this._disabled = !!disabled;
    this.setList();
}

WindowSynrec_PartySelection.prototype.partyData = function(){
    const party_id = this._party_id;
    const party = $gameParty.getMultiParty(party_id);
    return party;
}

WindowSynrec_PartySelection.prototype.partyMembers = function(){
    const party = this.partyData();
    return party['Members'].map((id)=>{
        if(isNaN(id)){
            if(id instanceof Game_Actor){
                return id;
            }
        }else{
            return $gameActors.actor(id);
        }
    }).filter(Boolean);
}

WindowSynrec_PartySelection.prototype.maxItems = function(){
    return this.partyMembers().length;
}

WindowSynrec_PartySelection.prototype.setList = function(){
    const members = this.partyMembers();
    this._list = members;
    this.clearSprites();
    this.refresh();
}

function SceneSynrec_PartyEditor(){
    this.initialize(...arguments);
}

SceneSynrec_PartyEditor.prototype = Object.create(Scene_Base.prototype);
SceneSynrec_PartyEditor.prototype.constructor = SceneSynrec_PartyEditor;

SceneSynrec_PartyEditor.prototype.create = function(){
    Scene_Base.prototype.create.call(this);
    this.createBackgrounds();
    this.createBackAnims();
    this.createWindowLayer();
    this.createPartyWindows();
    this.createPartyMemberWindows();
    this.createActorsWindow();
    this.createActorMemberWindows();
    // this.createNotificationWindow();
    this.createGameDataWindows();
    this.createConfirmButton();
    this.createHoldCharacterSprite();
    this._tx = TouchInput.x;
    this._ty = TouchInput.y;
    this._window_index = -1;
}

SceneSynrec_PartyEditor.prototype.createBackgrounds = function(){
    this._backgrounds = [];
    const UI = Syn_PrtyMngt.UI;
    const configs = UI['Backgrounds'];
    for(let i = 0; i < configs.length; i++){
        const config = configs[i];
        if(!config)continue;
        const sprite = new Sprite_SynMenuStaticGfx(config);
        this.addChild(sprite);
        this._backgrounds.push(sprite);
    }
}

SceneSynrec_PartyEditor.prototype.createBackAnims = function(){
    this._back_anims = [];
    const UI = Syn_PrtyMngt.UI;
    const configs = UI['Background Animations'];
    for(let i = 0; i < configs.length; i++){
        const config = configs[i];
        if(!config)continue;
        const sprite = new Sprite_SynMenuAnimGfx(config);
        this.addChild(sprite);
        this._back_anims.push(sprite);
    }
}

SceneSynrec_PartyEditor.prototype.createPartyWindows = function(){
    const all_parties = $gameParty._multi_parties.filter((party)=>{
        const sw_id = eval(party['Unlock Switch']);
        if(
            !sw_id ||
            $gameSwitches.value(sw_id)
        ){
            const party_id = party['Identifier'];
            const allowed_parties = $gameTemp.allowedParties();
            if(Array.isArray(allowed_parties)){
                return allowed_parties.includes(party_id);
            }
            return true;
        }
    });
    $gameTemp.clearAllowedParties();
    this._party_windows = [];
    const UI = Syn_PrtyMngt.UI;
    const configs = UI['Party Windows'];
    for(let i = 0; i < configs.length; i++){
        const config = configs[i];
        if(!config)continue;
        const party = all_parties[i];
        if(!party)continue;
        const party_id = party['Identifier'];
        const window = new WindowSynrec_PartySelection(config, party_id)
        this.addWindow(window);
        this._party_windows.push(window);
    }
}

SceneSynrec_PartyEditor.prototype.createPartyMemberWindows = function(){
    this._party_member_windows = [];
    const UI = Syn_PrtyMngt.UI;
    const configs = UI['Party Member Windows'];
    for(let i = 0; i < configs.length; i++){
        const config = configs[i];
        if(!config)continue;
        const window = new WindowSynrec_PartySelection(config)
        this.addWindow(window);
        this._party_member_windows.push(window);
    }
}

SceneSynrec_PartyEditor.prototype.createActorsWindow = function(){
    const UI = Syn_PrtyMngt.UI;
    const config = UI['Available Actors Window'];
    const window = new WindowSynrec_ActorSelector(config);
    this.addWindow(window);
    this._actors_window = window;
}

SceneSynrec_PartyEditor.prototype.createActorMemberWindows = function(){
    this._actor_member_windows = [];
    const UI = Syn_PrtyMngt.UI;
    const configs = UI['Actor Member Windows'];
    for(let i = 0; i < configs.length; i++){
        const config = configs[i];
        if(!config)continue;
        const window = new WindowSynrec_ActorData(config);
        this.addWindow(window);
        this._actor_member_windows.push(window)
    }
}

// SceneSynrec_PartyEditor.prototype.createNotificationWindow = function(){
//     const UI = Syn_PrtyMngt.UI;
//     const config = UI['Notification Window'];
//     const window = new WindowSynrec_Notification(config);
//     this.addWindow(window);
//     this._notice_window = window;
// }

SceneSynrec_PartyEditor.prototype.createGameDataWindows = function(){
    this._game_windows = [];
    const UI = Syn_PrtyMngt.UI;
    const configs = UI['Game Data Windows'];
    for(let i = 0; i < configs.length; i++){
        const config = configs[i];
        if(!config)continue;
        const window = new WindowSynrec_GameData(config);
        this.addWindow(window);
        this._game_windows.push(window);
    }
}

SceneSynrec_PartyEditor.prototype.createConfirmButton = function(){
    const UI = Syn_PrtyMngt.UI;
    if(UI['Confirm Button']){
        const btn = new SpriteSynrec_ConfirmButton();
        this.addChild(btn);
        this._confirm_button = btn;
    }
}

SceneSynrec_PartyEditor.prototype.createHoldCharacterSprite = function(){
    const character = new GameCharacter_MenuCharacter();
    const sprite = new Sprite_Character(character);
    this.addChild(sprite);
    this._hold_sprite = sprite;
    this._hold_character = character;
    this._hold_data = {
        keyMode:true,
        from:null,
        to:null
    };
}

SceneSynrec_PartyEditor.prototype.update = function(){
    Scene_Base.prototype.update.call(this, ...arguments);
    this.updateTouchMode()
    if(
        !this._hold_data.keyMode
    ){
        this.updateTouchWindow();
        this.updateTouchHold();
        if(!this._confirm_button){
            this.updateTouchExit();
        }
    }else{
        this.updateToggleWindow();
        this.updateKeyHold();
        this.updateActiveWindow();
        if(!this._confirm_button){
            this.updateKeyExit();
        }
    }
    this.updateHoldSprite();
}

SceneSynrec_PartyEditor.prototype.updateTouchMode = function(){
    const tx = TouchInput.x;
    const ty = TouchInput.y;
    const hold_data = this._hold_data;
    if(
        (
            this._tx != tx ||
            this._ty != ty ||
            TouchInput.isPressed()
        ) &&
        hold_data.keyMode
    ){
        this._tx = tx;
        this._ty = ty;
        hold_data.keyMode = false;
        hold_data.from = null;
        hold_data.to = null;
        this._activate_key_window = null;
        return true;
    }else if(
        (
            Input.isTriggered('down') ||
            Input.isTriggered('left') ||
            Input.isTriggered('right') ||
            Input.isTriggered('up') ||
            Input.isTriggered('ok') ||
            Input.isTriggered('cancel') ||
            Input.isTriggered('pageup') ||
            Input.isTriggered('pagedown')
        ) &&
        !hold_data.keyMode
    ){
        this._touch_window = null;
        hold_data.keyMode = true;
        hold_data.from = null;
        hold_data.to = null;
        return false;
    }
}

SceneSynrec_PartyEditor.prototype.updateTouchWindow = function(){
    const tx = TouchInput.x;
    const ty = TouchInput.y;
    const all_windows = this._party_windows.concat(this._actors_window);
    all_windows.forEach((window)=>{
        window.deactivate();
    })
    this._touch_window = all_windows.find((window)=>{
        const wt = window.worldTransform;
        const wx = wt.tx;
        const wy = wt.ty;
        const ww = window.width;
        const wh = window.height;
        return(
            tx >= wx &&
            tx <= wx + ww &&
            ty >= wy &&
            ty <= wy + wh
        )
    })
    if(this._touch_window){
        const window = this._touch_window;
        window.activate();
        const touchPos = new Point(tx, ty);
        const localPos = window.worldTransform.applyInverse(touchPos);
        this._touch_window_index = window.hitTest(localPos.x, localPos.y);
    }else{
        this._touch_window_index = -1;
    }
}

SceneSynrec_PartyEditor.prototype.updateTouchHold = function(){
    const hold_data = this._hold_data;
    if(hold_data.to && hold_data.from){
        const party_id_1 = hold_data.from[0];
        const party_index_1 = hold_data.from[1];
        const party_id_2 = hold_data.to[0];
        const party_index_2 = hold_data.to[1];
        $gameParty.swapMultiParty(party_id_1, party_index_1, party_id_2, party_index_2);
        hold_data.from = null;
        hold_data.to = null;
        this.refreshAll();
        return;
    }
    if(!hold_data.from && TouchInput.isPressed()){
        const touch_window = this._touch_window;
        if(!touch_window)return;
        if(touch_window == this._actors_window){
            const index = this._touch_window_index;
            hold_data.from = ["", index];
        }else{
            const party = touch_window.partyData();
            const party_id = party['Identifier'];
            const index = this._touch_window_index;
            hold_data.from = [party_id, index];
        }
    }else if(hold_data.from && !TouchInput.isPressed()){
        const touch_window = this._touch_window;
        if(!touch_window){
            hold_data.from = null;
            return;
        }else{
            if(touch_window == this._actors_window){
                const index = this._touch_window_index;
                hold_data.to = ["", index];
            }else{
                const party = touch_window.partyData();
                const party_id = party['Identifier'];
                const index = this._touch_window_index;
                hold_data.to = [party_id, index];
            }
        }
    }
}

SceneSynrec_PartyEditor.prototype.updateTouchExit = function(){
    const hold_data = this._hold_data;
    if(
        !hold_data.from &&
        !hold_data.to
    ){
        if(TouchInput.isCancelled()){
            this.popScene();
        }
    }
}

SceneSynrec_PartyEditor.prototype.updateToggleWindow = function(){
    if(Input.isTriggered('pageup')){
        this._window_index--;
        if(this._window_index < -1){
            this._window_index = this._party_windows.length - 1;
        }
    }
    if(Input.isTriggered('pagedown')){
        this._window_index++;
        if(this._window_index >= this._party_windows.length){
            this._window_index = -1;
        }
    }
    const all_windows = this._party_windows.concat(this._actors_window);
    all_windows.forEach((window)=>{
        window.deactivate();
    })
    if(this._window_index < 0){
        this._actors_window.activate();
        this._activate_key_window = this._actors_window;
    }else{
        this._party_windows[this._window_index].activate();
        this._activate_key_window = this._party_windows[this._window_index];
    }
}
SceneSynrec_PartyEditor.prototype.updateKeyHold = function(){
    const hold_data = this._hold_data;
    if(hold_data.to && hold_data.from){
        const party_id_1 = hold_data.from[0];
        const party_index_1 = hold_data.from[1];
        const party_id_2 = hold_data.to[0];
        const party_index_2 = hold_data.to[1];
        $gameParty.swapMultiParty(party_id_1, party_index_1, party_id_2, party_index_2);
        hold_data.from = null;
        hold_data.to = null;
        this.refreshAll();
        return;
    }
    if(Input.isTriggered('ok')){
        const index = this._activate_key_window.index();
        const loc = this._window_index >= 0 ? this._activate_key_window._party_id : "";
        if(!hold_data.from){
            hold_data.from = [loc, index];
        }else{
            hold_data.to = [loc, index];
        }
    }
}
SceneSynrec_PartyEditor.prototype.updateActiveWindow = function(){}
SceneSynrec_PartyEditor.prototype.updateKeyExit = function(){
    if(Input.isTriggered('cancel')){
        if(this._hold_data.from || this._hold_data.to){
            this._hold_data.from = null;
            this._hold_data.to = null;
            return;
        }
        this.popScene();
    }
}

SceneSynrec_PartyEditor.prototype.updateHoldSprite = function(){
    const active_window = this._activate_key_window;
    const active_index = active_window ? active_window.index() : -1;
    const tx = 54 + (active_index >= 0 ? active_window.worldTransform.tx + active_window.itemRect(active_index).x : TouchInput.x);
    const ty = 48 + (active_index >= 0 ? active_window.worldTransform.ty + active_window.itemRect(active_index).y : TouchInput.y);
    const chara = this._hold_character;
    chara._screenX = tx;
    chara._screenY = ty;
    const hold_data = this._hold_data;
    const from = hold_data.from;
    if(!from){
        chara.setImage("", 0);
        this._set_hold_chara = false;
        return;
    }else{
        if(!this._set_hold_chara){
            const loc = from[0];
            const index = from[1];
            const party_members = loc ? $gameParty.getMultiParty(loc)['Members'] : $gameParty.baseAllMembers()
            const member_id = eval(party_members[index]);
            if(!member_id){
                chara.setImage("", 0);
                return;
            }
            const member = typeof member_id == "number" ? $gameActors.actor(member_id) : member_id;
            const char_file = member.characterName();
            const char_indx = member.characterIndex();
            chara.setImage(char_file, char_indx);
            this._set_hold_chara = true;
        }
    }
}

SceneSynrec_PartyEditor.prototype.refreshAll = function(){
    this._actors_window.setList();
    this._party_windows.forEach((window)=>{
        window.setList();
    })
    this._party_member_windows.forEach((window)=>{
        window.setActor(null);
        window.close();
    })
    this._actor_member_windows.forEach((window)=>{
        window.setActor(null);
        window.close();
    })
}

Syn_PrtyMngt_ScnMap_UpdtMain = Scene_Map.prototype.updateMain;
Scene_Map.prototype.updateMain = function() {
    Syn_PrtyMngt_ScnMap_UpdtMain.call(this, ...arguments);
    this.updatePartySwap();
}

Scene_Map.prototype.updatePartySwap = function(){
    const nxt_btn = Syn_PrtyMngt.NEXT_PARTY_BUTTON;
    const prv_btn = Syn_PrtyMngt.PREV_PARTY_BUTTON;
    if(Input.isTriggered(nxt_btn)){
        if($gameParty.nextMultiParty()){
            const party = $gameParty.currentMultiParty();
            const map = eval(party['Default Map']);
            const x = eval(party['Map X']);
            const y = eval(party['Map Y']);
            const d = eval(party['Map Direction']);
            $gamePlayer.reserveTransfer(map, x, y, d, 0);
        }
    }else if(Input.isTriggered(prv_btn)){
        if($gameParty.prevMultiParty()){
            const party = $gameParty.currentMultiParty();
            const map = eval(party['Default Map']);
            const x = eval(party['Map X']);
            const y = eval(party['Map Y']);
            const d = eval(party['Map Direction']);
            $gamePlayer.reserveTransfer(map, x, y, d, 0);
        }
    }
}