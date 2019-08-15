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
        touchPanel: cc.Node,
        // persistNode:cc.Node,
        gameAudioBtn: cc.Button,
        introduction:cc.Node,
        score:cc.Label,
        BgImg:cc.Sprite
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let music = this.gameAudioBtn.node.getChildByName('music');
        this.audioIcon = music.getComponent(cc.Sprite);
        this.audioPlayer = cc.find("BgAudio").getComponent("AudioManager");
        this.gameAudioBtn.node.on('click',this.onAudioClick,this);
        // this.bg_image=this.BgImg.node.getComponent(cc.Sprite);
        cc.loader.loadRes(window.BG, cc.SpriteFrame, function (err, spriteFrame) {
            // console.log(spriteFrame);
            this.BgImg.spriteFrame = spriteFrame;
        }.bind(this));
        cc.director.resume()
    },

    start() {
        // console.log(this.audioIcon);
        if (this.audioPlayer.playState === 1) {
            this.changeTex(this.audioIcon, false);
        } else {
            this.changeTex(this.audioIcon, true);
        }
    },

    onStartButonDown(event, customEventData) {
        // cc.loader.downloader.loadSubpackage('over', function (err) {
        //     if (err) {
        //         return console.error(err);
        //     }
        //     console.log('load subpackage successfully.');
        // });

        window.GM.gameStart = true;
        var st = cc.find("Canvas/gametip");
        if (st) {
            st.active = false;
            // this.touchPanel.active=true;
        }
        window.GM.ropeMove.moveSpeed = 20;

    },
    onPauseButtonDown(event, customEventData) {
        if (window.GM.gameOver || (!window.GM.gameStart)) {
            return;
        }
        window.GM.gamePause = !window.GM.gamePause;
        this.score.string=parseInt(window.GM.distance);
        this.audioPlayer.pauseBGM();
        var pt = cc.find("Canvas/PauseTip");
        if (pt) {

            pt.active = !pt.active;
            if (pt.active) {

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

    onAudioClick() {
        if (this.audioPlayer.playState===1) {
            this.audioPlayer.stopBgAudio();
            this.changeTex(this.audioIcon, true);
        } else {
            console.log('play')
            this.audioPlayer.playBGM();
            this.changeTex(this.audioIcon, false);
        }
    },

    changeTex(sprite,flag){
        if (flag){
            cc.loader.loadRes('Textures/gameScene/musicClose', cc.SpriteFrame, function (err, spriteFrame) {
                // console.log(spriteFrame);
                sprite.spriteFrame = spriteFrame;
            }.bind(this));
        } else {
            cc.loader.loadRes('Textures/gameScene/musicOn', cc.SpriteFrame, function (err, spriteFrame) {
                // console.log(spriteFrame);
                sprite.spriteFrame = spriteFrame;
            }.bind(this));
        }

    },

    goback(){
        cc.director.pause();
        cc.director.loadScene('StartScene');
        // cc.director.runSceneImmediate('StartScene')
        // cc.director.replaceScene('StartScene')
    },

    showIntrodection(){
        this.introduction.active=true;
    },

    hideIntrodection(){
        this.introduction.active=false;
    }


    // update (dt) {},
});
