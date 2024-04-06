import { api } from "@/server/api";
import axios from "axios";
import { router, Redirect } from "expo-router";
import { ReactNode, createContext, useState } from "react";
import { Alert } from "react-native";

import { useBadgeStore } from "@/store/badge-store"

type AuthcontextType = {
  isLoading: boolean;
  register: (name: string, email: string) => Promise<void>;
  login: (code: string) => Promise<void>
}

type AuthContextProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthcontextType)

export default function AuthContextProvider({ children }: AuthContextProps) {
  const EVENT_ID = "9e9bd979-9d10-4915-b339-3786b1634f33"
  const [isLoading, setIsLoading] = useState(false)

  const badgeStore = useBadgeStore()
  console.log("User: " + badgeStore.data)
  
  async function register(name: string, email: string) {
    try {
      setIsLoading(true)

      const { data } = await api.post(`/events/${EVENT_ID}/attendees`, {
        name,
        email
      })

      if (data.attendeeId) {
        const badgeResponse = await api.get(
          `/attendees/${data.attendeeId}/badge`
        )

        badgeStore.save(badgeResponse.data.badge)

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

  async function login(code: string) {
    try {
      setIsLoading(true)
      const { data } = await api.get(`attendees/${code}/badge`)

      badgeStore.save(data.badge)

    } catch (error) {
      console.log(error)
      Alert.alert("Ingresso", "Ingresso não encontrado!")
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <AuthContext.Provider value={{ register, login, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}