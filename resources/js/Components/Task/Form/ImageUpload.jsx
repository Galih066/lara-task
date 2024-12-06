import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';

const ImageUpload = ({ selectedFiles = [], onFileChange, onRemove, error }) => {
    return (
        <div className="space-y-4">
            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6">
                <input
                    type="file"
                    id="images"
                    onChange={onFileChange}
                    multiple
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4 inline text-sm leading-6 text-gray-600">
                        <label
                            htmlFor="images"
                            className="relative cursor-pointer rounded-md font-semibold text-blue-600 hover:text-blue-500"
                        >
                            <span>Upload files</span>
                        </label>
                        <span className="pl-1">or drag and drop</span>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB each</p>
                </div>
            </div>

            {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
            )}

            {selectedFiles.length > 0 && (
                <div className="mt-4">
                    <div className="text-sm font-medium text-gray-700 mb-3">
                        Selected Files ({selectedFiles.length})
                    </div>
                    <div className="space-y-2">
                        {selectedFiles.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg group hover:border-gray-300"
                            >
                                <div className="flex items-center min-w-0">
                                    <PhotoIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                    <span className="ml-2 truncate text-sm text-gray-600">
                                        {file.name}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => onRemove(index)}
                                    className="ml-4 flex-shrink-0 p-1 rounded-md text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    <XMarkIcon className="h-5 w-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
