import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import matter from 'gray-matter';
import fs from 'node:fs';
import path from 'node:path';

export async function GET(context) {
	const posts = await getCollection('blog');
	posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
	const contentDir = path.join(process.cwd(), 'src', 'content', 'blog');
	return rss({
		title: 'Edgardo Vásquez — Blog',
		description: 'Artículos sobre tecnología, liderazgo, arquitectura de software e IA.',
		site: context.site,
		items: posts.map(post => {
			const item = {
				title: post.data.title,
				description: post.data.description,
				pubDate: post.data.pubDate,
				link: `/blog/${post.id}/`,
				customData: '',
			};
			try {
				const filePath = path.join(contentDir, `${post.id}.md`);
				if (fs.existsSync(filePath)) {
					const file = matter.read(filePath);
					const img = file.data.image;
					if (img) {
						item.customData += `<enclosure url="${new URL(img, context.site)}" type="image/webp" length="0"/>`;
					}
				}
			} catch {}
			return item;
		}),
		stylesheet: '/rss-style.xsl',
		customData: `<language>es-cl</language>
	<image>
		<url>${new URL('/mpedf3pv-img.webp', context.site)}</url>
		<title>Edgardo Vásquez</title>
		<link>${context.site}</link>
	</image>`,
	});
}
