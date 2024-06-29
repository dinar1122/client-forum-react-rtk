
import { Comment } from '../comment';

type CommentTreeProps = {
  comments: any[];
  id: string;
};


export const CommentTree = ({ comments, id }:CommentTreeProps) => {
  return (
    <div className="mt-10">
      {comments.map((comment:any) => (
        !comment.replyToCommentId && (
          <Comment
            key={comment.id}
            comment={comment}
            id={id}
          />
        )
      ))}
    </div>
  );
};
