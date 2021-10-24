<template>
  <div id="app">
    <img src="./assets/logo.png">
    <a-button :icon="style"></a-button>
    <p>
      <!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 `to` 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <router-link to="/">Go to Foo</router-link>
      <router-link to="/12">Go to Bar</router-link>
  </p>
  <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',

  data () {
    return {
      style: 'left'
    }
  },
  computed: {
    routes () {
      return this.$store.state.routes
    },
    user () {
      return this.$store.state.currentHr
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
