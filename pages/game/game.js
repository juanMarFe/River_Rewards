class Obstaculo {
  constructor(url, tipo, que) {
    this.posicionx = Math.floor(Math.random() * 240 + 1);
    this.posiciony = -10;
    this.dy = 1;
    this.que = que;
    this.url = url;
    this.tipo = tipo;
  }

  caer() {
    this.posiciony = this.posiciony + this.dy;
    if (this.posiciony > 900) {
      this.posiciony = -10;
      this.posicionx = Math.floor(Math.random() * 240 + 1);
      this.dy = Math.floor(Math.random() * 3) + 1;
      this.tipo = this.dado();
    }
  }

  mostrar(ctx) {
    if (this.tipo == 1) {
      //ctx.drawImage(this.url, this.posicionx, this.posiciony, 80, 100);
      ctx.drawImage('./assets/coin.png', this.posicionx, this.posiciony, 30, 30);
    } else {
      ctx.drawImage(this.url, this.posicionx, this.posiciony, 50, 29);
      /*ctx.beginPath();
      ctx.arc(this.posicionx, this.posiciony, 10, 0, 2 * Math.PI);
      ctx.setFillStyle('#808080');
      ctx.fill();*/
    }

  }
  dado() {
    var p = Math.random();
    if (p <= 0.6) {
      return 2;
    } else {
      return 1;
    }
  }

}
let coinsa = "";
let id="";
let lvla = 0;
let bestTimea = "";
let routea = "";
var location = "";
let horas = 0;

