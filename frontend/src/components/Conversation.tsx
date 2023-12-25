import Image from "next/image"

export default function Conversation() {
	return (
	<div className="flex border-t-2 border-white m-4">
		<div className="min-w-max min-h-max">
			<Image src="/img/generic_user.png" alt="a generic image of a user profile" width={100} height={100} />
		</div>
		<div className="py-5">
			<div>
				<h3>
					Abed
				</h3>
			</div>
			<div className="text-gray-400">
				<h4>
					hey, what's up?
				</h4>
			</div>
		</div>
	</div>
	)
}