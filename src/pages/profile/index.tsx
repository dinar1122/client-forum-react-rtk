import { Card, useDisclosure, Image, Button } from '@nextui-org/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { resetUser, selectCurrent } from '../../features/UserSlice'
import { useGetUserByIdQuery, useLazyCurrentQuery, useLazyGetUserByIdQuery } from '../../app/services/userApi'
import { useDeleteFollowOnUserMutation, useFollowOnUserMutation } from '../../app/services/followsApi'
import { useLazyGetPostByIdQuery } from '../../app/services/postsApi'
import { BackButton } from '../../components/UI/back-button'
import { BASE_URL } from '../../constants'
import { CiEdit } from 'react-icons/ci'
import { MdOutlinePersonAddAlt1, MdOutlinePersonAddDisabled } from 'react-icons/md'
import { formatToClientDate } from '../../utils/format-to-client-date'
import { EditProfile } from '../../components/edit-profile'



const Profile = () => {

  const { id } = useParams<{ id: string }>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const currentUser = useSelector(selectCurrent)
  const { data } = useGetUserByIdQuery(id || '')
  const [followUser] = useFollowOnUserMutation()
  const [unfollowUser] = useDeleteFollowOnUserMutation()

  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery()
  const [triggerCurrentQuery] = useLazyCurrentQuery()

  const dispatch = useDispatch()

  useEffect(
    () => () => {
      dispatch(resetUser())
    },
    [],
  )

  const handleFollow = async () => {
    try {
      if (id) {
        if (data?.isFollowing) { await unfollowUser(id).unwrap() }
        else { console.log({ followingId: id })
           await followUser(id).unwrap() 
          }

        await triggerGetUserByIdQuery(id)

        await triggerCurrentQuery()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = async () => {
    try {
      if (id) {
        await triggerGetUserByIdQuery(id)
        await triggerCurrentQuery()
        onClose()
      }
    } catch (err) {
      console.log(err)
    }
  }

  if (!data) {
    return null
  }
  return (
    <>
      <BackButton></BackButton>
      <div className="flex items-stretch gap-4">
        <Card className="flex flex-col items-center text-center space-y-4 p-5 flex-2">
          <Image
            src={`${BASE_URL}${data?.avatarUrl}`}
            alt={data?.username}
            width={200}
            height={200}
            className="border-4 border-white"
          />
          <div className="flex flex-col text-2xl font-bold gap-4 items-center">
            {data?.username}
            {currentUser?.id !== id ? (
              <Button
                color={data?.isFollowing ? "default" : "primary"}
                variant="flat"
                className="gap-2"
                onClick={handleFollow}
                endContent={
                  data?.isFollowing ? (
                    <MdOutlinePersonAddDisabled />
                  ) : (
                    <MdOutlinePersonAddAlt1 />
                  )
                }
              >
                {data?.isFollowing ? 'Отписаться' : 'Подписаться'}
              </Button>
            ) : (
              <Button
                endContent={<CiEdit />}
                onClick={() => onOpen()}
              >
                Редактировать
              </Button>
            )}
          </div>
        </Card>
        <Card className="flex flex-col space-y-4 p-5 flex-1">
          <p className="font-semibold">
            <span className="text-gray-500 mr-2">Почта:</span>{data.email}
          </p>
          <p className="font-semibold">
            <span className="text-gray-500 mr-2">Город:</span>{data.location}
          </p>
          <p className="font-semibold">
            <span className="text-gray-500 mr-2">Дата рождения:</span>{formatToClientDate(data.dateOfBirth)}
          </p>
          <p className="font-semibold">
            <span className="text-gray-500 mr-2">Обо мне:</span>{data.bio}
          </p>
          <div className="flex gap-2">
            <div className="flex flex-col items-center space-x-2 p-4">
              <span className="text-4xl font-semibold">{data.followers.length}</span>
              <span>Подписчики</span>
            </div>
            <div className="flex flex-col items-center space-x-2 p-4">
              <span className="text-4xl font-semibold">{data.following.length}</span>
              <span>Подписки</span>
            </div>
          </div>
          <EditProfile isOpen={isOpen} onClose={handleClose} user={data} />
        </Card>
      </div>
    </>
  )
}

export default Profile