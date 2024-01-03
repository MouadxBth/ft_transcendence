import { loggedUser } from "@/app/chat/userData";
import { Plus } from "lucide-react";
import { useState } from "react";

function AddChannel() {
    const [newlogged, setUser] = useState(loggedUser);
	
		const handleAddUserClick = () => {
			const newUserName = prompt('Enter the name of the new channel:');
			if (newUserName) {
				loggedUser.channels.push({user: newUserName, data: []})
				setUser(prevUser => ({
					...prevUser,
					channels: [
					  ...prevUser.channels,
					  { user: newUserName, data: [] },
					],
				  }));
			}
		  };
   return(
	<>
	<div>
		<button className=" rounded-full h-10 w-10 bg-white text-black absolute top-[93%] right-[81%]" onClick={handleAddUserClick}>
			<div className="flex justify-center">
				<Plus/>
			</div>
		</button>
	</div>
</>
   )
  }
  
  export default AddChannel