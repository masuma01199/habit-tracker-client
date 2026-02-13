import { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider"; 
import "swiper/css";

const Banner = () => {
  const { user } = useContext(AuthContext); 

  const slides = [
    { 
      title: "Build Habits that", 
      highlight: "Actually Stick.", 
      sub: "The smartest way to track your daily routines, grow your streaks, and unlock your potential with data-driven insights." 
    },
    { 
      title: "Create Powerful", 
      highlight: "Streaks.", 
      sub: "Consistency builds long-term success. Track every step of your journey and keep the fire burning." 
    },
  ];

  return (
    <div className="pt-16 pb-10 bg-white">
      <Swiper className="max-w-5xl mx-auto">
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className="text-center px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
              {slide.title} <br />
              <span className="text-indigo-600">{slide.highlight}</span>
            </h1>
            <p className="mt-6 text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              {slide.sub}
            </p>
            
            <div className="mt-10 flex justify-center gap-4">
              {/* Dynamic Link: If user exists, go to My Habits. If not, go to Register */}
              <Link 
                to={user ? "/my-habits" : "/register"} 
                className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all no-underline"
              >
                Start Tracking Now →
              </Link>
              
              <Link 
                to="/public-habits" 
                className="border border-gray-200 px-8 py-4 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all no-underline"
              >
                Explore Habits
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;