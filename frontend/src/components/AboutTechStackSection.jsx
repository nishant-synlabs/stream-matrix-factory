import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const techStack = [
  {
    id: 'react',
    name: 'React',
    category: 'Frontend',
    icon: 'Layers',
    description: 'Component-driven UI architecture for seamless, reactive interfaces.',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Styling',
    icon: 'Paintbrush',
    description: 'Utility-first CSS framework for precision styling and rapid iteration.',
  },
  {
    id: 'framer',
    name: 'Framer Motion',
    category: 'Animation',
    icon: 'Zap',
    description: 'Production-grade motion library powering every fluid transition.',
  },
  {
    id: 'go',
    name: 'Go',
    category: 'Backend',
    icon: 'Server',
    description: 'High-performance server runtime for fast, reliable API delivery.',
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    category: 'Database',
    icon: 'Database',
    description: 'Robust relational database ensuring data integrity at every layer.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function AboutTechStackSection() {
  return (
    <section className="relative w-full bg-white py-20 px-4 md:px-8 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] rounded-full opacity-[0.06] blur-3xl bg-[#D4AF37]" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-[0.04] blur-2xl bg-[#D4AF37]" />
      </div>

      <div className="relative max-w-screen-xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={headingVariants}
        >
          <p
            data-imagine-id="about-tech-stack-eyebrow"
            className="font-raleway text-xs tracking-[0.22em] uppercase text-[#D4AF37] mb-3 font-semibold"
          >
            Under the Hood
          </p>
          <h2
            data-imagine-id="about-tech-stack-heading"
            className="font-cinzel text-3xl md:text-4xl font-bold tracking-wide text-[#1a1a1a] uppercase"
          >
            What Powers Nandini?
          </h2>
          <div className="mx-auto mt-5 w-14 h-[2px] bg-[#D4AF37] rounded-full" />
          <p
            data-imagine-id="about-tech-stack-subheading"
            className="font-raleway text-[#6b6b6b] text-base mt-5 max-w-xl mx-auto leading-relaxed"
          >
            A curated, modern stack built for performance, elegance, and scale — every layer chosen with intention.
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-[0_8px_40px_0_rgba(212,175,55,0.10)] border border-[#f0e8c8] p-8 md:p-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="flex flex-col divide-y divide-[#f5efd4]">
            {techStack.map((tech, idx) => {
              const TechIcon = Icons[tech?.icon] || Icons['HelpCircle'];
              return (
                <motion.div
                  key={tech?.id}
                  variants={itemVariants}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 py-7 first:pt-0 last:pb-0"
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-[#fdf8ec] border border-[#f0e8c8] shadow-[0_2px_8px_0_rgba(212,175,55,0.10)]">
                    <TechIcon size={22} color="#D4AF37" strokeWidth={1.75} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <span
                        data-imagine-id={`about-tech-stack-name-${idx}`}
                        className="font-cinzel text-[#1a1a1a] text-base font-semibold tracking-wide uppercase"
                      >
                        {tech?.name}
                      </span>
                      <span
                        data-imagine-id={`about-tech-stack-category-${idx}`}
                        className="inline-flex items-center px-3 py-0.5 rounded-full bg-[#fdf8ec] border border-[#e8d88a] text-[#b8952a] font-raleway text-xs font-semibold tracking-wide uppercase"
                      >
                        {tech?.category}
                      </span>
                    </div>
                    <p
                      data-imagine-id={`about-tech-stack-desc-${idx}`}
                      className="font-raleway text-[#7a7a7a] text-sm leading-relaxed"
                    >
                      {tech?.description}
                    </p>
                  </div>

                  <div className="hidden sm:block flex-shrink-0">
                    <motion.div
                      className="w-7 h-7 rounded-full border border-[#e8d88a] flex items-center justify-center bg-[#fdf8ec]"
                      whileHover={{ scale: 1.18, backgroundColor: '#D4AF37' }}
                      transition={{ duration: 0.18 }}
                    >
                      {(() => {
                        const ArrowIcon = Icons['ArrowRight'] || Icons['HelpCircle'];
                        return <ArrowIcon size={13} color="#D4AF37" strokeWidth={2} />;
                      })()}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={containerVariants}
        >
          {techStack.map((tech, idx) => {
            const PillIcon = Icons[tech?.icon] || Icons['HelpCircle'];
            return (
              <motion.span
                key={tech?.id}
                variants={itemVariants}
                whileHover={{ scale: 1.06, y: -2 }}
                transition={{ duration: 0.16 }}
                data-imagine-id={`about-tech-stack-pill-${idx}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#e8d88a] shadow-[0_2px_12px_0_rgba(212,175,55,0.10)] font-raleway text-sm font-medium text-[#1a1a1a] cursor-default select-none"
              >
                <PillIcon size={14} color="#D4AF37" strokeWidth={2} />
                {tech?.name}
              </motion.span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
