import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface LoginProps {
  status?: string;
  canResetPassword: boolean;
  canRegister: boolean;
}

export default function Login({ status, canResetPassword, canRegister }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <AuthLayout title="Login" description="Masukkan email dan password Anda untuk masuk">
      <Head title="Log in" />

      <Form {...store.form()} resetOnSuccess={['password']} className="flex flex-col gap-6">
        {({ processing, errors }) => (
          <>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label className="text-black dark:text-white" htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  autoFocus
                  tabIndex={1}
                  autoComplete="email"
                />
                <InputError message={errors.email} />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label className="text-black dark:text-white" htmlFor="password">Kata Sandi</Label>
                  {/* {canResetPassword && (
                    <TextLink href={request()} className="ml-auto text-sm" tabIndex={5}>
                      Lupa kata sandi?
                    </TextLink>
                  )} */}
                </div>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    tabIndex={2}
                    autoComplete="current-password"
                    placeholder="********"
                    className="pr-10" // Add padding for the icon
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                    tabIndex={-1} // Prevent tab focus on the button
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <InputError message={errors.password} />
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox id="remember" name="remember" tabIndex={3} />
                <Label className="text-black dark:text-white" htmlFor="remember">Tetap login</Label>
              </div>

              <Button
                type="submit"
                className="mt-4 w-full cursor-pointer"
                tabIndex={4}
                disabled={processing}
                data-test="login-button"
              >
                {processing && <Spinner />}
                Masuk
              </Button>
            </div>

            {/* {canRegister && (
              <div className="text-muted-foreground text-center text-sm">
                Belum punya akun?{' '}
                <TextLink href={register()} tabIndex={5}>
                  Daftar
                </TextLink>
              </div>
            )} */}
          </>
        )}
      </Form>

      {status && (
        <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>
      )}
    </AuthLayout>
  );
}
