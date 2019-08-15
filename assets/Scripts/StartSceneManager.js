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
        StartButton:
            {
                default:null,
                type:cc.Button,
            },
        BgmButton:{
            default: null,
            type: cc.Button
        },
        presentButton:{
            default:null,
            type:cc.Button
        },
        pieceImg1:{
            default:null,
            type:cc.Button
        },
        pieceImg2:{
            default:null,
            type:cc.Button
        },
        rankingView: cc.Node,

        unlock1:cc.Node,
        unlock2:cc.Node,
        unlock3:cc.Node,

        process1: cc.Label,
        process2: cc.Label,

        knowmore1:cc.Button,
        knowmore2:cc.Button,
        knowmore3:cc.Button,

        intro_board:cc.Node,
        intro_gray:cc.Button,
        intro_img:cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        // cc.loader.downloader.loadSubpackage('sub_img', function (err) {
        //     if (err) {
        //         return console.error(err);
        //     }
        //     console.log('load subpackage successfully.');
        // });
        cc.director.resume()

        this.audioPlayer=cc.find('BgAudio').getComponent('AudioManager');
        this.BgmButton.node.on('click',this.onAudioClick,this);
        this.presentButton.node.on('click',this.showPresent,this);
        this.StartButton.node.on('click',this.onStartButtonClick,this);
        this.giftPanel=cc.find('Canvas/BgPanel')
        // window.BG="Textures/gameScene/default";
        if(CC_WECHATGAME){
            this.piece=wx.getStorageSync('piece')
        }else{
            this.piece=11
        }
        // if(CC_WECHATGAME){
        //     wx.setStorageSync(
        //         "piece",'0'
        //     )
        // }
        this.changePresent()

        // this.knowmore1.interactable =false
        // this.knowmore2.interactable =false

        // this.knowmore3.interactable =false

    },

    start () {
        // this.StartButton=this.node.getComponent(cc.Button);
        // this.audioSprite=this.BgmButton.node.getComponent(cc.Sprite);

        // 预加载
        cc.director.preloadScene("GameScene", function () {
            cc.log("game scene preloaded");
        });

        if(CC_WECHATGAME){
            let winBG=wx.getStorageSync('win_BG')
            if(!winBG){
                wx.setStorageSync(
                    "win_BG","Textures/gameScene/default"
                )
                window.BG="Textures/gameScene/default"
            }else{
                window.BG=winBG
            }
        }else{
            window.BG="Textures/gameScene/default"
        }
        
        // this.initAction()

    },
    
    onStartButtonClick(event, customEventData)
    {
        cc.director.pause();
        console.log("Game_Start");
        cc.director.loadScene('GameScene');
    },

    showPresent(){
        // console.log(this.giftPanel)

        // let process_store=wx.getStorageSync('piece')
        console.log('进度',this.piece)
        if(parseInt(this.piece)>=10){
            this.process1.string='已解锁'
        }else{
            this.process1.string=(this.piece||0)+'/10'
        }
        if(parseInt(this.piece)>=30){
            this.process2.string='已解锁'
        }else{
            this.process2.string=(this.piece||0)+'/30'
        }

        this.giftPanel.active=!this.giftPanel.active
    },

    changeBg(event, customEventData){
        console.log('换图片',customEventData)
        let bgMap=[
            'Textures/gameScene/default',
            'Textures/gameScene/desert',
            'Textures/gameScene/snowMount',
        ]
        
        if(customEventData==0){
            window.BG=bgMap[customEventData];
            this.unlock2.active=false;
            this.unlock3.active=false;
            this.unlock1.active=true;
        }else if(customEventData==1&&this.piece>=10){
            window.BG=bgMap[customEventData];
            this.unlock1.active=false;
            this.unlock3.active=false;
            this.unlock2.active=true;
        }else if(customEventData==2&&this.piece>=30){
            window.BG=bgMap[customEventData];
            this.unlock1.active=false;
            this.unlock2.active=false;
            this.unlock3.active=true;
        }

        if(CC_WECHATGAME){
            wx.setStorageSync(
                "win_BG",window.BG
            )
        }else{
            this.winBG=11
        }

        console.log(window.BG)
    },


    onAudioClick(){
        // console.log(this.audioPlayer.playState)
        let BGM_Sprite=this.BgmButton.node.getComponent(cc.Sprite);
        // console.log(BGM_Sprite.spriteFrame );
        if (this.audioPlayer.playState===1){
            this.audioPlayer.stopBgAudio();

            this.changeTex(BGM_Sprite,true);

        } else {
            console.log('play')
            this.audioPlayer.playBGM();
            this.changeTex(BGM_Sprite,false);

        }
    },


    updateProcess(){

    },

    //初始时展示的小图
    changePresent(){
        if(CC_WECHATGAME){
            this.winbg=wx.getStorageSync('win_BG')
        }else{
            this.winbg="Textures/gameScene/default"
        }

        let pieceImg1=this.pieceImg1.node.getComponent(cc.Sprite);
        let pieceImg2=this.pieceImg2.node.getComponent(cc.Sprite);

        if((this.winbg).indexOf('default')>=0){
            this.unlock2.active=false;
            this.unlock3.active=false;
            this.unlock1.active=true;
        }else if((this.winbg).indexOf('desert')>=0){
            this.unlock1.active=false;
            this.unlock3.active=false;
            this.unlock2.active=true;
        }else if((this.winbg).indexOf('snow')>=0){
            this.unlock1.active=false;
            this.unlock2.active=false;
            this.unlock3.active=true;
        }

        if(this.piece>=10){
            this.changeP(pieceImg1,1,true)
        }else{
            this.changeP(pieceImg1,1,false)
        }

        if(this.piece>=30){
            this.changeP(pieceImg2,2,true)
        }else{
            this.changeP(pieceImg2,2,false)
        }



    },
    changeP(sprite,i,flag){
        let presentMap=[
            'Textures/begin/default',
            'Textures/begin/desert',
            'Textures/begin/snow',
        ]
        let presentMap_gray=[
            'Textures/begin/default',
            'Textures/begin/desert_gray',
            'Textures/begin/snow_gray',
        ]
        if(flag){
            cc.loader.loadRes(presentMap[i], cc.SpriteFrame, function (err, spriteFrame) {
                // console.log(spriteFrame);
                sprite.spriteFrame = spriteFrame;
            }.bind(this));
        }else{
            cc.loader.loadRes(presentMap_gray[i], cc.SpriteFrame, function (err, spriteFrame) {
                // console.log(spriteFrame);
                sprite.spriteFrame = spriteFrame;
            }.bind(this));
        }

    },

    changeTex(sprite,flag){
        if (flag){
            cc.loader.loadRes('Textures/begin/musicClose', cc.SpriteFrame, function (err, spriteFrame) {
                // console.log(spriteFrame);
                sprite.spriteFrame = spriteFrame;
            }.bind(this));
        } else {
            cc.loader.loadRes('Textures/begin/musicOn', cc.SpriteFrame, function (err, spriteFrame) {
                // console.log(spriteFrame);
                sprite.spriteFrame = spriteFrame;
            }.bind(this));
        }

    },


    openIntro(event, customEventData){
        let intro_img=this.intro_img.getComponent(cc.Sprite);
        let intro_map=['Textures/begin/1','Textures/begin/2','Textures/begin/3']

        cc.loader.loadRes(intro_map[customEventData], cc.SpriteFrame, function (err, spriteFrame) {
            // console.log(spriteFrame);
            intro_img.spriteFrame = spriteFrame;
        }.bind(this));

        this.intro_board.active=true

    },

    closeIntro(){
        let intro_img=this.intro_img.getComponent(cc.Sprite);

        // cc.loader.loadRes('', cc.SpriteFrame, function (err, spriteFrame) {
        //     // console.log(spriteFrame);
        //     intro_img.spriteFrame = spriteFrame;
        // }.bind(this));
        intro_img.spriteFrame=null

        this.intro_board.active=false
    },

    initAction() {
        this._isShow = false;
        this.rankingView.y = 1300;
        this._showAction = cc.moveTo(0.5, this.rankingView.x, 100);
        this._hideAction = cc.moveTo(0.5, this.rankingView.x, 1300);

    },
    closerank(){
        // if (this._isShow) {
        //     this.rankingView.runAction(this._hideAction);
        //     this._isShow = !this._isShow;
        // }   
        this.rankingView.active=false 
    },
    openrank() {
        // if (!this._isShow) {
        //     this.rankingView.runAction(this._showAction);
        //     this._isShow = !this._isShow;
        // }
        
        this.rankingView.active=!this.rankingView.active
        if(this.rankingView.active){
            if (CC_WECHATGAME) {
                // 发消息给子域
                wx.getOpenDataContext().postMessage({
                    messageType: 1,
                    // score: parseInt(window.GM.distance)
                });
            } else {
                cc.log("请求拉取列表");
            }
        }


    },


    // update (dt) {},
});
