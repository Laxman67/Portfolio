import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ViewProject = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [projectBanner, setProjectBanner] = useState();
  const [gitRepoLink, setGitRepoLink] = useState();
  const [projectLink, setProjectLink] = useState();
  const [technologies, setTechnologies] = useState();
  const [stack, setStack] = useState();
  const [deployed, setDeployed] = useState();

  const { id } = useParams();

  useEffect(() => {
    // Fetch Particular Project based on id on Parameter-> url
    const getProject = async () => {
      await axios
        .get(`http://localhost:4000/api/v1/project/get/${id}`, {
          withCredentials: true,
        })
        .then(({ data }) => {
          setTitle(data.project.title);
          setDescription(data.project.description);
          setDeployed(data.project.deployed);
          setGitRepoLink(data.project.gitRepoLink);
          setProjectLink(data.project.projectLink);
          setProjectBanner(
            data.project.projectBanner && data.project.projectBanner.url
          );
          setStack(data.project.stack);
          setTechnologies(data.project.technologies);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    };

    getProject();
  }, [id]);

  // \s+ matches one or more whitespace characters.
  // ,+\s* matches one or more commas followed by zero or more whitespace characters.

  const descriptionListFormat = description ? description.split(/,+\s*/) : [];
  const technologiesListFormat = technologies
    ? technologies.split(/,+\s*/)
    : [];

  return (
    <div>
      <>
        <div>
          <div className='flex  justify-center  items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14'>
            <div className='w-[100%] px-5 md:w-[1000px]'>
              <div className='space-y-12'>
                <div className='border-b border-gray-900/10 pb-12'>
                  <h2 className='font-semibold leading-7 text-gray-900 text-3xl text-center'>
                    PROJECT OVERVIEW
                  </h2>
                  {/* TODO -> Dynamic usage of input ,setFunction useState and  placholder files  */}

                  {/* Title */}
                  <div className='mt-10 flex-col gap-5'>
                    <div className='w-full sm:col-span-4 '>
                      <h1 className='text-2xl font-bold mb-4'> {title}</h1>
                      <img
                        className='w-full h-auto'
                        src={projectBanner && projectBanner}
                        alt={title}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className='mt-10 flex-col gap-5'>
                    <div className='w-full sm:col-span-4 '>
                      <p className='text-2xl mb-2'>Description</p>
                      <ul className='list-disc pl-3'>
                        {descriptionListFormat.map((item, index) => {
                          return <li key={index}>{item}</li>;
                        })}
                      </ul>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className='mt-10 flex-col gap-5'>
                    <div className='w-full sm:col-span-4 '>
                      <p className='text-2xl mb-2'>Technologies</p>
                      <ul className='list-disc pl-3'>
                        {technologiesListFormat.map((item, index) => {
                          return <li key={index}>{item}</li>;
                        })}
                      </ul>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className='mt-10 flex-col gap-5'>
                    <div className='w-full sm:col-span-4 '>
                      <p className='text-2xl mb-2'>Stack</p>
                      <p>{stack} </p>
                    </div>
                  </div>

                  {/* Deployed Link  */}
                  <div className='mt-10 flex-col gap-5'>
                    <div className='w-full sm:col-span-4 '>
                      <p className='text-2xl mb-2'>Deployed</p>
                      <p>{deployed} </p>
                    </div>
                  </div>

                  {/* gitRepoLink */}
                  <div className='mt-10 flex-col gap-5'>
                    <div className='w-full sm:col-span-4 '>
                      <p className='text-2xl mb-2'>Github Repository Link: </p>
                      <Link
                        to={gitRepoLink}
                        target='_blank'
                        className='text-sky-700 font-medium p-2 rounded-md '
                      >
                        {gitRepoLink}
                      </Link>
                    </div>
                  </div>

                  {/* projectLink */}
                  <div className='mt-10 flex-col gap-5'>
                    <div className='w-full sm:col-span-4 '>
                      <p className='text-2xl mb-2'>Project Link: </p>
                      <Link
                        to={projectLink}
                        target='_blank'
                        className='text-sky-700 font-medium p-2 rounded-md'
                      >
                        {projectLink}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default ViewProject;
