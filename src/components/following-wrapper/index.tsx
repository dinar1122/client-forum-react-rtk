import { Card, CardBody, User, Link } from '@nextui-org/react'
import React from 'react'
import { BASE_URL } from '../../constants'


const FollowingWrapper = ({ followingList }: any) => {
    console.log(followingList)
    return (
        <>
            <div className="gap-5 flex flex-col w-1/3">
            <div className='text-2xl font-semibold text-gray-700 mr-2 '>Пользователи</div>
                {followingList.map((listItem: any) => (
                    <Card key={listItem.followingId} className='h-[115px]'><CardBody>
                        <User
                        className='justify-start'
                        name={listItem.following.email}
                        description={(
                            <Link href={`/users/${listItem.followingId}`} size="sm" >
                                {listItem.following.username}
                            </Link>
                        )}
                        avatarProps={{
                            src: `${BASE_URL}${listItem.following.avatarUrl}`
                        }}
                        
                    />
                    <div className='text-gray-600  mt-0'>{listItem.following.bio}</div>
                    </CardBody>
                    </Card>

                ))}
            </div>
        </>
    )
}

export default FollowingWrapper