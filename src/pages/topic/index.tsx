import React, { useEffect, useState } from 'react'
import { topicApi } from '../../app/services/topicApi'
import { Button, Card, CardBody } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import selectGeneralData from "../../features/CategorySlice"

const Topic = () => {

  const [topicList, setTopicList] = useState([]);
  const generalData = useSelector(selectGeneralData);

  useEffect(() => {
    if (generalData && generalData.topicList && generalData.topicList) {
      setTopicList(generalData.topicList);
    }
  }, [generalData]);
 
  if (!generalData) {
    return null
  }
  return (
    <div>

      {
        topicList?.map((item: any) => {
          return <Card key={item.id} className='mb-2'>
            <CardBody>
              <div className='flex justify-between '><div className='flex-col '>
                <p className='inline-block align-middle'>Тема: {item.name}</p>
              </div>
                <Button className='flex-col'>
                  {item.isSubscribed ? <p>отписаться</p> : <p>подписаться</p>}
                </Button></div>
            </CardBody>
          </Card>

        })
      }


    </div>
  )
}

export default Topic