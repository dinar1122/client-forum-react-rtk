import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react';
import React, { useRef, useState } from 'react';
import TopicItem from '../topic-item';
import { CSSTransition } from 'react-transition-group';
import { useCreateTopicMutation } from '../../app/services/topicApi';
import CreateTopicForm from '../create-topic-form';
import { Link } from 'react-router-dom';

const TopicWrapper = ({
  followingList,
  subscribedCategoryNTopicsData = {},
  categoryId,
}: any) => {
  const [sortBy, setSortBy] = useState<'posts' | 'rating'>('rating');
  const [showForm, setShowForm] = useState(false);

  followingList = followingList.map((topicItem: any) => {
    const isSubscribed = subscribedCategoryNTopicsData.topic.some(
      (el: any) => el.topicId == topicItem.id,
    );
    return {
      ...topicItem,
      isSubscribed,
    };
  });

  const sortedFollowingList = [...followingList].sort((a: any, b: any) => {
    if (sortBy === 'posts') {
      return (b?._count?.posts || 0) - (a?._count?.posts || 0);
    } else {
      return (b?._count?.likes || 0) - (a?._count?.likes || 0);
    }
  });

  const handleSortChange = (value: any) => {
    setSortBy(value.target.value);
  };

  const handleShowForm = () => {
    setShowForm((prevState) => !prevState);
  };

  return (
    <>
      <div className="gap-3 flex flex-col">
        <Card className="flex flex-row justify-between items-center mt-3 gap-0">
          <CardBody className="text-2xl flex-row font-semibold text-gray-700 pr-0 gap-3 ">
            <Button variant="ghost" className="w-1/2" onClick={handleShowForm}>
              Создать тему
            </Button>
            <Button variant="ghost" className="w-1/2">
              <Link to={`/create`}>Создать пост</Link>
            </Button>
          </CardBody>

          <CardBody className="w-2/3">
            <Select
              size="md"
              placeholder="Сортировка по рейтингу"
              value={sortBy}
              aria-label="posts"
              onChange={handleSortChange}
              className=""
            >
              <SelectItem key="posts">Сортировка по постам</SelectItem>
              <SelectItem key="rating">Сортировка по рейтингу</SelectItem>
            </Select>
          </CardBody>
        </Card>

        {showForm && <CreateTopicForm categoryId={categoryId} />}

        {sortedFollowingList.map((item: any) => {
          return (
            <TopicItem
              key={item.id}
              name={item.name}
              description={item.description}
              isSubscribed={item.isSubscribed}
              isLiked={item.isLiked}
              categoryId={item.categoryId}
              category={item.category?.name}
              id={item.id}
              rating={item._count?.likes}
              postsCount={item?._count?.posts}
            />
          );
        })}
      </div>
    </>
  );
};

export default TopicWrapper;
