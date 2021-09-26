import { SocketProvider } from '../context/socket'
import NavBar from "../components/NavBar";
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <SocketProvider>
      <NavBar />
      <Component {...pageProps} />
    </SocketProvider>
  );
}

export default MyApp
