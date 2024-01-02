import { loggedUser } from "@/app/chat/userData";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useContext } from "react";
import { userContext } from "@/app/chat/userContext";

function AddChat() {
    const {userData, setUserData} = useContext(userContext);
	
		const handleAddUserClick = () => {
			const newUserName = prompt('Enter the name of the new user:');
			if (newUserName) {
				const userExists = userData.conversations.some(
					conversation => conversation.user === newUserName
				);
				if(!userExists)
				{
					userData.conversations.push({user: newUserName, data: []})
				// 	setUser(prevUser => ({
				// 		...prevUser,
				// 		conversations: [
				// 		...prevUser.conversations,
				// 		{ user: newUserName, data: [] },
				// 		],
				// 	}));
					setUserData({...userData})
				// }
				//show an alert or open the chat if it exists
				// else
				// 	alert('already exist')
			}
		  };
	}
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
  
  export default AddChat