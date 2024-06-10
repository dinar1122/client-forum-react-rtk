import { Card, CardBody, User, Link } from '@nextui-org/react';
import React from 'react';
import { BASE_URL } from '../../constants';

interface FollowingWrapperProps {
  followingList: Array<{
    followingId: string;
    following: {
      email: string;
      username: string;
      avatarUrl: string;
      bio: string;
    };
  }>;
}

const FollowingWrapper: React.FC<FollowingWrapperProps> = ({ followingList }) => {
  console.log(followingList);
  
  return (
    <div className="gap-5 flex flex-col">
      <div className='text-2xl font-semibold text-gray-700 mr-2'>Пользователи</div>
      {followingList.map((listItem) => (
        <Card key={listItem.followingId} className='h-[140px] hover:shadow-lg transition-shadow'>
          <CardBody>
            <User
              className='justify-start'
              name={listItem.following.email}
              description={(
                <Link href={`/users/${listItem.followingId}`} size="sm" >
                  {listItem.following.username}
                </Link>
              )}
              avatarProps={{
                src: `${BASE_URL}${listItem.following.avatarUrl}`,
              }}
            />
            <span className='text-gray-600 mt-1 font-semibold'>
              {listItem.following.bio?.length > 80 ? `${listItem.following.bio.slice(0, 80)}...` : listItem.following.bio}
            </span>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default FollowingWrapper;
