export default function AboutSection({ dict, locale }: { dict: any; locale: string }) {
    return (
        <section className="bg-surface-light px-6 py-20 lg:py-28">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            <span className="h-px w-8 bg-secondary"></span>
                            <span className="text-sm font-bold uppercase tracking-widest text-secondary">{dict.about.subtitle}</span>
                        </div>
                        <h2 className="font-display text-3xl font-bold leading-tight text-text-main md:text-5xl">
                            {dict.about.title}
                        </h2>
                        <p className="text-lg leading-relaxed text-text-muted">
                            {dict.about.p1}
                        </p>
                        <p className="text-lg leading-relaxed text-text-muted">
                            {dict.about.p2}
                        </p>
                        <div className="mt-4">
                            <a className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary hover:text-secondary transition-colors" 
                                href={`/${locale}/services`}>
                                {dict.about.link}
                                <span className="material-symbols-outlined text-sm">arrow_forward</span> 
                            </a>
                        </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                        <FeatureBox
                            icon="verified"
                            title={dict.about.feature1}
                            desc={dict.about.feature1Desc}
                        />
                        <FeatureBox
                            icon="psychology"
                            title={dict.about.feature2}
                            desc={dict.about.feature2Desc}
                        />
                        <FeatureBox
                            icon="handshake"
                            title={dict.about.feature3}
                            desc={dict.about.feature3Desc}
                        />
                        <FeatureBox
                            icon="support_agent"
                            title={dict.about.feature4}
                            desc={dict.about.feature4Desc}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function FeatureBox({ icon, title, desc }: { icon: string, title: string, desc: string }) {
    return (
        <div className="group flex flex-col gap-4 rounded-2xl bg-background-light p-8 transition-all hover:bg-white hover:shadow-xl border border-gray-100">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">{icon}</span>
            </div>
            <h3 className="font-display text-xl font-bold text-text-main">{title}</h3>
            <p className="text-text-muted">{desc}</p>
        </div>
    );
}
