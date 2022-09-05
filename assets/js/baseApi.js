$.ajaxPrefilter(function (options) {
  // 统一配置默认路径
  options.url = 'http://www.liulongbin.top:3007' + options.url
  // console.log(options.url)
  // 给my路径的添加统一的请求头
  if (options.url.indexOf('/my') !== -1) {
    options.headers = {Authorization: localStorage.getItem('token') || ''}
  }
  // 统一配置Ajax complete
  options.complete = (res) => {
    // console.log(res)
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      // 清空token
      localStorage.removeItem('token')
      // 强制跳回登录页
      location.href = './login.html'
    }
  }
})