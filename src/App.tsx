/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  BookOpen, 
  ShieldCheck, 
  Zap, 
  Users, 
  ChevronRight, 
  Menu, 
  X,
  Code2,
  Github,
  ArrowUpRight,
  Plus,
  Lightbulb,
  Clock,
  CreditCard,
  Database,
  FileText,
  WifiOff,
  BrainCircuit,
  Flag,
  Sparkles,
  Globe,
  Lock,
  ExternalLink,
  ChevronDown,
  Twitter,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge as ShadcnBadge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

// --- Types ---

interface Project {
  id: string;
  title: string;
  description: string;
  sector: 'Education' | 'Government' | 'Health' | 'Admin' | 'Other';
  githubUrl?: string;
  status: 'Active' | 'Beta' | 'Concept';
  tags: string[];
}

// --- Mock Data ---
const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'UniERP-SA',
    description: 'A student lifecycle management system built specifically for South African public universities with native HEMIS reporting.',
    sector: 'Education',
    status: 'Beta',
    tags: ['React', 'Node.js', 'PostgreSQL', 'HEMIS'],
    githubUrl: 'https://github.com/os4sa/unierp-sa'
  },
  {
    id: '2',
    title: 'MuniBilling',
    description: 'MIOS-compliant billing and rates system for smaller municipalities that cannot afford enterprise proprietary software.',
    sector: 'Government',
    status: 'Concept',
    tags: ['Python', 'Django', 'MIOS'],
    githubUrl: 'https://github.com/os4sa/munibilling'
  },
  {
    id: '3',
    title: 'ClinicFlow',
    description: 'Lightweight, offline-capable patient records for primary healthcare clinics in rural areas.',
    sector: 'Health',
    status: 'Active',
    tags: ['PWA', 'SQLite', 'React'],
    githubUrl: 'https://github.com/os4sa/clinicflow'
  }
];

const GAPS = [
  { icon: <Database className="w-5 h-5" />, title: "Student Record Interchange", desc: "No portable, open schema for a South African student's academic history across institutions.", size: "large" },
  { icon: <CreditCard className="w-5 h-5" />, title: "NSFAS Data Exchange API", desc: "NSFAS integration is institution-specific and closed. An open API contract would benefit every HEI.", size: "small" },
  { icon: <Globe className="w-5 h-5" />, title: "Municipal Service Requests", desc: "No agreed schema for service delivery requests across 257 municipalities.", size: "small" },
  { icon: <FileText className="w-5 h-5" />, title: "NPO Compliance Format", desc: "The DSD manages 200,000+ NPOs with manual, inconsistent reporting.", size: "small" },
  { icon: <Users className="w-5 h-5" />, title: "HEMIS Open Schema", desc: "The data dictionary should be a publicly maintained open schema with validation tooling.", size: "small" },
  { icon: <BookOpen className="w-5 h-5" />, title: "PAIA Request Tracking", desc: "Departments are legally obligated to process requests but lack standard tooling.", size: "full" }
];

const REALITIES = [
  { icon: <Clock className="w-5 h-5" />, title: "Procurement is slow", desc: "Cycles run 18–36 months. Design your business to survive without government revenue for longer than feels reasonable." },
  { icon: <CreditCard className="w-5 h-5" />, title: "Payment is unreliable", desc: "60–90 day payment is common despite the 30-day legal requirement. Recurring revenue is preferable." },
  { icon: <Users className="w-5 h-5" />, title: "BBBEE is a constraint", desc: "Structuring your entity correctly from incorporation is far easier than retrofitting later." },
  { icon: <Lightbulb className="w-5 h-5" />, title: "Change is 80% of it", desc: "The hardest part is the registrar who has used the same screens for 15 years. Budget for training." },
  { icon: <Database className="w-5 h-5" />, title: "Legacy data is messy", desc: "ITS, PeopleSoft, and SAP carry decades of inconsistent data." },
  { icon: <WifiOff className="w-5 h-5" />, title: "Infrastructure limits", desc: "Offline resilience and graceful degradation are baseline requirements for the SA context." }
];

// --- Components ---

const StripeAccent = ({ className = "" }: { className?: string }) => (
  <div className={`flex h-1 w-16 overflow-hidden rounded-full ${className}`}>
    <div className="h-full w-1/4 bg-stripe-green" />
    <div className="h-full w-1/4 bg-stripe-gold" />
    <div className="h-full w-1/4 bg-stripe-red" />
    <div className="h-full w-1/4 bg-stripe-blue" />
  </div>
);

