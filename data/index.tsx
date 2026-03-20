import React from 'react';
import {
  Database,
  CreditCard,
  Globe,
  FileText,
  Users,
  BookOpen,
  Clock,
  Lightbulb,
  WifiOff,
} from 'lucide-react';
import type { Project, GapItem, RealityItem, NavLink } from '../types';

// ─── Navigation ──────────────────────────────────────────────────────────────

export const NAV_LINKS: NavLink[] = [
  { name: 'Ecosystem', href: '#projects' },
  { name: 'The Guide', href: '#guide' },
  { name: 'Philosophy', href: '#principles' },
];

// ─── Projects ────────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Gradiate',
    description:
      'A student lifecycle management system built specifically for South African public universities with native HEMIS reporting.',
    sector: 'Education',
    status: 'Beta',
    tags: ['React', 'Node.js', 'PostgreSQL', 'HEMIS'],
    githubUrl: 'https://github.com/os4sa/gradiate',
  },
  {
    id: '2',
    title: 'MuniBilling',
    description:
      'MIOS-compliant billing and rates system for smaller municipalities that cannot afford enterprise proprietary software.',
    sector: 'Government',
    status: 'Concept',
    tags: ['Python', 'Django', 'MIOS'],
    githubUrl: 'https://github.com/os4sa/munibilling',
  },
  {
    id: '3',
    title: 'ClinicFlow',
    description:
      'Lightweight, offline-capable patient records for primary healthcare clinics in rural areas.',
    sector: 'Health',
    status: 'Active',
    tags: ['PWA', 'SQLite', 'React'],
    githubUrl: 'https://github.com/os4sa/clinicflow',
  },
];

// ─── Infrastructure Gaps ─────────────────────────────────────────────────────

export const GAPS: GapItem[] = [
  {
    icon: <Database className="w-5 h-5" />,
    title: 'Student Record Interchange',
    desc: "No portable, open schema for a South African student's academic history across institutions.",
    size: 'large',
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    title: 'NSFAS Data Exchange API',
    desc: 'NSFAS integration is institution-specific and closed. An open API contract would benefit every HEI.',
    size: 'small',
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: 'Municipal Service Requests',
    desc: 'No agreed schema for service delivery requests across 257 municipalities.',
    size: 'small',
  },
  {
    icon: <FileText className="w-5 h-5" />,
    title: 'NPO Compliance Format',
    desc: 'The DSD manages 200,000+ NPOs with manual, inconsistent reporting.',
    size: 'small',
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: 'HEMIS Open Schema',
    desc: 'The data dictionary should be a publicly maintained open schema with validation tooling.',
    size: 'small',
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: 'PAIA Request Tracking',
    desc: 'Departments are legally obligated to process requests but lack standard tooling.',
    size: 'full',
  },
];

// ─── Builder Realities ───────────────────────────────────────────────────────

export const REALITIES: RealityItem[] = [
  {
    icon: <Clock className="w-5 h-5" />,
    title: 'Procurement is slow',
    desc: 'Cycles run 18–36 months. Design your business to survive without government revenue for longer than feels reasonable.',
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    title: 'Payment is unreliable',
    desc: '60–90 day payment is common despite the 30-day legal requirement. Recurring revenue is preferable.',
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: 'BBBEE is a constraint',
    desc: 'Structuring your entity correctly from incorporation is far easier than retrofitting later.',
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: 'Change is 80% of it',
    desc: 'The hardest part is the registrar who has used the same screens for 15 years. Budget for training.',
  },
  {
    icon: <Database className="w-5 h-5" />,
    title: 'Legacy data is messy',
    desc: 'ITS, PeopleSoft, and SAP carry decades of inconsistent data.',
  },
  {
    icon: <WifiOff className="w-5 h-5" />,
    title: 'Infrastructure limits',
    desc: 'Offline resilience and graceful degradation are baseline requirements for the SA context.',
  },
];

// ─── Principles ──────────────────────────────────────────────────────────────

export const PRINCIPLES: string[] = [
  'Go deep before going wide.',
  'Find institutional champions.',
  'Design for South African infrastructure.',
  'Publish your standards openly.',
  'Price for the SMME reality.',
  'SA patriotism is a real competitive moat.',
  'Compliance is the floor, not the ceiling.',
  'Build lean enough to survive procurement.',
  'The country needs this. That matters.',
];