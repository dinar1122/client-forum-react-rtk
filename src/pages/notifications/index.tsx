import React, { useEffect, useState } from 'react'
import { useGetNotificationsByUserIdQuery, useLazyGetNotificationsByUserIdQuery, useReadNotificationsMutation } from '../../app/services/notificationsApi'
import { Button, Card, CardBody, Link, Spinner } from '@nextui-org/react';
import { formatToClientDate } from '../../utils/format-to-client-date';
import { MdOutlineQuestionAnswer, MdPostAdd } from 'react-icons/md';
import index from '../../index.css'
import { BiRefresh } from 'react-icons/bi';
import { FaUserPlus } from 'react-icons/fa';
import { LuSettings } from 'react-icons/lu';
import Alert from '../../components/UI/alert';

const Notifications = () => {

    const [triggerGetNewNotifications] = useLazyGetNotificationsByUserIdQuery()
    const [setIsReadNotif] = useReadNotificationsMutation()
    const { data, isLoading = true } = useGetNotificationsByUserIdQuery();
    const [message, setMessage] = useState('')

    const handleCloseAlert = () => {
        setMessage('')
    }
    
    const handleUpdateNotif = () => {
        triggerGetNewNotifications()
    }

    const handleWipeNotifications = async () => {
        const response = await setIsReadNotif(true);
    
        if ('error' in response) {
            const error = response.error as any
            setMessage(error.data);
        } else {
            setMessage(response.data);
        }

        triggerGetNewNotifications();
    };
    if (isLoading) {
        return (
            <Spinner />
        )
    }
    console.log(data)
    return (

        <>
            <div className='flex justify-between '>
                <Button startContent={<BiRefresh className='text-2xl' />} onClick={handleUpdateNotif} className='font-semibold text-gray-600'>Обновить уведомления</Button>
                <div className='flex '>
                    <Button startContent={<LuSettings className='text-xl ' />}></Button>
                    <Button className='ml-2 font-semibold text-gray-600' onClick={handleWipeNotifications}>Прочитать все уведомления</Button>
                </div>
            </div>
            {data.post?.map((elem: any) => {
                return <Card key={elem.id} className='mt-3'>
                    {!elem.isRead && <div className='notification-indicator'></div>}
                    <CardBody className='flex-row justify-between font-semibold text-gray-600 '><div className='w-[95%]'>
                        В {formatToClientDate(elem.post.createdAt, true)} был опубликован <Link href={`/posts/${elem.postId}`}>
                            Пост</Link> в теме <Link href={`/categories/${elem.post.categoryId}/topic/${elem.post.topic.id}`}>{elem.post.topic.name}</Link> на которую вы подписаны </div><MdPostAdd className='text-2xl' /></CardBody>
                </Card>
            })}
            {data.topic?.map((elem: any) => {
                return <Card key={elem.id} className='mt-3'>
                    {!elem.isRead && <div className='notification-indicator'></div>}
                    <CardBody className='flex-row justify-between font-semibold text-gray-600'>

                        <div className='w-[95%]'>В разделе <Link >{elem.topic.category.name}</Link>, на который вы подписаны была создана тема <Link>{elem.topic.name}</Link> в {formatToClientDate(elem.timestamp, true)}
                        </div> <MdOutlineQuestionAnswer className='text-2xl' /></CardBody>
                </Card>
            })}
            {data.follows?.map((elem: any) => {
                return <Card key={elem.id} className='mt-3'>
                    {!elem.isRead && <div className='notification-indicator'></div>}
                    <CardBody className='flex-row justify-between font-semibold text-gray-600'>
                        <div>В {formatToClientDate(elem.timestamp, true)} на вас подписался пользователь <Link href={`/users/${elem.follows.follower.id}`}>{elem.follows.follower.username}</Link></div>
                        <FaUserPlus className='text-2xl' />
                    </CardBody>
                </Card>
            })}
            {message && <Alert message={message} closeMethod={handleCloseAlert}></Alert>}
        
        </>
    )
}

export default Notifications