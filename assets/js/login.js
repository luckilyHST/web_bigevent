$(function(){
    //给 去注册账号 添加事件
    $('#link-reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();
    })
    //给 去登录 添加事件
    $('#link-login').on('click',function(){
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //自定义校验规则
    //1.先获取到layui中的form
    var form = layui.form
    var layer = layui.layer
    //2.通过form.verify()函数自定义校验规则
    form.verify({
        //定义了一个校验规则
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        //定义一个确认密码的校验规则
        repad: function(value){
            //1.已经拿到了repassword 的值
            //2.还需拿到password的值，在进行判断如果不一致的话，就直接return'两次输入的密码不一致'
            var str = $('.layui-form-item [name=password]').val();
            if(str !== value){
                return '两次输入的密码不一致！'
            }
        }   
    })

// 监听注册表单的提交事件
  $('#form_reg').on('submit', function(e) {
    // 1. 阻止默认的提交行为
    e.preventDefault()
    // 2. 发起Ajax的POST请求
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser', data, function(res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功请登录')
      //模拟点击
      $('#link-login').click();
    })
  })

  //监听登录表单的提交事件
  $('#form_login').submit(function(e){
      e.preventDefault();
      $.ajax({
          method: 'POST',
          url: '/api/login',
          //快速获取表单中的数据
          data: $(this).serialize(),
          success: function(res){
              if(res.status !== 0){
                  return layer.msg(res.message)
              }
              layer.msg('登录成功')
              localStorage.setItem('token',res.token)
              location.href = 'http://127.0.0.1:5500/%E5%89%8D%E7%AB%AF/%E5%9F%BA%E7%A1%80/%E9%98%B6%E6%AE%B5%E5%9B%9B%20%E5%89%8D%E5%90%8E%E7%AB%AF%E4%BA%A4%E4%BA%92/D%E7%AC%AC%E5%9B%9B%E7%AB%A0%20%E5%A4%A7%E4%BA%8B%E4%BB%B6%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%E9%A1%B9%E7%9B%AE%E3%80%90v6.5%E3%80%91/index.html'
          }
      })
  })

})