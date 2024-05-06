import React from 'react'
import { CreatePost } from '../../components/create-post'
import { useGetAllPostsQuery } from '../../app/services/postsApi'
import { Card } from '../../components/card'


export default function Posts() {
  const { data } = useGetAllPostsQuery()
  
  return (
    <>
      <CreatePost></CreatePost>
      {
        data ? data.map((postData) => {
          return <Card 
          key={postData.id}
          avatarUrl={postData.author.avatarUrl} 
          name={postData.author.username} 
          authorId={postData.authorId} 
          content={postData.content} 
          cardFor={'post'} 
          id={postData.id}
          likedByUser={postData.likedByUser}
          dislikedByUser={postData.dislikedByUser}
          createdAt={postData.createdAt}
          commentsCount={postData.comments.length}
          likesCount={postData.likes.length}
          dislikesCount={postData.dislikes.length}
          topicData={postData.topic}
          categoryData={postData.category}
          />
        }) : <></>
      }
    </>
  )
}
