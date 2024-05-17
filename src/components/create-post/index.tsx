import { Button, Link, Select, SelectItem, Textarea } from "@nextui-org/react"
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
      await createPost({ content: data.post, topicId: selectedTopicValue, categoryId: selectedCategoryValue }).unwrap()
      setValue("post", "")
      await triggerGetAllPosts().unwrap()
    } catch (error) {
      console.log("err", error)
    }
  })
  const handleSelectChange = (event: any) => {
    setSelectedTopicValue(event.target.value);
  };
  const handleSelectCategoryChange = (event: any) => {
    const categoryId = event.target.value;
    setSelectedCategoryValue(categoryId);
    setSelectedTopicValue('')
  };
  const error = errors?.post?.message as string

  return (
    <form className="flex-grow" onSubmit={onSubmit}>
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
            className="mb-5"
          />
        )}
      />
      {errors && <ErrorMessage error={error} />}
      <div className="flex justify-between">
        <Selector setFirst={setSelectedCategoryValue} setSecond={setSelectedTopicValue}></Selector>
        <div className="h-100 flex items-center">
          <Button
          color="default"
          className="flex bg-blue-200 "
          endContent={<CgAdd />}
          type="submit"
        >
          Создать пост
        </Button>
          <Link className="h-max" href='/create'>
            <Button
            color="default"
            type="button"
            className="font-semibold default flex bg-blue-200 ml-4 rounded-xl"
          >
            редактор
          </Button>
          </Link>
        </div>

      </div>
    </form>
  )
}