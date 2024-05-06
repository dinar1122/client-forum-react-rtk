import { Card, CardBody} from '@nextui-org/react'
import React from 'react'
import { Link } from 'react-router-dom'

const FollowingCategoryWrapper = ({followingList}:any) => {
  return (
    <>
    <div className="gap-5 flex flex-col w-1/3">
      <div className='text-2xl font-semibold text-gray-700 mr-2 '>Категории</div>
      {followingList.map((listItem:any) => (
        <Link to={`/categories/${listItem.categoryId}`} key={listItem.categoryId}>
          <Card>
            <CardBody className="block">
            {listItem.category.name}
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
    </>
  )
}

export default FollowingCategoryWrapper