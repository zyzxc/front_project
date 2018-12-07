<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu mode="vertical" :default-active="$route.path" :show-timeout="200" :collapse="isCollapse">
            <sidebar-item :routes="getMenuList"></sidebar-item>
        </el-menu>
    </el-scrollbar>
</template>

<script>
    import {mapGetters} from 'vuex'
    import SidebarItem from './sidebarItem'
    import {StructuredRoutes} from './structuredRouting'

    export default {
        name: "index",
        components: {SidebarItem},
        computed: {
            ...mapGetters([
                'getAllRouters',
                'sidebar'
            ]),
            isCollapse() {
                return !this.sidebar['opened']
            },
            getMenuList() {
                return StructuredRoutes(this.getAllRouters)
            }
        },
        mounted() {
            //console.log(StructuredRoutes(this.getAllRouters))
        }
    }
</script>

<style scoped>

</style>
