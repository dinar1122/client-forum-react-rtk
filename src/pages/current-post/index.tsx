import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetPostByIdQuery } from '../../app/services/postsApi'
import { Card } from '../../components/card'
import { BackButton } from '../../components/UI/back-button'
import { CommentCreator } from '../../components/comment-creator'
import { CommentCard } from '../../components/card-comment'
import { useSelector } from 'react-redux'
import { selectCurrentTagsSubs } from '../../features/UserSlice'

const CurrentPost = () => {
  const params = useParams<{id: string}>()
  const {data, isLoading, isError} = useGetPostByIdQuery(params?.id ?? '')
  const dataUserTagsSubs = useSelector(selectCurrentTagsSubs)
  const subscribedTagIds = new Set(dataUserTagsSubs?.map((sub:any) => sub.tagId));
  console.log(subscribedTagIds)

  if(isLoading) {
    return <h2>Загрузка ...</h2>
    }
    

  if(isError) {
    return <h2>{isError}</h2>
    }
    
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
    category,
    postTags
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
        tagsData={postTags}
        subscribedTagIds={subscribedTagIds}
      />
      <div className="mt-10">
        <CommentCreator />
      </div>
      <div className="mt-10">
        {data.comments
          ? data.comments.map((comment) => (
              
              (!comment.replyToCommentId && <div key={comment.id}><CommentCard
                comment={comment}
                key={comment.id}
                avatarUrl={comment.user.avatarUrl ?? ""}
                content={comment.content}
                name={comment.user.username ?? ""}
                authorId={comment.userId}
                commentId={comment.id}
                createdAt={comment.createdAt}
                id={id}
              />
              {comment.replies.map((replied:any) => {
                return <CommentCard 
                key={replied.id}
                reply={true}
                comment={replied} 
                commentId={replied.id}
                name={replied.user.username ?? ""}  
                avatarUrl={replied.user.avatarUrl ?? ""} 
                content={replied.content} 
                authorId={replied.user.id}
                createdAt={replied.createdAt}
                />
              })}</div>)
            ))
          : null}
      </div>
    </>
  )
}

export default CurrentPost