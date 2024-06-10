import React, { useState } from 'react';
import { useGetUserByIdQuery } from '../../app/services/userApi';
import { useParams } from 'react-router-dom';
import FollowingWrapper from '../../components/following-wrapper';
import FollowingCategoryWrapper from '../../components/following-category-wrapper';
import FollowingTopicWrapper from '../../components/following-topic-wrapper';
import { Tab, Tabs } from '@nextui-org/react';
import FollowingTagsWrapper from '../../components/following-tags-wrapper';

export default function Subs() {
  const [selectedTab, setSelectedTab] = useState('topics');
  const { id = '' } = useParams<{ id: string }>();
  const { data: user, isLoading, isError } = useGetUserByIdQuery(id);

  const handleChangeTab = (key: any) => {
    setSelectedTab(key);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data</div>;
  }
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
      <FollowingTopicWrapper followingList={user.topics} isSubsPage={true} />
    )}
    {selectedTab === 'categories' && (
      <FollowingCategoryWrapper followingList={user.category} />
    )}
    {selectedTab === 'users' && (
      <FollowingWrapper followingList={user.following} />
    )}
    {selectedTab === 'tags' && (
      <FollowingTagsWrapper />
    )}
  </div>
  );
}