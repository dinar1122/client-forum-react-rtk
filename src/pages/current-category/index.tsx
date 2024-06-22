import React from 'react'
import {  useGetCategoryByIdQuery } from '../../app/services/categoryApi'
import { Link, useParams } from 'react-router-dom';

import CategoryHeader from '../../components/category-header';
import TopicWrapper from '../../components/topic-wrapper';
import { subscribedCategoryNTopics } from '../../utils/subscribed-data';
import { useSelector } from 'react-redux';
import { selectUserLike } from '../../features/UserSlice';

const CurrentCategory = () => {
  const { id = '' } = useParams<{ id: string }>();
  const { data: category = '', isLoading, isError } = useGetCategoryByIdQuery(id);
  const {subscribedCategoryNTopicsData} = subscribedCategoryNTopics()

    const likedData = useSelector(selectUserLike)
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data</div>;
  }


  const topicArrayWithLikes = category.topics.map((topicItem: any) => {
    const isLiked = likedData?.some((el: any) => el.topicId == topicItem.id);
    return {
        ...topicItem,
        isLiked
    };
});

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
      followingList={topicArrayWithLikes} 
      subscribedCategoryNTopicsData={subscribedCategoryNTopicsData}

/>

    </div>
  )
}

export default CurrentCategory