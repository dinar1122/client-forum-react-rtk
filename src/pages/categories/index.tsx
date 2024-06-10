import React from 'react'
import { categoryApi } from '../../app/services/categoryApi'
import CategoryCard from '../../components/category-card'


const Categories = () => {

    const { data } = categoryApi.useGetCategoryListQuery()
    if(!data) {
        return null
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
                />
            })}
            
        </div>
    )
}

export default Categories