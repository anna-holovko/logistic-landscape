'use client';

export default function NewsletterError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="page-newsletter">
      <section className="newsletter-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center', color: '#efe6d3' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Something went wrong</h1>
          <p style={{ marginBottom: '30px', color: '#efe6d3', opacity: 0.8 }}>{error.message}</p>
          <button
            onClick={reset}
            style={{
              padding: '12px 24px',
              backgroundColor: '#be5b3f',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </section>
    </main>
  );
}
