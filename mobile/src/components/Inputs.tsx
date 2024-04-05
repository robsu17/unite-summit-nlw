import { colors } from "@/styles/colors";
import { ReactNode } from "react";
import { TextInput, TextInputProps, View } from "react-native";

interface Props {
  children: ReactNode
}

type FieldProps = TextInputProps

function Input({ children }: Props) {
  return (
    <View className="w-full h-14 flex-row items-center gap-3 p-3 border border-green-400 rounded-lg">
      {children}
    </View>
  )
}

function Field({ ...rest }: FieldProps) {
  return <TextInput
    className="flex-1 text-white text-base font-regular"
    placeholderTextColor={colors.gray[200]}
    {...rest} 
  />
}

Input.Field = Field

export { Input }