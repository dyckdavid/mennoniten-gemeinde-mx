import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { auth } from '../lib/config'

function AuthenticationTitle() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/admin');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const changeUser = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async () => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      router.push('/admin');
    } catch (error) {
      console.error('Error signing in:', error);
      setIsLoading(false);
    }
  };

  const isButtonDisabled = !credentials.email || !credentials.password;

  return (
    <>
      <Head>
        <title>Signin</title>
      </Head>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Signin
        </Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="email"
            placeholder="email"
            onChange={changeUser}
            name="email"
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            onChange={changeUser}
            name="password"
            required
            mt="md"
          />
          <Button
            fullWidth
            mt="xl"
            onClick={loginUser}
            loading={isLoading}
            disabled={isButtonDisabled}
          >
            Sign In
          </Button>
        </Paper>
      </Container>
    </>
  );
}

export default AuthenticationTitle;
