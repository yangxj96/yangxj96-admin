// 登录token
type Token = {
    id: string;
    /** 用户名 */
    username: string;
    /** 认证token */
    access_token: string;
    /** 权限列表 */
    authorities: string[];
    /** 角色 */
    roles: string[];
};
