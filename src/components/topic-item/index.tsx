import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Spinner } from '@nextui-org/react';
import { MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { formatToClientDate } from '../../utils/format-to-client-date';
import { IoArrowUpSharp } from 'react-icons/io5';
import useSubscriptionActions from '../../features/SubscribeActions';
import useVotesActions from '../../features/VotesActions';
import { useLazyGetPostsByTopicQuery } from '../../app/services/postsApi';

const TopicItem = ({ name, description, rating, isSubscribed, isLiked, categoryId, id, postsCount }: any) => {
    const { handleSubscribeTopic } = useSubscriptionActions();
    const { handleLikeTopic } = useVotesActions();
    const [getPostsByTopic] = useLazyGetPostsByTopicQuery();
    const [expandedTopics, setExpandedTopics] = useState<boolean>(false);
    const [postsData, setPostsData] = useState<any>([]);
    const [limit, setLimit] = useState(4);

    const handleGetPosts = async () => {

            const { data } = await getPostsByTopic({id,limit});
            setPostsData(data?.posts);

        
    };
    useEffect(() => {
        if (expandedTopics) {
            handleGetPosts();
        }
    }, [expandedTopics, limit]);


    const handleGetPostMore = () => {
         setLimit(limit + 4);
    }
    return (
        <Card className="">
            <CardHeader className="flex justify-between items-center cursor-pointer" onClick={() => setExpandedTopics(!expandedTopics)}>
                <div className="flex items-center gap-3">
                    <span className="font-semibold text-lg ">Тема:</span>
                    <Link to={`topic/${id}`}><span className="font-semibold text-lg bg-gray-200 px-2 py-1 font-semibold rounded-lg">{name}</span></Link>
                    <p className="text-sm text-gray-600 bg-gray-200 px-2 py-1 font-semibold rounded-lg">Рейтинг: {rating}</p>
                    <span className="text-sm text-gray-400">Постов: {postsCount}</span>
                </div>
                <div className="text-gray-500">
                    {expandedTopics ? <MdKeyboardDoubleArrowUp /> : <MdKeyboardDoubleArrowDown />}
                </div>
            </CardHeader>
            <CardBody className="py-0">
                <span className="font-semibold text-md text-gray-700">{description}</span>
            </CardBody>
            {expandedTopics && (
                <CardBody>
                    <div className="flex flex-wrap gap-3 mb-4">
                        <Link className='w-full text-center' to={`/create`}><Button className='w-full' variant='ghost' >Создать пост </Button></Link>
                        {postsData && postsData.map((post: any) => (
                                <Link key={post.id} to={`/posts/${post.id}`} className="w-full">
                                    <Card className="hover:bg-blue-100 transition p-3 ">
                                        <CardBody className="p-0">
                                            <p className="font-semibold">{JSON.parse(post.content)[0]?.componentText || 'No content available'}</p>
                                        </CardBody>
                                        <CardFooter className="flex justify-between text-sm text-gray-500 p-1 mt-2">
                                            <span>{post.author.username}</span>
                                            <span>{formatToClientDate(post.createdAt)}</span>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            ))}
                        {expandedTopics && (
                            <div className='flex justify-between w-full'>
                                <Button
                                size="sm"
                                className="text-sm px-9 rounded-xl"
                                color={isSubscribed ? "default" : "primary"}
                                onClick={() => setExpandedTopics(!expandedTopics)}
                            >
                                Свернуть
                            </Button>
                                <Button
                                    size="sm"
                                    className="text-sm px-9 rounded-xl "
                                    color={isSubscribed ? "default" : "primary"}
                                    onClick={handleGetPostMore}
                                >
                                    Показать еще
                                </Button>
                                </div>
                        )}
                    </div>
                </CardBody>
            )}
            <CardFooter className="flex justify-between">
                <Button
                    className="text-sm"
                    color={isSubscribed ? "default" : "primary"}
                    onClick={() => handleSubscribeTopic(isSubscribed, id)}
                >
                    {isSubscribed ? 'Отписаться' : 'Подписаться'}
                </Button>
                <Button
                    isDisabled={isLiked}
                    variant="ghost"
                    startContent={<IoArrowUpSharp />}
                    className="text-sm"
                    color="primary"
                    onClick={() => handleLikeTopic(false, id, categoryId)}
                >
                    {isLiked ? 'Голос засчитан' : 'Проголосовать за тему'}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default TopicItem;
