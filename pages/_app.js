import "../styles/globals.css";

import AppLayout from "../src/layout/AppLayout";
import AuthStateChanged from "../src/layout/AuthStateChanged";
import { AuthProvider } from "../src/hook/useAuth";
import { FilterContextProvider } from "../src/hook/useFilter";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppLayout>
        <AuthStateChanged>
          <FilterContextProvider>
            <Component {...pageProps} />
          </FilterContextProvider>
        </AuthStateChanged>
      </AppLayout>
    </AuthProvider>
  );
}

export default MyApp;
