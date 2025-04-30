  import React, { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { fetchCategories } from "../api/Category"; 

  import boulderImage from "../../assets/boulder.png";
  import riccardoImage from "../../assets/pexels-riccardo-303040.webp";

  const BASE_URL = 'http://localhost:8000'; 


  const Activities = () => {
    const [categories, setCategories] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
      const getCategories = async () => {
        try {
          const data = await fetchCategories();

          const formattedData = data.map((category) => ({
            ...category,
            image: category.image ? `${BASE_URL}/uploads/${category.image}` : "https://source.unsplash.com/800x600/?nature",
          }));

          setCategories(formattedData);
        } catch (err) {
          console.error("Failed to fetch categories:", err);
        }
      };

      getCategories();
    }, []);

    const dynamicActivities = [];

    categories.forEach((category) => {
      dynamicActivities.push({
        title: category.name,
        description: category.description,
        image: category.image,
        path: `/places?category=${category.name}`,
      });
    });


    const handleCarouselTransition = (direction) => {
      const newIndex = (activeIndex + direction + dynamicActivities.length) % dynamicActivities.length;
      setActiveIndex(newIndex);
    };

    useEffect(() => {
      const intervalId = setInterval(() => {
        handleCarouselTransition(1); 
      }, 5000); 

      return () => clearInterval(intervalId);
    }, [activeIndex]);

    return (
      <div className="bg-[url('./res/mountains.webp')] bg-cover bg-center">
        <div className="pb-12 bg-[linear-gradient(0deg,_rgba(255,255,255,1)_0%,_rgba(255,255,255,0.3)_50%,_rgba(255,255,255,1)_100%)]">
          <section className="mt-12 pt-12 px-6 max-w-screen-lg mx-auto space-y-4 text-xl text-justify">
            <p>
              <span className="font-bold text-red-600">Lorem</span> ipsum dolor sit amet consectetur adipisicing elit. Autem alias fugiat velit harum quia corporis nemo, animi tempora quae itaque dolore sunt,
              temporibus consequatur quod. Necessitatibus id reiciendis non molestias.
            </p>
          </section>

          {/* Activities Carousel */}
          <section className="mt-12 pt-12 px-6 max-w-screen-lg mx-auto">
            <h2 className="text-5xl font-bold mb-4 uppercase font-oswald w-fit">
              <span className="text-brand">Choose</span> your activity
              <hr className="border-0 w-full h-1 bg-brand mt-2" />
            </h2>

            <div className="w-full h-[60vh] relative">
              <div className="shadow-lg">
                {dynamicActivities.map((activity, index) => (
                  <div
                  key={index}
                  className={`transition-opacity duration-500 absolute w-full h-full rounded bg-cover bg-center flex items-end ${
                    activeIndex === index ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                  }`}
                  style={{ backgroundImage: `url(${activity.image})` }} // Use url() and remove redundant BASE_URL
                >     
                    <div className="px-4 pb-8 pt-16 w-full bg-gradient-to-t from-[rgba(255,255,255,0.7)] to-transparent">
                      <h3
                        className="text-3xl text-brand font-bold cursor-pointer hover:underline"
                        onClick={() => navigate(activity.path)}
                      >
                        {activity.title}
                      </h3>
                      <hr className="border-0 bg-brand w-full h-0.5 mt-0.5" />
                      <p className="mt-2 max-w-screen-md">{activity.description}</p>
                      <a
                        onClick={() => navigate(activity.path)}
                        className="text-sm hover:text-brand transition-colors"
                      >
                        Learn more...
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-4xl absolute top-1/2 left-0 right-0 flex justify-between px-4">
                <button
                  className="text-white bg-gray-800 hover:bg-gray-600 p-2 rounded-full"
                  onClick={() => handleCarouselTransition(-1)}
                >
                  &laquo;
                </button>
                <button
                  className="text-white bg-gray-800 hover:bg-gray-600 p-2 rounded-full"
                  onClick={() => handleCarouselTransition(1)}
                >
                  &raquo;
                </button>
              </div>
            </div>
          </section>
        </div>

        <img src={riccardoImage} className="w-full" alt="Scenic view" />
      </div>
    );
  };

  export default Activities;
