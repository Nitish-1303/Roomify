import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Facebook, Instagram, Youtube, Linkedin, Building2 } from 'lucide-react';

const footerLinks = [
  {
    label: 'Product',
    links: [
      { title: 'Features', href: '/features' },
      { title: 'Rooms', href: '/rooms' },
      { title: 'Bookings', href: '/bookings' },
      { title: 'Analytics', href: '/analytics' },
    ],
  },
  {
    label: 'Company',
    links: [
      { title: 'FAQs', href: '/faq' },
      { title: 'About Us', href: '#about' },
      { title: 'Privacy Policy', href: '#privacy' },
      { title: 'Terms of Service', href: '#terms' },
    ],
  },
  {
    label: 'Resources',
    links: [
      { title: 'Help Center', href: '#help' },
      { title: 'Documentation', href: '#docs' },
      { title: 'API Reference', href: '#api' },
      { title: 'Support', href: '#support' },
    ],
  },
  {
    label: 'Social Links',
    links: [
      { title: 'Facebook', href: '#', icon: Facebook },
      { title: 'Instagram', href: '#', icon: Instagram },
      { title: 'Youtube', href: '#', icon: Youtube },
      { title: 'LinkedIn', href: '#', icon: Linkedin },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-3xl border-t bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-6 py-12 lg:py-16">
      <div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />
      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-8 h-8 text-white" />
            <span className="text-2xl font-bold text-white">Roomify</span>
          </div>
          <p className="text-gray-300 mt-8 text-sm md:mt-4">
            Streamline your conference room bookings with our intelligent scheduling platform.
          </p>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Roomify. All rights reserved.
          </p>
        </AnimatedContainer>
        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                  {section.label}
                </h3>
                <ul className="text-gray-300 mt-4 space-y-2 text-sm">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        className="hover:text-white inline-flex items-center transition-all duration-300"
                      >
                        {link.icon && <link.icon className="me-1 w-4 h-4" />}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </footer>
  );
}

function AnimatedContainer({ className, delay = 0.1, children }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return children;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
