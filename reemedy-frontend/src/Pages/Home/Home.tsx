import { SetStateAction, useState } from "react";
import SearchBar from "./components/SearchBar";
import TypeSelector from "./components/TypeSelector";
import IndianFlag from "../../assets/Flag_of_India.svg.png";
import AmericanFlag from "../../assets/Flag_of_the_United_States_(DoS_ECA_Color_Standard).svg.png";
import SouthAfricanFlag from "../../assets/Flag_of_South_Africa.svg.png";
import MexicanFlag from "../../assets/Flag_of_Mexico.svg.png";
import IndonesianFlag from "../../assets/Flag_of_Indonesia.svg.png";
import JapaneseFlag from "../../assets/Flag_of_Japan.svg.png";

function Home() {
  const [search, setSearch] = useState("");
  function doSearch(input: string) {
    setSearch(input);
  }
  const [selectedCountry, setSelectedCountry] = useState<number | null>(null);
  const countries = [
    { id: 1, name: "American", image: AmericanFlag },
    { id: 2, name: "Indian", image: IndianFlag },
    { id: 3, name: "South African", image: SouthAfricanFlag },
    { id: 4, name: "Mexican", image: MexicanFlag },
    { id: 5, name: "Indonesian", image: IndonesianFlag },
    { id: 6, name: "Japanese", image: JapaneseFlag },
  ];

  const handleCountrySelection = (countryId: number | null) => {
    setSelectedCountry(countryId);
  };
  return (
    <>
      <div className="w-screen h-screen text-black flex flex-col">
        <h1 className="text-3xl font-bold mt-0 ml-5 mt-10">
          Hello, {"Amanda"}
        </h1>
        <SearchBar value={search} updateValue={doSearch} />

        <h2 className="text-1.5xl font-bold mt-10 ml-5">Types of Remedies</h2>

        <div className="flex mt-5 pb-5 hide-scroll-bar overflow-x-auto ml-3">
          {countries.map((country) => (
            <div key={country.id} className="inline-block px-2 text-center">
              <div className="max-w-xs">
                <div className="w-28 h-28 overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  <img
                    src={country.image}
                    alt={country.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-2 text-sm">{country.name}</p>
              </div>
            </div>
          ))}
        </div>

        <TypeSelector />
        <h2 className="text-1.5xl font-bold mt-10 ml-5">Recommendations</h2>
      </div>
      {/**map the RemedyDisplays */}
    </>
  );
}

export default Home;
