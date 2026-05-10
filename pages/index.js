export default function Home() {
  return (
    <main
      style={{
        fontFamily:
          'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        maxWidth: '960px',
        margin: '0 auto',
        padding: '4rem 1.5rem',
      }}
    >
      <h1 style={{ color: '#0056ff', fontSize: '2.5rem', lineHeight: 1.15 }}>
        Alliance Group — Compliance Shield
      </h1>
      <p style={{ color: '#475569', fontSize: '1.1rem', maxWidth: '60ch' }}>
        Australia&rsquo;s property compliance platform. Compliance Shield connects landlords,
        property managers, venues, and tenants through a single hub — automating compliance
        reports, managing removals and makesafes, and protecting every stakeholder.
      </p>

      <section style={{ marginTop: '3rem' }}>
        <h2>Stakeholders</h2>
        <ul>
          <li>
            <strong>Landlords</strong> — manage all compliance obligations from one dashboard.
          </li>
          <li>
            <strong>Property Managers &amp; Agencies</strong> — automate compliance across managed
            portfolios.
          </li>
          <li>
            <strong>Venues / Clubs / Schools / Aged Care</strong> — sector-specific compliance
            checklists and reporting.
          </li>
          <li>
            <strong>Tenants</strong> — transparent access to compliance records and safety
            notifications.
          </li>
        </ul>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2>Platform Modules</h2>
        <ul>
          <li>User Management &amp; Onboarding</li>
          <li>Compliance Dashboard</li>
          <li>Reports &amp; Subscriptions ($10M+/yr)</li>
          <li>Removals / Makesafes ($1M+/yr)</li>
          <li>Communication &amp; Notifications</li>
        </ul>
      </section>

      <p style={{ marginTop: '3rem', color: '#475569', fontSize: '0.9rem' }}>
        Year 1 projection: <strong>$11M+ revenue</strong>, <strong>$6M+ profit</strong>.
      </p>
    </main>
  );
}
