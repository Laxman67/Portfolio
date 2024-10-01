import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllUserError, login } from '@/store/slice/userSlices';
import { toast } from 'react-toastify';

import SpecialLoadingButton from './sub-component/specialLoadingButton';
export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const navigateTo = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));

    // Empty the input fields after submit
    setEmail('');
    setPassword('');
  };


  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserError());
    }

    if (isAuthenticated) {
      toast.success('Login Success');
      navigateTo('/');
    }
  }, [dispatch, isAuthenticated, error, navigateTo]);
  return (
    <div className='w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]'>
      <div className='min-h-[100vh] flex items-center justify-center py-12'>
        <div className='mx-auto grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Login</h1>
            <p className='text-balance text-muted-foreground'>
              Enter your email below to login to your account
            </p>
          </div>
          <form className='grid gap-4' onSubmit={handleLogin}>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Password</Label>
                <Link
                  to='/password/forgot'
                  className='ml-auto inline-block text-sm underline'
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id='password'
                type='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {loading ? (
              <SpecialLoadingButton content={'Logging In'} />
            ) : (
              <Button type='submit' className='w-full'>
                Login
              </Button>
            )}
          </form>
        </div>
      </div>
      <div className='hidden bg-muted lg:block'>
        <img
          src='/placeholder.svg'
          alt='Image'
          className='h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </div>
    </div>
  );
};

export default Login;
