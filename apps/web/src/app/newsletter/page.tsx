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
        color: "#00FF00",
        backgroundColor: "yellow",
        border: "3px solid red",
        fontSize: "48px",
        padding: "20px",
        marginBottom: "20px",
        textAlign: "center"
      }}>
        LOGISTICS DECODED TEST
      </h1>

      <p style={{
        color: "#00FF00",
        backgroundColor: "blue",
        border: "2px solid white",
        fontSize: "16px",
        maxWidth: "600px",
        padding: "20px",
        textAlign: "center",
        marginBottom: "40px",
        lineHeight: "1.6"
      }}>
        A monthly newsletter for logistics professionals navigating the U.S. &amp; Global markets.
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
          <span>I agree to receive marketing emails</span>
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
    </div>
  );
}
