import React, { useState } from 'react'
import { CreatePost } from '../../components/create-post'
import { useGetAllPostsQuery } from '../../app/services/postsApi'
import { Card } from '../../components/card'
import { Pagination, Card as CardNext, CardBody, Button, Select, SelectItem } from '@nextui-org/react'
import { useSearchParams } from 'react-router-dom'
import { TbArrowsSort } from 'react-icons/tb'


export default function Posts() {

  const postsOptions = [
    { id: 1, name: 'Популярное', icon: null },
    { id: 2, name: 'Ваша лента ', icon: null},
    { id: 3, name: 'Свежее', icon: null},
    { id: 4, name: 'Ваши теги', icon: null},

  ];
  const [selectedPostsOption, setSelectedPostsOPtion] = useState(postsOptions[0]?.name)

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const { data, isLoading, isError } = useGetAllPostsQuery({ page });


  const handleSelectPage = (selectedPage:any) => {
    setSearchParams({ page: selectedPage });
  };

  const handleSelectPostsOption = (e:any) => {
    setSelectedPostsOPtion(e.target.value)
  } 
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts</div>;
  return (
    <>
      <CreatePost></CreatePost>
      <CardNext className='mt-3 '>
        <CardBody className='flex-row justify-between'>
          <Pagination onChange={handleSelectPage} size='lg' variant='bordered' showControls total={data?.totalPages || 1} initialPage={1} />
          <div className='flex gap-2'>
            
            <Select
              aria-label="Популярное"
              size='md'
              placeholder="Популярное"
              className="max-w-xl w-[250px]" 
              value={selectedPostsOption} 
              onChange={handleSelectPostsOption} >
            {postsOptions.map((el:any) => {
             return <SelectItem  key={el.id} value={el.name}>{el.name}</SelectItem>
            })}
            </Select>
    <Button isIconOnly><TbArrowsSort /></Button>
          </div>
        </CardBody>
      </CardNext>
      {
        data ? data.posts.map((postData) => {
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
            commentsCount={postData._count.comments}
            likesCount={postData._count.likes}
            dislikesCount={postData._count.dislikes}
            topicData={postData.topic}
            categoryData={postData.category}
            tagsData={postData.postTags}
          />
        }) : <></>
      }
    </>
  )
}
