import React, { useRef, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Input,
  Spinner,
  Textarea,
} from '@nextui-org/react';
import { useCreateTopicMutation } from '../../app/services/topicApi';
import { useLazyGetCategoryListQuery } from '../../app/services/categoryApi';
const CreateTopicForm = ({ categoryId }: any) => {
  const [topicName, setTopicName] = useState('');
  const [topicDescription, setTopicDescription] = useState('');

  const [triggerGetCategoryData] = useLazyGetCategoryListQuery();

  const [createTopic, { isError, isLoading, isSuccess, data }] =
    useCreateTopicMutation();

  const handleCreateTopic = async () => {
    await createTopic({
      name: topicName,
      description: topicDescription,
      categoryId: categoryId,
    });
    triggerGetCategoryData();
  };
  return (
    <>
      <Card className="shadow-sm border">
        <CardBody>
          <form className="space-y-4">
            <div>
              <span className="block text-lg font-medium text-gray-700">
                Название темы
              </span>
              <Input
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                className="mt-1 w-full"
              />
            </div>
            <div>
              <span className="block text-lg font-medium text-gray-700">
                Описание темы
              </span>
              <Textarea
                value={topicDescription}
                onChange={(e) => setTopicDescription(e.target.value)}
                className="mt-1 w-full"
                rows={3}
              />
            </div>
            <Button onClick={handleCreateTopic} className="mt-3 w-full">
              {isLoading ? <Spinner /> : `Создать`}
            </Button>
          </form>
          {isError && (
            <span className="block text-lg font-medium text-red-700 mx-auto">
              Ошибка при создании
            </span>
          )}
          {isSuccess && (
            <span className="block text-lg font-medium text-gray-700 mx-auto">
              Тема успешно создана
            </span>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default CreateTopicForm;
