<template>
    <mu-appbar title="急速拼车" class='header-bar'  slot='default'>
        <mu-icon-menu  :open="open" :anchorOrigin="anchorOrigin" icon="menu" slot="left">
            <mu-menu-item @click='routerHomepage'  title="首页" />
            <mu-menu-item @click='routerInCity' title="市内" />
            <mu-menu-item @click='routerOutCity' title="市外"/>
            <mu-menu-item @click='routerSend' title="发布"/>
        </mu-icon-menu>
        <mu-icon-menu
                @close="handleClose"
                icon="more_vert"
                :anchorOrigin="leftTop"
                :value="theme"
                @change="changeTheme"
                slot="right"
        >
            <mu-menu-item title="皮肤1" value='light' />
            <mu-menu-item title="皮肤2" value='dark' />
            <mu-menu-item title="皮肤3" value='carbon' />
            <mu-menu-item title="皮肤4" value='teal' />
        </mu-icon-menu>
    </mu-appbar>
</template>
<style lang="css">
    .header-bar{
        position:fixed;
        top:0;
        left:0;
        text-align:center;
    }
</style>
<script>
    import light from '!raw-loader!muse-ui/dist/theme-default.css'
    import dark from '!raw-loader!muse-ui/dist/theme-dark.css'
    import carbon from '!raw-loader!muse-ui/dist/theme-carbon.css'
    import teal from '!raw-loader!muse-ui/dist/theme-teal.css'
    export default {
      data () {
        return {
          theme: 'teal',
          themes: {
            light,
            dark,
            carbon,
            teal
          },
          open: false,
          trigger: null,
          leftTop: {horizontal: 'left', vertical: 'bottom'},
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left'
          },
          targetOrigin: {
            vertical: 'bottom',
            horizontal: 'left'
          }
        }
      },
      methods: {
        changeTheme (theme) {
          this.theme = theme
          const styleEl = this.getThemeStyle()
          styleEl.innerHTML = this.themes[theme] || ''
        },
        getThemeStyle () {
          const themeId = 'muse-theme'
          let styleEl = document.getElementById(themeId)
          if (styleEl) return styleEl
          styleEl = document.createElement('style')
          styleEl.id = themeId
          document.body.appendChild(styleEl)
          return styleEl
        },
        routerHomepage () {
          this.$router.push('/homepage')
        },
        routerOutCity () {
          this.$router.push('/outCity')
        },
        routerInCity () {
          this.$router.push('/inCity')
        },
        routerSend () {
          this.$router.push('/send')
        },
        handleClose () {
          this.open = false
        },
        stringify (obj) {
          return JSON.stringify(obj)
        }
      }
    }
</script>
