import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './RegistrationForm.css';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Неверный формат email').required('Обязательное поле'),
  password: Yup.string().min(6, 'Пароль должен содержать минимум 6 символов').required('Обязательное поле'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
    .required('Обязательное поле'),
});

const RegistrationForm = () => {
  const registerButtonRef = useRef(null); // Создаем ref
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  React.useEffect(() => {
    if (isValid && isDirty) {
     registerButtonRef.current.focus() // Фокусируемся на кнопке
    }
  }, [isValid, isDirty]);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            {...register('email')}
          />
          {errors.email && <div className="error">{errors.email.message}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            name="password"
            type="password"
            {...register('password')}
          />
          {errors.password && <div className="error">{errors.password.message}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Подтвердите пароль</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && <div className="error">{errors.confirmPassword.message}</div>}
        </div>

        <button ref={registerButtonRef} id="registerButton" type="submit" disabled={!isValid || !isDirty}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
