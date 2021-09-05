<template>
    <div class="button_icon" id="add-friend">
        <i class="fas fa-plus-circle" id="ico-addFriend"></i>
    </div>
    <div class="header_tab_sub_selected" id="sub-header-friends">Friends</div>
    <div class="header_tab_sub" id="sub-header-groups">Groups</div>
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