export const styles = {
  global: (props) => ({
    "html, body": {
      padding: 0,
      margin: 0,
      fontFamily: `"Roboto, sans-serif",`,
      fontSize: "16px",
    },
    a: {
      color: "inherit",
      textDecoration: "none",
    },
    "*": {
      boxSizing: "border-box",
    },
    main: {
      minHeight: "100vh",
      padding: "4rem 0",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    footer: {
      display: "flex",
      flex: 1,
      padding: "2rem 0",
      borderTop: "1px solid #eaeaea",
      justifyContent: "center",
      alignItems: "center",
      a: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
      },
    },
    code: {
      background: "#fafafa",
      borderRadius: "5px",
      padding: "0.75rem",
      fontSize: "1.1rem",
      fontFamily: `Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
    Bitstream Vera Sans Mono, Courier New, monospace`,
    },
  }),
};
