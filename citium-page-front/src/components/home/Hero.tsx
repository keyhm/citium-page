import { Dictionary } from '@/types/types';
import SearchForm from './SearchForm';

export default function Hero({ dict }: { dict: Dictionary }) {
    return (
        <section className="relative flex min-h-[600px] flex-col justify-center px-6 py-20 lg:py-32">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "linear-gradient(rgba(26, 43, 72, 0.4), rgba(26, 43, 72, 0.6)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAcdRf1fT6ROwAXFy4rjPriCBiJoLw7bVgu7SCHcuHxfd6XQONEB9zTXXjBDAAUrpyF-S4KhLk7fYJs3K6Sd8V9Oz74bBC5IVd0Z_J9h7NIsFY456k5eoBaH0IVvFg8SU0Mny13wjAooU4gUbb7iF4HSt6yfj3DwGdTCD-w7P0Oc8Wyc1ZyXe9iu9NiVWxRSc9nZsJ4FcpfyfsdWsr2Zdint0993YYlcwjhetalXITAHPv251YY5C9weU3jPga7U-Hu02_SF5N9SmM')" }}
            >
            </div>

            <div className="relative z-10 mx-auto w-full max-w-7xl">
                <div className="mb-10 max-w-3xl text-center md:text-left">
                    <h2 className="font-display text-4xl font-black leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
                        {dict.hero.title1} <br />
                        <span className="text-secondary">{dict.hero.title2}</span>
                    </h2>
                    <p className="mt-6 text-lg font-medium leading-relaxed text-gray-200 md:text-xl md:max-w-2xl">
                        {dict.hero.description}
                    </p>
                </div>

                {/* Search Bar */}
                <SearchForm dict={dict} />
            </div>
        </section>
    );
}
