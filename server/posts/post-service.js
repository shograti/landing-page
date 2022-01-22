const { promisify } = require("util");
const { TechnicalError } = require('../common/exceptions');

function mapPost(post) {
    return {
        img: post.post_img,
        content: post.post_content,
    }
}

function createPostService (db) {
    const query = promisify(db.query.bind(db));
      
    return {
        async createPost({ img, content }) {
            try {
                const result = await query("INSERT INTO posts (post_content, post_img) VALUES (?,?)", [content, img]);
                return result.id;
            } catch (error) {
                console.log(error);
                throw new TechnicalError();
            }
        },
        async getPosts() {
            try {
                const posts = await query('SELECT * FROM posts');
                console.log(posts.map(mapPost))
                return posts.map(mapPost);
            } catch (error) {
                console.log(error);
                throw new TechnicalError();
            }
        }
    };
}

module.exports = { createPostService }