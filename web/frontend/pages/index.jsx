
import { useTranslation } from "react-i18next";

import TopBar from "../components/Topbar/TopBar"


export default function HomePage() {
  const { t } = useTranslation();
  return (
    <TopBar />
  );
}
