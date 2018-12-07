<template>
    <div class="ui-search-card">
        <div class="ui-search-card-header" @click="isShow = !isShow">
            <h3 class="ui-search-card-title ui-left"><i class="ui-icon">&#xe61e;</i>{{title}}</h3>
            <div class="ui-btn-container ui-right">
                <el-button :class="{uiSearchCardShow:isShow}" type="text" size="mini"><i class="ui-icon">&#xe712;</i>
                </el-button>
            </div>
        </div>
        <transition name="fade-transform" mode="out-in">
            <div class="ui-search-card-body" v-show="isShow">
                <slot name="uisearchcardbody"></slot>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "Searchcard",
        data() {
            return {
                isShow: true
            }
        },
        props: {
            title: {
                type: String,
                default: '查询条件'
            }
        },
        watch: {
            isShow() {
                this.$emit('onChangeIsShow', this.isShow)
            }
        }
    }
</script>

<style scoped lang="scss">
    .ui-search-card.is-always-shadow, .ui-search-card.is-hover-shadow:focus, .ui-search-card.is-hover-shadow:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    }

    .ui-search-card {
        border: 1px solid #ebeef5;
        background-color: #fff;
        transition: .3s;
        border-radius: 4px;
        margin-bottom: 15px;

        .ui-search-card-header {
            padding: 5px 12px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            cursor: pointer;

            .ui-search-card-title {
                line-height: 28px;
                margin-right: 15px;
                font-weight: normal;
                font-size: 16px;

                .ui-icon {
                    margin-right: 5px;
                    font-size: 18px;
                }
            }

            .el-button .ui-icon {
                transform-origin: 50% 50%;
                transition: transform .3s ease;
                display: inline-block;
            }

            .uiSearchCardShow .ui-icon {
                transform: rotate(180deg);
            }
        }

        .ui-search-card-body {
            padding: 12px;
            border-top: 1px solid #ebeef5;
        }

        .ui-search-card-header:before, .ui-search-card-header:after, .ui-search-card-body:before, .ui-search-card-body:after, .ui-card-foot:before, .ui-card-foot:after {
            content: '';
            display: block;
            clear: both;
        }
    }
</style>
