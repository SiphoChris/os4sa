import React from 'react';

// ─── Domain Types ────────────────────────────────────────────────────────────

export type Sector = 'Education' | 'Government' | 'Health' | 'Admin' | 'Other';
export type ProjectStatus = 'Active' | 'Beta' | 'Concept';
export type BadgeVariant = 'default' | 'gold' | 'green';
export type GapSize = 'small' | 'large' | 'full';

export interface Project {
  id: string;
  title: string;
  description: string;
  sector: Sector;
  githubUrl?: string;
  status: ProjectStatus;
  tags: string[];
}

export interface GapItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  size: GapSize;
}

export interface RealityItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export interface NavLink {
  name: string;
  href: string;
}