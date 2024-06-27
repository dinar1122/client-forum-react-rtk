import React, { useEffect, useState } from 'react'
import { useLazyGetPostByIdQuery } from '../../app/services/postsApi'
import { useDeleteCommentMutation } from '../../app/services/commentsApi'
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
import { SlOptions } from 'react-icons/sl'
import { CommentCreator } from '../comment-creator'
import { PiArrowBendLeftUpBold } from 'react-icons/pi'

type CardProps = {
    reply?: boolean,
    replyComment?: any,
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
    replyComment = null,
    avatarUrl = "",
    name = "",
    content = "",
    authorId = "",
    id = "",
    createdAt,
    commentId = "",
}: CardProps) => {

    const [triggerGetPostById] = useLazyGetPostByIdQuery()
    const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation()
    const currentUser = useSelector(selectCurrent)
    const [isReplying, setIsReplying] = useState(false);
    const [replyContentShow, setReplyContentShow] = useState(false);

    const [selectedText, setSelectedText] = useState('')

    const handleMouseUp = () => {
        const text = window.getSelection()?.toString()
        if (text) {
            setSelectedText(text)
        }
    };



    const refetchPosts = async () => {
        await triggerGetPostById(id).unwrap()
    }


    const handleDelete = async () => {
        console.log(commentId)
        await deleteComment(commentId).unwrap()
        await refetchPosts()
    }
    console.log(replyComment)
    return (

        <div >

            <NextUICard className={`mt-4 p-3 z-10 `} >
                <CardHeader className="justify-between items-center bg-transparent pb-0">
                    <div>
                        <div className='flex-row'><Link href={`/users/${authorId}`}>
                            <User
                                username={name}
                                className="text-small font-semibold leading-none text-default-600"
                                avatarUrl={avatarUrl}
                                description={formatToClientDate(createdAt, true)}
                            />
                        </Link>
                            {reply && <div onClick={()=> setReplyContentShow(!replyContentShow)} className='flex-row ml-3 bg-gray-200 p-2 px-3 rounded-xl cursor-pointer font-semibold'>
                                <PiArrowBendLeftUpBold className='text-2xl' />
                                <div>Ответ на комментарий {replyComment.user.username}</div>
                            </div>}
                        </div>
                    </div>

                    {(authorId === currentUser?.id) && (
                        <div className="cursor-pointer text-2xl" onClick={handleDelete}>
                            {deleteCommentStatus.isLoading ? (
                                <Spinner />
                            ) : (
                                <RiDeleteBinLine />
                            )}
                        </div>
                    )}
                </CardHeader>
                {reply && replyContentShow &&
                    <div className='flex-col gap-3 m-3 mb-0 '>

                        <div className='bg-gray-200 p-1 px-3 rounded-lg font-semibold italic text-gray-600'>« {replyComment.content} »</div>
                    </div>}
                <CardBody onMouseUp={handleMouseUp} >
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
            {isReplying && <CommentCreator replyId={commentId} setIsReplying={setIsReplying} quotedText={selectedText} />}
        </div>

    )
}
