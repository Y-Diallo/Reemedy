import { useContext, useEffect, useState } from "react";
import { userContext } from "../../scripts/contexts";
import { onValue, ref } from "firebase/database";
import { db } from "../../scripts/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function Profile() {
  const {user} = useContext(userContext);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    console.log("On profile page")
    console.log(user?.uid)
    if(user !== null){
      console.log(user.uid)
      onValue(ref(db, `users/${user.uid}/`), (snapshot) => {
        console.log("inside onValue")
        const data = snapshot.val();
        setUserData(data);
      });
    }
  }, [user?.uid]);


  return (
    <>
<div className="flex w-screen h-screen justify-center items-center">
  <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-50 dark:text-gray-800">
    <img
      src={userData?.profilePicture}
      alt="Profile Pic"
      className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square"
    />
    <div className="space-y-4 text-center divide-y dark:divide-gray-300">
      <div className="my-2 space-y-1">
        <h2 className="text-xl font-semibold sm:text-2xl">{userData?.name}</h2>
        <p className="px-5 text-xs sm:text-base dark:text-gray-600">
          {userData?.description}
        </p>
      </div>
      <div className="my-2">
        {/* Subscription message */}
        <p className="text-xs sm:text-base text-gray-500 mt-3">
          Subscription: {userData?.subscriptionTier}
        </p>
        <p className="text-xs sm:text-base text-gray-500 mt-3">
          Verified  <FontAwesomeIcon icon={faCheck} />
        </p>
      </div>
    </div>
  </div>
</div>


    </>
  );
}

export default Profile;