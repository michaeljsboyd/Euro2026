"use client";

import { useMemo, useState } from "react";
import { CalendarDays, ExternalLink, FileText, Hash, Plus, Trash2, X } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { formatDate } from "@/lib/format";
import { Booking, BookingStatus, BookingType } from "@/lib/types";

interface BookingsManagerProps {
  initialBookings: Booking[];
  tripId: string;
}

type BookingDraft = {
  id: string | null;
  tripId: string;
  type: BookingType;
  title: string;
  city: string;
  date: string;
  confirmationNumber: string;
  status: "booked" | "tentative" | "cancelled";
  notes: string;
  fileUrl: string;
};

const categoryOptions: Array<{ value: BookingType; label: string }> = [
  { value: "hotel", label: "Hotel" },
  { value: "flight", label: "Flight" },
  { value: "restaurant", label: "Restaurant" },
  { value: "beach-club", label: "Beach Club" },
  { value: "other", label: "Other" }
];

const statusOptions: Array<{ value: BookingDraft["status"]; label: string }> = [
  { value: "booked", label: "Booked" },
  { value: "tentative", label: "Tentative" },
  { value: "cancelled", label: "Cancelled" }
];

function emptyDraft(tripId: string): BookingDraft {
  return {
    id: null,
    tripId,
    type: "hotel",
    title: "",
    city: "",
    date: "",
    confirmationNumber: "",
    status: "tentative",
    notes: "",
    fileUrl: ""
  };
}

function draftFromBooking(booking: Booking): BookingDraft {
  return {
    ...booking,
    status: booking.status === "tbc" ? "tentative" : booking.status,
    fileUrl: booking.fileUrl ?? ""
  };
}

