import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
  } from '@mantine/core';
import { useEffect, useState } from 'react';
import {
    getAuth,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup
} from 'firebase/auth'
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import Link from 'next/link'



  






  
function AuthenticationTitle() {

    
    const [Credentials, setCredentials] = useState({
      email: "",
      password: "",
    });

    const { push } = useRouter();

    const changeUser = (e) => {
      setCredentials({
        ...Credentials,
        [e.target.name]: e.target.value,
      });
    };

    const loginUser = async () => {
      try {
        await signInWithEmailAndPassword(
          auth,
          Credentials.email,
          Credentials.password
        );
        push("/admin");
      } catch({message}) {
        if (message === "Firebase: Error (auth/wrong-password).") {
          console.log("error")
        }
      }
    };




    return (
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Signin
        </Title>
        
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="email" placeholder="email" onChange={changeUser} name="email" required />
          <PasswordInput label="password" placeholder="Password" onChange={changeUser} name="password" required mt="md" />
          <Group position="apart" mt="lg">
            
          </Group>
          <Button fullWidth mt="xl" onClick={loginUser}>
            Sign In
          </Button>

        </Paper>
      </Container>
    );
  }

  export default AuthenticationTitle;