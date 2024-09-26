import SpecialLoadingButton from './specialLoadingButton';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Image } from 'lucide-react';
import {
  addNewProjects,
  clearAllProjectSliceError,
  getAllProjects,
  resetProjectSlice,
} from '@/store/slice/projectSlice';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem } from '@/components/ui/select';
import { SelectTrigger, SelectValue } from '@radix-ui/react-select';

const AddProject = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [projectBanner, setProjectBanner] = useState();
  const [projectBannerPreview, setProjectBannerPreview] = useState();
  const [gitRepoLink, setGitRepoLink] = useState();
  const [projectLink, setProjectLink] = useState();
  const [technologies, setTechnologies] = useState();
  const [stack, setStack] = useState();
  const [deployed, setDeployed] = useState();

  // Redux Part
  const { error, message, loading } = useSelector((state) => state.project);
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
      setProjectBanner(file);

      setProjectBannerPreview(reader.result);
    };
  };

  const handleAddNewProject = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('gitRepoLink', gitRepoLink);
    formData.append('projectLink', projectLink);
    formData.append('technologies', technologies);
    formData.append('stack', stack);
    formData.append('deployed', deployed);
    formData.append('projectBanner', projectBanner);

    console.log(formData);
    // Add and Pass to Slice
    dispatch(addNewProjects(formData));

    // Reset useSate
    setTitle('');
    setDescription('');
    setGitRepoLink('');
    setProjectLink('');
    setStack('');
    setTechnologies('');
    setDeployed('');
    setProjectBanner('');
    setProjectBannerPreview('');
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectSliceError());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [error, message, loading, dispatch]);
  return (
    <>
      <div>
        <div className='flex  justify-center  items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14'>
          <form className='w-[100%] px-5 md:w-[1000px]'>
            <div className='space-y-12'>
              <div className='border-b border-gray-900/10 pb-12'>
                <h2 className='font-semibold leading-7 text-gray-900 text-3xl text-center'>
                  ADD NEW PROJECT
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
                {/* Description */}
                <div className='mt-10 flex-col gap-5'>
                  <div className='w-full sm:col-span-4 '>
                    <Label className='block text-sm font-medium leading-6 text-gray-900'>
                      Description
                    </Label>
                    <div className='mt-2'>
                      <div
                        className='flex rounded-md  shadow-sm ring-1 ring-inset ring-gray-300
              focus-within:ring-2  focus-within:ring-inset  focus-within:ring-indigo-600'
                      >
                        <Textarea
                          className='block  flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                          type='text'
                          placeholder='Feature 1. Feature 2..'
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technologies */}
                <div className='mt-10 flex-col gap-5'>
                  <div className='w-full sm:col-span-4 '>
                    <Label className='block text-sm font-medium leading-6 text-gray-900'>
                      Technologies Used In This Project
                    </Label>
                    <div className='mt-2'>
                      <div
                        className='flex rounded-md  shadow-sm ring-1 ring-inset ring-gray-300
              focus-within:ring-2  focus-within:ring-inset  focus-within:ring-indigo-600'
                      >
                        <Textarea
                          className='block  flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                          type='text'
                          placeholder='HTML, CSS, JAvascript, Tailwindcss...'
                          value={technologies}
                          onChange={(e) => setTechnologies(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className='mt-10 flex-col gap-5'>
                  <div className='w-full sm:col-span-4 '>
                    <Label className='block text-sm font-medium leading-6 text-gray-900'>
                      Tech Stack Of Project
                    </Label>
                    <div className='mt-2'>
                      <div
                        className='flex rounded-md  shadow-sm ring-1 ring-inset ring-gray-300
              focus-within:ring-2  focus-within:ring-inset  focus-within:ring-indigo-600'
                      >
                        <Select
                          value={stack}
                          onValueChange={(selectedValue) =>
                            setStack(selectedValue)
                          }
                          className=' pl-4block  flex-1 border-0 bg-transparent py-1.5  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Select Tech Stack' />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value='Full Stack'>
                              Full Stack
                            </SelectItem>
                            <SelectItem value='MERN'>MERN</SelectItem>
                            <SelectItem value='MEAN'>MEAN</SelectItem>
                            <SelectItem value='MEVN'>MEVN</SelectItem>
                            <SelectItem value='NEXTJS'>NEXTJS</SelectItem>
                            <SelectItem value='REACTJS'>REACTJS</SelectItem>
                            <SelectItem value='HTML,CSS,JAVASCRIPT'>
                              HTML,CSS,JAVASCRIPT
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deployed Link  */}
                <div className='mt-10 flex-col gap-5'>
                  <div className='w-full sm:col-span-4 '>
                    <Label className='block text-sm font-medium leading-6 text-gray-900'>
                      Deployed Link
                    </Label>
                    <div className='mt-2'>
                      <div
                        className='flex rounded-md  shadow-sm ring-1 ring-inset ring-gray-300
              focus-within:ring-2  focus-within:ring-inset  focus-within:ring-indigo-600'
                      >
                        <Select
                          value={deployed}
                          onValueChange={(selectedValue) =>
                            setDeployed(selectedValue)
                          }
                          className=' pl-4block  flex-1 border-0 bg-transparent py-1.5  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Is this project Deployed' />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value='Yes'>Yes</SelectItem>
                            <SelectItem value='No'>No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* gitRepoLink */}
                <div className='mt-10 flex-col gap-5'>
                  <div className='w-full sm:col-span-4 '>
                    <Label className='block text-sm font-medium leading-6 text-gray-900'>
                      Github Repo Link
                    </Label>
                    <div className='mt-2'>
                      <div
                        className='flex rounded-md  shadow-sm ring-1 ring-inset ring-gray-300
              focus-within:ring-2  focus-within:ring-inset  focus-within:ring-indigo-600'
                      >
                        <input
                          className='block  flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                          type='text'
                          placeholder='https://github...'
                          value={gitRepoLink}
                          onChange={(e) => setGitRepoLink(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* projectLink */}
                <div className='mt-10 flex-col gap-5'>
                  <div className='w-full sm:col-span-4 '>
                    <Label className='block text-sm font-medium leading-6 text-gray-900'>
                      Project Link
                    </Label>
                    <div className='mt-2'>
                      <div
                        className='flex rounded-md  shadow-sm ring-1 ring-inset ring-gray-300
              focus-within:ring-2  focus-within:ring-inset  focus-within:ring-indigo-600'
                      >
                        <input
                          className='block  flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                          type='text'
                          placeholder='https://render.....'
                          value={projectLink}
                          onChange={(e) => setProjectLink(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className='col-span-full py-4'>
                  <label className='block text-sm font-medium leading-6 text-gray-900'>
                    Project Banner
                  </label>
                  <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                    <div className='text-center'>
                      {projectBannerPreview ? (
                        <img
                          className='max-auto h-auto w-[250px] text-gray-400 border-gray-400'
                          src={projectBannerPreview && projectBannerPreview}
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
                  onClick={handleAddNewProject}
                  className='w-full'
                >
                  Add Project
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProject;
