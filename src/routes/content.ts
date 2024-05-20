// 内容路由模块
import { Router } from "itty-router";
const router = Router();
const prefix = "content"; // 用于标识路由的前缀

// 获取内容列表
router.get(`/${prefix}/list`, async (req) => {
  console.log(req);
  return new Response("fangwcg", { status: 200 });
  // ...
});

// 获取内容详情
router.get(`/${prefix}/detail`, async (req) => {
  // ...
});

// 修改内容
router.post(`/${prefix}/modify`, async (req) => {
  // ...
});

// 删除内容
router.post(`/${prefix}/delete`, async (req) => {
  // ...
});

// 发布内容
router.post(`/${prefix}/publish`, async (req) => {
  // ...
});


export default router;