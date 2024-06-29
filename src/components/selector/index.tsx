import { CardBody, Select, SelectItem } from '@nextui-org/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CreateTopicForm from '../create-topic-form';

type SelectorProps = {
  setFirst: any;
  setSecond: any;
  valueFirst?: string;
  valueSecond?: string;
};


const Selector = ({ setFirst, setSecond, valueFirst = '', valueSecond = '', }: SelectorProps) => {
  const [selectedTopicValue, setSelectedTopicValue] = useState(valueSecond);
  const [selectedCategoryValue, setSelectedCategoryValue] = useState(valueFirst);
  const [createTopicMode, setCreateTopicMode] = useState(false)
  const dataCategory = useSelector((state: any) => state.categorySlice);
  let dataTopicsbyCategory = null;

  if (dataCategory.categories) {
    dataTopicsbyCategory = dataCategory.categories.find((cat: any) => cat.id === selectedCategoryValue);
  }

  const handleSelectCategoryChange = (event: any) => {
    setSelectedTopicValue('');
    const categoryId = event.target.value;
    setFirst(categoryId);
    setSelectedCategoryValue(categoryId);
  };

  const handleSelectChangeTopic = (event: any) => {
    const topicId = event.target.value;
    if (topicId === 'create-new-topic') {
      setCreateTopicMode(true);
    } else {
      setCreateTopicMode(false);
      setSecond(topicId);
    }
    setSelectedTopicValue(topicId);
  };

  return (

    <div className='w-full flex-col '><CardBody className='flex-row p-0'>
      {dataCategory.categories && (
        <Select
          label="Выберите категорию"
          className="max-w-xs mr-3"
          size="sm"
          value={selectedCategoryValue}
          onChange={handleSelectCategoryChange}
        >
          {dataCategory.categories.map((category: any) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </Select>
      )}

      {dataCategory.categories && selectedCategoryValue && (
        <Select
          label="Выберите тему"
          className="max-w-xs "
          size="sm"
          onChange={handleSelectChangeTopic}
          value={selectedTopicValue}
        >
          {dataTopicsbyCategory.topics.map((topic: any) => (
            <SelectItem key={topic.id} value={topic.id}>
              {topic.name}
            </SelectItem>
          ))}
          <SelectItem key="create-new-topic" value="create-new-topic">
            Создать новую тему
          </SelectItem>
        </Select>
      )}

    </CardBody>
      {createTopicMode && <CardBody className='p-0 pt-3'><CreateTopicForm categoryId={selectedCategoryValue} /></CardBody>}</div>
  );
};

export default Selector;
