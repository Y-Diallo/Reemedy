import { Remedy, UserRemedyData } from "../scripts/types";

type RemedyDisplayProps={
  remedy : Remedy;
  userRemedy : UserRemedyData;
}
// remedy cards, used in Home and Saved Page
function RemedyDisplay({remedy, userRemedy}:RemedyDisplayProps) {
  return (
    <div>
      <span>Name: {remedy.name}</span>
      <span>Rating: {userRemedy.rating}</span>
    </div>
  );
}

export default RemedyDisplay;