import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useHabits, useAuth } from '../App';
import { Flame, Calendar, Clock, ArrowLeft, CheckCircle2, Award, ChevronRight } from 'lucide-react';

const HabitDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { habits, markComplete } = useHabits();
  const { auth } = useAuth();

  // Find the specific habit by ID
  const habit = habits.find(h => h.id === id);

  // Memoized stats for performance
  const stats = useMemo(() => {
    if (!habit) return { progress: 0, completions30Days: 0 };
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const completions = habit.completionHistory.filter(dateStr => {
      const d = new Date(dateStr);
      return d >= thirtyDaysAgo;
    });

    return {
      progress: Math.round((completions.length / 30) * 100),
      completions30Days: completions.length
    };
  }, [habit]);

  // Error state: Habit not found
  if (!habit) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Habit not found</h2>
        <Link to="/public-habits" className="text-indigo-600 font-bold hover:underline flex items-center gap-2">
          <ArrowLeft size={18} /> Back to Browse
        </Link>
      </div>
    );
  }

  const isOwner = auth.user?.email === habit.creatorEmail;
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.completionHistory.includes(today);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Navigation */}
      <Link 
        to={isOwner ? "/my-habits" : "/public-habits"} 
        className="inline-flex items-center gap-2 text-slate-500 font-medium mb-8 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft size={20} /> Back to list
      </Link>

      <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
        {/* Hero / Header Image Section */}
        <div className="relative h-64 bg-slate-100">
          {habit.imageUrl ? (
            <img src={habit.imageUrl} className="w-full h-full object-cover" alt={habit.title} />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <CheckCircle2 size={80} className="text-white/30" />
            </div>
          )}
          
          <div className="absolute top-6 left-6">
            <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-indigo-600 rounded-2xl text-xs font-bold uppercase tracking-widest shadow-lg border border-white/20">
              {habit.category}
            </span>
          </div>

          {habit.streak > 0 && (
            <div className="absolute -bottom-10 right-10 flex items-center gap-3 px-6 py-4 bg-orange-500 text-white rounded-3xl shadow-xl shadow-orange-200 border-4 border-white animate-bounce">
              <Flame size={24} fill="white" />
              <div>
                <p className="text-[10px] font-bold opacity-80 leading-none">CURRENT STREAK</p>
                <p className="text-xl font-black">{habit.streak} DAYS</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-8 md:p-12 pt-16">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
            <div>
              <h1 className="text-4xl font-black text-slate-900 mb-4">{habit.title}</h1>
              <p className="text-slate-500 text-lg leading-relaxed">{habit.description}</p>
            </div>

            {/* Completion Button Logic */}
            {!isCompletedToday ? (
              <button
                onClick={() => markComplete(habit.id)}
                className="flex-shrink-0 bg-indigo-600 text-white px-10 py-5 rounded-3xl font-black text-lg hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-100 transform active:scale-95"
              >
                Mark Complete Today
              </button>
            ) : (
              <div className="flex-shrink-0 bg-emerald-100 text-emerald-700 px-10 py-5 rounded-3xl font-black text-lg flex items-center gap-3 border-2 border-emerald-200">
                <CheckCircle2 size={24} /> Done For Today!
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* 30-Day Consistency Card */}
            <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                  <Award size={20} />
                </div>
                <h4 className="font-bold text-slate-900">30-Day Progress</h4>
              </div>
              <div className="relative pt-2">
                <div className="flex mb-2 items-center justify-between">
                  <span className="text-sm font-bold text-indigo-600">{stats.progress}% Consistency</span>
                  <span className="text-sm font-bold text-slate-400">{stats.completions30Days}/30 Days</span>
                </div>
                <div className="overflow-hidden h-3 text-xs flex rounded-full bg-slate-200">
                  <div 
                    style={{ width: `${stats.progress}%` }} 
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-1000"
                  ></div>
                </div>
              </div>
            </div>

            {/* Reminder Time Card */}
            <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                  <Clock size={20} />
                </div>
                <h4 className="font-bold text-slate-900">Daily Reminder</h4>
              </div>
              <p className="text-3xl font-black text-slate-800">{habit.reminderTime}</p>
              <p className="text-sm text-slate-400 mt-1">Notification Scheduled</p>
            </div>

            {/* Creation Date Card */}
            <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600">
                  <Calendar size={20} />
                </div>
                <h4 className="font-bold text-slate-900">Started On</h4>
              </div>
              <p className="text-xl font-bold text-slate-800">
                {new Date(habit.createdAt).toLocaleDateString(undefined, { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </p>
              <p className="text-sm text-slate-400 mt-1">Member routine</p>
            </div>
          </div>

          {/* Creator Profile Footer */}
          <div className="border-t border-slate-100 pt-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img 
                src={habit.creatorPhoto || `https://ui-avatars.com/api/?name=${habit.creatorName}`} 
                className="w-14 h-14 rounded-full border-2 border-indigo-100" 
                alt={habit.creatorName} 
              />
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">CREATOR</p>
                <p className="text-lg font-bold text-slate-900">{habit.creatorName}</p>
                <p className="text-sm text-indigo-500 font-medium">{habit.creatorEmail}</p>
              </div>
            </div>
            
            {!isOwner && (
              <button className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-colors shadow-xl">
                Adopt This Habit <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitDetails;