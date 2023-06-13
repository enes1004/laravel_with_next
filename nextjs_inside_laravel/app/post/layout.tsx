import Layout from '@/components/layout';

export default function PageLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {

    return (<Layout home prev="/post/">
           {children}
    </Layout>)
}