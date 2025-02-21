import { toast } from "@/hooks/use-toast";
import { Bell, CheckCheck, CircleX, TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";

export const handleSuccessToast = (message) => {
  toast({
    description: (
      <div className="flex items-center gap-2 text-slate-800 text-sm">
        <CheckCheck className="w-5 h-5 " />
        <span>{message}</span>
      </div>
    ),
    duration: 2500,
    style: {
      backgroundColor: "#b6f8c4",
    },
  });
};

export const handleNotiToast = (message) => {
  toast({
    description: (
      <div className="flex items-center gap-2 text-slate-800 text-sm">
        <Bell className="w-5 h-5 " />
        <span>{message}</span>
      </div>
    ),
    duration: 2500,
    style: {
      backgroundColor: "#fff",
    },
  });
};

export const handleSuccessToastWithLink = (message, link) => {
  toast({
    description: (
      <div className="flex items-center gap-2 text-slate-800 text-sm">
        <CheckCheck className="w-5 h-5 " />
        <span>{message}</span>
        <Link className="font-semibold hover:underline" href={link.toString()}>
          Login Now
        </Link>
      </div>
    ),
    duration: 2500,
    style: {
      backgroundColor: "#b6f8c4",
    },
  });
};

export const handleFailureToast = (message) => {
  toast({
    variant: "destructive",
    description: (
      <div className="flex items-center gap-2 text-white text-sm">
        <CircleX className="w-5 h-5 " />
        <span>{message}</span>
      </div>
    ),
  });
};

export const handleWarningToast = (message) => {
  toast({
    description: (
      <div className="flex items-center gap-2 text-slate-800 text-sm">
        <TriangleAlert className="w-5 h-5 " />
        <span>{message}</span>
      </div>
    ),
    duration: 2500,
    style: {
      backgroundColor: "#fae7c7",
    },
  });
};
