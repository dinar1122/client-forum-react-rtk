import React, { useState } from 'react';
import { useGetNotificationsByUserIdQuery, useLazyGetNotificationsByUserIdQuery, useReadNotificationsMutation } from '../../app/services/notificationsApi';
import { Button, Card, CardBody, Spinner } from '@nextui-org/react';
import { formatToClientDate } from '../../utils/format-to-client-date';
import { MdOutlineQuestionAnswer, MdPostAdd } from 'react-icons/md';
import { BiRefresh } from 'react-icons/bi';
import { FaUserPlus } from 'react-icons/fa';
import { LuSettings } from 'react-icons/lu';
import Alert from '../../components/UI/alert';
import { Link } from 'react-router-dom';

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
        const response = await setIsReadNotif(true)
        if ('error' in response) {
            setMessage(response.error?.data)
        } else {
            setMessage(response.data)
        }
        triggerGetNewNotifications()
    };

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <Spinner />
    }

    const renderNotification = (elem, Icon, message) => (
        <Card key={elem.id} className="mt-3 border-l-4 border-blue-500 ">
            <CardBody className="flex-row justify-between  p-4">
                <div className="flex items-center">
                    {!elem.isRead && <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>}
                    <div className="flex flex-col">
                        <div className="text-gray-800 text-lg font-semibold">{message}</div>
                        <div className="text-gray-500 text-sm">{formatToClientDate(elem.timestamp, true)}</div>
                    </div>
                </div>
                <Icon className="text-3xl text-blue-500" />
            </CardBody>
        </Card>
    );

    return (
        <>
            <div className="flex justify-between mb-4">
                <Button startContent={<BiRefresh className="text-2xl" />} onClick={handleUpdateNotif} className="font-semibold text-gray-700">
                    Обновить уведомления
                </Button>
                <div className="flex items-center">
                    <Button startContent={<LuSettings className="text-xl text-gray-700" />} />
                    <Button className="ml-2 font-semibold text-gray-700" onClick={handleWipeNotifications}>
                        Прочитать все уведомления
                    </Button>
                </div>
            </div>
            {data?.post?.map((elem) => 
                renderNotification(
                    elem, 
                    MdPostAdd, 
                    <>
                        Пост опубликован в теме <Link to={`/categories/topic/${elem.post.topic.id}`} className="text-blue-500 hover:underline">{elem.post?.topic.name}</Link>: <Link to={`/posts/${elem.postId}`} className="text-blue-500 hover:underline"> Перейти к посту</Link>
                    </>
                )
            )}
            {data?.topic?.map((elem) =>
                renderNotification(
                    elem, 
                    MdOutlineQuestionAnswer, 
                    <>
                        Новая тема в разделе <Link to={`/categories/${elem.topic?.category.id}`} className="text-blue-500 hover:underline">{elem?.topic.category.name}</Link>: 
                        <Link to={`/topics/${elem.topic.id}`} className="text-blue-500 hover:underline">{elem.topic.name}</Link>.
                    </>
                )
            )}
            {data?.follows?.map((elem) =>
                renderNotification(
                    elem, 
                    FaUserPlus, 
                    <>
                        Новый подписчик: <Link to={`/users/${elem.follows?.follower.id}`} className="text-blue-500 hover:underline">{elem.follows?.follower.username}</Link>
                    </>
                )
            )}
            {data?.MENTION?.map((elem) =>
                renderNotification(
                    elem, 
                    MdOutlineQuestionAnswer, 
                    <>
                        Упоминание в комментариях: <Link to={`/posts/${elem.postId}`} className="text-blue-500 hover:underline">Перейти к посту</Link>
                    </>
                )
            )}
            {message && <Alert message={message} closeMethod={handleCloseAlert} />}
        </>
    );
};

export default Notifications;
