export default function TrustedBy() {
  const brands = ['Uber', 'Airbnb', 'Adobe', 'Meta', 'Shopify', 'Netflix'];
  
  return (
    <section className="trusted-by">
      <div className="container">
        <p>Trusted by design teams at</p>
        <div className="logo-grid">
          {brands.map((brand) => (
            <div key={brand} className="brand-logo">
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 