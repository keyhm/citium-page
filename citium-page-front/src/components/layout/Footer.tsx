import { Dictionary } from '@/types/dictionary';
import Image from 'next/image';

export default function Footer({ dict }: { dict: Dictionary }) {
    return (
        <footer className="bg-[#1A2B48] text-white pt-16 pb-8">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-12">
                    {/* Brand */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <Image
                                src="/logo.png"
                                alt="Citium Logo"
                                width={250}
                                height={75}
                                className="h-10 md:h-12 w-auto object-contain origin-left"
                                priority
                            />
                        </div>
                        <p className="text-sm leading-relaxed text-gray-300">
                            {dict.footer.description}
                        </p>
                    </div>
                    {/* Links 1 */}
                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-secondary">{dict.footer.properties}</h3>
                        <ul className="flex flex-col gap-3 text-sm text-gray-300">
                            <li><a className="hover:text-white transition-colors" href={`/properties?type=sale`}>{dict.footer.buyHome}</a></li>
                            <li><a className="hover:text-white transition-colors" href={`/properties?type=rent`}>{dict.footer.rentHome}</a></li>
                        </ul>
                    </div>
                    {/* Links 2 */}
                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-secondary">{dict.footer.company}</h3>
                        <ul className="flex flex-col gap-3 text-sm text-gray-300">
                            <li><a className="hover:text-white transition-colors" href={`/services`}>{dict.footer.aboutUs}</a></li>
                            <li><a className="hover:text-white transition-colors" href="https://wa.me/3218911436">{dict.footer.contact}</a></li>
                        </ul>
                    </div>
                    {/* Contact */}
                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-secondary">{dict.footer.contactUs}</h3>
                        <ul className="flex flex-col gap-4 text-sm text-gray-300">
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-[20px] text-secondary">location_on</span>
                                <span>Pereira, Colombia</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[20px] text-secondary">phone</span>
                                <span>(+57) 321 891 1436</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[20px] text-secondary">mail</span>
                                <span>citium.inmobiliaria@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between border-t border-white/10 pt-8 md:flex-row gap-4">
                    <p className="text-xs text-gray-400">© 2026 Colombia. {dict.footer.rights}</p>
                    <div className="flex gap-6">
                        <a className="text-gray-400 hover:text-white transition-colors" href="https://wa.me/3218911436?text=Hola, quiero más información sobre las propiedades." target="_blank" rel="noopener noreferrer">
                            <span className="sr-only">WhatsApp</span>
                            <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" clipRule="evenodd" d="M16.6 14c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1c-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5s.2-.3.4-.4c.1-.1.2-.3.2-.4.1-.1.1-.3 0-.4S9.7 8.5 9.5 8c-.1-.7-.3-.7-.5-.7h-.5c-.2 0-.5.2-.6.3Q7 8.5 7 9.7c.1.9.4 1.8 1 2.6 1.1 1.6 2.5 2.9 4.2 3.7.5.2.9.4 1.4.5.5.2 1 .2 1.6.1.7-.1 1.3-.6 1.7-1.2.2-.4.2-.8.1-1.2zm2.5-9.1C15.2 1 8.9 1 5 4.9c-3.2 3.2-3.8 8.1-1.6 12L2 22l5.3-1.4c1.5.8 3.1 1.2 4.7 1.2 5.5 0 9.9-4.4 9.9-9.9.1-2.6-1-5.1-2.8-7m-2.7 14c-1.3.8-2.8 1.3-4.4 1.3-1.5 0-2.9-.4-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3c-2.4-4-1.2-9 2.7-11.5S16.6 3.7 19 7.5c2.4 3.9 1.3 9-2.6 11.4"></path>
                            </svg>
                        </a>
                        <a className="text-gray-400 hover:text-white transition-colors" href="mailto:citium.inmobiliaria@gmail.com">
                            <span className="sr-only">Email</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="#a0a0a0">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                        </a>
                        <a className="text-gray-400 hover:text-white transition-colors" href="https://www.instagram.com/citium_inmobiliaria?igsh=MTU1YXBseGh5bHphcg==" target="_blank" rel="noopener noreferrer">
                            <span className="sr-only">Instagram</span>
                            <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.315 2zm-1.196 1.961c-2.435.109-2.753.186-3.41.442-.693.266-1.171.6-1.58.986-.408.409-.738.906-1.002 1.581-.257.658-.334.975-.443 3.411l-.002.359c-.007 2.327.054 2.703.35 3.328.266.693.6 1.171.986 1.58.409.408.906.738 1.581 1.002.658.257.975.334 3.411.443l.359.002c2.327.007 2.703-.054 3.328-.35.693-.266 1.171-.6 1.58-.986.408-.409.738-.906 1.002-1.581.257-.658.334-.975.443-3.411l.002-.359c.007-2.327-.054-2.703-.35-3.328-.266-.693-.6-1.171-.986-1.58-.409-.408-.906-.738-1.581-1.002-.658-.257-.975-.334-3.411-.443-.092-.004-.374-.006-1.067-.006zm3.923 2.926a1.275 1.275 0 110 2.55 1.275 1.275 0 010-2.55zM12.308 6.555a5.753 5.753 0 100 11.506 5.753 5.753 0 000-11.506zm0 2.164a3.59 3.59 0 110 7.18 3.59 3.59 0 010-7.18z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
