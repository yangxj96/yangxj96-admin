<template>
    <el-row>
        <el-col :span="3">
            <img
                src="/src/assets/logo-across.png"
                class="goto-home"
                alt="logo"
                style="height: 56px"
                @click="gotoHome" />
        </el-col>

        <el-col :span="20" style="padding-right: 40px"></el-col>

        <el-col :span="1">
            <el-dropdown>
                <img
                    src="/src/assets/images/default-avatar.jpg"
                    alt="default avatar"
                    style="object-fit: cover"
                    class="el-avatar el-avatar--circle el-tooltip__trigger" />
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="handlePersonalPopup">
                            <icons name="icon-user" class-name="icon-navbar" />
                            <span>个人信息</span>
                        </el-dropdown-item>
                        <el-dropdown-item @click="handleModifyPasswordPopup">
                            <icons name="icon-change-password" class-name="icon-navbar" />
                            <span>修改密码</span>
                        </el-dropdown-item>
                        <el-dropdown-item @click="handleUserLogout">
                            <icons name="icon-logout" class-name="icon-navbar" />
                            <span>退出登录</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-col>
    </el-row>
    <personal-details />
    <change-password />
</template>

<script lang="ts" setup>
    import UserApi from "@/api/UserApi";
    import GlobalUtils from "@/utils/GlobalUtils";
    import changePassword from "@/components/Props/ChangePassword/index.vue";
    import personalDetails from "@/components/Props/PersonalDetails/index.vue";
    import { useRouter } from "vue-router";
    import { ElMessage } from "element-plus/es";
    import useStore from "@/plugin/store";
    import { stopAllRequest } from "@/plugin/request";

    const router = useRouter();

    function gotoHome() {
        router.push({ path: "/" });
    }

    function handleUserLogout() {
        stopAllRequest();
        UserApi.logout().then(res => {
            if (res.code == 0) {
                ElMessage.success({
                    message: "退出成功",
                    onClose: () => {
                        GlobalUtils.exit();
                    }
                });
            } else {
                ElMessage.error({
                    message: res.msg
                });
            }
        });
    }

    function handleModifyPasswordPopup() {
        useStore().props.change_password = true;
    }

    function handlePersonalPopup() {
        useStore().props.personal_details = true;
    }
</script>

<style scoped lang="scss">
    .goto-home {
        cursor: pointer;
    }

    .el-menu.el-menu--horizontal {
        border: 0;
    }

    :deep(.el-dropdown) {
        width: 100%;
        top: 20%;
        text-align: center;
    }

    .icon-navbar {
        width: 1.3em;
        height: 1.3em;
        padding-right: 0.5em;
    }

    .flex-grow {
        flex-grow: 1;
    }

    :deep(.el-menu) {
        height: 100%;
    }
</style>
