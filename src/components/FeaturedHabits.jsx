import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const FeaturedHabits = () => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/habits/public`)
            .then(res => {
                setHabits(res.data.slice(0,3));
                setLoading(false);
            })
            .catch(()=> setLoading(false));
    }, []);

    if (loading) return <p>Loading habits...</p>;
return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {habits.map((habit) => (
        <div key={habit._id} className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
             {/* Icon placeholder based on category */}
             <span className="font-bold text-xl">{habit.title[0]}</span>
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">{habit.title}</h4>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-2">{habit.description}</p>
          <Link to={`/habits/${habit._id}`} className="block text-center bg-gray-50 text-gray-900 py-3 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition-all">
             View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FeaturedHabits;
