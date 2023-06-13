import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableRow } from "./ui/table";

interface FeedPostsProps {
  username: string;
  message: string;
  deposit: number;
  withdraw: number;
  image: string;
  date: Date;
}

export default function FeedPost({
  username,
  message,
  deposit,
  withdraw,
  image,
  date,
}: FeedPostsProps) {
  const formattedDate = date.toLocaleString("default", {
    month: "long",
    day: "numeric",
    year: "2-digit",
  });
  return (
    <div className=" mt-6">
      <div className="flex items-center space-x-4 border border-indigo-300 p-2 rounded-2xl">
        <div className="text center flex flex-col justify-center items-center">
          <h1>{username}</h1>
          <Avatar className={cn("w-20 h-20")}>
            <AvatarImage src={image} />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
          <div>
            <p>{formattedDate}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-12 w-[400px] bg-white rounded-lg text-black">
            <div className="flex flex-row">
              <Table className={cn("w-[40px] text-xs pointer-events-none")}>
                <TableBody className={cn("")}>
                  <TableRow className={cn("w-[100px]")}>
                    <TableHead className={cn("text-xs")}>Deposit:</TableHead>
                    <TableCell className="text-right font-medium text-xs">
                      {deposit}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Table className={cn("w-[40px] text-xs pointer-events-none")}>
                <TableBody className={cn("m-0 p-0")}>
                  <TableRow className={cn("w-[100px] border")}>
                    <TableHead className={cn("font-medium text-xs")}>
                      Withdrawal:
                    </TableHead>
                    <TableCell className="text-right font-medium text-xs">
                      {withdraw}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="h-12 w-[300px] rounded-lg text-black">
            <div className="">
              <p className="text-sm text-muted-foreground text-left mt-4 italic p-2 text-white">
                {message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
