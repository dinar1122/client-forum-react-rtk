import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react';

import {
  useCreatePostMutation,
  useUpdatePostByIdMutation,
} from '../../app/services/postsApi';
import CurrentPostBody from '../current-post-body';

import { FaCode, FaImage, FaListUl, FaQuoteLeft } from 'react-icons/fa';
import {
  MdOutlineDeleteSweep,
  MdOutlineOndemandVideo,
  MdTitle,
} from 'react-icons/md';
import { GrTextAlignFull } from 'react-icons/gr';
import Selector from '../selector';
import { useNavigate } from 'react-router-dom';
import { BiRepost } from 'react-icons/bi';
import { TbTools, TbToolsOff } from 'react-icons/tb';
import {
  useCreateTagMutation,
  useLazyGetAllTagsQuery,
} from '../../app/services/tagsApi';
import SearchList from '../search-list';
import TagItem from '../tag-item';
import useTags from '../../features/useTags';
import { ErrorMessage } from '../error-message';

const AdvancedCreator = ({ data = null }: any) => {
  const navigate = useNavigate();
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostByIdMutation();

  const [getTags] = useLazyGetAllTagsQuery();
  const [tagList, setTagList] = useState<any>([]);
  const {
    selectionTags,
    error,
    handleAddTag,
    handleRemoveTag,
    setSelectionTags,
    setError,
  } = useTags();
  const [selectionTagsClosed, setSelectionTagsClosed] = useState(true);
  const [createTag] = useCreateTagMutation();

  const [input, setInput] = useState('');
  const [selectedOption, setSelectedOption] = useState(1);
  const [editor, setEditor] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const [textContentToSend, setTextContent] = useState<
    { component: string; componentText: string }[]
  >([]);
  const [selectedComponent, setSelectedComponent] =
    useState<any>('TextContent');

  const [selectedTopicValue, setSelectedTopicValue] = useState('');
  const [selectedCategoryValue, setSelectedCategoryValue] = useState('');

  const options = [
    { id: 1, name: 'Текст', icon: <GrTextAlignFull className="text-2xl mr-2" />,},
    { id: 2, name: 'Изображение ',  icon: <FaImage className="text-2xl mr-2" />, },
    { id: 3, name: 'Заголовок', icon: <MdTitle className="text-2xl mr-2" /> },
    { id: 4, name: 'Элемент списка', icon: <FaListUl className="text-2xl mr-2" />,},
    { id: 5, name: 'Цитата', icon: <FaQuoteLeft className="text-2xl mr-2" /> },
    { id: 6, name: 'Блок кода', icon: <FaCode className="text-2xl mr-2" /> },
    { id: 7, name: 'Пост', icon: <BiRepost className="text-2xl mr-2" /> },
    { id: 8, name: 'Видео',icon: <MdOutlineOndemandVideo className="text-2xl mr-2" />,},
  ];
  const componentMap: { [key: number]: string } = {
    1: 'TextContent',
    2: 'BlockImage',
    3: 'BlockTitle',
    4: 'BlockList',
    5: 'TextContent',
    6: 'BlockCode',
    7: 'RePost',
  };

  useEffect(() => {
    if (data) {
      setTextContent(JSON.parse(data?.content));
      setIsUpdating(true);
      const existingTags = data.postTags.map((tag: any) => tag.tag);
      setSelectionTags(existingTags);
      setSelectedCategoryValue(data.categoryId);
      setSelectedTopicValue(data.topicId);
    }
  }, [data]);

  const createTagNRefetch = (name: string) => {
    createTag(name);
    handleGetTags();
  };

  const handleGetTags = async () => {
    const { data } = await getTags();
    setTagList(data);
    setSelectionTagsClosed(false);
  };

  const handleSaveBlock = () => {
    console.log(textContentToSend);
    if (input.trim() === '') {
      setError('Поле должно быть заполнено');
    } else {
      setError('');
      let modifiedInput = input;

      if (selectedOption == 5) {
        modifiedInput = `> ${input}`;
      }

      setInput(modifiedInput);

      setTextContent((prevContent) => [
        ...prevContent,
        {
          component: selectedComponent || 'TextContent',
          componentText: modifiedInput,
          isShowed: false,
          spoiler: false,
        },
      ]);
      setInput('');
    }
  };
  const handleCreatePost = async () => {
    if (selectedCategoryValue == '' || selectedTopicValue == '') {
      setError(`Выберите категорию и тему`);
    } else {
      await createPost({
        content: JSON.stringify(textContentToSend),
        topicId: selectedTopicValue,
        categoryId: selectedCategoryValue,
        postTags: selectionTags,
      });
      navigate('/');
    }
  };
  const handleUpdatePost = async () => {
    await updatePost({
      postId: data.id,
      content: JSON.stringify(textContentToSend),
      topicId: selectedTopicValue,
      categoryId: selectedCategoryValue,
      postTags: selectionTags,
    });
    navigate('/');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim() === '') {
      setError('Поле должно быть заполнено');
    } else {
      setError('');
    }
  };
  const handleSelectChange = (value: any) => {
    const optionId = value.target.value;
    const selectedOption = options.find(
      (option) => String(option.id) === optionId,
    );
    setSelectedOption(optionId);
    console.log(selectedOption);
    if (selectedOption) {
      setSelectedComponent(componentMap[selectedOption.id]);
    }
  };

  return (
    <div>
      {textContentToSend.length > 0 && (
        <Card>
          <CardBody>
            {
              <CurrentPostBody
                content={textContentToSend}
                editor={editor}
                onUpdateContent={setTextContent}
              ></CurrentPostBody>
            }
          </CardBody>
          <CardBody className="flex-row gap-1">
            {selectionTags.map((tag: any) => {
              return (
                <TagItem
                  key={tag.name}
                  tag={tag}
                  deleteMethod={handleRemoveTag}
                ></TagItem>
              );
            })}
          </CardBody>
        </Card>
      )}
      <Card className="mt-3">
        <CardBody>
          <div className="w-full flex">
            <Textarea
              value={input}
              onChange={handleInputChange}
              variant="bordered"
              labelPlacement="outside"
              placeholder="Напишите что-то ..."
              classNames={{
                base: 'col-span-12  md:col-span-6 mb-6 md:mb-0',
                input:
                  'resize-y min-h-[70px] text-lg/7 transition duration-300',
              }}
            />
          </div>
          {<ErrorMessage error={error} />}
        </CardBody>
        <CardFooter className="pt-0">
          <CardBody className="p-0 flex-row justify-between gap-2">
            <div className="w-full">
              {selectionTagsClosed ? (
                <Button
                  onClick={handleGetTags}
                  className="text-sm text-gray-600 bg-gray-200 px-3 py-1 font-semibold"
                >
                  Добавить теги
                </Button>
              ) : (
                <>
                  {tagList && (
                    <div className="flex-row gap-2">
                      <div className="w-full">
                        <SearchList
                          methodIfEmpty={createTagNRefetch}
                          list={tagList}
                          onSearchResult={handleAddTag}
                        ></SearchList>
                      </div>
                      <Button
                        isIconOnly
                        onClick={() => {
                          setSelectionTagsClosed(!selectionTagsClosed);
                        }}
                      >
                        X
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="py-0 flex-row justify-end gap-2">
              {selectionTagsClosed && (
                <div className="flex flex-col gap-2 pr-2 ">
                  <Select
                    aria-label="Выберите тип блока"
                    labelPlacement="outside-left"
                    placeholder="Выберите тип блока"
                    className="h-4 min-w-[200px] mr-2"
                    value={selectedOption}
                    onChange={handleSelectChange}
                  >
                    {options.map((item: any) => {
                      return (
                        <SelectItem startContent={item.icon} key={item.id}>
                          {item.name}
                        </SelectItem>
                      );
                    })}
                  </Select>
                </div>
              )}
              <Button
                onClick={handleSaveBlock}
                className="text-sm text-gray-600 bg-gray-200 px-3 py-1 font-semibold"
              >
                Добавить блок
              </Button>
              <Button
                onClick={() => {
                  setEditor(!editor);
                }}
                isIconOnly
                className="text-2xl"
                startContent={editor ? <TbToolsOff /> : <TbTools />}
              ></Button>
              <Button
                onClick={() => {
                  setInput('');
                }}
                isIconOnly
                startContent={<MdOutlineDeleteSweep className="text-2xl" />}
              ></Button>
            </div>
          </CardBody>
        </CardFooter>
      </Card>

      <Card className="mt-3 flex-row justify-between">
        <CardBody className="flex-row w-full">
          <Selector
            setFirst={setSelectedCategoryValue}
            setSecond={setSelectedTopicValue}
          />
        </CardBody>

        {textContentToSend.length > 0 && (
          <CardBody className="w-[min-content]">
            <div className="flex justify-end ">
              {isUpdating ? (
                <Button
                  className="text-sm text-gray-600 bg-gray-200 h-12 px-6 font-semibold"
                  onClick={handleUpdatePost}
                >
                  Сохранить
                </Button>
              ) : (
                <Button
                  className="text-sm text-gray-600 bg-gray-200 h-12 px-6 font-semibold"
                  onClick={handleCreatePost}
                >
                  Опубликовать
                </Button>
              )}
            </div>
          </CardBody>
        )}
      </Card>
    </div>
  );
};

export default AdvancedCreator;
