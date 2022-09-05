$(function () {
  const layer = layui.layer
  getUserInfo ()

  //退出按钮操作
  $('#exitBtn').on('click', (e) => {
    e.preventDefault()
    // console.log(8888)
    layer.confirm('确定退出登录？', {icon: 3, title:'提示'}, function(index){
      // 移除token
      localStorage.removeItem('token')
      // 跳转登录页
      location.href = './login.html'
      // 关闭窗口
      layer.close(index);
    });
  })
})

function getUserInfo () {
  // console.log(localStorage.getItem('token'))
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers: {Authorization: localStorage.getItem('token') || ''},
    success: function (res) {
      // console.log(res)
      if (res.status !== 0) {
        return layui.layer.msg(res.message)
      }
      //更新头像信息
      updateUserAvar(res.data)
    },
    // 无论成功或者失败都会调用complete函数
    // complete: (res) => {
    //   // console.log(res)
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //     // 清空token
    //     localStorage.removeItem('token')
    //     // 强制跳回登录页
    //     location.href = './login.html'
    //   }
    // }
  })
}

function updateUserAvar (data) {
  // 更新用户名
  var name = data.nickname || data.username
  $('#welcome').html('欢迎' + name)
  // 更新头像
  if (data.user_pic !== null) {
    $('.layui-nav-img').attr('src',data.user_pic).show()
    $('.text-avatar').hide()
  }else {
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
    
  }
}
