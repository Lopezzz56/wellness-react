// pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import SessionCard from '../components/sessions/SessionCard';
import API_BASE_URL from '../config/api'; 

type Session = {
  _id: string;
  title: string;
  image_url?: string;
};

const Dashboard = () => {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      const res = await axios.get(`${API_BASE_URL}/api/sessions`);
      setSessions(res.data);
    };
    fetchSessions();
  }, []);

  return (
<div className="w-full px-4 py-6 pb-20 sm:px-6 sm:py-6 lg:px-8 lg:py-6">
  <h1 className="text-2xl font-bold mb-6"> Published Sessions</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
    {sessions.map((session) => (
      <SessionCard key={session._id} session={session} />
    ))}
  </div>
</div>

  );
};

export default Dashboard;
