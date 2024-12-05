const FormField = ({ label, required, error, children }) => {
    return (
        <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative mt-2">
                {children}
            </div>
            {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default FormField;
