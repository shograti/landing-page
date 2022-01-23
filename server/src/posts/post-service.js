const { promisify } = require("util");
const { TechnicalError, NotFoundError } = require("../common");
const { LOG } = require("../common");

function mapPost(post) {
    return {
        id: post.post_id,
        img: post.post_img,
        content: post.post_content,
    };
}

function createPostService (db) {
    const query = promisify(db.query.bind(db));
      
    return {
        async createPost({ img, content }) {
            try {
                const result = await query("INSERT INTO posts (post_content, post_img) VALUES (?,?)", [content, img]);
                return result.id;
            } catch (error) {
                LOG.error(error);
                throw new TechnicalError();
            }
        },
        async getPosts() {
            try {
                const posts = await query("SELECT * FROM posts");
                return posts.map(mapPost);
            } catch (error) {
                LOG.error(error);
                throw new TechnicalError();
            }
        },
        async getPost(id) {
            try {
                const [post] = await query("SELECT * FROM posts WHERE post_id = ?", [id]);
                if (!post) {
                    throw new NotFoundError(`Post [${id}] not found`);
                }
                return mapPost(post);
            } catch (error) {
                LOG.error(error);
                throw error instanceof NotFoundError ? error : new TechnicalError();
            }
        },
        async deletePost(id) {
            try {
                const [post] = await query("SELECT * FROM posts WHERE post_id = ?", [id]);
                if (!post) {
                    throw new NotFoundError(`Post [${id}] not found`);
                }
                await query("DELETE FROM posts WHERE post_id = ?", [id]);
            } catch (error) {
                LOG.error(error);
                throw error instanceof NotFoundError ? error : new TechnicalError();
            }
        },
        async updatePost(id, { img, content }) {
            try {
                const [post] = await query("SELECT * FROM posts WHERE post_id = ?", [id]);
                if (!post) {
                    throw new NotFoundError(`Post [${id}] not found`);
                }
                await query("UPDATE posts SET img = ?, content = ? WHERE post_id = ?", [img, content, id]);
            } catch (error) {
                LOG.error(error);
                throw error instanceof NotFoundError ? error : new TechnicalError();
            }
        }
    };
}

module.exports = { createPostService };