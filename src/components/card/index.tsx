import React, { useState } from 'react';
import {
  useCreateLikeMutation,
  useDeleteLikeMutation,
} from '../../app/services/likesApi';
import {
  useDeletePostByIdMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from '../../app/services/postsApi';
import { useNavigate, Link as LinkRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrent, selectCurrentTagsSubs } from '../../features/UserSlice';
import {
  Card as NextUICard,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
  Spinner,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
} from '@nextui-org/react';
import { User } from '../user';
import { formatToClientDate } from '../../utils/format-to-client-date';
import { RiDeleteBinLine } from 'react-icons/ri';
import { MetaData } from '../meta-data';
import {
  MdInsertLink,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from 'react-icons/md';
import { FaRegComment } from 'react-icons/fa';
import { ErrorMessage } from '../error-message';
import { existErrorField } from '../../utils/exist-error-field';
import {
  useCreateDislikeMutation,
  useDeleteDislikeMutation,
} from '../../app/services/dislikesApi';
import CurrentPostBody from '../current-post-body';
import { HiPencil } from 'react-icons/hi';
import TagItem from '../tag-item';
import { BASE_URL } from '../../constants';

type CardProps = {
  avatarUrl?: string;
  name?: string;
  authorId?: string;
  content?: string;
  commentId?: string;
  likesCount?: number;
  dislikesCount?: number;
  commentsCount?: number;
  createdAt?: Date;
  id?: string;
  cardFor: 'post' | 'current-post';
  likedByUser?: boolean;
  dislikedByUser?: boolean;
  topicData?: any;
  categoryData?: any;
  tagsData?: any;
  subscribedTagIds?: any;
  page?: any;
};

export const Card = ({
  avatarUrl = '',
  name = '',
  content = '',
  authorId = '',
  id = '',
  likesCount = 0,
  dislikesCount = 0,
  commentsCount = 0,
  cardFor = 'post',
  likedByUser = false,
  dislikedByUser = false,
  createdAt,
  topicData = '',
  categoryData = '',
  tagsData = '',
  subscribedTagIds = '',
  page = '',
}: CardProps) => {
  tagsData = tagsData.map((tag: any) => tag.tag);
  const [likePost] = useCreateLikeMutation();
  const [unlikePost] = useDeleteLikeMutation();
  const [dislikePost] = useCreateDislikeMutation();
  const [unDislikePost] = useDeleteDislikeMutation();
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery();
  const [triggerGetPostById] = useLazyGetPostByIdQuery();
  const [likedByUserState, setLikedByUserState] = useState(likedByUser);
  const [likesCountState, setLikesCountState] = useState(likesCount);
  const [dislikedByUserState, setDislikedByUserState] =
    useState(dislikedByUser);
  const [dislikesCountState, setDislikesCountState] = useState(dislikesCount);
  const [deletePost, deletePostStatus] = useDeletePostByIdMutation();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrent);
  let filteredBlocks: any[] = [];

  if (cardFor === 'post') {
    filteredBlocks = JSON.parse(content).filter((item: any) => item.isShowed);
  }
  let updatedTagsData = [...tagsData];

  if (subscribedTagIds) {
    updatedTagsData = tagsData.map((tag: any) => ({
      ...tag,
      isSubscribed: subscribedTagIds.has(tag.id),
    }));
  }

  const refetchPosts = async () => {
    switch (cardFor) {
      case 'post':
        await triggerGetAllPosts({
          page: page,
          tags: [],
          timeframe: '',
        }).unwrap();
        break;
      case 'current-post':
        await triggerGetPostById(id).unwrap();
        break;
      default:
        throw new Error('Неверный аргумент cardFor');
    }
  };

  const handleClick = (likeOrDislike: string) => {
    try {
      switch (likeOrDislike) {
        case 'like': {
          if (likedByUserState) {
            setLikesCountState(likesCountState - 1);
            unlikePost(id).unwrap();
          } else {
            setLikesCountState(likesCountState + 1);
            likePost(id).unwrap();
          }
          setLikedByUserState(!likedByUserState);
          break;
        }
        case 'dislike': {
          if (dislikedByUserState) {
            setDislikesCountState(dislikesCountState - 1);
            unDislikePost(id).unwrap();
          } else {
            setDislikesCountState(dislikesCountState + 1);
            dislikePost(id).unwrap();
          }
          setDislikedByUserState(!dislikedByUserState);
          break;
        }
      }
    } catch (err) {
      if (existErrorField(err)) {
        setError(err.data.error);
      } else {
        setError(err as string);
      }
    }
  };

  const handleDelete = async () => {
    try {
      switch (cardFor) {
        case 'post':
          await deletePost(id).unwrap();
          await refetchPosts();
          break;
        case 'current-post':
          await deletePost(id).unwrap();
          navigate('/');
          break;
        default:
          throw new Error('Неверный аргумент cardFor');
      }
    } catch (err) {
      console.log(err);
      if (existErrorField(err)) {
        setError(err.data.error);
      } else {
        setError(err as string);
      }
    }
  };

  return (
    <div className="">
      <NextUICard className="mb-4  mx-auto pl-6 pt-4 pr-6 shadow-sm border">
        <CardHeader className="justify-between items-center bg-transparent ">
          <div>
            <Link href={`/users/${authorId}`}>
              <User
                username={name}
                className="text-small font-semibold leading-none text-default-600"
                avatarUrl={avatarUrl}
                description={createdAt && formatToClientDate(createdAt)}
              />
            </Link>
            {
              <div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <p className="font-semibold text-default-400 text-l">
                    Категория:
                  </p>
                  <Link
                    href={`/categories/${categoryData?.id}`}
                    className="text-primary-400 text-md"
                  >
                    {categoryData?.name}
                  </Link>
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <p className="font-semibold text-default-400 text-l">
                    В теме:
                  </p>
                  <Link
                    href={`/categories/topic/${topicData?.id}`}
                    className="text-primary-400 text-md"
                  >
                    {topicData.name}
                  </Link>
                </div>
              </div>
            }
          </div>
          {authorId === currentUser?.id && (
            <>
              <div className="flex gap-4">
                <Link href={`/post-edit/${id}`}>
                  <HiPencil className="cursor-pointer text-2xl" />
                </Link>
                <div className="cursor-pointer text-2xl" onClick={handleDelete}>
                  {deletePostStatus.isLoading ? (
                    <Spinner />
                  ) : (
                    <RiDeleteBinLine />
                  )}
                </div>
              </div>
            </>
          )}
        </CardHeader>
        <CardBody className="px-3 py-2 mb-5">
          {cardFor === 'current-post' ? (
            <CurrentPostBody content={JSON.parse(content)} />
          ) : (
            <CurrentPostBody content={filteredBlocks}></CurrentPostBody>
          )}
        </CardBody>
        <div className="flex gap-1 ml-4">
          {updatedTagsData && (
            <>
              {updatedTagsData?.map((tag: any) => {
                return <TagItem key={tag.id} tag={tag} />;
              })}
            </>
          )}
        </div>
        {
          <CardFooter className="gap-3">
            <div className="flex gap-5 items-center">
              <div
                className="bg-blue-100 p-2 rounded-xl"
                onClick={() => handleClick('like')}
              >
                <MetaData
                  count={likesCountState}
                  color={likedByUserState ? 'green' : ''}
                  Icon={
                    likedByUserState ? MdKeyboardArrowUp : MdKeyboardArrowUp
                  }
                />
              </div>
              <div
                className="bg-blue-100 p-2 rounded-xl"
                onClick={() => handleClick('dislike')}
              >
                <MetaData
                  count={dislikesCountState}
                  color={dislikedByUserState ? 'red' : ''}
                  Icon={
                    dislikedByUserState
                      ? MdKeyboardArrowDown
                      : MdKeyboardArrowDown
                  }
                />
              </div>
              <LinkRouter to={`/posts/${id}`}>
                <MetaData count={commentsCount} Icon={FaRegComment} />
              </LinkRouter>
            </div>
            <CardBody className="flex-row gap-4">
              <Popover placement="bottom" showArrow={true}>
                <PopoverTrigger>
                  <button>
                    <MdInsertLink
                      type="button"
                      className="text-3xl text-gray-400 hover:text-gray-600"
                    />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex-row gap-2">
                  <div
                    id="link"
                    className="text-lg font-semibold text-blue-600 mt-1"
                  >{`${BASE_URL}/posts/${id}`}</div>
                  <button
                    className="code bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                    data-clipboard-target="#link"
                  >
                    Копировать
                  </button>
                </PopoverContent>
              </Popover>
            </CardBody>
            <ErrorMessage error={error} />
          </CardFooter>
        }
      </NextUICard>
    </div>
  );
};
