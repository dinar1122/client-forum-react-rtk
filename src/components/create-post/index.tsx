import { Button, Select, SelectItem, Textarea } from "@nextui-org/react"
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
import { selectGeneralData, setData } from "../../features/GeneralSlice"
import { useEffect, useState } from "react"

export const CreatePost = () => {
  const [createPost] = useCreatePostMutation()
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery()
  const { data } = topicApi.useGetTopicListQuery()
  const [selectedValue, setSelectedValue] = useState('');


  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setData(data))
    }
  }, [data, dispatch])
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createPost({ content: data.post, topicId: selectedValue }).unwrap()
      setValue("post", "")
      await triggerGetAllPosts().unwrap()
    } catch (error) {
      console.log("err", error)
    }
  })
  const handleSelectChange = (event: any) => {
    setSelectedValue(event.target.value);
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
      <div className="flex "><Select
        label="Выберите тему"
        className="max-w-40 mr-4 "
        onChange={handleSelectChange}
        value={selectedValue}
      >
        {data?.map((topic: any) => (
          <SelectItem key={topic.id} value={topic.name}>
            {topic.name}
          </SelectItem>
        ))}
      </Select>
        <CustomButton
          color="default"
          className="flex bg-blue-200"
          endContent={<CgAdd />}
          type="submit"
        >
          Создать пост
        </CustomButton></div>
    </form>
  )
}