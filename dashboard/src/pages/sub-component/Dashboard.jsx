import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const { projects } = useSelector((state) => state.project);
  const { skills } = useSelector((state) => state.skill);

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
                      {projects && projects.length > 0
                        ? projects.map((project, index) => {
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
                        : ''}
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
