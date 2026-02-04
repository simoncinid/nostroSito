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
    image?: string;
  };
  onClick?: () => void;
}

const TeamMemberCard = ({ member, onClick }: TeamMemberProps) => {
  const { t } = useTranslation();
  
  const getImagePath = (name: string) => {
    return member.image || `/images/${name.toLowerCase()}.png`;
  };

  return (
    <>
      {/* Mobile: Card compatta con info essenziali */}
      <div
        className="md:hidden group relative cursor-pointer select-none"
        onClick={onClick}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <div 
          className="flex flex-col items-center justify-between relative rounded-3xl p-4 h-full overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl group-hover:shadow-2xl group-hover:border-primary-400/30 group-active:scale-95 transition-all duration-300"
        >
          {/* Bordo animato elegante */}
          <span className="border-animated-shine absolute inset-0 z-0" />
          {/* Alone colorato animato dietro la foto */}
          <span className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-primary-400/30 via-primary-400/20 to-primary-400/10 blur-2xl animate-orb z-0" />
          
          <div className="relative z-10 w-full flex flex-col items-center justify-between h-full">
            {/* Sezione superiore: Foto e nome */}
            <div className="flex flex-col items-center">
              {/* Icona profilo con info */}
              <div className="relative mb-3">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full flex items-center justify-center overflow-hidden border-3 border-white/20 group-hover:border-primary-400/50 transition-all duration-300 shadow-md">
                  <img
                    src={getImagePath(member.name)}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Icona info in basso a destra */}
                <div className="absolute -bottom-1 -right-1 bg-white/10 rounded-full border border-white/20 shadow p-1">
                  <Info size={12} className="text-primary-400" />
                </div>
              </div>
              <h3 className="text-base font-bold text-white text-center mb-1">{member.name}</h3>
              <p className={`text-sm font-medium bg-gradient-to-r ${member.roleGradient || member.gradient} bg-clip-text text-transparent text-center leading-tight`}>
                {member.role}
              </p>
            </div>

            {/* Sezione centrale: Skills principali */}
            <div className="flex flex-wrap justify-center gap-1 mb-2">
              {member.skills.slice(0, 3).map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="px-2 py-1 bg-primary-500/20 border border-primary-400/30 rounded-full text-primary-300 text-xs"
                >
                  {skill}
                </span>
              ))}
              {member.skills.length > 3 && (
                <span className="px-2 py-1 bg-white/10 border border-white/20 rounded-full text-gray-400 text-xs">
                  +{member.skills.length - 3}
                </span>
              )}
            </div>

            {/* Sezione inferiore: Stats */}
            <div className="flex justify-between w-full text-center">
              <div className="flex-1">
                <div className="text-sm font-bold text-white">{member.experience}</div>
                <div className="text-xs text-gray-400">{t('about.team.labels.experience')}</div>
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white">{member.projects}</div>
                <div className="text-xs text-gray-400">{t('about.team.labels.projects')}</div>
              </div>
            </div>

            {/* Indicatore per espandere */}
            <div className="mt-4 text-xs text-primary-400 font-medium">
              {t('about.team.labels.tapForMore')}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Card completa */}
      <div className="hidden md:block group relative">
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 h-full overflow-hidden group-hover:border-primary-400/30 group-hover:shadow-lg transition-all duration-500">
          {/* Animated Background Gradient */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
            initial={false}
          />

          {/* Profile Image */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="relative w-28 h-28 mx-auto mb-4"
          >
            <div className="w-full h-full bg-gradient-to-br from-gray-500 to-gray-700 rounded-full flex items-center justify-center overflow-hidden border-4 border-white/20 group-hover:border-primary-400/50 transition-all duration-300">
              <img
                src={getImagePath(member.name)}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Info */}
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-white mb-1">
              {member.name}
            </h3>
            <p className={`text-base font-semibold bg-gradient-to-r ${member.roleGradient || member.gradient} bg-clip-text text-transparent mb-6`}>
              {member.role}
            </p>
            <p className="text-gray-300 leading-relaxed mb-6 text-sm">
              {member.description}
            </p>
          </div>

          {/* Skills */}
          <div className="text-center mb-4">
            <h4 className="text-white font-semibold mb-2 text-sm">{t('about.team.labels.skills')}</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {member.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skillIndex}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="px-3 py-1 bg-primary-500/20 border border-primary-400/30 rounded-full text-primary-300 text-sm hover:bg-primary-500/30 transition-all duration-300"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-white">{member.experience}</div>
              <div className="text-gray-400 text-xs">{t('about.team.labels.experience')}</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white">{member.projects}</div>
              <div className="text-gray-400 text-xs">{t('about.team.labels.projects')}</div>
            </div>
          </div>

          {/* Specialty */}
          <div className="text-center">
            <div className="text-gray-400 text-xs font-medium">{t('about.team.labels.specialty')}</div>
            <div className="text-white font-semibold text-sm">{member.specialty}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamMemberCard; 