"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Alert } from "./alert";
import { useState } from "react";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { revalidatePath } from "next/cache";

type Inputs = {
  deposit: number;
  withdraw: number;
  feedable: boolean;
  message: string;
};

export default function RegisterSessionForm() {
  const [open, setOpen] = useState(false);
  const [resError, setResError] = useState<string | null>(null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    console.log(data);
    try {
      const res = await fetch("/api/gamblingSession", {
        cache: "no-cache",
        method: "POST",
        body: JSON.stringify({
          deposit: data.deposit,
          withdraw: data.withdraw,
          feedable: data.feedable,
          message: data.message
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (res.ok) {
        setOpen(false);
        reset()

      } else {
        setResError((await res.json()).error);
      }
    } catch (error: any) {
      setResError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Register new gambling session</Button>
        </DialogTrigger>

        <DialogContent className="my-64 max-w-[420px] bg-white text-black">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              Register new gamblingsession. Click Register when you are done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Deposit
              </Label>

              <Controller
                name="deposit"
                control={control}
                defaultValue={0}
                rules={{
                  required: { value: true, message: "Deposit required" },
                  min: {
                    value: 0,
                    message: "Deposit must be minimum 0",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="deposit"
                    type="number"
                    className="col-span-3"
                  />
                )}
              />
            </div>
            {errors.deposit && (
              <>
                <div className="text-center">
                  <Alert>{errors.deposit.message}</Alert>
                </div>
              </>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="withdraw" className="text-right">
                Withdraw
              </Label>
              <Controller
                name="withdraw"
                control={control}
                defaultValue={0}
                rules={{
                  required: { value: true, message: "withdrawal required" },
                  min: {
                    value: 0,
                    message: "withdrawal must be minimum 0",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="withdraw"
                    type="number"
                    className="col-span-3"
                  />
                )}
              />
            </div>
            {errors.withdraw && (
              <>
                <div className="text-center">
                  <Alert>{errors.withdraw.message}</Alert>
                </div>
              </>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="feedable" className="text-right">
                Feedable?
              </Label>
              <Controller
                name="feedable"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message">Your message</Label>
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <Textarea {...field}
                    placeholder="Type your message here."
                    id="message"
                    className="col-span-3 resize-none"
                  />
                )}
              />
            </div>
          </div>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            Register Session
          </Button>
        </DialogContent>
      </Dialog>
    </form>
  );
}
