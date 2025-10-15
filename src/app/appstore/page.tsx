export default function Appstore() {
  const suites = [
    { id:'meta-suite', name:'Meta Suite', desc:'Launch paused campaigns, review & activate', req:['Meta token'] },
    { id:'listing-portal', name:'Listing Portal Pro', desc:'Bayut / Property Finder sync', req:['Portal creds'] },
    { id:'superseller', name:'SuperSeller CRM', desc:'Leads + WhatsApp follow-ups', req:['WhatsApp map'] },
    { id:'reality-designer', name:'Reality Designer', desc:'Creative hub for assets', req:[] },
  ];
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Appstore</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {suites.map(s => (
          <div key={s.id} className="rounded-2xl border p-4">
            <div className="font-semibold">{s.name}</div>
            <p className="text-sm opacity-70">{s.desc}</p>
            <div className="text-xs mt-2 opacity-60">Requires: {s.req.join(', ') || '—'}</div>
            <button className="mt-3 px-3 py-2 rounded-lg border">Install</button>
          </div>
        ))}
      </div>
    </div>
  );
}
