import Store from "@/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
function App({ Component, pageProps }) {
  return (
    <Provider store={Store}>
      <Component {...pageProps} />
    </Provider>
  );
}
export default App;