const Badge = ({ children, variant = 'default', className = "" }: { children: React.ReactNode, variant?: 'default' | 'gold' | 'green', className?: string }) => {
  const variants = {
    default: 'bg-white/5 text-white/60 border-white/10',
    gold: 'bg-os4sa-gold/10 text-os4sa-gold border-os4sa-gold/20',
    green: 'bg-stripe-green/10 text-stripe-green border-stripe-green/20'
  };
  
  return (
    <ShadcnBadge variant="outline" className={cn("rounded-full text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1", variants[variant], className)}>
      {children}
    </ShadcnBadge>
  );
};

const GridWrapper = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`relative border-grid max-w-7xl mx-auto md:border-x ${className}`}>
    {/* Plus Markers at corners - only visible on desktop/tablet where borders meet */}
    <div className="hidden md:block plus-marker -top-[6px] -left-[6px]" />
    <div className="hidden md:block plus-marker -top-[6px] -right-[6px]" />
    <div className="hidden md:block plus-marker -bottom-[6px] -left-[6px]" />
    <div className="hidden md:block plus-marker -bottom-[6px] -right-[6px]" />
    {children}
  </div>
);

const SectionHeader = ({ badge, title, subtitle, centered = false }: { badge: string, title: string, subtitle: string, centered?: boolean }) => (
  <div className={`mb-12 md:mb-20 ${centered ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'}`}>
    <Badge variant="gold">{badge}</Badge>
    <h2 className="mt-4 text-3xl md:text-6xl font-display font-bold tracking-tight leading-tight md:leading-none">{title}</h2>
    <p className="mt-4 md:mt-6 text-os4sa-muted text-base md:text-lg leading-relaxed">{subtitle}</p>
  </div>
);

const BentoCard = ({ children, className = "", delay = 0, noPadding = false }: { children: React.ReactNode, className?: string, delay?: number, noPadding?: boolean, key?: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={cn(
      "bg-[#0f0f0f] rounded-3xl relative overflow-hidden group border border-white/[0.05] transition-all duration-500 hover:border-white/[0.12] hover:bg-[#121212] hover:shadow-[0_0_40px_rgba(0,0,0,0.5)]",
      !noPadding && "p-8",
      className
    )}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-os4sa-gold/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="relative z-10 h-full flex flex-col">
      {children}
    </div>
  </motion.div>
);

const ProjectCard = ({ project, delay }: { project: Project, delay: number, key?: any }) => (
  <BentoCard delay={delay} noPadding className="flex flex-col h-full bg-white/[0.02]">
    <Card className="bg-transparent border-none shadow-none ring-0 h-full flex flex-col rounded-none py-0">
      <CardHeader className="p-8 pb-0">
        <div className="flex justify-between items-start mb-6">
          <Badge variant="gold">{project.sector}</Badge>
          <Badge variant={project.status === 'Active' ? 'green' : project.status === 'Beta' ? 'gold' : 'default'}>
            {project.status}
          </Badge>
        </div>
        <CardTitle className="text-2xl font-display font-bold mb-3 group-hover:text-os4sa-gold transition-colors text-white">
          {project.title}
        </CardTitle>
        <CardDescription className="text-os4sa-muted text-sm leading-relaxed">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-6 flex-grow">
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="text-[9px] font-mono text-white/30 border border-white/5 px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-8 pt-0 border-none bg-transparent">
        {project.githubUrl && (
          <Button variant="link" asChild className="p-0 h-auto text-white/60 hover:text-os4sa-gold group/link">
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest"
            >
              <Github className="w-4 h-4" />
              View Source
              <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  </BentoCard>
);

// --- Sections ---

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center items-center px-6 pt-20 text-center overflow-hidden border-b border-grid">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />
      
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-os4sa-gold/10 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div 
        style={{ y: y1, opacity }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-4xl"
      >
        <Badge variant="gold">Open Source South Africa</Badge>
        
        <h1 className="mt-8 text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-display font-bold tracking-tighter leading-[0.9] md:leading-[0.85]">
          <span className="text-gradient">Building for</span> <br />
          <span className="text-os4sa-gold">the Public <br className="sm:hidden" /> Good.</span>
        </h1>
        
        <p className="mt-8 text-base md:text-xl text-os4sa-muted max-w-2xl mx-auto leading-relaxed">
          The ecosystem for open source software and standards in South Africa. 
          Empowering citizens through interoperable, locally-built infrastructure.
        </p>
        
        <div className="mt-10 md:mt-12 flex flex-col sm:flex-row justify-center gap-4 px-4">
          <Button asChild size="lg" className="bg-white text-os4sa-bg hover:bg-os4sa-gold rounded-full px-8 py-6 md:py-7 font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all hover:scale-105 active:scale-95 w-full sm:w-auto">
            <a href="#projects" className="flex items-center justify-center gap-2">
              EXPLORE ECOSYSTEM
              <ChevronRight className="w-4 h-4" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="glass border-white/10 hover:bg-white/10 rounded-full px-8 py-6 md:py-7 font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all w-full sm:w-auto">
            <a href="#guide" className="flex items-center justify-center">
              THE GUIDE
            </a>
          </Button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/20">Scroll to explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-os4sa-gold/50 to-transparent" />
      </motion.div>
    </section>
  );
};

const ProjectsEcosystem = () => {
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  
  return (
    <section id="projects" className="py-20 md:py-32 px-4 md:px-12 border-b border-grid">
      <GridWrapper>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12 md:mb-20 px-4 md:px-8">
          <SectionHeader 
            badge="Active Projects"
            title="Ecosystem"
            subtitle="A growing directory of MIOS-compliant, open-source solutions for South African institutions."
          />
          <Button variant="outline" className="glass border-white/10 hover:bg-white/10 rounded-full px-6 py-6 flex items-center gap-2 text-white/80 font-mono uppercase tracking-widest text-[10px] transition-all mb-12 md:mb-20 w-full md:w-auto justify-center">
            <Plus className="w-3 h-3" />
            Submit Project
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 md:px-8 pb-12 md:pb-20">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 0.1} />
          ))}
        </div>
      </GridWrapper>
    </section>
  );
};

