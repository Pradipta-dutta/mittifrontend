import EnhancedHero from "./components/EnhancedHero";
import EnhancedServices from "./components/EnhancedServices";
import EnhancedFeatures from "./components/EnhancedFeatures";
import Aboutus from "./components/Aboutus";
import Contactus from "./components/Contactus";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <EnhancedHero/>
      <EnhancedServices/>
      <EnhancedFeatures/>
      <Contactus/>
      <Aboutus/>
    </div>
  );
}
