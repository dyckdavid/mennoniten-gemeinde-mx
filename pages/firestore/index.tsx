/* eslint-disable react/jsx-key */
import { Inter } from '@next/font/google'
import Link from 'next/link'
import { Card, Text, Badge, Button, Group } from '@mantine/core';
import { IconCalendar } from '@tabler/icons';
import { Space } from '@mantine/core';
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from 'react';
//importar firebase
import firebaseApp from '../../firebase/config'
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc} from 'firebase/firestore'
import { async } from '@firebase/util'
const db = getFirestore(firebaseApp)

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useRouter} from 'next/router'





function Cards(props: { productos: any; }) {

    const {productos} = props

    const router = useRouter()

    return (
        <>
        {productos.map((product: { title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) => (
        <div>
            <h1>Test Database{product.title}</h1>
        </div>

))}



</>
        
    )

}
export default Cards;


export const getServerSideProps = async(context: any)=>{
    const querySnapshot = await getDocs(collection(db,'sermons'))
                  const docs: { id: string; }[] = []
                  querySnapshot.forEach((doc)=>{
                      docs.push({...doc.data(), id: doc.id})
                  })
  
    return {
      props:{
        productos: docs
      }
    }
  }