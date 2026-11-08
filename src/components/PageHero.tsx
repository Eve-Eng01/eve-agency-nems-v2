/* The top of an inner page: a large heading that rises word by word, a line under it, and room for actions. */
export function PageHero({ title, lead, kicker, children }: { title: string; lead?: string; kicker?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <section className="phero">
      <div className="wrap">
        {kicker && <div className="phero__tags">{kicker}</div>}
        <h1 className="display-1" data-split>{title}</h1>
        {lead && <p className="lead phero__lead">{lead}</p>}
        {children && <div className="phero__actions">{children}</div>}
      </div>
    </section>
  );
}
