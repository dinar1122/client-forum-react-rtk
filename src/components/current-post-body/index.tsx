import React, { useState } from 'react'
import BlockQuote from '../UI/block-quote';
import { TextContent } from '../text-content';
import BlockImage from '../UI/block-image';
import BlockTitle from '../UI/block-title';
import BlockList from '../UI/block-list';
import BlockCode from '../UI/block-code';
import { Button } from '@nextui-org/react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

const handleChangeIsShowed = (component: any) => {
  return component.isShowed = !component.isShowed;

};


const CurrentPostBody = ({ content, editor = false }: any) => {
  return (
    <div className=''>
      {content.map((item: any, index: number) => {
        return (
          <div key={index} className='flex justify-between p-1'>
            
            {item.component === "BlockQuote" && (
              <BlockQuote key={index} text={item.componentText} />
            )}
            {item.component === 'TextContent' && (
              <TextContent>{item.componentText}</TextContent>
            )}
            {item.component === 'BlockImage' && (
              <div className='justify-center w-full'><BlockImage key={index} imageSource={item.componentText} /></div>
            )}
            {item.component === 'BlockTitle' && (
              <BlockTitle key={index} titleText={item.componentText} />
            )}
            {item.component === 'BlockList' && (
              <BlockList key={index} textContent={item.componentText} />
            )}
            {item.component === 'BlockCode' && (
              <BlockCode key={index} textContent={item.componentText} />
            )}
            {!['BlockQuote', 'TextContent', 'BlockImage', 'BlockTitle', 'BlockList', 'BlockCode'].includes(item.component) && (
              <TextContent key={index}>{item.text}</TextContent>
            )}
            {editor && <Button isIconOnly onClick={() => handleChangeIsShowed(item)}>
              {item.isShowed ? <HiOutlineEye /> : <HiOutlineEyeOff />}
            </Button>}

          </div>
        );
      })}
    </div>
  );
}

export default CurrentPostBody