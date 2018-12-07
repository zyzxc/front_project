<template>
    <div class="tags-view-container">
        <scroll-pane ref="scrollPane" class="tags-view-wrapper">
            <router-link
                    v-for="tag in visitedViews"
                    ref="tag"
                    :class="isActive(tag)?'active':''"
                    :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
                    :key="tag.path"
                    tag="span"
                    class="tags-view-item"
                    @contextmenu.prevent.native="openMenu(tag,$event)">
                {{ tag.title }}
                <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"/>
            </router-link>
        </scroll-pane>
        <ul v-show="visible" :style="{left:left+'px'}" class="contextmenu">
            <li @click="closeSelectedTag(selectedTag)">关闭</li>
            <li @click="closeOthersTags">关闭其他</li>
            <li @click="closeAllTags">关闭所有</li>
        </ul>
    </div>
</template>

<script>
  import ScrollPane from '@/components/common/ScrollPanel'

  export default {
    name: "TagsView",
    components: {ScrollPane},
    data() {
      return {
        visible: false,
        left: 0,
        selectedTag: {}
      }
    },
    computed: {
      visitedViews() {
        return this.$store.state.tagsView.visitedViews
      }
    },
    watch: {
      $route() {
        this.addViewTags();
        this.moveToCurrentTag();
      },
      visible(value) {
        if (value) {
          document.body.addEventListener('click', this.closeMenu)
        } else {
          document.body.removeEventListener('click', this.closeMenu)
        }
      }
    },
    mounted() {
      this.addViewTags()
    },
    methods: {
      isActive(route) {
        return route.path === this.$route.path
      },
      addViewTags() {
        const {name} = this.$route;
        if (name) {
          this.$store.dispatch('addView', this.$route)
        }
        return false
      },
      moveToCurrentTag() {
        const tags = this.$refs.tag;
        this.$nextTick(() => {
          for (const tag of tags) {
            if (tag.to.path === this.$route.path) {
              this.$refs.scrollPane.moveToTarget(tag);
              if (tag.to.fullPath !== this.$route.fullPath) {
                this.$store.dispatch('updateVisitedView', this.$route)
              }
              break
            }
          }
        })
      },
      closeSelectedTag(view) {
        this.$store.dispatch('delView', view).then(({visitedViews}) => {
          if (this.isActive(view)) {
            const latestView = visitedViews.slice(-1)[0];
            if (latestView) {
              this.$router.push(latestView)
            } else {
              this.$router.push('/')
            }
          }
        })
      },
      closeOthersTags() {
        this.$router.push(this.selectedTag);
        this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
          this.moveToCurrentTag()
        })
      },
      closeAllTags() {
        this.$store.dispatch('delAllViews');
        this.$router.push('/')
      },
      openMenu(tag, e) {
        const menuMinWidth = 105;
        const offsetLeft = this.$el.getBoundingClientRect().left;
        const offsetWidth = this.$el.offsetWidth;
        const maxLeft = offsetWidth - menuMinWidth;
        const left = e.clientX - offsetLeft + 15;

        if (left > maxLeft) {
          this.left = maxLeft
        } else {
          this.left = left
        }
        this.visible = true;
        this.selectedTag = tag
      },
      closeMenu() {
        this.visible = false
      }
    }
  }
</script>

<style lang="scss" scoped>
    .tags-view-container {
        height: 40px;

        .tags-view-wrapper {
            height: 40px;
            background: #fff;
            border-bottom: 1px solid #d8dce5;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);

            .tags-view-item {
                display: inline-block;
                position: relative;
                height: 26px;
                line-height: 26px;
                border: 1px solid #d8dce5;
                color: #495060;
                background: #fff;
                padding: 0 4px 0 8px;
                font-size: 12px;
                margin-left: 6px;
                margin-top: 6px;
                cursor: pointer;

                .el-icon-close {
                    width: 16px;
                    height: 16px;
                    vertical-align: middle;
                    margin-top: -3px;
                    border-radius: 50%;
                    text-align: center;
                    transition: all .3s cubic-bezier(.645, .045, .355, 1);
                    transform-origin: 100% 50%;

                    &:before {
                        transform: scale(.6);
                        display: inline-block;
                        vertical-align: -3px;
                    }

                    &:hover {
                        background-color: #b4bccc;
                        color: #fff;
                    }
                }

                /*&:first-of-type {
                  margin-left: 15px;
                }*/
                &.active {
                    background-color: #19aeb7;
                    color: #fff;
                    border-color: #19aeb7;

                    &::before {
                        content: '';
                        background: #fff;
                        display: inline-block;
                        width: 6px;
                        height: 6px;
                        -webkit-border-radius: 50%;
                        border-radius: 50%;
                        position: relative;
                        margin: -3px 2px 0 0;
                        vertical-align: middle;
                    }
                }
            }
        }

        .contextmenu {
            top: 28px;
            margin: 0;
            background: #fff;
            z-index: 100;
            position: absolute;
            list-style-type: none;
            padding: 5px 0;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 400;
            color: #333;
            box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);

            li {
                margin: 0;
                padding: 7px 16px;
                cursor: pointer;

                &:hover {
                    background: #eee;
                }
            }
        }
    }
</style>
