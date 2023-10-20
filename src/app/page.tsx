import Image from "next/image"
import AuthForm from "./component/auth/AuthForm"
export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 md:px-8 lg:px-10 bg-gray-50 border border-sky-500 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image src="/assets/logo.png" alt="Logo Image" width="48" height="48" className="sm:mx-auto w-auto" />
       

      </div>
     
      <AuthForm/>
       </div>
  )
}
