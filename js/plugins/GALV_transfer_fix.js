(() => {
  let galvTransferAnimFixDelay = 0;

  // Disable animations before transfer
  const _Game_Player_performTransfer = Game_Player.prototype.performTransfer;
  Game_Player.prototype.performTransfer = function() {
    this.disableCharAnims = true;
    this._stepAnime = false;
    galvTransferAnimFixDelay = 3; // frames to wait after transfer
    _Game_Player_performTransfer.call(this);
  };

  // Re-enable a few frames after landing
  const _Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    if (galvTransferAnimFixDelay > 0) {
      galvTransferAnimFixDelay--;
      if (galvTransferAnimFixDelay === 0) {
        $gamePlayer.disableCharAnims = false;
        $gamePlayer._stepAnime = true;
      }
    }
    _Scene_Map_update.call(this);
  };
})();
