import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, CardBody, CardFooter, Input, Listbox, ListboxItem, Select, SelectItem, Textarea } from '@nextui-org/react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { useCreatePostMutation, useUpdatePostByIdMutation } from '../../app/services/postsApi';
import { TextContent } from '../text-content';
import BlockImage from '../UI/block-image';
import BlockTitle from '../UI/block-title';
import CurrentPostBody from '../current-post-body';
import BlockList from '../UI/block-list';
import { FaCode, FaImage, FaListUl, FaQuoteLeft } from 'react-icons/fa';
import { MdOutlineDeleteSweep, MdOutlineOndemandVideo, MdTitle } from 'react-icons/md';
import { GrTextAlignFull } from 'react-icons/gr';
import Selector from '../selector';
import { useNavigate } from 'react-router-dom';
import { BiRepost } from 'react-icons/bi';
import { TbTools, TbToolsOff } from 'react-icons/tb';
import { useLazyGetAllTagsQuery } from '../../app/services/tagsApi';
import SearchList from '../search-list';


const AdvancedCreator = ({ data = null }: any) => {
  const navigate = useNavigate()
  const [createPost] = useCreatePostMutation()
  const [updatePost] = useUpdatePostByIdMutation()

  const [getTags] = useLazyGetAllTagsQuery()
  const [tagList, setTagList] = useState();
  const [selectionTags, setSelectionTags] = useState([]);


  const [input, setInput] = useState('');
  const [optionsFlag, setoptionsFlag] = useState(false);
  const [selectedOption, setSelectedOption] = useState(1)
  const [error, setError] = useState('');
  const [editor, setEditor] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)

  const [textContentToSend, setTextContent] = useState<{ component: string, componentText: string }[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<any>('TextContent');

  const [selectedTopicValue, setSelectedTopicValue] = useState('');
  const [selectedCategoryValue, setSelectedCategoryValue] = useState('');

  const options = [
    { id: 1, name: 'Текст', icon: <GrTextAlignFull className='text-2xl mr-2' /> },
    { id: 2, name: 'Изображение ', icon: <FaImage className='text-2xl mr-2' /> },
    { id: 3, name: 'Заголовок', icon: <MdTitle className='text-2xl mr-2' /> },
    { id: 4, name: 'Элемент списка', icon: <FaListUl className='text-2xl mr-2' /> },
    { id: 5, name: 'Цитата', icon: <FaQuoteLeft className='text-2xl mr-2' /> },
    { id: 6, name: 'Блок кода', icon: <FaCode className='text-2xl mr-2' /> },
    { id: 7, name: 'Пост', icon: <BiRepost className='text-2xl mr-2' /> },
    { id: 8, name: 'Видео', icon: <MdOutlineOndemandVideo className='text-2xl mr-2' /> },

  ];
  const componentMap = {
    1: 'TextContent',
    2: 'BlockImage',
    3: 'BlockTitle',
    4: 'BlockList',
    5: 'TextContent',
    6: 'BlockCode',
    7: 'RePost'
  };


  useEffect(() => {
    if (data) {
      setTextContent(JSON.parse(data?.content));
      setIsUpdating(true)
      setSelectedCategoryValue(data.categoryId)
      setSelectedTopicValue(data.topicId)
    }
  }, [data]);

  const handleGetTags = async () => {
    const { data } = await getTags()
    setTagList(data)
    console.log(data)
  }

  const handleAddTag = (newTag) => {
    console.log(newTag)

    if (!selectionTags.some(tag => tag.id === newTag.id)) {
      setSelectionTags([
        ...selectionTags,
        newTag
      ]);
      setError('')
    } else {
      setError('Вы уже добавили этот тег')
    }
    
  };
  const handleSaveBlock = () => {

    if (input.trim() === '') {
      setError('Поле должно быть заполнено');
    } else {
      setError('');
      let modifiedInput = input;

      if (selectedOption == 5) {
        modifiedInput = `> ${input}`;
      }

      setInput(modifiedInput);

      setTextContent(prevContent => [
        ...prevContent,
        { component: selectedComponent || 'TextContent', componentText: modifiedInput, isShowed: false, spoiler: false },
      ]);
      setInput('');
      console.log(textContentToSend);
    }

  };
  const handleCreatePost = async () => {

    if (selectedCategoryValue == '' || selectedTopicValue == '') {
      setError(`Выберите категорию и тему`)
    } else {
      console.log(textContentToSend)
      await createPost({ content: JSON.stringify(textContentToSend), topicId: selectedTopicValue, categoryId: selectedCategoryValue, postTags: selectionTags })
      navigate('/')
    }
  }
  const handleUpdatePost = async () => {
    console.log(textContentToSend)
    await updatePost({ postId: data.id, content: JSON.stringify(textContentToSend), topicId: selectedTopicValue, categoryId: selectedCategoryValue, postTags: selectionTags })
    navigate('/')
  }


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim() === '') {
      setError('Поле должно быть заполнено');
    } else {
      setError('');
    }

   /*  const postRegex = /^http:\/\/localhost:5173\/posts\/[a-z0-9]+$/i;

    if (postRegex.exec(value.trim())) {
      setSelectedComponent(componentMap[7]);
    }
 */
  }
  const handleSelectChange = (value: any) => {
    const optionId = value.target.value
    const selectedOption = options.find((option) => String(option.id) === optionId);
    setSelectedOption(optionId)
    console.log(selectedOption)
    if (selectedOption) {
      setSelectedComponent(componentMap[selectedOption.id])
    }

  }

  return (
    <div>
      <Card>
        <CardBody>
          {<CurrentPostBody content={textContentToSend} editor={editor} onUpdateContent={setTextContent}></CurrentPostBody>}
        </CardBody>
      </Card>
      <Card className='mt-3'>
        <CardBody>
          <div className="w-full flex">

            <Button
              isIconOnly
              className='mr-2 text-gray-400 hover:text-gray-800 h-22'
              onClick={() => setoptionsFlag(!optionsFlag)}>
              {!optionsFlag ? <AiOutlinePlusCircle className='text-3xl' /> :
                <AiOutlineMinusCircle className='text-3xl' />}
            </Button>
            {optionsFlag && <div className="flex flex-col gap-2 pr-2 ">
              <Select
                labelPlacement='outside'
                label="Тип блока"
                className="max-w-xs min-w-[200px] mr-2"
                value={selectedOption}
                onChange={handleSelectChange}
              >
                {options.map((item: any) => {
                  return <SelectItem startContent={item.icon} key={item.id} >{item.name}</SelectItem>
                })}
              </Select>
            </div>}

            <Textarea
              value={input}
              onChange={handleInputChange}
              variant="bordered"
              labelPlacement="outside"
              placeholder="Напишите что-то ..."
              classNames={{
                base: "col-span-12 md:col-span-6 mb-6 md:mb-0",
                input: "resize-y min-h-[70px] text-lg/7 transition duration-300",
              }}
            />
          </div>
          {error && <div className="text-red-500 m-auto">{error}</div>}
        </CardBody>
        <CardFooter className='pt-0'>
          <CardBody className='p-0 flex-row justify-between gap-2'>

            <div>
              <Button onClick={handleGetTags}>Добавить теги</Button>
              {(selectionTags).map((tag) => {
                return <button key={tag.name}><span className='bg-gray-400 max-w-[max-content] px-2 py-1 rounded-2xl text-white hover:bg-gray-600'>{tag.name}</span></button>
              })}
              {tagList && <SearchList list={tagList} onSearchResult={handleAddTag}></SearchList>}
              
            </div>
            <div className='py-0 flex-row justify-end gap-2'>
              <Button onClick={handleSaveBlock}>Добавить блок</Button>
              <Button onClick={() => { setEditor(!editor) }} isIconOnly className='text-2xl' startContent={editor ? <TbToolsOff /> : <TbTools />} >
              </Button>
              <Button onClick={() => { setInput('') }} isIconOnly startContent={<MdOutlineDeleteSweep className='text-2xl' />} >
              </Button>
            </div>
          </CardBody>
        </CardFooter>
      </Card>

      <Card className='mt-3 flex-row justify-between'>
        <CardBody className='flex-row w-full'>
          <Selector setFirst={setSelectedCategoryValue} setSecond={setSelectedTopicValue} />
        </CardBody>
        <CardBody className='w-[min-content]'>
          {textContentToSend.length > 0 && (
            <div className='flex justify-end h-full'>
              {isUpdating ? <Button className='h-full' onClick={handleUpdatePost}>Сохранить</Button> :
                <Button className='h-full' onClick={handleCreatePost}>Опубликовать</Button>}
            </div>
          )}
        </CardBody>
      </Card>

    </div>
  );
}

export default AdvancedCreator;