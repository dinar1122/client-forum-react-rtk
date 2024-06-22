
import React from 'react';
import { Link } from 'react-router-dom';
import CategoryItem from '../category-item';

const FollowingCategoryWrapper = ({ followingList }: any) => {
  console.log(followingList);

  return (
    <div className="flex-col py-2 ">
      {followingList.map((listItem: any) => {
        const { category } = listItem;

        return (
          <CategoryItem 
          key={listItem.id}
          name={category.name} 
          description={category.description} 
          avatarUrl={category.avatarUrl} 
          categoryId={listItem.categoryId} />


        );
      })}
    </div>
  );
};

export default FollowingCategoryWrapper;
