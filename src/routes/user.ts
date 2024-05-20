// 用户路由
import { Router } from 'itty-router';
const router = Router();
const prefix = 'user'; // 用于标识路由的前缀

// 获取用户信息
router.get(`/${prefix}/info`, async (req) => {
  console.log(req);
  return new Response('Hello, World!', { status: 200 });
  // ...
});

// 修改用户信息
router.post(`/${prefix}/modify`, async (req) => {
  // ...
});


export default router;