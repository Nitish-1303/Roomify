import React, { useState, useEffect } from 'react';
import { RefreshCw, AlertCircle, CheckCircle, Users, TrendingUp, Zap, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AutoSwap = () => {
  const [swapOpportunities, setSwapOpportunities] = useState([]);
  const [activeSwaps, setActiveSwaps] = useState([]);
  const [completedSwaps, setCompletedSwaps] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    generateSwapOpportunities();
    generateActiveSwaps();
    generateCompletedSwaps();
    generateStats();
  }, []);

  const generateSwapOpportunities = () => {
    setSwapOpportunities([
      {
        id: 1,
        inefficiency: 'high',
        score: 87,
        currentBooking1: {
          team: 'Marketing Team',
          size: 3,
          room: 'Executive Boardroom',
          capacity: 20,
          time: 'Today 2:00 PM - 4:00 PM'
        },
        currentBooking2: {
          team: 'Sales Department',
          size: 15,
          room: 'Meeting Room B',
          capacity: 8,
          time: 'Today 2:00 PM - 4:00 PM'
        },
        suggestion: 'Swap rooms for optimal space utilization',
        savings: '12 seats optimized',
        status: 'pending'
      },
      {
        id: 2,
        inefficiency: 'medium',
        score: 72,
        currentBooking1: {
          team: 'Design Team',
          size: 2,
          room: 'Conference Room A',
          capacity: 12,
          time: 'Tomorrow 10:00 AM - 12:00 PM'
        },
        currentBooking2: {
          team: 'Engineering Team',
          size: 10,
          room: 'Quiet Room 2',
          capacity: 4,
          time: 'Tomorrow 10:00 AM - 12:00 PM'
        },
        suggestion: 'Swap for better capacity match',
        savings: '8 seats optimized',
        status: 'pending'
      },
      {
        id: 3,
        inefficiency: 'low',
        score: 58,
        currentBooking1: {
         