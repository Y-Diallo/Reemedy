import { onValue, ref } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../scripts/contexts";
import { Remedy, RemedyData, UserRemedyData } from "../../scripts/types";
import { db } from "../../scripts/firebase";
import RemedyItem from "./components/RemedyItem";

function SavedRemedies() {
  const [remedies, setRemedies] = useState<
    { remedy: Remedy; userRemedy: UserRemedyData }[]
  >([]);
  const { user } = useContext(userContext);
  const [selectedRemedy] = useState<RemedyData | null>(null);

  useEffect(() => {
    console.log("remedy is updated!" + selectedRemedy); // This will log null after selectedRemedy has been updated
  }, [selectedRemedy]);

  useEffect(() => {
    if (user !== null) {
      onValue(ref(db, `users/${user.uid}/onGoingRemedies/`), (snapshot) => {
        const remediesSaved: UserRemedyData[] = [];
        const remedies = snapshot.val();
        for (const key in remedies) {
          remediesSaved.push(remedies[key]);
        }
        //get full remedy detail
        onValue(ref(db, `remedies/`), (snapshot) => {
          const remedies: { remedy: Remedy; userRemedy: UserRemedyData }[] = [];
          const entries = snapshot.val();
          for (const key in entries) {
            const userDetail = remediesSaved.find((userRemedy) => {
              return userRemedy.remedyId === key;
            });
            if (userDetail) {
              remedies.push({ remedy: entries[key], userRemedy: userDetail });
            }
          }
          console.log(remedies);
          setRemedies(remedies);
        });
      });
    }
  }, [user]);
  return (
    <>
      <div className="w-screen h-screen">
        <h1 className="text-black text-3xl font-bold mt-0 ml-5 pt-10 mb-3">
          Saved Remedies
        </h1>
        {remedies.map((remedyData, index) => (
          <RemedyItem key={"item" + index} remedyData={remedyData.remedy} />
        ))}
      </div>
    </>
  );
}

export default SavedRemedies;
