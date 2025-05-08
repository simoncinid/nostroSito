import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SpecialOffers = () => {
  const bundles = [
    {
      title: "Pacchetto Startup",
      price: "€999",
      features: [
        "Sito Web Responsive",
        "Logo Design",
        "Social Media Setup",
        "SEO Base"
      ],
      description: "Perfetto per chi inizia"
    },
    {
      title: "Pacchetto Business",
      price: "€1999",
      features: [
        "Sito Web Premium",
        "Brand Identity",
        "Social Media Management",
        "SEO Avanzato",
        "Email Marketing"
      ],
      description: "Per chi vuole crescere"
    },
    {
      title: "Pacchetto Enterprise",
      price: "€3999",
      features: [
        "E-commerce Completo",
        "Brand Strategy",
        "Social Media Strategy",
        "SEO Premium",
        "Content Marketing",
        "Analytics Setup"
      ],
      description: "Per chi vuole eccellere"
    }
  ];

  return (
    <section 
      data-scroll-section
      className="py-20 px-4 bg-dark-lighter"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-light mb-6">Offerte Speciali</h2>
          <p className="text-lg text-light-dark">
            Scopri i nostri pacchetti all-inclusive pensati per le tue esigenze
          </p>
        </motion.div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-12"
        >
          {bundles.map((bundle, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-dark p-8 rounded-xl shadow-xl border border-accent/20 hover:border-accent/50 transition-all duration-300 h-full"
              >
                <h3 className="text-2xl font-bold text-light mb-4">{bundle.title}</h3>
                <div className="text-3xl font-bold text-accent mb-6">{bundle.price}</div>
                <ul className="space-y-3 mb-6">
                  {bundle.features.map((feature, i) => (
                    <li key={i} className="text-light-dark flex items-center">
                      <span className="text-accent mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-light-dark italic mb-6">{bundle.description}</p>
                <button className="w-full bg-accent hover:bg-accent/90 text-light font-bold py-3 px-6 rounded-lg transition-all duration-300">
                  Scegli questo pacchetto
                </button>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SpecialOffers; 