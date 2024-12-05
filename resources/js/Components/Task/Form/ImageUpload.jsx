import { XMarkIcon } from '@heroicons/react/24/outline';

const ImageUpload = ({ files, onFileChange, onRemoveFile, error }) => {
    return (
        <div>
            <label htmlFor="images" className="block text-sm font-medium leading-6 text-gray-900">
                Images
            </label>
            <div className="relative mt-2">
                <input
                    type="file"
                    id="images"
                    onChange={onFileChange}
                    multiple
                    accept="image/*"
                    className="block w-full text-sm text-gray-500 
                        file:mr-4 file:py-2 file:px-4 
                        file:rounded-md file:border-0 
                        file:text-sm file:font-semibold 
                        file:bg-blue-50 file:text-blue-700 
                        hover:file:bg-blue-100 
                        focus-within:outline-none focus-within:ring-2 
                        focus-within:ring-blue-600 focus-within:ring-offset-2"
                />
                <p className="mt-1 text-xs text-gray-500">You can select multiple images</p>
            </div>
            {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
            )}

            {files.length > 0 && (
                <div className="mt-4 space-y-2">
                    {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2 group hover:bg-gray-100">
                            <span className="text-sm text-gray-600 truncate flex-1 mr-2">
                                {file.name}
                            </span>
                            <button
                                type="button"
                                onClick={() => onRemoveFile(index)}
                                className="shrink-0 text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-md p-1 transition-colors duration-200"
                            >
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
