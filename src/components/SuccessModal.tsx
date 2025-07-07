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
            <DialogTitle className="text-2xl font-bold">🎉 You're Now Protected!</DialogTitle>
            <DialogDescription className="text-gray-400 pt-2">
              Your compliance kit for "{businessName}" is ready. Download and install in 5 minutes to stop fines.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 px-2">
            <Button
              onClick={handleDownload}
              className="w-full bg-green-500 hover:bg-green-600 text-gray-900 font-bold text-lg py-6"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Your Protection Kit
            </Button>
            
            <div className="mt-4 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">🚀 Quick Setup (5 minutes):</h4>
              <ol className="text-sm text-gray-300 space-y-1">
                <li>1. Download & unzip your compliance pack</li>
                <li>2. Upload files to your website's root folder</li>
                <li>3. Add the cookie script to your site header</li>
                <li>4. Link to your new privacy policy</li>
                <li>5. You're 100% compliant! 🎯</li>
              </ol>
              <p className="text-xs text-gray-400 mt-3">
                ✅ Complete installation guide included in your download
              </p>
            </div>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button type="button" variant="ghost" onClick={onClose}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Need another business? Create new pack
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
