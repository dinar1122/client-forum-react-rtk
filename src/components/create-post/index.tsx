import { Button, Card, Textarea } from "@nextui-org/react"
import {
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
} from "../../app/services/postsApi"
import { useForm, Controller } from "react-hook-form"
import { ErrorMessage } from "../error-message"
import { CgAdd } from "react-icons/cg"

import { useState } from "react"

import Selector from "../selector"
import { FaEdit } from "react-icons/fa"
import { Link } from "react-router-dom"

export const CreatePost = () => {
  const [createPost] = useCreatePostMutation()
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery()
  const [selectedTopicValue, setSelectedTopicValue] = useState('');
  const [selectedCategoryValue, setSelectedCategoryValue] = useState('');


  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  const onSubmit = handleSubmit(async (data) => {
    try {
      const content = { component: 'TextContent', componentText: data.post, isShowed: true }
      await createPost({ content: JSON.stringify([content]), topicId: selectedTopicValue, categoryId: selectedCategoryValue }).unwrap()
      setValue("post", "")
      await triggerGetAllPosts({ page: 1, tags: [], timeframe: '' }).unwrap()
    } catch (error) {
      console.log("err", error)
    }
  })
  const error = errors?.post?.message as string

  return (
    <form className="flex-grow  " onSubmit={onSubmit}>
      <Card className="p-3 shadow-sm">

        <Controller
          name="post"
          control={control}
          defaultValue=""
          rules={{
            required: "Обязательное поле",
          }}
          render={({ field }) => (
            <Textarea
              {...field}
              labelPlacement="outside"
              placeholder="Что хотите написать?"
              className="m"
            />
          )}
        />
        {errors && <ErrorMessage error={error} />}
        <div className="flex justify-between mt-3 gap-3 ">
          <div className="flex-row w-full"><Selector setFirst={setSelectedCategoryValue} setSecond={setSelectedTopicValue}></Selector></div>
          <div className="flex items-center">
            <Button
              color="default"
              className="flex bg-blue-200 h-full font-semibold text-gray-700"
              startContent={<CgAdd />}
              type="submit"
            >
              Создать пост
            </Button>

            <Button
              startContent={<FaEdit />}
              color="default"
              className="font-semibold text-gray-700 default flex bg-blue-200 ml-3 rounded-xl h-full "
            >
              <Link className="h-full  items-center flex" to='/create'>редактор</Link>

            </Button>

          </div>

        </div>
      </Card>

    </form>
  )
}