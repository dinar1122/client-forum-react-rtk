import { Button, Card, Link, Select, SelectItem, Textarea } from "@nextui-org/react"
import {
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
} from "../../app/services/postsApi"
import { useForm, Controller } from "react-hook-form"
import { ErrorMessage } from "../error-message"
import { CgAdd } from "react-icons/cg"
import { CustomButton } from "../UI/custom-button"
import { topicApi } from "../../app/services/topicApi"
import { useDispatch, useSelector } from "react-redux"

import { useEffect, useState } from "react"
import { categoryApi } from "../../app/services/categoryApi"
import Selector from "../selector"

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
      await triggerGetAllPosts().unwrap()
    } catch (error) {
      console.log("err", error)
    }
  })
  const error = errors?.post?.message as string

  return (
    <form className="flex-grow " onSubmit={onSubmit}>
      <Card className="p-5">

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
      <div className="flex justify-between mt-3">
        <div className="flex-row w-[60%]"><Selector setFirst={setSelectedCategoryValue} setSecond={setSelectedTopicValue}></Selector></div>
        <div className="h-100 flex items-center">
          <Button
          color="default"
          className="flex bg-blue-200 h-full"
          endContent={<CgAdd />}
          type="submit"
        >
          Создать пост
        </Button>
          <Link className="h-full" href='/create'>
            <Button
            color="default"
            type="button"
            className="font-semibold default flex bg-blue-200 ml-3 rounded-xl h-full "
          >
            редактор
          </Button>
          </Link>
        </div>

      </div>
      </Card>
      
    </form>
  )
}