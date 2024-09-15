import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import specialLoadingButton from './sub-component/specialLoadingButton';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearAllForgotPasswordError,
  resetPassword,
} from '@/store/slice/forgotResetPasswordSlice';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { token } = useParams();

  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );

  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();

    dispatch(resetPassword(token, password, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotPasswordError());
    }
    // TODO
    if (isAuthenticated) {
      // navigateTo('/');
    }

    if (message) {
      toast.success(message);
    }
  }, [dispatch, isAuthenticated, error, message, navigateTo, loading]);
  return (
    <div>
      <>
        <div className='w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]'>
          <div className='min-h-[100vh] flex items-center justify-center py-12'>
            <div className='mx-auto grid w-[350px] gap-6'>
              <div className='grid gap-2 text-center'>
                <h1 className='text-3xl font-bold'>Reset Password</h1>
                <p className='text-balance text-muted-foreground'>
                  Set new Password
                </p>
              </div>
              <form className='grid gap-4' onSubmit={handleResetPassword}>
                <div className='grid gap-2'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    id='password'
                    type='password'
                    placeholder='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='ConfirmPassword'>Confirm Password</Label>
                  <Input
                    id='ConfirmPassword'
                    type='password'
                    placeholder='Confirm Password'
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                {loading ? (
                  <specialLoadingButton content={'Resetting Password'} />
                ) : (
                  <Button type='submit' className='w-full'>
                    Reset Password
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
      </>
    </div>
  );
};

export default ResetPassword;
