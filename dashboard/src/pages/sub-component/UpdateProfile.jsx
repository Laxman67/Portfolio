import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SquareArrowOutUpRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SpecialLoadingButton from './specialLoadingButton';
import {
  clearAllUserError,
  getUser,
  resetProfile,
  updateProfile,
} from '@/store/slice/userSlices';
import { toast } from 'react-toastify';

const UpdateProfile = () => {
  const { user, loading, message, isUpdated, error } = useSelector(
    (state) => state.user
  );
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [aboutMe, setAboutMe] = useState(user?.aboutMe || '');
  const [portfolioURL, setPortfolioURL] = useState(user?.portfolioURL || '');
  const [linkedInURL, setLinkedInURL] = useState(user?.linkedInURL || '');
  const [githubURL, setGithubURL] = useState(user?.githubURL || '');
  const [instagramURL, setInstagramURL] = useState(user?.instagramURL || '');
  const [twitterURL, setTwitterURL] = useState(user?.twitterURL || '');
  const [facebookURL, setFacebookURL] = useState(user?.facebookURL || '');
  const [avatar, setAvatar] = useState(user?.avatar?.url || '');
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || '');
  const [resume, setResume] = useState(user?.resume?.url || '');
  const [resumePreview, setResumePreview] = useState('');

  const dispatch = useDispatch();

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result);
    if (file) {
      reader.readAsDataURL(file);
      setAvatar(file);
    }
  };

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setResumePreview(reader.result);
    if (file) {
      reader.readAsDataURL(file);
      setResume(file);
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('portfolioURL', portfolioURL);
    formData.append('aboutMe', aboutMe);
    formData.append('linkedInURL', linkedInURL);
    formData.append('githubURL', githubURL);
    formData.append('facebookURL', facebookURL);
    formData.append('instagramURL', instagramURL);
    formData.append('twitterURL', twitterURL);
    formData.append('avatar', avatar);
    formData.append('resume', resume);

    console.log(formData);
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAboutMe(user.aboutMe || '');
      setPortfolioURL(user.portfolioURL || '');
      setLinkedInURL(user.linkedInURL || '');
      setGithubURL(user.githubURL || '');
      setInstagramURL(user.instagramURL || '');
      setTwitterURL(user.twitterURL || '');
      setFacebookURL(user.facebookURL || '');
      setAvatarPreview(user.avatar?.url || '');
      setResumePreview(user.resume?.url || '');
    }

    // If error
    if (error) {
      toast.error(error);
      dispatch(clearAllUserError());
    }

    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }

    if (message) {
      toast.success(message);
    }
  }, [user, error, loading, dispatch, message, isUpdated]);

  return (
    <div className='w-full h-full'>
      <div className='grid w-full gap-6'>
        <div className='grid gap-2'>
          <h1 className='text-3xl font-bold'>Update Profile</h1>
          <p>Update Your Profile</p>
        </div>

        <div className='grid gap-6'>
          <div className='flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5'>
            {/* Profile Image */}
            <div className='grid gap-2 w-full sm:w-72'>
              <Label>Profile Image</Label>
              <img
                src={avatarPreview || user?.avatar?.url}
                alt='avatar'
                className='w-full h-auto sm:w-72 sm:h-72 rounded-2xl mt-2'
              />
              <div className='relative mt-3'>
                <Input
                  type='file'
                  className='avatar-update-btn bg-blue-950 text-white font-semibold'
                  onChange={avatarHandler}
                />
              </div>
            </div>
            {/* Resume */}
            <div className='grid gap-2 w-full sm:w-72'>
              <Label className='flex items-center'>
                Resume
                <Link
                  to={`${user?.resume?.url.slice(0, -3)}` + 'jpeg'}
                  target='_blank'
                  className='inline-flex items-center ml-2'
                >
                  <SquareArrowOutUpRight color='#103bbc' strokeWidth={3} />
                </Link>
              </Label>

              <Link
                to={`${user?.resume?.url.slice(0, -3)}` + 'jpeg'}
                target='_blank'
              >
                <img
                  src={
                    resumePreview ||
                    (user?.resume?.url && user.resume.url.slice(0, -3) + 'jpeg')
                  }
                  alt='resume'
                  className='w-full h-auto sm:w-72 sm:h-72 rounded-2xl mt-2'
                />
              </Link>
              <div className='relative mt-3'>
                <Input
                  type='file'
                  className='avatar-update-btn bg-blue-950 text-white font-semibold'
                  onChange={resumeHandler}
                />
              </div>
            </div>
          </div>
          {[
            { label: 'Full Name', value: fullName, setValue: setFullName },
            { label: 'Email', value: email, setValue: setEmail },
            { label: 'Phone', value: phone, setValue: setPhone },
            {
              label: 'About Me',
              value: aboutMe,
              setValue: setAboutMe,
              isTextarea: true,
            },
            {
              label: 'Portfolio URL',
              value: portfolioURL,
              setValue: setPortfolioURL,
            },
            { label: 'GitHub URL', value: githubURL, setValue: setGithubURL },
            {
              label: 'LinkedIn URL',
              value: linkedInURL,
              setValue: setLinkedInURL,
            },
            {
              label: 'Instagram URL',
              value: instagramURL,
              setValue: setInstagramURL,
            },
            {
              label: 'Facebook URL',
              value: facebookURL,
              setValue: setFacebookURL,
            },
            {
              label: 'Twitter (X) URL',
              value: twitterURL,
              setValue: setTwitterURL,
            },
          ].map(({ label, value, setValue, isTextarea }, index) => (
            <div className='grid gap-2' key={index}>
              <Label>{label}</Label>
              {isTextarea ? (
                <Textarea
                  value={value}
                  placeholder={`Enter Your  ${label} `}
                  onChange={(e) => setValue(e.target.value)}
                />
              ) : (
                <Input
                  type='text'
                  value={value}
                  placeholder={`Enter Your  ${label} `}
                  onChange={(e) => setValue(e.target.value)}
                />
              )}
            </div>
          ))}
          <div>
            {!loading ? (
              <Button onClick={handleUpdateProfile} className='w-full'>
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
  );
};

export default UpdateProfile;
