import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CustomInput } from '../components/UI/custom-input'
import { Button, Link } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { useLazyCurrentQuery, useLoginMutation } from '../app/services/userApi'
import { existErrorField } from '../utils/exist-error-field'
import { ErrorMessage } from '../components/error-message'

type Props = {
    setSelected: (value: string) => void
}

type Login = {
    email: string,
    password: string
}

export const Login: React.FC<Props> = ({ setSelected }: Props) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Login>({
        mode: "onChange",
        reValidateMode: "onBlur",
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [triggerCurrentQuery] = useLazyCurrentQuery()
    const onSubmit = async (data: Login) => {
        try {
          await login(data).unwrap()
          await triggerCurrentQuery()
          navigate("/")
        } catch (err) {

          if (existErrorField(err)) {
            setError(err.data.error)
          }
        }
      }
    return (
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            <ErrorMessage error={error} />
            <CustomInput 
                control={control}
                name="email"
                label="Email"
                type="email"
                required="Обязательное поле" />
            <CustomInput 
                control={control}
                name="password"
                label="Пароль"
                type="password"
                required="Обязательное поле" />
                
      <p className="text-center text-small">
        Нет аккаунта?{" "}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected("sign-up")}
        >
          Зарегистрируйтесь
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Войти
        </Button>
      </div>
        </form>
    )
}
