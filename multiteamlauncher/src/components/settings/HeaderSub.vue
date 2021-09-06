<template>
    <router-link to="/settings" class="header_tab_sub" id="sub-header-general">{{ $t('tab_settings_general') }}</router-link>
    <router-link to="/settings/account" class="header_tab_sub" id="sub-header-account">{{ $t('tab_settings_account') }}</router-link>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { defineComponent } from 'vue'

export default defineComponent({
    name: "HeaderSubSettings",
    components: {
    },
    computed: {
        // ...mapGetters(["gameList"])
    }
})
</script>

<style>
#sub-header-general a {
    color: #E1E1E1
}

#sub-header-account a {
    color: #E1E1E1
}
</style>