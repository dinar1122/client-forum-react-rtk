import React from 'react';
import { useGetUserByIdQuery } from '../../app/services/userApi';
import { useParams } from 'react-router-dom';
import FollowingWrapper from '../../components/following-wrapper';
import FollowingCategoryWrapper from '../../components/following-category-wrapper';
import FollowingTopicWrapper from '../../components/following-topic-wrapper';

export default function Subs() {
  const { id = '' } = useParams<{ id: string }>();
  const { data: user = '', isLoading, isError } = useGetUserByIdQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data</div>;
  }

  return (
    <div className="gap-5 flex flex-row justify-between ">

      <FollowingCategoryWrapper followingList={user.category}></FollowingCategoryWrapper>
      <FollowingTopicWrapper followingList={user.topics}></FollowingTopicWrapper>
      <FollowingWrapper followingList={user.following}></FollowingWrapper>
    </div>
  );
}