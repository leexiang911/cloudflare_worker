// 内容路由模块
import { Router } from "itty-router";
const router = Router();
const prefix = "content"; // 用于标识路由的前缀
// import model_Content from '../model/Content'

// 获取内容列表
router.get(`/${prefix}/list`, async (req,env,ctx) => {
  // // console.log(req);
  // const headers = req.headers.get('content-type' || 'Content-Type');
  // const body = await req.json();
  // // 将req，env，ctx组装成json返回给前端
  // const content = new model_Content(1, 'title', 'subTitle', 'thumbnail', 'coverImage', 'description', 'type', 1, 0, 0);
  // const data = await content.queryContent(env, ctx);
  // return Response.json(data);
  // return new Response(JSON.stringify({req,headers,env,ctx,body}), { status: 200 });
  // ...
  const { results } = await env.DB.prepare('SELECT * FROM Content').all();
  return  Response.json(results);
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