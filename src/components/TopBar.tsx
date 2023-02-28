import Image from 'next/image'
import Logo from '../../public/logotipo.png'

export function TopBar(){
	return (
		<div className='h-20 w-full'>
			<div className='h-full w-full flex items-center font-medium text-2xl pl-5 bg-slate-50 shadow-md'>
				<div className='flex w-[50%] gap-2'>
					<Image src={Logo} alt='Logo do quiz' height={30} width={30} className="rounded-md"/>
					<p>Quiz</p>
				</div>
			</div>
		</div>
	)
}
