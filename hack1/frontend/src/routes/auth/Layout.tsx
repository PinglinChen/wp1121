import { useState, type FormEvent } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Label } from '@radix-ui/react-label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/contexts/UserContext';
import { cn } from '@/lib/utils';

const tabs = [
  { title: 'Login', path: 'login' },
  { title: 'Register', path: 'register' },
];

const AuthLayout = () => {
  const location = useLocation();
  const { login, register } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { toast } = useToast();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (location.pathname === '/login') {
      login(username, password);
    } else {
      if (password !== confirmPassword) {
        toast({
          description: 'Passwords do not match',
          variant: 'destructive',
        });
        return;
      }
      register(username, password);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Card className="w-sm border-none">
        <Tabs value={location.pathname}>
          <TabsList className="grid grid-cols-2">
            {tabs.map((tab) => (
              <TabsTrigger
                asChild
                key={tab.title}
                value={tab.path}
                className="last-of-type:border-r-0"
                data-testid={`tab-${tab.path}`}
              >
                <NavLink to={tab.path}>{tab.title}</NavLink>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 tracking-normal">
            <img data-testid="header-logo" className="h-5 w-5 brightness-200" src="/vscoddit.svg" alt="VSCoddit Logo" />
            <span data-testid="header-title">VSCoddit</span>
          </CardTitle>
          <CardDescription>
            {location.pathname === '/login'
              ? 'Login to Access Fragmented Coding Content'
              : 'Register to Access Fragmented Coding Content'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                data-testid="input-username"
                type="text"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                data-testid="input-password"
                type="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
              />
            </div>
            <div
              className={cn(
                'flex h-[76px] flex-col gap-2 transition-all duration-200',
                location.pathname === '/login' &&
                  'pointer-events-none !mt-0 h-0 opacity-0',
              )}
            >
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                data-testid="input-confirm-password"
                type="password"
                name="confirm-password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required={location.pathname === '/register'}
              />
            </div>
          </div>
        </CardContent>
        <Outlet />
      </Card>
    </form>
  );
};

export default AuthLayout;

