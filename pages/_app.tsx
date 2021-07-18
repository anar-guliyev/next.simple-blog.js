import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { useStore } from "../store";
import { createGlobalStyle } from "styled-components";
import { Header, Content, Footer } from "@components";

const GlobalStyle = createGlobalStyle`  
  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    &::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
  .text-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .loading-container {
    z-index: 10;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.5);
    text-align: center;
  }
  .loading-container > svg,
  .loading-spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);
  return (
    <>
      <Provider store={store}>
        <GlobalStyle />
        <Content>
          <Header />
          <Component {...pageProps} />
        </Content>
        <Footer />
      </Provider>
    </>
  );
}
