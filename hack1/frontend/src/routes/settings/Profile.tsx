import { useForm } from 'react-hook-form';
import type { User } from '@shared/types';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/contexts/UserContext';

const GenderItem = ({ gender }: { gender: NonNullable<User['sex']> }) => {
    return (
        <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
                <RadioGroupItem value={gender} />
            </FormControl>
            <FormLabel className="font-normal">{gender}</FormLabel>
        </FormItem>
    );
};

const Profile = (): React.ReactNode => {
  const { user, updateProfile } = useUser();
  const { toast } = useToast();

  const form = useForm({
    defaultValues: user!,
    mode: 'onChange',
  });

  const onSubmit = (data: User.Put.Payload) => {
    updateProfile(data);
    toast({ description: 'Profile updated successfully!' });
  };

  const genders: NonNullable<User['sex']>[] = ['Male', 'Female', 'Other'];

  const uploadedImage = form.watch('image');
  const renderProfilePictureContent = () => {
    if (uploadedImage) {
        return (
            <img
                src={uploadedImage}
                alt="Uploaded Profile Picture"
                data-testid="label-profile-picture"
                className="h-full w-full rounded-md object-cover"
            />
        );
    } else if (user?.image) {
        return (
            <img
                src={user.image}
                alt="Profile Picture"
                data-testid="label-profile-picture"
                className="h-full w-full rounded-md object-cover"
            />
        );
    } else {
        return (
            <span data-testid="label-upload">Upload a picture</span>
        );
    }
  };

  if (!user) return <>Profile: You are not logged in.</>;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    data-testid="input-username"
                    placeholder={user.username}
                    required
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name. It will be visible to other
                  when you post your code snippets. You can change it at any
                  time.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    data-testid="input-bio"
                    placeholder="Tell us a little bit about yourself"
                  />
                </FormControl>
                <FormDescription>
                  Tell the community about yourself.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>What is your gender?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {genders.map(gender => (
                      <GenderItem key={gender} gender={gender} />
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <Label>Your Profile Picture</Label>
                <FormLabel
                  htmlFor="image"
                  className="mx-auto flex h-36 w-36 cursor-pointer items-center justify-center rounded-md bg-background text-sm text-muted-foreground"
                >
                  {renderProfilePictureContent()}
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="image"
                    onChange={(event) => {
                      if (!event.target.files?.[0])
                        return form.setValue('image', '');
                      const reader = new FileReader();
                      reader.onload = () => {
                        if (typeof reader.result !== 'string') return;
                        form.setValue('image', reader.result);
                      };
                      reader.readAsDataURL(event.target.files?.[0] as Blob);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Update profile</Button>
        </form>
      </Form>
    </>
  );
};

export default Profile;

