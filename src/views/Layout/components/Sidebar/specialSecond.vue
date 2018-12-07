<template>
    <div class="nest-menu menu-wrapper">
        <el-submenu :index="base +'/'+routes.name">
            <template slot="title">
                <i class="ui-icon">&#xe64a;</i>
                <span v-text="routes.title"></span>
            </template>
            <template v-for="child in routes.children">
                <router-link :to="base + '/' + child.path" :key="child.parentTitle">
                    <el-menu-item :index="base + '/' + child.path">
                        <span>{{child.title}}</span>
                    </el-menu-item>
                </router-link>
            </template>
        </el-submenu>
    </div>
</template>

<script>
  export default {
    name: "third",
    props: {
      routes: {
        type: Object
      },
      base: {
        type: String
      }
    }
  }
</script>

