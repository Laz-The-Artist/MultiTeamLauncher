<template>
    <div id="game-list" class="sidebar">
        <!-- <GameIcon v-for="game in gameList"
        v-bind:bgColor="game.bgColor"
        v-bind:iconPath="game.iconPath"
        v-bind:key="game.index"
        ></GameIcon> -->
        <div class="sidebar_item" 
        v-for="game in gameList"
        v-bind:key="game.index"
        v-bind:style="{ backgroundColor: game.color}"
        >
            <img v-bind:src="game.iconURL" alt="sidebar_item_icon" class="sidebar_item_icon" draggable="false">
        <i class="fas fa-arrow-alt-circle-down" id="sidebar_item_badge" style="color=#4CBE6A"></i>
        </div>
    </div>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { defineComponent } from 'vue'

export default defineComponent({
    name: "GameNav",
    components: {
    },
    computed: {
        ...mapGetters(["gameList"])
    }
})
</script>
