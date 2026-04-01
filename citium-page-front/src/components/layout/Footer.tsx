import Image from 'next/image';

export default function Footer({ dict }: { dict: any }) {
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
                            <li><a className="hover:text-white transition-colors" href="#">{dict.footer.buyHome}</a></li>
                            <li><a className="hover:text-white transition-colors" href="#">{dict.footer.rentHome}</a></li>
                        </ul>
                    </div>
                    {/* Links 2 */}
                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-secondary">{dict.footer.company}</h3>
                        <ul className="flex flex-col gap-3 text-sm text-gray-300">
                            <li><a className="hover:text-white transition-colors" href="#">{dict.footer.aboutUs}</a></li>
                            <li><a className="hover:text-white transition-colors" href="#">{dict.footer.careers}</a></li>
                            <li><a className="hover:text-white transition-colors" href="#">{dict.footer.contact}</a></li>
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
                                <span>hello@estate.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between border-t border-white/10 pt-8 md:flex-row gap-4">
                    <p className="text-xs text-gray-400">© 2024 Estate Inc. {dict.footer.rights}</p>
                    <div className="flex gap-6">
                        <a className="text-gray-400 hover:text-white transition-colors" href="#">
                            <span className="sr-only">Facebook</span>
                            <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                            </svg>
                        </a>
                        <a className="text-gray-400 hover:text-white transition-colors" href="#">
                            <span className="sr-only">Twitter</span>
                            <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                            </svg>
                        </a>
                        <a className="text-gray-400 hover:text-white transition-colors" href="#">
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
