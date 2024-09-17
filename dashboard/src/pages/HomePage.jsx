/* eslint-disable no-unreachable */
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
  LogOut,
  MessageSquareMore,
  Package,
  Package2,
  PanelLeft,
  PencilRuler,
  User,
} from 'lucide-react';

// Component-<Dashboard
import Account from './sub-component/Account';
import AddApplications from './sub-component/AddApplications';
import AddProject from './sub-component/AddProject';
import AddSkills from './sub-component/AddSkills';
import AddTimeline from './sub-component/AddTimeline';
import Dashboard from './sub-component/Dashboard';
import Messages from './sub-component/Messages';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const [active, setActive] = useState('Dashboard');
  const { isAuthenticated, error, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
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
                    <PencilRuler className='w-5 h-5 ' />
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
        sticky top-0 left-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:boder-0 sm:bg-transparent sm:px-6 max-[900px]:h-[100px]   '
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button size='icons' variant='hidden' className='sm:hidden'>
                <PanelLeft className='h-5 w-5' />
                <span className='sr-only'>Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='sm:max-w-xs'>
              <nav className='grid gap-6 text-lg font-medium'>
                {/* Nav Icons */}
                <Link className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg text-primary-foreground md:text-base '>
                  <Package2 className='h-5 w-5 transition-all group-hover:scale-110' />
                </Link>
                {/* Dashboard */}
                <Link
                  href='#'
                  className={`flex items-center gap-4 px-2.5 ${
                    active === 'Dashboard'
                      ? 'text-background'
                      : 'text-muted-foreground hover:text-foreground '
                  }`}
                  onClick={() => setActive('Dashboard')}
                >
                  <Home className='h-5 w-5 ' />
                  Dashbaord
                </Link>

                {/* Add Project */}
                <Link
                  href='#'
                  className={`flex items-center gap-4 px-2.5 ${
                    active === 'Add Project'
                      ? 'text-background'
                      : 'text-muted-foreground hover:text-foreground '
                  }`}
                  onClick={() => setActive('Add Project')}
                >
                  <FolderGit className='h-5 w-5 ' />
                  Add Project
                </Link>

                {/*  Add Skills  */}
                <Link
                  href='#'
                  className={`flex items-center gap-4 px-2.5 ${
                    active === 'Add Skills'
                      ? 'text-background'
                      : 'text-muted-foreground hover:text-foreground '
                  }`}
                  onClick={() => setActive('Add Skills ')}
                >
                  <PencilRuler className='h-5 w-5 ' />
                  Add Skills
                </Link>

                {/* Add Applications */}
                <Link
                  href='#'
                  className={`flex items-center gap-4 px-2.5 ${
                    active === 'Add Applications'
                      ? 'text-background'
                      : 'text-muted-foreground hover:text-foreground '
                  }`}
                  onClick={() => setActive('Add Applications')}
                >
                  <LayoutGrid className='h-5 w-5 ' />
                  Add Applications
                </Link>

                {/* Account */}
                <Link
                  href='#'
                  className={`flex items-center gap-4 px-2.5 ${
                    active === 'Account'
                      ? 'text-background'
                      : 'text-muted-foreground hover:text-foreground '
                  }`}
                  onClick={() => setActive('Account')}
                >
                  <User className='h-5 w-5 ' />
                  Account
                </Link>

                {/* Add Timeline */}
                <Link
                  href='#'
                  className={`flex items-center gap-4 px-2.5 ${
                    active === 'Add Timeline'
                      ? 'text-background'
                      : 'text-muted-foreground hover:text-foreground '
                  }`}
                  onClick={() => setActive('Add Timeline')}
                >
                  <History className='h-5 w-5 ' />
                  Add Timeline
                </Link>
                {/* Messages */}
                <Link
                  href='#'
                  className={`flex items-center gap-4 px-2.5 ${
                    active === 'Messages'
                      ? 'text-background'
                      : 'text-muted-foreground hover:text-foreground '
                  }`}
                  onClick={() => setActive('Messages')}
                >
                  <MessageSquareMore className='h-5 w-5 ' />
                  Messages
                </Link>

                {/* Logout */}
                <Link
                  className={`flex items-center gap-4 px-2.5  text-muted-foreground hover:text-foreground `}
                  onClick={handleLogout}
                >
                  <LogOut className='h-5 w-5 ' />
                  Logout
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <div className='flex items-center gap-4 md:grow-0 sm:ml-16 sm:mt-5'>
            <img
              className='w-20 h-20 rounded-full max-[900px]:hidden'
              src={user && user.avatar && user.avatar.url}
              alt='User Logo'
            />
            <h1 className='text-4xl max-[900px]:text-2xl'>
              Welcome Back , {user.fullName}
            </h1>
          </div>
        </header>

        {/* Main Section */}
        {(() => {
          switch (active) {
            case 'Dashboard':
              return <Dashboard />;
              break;
            case 'Add Project':
              return <AddProject />;
              break;
            case 'Add Skills':
              return <AddSkills />;
              break;
            case 'Add Applications':
              return <AddApplications />;
              break;

            case 'Add Timeline':
              return <AddTimeline />;
              break;
            case 'Messages':
              return <Messages />;
              break;
            case 'Account':
              return <Account />;
              break;

            default:
              return <Dashboard />;
          }
        })()}
      </div>
    </>
  );
};

export default HomePage;
