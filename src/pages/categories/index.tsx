import React, { useState } from 'react'
import { useGetCategoryListQuery } from '../../app/services/categoryApi'
import CategoryCard from '../../components/category-card'
import { Spinner } from '@nextui-org/react'
import { subscribedCategoryNTopics } from '../../utils/subscribed-data'
import { useSelector } from 'react-redux'
import { selectUserLike } from '../../features/UserSlice'


const Categories = () => {

    const { data, isFetching, isError } = useGetCategoryListQuery()

    const { subscribedCategoryNTopicsData } = subscribedCategoryNTopics()

    const likedData = useSelector(selectUserLike)

    console.log(data)

    const [showTopics, setShowTopics] = useState(true);

  const toggleTopics = () => {
    setShowTopics((prevShowTopics) => !prevShowTopics);
  };


    if (isError) {
        return <>no data</>
    }
    if (isFetching) {
        return <Spinner size='lg' />
    }
    return (
        <div className=''>
            {data.map((item: any) => {

                const topicArrayWithLikes = item.topics.map((topicItem: any) => {
                    const isLiked = likedData?.some((el: any) => el.topicId == topicItem.id);
                    return {
                        ...topicItem,
                        isLiked
                    };
                });

                return <CategoryCard
                    key={item.id}
                    name={item.name}
                    subsCount={item._count.categorySubs}
                    topicCount={item._count.topics}
                    showTopics={showTopics}
                    toggleTopics={toggleTopics}
                    avatarUrl={item.avatarUrl}
                    topics={topicArrayWithLikes}
                    isSubscribedCategory={item.isSubscribed}
                    categoryId={item.id}
                    description={item.description}
                    subscribedCategoryNTopicsData={subscribedCategoryNTopicsData}
                />
            })}

        </div>
    )
}

export default Categories