
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
  avatarUrl: string
  topics: Topic[];
  isSubscribedCategory: boolean;
  description: string,
  topicCount: number
  subsCount: number
  subscribedCategoryNTopicsData: any
};


const CategoryCard = ({ name, categoryId, avatarUrl, topics, description, subscribedCategoryNTopicsData, subsCount, topicCount }: Props) => {


  const isSubscribedCategory = subscribedCategoryNTopicsData.category.some((el: any) => el.categoryId == categoryId)

  return (
    <div className="flex flex-col p-4 rounded-md">

      <CategoryItem
        name={name}
        description={description}
        topicCount={topicCount}
        subsCount={subsCount}
        categoryId={categoryId}
        avatarUrl={avatarUrl}
        isSubscribed={isSubscribedCategory}></CategoryItem>

      <TopicWrapper
        followingList={topics}
        subscribedCategoryNTopicsData={subscribedCategoryNTopicsData}></TopicWrapper>
    </div>
  );
};

export default CategoryCard;
