import React from 'react'
import { useGetCategoryListQuery } from '../../app/services/categoryApi'
import CategoryCard from '../../components/category-card'
import { Spinner } from '@nextui-org/react'
import { subscribedCategoryNTopics } from '../../utils/subscribed-data'


const Categories = () => {

    const { data, isFetching, isError } = useGetCategoryListQuery()

    const {subscribedCategoryNTopicsData} = subscribedCategoryNTopics()

    if(isError) {
        return <>no data</>
    }
    if(isFetching) {
        return <Spinner size='lg'/>
    }
    return (
        <div className=''>
            {data.map((item: any)=>{
                return <CategoryCard 
                key={item.id} 
                name={item.name} 
                topics={item.topics} 
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