export function BookingsManager({ initialBookings, tripId }: BookingsManagerProps) {
  const [bookings, setBookings] = useState(initialBookings);
  const [draft, setDraft] = useState<BookingDraft | null>(null);

  const groupedBookings = useMemo(
    () =>
      bookings.reduce<Record<string, Booking[]>>((accumulator, booking) => {
        accumulator[booking.city] = [...(accumulator[booking.city] ?? []), booking];
        return accumulator;
      }, {}),
    [bookings]
  );

  const openNew = () => setDraft(emptyDraft(tripId));
  const openEdit = (booking: Booking) => setDraft(draftFromBooking(booking));
  const closeModal = () => setDraft(null);

  const saveBooking = () => {
    if (!draft) {
      return;
    }

    const title = draft.title.trim();
    const city = draft.city.trim();
    const confirmationNumber = draft.confirmationNumber.trim();
    const fileUrl = draft.fileUrl.trim();

    if (!title || !city || !draft.date) {
      return;
    }

    const nextBooking: Booking = {
      id: draft.id ?? crypto.randomUUID(),
      tripId: draft.tripId,
      type: draft.type,
      title,
      city,
      date: draft.date,
      confirmationNumber,
      status: draft.status,
      notes: draft.notes.trim(),
      fileUrl: fileUrl || null
    };

    if (draft.id) {
      setBookings((current) =>
        current.map((booking) => (booking.id === draft.id ? nextBooking : booking))
      );
    } else {
      setBookings((current) => [...current, nextBooking]);
    }

    closeModal();
  };

  const deleteBooking = () => {
    if (!draft?.id) {
      closeModal();
      return;
    }

    setBookings((current) => current.filter((booking) => booking.id !== draft.id));
    closeModal();
  };

  return (
    <>
      <div className="space-y-8">
        <PageHeader
          eyebrow="Bookings"
          title="Travel Records"
          description="A clean record of hotels, flights, restaurants, and other trip reservations, with local editing for planning and cleanup."
          action={
            <button
              type="button"
              onClick={openNew}
              className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 text-sm font-medium text-ink/72 transition-all duration-300 hover:bg-white hover:text-ink"
            >
              <Plus className="h-4 w-4" />
              Add Booking
            </button>
          }
        />

        <SectionCard
          title="Booking Library"
          subtitle="Grouped by city so the live trip record stays calm and easy to scan."
        >
          <div className="space-y-8">
            {Object.entries(groupedBookings).map(([city, cityBookings]) => (
              <div key={city} className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-3xl text-ink">{city}</h3>
                  <span className="rounded-full bg-[#f7f2ea] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-ink/70">
                    {cityBookings.length} records
                  </span>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  {cityBookings.map((booking) => (
                    <button
                      key={booking.id}
                      type="button"
                      onClick={() => openEdit(booking)}
                      className="rounded-[24px] border border-white/70 bg-[#fffdfa] p-5 text-left transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(31,36,48,0.06)]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                          <div className="inline-flex items-center gap-2 text-sm text-olive">
                            <FileText className="h-4 w-4" />
                            {categoryOptions.find((option) => option.value === booking.type)?.label ??
                              booking.type}
                          </div>
                          <h4 className="text-lg font-semibold text-ink">{booking.title}</h4>
                        </div>
                        <StatusBadge status={booking.status} />
                      </div>
                      <div className="mt-5 space-y-3 text-sm text-ink/70">
                        <p className="inline-flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-olive" />
                          {formatDate(booking.date)}
                        </p>
                        <p className="inline-flex items-center gap-2">
                          <Hash className="h-4 w-4 text-olive" />
                          {booking.confirmationNumber || "No confirmation number yet"}
                        </p>
                        <p className="inline-flex items-center gap-2">
                          <ExternalLink className="h-4 w-4 text-olive" />
                          {booking.fileUrl ? "Link attached" : "No link attached"}
                        </p>
                        {booking.notes ? <p className="leading-6">{booking.notes}</p> : null}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {draft ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(31,36,48,0.3)] p-4 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-[32px] border border-white/70 bg-[rgba(255,251,245,0.96)] p-6 shadow-[0_30px_100px_rgba(31,36,48,0.18)] md:p-8">
            <div className="flex items-start justify-between gap-4 border-b border-[#ece4d8] pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-olive">
                  {draft.id ? "Edit Booking" : "Add Booking"}
                </p>
                <h3 className="mt-3 font-display text-4xl text-ink">
                  {draft.title || "Booking details"}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/70 text-ink transition-all duration-300 hover:bg-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <label className="space-y-2 md:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">Title</span>
                <input
                  value={draft.title}
                  onChange={(event) => setDraft({ ...draft, title: event.target.value })}
                  className="w-full rounded-[20px] border border-[#e7dccd] bg-[#fffdfa] px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
                />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">City</span>
                <input
                  value={draft.city}
                  onChange={(event) => setDraft({ ...draft, city: event.target.value })}
                  className="w-full rounded-[20px] border border-[#e7dccd] bg-[#fffdfa] px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
                />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">Category</span>
                <select
                  value={draft.type}
                  onChange={(event) =>
                    setDraft({ ...draft, type: event.target.value as BookingType })
                  }
                  className="w-full rounded-[20px] border border-[#e7dccd] bg-[#fffdfa] px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
                >
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">Status</span>
                <select
                  value={draft.status}
                  onChange={(event) =>
                    setDraft({
                      ...draft,
                      status: event.target.value as BookingDraft["status"]
                    })
                  }
                  className="w-full rounded-[20px] border border-[#e7dccd] bg-[#fffdfa] px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">Date</span>
                <input
                  type="date"
                  value={draft.date}
                  onChange={(event) => setDraft({ ...draft, date: event.target.value })}
                  className="w-full rounded-[20px] border border-[#e7dccd] bg-[#fffdfa] px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
                />
              </label>
              <label className="space-y-2 md:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">
                  Confirmation reference
                </span>
                <input
                  value={draft.confirmationNumber}
                  onChange={(event) =>
                    setDraft({ ...draft, confirmationNumber: event.target.value })
                  }
                  className="w-full rounded-[20px] border border-[#e7dccd] bg-[#fffdfa] px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
                />
              </label>
              <label className="space-y-2 md:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">Link</span>
                <input
                  value={draft.fileUrl}
                  onChange={(event) => setDraft({ ...draft, fileUrl: event.target.value })}
                  placeholder="https://"
                  className="w-full rounded-[20px] border border-[#e7dccd] bg-[#fffdfa] px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
                />
              </label>
              <label className="space-y-2 md:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">Notes</span>
                <textarea
                  rows={5}
                  value={draft.notes}
                  onChange={(event) => setDraft({ ...draft, notes: event.target.value })}
                  className="w-full rounded-[24px] border border-[#e7dccd] bg-[#fffdfa] px-4 py-3 text-sm leading-7 text-ink outline-none transition focus:border-gold"
                />
              </label>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-[#ece4d8] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                {draft.id ? (
                  <button
                    type="button"
                    onClick={deleteBooking}
                    className="inline-flex items-center gap-2 rounded-full border border-[#ead8cf] bg-[#fff6f2] px-4 py-2.5 text-sm font-medium text-[#7c4a42] transition-all duration-300 hover:bg-[#fff1ea]"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Booking
                  </button>
                ) : null}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full border border-white/70 bg-white/75 px-5 py-2.5 text-sm font-medium text-ink/72 transition-all duration-300 hover:bg-white hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveBooking}
                  className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#171b24]"
                >
                  Save Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

