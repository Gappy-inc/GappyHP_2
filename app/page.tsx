import HeroSection from '@/components/sections/HeroSection'
import ProblemSection from '@/components/sections/ProblemSection'
import WhatIsSection from '@/components/sections/WhatIsSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import ROISection from '@/components/sections/ROISection'
import WhyGappySection from '@/components/sections/WhyGappySection'
import CTASection from '@/components/sections/CTASection'

export default function Home() {
  return (
    <div className="bg-[#0A0A0A] overflow-hidden">
      <HeroSection />
      <ProblemSection />
      <WhatIsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <ROISection />
      <WhyGappySection />
      <CTASection />
    </div>
  )
}
