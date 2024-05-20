// 合集路由
import { Router } from "itty-router";
const router = Router();
const prefix = "collection"; // 用于标识路由的前缀

// 获取合集列表
router.get(`/${prefix}/list`, async (req) => {
  console.log(req);
  return new Response("Hello, World!", { status: 200 });
  // ...
});

// 获取合集详情
router.get(`/${prefix}/detail`, async (req) => {
  // ...
});

// 修改合集
router.post(`/${prefix}/modify`, async (req) => {
  // ...
});

// 删除合集
router.post(`/${prefix}/delete`, async (req) => {
  // ...
});

// 发布合集
router.post(`/${prefix}/publish`, async (req) => {
  // ...
});

// 为合集添加内容
router.post(`/${prefix}/add-content`, async (req) => {
  // ...
});

// 从合集中移除内容
router.post(`/${prefix}/remove-content`, async (req) => {
  // ...
});

export default router;