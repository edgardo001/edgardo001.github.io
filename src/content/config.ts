import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		shareX: z.string().optional(),
		shareWhatsApp: z.string().optional(),
		shareReddit: z.string().optional(),
		shareInstagram: z.string().optional(),
		image: z.string().optional(),
	}),
});

export const collections = { blog };
