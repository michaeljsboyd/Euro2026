"use client";

import { useState } from "react";
import { Plane, Plus, Trash2, X } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { formatDate } from "@/lib/format";
import { BookingStatus } from "@/lib/types";

interface Flight {
  id: string;
  from: string;
  to: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  airline: string;
  flightNumber: string;
  status: BookingStatus;
  notes: string;
}

interface FlightDraft {
  id: string | null;
  from: string;
  to: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  airline: string;
  flightNumber: string;
  status: BookingStatus;
  notes: string;
}

const initialFlights: Flight[] = [
  {
    id: "flight-1",
    from: "Paris",
    to: "Nice",
    date: "2026-06-11",
    departureTime: "09:00",
    arrivalTime: "10:25",
    airline: "Air France",
    flightNumber: "AF 7308",
    status: "booked",
    notes: "Pick up car after arrival."
  },
  {
    id: "flight-2",
    from: "Nice",
    to: "Ibiza",
    date: "2026-06-15",
    departureTime: "11:10",
    arrivalTime: "12:35",
    airline: "Vueling",
    flightNumber: "VY 1523",
    status: "tentative",
    notes: ""
  },
  {
    id: "flight-3",
    from: "Ibiza",
    to: "Sicily",
    date: "2026-06-19",
    departureTime: "10:20",
    arrivalTime: "13:05",
    airline: "ITA Airways",
    flightNumber: "AZ 8114",
    status: "tbc",
    notes: "Final route still to confirm."
  },
  {
    id: "flight-4",
    from: "Sicily",
    to: "Rome",
    date: "2026-06-23",
    departureTime: "14:40",
    arrivalTime: "15:55",
    airline: "Aeroitalia",
    flightNumber: "XZ 2712",
    status: "tentative",
    notes: ""
  }
];

const statuses: BookingStatus[] = ["booked", "tentative", "tbc"];

function emptyDraft(): FlightDraft {
  return {
    id: null,
    from: "",
    to: "",
    date: "",
    departureTime: "",
    arrivalTime: "",
    airline: "",
    flightNumber: "",
    status: "tentative",
    notes: ""
  };
}

function draftFromFlight(flight: Flight): FlightDraft {
  return { ...flight };
}

