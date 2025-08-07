import { useState, useEffect } from "react";

const MOBILE_USER_AGENT_REGEX =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

/**
 * Custom hook para detectar si el usuario está en un dispositivo móvil
 * o si la pantalla es lo suficientemente pequeña para ser considerada móvil.
 *
 * @returns boolean - true si es móvil o pantalla pequeña, false si no.
 */
const useDeviceDetection = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const checkIsMobile = () => {
    const userAgentIsMobile = MOBILE_USER_AGENT_REGEX.test(navigator.userAgent);
    const screenIsSmall = window.innerWidth <= 768;
    setIsMobile(userAgentIsMobile || screenIsSmall);
  };

  useEffect(() => {
    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return isMobile;
};

export default useDeviceDetection;
