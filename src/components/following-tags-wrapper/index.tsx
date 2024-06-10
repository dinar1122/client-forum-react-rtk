import React, { useState } from 'react';
import { TagManager } from '../tag';

const fakeTags = [
  { id: '1', name: 'Геймерские ноутбуки' },
  { id: '2', name: 'Графические карты' },
  { id: '3', name: 'Процессоры и чипы' },
  { id: '4', name: 'Охлаждение и вентиляция' },
  { id: '5', name: 'Жесткие диски и SSD' },
  { id: '6', name: 'Мониторы и дисплеи' },
  { id: '7', name: 'Игровые аксессуары' },
  { id: '8', name: 'Материнские платы' },
  { id: '9', name: 'Клавиатуры и мыши' },
  { id: '10', name: 'Программное обеспечение и игры' },
];



const FollowingTagsWrapper = () => {
  const [subscribedTags, setSubscribedTags] = useState([]);

  const handleToggleSubscribe = (tagId) => {
    if (subscribedTags.includes(tagId)) {
      setSubscribedTags(subscribedTags.filter(id => id !== tagId));
    } else {
      setSubscribedTags([...subscribedTags, tagId]);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold my-4">Управление подпиской на теги</h1>
      <TagManager
        tags={fakeTags}
        subscribedTags={subscribedTags}
        onToggleSubscribe={handleToggleSubscribe}
      />
    </div>
  );
}

export default FollowingTagsWrapper;
