import React from 'react';
import { motion } from 'motion/react';
import { Badge as ShadcnBadge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { BadgeVariant } from '../../types';

// ─── StripeAccent ─────────────────────────────────────────────────────────────
// SA-flag–inspired four-segment colour bar used as a decorative accent.

interface StripeAccentProps {
  className?: string;
}

export const StripeAccent = ({ className = '' }: StripeAccentProps) => (
  <div className={`flex h-1 w-16 overflow-hidden rounded-full ${className}`}>
    <div className="h-full w-1/4 bg-stripe-green" />
    <div className="h-full w-1/4 bg-stripe-gold" />
    <div className="h-full w-1/4 bg-stripe-red" />
    <div className="h-full w-1/4 bg-stripe-blue" />
  </div>
);

// ─── Badge ────────────────────────────────────────────────────────────────────
// Thin pill badge with three flavour variants.

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const BADGE_VARIANTS: Record<BadgeVariant, string> = {
  default: 'bg-white/5 text-white/60 border-white/10',
  gold:    'bg-os4sa-gold/10 text-os4sa-gold border-os4sa-gold/20',
  green:   'bg-stripe-green/10 text-stripe-green border-stripe-green/20',
};

export const Badge = ({ children, variant = 'default', className = '' }: BadgeProps) => (
  <ShadcnBadge
    variant="outline"
    className={cn(
      'rounded-full text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1',
      BADGE_VARIANTS[variant],
      className,
    )}
  >
    {children}
  </ShadcnBadge>
);

// ─── GridWrapper ──────────────────────────────────────────────────────────────
// Centred max-width container with optional grid-line borders and plus markers.

interface GridWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const GridWrapper = ({ children, className = '' }: GridWrapperProps) => (
  <div className={`relative border-grid max-w-7xl mx-auto md:border-x ${className}`}>
    <div className="hidden md:block plus-marker -top-[6px] -left-[6px]" />
    <div className="hidden md:block plus-marker -top-[6px] -right-[6px]" />
    <div className="hidden md:block plus-marker -bottom-[6px] -left-[6px]" />
    <div className="hidden md:block plus-marker -bottom-[6px] -right-[6px]" />
    {children}
  </div>
);

// ─── SectionHeader ────────────────────────────────────────────────────────────
// Consistent badge → headline → subtitle pattern used in every section.

interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
  centered?: boolean;
}

export const SectionHeader = ({ badge, title, subtitle, centered = false }: SectionHeaderProps) => (
  <div className={`mb-12 md:mb-20 ${centered ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'}`}>
    <Badge variant="gold">{badge}</Badge>
    <h2 className="mt-4 text-3xl md:text-6xl font-display font-bold tracking-tight leading-tight md:leading-none">
      {title}
    </h2>
    <p className="mt-4 md:mt-6 text-os4sa-muted text-base md:text-lg leading-relaxed">{subtitle}</p>
  </div>
);

// ─── BentoCard ────────────────────────────────────────────────────────────────
// Animated dark card used throughout the bento grid layouts.

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  noPadding?: boolean;
}

export const BentoCard = ({ children, className = '', delay = 0, noPadding = false }: BentoCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={cn(
      'bg-[#0f0f0f] rounded-3xl relative overflow-hidden group border border-white/[0.05]',
      'transition-all duration-500 hover:border-white/[0.12] hover:bg-[#121212]',
      'hover:shadow-[0_0_40px_rgba(0,0,0,0.5)]',
      !noPadding && 'p-8',
      className,
    )}
  >
    {/* Hover glow overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-os4sa-gold/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="relative z-10 h-full flex flex-col">{children}</div>
  </motion.div>
);