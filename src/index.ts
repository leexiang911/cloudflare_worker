/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
export interface Env {
	// If you set another name in wrangler.toml as the value for 'binding',
	// replace "DB" with the variable name you defined.
	DB: D1Database;
}
import { Resend } from 'resend';
import ApiRouter from './routes/api';
import { setCorsHeaders } from './utils/CORS'
import { sendEmail } from './utils/sendEmail';
import { iv,key,Crypt } from './utils/crypt'

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const path = url.pathname;
		if (path.startsWith('/content/')) {
			return ApiRouter.contentRouter.handle(request, env, ctx);
		}
		if(path.startsWith('/user/')){
			return ApiRouter.userRouter.handle(request, env, ctx);
		}
		if(path.startsWith('/verification_code/')){
			return ApiRouter.verificationCodeRouter.handle(request, env, ctx);
		}
		// await sendEmail();
		const message=await  Crypt.encrypt('hello world',key,iv);
		return new Response(message +' 加密成功');
	},
};
