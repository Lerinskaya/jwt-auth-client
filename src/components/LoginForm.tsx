import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { store } = useContext(Context);
  const [error, setError] = useState('');
  const { handleSubmit, register, formState: { errors } } = useForm<LoginFormInputs>();

  const handleLogin = async (data: LoginFormInputs) => {
    const { email, password } = data;
    try {
      await store.login(email, password);
    } catch (error:any) {
      setError(error.response.data.message);
    }
  };

  const handleRegistration = async (data: LoginFormInputs) => {
    const { email, password } = data;
    try {
      await store.registration(email, password);
    } catch (error:any) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="align-self-center w-100">
      <h1 className="text-center mb-30">Login Form</h1>
      {store.error && <div className="text-center mb-30">{store.error}</div>}
      <Form className="form" onSubmit={handleSubmit(handleLogin)}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="name@example.com" 
            className={errors.email ? 'error-input' : ''}
            {...register('email', { required: 'Email is required' })}
          />
           {errors.email && <span>{errors.email.message}</span>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            className={errors.email ? 'error-input' : ''}
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </Form.Group>
        <div className='d-flex mx-auto justify-content-center'>
          <Button 
            type="submit"
            className='w-30 button btn-lg'
          >
            Login
          </Button>
          <Button 
            type="button"
            className='w-30 btn-lg'
            onClick={handleSubmit(handleRegistration)}
          >
            Registration
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default observer(LoginForm);
