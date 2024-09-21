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

import { Tabs, TabsContent } from '@/components/ui/tabs';
import {
  clearAllMessagesError,
  deleteMessage,
  getAllMessages,
  resetMessageSlice,
} from '@/store/slice/messagesSlices';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Messages = () => {
  const dispatch = useDispatch();
  const { loading, messages, error, message } = useSelector(
    (state) => state.messages
  );

  const [messageId, setMessageId] = useState('');
  const handleMessageDelete = (id) => {
    setMessageId(id);
    dispatch(deleteMessage(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllMessagesError());
    }
    if (message) {
      toast.success(message);
      dispatch(resetMessageSlice());
      dispatch(getAllMessages());
    }
  }, [message, error, dispatch, loading]);

  return (
    <div className='min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-20'>
      <Tabs>
        <TabsContent>
          <Card>
            {/* Header */}
            <CardHeader className='flex gap-4  sm:justify-between sm:flex-row sm:items-center'>
              <CardTitle>Messages</CardTitle>
            </CardHeader>

            {/* Content */}
            <CardContent className='grid md:grid-cols-2 gap-4 '>
              {messages && messages.length > 0 ? (
                messages.map((element) => {
                  return (
                    <Card key={element.id} className='grid gap-2 p-3'>
                      <CardDescription className='text-slate-950'>
                        <span className='font-bold mr-2'>Sender Name:</span>
                        <span className='bg-green-400 p-1 font-bold rounded-sm'>
                          {element.senderName}
                        </span>
                      </CardDescription>
                      <CardDescription className='text-slate-950'>
                        <span className='font-bold mr-2'>Subject:</span>
                        <i>
                          <b>{element.subject.toUpperCase()}</b>
                        </i>
                      </CardDescription>
                      <CardDescription className='text-slate-950'>
                        <span className='font-bold mr-2'>Message:</span>
                        {element.message}
                      </CardDescription>

                      <CardFooter className='justify-start '>
                        {loading && messageId == element._id ? (
                          <SpecialLoadingButton width='32' content='Deleting' />
                        ) : (
                          <Button
                            className='w-32 '
                            onClick={() => handleMessageDelete(element._id)}
                          >
                            Delete
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  );
                })
              ) : (
                <CardHeader>No Messages Found</CardHeader>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Messages;
