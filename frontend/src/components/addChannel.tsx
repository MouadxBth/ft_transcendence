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
            <button className=" rounded-full bg-white text-black" onClick={handleAddUserClick}><Plus/></button>
        </div>
    </>
   )
  }
  
  export default AddChannel