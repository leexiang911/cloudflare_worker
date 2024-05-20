// 折扣路由
import { Router } from "itty-router";
const router = Router();
const prefix = "discount"; // 用于标识路由的前缀

// 获取折扣列表
router.get(`/${prefix}/list`, async (req) => {
  console.log(req);
  return new Response("Hello, World!", { status: 200 });
  // ...
});

// 获取折扣详情
router.get(`/${prefix}/detail`, async (req) => {
  // ...
});


// 修改折扣
router.post(`/${prefix}/modify`, async (req) => {
  // ...
});

// 删除折扣
router.post(`/${prefix}/delete`, async (req) => {
  // ...
});

// 发布折扣
router.post(`/${prefix}/publish`, async (req) => {
  // ...
});

// 为折扣添加内容
router.post(`/${prefix}/add-content`, async (req) => {
  // ...
});

// 从折扣中移除内容
router.post(`/${prefix}/remove-content`, async (req) => {
  // ...
});

export default router;