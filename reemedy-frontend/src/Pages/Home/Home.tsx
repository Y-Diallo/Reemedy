import { SetStateAction, useState } from "react";
import SearchBar from "./components/SearchBar";
import TypeSelector from "./components/TypeSelector";
import IndianFlag from "../../assets/Flag_of_India.svg.png";

function Home() {
  const [search, setSearch] = useState("");
  function doSearch(input: string) {
    setSearch(input);
  }
  const [selectedCountry, setSelectedCountry] = useState<number | null>(null);
  const countries = [
    { id: 1, name: "American", image: IndianFlag },
    { id: 2, name: "Indian", image: IndianFlag },
    { id: 3, name: "South African", image: IndianFlag },
    { id: 2, name: "Mexican", image: IndianFlag },
    { id: 2, name: "Indonesian", image: IndianFlag },
  ];

  const handleCountrySelection = (countryId: number | null) => {
    setSelectedCountry(countryId);
  };
  return (
    <>
      <div className="w-screen h-screen text-black flex flex-col">
        <h1 className="text-3xl font-bold mt-0 ml-5">Hello, {"Amanda"}</h1>
        <SearchBar value={search} updateValue={doSearch} />

        <h2 className="text-1.5xl font-bold mt-10 ml-5">Types of Remedies</h2>
        <div className="flex mt-4 overflow-x-auto scrollbar-hide">
          {countries.map((country) => (
            <div key={country.id} className="flex flex-col items-center mr-4">
              <button
                onClick={() => handleCountrySelection(country.id)}
                className="focus:outline-none"
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <img
                  src={country.image}
                  alt={country.name}
                  className="w-40 h-40 object-cover"
                  style={{ borderRadius: "0%" }}
                />
              </button>
              <p className="mt-2 text-sm">{country.name}</p>
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
