import React, { useEffect, useState } from 'react'
import { useGetNotificationsByUserIdQuery, useLazyGetNotificationsByUserIdQuery } from '../../app/services/notificationsApi'
import { Button, Card, CardBody, Link, Spinner } from '@nextui-org/react';
import { formatToClientDate } from '../../utils/format-to-client-date';
import { MdOutlineQuestionAnswer, MdPostAdd } from 'react-icons/md';
import index from '../../index.css'
import { BiRefresh } from 'react-icons/bi';

const Notifications = () => {

    const [triggerGetNewNotifications] = useLazyGetNotificationsByUserIdQuery()
    const { data, isLoading = true } = useGetNotificationsByUserIdQuery();


    const handleUpdateNotif = () => {
        triggerGetNewNotifications()
    }

    const handleWipeNotifications = () => {
        
    }

    if (isLoading) {
        return (
            <Spinner />
        )
    }

    return (

        <>
            <div className='flex justify-between'><Button startContent={<BiRefresh className='text-2xl' />} onClick={handleUpdateNotif}>Обновить уведомления</Button> <Button onClick={handleWipeNotifications}>Прочитать все уведомления</Button></div>
            {data.post.map((elem: any) => {
                return <Card key={elem.id} className='mt-3'>
                    {!elem.isRead && <div className='notification-indicator'></div>}
                    <CardBody className='flex-row justify-between'><div className='w-[95%]'>
                        В {formatToClientDate(elem.post.createdAt, true)} был опубликован <Link href={`/posts/${elem.postId}`}>
                            Пост</Link> в теме <Link href={`/categories/${elem.post.categoryId}/topic/${elem.post.topic.id}`}>{elem.post.topic.name}</Link> на которую вы подписаны </div><MdPostAdd className='text-2xl' /></CardBody>
                </Card>
            })}
            {data.topic.map((elem: any) => {
                return <Card key={elem.id} className='mt-3'>
                    {!elem.isRead && <div className='notification-indicator'></div>}
                    <CardBody className='flex-row justify-between'>
                        
                        <div className='w-[95%]'>В разделе <Link >{elem.topic.category.name}</Link> была создана тема <Link>{elem.topic.name}</Link> в {formatToClientDate(elem.timestamp, true)}
                        </div> <MdOutlineQuestionAnswer className='text-2xl' /></CardBody>
                </Card>
            })}

        </>
    )
}

export default Notifications