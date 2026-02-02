import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'

const Stats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  const stats = [
    {
      number: 500,
      suffix: '+',
      label: 'Progetti Completati',
      description: 'Siti web e applicazioni realizzate',
      icon: '🚀'
    },
    {
      number: 150,
      suffix: '+',
      label: 'Aziende Servite',
      description: 'Dalla startup alla multinazionale',
      icon: '🏢'
    },
    {
      number: 8,
      suffix: '+',
      label: 'Anni di Esperienza',
      description: 'Nel settore digitale',
      icon: '💎'
    }
  ]

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(232,80,2,0.1)_1px,transparent_1px),linear-gradient(-45deg,rgba(232,80,2,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      <div className="container-premium relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg text-gray-900 mb-6">
            I Numeri del Nostro{' '}
            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Successo
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ogni numero racconta una storia di successo, innovazione e crescita digitale
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface StatCardProps {
  stat: {
    number: number
    suffix: string
    label: string
    description: string
    icon: string
  }
  index: number
  inView: boolean
}

const StatCard = ({ stat, index, inView }: StatCardProps) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        const duration = 2000
        const steps = 60
        const increment = stat.number / steps
        let current = 0

        const counter = setInterval(() => {
          current += increment
          if (current >= stat.number) {
            setCount(stat.number)
            clearInterval(counter)
          } else {
            setCount(Math.floor(current))
          }
        }, duration / steps)

        return () => clearInterval(counter)
      }, index * 200)

      return () => clearTimeout(timer)
    }
  }, [inView, stat.number, index])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative"
    >
      <div className="bg-white rounded-2xl p-8 shadow-premium border border-gray-100 hover:shadow-premium-lg hover:border-primary-200 transition-all duration-500 text-center group-hover:-translate-y-2">
        {/* Icon */}
        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {stat.icon}
        </div>

        {/* Number */}
        <div className="mb-4">
          <span className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
            {count}
          </span>
          <span className="text-2xl font-bold text-primary-600">
            {stat.suffix}
          </span>
        </div>

        {/* Label */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {stat.label}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm">
          {stat.description}
        </p>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      </div>
    </motion.div>
  )
}

export default Stats 