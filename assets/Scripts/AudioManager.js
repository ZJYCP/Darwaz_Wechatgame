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
        bgAudio:{
            type:cc.AudioClip,
            default:null
        },
        // bgAudioChannel:
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.game.addPersistRootNode(this.node);
        this.playBGM();
    },

    start () {

    },

    isPlaying(){
       return this.audioEngine.isMusicPlaying();
    },

    playBGM(){
        this.bgAudioChannel=cc.audioEngine.play(this.bgAudio,true,0.5);
    },

    stopBgAudio(){
        console.log('stop');
        if (this.bgAudioChannel!==undefined){
            cc.audioEngine.stop(this.bgAudioChannel);
            this.bgAudioChannel=undefined;
        }
    }

    // update (dt) {},
});
