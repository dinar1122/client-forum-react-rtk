import React, { useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Image, Link } from '@nextui-org/react'
import { topicApi } from '../../app/services/topicApi'
import { categoryApi, useLazyGetCategoryListQuery } from '../../app/services/categoryApi'

type Props = {
    name: string,
    categoryId: string
    topics: any,
    isSubscribedCategory: boolean,
}

const CategoryCard = ({ name, topics, isSubscribedCategory, categoryId }: Props) => {
    const [triggerCategoryData] = useLazyGetCategoryListQuery()

    const [topicUnSubscribe] = topicApi.useDeleteSubcriptionMutation()
    const [topicSubscribe] = topicApi.useCreateSubcriptionMutation()
    const [categorySubscribe] = categoryApi.useCreateSubscriptionCategoryMutation()
    const [categoryUnSubscribe] = categoryApi.useDeleteSubscriptionCategoryMutation()
    const [showMoreFlag, setShowMoreFlag] = useState(true);
    const limitCount = 4
    const slicedTopics = topics.slice(0, limitCount)
    const handleSubscribeTopic = (isSubscribed: boolean, id: string) => {
        if (!isSubscribed) {
            topicSubscribe(id).unwrap()
        } else {
            topicUnSubscribe(id).unwrap()
        }
        triggerCategoryData()
    }
    const handleUnSubscribeCategory = () => {
        if (!isSubscribedCategory) {
            categorySubscribe(categoryId).unwrap()
        } else {
            categoryUnSubscribe(categoryId).unwrap()
        }
        triggerCategoryData()
    }
    const toggleShowMoreFlag = () => {
        setShowMoreFlag(!showMoreFlag);
    };
    return (
        <div className='flex'>
            <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5 w-1/4 mb-4">
                <Link href={`categories/${categoryId}`}><CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">Категория</p>
                    <h4 className="text-black font-medium text-2xl">{name}</h4>
                </CardHeader>
                    <Image
                        removeWrapper
                        alt="Card example background"
                        className="z-0 w-full h-full  scale-125-translate-y-6 object-cover"
                        src="https://nextui.org/images/card-example-6.jpeg"
                    /></Link>
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                        <p className="text-black text-tiny">Available soon.</p>
                        <p className="text-black text-tiny">Get notified.</p>
                    </div>
                    {isSubscribedCategory ? <Button className="text-tiny " color="default" radius="full" size="sm" onClick={handleUnSubscribeCategory}>
                        Отписаться
                    </Button> : <Button className="text-tiny " color="primary" radius="full" size="sm" onClick={handleUnSubscribeCategory}>
                        Подписаться
                    </Button>}
                </CardFooter>
            </Card>
            <div className='w-full p-2 pl-4'>
                {(showMoreFlag ? slicedTopics : topics).map((item: any) => {
                    return (
                        <Card key={item.id} className='mb-2'>
                            <CardBody>
                                <div className='flex justify-between'>
                                    <div className='flex-col'>
                                        <p className='inline-block align-middle'>Тема: {item.name}</p>
                                    </div>
                                    <Button className='flex-col h-7' onClick={() => handleSubscribeTopic(item.isSubscribed, item.id)}>
                                        {item.isSubscribed ? <p>отписаться</p> : <p>подписаться</p>}
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    );
                })}

                <Card className='mb-2'>

                    {(topics.length > 4) && <CardBody><div className='flex justify-between '>
                        <div className='flex-col '>
                            <p className='inline-block align-middle'></p>
                        </div>
                        <Button className='flex-col h-7 m-auto' onClick={toggleShowMoreFlag}>
                            {showMoreFlag ? <p>Показать больше</p> : <p>Показать меньше</p>}
                        </Button>

                    </div>
                    </CardBody>}


                </Card></div>
        </div>
    )
}

export default CategoryCard