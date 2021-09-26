import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

function useSocket(url) {
    const [socket, setSocket] = useState(null)
  
    useEffect(() => {
        const socketIo = io(url)
    
        setSocket(socketIo)
    
        return () => {
            socketIo.disconnect()
        }
    }, []);
  
    return socket
}

export const socketContext = createContext({ socket: null });

export function SocketProvider({ children }) {
    return (
        <socketContext.Provider value={{
            socket: useSocket('http://127.0.0.1:8080')
        }}>
            {children}
        </socketContext.Provider>
    )
}