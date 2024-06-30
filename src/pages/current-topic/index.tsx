import React from 'react';
import {
  Card as CardNextUI,
  CardHeader,
  CardBody,
  Divider,
  Avatar,
  Button,
} from '@nextui-org/react';
import { Link, useParams } from 'react-router-dom';
import { useGetPostsByTopicQuery } from '../../app/services/postsApi';
import CurrentTopicHeader from '../../components/current-topic-header';
import { Card } from '../../components/card';
import {
  subscribedCategoryNTopics,
  subscribedData,
  userFollows,
} from '../../utils/subscribed-data';

const CurrentTopic = () => {
  const { id = '' } = useParams<{ id: string }>();
  const { data, isFetching } = useGetPostsByTopicQuery<any>({ id });
  const { subscribedTagIds } = subscribedData();
  const { currentUserFollows } = userFollows();
  const { subscribedCategoryNTopicsData } = subscribedCategoryNTopics();

  if (isFetching) {
    return <>isLoading</>;
  }

  const { name, description, createdAt, author } = data?.topicInfo;

  const isSubscribedOnUser = currentUserFollows?.some(
    (user) => user.followingId === author.id,
  );
  const isSubscribedOnTopic = subscribedCategoryNTopicsData?.topic?.some(
    (topic) => topic.topicId === id,
  );

  return (
    <div>
      <CurrentTopicHeader
        id={id}
        name={name}
        description={description}
        createdAt={createdAt}
        author={author}
        isSubscribedOnUser={isSubscribedOnUser}
        isSubscribedOnTopic={isSubscribedOnTopic}
      />
      {data.posts.length > 0 ? (
        data.posts.map((postData: any) => {
          return (
            <Card
              key={postData.id}
              avatarUrl={postData.author.avatarUrl}
              name={postData.author.username}
              authorId={postData.authorId}
              content={postData.content}
              cardFor={'post'}
              id={postData.id}
              likedByUser={postData.likedByUser}
              dislikedByUser={postData.dislikedByUser}
              createdAt={postData.createdAt}
              commentsCount={postData._count.comments}
              likesCount={postData._count.likes}
              dislikesCount={postData._count.dislikes}
              topicData={postData.topic}
              categoryData={postData.category}
              tagsData={postData.postTags}
              subscribedTagIds={subscribedTagIds}
            />
          );
        })
      ) : (
        <CardNextUI className="flex p-3">
          <CardBody className="justify-center flex-row bg-gray-100 rounded-xl">
            <span className="w-max font-bold text-2xl p-2 text-gray-600 ">
              Записей нет
            </span>
            <Link className="w-min my-auto" to={`/create`}>
              <Button>
                <span className=" m-auto font-bold text-2xl  text-gray-600 ">
                  Создать
                </span>
              </Button>
            </Link>
          </CardBody>
        </CardNextUI>
      )}
    </div>
  );
};

export default CurrentTopic;
