import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useUnsavedChangesWarning = (
  hasUnsavedChanges: boolean,
  message: string = "Você tem alterações não salvas. Deseja realmente sair?"
) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [nextLocation, setNextLocation] = useState<string | null>(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };

    if (hasUnsavedChanges) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges, message]);

  const handleConfirmNavigation = () => {
    setConfirmedNavigation(true);
    setShowPrompt(false);
    if (nextLocation) {
      navigate(nextLocation);
    }
  };

  const handleCancelNavigation = () => {
    setShowPrompt(false);
    setNextLocation(null);
  };

  const navigateWithPrompt = (to: string) => {
    if (hasUnsavedChanges && !confirmedNavigation) {
      setNextLocation(to);
      setShowPrompt(true);
    } else {
      navigate(to);
    }
  };

  return {
    showPrompt,
    handleConfirmNavigation,
    handleCancelNavigation,
    navigateWithPrompt,
    message,
  };
};