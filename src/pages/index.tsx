import {GetStaticProps} from 'next'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'

import style from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home( { product } : HomeProps) {
  return (
    <>
    <Head>
      <title>IgNews</title>
    </Head>
   
   <main className={style.contentContainer}>

    <section className={style.hero}>
      <span>👏 Hey! Bem vindo!</span>
      <h1>Notícias sobre o mundo do <span>REACT.</span></h1>

      <p>Tenha acesso à todas as notícias <br/>
      <span>por {product.amount}/mês</span>
      </p>
      <SubscribeButton priceId={product.priceId} />
    </section>

    <img src="/images/avatar.svg" alt="avatar"/>
   </main>

    </>
  )
}

export const getStaticProps : GetStaticProps = async() => {
   const price = await stripe.prices.retrieve('price_1JenHbGcFm5AsfwtKxg2nhzO')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('pt-BR',{
      style: 'currency',
      currency: 'BRL',
    }).format(price.unit_amount / 100)
  }


  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, //24hrs
  }
}
