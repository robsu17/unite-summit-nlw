import QRCodeSvg from "react-native-qrcode-svg"

type Props = {
  value: string;
  size: number;
}

export function Qrcode({ value, size }: Props) {
  return (
    <QRCodeSvg 
      value={value}
      size={size}
    />
  )
}