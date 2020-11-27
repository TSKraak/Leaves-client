import React from "react";
import { useParams } from "react-router-dom";

interface Parameters {
  id?: string;
}

export default function LeavesDetailPage() {
  const params: Parameters = useParams();

  return (
    <div>
      <h1>Plant details page id: {params.id}</h1>
    </div>
  );
}
