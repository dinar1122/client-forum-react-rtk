
import CategoryItem from '../category-item';

const FollowingCategoryWrapper = ({ followingList }: any) => {

  return (
    <div className="pt-2 gap-3 flex-col">
      {followingList.map((listItem: any) => {
        const { category } = listItem

        return (
          <CategoryItem
            key={listItem.id}
            name={category.name}
            description={category.description}
            avatarUrl={category.avatarUrl}
            categoryId={listItem.categoryId}
            subsCount={category._count?.categorySubs}
            topicCount={category._count?.topics}
          />
        )
      })}
    </div>
  );
};

export default FollowingCategoryWrapper;
