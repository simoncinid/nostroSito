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
          className="flex flex-col items-center justify-between relative rounded-3xl p-4 h-full overflow-hidden border border-primary-100 bg-white/80 backdrop-blur-xl shadow-xl group-hover:shadow-2xl group-active:scale-95 transition-all duration-300"
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
                <div className="w-14 h-14 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center overflow-hidden border-3 border-primary-200 group-hover:border-primary-300 transition-all duration-300 shadow-md">
                  <img
                    src={getImagePath(member.name)}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Icona info in basso a destra */}
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full border border-primary-200 shadow p-1">
                  <Info size={12} className="text-primary-600" />
                </div>
              </div>
              <h3 className="text-base font-bold text-gray-900 text-center mb-1">{member.name}</h3>
              <p className={`text-sm font-medium bg-gradient-to-r ${member.roleGradient || member.gradient} bg-clip-text text-transparent text-center leading-tight`}>
                {member.role}
              </p>
            </div>

            {/* Sezione centrale: Skills principali */}
            <div className="flex flex-wrap justify-center gap-1 mb-2">
              {member.skills.slice(0, 3).map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="px-2 py-1 bg-primary-100 border border-primary-200 rounded-full text-primary-700 text-xs"
                >
                  {skill}
                </span>
              ))}
              {member.skills.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 border border-gray-200 rounded-full text-gray-600 text-xs">
                  +{member.skills.length - 3}
                </span>
              )}
            </div>

            {/* Sezione inferiore: Stats */}
            <div className="flex justify-between w-full text-center">
              <div className="flex-1">
                <div className="text-sm font-bold text-gray-900">{member.experience}</div>
                <div className="text-xs text-gray-600">{t('about.team.labels.experience')}</div>
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-gray-900">{member.projects}</div>
                <div className="text-xs text-gray-600">{t('about.team.labels.projects')}</div>
              </div>
            </div>

            {/* Indicatore per espandere */}
            <div className="mt-4 text-xs text-primary-600 font-medium">
              {t('about.team.labels.tapForMore')}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Card completa */}
      <div className="hidden md:block group relative">
        <div className="relative bg-white/80 backdrop-blur-xl border border-primary-200 rounded-3xl p-6 h-full overflow-hidden group-hover:border-primary-300 group-hover:shadow-lg transition-all duration-500">
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
            <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center overflow-hidden border-4 border-primary-200 group-hover:border-primary-300 transition-all duration-300">
              <img
                src={getImagePath(member.name)}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Info */}
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {member.name}
            </h3>
            <p className={`text-base font-semibold bg-gradient-to-r ${member.roleGradient || member.gradient} bg-clip-text text-transparent mb-6`}>
              {member.role}
            </p>
            <p className="text-gray-600 leading-relaxed mb-6 text-sm">
              {member.description}
            </p>
          </div>

          {/* Skills */}
          <div className="text-center mb-4">
            <h4 className="text-gray-900 font-semibold mb-2 text-sm">{t('about.team.labels.skills')}</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {member.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skillIndex}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="px-3 py-1 bg-primary-100 border border-primary-200 rounded-full text-primary-700 text-sm hover:bg-primary-200 transition-all duration-300"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{member.experience}</div>
              <div className="text-gray-600 text-xs">{t('about.team.labels.experience')}</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{member.projects}</div>
              <div className="text-gray-600 text-xs">{t('about.team.labels.projects')}</div>
            </div>
          </div>

          {/* Specialty */}
          <div className="text-center">
            <div className="text-gray-600 text-xs font-medium">{t('about.team.labels.specialty')}</div>
            <div className="text-gray-900 font-semibold text-sm">{member.specialty}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamMemberCard; 