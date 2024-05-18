import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetPostByIdQuery } from '../../app/services/postsApi'
import { Card } from '../../components/card'
import { BackButton } from '../../components/UI/back-button'
import { CommentCreator } from '../../components/comment-creator'

const CurrentPost = () => {
  const params = useParams<{id: string}>()
  const {data} = useGetPostByIdQuery(params?.id ?? '')

  if(!data) {
    return <h2>Запись не найдена</h2>
  }
  
  const {content,
    id,
    authorId,
    comments,
    likes,
    dislikes,
    author,
    likedByUser,
    dislikedByUser,
    createdAt,
    topic,
    category
  } = data
  
  return (
    <>
    <BackButton></BackButton>
    <Card
        cardFor="current-post"
        avatarUrl={author?.avatarUrl ?? ""}
        content={content}
        name={author?.username ?? ""}
        likesCount={likes?.length}
        dislikesCount={dislikes?.length}
        commentsCount={comments?.length}
        authorId={authorId}
        id={id}
        likedByUser={likedByUser}
        dislikedByUser={dislikedByUser}
        createdAt={createdAt}
        topicData={topic}
        categoryData={category}
      />
      <div className="mt-10">
        <CommentCreator />
      </div>
      <div className="mt-10">
        {data.comments
          ? data.comments.map((comment) => (
              <Card
                cardFor="comment"
                key={comment.id}
                avatarUrl={comment.user.avatarUrl ?? ""}
                content={comment.content}
                name={comment.user.username ?? ""}
                authorId={comment.userId}
                commentId={comment.id}
                id={id}
              />
            ))
          : null}
      </div>
    </>
  )
}

export default CurrentPost