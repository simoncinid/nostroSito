import { motion } from 'framer-motion';

const PriceList = () => {
  const services = [
    {
      service: "Sito Web Base",
      price: "€499",
      description: "Sito web responsive con fino a 5 pagine"
    },
    {
      service: "E-commerce Base",
      price: "€999",
      description: "Negozio online con fino a 50 prodotti"
    },
    {
      service: "Logo Design",
      price: "€299",
      description: "Creazione logo professionale con 3 revisioni"
    },
    {
      service: "Social Media Management",
      price: "€399/mese",
      description: "Gestione completa dei social media"
    }
  ];

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
          <h2 className="text-4xl font-bold text-light mb-6">Listino Prezzi</h2>
          <p className="text-lg text-light-dark">
            Servizi individuali disponibili
          </p>
        </motion.div>

        <div className="grid gap-6">
          {services.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-dark-lighter p-6 rounded-lg flex justify-between items-center border border-dark-light/20 hover:border-accent/50 transition-colors duration-300"
            >
              <div>
                <h3 className="text-xl font-bold text-light">{item.service}</h3>
                <p className="text-light-dark">{item.description}</p>
              </div>
              <div className="text-2xl font-bold text-accent">{item.price}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PriceList; 