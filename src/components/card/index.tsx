import React, { useState } from 'react'
import { useCreateLikeMutation, useDeleteLikeMutation } from '../../app/services/likesApi'
import { useDeletePostByIdMutation, useGetAllPostsQuery, useLazyGetAllPostsQuery, useLazyGetPostByIdQuery } from '../../app/services/postsApi'
import { useDeleteCommentMutation } from '../../app/services/commentsApi'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrent } from '../../features/UserSlice'
import {
  Card as NextUICard,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
  Spinner,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react"
import { User } from '../user'
import { formatToClientDate } from '../../utils/format-to-client-date'
import { RiDeleteBinLine } from 'react-icons/ri'
import { TextContent } from '../text-content'
import { MetaData } from '../meta-data'
import { MdInsertLink, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { FaRegComment } from 'react-icons/fa'
import { ErrorMessage } from '../error-message'
import { existErrorField } from '../../utils/exist-error-field'
import { useCreateDislikeMutation, useDeleteDislikeMutation } from '../../app/services/dislikesApi'
import CurrentPostBody from '../current-post-body'
import { BiRepost } from 'react-icons/bi'
import { HiPencil } from 'react-icons/hi'

type CardProps = {
  avatarUrl?: string
  name?: string
  authorId?: string
  content?: string
  commentId?: string
  likesCount?: number
  dislikesCount?: number
  commentsCount?: number
  createdAt?: Date
  id?: string
  cardFor: "comment" | "post" | "current-post"
  likedByUser?: boolean
  dislikedByUser?: boolean,
  topicData?: any,
  categoryData?: any,
  tagsData?: any,
}

export const Card = ({
  avatarUrl = "",
  name = "",
  content = "",
  authorId = "",
  id = "",
  likesCount = 0,
  dislikesCount = 0,
  commentsCount = 0,
  cardFor = "post",
  likedByUser = false,
  dislikedByUser = false,
  createdAt,
  commentId = "",
  topicData = '',
  categoryData = '',
  tagsData = ''
}: CardProps) => {

  const [likePost] = useCreateLikeMutation()
  const [unlikePost] = useDeleteLikeMutation()
  const [dislikePost] = useCreateDislikeMutation()
  const [unDislikePost] = useDeleteDislikeMutation()
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery()
  const [triggerGetPostById] = useLazyGetPostByIdQuery()
  const [likedByUserState, setLikedByUserState] = useState(likedByUser)
  const [likesCountState, setLikesCountState] = useState(likesCount)
  const [dislikedByUserState, setDislikedByUserState] = useState(dislikedByUser)
  const [dislikesCountState, setDislikesCountState] = useState(dislikesCount)
  const [deletePost, deletePostStatus] = useDeletePostByIdMutation()
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation()
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrent)
  let filteredBlocks: any[] = [];

  if (cardFor === 'post') {
    filteredBlocks = JSON.parse(content).filter((item: any) => item.isShowed);
  }


  const refetchPosts = async () => {
    switch (cardFor) {
      case "post":
        await triggerGetAllPosts({ page: 1 }).unwrap()
        break
      case "current-post":
        await triggerGetPostById(id).unwrap()
        break
      case "comment":
        await triggerGetPostById(id).unwrap()
        break
      default:
        throw new Error("Неверный аргумент cardFor")
    }
  }

  const handleClick = async (likeOrDislike: string) => {
    try {
      switch (likeOrDislike) {
        case 'like': {
          if (likedByUserState) {
            await unlikePost(id).unwrap();
            setLikesCountState(likesCountState - 1);
          } else {
            await likePost(id).unwrap();
            setLikesCountState(likesCountState + 1);
          }
          setLikedByUserState(!likedByUserState)
          break;
        }
        case 'dislike': {
          if (dislikedByUserState) {
            await unDislikePost(id).unwrap();
            setDislikesCountState(dislikesCountState - 1);
          } else {
            await dislikePost(id).unwrap();
            setDislikesCountState(dislikesCountState + 1);
          }
          setDislikedByUserState(!dislikedByUserState);
          break;
        };
      }
      
    } catch (err) {
      if (existErrorField(err)) {
        setError(err.data.error)
      } else {
        setError(err as string)
      }
    }
  }

  const handleDelete = async () => {
    try {
      switch (cardFor) {
        case "post":
          await deletePost(id).unwrap()
          await refetchPosts()
          break
        case "current-post":
          await deletePost(id).unwrap()
          navigate('/')
          break
        case "comment":
          await deleteComment(commentId).unwrap()
          await refetchPosts()
          break
        default:
          throw new Error("Неверный аргумент cardFor")
      }

    } catch (err) {
      console.log(err)
      if (existErrorField(err)) {
        setError(err.data.error)
      } else {
        setError(err as string)
      }
    }
  }

  return (

    <div className=''><NextUICard className='mb-4 mt-4 max-w-[770px] mx-auto pl-6 pt-4 pr-6' >
      <CardHeader className="justify-between items-center bg-transparent ">
        <div><Link href={`/users/${authorId}`}>
          <User
            username={name}
            className="text-small font-semibold leading-none text-default-600"
            avatarUrl={avatarUrl}
            description={createdAt && formatToClientDate(createdAt)}
          />
        </Link>
          {cardFor !== 'comment' &&
            (<div>
              <div className='flex items-center gap-2 cursor-pointer'><p className='font-semibold text-default-400 text-l'>Категория:</p>
                <Link href={`/categories/${categoryData?.id}`} className='text-primary-400 text-md'>{categoryData?.name}</Link>
              </div><div className='flex items-center gap-2 cursor-pointer'><p className='font-semibold text-default-400 text-l'>В теме:</p>
                <Link className='text-primary-400 text-md'>{topicData.name}</Link>
              </div>
            </div>)}

        </div>
        {(authorId === currentUser?.id) && (
          <>
            <div className='flex gap-4'>
            <Link href={`/post-edit/${id}`}>
            <HiPencil className="cursor-pointer text-2xl" />
          </Link>
              <div className="cursor-pointer text-2xl" onClick={handleDelete}>
                {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
                  <Spinner />
                ) : (
                  <RiDeleteBinLine />
                )}
              </div></div>
          </>


        )}

      </CardHeader>
      <CardBody className="px-3 py-2 mb-5">

        {(cardFor === 'current-post') ?
          <CurrentPostBody content={JSON.parse(content)} /> : (cardFor === 'comment') ?
            <TextContent>{content}</TextContent> :
            <CurrentPostBody content={filteredBlocks}></CurrentPostBody>}
      </CardBody>
      <div className='flex gap-1 ml-4'>
        {tagsData && <>{tagsData?.map((el: any) => {
          return <Popover key={el.id} placement="right">
            <PopoverTrigger>
              <button><span className='bg-gray-400 max-w-[max-content] px-2 py-1 rounded-2xl text-white hover:bg-gray-600'>{el.tag.name}</span></button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <div className=""><Link>Искать посты с этим тегом</Link></div>
                <div className=""><Link>Подписаться на тег</Link></div>
              </div>
            </PopoverContent>
          </Popover>

        })}</>}

      </div>
      {cardFor !== "comment" && (
        <CardFooter className="gap-3">
          <div className="flex gap-5 items-center">
            <div className='bg-blue-200 p-2 rounded-full' onClick={() => handleClick('like')}>
              <MetaData
                count={likesCountState}
                color={likedByUserState ? 'green' : ''}
                Icon={likedByUserState ? MdKeyboardArrowUp : MdKeyboardArrowUp}
              />
            </div>
            <div className='bg-blue-200 p-2 rounded-full' onClick={() => handleClick('dislike')}>
              <MetaData
                count={dislikesCountState}
                color={dislikedByUserState ? 'red' : ''}
                Icon={dislikedByUserState ? MdKeyboardArrowDown : MdKeyboardArrowDown}
              />
            </div>
            <Link href={`/posts/${id}`} >
              <MetaData count={commentsCount} Icon={FaRegComment} />
            </Link>
          </div>
          <CardBody className='flex-row gap-4'><BiRepost className='text-2xl text-gray-400' /><MdInsertLink className='text-2xl text-gray-400' /></CardBody>
          <ErrorMessage error={error} />
        </CardFooter>
      )}
    </NextUICard></div>

  )
}
