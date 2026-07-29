import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
	const posts = await getCollection('blog');
	posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
	return rss({
		title: 'Edgardo Vásquez — Blog',
		description: 'Artículos sobre tecnología, liderazgo, arquitectura de software e IA.',
		site: context.site,
		items: posts.map(post => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/blog/${post.id}/`,
		})),
		stylesheet: '/rss-style.xsl',
		customData: `<language>es-cl</language>`,
	});
}
