import React from 'react'
import BlockQuote from '../UI/block-quote';
import { TextContent } from '../text-content';
import BlockImage from '../UI/block-image';
import BlockTitle from '../UI/block-title';
import BlockList from '../UI/block-list';
import BlockCode from '../UI/block-code';

const CurrentPostBody = ({content}:any) => {
    return (
        <div className='pl-8 pr-8'>
          {content.map((item:any, index: number) => {
            switch (item.component) {
                case "BlockQuote":
                  return <BlockQuote key={index} text={item.componentText} />;
                case 'TextContent':
                  return <TextContent key={index}>{item.componentText}</TextContent>;
                case 'BlockImage':
                  return <BlockImage key={index} imageSource={item.componentText}></BlockImage>;
                case 'BlockTitle':
                  return <BlockTitle key={index} titleText={item.componentText}></BlockTitle>;
                case 'BlockList':
                  return <BlockList key={index} textContent={item.componentText}></BlockList>;
                case 'BlockCode':
                  return <BlockCode key={index} textContent={item.componentText}/>;
                default:
                  return <TextContent key={index}>{item.text}</TextContent>;
              }
          })}
        </div>
      );
}

export default CurrentPostBody