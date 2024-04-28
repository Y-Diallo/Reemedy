import { useNavigate } from "react-router-dom";
import blobImage from '../assets/Blob_Shape.png';
function Disclaimer() {
  const navigate = useNavigate();
  const handlePageClick = () =>{
    navigate('/home')
  }
  return (
    <>
      <div className='relative h-screen w-screen overflow-hidden' onClick={handlePageClick}> 
      <img
        src={blobImage}
        alt="Blob"
        className="absolute top-0 left-0 object-cover transform scale-150 -top-20 -left-0"
      />
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center z-20">

        <h1 className="text-black text-3xl font-bold mb-4">Disclaimer</h1>
        <h2 className="text-black text-lg mb-2">
        This app is not a substitute for professional medical or health advice, examination, diagnosis, or treatment. This app disclaims any liability for the decisions you make from this information.
        </h2>
      </div>
      <img
        src={blobImage}
        alt="Blob"
        className="absolute -bottom-60 -right-40 object-cover transform scale-150 mb-0 z-10 mr-0 mb-0"
      />
    </div>
    </>
  );
}

export default Disclaimer;