export function FlightsBoard() {
  const [flights, setFlights] = useState(initialFlights);
  const [draft, setDraft] = useState<FlightDraft | null>(null);

  const openNew = () => setDraft(emptyDraft());
  const openEdit = (flight: Flight) => setDraft(draftFromFlight(flight));
  const closeModal = () => setDraft(null);

  const saveFlight = () => {
    if (!draft) {
      return;
    }

    const from = draft.from.trim();
    const to = draft.to.trim();
    const airline = draft.airline.trim();
    const flightNumber = draft.flightNumber.trim();

    if (!from || !to || !draft.date || !airline || !flightNumber) {
      return;
    }

    if (draft.id) {
      setFlights((current) =>
        current.map((flight) =>
          flight.id === draft.id
            ? {
                ...flight,
                ...draft,
                from,
                to,
                airline,
                flightNumber
              }
            : flight
        )
      );
    } else {
      setFlights((current) => [
        ...current,
        {
          id: `flight-${Date.now()}`,
          ...draft,
          from,
          to,
          airline,
          flightNumber
        }
      ]);
    }

    closeModal();
  };

  const deleteFlight = () => {
    if (!draft?.id) {
      closeModal();
      return;
    }

    setFlights((current) => current.filter((flight) => flight.id !== draft.id));
    closeModal();
  };

  return (
    <>
      <div className="space-y-8">
        <PageHeader
          eyebrow="Flights"
          title="Internal Legs"
          description="A minimal snapshot of internal Europe flights with timing, carrier details, notes, and local editing until backend persistence is added."
          action={
            <button
              type="button"
              onClick={openNew}
              className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 text-sm font-medium text-ink/72 transition-all duration-300 hover:bg-white hover:text-ink"
            >
              <Plus className="h-4 w-4" />
              Add Flight
            </button>
          }
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {flights.map((flight) => (
            <button
              key={flight.id}
              type="button"
              onClick={() => openEdit(flight)}
              className="rounded-[28px] border border-white/70 bg-white/82 p-6 text-left shadow-panel transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(31,36,48,0.08)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-olive">
                    <Plane className="h-4 w-4" />
                    {flight.from} to {flight.to}
                  </div>
                  <h2 className="font-display text-3xl text-ink">
                    {flight.from} → {flight.to}
                  </h2>
                </div>
                <StatusBadge status={flight.status} />
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[22px] bg-[#f7f2ea] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">Date</p>
                  <p className="mt-2 text-sm leading-6 text-ink">{formatDate(flight.date)}</p>
                </div>
                <div className="rounded-[22px] bg-[#f7f2ea] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">Time</p>
                  <p className="mt-2 text-sm leading-6 text-ink">
                    {flight.departureTime} - {flight.arrivalTime}
                  </p>
                </div>
                <div className="rounded-[22px] bg-[#fffdfa] p-4 ring-1 ring-[#efe4d3]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">Airline</p>
                  <p className="mt-2 text-sm leading-6 text-ink">
                    {flight.airline} • {flight.flightNumber}
                  </p>
                </div>
                <div className="rounded-[22px] bg-[#fffdfa] p-4 ring-1 ring-[#efe4d3]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">Notes</p>
                  <p className="mt-2 text-sm leading-6 text-ink/68">
                    {flight.notes || "No notes added."}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {draft ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(31,36,48,0.3)] p-4 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-[32px] border border-white/70 bg-[rgba(255,251,245,0.96)] p-6 shadow-[0_30px_100px_rgba(31,36,48,0.18)] md:p-8">
            <div className="flex items-start justify-between gap-4 border-b border-[#ece4d8] pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-olive">
                  {draft.id ? "Edit Flight" : "Add Flight"}
                </p>
                <h3 className="mt-3 font-display text-4xl text-ink">
                  {draft.from || "Origin"} → {draft.to || "Destination"}
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
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">From</span>
                <input
                  value={draft.from}
                  onChange={(event) => setDraft({ ...draft, from: event.target.value })}
                  className="w-full rounded-[20px] border border-[#e7dccd] bg-[#fffdfa] px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
                />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">To</span>
                <input
                  value={draft.to}
                  onChange={(event) => setDraft({ ...draft, to: event.target.value })}
                  className="w-full rounded-[20px] border border-[#e7dccd] bg-[#fffdfa] px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
                />
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
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">Status</span>
                <select
                  value={draft.status}
                  onChange={(event) =>
                    setDraft({ ...draft, status: event.target.value as BookingStatus })
                  }
                  className="w-full rounded-[20px] border border-[#e7dccd] bg-[#fffdfa] px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">Departure</span>
                <input
                  type="time"
                  value={draft.departureTime}
                  onChange={(event) => setDraft({ ...draft, departureTime: event.target.value })}
                  className="w-full rounded-[20px] border border-[#e7dccd] bg-[#fffdfa] px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
                />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">Arrival</span>
                <input
                  type="time"
                  value={draft.arrivalTime}
                  onChange={(event) => setDraft({ ...draft, arrivalTime: event.target.value })}
                  className="w-full rounded-[20px] border border-[#e7dccd] bg-[#fffdfa] px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
                />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">Airline</span>
                <input
                  value={draft.airline}
                  onChange={(event) => setDraft({ ...draft, airline: event.target.value })}
                  className="w-full rounded-[20px] border border-[#e7dccd] bg-[#fffdfa] px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
                />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">Flight Number</span>
                <input
                  value={draft.flightNumber}
                  onChange={(event) => setDraft({ ...draft, flightNumber: event.target.value })}
                  className="w-full rounded-[20px] border border-[#e7dccd] bg-[#fffdfa] px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
                />
              </label>
              <label className="space-y-2 md:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">Notes</span>
                <textarea
                  rows={4}
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
                    onClick={deleteFlight}
                    className="inline-flex items-center gap-2 rounded-full border border-[#ead8cf] bg-[#fff6f2] px-4 py-2.5 text-sm font-medium text-[#7c4a42] transition-all duration-300 hover:bg-[#fff1ea]"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Flight
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
                  onClick={saveFlight}
                  className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#171b24]"
                >
                  Save Flight
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

