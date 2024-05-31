import type { IRequest } from "itty-router";
import { sendEmail } from "../utils/sendEmail";

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
            const create_time = new Date().toISOString();
            const expire_time = new Date(Date.now() + 10 * 60 * 1000).toISOString();
            await this.env.DB.prepare(`INSERT INTO ${this.tableName} (email, code, create_time, expire_time, is_used, purpose) VALUES (?, ?, ?, ?, ?, ?)`)
                .bind(email, code, create_time, expire_time, 0, purpose).run();
        }

        // 验证验证码
        async verifyVerificationCode(email: string, code: string, purpose: VerificationCodeType['purpose']) {
            const data = await this.env.DB.prepare(`SELECT * FROM ${this.tableName} WHERE email = ? AND code = ? AND purpose = ? AND is_used = 0 AND expire_time > ?`)
                .bind(email, code, purpose, new Date().toISOString()).run();
            return data;
        }

        // 使用验证码
        async useVerificationCode(id: number) {
            await this.env.DB.prepare(`UPDATE ${this.tableName} SET is_used = 1 WHERE id = ?`)
                .bind(id).run();
        }


    }

}