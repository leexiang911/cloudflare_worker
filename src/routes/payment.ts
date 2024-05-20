// 支付路由
import { Router } from "itty-router";
const router = Router();
const prefix = "payment"; // 用于标识路由的前缀

// 发起支付
router.post(`/${prefix}/pay`, async (req) => {
  const { id, amount } = await req.json();
  return new Response(`支付成功，id: ${id}, amount: ${amount}`);
});

// 查询支付状态
router.get(`/${prefix}/status`, async (req) => {
  const { id } = req.params;
  return new Response(`支付状态查询成功，id: ${id}`);
});


export default router;