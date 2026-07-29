import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const projectCollection = defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./src/content/projects" }),
    schema: z.object({
        order: z.number(),
        id: z.string(),
        title: z.string(),
        subtitle: z.string(),
        type: z.string(),
        status: z.string(),
        role: z.string(),
        icon: z.string(),
        accent: z.enum(['rose', 'amber', 'blue', 'emerald', 'teal']),
        featured: z.boolean().optional().default(false),
        cover: z.string(),
        images: z.array(z.object({
            src: z.string(),
            label: z.string(),
        })),
        problem: z.string(),
        solution: z.string(),
        metrics: z.array(z.tuple([z.string(), z.string()])),
        stack: z.array(z.string()),
        links: z.array(z.object({
            label: z.string(),
            href: z.string().optional(),
            icon: z.string(),
        })).optional().default([]),
        noLinksNote: z.string().optional(),
    }),
});

export const collections = {
    'projects': projectCollection,
};
