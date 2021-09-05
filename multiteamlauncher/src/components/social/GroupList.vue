<template>
    
</template>

<script lang="ts">
import { mapState } from 'vuex'
import { defineComponent } from 'vue'

let social = document.getElementById("social");

if (social != null) {
    social.className="header_tab_selected";
}

export default defineComponent({
    name: "GroupList",
    components: {
    },
    computed: {
        ...mapState(["groupList"])
    }
})
</script>