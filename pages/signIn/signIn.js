
Page({
  onLoad(query) {
    // Page load
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },

  data: {
    username: "",
    password: "",
  },

  onUsernameChange(e) {
    this.setData({
      username: e.detail.value,
    })
  },

  onPasswordChange(e) {
    this.setData({
      password: e.detail.value,
    })
  },
  
  signIn() {
    console.log(this.data.username, this.data.password)

    my.request({
    url: 'https://n54l5q69c0.execute-api.us-east-2.amazonaws.com/Production/',
    method: 'POST',
    data: {
      type:'lI',
      username: this.data.username, 
      password: this.data.password,
    },
    dataType: 'json',
    fail: function(res) {
      my.alert({content: 'The server did not respond, errorCode: '+res});
    },
    complete: function(res) {
      my.hideLoading();
      if(res.data.headers.response==false){
         my.alert({content:'Wrong username or password'});
      }else{
        my.navigateTo({
        url: '/pages/home/home?temp='+res.data.headers.response
      });
      }
      
      
    }
  });


  },

  signUpPage() {
    my.navigateTo({
      url: '/pages/signUp/signUp'
    });
  },
  
  onShareAppMessage() {
    // Back to custom sharing information
    return {
      title: 'My App,',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
});
