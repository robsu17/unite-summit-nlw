import { api } from "@/server/api";
import axios from "axios";
import { router } from "expo-router";
import { ReactNode, createContext, useState } from "react";
import { Alert } from "react-native";

type AuthcontextType = {
  register: (name: string, email: string) => Promise<void>;
  isLoading: boolean;
}

type AuthContextProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthcontextType)

export default function AuthContextProvider({ children }: AuthContextProps) {
  const EVENT_ID = "9e9bd979-9d10-4915-b339-3786b1634f33"
  const [isLoading, setIsLoading] = useState(false)
  
  async function register(name: string, email: string) {
    try {
      setIsLoading(true)

      const { data } = await api.post(`/events/${EVENT_ID}/attendees`, {
        name,
        email
      })

      if (data.attendeeId) {
        Alert.alert("Inscrição", "Inscrição realizada com sucesso!", [
          { text: "OK", onPress: () => router.push("/ticket") }
        ])
      }
    } catch (error) {
      console.log(error)

      if (axios.isAxiosError(error)) {
        if (String(error.response?.data.message).includes("already registered")) {
          return Alert.alert("Inscrição", "Este e-mail já está cadastrado!")
        }
      }

      Alert.alert("Inscrição", "Não foi possível realizar a sua inscrição")
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <AuthContext.Provider value={{ register, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}