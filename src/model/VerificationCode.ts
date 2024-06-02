import type { IRequest } from "itty-router";
import { sendEmail } from "../utils/sendEmail";
import { UserModel } from "./User";

// 创建验证码模型
export namespace VerificationCodeModel {
    export interface VerificationCodeType {
        id: number;
        email: string;
        code: string;
        create_time: string;
        expire_time: string;
        is_used: 0 | 1;
        purpose: 'register' | 'login' | 'reset_password' | 'remove_user'
    }

    export class VerificationCode {
        readonly tableName = 'VerificationCode';
        req: IRequest;
        env: Env;
        ctx: ExecutionContext;
        constructor(req: IRequest, env: Env, ctx: ExecutionContext) {
            this.req = req;
            this.env = env;
            this.ctx = ctx;
        }

        // 发送验证码
        async sendVerificationCode(email: string, purpose: VerificationCodeType['purpose']) {


            // 先看这个邮箱上个验证码是否过期，如果没有过期，就不发送新的验证码，提示用户操作频繁
            const is_data = await this.env.DB.prepare(`SELECT * FROM ${this.tableName} WHERE email = ? AND purpose = ? AND is_used = 0 AND expire_time > ?`)
                .bind(email, purpose, new Date().toISOString()).first();

            if (is_data) {
                return { code: 400, message: '操作频繁，请稍后再试', data: null };
            }
            // 如果是注册账号，先查询邮箱是否被注册
            if (purpose === 'register') {
                const is_registered = await new UserModel.User(this.req, this.env, this.ctx).isEmailRegistered(email);
                if (is_registered) {
                    return { code: 400, message: '邮箱已被注册', data: null };
                }
            }
            

            // 生成验证码
            const code = Math.random().toString(36).slice(-6);
            // 发送验证码
            const data = await sendEmail(email, code);
            // 保存验证码
            await this.saveVerificationCode(email, code, purpose);
            return data;
        }

        // 保存验证码
        async saveVerificationCode(email: string, code: string, purpose: VerificationCodeType['purpose']) {
            // 发送时间
            const create_time = new Date().toISOString();
            // 过期时间加5分钟
            const expire_time = new Date(Date.now() + 5 * 60 * 1000).toISOString();

            await this.env.DB.prepare(`INSERT INTO ${this.tableName} (email, code, create_time, expire_time, is_used, purpose) VALUES (?, ?, ?, ?, ?, ?)`)
                .bind(email, code, create_time, expire_time, 0, purpose).run();
        }

        // 验证验证码
        async verifyVerificationCode(email: string, code: string, purpose: VerificationCodeType['purpose']): Promise<VerificationCodeType | null> {
            const data = await this.env.DB.prepare(`SELECT * FROM ${this.tableName} WHERE email = ? AND code = ? AND purpose = ? AND is_used = 0 AND expire_time > ?`)
                .bind(email, code, purpose, new Date().toISOString()).first() as VerificationCodeType | null;
            return data;
        }

        // 使用验证码
        async useVerificationCode(id: number) {
            await this.env.DB.prepare(`UPDATE ${this.tableName} SET is_used = 1 WHERE id = ?`)
                .bind(id).run();
        }


    }

}