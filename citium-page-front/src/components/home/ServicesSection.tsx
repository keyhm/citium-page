"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

type CardItem = {
  icon: string;
  title: string;
  description: string;
};

const saleCards: CardItem[] = [
  {
    icon: 'analytics',
    title: 'Análisis de Mercado',
    description:
      'Realizamos análisis de mercado local para determinar el precio de su propiedad, asegurando que obtenga el mejor retorno de su inversión.',
  },
  {
    icon: 'photo_camera',
    title: 'Fotografía Profesional',
    description:
      'Imágenes de drones de alta definición y fotografía para resaltar cada detalle.',
  },
];

const managementItems = ['Selección de inquilinos', 'Mantenimiento preventivo', 'Gestión administrativa', 'Reportes periódicos'];

function ServiceCard({ icon, title, description }: CardItem) {
  return (
    <div className="bg-surface-container-low p-10 rounded hover:bg-surface-container-high transition-all group border border-transparent hover:border-primary/20">
      <span className="material-symbols-outlined text-primary text-4xl mb-6 block">{icon}</span>
      <h3 className="font-headline text-xl font-bold mb-4">{title}</h3>
      <p className="text-on-surface-variant text-sm leading-relaxed mb-8">{description}</p>
    </div>
  );
}

function SaleSlide() {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="max-w-2xl">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">
            Venta de <span className="text-primary">Propiedades</span>
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Descubre nuestra selección de propiedades en venta, cuidadosamente seleccionadas para ofrecer la mejor opción que se ajuste a tus necesidades.
          </p>
        </div>
        <div className="h-[1px] flex-grow bg-white/5 mx-12 hidden md:block" />
        <span className="text-primary font-headline font-black text-6xl opacity-20 select-none">01</span>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {saleCards.map(item => (
          <ServiceCard key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}

function RentSlide() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-surface-container-low border border-white/5">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="order-1 lg:order-2 space-y-8">
          <div className='flex flex-col md:flex-row justify-between items-end gap-8'>
            <h2 className="font-headline text-4xl md:text-5xl font-bold leading-tight">
              Arriendo de <br />
              <span className="text-primary">Propiedades</span>
            </h2>
            <span className="text-primary font-headline font-black text-6xl opacity-20 select-none">02</span>
          </div>

          <p className="text-on-surface-variant text-lg leading-relaxed">
            Explora nuestra cartera de propiedades en alquiler, con diversas opciones (consultorios, locales, fincas, edificios, bodegas, apartamentos, casas, apartamentos amoblados, entre otras).
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded bg-surface-container/40">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary">verified</span>
              </div>
              <div>
                <h4 className="font-bold mb-1">Inventario selecto</h4>
                <p className="text-sm text-on-surface-variant">Acceso a propiedades antes de que estén disponibles en los portales generales.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded bg-surface-container/40">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary">support_agent</span>
              </div>
              <div>
                <h4 className="font-bold mb-1">Logística </h4>
                <p className="text-sm text-on-surface-variant">Nos encargamos de ayudarte con la logística de la mudanza y las instalaciones iniciales.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-8 max-w-screen-2xl mx-auto">
          <div className="grid  gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded overflow-hidden">
                    <Image
                      alt="Mudanza y Acarreos"
                      width={720}
                      height={720}
                      className="w-full h-full object-cover"
                      data-alt="Mudanzas: Acarreo de muebles y objetos personales con cuidado y eficiencia, asegurando una transición sin estrés a tu nuevo hogar"
                      src="/acarreos.jpg"
                    />
                  </div>
                  <div className="bg-surface-container p-6 rounded border border-white/5">
                    <span className="material-symbols-outlined text-primary mb-2">local_shipping</span>
                    <h4 className="font-bold text-sm text-on-surface mb-2">Acarreos</h4>
                    <p className="text-xs text-on-surface-variant">Te contactamos con servicios de mudanza.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-surface-container-high p-6 rounded border border-primary/20">
                    <span className="material-symbols-outlined text-primary mb-2">plumbing</span>
                    <h4 className="font-bold text-sm text-on-surface mb-2">Mantenimiento</h4>
                    <p className="text-xs text-on-surface-variant">Te contactamos con profesionales certificados para cualquier necesidad de mantenimiento.</p>
                  </div>
                  <div className="rounded overflow-hidden">
                    <Image
                      width={720}
                      height={720}
                      alt="Mantenimiento de propiedad"
                      className="w-full h-full object-cover"
                      data-alt="Elegant master bathroom with dark marble finishes, gold faucets, and warm ambient lighting"
                      src="/mantenimiento.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ManagementSlide() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-surface-container-low border border-white/5 p-12 md:p-10">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <span className="font-headline text-6xl font-black text-primary/20 select-none">03</span>
            <h2 className="font-headline text-4xl font-bold">Administración <br />y Gestión</h2>
          </div>
          <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
            Nuestro servicio de administración integral se encarga de cada aspecto de la gestión de su propiedad, desde la selección rigurosa de inquilinos hasta el mantenimiento proactivo, asegurando que su inversión esté siempre protegida y generando ingresos sin preocupaciones.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {managementItems.map(item => (
              <li key={item} className="flex items-center gap-3 text-on-surface">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-surface-container-high p-8 rounded border border-white/5 shadow-xl">
            <div className="text-3xl font-bold text-primary mb-2">Acompañamiento </div>
            <div className="text-xs font-bold tracking-widest uppercase text-on-surface-variant">integral</div>
          </div>
          <div className="bg-surface-container-high p-8 rounded border border-white/5 shadow-xl mt-8">
            <div className="text-3xl font-bold text-primary mb-2">Soporte</div>
            <div className="text-xs font-bold tracking-widest uppercase text-on-surface-variant">....</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const carouselSlides = [
  {
    label: 'Venta de Propiedades',
    component: SaleSlide,
  },
  {
    label: 'Arriendo de Propiedades',
    component: RentSlide,
  },
  {
    label: 'Administración y Gestión',
    component: ManagementSlide,
  },
];

export default function ServicesSection({ locale }: { locale: string }) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setActiveSlide(prev => (prev + 1) % carouselSlides.length);
    }, 6000);

    return () => window.clearTimeout(timeoutId);
  }, [activeSlide]);

  const ActiveSlideComponent = carouselSlides[activeSlide].component;

  return (
    <>
      <section
        id="services"
        className="relative min-h-[819px] flex items-center px-8 max-w-screen-2xl mx-auto overflow-hidden"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <span className="inline-block py-1 px-3 bg-tertiary-container/20 text-tertiary border border-tertiary/20 text-xs font-bold tracking-[0.2em] uppercase rounded-full">
              Excelencia
            </span>
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-on-surface leading-[1.1] tracking-tight">
              Nuestros <span className="text-primary">Servicios</span> Disponibles.
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">
              Te ayudamos a encontrar la propiedad perfecta, ya sea para comprar, alquilar o gestionar. Nuestra experiencia y dedicación garantizan un proceso sin complicaciones y resultados excepcionales.
            </p>
          </div>

          <div className="relative group hidden lg:block">
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-50" />
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
              <Image
                alt="Viaducto de Cesar Gaviria Trujillo en la ciudad de Pereira"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                data-alt="Ultra-modern architectural villa with glass walls and minimalist concrete structures during blue hour with warm interior lights"
                priority
                width={400}
                height={500}
                src="/pereira.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8  right-8 p-6 bg-surface-container/80 backdrop-blur-md rounded border border-white/5">
                <h3 className="font-headline text-white font-bold">Pereira, Colombia</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-8 max-w-screen-2xl mx-auto">
        <div className="relative">
          <div className="relative rounded-3xl bg-surface-container-high rounded mt-8 border border-white/5 px-12 py-14 shadow-xl transition-all duration-500">
            <ActiveSlideComponent />
          </div>

          <div className="mt-10 flex justify-center gap-3">
            {carouselSlides.map((slide, index) => (
              <button
                key={slide.label}
                type="button"
                aria-label={`Mostrar ${slide.label}`}
                onClick={() => setActiveSlide(index)}
                className={`h-3 w-3 rounded-full transition-all cursor-pointer ${index === activeSlide
                  ? 'bg-primary scale-125'
                  : 'bg-white/30 hover:bg-white/50 border border-black/10'
                  }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-8 max-w-screen-xl mx-auto text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-8">
          Contáctanos <span className="text-primary italic">hoy</span>
        </h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto mb-12">
          Tanto si desea comprar, vender o buscar servicios de gestión, nuestro equipo está listo para ayudarle.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            className="px-10 py-5 signature-gradient text-on-primary rounded font-bold text-lg hover:shadow-2xl hover:shadow-primary/30 transition-all"
            href="https://wa.me/573218911436"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contáctanos
          </a>
          <a
            className="px-10 py-5 rounded border border-primary/30 text-primary font-bold text-base hover:bg-primary/5 transition-all"
            href={`/${locale}/properties?type=sale`}
          >
            Ver propiedades disponibles
          </a>
        </div>
      </section>
    </>
  );
}
