let usernamea = "";
let emaila = "";
let passworda = "";
let coinsa = "";
let lvla = "";
let bestTimea = "";
let percenta=0;
let top=0;
let ida="";


Page({

  onLoad(query) {
    // Page load
    console.info(`Page onLoad with query: ${JSON.stringify(query.temp)}`);
    let temp = JSON.stringify(query.temp);
    let temp1 = temp.slice(1, temp.length - 1);
    ida=temp1;
    console.log(temp1);
    my.request({
      url: 'https://n54l5q69c0.execute-api.us-east-2.amazonaws.com/Production/co',
      method: 'POST',
      data: {
        id: temp1,
      },
      dataType: 'json',
      fail: function (res) {
        my.alert({ content: 'The server did not respond, errorCode: ' + res });
      },
      complete: function (res) {
        console.log(res.data.username);
        my.hideLoading();
        usernamea=res.data.username;
        emaila=res.data.email;
        passworda=res.data.password;
        coinsa=res.data.coins;
        lvla=res.data.lvl;
        bestTimea=res.data.bestTime;
      },
    });
  },


  data: {
    id:"",
    username: "",
    email: "",
    password: "",
    coins: "0",
    lvl: "",
    bestTime: "",
    percent:"",
    away:0,
    barCol:"",
    imgE:"",
    nextL:""

  },


  onShow() {
    
  },

  onReady() {
  },

  onHide() {

  },
  onUnload() {

  },
  onTitleClick() {

  },
  onPullDownRefresh() {

  },
  onReachBottom() {

  },

  newPageRewards() {
    my.navigateTo({
      url: '/pages/rewards/rewards'
    });
  },

  atualizarD() {
    let r="";
    let t =Number(lvla);
    let percent=0;
    let col="";
    let img="";
    let nL="";
    if(t>=0&&t<3){
      top=3;
      percent=(t*100)/top;
      r="Bronze";
      col="#DF9900";
      img='/pages/home/assets/starsBronce.png';
      nL="Silver";
    }else if(t>=3&&t<8){
      top=8;
      percent=(t*100)/top;
      r="Silver";
      col="#A4A4A4";
      img='/pages/home/assets/silver-star.png';
      nL="Gold";
    }else if(t>=8&&t<15){
      top=15;
      percent=(t*100)/top;
      r="Gold";
      col="#EDBB4F";
      img='/pages/home/assets/starsGold.png';
      nL="Diamond";

    }else if(t>=15){
      top=20;
      percent=(t*100)/top;
      r="Diamond";
      col="#32C1FF";
      img='/pages/home/assets/starsBlue.png';
      nL="Final";

    }
    this.setData({
      id:ida,
      username: usernamea,
      email: emaila,
      password: passworda,
      coins: coinsa,
      lvl: r,
      bestTime: bestTimea,
      percent:percent,
      away: top-t,
      barCol: col,
      imgE:img,
      nextL:"\'"+nL+"\'"
    })
  },
  
  newPageGame() {

    my.navigateTo({
      url: '/pages/game/game?' +
        'coins=' + this.data.coins +
        '&lvl=' + this.data.lvl +
        '&bestTime=' + this.data.bestTime +
        '&ImageE='+ this.data.imgE +
        '&temp=' + this.data.id
    });
  },

  onShareAppMessage() {
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/home/home',
    };
  },

  

});