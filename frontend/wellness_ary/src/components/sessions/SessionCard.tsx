import { Link } from 'react-router-dom';

type Session = {
  _id: string;
  title: string;
  image_url?: string;
  status?: string;
};

const SessionCard = ({ session, showEdit = false }: { session: Session; showEdit?: boolean }) => {
  const showExtras = showEdit || session.status === 'draft';

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300 group bg-transparent">
      {/* Image Section */}
      <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[26rem]">
        <img
          src={session.image_url || 'https://via.placeholder.com/400x200?text=No+Image'}
          alt={session.title}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />

        {/* Only show gradient if edit or draft is true */}
        {showExtras && (
          <div className="absolute inset-0 " />
        )}

        {/* Always show title */}
        <h3 className="absolute bottom-4 left-4 right-4 text-white text-xl font-bold z-10 drop-shadow-md">
          {session.title}
        </h3>
      </div>

      {/* Action Section (conditionally shown) */}
      {showExtras && (
        <div className="flex flex-col gap-2 p-4 bg-transparent">
          {showEdit && (
            <Link
              to={`/editor/${session._id}`}
              className="text-center bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Edit
            </Link>
          )}

        </div>
      )}
                {session.status === 'draft' && (
            <div className="w-full bg-red-500 text-white text-sm font-semibold py-2 text-center ">
              DRAFT
            </div>
          )}
    </div>
  );
};

export default SessionCard;
