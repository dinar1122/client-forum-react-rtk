import { Button, Card, CardBody, CardFooter, CardHeader, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Select, SelectItem } from '@nextui-org/react'
import React, { useState } from 'react'
import { MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { formatToClientDate } from '../../utils/format-to-client-date'
import { IoArrowUpSharp } from 'react-icons/io5'
import useSubscriptionActions from '../../features/SubscribeActions'
import useVotesActions from '../../features/VotesActions'

const FollowingTopicWrapper = ({ followingList, isNested = false, isSubsPage = false }: any) => {
  const [expandedTopics, setExpandedTopics] = useState<{ [key: string]: boolean }>({})
  const { handleSubscribeTopic } = useSubscriptionActions()
  const { handleLikeTopic} = useVotesActions()
  const [sortBy, setSortBy] = useState<'posts' | 'rating'>('rating'); 
  
  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }))
  }
  console.log(followingList)
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
          const topic = !isNested ? item.topic : item
          const isExpanded = expandedTopics[topic.id]

          return (
            <Card key={topic.id} className="">
              <CardHeader className="flex justify-between items-center cursor-pointer" onClick={() => toggleTopic(topic.id)}>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-lg">Тема: {topic.name}</span>
                  <p className="text-sm text-gray-600">Рейтинг: {topic.rating}</p>
                  <span className="text-sm text-gray-400">Постов: {topic.posts.length}</span>
                </div>
                <div className="text-gray-500">
                  {isExpanded ? <MdKeyboardDoubleArrowUp /> : <MdKeyboardDoubleArrowDown />}
                </div>
              </CardHeader>
              {isExpanded && (
                <CardBody>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {topic.posts.map((post: any) => (
                      <Link key={post.id} to={`/posts/${post.id}`} className="w-full">
                        <Card className="hover:bg-gray-50 transition p-3">
                          <CardBody className="p-0">
                            <p className="font-semibold">{JSON.parse(post.content)[0]?.componentText || 'No content available'}</p>
                          </CardBody>
                          <CardFooter className="flex justify-between text-sm text-gray-500 p-1 mt-2">
                            <span>{post.author.username}</span>
                            <span>{formatToClientDate(post.createdAt)}</span>
                          </CardFooter>
                        </Card>
                      </Link>
                    ))}
                    <Button
                    size='sm'
                  className="text-sm px-9 rounded-xl m-auto"
                  color={topic.isSubscribed ? "default" : "primary"}
                  onClick={() => toggleTopic(topic.id)}
                >
                  {isExpanded ? 'Свернуть' : ''}
                </Button>
                  </div>
                </CardBody>
              )}
              <CardFooter className="flex justify-between">
                <Button
                  className="text-sm"
                  color={topic.isSubscribed ? "default" : "primary"}
                  onClick={() => handleSubscribeTopic(topic.isSubscribed, topic.id, topic.categoryId, isSubsPage)}
                >
                  {topic.isSubscribed ? 'Отписаться' : 'Подписаться'}
                </Button>
                <Button
                  isDisabled={topic.isLiked}
                  variant='ghost'
                  startContent={<IoArrowUpSharp />}
                  className="text-sm"
                  color="primary"
                  onClick={() => handleLikeTopic(false, topic.id, topic.categoryId, isSubsPage )}
                >
                  {topic.isLiked ? 'голос засчитан' : 'проголосовать за тему'}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </>
  )
}

export default FollowingTopicWrapper
