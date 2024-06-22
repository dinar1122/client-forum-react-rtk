import { Card, CardBody, CardHeader, Avatar, Link, Button } from '@nextui-org/react';
import React from 'react';
import { BASE_URL } from '../../constants';
import useSubscriptionActions from '../../features/SubscribeActions';

const UserItem = ({followingId, username, email, avatarUrl, isSubscribed = true, bio}:any) => {
    const {handleSubscribeUser} = useSubscriptionActions()
  return (
    <>
    <Card>
          <CardHeader className="flex justify-between p-3 bg-gray-100">
            <Link className='flex items-center gap-2 p-3 rounded-xl' href={`/users/${followingId}`}>
              <Avatar src={`${BASE_URL}${avatarUrl}`} />
              <div><div className="font-semibold text-lg">{username}</div>
              <div className="font-md text-sm">{email}</div></div>
            </Link>
            <Button onClick={() => handleSubscribeUser(isSubscribed,followingId)} variant='ghost'>
              {isSubscribed ? 'Отписаться' : 'Подписаться'}
            </Button>
          </CardHeader>
          <CardBody>
            <div className="font-semibold text-md text-gray-700 p-3 bg-gray-100 rounded-xl">
              {bio}
            </div>
          </CardBody>
        </Card>
    </>
  )
}

export default UserItem