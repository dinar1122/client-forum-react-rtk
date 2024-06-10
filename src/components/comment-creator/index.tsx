import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { IoMdCreate, IoMdLink } from "react-icons/io";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "../error-message";
import { useCreateCommentMutation } from "../../app/services/commentsApi";
import { useParams } from "react-router-dom";
import { useLazyGetPostByIdQuery } from "../../app/services/postsApi";
import { Mention, MentionsInput } from 'react-mentions';
import { useLazyGetUsersByUsernameQuery } from "../../app/services/userApi";

export const CommentCreator = ({ replyId = null, width, setIsReplying }: any) => {
  const { id } = useParams<{ id: string }>();
  const [createComment] = useCreateCommentMutation();
  const [getPostById] = useLazyGetPostByIdQuery();
  const [getUserByUsername] = useLazyGetUsersByUsernameQuery();
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [showDecoration, setShowDecoration] = useState(false);
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const fetchUserSuggestions = async (query: any, callback: any) => {
    const users = await getUserByUsername(query).unwrap();
    const suggestions = users
      .filter((user: any) => user.username.toLowerCase().includes(query.toLowerCase()))
      .map((user: any) => ({ id: user.id, display: user.username }));
    callback(suggestions);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (id) {
        await createComment({ content: data.comment, postId: id, replyToCommentId: replyId }).unwrap();
        await getPostById(id).unwrap();
        if (replyId) { setIsReplying(false); }
        setValue("comment", "");
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  const addLinkToComment = () => {
    const linkMarkdown = `!link:[${linkText}](${linkUrl})`;
    const currentComment = getValues("comment") || "";
    setValue("comment", currentComment + linkMarkdown);
    setLinkText('');
    setLinkUrl('');
    setShowLinkInput(false);
  };

  const error = errors?.comment?.message as string;

  return (
    <form className={`flex-grow ${width}`} onSubmit={onSubmit}>
      <Controller
        name="comment"
        control={control}
        defaultValue=""
        rules={{
          required: "Поле обязательно",
        }}
        render={({ field }) => (
          <MentionsInput
            {...field}
            className="mentions"
            placeholder="Напишите свой ответ"
            value={field.value}
            onChange={(e: any) => field.onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                field.onChange(field.value + "\n");
              }
            }}
          >
            <Mention
              className='mentions__dropdown'
              trigger="@"
              data={fetchUserSuggestions}
              displayTransform={(id: any, display: any) => `@${display}`}
            />
          </MentionsInput>
        )}
      />
      {errors && <ErrorMessage error={error} />}
      <div className="flex-row gap-2">
        <Button
          color="primary"
          endContent={<IoMdCreate />}
          type="submit"
        >
          Ответить
        </Button>
        
        {showDecoration ? <>
        <Button
          color="primary"
          endContent={<IoMdLink />}
          onClick={() => setShowLinkInput(!showLinkInput)}
        >
          Сделать ссылкой
        </Button>
        <Button
          color="primary"
          endContent={<IoMdLink />}
          onClick={() => setShowLinkInput(!showLinkInput)}
        >
          Сделать цитатой
        </Button>
        <Button onClick={() => setShowDecoration(!showDecoration)}>Закрыть</Button></> 
        : <Button
          color="primary"
         
          onClick={() => setShowDecoration(!showDecoration)}
        >
          Декорация
        </Button>
        
        }
        
      </div>
      {showLinkInput && (
        <div className="grid grid-cols-1 gap-2 mt-2">
          <Input

            fullWidth
            color="primary"
            size="lg"
            placeholder="Текст ссылки"
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
          />
          <Input

            fullWidth
            color="primary"
            size="lg"
            placeholder="URL ссылки"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
          <Button onClick={addLinkToComment}>
            Добавить ссылку
          </Button>
        </div>
      )}
    </form>
  );
};
