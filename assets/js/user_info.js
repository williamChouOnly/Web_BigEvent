$(function (){
  const form = layui.form
  const layer = layui.layer
  var userId = 0
  // 初始化用户信息
  initUserInfo ()
  function initUserInfo () {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: (res) => {
        console.log(res)
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        userId = res.data.id
        form.val('form_filter',res.data)
      }
    })
  }

  //  重置按钮
  $('#reset').on('click', function (e) {
    // console.log(e)
    initUserInfo()
  })
  // 表单验证
  form.verify({
    lgLength: function (val) {
      if (val.length < 6) {
        return '登录名称长度需要1-6个字符'
      }
    },
    usLength: function (val) {
      if (val.length < 6) {
        return '用户昵称长度需要1-6个字符'
      }
    }
  })

  form.on('submit(action)', function (res) {
    // console.log(res)
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: {
        id: userId,
        nickname: $('#data_form[name=nickname]').val(),
        email: $('#data_form[name=email]').val()
      },
      success: function(res) {
        console.log(data)
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        // console.log(window)
        window.parent.getUserInfo()
      }
    })
  })
})

