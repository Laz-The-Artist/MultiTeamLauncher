<template>
  <router-view name="navBar"></router-view>
  <div id="nav" class="header">
    <div class="HeadSpacer"></div>
    <router-link to="/" tag="div" class="header_tab">{{ $t('tab_games') }}</router-link>
    <router-link to="/mods" tag="div" class="header_tab">{{ $t('tab_mods') }}</router-link>
    <router-link to="/social" id="social" tag="div" class="header_tab">{{ $t('tab_social') }}</router-link>
    <router-link to="/settings" id="settings" tag="div" class="header_tab">{{ $t('tab_settings') }}</router-link>

    <div id="account-preview">
        <div class="account_preview_img"><img src="res/img/game_icon_jasg.png" alt="profile-picture" id="account-preview-pfp"></div>
        <div class="button_icon" id="account-manage"><i class="fas fa-ellipsis-v" id="account-manage-icon"></i></div>
        <h6 id="account-preview-status">{{ $t('status_' + account-status) }}</h6>
        <h4 id="account-preview-username">{{account-username}}</h4>
    </div>

    <div class="window_manager_buttons" id="window-debug">D</div>
    <div class="window_manager_buttons" id="window-minimize">_</div>
    <div class="window_manager_buttons" id="window-close">X</div>

    <div class="account-preview-dropdown" id="account-preview-dropdown">
        <a class="account-preview-dropdown-entry" id="user-drpd-entry-1">{{ $t('status_online') }}</a>
        <a class="account-preview-dropdown-entry" id="user-drpd-entry-2">{{ $t('status_offline') }}</a>
        <a class="account-preview-dropdown-entry" id="user-drpd-entry-3">{{ $t('status_afk') }}</a>
        <a class="account-preview-dropdown-entry" id="user-drpd-entry-3">{{ $t('status_do-not-disturb') }}</a>
        <hr class="decor_line" style="border: 1px solid #E1E1E1;">
        <a class="account-preview-dropdown-entry" id="user-drpd-entry-4">{{ $t('account_my-account') }}</a>
        <a class="account-preview-dropdown-entry" id="user-drpd-entry-5">{{ $t('account_log-out') }}</a>
    </div>

    <hr class="decor_line" style="width:auto;">
    <a class="header-sub">
      <router-view name="headerSub"></router-view>
    </a>
  </div>
  <router-view/>
</template>

<script lang="ts">
import { mapGetters, mapMutations } from "vuex";
import { defineComponent } from 'vue'

export default defineComponent({
    name: "App",
    components: {
    },
    computed: {}
})
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */
</style>
