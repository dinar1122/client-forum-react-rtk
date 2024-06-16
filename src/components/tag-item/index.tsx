import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { HiOutlineTrash } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { useCreateSubMutation, useDeleteSubMutation } from '../../app/services/tagsApi'


const TagItem = ({ tag, deleteMethod = null }: any) => {

  const [subscribeTag] = useCreateSubMutation()
  const [unsubscribeTag] = useDeleteSubMutation()


  if (deleteMethod === null) {
    return <Popover placement="right">
      <PopoverTrigger>
        <button

          className='bg-gray-400  px-2 py-1 rounded-2xl text-white hover:bg-gray-600 flex-row'
        >
          <span >{tag.name} </span> {deleteMethod && < HiOutlineTrash className='mx-1 m-auto' />}
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-0">

        <div >
          <div className="p-2 bg-gray-200 rounded-t-xl hover:bg-gray-300 font-semibold text-gray-600">
            <Link to={`/search?q=&tags=${tag.id}`}>Искать посты с этим тегом</Link>
          </div>
          <div className="p-2 bg-gray-200 rounded-b-xl hover:bg-gray-300 font-semibold text-gray-600 ">
            {tag.isSubscribed ? <button onClick={() => unsubscribeTag(tag.id)}>Отписаться от тега</button> : <button onClick={() => subscribeTag(tag.id)}>Подписаться на тег</button>}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  }
  return (
    <button
      onClick={() => { deleteMethod(tag.id) }}
      className='bg-gray-400  px-2 py-1 rounded-2xl text-white hover:bg-gray-600 flex-row'
    >
      <span >{tag.name} </span> {deleteMethod && < HiOutlineTrash className='mx-1 m-auto' />}
    </button>
  )
}

export default TagItem