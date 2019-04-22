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
        Character:
        {
            default: null,
            type: cc.Node

        },
        StickObject:
        {
            default: null,
            type: cc.Node,
        },
        radioObject: {
            default: null,
            type: cc.Node,
        },
        keyboradPower: 3,//按键的力度
        state: 0,//人物的平衡位置
        preState: 0,
        leftKeyDown: false,
        rightKeyDown: false,
        StandSpriteFrame: {
            default: null,
            type: cc.SpriteFrame,
        },
        bikeState: false,

        leftPanel: cc.Button,
        rightPanel: cc.Button,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init() {
        this.bikeState = false
    },
    start() {
        this.init()
        this.Character = this.node;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        /*注册一堆事件。。。*/
        this.node.on('BombEvent', this.onBombEvent.bind(this));
        this.node.on('BirdEvent', this.onBirdEvent.bind(this));
        this.node.on('BicycleEvent', this.onBicycleEvent.bind(this));

        this.leftPanel.node.on('click', this.leftTouch, this);
        this.rightPanel.node.on('click', this.rightTouch, this);
    },

    leftTouch() {
        cc.log('left')
        this.leftKeyDown = true;

    },

    rightTouch() {
        this.rightKeyDown = true;

    },
    onKeyUp: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                this.leftKeyDown = false;
                break;
            case cc.macro.KEY.right:
                this.rightKeyDown = false;
                break;
            /*case cc.macro.KEY.down:
                if (!this.characterCrouch) {
                    this.SwitchBody();
                }
                break;
            case cc.macro.KEY.up:
                if (this.characterCrouch) {
                    this.SwitchBody();
                }
                break;*/

        }
    },
    onKeyDown: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                this.leftKeyDown = true;
                break;
            case cc.macro.KEY.right:
                this.rightKeyDown = true;
                break;
        }
    },
    SwitchBody: function () {//切换站姿蹲姿
        //this.characterCrouch = !this.characterCrouch;
        var sprite = this.node.getChildByName("Character").getComponent(cc.Sprite);
        if (this.characterCrouch) {
            sprite.spriteFrame = this.CrouchSpriteFrame;
        } else {
            sprite.spriteFrame = this.StandSpriteFrame;

        }
        var stick = this.node.getChildByName("Stick");
        if (stick) {
            if (this.characterCrouch) {
                stick.y -= 120;
            } else {
                stick.y += 120;

            }
        }

    },
    update(dt) {
        let gm = window.GM;
        if (gm.gameStart && (!gm.gamePause) && (!gm.gameOver)) {

            if (this.rightKeyDown == true) {
                // console.log('right')
                this.rightKeyDown = false;
                this.state += this.keyboradPower * dt;

            }
            if (this.leftKeyDown == true) {
                this.leftKeyDown = false;
                this.state -= this.keyboradPower * dt;

            }
            if (gm) {
                this.state += gm.windManager.windPower * 0.4 * dt;

            }


            if (this.preState == this.state) {
                return;
            } else {
                let angle=this.state * 18;
                // let rotateTo = cc.rotateTo(dt, angle);
                // this.Character.runAction(rotateTo);
                this.Character.rotation = angle;
                this.preState = this.state;
            }
            if (this.state > 5 || this.state < -5) {
                // window.Global
                gm.gameOver = true;
                // var go= cc.find("GameOverTip");
                // if (go) {
                //     go.active = true;
                // }
                cc.director.loadScene('GameOver');
            }
        }
    },
    /*触发事件*/
    onBombEvent(event) {
        //window.GM.ropeMove.moveSpeed=-30;
        console.log("OnBombEvent");
        window.GM.ropeMove.moveSpeed = -20;//倒退的速度
        this.scheduleOnce(function () {
            // 这里的 this 指向 component
            window.GM.ropeMove.moveSpeed = 20;
        }, 3);
    },
    onBirdEvent(event) {
        console.log("OnBirdEvent");

    },
    onBicycleEvent(event) {
        console.log("OnBicycleEvent");

        window.GM.ropeMove.moveSpeed = 70;//加速的速度
        if (!this.bikeState) {
            this.changeCharacter();
        }
        this.bikeState = true;
        this.scheduleOnce(function () {
            // 这里的 this 指向 component
            window.GM.ropeMove.moveSpeed = 20;
        }, 3);


    },

    changeCharacter() {
        cc.log('changechar')
        let aaa = this.node.getChildByName("Character")
        let bbb = this.node.getChildByName("charaWithBike")

        // let anim = bbb.getComponent(cc.Animation);
        aaa.active = false
        bbb.active = true
        this.StickObject.y += 30
        this.radioObject.active = true
        // anim.play()
        setTimeout(() => {
            bbb.active = false
            this.radioObject.active = false
            aaa.active = true
            this.StickObject.y -= 30
            this.bikeState = false
        }, 5000);

    }
});
