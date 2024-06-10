import { Card, CardBody, CardHeader, Avatar} from '@nextui-org/react';
import React from 'react';
import { Link } from 'react-router-dom';

const FollowingCategoryWrapper = ({ followingList }: any) => {
  console.log(followingList);
  
  return (
    <div className="gap-4 flex flex-col">
      <div className='text-2xl font-semibold text-gray-700 mr-2'>Категории</div>
      {followingList.map((listItem: any) => {
        const { category } = listItem;
        
        return (
          <Link to={`/categories/${listItem.categoryId}`} key={listItem.categoryId}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex items-center gap-4">
                <Avatar src={category.avatarUrl}  />
                <div className="font-semibold text-lg">{category.name}</div>
              </CardHeader>
              <CardBody>
                <div className="text-sm text-gray-600 font-semibold">
                  {category.description.length > 100 ? category.description.slice(0, 100) + '...' : category.description}
                </div>
              </CardBody>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default FollowingCategoryWrapper;
