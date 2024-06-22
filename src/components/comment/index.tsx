import React from 'react';
import { CommentCard } from '../card-comment';

export const Comment = ({ comment, id, level = 1, maxDepth = 5, isReply = false, replyComment = null, isLast = false }: any) => {
    const limitTree = level < maxDepth

    return (
        <div key={comment.id} className={`${isReply && limitTree ? 'comment-container' : ``} `}>
            {isReply && (
                <>
                    <div className="reply-line"></div>
                    <div  className={isLast ? "vertical-line-short" : "vertical-line"}></div>
                </>
            )}
            <CommentCard
                replyComment={replyComment}
                reply={isReply}
                comment={comment}
                avatarUrl={comment.user.avatarUrl ?? ""}
                content={comment.content}
                name={comment.user.username ?? ""}
                authorId={comment.userId}
                commentId={comment.id}
                createdAt={comment.createdAt}
                id={id}
            />
            {comment.replies && comment.replies.length > 0 && (
                <div className={limitTree ? `ml-10 ` : ``}>
                    {comment.replies.map((replied: any, index: number) => {
                        const isLastReply = index === comment.replies.length - 1
                        console.log(comment, comment.replies)
                        return (
                            <Comment
                                key={replied.id}
                                comment={replied}
                                id={id}
                                level={level + 1}
                                maxDepth={maxDepth}
                                isReply={true}
                                replyComment={comment}
                                isLast={isLastReply}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};
