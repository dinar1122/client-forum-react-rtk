import { Button, Card, CardBody, CardFooter, CardHeader, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Select, SelectItem } from '@nextui-org/react'
import React, { useState } from 'react'
import TopicItem from '../topic-item';


const TopicWrapper = ({ followingList, isNested = true, subscribedCategoryNTopicsData = {}}: any) => {
  
  const [sortBy, setSortBy] = useState<'posts' | 'rating'>('rating'); 
 
  followingList = followingList.map((topicItem: any) => {
    const isSubscribed = subscribedCategoryNTopicsData.topic.some((el: any) => el.topicId == topicItem.id);
    return {
        ...topicItem,
        isSubscribed
    };
});
  const sortedFollowingList = [...followingList].sort((a: any, b: any) => {
    const aTopic = isNested ? a : a.topic;
    const bTopic = isNested ? b : b.topic;
  
    if (sortBy === 'posts') {
      return (bTopic?.posts?.length || 0) - (aTopic?.posts?.length || 0);
    } else {
      return (bTopic?.rating || 0) - (aTopic?.rating || 0);
    }
  });

  const handleSortChange = (value: any) => {
    setSortBy(value.target.value);
  }

  return (
    <>
      <div className="gap-3 flex flex-col">
        <Card className='flex flex-row justify-between items-center mt-3 gap-0'>
          <CardBody className='text-2xl font-semibold text-gray-700 pr-0 '>
            <Button>Создать тему</Button>
          </CardBody>

            <CardBody className='w-2/3'><Select 
            size='md'  
            placeholder='Сортировка по рейтингу'
            value={sortBy} 
            aria-label='posts' 
            onChange={handleSortChange} 
            className=''
            >
              <SelectItem   key="posts">Сортировка по постам</SelectItem>
              <SelectItem  key="rating"> Сортировка по рейтингу</SelectItem>
            </Select></CardBody>

        </Card>
        {sortedFollowingList.map((item: any) => {
          return (
            <TopicItem 
            key={item.id} 
            name={item.name} 
            description={item.description}
            rating={item.rating} 
            posts={item.posts} 
            isSubscribed={item.isSubscribed}
            isLiked={item.isLiked}
            categoryId={item.categoryId}
            id={item.id}
            postsCount={item?._count?.posts}/>
          )
        })}
      </div>
    </>
  )
}

export default TopicWrapper
