$(function () {
  const layer = layui.layer
  const form = layui.form

  var q = {
    pagenum: 1,
    pagesize: 1,
    cate_id: '',
    state: ''
  }

  // 获取文章列表
  init_artlist()

  // 获取文章分类
  init_artcate()

  

  // 格式化时间
  template.defaults.imports.timeFormat = function (date) {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = addZero(d.getMonth() + 1)
    const day = addZero(d.getDay())
    const hour = addZero(d.getHours())
    const min = addZero(d.getMinutes())
    const second = addZero(d.getSeconds())
    return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + second
  }

  // 时间不足10补0操作
  function addZero (val) {
    return val > 9 ?  val : '0' + val
  }

  // 获取文章列表
  function init_artlist () {
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: q,
      success: function(res){
        console.log(res)
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        // console.log(111)
        var htmlStr = template("tpl-table",res)
        $('tbody').html(htmlStr)
        // 分页筛选
        renderPage(res.total)
      }
    })
  }
  
  // 获取文章分类
  function init_artcate () {
    $.ajax({
      methods: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        // console.log(res)
        if (res.status !== 0) {
          layer.msg(res.message)
        }
        var htmlStr = template('tpl-cate',res)
        $('[name=cate_id]').html(htmlStr)
        form.render()
      }
    })
  }

  // 文章筛选按钮功能
  $('#form-select').on('submit',function (e) {
    e.preventDefault()
    // console.log(222)
    var cate_id = $('[name=cate_id]').val()
    var state = $('[name=state]').val()
    q.cate_id = cate_id
    q.state = state
    init_artlist()
  })

  // 渲染分页
  function renderPage (total) {
    layui.laypage.render({
      elem: 'page-box', // 注意，这里的 test1 是 ID，不用加 # 号
      count: total, // 数据总数量
      limit:  q.pagesize, // 每页的数量
      curr: q.pagenum, // 当前的页码
      layout: ['prev','limit','page','next','skip'],
      limits: [1,2,5,10], // 每页条数的选择项
      jump: function (obj, first) {
        // console.log(obj)
        q.pagenum = obj.curr
        q.pagesize = obj.limit
        // 当点击页码时first为undefined,为了阻止死循环
        if (!first) {
          init_artlist()
        }
      }
    })   
  }

  // 删除文章
  $('tbody').on('click','#dele-btn',function () {
    // console.log(1111)
    // 当前页码的数据个数
    var len = $('#dele-btn').length
    console.log(len)
    // 当前文章的id
    var id = $(this).attr('data-id')
    layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
      //发起删除请求
      $.ajax({
        methods: 'GET',
        url: '/my/article/delete/' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg(res.message)
          }
          layer.msg(res.message)
          // 如果当前页码没数据了，若不是第一页则页码-1
          if (len === 1) {
            q.pagenum = q.pagenum === 1? 1 : q.pagenum - 1
          }
          init_artlist()
        }
      })
      layer.close(index);
    })
  })
})