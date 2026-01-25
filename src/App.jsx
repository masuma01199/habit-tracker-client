import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

// Assuming these are your local imports
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddHabit from './pages/AddHabit.jsx';
import MyHabits from './pages/MyHabits';
import PublicHabits from './pages/PublicHabits';
import HabitDetails from './pages/HabitDetails';
import NotFound from './pages/NotFound';
import { initialHabits } from './services/mockData';

// --- Contexts ---

const AuthContext = createContext({
  auth: { user: null, loading: true },
  login: (user) => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

const HabitContext = createContext({
  habits: [],
  addHabit: (habit) => {},
  updateHabit: (id, updates) => {},
  deleteHabit: (id) => {},
  markComplete: (id) => {},
});

export const useHabits = () => useContext(HabitContext);

// --- Protected Route Component ---

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  
  if (auth.loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  if (!auth.user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// --- Main App Component ---

const App = () => {
  const [auth, setAuth] = useState({ user: null, loading: true });
  const [habits, setHabits] = useState([]);

  // Initialization: Load from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('habit_user');
    const savedHabits = localStorage.getItem('habit_data');
    
    if (savedUser) {
      setAuth({ user: JSON.parse(savedUser), loading: false });
    } else {
      setAuth({ user: null, loading: false });
    }

    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    } else {
      setHabits(initialHabits);
    }
  }, []);

  // Sync habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('habit_data', JSON.stringify(habits));
  }, [habits]);

  // Auth Actions
  const login = (user) => {
    setAuth({ user, loading: false });
    localStorage.setItem('habit_user', JSON.stringify(user));
  };

  const logout = () => {
    setAuth({ user: null, loading: false });
    localStorage.removeItem('habit_user');
    toast.success('Logged out successfully');
  };

  // Habit Actions
  const addHabit = (habit) => {
    setHabits((prev) => [habit, ...prev]);
    toast.success('Habit added!');
  };

  const updateHabit = (id, updates) => {
    setHabits((prev) => 
      prev.map((h) => (h.id === id ? { ...h, ...updates } : h))
    );
    toast.success('Habit updated!');
  };

  const deleteHabit = (id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
    toast.success('Habit deleted');
  };

  const markComplete = (id) => {
    const today = new Date().toISOString().split('T')[0];
    
    setHabits((prev) => prev.map((h) => {
      if (h.id === id) {
        if (h.completionHistory.includes(today)) {
          toast.error("Already completed today!");
          return h;
        }
        
        const newHistory = [...h.completionHistory, today].sort();
        
        // Calculate streak logic
        let streak = 0;
        const historySet = new Set(newHistory);
        let checkDate = new Date();
        
        while (true) {
          const dateStr = checkDate.toISOString().split('T')[0];
          if (historySet.has(dateStr)) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
          } else {
            break;
          }
        }

        toast.success("Marked as complete!");
        return { ...h, completionHistory: newHistory, streak };
      }
      return h;
    }));
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      <HabitContext.Provider value={{ habits, addHabit, updateHabit, deleteHabit, markComplete }}>
        <HashRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/public-habits" element={<PublicHabits />} />
                
                {/* Protected Routes */}
                <Route 
                  path="/habit/:id" 
                  element={<ProtectedRoute><HabitDetails /></ProtectedRoute>} 
                />
                <Route 
                  path="/add-habit" 
                  element={<ProtectedRoute><AddHabit /></ProtectedRoute>} 
                />
                <Route 
                  path="/my-habits" 
                  element={<ProtectedRoute><MyHabits /></ProtectedRoute>} 
                />
                
                {/* Fallback */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <Footer />
          </div>
          <Toaster position="top-center" />
        </HashRouter>
      </HabitContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;