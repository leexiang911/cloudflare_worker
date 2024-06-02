// 用户路由
import { Router } from 'itty-router';
import { UserModel } from '../model/User';
const router = Router();
const prefix = 'user'; // 用于标识路由的前缀
// 用户注册＿邮箱验证码注册
router.post(`/${prefix}/register_email`, async (req, env, ctx) => {
    const { username, password, email, code } = await req.json();
    const user = new UserModel.User(req, env, ctx);
    const data = await user.register(username, password, email, code);
    return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
});

export default router;