// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        touchPanel:cc.Node,
        persistNode:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // cc.game.addPersistRootNode(persistNode);
    },

    start(){

    },

    onStartButonDown(event, customEventData) {
        window.GM.gameStart = true;
        var st = cc.find("Canvas/gametip");
        if (st) {
            st.active = false;
            // this.touchPanel.active=true;
        }
        window.GM.ropeMove.moveSpeed=20;

    },
    onPauseButtonDown(event, customEventData) {
        if(window.GM.gameOver||(!window.GM.gameStart))
        {
            return;
        }
        window.GM.gamePause = !window.GM.gamePause;
        var pt = cc.find("PauseTip");
        if (pt) {
            pt.active = !pt.active;
            if(pt.active)
            {
              //  this.tempStoreMoveSpeed= window.GM.ropeMove.moveSpeed;
                cc.director.pause();

               // console.log(this.tempStoreMoveSpeed);
            }
           else {
                //window.GM.ropeMove.moveSpeed=this.tempStoreMoveSpeed;
                cc.director.resume();
            }
        }
    },
    onRestartButtonDown(event, customEventData) {
        // var go = cc.find("GameOverTip");
        // if (go) {
        //     go.active =false;
        // }
        
        // window.GM.gameOver = !window.GM.gameOver;
        // window.GM.characterController.state=0;
        // window.GM.characterController.node.rotation=0;
        // window.GM.distance=0;
        // window.GM.windManager.windPower=0;
        // window.GM.windManager.windText.string = "Wind Power: " + 0;
        
        cc.director.loadScene('GameScene');
    },
    // update (dt) {},
});
