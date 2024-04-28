import { onValue, ref } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../scripts/contexts";
import { Remedy, UserRemedyData } from "../../scripts/types";
import { useNavigate } from 'react-router-dom';
import { db } from "../../scripts/firebase";
interface RemedyData {
  remedy: Remedy;
  userRemedy: UserRemedyData;
}


function SavedRemedies() {
    const [remedies, setRemedies] = useState<{remedy:Remedy,userRemedy:UserRemedyData}[]>([])
    const {user} = useContext(userContext);
    const [selectedRemedy, ] = useState<RemedyData | null>(null);
    const navigate = useNavigate();
    const {setRemedy} = useContext(userContext);

    // Send data to /remedy route 
    const sendData = (remedy: RemedyData) => {
      console.log("sending remedy: ", remedy)
        setRemedy(remedy.remedy)
        navigate("/remedy");
    };
  useEffect(() => {
    console.log("remedy is updated!" + selectedRemedy); // This will log null after selectedRemedy has been updated
  }, [selectedRemedy]);
  
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
       <h1 className="text-black text-3xl font-bold mt-0 ml-5 mt-10 mb-3">Saved Remedies</h1>
       <div className="w-screen h-screen mx-3 my-3">
  {remedies.map((remedyData, index) => (
    <div key={index} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow text-black" onClick={() => sendData(remedyData)}>
      <a href="#" className="block bg-cover bg-center h-40" style={{ backgroundImage: `url(${remedyData.remedy.image})` }}>
        {/* Empty anchor element to ensure the image is clickable */}
      </a>
      <div className="px-5 py-3">
        <a href="#" className="mt-2">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">
            {remedyData.remedy.name}
          </h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {Array.from({ length: remedyData.remedy.averageRating }).map((_, index) => (
              <svg
                key={index}
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
              {remedyData.remedy.averageRating}
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-700">{remedyData.remedy.description}</p>
      </div>

      
    </div>
  ))}
</div>

      </>
    );
    
}

export default SavedRemedies;