
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
// 管理员
import adminRouter from './admin'
// 验证码
import verificationCodeRouter from './VerificationCode'


// 导出路由
export default {
    userRouter,
    contentRouter,
    collectionRouter,
    interactionRouter,
    payRouter,
    adminRouter,
    verificationCodeRouter
}