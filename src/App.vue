<template>
    <div id="nav">
        <el-config-provider :locale="locale" :message="message">
            <router-view />
        </el-config-provider>
    </div>
</template>

<script lang="ts" setup>
    import { onUnmounted, reactive, ref } from "vue";
    import useAppStore from "@/plugin/store/modules/useAppStore";

    const locale = ref(useAppStore().lang);
    const message = reactive({
        max: 3
    });

    onUnmounted(() => {
        if (useAppStore().checkTokenInterval != 0) {
            clearInterval(useAppStore().checkTokenInterval);
        }
    });
</script>

<style lang="scss">
    @use "@/assets/css/common.scss";

    * {
        padding: 0;
        margin: 0;
    }
</style>
