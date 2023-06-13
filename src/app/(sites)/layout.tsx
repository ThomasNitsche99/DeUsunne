import Nav from "@/components/Nav";

export const metadata = {
  title: "Home",
  description: "Tracker for gambling",
};

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center container my-4">
      <div className="my-6">
        <Nav />
      </div>
      {children}
    </div>
  );
}
