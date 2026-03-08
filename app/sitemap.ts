import { MetadataRoute } from 'next'
import { getSupabase } from '@/lib/db'
import { config } from '@/lib/config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = getSupabase()
  const base = config.app.url

  const { data: ebooks } = await supabase
    .from('ebooks')
    .select('slug, updated_at')
    .eq('active', true)

  const { data: combos } = await supabase
    .from('combos')
    .select('id, updated_at')
    .eq('active', true)

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), priority: 1.0, changeFrequency: 'daily' },
    { url: `${base}/ebooks`, lastModified: new Date(), priority: 0.9, changeFrequency: 'daily' },
    { url: `${base}/combos`, lastModified: new Date(), priority: 0.8, changeFrequency: 'weekly' },
    { url: `${base}/about`, lastModified: new Date(), priority: 0.5, changeFrequency: 'monthly' },
    { url: `${base}/use-cases`, lastModified: new Date(), priority: 0.6, changeFrequency: 'monthly' },
  ]

  const ebookRoutes: MetadataRoute.Sitemap = (ebooks ?? []).map((e) => ({
    url: `${base}/ebooks/${e.slug}`,
    lastModified: e.updated_at ? new Date(e.updated_at) : new Date(),
    priority: 0.8,
    changeFrequency: 'weekly',
  }))

  const comboRoutes: MetadataRoute.Sitemap = (combos ?? []).map((c) => ({
    url: `${base}/combos/${c.id}`,
    lastModified: c.updated_at ? new Date(c.updated_at) : new Date(),
    priority: 0.7,
    changeFrequency: 'weekly',
  }))

  return [...staticRoutes, ...ebookRoutes, ...comboRoutes]
}
