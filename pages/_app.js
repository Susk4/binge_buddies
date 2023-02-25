import "../styles/globals.css";
import "../styles/bingeSelect/bingeSelect.css";

import AppLayout from "../src/layout/AppLayout";
import AuthStateChanged from "../src/layout/AuthStateChanged";
import { AuthProvider } from "../src/hook/useAuth";
import { FilterContextProvider } from "../src/hook/useFilter";
import MetaData from "../components/misc/MetaData";

function MyApp({ Component, pageProps }) {
  return (
    <MetaData>
      <AuthProvider>
        <AppLayout>
          <AuthStateChanged>
            <FilterContextProvider>
              <Component {...pageProps} />
            </FilterContextProvider>
          </AuthStateChanged>
        </AppLayout>
      </AuthProvider>
    </MetaData>
  );
}

export default MyApp;
