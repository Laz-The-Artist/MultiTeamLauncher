<template>
    <div id="tab-content" class="content_settings">
        <div class="setting_panel" id="settings-panel-storage">
            <h1 class="setting_panel_title">Storage Settings</h1>

            <div id="game-lib-loc">
                <a 
                class="settings-entry" 
                id="game-lib-loc-text"
                >Game Library Location</a>
                <input 
                type="text" 
                name="Game Library Location" 
                id="game-lib-loc-input"
                class="inputfield"
                placeholder="this is where games are installed"
                v-bind:value="settings.general.gameLibraryLoc"
                v-on:input="this.setSetting({name:'gameLibraryLoc', value: this.getElementById('game-lib-loc-input').value})"
                >
                <input 
                type="submit" 
                value="Chose"
                id="chose-path"
                class="button_regular">
            </div>

            <div id="setting-auto-update-game">
                <a 
                class="settings-entry" 
                id="checkbox-text-auto-update-game"
                >Auto-Update Games</a>
                <input 
                type="checkbox" 
                id="checkbox-auto-update-game"
                class="input_checkbox"
                v-bind:checked="settings.general.autoUpdateGames"
                v-on:change="this.setSetting({name:'autoUpdateGames', value: this.getElementById('checkbox-auto-update-game')['checked']})"
                >
                <i 
                class="fas fa-check-circle" 
                id="checkmark-icon"
                ></i>
            </div>

            <div id="setting-auto-update-launcher">
                <a 
                class="settings-entry" 
                id="checkbox-text-auto-update-launcher"
                >Auto-Update the Launcher</a>
                <input 
                type="checkbox" 
                id="checkbox-auto-update-launcher"
                class="input_checkbox"
                v-bind:checked="settings.general.autoUpdateLauncher"
                v-on:change="this.setSetting({name:'autoUpdateLauncher', value: this.getElementById('checkbox-auto-update-launcher')['checked']})"
                >
                <i 
                class="fas fa-check-circle" 
                id="checkmark-icon"
                ></i>
            </div>

            <div id="setting-limit-bandwidth">
                <a 
                class="settings-entry" 
                id="checkbox-text-limit-bandwidth"
                >Limit Bandwidth</a>
                <input 
                type="checkbox" 
                id="checkbox-limit-bandwidth"
                class="input_checkbox"
                v-bind:checked="settings.general.limitBandwidth"
                v-on:change="this.setSetting({name:'limitBandwidth', value: this.getElementById('checkbox-limit-bandwidth')['checked']})"
                >
                <i 
                class="fas fa-check-circle" 
                id="checkmark-icon"
                ></i>
                <input 
                type="text" 
                name="Bandwidth Limitation Amount" 
                id="bandwidth-limit-input"
                class="inputfield"
                placeholder="500 Mbit/s for example"
                v-bind:value="settings.general.limitBandwidthNumber.toString() + ' Mbit/s'"
                v-on:input="this.setSetting({name:'limitBandwidthNumber', value: Number.parseInt(this.getElementById('bandwidth-limit-input').value.replace(' Mbit/s', ''))})"
                >
            </div>
        </div>

        <div class="setting_panel" id="settings-panel-interface">
            <h1 class="setting_panel_title">Interface Settings</h1>

            <div id="interface-language">
                <a
                class="settings-entry"
                id="interface-language-text"
                >Language</a>
                <select 
                name="language" 
                id="interface-language-selector"
                class="input_selector"
                v-bind:selectedIndex="settings.general.languageCode"
                v-on:change="this.setSetting({name:'languageCode', value: this.getElementById('interface-language-selector')['selectedIndex']})"
                >
                    <option selected>en_us</option>
                </select>
            </div>

            <div id="interface-start">
                <a
                class="settings-entry"
                id="interface-start-text"
                >Default start tab</a>
                <select 
                name="start-tab" 
                id="interface-start-selector"
                class="input_selector"
                v-bind:selectedIndex="settings.general.defaultStartTab"
                v-on:change="this.setSetting({name:'defaultStartTab', value: this.getElementById('interface-start-selector')['selectedIndex']})"
                >
                    <option selected>{{ $t('tab_games') }}</option>
                    <option>{{ $t('tab_mods') }}</option>
                    <option>{{ $t('tab_social') }}</option>
                    <option>{{ $t('tab_settings') }}</option>
                </select>
            </div>
            <div id="setting-auto-start">
                <a
                class="settings-entry"
                id="checkbox-text-auto-start"
                >Run at System-Startup</a>
                <input 
                type="checkbox" 
                id="checkbox-auto-start"
                class="input_checkbox"
                v-bind:checked="settings.general.runAtStartUp"
                v-on:change="this.setSetting({name:'runAtStartUp', value: this.getElementById('checkbox-auto-start')['checked']})"
                >
                <i 
                class="fas fa-check-circle" 
                id="checkmark-icon"
                ></i>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { mapState, mapMutations } from 'vuex'
import { defineComponent } from 'vue'

export default defineComponent({
    name: "GeneralSettings",
    components: {
    },
    computed: {
        ...mapState(["settings"])
    },
    methods: {
        ...mapMutations({
            setSetting: "setGeneralSetting"
        }),
        getElementById: (id:string) => {
            return document.getElementById(id);
        }
    }
})
</script>