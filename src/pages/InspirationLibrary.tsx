import { Bookmark, Search } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Card, CardBody } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { inspirationItems } from "../data/studioData";

export function InspirationLibrary() {
  return (
    <div className="space-y-6">
      <Card>
        <CardBody className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-display text-3xl leading-none tracking-[-0.02em] text-studio-ink">
              Curated references
            </h2>
            <p className="mt-2 text-sm text-studio-muted">
              Save patterns with enough context to reuse them intentionally.
            </p>
          </div>
          <div className="relative w-full lg:max-w-sm">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-studio-soft"
            />
            <Input className="pl-9" placeholder="Search inspiration..." />
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {inspirationItems.map((item, index) => (
          <Card
            className="overflow-hidden hover:-translate-y-0.5 hover:border-studio-line hover:shadow-[0_1px_1px_rgba(33,31,27,0.04),0_20px_46px_rgba(33,31,27,0.05)]"
            key={item.title}
          >
            <div className="h-40 border-b border-studio-line/65 bg-[linear-gradient(135deg,#fbf8f2,#f3eee4_55%,#f1edff)] p-4">
              <div className="h-full rounded-2xl border border-white/70 bg-white/48 p-4">
                <div className="flex items-center justify-between">
                  <span className="h-2 w-20 rounded-full bg-studio-line/80" />
                  <Bookmark aria-hidden="true" className="h-4 w-4 text-studio-purple" />
                </div>
                <div className="mt-8 space-y-2">
                  <span className="block h-3 w-3/4 rounded-full bg-studio-line/75" />
                  <span className="block h-3 w-1/2 rounded-full bg-studio-line/65" />
                </div>
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {Array.from({ length: 3 }).map((_, swatchIndex) => (
                    <span
                      className="h-8 rounded-xl bg-white/80"
                      key={`${item.title}-${swatchIndex}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <CardBody>
              <p className="text-xs font-medium text-studio-soft">Reference {index + 1}</p>
              <h3 className="mt-2 font-display text-3xl leading-none tracking-[-0.02em] text-studio-ink">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-studio-muted">{item.source}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
