import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SpecialLoadingButton from './specialLoadingButton';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { TabsContent } from '@radix-ui/react-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import {
  clearAllApplicationSliceError,
  deleteSoftwareApplication,
  getAllSoftwareApplication,
  resetApplicationSoftwareSlice,
} from '@/store/slice/applicationslice';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const { projects } = useSelector((state) => state.project);
  const { skills } = useSelector((state) => state.skill);
  const { softwareApplicatios, error, message, loading } = useSelector(
    (state) => state.application
  );
  const { timeline } = useSelector((state) => state.timeline);

  // Handler Fucntion

  const dispatch = useDispatch();

  const [appId, setAppId] = useState('');

  const handleAppDelete = async (id) => {
    setAppId(id);
    try {
      dispatch(deleteSoftwareApplication(id));
    } catch (error) {
      toast.error(error);
      dispatch(clearAllApplicationSliceError());
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationSliceError());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSoftwareSlice());
      dispatch(getAllSoftwareApplication());
    }
  }, [dispatch, message, error, loading]);

  return (
    <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
      <main
        className='grid flex-1 items-start gap-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2
      '
      >
        <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
          <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4'>
            {/* About Me Card */}
            <Card className='sm:col-span-2 '>
              <CardHeader className='pb-3'>
                <CardDescription className='max-w-lg text-balance leading-relaxed'>
                  <blockquote className='mt-6 border-l-2 pl-6 italic'>
                    {user.aboutMe}
                  </blockquote>
                </CardDescription>
              </CardHeader>

              {/* TODO */}
              {/* <Link to={user.portfolioURL &&user.portfolioURL} target='_blank'> */}
              <Link //Remove This Line when todo will update
                to='https://schoolcool2-frontend.onrender.com/'
                target='_blank'
              >
                <CardFooter>
                  <Button>Visit Portfolio</Button>
                </CardFooter>
              </Link>
            </Card>

            {/* Project */}
            <Card className='flex flex-col justify-center '>
              <CardHeader className='pb-2'>
                <CardTitle>Project Completed</CardTitle>
                <CardTitle className='text-6xl'>
                  {projects && projects.length}
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <Link to='/manage/project'>
                  {/* TODO change the theme of button */}

                  <Button>Manage Project</Button>
                </Link>
              </CardFooter>
            </Card>
            {/* Skills */}
            <Card className='flex flex-col justify-center '>
              <CardHeader className='pb-2'>
                <CardTitle>Skills Completed</CardTitle>
                <CardTitle className='text-6xl'>
                  {skills && skills.length}
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <Link to='manage/skills'>
                  {/* TODO change the theme of button */}
                  <Button>Manage Skills</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          {/* Table */}
          <Tabs>
            <TabsContent>
              <Card>
                <CardHeader className='px-7 '>
                  <CardTitle>Projects</CardTitle>
                </CardHeader>

                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead className='hidden md:table-cell'>
                          Stack
                        </TableHead>

                        <TableHead className='hidden md:table-cell'>
                          Deployed
                        </TableHead>

                        <TableHead>Visit</TableHead>
                        <TableHead className='text-right'>Update</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {projects && projects.length > 0 ? (
                        projects.map((project, index) => {
                          return (
                            <TableRow key={index} className='bg-accent'>
                              <TableCell>{project.title}</TableCell>

                              <TableCell className='hidden md:table-cell'>
                                {project.stack}
                              </TableCell>

                              <TableCell className='hidden md:table-cell'>
                                {project.deployed}
                              </TableCell>

                              <TableCell className=''>
                                <Link
                                  to={
                                    project.projectLink && project.projectLink
                                  }
                                  target='_blank'
                                >
                                  <Button className='bg-green-800 hover:bg-green-900'>
                                    Visit
                                  </Button>
                                </Link>
                              </TableCell>

                              <TableCell className='text-right'>
                                <Link
                                  to={`/update/project/${project._id}`}
                                  target='_blank'
                                >
                                  <Button className='bg-blue-800 hover:bg-blue-900 '>
                                    Update
                                  </Button>
                                </Link>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell className=' italic text-red-600 font-medium text-xl overflow-y-hidden'>
                            You have Not Added Projects
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/*  Skills*/}
          <Tabs>
            <TabsContent>
              <Card>
                <CardHeader className='px-7 gap-3'>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent className='grid sm:grid-cols-2 gap-4'>
                  {skills && skills.length > 0 ? (
                    skills.map((element) => {
                      return (
                        <Card key={element._id}>
                          <CardHeader>{element.title}</CardHeader>
                          <CardFooter>
                            <Progress
                              value={element.proficiency}
                              className='border  border-gray-200 '
                            />
                          </CardFooter>
                        </Card>
                      );
                    })
                  ) : (
                    <p className=' italic text-red-600 font-medium text-xl overflow-y-hidden'>
                      You have Not Added Skills
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Tabs>
            <TabsContent className='grid min-[1050px]:grid-cols-2 gap-4 '>
              {/* Software Application */}

              <Card>
                <CardHeader className='px-7'>
                  <CardTitle>Software Applications</CardTitle>
                </CardHeader>

                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className='md:table-cell'>Icon</TableHead>
                        <TableHead className='md:table-cell'>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {softwareApplicatios && softwareApplicatios.length > 0 ? (
                        softwareApplicatios.map((element) => {
                          return (
                            <TableRow key={element._id} className='bg-accent'>
                              <TableCell className='text-lg font-bold'>
                                {element.name}
                              </TableCell>
                              <TableCell>
                                <img
                                  src={element.svg && element.svg.url}
                                  alt={element.name}
                                  title={element.name}
                                  className='w-12 h-auto'
                                />
                              </TableCell>
                              <TableCell>
                                {loading && appId === element._id ? (
                                  <SpecialLoadingButton
                                    content='Deleting'
                                    className='w-fit'
                                  />
                                ) : (
                                  <Button
                                    className='bg-red-600 hover:bg-red-800'
                                    onClick={() => handleAppDelete(element._id)}
                                  >
                                    <Trash2 />
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell className=' italic text-red-600 font-medium text-xl overflow-y-hidden'>
                            You have not added any software
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader className='px-7 flex items-center justify-between flex-row'>
                  <CardTitle>TimeLine</CardTitle>
                  <Link to='/manage/timeline'>
                    <Button>Manage Timeline</Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>From</TableHead>
                        <TableHead className='text-right'>To</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timeline && timeline.length > 0 ? (
                        timeline.map(({ _id, title, timeline }) => {
                          return (
                            <TableRow key={_id} className='bg-accent'>
                              <TableCell className='font-medium'>
                                {title}
                              </TableCell>
                              <TableCell className='md:table-cell'>
                                {timeline.from}
                              </TableCell>
                              <TableCell className='md:table-cell text-right'>
                                {timeline.to && timeline.to
                                  ? timeline.to
                                  : 'Present'}
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell className='text-xl text-red-500 font-semibold italic'>
                            You have not added any Timlelines
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
