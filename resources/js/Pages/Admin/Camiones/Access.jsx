import { Head, useForm } from '@inertiajs/react';
import { useMemo, useRef, useState } from 'react';

export default function CamionesAccess() {
    const [digits, setDigits] = useState(['', '', '', '']);
    const inputRefs = useRef([]);
    const { setData, post, processing, errors } = useForm({
        pin: '',
    });

    const pin = useMemo(() => digits.join(''), [digits]);

    const submit = (event) => {
        event.preventDefault();
        setData('pin', pin);
        post(route('admin.camiones.access.store'), {
            data: { pin },
        });
    };

    const updateDigit = (index, value) => {
        const nextValue = value.replace(/\D/g, '').slice(-1);
        const nextDigits = [...digits];
        nextDigits[index] = nextValue;
        setDigits(nextDigits);
        setData('pin', nextDigits.join(''));

        if (nextValue && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (event, index) => {
        if (event.key === 'Backspace' && !digits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <>
            <Head title="Acceso Camiones" />

            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
                    <h1 className="text-2xl font-bold text-gray-900 text-center">Acceso a Camiones</h1>
                    <p className="mt-2 text-center text-gray-500">Ingresa la clave de 4 dígitos</p>

                    <form onSubmit={submit} className="mt-8">
                        <div className="flex items-center justify-center gap-3">
                            {digits.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(element) => {
                                        inputRefs.current[index] = element;
                                    }}
                                    type="password"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(event) => updateDigit(index, event.target.value)}
                                    onKeyDown={(event) => handleKeyDown(event, index)}
                                    className={`h-14 w-14 rounded-xl border text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-secondary-400 ${
                                        errors.pin ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                            ))}
                        </div>

                        {errors.pin && <p className="mt-3 text-center text-sm text-red-500">{errors.pin}</p>}

                        <button
                            type="submit"
                            disabled={processing || pin.length !== 4}
                            className="mt-6 w-full rounded-lg bg-yellow-400 px-4 py-3 font-bold text-zinc-900 transition-colors hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing ? 'Validando...' : 'Entrar'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
