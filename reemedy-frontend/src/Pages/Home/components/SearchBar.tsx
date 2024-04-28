type SearchBarProps = {
  updateValue: (input: string) => void;
  value: string;
};

function SearchBar({ updateValue, }: SearchBarProps) {
  return (
    <>
      <div className="w-full ml-5 mt-5 pr-10">

        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            onChange={(e) => updateValue(e.target.value)}
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
            placeholder="Face mask, cold..."
            required
          />
          <button
            className="text-white absolute end-2.5 bottom-2.5 bg-green-600 hover:bg-green-800 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
