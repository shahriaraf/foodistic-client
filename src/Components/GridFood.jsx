import { GiCutDiamond } from "react-icons/gi";

const img_1 =
  "jo-sonn-M-tzZD5z720-unsplash.jpg";
const img_2 =
  "chad-montano-eeqbbemH9-c-unsplash.jpg";
const img_3 =
  "eiliv-aceron-ZuIDLSz3XLg-unsplash.jpg";
const img_4 =
  "amirali-mirhashemian-sc5sTPMrVfk-unsplash.jpg";
const img_5 =
  "thought-catalog-9aOswReDKPo-unsplash.jpg";
const img_6 =
"colin-watts-bYkyS3U4Mqo-unsplash.jpg";

const collectionsData = [
  {
    gridClasses: "lg:col-start-1 lg:row-start-1",
    imageUrl: img_1,
  },
  {
    gridClasses: "lg:col-start-1 lg:row-start-2",
    imageUrl: img_2,
  },
  {

    gridClasses: "md:row-span-2 lg:col-start-2 lg:row-start-1 lg:row-span-2",
 
    imageUrl: img_3,
  },
  {
   
    gridClasses: "lg:col-start-3 lg:row-start-1",

    imageUrl: img_4,
  },
  {
  
    gridClasses: "lg:col-start-4 lg:row-start-1",
 
    imageUrl: img_5,
  },
  {
 
    gridClasses: "md:col-span-2 lg:col-start-3 lg:col-span-2 lg:row-start-2",

    imageUrl: img_6,
  },
];

const GridFood = () => {
  const cardBaseStyles =
    "relative bg-gray-200 bg-cover bg-center h-80 md:h-auto";


  return (
    <div className="p-4 mt-20 mb-5 black sm:p-6">
      <div className="text-center ">
        <h2 className="text-3xl tracking-widest text-gray-300 font-extralight text-ellipsis up md:text-4xl">
         Food Gallary
        </h2>
      </div>
      <div className="max-w-6xl pt-8 mx-auto lg:pt-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:gap-7 lg:h-[70vh] lg:min-h-[500px] lg:max-h-[700px]">
          {collectionsData.map((collection) => (
            <div
              key={collection.imggeUrl}
              className={`${cardBaseStyles} ${collection.gridClasses}`}
              style={{ backgroundImage: `url(${collection.imageUrl})` }}
            >
           
              
          
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridFood;