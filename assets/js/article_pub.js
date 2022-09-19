$(function () {
  const layer = layui.layer
  const form = layui.form
  // 获取文章分类
  init_art_cate()
  // 初始化富文本编辑器
  initEditor()
  function init_art_cate() {
    $.ajax({
      methods: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        // console.log(res)
        if (res.status !== 0) {
          return layer.msg(layer.message)
        }
        var htmlStr = template('art_cate',res)
        // console.log(htmlStr)
        $('[name=cate_id]').html(htmlStr)
        form.render()
      }
    })
  }

  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)

  // 为选择封面的按钮，绑定点击事件处理函数
  $('#btnChooseImage').on('click', function() {
    $('#coverFile').click()
  })

  // 监听 coverFile 的 change 事件，获取用户选择的文件列表
  $('#coverFile').on('change', function(e) {
    // 获取到文件的列表数组
    var files = e.target.files
    // 判断用户是否选择了文件
    if (files.length === 0) {
      return
    }
    // 根据文件，创建对应的 URL 地址
    var newImgURL = URL.createObjectURL(files[0])
    // 为裁剪区域重新设置图片
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newImgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })

  // 定义文章状态
  var art_state = '已发布'

  // 如果是存为草稿，则将状态转为草稿
  $('#draft_btn').on('click', function () {
    art_state = '草稿'
  })

  // 表单监听提交事件
  $('#pub_form').on('submit', function (e) {
    e.preventDefault()
    // console.log(6666)
    // 创建formdata
    var fd = new FormData($(this)[0])
    // console.log(fd)
    
    //将状态追加到fd
    fd.append('state',art_state)
    

    // 将封面裁剪过后的图片，输出为一个文件对象
    $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function(blob) {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        // 5. 将文件对象，存储到 fd 中
        // console.log(blob)
        fd.append('cover_img', blob)
        // 发起请求
        art_publish(fd)
      })

  })
      function art_publish (fd) {
        $.ajax({
          method: 'POST',
          url: '/my/article/add',
          data: fd,  //请求体要求formdata格式
          contentType: false,
          processData: false,
          success: function (res) {
            // console.log(res)
            if (res.status !== 0) {
              return layer.msg(res.message)
            }
            layer.msg(res.message)
            // 发布文章成功后，跳转到文章列表页面
            location.href = '/article/art_list.html'
          }
        })
      }
  
})