Page({
  onLoad(query) {
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    id = JSON.stringify(query.temp);
    coinsa = JSON.stringify(query.coins);
    var t = JSON.stringify(query.lvl);
    console.log(t);
    if (t == "\"Bronze\"") {
      lvla = 1;
    } else if (t == "\"Silver\"") {
      lvla = 2;
    } else if (t == "\"Gold\"") {
      lvla = 3;
    } else if (t == "\"Diamond\"") {
      lvla = 4;
    }
    bestTimea = JSON.stringify(query.bestTime);

    let tempsa=JSON.stringify(query.ImageE);

    routea = tempsa.slice(1, tempsa.length - 1);
  },

   getLocation(){
    my.getLocation({
      success(res) {
        my.hideLoading();
        console.log(res)
      },
      fail() {
        my.hideLoading();
        my.alert({ title: 'location failed' });
      },
    })
  },
  
  getServerTime(){
    my.getServerTime({
      success: (res) => {
        let days = res.time / (1000*3600*24);
        let residuo = days%1;
        horas = (residuo*24);

        if(horas<0){
          this.setData({
            hour: 24+horas,
          })
        }else{
          this.setData({
            hour: 0+horas,
          })
        }

        if(this.data.hour>5 && this.data.hour <18){
          this.setData({
            mode: '/pages/game/assets/river.png',
          })
        }else{
          this.setData({
            mode: '/pages/game/assets/night-river.png',
          })
        }
        console.log(horas)
      },
    });

    
  },

  data: {
    iden:"",
    username: "",
    email: "",
    password: "",
    coins: "",
    lvl: 0,
    bestTime: "",
    route: "",
    hour: 0,
    mode: 'light',
  },

  reset() {
    for (let index = 0; index < 10; index++) {
      this.rocks[index].posiciony = -10;
      this.rocks[index].posicionx = Math.floor(Math.random() * 240 + 1);
      this.rocks[index].dy = 1;
      this.rocks[index].tipo = Math.floor(Math.random() * 2) + 1;

    }
    this.contador = 0;
    this.ship.x = 150;
    this.ship.y = 450;
    this.ship.dx = 0;
    this.ship.dy = 0;
    this.end = 1;
    this.rock.dy = 0;
    my.vibrate({});
  },

  onReady() {
    this.rocks = [];
    this.rocks.push(new Obstaculo('./assets/rock-1.png', Math.floor(Math.random() * 2) + 1, 0));
    for (let index = 1; index < 10; index++) {
      var pr = Math.random();
      if (pr <= 0.6) {
        pr = 2;
      } else {
        pr = 1;
      }
      var p = Math.floor(Math.random() * 3) + 1;
      var temp = '';
      if (p == 1) {
        temp = './assets/rock-1.png';
      } else if (p == 2) {
        temp = './assets/rock-2.png';
      } else if (p == 3) {
        temp = './assets/rock-3.png';
      }

      this.rocks.push(new Obstaculo(temp, pr, Math.floor(Math.random() * (700 - 50)) + 50));
    }
    this.interval = setInterval(this.draw.bind(this), 17);
    this.bestTime = 0;
    //Ship Object
    this.ship = {
      x: 150,
      y: 450,
      dx: 0,
      dy: 0,
    };
    this.level = 3;
    this.contador = 0;
    this.end = true;
    this.rock = {
      dy: 0,
    };
  },
  check(roc, ctx) {
    if (this.rock.dy >= roc.que) {
      roc.mostrar(ctx);
      roc.caer();
    }
  },

  loseSq(ctx, x, y, w, h) {
    this.setData({
      lvl: lvla,
      bestTime: bestTimea,
      route: routea,
      iden:id,
      coins: this.contador
    })
    ctx.beginPath();
    ctx.moveTo(x, y - (h / 2));
    ctx.lineTo(x - (w / 2) + (w * 0.042), y - (h / 2));
    ctx.quadraticCurveTo(x - (w / 2), y - (h / 2), x - (w / 2), y - (h / 2) + (h * 0.042));
    ctx.lineTo(x - (w / 2), y + (h / 2) - (h * 0.053));
    ctx.quadraticCurveTo(x - (w / 2), y + (h / 2), x - (w / 2) + (w * 0.04), y + (h / 2));
    ctx.lineTo(x + (w / 2) - (w * 0.042), y + (h / 2));
    ctx.quadraticCurveTo(x + (w / 2), y + (h / 2), x + (w / 2), y + (h / 2) - (h * 0.042));
    ctx.lineTo(x + (w / 2), y - (h / 2) + (h * 0.042));
    ctx.quadraticCurveTo(x + (w / 2), y - (h / 2), x + (w / 2) - (w * 0.04), y - (h / 2));
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();

    ctx.font = '45px LakkiReddy';
    ctx.fillStyle = "#004F97";
    ctx.fillText('GAME OVER', x - (w * 0.38), y - (h * 0.3));
    ctx.font = '25px Iceland';
    ctx.fillText('Time in the river', x - (w * 0.45), y - (h * 0.2));
    ctx.fillText('Coins collected', x - (w * 0.35), y + (h * 0.1));
    ctx.fillText('x Status Coin Value', x - (w * 0.45), y + (h * 0.2));
    ctx.font = '25px Lato-B';
    ctx.fillText(this.timez(), x + (w * 0.2), y - (h * 0.19));
    ctx.font = '13px Lato';
    ctx.fillText('Best Time', x + (w * 0.1), y - (h * 0.13));
    ctx.fillText(this.bestTimez(), x + (w * 0.3), y - (h * 0.13));
    ctx.font = '25px Lato';
    ctx.fillText(this.contador, x + (w * 0.2), y + (h * 0.1));
    ctx.drawImage('./assets/coin.png', x + (w * 0.3), y + (h * 0.02), 25, 25);
    ctx.fillText(this.data.lvl, x + (w * 0.2), y + (h * 0.22));
    ctx.drawImage(routea, x + (w * 0.275), y + (h * 0.15), 40, 37);
    ctx.font = '30px Lato-Black';
    ctx.fillText('+' + this.data.lvl * this.contador, x + (w * 0.14), y + (h * 0.4));
    ctx.drawImage('./assets/coinz.png', x + (w * 0.3), y + (h * 0.3), 40, 37);

    ctx.beginPath();
    ctx.moveTo(x + (w * 0.1), y + (h * 0.27));
    ctx.lineTo(x + (w * 0.4), y + (h * 0.27));
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#004F97';
    ctx.stroke();

    this.button(ctx, x - (w * 0.25), y + (h * 0.7), w * 0.45, h * 0.2, './assets/pAgain.png');
    this.button(ctx, x + (w * 0.25), y + (h * 0.7), w * 0.45, h * 0.2, './assets/home.png');


  },

  button(ctx, x, y, w, h, img) {

    ctx.beginPath();
    ctx.moveTo(x, y - (h / 2));
    ctx.lineTo(x - (w / 2) + (w * 0.042), y - (h / 2));
    ctx.quadraticCurveTo(x - (w / 2), y - (h / 2), x - (w / 2), y - (h / 2) + (h * 0.042));
    ctx.lineTo(x - (w / 2), y + (h / 2) - (h * 0.053));
    ctx.quadraticCurveTo(x - (w / 2), y + (h / 2), x - (w / 2) + (w * 0.04), y + (h / 2));
    ctx.lineTo(x + (w / 2) - (w * 0.042), y + (h / 2));
    ctx.quadraticCurveTo(x + (w / 2), y + (h / 2), x + (w / 2), y + (h / 2) - (h * 0.042));
    ctx.lineTo(x + (w / 2), y - (h / 2) + (h * 0.042));
    ctx.quadraticCurveTo(x + (w / 2), y - (h / 2), x + (w / 2) - (w * 0.04), y - (h / 2));
    ctx.fillStyle = "#004F97";
    ctx.fill();
    ctx.drawImage(img, x - (w / 8), y - (w / 8), w / 4, w / 4);
    //console.log((x+w/2)+' '+(x-w/2)+' '+(y+h/2)+' '+(y-h/2))


  },

  coinU() {
    console.log(this.contador)
    my.request({
      url: 'https://n54l5q69c0.execute-api.us-east-2.amazonaws.com/Production/co',
      method: 'PATCH',
      data: {
        id: this.data.iden,
        coins: this.data.coins,


      },
      dataType: 'json',
      fail: function (res) {
        my.alert({ content: 'The server did not respond, errorCode: ' + res });
      },
      complete: function (res) {
        my.hideLoading();
        console.log(res)
      },
    });
  },
  bestTimez() {
    var millisec = this.bestTime;
    var min = Math.floor(millisec / 60000);
    var sec = ((millisec % 60000) / 1000).toFixed(0);
    return min + ':' + (sec < 10 ? '0' : '') + sec;
  },

  timez() {
    var millisec = this.rock.dy * 17;
    var min = Math.floor(millisec / 60000);
    var sec = ((millisec % 60000) / 1000).toFixed(0);
    if (this.bestTime < millisec) {
      this.bestTime = millisec;
    }
    return min + ':' + (sec < 10 ? '0' : '') + sec;
  },

  draw() {
    var ctx = my.createCanvasContext('canvas');
    this.getServerTime();
    ctx.clearRect(0, 0, 1000, 1000);
    if (this.end) {
      for (let index = 0; index < 10; index++) {
        this.check(this.rocks[index], ctx);
        if (this.rocks[index].tipo == 2) {
          var a = (this.ship.x + 27.5) - (this.rocks[index].posicionx + 25);
          var b = (this.ship.y + 35) - (this.rocks[index].posiciony + 14.5);
          var d = Math.sqrt((a * a) + (b * b));
          if (d < 40) {
            this.end = false;

          }
        } else {
          var a = (this.ship.x + 27.5) - (this.rocks[index].posicionx + 15);
          var b = (this.ship.y + 35) - (this.rocks[index].posiciony + 15);
          var d = Math.sqrt((a * a) + (b * b));
          if (d < 35) {
            this.rocks[index].posiciony = 890;
            this.contador += 1;
          }
        }
      }
      this.rock.dy += 1
      this.ship.x += this.ship.dx;
      this.ship.y += this.ship.dy;

      //SHIP SWING
      if (this.ship.y == 450) {
        this.ship.dy = 0.5;
      }
      if (this.ship.y == 475) {
        this.ship.dy = -0.5;
      }

      //LEFT STOP
      if (this.ship.x <= 0) {
        this.ship.dx = 0
      }

      //RIGHT STOP
      if (this.ship.x >= 265) {
        this.ship.dx = 0
      }
      ctx.font = '60px LakkiReddy';
      ctx.strokeStyle = "#000";
      ctx.fillStyle = "#FFF";
      ctx.lineWidth = 2;
      ctx.fillText(this.contador, 25, 60);
      ctx.strokeText(this.contador, 25, 60);
      ctx.drawImage('./assets/cut.png', this.ship.x, this.ship.y, 55, 70);
    } else {
      for (let index = 0; index < 10; index++) {
        this.rocks[index].dy = 0;
      }
      this.loseSq(ctx, 190, 283, 345, 283);


    }

    /*ctx.beginPath();
     ctx.setFillStyle('#808080');
     ctx.arc(this.ship.x+ 27.5, this.ship.y+ 35, 20, 0, 2 * Math.PI);
     ctx.fill();*/

    //ctx.fillRect(this.ship.x, this.ship.y, 80,100);
    //ctx.drawImage('./assets/rock.png', this.rock.x,  this.rock.y , 40, 50);

    ctx.draw();
  },

  tapScreen(e) {
    if (this.end) {
      if (e.type == "touchStart" && e.touches[0].x < 170) {
        if (this.ship.x > 25) {
          this.ship.dx = -2;
        }

      } else if (e.type == "touchStart" && e.touches[0].x > 190) {
        console.log(this.ship.x)
        if (this.ship.x < 330) {
          this.ship.dx = 2;
        }
      }
    } else {
      if (e.type == "touchStart" && e.touches[0].x < 187 && e.touches[0].x > 31 && e.touches[0].y < 510 && e.touches[0].y > 452) {
        this.coinU();
        this.reset();
        this.end = true;

      } else if (e.type == "touchStart" && e.touches[0].x < 359 && e.touches[0].x > 203 && e.touches[0].y < 510 && e.touches[0].y > 452) {
        this.coinU();
        my.navigateTo({
          url: '/pages/home/home'
        });
      }
    }
  }
});
