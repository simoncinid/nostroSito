import { motion } from 'framer-motion';

const About = () => {
  return (
    <section 
      data-scroll-section
      className="py-12 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-light mb-6">Chi Siamo</h2>
          <p className="text-lg text-light-dark">
            Siamo un team di professionisti appassionati di design e tecnologia,
            dedicati a creare soluzioni digitali innovative e su misura.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {['Design', 'Sviluppo', 'Innovazione'].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-dark-lighter p-6 rounded-lg shadow-lg border border-dark-light/20 hover:border-accent/50 transition-colors duration-300"
            >
              <h3 className="text-xl font-bold text-light mb-4">{item}</h3>
              <p className="text-light-dark">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About; 