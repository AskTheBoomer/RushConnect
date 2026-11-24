
import { Suspense } from "react";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import PhotoGallery from "@/components/photo-gallery";
import ReviewsSection from "@/components/reviews-section";
import ContactSection from "@/components/contact-section";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. About */}
        <AboutSection />

        {/* 3. Services */}
        <Suspense
          fallback={
            <section
              id="services"
              className="bg-white px-5 py-24 text-center"
            >
              <p className="text-sm text-[#5f5a66]">
                Loading services...
              </p>
            </section>
          }
        >
          <ServicesSection />
        </Suspense>

        {/* 4. Our Work - Before and After Photo Gallery */}
        <Suspense
          fallback={
            <section
              id="gallery"
              className="bg-white px-5 py-24 text-center"
            >
              <p className="text-sm text-[#5f5a66]">
                Loading gallery...
              </p>
            </section>
          }
        >
          <PhotoGallery />
        </Suspense>

        {/* 5. Customer Reviews */}
        <Suspense
          fallback={
            <section
              id="reviews"
              className="bg-[#f5f1f8] px-5 py-24 text-center"
            >
              <p className="text-sm text-[#5f5a66]">
                Loading customer reviews...
              </p>
            </section>
          }
        >
          <ReviewsSection />
        </Suspense>

        {/* 6. Contact */}
        <ContactSection />
      </main>

      <SiteFooter />
    </>
  );
}
