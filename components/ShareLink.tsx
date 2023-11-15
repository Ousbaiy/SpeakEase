'use client';

import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dispatch } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from './ui/use-toast';
import { Label } from './ui/label';
import { Input } from './ui/input';

type Props = {
  isOpen: boolean;
  chatId: string;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
};

const ShareLink = ({ isOpen, chatId, setIsOpen }: Props) => {
  const { toast } = useToast();
  const host = window.location.host;

  const linkToChat =
    process.env.NODE_ENV === 'development'
      ? `http://${host}/chat/${chatId}`
      : `https://${host}/chat/${chatId}`;

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(linkToChat);
      toast({
        title: 'Copied to clipboard',
        description:
          'Share this to the person you want to chat with! (NOTE: They must be added to  the Chat to access it!)',
        className: 'bg-green-600 text-white',
      });
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  }

  return (
    <Dialog
      onOpenChange={(open) => setIsOpen(open)}
      open={isOpen}
      defaultOpen={isOpen}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <Copy className="md:mr-2" />
          <span className="hidden md:flex">Share Link</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm: max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Any user who has been{' '}
            <span className="text-indigo-600 font-bold">granted access</span>{' '}
            can use this link
          </DialogDescription>
        </DialogHeader>
        <div className="flex itens-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={linkToChat} readOnly />
          </div>
          <Button
            type="submit"
            className="px-3"
            onClick={() => copyToClipboard()}
          >
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sn: justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareLink;
