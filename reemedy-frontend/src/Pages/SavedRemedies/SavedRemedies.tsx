import { onValue, ref } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../scripts/contexts";
import { Remedy, UserRemedyData } from "../../scripts/types";
import { db } from "../../scripts/firebase";
import RemedyDisplay from "../../SharedComponents/RemedyDisplay";

function SavedRemedies() {
    const [remedies, setRemedies] = useState<{remedy:Remedy,userRemedy:UserRemedyData}[]>([])
    const {user} = useContext(userContext);
    useEffect(()=>{
      if (user !== null) {
        onValue(ref(db, `users/${user.uid}/onGoingRemedies/`), (snapshot) => {
          const remediesSaved: UserRemedyData[] = [];
          const remedies = snapshot.val();
          for (const key in remedies) {
            remediesSaved.push(remedies[key]);
          }
          //get full remedy detail
          onValue(ref(db, `remedies/`), (snapshot) => {
              const remedies: {remedy:Remedy,userRemedy:UserRemedyData}[] = [];
              const entries = snapshot.val();
              for (const key in entries) {
                const userDetail = remediesSaved.find((userRemedy)=>{
                  return userRemedy.remedyId === key
                });
                  if(userDetail){
                      remedies.push({remedy:entries[key],userRemedy:userDetail});
                      console.log({remedy:entries[key],userRemedy:userDetail});
                  }
              }
              console.log(remedies);
              setRemedies(remedies);
          });
        });  
      }
    }, [user])
  return (
    <>
      <div className="text-black ml-5">
      <h1 className="text-3xl font-bold mt-10">Saved Remedies</h1>
      {remedies.map((remedy,index)=>{
        return <RemedyDisplay remedy={remedy.remedy} userRemedy={remedy.userRemedy} key={"saved"+index}/>
      })}
      </div>
    </>
  );
}

export default SavedRemedies;