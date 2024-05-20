// 推荐内容
import { Router } from "itty-router";
const router = Router();
const prefix = "recommendation"; // 用于标识路由的前缀

// 获取推荐内容list
router.get(`/${prefix}/list`, async (req) => {
  console.log(req);
  return new Response("Hello, World!", { status: 200 });
  // ...
});


// 添加推荐内容
router.post(`/${prefix}/add`, async (req) => {
  // ...
});

// 修改推荐内容
router.post(`/${prefix}/modify`, async (req) => {
  // ...
});

// 删除推荐内容
router.post(`/${prefix}/delete`, async (req) => {
  // ...
});

// 发布推荐内容
router.post(`/${prefix}/publish`, async (req) => {
  // ...
});

// 为推荐内容添加内容
router.post(`/${prefix}/add-content`, async (req) => {
  // ...
});

// 从推荐内容中移除内容
router.post(`/${prefix}/remove-content`, async (req) => {
  // ...
});

export default router;