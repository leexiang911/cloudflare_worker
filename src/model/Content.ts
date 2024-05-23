// 定义一个类容模型
export interface Env {
    // If you set another name in wrangler.toml as the value for 'binding',
    // replace "DB" with the variable name you defined.
    DB: D1Database;
}
class Content {
    id: number;
    title: string;
    subTitle: string;
    thumbnail: string;
    coverImage: string;
    description: string;
    type: string;
    collectionId: number;
    price: number;
    publishTime: number;

    constructor(id: number, title: string, subTitle: string, thumbnail: string, coverImage: string, description: string, type: string, collectionId: number, price: number, publishTime: number) {
        this.id = id;
        this.title = title;
        this.subTitle = subTitle;
        this.thumbnail = thumbnail;
        this.coverImage = coverImage;
        this.description = description;
        this.type = type;
        this.collectionId = collectionId;
        this.price = price;
        this.publishTime = publishTime;
    }

    // 增加内容
    addContent(env: Env, ctx: ExecutionContext) {
        // 在这里实现增加内容的逻辑
    }

    // 删除内容
    deleteContent() {
        // 在这里实现删除内容的逻辑
    }

    // 修改内容
    updateContent() {
        // 在这里实现修改内容的逻辑
    }

    // 查询内容
    async queryContent(env: Env, ctx: ExecutionContext) {
        // 在这里实现查询内容的逻辑
        // 从数据库中查询内容
        const { results } = await env.DB.prepare('SELECT * FROM Content WHERE id = ?').bind(3).all();
        return results;
    }
}

export default Content;