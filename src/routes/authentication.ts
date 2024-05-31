// 认证路由用于用户登录，注册，注销，绑定邮箱等
import { Router } from 'itty-router';
import { sendEmail } from '../utils/sendEmail';
import AuthModel from '../model/Auth';
const router = Router();
const prefix = 'auth'; // 用于标识路由的前缀

// 注册
router.post(`/${prefix}/register`, async (req, env, ctx) => {
  
  
});

// 登录
router.post(`/${prefix}/login`, async (req) => {
  // ...
});

// 注销
router.post(`/${prefix}/logout`, async (req) => {
  // ...
});

// 绑定邮箱
router.post(`/${prefix}/bind-email`, async (req) => {
  // ...
});

// 发送验证码
router.post(`/${prefix}/send-verification-code`, async (req) => {
  // ...
});

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }));

export default router;
