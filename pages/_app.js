import "../styles/globals.css";


import AppLayout from "../src/layout/AppLayout"
import AuthStateChanged from "../src/layout/AuthStateChanged"
import { AuthProvider } from "../src/hook/useAuth";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppLayout>
        <AuthStateChanged>
          <Component {...pageProps} />
        </AuthStateChanged>
      </AppLayout>
    </AuthProvider>
  );
}

export default MyApp;
