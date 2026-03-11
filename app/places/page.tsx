import { ExternalLink, MapPin } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";

const wishlistSections = [
  {
    title: "Michelin Restaurants",
    subtitle: "A small shortlist of destination meals worth planning around.",
    items: [
      {
        title: "Table by Bruno Verjus",
        location: "Paris",
        note: "Elegant tasting menu option for one standout Paris evening.",
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
        link: "https://www.tableparis.com/"
      },
      {
        title: "La Cheneaudiere Terrace Lunch",
        location: "Cap Ferrat",
        note: "Quiet Riviera lunch with a strong setting and polished service.",
        image:
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
        link: "https://www.royal-riviera.com/en/restaurant-bar/"
      },
      {
        title: "Imago",
        location: "Rome",
        note: "Refined final-night dining with a panoramic city backdrop.",
        image:
          "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
        link: "https://www.hotelhasslerroma.com/en/restaurant-bars/imago/"
      }
    ]
  },
  {
    title: "Cocktail Bars",
    subtitle: "Low-key evening options with atmosphere, not noise.",
    items: [
      {
        title: "Prescription Cocktail Club",
        location: "Paris",
        note: "Already on the radar for the first Paris evening.",
        image:
          "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80",
        link: "https://www.experimentalgroup.com/bars/prescription-cocktail-club/"
      },
      {
        title: "The Ninth",
        location: "Ibiza",
        note: "Sunset drinks option with a calmer, elevated feel.",
        image:
          "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
        link: "https://www.theninthibiza.com/"
      },
      {
        title: "Stravinskij Bar",
        location: "Rome",
        note: "Classic aperitivo setting for a polished Rome afternoon pause.",
        image:
          "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=1200&q=80",
        link: "https://www.roccofortehotels.com/hotels-and-resorts/hotel-de-russie/restaurants-and-bars/stravinskij-bar/"
      }
    ]
  },
  {
    title: "Beach Clubs",
    subtitle: "A restrained shortlist of beach days worth locking in early.",
    items: [
      {
        title: "Paloma Beach",
        location: "Cap Ferrat",
        note: "Iconic Riviera beach club for one slow coastal afternoon.",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        link: "https://www.paloma-beach.com/"
      },
      {
        title: "Destino Pool Club",
        location: "Ibiza",
        note: "Easy fit with the stay if one polished pool day is enough.",
        image:
          "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
        link: "https://destino.fivehotelsandresorts.com/"
      },
      {
        title: "La Plage Resort",
        location: "Taormina",
        note: "Sicily option for a beach-forward day without a big transfer.",
        image:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
        link: "https://www.laplageresort.com/"
      }
    ]
  },
  {
    title: "Experiences",
    subtitle: "A few higher-signal experiences to anchor the trip rhythm.",
    items: [
      {
        title: "Private Walking Tour",
        location: "Paris",
        note: "Strong first-day orientation that keeps the pace personal.",
        image:
          "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80",
        link: "https://www.pariswalks.com/"
      },
      {
        title: "Formentera Boat Day",
        location: "Ibiza",
        note: "A clean upgrade from a standard beach day if weather aligns.",
        image:
          "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
        link: "https://www.ibizaboats.com/"
      },
      {
        title: "Etna & Taormina Day",
        location: "Taormina",
        note: "One signature Sicily experience with scenery and pace built in.",
        image:
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
        link: "https://www.visititaly.eu/places-and-tours/mount-etna"
      }
    ]
  }
];

export default function PlacesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Wishlist"
        title="Curated Shortlist"
        description="A visually clean shortlist of meals, bars, beach clubs, and signature experiences worth keeping close while the trip takes shape."
      />

      <div className="space-y-6">
        {wishlistSections.map((section) => (
          <SectionCard key={section.title} title={section.title} subtitle={section.subtitle}>
            <div className="grid gap-5 lg:grid-cols-3">
              {section.items.map((item) => (
                <article
                  key={`${section.title}-${item.title}`}
                  className="overflow-hidden rounded-[24px] border border-[#ede3d3] bg-[#fffdfa] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(31,36,48,0.08)]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-52 w-full object-cover"
                  />
                  <div className="space-y-4 p-5">
                    <div className="space-y-2">
                      <h3 className="font-display text-3xl leading-none text-ink">{item.title}</h3>
                      <p className="inline-flex items-center gap-2 text-sm text-ink/58">
                        <MapPin className="h-4 w-4 text-olive" />
                        {item.location}
                      </p>
                    </div>
                    <p className="text-sm leading-7 text-ink/68">{item.note}</p>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[#e7dccd] bg-[#f7f2ea] px-4 py-2 text-sm font-medium text-ink transition-all duration-300 hover:bg-white"
                    >
                      View site
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}
