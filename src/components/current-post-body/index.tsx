import React, { useState } from 'react';
import BlockQuote from '../UI/block-quote';
import { TextContent } from '../text-content';
import BlockImage from '../UI/block-image';
import BlockTitle from '../UI/block-title';
import BlockList from '../UI/block-list';
import BlockCode from '../UI/block-code';
import { Button, Textarea } from '@nextui-org/react';
import { HiOutlineEye, HiOutlineEyeOff, HiPencil, HiOutlineArrowUp, HiOutlineArrowDown, HiOutlineTrash } from 'react-icons/hi';
import RePost from '../re-post';
import Spoiler from '../UI/spoiler'
import { TbNews, TbNewsOff } from 'react-icons/tb';

const EditForm = ({ item, onSave, onCancel }: any) => {
  const [text, setText] = useState(item.componentText);

  const handleSave = () => {
    onSave(item, text);
  };

  return (
    <div className="p-2 bg-gray-100 rounded-xl">

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        variant="bordered"
        labelPlacement="outside"
        placeholder="Enter your description"
        classNames={{
          base: "col-span-12 md:col-span-6 mb-6 md:mb-0 ",
          input: "resize-y min-h-[70px] ",
        }}
      />
      <div className="flex justify-end mt-2">
        <Button className="mx-1" onClick={handleSave}>Сохранить</Button>
        <Button className="mx-1" onClick={onCancel}>Отмена</Button>
      </div>
    </div>
  );
};

const CurrentPostBody = ({ content, editor = false, onUpdateContent = '', spoilerTitle = 'Спойлер' }: any) => {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [showedIndex, setShowedIndex] = useState<boolean[]>([]);
  const [spoilerIndex, setSpoilerIndex] = useState([]);

  const handleSave = (item: any, newText: any) => {
    item.componentText = newText
    setEditingIndex(-1)
    onUpdateContent([...content])
  }

  const moveBlock = (index: any, direction: any) => {
    const newContent = [...content]
    const targetIndex = direction === 'up' ? index - 1 : index + 1

    if (targetIndex >= 0 && targetIndex < newContent.length) {
      const [removed] = newContent.splice(index, 1)
      newContent.splice(targetIndex, 0, removed)
      onUpdateContent(newContent)
    }
  }

  const deleteBlock = (index: any) => {
    const newContent = content.filter((_: any, i: any) => i !== index)
    onUpdateContent(newContent)
  }

  const toggleShowed = (index: any, component: any) => {
    setShowedIndex((prev: any) => (
      prev.includes(index) ? prev.filter((i: any) => i !== index) : [...prev, index]
    ));
    component.isShowed = !component.isShowed;
  }
  const toggleSpoiler = (index: any, component: any) => {
    setSpoilerIndex((prev: any) => (
      prev.includes(index) ? prev.filter((i: any) => i !== index) : [...prev, index]
    ))
    component.spoiler = !component.spoiler
  }

  const renderBlock = (item: any, index: any, isEditing: any, isShowed: any, shouldUseSpoiler: any) => (
    <div key={index} className={`flex flex-col py-2 px-1 myTextClass ${editor && `hover:bg-blue-100 rounded-xl transition duration-250 ease-in-out`}`}>
      {isEditing ? (
        <EditForm

          item={item}
          onSave={handleSave}
          onCancel={() => setEditingIndex(-1)}
        />
      ) : (
        <>
          {item.component === "BlockQuote" && (
            <BlockQuote text={item.componentText} />
          )}
          {item.component === 'TextContent' && (
            <TextContent>{item.componentText}</TextContent>
          )}
          {item.component === 'BlockImage' && (
            <BlockImage imageSource={item.componentText} />
          )}
          {item.component === 'BlockTitle' && (
            <BlockTitle titleText={item.componentText} />
          )}
          {item.component === 'BlockList' && (
            <BlockList textContent={item.componentText} />
          )}
          {item.component === 'BlockCode' && (
            <BlockCode textContent={item.componentText} />
          )}
          {item.component === 'RePost' && (
            <RePost postId={item.componentText} />
          )}
          {!['BlockQuote', 'TextContent', 'BlockImage', 'BlockTitle', 'BlockList', 'BlockCode', 'RePost'].includes(item.component) && (
            <TextContent>{item.text}</TextContent>
          )}
          {editor && (
            <div className="flex justify-end items-center mt-2 ">
              <div className="flex items-center ml-2">
                <Button className='my-auto mx-1' isIconOnly onClick={() => toggleShowed(index, item)}>
                  {isShowed ? <TbNews /> : <TbNewsOff />}
                </Button>
                <Button className='my-auto mx-1' isIconOnly onClick={() => toggleSpoiler(index, item)}>
                  {shouldUseSpoiler ? <HiOutlineEye /> : <HiOutlineEyeOff />}
                </Button>
                <Button className='my-auto mx-1' isIconOnly onClick={() => setEditingIndex(index)}>
                  <HiPencil />
                </Button>
                <Button className='my-auto mx-1' isIconOnly onClick={() => moveBlock(index, 'up')} isDisabled={index === 0}>
                  <HiOutlineArrowUp />
                </Button>
                <Button className='my-auto mx-1' isIconOnly onClick={() => moveBlock(index, 'down')} isDisabled={index === content.length - 1}>
                  <HiOutlineArrowDown />
                </Button>
                <Button className='my-auto mx-1' isIconOnly onClick={() => deleteBlock(index)}>
                  <HiOutlineTrash />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className=''>
      {content.map((item: any, index: any) => {
        if (item.isShowed) 
          { showedIndex.push(index) }
        const isEditing = editingIndex === index
        const isShowed = showedIndex.includes(index)
        const shouldUseSpoiler = item.spoiler === true

        return shouldUseSpoiler ? (
          <Spoiler key={index} title={spoilerTitle} content={renderBlock(item, index, isEditing, isShowed, shouldUseSpoiler)} />
        ) : (
          renderBlock(item, index, isEditing, isShowed, shouldUseSpoiler)
        )
      })}
    </div>

  )
}

export default CurrentPostBody;