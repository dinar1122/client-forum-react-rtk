import React from 'react'
import { Card, CardHeader, CardBody, Divider, Avatar, Button } from '@nextui-org/react';
import { BASE_URL } from '../../constants';
import { formatToClientDate } from '../../utils/format-to-client-date';
import useSubscriptionActions from '../../features/SubscribeActions';
import { Link } from 'react-router-dom';
const CurrentTopicHeader = ({id, name, createdAt, description, author, isSubscribedOnTopic = false, isSubscribedOnUser = false}:any) => {

  const {handleSubscribeUser, handleSubscribeTopic} = useSubscriptionActions()

  return (
   <>
   <Card className="mb-3 shadow-sm border">
        <CardHeader className="flex-col items-center gap-3 bg-gray-100 p-3 w-full ">
          

            <div className='flex-row gap-2 w-full  justify-between'>
              <span className="text-xl font-bold px-2">Тема: {name}</span>
              <span className=" px-2 pt-1 text-gray-500">создана: {formatToClientDate(createdAt)}</span>
              <Button onClick={()=>handleSubscribeTopic(isSubscribedOnTopic, id)} className='my-auto bg-white font-semibold text-gray-700' size='sm'>{isSubscribedOnTopic ? `Отписаться`: `Подписаться`}</Button>
            </div>
         
        </CardHeader>
        
        <CardBody><p className="text-gray-500 bg-gray-100 rounded-xl p-3 w-full">{description}</p></CardBody>
            <Divider></Divider>
        <CardBody className='flex-row justify-between pt-0 '>
          <div className="flex items-center gap-4 p-2 py-0bg-gray-100 ">
            <Avatar src={`${BASE_URL}${author.avatarUrl}`} alt="Author Avatar" />
            <div className=''>
              <Link to={`/users/${author.id}`}><h3 className="text-lg font-semibold">{author.username}</h3></Link>
              <p className="text-gray-500">{author.email} </p>
              <p className="text-gray-500">Локация: {author.location}</p>
            </div>
          </div>
          <Button onClick={()=> handleSubscribeUser(isSubscribedOnUser, author.id )}  variant='ghost' className='my-auto font-semibold text-gray-700'>{isSubscribedOnUser ? `Отписаться`: `Подписаться`}</Button>
        </CardBody>
      </Card>
   </>
  )
}

export default CurrentTopicHeader