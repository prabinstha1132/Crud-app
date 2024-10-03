const paths = {
    home() {
        return '/'
    },
    topicShow(topicSLug: string) {
        return `/topics/${topicSLug}`;
    },
    PostCreate(topicSlug: string) {
        return `/topics/${topicSlug}/posts/new`
    },
    PostShow(topicSlug: string, postId: string) {
        return `/topics/${topicSlug}/posts/${postId}`;
    }
}
export default paths;