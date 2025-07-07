import { FormState } from "../App";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { motion } from "framer-motion";

interface ComplianceFormProps {
  formState: FormState;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ComplianceForm = ({ formState, onFormChange, onSubmit }: ComplianceFormProps) => {
  const handleJurisdictionChange = (value: string) => {
    onFormChange({
      target: { name: "jurisdiction", value },
    } as unknown as React.ChangeEvent<HTMLSelectElement>);
  };

  const handleIndustryChange = (value: string) => {
    onFormChange({
      target: { name: "industry", value },
    } as unknown as React.ChangeEvent<HTMLSelectElement>);
  };

  return (
    <motion.div
      className="bg-[#161b22] border border-gray-700 rounded-xl p-6 sm:p-8 shadow-2xl"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="businessName">Your Business Name</Label>
          <Input
            id="businessName"
            name="businessName"
            type="text"
            placeholder="e.g., Acme Inc."
            value={formState.businessName}
            onChange={onFormChange}
            required
          />
          <p className="text-xs text-gray-500">
            This will appear in your privacy policy and legal documents
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="websiteUrl">Your Website URL</Label>
          <Input
            id="websiteUrl"
            name="websiteUrl"
            type="text"
            placeholder="example.com or https://example.com"
            value={formState.websiteUrl}
            onChange={onFormChange}
            required
          />
          <p className="text-xs text-gray-500">
            The website that needs compliance protection (we'll auto-format)
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="jurisdiction">Your Legal Jurisdiction</Label>
            <Select onValueChange={handleJurisdictionChange} defaultValue={formState.jurisdiction} name="jurisdiction">
              <SelectTrigger>
                <SelectValue placeholder="Select your business location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USA">USA (CCPA, COPPA)</SelectItem>
                <SelectItem value="EU">European Union (GDPR)</SelectItem>
                <SelectItem value="Canada">Canada (PIPEDA)</SelectItem>
                <SelectItem value="UK">United Kingdom (UK GDPR)</SelectItem>
                <SelectItem value="Australia">Australia (Privacy Act)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              Where your business operates (affects which laws apply)
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Business Contact Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="contact@example.com"
              value={formState.email}
              onChange={onFormChange}
              required
            />
            <p className="text-xs text-gray-500">
              For privacy requests and compliance communications
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="industry">Your Business Industry <span className="text-gray-500 text-sm">(optional)</span></Label>
          <Select onValueChange={handleIndustryChange} defaultValue={formState.industry} name="industry">
            <SelectTrigger>
              <SelectValue placeholder="What type of business do you run? (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology & Software</SelectItem>
              <SelectItem value="ecommerce">E-commerce & Retail</SelectItem>
              <SelectItem value="healthcare">Healthcare & Medical</SelectItem>
              <SelectItem value="finance">Finance & Banking</SelectItem>
              <SelectItem value="education">Education & Training</SelectItem>
              <SelectItem value="marketing">Marketing & Advertising</SelectItem>
              <SelectItem value="consulting">Consulting & Professional Services</SelectItem>
              <SelectItem value="hospitality">Hospitality & Travel</SelectItem>
              <SelectItem value="manufacturing">Manufacturing & Industrial</SelectItem>
              <SelectItem value="nonprofit">Non-profit & NGO</SelectItem>
              <SelectItem value="media">Media & Entertainment</SelectItem>
              <SelectItem value="real-estate">Real Estate</SelectItem>
              <SelectItem value="food">Food & Beverage</SelectItem>
              <SelectItem value="automotive">Automotive</SelectItem>
              <SelectItem value="construction">Construction & Architecture</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500">
            Helps us customize compliance language for your sector
          </p>
        </div>
        <Button type="submit" className="w-full !mt-8 bg-green-500 hover:bg-green-600 text-gray-900 font-bold">
          Protect My Business - $6.99 →
        </Button>
      </form>
    </motion.div>
  );
};
