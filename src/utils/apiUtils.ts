import { CryptUtil } from './crypt'

class apiUtils {
    //   允许跨域的列表
    private static allowOriginList = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'];
    //   允许跨域请求的方法
    private static allowMethods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];

    //  JWT需要鉴权的接口
    private static needAuthList: [{
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS',
        path: string,
        auth: 'admin' | 'user' | 'all'
    }] | [] = [
            { method: "POST", path: "/user", auth: "all" },
        ];



    //   设置跨域头
    public static setCorsHeaders(response: Response) {
        response.headers.set('Content-Type', 'application/json');
        response.headers.set('Access-Control-Allow-Origin', this.allowOriginList.join(','));
        response.headers.set('Access-Control-Allow-Methods', this.allowMethods.join(','));
        response.headers.set('Access-Control-Max-Age', '86400');
        return response;
    }

    //   设置JWT头
    public static async setJWT_header(res: Response, jwt: { data: { id: number, email: string | null }, role: 'admin' | 'user', exp: number }) {
        const tokenStr = JSON.stringify(jwt);
        const token = await CryptUtil.encryptData(tokenStr);
        res.headers.set('Authorization', 'Bearer,' + token);
        return res; ``
    }

    //   验证JWT
    public static async verifyJWT(req: Request): Promise<string | null> {
        // 先检查请求的JWt鉴权列表
        const path = req.url;
        const method = req.method as 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS';
        const needAuth = this.needAuthList.find(item => path.startsWith(item.path) && item.method === method);

        // 如果不在鉴权列表中，直接返回
        if (!needAuth) {
            return null;
        }
        // 如果在鉴权列表中，验证JWT
        const token = req.headers.get('Authorization');
        if (!token) {
            return '401';
        }
        const tokenStr = token.split(',')[1];
        const jwt = await CryptUtil.decryptData(tokenStr);
        // 解密jwt通过，再将过期时间增加
        const jwtObj = JSON.parse(jwt);
        if (jwtObj.exp < Date.now()) {
            return '401';
        }
        return jwt;

    }

    // 负责组装返回给客户端的数据格式
    // code: 状态码分几种
    // 200: 成功
    // 400: 客户端错误
    // 401: 未授权
    // 403: 禁止访问
    // 404: 未找到

    // 500: 服务端错误
    // 501: 未实现
    // 502: 网关错误
    // 503: 服务不可用
    // 504: 网关超时
    // 505: HTTP版本不受支持

    // message: 提示信息分几种
    // 成功提示信息、失败提示信息、错误提示信息
    // data: 返回的数据，null或者对象

    /**
     * 返回给客户端的数据格式
     * @param data 数据
     * @param status 状态码
     * @param message 消息
     * @returns Response
     */
    public static returnRespanse(data: object, status: number, message: string): Response {
        const res = new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' }, status, statusText: status === 200 ? 'OK' : 'Error' });
        return res;
    }
}