import TopicWrapper from '../topic-wrapper';
import CategoryItem from '../category-item';

type Topic = {
  id: string;
  name: string;
  rating: number;
  postCount: number;
  isSubscribed: boolean;
};

type Props = {
  name: string;
  categoryId: string;
  avatarUrl: string;
  topics: Topic[];
  isSubscribedCategory: boolean;
  description: string;
  topicCount: number;
  subsCount: number;
  toggleTopics: any;
  showTopics: any;
  subscribedCategoryNTopicsData: any;
};

const CategoryCard = ({
  name,
  categoryId,
  avatarUrl,
  topics,
  toggleTopics,
  showTopics,
  description,
  subscribedCategoryNTopicsData,
  subsCount,
  topicCount,
}: Props) => {
  const isSubscribedCategory = subscribedCategoryNTopicsData.category.some(
    (el: any) => el.categoryId == categoryId,
  );

  return (
    <div className="mb-3">
      <CategoryItem
        toggleTopics={toggleTopics}
        showTopics={showTopics}
        name={name}
        description={description}
        topicCount={topicCount}
        subsCount={subsCount}
        categoryId={categoryId}
        avatarUrl={avatarUrl}
        isSubscribed={isSubscribedCategory}
      ></CategoryItem>

      {showTopics && (
        <TopicWrapper
          categoryId={categoryId}
          followingList={topics}
          subscribedCategoryNTopicsData={subscribedCategoryNTopicsData}
        />
      )}
    </div>
  );
};

export default CategoryCard;
