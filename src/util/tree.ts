import { FeedComment } from "@/types/apis/comment";

export function createCommentTree(data: FeedComment[]) {
  // 먼저 모든 댓글을 commentId를 키로 갖는 객체로 변환합니다.
  const commentMap: any = {};
  data.forEach((comment) => {
    comment.children = [];
    commentMap[comment.commentId] = comment;
  });

  // 루트 댓글을 저장할 배열입니다.
  const commentTree: any = [];

  // 각 댓글을 적절한 위치에 삽입합니다.
  data.forEach((comment) => {
    if (comment.parentCommentId === null) {
      // parentCommentId가 0이면 루트 댓글입니다.
      commentTree.push(comment);
    } else {
      // 그렇지 않으면 parentCommentId에 해당하는 댓글의 children 배열에 추가합니다.
      if (comment.parentCommentId) {
        const parentComment = commentMap[comment.parentCommentId];
        if (parentComment) {
          parentComment.children.push(comment);
        }
      }
    }
  });

  return commentTree;
}
