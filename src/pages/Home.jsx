import { motion } from "framer-motion";
import Banner from "../components/Banner";
import FeaturedHabits from "../components/FeaturedHabits";

const Home = () => {
  return (
    <div>
      {/* Banner Animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Banner />
      </motion.div>

      {/* Featured Habits Animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <FeaturedHabits />
      </motion.div>
    </div>
  );
};

export default Home;
