// 管理者路由
import { Router } from 'itty-router';
const router = Router();
const prefix = 'management'; // 用于标识路由的前缀

// 发布内容审核
router.post(`/${prefix}/audit`, async (req) => {
  const { id, status } = await req.json();
  return new Response(`审核成功，id: ${id}, status: ${status}`);
});

// 获取用户列表
router.get(`/${prefix}/user/list`, async (req) => {
  return new Response('获取用户列表成功');
});

// 获取用户详情
router.get(`/${prefix}/user/detail`, async (req) => {
  const { id } = req.query;
  return new Response(`获取用户详情成功，id: ${id}`);
});

// 审核用户评论
router.post(`/${prefix}/user/comment/audit`, async (req) => {
  const { id, status } = await req.json();
  return new Response(`审核用户评论成功，id: ${id}, status: ${status}`);
});