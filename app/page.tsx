import HeroSection from '@/components/sections/HeroSection'
import ROISection from '@/components/sections/ROISection'
import WhatIsSection from '@/components/sections/WhatIsSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import WhyGappySection from '@/components/sections/WhyGappySection'
import Phase1PartnerSection from '@/components/sections/Phase1PartnerSection'
import PricingSection from '@/components/sections/PricingSection'
import ResourcesSection from '@/components/sections/ResourcesSection'
import CTASection from '@/components/sections/CTASection'

export default function Home() {
  return (
    <div className="bg-ivory-100 overflow-hidden">
      <HeroSection />
      <ROISection />
      <WhatIsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <WhyGappySection />
      <Phase1PartnerSection />
      <PricingSection />
      <ResourcesSection />
      <CTASection />
    </div>
  )
}
