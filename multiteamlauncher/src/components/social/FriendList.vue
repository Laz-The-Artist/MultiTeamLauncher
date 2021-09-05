<template>
    <div id="tab-content" class="content_social">
        <div id="friend-list" class="friend-list">
            <div
            id="friend-list-item"
            v-for="friend in friendList"
            v-bind:key="friend.index"
            >
                <div class="pfp">
                    <i class="fas fa-user"></i>
                </div>
                <h4 id="friend-user-status">{{ friend.status }}</h4>
                <h1 id="friend-user-name">{{ friend.username }}</h1>
                <div class="message_box">
                    <input type="text" id="friend-msg-output" placeholder="Message">
                    <div class="button_icon" id="sent-btn">
                        <i id="ico-send" class="fas fa-paper-plane"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import { defineComponent } from 'vue'

export default defineComponent({
    name: "FriendList",
    components: {
    },
    computed: {
        ...mapState(["friendList"])
    }
})
</script>
