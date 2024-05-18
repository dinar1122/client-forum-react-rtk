import React, { useMemo, useState } from 'react';
import MarkdownIt from 'markdown-it';
import { Button, Card, CardBody, Select, SelectItem, Textarea } from '@nextui-org/react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import BlockQuote from '../UI/block-quote';
import { useCreatePostMutation } from '../../app/services/postsApi';
import { TextContent } from '../text-content';
import BlockImage from '../UI/block-image';
import BlockTitle from '../UI/block-title';
import CurrentPostBody from '../current-post-body';
import BlockList from '../UI/block-list';
import { CiCircleMinus, CiTextAlignLeft } from 'react-icons/ci';
import { IoImageOutline } from 'react-icons/io5';
import { FaCode, FaImage, FaListUl, FaQuoteLeft } from 'react-icons/fa';
import { MdOutlineDeleteSweep, MdTitle } from 'react-icons/md';
import { GrTextAlignFull } from 'react-icons/gr';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { useGetCategoryListQuery, useLazyGetCategoryListQuery } from '../../app/services/categoryApi';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../../features/GeneralSlice';
import Selector from '../selector';
import { useNavigate } from 'react-router-dom';
import BlockCode from '../UI/block-code';


const AdvancedCreator = () => {
  const navigate = useNavigate()
  const [createPost] = useCreatePostMutation()
  const [input, setInput] = useState('');
  const [optionsFlag, setoptionsFlag] = useState(false);
  const [selectedOption, setSelectedOption] = useState(1)
  const [textContentToSend, setTextContent] = useState<{ component: string, componentText: string }[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<any>(<TextContent>{input}</TextContent>);

  const [selectedTopicValue, setSelectedTopicValue1] = useState('');
  const [selectedCategoryValue, setSelectedCategoryValue1] = useState('6635a9e1437ba5c877eacbdf');


  const mdParser = new MarkdownIt();








  const handleSaveBlock = () => {
    setTextContent(prevContent => [
      ...prevContent,
      { component: selectedComponent?.type.name, componentText: input }
    ]);
    console.log(textContentToSend)
    setInput('')
  }
  const handleCreatePost = async () => {
    console.log(textContentToSend)
    await createPost({ content: JSON.stringify(textContentToSend), topicId: selectedTopicValue, categoryId: selectedCategoryValue })
    navigate('/')
  }

  const handleInputChange = (e: any) => {
    setInput(e.target.value);
  }
  const handleSelectChange = (value: any) => {
    const optionId = value.target.value
    const selectedOption = options.find((option) => String(option.id) === optionId);
    setSelectedOption(optionId)
    console.log(input)
    if (selectedOption) {
      switch (selectedOption.id) {
        case 1:
          setSelectedComponent(<TextContent>{input}</TextContent>);
          break;
        case 2:
          setSelectedComponent(<BlockImage imageSource={input} />);
          break;
        case 3:
          setSelectedComponent(<BlockTitle titleText={input} />);
          break;
        case 4:
          setSelectedComponent(<BlockList textContent={input} />);
          break;
        case 5:
          setSelectedComponent(<BlockQuote text={input} />);
          break;
        case 6:
          setSelectedComponent(<BlockCode textContent={input} />);
          break;
        default:
          setSelectedComponent(null);
          break;
      }
    }

  }
  const options = [
    { id: 1, name: 'Текст', icon: <GrTextAlignFull className='text-2xl mr-2' /> },
    { id: 2, name: 'Изображение ', icon: <FaImage className='text-2xl mr-2' /> },
    { id: 3, name: 'Заголовок', icon: <MdTitle className='text-2xl mr-2' /> },
    { id: 4, name: 'Элемент списка', icon: <FaListUl className='text-2xl mr-2' /> },
    { id: 5, name: 'Цитата', icon: <FaQuoteLeft className='text-2xl mr-2' /> },
    { id: 6, name: 'Блок кода', icon: <FaCode className='text-2xl mr-2' /> }
  ];
  const renderedMarkdown = mdParser.render(input);

  return (
    <div>
      <Card>
        <CardBody>
          {<CurrentPostBody content={textContentToSend}></CurrentPostBody>}
        </CardBody>
      </Card>
      <Card className='mt-3'>
        <CardBody>
          <div className="w-full flex">
            
            <button className='mr-2 text-gray-400 hover:text-gray-800' onClick={() => setoptionsFlag(!optionsFlag)}> {!optionsFlag ? <AiOutlinePlusCircle className='text-3xl' /> : <AiOutlineMinusCircle className='text-3xl' />}  </button>
            <div className="flex flex-col gap-2 mr-2 ">
              {optionsFlag && <Select
                labelPlacement='outside'
                label="Тип блока"
                className="max-w-xs min-w-[200px] mr-2 "
                value={selectedOption}
                onChange={handleSelectChange}
              >
                {options.map((item: any) => {
                  return <SelectItem startContent={item.icon} key={item.id} >{item.name}</SelectItem>
                })}
              </Select>}



            </div>
            <Textarea
              value={input}
              onChange={handleInputChange}
              variant="bordered"
              labelPlacement="outside"
              placeholder="Enter your description"
              classNames={{
                base: "col-span-12 md:col-span-6 mb-6 md:mb-0 ",
                input: "resize-y min-h-[70px] ",
              }}
            />
            <div><div className='m-2 mr-0 mt-0 '><Button onClick={handleSaveBlock}>Добавить блок</Button></div>
              <div className='m-2 mb-0 mr-0 flex justify-between'>
                <Button isIconOnly startContent={<IoMdArrowDropdown className='text-2xl' />} >
                </Button>
                <Button isIconOnly startContent={<IoMdArrowDropup className='text-2xl' />} >
                </Button>
                <Button isIconOnly startContent={<MdOutlineDeleteSweep className='text-2xl' />} >
                </Button>
              </div>
            </div>


          </div>
        </CardBody>
      </Card>


      {/* <textarea value={input} onChange={handleInputChange} />
      <div  className='text-none' dangerouslySetInnerHTML={{ __html: renderedMarkdown }} /> */}

      <Card className='mt-3 flex-row justify-between'>
        <CardBody className='flex-row w-full'>
          <Selector setFirst={setSelectedCategoryValue1} setSecond={setSelectedTopicValue1} />
        </CardBody>
        <CardBody className='w-[min-content]'>
          {textContentToSend.length > 0 && (
            <div className='flex justify-end h-full'>
              <Button className='h-full' onClick={handleCreatePost}>Опубликовать</Button>
            </div>
          )}
        </CardBody>
      </Card>

    </div>
  );
}

export default AdvancedCreator;