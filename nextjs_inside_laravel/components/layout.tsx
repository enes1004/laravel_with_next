"use client";
import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import styled, { createGlobalStyle } from 'styled-components';
import Link from 'next/link';
import { useAuth } from '@/hooks/auth'
import AppLayout from '@/components/Layouts/AppLayout';
import GuestLayout from '@/components/Layouts/GuestLayout';
const GlobalStyle = createGlobalStyle`
`

const name = 'Enes';
export const siteTitle = 'Next.js Sample Website';
const LayoutBg=styled.div`
  background-color: ${props=>props?.theme?.bg?.secondary};
`;
const BodyBg=styled.div`
  background-color: ${props=>props?.theme?.bg?.primary};
`;

interface LayoutProps{
  children:JSX.Element|Array<JSX.Element>,home?:boolean,className?:string,prev?:string,
}

export default function Layout({ children, home,className,prev }:LayoutProps): JSX.Element {
  const { user } = useAuth({ middleware: false })
  const AuthLayout = user?AppLayout:GuestLayout;
  return (
  <BodyBg>
    <GlobalStyle/>
    <AuthLayout>
    <LayoutBg className={`${styles.container} ${className}` }>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt=""
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : null}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
        {prev?
          <Link href={prev}>← Back</Link>
        :
          <Link href="/">← Back to home</Link>
        }
        </div>
      )}
    </LayoutBg>
    </AuthLayout>
  </BodyBg>
  );
};
