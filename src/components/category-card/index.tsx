import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Image } from '@nextui-org/react';
import { topicApi } from '../../app/services/topicApi';
import { categoryApi, useLazyGetCategoryListQuery } from '../../app/services/categoryApi';
import { IoArrowUpSharp } from 'react-icons/io5';
import FollowingTopicWrapper from '../following-topic-wrapper';
import useSubscriptionActions from '../../features/SubscribeActions';
import { Link } from 'react-router-dom';

type Topic = {
  id: string;
  name: string;
  rating: number;
  postCount: number;
  isSubscribed: boolean;
};

type Props = {
  name: string;
  categoryId: string;
  topics: Topic[];
  isSubscribedCategory: boolean;
  description: string
};


const CategoryCard = ({ name, isSubscribedCategory, categoryId, topics, description}: Props) => {
  const [showMore, setShowMore] = useState(true);
  const { handleUnSubscribeCategory } = useSubscriptionActions()

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };


  return (
    <div className="flex flex-col p-4 rounded-md">
      <Card className="flex flex-col sm:flex-row w-full h-auto shadow-lg">
        <Link to={`/categories/${categoryId}`} className="flex-1 ">
          <CardHeader className="flex flex-col items-start p-4 bg-gradient-to-r from-green-400 to-blue-500 h-full w-[200px]">
            <p className="text-sm text-white uppercase font-bold">Категория</p>
            <h4 className="text-white font-semibold text-2xl">{name}</h4>
          </CardHeader>
        </Link>
        <CardFooter className="flex justify-between items-center p-4  ">
          <div className='w-3/4'>
            <p className="text-gray-600 text-sm overflow-hidden">{description}</p>

          </div>
          <Button
            color={isSubscribedCategory ? "default" : "primary"}
            radius="full"
            size="sm"
            onClick={() => handleUnSubscribeCategory(isSubscribedCategory, categoryId)}
          >
            {isSubscribedCategory ? 'Отписаться' : 'Подписаться'}
          </Button>
        </CardFooter>
      </Card>

      <FollowingTopicWrapper followingList={topics} isNested={true} ></FollowingTopicWrapper>
    </div>
  );
};

export default CategoryCard;
