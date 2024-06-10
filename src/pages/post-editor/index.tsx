import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetPostByIdQuery } from '../../app/services/postsApi'
import AdvancedCreator from '../../components/advanced-post-creator'

const PostEditor = () => {
    const params = useParams<{id: string}>()
    const {data} = useGetPostByIdQuery(params?.id ?? '')

    if(!data) {
        return <div>Нет данных</div>
    }

  return (
    <>
    <AdvancedCreator data={data}/>
    </>
  )
}

export default PostEditor