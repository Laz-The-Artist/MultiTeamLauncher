<template>
    <div class="content_games" id="tab-content">
        <div
        id="game-preview"
        v-bind:style="{ backgroundImage: 'url(' + gameList[selectedGame].previewURL + ')' }"
        >
            <div id="game-icon">
                <img 
                v-bind:src="gameList[selectedGame].iconURL" 
                alt="game-icon"
                id="game-icon-img"
                draggable="false"
                >
            </div>
            <h1 id="game-title">{{ gameList[selectedGame].name }}</h1>
            <h2 id="game-version">{{ gameList[selectedGame].version.name }}</h2>
            <input 
            type="submit" 
            value="Play/Update"
            id="play-update"
            class="button_regular"
            >
        </div>
        <div>
            <h1 id="game-description-title">{{ gameList[selectedGame].descriptionTitle }}</h1>
            <h4 id="game-description">{{ gameList[selectedGame].description }}</h4>
        </div>
    </div>
</template>

<script lang="ts">
import { mapGetters, mapState } from "vuex";
import { defineComponent } from 'vue'

export default defineComponent({
    name: "Games",
    components: {
    },
    computed: {
        ...mapState(["selectedGame", "gameList"])/*, mapGetters(["gameList"])*/
    }
})
</script>
