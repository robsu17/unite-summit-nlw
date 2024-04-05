import '@/styles/global.css'

import { Slot } from "expo-router"

import { 
  useFonts, 
  Roboto_700Bold, 
  Roboto_500Medium, 
  Roboto_400Regular,
} from '@expo-google-fonts/roboto'

import { Loading } from '@/components/Loading'
import AuthContextProvider from '@/authContext/AuthContext'

export default function Layout() {
  const [ isFontLoad ] = useFonts({
    Roboto_700Bold, 
    Roboto_500Medium, 
    Roboto_400Regular
  })

  if (!isFontLoad) {
    return <Loading />
  }

  return (
    <AuthContextProvider>
      <Slot />
    </AuthContextProvider>
  )
}