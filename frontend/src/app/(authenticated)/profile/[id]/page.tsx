const ProfilePage = ({ params }: { params: { id: string } }) => {
	return (
		<article className="h-full flex flex-col justify-center">
			<div>{params.id}</div>
		</article>
	);
};

export default ProfilePage;
