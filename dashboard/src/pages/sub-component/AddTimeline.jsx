import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import SpecialLoadingButton from './specialLoadingButton';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import {
  AddNewTimeline,
  clearAllTimelineError,
  getAllTimeline,
  resetTimelineSlice,
} from '@/store/slice/timelineSlices';
import { toast } from 'react-toastify';

const AddTimeline = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const dispatch = useDispatch();

  const { loading, error, message } = useSelector((state) => state.timeline);

  const handleAddNewTimeline = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('from', from);
    formData.append('to', to);

    dispatch(AddNewTimeline(formData));

    // Reset

    setDescription('');
    setTitle('');
    setFrom('');
    setTo('');
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineError());
    }
    if (message) {
      toast.success(message);

      dispatch(resetTimelineSlice());
      dispatch(getAllTimeline());
    }
  }, [dispatch, error, message]);

  return (
    <div className='flex  justify-center  items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14'>
      <form className='w-[100%] px-5 md:w-[630px]'>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='font-semibold leading-7 text-gray-900 text-3xl text-center'>
              Add a new Timeline
            </h2>
            {/* TODO -> Dynamic usage of input ,setFunction useState and  placholder files  */}

            {/* Title */}
            <div className='mt-10 flex-col gap-5'>
              <div className='w-full sm:col-span-4 '>
                <Label className='block text-sm font-medium leading-6 text-gray-900'>
                  Title
                </Label>
                <div className='mt-2'>
                  <div
                    className='flex rounded-md  shadow-sm ring-1 ring-inset ring-gray-300
                  focus-within:ring-2  focus-within:ring-inset  focus-within:ring-indigo-600'
                  >
                    <input
                      className='block  flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      type='text'
                      placeholder='Matriculation'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Timeline Description */}
            <div className='mt-10 flex-col gap-5'>
              <div className='w-full sm:col-span-4 '>
                <Label className='block text-sm font-medium leading-6 text-gray-900'>
                  Timeline Description
                </Label>
                <div className='mt-2'>
                  <div
                    className='flex rounded-md  shadow-sm ring-1 ring-inset ring-gray-300
                  focus-within:ring-2  focus-within:ring-inset  focus-within:ring-indigo-600'
                  >
                    <input
                      className='block  flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      type='text'
                      placeholder='Description...'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline From */}
            <div className='mt-10 flex-col gap-5'>
              <div className='w-full sm:col-span-4 '>
                <Label className='block text-sm font-medium leading-6 text-gray-900'>
                  Timeline From
                </Label>
                <div className='mt-2'>
                  <div
                    className='flex rounded-md  shadow-sm ring-1 ring-inset ring-gray-300
                  focus-within:ring-2  focus-within:ring-inset  focus-within:ring-indigo-600'
                  >
                    <input
                      className='block  flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      type='text'
                      placeholder='Starting Period '
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline To */}
            <div className='mt-10 flex-col gap-5'>
              <div className='w-full sm:col-span-4 '>
                <Label className='block text-sm font-medium leading-6 text-gray-900'>
                  Timeline To
                </Label>
                <div className='mt-2'>
                  <div
                    className='flex rounded-md  shadow-sm ring-1 ring-inset ring-gray-300
                  focus-within:ring-2  focus-within:ring-inset  focus-within:ring-indigo-600'
                  >
                    <input
                      className='block  flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      type='text'
                      placeholder='Ending Period  '
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <SpecialLoadingButton content='Adding' />
          ) : (
            <Button
              type='submit'
              onClick={handleAddNewTimeline}
              className='w-full'
            >
              Add Timeline
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddTimeline;
