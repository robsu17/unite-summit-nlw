import { View, Image, ImageBackground, Text, TouchableOpacity } from "react-native";

import qrcode from '@/assets/ticket/qrcode.png'
import band from '@/assets/ticket/band.png'
import background from '@/assets/ticket/header.png'

import { Feather } from "@expo/vector-icons"
import { colors } from "@/styles/colors"

import { Qrcode } from "@/components/Qrcode"
import { BadgeStore, useBadgeStore } from "@/store/badge-store";

type Props = {
  onChangeAvatar?: () => void;
  onExpandQRcode?: () => void;
  data: BadgeStore;
}

export function Credential({ 
  onChangeAvatar, 
  onExpandQRcode, 
  data }: Props) 
{

  const badgeStore = useBadgeStore()

  console.log(badgeStore.data?.checkInURL)

  return (
    <View className="w-full self-stretch items-center">
      <Image 
        source={band} 
        className="w-24 h-52 z-10"
      />

      <View className="bg-black/20 self-stretch items-center pb-6 border border-white/10 mx-3 rounded-2xl -mt-5">
        <ImageBackground 
          source={background}
          className="px-6 py-8 h-40 items-center self-stretch border-b border-white/10 overflow-hidden"
        >
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-zinc-50 text-sm font-bold">
              {data.eventTitle}
            </Text>
            <Text className="text-zinc-50 text-sm font-bold">
              {data.id}
            </Text>
          </View>

          <View className="w-40 h-40 bg-black rounded-full"/>
        </ImageBackground>

        {
          data.image ? (
            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={onChangeAvatar}  
            >
              <Image 
                source={{ uri: data.image }} 
                className="w-36 h-36 rounded-full -mt-[88]"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              className="w-36 h-36 rounded-full -mt-[88] bg-gray-400 items-center justify-center"
              onPress={onChangeAvatar}
            >
              <Feather 
                name="camera"
                color={colors.green[400]}
                size={32}
              />
            </TouchableOpacity>
          )
        }

        <Text className="font-bold text-2xl text-zinc-50 mt-4">{data.name}</Text>
        <Text className="font-regular text-base text-zinc-300 mb-4">{data.email}</Text>

        <Qrcode 
          value={badgeStore.data?.checkInURL ?? "Não autoziado"}
          size={120}
        />

        <TouchableOpacity 
          activeOpacity={0.7} 
          className="mt-6" 
          onPress={onExpandQRcode}
        >
          <Text className="font-bold text-orange-500 text-sm">Ampliar QRCode</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}