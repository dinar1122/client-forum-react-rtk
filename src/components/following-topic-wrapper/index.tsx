import { Card, CardBody} from '@nextui-org/react'
import React from 'react'
import { Link } from 'react-router-dom'

const FollowingTopicWrapper = ({followingList}:any) => {
  return (
    <>
    
    <div className="gap-5 flex flex-col w-1/3">
      <div className='text-2xl font-semibold text-gray-700 mr-2 '>Темы</div>
      {followingList.map((listItem:any) => (
        <Link to={`/topics/${listItem.topicId}`} key={listItem.topicId}>
          <Card>
            <CardBody className="block">
            {listItem.topic.name}
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
    </>
  )
}

export default FollowingTopicWrapper