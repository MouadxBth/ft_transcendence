import Sidebar from '@/components/ui/navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Audiowide } from 'next/font/google'
import Navbar from '@/components/ui/navbar'
import { AUTHORS } from '@/lib/authors'
import { Toaster } from '@/components/ui/toaster'


const audiowide = Audiowide({ subsets: ['latin'] , weight: ['400']})

export const metadata: Metadata = {
	title: "ft_transcendence",
	description: "Through my work, you shall transcend!",
	authors: AUTHORS.map((author) => {
		return {
			name: `${author.firstName} ${author.lastName}`,
			url: author.socials[0].link,
		};
	}),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${audiowide.className} bg-black`}>
	<div className='h-screen w-screen'>
		{/* <Navbar/> */}
        {children}
	</div>
	<Toaster/>
      </body>
    </html>
  )
}
