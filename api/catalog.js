const TYPES = [
  ['mod','mod'],
  ['plugin','all_project_types:plugin'],
  ['resourcepack','resourcepack'],
  ['modpack','modpack'],
  ['datapack','all_project_types:datapack'],
  ['shader','shader']
];

export default async function handler(req, res) {
  const sort = req.query.sort || 'updated';
  const limit = Math.min(Number(req.query.limit || 30), 100);
  try {
    const responses = await Promise.all(TYPES.map(async ([label, facet]) => {
      const facets = encodeURIComponent(JSON.stringify([[`project_type:${facet}`]]));
      const url = `https://api.modrinth.com/v2/search?facets=${facets}&index=${encodeURIComponent(sort)}&limit=${limit}`;
      const r = await fetch(url, { headers: { 'User-Agent': 'BlockForge/1.0 (independent creator marketplace)' } });
      if (!r.ok) throw new Error(`Modrinth ${r.status}`);
      const j = await r.json();
      return (j.hits || []).map(p => ({
        id:p.project_id,
        title:p.title,
        slug:p.slug,
        project_type:p.project_type || label,
        all_project_types:p.all_project_types || [],
        description:p.description,
        author:p.author,
        downloads:p.downloads,
        follows:p.follows,
        icon_url:p.icon_url,
        gallery:p.gallery || [],
        featured_gallery:p.featured_gallery || null,
        versions:p.versions || [],
        categories:p.categories || [],
        loaders:(p.categories || []).filter(x => ['fabric','forge','neoforge','quilt','paper','spigot','bukkit'].includes(x.toLowerCase())),
        date_created:p.date_created,
        date_modified:p.date_modified,
        source:'Modrinth',
        url:`https://modrinth.com/${label === 'plugin' ? 'plugin' : label === 'resourcepack' ? 'resourcepack' : label === 'modpack' ? 'modpack' : label === 'datapack' ? 'datapack' : label}/${p.slug}`,
        premium:false,
        local:false
      }));
    }));
    const map = new Map();
    responses.flat().forEach(p => map.set(p.id,p));
    const projects = [...map.values()];
    projects.sort((a,b) => sort === 'downloads' ? (b.downloads||0)-(a.downloads||0) : String(b.date_modified||'').localeCompare(String(a.date_modified||'')));
    res.setHeader('Cache-Control','public, s-maxage=86400, stale-while-revalidate=3600');
    res.setHeader('Content-Type','application/json; charset=utf-8');
    res.status(200).json({updated_at:new Date().toISOString(), count:projects.length, projects});
  } catch (err) {
    res.status(502).json({error:'catalog_unavailable', message:String(err.message || err)});
  }
}
