import { loggedUser } from "@/app/chat/userData";
import { Plus } from "lucide-react";
import { useState } from "react";

function AddChat() {
    const [newlogged, setUser] = useState(loggedUser);
	
		const handleAddUserClick = () => {
			const newUserName = prompt('Enter the name of the new user:');
			if (newUserName) {
				loggedUser.conversations.push({user: newUserName, data: []})
				setUser(prevUser => ({
					...prevUser,
					conversations: [
					  ...prevUser.conversations,
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
  
  export default AddChat