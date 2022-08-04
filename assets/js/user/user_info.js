const form = layui.form

form.verify({
  nickname: (val) => {
    if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
  },
  email: [/@/, '邮箱格式输入错误'],
});

const initUserInfo = () => {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    success: (res) => {
      if (res.status !== 0) return layer.msg("获取用户信息失败！");
      form.val('formUserInfo', res.data)
    },
  });
}

initUserInfo()

$('#resetBtn').click(function (e) {
  e.preventDefault()
  initUserInfo()
})

$('.layui-form').submit(function (e) {
  e.preventDefault()
  $({
    type: "POST",
    url: "/my/userinfo",
    data: form.val('formUserInfo'),
    success: res => {
      const { status, message } = res
      if (status !== 0) return layer.msg("message");
      // 调用父页面渲染函数
      window.parent.getUserInfo();
    },
  })
})