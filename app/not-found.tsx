import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Container className="py-20 sm:py-28">
      <div className="mx-auto max-w-2xl rounded-[1.75rem] border border-line bg-surface p-8 text-center shadow-card sm:p-14">
        <div className="flex justify-center">
          <Eyebrow>Error 404</Eyebrow>
        </div>
        <h1 className="mt-4 text-h1 font-semibold">This page doesn&apos;t exist.</h1>
        <p className="mt-4 text-lg text-ink-soft">
          The link may be broken, or the page may have moved. Here are a few good places to continue.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/work" variant="secondary">
            See my work
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
