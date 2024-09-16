import { Tooltip } from '@/components/ui/tooltip';
import { clearAllUserError, logout } from '@/store/slice/userSlices';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import {
  FolderGit,
  History,
  Home,
  LayoutGrid,
  LibraryBig,
  LogOut,
  MessageSquareMore,
  Package,
  PanelLeft,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const [active, setActive] = useState('');
  const { isAuthenticated, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = (e) => {
    dispatch(logout());
    toast.success('Logged Out');
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserError());
    }
    if (!isAuthenticated) {
      navigateTo('/login');
    }
    if (isAuthenticated) {
      navigateTo('');
    }
  }, [isAuthenticated, error, navigateTo, dispatch]);

  return (
    <>
      <div className='flex min-h-screen w-full flex-col bg-muted/40'>
        <aside className='fixed inset-y-0 left-0 border-spacing-1 border-dashed hidden w-14 flex-col border-r bg-background sm:flex z-50'>
          {/* Dashboard Link Navs */}
          <nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
            <Link className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full'>
              <Package className='h-5 w-5 transition-all group-hover:scale-110' />
              <span className='sr-only'>Dashboard</span>
            </Link>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === 'Dashboard'
                        ? 'text-accent-foreground bg-accent '
                        : 'text-muted-foreground '
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive('Dashboard')}
                  >
                    <Home className='w-5 h-5 ' />
                    <span className='sr-only'>Dashboard </span>
                  </Link>
                </TooltipTrigger>

                <TooltipContent
                  side='right'
                  className='bg-black rounded-sm text-white px-2'
                >
                  Dashboard
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/*  Add Project  */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === 'Add Project'
                        ? 'text-accent-foreground bg-accent '
                        : 'text-muted-foreground '
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive('Add Project')}
                  >
                    <FolderGit className='w-5 h-5 ' />
                    <span className='sr-only'>Add Project </span>
                  </Link>
                </TooltipTrigger>

                <TooltipContent
                  side='right'
                  className='bg-black rounded-sm text-white px-2'
                >
                  Add Project
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/*  Add Skills  */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === 'Add Skills'
                        ? 'text-accent-foreground bg-accent '
                        : 'text-muted-foreground '
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive('Add Skills')}
                  >
                    <LibraryBig className='w-5 h-5 ' />
                    <span className='sr-only'>Add Skills</span>
                  </Link>
                </TooltipTrigger>

                <TooltipContent
                  side='right'
                  className='bg-black rounded-sm text-white px-2'
                >
                  Add Skills
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/*  Add Applications  */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === 'Add Applications'
                        ? 'text-accent-foreground bg-accent '
                        : 'text-muted-foreground '
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive('Add Applications')}
                  >
                    <LayoutGrid className='w-5 h-5 ' />
                    <span className='sr-only'>Add Applications</span>
                  </Link>
                </TooltipTrigger>

                <TooltipContent
                  side='right'
                  className='bg-black rounded-sm text-white px-2'
                >
                  Add Applications
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/*  Add Timeline  */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === 'Add Timeline'
                        ? 'text-accent-foreground bg-accent '
                        : 'text-muted-foreground '
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive('Add Timeline')}
                  >
                    <History className='w-5 h-5 ' />
                    <span className='sr-only'>Add Timeline</span>
                  </Link>
                </TooltipTrigger>

                <TooltipContent
                  side='right'
                  className='bg-black rounded-sm text-white px-2'
                >
                  Add Timeline
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/*  Messages  */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === 'Messages'
                        ? 'text-accent-foreground bg-accent '
                        : 'text-muted-foreground '
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive('Messages')}
                  >
                    <MessageSquareMore className='w-5 h-5 ' />
                    <span className='sr-only'>Messages</span>
                  </Link>
                </TooltipTrigger>

                <TooltipContent
                  side='right'
                  className='bg-black rounded-sm text-white px-2'
                >
                  Messages
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/*  Account  */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === 'Account'
                        ? 'text-accent-foreground bg-accent '
                        : 'text-muted-foreground '
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive('Account')}
                  >
                    <User className='w-5 h-5 ' />
                    <span className='sr-only'>Account</span>
                  </Link>
                </TooltipTrigger>

                <TooltipContent
                  side='right'
                  className='bg-black rounded-sm text-white px-2'
                >
                  Account
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>

          {/* Logout Nav */}
          <nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      active === 'Logout'
                        ? 'text-accent-foreground bg-accent '
                        : 'text-muted-foreground '
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={handleLogout}
                  >
                    <LogOut className='w-5 h-5 ' />
                    <span className='sr-only'>Logout</span>
                  </Link>
                </TooltipTrigger>

                <TooltipContent
                  side='right'
                  className='bg-black rounded-sm text-white px-2'
                >
                  Logout
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </aside>
        <header
          className='
        sticky top-0 left-0 hidden w-14 flex-col border-r bg-background 
        px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 max-[90px]
         :h-[100px]'
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button size='icons' variant='hidden' className='sm:hidden'>
                <PanelLeft className='h-5 w-5' />
                <span className='sr-only'>Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='sm:max-w-xs'>
              <nav className='grid gap-6 text-lg font-medium'></nav>
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </>
  );
};

export default HomePage;
