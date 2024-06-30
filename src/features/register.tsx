import { Button, Link } from '@nextui-org/react';
import React, { useState } from 'react';
import { CustomInput } from '../components/UI/custom-input';
import { useRegisterMutation } from '../app/services/userApi';
import { useForm } from 'react-hook-form';
import { existErrorField } from '../utils/exist-error-field';
import { ErrorMessage } from '../components/error-message';

type Props = {
  setSelected: (value: string) => void;
};

type Register = {
  email: string;
  username: string;
  password: string;
};

const Register = ({ setSelected }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Register>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  });

  const [register] = useRegisterMutation();
  const [error, setError] = useState('');

  const onSubmit = async (data: Register) => {
    try {
      await register(data).unwrap();
      setSelected('login');
    } catch (error) {
      if (existErrorField(error)) {
        setError(error.data.error);
      }
    }
  };
  return (
    <form className="flex flex-col gap-4 " onSubmit={handleSubmit(onSubmit)}>
      <ErrorMessage error={error} />
      <CustomInput
        control={control}
        required="Обязательное поле"
        label="Имя"
        name="username"
      />
      <CustomInput
        control={control}
        name="email"
        label="Email"
        type="email"
        required="Обязательное поле"
      />
      <CustomInput
        control={control}
        name="password"
        label="Пароль"
        type="password"
        required="Обязательное поле"
      />

      <p className="text-center text-small">
        Уже есть аккаунт?{' '}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected('login')}
        >
          Войти
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit">
          Зарегистрироваться
        </Button>
      </div>
    </form>
  );
};

export default Register;
