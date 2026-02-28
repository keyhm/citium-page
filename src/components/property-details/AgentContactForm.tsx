export default function AgentContactForm({ dict }: { dict: any }) {
    return (
        <div className="bg-surface-light rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
                <div className="size-16 rounded-full overflow-hidden bg-gray-200">
                    <img
                        alt="Portrait of real estate agent"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAgwTqbQOBikBJJj_skYqng4hwqnCr9MUFk0ToF4csuHNBBs5E-43RZ-OVrbKrmYTpAyOLTD_NqGe9EIQipXyPhIPtj1oPCj7AhZ-oK6lNObPNDynILBH0iq7gDP5FuqyRHqZ25MkzmaCWuqUmyF56V-4Jb9fmeEBvEqkhqm6TSJxxtAePgCzWKI6sE0Vt_u2_Mq-2FyJW9pC3YgSHdoFXsaMqFDAlEQ0VHCWR5G99QINpdKucUli6FaFFnsZ8eJF30_0RTNBUYYs"
                    />
                </div>
                <div>
                    <h4 className="font-bold text-text-main text-lg">Michael Scott</h4>
                    <p className="text-text-muted text-sm">{dict.propertyDetails.agent.role}</p>
                    <div className="flex gap-1 mt-1 text-yellow-400 text-sm">
                        <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                        <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                        <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                        <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                        <span className="material-symbols-outlined text-[16px] fill-current">star_half</span>
                        <span className="text-gray-400 ml-1">(48)</span>
                    </div>
                </div>
            </div>
            <form className="space-y-4">
                <div>
                    <input
                        className="w-full px-4 py-3 rounded-lg bg-background-light border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                        placeholder={dict.propertyDetails.agent.form.name}
                        type="text"
                    />
                </div>
                <div>
                    <input
                        className="w-full px-4 py-3 rounded-lg bg-background-light border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                        placeholder={dict.propertyDetails.agent.form.email}
                        type="email"
                    />
                </div>
                <div>
                    <input
                        className="w-full px-4 py-3 rounded-lg bg-background-light border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                        placeholder={dict.propertyDetails.agent.form.phone}
                        type="tel"
                    />
                </div>
                <div>
                    <textarea
                        className="w-full px-4 py-3 rounded-lg bg-background-light border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm resize-none"
                        placeholder={dict.propertyDetails.agent.form.message}
                        rows={3}
                    ></textarea>
                </div>
                <button
                    className="w-full bg-text-main text-white font-bold py-3.5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-gray-200"
                    type="button"
                >
                    {dict.propertyDetails.agent.form.send}
                </button>
                <button
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md"
                    type="button"
                >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
                    </svg>
                    {dict.propertyDetails.agent.form.whatsapp}
                </button>
            </form>
            <p className="text-xs text-center text-gray-400 mt-4">{dict.propertyDetails.agent.form.terms}</p>
        </div>
    );
}
