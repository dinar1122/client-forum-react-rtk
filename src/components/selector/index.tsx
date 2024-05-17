import { CardBody, Select, SelectItem } from '@nextui-org/react'
import { setFips } from 'crypto';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const Selector = ({setFirst,setSecond }: any) => {
    const [selectedTopicValue, setSelectedTopicValue] = useState('');
    const [selectedCategoryValue, setSelectedCategoryValue] = useState('');
    const dataCategory = useSelector((state: any) => state.categorySlice);
  let dataTopicsbyCategory = null

  if (dataCategory.categories) {
    dataTopicsbyCategory = dataCategory.categories.find((cat: any) => cat.id === selectedCategoryValue);
  }

    const handleSelectCategoryChange = (event: any) => {
        setSelectedTopicValue('')
        const categoryId = event.target.value;
        setFirst(categoryId)
        setSelectedCategoryValue(categoryId);
      };
    
      const handleSelectChangeTopic = (event: any) => {
        setSecond(event.target.value)
        setSelectedTopicValue(event.target.value);
      };

  return (
    <>
    
          {dataCategory.categories && <Select
            label="Выберите категорию"
            className="max-w-xs m-2"
            size='sm'
            value={selectedCategoryValue}
            onChange={handleSelectCategoryChange}
          >
            {dataCategory.categories.map((category: any) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </Select>}
        
          {dataCategory.categories && selectedCategoryValue && <Select
            label="Выберите тему"
            className="max-w-xs m-2"
            size='sm'
            onChange={handleSelectChangeTopic}
            value={selectedTopicValue}
          >
            {dataTopicsbyCategory.topics.map((category: any) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </Select>}
        
    </>
  )
}

export default Selector