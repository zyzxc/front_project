<template>
    <div class="menu-wrapper">
        <template v-for="level1 in routes">
            <el-submenu :index="level1.name" :key="level1.name">
                <template slot="title">
                    <i class="ui-icon" v-html="level1.meta.icon"></i>
                    <span>{{level1.meta.title}}</span>
                </template>
                <template v-for="level2 in level1.children">
                    <router-link :to="level1.path + '/' + level2.path" :key="level2.name" v-if="!level2.children">
                        <el-menu-item :index="level1.path + '/' +level2.path">
                            <i class="ui-icon">&#xe64a;</i>
                            <span>{{level2.title}}</span>
                        </el-menu-item>
                    </router-link>
                    <special-second v-else :key="level2.name" :routes="level2" :base="level1.path"/>
                </template>
            </el-submenu>
        </template>
    </div>
</template>

<script>
  import SpecialSecond from './specialSecond'

  export default {
    name: "sidebarItem",
    components:{
      SpecialSecond
    },
    props: {
      routes: {
        type: Array
      },
      isNest: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
