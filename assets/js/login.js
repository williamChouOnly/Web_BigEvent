$(function () {
  $('#toRegis').on('click', function () {
    $(".login-conetent").hide()
    $(".reg-conetent").show()
  })
  $('#toLogin').on('click', function () {
    $(".reg-conetent").hide()
    $(".login-conetent").show()
  })
  // 表单验证
  var form = layui.form
  var layer = layui.layer
  form.verify({
    pwd:[
      /^[\S]{6,12}$/,
    '密码必须6到12位，且不能出现空格'
    ],
    repwd:function(value) {
      var pwd = $('.reg-conetent [name=password]').val()
      // console.log(value)
      if (value !== pwd) {
        return '密码不一致，请重新输入！'
      }
    }
  })
  // 监听注册表单提交事件
  $('#regForm').on('submit', function (e) {
    // console.log(e)
    const regData = {
      username: $('#regForm [name=username]').val(),
      password: $('#regForm [name=password]').val()
    }  
    // 阻止默认的提交行为   
    e.preventDefault()
    // 发起post请求
    $.post('/api/reguser',regData,
    function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg(res.message)
      // 模拟人点击行为
      $('#toLogin').click()
    })
  })
  // 登录表单事件
  $('.logbtn').click (function (e) {
    const loginData = {
      username: $('#loginForm [name=username]').val(),
      password: $('#loginForm [name=password]').val()
    } 
    // 登录请求
    $.post('/api/login',loginData,
      function (res) {
        console.log(res.token)
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        localStorage.setItem('token',res.token)
        layer.msg(res.message)
        //跳转到首页
        location.href = './index.html'
      }
    )
  })
})