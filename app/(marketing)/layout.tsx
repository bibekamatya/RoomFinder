import NavBar from "@/components/layout/landingPage/navbar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <div className="mt-14"> {children}</div>
    </>
  );
}
