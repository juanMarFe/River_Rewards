Page({
  onLoad(query) {
    // Page load
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },

  data: {
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  },

  onFullNameChange(e) {
    this.setData({
      fullName: e.detail.value,
    })
  },

  onUsernameChange(e) {
    this.setData({
      username: e.detail.value,
    })
  },

  onEmailChange(e) {
    this.setData({
      email: e.detail.value,
    })
  },

  onPasswordChange(e) {
    this.setData({
      password: e.detail.value,
    })
  },

  onConfirmPasswordChange(e) {
    this.setData({
      confirmPassword: e.detail.value,
    })
  },

  signInPage() {
    my.navigateTo({
      url: '/pages/signIn/signIn'
    });
  },

  signUp() {
    if (this.data.password==this.data.confirmPassword) {
      if(this.data.email.includes("@")&&this.data.email.includes(".")){
      my.request({
        url: 'https://n54l5q69c0.execute-api.us-east-2.amazonaws.com/Production/',
        method: 'POST',
        data: {
          type: 'sU',
          fullName: this.data.fullName,
          username: this.data.username,
          email: this.data.email,
          password: this.data.password,
        },
        dataType: 'json',
        fail: function (res) {
          my.alert({ content: 'Sorry! We were not able to create the user' });
        },
        complete: function (res) {
          my.hideLoading();
          my.alert({ content: res.data.body.message });
          my.navigateTo({
            url: '/pages/signIn/signIn'
          });
        }
      });
    }else{
      my.alert({ content: 'Please enter a valid email' });
    }
    } else {
      my.alert({ content: 'The passwords don\'t match' });
    }
  },

  onShareAppMessage() {
    // Back to custom sharing information
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/signIn/signIn',
    };
  },
});