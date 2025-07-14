/**
 * 一种更优雅的 async/await 错误处理模式
 * async function loadPageData(userId){const [userError,user]= await to(fetchUserById(userId));if(userError |l !user){return console.error('获取用户失败:"，userError);
 * console.log('用户信息:'，user.name);
 * const [postsError, posts]= await to(fetchPostsByUserId(user.id));if(postsError l| !posts){
 * return console.error('获取文章失败:'， postsError);console.log('用户文章:，posts);
 * const [commentsError, comments]= await to(fetchCommentsForPosts(posts[0].id));if(commentsError ll !comments){return console.error('获取评论失败:"，commentsError);
 * console.log(文章评论:，comments)
 */
const useTo = () => {
    const to = <T>(promise: Promise<T>): Promise<[Error | null, T | undefined]> => {
        return promise
            .then<[null, T]>((data: T) => [null, data])
            .catch<[Error, undefined]>((err: Error) => [err, undefined]);
    };
    return to;
};

export default useTo;
