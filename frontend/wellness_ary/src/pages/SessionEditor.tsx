// src/pages/SessionEditor.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SessionEditorForm from "../components/sessions/SessionEditorForm";

export default function SessionEditor() {
  const { id } = useParams();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    if (!id) return; // New mode, don't fetch
    const fetchSession = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/my-sessions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSession(res.data);
    };

    fetchSession();
  }, [id]);

  // If editing existing session
  if (id && !session) return <div className="p-4">Loading session...</div>;

  return <SessionEditorForm existingSession={session} />;
}
