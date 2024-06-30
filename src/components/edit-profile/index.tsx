import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@nextui-org/react';
import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { User } from '../../app/types';
import { CustomInput } from '../UI/custom-input';
import { useUpdateUserMutation } from '../../app/services/userApi';
import { useParams } from 'react-router-dom';
import { existErrorField } from '../../utils/exist-error-field';
import { ErrorMessage } from '../error-message';
import { MdOutlineEmail } from 'react-icons/md';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
};

export const EditProfile: React.FC<Props> = ({
  isOpen = false,
  onClose = () => null,
  user,
}) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { id } = useParams<{ id: string }>();

  const { handleSubmit, control } = useForm<User>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: user?.email || '',
      username: user?.username || '',
      dateOfBirth: user?.dateOfBirth || undefined,
      bio: user?.bio || '',
      location: user?.location || '',
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onSubmit = async (data: User) => {
    if (id) {
      try {
        const formData = new FormData();
        data.username && formData.append('username', data.username);
        data.email &&
          data.email !== user?.email &&
          formData.append('email', data.email);
        data.dateOfBirth &&
          formData.append(
            'dateOfBirth',
            new Date(data.dateOfBirth).toISOString(),
          );
        data.bio && formData.append('bio', data.bio);
        data.location && formData.append('location', data.location);
        selectedFile && formData.append('file', selectedFile);

        console.log({ selectedFile, id });

        // Directly use FormData without converting to a plain object
        await updateUser({ userData: formData, id }).unwrap();
        onClose();
      } catch (err) {
        console.log(err);
        if (existErrorField(err)) {
          setError(err.data.error);
        }
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={`text-foreground`}
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Изменения профиля
            </ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <CustomInput
                  control={control}
                  name="email"
                  label="Email"
                  type="email"
                  endContent={<MdOutlineEmail />}
                />
                <CustomInput
                  control={control}
                  name="username"
                  label="Имя"
                  type="text"
                />
                <input
                  name="avatarUrl"
                  placeholder="Выберете файл"
                  type="file"
                  onChange={handleFileChange}
                />
                <CustomInput
                  control={control}
                  name="dateOfBirth"
                  label="Дата Рождения"
                  type="date"
                  placeholder="Мой"
                />
                <Controller
                  name="bio"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder="Ваша биография"
                    />
                  )}
                />
                <CustomInput
                  control={control}
                  name="location"
                  label="Местоположение"
                  type="text"
                />
                <ErrorMessage error={error} />
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    color="primary"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Обновить профиль
                  </Button>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Закрыть
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
