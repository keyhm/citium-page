
import { useState } from 'react';

interface AgentContactFormProps {
    dict: any;
    property?: {
        id: string;
        title: string;
    };
    locale?: string;
}

export default function AgentContactForm({ dict, property, locale }: AgentContactFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    // construct whatsapp url with message if property available
    const whatsappNumber = '573218911436';

    const handleWhatsApp = () => {
        let msg = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`;
        if (property) {
            // build property link using current origin when available
            const origin = typeof window !== 'undefined' ? window.location.origin : '';
            const propUrl = `${origin}/${locale || ''}/properties/${property.id}`;
            // message text localized (spanish default, en fallback)
            const propText = locale === 'es'
                ? `\n\nEstoy interesado en la propiedad ${property.title} ${propUrl}`
                : `\n\nI am interested in the property ${property.title} ${propUrl}`;
            msg += propText;
        }
        const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
        window.open(whatsappHref, '_blank');
    };

    return (
        <div className="bg-surface-light rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
                <div className="size-16 rounded-full overflow-hidden bg-gray-200">
                    <img
                        alt="Agente"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAgwTqbQOBikBJJj_skYqng4hwqnCr9MUFk0ToF4csuHNBBs5E-43RZ-OVrbKrmYTpAyOLTD_NqGe9EIQipXyPhIPtj1oPCj7AhZ-oK6lNObPNDynILBH0iq7gDP5FuqyRHqZ25MkzmaCWuqUmyF56V-4Jb9fmeEBvEqkhqm6TSJxxtAePgCzWKI6sE0Vt_u2_Mq-2FyJW9pC3YgSHdoFXsaMqFDAlEQ0VHCWR5G99QINpdKucUli6FaFFnsZ8eJF30_0RTNBUYYs"
                    />
                </div>
                <div>
                    <h4 className="font-bold text-text-main text-lg">Keysy Hernandez</h4>
                    <p className="text-text-muted text-sm">{dict.propertyDetails.agent.role}</p>
                    <div className="flex gap-1 mt-1 text-yellow-400 text-sm">
                        {/* <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                        <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                        <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                        <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                        <span className="material-symbols-outlined text-[16px] fill-current">star_half</span> 
                        <span className="text-gray-400 ml-1">(48)</span>*/}
                    </div>
                </div>
            </div>
            <form className="space-y-4">
                <div>
                    <input
                        className="w-full px-4 py-3 rounded-lg bg-background-light border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                        placeholder={dict.propertyDetails.agent.form.name}
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div>
                    <input
                        className="w-full px-4 py-3 rounded-lg bg-background-light border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                        placeholder={dict.propertyDetails.agent.form.email}
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div>
                    <input
                        className="w-full px-4 py-3 rounded-lg bg-background-light border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                        placeholder={dict.propertyDetails.agent.form.phone}
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                </div>
                <div>
                    <textarea
                        className="w-full px-4 py-3 rounded-lg bg-background-light border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm resize-none"
                        placeholder={dict.propertyDetails.agent.form.message}
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                </div>
                <button
                    className="w-full bg-text-main text-white font-bold py-3.5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-gray-200"
                    type="button" onClick={handleWhatsApp}
                >
                    {dict.propertyDetails.agent.form.send}
                </button>
            </form>
            <p className="text-xs text-center text-gray-400 mt-4">{dict.propertyDetails.agent.form.terms}</p>
        </div>
    );
}
