import { View, Image, StatusBar, Alert } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import logo from '@/assets/logo.png'

import { Input } from '@/components/Inputs'
import { colors } from '@/styles/colors'
import { Button } from '@/components/Button'
import { Link, Redirect } from 'expo-router'
import { useContext, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { useBadgeStore } from '@/store/badge-store'

export default function Home() {
  const [code ,setCode] = useState("")
  const { login, isLoading } = useContext(AuthContext)

  const badgeStore = useBadgeStore()

  async function handleAccessCredential() {
    if (!code.trim()) {
      return Alert.alert("Ingresso", "Informe o código do ingresso!")
    }

    await login(code)
  }

  if (badgeStore.data?.checkInURL) {
    return <Redirect href="/ticket" />
  }

  return (
    <View className="flex-1 bg-green-500 items-center justify-center p-8">
      <StatusBar barStyle="light-content" />

      <Image 
        source={logo} 
        className='h-16' 
        resizeMode='contain'
      />

      <View className="w-full mt-12 gap-3">
        <Input>
          <MaterialCommunityIcons 
            name="ticket-confirmation-outline" 
            color={colors.green[200]}
            size={20}
          />
          <Input.Field
            placeholder='Código do ingresso'
            onChangeText={setCode}
          />
        </Input>

        <Button 
          title="Acessar gredencial"
          onPress={handleAccessCredential}
          isLoading={isLoading}
        />

        <Link 
          href="/register"
          className="text-gray-100 text-base font-bold text-center mt-8"
        >
          Ainda não possui ingresso?
        </Link>
      </View>
    </View>
  )
}