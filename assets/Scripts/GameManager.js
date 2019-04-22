// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var customWind = require("CustomWind");
var ropeMove = require("RopeMove");
var characterCon = require("CharacterController");
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
        gameStart: true,//一开始有游戏提示，游戏尚未开始
        gamePause: false,//游戏暂停
        gameOver: false,//游戏结束
        distance: 0,
        DistanceText:
            {
                default: null,
                type: cc.Label,

            },
        
        windManager:
            {
                default: null,
                type: customWind,
            },
        ropeMove:
            {
                default: null,
                type: ropeMove,
            },
        characterController:
            {
                default: null,
                type: characterCon,
            },



    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        window.GM = this.node.getComponent("GameManager");
    },

    init(){
        window.GM.gameOver = false;
        window.GM.characterController.state=0;
        window.GM.characterController.node.rotation=0;
        window.GM.distance=0;
        window.GM.windManager.windPower=0;
        window.GM.windManager.windText.string = "Wind Power: " + 0;
    },
    start() {
        /*开启碰撞系统*/
        this.init();
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;

        this.windManager = this.node.getComponent("CustomWind");
    },

    update(dt) {
        if (this.gameStart && (!this.gamePause) && (!this.gameOver)) {
            if (this.ropeMove != null) {
                this.distance += this.ropeMove.moveSpeed * dt * 0.05;
                if (this.DistanceText != null) {
                    this.DistanceText.string = "Distance:" + Math.floor(this.distance);
                }
            }
        }

    },

});
