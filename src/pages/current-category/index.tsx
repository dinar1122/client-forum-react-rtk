import React from 'react';
import { useGetCategoryByIdQuery } from '../../app/services/categoryApi';
import { Link, useParams } from 'react-router-dom';

import TopicWrapper from '../../components/topic-wrapper';
import { subscribedCategoryNTopics } from '../../utils/subscribed-data';
import { useSelector } from 'react-redux';
import { selectUserLike } from '../../features/UserSlice';
import CategoryItem from '../../components/category-item';

const CurrentCategory = () => {
  const { id = '' } = useParams<{ id: string }>();
  const {
    data: category ,
    isLoading,
    isError,
  } = useGetCategoryByIdQuery(id);
  const { subscribedCategoryNTopicsData } = subscribedCategoryNTopics();

  const likedData = useSelector(selectUserLike);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data</div>;
  }

  const topicArrayWithLikes = category?.topics.map((topicItem: any) => {
    const isLiked = likedData?.some((el: any) => el.topicId == topicItem.id);
    return {
      ...topicItem,
      isLiked,
    };
  });
if(category)
  return (
    <div className="flex flex-col justify-between">
      <CategoryItem
        description={category.description}
        name={category.name}
        avatarUrl={category.avatarUrl}
        categoryId={category.id}
        followers={category.followers}
        subscribedCategoryNTopicsData={subscribedCategoryNTopicsData}
        subsCount={category._count.categorySubs}
        topicCount={category._count.topics}
      />

      <TopicWrapper
        followingList={topicArrayWithLikes}
        subscribedCategoryNTopicsData={subscribedCategoryNTopicsData}
      />
    </div>
  );
};

export default CurrentCategory;
