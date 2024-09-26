import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SpecialLoadingButton from './sub-component/specialLoadingButton';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  clearAllProjectSliceError,
  deleteProjects,
  getAllProjects,
  resetProjectSlice,
} from '@/store/slice/projectSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Eye, PencilLine, Trash2 } from 'lucide-react';
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Tooltip } from '@radix-ui/react-tooltip';

const ManageProjects = () => {
  const { projects, loading, error, message } = useSelector(
    (state) => state.project
  );

  const dispatch = useDispatch();
  const [projectId, setProjectId] = useState('');

  const handleDeleteProject = (id) => {
    setProjectId(id);
    try {
      dispatch(deleteProjects(id));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    // Fetch projects on component mount
    dispatch(getAllProjects());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectSliceError());
    }

    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      // Re-fetch projects after deletion
      dispatch(getAllProjects());
    }
  }, [loading, error, message, dispatch, projects]);

  return (
    <>
      <div className='flex-col min-h-screen w-full py-2 bg-muted/40'>
        <Tabs>
          <TabsContent>
            <Card>
              <CardHeader className='flex gap-4 sm:justify-between sm:items-center sm:flex-row'>
                <CardTitle>Manage Your Timelines</CardTitle>
                <Link to='/'>
                  <Button>Return to Dashboard</Button>
                </Link>
              </CardHeader>
              <CardContent className='grid grid-cols-1 gap-4'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Banner</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Stack</TableHead>
                      <TableHead>Deployed</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects && projects.length > 0 ? (
                      projects.map((element) => (
                        <TableRow key={element._id} className='bg-accent'>
                          <TableCell>
                            <div>
                              <img
                                className='w-[200px] h-auto'
                                src={
                                  element.projectBanner &&
                                  element.projectBanner.url
                                }
                                alt={element.title}
                              />
                            </div>
                          </TableCell>
                          <TableCell className='font-medium'>
                            {element.title}
                          </TableCell>
                          <TableCell className='md:table-cell hidden'>
                            {element.stack}
                          </TableCell>
                          <TableCell className='md:table-cell hidden'>
                            {element.deployed}
                          </TableCell>
                          <TableCell className='flex flex-row items-center gap-3 h-24'>
                            {/* View Project */}
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Link
                                    to={`/view/project/${element._id}`}
                                    target='_blank'
                                  >
                                    <Button className='text-black border-green-600 bg-green-500 hover:bg-green-700 hover:text-white rounded-full'>
                                      <Eye />
                                    </Button>
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent side='right'>
                                  View
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            {/* Update Project */}
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Link
                                    to={`/update/project/${element._id}`}
                                    target='_blank'
                                  >
                                    <Button className='text-black border-yellow-600 bg-yellow-500 hover:bg-yellow-700 hover:text-white rounded-full'>
                                      <PencilLine className='h-5 w-5' />
                                    </Button>
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent side='right'>
                                  Edit
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            {/* Delete Project */}
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  {loading && projectId === element._id ? (
                                    <SpecialLoadingButton content='Deleting' />
                                  ) : (
                                    <Button
                                      className='text-black border-red-600 bg-red-500 hover:bg-red-700 hover:text-white rounded-full'
                                      onClick={() =>
                                        handleDeleteProject(element._id)
                                      }
                                    >
                                      <Trash2 className='h-5 w-5' />
                                    </Button>
                                  )}
                                </TooltipTrigger>
                                <TooltipContent side='right'>
                                  Delete
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell className='text-xl text-red-500 font-semibold italic'>
                          You have not added any Timelines
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
    </>
  );
};

export default ManageProjects;
