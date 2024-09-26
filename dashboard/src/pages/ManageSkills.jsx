import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import {
  clearAllSkillError,
  deleteSkill,
  getAllSkills,
  resetSkillSlice,
  updateSkill,
} from '@/store/slice/skillSlice';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const ManageSkills = () => {
  const { loading, error, message, skills } = useSelector(
    (state) => state.skill
  );

  const dispatch = useDispatch();

  const [newProficiency, setNewProficiency] = useState(1);

  const handleInputChange = (proficiency) => {
    setNewProficiency(proficiency);
  };
  const handleUpdateSkill = (id) => {
    dispatch(updateSkill(id, newProficiency));
  };

  const HandleDeleteSkill = (id) => {
    try {
      dispatch(deleteSkill(id));
    } catch (error) {
      toast.error(error);
    }
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
  }, [loading, error, message, dispatch]);

  return (
    <div className='flex-col min-h-screen w-full  py-2  bg-muted/40'>
      <Tabs>
        <TabsContent>
          <Card>
            <CardHeader className='flex gap-4 sm:justify-between sm:flex-grow sm:items-center'>
              <CardTitle>Manage Yuor Skills</CardTitle>
              <Link to='/'>
                <Button className='w-fit'>Return to Dashboard</Button>
              </Link>
            </CardHeader>

            <CardContent className='grid grid-cols-2 gap-4'>
              {skills && skills.length > 0 ? (
                skills.map((element) => {
                  return (
                    <Card key={element._id}>
                      <CardHeader className='text-2xl font-bold items-center justify-between flex-row'>
                        {element.title}
                        <img
                          src={element.svg && element.svg.url}
                          className='w-16'
                        />
                        <TooltipProvider>
                          <Tooltip>
                            {/* Trigger  */}
                            <TooltipTrigger asChild>
                              <Trash2
                                onClick={() => HandleDeleteSkill(element._id)}
                                className='h-5 w-5 hover:text-red-600 pointer '
                              />
                            </TooltipTrigger>

                            {/* Content on Click or Hover */}
                            <TooltipContent
                              side='right'
                              style={{ color: 'red', fontSize: '15px' }}
                            >
                              Delete
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </CardHeader>

                      <CardFooter>
                        <Label className='text-2xl mr-2 '>Proficiency</Label>
                        <Input
                          className='font-semibold'
                          type='number'
                          defaultValue={element.proficiency}
                          onChange={(e) => handleInputChange(e.target.value)}
                          onBlur={() => handleUpdateSkill(element._id)}
                          max='100'
                          min='1'
                        />
                      </CardFooter>
                    </Card>
                  );
                })
              ) : (
                <CardTitle className='text-3xl overflow-y-hidden italic text-red-700'>
                  You Have Not Added Skills
                </CardTitle>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageSkills;
