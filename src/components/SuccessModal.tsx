import { saveAs } from "file-saver";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Download, PartyPopper, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  zipBlob: Blob | null;
  businessName: string;
}

export const SuccessModal = ({ isOpen, onClose, zipBlob, businessName }: SuccessModalProps) => {
  const handleDownload = () => {
    if (zipBlob) {
      saveAs(zipBlob, "starter-pack.zip");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] bg-[#161b22] border-gray-700">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <DialogHeader className="text-center items-center">
            <div className="p-3 bg-green-500/10 rounded-full inline-block mb-4">
              <PartyPopper className="w-10 h-10 text-green-400" />
            </div>
            <DialogTitle className="text-2xl font-bold">Generation Complete!</DialogTitle>
            <DialogDescription className="text-gray-400 pt-2">
              Your compliance starter pack for "{businessName}" is ready for download.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 px-2">
            <Button
              onClick={handleDownload}
              className="w-full bg-green-500 hover:bg-green-600 text-gray-900 font-bold text-lg py-6"
            >
              <Download className="mr-2 h-5 w-5" />
              Download starter-pack.zip
            </Button>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button type="button" variant="ghost" onClick={onClose}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Create a new pack
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
