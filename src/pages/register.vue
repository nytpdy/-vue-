<template>
  <section>
    <!-- 背景颜色 -->
    <div class="color"></div>
    <div class="color"></div>
    <div class="color"></div>
    <div class="box">
      <!-- 背景圆 -->
      <div class="circle" style="--x:0"></div>
      <div class="circle" style="--x:1"></div>
      <div class="circle" style="--x:2"></div>
      <div class="circle" style="--x:3"></div>
      <div class="circle" style="--x:4"></div>
      <!-- 登录框 -->
      <div class="container">
        <div class="form">
          <h2>用户注册</h2>
          <Form ref="registerForm" :model="registerForm" name="MyForm" :rules="rules">
            <FormItem prop="username" class="inputBox">
              <input v-model="registerForm.username" type="text" placeholder="账号">

            </FormItem>
            <FormItem prop="password" class="inputBox">
              <input v-model="registerForm.password" type="password" placeholder="密码">

            </FormItem>
            <FormItem prop="repassword" class="inputBox">
              <input v-model="registerForm.repassword" type="password" placeholder="确认密码">

            </FormItem>
            <FormItem prop="email" class="inputBox">
              <input v-model="registerForm.email" type="email" placeholder="请输入邮箱地址">

            </FormItem>
            <FormItem prop="emailword" class="inputBox2">
              <input v-model="registerForm.emailword" type="text" placeholder="验证码">
              <input @click="Email" type="submit" :value="time">
            </FormItem>
            <FormItem class="inputBox">
              <input @click="handleRegister" type="submit" value="注册">

            </FormItem>
            <p class="forget">已有账户?<a @click="login">
                前往登录
              </a></p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  userRegister
} from "../api/user.js"
import indexApi from "../api/index.js"
export default {
  data() {
    return {
      time: "获取验证码",
      emils: 0,
      registerForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{
          required: true,
          message: '请输入用户名...',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码...',
          trigger: 'blur'
        },
        {
          type: 'string',
          min: 6,
          message: '密码不能小于6位',
          trigger: 'blur'
        }
        ]
      }
    }
  },
  methods: {
    handleRegister() {
      this.$refs["registerForm"].validate(valid => {
        if (valid) {
          console.log(this.registerForm.emailword);
          userRegister(this.registerForm.emailword, this.registerForm.username, this.registerForm.password, this.registerForm.email).then(response => {
            if (this.registerForm.password == this.registerForm.repassword) {
              console.log(response.data);
              console.log(response.data['code']);
              if (response.data.code == 200) {
                this.$router.push("/")
                this.$Message.success("注册成功")
              } else if (response.data.code == 400) {
                this.$Message.success("验证码错误")
              }

            } else {
              this.$Message.error("两次密码不一致")
            }
          })
        } else {
          this.$Message.error("未输入密码与邮箱")
        }
      })
    },

    login() {
      this.$router.push("/")
    },

    Email() {
      if (this.registerForm.password == "" || this.registerForm.username == "" || this.registerForm.email == "") {
        this.$Message.success("请填完信息");
        return;
      }
      indexApi.getEmail(this.registerForm.email).then(response => {
        // console.log(response)
        this.$Message.success("验证码已发送")
        // this.emails = response.data.code
      }).catch(error => {
        console.log(error)
      })

      function setTime(countdown) {
        if (countdown == 0) {
          window.time = "获取验证码";
          countdown = 60; //60秒过后button上的文字初始化,计时器初始化;
          return;
        } else {
          window.time = "(" + countdown + "s)后重新发送";
          countdown--;
        }
        setTimeout(function () {
          setTime(countdown)
        }, 1000) //每1000毫秒执行一次
      }
      setTime(60)

    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 使用flex布局，让内容垂直和水平居中 */

section {
  /* 相对定位 */
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* linear-gradient() 函数用于创建一个表示两种或多种颜色线性渐变的图片 */
  background: linear-gradient(to bottom, #f1f4f9, #dff1ff);
}

/* 背景颜色 */

section .color {
  /* 绝对定位 */
  position: absolute;
  /* 使用filter(滤镜) 属性，给图像设置高斯模糊*/
  filter: blur(200px);
}

/* :nth-child(n) 选择器匹配父元素中的第 n 个子元素 */

section .color:nth-child(1) {
  top: -350px;
  width: 600px;
  height: 600px;
  background: #ff359b;
}

section .color:nth-child(2) {
  bottom: -150px;
  left: 100px;
  width: 500px;
  height: 500px;
  background: #fffd87;
}

section .color:nth-child(3) {
  bottom: 50px;
  right: 100px;
  width: 500px;
  height: 500px;
  background: #00d2ff;
}

.box {
  position: relative;
}

/* 背景圆样式 */

.box .circle {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  /* backdrop-filter属性为一个元素后面区域添加模糊效果 */
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  /* 使用filter(滤镜) 属性，改变颜色。
    hue-rotate(deg)  给图像应用色相旋转
    calc() 函数用于动态计算长度值
    var() 函数调用自定义的CSS属性值x*/
  filter: hue-rotate(calc(var(--x) * 70deg));
  /* 调用动画animate，需要10s完成动画，
    linear表示动画从头到尾的速度是相同的，
    infinite指定动画应该循环播放无限次*/
  animation: animate 10s linear infinite;
  /* 动态计算动画延迟几秒播放 */
  animation-delay: calc(var(--x) * -1s);
}

/* 背景圆动画 */

@keyframes animate {

  0%,
  100% {
    transform: translateY(-50px);
  }

  50% {
    transform: translateY(50px);
  }
}

.box .circle:nth-child(1) {
  top: -50px;
  right: -60px;
  width: 100px;
  height: 100px;
}

.box .circle:nth-child(2) {
  top: 150px;
  left: -100px;
  width: 120px;
  height: 120px;
  z-index: 2;
}

.box .circle:nth-child(3) {
  bottom: 50px;
  right: -60px;
  width: 80px;
  height: 80px;
  z-index: 2;
}

.box .circle:nth-child(4) {
  bottom: -80px;
  left: 100px;
  width: 60px;
  height: 60px;
}

.box .circle:nth-child(5) {
  top: -80px;
  left: 140px;
  width: 60px;
  height: 60px;
}

/* 登录框样式 */

.container {
  position: fixed;
  top: 6%;
  left: 35%;
  width: 400px;
  min-height: 400px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.form {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 50px;
}

/* 登录标题样式 */

.form h2 {
  position: relative;
  color: #2F4F4F;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 5px;
  margin-bottom: 30px;
  cursor: pointer;
}

/* 登录标题的下划线样式 */

.form h2::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 0px;
  height: 3px;
  background: #2F4F4F;
  transition: 0.5s;
}

.form h2:hover:before {
  width: 106px;
}

.form .inputBox {
  width: 100%;
  margin-top: 20px;
}

.form .inputBox2 {
  width: 100%;
  margin-top: 20px;
}

/* 输入框样式 */

.form .inputBox input {
  width: 100%;
  padding: 10px 20px;
  background: rgb(47, 79, 79, 0.5);
  outline: none;
  border: none;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 16px;
  letter-spacing: 1px;
  color: #2F4F4F;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.form .inputBox2 input {
  width: 50%;
  padding: 10px 20px;
  background: rgb(47, 79, 79, 0.5);
  outline: none;
  border: none;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 16px;
  letter-spacing: 1px;
  color: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.form .inputBox2 input::placeholder {
  color: #fff;
}

.form .inputBox input::placeholder {
  color: #fff;
}

/* 登录按钮样式 */

.form .inputBox input[type="submit"] {
  background: #fff;
  color: #666;
  max-width: 100px;
  margin-bottom: 20px;
  font-weight: 600;
  cursor: pointer;
}

.form .inputBox2 input[type="submit"] {
  background: #fff;
  color: #666;
  max-width: 150px;
  margin-bottom: 20px;
  font-weight: 600;
  cursor: pointer;
}

.forget {
  margin-top: 6px;
  color: #000000;
  letter-spacing: 1px;
}

.forget a {
  color: #000000;
  font-weight: 600;
  text-decoration: none;
}
</style>
