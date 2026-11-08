import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export default function NotFound() {
  return (
    <PageHero title="This page moved on" lead="The link may be old, or the page has moved. Everything we make is on the work page.">
      <Link href="/" className="btn btn--primary">Back to the studio</Link>
      <Link href="/work/" className="link">See the work</Link>
    </PageHero>
  );
}
