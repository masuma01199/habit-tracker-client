import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useHabits } from '../App';
import { Brain, Zap, Shield, Heart, ArrowRight, Star, Clock, Target } from 'lucide-react';

const slides = [
  {
    title: "Track Your Progress",
    description: "Visualizing your habits makes consistency effortless.",
    image: "https://picsum.photos/seed/track/1200/600",
    color: "bg-indigo-600"
  },
  {
    title: "Build Lasting Streaks",
    description: "Watch your chains grow and feel the power of routine.",
    image: "https://picsum.photos/seed/streak/1200/600",
    color: "bg-violet-600"
  },
  {
    title: "Join the Community",
    description: "Share habits and inspire others on their journey.",
    image: "https://picsum.photos/seed/community/1200/600",
    color: "bg-fuchsia-600"
  }
];

const Home = () => {
  const { habits } = useHabits();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Filter and sort habits for the featured section
  const featuredHabits = [...habits]
    .filter(h => h.isPublic)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  // Auto-play for the hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(s => (s + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      
      {/* Hero Slider */}
      <section className="relative h-[500px] w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img 
              src={slides[currentSlide].image} 
              className="w-full h-full object-cover" 
              alt="Hero Slide" 
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center text-center text-white px-4">
              <div className="max-w-3xl">
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-4xl md:text-6xl font-bold mb-6"
                >
                  {slides[currentSlide].title}
                </motion.h1>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl mb-8 opacity-90"
                >
                  {slides[currentSlide].description}
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link 
                    to="/register" 
                    className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-slate-100 transition-colors shadow-lg"
                  >
                    Get Started Free
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Pagination Dots */}
        <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-all ${currentSlide === i ? 'bg-white w-8' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </section>

      {/* Featured Habits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Habits</h2>
            <p className="text-slate-500">Discover popular routines from our community members.</p>
          </div>
          <Link to="/public-habits" className="text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1 transition-colors">
            View All <ArrowRight size={18} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredHabits.map((habit, idx) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={habit.creatorPhoto} 
                  className="w-10 h-10 rounded-full border border-slate-100" 
                  alt={habit.creatorName} 
                />
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">{habit.creatorName}</h4>
                  <p className="text-slate-400 text-xs">{new Date(habit.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{habit.title}</h3>
              <p className="text-slate-500 text-sm mb-6 line-clamp-2">{habit.description}</p>
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold">
                  {habit.category}
                </span>
                <Link to={`/habit/${habit.id}`} className="text-indigo-600 font-medium text-sm hover:underline">
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Psychology/Benefits Section */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Why Build Habits?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Small actions repeated daily lead to massive transformations over time. Scientific research shows the benefits of consistent routines.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <Brain className="text-blue-400" />, title: "Better Focus", desc: "Reduce decision fatigue and mental clutter." },
              { icon: <Zap className="text-yellow-400" />, title: "Boost Energy", desc: "Healthy routines fuel your physical vitality." },
              { icon: <Shield className="text-green-400" />, title: "Reduced Stress", desc: "Predictability creates mental safety." },
              { icon: <Target className="text-red-400" />, title: "Goal Mastery", desc: "Small steps compound into major achievements." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 text-center"
              >
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Milestones */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join 50,000+ Habit Seekers</h2>
            <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
              Our community has collectively tracked over 1 million habits this year. Connect with others, join challenges, and stay accountable.
            </p>
            <div className="flex flex-wrap gap-8">
              <div>
                <p className="text-3xl font-bold">1M+</p>
                <p className="text-indigo-200 text-sm">Habits Tracked</p>
              </div>
              <div>
                <p className="text-3xl font-bold">98%</p>
                <p className="text-indigo-200 text-sm">Satisfaction</p>
              </div>
              <div>
                <p className="text-3xl font-bold">150+</p>
                <p className="text-indigo-200 text-sm">Countries</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
              <Star className="text-yellow-300 mb-4" />
              <p className="text-sm font-medium">"This app changed my morning routine forever!"</p>
            </div>
            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm mt-8">
              <Clock className="text-blue-300 mb-4" />
              <p className="text-sm font-medium">"Save hours of wasted time by structuring your day."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Features List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Powerful Features for Productivity</h2>
          <p className="text-slate-500">Everything you need to master your time and habits.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: <Zap className="text-indigo-600" />, title: "Smart Reminders", desc: "Never miss a habit with custom notifications tailored to your schedule." },
            { icon: <Target className="text-indigo-600" />, title: "Advanced Analytics", desc: "Detailed charts and heatmaps to visualize your consistency and progress." },
            { icon: <Heart className="text-indigo-600" />, title: "Health Integration", desc: "Connect with your favorite health apps to automate physical habit tracking." },
          ].map((feat, idx) => (
            <div key={idx} className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
                {feat.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feat.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;