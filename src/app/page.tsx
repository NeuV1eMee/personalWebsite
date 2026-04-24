import { getHomepageSettings } from "@/lib/music";
import { HomeClient } from "./HomeClient";

export default function Home() {
  const settings = getHomepageSettings();
  const backgroundVideos = settings.backgroundVideos || [];
  const taglines = settings.taglines || [];

  return <HomeClient backgroundVideos={backgroundVideos} taglines={taglines} />;
}
