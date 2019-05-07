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
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    DoFallingAction(fallingTime)
    {
        let c=(Math.random()*cc.view.getVisibleSize().width/4)+cc.view.getVisibleSize().width/8;

        let w=((Math.random()-0.5)*cc.view.getVisibleSize().height/5)+cc.view.getVisibleSize().height/4;
        var action = cc.moveTo(fallingTime,cc.v2(c,w));
        action.easing(cc.easeInOut(2));
        var destroySelf=cc.callFunc(function () {
            setTimeout(() => {
                // this.onBicyleKilled(newbomb);
                if(cc.isValid(this.node)){
                    console.log('bicyle timeout loss')
                    this.node.destroy()
                }
                
            }, 6000);
            
        },this);
        var seqAction = cc.sequence(action, destroySelf);
        var ac=this.node.runAction(seqAction);

    },
    // update (dt) {},
});
