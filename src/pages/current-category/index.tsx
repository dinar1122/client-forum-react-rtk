import React from 'react'
import { categoryApi, useGetCategoryByIdQuery } from '../../app/services/categoryApi'
import { Link, useParams } from 'react-router-dom';
import { Card, CardBody } from '@nextui-org/react';
import CategoryHeader from '../../components/category-header';
import { formatToClientDate } from '../../utils/format-to-client-date';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
import { FaFire } from 'react-icons/fa';
import FollowingTopicWrapper from '../../components/following-topic-wrapper';

const CurrentCategory = () => {
  const { id = '' } = useParams<{ id: string }>();
  const { data: category = '', isLoading, isError } = useGetCategoryByIdQuery(id);
  console.log(category.topics)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data</div>;
  }

  return (

    <div className="flex flex-col justify-between">

      <CategoryHeader 
      description={category.description} 
      name={category.name} 
      avatarUrl={category.avatarUrl} 
      isSubscribed={category.isSubscribed} 
      categoryId={category.id}
      followers={category.followers}
       />

      <FollowingTopicWrapper 
      followingList={category.topics} 
      isNested={true}/>

    </div>
  )
}

export default CurrentCategory