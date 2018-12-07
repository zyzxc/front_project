<template>
    <div class="login-container">
        <div class="login-wrapper">
            <h1 class="login-title">欢迎使用后台管理系统</h1>
            <el-form ref="loginForm" status-icon class="login-form" auto-complate="on" label-position="left"
                     :model="loginData" :rules="loginRules">
                <el-form-item prop="userName">
                    <span class="icon-container">
                        <i class="ui-icon">&#xe681;</i>
                    </span>
                    <el-input name="userAccount" type="text" v-model="loginData.username" auto-complete="on"
                              placeholder="用户账号"/>
                </el-form-item>
                <el-form-item prop="passWord">
                    <span class="icon-container">
                        <i class="ui-icon">&#xe67a;</i>
                    </span>
                    <el-input name="password" v-model="loginData.password" auto-complete="on" placeholder="密码"
                              :type="pwdType"/>
                    <span class="show-pwd" @click="showPwd">
                        <i class="ui-icon" v-if="pwdType === 'password'">&#xe67b;</i>
                        <i class="ui-icon" v-else>&#xe698;</i>
                    </span>
                </el-form-item>
                <el-form-item prop="verificationCode" class="verificationCode" inline-message="true">
                    <span class="icon-container">
                        <i class="ui-icon">&#xe6bf;</i>
                    </span>
                    <el-input name="verificationCode" v-model="loginData.verificationCode" auto-complete="off"
                              maxlength="4"
                              placeholder="验证码"
                              @keyup.native="enterKeyUp($event)"/>
                    <img :src="'/qzConsole/verification/getVerificationCode?_t=' + imgCode" @click="getVerificationCode"
                         class="verificationCode"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="loading" style="width:100%"
                               @click.native.prevent="handleLogin()">
                        登&#12288;陆
                    </el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    import {setToken} from "@/utils/cookies";
    import {removeStorage} from "@/utils/cookies";
    import {doLogin} from "@/api/User";

    export default {
        name: 'Login',
        data() {
            return {
                pwdType: 'password',
                imgCode: '',
                loading: false,
                loginData: {
                    username: '',
                    password: '',
                    verificationCode: ''
                },
                loginRules: {
                    username: [
                        {required: true, message: '请填写用户账号！', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请填写用户密码！', trigger: 'blur'}

                    ],
                    verificationCode: [
                        {required: true, message: '请填写验证码！', trigger: 'blur'},
                        {min: 4, message: '长度4个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
            removeStorage('menuRouters')
        },
        methods: {
            showPwd() {
                if (this.pwdType === 'password') {
                    this.pwdType = ''
                } else {
                    this.pwdType = 'password'
                }
            },

            getVerificationCode() {
                this.imgCode = new Date().getTime().toString();
            },
            enterKeyUp(e) {
                /*if (e.keyCode == 13) {

                }*/
            },
            handleLogin() {
                doLogin(this.loginData).then(res => {
                    let $result = JSON.parse(res.data)
                    if ($result.code === 0) {
                        setToken();
                        this.$router.push('/')
                    } else {
                        this.$message.error($result.msg[0].content)
                    }
                });

            }
        }
    }
</script>

<style lang="scss">
    .login-container {
        .el-input {
            display: inline-block;
            height: 50px;
            width: 85%;
            input {
                background: transparent;
                border: 0;
                -webkit-appearance: none;
                border-radius: 0;
                padding: 12px 5px 12px 15px;
                color: #eee;
                height: 50px;
                &:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0 10000px #283443 inset !important;
                    -webkit-text-fill-color: #fff !important;
                }
            }
        }
        .el-form-item {
            border: 1px solid rgba(255, 255, 255, .1);
            background: rgba(0, 0, 0, .1);
            border-radius: 5px;
            color: #454545;
        }
    }
</style>

<style lang="scss" scoped>
    .login-container {
        position: relative;
        width: 100%;
        height: 100%;
        left: 0;
        right: 0;
        top: 0;
        background-color: #2d3a4b;
        .login-wrapper {
            width: 450px;
            height: 380px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-top: -250px;
            margin-left: -225px;
            .login-title {
                height: 50px;
                line-height: 50px;
                text-align: center;
                color: #eee;
            }
            .login-form {
                width: 450px;
                height: 300px;
                margin-top: 30px;
                -webkit-transition: all 1s;
                -moz-transition: all 1s;
                -ms-transition: all 1s;
                -o-transition: all 1s;
                transition: all 1s;
                overflow: hidden;
                .verificationCode {
                    width: 70%;
                    position: relative;
                    img {
                        position: absolute;
                        height: 50px;
                        width: 110px;
                        top: 0;
                        right: -136px;
                        cursor: pointer;
                    }
                }
                .icon-container {
                    padding: 6px 5px 6px 15px;
                    color: #889aa4;
                    text-align: center;
                    font-weight: bold;
                    .ui-icon {
                        display: inline-block;
                        font-size: 22px;
                        vertical-align: middle;
                        margin-top: -3px;
                    }
                }
                .show-pwd {
                    position: absolute;
                    right: 10px;
                    top: 5px;
                    cursor: pointer;
                    user-select: none;
                    i {
                        color: #889aa4;
                        font-size: 20px
                    }
                }
            }
        }
    }

</style>
