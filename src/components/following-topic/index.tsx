import { useState } from 'react';
import { Card, Button, Badge, CardFooter, CardHeader, CardBody } from '@nextui-org/react';
import TopicItem from '../topic-item';

const FollowingTopic = ({ followingList }: any) => {
    console.log(followingList)
    if(!followingList) {
        return <>Нет данных</>
    }
    return (
        <div className="flex flex-col gap-4 mt-5">
            {followingList && followingList.map((topicItem: any) => {
                return <TopicItem
                key={topicItem.id} 
                name={topicItem.topic?.name} 
                description={topicItem.topic?.description}
                rating={topicItem.rating} 
                isSubscribed={true}
                isLiked={topicItem.isLiked}
                categoryId={topicItem.topic?.categoryId}
                category={topicItem?.topic?.category.name}
                id={topicItem.topic?.id}
                postsCount={topicItem.topic?._count.posts} />
            })}
        </div>
    );
};

export default FollowingTopic;
