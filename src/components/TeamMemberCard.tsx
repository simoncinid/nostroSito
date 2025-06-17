import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TeamMemberProps {
  member: {
    name: string;
    role: string;
    description: string;
    icon: any;
    gradient: string;
    roleGradient?: string;
    skills: string[];
    experience: string;
    projects: string;
    specialty: string;
  };
  onClick?: () => void;
}

const TeamMemberCard = ({ member, onClick }: TeamMemberProps) => {
  const { t } = useTranslation();
  
  const getImagePath = (name: string) => {
    return `/images/${name.toLowerCase()}.png`;
  };

  return (
    <>
      {/* Mobile: Card compatta */}
      <div
        className="md:hidden group relative cursor-pointer select-none"
        onClick={onClick}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <div 
          className="flex flex-col items-center justify-center relative rounded-3xl p-6 h-full overflow-hidden border border-purple-100 bg-white/80 backdrop-blur-xl shadow-xl group-hover:shadow-2xl group-active:scale-95 transition-all duration-300"
        >
          {/* Bordo animato elegante */}
          <span className="border-animated-shine absolute inset-0 z-0" />
          {/* Alone colorato animato dietro la foto */}
          <span className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-pink-400/30 via-purple-400/20 to-blue-400/10 blur-2xl animate-orb z-0" />
          <div className="relative z-10 w-full flex flex-col items-center justify-center bg-transparent">
            {/* Icona profilo con info */}
            <div className="relative mb-2">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center overflow-hidden border-4 border-purple-200 group-hover:border-purple-300 transition-all duration-300 shadow-md">
                <img
                  src={getImagePath(member.name)}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Icona info in basso a destra */}
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full border border-purple-200 shadow p-1">
                <Info size={16} className="text-purple-600" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mt-2">{member.name}</h3>
          </div>
        </div>
      </div>

      {/* Desktop: Card completa */}
      <div className="hidden md:block group relative">
        <div className="relative bg-white/80 backdrop-blur-xl border border-purple-200 rounded-3xl p-8 h-full overflow-hidden group-hover:border-purple-300 group-hover:shadow-lg transition-all duration-500">
          {/* Animated Background Gradient */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
            initial={false}
          />

          {/* Profile Image */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="relative w-32 h-32 mx-auto mb-6"
          >
            <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center overflow-hidden border-4 border-purple-200 group-hover:border-purple-300 transition-all duration-300">
              <img
                src={getImagePath(member.name)}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Info */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {member.name}
            </h3>
            <p className={`text-lg font-semibold bg-gradient-to-r ${member.roleGradient || member.gradient} bg-clip-text text-transparent mb-4`}>
              {member.role}
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              {member.description}
            </p>
          </div>

          {/* Skills */}
          <div className="text-center mb-6">
            <h4 className="text-gray-900 font-semibold mb-3">{t('about.team.labels.skills')}</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {member.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skillIndex}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="px-3 py-1 bg-purple-100 border border-purple-200 rounded-full text-purple-700 text-sm hover:bg-purple-200 transition-all duration-300"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{member.experience}</div>
              <div className="text-gray-600 text-sm">{t('about.team.labels.experience')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{member.projects}</div>
              <div className="text-gray-600 text-sm">{t('about.team.labels.projects')}</div>
            </div>
          </div>

          {/* Specialty */}
          <div className="text-center">
            <div className="text-gray-600 text-sm font-medium">{t('about.team.labels.specialty')}</div>
            <div className="text-gray-900 font-semibold">{member.specialty}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamMemberCard; 