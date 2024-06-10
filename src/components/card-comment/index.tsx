import React, { useEffect, useState } from 'react'
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
    Button,
} from "@nextui-org/react"
import { User } from '../user'
import { formatToClientDate } from '../../utils/format-to-client-date'
import { RiDeleteBinLine } from 'react-icons/ri'
import { TextContent } from '../text-content'
import { useCreateDislikeMutation, useDeleteDislikeMutation } from '../../app/services/dislikesApi'
import { FaReply } from 'react-icons/fa'
import { SlOptions } from 'react-icons/sl'
import { CommentCreator } from '../comment-creator'
import { TbMessageReply } from 'react-icons/tb'
import { PiArrowBendLeftUpBold } from 'react-icons/pi'

type CardProps = {
    reply?: boolean,
    comment?: any,
    avatarUrl?: string
    name?: string
    authorId: string
    content: string
    commentId?: string
    createdAt?: Date
    id?: string,
}

export const CommentCard = ({
    reply = false,

    avatarUrl = "",
    name = "",
    content = "",
    authorId = "",
    id = "",
    createdAt,
    commentId = "",
}: CardProps) => {

    const [triggerGetPostById] = useLazyGetPostByIdQuery()
    const [deletePost, deletePostStatus] = useDeletePostByIdMutation()
    const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation()
    const currentUser = useSelector(selectCurrent)
    const [isReplying, setIsReplying] = useState(false);
    const width = reply ? 'max-w-[700px] ml-[auto] ' : 'max-w-[770px]'


    const refetchPosts = async () => {
        await triggerGetPostById(id).unwrap()
    }


    const handleDelete = async () => {
        console.log(commentId)
        await deleteComment(commentId).unwrap()
        await refetchPosts()
    }

    return (

        <div >
            {/* {reply && <div className="reply-line"></div>} */}
            <NextUICard className={`${width} mt-4 pl-3 pt-3 pb-3 pr-6 z-10 `} >
                <CardHeader className="justify-between items-center bg-transparent pb-0">
                    <div><Link href={`/users/${authorId}`}>
                        <User
                            username={name}
                            className="text-small font-semibold leading-none text-default-600"
                            avatarUrl={avatarUrl}
                            description={formatToClientDate(createdAt, true)}
                        />
                    </Link>

                        {reply && <div className='flex gap-3 mt-3'><PiArrowBendLeftUpBold className='text-2xl'/><div>Ответ на комментарий</div></div>}
                    </div>
                    {(authorId === currentUser?.id) && (
                        <div className="cursor-pointer text-2xl" onClick={handleDelete}>
                            {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
                                <Spinner />
                            ) : (
                                <RiDeleteBinLine />
                            )}
                        </div>
                    )}
                </CardHeader>
                <CardBody >
                    <TextContent>{content}</TextContent>
                </CardBody>
                <CardFooter className='gap-3'>
                    <Button 
                    onClick={() => setIsReplying(!isReplying)}
                    size='sm'
                    variant='ghost'>Ответить</Button>
                     <button><SlOptions /></button>
                </CardFooter>
            </NextUICard>
            {isReplying && <CommentCreator replyId={commentId} width={width} setIsReplying={setIsReplying} />}
            </div>

    )
}
