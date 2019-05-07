cc.Class({
    extends: cc.Component,
    properties: {
        backSprite: cc.Node,
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

        let img_url="resources/";
        // let img=this.rankLabel.getChildByName('img');
        // let Sprite_rank=img.getComponent(cc.Sprite);
        switch (rank) {
            case 0:
                this.cupImg.spriteFrame=new cc.SpriteFrame(cc.url.raw(img_url+'1.png'));
                console.log('1输出');
                // this.rankLabel.active=true
                // img.
                break;
            case 1:
                this.cupImg.spriteFrame=new cc.SpriteFrame(cc.url.raw(img_url+'2.png'));
                break;
            case 2:
                this.cupImg.spriteFrame=new cc.SpriteFrame(cc.url.raw(img_url+'3.png'));
                break;    
            default:
                // img.active=false;
                this.cupImg.spriteFrame=null;
                break;
        }

        if (rank % 2 == 0) {
            console.log(this.backSprite.color)
            this.backSprite.color = new cc.Color(142, 182, 215, 255);  
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
