import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


import trekImage from '../../assets/trek.webp';
import boulderImage from '../../assets/boulder.png';
import peakImage from '../../assets/peak.webp';
import riccardoImage from '../../assets/pexels-riccardo-303040.webp';
const Activities = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const activities = [
    {
      title: "Trekking",
      image: trekImage,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores veritatis dicta quis neque praesentium aut autem ducimus temporibus. Adipisci, fuga obcaecati! Aspernatur, dolores eaque dolorem delectus quasi architecto repellendus ratione.",
      path: "/Reusable",
    },
    {
      title: "Bouldering",
      image: boulderImage,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores veritatis dicta quis neque praesentium aut autem ducimus temporibus. Adipisci, fuga obcaecati! Aspernatur, dolores eaque dolorem delectus quasi architecto repellendus ratione.",
      path: "/bouldering",
    },
    {
      title: "Peak Climbing",
      image: peakImage,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores veritatis dicta quis neque praesentium aut autem ducimus temporibus. Adipisci, fuga obcaecati! Aspernatur, dolores eaque dolorem delectus quasi architecto repellendus ratione.",
      path: "/Reusable",
    },
  ];

  const handleCarouselTransition = (direction) => {
    const newIndex = (activeIndex + direction + activities.length) % activities.length;
    setActiveIndex(newIndex);
  };

  return (
    <div className="bg-[url('./res/mountains.webp')] bg-cover bg-center">
      
      <div className="pb-12 bg-[linear-gradient(0deg,_rgba(255,255,255,1)_0%,_rgba(255,255,255,0.3)_50%,_rgba(255,255,255,1)_100%)]">
        <section
          data-visible="false"
          id="introduction"
          className="fade-in duration-[2s] ease-in-out mt-12 pt-12 px-6 max-w-screen-lg mx-auto w-full space-y-2 text-justify text-xl"
        >
          <p>
            <span className="text-xl font-bold text-red-600 text-brand">Lorem</span>
            ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, atque sequi debitis quisquam asperiores rem placeat, illum ipsum doloribus earum excepturi similique blanditiis quod consequatur molestiae iure possimus quam provident.
          </p>
          <p>Hisi Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, excepturi labore cum voluptatem sit odio sint soluta dolorum quaerat nobis. Corrupti ea reprehenderit voluptate impedit totam enim nobis volutpates repellendus?</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit repudiandae mollitia reprehenderit magnam dignissimos illum delectus beatae aliquid in accusamus? Vel omnis aspernatur ut similique quidem saepe natus obcaecati impedit?</p>
        </section>

      

        <section data-visible="false" id="activities" className="fade-in duration-[2s] ease-in-out mt-12 pt-12 px-6 max-w-screen-lg mx-auto">
          <h2 className="text-5xl font-bold mb-4 uppercase font-oswald w-fit">
            <span className="text-brand">Choose</span> your activity
            <hr className="border-0 w-full h-1 bg-brand mt-2" />
          </h2>

          {/* Carousel Section */}
          <div className="w-full h-[60vh] relative">
            <div id="act_carousel" className="shadow-lg">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  data-active={activeIndex === index ? "true" : "false"}
                  className={`transition-opacity duration-300 absolute w-full h-full rounded bg-cover bg-center flex items-end ${
                    activeIndex === index ? "opacity-100" : "opacity-0 hidden"
                  }`}
                  style={{ backgroundImage: `url(${activity.image})` }}
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

            {/* Carousel Navigation */}
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
