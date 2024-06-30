import React from 'react';
import { Card, CardBody, CardHeader, Avatar, Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import useSubscriptionActions from '../../features/SubscribeActions';

const CategoryItem = ({
  name,
  categoryId,
  avatarUrl,
  description,
  isSubscribed = true,
  subsCount = '',
  topicCount = '',
  toggleTopics = null,
  showTopics = '',
}: any) => {
  const { handleSubscribeCategory } = useSubscriptionActions();
  return (
    <>
      <Card className="mt-3">
        <CardHeader className="flex justify-between p-3 bg-gray-100 ">
          <div className="flex-row gap-2 items-center">
            <Link
              className="flex items-center gap-2 p-3  rounded-xl"
              to={`/categories/${categoryId}`}
            >
              <Avatar src={avatarUrl} />
              <div className="font-semibold text-lg">{name}</div>
            </Link>
            <span className="text-sm text-gray-600 bg-gray-200 px-2 py-1 font-semibold rounded-lg">
              Подписчиков: {subsCount}
            </span>
            <span className="text-sm text-gray-600 bg-gray-200 px-2 py-1 font-semibold rounded-lg">
              Тем: {topicCount}{' '}
            </span>
          </div>
          <div className="items-center flex gap-2">
            {toggleTopics && (
              <Button
                className="bg-blue-500 text-white rounded-xl "
                onClick={toggleTopics}
              >
                {showTopics ? 'Скрыть темы' : 'Показать темы'}
              </Button>
            )}
            <Button
              color={isSubscribed ? 'default' : 'primary'}
              onClick={() => handleSubscribeCategory(isSubscribed, categoryId)}
              variant="ghost"
            >
              {' '}
              {isSubscribed ? `Отписаться` : `Подписаться`}{' '}
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <div className="font-semibold text-md text-gray-700 p-3 bg-gray-100 rounded-xl ">
            {description}
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default CategoryItem;
