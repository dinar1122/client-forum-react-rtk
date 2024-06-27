
import CategoryItem from '../category-item';

const FollowingCategoryWrapper = ({ followingList }: any) => {

  if(followingList.length < 1 ) {
    return (<div className="text-2xl font-semibold text-gray-600 bg-gray-200 rounded-2xl justify-center flex m-3 p-3">Вы не подписаны ни на одну категорию</div>)
  }

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
