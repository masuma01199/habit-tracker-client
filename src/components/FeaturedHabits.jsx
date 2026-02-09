import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const FeaturedHabits = () => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:5000/habits/featured")
            .then(res => {
                setHabits(res.data);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading habits...</p>;

    return (
        <div>
            <h2>Featured Habits</h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" }}>
                {habits.map(habit => (
                    <div key={habit._id} style={{ border: "1px solid #ccc", padding: "10px" }}>
                        <h4>{habit.title}</h4>
                        <p>{habit.description}</p>
                        <p>Category: {habit.category}</p>
                        <Link to={`/habits/${habit._id}`}>
                            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                                View Details
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedHabits;
