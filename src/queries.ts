// Find all gamblingsession
// const gamblingsession = await prisma.gamblingSession.findMany({
//     where: {
//       userid: session.user.id,
//     },
//   });

import { Prisma } from "@prisma/client";
//

//need to calculate stats
export function calculateGamblingStats(
  object: (Prisma.PickArray<
    Prisma.GamblingSessionGroupByOutputType,
    ("createdAt" | "deposit" | "withdraw")[]
  > & {})[]
) {
  var totalDeposit = 0;
  var totalDifference = 0;

  object.map((session) => {
    totalDeposit += session.deposit;

    //tar withdraw - depo
    var difference = session.withdraw - session.deposit;
    totalDifference += difference;
  });

  return { totalDeposit, totalDifference };
}
