import React from 'react';
import { Github, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge, BentoCard } from './ui-primitives';
import type { Project, ProjectStatus } from '../types';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const statusVariant = (status: ProjectStatus) => {
  if (status === 'Active') return 'green';
  if (status === 'Beta')   return 'gold';
  return 'default';
};

// ─── ProjectCard ─────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project;
  delay?: number;
}

export const ProjectCard = ({ project, delay = 0 }: ProjectCardProps) => (
  <BentoCard delay={delay} noPadding className="flex flex-col h-full bg-white/[0.02]">
    <Card className="bg-transparent border-none shadow-none ring-0 h-full flex flex-col rounded-none py-0">

      <CardHeader className="p-8 pb-0">
        <div className="flex justify-between items-start mb-6">
          <Badge variant="gold">{project.sector}</Badge>
          <Badge variant={statusVariant(project.status)}>{project.status}</Badge>
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
            <span
              key={tag}
              className="text-[9px] font-mono text-white/30 border border-white/5 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-8 pt-0 border-none bg-transparent">
        {project.githubUrl && (
          <Button
            variant="link"
            asChild
            className="p-0 h-auto text-white/60 hover:text-os4sa-gold group/link"
          >
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