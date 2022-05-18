import { ChakraProvider } from "@chakra-ui/react";
import { MoralisProvider } from "react-moralis";
import { theme } from "../styles";

//TODO: move me outta here
// const theme = extendTheme({
//   fonts: {
//     body: "Roboto, sans-serif",
//   },
// });

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <MoralisProvider
        appId={process.env.NEXT_PUBLIC_APP_ID}
        serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
      >
        <Component {...pageProps} />
      </MoralisProvider>
    </ChakraProvider>
  );
}

export default MyApp;
