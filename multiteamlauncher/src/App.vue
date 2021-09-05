<template>
  <router-view name="navBar"></router-view>
  <div id="nav" class="header">
    <div class="HeadSpacer"></div>
    <router-link to="/" tag="div" class="header_tab">Games</router-link>
    <router-link to="/mods" tag="div" class="header_tab">Mods</router-link>
    <router-link to="/social" tag="div" class="header_tab">Social</router-link>
    <router-link to="/settings" tag="div" class="header_tab">Settings</router-link>

    <div id="account-preview">
        <div class="account_preview_img"><img src="res/img/game_icon_jasg.png" alt="profile-picture" id="account-preview-pfp"></div>
        <div class="button_icon" id="account-manage"><i class="fas fa-ellipsis-v" id="account-manage-icon"></i></div>
        <h6 id="account-preview-status">{{account-status}}</h6>
        <h4 id="account-preview-username">{{account-username}}</h4>
    </div>

    <div class="window_manager_buttons" id="window-debug">D</div>
    <div class="window_manager_buttons" id="window-minimize">_</div>
    <div class="window_manager_buttons" id="window-close">X</div>

    <div class="account-preview-dropdown" id="account-preview-dropdown">
        <a class="account-preview-dropdown-entry" id="user-drpd-entry-1">Online</a>
        <a class="account-preview-dropdown-entry" id="user-drpd-entry-2">Offline</a>
        <a class="account-preview-dropdown-entry" id="user-drpd-entry-3">AFK</a>
        <a class="account-preview-dropdown-entry" id="user-drpd-entry-3">Do Not Disturb</a>
        <hr class="decor_line" style="border: 1px solid #E1E1E1;">
        <a class="account-preview-dropdown-entry" id="user-drpd-entry-4">My Account</a>
        <a class="account-preview-dropdown-entry" id="user-drpd-entry-5">Log Out</a>
    </div>

    <hr class="decor_line" style="width:auto;">
    <a class="header-sub">
      <router-view name="headerSub"></router-view>
    </a>
  </div>
  <router-view/>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { defineComponent } from 'vue'

export default defineComponent({
    name: "App",
    components: {
    },
    computed: {
        ...mapGetters(["gameList"])
    }
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
