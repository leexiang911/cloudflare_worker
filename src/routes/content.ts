// 内容路由模块
import { Router } from "itty-router";
import { setCorsHeaders } from "../utils/CORS";


const router = Router();
const prefix = "content"; // 用于标识路由的前缀
// import model_Content from '../model/Content'

// 获取内容列表
router.get(`/${prefix}/list`, async (req, env, ctx) => {
  const { results } = await env.DB.prepare('SELECT * FROM Contents').all();

  const resp = new Response(JSON.stringify(results));
  // await sendEmail.fetch(req);
  return setCorsHeaders(resp);
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