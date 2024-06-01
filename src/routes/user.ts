// 用户路由
import { Router } from 'itty-router';
import { UserModel } from '../model/User';
const router = Router();
const prefix = 'user'; // 用于标识路由的前缀
// 用户注册＿邮箱验证码注册
router.post(`/${prefix}/register`, async (req, env, ctx) => {
    const body: UserModel.UserType = await req.json();
    return new Response(JSON.stringify(body), { headers: { 'Content-Type': 'application/json' } });
});

export default router;