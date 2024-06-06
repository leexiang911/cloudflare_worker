// 用户模型，用户注册，用户登录，用户信息修改等操作
import type { IRequest } from "itty-router";
import { VerificationCodeModel } from './VerificationCode';



export namespace UserModel {

    export interface UserType {
        id: number;
        username: string;
        password: string;
        nickname: string | null;
        avatar: string | null;
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
        async register(username: string, password: string, email: string, code: string) {
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
                return { code: 400, message: '邮箱已被注册', data: null };
            }

            // 查询验证码是否正确
            const verify_code = await new VerificationCodeModel.VerificationCode(this.req, this.env, this.ctx).verifyVerificationCode(email, code, 'register');

            // 验证码错误 verify_code就是 null
            if (!verify_code) {
                return { code: 400, message: '验证码错误' };
            }

            // 注册用户
            const create_time = new Date().toISOString();
            await this.env.DB.prepare(`INSERT INTO ${this.tableName} (username, password, email, create_time) VALUES (?, ?, ?, ?)`)
                .bind(username, password, email, create_time).run();

            // 改变验证码状态
            await new VerificationCodeModel.VerificationCode(this.req, this.env, this.ctx).useVerificationCode(verify_code.id);

            return {
                code: 200, message: '注册成功', data: {
                    is_data,
                    is_email,
                    verify_code
                }
            };

        }

        // 查询邮箱注册的用户是否存在，存在就返回这个用户，不存在就返回null
        async isEmailRegistered(email: string): Promise<UserType | null> {
            return await this.env.DB.prepare(`SELECT id, email FROM ${this.tableName} WHERE email = ?`)
                .bind(email).first();
        }
        // 邮箱登录，邮箱验证码登录
        async loginByEmail(email: string, code: string): Promise<{ code: 200 | 400, message: string, data: UserType | null }> {
            // 查询验证码是否正确
            const verify_code = await new VerificationCodeModel.VerificationCode(this.req, this.env, this.ctx).verifyVerificationCode(email, code, 'login');

            // 验证码错误 verify_code就是 null
            if (!verify_code) {
                return { code: 400, message: '验证码错误', data: null };
            }

            // 查询用户是否存在
            const user: UserType | null = await this.env.DB.prepare(`SELECT * FROM ${this.tableName} WHERE email = ?`)
                .bind(email).first();

            if (!user) {
                return { code: 400, message: '用户不存在', data: null };
            }

            // 改变验证码状态
            await new VerificationCodeModel.VerificationCode(this.req, this.env, this.ctx).useVerificationCode(verify_code.id);

            return { code: 200, message: '登录成功', data: user };
        }

        // 账号密码登录
        async loginByUsername(username: string, password: string): Promise<UserType | null> {
            // 查询用户是否存在
            const user: UserType | null = await this.env.DB.prepare(`SELECT * FROM ${this.tableName} WHERE username = ? AND password = ?`)
                .bind(username, password).first()
            return user;
        }
    }

}