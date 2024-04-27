import { useState } from "react";
import SearchBar from "./components/SearchBar";
import TypeSelector from "./components/TypeSelector";

function Home() {
  const [search, setSearch] = useState("");
  function doSearch(input : string){
    setSearch(input)
  }
  return (
    <>
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
