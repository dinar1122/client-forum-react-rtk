import React, { useState } from 'react';
import { Tab, Tabs } from '@nextui-org/react';
import { subscribedCategoryNTopics } from '../../utils/subscribed-data';
import { selectCurrent } from '../../features/UserSlice';
import { useSelector } from 'react-redux';
import FollowingTopic from '../../components/following-topic';

export default function Subs() {
  const [selectedTab, setSelectedTab] = useState('topics');
  
  /* const { data: user, isLoading, isError } = useGetUserByIdQuery(id); */
  const {subscribedCategoryNTopicsData} = subscribedCategoryNTopics()

  const currentUserData = useSelector(selectCurrent)


  const topicWithLiked = currentUserData?.topics.map((topicItem: any) => {
    const isLiked = currentUserData.likes.some((el: any) => el.topicId === topicItem.topicId);
    return {
        ...topicItem,
        isLiked
    };
});
console.log(topicWithLiked)
  const formattedData = {...currentUserData, topics: topicWithLiked}


  const handleChangeTab = (key: any) => {
    setSelectedTab(key);
  };

  /* if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data</div>;
  } */
  return (
    <div className="">
    <div className="flex w-full flex-col">
      <Tabs 
        onSelectionChange={handleChangeTab} 
        aria-label="Категория отображения (Темы, Категории, Пользователи)" 
        color="primary" 
        size='lg'
        variant="light"
        selectedKey={selectedTab}
      >
        <Tab
          key="topics"
          title={<div className="flex items-center space-x-2"><span>Темы</span></div>}
        />
        <Tab
          key="categories"
          title={<div className="flex items-center space-x-2"><span>Категории</span></div>}
        />
        <Tab
          key="users"
          title={<div className="flex items-center space-x-2"><span>Пользователи</span></div>}
        />
        <Tab
          key="tags"
          title={<div className="flex items-center space-x-2"><span>Теги</span></div>}
        />
      </Tabs>
    </div>
    {selectedTab === 'topics' && (
      <FollowingTopic followingList={topicWithLiked}/>
    )}
    {/* {selectedTab === 'categories' && (
      <FollowingCategoryWrapper followingList={user.category} />
    )}
    {selectedTab === 'users' && (
      <FollowingWrapper followingList={user.following} />
    )}
    {selectedTab === 'tags' && (
      <FollowingTagsWrapper />
    )} */}
  </div>
  );
}