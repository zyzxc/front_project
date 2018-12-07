<template>
    <section class="app-container">
        <el-header height="50px">
            <div class="ui-logo">
                <img src="@/assets/images/logo.png" alt="题库管理后台">后台管理系统
            </div>
            <!--<hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="ui-slideBar"/>-->
            <div class="ui-nav-row ui-right">
                <div class="ui-nav-item">
                    <el-button type="text" class="header-sysdecription-icon" palin @click="showSysDescription()"><i
                            class="ui-icon">&#xe66d;</i> 说明
                    </el-button>
                </div>
                <div class="ui-nav-item">
                    <el-dropdown size="small" class="ui-user-info">
                        <div class="ui-user-avatar">
                            <img class="userInfo-header-avatar" width="30" height="30"
                                 src="@/assets/images/logo.png">
                            <span class="userInfo-header">{{userName}}</span>
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <router-link to="/">
                                <el-dropdown-item>
                                    首页
                                </el-dropdown-item>
                            </router-link>
                            <el-dropdown-item divided>
                                <span style="display:block;">退出登录</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </el-header>
        <el-container :class="classObj">
            <sidebar class="sidebar-container"/>
            <el-main>
                <tags-view/>
                <app-main/>
            </el-main>
        </el-container>
    </section>
</template>

<script>
    import {AppMain, Sidebar, TagsView} from "./components";
    //import {removeToken, removeStorage} from "@/utils/cookies";
    //import Hamburger from "@/components/common/Hamburger.vue";

    export default {
        name: "index",
        components: {
            AppMain,
            Sidebar,
            TagsView,
            //Hamburger
        },
        data() {
            return {
                showSysDesClass: 'ui-sysSetting-sidebar',
                userName: 'zxc'
            }
        },
        computed: {
            sidebar() {
                return this.$store.state.app.sidebar;
            },
            classObj() {
                return {
                    hideSidebar: !this.sidebar.opened,
                    openSidebar: this.sidebar.opened,
                    withoutAnimation: this.sidebar.withoutAnimation
                };
            }
        },
        mounted() {

        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch("ToggleSidebar");
            },


            //
            showSysDescription() {
                var index = this.showSysDesClass.indexOf('ui-sysSetting-show');
                if (index == -1) {
                    this.showSysDesClass += ' ui-sysSetting-show';
                } else {
                    this.showSysDesClass = this.showSysDesClass.substr(0, index);
                }
            }
        }
    }

</script>

<style scoped lang="scss">
    .header-courseinfo-bar {
        margin-top: 5px;
    }

    .header-sysdecription-icon {
        margin-top: 5px;
        padding-left: 5px;
        padding-right: 5px;
    }

    .ui-sysSetting-sidebar {
        width: 230px !important;
        z-index: 1001;
        height: 100%;
        position: fixed;
        background: white;
        top: 50px;
        border-left: 1px solid #ccc;
        right: -230px;
        -webkit-transition: all 0.3s ease;
        -o-transition: all 0.3s ease;
        transition: all 0.3s ease;
        h3 {
            font-size: 18px;
            font-weight: normal;
            line-height: 32px;
            padding: 10px 15px;
        }
        .ui-sysSetting-sidebar-collapse {
            border-top: 1px solid #e6e6e6;
            .el-row {
                padding: 10px;
            }
            .el-row:first-child {
                padding-bottom: 0;
            }
            .el-row:last-child {
                padding-top: 0;
                padding-bottom: 0;
            }
            .ui-sysSetting-sidebar-btn {
                display: block;
                padding-left: 20px;
                margin-left: 0;
            }
        }
        .ui-sysSetting-sidebar-close {
            position: absolute;
            top: 5px;
            right: 10px;
        }
    }

    .ui-sysSetting-show {
        right: 0px;
    }

    .userInfo-header-avatar {
        vertical-align: middle
    }

    .userInfo-header {
        margin-left: 4px;
        vertical-align: middle;
        color: rgba(255, 255, 255, 0.7)
    }
</style>
<style lang="scss">
    .ui-sysSetting-sidebar-collapse {
        .el-collapse-item__header {
            background: #f2f2f2;
            padding-left: 15px;
            border-bottom: 1px solid #e6e6e6;
        }
        .el-collapse-item__content {
            padding-bottom: 15px;
        }
    }
</style>
