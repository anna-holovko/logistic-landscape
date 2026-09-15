export default function NewsletterPage() {
  return (
    <div style={{
      minHeight: "100vh",
      padding: "40px 20px",
      background: "#1a1a1a",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <h1 style={{
        color: "#EFE6D3",
        fontSize: "48px",
        marginBottom: "20px",
        textAlign: "center"
      }}>
        Logistics, decoded.
      </h1>

      <p style={{
        color: "#EFE6D3",
        fontSize: "16px",
        maxWidth: "600px",
        textAlign: "center",
        marginBottom: "40px",
        lineHeight: "1.6"
      }}>
        A monthly newsletter for logistics professionals navigating the U.S. &amp; Global markets.
        Understand how the logistics landscape really works: from transportation modes and technologies
        to the companies shaping the industry.
      </p>

      <form style={{
        maxWidth: "500px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "20px"
      }}>
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          required
          style={{
            padding: "12px 16px",
            border: "1px solid #EFE6D3",
            background: "transparent",
            color: "#EFE6D3",
            fontSize: "16px",
            borderRadius: "4px"
          }}
        />

        <label style={{
          display: "flex",
          gap: "10px",
          color: "#EFE6D3",
          fontSize: "14px"
        }}>
          <input
            type="checkbox"
            name="agree"
            required
          />
          <span>I agree to receive marketing emails. <a href="/privacy" style={{ color: "#EFE6D3", textDecoration: "underline" }}>Privacy Policy</a></span>
        </label>

        <button
          type="submit"
          style={{
            padding: "12px 40px",
            background: "#BE5B3F",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          SUBSCRIBE
        </button>
      </form>

      <footer style={{
        marginTop: "60px",
        display: "flex",
        gap: "30px",
        justifyContent: "center",
        color: "#EFE6D3",
        fontSize: "14px"
      }}>
        <a href="/terms" style={{ color: "#EFE6D3", textDecoration: "none" }}>Terms &amp; Conditions</a>
        <a href="/privacy" style={{ color: "#EFE6D3", textDecoration: "none" }}>Privacy Policy</a>
        <a href="/cookies" style={{ color: "#EFE6D3", textDecoration: "none" }}>Cookie Policy</a>
      </footer>
    </div>
  );
}
