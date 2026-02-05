import { useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function CreateModal({ show, onClose, title, fields, onSubmit, processing, onFieldChange, errors: propErrors = {} }) {
    const { data, setData, errors: formErrors } = useForm(fields.reduce((acc, field) => {
        acc[field.name] = field.defaultValue !== undefined ? field.defaultValue : (field.type === 'checkbox' ? false : '');
        return acc;
    }, {}));

    const errors = { ...formErrors, ...propErrors };

    // Reset form when fields change
    useEffect(() => {
        const initialData = fields.reduce((acc, field) => {
            acc[field.name] = field.defaultValue !== undefined ? field.defaultValue : (field.type === 'checkbox' ? false : '');
            return acc;
        }, {});
        
        // Only reset if the form is empty or if fields structure changed
        if (Object.keys(data).length === 0 || 
            fields.length !== Object.keys(data).length ||
            fields.some(field => !data.hasOwnProperty(field.name))) {
            Object.entries(initialData).forEach(([key, value]) => {
                setData(key, value);
            });
        }
    }, [fields]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(data);
    };

    const handleNameChange = (fieldName, e) => {
        const name = e.target.value;
        setData(fieldName, name);
        
        // Auto-generate slug if there's a slug field
        if (fieldName === 'name' && fields.some(f => f.name === 'slug')) {
            const slugField = fields.find(f => f.name === 'slug');
            if (!data[slugField.name] || slugField.autoGenerate) {
                const generatedSlug = name
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');
                setData('slug', generatedSlug);
            }
        }
        
        // Call external handler if provided
        if (onFieldChange) {
            onFieldChange(fieldName, name);
        }
    };

    const handleFieldChange = (fieldName, e) => {
        const value = e.target.value;
        setData(fieldName, value);
        
        // Call external handler if provided
        if (onFieldChange) {
            onFieldChange(fieldName, value);
        }
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <form onSubmit={handleSubmit} className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium text-gray-900">{title}</h2>
                </div>

                <div className="space-y-4">
                    {fields.map((field) => (
                        <div key={field.name}>
                            {field.type !== 'checkbox' && (
                                <InputLabel htmlFor={field.name} value={field.label} />
                            )}
                            {field.type === 'select' ? (
                                <select
                                    id={field.name}
                                    value={data[field.name]}
                                    onChange={(e) => handleFieldChange(field.name, e)}
                                    className={`mt-1 block w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
                                        errors[field.name] ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    required={field.required}
                                    disabled={field.disabled}
                                >
                                    <option value="">{field.placeholder || 'Selecciona una opción'}</option>
                                    {field.options?.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            ) : field.type === 'checkbox' ? (
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        id={field.name}
                                        checked={data[field.name]}
                                        onChange={(e) => setData(field.name, e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                        {field.label}
                                    </span>
                                </label>
                            ) : (
                                <TextInput
                                    id={field.name}
                                    type={field.type || 'text'}
                                    value={data[field.name]}
                                    onChange={(e) => field.name === 'name' ? handleNameChange(field.name, e) : handleFieldChange(field.name, e)}
                                    className={`mt-1 block w-full ${
                                        errors[field.name] ? 'border-red-500' : ''
                                    }`}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                />
                            )}
                            {field.helpText && (
                                <p className="mt-1 text-sm text-gray-500">{field.helpText}</p>
                            )}
                            <InputError message={errors[field.name]} className="mt-1" />
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <SecondaryButton onClick={onClose} disabled={processing}>
                        Cancelar
                    </SecondaryButton>
                    <PrimaryButton type="submit" disabled={processing}>
                        {processing ? 'Guardando...' : 'Crear'}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}