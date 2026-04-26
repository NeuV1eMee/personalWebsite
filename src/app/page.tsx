import { getHomepageSettings } from "@/lib/music";
import { getAboutData } from "@/lib/about";
import { HomeClient } from "./HomeClient";

export const dynamic = "force-static";

export default function Home() {
  const settings = getHomepageSettings();
  const aboutData = getAboutData();
  
  const backgroundVideos = settings.backgroundVideos || [];
  const taglines = settings.taglines || [];
  const contact = aboutData.contact;

  return (
    <HomeClient 
      backgroundVideos={backgroundVideos} 
      taglines={taglines} 
      contact={contact}
    />
  );
}
