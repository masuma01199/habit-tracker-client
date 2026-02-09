import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateHabit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [visibility, setVisibility] = useState("public");

  useEffect(() => {
    axios.get(`http://localhost:5000/habits/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setCategory(res.data.category);
        setVisibility(res.data.visibility);
      })
      .catch(() => toast.error("Failed to load habit"));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .patch(`http://localhost:5000/habits/${id}`, {
        title,
        category,
        visibility,
      })
      .then(() => {
        toast.success("Habit updated");
        navigate("/my-habits");
      })
      .catch(() => toast.error("Update failed"));
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Update Habit</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <select
        value={visibility}
        onChange={(e) => setVisibility(e.target.value)}
      >
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default UpdateHabit;