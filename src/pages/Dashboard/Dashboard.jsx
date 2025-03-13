import React, { useEffect, useState } from "react";
import {
  QueueListIcon,
  ClockIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import RecapCard from "../../components/RecapCard/RecapCard";
import { getDatas } from "../../api/entity";

export default function Dashboard() {
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const result = await getDatas("tasks");
      const groupedData = result?.data.reduce((acc, item) => {
        // Convertir completed en booléen
        const completed = Boolean(item.completed);
        // Si la clé n'existe pas encore, créer un tableau vide
        if (!acc[completed]) {
          acc[completed] = [];
        }
        // Ajouter l'élément dans le groupe approprié
        acc[completed].push(item);

        return acc;
      }, {});

      setData(groupedData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <RecapCard
          titre="Toutes les tâches"
          value={data?.true?.length + data?.false?.length}
          color="purple-600/15"
          icon={QueueListIcon}
        />
        <RecapCard
          titre="En cours"
          value={data?.false?.length || 0}
          color="amber-600/15"
          icon={ClockIcon}
        />
        <RecapCard
          titre="Terminées"
          value={data?.true?.length || 0}
          color="cyan-600/15"
          icon={ClipboardDocumentCheckIcon}
        />
      </div>
    </>
  );
}
