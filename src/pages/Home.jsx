import { motion } from "framer-motion";
import Banner from "../components/Banner";
import FeaturedHabits from "../components/FeaturedHabits";

const Home = () => {
  return (
    <div className="bg-white min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Banner />
      </motion.div>

      {/* Featured Habits Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Habits</h2>
            <p className="text-gray-500 mt-2">Jumpstart your journey with these community-favorite rituals.</p>
          </div>
          <button className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
            See All <span>→</span>
          </button>
        </div>
        <FeaturedHabits />
      </section>

      {/* Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="bg-[#0f172a] rounded-[2.5rem] p-12 flex flex-wrap justify-around gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-white mb-1">1.2M+</p>
            <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest">Completed Actions</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-white mb-1">45k+</p>
            <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest">Active Seekers</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-white mb-1">98%</p>
            <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest">Success Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;