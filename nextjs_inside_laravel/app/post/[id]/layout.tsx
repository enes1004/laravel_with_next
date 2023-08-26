export default async function PageLayout({
    children,
    navigate
  }: {
    children: React.ReactNode;
    navigate: JSX.Element;
  }) {
    return (
      <div>
        {navigate}
        {children}
      </div>
    )
}