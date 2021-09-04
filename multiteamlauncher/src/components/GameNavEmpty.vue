<template>
    <div id="game-list" class="sidebar_hidden">
        
    </div>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { defineComponent } from 'vue'

export default defineComponent({
    name: "GameNavEmpty",
    components: {
    },
    computed: {
        // ...mapGetters(["gameList"])
    }
})
</script>
