import type { Metadata } from "next";
import { Annotation } from "@/components/ui/annotation";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { SignalLine } from "@/components/signal-line";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Container className="py-20 sm:py-32">
      <Annotation className="border-b border-line pb-3">[404] No signal</Annotation>
      <h1 className="mt-10 font-display text-display-xl font-extrabold uppercase [font-stretch:125%]">
        Signal lost
      </h1>
      <SignalLine className="mt-8 h-8 w-full" />
      <p className="mt-8 max-w-xl text-xl text-muted">
        This page doesn&apos;t exist, or it moved. The index is a good place to start again.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ArrowLink href="/">Back to index</ArrowLink>
        <ArrowLink href="/work" variant="secondary">
          See work
        </ArrowLink>
      </div>
    </Container>
  );
}
