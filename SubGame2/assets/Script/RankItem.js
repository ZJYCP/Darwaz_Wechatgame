cc.Class({
    extends: cc.Component,
    properties: {
        backSprite: cc.Sprite,
        rankLabel: cc.Label,
        avatarImgSprite: cc.Sprite,
        nickLabel: cc.Label,
        topScoreLabel: cc.Label,
        cupImg:cc.Sprite,
    },
    start() {

    },

    init: function (rank, data) {
        let avatarUrl = data.avatarUrl;
        // let nick = data.nickname.length <= 10 ? data.nickname : data.nickname.substr(0, 10) + "...";
        let nick = data.nickname;
        let grade = data.KVDataList.length != 0 ? data.KVDataList[0].value : 0;

        //第一、二、三名有奖杯
        if(rank<3){
            let rank_cal=rank+1;
            this.cupImg.spriteFrame=new cc.SpriteFrame(cc.url.raw('resources/'+rank_cal+'.png'));
        }

        //背景交替
        //若使用单色sprite，更改color的方式在开发者工具上有效，真机运行都是白色的
        if (rank % 2 != 0) {
            this.backSprite.spriteFrame=null;
            // this.backSprite.color = new cc.Color(142, 182, 215, 255);  
            // console.log('color change');#89C5E5
        }


        if (rank == 0) {
            this.rankLabel.node.color = new cc.Color(255, 0, 0, 255);
            this.rankLabel.node.setScale(1.9);
        } else if (rank == 1) {
            this.rankLabel.node.color = new cc.Color(255, 255, 0, 255);
            this.rankLabel.node.setScale(1.6);
        } else if (rank == 2) {
            this.rankLabel.node.color = new cc.Color(100, 255, 0, 255);
            this.rankLabel.node.setScale(1.3);
        }
        if(rank>2){
            this.rankLabel.string = (rank + 1).toString();
        }
        this.createImage(avatarUrl);
        this.nickLabel.string = nick;
        this.topScoreLabel.string = grade.toString();
    },
    createImage(avatarUrl) {
        if (CC_WECHATGAME) {
            try {
                let image = wx.createImage();
                image.onload = () => {
                    try {
                        let texture = new cc.Texture2D();
                        texture.initWithElement(image);
                        texture.handleLoadedTexture();
                        this.avatarImgSprite.spriteFrame = new cc.SpriteFrame(texture);
                    } catch (e) {
                        cc.log(e);
                        this.avatarImgSprite.node.active = false;
                    }
                };
                image.src = avatarUrl;
            }catch (e) {
                cc.log(e);
                this.avatarImgSprite.node.active = false;
            }
        } else {
            cc.loader.load({
                url: avatarUrl, type: 'jpg'
            }, (err, texture) => {
                this.avatarImgSprite.spriteFrame = new cc.SpriteFrame(texture);
            });
        }
    }

});
