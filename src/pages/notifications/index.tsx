import React, { useState } from 'react';
import {
  useGetNotificationsByUserIdQuery,
  useLazyGetNotificationsByUserIdQuery,
  useReadNotificationsMutation,
} from '../../app/services/notificationsApi';
import { Button, Spinner, Tabs, Tab } from '@nextui-org/react';
import { MdOutlineQuestionAnswer, MdPostAdd } from 'react-icons/md';
import { BiRefresh } from 'react-icons/bi';
import { FaEye, FaUserPlus } from 'react-icons/fa';

import Alert from '../../components/UI/alert';
import { Link } from 'react-router-dom';
import { NotificationItem } from '../../components/notification-item';

const Notifications = () => {
  const [triggerGetNewNotifications] = useLazyGetNotificationsByUserIdQuery();
  const [setIsReadNotif] = useReadNotificationsMutation();
  const { data, isLoading, isError } = useGetNotificationsByUserIdQuery();
  const [message, setMessage] = useState('');

  const handleCloseAlert = () => {
    setMessage('');
  };

  const handleUpdateNotif = () => {
    triggerGetNewNotifications();
  };

  const handleWipeNotifications = async () => {
    const response = await setIsReadNotif(true);
    if ('error' in response) {
      setMessage('');
    } else {
      setMessage(response.data);
    }
    triggerGetNewNotifications();
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Spinner />;
  }

  const posts = data?.post || [];
  const topics = data?.topic || [];
  const follows = data?.follows || [];
  const mentions = data?.MENTION || [];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            startContent={<BiRefresh className="text-2xl" />}
            onClick={handleUpdateNotif}
            className="font-semibold text-gray-700"
          >
            Обновить
          </Button>
          <Button
            startContent={<FaEye />}
            variant="ghost"
            onClick={handleWipeNotifications}
            className="font-semibold text-gray-700"
          >
            Прочитать все уведомления
          </Button>
        </div>
      </div>
      <Tabs aria-label="Notifications" color="primary" variant="light">
        <Tab key="posts" title="Посты">
          {posts.map((elem: any) => (
            <NotificationItem
              key={elem.id}
              elem={elem}
              Icon={MdPostAdd}
              message={
                <>
                  Пост опубликован в теме{' '}
                  <Link
                    to={`/categories/topic/${elem.post.topic.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {elem.post?.topic.name}
                  </Link>
                  :{' '}
                  <Link
                    to={`/posts/${elem.postId}`}
                    className="text-blue-500 hover:underline"
                  >
                    {' '}
                    Перейти к посту
                  </Link>
                </>
              }
            />
          ))}
        </Tab>
        <Tab key="topics" title="Темы">
          {topics.map((elem: any) => (
            <NotificationItem
              key={elem.id}
              elem={elem}
              Icon={MdOutlineQuestionAnswer}
              message={
                <>
                  Новая тема в разделе{' '}
                  <Link
                    to={`/categories/${elem.topic?.category.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {elem?.topic.category.name}
                  </Link>
                  :{' '}
                  <Link
                    to={`/topics/${elem.topic.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {elem.topic.name}
                  </Link>
                  .
                </>
              }
            />
          ))}
        </Tab>
        <Tab key="follows" title="Подписчики">
          {follows.map((elem: any) => (
            <NotificationItem
              key={elem.id}
              elem={elem}
              Icon={FaUserPlus}
              message={
                <>
                  Новый подписчик:{' '}
                  <Link
                    to={`/users/${elem.follows?.follower.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {elem.follows?.follower.username}
                  </Link>
                </>
              }
            />
          ))}
        </Tab>
        <Tab key="mentions" title="Упоминания">
          {mentions.map((elem: any) => (
            <NotificationItem
              key={elem.id}
              elem={elem}
              Icon={MdOutlineQuestionAnswer}
              message={
                <>
                  Упоминание в комментариях:{' '}
                  <Link
                    to={`/posts/${elem.postId}`}
                    className="text-blue-500 hover:underline"
                  >
                    Перейти к посту
                  </Link>
                </>
              }
            />
          ))}
        </Tab>
      </Tabs>
      {message && <Alert message={message} closeMethod={handleCloseAlert} />}
    </>
  );
};

export default Notifications;
