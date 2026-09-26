import { MotionAirframe } from "../components/MotionAirframe.jsx";
import Home from "../components/sections/Home.jsx";
import About from "../components/sections/About.jsx";
import ValueStack from "../components/sections/ValueStack.jsx";
import CaseStudies from "../components/sections/CaseStudies.jsx";
import Contact from "../components/sections/Contact.jsx";

export default function HomePage() {
  return (
    <>
      <MotionAirframe />
      <div className="relative z-10">
        <Home />
        <About />
        <ValueStack />
        <CaseStudies />
        <Contact />
      </div>
    </>
  );
}
