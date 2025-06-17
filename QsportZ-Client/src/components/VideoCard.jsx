export default function VideoCard({
  thumbnailUrl,
  title,
  match,
  school,
  date,
  onPlay,
  onShare,
  onDelete,
}) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl overflow-hidden shadow-lg">
      <img
        src={thumbnailUrl}
        alt={title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white truncate">{title}</h3>
        <p className="text-gray-400 text-sm mt-1">{school} • {match}</p>
        <p className="text-gray-500 text-xs">{new Date(date).toLocaleDateString()}</p>
        <div className="mt-3 flex space-x-2">
          <Button onClick={onPlay} className="flex-1">
            Play
          </Button>
          <Button variant="outline" onClick={onShare} className="flex-1">
            Share
          </Button>
          {onDelete && (
            <Button variant="ghost" onClick={onDelete} className="flex-1 text-red-500">
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
}