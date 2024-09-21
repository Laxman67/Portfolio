import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import SpecialLoadingButton from './specialLoadingButton';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearAllUserError, updatePassword } from '@/store/slice/userSlices';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error, message, isUpdated } = useSelector(
    (state) => state.user
  );

  const navigateTo = useNavigate();
  const handleUpdatePassword = (e) => {
    e.preventDefault();

    dispatch(updatePassword(currentPassword, newPassword, confirmNewPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserError());
    }
    if (message) {
      toast.success(message);
    }
    if (isUpdated) {
      navigateTo('/');
    }
  }, [error, message, dispatch, navigateTo, isUpdated]);

  return (
    <>
      <div className='w-full h-full'>
        <div className='grid w-full gap-6'>
          <div className='grid gap-2'>
            <h1 className='text-3xl font-bold'>Update Password</h1>
            <p>Update Your Dashboard Password</p>
          </div>

          <div className='grid gap-6'>
            {[
              {
                label: 'Current Password',
                value: currentPassword,
                setValue: setCurrentPassword,
              },
              {
                label: 'New Password',
                value: newPassword,
                setValue: setNewPassword,
              },
              {
                label: 'Confirm New  Password',
                value: confirmNewPassword,
                setValue: setConfirmNewPassword,
              },
            ].map(({ label, value, setValue }, index) => (
              <div className='grid gap-2' key={index}>
                <Label>{label}</Label>
                {
                  <Input
                    type='text'
                    value={value}
                    placeholder={`Enter Your  ${label} `}
                    onChange={(e) => setValue(e.target.value)}
                  />
                }
              </div>
            ))}
            <div>
              {!loading ? (
                <Button onClick={handleUpdatePassword} className='w-full'>
                  Update Profile
                </Button>
              ) : (
                <SpecialLoadingButton
                  // className='bg-black text-white'
                  content='Updating '
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
