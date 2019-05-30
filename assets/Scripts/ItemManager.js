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
        Fog:
        {
            default: null,
            type: cc.Node,
        },
        Bomb:
        {
            default: null,
            type: cc.Prefab,
        },
        Bicycle:
        {
            default: null,
            type: cc.Prefab,
        },
        Bird:
        {
            default: null,
            type: cc.Prefab,
        },
        fogStatus: 0

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // this.biyclePool = new cc.NodePool();
        // let initCount = 3;
        // for (let i = 0; i < initCount; ++i) {
        //     let bicyle = cc.instantiate(this.Bicycle); // 创建节点
        //     this.biyclePool.put(bicyle); // 通过 put 接口放入对象池
        // }
    },

    start() {

        // this.Fog = cc.find("Fog");
        this.schedule(this.BirdFly.bind(this), 19, cc.macro.REPEAT_FOREVER);
        this.schedule(this.BombFallDown.bind(this), 11, cc.macro.REPEAT_FOREVER);
        this.schedule(this.BicycleFallDown.bind(this), 31, cc.macro.REPEAT_FOREVER);
        // this.scheduleOnce(this.fogShow.bind(this),2);



    },
    BombFallDown() {
        let gm = window.GM;
        if (gm.gameStart && (!gm.gamePause) && (!gm.gameOver)) {
            if (this.Bomb) {
                let newbomb = cc.instantiate(this.Bomb);
                newbomb.parent = this.node;

                let randomNumber = Math.random();//随机指定区域,后面再改
                if (randomNumber > 0.25 && randomNumber < 0.5) {
                    randomNumber -= 0.2;
                } else if (randomNumber >= 0.5 && randomNumber < 0.75) {
                    randomNumber += 0.2
                }
                randomNumber *= cc.view.getVisibleSize().width;
                newbomb.setPosition(randomNumber, cc.view.getVisibleSize().height + 50);
                let bi = newbomb.getComponent("BombItem");
                if (bi != null) {
                    bi.DoFallingAction(4);
                }
            }
        }
    },

    BirdFly() {
        let gm = window.GM;
        if (gm.gameStart && (!gm.gamePause) && (!gm.gameOver)) {
            if (this.Bird) {
                let newbomb = cc.instantiate(this.Bird);
                newbomb.parent = this.node;

                let randomNumber = Math.random();
                randomNumber=(parseInt(randomNumber*100)%30+30)/100;
                // if (randomNumber > 0 && randomNumber < 0.1) {
                //     randomNumber += 0.2;
                // }else if (randomNumber >0.1&&randomNumber <0.2) {
                //     randomNumber += 0.1;
                // } else if (randomNumber > 0.5 && randomNumber < 0.75) {
                //     randomNumber -= 0.2;
                // }
                // else if(randomNumber > 0.75)
                // {
                //     randomNumber -= 0.35;
                // }
                randomNumber *= cc.view.getVisibleSize().height;
                newbomb.setPosition(-10,randomNumber );
                let bi = newbomb.getComponent("BirdItem");
                if (bi != null) {
                    bi.DoFlyingAction(4);
                }
            }
        }
    },

    createBicyle(parentNode) {
        let bicyle = null;
        if (this.biyclePool.size() > 0) {
            bicyle = this.biyclePool.get();
        } else {
            bicyle = cc.instantiate(this.Bicycle);
        }
        bicyle.parent = parentNode;
        // cc.log('create success')
        return bicyle;
    },
    onBicyleKilled(bicyle) {
        // enemy 应该是一个 cc.Node
        cc.log('killed')
        this.biyclePool.put(bicyle);

    },

    BicycleFallDown() {
        let gm = window.GM;
        if (gm.gameStart && (!gm.gamePause) && (!gm.gameOver)) {
            if (this.Bicycle) {
                let newbomb = cc.instantiate(this.Bicycle);
                newbomb.parent = this.node;
                // let newbomb=this.createBicyle(this.node)
                let randomNumber = 100;//随机指定区域,后面再改cc.view.getVisibleSize().height + 50
                let randomSide = Math.random() * 100;
                // console.log(randomSide)

                if (randomSide > 50) {
                    newbomb.setPosition(cc.view.getVisibleSize().width + 50, cc.view.getVisibleSize().height / 1.5);
                }
                else {
                    newbomb.setPosition(-50, cc.view.getVisibleSize().height / 1.5);
                }
                let bi = newbomb.getComponent("BicycleItem");
                if (bi != null) {
                    bi.DoFallingAction(4);
                }
                else {
                    console.log("f1");

                }

            }
        }
    },

    fogShow() {
        // this.Fog.active = true
        console.log(cc.isValid(this.Fog))
        setTimeout(() => {
            this.fogStatus = 0;
        }, 60000);
        let action = cc.sequence(
            cc.moveTo(4, cc.v2(-65, -305))
            , cc.delayTime(5)
            , cc.moveTo(4, cc.v2(972, -305))
        );

        // action.easing(cc.easeSineInOut(3.0));
        this.Fog.runAction(action);

        this.Fog.setPosition(cc.v2(-1017, -305));


    },

    changeBird(){

        cc.log('changeBird');
        let newbomb = cc.instantiate(this.Bird);
        newbomb.parent = this.node;
        newbomb.destroy()
        cc.log('distroy');
        // let anim = bbb.getComponent(cc.Animation);
        // anim.play()
        setTimeout(() => {

        }, 5000);


    },
    update(dt) {
        let gm = window.GM;
        if (gm.gameStart && (!gm.gamePause) && (!gm.gameOver)) {
            let distCaculate = parseInt(window.GM.distance % 10) + 1;
            if (distCaculate % 16 == 0 && parseInt(Math.random() * 10) < 4 && this.fogStatus == 0) {
                this.fogStatus = 1;
                this.fogShow();
                // console.log('ssa'+window.GM.distance)
            }
        }

    },
});
