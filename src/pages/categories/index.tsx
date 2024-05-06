import React from 'react'
import { categoryApi } from '../../app/services/categoryApi'
import CategoryCard from '../../components/category-card'


const Categories = () => {

    const { data } = categoryApi.useGetCategoryListQuery()
    console.log(data)
    if(!data) {
        return null
    }
    return (
        <div>
            {data.map((item: any)=>{
                return <CategoryCard key={item.id} name={item.name} topics={item.topics} isSubscribedCategory={item.isSubscribed} categoryId={item.id}/>
            })}
            
        </div>
    )
}

export default Categories