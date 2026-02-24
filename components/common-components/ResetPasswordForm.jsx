'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSetState } from '@/utils/function.utils';
import Models from '@/imports/models.import';
import { Failure, Success } from '../common-components/toast';
import * as Yup from 'yup';
import { Eye, EyeOff, Loader } from 'lucide-react';

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [id, setId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Ensure that searchParams are read only on the client side
    if (typeof window !== 'undefined') {
      const idFromUrl = searchParams.get('id');
      const tokenFromUrl = searchParams.get('token');

      if (idFromUrl) {
        setId(idFromUrl);
      }
      if (tokenFromUrl) {
        setToken(tokenFromUrl);
      }
    }
  }, [searchParams]);

  const [isMounted, setIsMounted] = useState(false);

  const [state, setState] = useSetState({
    password: '',
    password_confirm: '',
    btnLoading: false,
    showConfirmPassword: false,
    showNewPassword: false,
    errors: {},
  });

  useEffect(() => {
    setIsMounted(true); // Ensure component is only rendered on client
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setState({ btnLoading: true, errors: {} });
      const body = {
        password: state.password,
        password_confirm: state.password_confirm,
      };

      // You might want to add yup validation here

      if (!id || !token) {
        Failure('Invalid or expired password reset link.');
        setState({ btnLoading: false });
        return;
      }

      const res = await Models.auth.reset_password(body, id, token);

      Success(res?.message || 'Password has been reset successfully.');

      setState({
        btnLoading: false,
        password: '',
        password_confirm: '',
      });

      router.push('/login');
    } catch (error) {
      console.log('error: ', error);
      setState({ btnLoading: false });
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err?.message;
        });
        setState({ errors: validationErrors });
      } else {
        const errorMessage =
          error?.detail ||
          error?.password?.[0] ||
          error?.password_confirm?.[0] ||
          'An error occurred. Please try again.';
        Failure(errorMessage);
      }
    }
  };

  if (!isMounted) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-clr1">
      <Card className="md:w-[400px] w-[320px] p-6">
        <CardHeader className="p-0">
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>Enter your new password below.</CardDescription>
        </CardHeader>
        <CardContent className="mx-0 mt-4 pb-2">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={state.showNewPassword ? 'text' : 'password'}
                    placeholder="Enter Your New Password"
                    required
                    value={state.password}
                    onChange={(e) =>
                      setState({
                        password: e.target.value,
                        errors: { ...state.errors, password: '' },
                      })
                    }
                    error={state.errors?.password}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setState({ showNewPassword: !state.showNewPassword })
                    }
                    className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground focus:outline-none"
                  >
                    {state.showNewPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={state.showConfirmPassword ? 'text' : 'password'}
                    placeholder="Enter Your Confirm Password"
                    required
                    value={state.password_confirm}
                    onChange={(e) =>
                      setState({
                        password_confirm: e.target.value,
                        errors: { ...state.errors, password_confirm: '' },
                      })
                    }
                    error={state.errors?.password_confirm}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setState({
                        showConfirmPassword: !state.showConfirmPassword,
                      })
                    }
                    className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground focus:outline-none"
                  >
                    {state.showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600"
                  disabled={state.btnLoading}
                >
                  {state.btnLoading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    'Reset Password'
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;