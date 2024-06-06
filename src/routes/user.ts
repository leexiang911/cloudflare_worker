// 用户路由
import { apiUtils } from '../utils/apiUtils'
import { Router } from 'itty-router';
import { UserModel } from '../model/User';
const router = Router();
const prefix = 'user'; // 用于标识路由的前缀
// 用户注册＿邮箱验证码注册
router.post(`/${prefix}/register_email`, async (req, env, ctx) => {
    const { username, password, email, code } = await req.json();
    const user = new UserModel.User(req, env, ctx);
    const data = await user.register(username, password, email, code);
    const userdata = await user.isEmailRegistered(email);
    const res = new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
    if (userdata) {
        const jwt = {
            data: {
                id: userdata.id,
                email: userdata.email
            },
            role: 'user' as 'user' | 'admin',
            exp: Date.now() + 1000 * 60 * 60 * 24 * 7
        };
        res.headers.set('zzz', typeof userdata)
        return apiUtils.setJWT_header(res, jwt);
    }
    return new Response(JSON.stringify(userdata), { headers: { 'abc': 'abc' } });
});

// 用户登录＿邮箱验证码登录
router.post(`/${prefix}/login_email`, async (req, env, ctx) => {
    const { email, code } = await req.json();
    const user = new UserModel.User(req, env, ctx);
    const userdata = await user.loginByEmail(email, code);

    const res = new Response(JSON.stringify({ code: 200, message: '登录成功，欢迎回来', data: null }), { headers: { 'Content-Type': 'application/json' }, status: 200 });
    if (userdata.data) {
        const jwt = {
            data: {
                id: userdata.data.id,
                email: userdata.data.email
            },
            role: 'user' as 'user' | 'admin',
            exp: Date.now() + 1000 * 60 * 60 * 24 * 7
        };
        return apiUtils.setJWT_header(res, jwt);
    }
    return new Response(JSON.stringify({ code: 400, message: userdata.message, data: null }), { headers: { 'Content-Type': 'application/json' }, status: 400 });
});

// 用户登录＿用户名密码登录
router.post(`/${prefix}/login_username`, async (req, env, ctx) => {
    const { username, password } = await req.json();
    const user = new UserModel.User(req, env, ctx);
    const data = await user.loginByUsername(username, password);
    if (data) {
        const jwt = {
            data: {
                id: data.id,
                email: data.email
            },
            role: 'user' as 'user' | 'admin',
            exp: Date.now() + 1000 * 60 * 60 * 24 * 7
        };
        const res = new Response(JSON.stringify({ code: 200, message: '登录成功，欢迎回来', data: null }), { headers: { 'Content-Type': 'application/json' }, status: 200 });
        return apiUtils.setJWT_header(res, jwt);
    }
    return new Response(JSON.stringify({ code: 400, message: '登录失败，请重试', data: null }), { headers: { 'Content-Type': 'application/json' }, status: 400 });

});
export default router;