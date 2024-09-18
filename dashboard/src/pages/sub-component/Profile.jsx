import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
const Profile = () => {
  const { user } = useSelector((state) => state.user);

  useEffect(() => {}, [user]);

  return (
    <>
      <div className='w-full h-full '>
        <div className='grid w-[100%] gap-6'>
          <div className='grid gap-2'>
            <h1 className='text-3xl font-bold'>Profile </h1>
            <p>Profile Preview</p>
          </div>

          <div className='grid gap-6'>
            <div className='flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5'>
              {/* Profile Image */}
              <div className='grid gap2 w-full sm:w-72'>
                <Label>Profile Image</Label>
                <img
                  src={user && user.avatar && user.avatar.url}
                  alt='avatar'
                  className='w-full h-auto sm:w-72 sm:h-72 rounded-2xl  mt-2'
                />
              </div>
              {/* Resume */}
              <div className='grid gap2 w-full sm:w-72'>
                <Label>Resume</Label>
                <img
                  src={
                    user && user.resume && user.resume.url.slice(0, -3) + 'jpeg'
                  }
                  alt='resume'
                  className='w-full h-auto sm:w-72 sm:h-72 rounded-2xl mt-2'
                />
              </div>
            </div>

            <div className='grid gap-2'>
              <Label>Full Name</Label>
              <Input type='text' defaultValue={user.fullName} disabled />
            </div>
            <div className='grid gap-2'>
              <Label>Email </Label>
              <Input type='text' defaultValue={user.email} disabled />
            </div>
            <div className='grid gap-2'>
              <Label>Phone </Label>
              <Input type='text' defaultValue={user.phone} disabled />
            </div>
            <div className='grid gap-2'>
              <Label>About Me</Label>
              <Textarea type='text' defaultValue={user.aboutMe} disabled />
            </div>
            <div className='grid gap-2'>
              <Label>PortFolio URL</Label>
              <Input type='text' defaultValue={user.portfolioURL} disabled />
            </div>
            <div className='grid gap-2'>
              <Label>Github URL</Label>
              <Input type='text' defaultValue={user.githubURL} disabled />
            </div>
            <div className='grid gap-2'>
              <Label>LinkedIn URL</Label>
              <Input type='text' defaultValue={user.linkedinURL} disabled />
            </div>
            <div className='grid gap-2'>
              <Label>Instagram URL</Label>
              <Input type='text' defaultValue={user.instagramURL} disabled />
            </div>
            <div className='grid gap-2'>
              <Label>Facebook URL</Label>
              <Input type='text' defaultValue={user.facebookURL} disabled />
            </div>
            <div className='grid gap-2'>
              <Label>Twitter(X) URL</Label>
              <Input type='text' defaultValue={user.twitterURL} disabled />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
