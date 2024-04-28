import React, { useContext } from "react";
import { userContext } from "../../scripts/contexts";
import { useNavigate } from "react-router-dom";

function RemedyPopup() {
  const {remedy} = useContext(userContext);
  const navigate = useNavigate();
  return (
    remedy ? (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75 text-black overflow-y-auto"> 
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mt-5 sm:mt-0  overflow-y-auto h-4/5 w-4/5">
        <button className="absolute top-2 right-2" onClick={()=>{navigate("/saved")}}>
          <svg
            className="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className= "w-full h-20" style={{ backgroundImage: `url(${remedy.image})`, backgroundSize: 'cover' }}>
        </div>

        <div className="mb-4 mt-5">
          <h3 className="text-lg font-semibold">Ingredients:</h3>
          <ul className="list-disc pl-5">
            {remedy.ingredients && remedy.ingredients.map((ingredient:string, index:number) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Recipe:</h3>
          {remedy.usageMethod && remedy.usageMethod.map((usage:string, index:number) => (
              <li key={index}>{usage}</li>
            ))}
        </div>
        <div>
          <h3 className="text-lg font-semibold">Benefits:</h3>
          <ul className="list-disc pl-5">
            {remedy.benefits && remedy.benefits.map((benefit:string, index:number) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center items-center">
        <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"/>
        </div>
        <h2 className="flex justify-center items-center mb-5">Rating</h2>
        <div className="flex justify-center  items-center space-x-1 rtl:space-x-reverse">
            {Array.from({ length: remedy.averageRating }).map((_, index) => (
              <svg
                key={index}
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
              {remedy.averageRating}
            </span>
          </div>
          <div>
          
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 text-black">Comments </h5>
        <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
            View all
        </a>
   </div>
   <div className="flow-root text-black">
        <ul role="list" className="divide-y divide-gray-600">
            <li className="py-3 sm:py-4">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <img className="w-10 h-9 rounded-full" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Neil image"/>
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            Nelly Sims
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            I tried it and it worked in just a few days!
                        </p>
                    </div>
                </div>
            </li>
            <li className="py-3 sm:py-4">
                <div className="flex items-center ">
                    <div className="flex-shrink-0">
                        <img className="w-10 h-9 rounded-full" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Bonnie image"/>
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            Adam Green
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            A real game changer!
                        </p>
                    </div>

                </div>
            </li>
            <li className="py-3 sm:py-4">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Michael image"/>
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            Lisa Gough
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            Just amazing!
                        </p>
                    </div>
                </div>
            </li>
            <li className="py-3 sm:py-4">
                <div className="flex items-center ">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Lana image"/>
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate ">
                            Liam Byrd
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            Why don't the doctors talk about this?
                        </p>
                    </div>
                </div>
            </li>
            <li className="pt-3 pb-0 sm:pt-4">
                <div className="flex items-center ">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Thomas image"/>
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            Lia Lean
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            It was not a bad solution.
                        </p>
                    </div>
                </div>
            </li>
        </ul>
   </div>
          </div>
      </div>
    </div>
          ) : <h1 className="text-black">No remedy found.</h1>
  );
}

export default RemedyPopup;
