import React, { useState, useRef } from 'react';
import { HiOutlineChevronUp, HiOutlineChevronDown } from 'react-icons/hi';
import { Button } from '@nextui-org/react';
import { CSSTransition } from 'react-transition-group';


const Spoiler = ({ content, title = 'Content', defaultExpanded = false }: any) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const nodeRef = useRef(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="my-2 bg-gray-200 rounded-xl p-2">
      <div className="flex justify-between items-center m-auto cursor-pointer" onClick={toggleExpand}>
        <h3 className='m-auto font-bold'>{title}</h3>
        <Button isIconOnly>
          {isExpanded ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
        </Button>
      </div>
      <CSSTransition
        in={isExpanded}
        timeout={300}
        classNames="spoiler-content"
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div ref={nodeRef} className="mt-2 bg-white rounded-lg p-2">
          {content}
        </div>
      </CSSTransition>
    </div>
  );
}

export default Spoiler;
