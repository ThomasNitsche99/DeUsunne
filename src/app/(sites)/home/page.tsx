import { getServerSession } from "next-auth";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types";
import { calculateGamblingStats } from "@/queries";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import RegisterSessionForm from "@/components/SessionForm";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getSession() {
  "use server";
  const session = (await getServerSession(authOptions)) as unknown as User;
  console.log("duda")
  return session;
}



//Home page, Showing just user card
export default async function Home() {
  //gettign session information
  const session = await getSession();
  //getting current month
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });

  var firstDayOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  var lastDayOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    1
  );
  // Find all unique session dates
  const gamblingsession = await db.gamblingSession.groupBy({
    where: {
      userid: session.user.id,
    },
    by: ["createdAt", "deposit", "withdraw"],
    having: {
      createdAt: {
        gte: firstDayOfMonth,
        lte: lastDayOfMonth,
      },
    },
  });

  const { totalDeposit, totalDifference } =
    calculateGamblingStats(gamblingsession);

  

  return (
    <>
      <div className="flex justify-center items-center w-screen sm:p-2">
        <Card className={cn("w-screen h-full text-center rounded-l sm:w-[500px]")}>
          <CardHeader>
            <CardTitle className={cn("text-2xl")}>
              {session?.user?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center my-2">
              <Avatar className={cn("w-44 h-44")}>
                <AvatarImage src={session.user.image} />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
            </div>
            <Separator />
            <div>
              {/* month */}
              <div className="text-2xl mt-6">{month}</div>
              {/* short stats */}
              <div className="mt-4">
                <Table className={cn("m-0 p-0")}>
                  <TableBody className={cn("m-0 p-0")}>
                    <TableRow className={cn("")}>
                      <TableHead className={cn("font-medium text-lg")}>
                        Spent this month:{" "}
                      </TableHead>
                      <TableCell className="text-right font-medium text-lg">
                        {`${totalDeposit} kr`}
                      </TableCell>
                    </TableRow>

                    <TableRow className={cn("")}>
                      <TableHead className={cn("font-medium text-lg")}>
                        Wins this month:{" "}
                      </TableHead>
                      {totalDifference >= 0 ? (
                        <TableCell className="text-right font-medium text-lg text-green-600">
                          {`${totalDifference} kr`}
                        </TableCell>
                      ) : (
                        <TableCell className="text-right font-medium text-lg">
                          0 kr
                        </TableCell>
                      )}
                    </TableRow>

                    <TableRow className={cn("")}>
                      <TableHead className={cn("font-medium text-lg")}>
                        Losses this month:{" "}
                      </TableHead>
                      {totalDifference < 0 ? (
                        <TableCell className="text-right font-medium text-lg text-red-600">
                          {`${totalDifference} kr`}
                        </TableCell>
                      ) : (
                        <TableCell className="text-right font-medium text-lg">
                          0 kr
                        </TableCell>
                      )}
                      {/* <TableCell className="text-right font-medium text-lg">
                        {totalDifference < 0 ? `${totalDifference} kr` : "0 kr"}
                      </TableCell> */}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
          <CardFooter className={cn("flex justify-center")}>
            <RegisterSessionForm />
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
