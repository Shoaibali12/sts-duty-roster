"use client";

import React, { useState } from "react";
import axios from "axios";
import SectionInput from "./SectionsInput";
import SupportRoleInput from "./SupportRoleInput";
import VenueSelector from "./VenueSelector"; // ✅ use the correct one with dropdowns

interface VenueFormProps {
  eventId: string;
}

const VenueForm: React.FC<VenueFormProps> = ({ eventId }) => {
  const [venueType, setVenueType] = useState<"campus" | "external">("campus");
  const [venueName, setVenueName] = useState("");
  const [block, setBlock] = useState("");
  const [sections, setSections] = useState<any[]>([]);
  const [supportRoles, setSupportRoles] = useState<
    { role: string; count: number }[]
  >([]);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!venueName.trim()) {
      alert("Please enter a venue name.");
      return;
    }
    if (!block.trim()) {
      alert("Please enter a block.");
      return;
    }
    if (sections.length === 0) {
      alert("Please add at least one section.");
      return;
    }

    const payload = {
      eventId,
      venueType,
      venueName: venueName.trim(),
      block: block.trim(),
      sections,
      supportRoles,
    };

    setSubmitting(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/venue-config/add",
        payload
      );
      console.log("Success:", res.data);
      alert("Venue configuration saved successfully!");

      setVenueName("");
      setBlock("");
      setSections([]);
      setSupportRoles([]);
    } catch (err: any) {
      console.error("Error submitting form:", err);
      alert(
        `Error submitting form: ${err.response?.data?.message || err.message}`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add Venue Configuration
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <VenueSelector
          venueType={venueType}
          setVenueType={setVenueType}
          venueName={venueName}
          setVenueName={setVenueName}
          block={block}
          setBlock={setBlock}
        />

        <div className="border-t border-gray-300" />

        <SectionInput setSections={setSections} />

        <div className="border-t border-gray-300" />

        <SupportRoleInput setSupportRoles={setSupportRoles} />

        <div className="text-center">
          <button
            type="submit"
            disabled={submitting}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300 ${
              submitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {submitting ? "Submitting..." : "Submit Venue"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VenueForm;
