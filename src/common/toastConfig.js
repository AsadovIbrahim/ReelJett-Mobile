import { BaseToast, ErrorToast } from 'react-native-toast-message'

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#3A3CB3',
        backgroundColor: '#3A3CB3',
        borderRadius: 10,
        paddingVertical: 10
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
      }}
      text2Style={{
        fontSize: 14,
        color: 'white'
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: '#DC2626',
        backgroundColor: '#DC2626',
        borderRadius: 10,
        paddingVertical: 10
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
      }}
      text2Style={{
        fontSize: 14,
        color: 'white'
      }}
    />
  ),
}