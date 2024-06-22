import React, { useState } from 'react';
import { Comment } from '../comment';

export const CommentTree = ({ comments, id }:any) => {
  const [isLineGlowing, setLineGlowing] = useState(false);

  return (
    <div className="mt-10">
      {comments.map((comment:any) => (
        !comment.replyToCommentId && (
          <Comment
            key={comment.id}
            comment={comment}
            id={id}
            isLineGlowing={isLineGlowing}
            setLineGlowing={setLineGlowing}
          />
        )
      ))}
    </div>
  );
};
