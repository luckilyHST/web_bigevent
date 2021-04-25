//每次调用 $.post()  $.get()  $.ajax()的时候
//会先调用 ajaxPrefilter 这个函数
//在这个函数中，可以拿到提交的 $.ajax()配置对象
$.ajaxPrefilter(function(options){
    //统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    console.log(options.url)
})