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
    <div className="mt-2 sm:mt-6 w-screen flex justify-center items-center sm:w-11/12 p-1">
      <div className="flex items-center p-2 rounded-2xl flex-col sm:flex-row  border w-full sm:w-[570px] sm:space-x-4">
        <div className="text center flex flex-row justify-between items-center w-full sm:flex-col sm:justify-center">
          <div className="flex flex-row justify-between items-center w-5/12 sm:justify-center sm:items-center sm:flex-col sm:w-full">
            <h1 className="order-2 sm:order-1">{username}</h1>
            <Avatar className={cn("w-12 h-12 sm:w-20 sm:h-20 order-1")}>
              <AvatarImage src={image} />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
          </div>
          <div className="bg-black-50 w-full flex justify-end items-end sm:justify-center sm:items-center">
            <p>{formattedDate}</p>
          </div>
        </div>

        <div className="w-full">
          <div className="h-12 w-full bg-white rounded-lg text-black sm:h-12 sm:w-[400px] border">
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

// return (
//   <div className="mt-2 sm:mt-6">
//     <div className="flex items-center sm:space-x-4 border border-indigo-300 p-2 rounded-2xl">
//       <div className="text center flex flex-col justify-center items-center">
//         <h1>{username}</h1>
//         <Avatar className={cn("w-12 h-12 sm:w-20 sm:h-20")}>
//           <AvatarImage src={image} />
//           <AvatarFallback>User</AvatarFallback>
//         </Avatar>
//         <div>
//           <p>{formattedDate}</p>
//         </div>
//       </div>

//       <div className="space-y-2 border">
//         <div className="h-12 w-full bg-red-500 rounded-lg text-black sm:h-12 sm:w-[400px]">
//           <div className="flex flex-row">
//             <Table className={cn("w-[40px] text-xs pointer-events-none")}>
//               <TableBody className={cn("")}>
//                 <TableRow className={cn("w-[100px]")}>
//                   <TableHead className={cn("text-xs")}>Deposit:</TableHead>
//                   <TableCell className="text-right font-medium text-xs">
//                     {deposit}
//                   </TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//             <Table className={cn("w-[40px] text-xs pointer-events-none")}>
//               <TableBody className={cn("m-0 p-0")}>
//                 <TableRow className={cn("w-[100px] border")}>
//                   <TableHead className={cn("font-medium text-xs")}>
//                     Withdrawal:
//                   </TableHead>
//                   <TableCell className="text-right font-medium text-xs">
//                     {withdraw}
//                   </TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </div>
//         </div>
//         <div className="h-12 w-[300px] rounded-lg text-black">
//           <div className="">
//             <p className="text-sm text-muted-foreground text-left mt-4 italic p-2 text-white">
//               {message}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );
// }
