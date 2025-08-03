import { Link } from 'react-router-dom';

type Session = {
  _id: string;
  title: string;
  image_url?: string;
  status?: string;
};

const SessionCard = ({ session, showEdit = false }: { session: Session; showEdit?: boolean }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
      <div className="h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 overflow-hidden">
        <img
          src={session.image_url || 'https://via.placeholder.com/400x200?text=No+Image'}
          alt={session.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300 ease-in-out"
        />
      </div>

      <div className="p-5 flex flex-col gap-2">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800 line-clamp-2">
          {session.title}
        </h3>

        {showEdit && (
          <Link
            to={`/editor/${session._id}`}
            className="mt-2 inline-block text-center bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
          >
             Edit
          </Link>
        )}

      </div>
      
        {session.status === 'draft' && (
          <div className="mt-2 w-full bg-gradient-to-r from-red-500 via-red-450 to-red-400 text-white text-sm font-semibold py-2 text-center rounded">
            DRAFT
          </div>
        )}
    </div>
  );
};

export default SessionCard;
