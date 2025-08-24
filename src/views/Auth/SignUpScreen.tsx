import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import TextField from '../../components/TextField';
import PrimaryButton from '../../components/PrimaryButton';
import SocialRow from '../../components/SocialRow';
import { palette } from '../../theme/colors';
import { useAuthViewModel } from '../../viewmodels/AuthViewModel';

export default function SignUpScreen({ navigation }: any) {
  const VM = useAuthViewModel();
  const [fullName, setFullName] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [university, setUniversity] = useState('');

  useEffect(() => {
    if (VM.error) {
      Alert.alert('Sign up failed', VM.error, [{ text: 'OK', onPress: VM.clearError }]);
    }
  }, [VM.error]);

  const onSignUp = async () => {
    const e = VM.validateSignUp({ fullName, email, password });
    if (Object.keys(e).length) {
      if (e.name) Alert.alert('Invalid name', e.name);
      else if (e.email) Alert.alert('Invalid email', e.email);
      else if (e.password) Alert.alert('Invalid password', e.password);
      return;
    }
    await VM.signUpEmail({ fullName, email, password, university });
    // On success, Firebase auth state will update and navigator will switch to Home
    // Or if you prefer to return to SignIn:
    // navigation.goBack();
  };

  return (
    <View style={s.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={s.close}>✕</Text></TouchableOpacity>
        <Text style={s.header}>Sign Up</Text>
        <View style={{ width: 20 }} />
      </View>

      <View style={{ height: 16 }} />

      <TextField placeholder="Full  Name" value={fullName} onChangeText={setFullName}/>
      <TextField placeholder="Email or phone number" value={email} onChangeText={setEmail} keyboardType="email-address"/>
      <TextField placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry/>
      <TextField placeholder="University  (Optional)" value={university} onChangeText={setUniversity}/>

      <PrimaryButton title="Sign Up" onPress={onSignUp} loading={VM.loading} />

      <Text style={s.or}>Or sign up with</Text>
      <SocialRow onGoogle={VM.signInGoogle} />

      <View style={{ flex: 1 }} />
      <Text style={[s.footer]}>
        Already have an account?{' '}
        <Text style={s.link} onPress={() => navigation.goBack()}>Sign In</Text>
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 20, paddingTop: 16 },
  header: { fontWeight: '800', fontSize: 18, color: palette.text },
  close: { fontSize: 18, color: palette.subtext },
  link: { color: palette.brand, fontWeight: '700' },
  or: { textAlign: 'center', color: palette.subtext, marginTop: 14 },
  footer: { color: palette.subtext, textAlign: 'center', marginBottom: 8 },
});
