import type { Metadata } from "next";

import Hero from "@/components/home/Hero";
import Ledger from "@/components/home/Ledger";
import RouteMap from "@/components/home/RouteMap";
import ProcessBeam from "@/components/home/ProcessBeam";
import ServiceStack from "@/components/ServiceStack";
import StarterKitBand from "@/components/StarterKitBand";
import Values from "@/components/Values";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <Hero />
      <Ledger />
      <RouteMap />
      <section className="section" id="services" aria-labelledby="services-title">
        <div className="wrap">
          <Reveal className="max-w-[760px] mb-16">
            <p className="mono-label text-teal-text">Services</p>
            <h2 id="services-title" className="mt-5 text-[clamp(36px,4.6vw,60px)]">Three ways we buy for you.</h2>
            <p className="mt-5 text-muted text-[19px] max-w-[36em]">
              For businesses and individuals, from one item to bulk orders.
            </p>
          </Reveal>
          <ServiceStack />
        </div>
        <div className="mt-6 lg:mt-0">
          <StarterKitBand />
        </div>
      </section>
      <ProcessBeam />
      <Values />
      <CtaBand />
    </>
  );
}
