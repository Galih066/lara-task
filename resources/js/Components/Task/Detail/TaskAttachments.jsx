const TaskAttachments = ({ images }) => {
    if (!images || images.length === 0) return null;

    return (
        <div>
            <h4 className="text-sm font-medium text-gray-500 mb-4">Attachments</h4>
            <div className="grid grid-cols-2 gap-4">
                {images.map((image, index) => (
                    <div key={index} className="relative group">
                        <img
                            src={`/storage/${image.path}`}
                            alt={image.name}
                            className="w-full h-40 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                            <a
                                href={`/storage/${image.path}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-4 py-2 rounded-md text-sm font-medium transform scale-95 group-hover:scale-100 transition-all duration-200"
                            >
                                View Full Size
                            </a>
                        </div>
                        <div className="mt-1">
                            <p className="text-sm text-gray-900 truncate">{image.name}</p>
                            <p className="text-xs text-gray-500">
                                {(image.size / 1024).toFixed(1)} KB • {image.type.split('/')[1].toUpperCase()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskAttachments;
