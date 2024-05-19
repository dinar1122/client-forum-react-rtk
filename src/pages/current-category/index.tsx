import React from 'react'
import { categoryApi, useGetCategoryByIdQuery } from '../../app/services/categoryApi'
import { Link, useParams } from 'react-router-dom';
import { Card, CardBody } from '@nextui-org/react';
import CategoryHeader from '../../components/category-header';
import { formatToClientDate } from '../../utils/format-to-client-date';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
import { FaFire } from 'react-icons/fa';

const CurrentCategory = () => {
  const { id = '' } = useParams<{ id: string }>();
  const { data: category = '', isLoading, isError } = useGetCategoryByIdQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data</div>;
  }

  return (

    <div className="gap-5 flex flex-col justify-between max-w-[770px]">
      <CategoryHeader description={category.description} name={category.name} avatarUrl={category.avatarUrl} isSubscribed={category.isSubscribed} categoryId={category.id} />
      <Card><CardBody>Create</CardBody></Card>
      {category.topics.map((topic: any) => {
        return <div key={topic.id}>
          <Card className='text-xl font-semibold text-gray-700'>
            <Link to={`topic/${topic.id}`} className='flex-row justify-end'>
              <CardBody>Тема: {topic.name} </CardBody> 
              
              <CardBody className='max-w-[max-content] text-gray-400'>постов в теме: {topic.posts.length} </CardBody> 
              <CardBody className='max-w-[max-content] m-[auto]'><MdKeyboardDoubleArrowDown type='button'/></CardBody>
            </Link>
          </Card>
          {topic.posts.map((post: any) => {
            return <Link key={post.id} to={`/posts/${post.id}`}>
              <Card className='m-2 ml-5 mr-0 hover:scale-[104%] transition hover:bg-sky-200 flex-row justify-end' >
                <CardBody className='font-semibold'>{JSON.parse(post.content)[0].componentText}</CardBody>
                <CardBody className='max-w-[max-content] font-semibold'>{post.author.username}</CardBody>
                <CardBody className='max-w-[max-content] font-semibold text-gray-500'>{formatToClientDate(post.createdAt)}</CardBody>
              </Card>
            </Link>
          })}
        </div>

      })}

    </div>
  )
}

export default CurrentCategory