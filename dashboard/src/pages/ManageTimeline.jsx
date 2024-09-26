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
import { Tabs } from '@/components/ui/tabs';
import {
  clearAllTimelineError,
  deleteTimeline,
  getAllTimeline,
  resetTimelineSlice,
} from '@/store/slice/timelineSlices';
import { TabsContent } from '@radix-ui/react-tabs';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManageTimeline = () => {
  const { loading, error, message, timeline } = useSelector(
    (state) => state.timeline
  );

  const dispatch = useDispatch();
  const [timelineId, setTimelineId] = useState('');

  const handleDeleteTimeline = async (id) => {
    setTimelineId(id);

    try {
      dispatch(deleteTimeline(timelineId));
    } catch (error) {
      toast.error(error);
      dispatch(clearAllTimelineError());
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineError());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTimelineSlice()); //reset
      dispatch(getAllTimeline()); //getall
    }
  }, [message, error, dispatch, loading]);

  return (
    <div className=' flex-col min-h-screen w-full  py-2  bg-muted/40'>
      <Tabs>
        <TabsContent>
          <Card>
            <CardHeader className='flex gap-4 sm:justify-between sm:items-center sm:flex-row '>
              <CardTitle>Manage Your Timelines</CardTitle>
              <Link to='/'>
                <Button>Return to Dashboard </Button>
              </Link>
            </CardHeader>
            <CardContent className='grid grid-cols-1 gap-4 '>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead className='text-right'>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeline && timeline.length > 0 ? (
                    timeline.map(({ _id, description, title, timeline }) => {
                      return (
                        <TableRow key={_id} className='bg-accent'>
                          <TableCell className='font-medium'>{title}</TableCell>
                          <TableCell className='md:table-cell'>
                            {description}
                          </TableCell>
                          <TableCell className='md:table-cell'>
                            {timeline.from}
                          </TableCell>
                          <TableCell className='md:table-cell '>
                            {timeline.to && timeline.to
                              ? timeline.to
                              : 'Present'}
                          </TableCell>
                          <TableCell className='text-right border-red-50'>
                            {loading && timelineId === _id ? (
                              <SpecialLoadingButton content='Deleting' />
                            ) : (
                              <Button
                                className='bg-muted border-2  border-red-700 text-red-700 hover:bg-red-700 hover:text-white rounded-full'
                                onClick={() => {
                                  handleDeleteTimeline(_id);
                                }}
                              >
                                <Trash2 className='h-5 w-5' />
                              </Button>
                            )}
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
  );
};

export default ManageTimeline;
