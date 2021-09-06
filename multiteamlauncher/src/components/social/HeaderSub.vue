<template>
    <div class="button_icon" id="add-friend">
        <i class="fas fa-plus-circle" id="ico-addFriend"></i>
    </div>
    <router-link to="/social" class="header_tab_sub" id="sub-header-friends">{{ $t('tab_social_friends') }}</router-link>
    <router-link to="/social/groups" class="header_tab_sub" id="sub-header-groups">{{ $t('tab_social_groups') }}</router-link>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { defineComponent } from 'vue'

export default defineComponent({
    name: "HeaderSubSocial",
    components: {
    },
    computed: {
        // ...mapGetters(["gameList"])
    }
})
</script>