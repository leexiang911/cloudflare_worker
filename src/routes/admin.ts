// 管理员路由
import { Router } from 'itty-router';
const router = Router();
const prefix = 'admin'; // 用于标识路由的前缀

// 登录管理员账号
router.post(`/${prefix}/login`, async (req) => {
  // ...
});

// 修改管理员密码
router.post(`/${prefix}/change-password`, async (req) => {
  // ...
});

export default router;