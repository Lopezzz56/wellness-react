import { useRef, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config/api';
import { useNavigate } from 'react-router-dom';

type SessionFormProps = {
  existingSession?: any; // if editing an existing session
};

const SessionEditorForm = ({ existingSession }: SessionFormProps) => {
  const [formData, setFormData] = useState({
    title: existingSession?.title || '',
    description: existingSession?.description || '',
    tags: existingSession?.tags.join(', ') || '',
    image_url: existingSession?.image_url || '',
    video_url: existingSession?.video_url || '',
    json_file_url: existingSession?.json_file_url || '',
  });
const navigate = useNavigate();

  const [statusMsg, setStatusMsg] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isPublished, setIsPublished] = useState(false);
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      handleAutoSave();
    }, 5000);
  };

const handleAutoSave = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.post(
      `${API_BASE_URL}/api/my-sessions/save-draft`,
      {
        ...formData,
        id: existingSession?._id,
        tags: formData.tags.split(',').map((tag: string) => tag.trim()),
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!existingSession && res.data && res.data._id) {
      navigate(`/editor/${res.data._id}`);
      // window.location.href = `${API_BASE_URL}/editor/${res.data._id}`; //  redirect to edit page
    }

    setStatusMsg('Draft auto-saved');
  } catch (err) {
    setStatusMsg('Auto-save failed');
  }
};


  const handleSaveDraft = async () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    await handleAutoSave();
  };

const handlePublish = async () => {
  if (!existingSession?._id) {
    setStatusMsg("No session ID found");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    await axios.post(
      `${API_BASE_URL}/api/my-sessions/publish`,
      {
        id: existingSession._id?.$oid || existingSession._id?.toString?.() || existingSession._id
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setStatusMsg("Session published");
    setIsPublished(true); 
  } catch (err) {
    setStatusMsg("Failed to publish");
  }
};
  return (
    <div className="max-w-3xl mx-auto mt-12 bg-black/10 backdrop-blur-md p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">{existingSession ? 'Edit' : 'New'} Session</h2>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Session Title"
          onChange={handleChange}
  className="p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 text-white placeholder-white bg-transparent"
        />
        <input
          type="text"
          name="tags"
          value={formData.tags}
          placeholder="Tags (comma separated)"
          onChange={handleChange}
  className="p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2  text-white placeholder-white bg-transparent"
        />
        <input
          type="text"
          name="image_url"
          value={formData.image_url}
          placeholder="Image URL"
          onChange={handleChange}
  className="p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2  text-white placeholder-white bg-transparent"

        />
        <input
          type="text"
          name="video_url"
          value={formData.video_url}
          placeholder="Video URL"
          onChange={handleChange}
  className="p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 text-white placeholder-white bg-transparent"
        />
        <textarea
          name="description"
          value={formData.description}
          placeholder="Description"
          onChange={handleChange}
  className="p-3 border border-gray-300 rounded-xl shadow-sm min-h-[120px] resize-none focus:outline-none focus:ring-2 text-white placeholder-white bg-transparent"
        ></textarea>

        <input
          type="text"
          name="json_file_url"
          value={formData.json_file_url}
          placeholder="JSON File URL"
          onChange={handleChange}
  className="p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 text-white placeholder-white bg-transparent"
        />

        <div className="flex gap-4 mt-4">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="border border-gray-300 bg-transparent rounded-xl shadow-sm hover:font-bold focus:outline-none focus:ring-2 text-white px-4 py-2 rounded hover:bg-white/10"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={handlePublish}
            className="border border-gray-300 bg-transparent rounded-xl shadow-sm hover:font-bold focus:outline-none focus:ring-2  text-white px-4 py-2 rounded hover:bg-white/10"
          >
            Publish
          </button>
        </div>
      </form>

{isPublished ? (
  <div className="mt-6 border-t pt-4">
    <p className="text-green-600 font-semibold"> Session published successfully!</p>
    <button
      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
      onClick={() => window.location.href = '/editor'} 
    >
      Create New Session
    </button>
  </div>
) : (
  statusMsg && <div className="mt-4 text-m text-red">{statusMsg}</div>
)}

    </div>
  );
};

export default SessionEditorForm;
