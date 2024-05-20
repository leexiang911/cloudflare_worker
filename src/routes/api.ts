// 认证路由
import authRouter from './authentication'
// 用户路由
import userRouter from './user'
// 内容路由
import contentRouter from './content'
// 合集路由
import collectionRouter from './collection'
// 交互路由
import interactionRouter from './interaction'
// 支付
import payRouter from './payment'


// 导出路由
export default {
    authRouter,
    userRouter,
    contentRouter,
    collectionRouter,
    interactionRouter,
    payRouter
}