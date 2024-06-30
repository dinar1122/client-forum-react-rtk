import { useState } from 'react';

const useTags = () => {
  const [selectionTags, setSelectionTags] = useState<any>([]);
  const [error, setError] = useState('');

  const handleRemoveTag = (tagId: string) => {
    setSelectionTags(selectionTags.filter((tag: any) => tag.id !== tagId));
    setError('');
  };

  const handleAddTag = (newTag: any) => {
    if (!selectionTags.some((tag: any) => tag.id === newTag.id)) {
      setSelectionTags([...selectionTags, newTag]);
      setError('');
    } else {
      setError('Вы уже добавили этот тег');
    }
  };

  return {
    selectionTags,
    error,
    handleAddTag,
    handleRemoveTag,
    setSelectionTags,
    setError,
  };
};

export default useTags;
