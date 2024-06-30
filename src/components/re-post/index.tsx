import React from 'react';
import { Card } from '../card';
import { useGetPostByIdQuery } from '../../app/services/postsApi';

const RePost = ({ postId }: any) => {
  const postRegex = /posts\/([a-z0-9]+)$/i;
  const match = postRegex.exec(postId);

  const extractedId = match ? match[1] : '';

  const { data } = useGetPostByIdQuery(extractedId);

  if (!data) {
    return (
      <h2 className="bg-gray-300 mx-auto p-3 rounded-xl font-bold text-gray-700">
        Запись не найдена
      </h2>
    );
  }

  return (
    <div className="m-auto bg-gray-100 p-3 px-6 rounded-2xl">
      <Card
        avatarUrl={data.author.avatarUrl}
        name={data.author.username}
        authorId={data.authorId}
        content={data.content}
        cardFor={'post'}
        id={data.id}
        createdAt={data.createdAt}
        commentsCount={data.comments.length}
        likesCount={data.likes.length}
        dislikesCount={data.dislikes.length}
        topicData={data.topic}
        categoryData={data.category}
        tagsData={data.postTags}
      />
    </div>
  );
};

export default RePost;