const BentoGridSection = ({ title, subtitle, items, badge, id }: { title: string, subtitle: string, items: any[], badge: string, id?: string }) => (
  <section id={id} className="py-20 md:py-32 px-4 md:px-12 border-b border-grid">
    <GridWrapper>
      <div className="px-4 md:px-8">
        <SectionHeader 
          badge={badge}
          title={title}
          subtitle={subtitle}
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-6 pb-12 md:pb-20">
          {items.map((item, i) => (
            <BentoCard 
              key={i} 
              delay={i * 0.05}
              noPadding
              className={cn(
                "min-h-[240px] md:min-h-[280px] flex flex-col justify-between p-6 md:p-8 lg:p-10",
                item.size === 'full' ? 'lg:col-span-6 md:col-span-2' :
                item.size === 'large' ? 'lg:col-span-4 md:col-span-2' : 
                'lg:col-span-2 md:col-span-1'
              )}
            >
              <div>
                {item.icon && <div className="text-os4sa-gold mb-6">{item.icon}</div>}
                <h3 className="text-xl md:text-2xl font-display font-bold mb-4">{item.title}</h3>
                <p className="text-os4sa-muted text-sm md:text-base leading-relaxed max-w-xl">{item.desc}</p>
              </div>
              <div className="mt-8 flex justify-end">
                <div className="w-12 h-px bg-white/5 group-hover:w-16 group-hover:bg-os4sa-gold/30 transition-all duration-500" />
              </div>
            </BentoCard>
          ))}
        </div>
      </div>
    </GridWrapper>
  </section>
);

