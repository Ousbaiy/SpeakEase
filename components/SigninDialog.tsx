import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button, buttonVariants } from "./ui/button";
import { signIn } from "next-auth/react";
import { LogIn } from "lucide-react";

const SigninDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className={`${buttonVariants({ variant: "outline" })}`}>
        <LogIn className="mr-2 h-4 w-4"  /> Login 
      </DialogTrigger>
      <DialogContent className="sm: max-w-md">
        <DialogHeader className="mb-4">
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            to continue to{" "}
            <span className="text-indigo-600 font-bold">Speakease</span>
          </DialogDescription>
        </DialogHeader>
        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          Login with Google
        </Button>
        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={() => signIn("github", { callbackUrl: "/" })}
        >
          Login with Github
        </Button>
        <DialogFooter className="text-muted-foreground text-sm">
          By creating an account, you agree to our to our Terms of Service and
          Privacy Policy.s
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SigninDialog;
