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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        windPower:0,//风力等级
        changeTime:4,//风的改变时间
        windText:{
            default:null,
            type:cc.Label,
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {
        this.schedule(function () {
            let gm = window.GM;
            if (gm.gameStart && (!gm.gamePause) && (!gm.gameOver)) {
                this.windPower = -5 + 10 * Math.random();
                if (this.windText != null) {
                    this.windText.string = "" + Math.floor(this.windPower);
                }
                setTimeout(() => {
                    this.windPower=0;
                    if (this.windText != null) {
                        this.windText.string = "0";
                    }
                }, 3000);
            }

        }.bind(this),10,cc.macro.REPEAT_FOREVER);
    },

    // update (dt) {},
});
