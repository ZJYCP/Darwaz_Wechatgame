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
        itemmange:
        {
            default:null,
            type:cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    start() {
        // this.opera=this.itemmange.getComponent('ItemManager')
    },
    onCollisionEnter: function (other, self) {
        console.log('on collision enter');
        var itemname = other.node.name;
        if (itemname.indexOf("Bomb") != -1) {
            this.node.dispatchEvent( new cc.Event.EventCustom('BombEvent', true) );
           other.node.destroy();
        }
        if (itemname.indexOf("Bicycle") != -1) {
            this.node.dispatchEvent( new cc.Event.EventCustom('BicycleEvent', true) );
            other.node.destroy();
            // this.opera.onBicyleKilled(other)
        }
        if (itemname.indexOf("Bird") != -1) {
            var Pos = other.node.convertToWorldSpaceAR(cc.v2(100, 100));
            window.GM.CollisionPos= cc.v2(Pos.x,Pos.y);
            console.log("window",Pos.x,Pos.y);
            this.node.dispatchEvent(new cc.Event.EventCustom('BirdEvent', true) );

            other.node.destroy();

        }
        /* // 碰撞系统会计算出碰撞组件在世界坐标系下的相关的值，并放到 world 这个属性里面
         var world = self.world;

         // 碰撞组件的 aabb 碰撞框
         var aabb = world.aabb;

         // 节点碰撞前上一帧 aabb 碰撞框的位置
         var preAabb = world.preAabb;

         // 碰撞框的世界矩阵
         var t = world.transform;

         // 以下属性为圆形碰撞组件特有属性
         var r = world.radius;
         var p = world.position;

         // 以下属性为 矩形 和 多边形 碰撞组件特有属性
         var ps = world.points;*/
    },
    // update (dt) {},
});
