import { useState } from "react";
import SearchBar from "./components/SearchBar";
import TypeSelector from "./components/TypeSelector";
import { doChatMessage, makeRecommendation } from '../../scripts/firebase';

function Home() {
  const [search, setSearch] = useState("");
  function doSearch(input : string){
    setSearch(input)
  }
  return (
    <>
      <button onClick={()=>makeRecommendation()}>recommend</button>
      <button onClick={()=>doChatMessage({message:"new message"})}>message</button>
      <h1 className="text-3xl font-bold underline">Hello {"name"}</h1>
      <SearchBar value={search} updateValue={doSearch}/>
      <h2>Types of Remedies</h2>
      <TypeSelector/>
      <h2>Recommendations</h2>
      {/**map the RemedyDisplays */}
    </>
  );
}

export default Home;
