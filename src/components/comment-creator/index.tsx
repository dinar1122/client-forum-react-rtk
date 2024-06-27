import React, { useState, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import { IoMdCreate, IoMdLink, IoMdCode } from "react-icons/io";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "../error-message";
import { useCreateCommentMutation } from "../../app/services/commentsApi";
import { useParams } from "react-router-dom";
import { useLazyGetPostByIdQuery } from "../../app/services/postsApi";
import { Mention, MentionsInput } from 'react-mentions';
import { useLazyGetUsersByUsernameQuery } from "../../app/services/userApi";

export const CommentCreator = ({ replyId = null, setIsReplying, quotedText = '' }: any) => {
  const { id } = useParams<{ id: string }>()
  const [createComment] = useCreateCommentMutation()
  const [getPostById] = useLazyGetPostByIdQuery()
  const [getUserByUsername] = useLazyGetUsersByUsernameQuery()
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [showQuoteInput, setShowQuoteInput] = useState(false)
  const [showCodeInput, setShowCodeInput] = useState(false) // State for code input
  const [showDecoration, setShowDecoration] = useState(false)
  const [linkText, setLinkText] = useState('')
  const [quoteText, setQuoteText] = useState(quotedText)
  const [linkUrl, setLinkUrl] = useState('')
  const [codeText, setCodeText] = useState('') // State for code text

  const fetchUserSuggestions = async (query: any, callback: any) => {
    const users = await getUserByUsername(query).unwrap();
    const suggestions = users
      .filter((user: any) => user.username.toLowerCase().includes(query.toLowerCase()))
      .map((user: any) => ({ id: user.id, display: user.username }))
    callback(suggestions)
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues
  } = useForm();

  useEffect(() => {
    if (quotedText) {
      setQuoteText(quotedText);
    }
  }, [quotedText, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (id) {
        await createComment({ content: data.comment, postId: id, replyToCommentId: replyId }).unwrap();
        await getPostById(id).unwrap()
        if (replyId) { setIsReplying(false) }
        setValue("comment", "")
      }
    } catch (error) {
      console.log("err", error)
    }
  });

  const handleCloseForm = () => {
    setShowQuoteInput(false)
    setShowDecoration(false)
    setShowLinkInput(false)
    setShowCodeInput(false) // Close code input form
  }

  const addLinkToComment = () => {
    const linkMarkdown = `!link:[${linkText}](${linkUrl})`
    const currentComment = getValues("comment") || ""
    setValue("comment", currentComment + linkMarkdown)
    setLinkText('')
    setLinkUrl('')
    setShowLinkInput(false)
  };

  const addQuoteComment = async () => {
    const currentComment = getValues("comment") || ""
    setValue('comment', currentComment + `\n> ${quoteText}\n`);
    setQuoteText('')
  }

  const addCodeToComment = () => {
    const codeMarkdown = `!code[${codeText}]!code`
    const currentComment = getValues("comment") || ""
    setValue("comment", currentComment + codeMarkdown)
    setCodeText('')
    setShowCodeInput(false)
  }

  const error = errors?.comment?.message as string;

  return (
    <>
      <form className={`flex-grow mb-8`} onSubmit={onSubmit}>
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
                  e.preventDefault()
                  field.onChange(field.value + "\n")
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
        <div className="flex-row gap-2 justify-between">
          <div className="flex-row gap-2">
            <Button
              color="primary"
              endContent={<IoMdCreate />}
              type="submit"
            >
              Ответить
            </Button>

            {showDecoration ? (
              <>
                <Button
                  variant="ghost"
                  color="primary"
                  endContent={<IoMdLink />}
                  onClick={() => setShowLinkInput(!showLinkInput)}
                >
                  ссылка
                </Button>
                <Button
                  variant="ghost"
                  color="primary"
                  endContent={<IoMdLink />}
                  onClick={() => setShowQuoteInput(!showQuoteInput)}
                >
                  цитата
                </Button>
                <Button
                  variant="ghost"
                  color="primary"
                  endContent={<IoMdCode />}
                  onClick={() => setShowCodeInput(!showCodeInput)}
                >
                  код
                </Button>
                <Button onClick={handleCloseForm}>Закрыть</Button>
              </>
            ) : (
              <Button
                color="primary"
                onClick={() => setShowDecoration(!showDecoration)}
              >
                Декорация
              </Button>
            )}
          </div>
          <Button variant="ghost" onClick={() => setIsReplying(false)}>Закрыть</Button>
        </div>
        {showLinkInput && (
          <div className="grid grid-cols-1 gap-2 mt-2 ">
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
        {showQuoteInput && (
          <div className="grid grid-cols-1 gap-2 mt-2">
            <textarea
              className="resize-y p-2 border border-gray-300 rounded-2xl"
              placeholder="Напишите или выделите цитату в тексте"
              value={quoteText}
              onChange={(e) => setQuoteText(e.target.value)}
            />
            <Button onClick={addQuoteComment}>
              Добавить цитату
            </Button>
          </div>
        )}
        {showCodeInput && (
          <div className="grid grid-cols-1 gap-2 mt-2">
            <textarea
              className="resize-y p-2 border border-gray-300 rounded-2xl"
              placeholder="Введите ваш код"
              value={codeText}
              onChange={(e) => setCodeText(e.target.value)}
            />
            <Button onClick={addCodeToComment}>
              Добавить блок кода
            </Button>
          </div>
        )}
      </form>
    </>
  );
};
