import { View, Image, StatusBar, Alert } from 'react-native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'

import logo from '@/assets/logo.png'

import { Input } from '@/components/Inputs'
import { colors } from '@/styles/colors'
import { Button } from '@/components/Button'
import { Link, router } from 'expo-router'
import { useContext, useState } from 'react'
import { AuthContext } from '@/authContext/AuthContext'

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const { register, isLoading } = useContext(AuthContext)

  async function handleRegsiter() {
    if (!name.trim() || !email.trim()) {
      return Alert.alert("Inscrição", "Preencha todos os campos!")
    }

    await register(name, email)
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
          <FontAwesome 
            name="user-circle" 
            color={colors.green[200]}
            size={20}
          />
          <Input.Field 
            placeholder='Nome completo' 
            onChangeText={setName}
          />
        </Input>

        <Input>
          <MaterialIcons 
            name="alternate-email" 
            color={colors.green[200]}
            size={20}
          />
          <Input.Field 
            placeholder='E-mail' 
            keyboardType="email-address"
            onChangeText={setEmail}
          />
        </Input>

        <Button 
          title="Realizar inscrição"
          onPress={handleRegsiter}
          isLoading={isLoading}
        />

        <Link 
          href='/'
          className="text-gray-100 text-base font-bold text-center mt-8"
        >
          Já possui ingresso?
        </Link>
      </View>
    </View>
  )
}