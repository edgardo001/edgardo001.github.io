import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()).optional(),
		shareX: z.string().optional(),
		shareWhatsApp: z.string().optional(),
		shareReddit: z.string().optional(),
		shareInstagram: z.string().optional(),
		image: z.string().optional(),
	}),
});

export const collections = { blog };
