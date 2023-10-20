'use client'

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios'
import { Variant } from '../types/types';
import { Input } from "../input/Input";
import { signIn, useSession } from 'next-auth/react';
import { Button } from "../button/Button"
import { AuthWithSocialButton } from './AuthWithSocialsButton';
import { BsGithub, BsGoogle } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';


const AuthForm = () => {
    const session = useSession();
  const router = useRouter();
    const [variant, setVariant] = useState<Variant>('REGISTER');
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/users')
    
  }
},[session?.status,router])


    const changeVariant = useCallback(() => {
        if (variant === 'LOGIN') {
             setVariant('REGISTER');
        }
        else {
            setVariant('LOGIN')
            
        }
    }, [variant])
  const { register,
    handleSubmit,
  formState:{errors}} = useForm<FieldValues>({
    defaultValues: {
      username: '',
      email: '',
      password:''
      
    }
  })
 const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
  
    if (variant === 'REGISTER') {
      axios.post('/api/register', data)
      .then(() => signIn('credentials', {
        ...data,
        redirect: false,
      }))
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials!');
        }

        if (callback?.ok) {
          router.push('/conversations')
        }
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setIsLoading(false))
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false
      })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials!');
        }

        if (callback?.ok) {
          router.push('/conversations')
        }
      })
      .finally(() => setIsLoading(false))
    }
  }

  const socialMediaSignIn = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials!');
        }

        if (callback?.ok) {
          router.push('/conversations')
        }
      })
      .finally(() => setIsLoading(false));
  } 

  return (
    <div>
         <h2 className="mt-6 text-center font-bold text-2xl tracking-tight text-gray-900">
        {variant === 'LOGIN' ? 'Sign In To gg Your Account' : 'Sign up To Our Messanger'}
        </h2>
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
       
      <div 
        className="
        bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        "
      >
        <form 
          className="space-y-6" 
          onSubmit={handleSubmit(onSubmit)}
        >
          {variant === 'REGISTER' && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="name" 
              label="Name"
            />
          )}
          <Input 
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="email" 
            label="Email" 
            type="email"
          />
          <Input 
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="password" 
            label="Password" 
            type="password"
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div 
              className="
                absolute 
                inset-0 
                flex 
                items-center
              "
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or Sign In With
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthWithSocialButton 
              icon={BsGithub} 
              onClick={() => socialMediaSignIn('github')} 
            />
            <AuthWithSocialButton 
              icon={BsGoogle} 
              onClick={() => socialMediaSignIn('google')} 
            />
          </div>
        </div>
        <div 
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
        >
          <div>
            {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'} 
          </div>
          <div 
            onClick={changeVariant} 
            className="underline cursor-pointer"
          >
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
     </div>
  )
}

export default AuthForm