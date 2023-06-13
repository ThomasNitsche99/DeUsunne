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
    <div className=" h-full flex flex-col justify-center items-center ">
      <div className="border mb-2 sm:mb-4">
        <Nav />
      </div>
      {children}
    </div>
  );
}
