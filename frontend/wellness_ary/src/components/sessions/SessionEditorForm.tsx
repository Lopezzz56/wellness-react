import { useRef, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config/api';

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

    // ✅ If session was newly created and no ID existed before
    if (!existingSession && res.data && res.data._id) {
      window.location.href = `/editor/${res.data._id}`; // ✅ redirect to edit page
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
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-6">{existingSession ? 'Edit' : 'New'} Session</h2>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Session Title"
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="tags"
          value={formData.tags}
          placeholder="Tags (comma separated)"
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="image_url"
          value={formData.image_url}
          placeholder="Image URL"
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="video_url"
          value={formData.video_url}
          placeholder="Video URL"
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          placeholder="Description"
          onChange={handleChange}
          className="p-2 border rounded min-h-[120px]"
        ></textarea>

        <input
          type="text"
          name="json_file_url"
          value={formData.json_file_url}
          placeholder="JSON File URL"
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <div className="flex gap-4 mt-4">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={handlePublish}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Publish
          </button>
        </div>
      </form>

{isPublished ? (
  <div className="mt-6 border-t pt-4">
    <p className="text-green-600 font-semibold">✅ Session published successfully!</p>
    <button
      className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      onClick={() => window.location.href = '/editor'} // 🔁 Load empty editor
    >
      Create New Session
    </button>
  </div>
) : (
  statusMsg && <div className="mt-4 text-sm text-gray-600">{statusMsg}</div>
)}

    </div>
  );
};

export default SessionEditorForm;
