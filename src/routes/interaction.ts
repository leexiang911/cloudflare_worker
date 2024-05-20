// 交互路由
// 点赞、评论、收藏等交互操作的路由
import { Router } from "itty-router";
const router = Router();
const prefix = "interaction"; // 用于标识路由的前缀

// 点赞
router.post(`/${prefix}/like`, async (req) => {
  const { id } = await req.json();
  return new Response(`点赞成功，id: ${id}`);
});

// 评论
router.post(`/${prefix}/comment`, async (req) => {
  const { id, content } = await req.json();
  return new Response(`评论成功，id: ${id}, content: ${content}`);
});

// 转发
router.post(`/${prefix}/forward`, async (req) => {
  const { id } = await req.json();
  return new Response(`转发成功，id: ${id}`);
});

// 反馈
router.post(`/${prefix}/feedback`, async (req) => {
  const { content } = await req.json();
  return new Response(`反馈成功，content: ${content}`);
});

export default router;