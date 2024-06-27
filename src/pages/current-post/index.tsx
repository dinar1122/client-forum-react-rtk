import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetPostByIdQuery } from '../../app/services/postsApi'
import { Card } from '../../components/card'
import { BackButton } from '../../components/UI/back-button'
import { CommentCreator } from '../../components/comment-creator'
import { useSelector } from 'react-redux'
import { selectCurrentTagsSubs } from '../../features/UserSlice'
import { CommentTree } from '../../components/comment-tree'

const CurrentPost = () => {
  const params = useParams<{ id: string }>()
  const { data, isLoading, isError } = useGetPostByIdQuery(params?.id ?? '')
  const dataUserTagsSubs = useSelector(selectCurrentTagsSubs)
  const subscribedTagIds = new Set(dataUserTagsSubs?.map((sub: any) => sub.tagId));


  if (isLoading) {
    return <h2>Загрузка ...</h2>
  }


  if (isError) {
    return <h2>{isError}</h2>
  }

  if (!data) {
    return <h2>Запись не найдена</h2>
  }
  const { content,
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
    _count,
    postTags
  } = data
  console.log(comments)
  return (
    <>
      
      <Card
        cardFor="current-post"
        avatarUrl={author?.avatarUrl ?? ""}
        content={content}
        name={author?.username ?? ""}
        likesCount={likes?.length}
        dislikesCount={dislikes?.length}
        commentsCount={_count.comments}
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
        && <CommentTree comments={data.comments} id={id} />
        }
    </div>
    </>
  )
}

export default CurrentPost