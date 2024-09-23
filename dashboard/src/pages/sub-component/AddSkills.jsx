import {
  AddNewSkill,
  clearAllSkillError,
  getAllSkills,
  resetSkillSlice,
} from '@/store/slice/skillSlice';
import SpecialLoadingButton from './specialLoadingButton';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Image } from 'lucide-react';

const AddSkills = () => {
  const [title, setTitle] = useState('');
  const [proficiency, setProficiency] = useState('');
  const [svg, setSvg] = useState('');
  const [svgPreview, setSvgPreview] = useState('');

  // Redux Part
  const { error, message, loading } = useSelector((state) => state.skill);
  const dispatch = useDispatch();

  const handleSvg = (e) => {
    // 1. extract File
    const file = e.target.files[0];

    // 2. Create Reader
    const reader = new FileReader();

    // 3. Read file as Data Url [Means Location]
    reader.readAsDataURL(file);

    // 4. reader.onload => setSVG or setsvgPreview
    reader.onload = () => {
      setSvg(file);

      // TODO->Remove this line
      console.log(svg);

      setSvgPreview(reader.result);
    };
  };

  const handleNewAddSkill = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('proficiency', proficiency);
    formData.append('svg', svg);

    dispatch(AddNewSkill(formData));

    // Reset useSate
    setTitle('');
    setProficiency('');
    setSvg('');
    setSvgPreview('');
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillError());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getAllSkills());
    }
  }, [error, message, loading, dispatch]);

  return (
    <div>
      <div className='flex  justify-center  items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14'>
        <form className='w-[100%] px-5 md:w-[630px]'>
          <div className='space-y-12'>
            <div className='border-b border-gray-900/10 pb-12'>
              <h2 className='font-semibold leading-7 text-gray-900 text-3xl text-center'>
                Add New Skill
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
                        placeholder='Javascript...'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/*  Proficiency */}
              <div className='mt-10 flex-col gap-5'>
                <div className='w-full sm:col-span-4 '>
                  <Label className='block text-sm font-medium leading-6 text-gray-900'>
                    Proficiency
                  </Label>
                  <div className='mt-2'>
                    <div
                      className='flex rounded-md  shadow-sm ring-1 ring-inset ring-gray-300
              focus-within:ring-2  focus-within:ring-inset  focus-within:ring-indigo-600'
                    >
                      <input
                        className='block  flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        type='number'
                        placeholder='30'
                        value={proficiency}
                        onChange={(e) => setProficiency(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className='col-span-full'>
                <label className='block text-sm font-medium leading-6 text-gray-900'>
                  Skill SVG
                </label>
                <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                  <div className='text-center'>
                    {svgPreview ? (
                      <img
                        className='max-auto h-auto w-[200px] text-gray-400 border-gray-400'
                        src={svgPreview && svgPreview}
                        alt='svg'
                      />
                    ) : (
                      <Image
                        aria-hidden='true'
                        className='mx-auto h-12 w-12 text-gray-300'
                      />
                    )}

                    <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                      <label
                        htmlFor='file-upload'
                        className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
                      >
                        <span>Upload a file</span>
                        <input
                          id='file-upload'
                          name='file-upload'
                          type='file'
                          className='sr-only'
                          onChange={handleSvg}
                        />
                      </label>
                      <p className='pl-1'>or drag and drop</p>
                    </div>
                    <p className='text-xs leading-5 text-gray-600'>
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <SpecialLoadingButton content='Adding' />
            ) : (
              <Button
                type='submit'
                onClick={handleNewAddSkill}
                className='w-full'
              >
                Add Skill
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSkills;
