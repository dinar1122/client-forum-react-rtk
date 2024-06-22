import { Button, Card, CardBody, Select, SelectItem } from '@nextui-org/react'
import React, { useState } from 'react'
import TopicItem from '../topic-item';
import { CSSTransition } from 'react-transition-group';

const TopicWrapper = ({ followingList, subscribedCategoryNTopicsData = {}}: any) => {
  const [sortBy, setSortBy] = useState<'posts' | 'rating'>('rating'); 
  const [showForm, setShowForm] = useState(false);

  followingList = followingList.map((topicItem: any) => {
    const isSubscribed = subscribedCategoryNTopicsData.topic.some((el: any) => el.topicId == topicItem.id);
    return {
      ...topicItem,
      isSubscribed
    };
  });

  const sortedFollowingList = [...followingList].sort((a: any, b: any) => {
    if (sortBy === 'posts') {
      return (b?._count?.posts || 0) - (a?._count?.posts || 0);
    } else {
      return (b?._count?.likes || 0) - (a?._count?.likes || 0);
    }
  });

  const handleSortChange = (value: any) => {
    setSortBy(value.target.value);
  }

  const handleCreateTopicClick = () => {
    setShowForm(prevState => !prevState);
  }

  return (
    <>
      <div className="gap-3 flex flex-col">
        <Card className='flex flex-row justify-between items-center mt-3 gap-0'>
          <CardBody className='text-2xl flex-row font-semibold text-gray-700 pr-0 gap-3 '>
            <Button variant='ghost' className='w-1/2' onClick={handleCreateTopicClick}>Создать тему</Button>
            <Button variant='ghost' className='w-1/2' onClick={handleCreateTopicClick}>Создать пост</Button>
          </CardBody>

          <CardBody className='w-2/3'>
            <Select 
              size='md'  
              placeholder='Сортировка по рейтингу'
              value={sortBy} 
              aria-label='posts' 
              onChange={handleSortChange} 
              className=''
            >
              <SelectItem key="posts">Сортировка по постам</SelectItem>
              <SelectItem key="rating">Сортировка по рейтингу</SelectItem>
            </Select>
          </CardBody>
        </Card>

        <CSSTransition
          in={showForm}
          timeout={500}
          classNames="form"
          unmountOnExit
        >
          <Card className='shadow-t  form-container'>
            <CardBody>
              <form>
                <div>
                  <label htmlFor="topicName">Название темы</label>
                  <input type="text" id="topicName" name="topicName" className="w-full border rounded p-2 mt-2" />
                </div>
                <div className="mt-3">
                  <label htmlFor="topicDescription">Описание темы</label>
                  <textarea id="topicDescription" name="topicDescription" className="w-full border rounded p-2 mt-2" rows={4}></textarea>
                </div>
                <Button type="submit" className="mt-3">Создать</Button>
              </form>
            </CardBody>
          </Card>
        </CSSTransition>
      

        {sortedFollowingList.map((item: any) => {
          return (
            <TopicItem 
              key={item.id} 
              name={item.name} 
              description={item.description}
              posts={item.posts} 
              isSubscribed={item.isSubscribed}
              isLiked={item.isLiked}
              categoryId={item.categoryId}
              category={item.category?.name}
              id={item.id}
              rating={item._count?.likes} 
              postsCount={item?._count?.posts}
            />
          )
        })}
      </div>
    </>
  )
}

export default TopicWrapper
