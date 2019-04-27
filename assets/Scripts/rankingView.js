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
        showRank: cc.Node,
        rankingView: cc.Node,
        score: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        // if(!window.GM.distance){
        // var GM={}
        if(window.GM){
            this.score.string = parseInt(window.GM.distance);

        }
        // }
        this.initAction();
        // console.log('aa'+window.GM.distance)

        if (CC_WECHATGAME) {
            // 发消息给子域
            wx.getOpenDataContext().postMessage({
                messageType: 2,
                score: parseInt(window.GM.distance)
            });
        } else {
            cc.log("发送分数开放数据域");
        }

    },
    initAction() {
        this._isShow = false;
        this.rankingView.y = 1300;
        this._showAction = cc.moveTo(0.5, this.rankingView.x, 100);
        this._hideAction = cc.moveTo(0.5, this.rankingView.x, 1300);

    },

    closeBtuuonFun(){
        if (this._isShow) {
            this.rankingView.runAction(this._hideAction);
            this._isShow = !this._isShow;
        }    
    },
    rankButtonFun() {
        if (!this._isShow) {
            this.rankingView.runAction(this._showAction);
            this._isShow = !this._isShow;
        }

        if (CC_WECHATGAME) {
            // 发消息给子域
            wx.getOpenDataContext().postMessage({
                messageType: 1,
                // score: parseInt(window.GM.distance)
            });
        } else {
            cc.log("请求拉取列表");
        }
    },

    advertiseLoad(){
        //do something
    }

    // update (dt) {},
});
