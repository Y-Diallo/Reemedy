import blobImage from '../../assets/Blob_Shape.png'
import LandingImage from '../../assets/Landing_Img.png'
function Landing() {
  return (
    <>
      <div className='relative h-screen w-screen overflow-hidden'>
      <img
        src={blobImage}
        alt="Blob"
        className="absolute top-0 left-0 object-cover transform scale-150 -top-20 -left-0"
      />
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center z-20">
      <img
        src={LandingImage}
        alt="Blob"
        className=""
      />

        <h1 className="text-black text-4xl font-bold mb-4">Reemedy</h1>
        <h2 className="text-black text-lg mb-2">
          Your home, your health
          <br />
          your <span className="font-bold">Remedy</span>
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

export default Landing;