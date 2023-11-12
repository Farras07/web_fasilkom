'use client';
import "react-tabs/style/react-tabs.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "../components/Navbar";
import { Provider as StoreProvider  } from 'react-redux'
import store from '../store/store'
import { Provider } from "next-auth/client";
import { Footer } from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <StoreProvider store={store}>
          <Navbar />
          <div id="root" className="page-content">
              <Component {...pageProps} />
          </div>
          <div className="footer">
            <Footer />
          </div>
      </StoreProvider>
    </Provider>
  );
}
export default MyApp;
