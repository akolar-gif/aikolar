export default function LegalPage() {
  return (
    <main
      style={{
        maxWidth: "680px",
        margin: "6rem auto",
        padding: "0 1.5rem",
        color: "#f5f1e3",
        lineHeight: 1.6,
        fontSize: "0.95rem",
      }}
    >
      <div style={{ marginBottom: "3rem", opacity: 0.85 }}>
        imprint
      </div>

      <p style={{ marginBottom: "1.5rem" }}>
        Andreas Kolar<br />
        für Projektberatung Kolar<br />
	Rheinsbergerstr. 76/77<br />
	10115 Berlin<br />
        Germany
      </p>

      <p style={{ marginBottom: "3rem" }}>
        email: [andreas@kolar.berlin]
      </p>

      <div style={{ marginBottom: "2rem", opacity: 0.85 }}>
        privacy
      </div>

      <p style={{ marginBottom: "1.2rem" }}>
        This website does not use tracking technologies, cookies, or analytics services.
      </p>

      <p style={{ marginBottom: "1.2rem" }}>
        When you interact with the thinking interface, your input is sent to an external AI service in order to generate a response.
      </p>

      <p style={{ marginBottom: "1.2rem" }}>
        No personal profiles are created. No data is stored beyond what is technically required to process the request.
      </p>

      <p style={{ marginBottom: "3rem" }}>
        If you want to avoid any data transmission, do not use the interactive input.
      </p>

      <p style={{ opacity: 0.6 }}>
        This page exists because it has to.
      </p>
    </main>
  );
}