<template>
    <div class="mods">
        <GameNav></GameNav>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GameNav from '@/components/games/nav/GameNav.vue'

export default defineComponent({
    name: "Mods",
    components: {
        GameNav
    }
})
</script>
