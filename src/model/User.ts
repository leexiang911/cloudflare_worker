// 用户模型，用户注册，用户登录，用户信息修改等操作
import type { IRequest } from "itty-router";



export namespace UserModel {

    export interface UserType {
        id: number;
        username: string;
        password: string;
        email: string | null;
        phone: string | null;
        wechat_id: string | null;
        create_time: string;
    }

    export class User {
        readonly tableName = 'User';
        req: IRequest;
        env: Env;
        ctx: ExecutionContext;
        constructor(req: IRequest, env: Env, ctx: ExecutionContext) {
            this.req = req;
            this.env = env;
            this.ctx = ctx;
        }

        /**
         * 账号注册＿邮箱验证码注册
         * @param username 用户名
         * @param password 密码
         * @param email 邮箱
         * @param code 验证码
         * @returns 
         */
        async register(username: string, password: string, email: string,code:string) {
            // 先查询用户名是否被注册
            const is_data = await this.env.DB.prepare(`SELECT * FROM ${this.tableName} WHERE username = ?`)
                .bind(username).first();
            if (is_data) {
                return { code: 400, message: '用户名已被注册', data: is_data };
            }

            // 查询邮箱是否被注册
            const is_email = await this.env.DB.prepare(`SELECT * FROM ${this.tableName} WHERE email = ?`)
                .bind(email).first();
            if (is_email) {
                return { code: 400, message: '邮箱已被注册', data: is_email };
            }
        }
    }

}