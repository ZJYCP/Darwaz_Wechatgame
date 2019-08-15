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

    onLoad () {
        this.node.on('click', function ( event ) {
            console.log('inner click')
            
            this.setpiece()
            this.node.destroy();
        }.bind(this));
    },

    start () {


    },

    getpiece(){
        // let data=0
        if(CC_WECHATGAME){
            console.log('获取piece')

            return wx.getStorageSync('piece')
        }

        // return data

    },

    setpiece(){
        let piece_now=this.getpiece()
        // this.audioPlayer=cc.find('ling').getComponent('AudioManager');
        // this.lingsource.play();
        console.log('加分了加分了',piece_now)
        window.master=1
        let piece=null
        // if(isNaN(piece_now)){
        //     piece='1'
        // }else{
        //     piece=(parseInt(piece_now)+1).toString()
        // }
        if(parseInt(piece_now)>=0){
            piece=(parseInt(piece_now)+1).toString()
        }else{
            piece='1'
        }
        // let piece=isNaN(piece_now)?'1':(parseInt(piece_now)+1).toString()
        if(CC_WECHATGAME){
            wx.setStorageSync(
                "piece",piece
            )
        }
    },

    goneAction(){

    },

    ShowAction(){

        var action = cc.fadeIn(1.0);
        var destroySelf=cc.callFunc(function () {
            setTimeout(() => {
                // this.onBicyleKilled(newbomb);
                if(cc.isValid(this.node)){
                    console.log('camber timeout loss')
                    this.node.destroy()
                }    
            }, 1000);    
        },this);
        var seqAction = cc.sequence(action, destroySelf);
        var ac=this.node.runAction(seqAction);
    },

    // update (dt) {},
});
