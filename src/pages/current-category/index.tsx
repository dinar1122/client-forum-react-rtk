import React from 'react'
import {  useGetCategoryByIdQuery } from '../../app/services/categoryApi'
import { Link, useParams } from 'react-router-dom';

import CategoryHeader from '../../components/category-header';
import TopicWrapper from '../../components/following-topic-wrapper';
import { subscribedCategoryNTopics } from '../../utils/subscribed-data';

const CurrentCategory = () => {
  const { id = '' } = useParams<{ id: string }>();
  const { data: category = '', isLoading, isError } = useGetCategoryByIdQuery(id);
  const {subscribedCategoryNTopicsData} = subscribedCategoryNTopics()

  

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
      categoryId={category.id}
      followers={category.followers}
      subscribedCategoryNTopicsData={subscribedCategoryNTopicsData}
       />

      <TopicWrapper 
      followingList={category.topics} 
      subscribedCategoryNTopicsData={subscribedCategoryNTopicsData}

/>

    </div>
  )
}

export default CurrentCategory