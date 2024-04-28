
type SearchBarProps={
  updateValue : (input:string)=>void;
  value : string;
}


function SearchBar({ updateValue, }: SearchBarProps) {
  return (
    <input type="textarea" onChange={(e)=>updateValue(e.target.value)} value={value}/>
  );
}

export default SearchBar;