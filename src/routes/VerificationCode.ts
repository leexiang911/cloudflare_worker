import { Router } from 'itty-router';
import { sendEmail } from '../utils/sendEmail';
import { VerificationCodeModel } from '../model/VerificationCode';
const router = Router();
// 验证码路由
const prefix = 'verification_code'; // 用于标识路由的前缀

// 发送验证码
router.post(`/${prefix}/send`, async (req, env, ctx) => {
    const { email, purpose } = await req.json();

    // const verificationCode = new VerificationCodeModel.VerificationCode(req, env, ctx);
    // const data = await verificationCode.sendVerificationCode(email, purpose);
    return new Response(JSON.stringify({ email, purpose }), { headers: { 'Content-Type': 'application/json' } });
});