const TheGuide = () => (
  <section id="guide" className="py-20 md:py-32 px-6 md:px-12 relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-stripe-blue/5 blur-[150px] rounded-full pointer-events-none" />
    
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-center lg:text-left"
      >
        <Badge variant="gold">Foundational Resource</Badge>
        <h2 className="mt-4 text-3xl md:text-6xl font-display font-bold tracking-tight mb-6 md:mb-8">The Practitioner's <br /> Guide</h2>
        <p className="text-base md:text-xl text-os4sa-muted leading-relaxed mb-8 md:mb-10">
          A comprehensive framework for South African developers and civic technologists building software that serves government and citizens.
        </p>
        
        <div className="grid grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-12">
          {[
            { icon: <Globe className="w-4 h-4" />, text: "MIOS Standards", color: "text-stripe-gold" },
            { icon: <Lock className="w-4 h-4" />, text: "POPIA Compliance", color: "text-stripe-red" },
            { icon: <Users className="w-4 h-4" />, text: "Institutional Buy-in", color: "text-stripe-green" },
            { icon: <Sparkles className="w-4 h-4" />, text: "Open Governance", color: "text-stripe-blue" }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-center lg:justify-start gap-3 text-white/60">
              <div className={`${item.color}`}>{item.icon}</div>
              <span className="text-[10px] font-mono uppercase tracking-widest">{item.text}</span>
            </div>
          ))}
        </div>
 
        <Button asChild size="lg" className="bg-white text-os4sa-bg hover:bg-os4sa-gold rounded-full px-10 py-6 md:py-8 font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all flex items-center gap-3 mx-auto lg:mx-0">
          <a 
            href="https://drive.google.com/file/d/1s2lqJ5Rmmow66m2BUCYpy46q468kLHA2/view?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3"
          >
            <BookOpen className="w-4 h-4" />
            Download PDF Guide
          </a>
        </Button>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative max-w-md mx-auto lg:max-w-none"
      >
        <div className="absolute -inset-10 bg-os4sa-gold/10 blur-3xl rounded-full animate-pulse" />
        <div className="relative glass p-2 rounded-3xl shadow-2xl">
          <div className="bg-os4sa-bg p-8 md:p-16 aspect-[3/4] flex flex-col justify-between border border-white/5 rounded-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-os4sa-gold/5 blur-2xl rounded-full" />
            <div>
              <h3 className="text-3xl md:text-5xl font-display font-bold mb-4">OS<span className="text-os4sa-gold">4</span>SA</h3>
              <p className="text-[8px] md:text-[10px] font-mono text-white/30 uppercase tracking-[0.5em]">Practitioner's Guide v1.0</p>
            </div>
            <div className="space-y-4 md:space-y-6">
              <div className="h-1 md:h-1.5 w-full bg-white/5 rounded-full" />
              <div className="h-1 md:h-1.5 w-4/5 bg-white/5 rounded-full" />
              <div className="h-1 md:h-1.5 w-full bg-white/5 rounded-full" />
              <div className="h-1 md:h-1.5 w-3/4 bg-white/5 rounded-full" />
            </div>
            <div className="flex justify-between items-end">
              <StripeAccent className="w-16 md:w-24 h-1.5 md:h-2" />
              <span className="text-[6px] md:text-[8px] font-mono text-white/20 uppercase tracking-widest">South Africa</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const Principles = () => {
  const principles = [
    "Go deep before going wide.",
    "Find institutional champions.",
    "Design for South African infrastructure.",
    "Publish your standards openly.",
    "Price for the SMME reality.",
    "SA patriotism is a real competitive moat.",
    "Compliance is the floor, not the ceiling.",
    "Build lean enough to survive procurement.",
    "The country needs this. That matters."
  ];

  return (
    <section id="principles" className="py-20 md:py-32 px-6 md:px-12 bg-white text-os4sa-bg rounded-[32px] md:rounded-[80px] mx-4 md:mx-8 my-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <Badge variant="gold">Our Philosophy</Badge>
          <h2 className="mt-4 text-3xl md:text-6xl font-display font-bold tracking-tight">The Principles</h2>
          <p className="mt-4 text-os4sa-bg/60 text-base md:text-lg max-w-2xl mx-auto md:mx-0">Distilled from the realities of building for South African government.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 md:gap-x-16 md:gap-y-16">
          {principles.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-6 md:gap-8 items-start group"
            >
              <span className="font-mono text-os4sa-gold font-bold text-2xl md:text-3xl opacity-20 group-hover:opacity-100 transition-opacity">{(i + 1).toString().padStart(2, '0')}</span>
              <p className="text-xl md:text-2xl font-display font-semibold leading-tight">{p}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-16 md:py-24 px-6 md:px-12 border-t border-white/5 bg-os4sa-bg">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
      <div className="sm:col-span-2">
        <h2 className="text-3xl font-display font-bold mb-6">OS<span className="text-os4sa-gold">4</span>SA</h2>
        <p className="text-os4sa-muted max-w-sm mb-8 md:mb-10 leading-relaxed text-sm">
          A community-led initiative to foster open source software and standards that serve South African public institutions and citizens.
        </p>
        <div className="flex items-center gap-6">
          <StripeAccent className="w-20 h-1.5" />
          <div className="flex items-center gap-2 text-white/20 text-[10px] font-mono uppercase tracking-[0.3em]">
            <Flag className="w-3 h-3 text-stripe-red/50" />
            Made in South Africa
          </div>
        </div>
      </div>
      
      <div className="flex flex-col">
        <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-os4sa-gold mb-6 md:mb-8">Navigation</h4>
        <div className="flex flex-col gap-4 text-xs font-mono uppercase tracking-widest text-white/60">
          <a href="#projects" className="hover:text-white transition-colors">Ecosystem</a>
          <a href="#guide" className="hover:text-white transition-colors">The Guide</a>
          <a href="#principles" className="hover:text-white transition-colors">Philosophy</a>
          <a href="https://github.com/os4sa" className="flex items-center gap-2 hover:text-white transition-colors">
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>
      </div>

      <div className="flex flex-col">
        <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-os4sa-gold mb-6 md:mb-8">Legal</h4>
        <div className="flex flex-col gap-4 text-xs font-mono uppercase tracking-widest text-white/60">
          <p>© 2026 OS4SA</p>
          <p>CC BY-SA 4.0</p>
          <p className="text-[9px] leading-relaxed opacity-50">Not affiliated with DPSA, SITA, or any government department.</p>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Ecosystem', href: '#projects' },
    { name: 'The Guide', href: '#guide' },
    { name: 'Philosophy', href: '#principles' },
  ];

  return (
    <div className="dark min-h-screen bg-os4sa-bg text-white selection:bg-os4sa-gold/30 selection:text-white">
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "bg-os4sa-bg/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex justify-between items-center w-full">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-display font-bold tracking-tighter">
              OS<span className="text-os4sa-gold">4</span>SA
            </span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.name}>
                    <NavigationMenuLink 
                      href={link.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                      )}
                    >
                      {link.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <Button className="bg-white text-os4sa-bg px-6 py-2 rounded-full font-bold hover:bg-os4sa-gold transition-all hover:scale-105 active:scale-95">
              Join Us
            </Button>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white p-2 glass rounded-full">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" showCloseButton={false} className="bg-os4sa-bg border-white/10 text-white p-0 overflow-hidden flex flex-col">
                <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-os4sa-gold/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                
                <SheetHeader className="p-8 pb-4 text-left relative z-10 flex flex-row items-center justify-between">
                  <SheetTitle className="text-white font-display text-2xl font-bold tracking-tighter">
                    OS<span className="text-os4sa-gold">4</span>SA
                  </SheetTitle>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="text-white/40 hover:text-white hover:bg-white/10 rounded-full">
                      <X size={20} />
                    </Button>
                  </SheetClose>
                </SheetHeader>

                <div className="flex-1 flex flex-col p-8 pt-4 relative z-10">
                  <div className="flex flex-col gap-2">
                    {navLinks.map((link, i) => (
                      <motion.a 
                        key={link.name} 
                        href={link.href} 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group flex items-center justify-between py-4 border-b border-white/5 text-xl font-display font-medium text-white/60 hover:text-white transition-all"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span>{link.name}</span>
                        <ChevronRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-os4sa-gold" />
                      </motion.a>
                    ))}
                  </div>

                  <div className="mt-12 space-y-6">
                    <Button className="bg-white text-os4sa-bg hover:bg-os4sa-gold rounded-full w-full py-7 font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2">
                      Join the Ecosystem
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                    
                    <div className="flex items-center justify-center gap-8 pt-4">
                      <a href="https://github.com/os4sa" className="text-white/40 hover:text-white transition-colors">
                        <Github className="w-6 h-6" />
                      </a>
                      <a href="#" className="text-white/40 hover:text-white transition-colors">
                        <Twitter className="w-6 h-6" />
                      </a>
                      <a href="#" className="text-white/40 hover:text-white transition-colors">
                        <Mail className="w-6 h-6" />
                      </a>
                    </div>
                  </div>

                  <div className="mt-auto pt-10 flex flex-col items-center gap-4">
                    <StripeAccent className="w-32 h-2 opacity-50" />
                    <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">Made in South Africa</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        
        <ProjectsEcosystem />
        
        <BentoGridSection 
          badge="Infrastructure Gaps"
          title="The Missing Links"
          subtitle="Critical technical infrastructure that South Africa needs the community to build."
          items={GAPS}
        />

        <BentoGridSection 
          badge="Builder's Reality"
          title="The Hard Truths"
          subtitle="Non-technical constraints that define the success of civic technology in SA."
          items={REALITIES}
        />

        <TheGuide />
        
        <Principles />
        
        <section className="py-24 md:py-40 px-6 md:px-12 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-os4sa-gold/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Badge variant="gold">Get Involved</Badge>
            <h2 className="mt-8 text-4xl md:text-7xl font-display font-bold tracking-tight mb-8 leading-[1.1]">
              Build software that <br />
              <span className="text-os4sa-gold">actually matters.</span>
            </h2>
            <p className="text-os4sa-muted text-base md:text-xl mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed">
              Whether you are a developer, a founder, or a civic technologist, there is a place for you in the OS4SA ecosystem.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="bg-white text-os4sa-bg hover:bg-os4sa-gold rounded-full px-10 py-6 md:py-8 font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all hover:scale-105 active:scale-95 flex items-center gap-3 w-full sm:w-auto justify-center">
                Join the Ecosystem
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
