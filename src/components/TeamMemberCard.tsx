import { motion } from 'framer-motion';

interface TeamMemberProps {
  member: {
    name: string;
    role: string;
    description: string;
    icon: any;
    gradient: string;
    skills: string[];
    experience: string;
    projects: string;
    specialty: string;
  };
}

const TeamMemberCard = ({ member }: TeamMemberProps) => {
  return (
    <div className="group relative">
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
            <member.icon size={48} className="text-white" />
          </div>
        </motion.div>

        {/* Info */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {member.name}
          </h3>
          <p className={`text-lg font-semibold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent mb-4`}>
            {member.role}
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            {member.description}
          </p>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h4 className="text-gray-900 font-semibold mb-3">Competenze:</h4>
          <div className="flex flex-wrap gap-2">
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
            <div className="text-gray-600 text-sm">Esperienza</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{member.projects}</div>
            <div className="text-gray-600 text-sm">Progetti</div>
          </div>
        </div>

        {/* Specialty */}
        <div className="text-center">
          <div className="text-gray-600 text-sm font-medium">Specialità:</div>
          <div className="text-gray-900 font-semibold">{member.specialty}</div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard; 