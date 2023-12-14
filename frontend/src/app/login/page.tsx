import Form from '@/components/Form';
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { headers } from 'next/headers'

export default function Login() {
	const headerList = headers();
	const referer = headerList.get('uri');
  return (
	<div>
	<nav 
	className="flex-no-wrap relative flex w-full justify-end bg-black py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 
    data-te-navbar-ref" >
		<div className='mr-3 text-white'>
			<Button variant='link'>Sign in</Button>			
		</div>
	</nav>
	<main >
			<div className='flex justify-center  mt-40' >
				<div className=' bg-transparent rounded mx-30'>
					<Form label1="Email" label2="Password" button="Log in"/>
					<div className='p-3 hover:underline text-white'>
						<h3>Forgot password?</h3>
					</div>
				<div className='block px-3'>
					<div className='flex justify-center border-solid border-1 border-t pt-3 text-white'>
						<span> OR CONTINUE WITH</span>
					</div>
				</div>
				<div className='flex justify-center items-center pt-2'>
					<div>
						<Image className='rounded-full m-1' src="/img/google-logo.png" width={30} height={30} alt="42-logo"/>
					</div>
					<div>
						<Image className='rounded-full m-1 bg-white p-0.5' src="/img/42-logo.png" width={30} height={30} alt="42-logo"/>
					</div>
					<div>
						<Image className='rounded-full m-1' src="/img/github-logo.png" width={30} height={30} alt="42-logo"/>
					</div>
				</div>
				</div>
			</div>
	</main>
	</div>
  )
}
