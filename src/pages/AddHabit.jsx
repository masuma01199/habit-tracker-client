import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const AddHabit = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [isPublic, setIsPublic] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();

    const habit = {
      title,
      category,
      isPublic,
      email: user.email,
      createdAt: new Date(),
      completionHistory: []
    };

    axios
      .post("http://localhost:5000/habits", habit)
      .then(() => {
        toast.success("Habit created");
        setTitle("");
        setCategory("");
         setIsPublic(false);
      })
      .catch(() => toast.error("Failed to create habit"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Habit title"
        required
      />

      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        required
      />

      <div>
        <label className="block text-sm font-medium mb-1">
          Visibility
        </label>

        <select
          value={isPublic}
          onChange={e => setIsPublic(e.target.value === "true")}
          className="w-full border rounded px-3 py-2"
        >
          <option value="false">Private</option>
          <option value="true">Public</option>
        </select>
      </div>

      <button type="submit">Add Habit</button>
    </form>
  );
};

export default AddHabit;
