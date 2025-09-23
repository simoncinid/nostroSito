import { motion } from 'framer-motion';

interface ValueCardProps {
  value: {
    title: string;
    description: string;
    icon: any;
    color: string;
  };
}

const ValueCard = ({ value }: ValueCardProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-blue-200 rounded-2xl p-8 h-full hover:border-blue-300 hover:shadow-lg transition-all duration-500 overflow-hidden">
      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
        className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-all duration-300`}
      >
        <value.icon size={32} className="text-white" />
      </motion.div>

      {/* Content */}
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
      <p className="text-gray-600 leading-relaxed">{value.description}</p>

      {/* Hover Effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}
        initial={false}
      />
    </div>
  );
};

export default ValueCard; 