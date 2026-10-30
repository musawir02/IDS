import { Camera, Check, Monitor } from "lucide-react";
import { AddOnId } from "../../types";
import { ADD_ONS, formatAed } from "../content";
import Button from "./ui/Button";

const ICONS: Record<AddOnId, typeof Camera> = { photoshoot: Camera, website: Monitor };

interface AddOnsProps {
  selected: AddOnId[];
  onAdd: (id: AddOnId) => void;
  onRemove: (id: AddOnId) => void;
}

/** The poster's light "Optional add-ons" strip */
export default function AddOns({ selected, onAdd, onRemove }: AddOnsProps) {
  return (
    <section aria-labelledby="addons-title" className="mt-12 rounded-3xl bg-strip p-6 text-strip-ink sm:p-8">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,14rem)_1fr_1fr] lg:items-center lg:gap-6">
        <div>
          <h3 id="addons-title" className="text-xl font-extrabold uppercase tracking-tight">
            Optional add-ons
          </h3>
          <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.18em] text-strip-muted">
            Enhance your package
          </p>
        </div>
        {ADD_ONS.map((addOn) => {
          const Icon = ICONS[addOn.id];
          const added = selected.includes(addOn.id);
          return (
            <div key={addOn.id} className="flex flex-wrap items-center gap-4 rounded-2xl bg-white/70 p-4 ring-1 ring-violet-deep/10">
              <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-full bg-violet-deep/10 text-violet-deep">
                <Icon className="size-6" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-bold">{addOn.name}</p>
                <p className="text-sm text-strip-muted">{addOn.detail}</p>
                <p className="text-lg font-extrabold tabular-nums text-violet-deep">AED {formatAed(addOn.priceAed)}</p>
              </div>
              {/* On phones the button takes its own full-width row, so the details aren't squeezed */}
              <div className="max-sm:w-full">
                <Button
                  size="sm"
                  variant="onLight"
                  fullWidth
                  aria-pressed={added}
                  aria-label={added ? `Remove ${addOn.name} from my enquiry` : `Add ${addOn.name} to my enquiry`}
                  onClick={() => (added ? onRemove(addOn.id) : onAdd(addOn.id))}
                >
                  {added ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Check aria-hidden="true" className="size-4" />
                      Added · Remove
                    </span>
                  ) : (
                    "Add to my enquiry"
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
