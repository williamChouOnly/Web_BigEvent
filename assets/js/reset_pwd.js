$(function () {
  const form = layui.form
  const layer = layui.layer

  form.verify({
    pwd:[
      /^[\S]{6,12}$/,
    '密码必须6到12位，且不能出现空格'
    ],
    samePw: function (val) {
      if (val === $('.layui-form [name=oldPwd]').val()) {
        return '新密码不能跟旧密码一致'
      }
    },
    comfirm: function(val) {
      if (val !== $('.layui-form [name=newPwd]').val()){
        return '输入的密码不一致,请重新输入'
      } 
    }
  })
  // 修改密码功能
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    console.log(e)

    // let data = {
    //   oldPwd: $('.layui-form [name=oldpassword]').val(),
    //   newPwd: $('.layui-form [name=newpassword]').val()
    // }
    //修改密码操作
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        console.log(res)
        if (res.status !== 0) {
          return layer.msg('修改密码失败')
        }
        layer.msg('修改密码成功')
      }
    })

  })
})